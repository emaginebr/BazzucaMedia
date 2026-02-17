# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["Bazzuca.API/Bazzuca.API.csproj", "Bazzuca.API/"]
COPY ["Bazzuca.Application/Bazzuca.Application.csproj", "Bazzuca.Application/"]
COPY ["Bazzuca.Domain/Bazzuca.Domain.csproj", "Bazzuca.Domain/"]
COPY ["Bazzuca.DTO/Bazzuca.DTO.csproj", "Bazzuca.DTO/"]
COPY ["Bazzuca.Infra/Bazzuca.Infra.csproj", "Bazzuca.Infra/"]
COPY ["Bazzuca.Infra.Interface/Bazzuca.Infra.Interface.csproj", "Bazzuca.Infra.Interface/"]

# Restore dependencies
RUN dotnet restore "Bazzuca.API/Bazzuca.API.csproj"

# Copy all source files
COPY . .

# Generate a dummy certificate for build (the .pfx is gitignored)
RUN dotnet dev-certs https -ep /src/Bazzuca.API/bazzuca.pfx -p dummy

# Build the application
WORKDIR "/src/Bazzuca.API"
RUN dotnet build "Bazzuca.API.csproj" -c Release -o /app/build

# Stage 2: Publish
FROM build AS publish
RUN dotnet publish "Bazzuca.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Create necessary directories with correct permissions
RUN mkdir -p /app/logs /app/certs && \
    chmod 755 /app/logs && \
    chmod 755 /app/certs

# Expose ports
EXPOSE 8080
EXPOSE 8443

# Copy published application
COPY --from=publish /app/publish .

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080;https://+:8443
ENV ASPNETCORE_ENVIRONMENT=Docker

# Run the application
ENTRYPOINT ["dotnet", "Bazzuca.API.dll"]
