# Arquitetura: Incidente 85857 — NFe FCPST / XML FCP

## Objetivo

Regressão do incidente **85857**: emissão de NFe em **Vendas > NFe** sem rejeição por divergência/duplicidade de **FCPST** no XML; na etapa **Finalizar**, conferência do **Total da nota** no cabeçalho (o painel `#content-finish-step` costuma exibir só o fluxo de emissão); após **autorização**, **Download XML** em **Mais ações** e validação de **tags FCP com valores** no XML retornado (confirmação principal do FCP).

**Spec:** `cypress/e2e/incidentes/85857-NFeFCPSTDuplicidade.spec.js`  
**Dados de ambiente:** destinatário de busca `cliente fcp`, produto `Produto fcp` (fixture `cypress/fixtures/incidents/85857-nfe-fcpst.json`).  
**Origem:** `ai-reports/incidents-analysis.md`

## Estrutura de arquivos

- **Page Objects:** `CadastroNfeNormalPage` (facade), `CadastroNfeBasePage` — `validarResumoEmissaoExibeFcpSt`, `validarXmlAutorizadaPorMaisAcoesContemCamposFcp`, `selecionarProdutoPorNome`, `adicionarItem`, `aguardarTelaEdicaoNfeCarregada`
- **Locators:** `cypress/support/locators/Venda/CadastroNfeLocators.js` — `resumoEmissao.painel` (`#content-finish-step`)
- **Utilitário:** `cypress/support/utils/nfeXmlFcpAsserts.js` — `assertNfeXmlPossuiTagsFcpComNumeros`
- **Listagem:** `ListagemNfePage` — pós-emissão e `abrirEdicaoPrimeiraLinha`

## Dependências

- `cy.login()` (NFe fiscal)
- Cadastros `cliente fcp` e `Produto fcp` disponíveis no ambiente de testes
- Resposta `GET` `**/nfe2/**/baixar-xml*` com corpo XML (texto) interceptável pelo Cypress

## Riscos

- Homologação/SEFAZ e dados cadastrais: falhas de autorização ou ausência de tags FCP refletem ambiente ou parametrização fiscal, não só regressão de UI.
- Se o modal SweetAlert de sucesso (autorizada / emitida com sucesso) não aparecer após **Emitir nota**, o spec falha no timeout de `validarModalSucessoEmissao` — revisar credenciais, série, certificado e resposta da SEFAZ no ambiente.
- A primeira linha da listagem após emissão é assumida como a nota recém-autorizada (ordenção usual por data).

## Relacionamentos

- `architecture-cadastro-nfe-normal.md`
- `architecture-cadastro-nfe-dropdown-acoes.md` (Mais ações / Download XML)

## ADRs

- ADR-0002, ADR-0003, ADR-0004, ADR-0006, ADR-0010
