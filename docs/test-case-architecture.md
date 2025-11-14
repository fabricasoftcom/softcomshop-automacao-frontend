# Arquitetura dos casos de teste

Este documento descreve os padrões, dependências e classes que devem ser usados ao criar novos testes Cypress neste repositório. Use-o como checklist para manter consistência, reuso e observabilidade em todas as suites.

## 1. Estrutura esperada do caso
1. **Objetivo claro**: descreva o comportamento testado, o fluxo principal e os critérios de sucesso.
2. **Importações organizadas**:
   - Page Objects (`cypress/support/pages/...`).
   - Locators (`cypress/support/locators/...`) se necessário diretamente.
   - Fixtures (`cypress/fixtures/...`) para dados.
   - Commands (`cy.loginArmazenandoSessao()`, `cy.login`, etc.).
3. **Defina hooks usados**:
   - `beforeAll` / `beforeEach` para login, setup e navegação. Sempre inclua `cy.visit('/')` logo após o comando de login para garantir que o ponto inicial da aplicação esteja carregado antes dos passos seguintes.
   - `afterEach` para limpeza de dados ou garantir que o teste falhou se algum monitor capturar erro (hooks genéricos já existentes em `support/e2e.js`).
4. **Teste principal**: log de steps (navegação → preenchimento → submissão → validação).
5. **Assertivas**: confirme toasts, estados do DOM, resposta da API quando disponível.

## 1.5. Registro no `specPattern`
- Qualquer novo spec deve ser adicionado ao `specPattern` no `cypress.config.js` para manter a sequência prevista e permitir filtragem via `grep`. Atualize o comentário/filtro correspondente (por exemplo `// sped` → `// sped` e o caminho relativo) logo após o bloco lógico onde o novo spec pertence.

## 2. Dependências principais
- Cypress 13+ com plugins carregados em `cypress/support/e2e.js`: `allure-cypress`, `@shelex/cypress-allure-plugin`, `@percy/cypress`, `cypress-xpath`, `@cypress/grep`.
- Fixtures de dados (`cypress/fixtures/users.json`, `formasPagamento.json`, etc.).
- Helpers e comandos personalizados (`cypress/support/commands.js`) que centralizam login (`cy.loginArmazenandoSessao`, `cy.loginRestoreSession`), navegação de menus (`cy.clicarMenu`, `cy.expandirClicarMenuUmNivel`), e validações (`cy.verificarErro500Visual`).
- Especificações registradas no `specPattern` de `cypress.config.js` para garantir ordem de execução (começando pelo setup `_beforeConfigPadrao.spec.js`).
- Plugins para relatórios (Allure) e visual testing (Percy) usados em pipelines e `npm run e2e`.

## 3. Classes e Page Objects
- Cada página crítica possui classe em `cypress/support/pages`. Ao criar nova classe:
  - Use nomes PascalCase e métodos verbos (ex.: `preencherFormulario`, `clicarSalvar`).
  - Importe os locators específicos (`cypress/support/locators/...`).
  - Centralize waits sensíveis e seletores complexos dentro das classes para evitar duplicação nos specs.
- Exemplos existentes:
  - `Financeiro/NovaReceitaPage.js`, `ListagemContasAReceberPage.js`
  - `Balanco/BalancoPage.js`
  - `menulateral/menulateralfinanceiropage.js`, `menulateral/menulateralprodutopage.js`
- `locators` definem strings CSS/XPath reutilizadas por várias classes para diminuir acoplamento direto ao DOM.

## 4. Padrões de implementação
- Evite ganchos desnecessários e mantenha cada `it` com foco único. Separe cenários de sucesso/erro em specs distintos quando possível.
- Use `cy.session` via `cy.loginArmazenandoSessao()` para acelerar autorizações em suites longas.
- Fixtures e dados dinâmicos (timestamp, valores aleatórios) previnem conflitos e garantem isolamento.
- Valide carregamentos com `cy.get('#loading').should('not.exist')` ou esperas nos toasts.
- Ao lidar com SweetAlert, aguarde o modal ficar visível antes de interagir (ex.: `cy.get('.sweet-alert').should('be.visible').wait(800)`) e prefira encapsular essa lógica nos Page Objects.
- Para os modais nativos do Softcomshop (ex.: desconto/acréscimo, formas de pagamento), aguarde explicitamente todos os elementos internos estarem visíveis antes de preencher ou clicar, e após confirmar a ação use um `cy.wait` curto + validação de fechamento (o DOM pode ser recarregado e remover o modal imediatamente).
- Documente tags importantes no `describe` ({ tags: ['@financeiro', '@regressivo', ...] }) para facilitar execução com `@cypress/grep`.

## 5. Hooks e monitoramento comuns
- `cypress/support/e2e.js` já intercepta erros 500 e lança falhas quando detectados via `cy.on` / `cy.intercept`.
- Sempre herdado por novos specs (não sobrescrever o arquivo, mas chame `import './commands';` se for um setup separado).
- Use `beforeEach` para resetar estados, mas evite `afterEach` com comandos longos que possam mascarar falhas reais.

## 6. Integração contínua e evidências
- Resultados vão para `allure-results`; use `npm run report:allure` para gerar e abrir `allure-report`.
- Screenshots e vídeos vão para `cypress/screenshots` e `cypress/videos` quando ativados (geralmente via CI).
- Mantenha `docs/testes.md` e `docs/cases/architecture-nova-receita.md` atualizados com novos specs e fluxos.

## Próximos passos para novos testes
1. Crie um novo spec em `cypress/e2e/...` seguindo o template acima.
2. Adicione Page Object/locator se o fluxo exigir interações repetidas.
3. Registre o spec no `specPattern` se precisar de ordem específica.
4. Quando houver fluxos derivados (por exemplo, reaproveitar um cadastro base para validar abas ou modais adicionais), encapsule o setup comum em helpers do Page Object e crie `its` que apenas estendam esse fluxo.
5. Documente detalhes em `docs/cases/architecture-<nome-do-spec>.md` usando o formato já aplicado para `novaReceita` e `balanco`.
