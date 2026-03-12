# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BazzucaMedia is a **multi-tenant social media management platform** (.NET 8) for scheduling and publishing content across social networks (X/Twitter, Instagram, Facebook, LinkedIn, etc.). Tenant: `bazzuca`.

## Build & Run Commands

```bash
# Build API
dotnet build Bazzuca.API/Bazzuca.API.csproj

# Build Worker
dotnet build Bazzuca.Worker/Bazzuca.Worker.csproj

# Build Console (debug LinkedIn publishing with visible browser)
dotnet build Bazzuca.Console/Bazzuca.Console.csproj

# Run API locally (requires appsettings.Development.json)
dotnet run --project Bazzuca.API

# Run Worker locally
dotnet run --project Bazzuca.Worker

# Run Console (LinkedIn debug)
dotnet run --project Bazzuca.Console -- --postId 1 --tenantId bazzuca

# Docker (local dev)
docker compose up --build

# Docker (production)
docker compose --env-file .env.prod -f docker-compose-prod.yml up --build -d

# EF Core migrations
dotnet ef migrations add <Name> --project Bazzuca.Infra --startup-project Bazzuca.API
dotnet ef database update --project Bazzuca.Infra --startup-project Bazzuca.API
```

## Architecture

Six-layer Clean Architecture with this dependency flow:

```
API → Application → Domain → Infra.Interface
                  → Infra   → Infra.Interface
                  → DTO (no dependencies)
```

| Layer | Project | Responsibility |
|---|---|---|
| **API** | `Bazzuca.API` | Controllers, TenantMiddleware, Startup/DI composition |
| **Application** | `Bazzuca.Application` | `Initializer.cs` (all DI), ITenantContext, ITenantResolver, ITenantDbContextFactory |
| **Domain** | `Bazzuca.Domain` | Models (rich entities with behavior), Services, Factories |
| **Infra** | `Bazzuca.Infra` | `BazzucaContext` (PostgreSQL/EF Core), Repositories, UnitOfWork, RabbitAppService, LinkedinAppService |
| **Infra.Interface** | `Bazzuca.Infra.Interface` | Repository interfaces, IUnitOfWork, IRabbitAppService, ILinkedinAppService (zero dependencies) |
| **DTO** | `Bazzuca.DTO` | Data transfer objects, Enums (PostStatusEnum, SocialNetworkEnum), QueueSettings, PublishMessage |
| **Worker** | `Bazzuca.Worker` | BackgroundServices (LinkedinBackgroundService), RabbitMQ consumers |
| **Console** | `Bazzuca.Console` | CLI tool for debugging LinkedIn publishing with visible Playwright browser |

## Key Patterns

- **Factory Pattern**: `IClientDomainFactory`, `IPostDomainFactory`, `ISocialNetworkDomainFactory` — instantiate domain models with dependencies. Repositories use `IRepository<TModel, TFactory>` generics.
- **Manual Mapping**: `DbToModel(factory, row)` / `ModelToDb(model, row)` in repositories. No AutoMapper.
- **Soft Delete**: `active` boolean flag on Client and SocialNetwork entities. Repositories filter by `active = true`.
- **UnitOfWork**: `IUnitOfWork.BeginTransaction()` wraps EF Core transactions.
- **Async Publishing (LinkedIn)**: API enqueues to RabbitMQ → Worker consumes → Domain orchestrates retry/DLQ via `IRabbitAppService`.

## Multi-Tenant

- **TenantMiddleware** extracts `X-Tenant-Id` header → `HttpContext.Items["TenantId"]`
- **ITenantContext** resolves tenant from JWT claim `tenant_id` or header
- **ITenantDbContextFactory** creates `BazzucaContext` for a specific tenant (used by Worker)
- **BazzucaContext** created per-request via scoped factory using `Tenants:{tenantId}:ConnectionString` from config
- Each tenant has separate `ConnectionString` and `JwtSecret` in `appsettings`/env vars

## Authentication

Uses **NAuth** (external NuGet package) with `BasicAuthentication` scheme. All controllers require `[Authorize]`. User extracted via `_userClient.GetUserInSession(HttpContext)`. Config section: `NAuth:JwtSecret`.

## External Packages

- **NAuth** — JWT authentication, `IUserClient`
- **zTools** — S3 file upload (`IFileClient`), ChatGPT (`IChatGPTClient`), slug generation, email
- **Npgsql** — PostgreSQL provider for EF Core
- **TweetinviAPI** / custom `IXService` — X/Twitter OAuth 1.0a, chunked video upload
- **RabbitMQ.Client** — Message queue for async publishing (LinkedIn)
- **Microsoft.Playwright** — Browser automation for LinkedIn publishing

## RabbitMQ & Async Publishing

LinkedIn posts are published asynchronously via RabbitMQ:
- API publishes `PublishMessage` to `bazzuca.linkedin.exchange` → `bazzuca.linkedin.msg` queue
- Worker's `LinkedinBackgroundService` consumes messages and delegates to `LinkedinService`
- Retry with TTL: failed messages go to `.retry` queue, return to `.msg` after TTL expires
- DLQ: after max retries, messages go to `.error` queue
- X/Twitter publishing remains synchronous

## Environments

| Environment | Config Source | Swagger |
|---|---|---|
| **Development** | `appsettings.Development.json` (all values inline) | Yes |
| **Docker** | `appsettings.Docker.json` + `.env` (env vars override) | Yes |
| **Production** | `appsettings.Production.json` + `.env.prod` (secrets only) | No |

SSL is handled by nginx reverse proxy. The app only listens on port 80 (HTTP).

## Database

PostgreSQL with EF Core 9 + Lazy Loading Proxies. Tables use `snake_case` naming (`clients`, `posts`, `social_networks`). Relationships: Client → Posts (one-to-many), Client → SocialNetworks (one-to-many), SocialNetwork → Posts (one-to-many).

## Available Skills

Use `/dotnet-architecture` for creating entities/services/repos. `/nauth-guide` for auth integration. `/ztools-guide` for S3/AI/email. `/dotnet-multi-tenant` for tenant setup. `/dotnet-env` for environment config. `/docker-compose-config` for Docker setup.
