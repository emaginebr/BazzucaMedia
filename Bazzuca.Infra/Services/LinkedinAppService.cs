using Bazzuca.Infra.Interface;
using Markdig;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Playwright;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Bazzuca.Infra.Services
{
    public class LinkedinAppService : ILinkedinAppService
    {
        private readonly string _browserDataPath;
        private readonly ILogger<LinkedinAppService> _logger;
        private static readonly ConcurrentDictionary<long, SemaphoreSlim> _clientSemaphores = new();

        public LinkedinAppService(IConfiguration configuration, ILogger<LinkedinAppService> logger)
        {
            _browserDataPath = configuration["LinkedIn:BrowserDataPath"] ?? "./playwright-data";
            _logger = logger;
        }

        public async Task PublishPost(string username, string password, long clientId,
            string title, string description, string mediaLocalPath, bool headless = true)
        {
            var semaphore = _clientSemaphores.GetOrAdd(clientId, _ => new SemaphoreSlim(1, 1));
            await semaphore.WaitAsync();

            try
            {
                var clientDir = Path.Combine(_browserDataPath, $"client-{clientId}");
                Directory.CreateDirectory(clientDir);

                var playwright = await Playwright.CreateAsync();
                var browser = await playwright.Chromium.LaunchPersistentContextAsync(clientDir, new BrowserTypeLaunchPersistentContextOptions
                {
                    Headless = headless,
                    Args = new[] { "--disable-blink-features=AutomationControlled" }
                });

                var page = browser.Pages.Count > 0 ? browser.Pages[0] : await browser.NewPageAsync();

                try
                {
                    // First ensure we are logged in
                    _logger.LogInformation("Checking LinkedIn login for client {ClientId}...", clientId);
                    await page.GotoAsync("https://www.linkedin.com/feed/", new PageGotoOptions
                    {
                        WaitUntil = WaitUntilState.DOMContentLoaded,
                        Timeout = 30000
                    });
                    await page.WaitForTimeoutAsync(3000);

                    var isLoggedIn = await CheckIfLoggedInAsync(page);
                    if (!isLoggedIn)
                    {
                        _logger.LogInformation("LinkedIn login required for client {ClientId}", clientId);
                        await Login(page, username, password);
                    }

                    // Now navigate to article editor
                    _logger.LogInformation("Navigating to LinkedIn article editor...");
                    await page.GotoAsync("https://www.linkedin.com/article/new/", new PageGotoOptions
                    {
                        WaitUntil = WaitUntilState.DOMContentLoaded,
                        Timeout = 30000
                    });
                    await page.WaitForTimeoutAsync(5000);

                    // Create article
                    await CreatePost(page, title, description, mediaLocalPath);
                    _logger.LogInformation("LinkedIn article published for client {ClientId}", clientId);
                }
                finally
                {
                    await page.CloseAsync();
                    await browser.CloseAsync();
                    playwright.Dispose();
                }
            }
            finally
            {
                semaphore.Release();
            }
        }

        private async Task<bool> CheckIfLoggedInAsync(IPage page)
        {
            var url = page.Url;

            // LinkedIn redirects to login/authwall if not logged in
            if (url.Contains("/login") || url.Contains("/authwall") || url.Contains("/checkpoint") || url.Contains("/uas/"))
                return false;

            // If we're on the feed, we're logged in
            if (url.Contains("/feed"))
                return true;

            // Fallback: try navigating to feed and check if we get redirected
            await page.GotoAsync("https://www.linkedin.com/feed/", new PageGotoOptions
            {
                WaitUntil = WaitUntilState.DOMContentLoaded,
                Timeout = 15000
            });
            await page.WaitForTimeoutAsync(2000);

            var finalUrl = page.Url;
            return finalUrl.Contains("/feed") && !finalUrl.Contains("/login") && !finalUrl.Contains("/authwall");
        }

        private async Task Login(IPage page, string username, string password)
        {
            await page.GotoAsync("https://www.linkedin.com/login", new PageGotoOptions
            {
                WaitUntil = WaitUntilState.DOMContentLoaded,
                Timeout = 30000
            });

            await page.WaitForTimeoutAsync(1000);

            await page.FillAsync("#username", username);
            await page.FillAsync("#password", password);
            await page.ClickAsync("button[type='submit']");

            await page.WaitForURLAsync("**/feed/**", new PageWaitForURLOptions { Timeout = 30000 });
            await page.WaitForTimeoutAsync(2000);
            _logger.LogInformation("LinkedIn login successful");
        }

        private async Task CreatePost(IPage page, string title, string description, string mediaLocalPath)
        {
            // Already on /article/new/ — wait for the title field to load
            _logger.LogInformation("Current URL: {Url}", page.Url);

            // Wait for the title field to load
            _logger.LogInformation("Waiting for editor to load...");
            var titleFieldSelectors = new[]
            {
                "textarea#article-editor-headline__textarea",
                "textarea.article-editor-headline__textarea",
                "textarea[placeholder='Título']",
                "textarea[placeholder='Title']",
                ".article-editor-headline textarea"
            };

            var titleField = await TryFindElementAsync(page, titleFieldSelectors, maxAttempts: 10);
            if (titleField == null)
            {
                var screenshotPath = Path.Combine(Path.GetTempPath(), $"linkedin-debug-{DateTime.Now:yyyyMMdd-HHmmss}.png");
                await page.ScreenshotAsync(new PageScreenshotOptions { Path = screenshotPath, FullPage = true });
                _logger.LogWarning("Debug screenshot saved to: {Path}", screenshotPath);
                throw new InvalidOperationException("Could not find the title field in LinkedIn article editor.");
            }

            // Type the title
            _logger.LogInformation("Setting title: {Title}", title);
            await titleField.ClickAsync();
            await titleField.FillAsync(title ?? string.Empty);
            await page.WaitForTimeoutAsync(500);

            // Focus the content editor and type the description
            _logger.LogInformation("Typing article content...");
            await FocusEditorAsync(page);
            await page.WaitForTimeoutAsync(500);

            if (!string.IsNullOrEmpty(description))
            {
                await TypeMarkdownContentAsync(page, description);
            }

            await page.WaitForTimeoutAsync(2000);

            // Upload cover image if provided
            if (!string.IsNullOrEmpty(mediaLocalPath) && File.Exists(mediaLocalPath))
            {
                _logger.LogInformation("Uploading cover image: {Path}", mediaLocalPath);
                await UploadCoverImageAsync(page, mediaLocalPath);
            }

            // Wait 30 seconds before publishing (debug: allows time to inspect the article)
            _logger.LogInformation("Waiting 30 seconds before publishing (debug pause)...");
            await page.WaitForTimeoutAsync(30000);

            // Publish the article
            _logger.LogInformation("Publishing article...");
            await PublishArticleAsync(page);
        }

        private async Task UploadCoverImageAsync(IPage page, string imagePath)
        {
            try
            {
                var uploadButtonSelectors = new[]
                {
                    "div.article-editor-cover-media__placeholder button",
                    "button[aria-label='Carregar do computador']",
                    "button[aria-label='Upload from computer']",
                    ".article-editor-cover-media__placeholder-upload-buttons button"
                };

                var uploadButton = await TryFindElementAsync(page, uploadButtonSelectors, maxAttempts: 3);
                if (uploadButton == null)
                {
                    _logger.LogWarning("Could not find cover image upload button. Continuing without image");
                    return;
                }

                try
                {
                    var fileChooserTask = page.WaitForFileChooserAsync(new PageWaitForFileChooserOptions { Timeout = 5000 });
                    await uploadButton.ClickAsync();
                    var fileChooser = await fileChooserTask;
                    await fileChooser.SetFilesAsync(imagePath);

                    _logger.LogInformation("Cover image uploaded, waiting for processing...");
                    await page.WaitForTimeoutAsync(5000);

                    // Confirm crop dialog if it appears
                    var confirmButton = await FindVisibleButtonAsync(page, new[]
                    {
                        "button.share-box-footer__primary-btn",
                        "button:has-text('Avançar')",
                        "button:has-text('Next')"
                    });
                    if (confirmButton != null)
                    {
                        await confirmButton.ClickAsync();
                        await page.WaitForTimeoutAsync(3000);
                    }
                }
                catch (TimeoutException)
                {
                    _logger.LogWarning("File chooser did not appear. Trying file input fallback...");
                    var fileInput = await page.QuerySelectorAsync("input[type='file']");
                    if (fileInput != null)
                    {
                        await fileInput.SetInputFilesAsync(imagePath);
                        await page.WaitForTimeoutAsync(5000);
                    }
                    else
                    {
                        _logger.LogWarning("No file input found. Continuing without cover image");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to upload cover image. Continuing without image");
            }
        }

        private async Task PublishArticleAsync(IPage page)
        {
            // Click "Avançar" / "Next" button
            _logger.LogInformation("Looking for Next/Publish button...");
            await ClickButtonAsync(page, new[]
            {
                "button.article-editor-nav__publish",
                "button:has-text('Avançar')",
                "button:has-text('Next')",
                "button:has-text('Publish')"
            }, "Next/Publish");

            await page.WaitForLoadStateAsync(LoadState.DOMContentLoaded);
            await page.WaitForTimeoutAsync(3000);

            // Fill topic field if it appears
            var topicFieldSelectors = new[]
            {
                ".share-creation-state__text-editor .ql-editor",
                "[data-test-share-creation-text-editor] .ql-editor",
                ".share-box__text-editor .ql-editor",
                "div.ql-editor[contenteditable='true']"
            };

            var topicField = await TryFindElementAsync(page, topicFieldSelectors, maxAttempts: 5);
            if (topicField != null)
            {
                await topicField.ClickAsync();
                await page.WaitForTimeoutAsync(300);
                // Use title as topic text — already visible via the article title
                _logger.LogInformation("Topic field found, leaving default");
            }

            // Click the confirmation "Publicar" / "Publish" button
            _logger.LogInformation("Looking for confirmation Publish button...");
            var confirmButton = await FindVisibleButtonAsync(page, new[]
            {
                "button.share-actions__primary-action",
                "button.share-actions__primary-action:has-text('Publicar')",
                "button.share-actions__primary-action:has-text('Publish')",
                "button:has-text('Publicar')",
                "button:has-text('Publish')"
            });

            if (confirmButton != null)
            {
                var text = (await confirmButton.TextContentAsync())?.Trim();
                _logger.LogInformation("Clicking confirmation button: {Text}", text);
                await confirmButton.ClickAsync();
            }
            else
            {
                throw new InvalidOperationException("Could not find the 'Publish' confirmation button on LinkedIn.");
            }

            // Wait for publish to complete
            _logger.LogInformation("Waiting for article to be published...");
            await page.WaitForTimeoutAsync(5000);
        }

        private async Task TypeMarkdownContentAsync(IPage page, string markdownContent)
        {
            var segments = SplitMarkdownSegments(markdownContent);
            _logger.LogInformation("Split content into {Count} segments", segments.Count);

            foreach (var segment in segments)
            {
                if (segment.IsCodeBlock)
                {
                    await TypeCodeBlockAsync(page, segment.Content);
                }
                else
                {
                    await PasteHtmlContentAsync(page, segment.Content);
                }
            }
        }

        private async Task PasteHtmlContentAsync(IPage page, string markdownSegment)
        {
            if (string.IsNullOrWhiteSpace(markdownSegment))
                return;

            var pipeline = new MarkdownPipelineBuilder()
                .UseAdvancedExtensions()
                .Build();
            var html = Markdown.ToHtml(markdownSegment, pipeline);

            // Copy HTML to clipboard via off-screen contenteditable element
            await page.EvaluateAsync(@"(html) => {
                const container = document.createElement('div');
                container.innerHTML = html;
                container.style.position = 'fixed';
                container.style.left = '-9999px';
                container.style.top = '0';
                container.setAttribute('contenteditable', 'true');
                document.body.appendChild(container);

                const range = document.createRange();
                range.selectNodeContents(container);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);

                document.execCommand('copy');

                selection.removeAllRanges();
                document.body.removeChild(container);
            }", html);

            await page.WaitForTimeoutAsync(300);

            // Focus the post editor and paste
            await FocusEditorAsync(page);
            await page.Keyboard.PressAsync("Control+v");
            await page.WaitForTimeoutAsync(1000);
        }

        private async Task TypeCodeBlockAsync(IPage page, string codeContent)
        {
            await FocusEditorAsync(page);

            // Ensure we're on a new line before activating code block
            await page.Keyboard.PressAsync("Enter");
            await page.WaitForTimeoutAsync(300);

            // LinkedIn article editor uses a toolbar button (curly-braces icon) for code blocks
            var codeButton = await FindCodeBlockToolbarButtonAsync(page);

            if (codeButton != null)
            {
                _logger.LogInformation("Clicking code block toolbar button...");
                await codeButton.ClickAsync();
                await page.WaitForTimeoutAsync(1000);

                // Ensure cursor is inside the code block
                await page.EvaluateAsync(@"() => {
                    const pre = document.querySelector('div.ProseMirror pre:last-of-type')
                        || document.querySelector('[data-test-article-editor-content-textbox] pre:last-of-type');
                    if (pre) {
                        const code = pre.querySelector('code') || pre;
                        code.focus();
                        const range = document.createRange();
                        range.selectNodeContents(code);
                        range.collapse(false);
                        const sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }");
                await page.WaitForTimeoutAsync(300);
            }
            else
            {
                _logger.LogWarning("Could not find code block toolbar button. Typing code as plain text");
            }

            // Type each line of code, re-focusing inside the <pre> block periodically
            // to prevent the cursor from escaping the code block
            var lines = codeContent.Split('\n');
            for (int i = 0; i < lines.Length; i++)
            {
                // Re-focus cursor inside the code block every 5 lines to prevent escape
                if (i > 0 && i % 5 == 0)
                {
                    await page.EvaluateAsync(@"() => {
                        const pre = document.querySelector('div.ProseMirror pre:last-of-type')
                            || document.querySelector('[data-test-article-editor-content-textbox] pre:last-of-type');
                        if (pre) {
                            const code = pre.querySelector('code') || pre;
                            const range = document.createRange();
                            range.selectNodeContents(code);
                            range.collapse(false);
                            const sel = window.getSelection();
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    }");
                    await page.WaitForTimeoutAsync(200);
                }

                await page.Keyboard.TypeAsync(lines[i], new KeyboardTypeOptions { Delay = 5 });

                if (i < lines.Length - 1)
                {
                    // Use Shift+Enter to stay inside the code block (avoids creating new paragraph)
                    await page.Keyboard.PressAsync("Shift+Enter");
                    await page.WaitForTimeoutAsync(50);
                }
            }

            await page.WaitForTimeoutAsync(500);

            // Exit code block: place cursor after the <pre> element via JS
            // Do NOT toggle the code block button — that removes formatting from the typed code
            await page.EvaluateAsync(@"() => {
                const pre = document.querySelector('div.ProseMirror pre:last-of-type')
                    || document.querySelector('[data-test-article-editor-content-textbox] pre:last-of-type');
                if (pre && pre.nextSibling) {
                    // Place cursor at the start of the element after the code block
                    const range = document.createRange();
                    range.setStart(pre.nextSibling, 0);
                    range.collapse(true);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (pre) {
                    // No next sibling — create a new paragraph after the code block
                    const p = document.createElement('p');
                    p.innerHTML = '<br>';
                    pre.parentNode.insertBefore(p, pre.nextSibling);
                    const range = document.createRange();
                    range.setStart(p, 0);
                    range.collapse(true);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }");
            await page.WaitForTimeoutAsync(300);
        }

        private async Task<IElementHandle> FindCodeBlockToolbarButtonAsync(IPage page)
        {
            var selectors = new[]
            {
                "button.scaffold-formatted-text-editor-icon-button svg[data-test-icon='curly-braces-medium']",
                "button svg[data-test-icon='curly-braces-medium']"
            };

            foreach (var selector in selectors)
            {
                try
                {
                    var svg = await page.QuerySelectorAsync(selector);
                    if (svg != null)
                    {
                        var button = await svg.EvaluateHandleAsync("el => el.closest('button')") as IElementHandle;
                        if (button != null && await button.IsVisibleAsync())
                            return button;
                    }
                }
                catch (PlaywrightException)
                {
                    // Continue
                }
            }

            return null;
        }

        private async Task FocusEditorAsync(IPage page)
        {
            // LinkedIn article editor: ProseMirror contenteditable div
            await page.EvaluateAsync(@"() => {
                const editor = document.querySelector('div.ProseMirror[data-test-article-editor-content-textbox]')
                    || document.querySelector('div.ProseMirror[contenteditable=""true""]')
                    || document.querySelector('[data-test-article-editor-content-textbox]')
                    || document.querySelector('[role=""textbox""][contenteditable=""true""]')
                    || document.querySelector('[contenteditable=""true""]');
                if (editor) {
                    editor.focus();
                    const selection = window.getSelection();
                    if (selection && editor.lastChild) {
                        const range = document.createRange();
                        range.selectNodeContents(editor);
                        range.collapse(false);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
            }");
            await page.WaitForTimeoutAsync(200);
        }

        #region Utility Methods (adapted from GitNews)

        private async Task<IElementHandle> TryFindElementAsync(IPage page, string[] selectors, int maxAttempts)
        {
            for (int attempt = 0; attempt < maxAttempts; attempt++)
            {
                foreach (var selector in selectors)
                {
                    try
                    {
                        var element = await page.QuerySelectorAsync(selector);
                        if (element != null && await element.IsVisibleAsync())
                            return element;
                    }
                    catch (PlaywrightException)
                    {
                        // Context may have been destroyed, retry
                    }
                }
                await page.WaitForTimeoutAsync(1000);
            }

            return null;
        }

        private async Task<IElementHandle> FindVisibleButtonAsync(IPage page, string[] selectors)
        {
            for (int attempt = 0; attempt < 5; attempt++)
            {
                foreach (var selector in selectors)
                {
                    try
                    {
                        var buttons = await page.QuerySelectorAllAsync(selector);
                        foreach (var btn in buttons)
                        {
                            if (await btn.IsVisibleAsync())
                                return btn;
                        }
                    }
                    catch (PlaywrightException)
                    {
                        // Context destroyed, retry
                    }
                }

                await page.WaitForTimeoutAsync(1000);
            }

            return null;
        }

        private async Task ClickButtonAsync(IPage page, string[] selectors, string buttonName)
        {
            for (int attempt = 0; attempt < 5; attempt++)
            {
                foreach (var selector in selectors)
                {
                    try
                    {
                        var btn = await page.QuerySelectorAsync(selector);
                        if (btn != null && await btn.IsVisibleAsync())
                        {
                            await btn.ClickAsync();
                            return;
                        }
                    }
                    catch (PlaywrightException)
                    {
                        // Context destroyed, retry
                    }
                }

                await page.WaitForTimeoutAsync(1000);
            }

            throw new InvalidOperationException($"Could not find the '{buttonName}' button on LinkedIn.");
        }

        private record ContentSegment(string Content, bool IsCodeBlock);

        private static List<ContentSegment> SplitMarkdownSegments(string markdown)
        {
            var segments = new List<ContentSegment>();
            var lines = markdown.Split('\n');
            var currentText = new StringBuilder();
            var currentCode = new StringBuilder();
            var inCodeBlock = false;

            foreach (var line in lines)
            {
                var trimmed = line.TrimEnd();

                if (trimmed.StartsWith("```"))
                {
                    if (!inCodeBlock)
                    {
                        if (currentText.Length > 0)
                        {
                            segments.Add(new ContentSegment(currentText.ToString().TrimEnd(), false));
                            currentText.Clear();
                        }

                        inCodeBlock = true;
                        currentCode.Clear();
                    }
                    else
                    {
                        segments.Add(new ContentSegment(currentCode.ToString().TrimEnd(), true));
                        currentCode.Clear();
                        inCodeBlock = false;
                    }

                    continue;
                }

                if (inCodeBlock)
                {
                    if (currentCode.Length > 0)
                        currentCode.AppendLine();
                    currentCode.Append(line);
                }
                else
                {
                    currentText.AppendLine(line);
                }
            }

            if (inCodeBlock && currentCode.Length > 0)
            {
                segments.Add(new ContentSegment(currentCode.ToString().TrimEnd(), true));
            }
            else if (currentText.Length > 0)
            {
                segments.Add(new ContentSegment(currentText.ToString().TrimEnd(), false));
            }

            return segments;
        }

        #endregion
    }
}
