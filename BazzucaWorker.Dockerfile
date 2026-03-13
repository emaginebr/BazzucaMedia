# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["Bazzuca.Worker/Bazzuca.Worker.csproj", "Bazzuca.Worker/"]
COPY ["Bazzuca.Application/Bazzuca.Application.csproj", "Bazzuca.Application/"]
COPY ["Bazzuca.Domain/Bazzuca.Domain.csproj", "Bazzuca.Domain/"]
COPY ["Bazzuca.DTO/Bazzuca.DTO.csproj", "Bazzuca.DTO/"]
COPY ["Bazzuca.Infra/Bazzuca.Infra.csproj", "Bazzuca.Infra/"]
COPY ["Bazzuca.Infra.Interface/Bazzuca.Infra.Interface.csproj", "Bazzuca.Infra.Interface/"]

# Restore dependencies
RUN dotnet restore "Bazzuca.Worker/Bazzuca.Worker.csproj"

# Copy all source files
COPY . .

# Stage 2: Publish
WORKDIR "/src/Bazzuca.Worker"
RUN dotnet publish "Bazzuca.Worker.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 3: Runtime (Playwright image with Chromium)
FROM mcr.microsoft.com/playwright/dotnet:v1.49.0-noble AS final
WORKDIR /app

# Install .NET ASP.NET runtime (Playwright image doesn't include it)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        aspnetcore-runtime-8.0 \
        curl && \
    rm -rf /var/lib/apt/lists/*

# Install Playwright browsers
RUN pwsh -Command "& {playwright install chromium}"

# Create necessary directories
RUN mkdir -p /app/playwright-data && \
    chmod 755 /app/playwright-data

# Expose port
EXPOSE 80

# Copy published application
COPY --from=publish /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Docker

# Run the application
ENTRYPOINT ["dotnet", "Bazzuca.Worker.dll"]
