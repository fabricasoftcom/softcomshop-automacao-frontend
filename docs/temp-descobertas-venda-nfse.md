# Descobertas temporárias: Venda -> Geração de NFSe

## Contexto
- **Objetivo**: criar automação para gerar NFSe a partir de uma venda, lançando o produto **"serviço a01"**.
- **BaseUrl (Cypress)**: definido em `cypress.config.js` (navegação relativa).
- **Credencial**: `cypress/fixtures/users.json` usa a chave **`validNFSe`**.

## Bloqueio na exploração autônoma (Cursor Browser MCP)
Durante a tentativa de exploração pelo browser do Cursor, o tool call via MCP retornou erro do tipo **"Unknown action"** (não aceitando argumentos).

**Consequência**: nesta implementação, os locators/ações para gerar NFSe serão construídos de forma **tolerante**, usando:
- busca por **texto visível** (ex.: “NFSe”, “NFS-e”, “Nota Fiscal de Serviço”, “Emitir”, “Gerar”)
- fallback por **IDs e padrões comuns** (ex.: `id` contendo `nfse`)
- tratamento de confirmações via **SweetAlert/Modal** por conteúdo textual (“Sim”, “Emitir”, “OK”)

## Reuso confirmado (arquivos existentes)
- Venda (cadastro):
  - `cypress/support/pages/Venda/CadastroVendaPage.js`
  - `cypress/support/locators/Venda/CadastroVendaLocators.js`
- Referência de spec:
  - `cypress/e2e/venda-nfcenfe/venda-nfe.spec.js`

## Ajuste obrigatório identificado
- `cy.loginArmazenandoSessaoNFSe()` em `cypress/support/commands.js` estava referenciando uma chave inexistente no fixture.
  - Ajustado para `user.validNFSe`.

## Próximos passos (após estabilização)
- Refinar `VendaNfseLocators` com IDs reais do ambiente (quando o navegador MCP estiver operacional ou via falhas do Cypress indicando o ponto exato).
- Remover este arquivo temporário ao final.

