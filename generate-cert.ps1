# Script PowerShell para gerar certificado SSL autoassinado para desenvolvimento

$CertDir = ".\certs"
$CertName = "certificate"
$CertPassword = "pikpro6"
$DaysValid = 365

Write-Host "?? Gerando certificado SSL para desenvolvimento..." -ForegroundColor Cyan

# Criar diret�rio se n�o existir
if (-not (Test-Path $CertDir)) {
    New-Item -ItemType Directory -Path $CertDir | Out-Null
}

$certPath = Join-Path $CertDir "$CertName.pfx"

# Gerar certificado autoassinado
$cert = New-SelfSignedCertificate `
    -Subject "CN=localhost, O=Bazzuca, C=BR" `
    -DnsName "localhost", "*.localhost", "bazzuca-api", "127.0.0.1" `
    -KeyAlgorithm RSA `
    -KeyLength 4096 `
    -NotAfter (Get-Date).AddDays($DaysValid) `
    -CertStoreLocation "Cert:\CurrentUser\My" `
    -FriendlyName "Bazzuca Development Certificate" `
    -HashAlgorithm SHA256 `
    -KeyUsage DigitalSignature, KeyEncipherment, DataEncipherment `
    -TextExtension @("2.5.29.37={text}1.3.6.1.5.5.7.3.1")

# Exportar para arquivo PFX
$certPasswordSecure = ConvertTo-SecureString -String $CertPassword -Force -AsPlainText
Export-PfxCertificate -Cert $cert -FilePath $certPath -Password $certPasswordSecure | Out-Null

# Limpar certificado do store
Remove-Item -Path "Cert:\CurrentUser\My\$($cert.Thumbprint)" -Force

Write-Host "? Certificado gerado com sucesso!" -ForegroundColor Green
Write-Host "?? Localiza��o: $certPath" -ForegroundColor Yellow
Write-Host "?? Senha: $CertPassword" -ForegroundColor Yellow
Write-Host ""
Write-Host "??  O certificado � v�lido por $DaysValid dias" -ForegroundColor Blue
Write-Host "??  Configure as vari�veis de ambiente no arquivo .env:" -ForegroundColor Blue
Write-Host "   CERTIFICATE_PATH=/app/certs/certificate.pfx" -ForegroundColor Gray
Write-Host "   CERTIFICATE_PASSWORD=$CertPassword" -ForegroundColor Gray
Write-Host "   CERTIFICATE_DIRECTORY=./certs" -ForegroundColor Gray
