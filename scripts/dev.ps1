$ErrorActionPreference = "Stop"

Write-Host "Iniciando backend (Django)..." -ForegroundColor Cyan
Start-Process -FilePath "powershell" -ArgumentList @(
  "-NoExit",
  "-Command",
  "cd `"$PSScriptRoot\..\juegoBackend`"; py manage.py runserver"
)

Write-Host "Iniciando frontend (Vite)..." -ForegroundColor Cyan
Start-Process -FilePath "powershell" -ArgumentList @(
  "-NoExit",
  "-Command",
  "cd `"$PSScriptRoot\..\juegoFrontend`"; npm run dev -- --host"
)

Write-Host "Listo. Frontend: http://localhost:5173  Backend: http://127.0.0.1:8000" -ForegroundColor Green

