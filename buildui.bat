call npm run build --base-href=# --prefix web/datalogui
call rmdir "src/main/resources/web" /S /Q
call xcopy "web/datalogui/dist/datalog3" "src/main/resources/web" /s /i