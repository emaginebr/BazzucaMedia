#!/bin/bash
cd ../NAuth/Backend/NAuth
pwd
dotnet build -c Release NAuth.sln
cd ./NAuth.Client/bin/Release/net8.0
pwd
cp NAuth.Client.dll ../../../../../../../BazzucaMedia/Backend/BazzucaMedia/Lib
cp NAuth.DTO.dll ../../../../../../../BazzucaMedia/Backend/BazzucaMedia/Lib
cd ../../../../../../../NAuth/Frontend/nauth-core
pwd
npm install
npm run build
cp -Rf ./dist/* ../../../BazzucaMedia/Frontend/bazzuca-app/src/nauth-core
