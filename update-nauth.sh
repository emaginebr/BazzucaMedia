#!/bin/bash
cd ../NAuth/Backend/NAuth
pwd
dotnet build -c Release NAuth.sln
cd ./NAuth.ACL/bin/Release/net8.0
pwd
cp NAuth.ACL.dll ../../../../../../../BazzucaMedia/Backend/BazzucaMedia/Lib
cp NAuth.DTO.dll ../../../../../../../BazzucaMedia/Backend/BazzucaMedia/Lib
cd ../../../../../../../NAuth/Frontend/nauth-core
pwd
npm install --legacy-peer-deps
npm run build
rm -Rf ../../../BazzucaMedia/Frontend/bazzuca-app/src/lib/nauth-core
cp -Rf ./dist ../../../BazzucaMedia/Frontend/bazzuca-app/src/lib/nauth-core
