@echo off
set BASE_URL=http://localhost:8080
curl -X POST "%BASE_URL%/customers" -H "Content-Type: application/json" -d "{ \"name\": \"Alessandro Arciero\", \"email\": \"arciero@arciero.com\", \"password\": \"password\" }"
echo.
