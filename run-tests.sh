#!/bin/bash
# Quick Start Script for Dog API Tests

echo "🐕 Dog API Test Suite - Quick Start"
echo "===================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if Chromium is installed
if [ ! -d "$HOME/.cache/ms-playwright/chromium-*" ]; then
    echo "🌐 Installing Chromium browser..."
    npx playwright install --with-deps chromium
    echo ""
fi

# Run tests
echo "🧪 Running tests..."
echo ""

npx playwright test specs/test-api-dog.spec.ts --reporter=list --reporter=html

echo ""
echo "✅ Tests completed!"
echo ""
echo "📊 To view the HTML report:"
echo "   npx playwright show-report"
echo ""
echo "📋 Documentation files:"
echo "   - TESTE_API_DOG_DOCUMENTATION.md (Complete Guide)"
echo "   - RELATORIO_TESTES_DOG_API.md (Test Results)"
echo "   - SUMARIO_PROJETO.md (Project Overview)"
