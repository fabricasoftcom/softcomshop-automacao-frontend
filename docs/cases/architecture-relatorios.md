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

## Histórico de Mudanças

### Reformulação de Layout (2026-01-27)

**Principais mudanças identificadas:**

1. **Estrutura da página de relatórios gerais:**
   - **Antes:** Lista/tabela com links `<a>` diretos
   - **Depois:** Sistema de cards organizados por categorias (`.catalogo-relatorio-item`)
   - **Nova URL:** `/softcomtecnologia/relatorios-gerais`
   - **Campo de busca:** Integrado na página
   - **Seção "Últimos Acessados":** Nova funcionalidade

2. **Locators atualizados:**
   - **Antes:** `a[href*="/relatorio/periodo"]` ou XPath `//a[contains(.,'Período')]`
   - **Depois:** `.catalogo-relatorio-item[data-href*="/relatorio/periodo"]` ou XPath `//div[contains(@class, 'catalogo-nicho-items-visible')]//div[contains(@class, 'catalogo-relatorio-item')][contains(@data-href, '/relatorio/periodo')]`

3. **URLs que mudaram:**
   - **Caixa:** `/relatorio/vendas-caixa` → `/relatorio-v2/vendas-caixa`
   - **Forma Pagamento:** `/relatorio/forma-pagamento` → `/relatorio-v2/forma-pagamento`

4. **Novos relatórios adicionados:**
   - Trocas
   - Extrato Estoque
   - Preço de Venda Alterado

5. **Estrutura interna dos relatórios:**
   - Título mudou de `h5` para `h1.relatorio-title`
   - Filtros agora estão em drawer lateral (precisa clicar em "Filtros" para abrir)
   - Botões de exportação mantêm estrutura similar (PDF, Excel)

6. **Impacto nos testes:**
   - Teste principal (`relatorios.spec.js`): Atualizado para navegar diretamente para URLs (mais confiável que clicar em cards)
   - Page Objects: Método `acessarRelatorio()` atualizado para extrair URL de `data-href` e navegar diretamente
   - Locators: Todos atualizados para nova estrutura de cards
   - Fixture: XPath atualizado para buscar apenas cards visíveis (dentro de `catalogo-nicho-items-visible`)

7. **Compatibilidade backward:**
   - Métodos públicos de `RelatoriosPage` mantêm assinatura original
   - Locators exportados mantêm nomes originais
   - Specs individuais podem precisar de ajustes para abrir drawer de filtros quando necessário

### Drawer de Filtros e Date Range Picker (2026-01-28)

**Principais mudanças identificadas:**

1. **Drawer de Filtros Compartilhado:**
   - **Estrutura:** Drawer lateral (`#filter-drawer-body`) usado em múltiplos relatórios
   - **Botão de abertura:** `button.relatorio-btn:contains("Filtros")`
   - **Comportamento:** Drawer geralmente está fechado ao acessar relatório
   - **Relatórios que usam:** Período, Caixa, Forma Pagamento, Gerente de Vendas, Evolução, Exibir Estoque
   - **Locators compartilhados:** Criado `RelatoriosDrawerLocators.js`
   - **Métodos compartilhados:** Adicionados em `RelatoriosPage.js`:
     - `abrirDrawerFiltros()`: Abre drawer se estiver fechado
     - `garantirDrawerAberto(filtrosContainer)`: Garante drawer aberto e formulário visível
     - `verificarDrawerAberto()`: Verifica se drawer está aberto

2. **Date Range Picker:**
   - **Biblioteca:** Bootstrap DateRangePicker
   - **Botão:** `.btn-daterangepicker[data-label="data"]` ou similar
   - **Container:** `.daterangepicker` quando aberto
   - **Comportamento atual:** Campo `#data` aceita `type()` direto (não precisa abrir date picker)
   - **Locators adicionados:** `RelatorioPeriodoLocators.js` atualizado com locators do date picker
   - **Implementação:** Método `preencherPeriodo()` atualizado para fechar date picker se estiver aberto antes de preencher

3. **Atualizações no Relatório de Período:**
   - **Page Object:** `RelatorioPeriodoPage.js` atualizado:
     - `garantirFiltrosVisiveis()` agora usa método compartilhado `RelatoriosPage.garantirDrawerAberto()`
     - `preencherPeriodo()` atualizado para lidar com date picker (fecha se aberto, usa type() direto)
   - **Locators:** Adicionados locators do date picker
   - **Testes:** Todos os testes passando após atualizações

