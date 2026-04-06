@echo off
REM Quick Start Script for Dog API Tests on Windows

echo.
echo 🐕 Dog API Test Suite - Quick Start [Windows]
echo =============================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

REM Run tests
echo 🧪 Running tests...
echo.

call npx playwright test specs/test-api-dog.spec.ts --reporter=list --reporter=html

echo.
echo ✅ Tests completed!
echo.
echo 📊 To view the HTML report:
echo    npx playwright show-report
echo.
echo 📋 Documentation files:
echo    - TESTE_API_DOG_DOCUMENTATION.md (Complete Guide)
echo    - RELATORIO_TESTES_DOG_API.md (Test Results)
echo    - SUMARIO_PROJETO.md (Project Overview)
echo.
pause
