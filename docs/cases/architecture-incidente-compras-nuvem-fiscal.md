# Arquitetura: Incidente — Nuvem Fiscal (acesso e pesquisa)

## Objetivo

Regressão do incidente de falha ao acessar/consultar notas na Nuvem Fiscal (erro de host/DNS ou 500). Garante que a listagem carrega, a pesquisa executa e a UI não exibe página de erro.

**Spec:** `cypress/e2e/incidentes/ComprasEestoqueNuvemFiscal.spec.js`  
**Origem do cenário:** `ai-reports/incidents-analysis.md`

## Estrutura de arquivos

- **Page Object:** `cypress/support/pages/NuvemFiscal/NuvemFiscalListagemPage.js` — método `validarAcessoEPesquisaSemFalhaCritica`
- **Locators:** `cypress/support/locators/NuvemFiscal/NuvemFiscalListagemLocators.js`
- **Menu:** `cypress/support/pages/menulateral/MenulateralProdutoPage.js` — `acessarListagemNuvemFiscal`

## Dependências

- `cy.loginArmazenandoSessao()`, `cy.visit('/')`
- `cy.verificarErro500Visual()`
- `cy.intercept` opcional para respostas `< 500` em URLs contendo `azurewebsites.net` ou `nuvemfiscal`

## Relacionamentos

- Documentação correlata: `architecture-nuvem-fiscal.md`
- Spec funcional próximo: `cypress/e2e/compras/importacao-compra-nuvem-fiscal.spec.js`

## ADRs

- ADR-0002, ADR-0003, ADR-0004, ADR-0006, ADR-0010
