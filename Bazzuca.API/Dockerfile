#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
ENV ASPNETCORE_ENVIRONMENT=Docker
WORKDIR /app
EXPOSE 443

# Build libgdiplus with pango
RUN apt-get update && apt-get install  -y --allow-unauthenticated \
     libgif-dev autoconf libtool automake build-essential gettext libglib2.0-dev libcairo2-dev libtiff-dev libexif-dev
RUN apt-get update && apt-get install -y libpango1.0-dev 

RUN apt-get install -y --allow-unauthenticated git
RUN git clone https://github.com/mono/libgdiplus.git /libgdiplus
WORKDIR /libgdiplus
RUN ./autogen.sh --with-pango --prefix=/usr
RUN make  
RUN make install

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Bazzuca.API/Bazzuca.API.csproj", "Bazzuca.API/"]
COPY ["Bazzuca.Application/Bazzuca.Application.csproj", "Bazzuca.Application/"]
COPY ["Bazzuca.Domain/Bazzuca.Domain.csproj", "Bazzuca.Domain/"]
COPY ["Core.Domain/Core.Domain.csproj", "Core.Domain/"]
COPY ["Bazzuca.DTO/Bazzuca.DTO.csproj", "Bazzuca.DTO/"]
COPY ["DB.Infra/DB.Infra.csproj", "DB.Infra/"]
COPY ["Lib/NAuth.DTO.dll", "Lib/"]
COPY ["Lib/NAuth.Client.dll", "Lib/"]
RUN dotnet restore "Bazzuca.API/Bazzuca.API.csproj"
COPY . .
WORKDIR "/src/Bazzuca.API"
RUN dotnet build "Bazzuca.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Bazzuca.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Bazzuca.API.dll"]