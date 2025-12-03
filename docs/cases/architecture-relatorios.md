# Arquitetura dos casos de teste: Relatórios Gerais

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Relatórios Gerais**, que valida o acesso e navegação para todos os relatórios disponíveis no sistema através de um teste iterativo baseado em fixture.

**Funcionalidades cobertas:**
- Acesso a todos os relatórios do sistema
- Validação de rotas após navegação
- Validação de erros 500 visuais
- Validação de existência e visibilidade de elementos

**Cenários principais:**
- Validar todos os relatórios definidos no fixture `relatorios.json`

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/relatorio/relatorios.spec.js` - Teste de relatórios gerais

### Page Objects
- `cypress/support/pages/relatorios/RelatoriosPage.js` - Métodos para relatórios

### Fixtures
- `cypress/fixtures/relatorios.json` - Lista de relatórios para validação

### Commands
- `cypress/support/commands.js` - Comandos customizados (`cy.verificarErro500Visual()`)

---

## Imports e dependências

### Page Objects
```javascript
import RelatoriosPage from "../../support/pages/relatorios/RelatoriosPage";
```

### Fixtures
```javascript
cy.fixture('relatorios').then((data) => {
  relatoriosList = data;
});
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit('/softcomtecnologia/relatorios-gerais')` - Navegação para página de relatórios
- `cy.verificarErro500Visual()` - Verifica erros 500 visuais
- `cy.xpath()` - Seletores XPath (cypress-xpath)

---

## Estrutura do teste

### Suite: Acessar relatorios

**Tags:** `['@relatorios', '@regressivo']` (ADR-0010)

#### Hook Before

**Fluxo:**
1. Carrega fixture `relatorios.json`
2. Armazena lista de relatórios em variável

#### Tratamento de Exceções

**Configuração:**
```javascript
Cypress.on('uncaught:exception', () => {
  return false;
});
```
- Ignora exceções não capturadas (comum em páginas de relatórios)

#### `it('Deve validar os relatorios')`

**Fluxo iterativo:**
- Itera sobre cada relatório do fixture
- Para cada relatório:
  1. Log do nome do relatório
  2. Restaura sessão de login
  3. Visita página de relatórios gerais
  4. Localiza elemento via XPath
  5. Valida existência e visibilidade
  6. Clica no elemento
  7. Valida rota esperada
  8. Verifica erro 500 visual

---

## Padrões e boas práticas

### Teste Iterativo Dinâmico
- Uso de `cy.wrap().each()` para iterar sobre relatórios do fixture
- Teste único que valida múltiplos cenários
- Logs informativos para cada iteração

### Uso de Fixtures
- Lista de relatórios centralizada em `relatorios.json`
- Fácil manutenção e adição de novos relatórios
- Estrutura: `relatorioName`, `relatorioElement` (XPath), `relatorioURL`

### Restauração de Sessão
- Uso de `cy.loginArmazenandoSessao()` antes de cada navegação
- Garante que usuário está logado

### Seletores XPath
- Uso de XPath para localizar elementos de relatórios
- Flexibilidade para elementos complexos

### Tratamento de Exceções
- Ignora exceções não capturadas
- Comum em páginas de relatórios que podem ter JavaScript errors

### Validação de Rotas
- Validação de URL após cada navegação
- Garante que rota correta foi acessada

### Validação de Erros
- Verificação de erros 500 visuais após cada navegação
- Garante que página carregou sem erros críticos

### Tags aplicadas
- `@relatorios` - Identifica módulo
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### RelatoriosPage

**Navegação:**
- `acessarMenuRelatorios()` - Acessa menu de relatórios via menu lateral

**Acessar relatórios específicos:**
- `acessarRelatorio(linkLocator)` - Acessa relatório genérico
  - Acessa menu de relatórios
  - Clica no link especificado
  - Intercepta requisição GET `/relatorio/*`

**Métodos específicos (não usados no teste atual):**
- Vendas: `acessarRelatorioVendasPeriodo()`, `acessarRelatorioVendasMaisVendidos()`, etc.
- Notas Fiscais: `acessarRelatorioNotasFiscaisSaidaAnalitico()`, etc.
- Financeiro: `acessarRelatorioFinanceiroCaixa()`, etc.
- Produtos: `acessarRelatorioProdutosExibirEstoque()`, etc.
- Clientes: `acessarRelatorioClientesAniversariantes()`, etc.

**Validações:**
- `validateRoute(expectedUrl)` - Valida que URL contém rota esperada

---

## Estrutura de Fixture

### relatorios.json

```json
[
  {
    "relatorioName": "Período",
    "relatorioElement": "//a[contains(@href,'relatorio/periodo')]",
    "relatorioURL": "/relatorio/periodo"
  },
  {
    "relatorioName": "Mais Vendidos",
    "relatorioElement": "//a[contains(.,'Mais Vendidos')]",
    "relatorioURL": "/relatorio/mais-vendido"
  }
]
```

**Estrutura:**
- `relatorioName` - Nome do relatório (para logs)
- `relatorioElement` - XPath do elemento do relatório
- `relatorioURL` - Rota esperada após navegação

**Categorias de relatórios:**
- Vendas (Período, Mais Vendidos, Forma Pagamento, Gerente Vendas, Evolução, Comissão)
- Notas Fiscais (Saída Analítico/Sintético, Entrada Analítico/Sintético, PIS/COFINS, NFSe)
- Financeiro (Caixa, Contas a Receber, Contas a Pagar, Projeção Cartões)
- Produtos (Exibir Estoque, Tabela Preço, Ficha Estoque, Inventário, NCM, Movimentação Estoque)
- Clientes (Aniversariantes, Dados Clientes, Últimas Compras)

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-relatorio-caixa.md` - Documentação de relatório de caixa
- `docs/adr/` - Architecture Decision Records

---

## Observações

- Teste iterativo que valida todos os relatórios do fixture
- Restaura sessão antes de cada navegação para garantir login
- Validação de rotas garante navegação correta
- Verificação de erros 500 garante que páginas carregaram sem erros
- Uso de XPath para flexibilidade em seletores
- Tratamento de exceções para evitar falhas por JavaScript errors
- Fixture centralizado facilita manutenção

---

## Fluxo de Validação

```
Carregar fixture relatorios
    ↓
Para cada relatório:
    ↓
Restaurar sessão
    ↓
Visitar página de relatórios
    ↓
Localizar elemento (XPath)
    ↓
Validar existência e visibilidade
    ↓
Clicar no elemento
    ↓
Validar rota
    ↓
Verificar erro 500
```

---

**Última atualização:** 2024-12-19

