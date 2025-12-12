# Arquitetura dos casos de teste: Relatórios de Vendas

## Objetivo

Este documento descreve a arquitetura dos testes relacionados aos **Relatórios de Vendas**, que validam a geração e visualização de 6 relatórios do módulo de vendas.

**Relatórios cobertos:**
- Período
- Mais Vendidos
- Forma Pagamento
- Gerente de Vendas
- Evolução
- Comissão

**Funcionalidades cobertas:**
- Acesso aos relatórios
- Validação de elementos básicos (filtros, botões)
- Pesquisa com período diário
- Validação de resultados e erros 500

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/relatorio/relatorio-periodo.spec.js` - Teste de relatório de período
- `cypress/e2e/relatorio/relatorio-mais-vendidos.spec.js` - Teste de relatório de mais vendidos
- `cypress/e2e/relatorio/relatorio-forma-pagamento.spec.js` - Teste de relatório de forma de pagamento
- `cypress/e2e/relatorio/relatorio-gerente-vendas.spec.js` - Teste de relatório de gerente de vendas
- `cypress/e2e/relatorio/relatorio-evolucao.spec.js` - Teste de relatório de evolução
- `cypress/e2e/relatorio/relatorio-comissao.spec.js` - Teste de relatório de comissão

### Page Objects
- `cypress/support/pages/relatorios/RelatorioPeriodoPage.js`
- `cypress/support/pages/relatorios/RelatorioMaisVendidosPage.js`
- `cypress/support/pages/relatorios/RelatorioFormaPagamentoPage.js`
- `cypress/support/pages/relatorios/RelatorioGerenteVendasPage.js`
- `cypress/support/pages/relatorios/RelatorioEvolucaoPage.js`
- `cypress/support/pages/relatorios/RelatorioComissaoPage.js`
- `cypress/support/pages/relatorios/RelatoriosPage.js` - Métodos gerais de relatórios

### Locators
- `cypress/support/locators/Relatorios/RelatorioPeriodoLocators.js`
- `cypress/support/locators/Relatorios/RelatorioMaisVendidosLocators.js`
- `cypress/support/locators/Relatorios/RelatorioFormaPagamentoLocators.js`
- `cypress/support/locators/Relatorios/RelatorioGerenteVendasLocators.js`
- `cypress/support/locators/Relatorios/RelatorioEvolucaoLocators.js`
- `cypress/support/locators/Relatorios/RelatorioComissaoLocators.js`

---

## Imports e dependências

### Page Objects
```javascript
import RelatorioPeriodoPage from "../../support/pages/relatorios/RelatorioPeriodoPage";
```

### Locators
```javascript
import RelatorioPeriodoLocators from "../../support/locators/Relatorios/RelatorioPeriodoLocators";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit('/')` - Navegação para página inicial
- `cy.verificarErro500Visual()` - Verifica erros 500 visuais

---

## Estrutura do teste

### Padrão comum para todos os relatórios

**Tags:** `['@relatorios', '@vendas', '@[nome-relatorio]', '@regressivo']` (ADR-0010)

#### `beforeEach`
1. Login com `cy.loginArmazenandoSessao()`
2. Visita página inicial
3. Acessa relatório específico
4. Garante filtros visíveis

#### `it('Deve exibir os filtros e acoes disponiveis')`
1. Valida elementos básicos (título, filtros, botões)

#### `it('Deve permitir pesquisar com periodo diario')`
1. Preenche período com data atual
2. Valida período preenchido
3. Pesquisa
4. Valida URL
5. Verifica erro 500 visual

---

## Padrões e boas práticas

### Formatação de Data/Hora
- Função auxiliar `formatDateTime()` para formatar data e hora
- Formato: `DD/MM/YYYY HH:mm:ss`
- Uso de `zeroPad()` para garantir 2 dígitos

### Validação de Intercept
- Uso de `cy.intercept()` para interceptar requisição
- Validação de status code (200 ou 302)
- Alias específico por relatório

### Validação de Erros
- Uso de `cy.verificarErro500Visual()` após cada pesquisa
- Garante que página carregou sem erros críticos

### Tags aplicadas
- `@relatorios` - Identifica módulo
- `@vendas` - Identifica grupo de relatórios
- `@[nome-relatorio]` - Identifica relatório específico
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### Padrão comum

**Navegação:**
- `acessarRelatorio[Nome]()` - Acessa relatório via `RelatoriosPage` e valida URL

**Utilitários:**
- `garantirFiltrosVisiveis()` - Garante que filtros estão visíveis

**Validações:**
- `validarElementosBasicos()` - Valida elementos básicos (título, filtros, botões)

**Preenchimento:**
- `preencherPeriodo(dataInicial, dataFinal)` - Preenche período no formato "DD/MM/YYYY HH:mm:ss - DD/MM/YYYY HH:mm:ss"

**Ações:**
- `pesquisar()` - Clica em pesquisar, intercepta requisição e valida status code

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas
- **ADR-0011:** Use Conditional Intercepts - Intercept condicional usado

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-relatorio-caixa.md` - Documentação de relatório de caixa (padrão)
- `docs/adr/` - Architecture Decision Records

---

**Última atualização:** 2025-01-XX

