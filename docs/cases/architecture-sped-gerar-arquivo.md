# Arquitetura do caso de teste: `sped/gerarArquivo.spec.js`

## Objetivo
- Validar a geração do arquivo SPED pelo menu Fiscal > SPED > Gerar Arquivo, assegurando que inventário e valor informado estejam ativos e que a requisição para `/sped/arquivo` seja bem-sucedida.

## Importações e dependências
- `GerarArquivoPage` em `cypress/support/pages/Sped` encapsula a navegação no menu fiscal, a manipulação de switches e o clique no botão gerar.
- Locators em `cypress/support/locators/Sped/SpedGerarArquivoLocators.js` mantém os seletores críticos (período, tipo, switches e botão).
- Hooks e plugins definidos em `support/e2e.js` (Allure, Percy, `@cypress/grep`) continuam ativos, e o comando `cy.loginArmazenandoSessao()` fornece sessão logada e persistente.
- O spec está registrado no `specPattern` de `cypress.config.js` para seguir a ordem da suíte e ser executado nos pipelines.

## Estrutura do teste
1. `beforeEach` faz login (`cy.loginArmazenandoSessao()`), chama `cy.visit('/')` para restabelecer o estado inicial e acessa o fluxo via `GerarArquivoPage.acessarViaMenu()`.
2. O `it` intercepta `GET /sped/arquivo*`, preenche período e tipo, ativa inventário e informar valor, define o valor do inventário e posiciona o switch de retificação.
3. Chama `GerarArquivoPage.gerarArquivo()` e aguarda `cy.wait("@gerarArquivo")` com status 200, garantindo que a API respondeu com sucesso.

## Boas práticas
- Page Object centraliza interações complexas (menus, switches) e deixa o spec focado em validações.
- O método `setToggleState` garante toggles coerentes mesmo se a UI estiver em estado inesperado.
- Tags `@sped` e `@regressivo` no `describe` permitem executar o caso isolado via `@cypress/grep`.
- `cy.intercept` confirma a chamada de backend em vez de depender exclusivamente de elementos visuais.

## Integração com a arquitetura global
- Registrado em `specPattern` do `cypress.config.js`, respeitando as configurações de timeout, viewport e `testIsolation`.
- Hooks globais em `support/e2e.js` continuam checando erros 500 e força a falha quando aparecem.
- Relatórios Allure e evidências (screenshots, vídeos) seguem o mesmo pipeline; agregar o caso aos relatórios permite acompanhar automatizações fiscais.
- Documentado em `docs/test-case-architecture.md` para ilustrar o padrão aplicado a um novo spec.

## Sugestões para evolução
1. Validar o toast de sucesso ou o estado do switch após a geração para ter feedback visual explícito.
2. Criar variantes com `retificar SPED` ativado ou o tipo `CONTRIBUICOES`.
3. Registrar o período e o tipo no Allure como attachment para facilitar análises de regressões.
