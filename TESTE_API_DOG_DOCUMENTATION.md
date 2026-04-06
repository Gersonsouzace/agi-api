# Dog API - Test Automation Suite

## 📋 Visão Geral

Este projeto contém uma **suite de testes automatizados** para validar a integração com a **Dog CEO API** (https://dog.ceo/dog-api/documentation). Os testes garantem que a API esteja respondendo corretamente, retornando dados no formato esperado e se comportando conforme o esperado em diferentes cenários.

---

## 🎯 Objetivos

- ✅ Validar os 3 endpoints principais da API
- ✅ Garantir formato correto das respostas
- ✅ Testar cenários de sucesso e erro
- ✅ Validar performance e confiabilidade
- ✅ Gerar relatório detalhado com Allure Reports

---

## 📦 Endpoints Testados

### 1. **GET /breeds/list/all**
Retorna a lista completa de todas as raças de cães e suas sub-raças.
- Valida status 200
- Verifica estrutura JSON (status e message)
- Confirma existência de raças comuns
- Valida sub-raças como arrays

### 2. **GET /breed/{breed}/images**
Retorna imagens de uma raça específica.
- Testa raças simples (ex: labrador)
- Testa sub-raças (ex: bulldog/french)
- Valida URLs de imagens
- Trata erros (raças inválidas com 404)

### 3. **GET /breeds/image/random**
Retorna uma imagem aleatória de cão.
- Valida formato da resposta
- Verifica variabilidade de URLs
- Testa validez das URLs
- Valida domínio (dog.ceo)

---

## 🛠️ Requisitos do Sistema

- **Node.js**: 18.x ou superior
- **npm**: 9.x ou superior
- **Navegador**: Chromium (instalado automaticamente)
- **SO**: Windows, macOS ou Linux

---

## 📥 Instalação e Configuração

### Passo 1: Clonar/Acessar o Repositório
```bash
cd teste_agi_api
```

### Passo 2: Instalar Dependências
```bash
npm install
```

Isso instala:
- `@playwright/test` - Runner de testes
- `allure-playwright` - Gerador de relatórios

### Passo 3: Instalar Chromium
```bash
npx playwright install --with-deps chromium
```

---

## ⚙️ Configuração

### playwright.config.ts
O arquivo `playwright.config.ts` contém as configurações:

```typescript
- baseURL: https://dog.ceo (base para todas as requisições)
- timeout: 5 segundos (timeout máximo para cada teste)
- reporter: ['html', 'list', 'allure-playwright']
- projects: ['chromium'] (apenas Chromium)
```

---

## 🚀 Executando os Testes

### 1. Executar Todos os Testes
```bash
npm test
```

### 2. Executar Testes em Modo UI (Interativo)
```bash
npm run test:ui
```

### 3. Executar Testes em Modo Headed (Visível)
```bash
npm run test:headed
```

### 4. Executar Testes em Debug
```bash
npm run test:debug
```

### 5. Executar Testes com Reporter Específico
```bash
npx playwright test --reporter=html
npx playwright test --reporter=allure
```

---

## 📊 Relatórios de Teste

### HTML Report
Gerado automaticamente após a execução dos testes.

**Visualizar:**
```bash
npx playwright show-report
```

**Localização:** `playwright-report/index.html`

### Allure Report
Gerado com informações detalhadas de cada teste.

**Visualizar:**
```bash
npx allure generate allure-results --clean --output allure-report
npx allure open allure-report
```

**Localização:** `allure-report/index.html`

---

## 📝 Estrutura dos Testes

O arquivo `specs/test-api-dog.spec.ts` contém **32 testes** organizados em 5 grupos:

### 1. **GET /breeds/list/all** (6 testes)
- ✅ Status 200
- ✅ Estrutura JSON válida
- ✅ Message como objeto
- ✅ Raças comuns presentes
- ✅ Sub-raças como arrays
- ✅ Sub-raças específicas validadas

### 2. **GET /breed/{breed}/images** (7 testes)
- ✅ Imagens de raça válida
- ✅ URLs de imagens válidas
- ✅ Sub-raças (ex: bulldog/french)
- ✅ Raça inválida retorna 404
- ✅ Estrutura de resposta correta
- ✅ Múltiplas imagens por raça
- ✅ Diferentes raças testadas

### 3. **GET /breeds/image/random** (7 testes)
- ✅ Status 200
- ✅ URL de imagem aleatória
- ✅ Variabilidade de URLs
- ✅ Estrutura de resposta
- ✅ Validez da URL (HEAD request)
- ✅ Formatos JPEG/PNG
- ✅ Domínio dog.ceo

### 4. **Performance e Confiabilidade** (3 testes)
- ✅ Resposta dentro de 5 segundos
- ✅ Requisições concorrentes
- ✅ Health check da API

### 5. **Tratamento de Erros** (3 testes)
- ✅ Raças inválidas
- ✅ Case-sensitivity
- ✅ Requisições malformadas

---

## ✅ Resultados Esperados

Todos os 32 testes devem passar com sucesso:

```
✓ specs/test-api-dog.spec.ts:1:1 › Dog API - Test Suite › GET /breeds/list/all - List all dog breeds › should return status 200
✓ specs/test-api-dog.spec.ts:1:1 › Dog API - Test Suite › GET /breeds/list/all - List all dog breeds › should return JSON with correct structure
✓ specs/test-api-dog.spec.ts:1:1 › Dog API - Test Suite › GET /breeds/list/all - List all dog breeds › should return message as an object with breed data
... (e mais 29 testes)

32 passed (15.2s)
```

---

## 🔧 Troubleshooting

### Problema: Testes falhando por timeout
**Solução:** Aumentar o timeout no `playwright.config.ts`:
```typescript
timeout: 10 * 1000, // 10 segundos
```

### Problema: Chromium não instalado
**Solução:**
```bash
npx playwright install --with-deps chromium
```

### Problema: Port já em uso
**Solução:** Nenhuma porta é usada (apenas requisições HTTP)

### Problema: Relatório não gerado
**Solução:**
```bash
npx allure generate allure-results --clean --output allure-report
```

---

## 🔄 CI/CD - GitHub Actions

O arquivo `.github/workflows/playwright.yml` executa os testes automaticamente:

- Triggers: Push em `main`/`develop` e Pull Requests
- Instala Chromium
- Executa testes
- Gera relatórios Allure
- Upload dos resultados como artifacts

**Para visualizar resultados:**
1. Acesse a aba "Actions" no GitHub
2. Selecione o workflow "Playwright Tests with Allure Report"
3. Clique no job e visualize os artifacts

---

## 📂 Estrutura do Projeto

```
teste_agi_api/
├── specs/
│   ├── test-api-dog.spec.ts       # Suite de testes da Dog API
│   ├── dog-api.spec.ts             # Testes iniciais
│   └── README.md                   # Documentação de testes
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD com GitHub Actions
├── playwright.config.ts            # Configuração do Playwright
├── package.json                    # Dependências do projeto
├── .gitignore                      # Arquivos ignorados
└── playwright-report/              # Relatório HTML (gerado)
```

---

## 📌 Boas Práticas

- ✅ Sempre executar `npm ci` em CI/CD (ao invés de `npm install`)
- ✅ Usar `baseURL` para simplificar URLs das requisições
- ✅ Validar tanto status quanto conteúdo da resposta
- ✅ Testar cenários de sucesso e erro
- ✅ Usar `page.request` para testes de API (sem UI)
- ✅ Manter testes independentes e isolados

---

## 🎓 Recursos Adicionais

- [Documentação oficial Dog CEO API](https://dog.ceo/dog-api/documentation)
- [Playwright Documentation](https://playwright.dev)
- [Allure Reports](https://docs.qameta.io/allure/)

---

## 👨‍💻 Autor

QA Automation Engineer

---

## 📄 Licença

ISC

---

## 🤝 Contribuindo

Para contribuir com novos testes:

1. Criar nova branch: `git checkout -b feature/novo-teste`
2. Adicionar testes em `specs/test-api-dog.spec.ts`
3. Executar testes: `npm test`
4. Criar Pull Request

---

**Última atualização:** Abril 2026
