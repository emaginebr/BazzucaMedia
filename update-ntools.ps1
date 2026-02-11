# Update NTools libraries
Write-Host "Navigating to NTools directory..." -ForegroundColor Cyan
Set-Location -Path "..\NTools"
Get-Location

Write-Host "Building NTools solution..." -ForegroundColor Yellow
dotnet build -c Release NTools.sln

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error building NTools solution!" -ForegroundColor Red
    Set-Location -Path "..\Bazzuca"
    exit 1
}

Write-Host "Navigating to build output..." -ForegroundColor Cyan
Set-Location -Path ".\NTools.ACL\bin\Release\net8.0"
Get-Location

Write-Host "Copying DLL files to Bazzuca/Lib..." -ForegroundColor Green
Copy-Item -Path "NTools.ACL.dll" -Destination "..\..\..\..\..\Bazzuca\Lib" -Force
Copy-Item -Path "NTools.DTO.dll" -Destination "..\..\..\..\..\Bazzuca\Lib" -Force

Write-Host "NTools libraries updated successfully!" -ForegroundColor Green

# Return to Bazzuca directory
Set-Location -Path "..\..\..\..\..\Bazzuca"

Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
