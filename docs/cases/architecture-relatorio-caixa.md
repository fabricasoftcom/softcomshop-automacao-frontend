# Arquitetura dos casos de teste: Relatório de Caixa

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Relatório de Caixa**, que valida a geração e visualização de relatórios de caixa com diferentes tipos (analítico e sintético), períodos e turnos.

**Funcionalidades cobertas:**
- Acesso ao relatório de caixa
- Validação de elementos básicos (filtros, botões)
- Pesquisa com período diário e turnos
- Geração de relatório sintético
- Geração de relatório analítico
- Validação de resultados e totalizadores

**Cenários principais:**
- Exibir filtros e ações disponíveis
- Pesquisar relatório com período diário e diferentes turnos (1-6)
- Gerar relatório sintético
- Pesquisar período atual sem turno e exibir dados
- Listar vendas no relatório analítico sem turno

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/relatorio/relatorio-caixa.spec.js` - Teste de relatório de caixa

### Page Objects
- `cypress/support/pages/relatorios/RelatorioCaixaPage.js` - Métodos para relatório de caixa
- `cypress/support/pages/relatorios/RelatoriosPage.js` - Métodos gerais de relatórios

### Locators
- `cypress/support/locators/RelatorioCaixaLocators.js` - Seletores do relatório de caixa

---

## Imports e dependências

### Page Objects
```javascript
import RelatorioCaixaPage from "../../support/pages/relatorios/RelatorioCaixaPage";
```

### Locators
```javascript
import RelatorioCaixaLocators from "../../support/locators/RelatorioCaixaLocators";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit('/')` - Navegação para página inicial
- `cy.verificarErro500Visual()` - Verifica erros 500 visuais

---

## Estrutura do teste

### Suite: Relatorio de Caixa

**Tags:** `['@relatorios', '@caixa', '@regressivo']` (ADR-0010)

#### `it('Deve exibir os filtros e acoes disponiveis para o relatorio de Caixa')`

**Fluxo:**
1. Acessa relatório de caixa
2. Garante que filtros estão visíveis
3. Valida elementos básicos (título, filtros, botões)

---

#### `it('Deve permitir pesquisar o relatorio de Caixa com periodo diario')`

**Fluxo:**
1. Seleciona tipo "analítico"
2. Preenche período com data atual (00:00:00 - 23:59:59)
3. Itera sobre turnos 1-6:
   - Preenche turno
   - Pesquisa
   - Valida URL contém `/relatorio/vendas-caixa`
   - Verifica erro 500 visual

---

#### `it('Deve gerar o relatorio de Caixa do tipo sintetico')`

**Fluxo:**
1. Seleciona tipo "sintético"
2. Valida tipo selecionado
3. Preenche período (ontem 00:00:00 - hoje 23:59:59)
4. Valida período preenchido
5. Pesquisa
6. Valida URL contém `/relatorio/vendas-caixa`
7. Verifica erro 500 visual

---

#### `it('Deve pesquisar o periodo atual sem turno e exibir dados em tela')`

**Fluxo:**
1. Seleciona tipo "sintético"
2. Preenche período com data atual
3. Limpa campo turno
4. Valida campo turno vazio
5. Pesquisa
6. Valida totalizadores visíveis
7. Valida tabela presente
8. Verifica erro 500 visual

---

#### `it('Deve listar vendas no relatorio analitico sem informar turno')`

**Fluxo:**
1. Seleciona tipo "analítico"
2. Valida tipo selecionado
3. Preenche período com data atual
4. Limpa campo turno
5. Valida campo turno vazio
6. Pesquisa
7. Valida tabela de resultados visível
8. Valida cabeçalho contém "Pedido", "Vendedor", "Cliente"
9. Valida linhas da tabela (pelo menos 1)
10. Valida tabela contém "Pagamento"
11. Verifica erro 500 visual

---

## Padrões e boas práticas

### Formatação de Data/Hora
- Função auxiliar `formatDateTime()` para formatar data e hora
- Formato: `DD/MM/YYYY HH:mm:ss`
- Uso de `zeroPad()` para garantir 2 dígitos

### Teste Iterativo
- Uso de `Cypress._.range(1, 7)` para iterar sobre turnos
- Testa múltiplos cenários em um único teste

### Validação de Intercept
- Uso de `cy.intercept()` para interceptar requisição
- Validação de status code (200 ou 302)
- Uso de alias `@relatorioCaixa`

### Validação de Erros
- Uso de `cy.verificarErro500Visual()` após cada pesquisa
- Garante que página carregou sem erros críticos

### Validação de Resultados
- Validação de totalizadores visíveis
- Validação de tabela com dados
- Validação de cabeçalhos e conteúdo

### Tags aplicadas
- `@relatorios` - Identifica módulo
- `@caixa` - Identifica funcionalidade específica
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### RelatorioCaixaPage

**Navegação:**
- `acessarRelatorioCaixa()` - Acessa relatório via `RelatoriosPage` e valida URL

**Utilitários:**
- `garantirFiltrosVisiveis()` - Garante que filtros estão visíveis (expande se necessário)

**Validações:**
- `validarElementosBasicos()` - Valida todos os elementos básicos:
  - Título do relatório
  - Tipo (select)
  - Empresa (select)
  - Vendedor (autocomplete)
  - Dispositivo (autocomplete)
  - Usuário caixa (autocomplete)
  - Turno (input)
  - Período (input)
  - Botões (pesquisar, gerar PDF, imprimir 80mm)

**Preenchimento:**
- `selecionarTipo(tipoValue)` - Seleciona tipo (analítico/sintético)
- `preencherPeriodo(dataInicial, dataFinal)` - Preenche período no formato "DD/MM/YYYY HH:mm:ss - DD/MM/YYYY HH:mm:ss"
- `preencherTurno(turno)` - Preenche turno

**Ações:**
- `pesquisar()` - Clica em pesquisar, intercepta requisição e valida status code

---

## Locators utilizados

### RelatorioCaixaLocators

**Elementos básicos:**
- `filtrosContainer` - Container de filtros
- `botaoToggleFiltros` - Botão para expandir/recolher filtros
- `tipoSelect` - Select de tipo
- `empresaSelect` - Select de empresa
- `vendedorAutocomplete` - Autocomplete de vendedor
- `dispositivoAutocomplete` - Autocomplete de dispositivo
- `usuarioCaixaAutocomplete` - Autocomplete de usuário caixa
- `turnoInput` - Input de turno
- `periodoInput` - Input de período
- `botaoPesquisar` - Botão pesquisar
- `botaoGerarPdf` - Botão gerar PDF
- `botaoImprimir80mm` - Botão imprimir 80mm

**Resultados:**
- `tabelaResultados` - Tabela de resultados
- `linhasTabelaResultados` - Linhas da tabela de resultados
- `totalizadoresContainer` - Container de totalizadores
- `blocoCabecalhoPedido` - Cabeçalho do pedido

---

## Função Auxiliar

### formatDateTime(date, time)

Função que formata data e hora:

```javascript
const formatDateTime = (date, time) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year} ${time}`;
};
```

**Uso:**
- `formatDateTime(hoje, '00:00:00')` - Data atual às 00:00:00
- `formatDateTime(hoje, '23:59:59')` - Data atual às 23:59:59
- `formatDateTime(ontem, '00:00:00')` - Ontem às 00:00:00

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
- `docs/cases/architecture-relatorios.md` - Documentação de relatórios gerais
- `docs/adr/` - Architecture Decision Records

---

## Observações

- Teste iterativo para validar múltiplos turnos
- Validação de intercept para garantir requisição bem-sucedida
- Verificação de erros 500 após cada pesquisa
- Validação de resultados (tabelas, totalizadores)
- Formatação de data/hora customizada
- Suporte a relatórios analítico e sintético

---

**Última atualização:** 2024-12-19

