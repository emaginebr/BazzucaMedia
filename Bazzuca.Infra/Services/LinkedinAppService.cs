using Bazzuca.Infra.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Playwright;
using System;
using System.Collections.Concurrent;
using System.IO;
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
                    // Navigate to LinkedIn
                    await page.GotoAsync("https://www.linkedin.com/feed/", new PageGotoOptions
                    {
                        WaitUntil = WaitUntilState.NetworkIdle,
                        Timeout = 30000
                    });

                    // Check if logged in
                    var isLoggedIn = await page.Locator("button:has-text('Start a post'), button:has-text('Começar um post')").CountAsync() > 0;

                    if (!isLoggedIn)
                    {
                        _logger.LogInformation("LinkedIn login required for client {ClientId}", clientId);
                        await Login(page, username, password);
                    }

                    // Create post
                    await CreatePost(page, title, description, mediaLocalPath);
                    _logger.LogInformation("LinkedIn post published for client {ClientId}", clientId);
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

        private async Task Login(IPage page, string username, string password)
        {
            await page.GotoAsync("https://www.linkedin.com/login", new PageGotoOptions
            {
                WaitUntil = WaitUntilState.NetworkIdle,
                Timeout = 30000
            });

            await page.FillAsync("#username", username);
            await page.FillAsync("#password", password);
            await page.ClickAsync("button[type='submit']");

            await page.WaitForURLAsync("**/feed/**", new PageWaitForURLOptions { Timeout = 30000 });
            _logger.LogInformation("LinkedIn login successful");
        }

        private async Task CreatePost(IPage page, string title, string description, string mediaLocalPath)
        {
            // Click "Start a post" button
            var startPostButton = page.Locator("button:has-text('Start a post'), button:has-text('Começar um post')");
            await startPostButton.ClickAsync();

            // Wait for the post editor modal
            await page.WaitForSelectorAsync("div[role='dialog']", new PageWaitForSelectorOptions { Timeout = 10000 });

            // Type the post content
            var postContent = string.IsNullOrEmpty(title) ? description : $"{title}\n\n{description}";
            var editor = page.Locator("div[role='textbox']");
            await editor.FillAsync(postContent);

            // Upload media if provided
            if (!string.IsNullOrEmpty(mediaLocalPath) && File.Exists(mediaLocalPath))
            {
                // Click media button and upload
                var mediaButton = page.Locator("button[aria-label='Add media'], button[aria-label='Adicionar mídia']");
                await mediaButton.ClickAsync();

                var fileInput = page.Locator("input[type='file']");
                await fileInput.SetInputFilesAsync(mediaLocalPath);

                // Wait for upload to complete
                await page.WaitForTimeoutAsync(3000);
            }

            // Click Post button
            var postButton = page.Locator("button:has-text('Post'), button:has-text('Publicar')").Last;
            await postButton.ClickAsync();

            // Wait for the post to be submitted
            await page.WaitForTimeoutAsync(3000);
        }
    }
}
