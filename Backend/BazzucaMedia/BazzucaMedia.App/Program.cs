using Microsoft.Playwright;

var videoPath = "video.mp4"; // caminho do vídeo
var tweetText = "Post automático com vídeo usando Playwright e .NET 🚀";

using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
{
    Headless = false // true = modo invisível
});

var context = await browser.NewContextAsync(new BrowserNewContextOptions
{
    StorageStatePath = "twitter-session.json"
});

var page = await context.NewPageAsync();

// Verifica se já está logado
await page.GotoAsync("https://x.com/compose/tweet");

if (page.Url.Contains("/login") || page.Url.Contains("/i/flow"))
{
    Console.WriteLine("⚠️ Você precisa fazer login manualmente. Aguarde...");
    await page.WaitForURLAsync("https://x.com/home", new PageWaitForURLOptions { Timeout = 120_000 });
    await context.StorageStateAsync(new BrowserContextStorageStateOptions { Path = "twitter-session.json" });
    Console.WriteLine("✅ Sessão salva. Rode o programa novamente para automatizar o post.");
    return;
}

// Acessa a tela de novo tweet
await page.GotoAsync("https://x.com/compose/tweet");

// Digita o texto
var textarea = await page.WaitForSelectorAsync("div[aria-label='Tweet text']");
await textarea.FillAsync(tweetText);

// Faz upload do vídeo
var fileInput = await page.QuerySelectorAsync("input[type='file']");
if (fileInput == null)
{
    Console.WriteLine("Erro: campo de upload não encontrado.");
    return;
}

await fileInput.SetInputFilesAsync(videoPath);

// Aguarda o processamento do vídeo (pode levar vários segundos)
await page.WaitForSelectorAsync("div[aria-label='Tweet'] >> text='Postar'", new PageWaitForSelectorOptions { Timeout = 60_000 });

// Clica no botão de postar
await page.ClickAsync("div[aria-label='Tweet'] >> text='Postar'");
Console.WriteLine("✅ Tweet postado com sucesso!");

await page.WaitForTimeoutAsync(3000);
await browser.CloseAsync();