# Descobertas — Relatório de vendas por período (exploração autônoma)

**Ambiente:** `baseUrl` em `cypress.config.js` → `https://stage-hotfix-2.softcomshop.com.br`  
**Data da exploração:** 2026-04-13  
**Login:** funcionalidade geral → `cy.loginArmazenandoSessao()` / usuário `valid` em `cypress/fixtures/users.json` (ADR-0004).  
**Ferramenta:** navegador integrado do Cursor (MCP `cursor-ide-browser`): `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_network_requests`, `browser_wait_for`.

---

## 1. Rota e estados da página (A–D)

| Estado | Condição | URL observada (exemplo) |
|--------|-----------|------------------------|
| **A** | Carga inicial após `visit` em `/relatorio/periodo` | `.../relatorio/periodo?per_page=10` |
| **B** | Filtros “fechados” (barra sem chips de situação visíveis no snapshot) | Mesma de A; heading com texto “Nenhum filtro ativo” na área do relatório |
| **C** | Após clicar em **Filtros** | `?per_page=10`; surgem botões **Limpar todos**, **Todos**, **Aberta**, **Fechada**, **Faturada**, **Cancelada** + listagem/KPIs |
| **D** | Após filtro de situação (**Fechada**) | `.../relatorio/periodo?situacao=FECHADA&page=1` (+ `per_page` se alterado) |

**Observações:**

- A shell da página permanece em **`/relatorio/periodo`**; o conteúdo dinâmico é carregado por XHR sob **`/relatorio-v2/vendas-periodo/`** (ver seção 4).
- O snapshot de acessibilidade **não expõe** `#filter-drawer-body`, nem campos de texto explícitos para período/empresa — painel atual é orientado a **ações e query string**, não ao drawer legado documentado em `RelatoriosDrawerLocators`.

---

## 2. Mapa de UI por região (a11y + comportamento)

### 2.1 Barra superior do relatório

- **Filtros** — `role: button`, nome acessível “Filtros”.
- **Personalizar** — `role: button`.
- **PDF** / **Excel** — `role: link`, nomes “PDF” e “Excel”.

**Seletores Cypress sugeridos (texto/role, até haver IDs no DOM):**  
`cy.contains('button', 'Filtros')`, `cy.contains('a', 'PDF')`, `cy.contains('a', 'Excel')` — alinhado ao que o snapshot confirma.

### 2.2 Cabeçalho

- Dois headings **nível 1** com texto **“Relatorio Vendas por Periodo”** (grafia da UI).
- Subtítulo: “Visão detalhada das vendas realizadas no período selecionado.”

**Locator existente:** `h1.relatorio-title` em `RelatorioPeriodoLocators.js` — **revalidar no DOM** (pode haver mais de um `h1`).

### 2.3 Área de filtros (após abrir Filtros)

- **Limpar todos** — botão; ao clicar, URL passou a incluir `situacao=` vazio e manteve `page` / `per_page` (ex.: `?page=1&per_page=50&situacao=`).
- **Situação:** botões **Todos**, **Aberta**, **Fechada**, **Faturada**, **Cancelada** — clicar em **Fechada** adiciona **`situacao=FECHADA`** na query e dispara recarga dos blocos via XHR.

**Campos legados** (`#data`, `#empresa_id`, `form#form-relatorio-vendas-periodo`, `#btn-pesquisar`): **não confirmados** nesta exploração via snapshot. Possíveis próximos passos:

- Inspecionar HTML retornado por `GET .../ajax-filters` no DevTools (aba Network → Response).
- Ou `cy.visit('/relatorio/periodo')` + inspeção no Cypress (`cy.get('form')`, etc.).

### 2.4 KPIs / resumo

Após dados carregados, aparecem regiões com textos como **Venda Líquida**, **Lucro Bruto**, **Quantidade de Pedidos**, **Vendas Canceladas** e valores monetários (ex.: R$ 1.716,30).  
Útil para asserts de alto nível por **texto**, não por seletor genérico.

### 2.5 Tabela “Listagem de Vendas”

