# Certificados SSL/TLS

Este diretório contém os certificados SSL/TLS para a aplicação BazzucaMedia API.

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
    -FriendlyName "BazzucaMedia Development Certificate" `
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

## Configuração

Após gerar o certificado, certifique-se de que:

1. O arquivo `certificate.pfx` está neste diretório (`./certs/`)
2. As variáveis de ambiente no arquivo `.env` estão configuradas corretamente:

```env
CERTIFICATE_PATH=/app/certs/certificate.pfx
CERTIFICATE_PASSWORD=pikpro6
CERTIFICATE_DIRECTORY=./certs
```

## Para Produção

?? **IMPORTANTE**: Nunca use certificados autoassinados em produção!

Para produção, você deve:
1. Obter um certificado válido de uma Autoridade Certificadora (CA) como Let's Encrypt, DigiCert, etc.
2. Armazenar o certificado de forma segura (Azure Key Vault, AWS Secrets Manager, etc.)
3. Atualizar as variáveis de ambiente com o caminho e senha corretos

## Segurança

- **NÃO** faça commit de arquivos `.pfx`, `.key`, ou `.crt` no repositório
- O arquivo `.gitignore` já está configurado para ignorar estes arquivos
- Sempre use senhas fortes em produção
- Rotacione certificados regularmente (recomendado a cada 90 dias)
