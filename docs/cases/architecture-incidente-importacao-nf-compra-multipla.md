# Arquitetura: Incidente — Importação múltipla de NF de compra + XML

## Objetivo

Regressão do erro 500 ao importar a segunda NF de compra e ao importar pelo XML em sequência.

**Spec:** `cypress/e2e/incidentes/ImportacaoNfCompra.spec.js`  
**Origem:** `ai-reports/incidents-analysis.md`

## Estrutura de arquivos

- **Page Object:** `cypress/support/pages/Compra/CompraPage.js` — `importarNFePorXML`, `acessarPaginaCompra`
- **Task:** `listarXMLs` em `cypress.config.js` (fixtures `cypress/fixtures/comprasxml`)

## Fluxo do teste

1. Obtém pelo menos dois nomes de XML via `cy.task('listarXMLs')` (senão `skip`).
2. Importa o primeiro XML, valida ausência de erro 500 visual.
3. Volta à listagem `/compra`, importa o segundo XML, valida.
4. Terceira passagem por XML (reuso do primeiro arquivo; fluxo interno trata duplicidade quando aplicável).

## Relacionamentos

- `architecture-cadastro-compra.md`
- Spec de referência: `cypress/e2e/compras/cadastro-compra-xml.spec.js`

## ADRs

- ADR-0002, ADR-0003, ADR-0004, ADR-0006, ADR-0010