4. **Padrões Reutilizáveis Criados:**
   - **Locators compartilhados:** `cypress/support/locators/Relatorios/RelatoriosDrawerLocators.js`
   - **Métodos compartilhados:** `RelatoriosPage.js` (abrirDrawerFiltros, garantirDrawerAberto)
   - **Documentação:** 
     - `docs/temp-descobertas-drawer-relatorios.md` - Mapeamento completo do drawer
     - `docs/temp-descobertas-datepicker-relatorios.md` - Mapeamento completo do date picker

5. **Impacto nos testes:**
   - Testes do relatório de período atualizados e passando
   - Padrão reutilizável criado para outros relatórios que usam drawer
   - Compatibilidade mantida: métodos antigos ainda funcionam

### Novos Testes Após Pesquisa (2026-01-28)

**Principais mudanças identificadas:**

1. **Novos métodos de validação no Page Object:**
   - `validarTabelaResultados()`: Valida que tabela está visível após pesquisa
   - `validarTabelaComDados()`: Valida que tabela tem pelo menos uma linha
   - `validarEstruturaTabela()`: Valida estrutura da tabela (cabeçalho com colunas)
   - `validarBotaoExportacaoPdf()`: Valida botão PDF visível e clicável
   - `validarBotaoExportacaoExcel()`: Valida botão Excel visível e clicável
   - `validarBotoesExportacao()`: Valida ambos os botões de exportação
   - `validarMensagemSemDados()`: Valida mensagem quando não há resultados

2. **Novos locators adicionados:**
   - `cabecalhoTabela`: Cabeçalho da tabela (para validar colunas)
   - `mensagemSemDados`: Mensagens quando não há resultados
   - `containerResultados`: Container de resultados (se existir)

3. **Novos testes criados:**
   - "Deve exibir tabela de resultados após pesquisa com periodo diario"
   - "Deve exibir estrutura da tabela com colunas após pesquisa"
   - "Deve exibir botões de exportação PDF e Excel após pesquisa"
   - "Deve exibir dados na tabela quando houver resultados"

4. **Cobertura de testes:**
   - **Antes:** 2 testes (validação de filtros e pesquisa básica)
   - **Depois:** 6 testes (incluindo validação de resultados, tabela, exportação)
   - **Status:** Todos os 6 testes passando

### Atualização de Relatórios - Caixa, Forma Pagamento e Exibir Estoque (2026-01-28)

**Principais mudanças identificadas:**

1. **Atualização para usar método compartilhado do drawer:**
   - **Caixa:** `garantirFiltrosVisiveis()` atualizado para usar `RelatoriosPage.garantirDrawerAberto()`
   - **Forma Pagamento:** `garantirFiltrosVisiveis()` atualizado para usar `RelatoriosPage.garantirDrawerAberto()`
   - **Exibir Estoque:** `garantirFiltrosVisiveis()` atualizado para usar `RelatoriosPage.garantirDrawerAberto()`
   - **Locators atualizados:** Título para `h1.relatorio-title`, `filtrosContainer` para IDs específicos

2. **Novos métodos de validação após pesquisa:**
   - **Caixa:** `validarTabelaResultados()`, `validarEstruturaTabela()`, `validarBotoesExportacao()` (PDF e Imprimir 80mm)
   - **Forma Pagamento:** `validarTabelaResultados()`, `validarTabelaComDados()`, `validarEstruturaTabela()`, `validarBotoesExportacao()` (PDF e Excel)
   - **Exibir Estoque:** `validarTabelaResultados()`, `validarTabelaComDados()`, `validarEstruturaTabela()`, `validarBotoesExportacao()` (PDF e Excel)

3. **Novos locators adicionados:**
   - `cabecalhoTabela`: Cabeçalho da tabela (para validar colunas)
   - `mensagemSemDados`: Mensagens quando não há resultados
   - `containerResultados`: Container de resultados (se existir)

4. **Novos testes criados:**
   - **Caixa:** 2 novos testes (estrutura tabela, botões exportação)
   - **Forma Pagamento:** 4 novos testes (tabela, estrutura, exportação, dados)
   - **Exibir Estoque:** 4 novos testes (tabela, estrutura, exportação, dados)

5. **Cobertura de testes:**
   - **Caixa:** 5 testes → 7 testes (+2)
   - **Forma Pagamento:** 2 testes → 6 testes (+4)
   - **Exibir Estoque:** 2 testes → 6 testes (+4)

---

**Última atualização:** 2026-01-28 (drawer, date picker e novos testes após pesquisa + atualização de 3 relatórios)

