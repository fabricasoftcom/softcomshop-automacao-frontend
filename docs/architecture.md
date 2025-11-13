# Arquitetura do Projeto

## Visao geral
- Este repositório concentra suites de testes ponta a ponta para o Softcomshop, escritas com Cypress 13+. Os cenarios seguem o padrao Page Object / locators para manter testes legiveis e resilientes a mudancas na interface.
- A automacao e composta de estruturas de suporte (pages, locators, factory) que se conectam a `cypress/e2e` por meio de comandos personalizados e fixtures compartilhadas.
- Resultados sao exportados para Allure (`allure-results` e `allure-report`), com opcional de testes em navegadores especificos (Chrome, Firefox) e visual checks com Percy quando necessario.

## Estrutura de diretorios
- `cypress/e2e`: especificacoes organizadas por modulo (login, financeiro, compras, relatorios, etc). O `specPattern` do `cypress.config.js` garante a ordem de execucao e inclui um setup inicial em `setup/_beforeConfigPadrao.spec.js`.
- `cypress/support/pages`: classes Page Object com logica de interacao. Cada pagina expõe metodos de preenchimento, clique e validacao reutilizaveis.
- `cypress/support/locators`: arquivos que concentram seletores. Permitem atualizar apenas esses arquivos quando o DOM mudar, mantendo o mesmo metodo dos Page Objects.
- `cypress/support/factory`: fabricas de dados (usuarios, produtos, etc) construidas com Faker para gerar recursos dinamicos nos testes.
- `cypress/support/commands.js`: adiciona comandos utilitarios (login padrao, login com sessao, selecoes no menu lateral, validacoes de telas, configuracao do sistema). Esses comandos sao importados automaticamente em `support/e2e.js`.
- `cypress/support/e2e.js`: carrega plugins (Allure, cypress-xpath, Percy, cypress-grep) e define ganchos globais (`beforeEach`, `afterEach`) que interceptam erros HTTP 500 e forcam falha caso detectem problemas.
- `cypress/fixtures`: dados de teste estaticos (ex: `users.json`) usados por `cy.fixture` nas fabricas e nos comandos.
- `docs`: documentos de apoio, incluindo esse arquivo, o inventario de testes (`docs/testes.md`), os casos específicos dentro de `docs/cases/` e o README principal com o passo a passo de configuracao.
- `allure-results` e `allure-report`: pasta de saidas com evidencia e relatorios gerados apos execucao.

## Configuracoes principais
- `cypress.config.js` define `baseUrl` (`https://stage-release.softcomshop.com.br`), `viewport` 1366x768 e `defaultCommandTimeout` estendido para 50s, garantindo estabilidade em ambientes lentos.
- Em `setupNodeEvents` sao registrados os plugins `allure-cypress` e `@cypress/grep` e retornado o config atualizado, permitindo filtro de especificacoes via `grep`.
- `testIsolation: false` preserva estados entre testes quando necessario, e `experimentalStudio: true` facilita criacao rapida de testes.

## Fluxos de execucao
- Scripts npm (`package.json`) padronizam comandos:
  - `npm run e2e`: executa Cypress com Allure habilitado.
  - `npm run test:chrome|test:firefox`: forca execucao em navegador especifico.
  - `npm run test:all`: encadeia os dois navegadores.
  - `npm run test:allure`: gera e abre o relatorio Allure apos os testes.
  - `npm run lint` e `npm run lint-html`: validam o padrao ESLint em todo o codigo.
- O README principal descreve o setup completo (instalacao do Node, `npm install`, `npx cypress run/open`).

## Fluxo de dados
- Suites e comandos reutilizam fixtures/fabricas para representar entidades (usuario, produto, cliente). As fabricas importam `@faker-js/faker` para preservar variabilidade e evitar registros duplicados.
- Os testes usam o plugin `cy.session` para criar sessao logada (`loginRestoreSession`, `loginArmazenandoSessao`), acelerando suites longas.
- Hooks globais em `support/e2e.js` interceptam erros de servidor e forcam falhas, garantindo que falhas de infraestrutura nao passem despercebidas.

## Relatorios e evidencias
- `allure-results`: cada execucao populada com metadados, suites, steps e anexos (logs, screenshots). O comando `npm run report:allure` gera o HTML em `allure-report` e abre em `localhost`.
- A pasta `cypress/screenshots` recebe imagens de falhas e verificacoes manualmente disparadas pelos testes.
- `cypress/reports` e `allure-results` podem ser integradas em pipelines CI para publicacao automatica.

## Proximos passos recomendados
1. Manter `docs/testes.md` sincronizado com os novos specs e suites adicionadas em `cypress/e2e`.
2. Atualizar `cypress/support/pages` e `locators` quando a interface sofrer refinamentos para evitar flakiness.
3. Explorar `Percy` e `@percy/cypress` para cobertura visual adicional em telas criticas.
4. Sempre criar um documento em `docs/cases/` para novos specs importantes (atributos, grupos, sintegra, etc.), mantendo a arquitetura detalhada e atualizada.