- Heading **nível 2** “Listagem de Vendas”.
- Texto de paginação: “Mostrando 1 até 10 de 45 resultados” (valores variam).
- Linhas com links para pedido (**#19100**, etc.) e **Ver Detalhes**.

**Risco:** locator genérico `table` no projeto pode colidir com outras tabelas do layout. **Recomendação:** escopar por container do relatório (classe/id obtido do HTML de `ajax-table`) ou por heading “Listagem de Vendas” + `within`.

### 2.6 Paginação

- Botões **10**, **50**, **100** (itens por página) — clicar em **50** atualizou para `per_page=50` na URL.
- Botões de página **1**, **2**, **5** (número de páginas depende do total).
- Navegação `role: navigation`, nome “Paginação”.

Query string e XHR são atualizados em conjunto ao mudar `situacao` / `per_page` / `page`.

### 2.7 Blocos secundários

- **ÚLTIMOS PEDIDOS**, **Resumo Geral** / **Resumo Geral do Período** — presentes no snapshot; asserts da “tabela principal” devem **ignorar** ou isolar esses blocos para evitar falso positivo.

---

## 3. Bundle legado (referência cruzada)

Script carregado na página: `relatorio-vendas-laravel.js` (S3). Contém lógica jQuery antiga: `#tipo`, `#situacao`, `.table`, `.vendas-pedido`, `#btn-pesquisa`, `.form-pesquisa`.  
Pode ser **legado** ou **coexistir** com a UI v2; **não substitui** a evidência do fluxo atual por XHR em `relatorio-v2/vendas-periodo`.

---

## 4. Rede (XHR)

**Padrão:** `GET` com prefixo  
`/relatorio-v2/vendas-periodo/`

| Endpoint (relativo ao host) | Momento típico | Parâmetros observados |
|----------------------------|----------------|------------------------|
| `ajax-filters` | Carga inicial; após mudança de filtros | `per_page`, `situacao`, `page`, … |
| `ajax-table` | Idem | Idem |
| `ajax-kpis` | Idem | Idem |
| `ajax-summary` | Idem | Idem |

**Exemplos reais:**

- `GET .../relatorio-v2/vendas-periodo/ajax-filters?per_page=10`
- `GET .../relatorio-v2/vendas-periodo/ajax-table?situacao=FECHADA&page=1`
- Após **Limpar todos** (com `per_page=50`): query com `situacao=` vazio (novo conjunto de XHR).

**Não foi observado** nesta sessão XHR com path `**/relatorio/periodo**` para popular a grade — intercepts do tipo `cy.intercept('GET', '**/relatorio/periodo**')` tendem a **não bater** no fluxo v2.

---

## 5. Fluxos exercitados nesta exploração

| Fluxo | Resultado |
|--------|-----------|
| Abrir **Filtros** | Exibe chips de situação + **Limpar todos**; KPIs e listagem permanecem |
| **Fechada** | URL com `situacao=FECHADA`; 4 XHR `vendas-periodo` disparados |
| **per_page = 50** | URL com `per_page=50`; mais linhas na listagem |
| **Limpar todos** | Remove valor de situação na query (`situacao=`) |
| **Período** (campo data range) | **Não exercitado** — não há ref de input no snapshot a11y |
| **PDF** / **Excel** | **Não clicado** (evitar download não solicitado); links permanecem visíveis na toolbar |

---

## 6. Locators em código: confirmados vs obsoletos / a revisar

| Item | Arquivo atual | Status |
|------|----------------|--------|
| `RELATORIO_PERIODO_ROTA` = `/relatorio/periodo` | `RelatorioPeriodoLocators.js` | **Confirmado** (shell da página) |
| `titulo` `h1.relatorio-title` | idem | **Revisar** (múltiplos `h1` / texto) |
| `filtrosContainer` `form#form-relatorio-vendas-periodo` | idem | **Não confirmado** na UI v2 explorada |
| `garantirDrawerAberto` + `#filter-drawer-body` | `RelatorioPeriodoPage` / `RelatoriosPage` | **Obsoleto** para esta tela no stage (drawer não aparece no fluxo explorado) |
| `periodoInput` `#data`, `botaoPesquisar` `#btn-pesquisar` | idem | **Não confirmados** no snapshot; validar no HTML de `ajax-filters` |
| `tabelaResultados` `table` | idem | **Frágil**; escopar à área “Listagem de Vendas” |
| Intercept `GET **/relatorio/periodo**` | `RelatorioPeriodoPage.pesquisar` | **Desalinhado** com XHR reais (`relatorio-v2/vendas-periodo`) |
| PDF/Excel por texto | snapshot | **Compatível** com `cy.contains('a', 'PDF')` |

---

## 7. Riscos para automação

- Dados e totais **dependem do ambiente** e do dia (pedidos, situação).
- Snapshot mistura regiões do **shell global** (ex.: “Pesquisa Preços”) com o relatório — seletores globais são perigosos.
- **Período** e **Pesquisar** clássicos podem ter migrado para outro UX (só query + chips); testes antigos precisam ser reescritos após inspeção do fragmento `ajax-filters`.

---

## 8. Referências internas

- Template: `docs/referencias/template-exploracao-autonoma.md`
- Locators atuais: `cypress/support/locators/Relatorios/RelatorioPeriodoLocators.js`
- Page: `cypress/support/pages/relatorios/RelatorioPeriodoPage.js`
- Arquitetura vendas: `docs/cases/architecture-relatorios-vendas.md` (seção “Descobertas UI v2 — Relatório Período”)
