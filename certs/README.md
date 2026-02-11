# Certificados SSL/TLS

Este diret�rio cont�m os certificados SSL/TLS para a aplica��o Bazzuca API.

## Gerando um Certificado para Desenvolvimento

### Usando OpenSSL (Linux/Mac/WSL)

```bash
# Gerar certificado autoassinado
openssl req -x509 -newkey rsa:4096 -sha256 -days 365 \
  -nodes -keyout certificate.key -out certificate.crt \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,DNS:*.localhost,IP:127.0.0.1"

# Converter para formato PFX
openssl pkcs12 -export -out certificate.pfx \
  -inkey certificate.key -in certificate.crt \
  -password pass:pikpro6
```

### Usando PowerShell (Windows)

```powershell
# Gerar certificado autoassinado
$cert = New-SelfSignedCertificate `
    -Subject "CN=localhost" `
    -DnsName "localhost", "*.localhost" `
    -KeyAlgorithm RSA `
    -KeyLength 4096 `
    -NotAfter (Get-Date).AddYears(1) `
    -CertStoreLocation "Cert:\CurrentUser\My" `
    -FriendlyName "Bazzuca Development Certificate" `
    -HashAlgorithm SHA256 `
    -KeyUsage DigitalSignature, KeyEncipherment, DataEncipherment `
    -TextExtension @("2.5.29.37={text}1.3.6.1.5.5.7.3.1")

# Exportar para arquivo PFX
$certPath = ".\certs\certificate.pfx"
$certPassword = ConvertTo-SecureString -String "pikpro6" -Force -AsPlainText
Export-PfxCertificate -Cert $cert -FilePath $certPath -Password $certPassword

# Limpar certificado do store
Remove-Item -Path "Cert:\CurrentUser\My\$($cert.Thumbprint)"
```

### Usando dotnet dev-certs

```bash
# Gerar certificado de desenvolvimento
dotnet dev-certs https -ep ./certs/certificate.pfx -p pikpro6 --trust
```

## Configura��o

Ap�s gerar o certificado, certifique-se de que:

1. O arquivo `certificate.pfx` est� neste diret�rio (`./certs/`)
2. As vari�veis de ambiente no arquivo `.env` est�o configuradas corretamente:

```env
CERTIFICATE_PATH=/app/certs/certificate.pfx
CERTIFICATE_PASSWORD=pikpro6
CERTIFICATE_DIRECTORY=./certs
```

## Para Produ��o

?? **IMPORTANTE**: Nunca use certificados autoassinados em produ��o!

Para produ��o, voc� deve:
1. Obter um certificado v�lido de uma Autoridade Certificadora (CA) como Let's Encrypt, DigiCert, etc.
2. Armazenar o certificado de forma segura (Azure Key Vault, AWS Secrets Manager, etc.)
3. Atualizar as vari�veis de ambiente com o caminho e senha corretos

## Seguran�a

- **N�O** fa�a commit de arquivos `.pfx`, `.key`, ou `.crt` no reposit�rio
- O arquivo `.gitignore` j� est� configurado para ignorar estes arquivos
- Sempre use senhas fortes em produ��o
- Rotacione certificados regularmente (recomendado a cada 90 dias)
