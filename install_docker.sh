#!/bin/bash
docker stop bazzuca-api1
docker rm bazzuca-api1
cd ./Backend/BazzucaMedia/BazzucaMedia.API
docker build -t bazzuca-api -f Dockerfile .
docker run --name bazzuca-api1 -e ASPNETCORE_URLS="https://+" -e ASPNETCORE_HTTPS_PORTS=443 --network docker-network bazzuca-api &
docker ps
