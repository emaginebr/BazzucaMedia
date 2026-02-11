# BazzucaSocial

Sistema de gerenciamento de m�dia social para m�ltiplos clientes e redes sociais.

## ?? Configura��o R�pida

### Pr�-requisitos

- Docker e Docker Compose
- .NET 8 SDK (para desenvolvimento local)
- Node.js (para desenvolvimento local do frontend)

### Configura��o do Certificado SSL

Antes de executar a aplica��o com HTTPS, voc� precisa gerar um certificado SSL:

#### No Windows (PowerShell)

```powershell
.\generate-cert.ps1
```

#### No Linux/Mac/WSL

```bash
chmod +x generate-cert.sh
./generate-cert.sh
```

O certificado ser� gerado automaticamente no diret�rio `./certs/` com a senha configurada no arquivo `.env`.

Caso deseje configurar um certificado existente, defina as vari�veis abaixo no arquivo `.env`:

```env
# Caminho e senha do certificado existente
CERTIFICATE_PATH=/caminho/para/seu/certificado.pfx
CERTIFICATE_PASSWORD=sua_senha
```

### Executar com Docker

```bash
# Iniciar todos os servi�os
docker-compose up -d

# Ver logs
docker-compose logs -f bazzuca-api

# Parar servi�os
docker-compose down
```

A API estar� dispon�vel em:

- HTTP: http://localhost:5010
- HTTPS: https://localhost:5011

### Vari�veis de Ambiente

Todas as configura��es est�o no arquivo `.env`:

```env
# Certificado SSL
CERTIFICATE_PATH=/app/certs/certificate.pfx
CERTIFICATE_PASSWORD=pikpro6
CERTIFICATE_DIRECTORY=./certs

# Portas da API
API_HTTP_PORT=5010
API_HTTPS_PORT=5011

# Outras configura��es...
```

## ?? Notas sobre HTTPS

- Em **desenvolvimento**: Use certificados autoassinados (gerados pelos scripts)
- Em **produ��o**: Use certificados v�lidos de uma CA (Let's Encrypt, etc.)
- Se o certificado n�o for encontrado, a aplica��o funcionar� apenas em HTTP
- Nunca fa�a commit de arquivos de certificado no reposit�rio

## ?? Desenvolvimento Local

Para executar sem Docker:

```bash
cd Bazzuca.API
dotnet run
```

## ?? Documenta��o da API

Com a aplica��o em execu��o, acesse:

- Swagger UI: http://localhost:5010/swagger

## ?? Docker

A aplica��o suporta HTTPS atrav�s de certificados montados via volume. O certificado deve estar no diret�rio `./certs/` conforme configurado no `.env`.

## ?? Seguran�a

- Sempre use HTTPS em produ��o
- Nunca exponha senhas ou certificados no c�digo
- Use Azure Key Vault ou AWS Secrets Manager para produ��o
- Rotacione certificados regularmente