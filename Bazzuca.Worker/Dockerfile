#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
ENV ASPNETCORE_ENVIRONMENT=Docker
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Bazzuca.Worker/Bazzuca.Worker.csproj", "Bazzuca.Worker/"]
COPY ["Bazzuca.Application/Bazzuca.Application.csproj", "Bazzuca.Application/"]
COPY ["Bazzuca.Domain/Bazzuca.Domain.csproj", "Bazzuca.Domain/"]
COPY ["Bazzuca.DTO/Bazzuca.DTO.csproj", "Bazzuca.DTO/"]
COPY ["Bazzuca.Infra/Bazzuca.Infra.csproj", "Bazzuca.Infra/"]
COPY ["Bazzuca.Infra.Interface/Bazzuca.Infra.Interface.csproj", "Bazzuca.Infra.Interface/"]
RUN dotnet restore "Bazzuca.Worker/Bazzuca.Worker.csproj"
COPY . .
WORKDIR "/src/Bazzuca.Worker"
RUN dotnet build "Bazzuca.Worker.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Bazzuca.Worker.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Bazzuca.Worker.dll"]
