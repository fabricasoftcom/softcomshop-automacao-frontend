# Arquitetura: Incidente — Importar NFe por chave

## Objetivo

Regressão do erro 500 ao consultar/importar NFe pela chave de acesso na jornada **Compras > Importar NFe**.

**Spec:** `cypress/e2e/incidentes/ComprasImportarNFe.spec.js`  
**Chave de referência (incidente):** `26260402870737000190550010009283401601726108`  
**Origem:** `ai-reports/incidents-analysis.md`

## Estrutura de arquivos

- **Page Objects:** `CompraPage` (facade), `CompraXmlPage` — `importarNFePorChaveAcesso`
- **Locators:** `cypress/support/locators/Compra/CompraImportacaoNFeLocators.js`
- **Locators legado fluxo importação:** `cypress/support/locators/Compra/CompraLocators.js`

## Dependências

- `cy.loginArmazenandoSessao()`, `CompraPage.acessarPaginaCompra()`
- `cy.verificarErro500Visual()` ao final

## Riscos

- A chave pode não existir ou não estar disponível em todos os ambientes SEFAZ; falhas nesse caso refletem dados/ambiente, não apenas regressão de UI.

## Relacionamentos

- `architecture-cadastro-compra.md` (listagem/importação em `/compra`)

## ADRs

- ADR-0002, ADR-0003, ADR-0004, ADR-0006, ADR-0010
