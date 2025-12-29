# BazzucaSocial

Sistema de gerenciamento de mídia social para múltiplos clientes e redes sociais.

## ?? Configuração Rápida

### Pré-requisitos

- Docker e Docker Compose
- .NET 8 SDK (para desenvolvimento local)
- Node.js (para desenvolvimento local do frontend)

### Configuração do Certificado SSL

Antes de executar a aplicação com HTTPS, você precisa gerar um certificado SSL:

#### No Windows (PowerShell)

```powershell
.\generate-cert.ps1
```

#### No Linux/Mac/WSL

```bash
chmod +x generate-cert.sh
./generate-cert.sh
```

O certificado será gerado automaticamente no diretório `./certs/` com a senha configurada no arquivo `.env`.

Caso deseje configurar um certificado existente, defina as variáveis abaixo no arquivo `.env`:

```env
# Caminho e senha do certificado existente
CERTIFICATE_PATH=/caminho/para/seu/certificado.pfx
CERTIFICATE_PASSWORD=sua_senha
```

### Executar com Docker

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f bazzuca-api

# Parar serviços
docker-compose down
```

A API estará disponível em:

- HTTP: http://localhost:5010
- HTTPS: https://localhost:5011

### Variáveis de Ambiente

Todas as configurações estão no arquivo `.env`:

```env
# Certificado SSL
CERTIFICATE_PATH=/app/certs/certificate.pfx
CERTIFICATE_PASSWORD=pikpro6
CERTIFICATE_DIRECTORY=./certs

# Portas da API
API_HTTP_PORT=5010
API_HTTPS_PORT=5011

# Outras configurações...
```

## ?? Notas sobre HTTPS

- Em **desenvolvimento**: Use certificados autoassinados (gerados pelos scripts)
- Em **produção**: Use certificados válidos de uma CA (Let's Encrypt, etc.)
- Se o certificado não for encontrado, a aplicação funcionará apenas em HTTP
- Nunca faça commit de arquivos de certificado no repositório

## ?? Desenvolvimento Local

Para executar sem Docker:

```bash
cd BazzucaMedia.API
dotnet run
```

## ?? Documentação da API

Com a aplicação em execução, acesse:

- Swagger UI: http://localhost:5010/swagger

## ?? Docker

A aplicação suporta HTTPS através de certificados montados via volume. O certificado deve estar no diretório `./certs/` conforme configurado no `.env`.

## ?? Segurança

- Sempre use HTTPS em produção
- Nunca exponha senhas ou certificados no código
- Use Azure Key Vault ou AWS Secrets Manager para produção
- Rotacione certificados regularmente