@echo off
cd .\Backend\BazzucaSocial\DB.Infra
dotnet ef dbcontext scaffold "Host=emagine-db-do-user-4436480-0.e.db.ondigitalocean.com;Port=25060;Database=bazzucasocial;Username=doadmin;Password=AVNS_akcvzXVnMkvNKaO10-O" Npgsql.EntityFrameworkCore.PostgreSQL --context BazzucaContext --output-dir Context -f
pause