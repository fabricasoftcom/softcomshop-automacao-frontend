# Arquitetura do Projeto

## Architecture Decision Records (ADRs)

Este projeto utiliza **Architecture Decision Records (ADRs)** para documentar decisões arquiteturais importantes. Para contexto completo e justificativas, consulte [docs/adr/README.md](./adr/README.md).

**ADRs principais:**
- [ADR-0002](./adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](./adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](./adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0005](./adr/0005-use-allure-for-test-reporting.md): Allure Reporting
- [ADR-0006](./adr/0006-mandatory-documentation-for-new-tests.md): Mandatory Documentation
- [ADR-0007](./adr/0007-separate-specs-by-functionality-and-type.md): Separate Specs
- [ADR-0008](./adr/0008-use-page-object-hierarchy.md): Page Object Hierarchy
- [ADR-0009](./adr/0009-use-faker-for-dynamic-test-data.md): Faker for Dynamic Data
- [ADR-0010](./adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0011](./adr/0011-use-conditional-intercepts.md): Conditional Intercepts
- [ADR-0012](./adr/0012-documentation-of-custom-commands.md): Documentation of Custom Commands
- [ADR-0013](./adr/0013-continuous-validation-checklist.md): Continuous Validation Checklist
- [ADR-0014](./adr/0014-standardized-architectural-documentation-process.md): Standardized Architectural Documentation Process
- [ADR-0015](./adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators
- [ADR-0016](./adr/0016-planning-before-implementation.md): Planning Before Implementation

---

## Visao geral
- Este repositório concentra suites de testes ponta a ponta para o Softcomshop, escritas com Cypress 13+. Os cenarios seguem o padrao Page Object / locators para manter testes legiveis e resilientes a mudancas na interface.
- A automacao e composta de estruturas de suporte (pages, locators, factory) que se conectam a `cypress/e2e` por meio de comandos personalizados e fixtures compartilhadas.
- Resultados sao exportados para Allure (`allure-results` e `allure-report`), com opcional de testes em navegadores especificos (Chrome, Firefox) e visual checks com Percy quando necessario.

## Estrutura de diretorios
- `cypress/e2e`: especificacoes organizadas por modulo (login, financeiro, compras, relatorios, etc). O `specPattern` do `cypress.config.js` garante a ordem de execucao e inclui um setup inicial em `setup/_beforeConfigPadrao.spec.js`. **Ver [ADR-0007](./adr/0007-separate-specs-by-functionality-and-type.md)** para detalhes sobre separação de specs.
- `cypress/support/pages`: classes Page Object com logica de interacao. Cada pagina expõe metodos de preenchimento, clique e validacao reutilizaveis. **Ver [ADR-0002](./adr/0002-use-page-object-pattern.md)** para detalhes sobre o padrão Page Object. **Ver [ADR-0008](./adr/0008-use-page-object-hierarchy.md)** para hierarquia de Page Objects.
- `cypress/support/locators`: arquivos que concentram seletores. Permitem atualizar apenas esses arquivos quando o DOM mudar, mantendo o mesmo metodo dos Page Objects. **Ver [ADR-0003](./adr/0003-separate-locators-from-page-objects.md)** para detalhes sobre separação de locators.
- `cypress/support/factory`: fabricas de dados (usuarios, produtos, etc) construidas com Faker para gerar recursos dinamicos nos testes. **Ver [ADR-0009](./adr/0009-use-faker-for-dynamic-test-data.md)** para detalhes sobre uso do Faker.
- `cypress/support/commands.js`: adiciona comandos utilitarios (login padrao, login com sessao, selecoes no menu lateral, validacoes de telas, configuracao do sistema). Esses comandos sao importados automaticamente em `support/e2e.js`.
- `cypress/support/e2e.js`: carrega plugins (Allure, cypress-xpath, Percy, cypress-grep) e define ganchos globais (`beforeEach`, `afterEach`) que interceptam erros HTTP 500 e forcam falha caso detectem problemas.
- `cypress/fixtures`: dados de teste estaticos (ex: `users.json`) usados por `cy.fixture` nas fabricas e nos comandos.
- `docs`: documentos de apoio, incluindo esse arquivo, o inventario de testes (`docs/testes.md`), os casos específicos dentro de `docs/cases/` e o README principal com o passo a passo de configuracao.
- `allure-results` e `allure-report`: pasta de saidas com evidencia e relatorios gerados apos execucao.

## Configuracoes principais
- `cypress.config.js` define `baseUrl` (`https://stage-release.softcomshop.com.br`), `viewport` 1366x768 e `defaultCommandTimeout` estendido para 50s, garantindo estabilidade em ambientes lentos.
- Em `setupNodeEvents` sao registrados os plugins `allure-cypress` e `@cypress/grep` e retornado o config atualizado, permitindo filtro de especificacoes via `grep`.
- `testIsolation: false` preserva estados entre testes quando necessario, e `experimentalStudio: true` facilita criacao rapida de testes.
- **Configuracoes multi-segmento**: O projeto suporta configuracoes especificas por segmento (petshop, e-commerce, etc.) atraves de arquivos `cypress.config.[segmento].js` que herdam do padrao e isolam testes por segmento. **Ver [Guia de Configuracoes Multi-Segmento](../referencias/guia-configuracoes-multi-segmento.md)** para detalhes completos.

## Fluxos de execucao
- Scripts npm (`package.json`) padronizam comandos:
  - `npm run e2e`: executa Cypress com Allure habilitado.
  - `npm run test:chrome|test:firefox`: forca execucao em navegador especifico.
  - `npm run test:all`: encadeia os dois navegadores.
  - `npm run test:allure`: gera e abre o relatorio Allure apos os testes.
  - `npm run lint` e `npm run lint-html`: validam o padrao ESLint em todo o codigo.
- **Execução Paralela**: O projeto possui um script otimizado `executar-paralelo.ps1` que roda os testes em **14 threads simultâneas**, reduzindo drasticamente o tempo de execução. **Ver [Guia de Execução Paralela](./referencias/guia-execucao-paralela.md)** para detalhes.
- O README principal descreve o setup completo (instalacao do Node, `npm install`, `npx cypress run/open`).

## Fluxo de dados
- Suites e comandos reutilizam fixtures/fabricas para representar entidades (usuario, produto, cliente). As fabricas importam `@faker-js/faker` para preservar variabilidade e evitar registros duplicados. **Ver [ADR-0009](./adr/0009-use-faker-for-dynamic-test-data.md)**.
- Os testes usam o plugin `cy.session` para criar sessao logada. **Para funcionalidades fiscais (NFe, NFCe, SPED, Sintegra)**, use `cy.login()` com usuário fiscal. **Para demais funcionalidades**, use `cy.loginArmazenandoSessao()` com usuário padrão. Ambos utilizam `cy.session` para acelerar suites longas. **Ver [ADR-0004](./adr/0004-use-cy-session-for-login-persistence.md)** para detalhes sobre persistência de sessão e regras de seleção de comando.
- Hooks globais em `support/e2e.js` interceptam erros de servidor e forcam falhas, garantindo que falhas de infraestrutura nao passem despercebidas. **Ver [ADR-0011](./adr/0011-use-conditional-intercepts.md)** para intercepts condicionais.

## Relatorios e evidencias
- `allure-results`: cada execucao populada com metadados, suites, steps e anexos (logs, screenshots). O comando `npm run report:allure` gera o HTML em `allure-report` e abre em `localhost`. **Ver [ADR-0005](./adr/0005-use-allure-for-test-reporting.md)** para detalhes sobre relatórios Allure.
- A pasta `cypress/screenshots` recebe imagens de falhas e verificacoes manualmente disparadas pelos testes.
- `cypress/reports` e `allure-results` podem ser integradas em pipelines CI para publicacao automatica.

## Proximos passos recomendados
1. **OBRIGATÓRIO**: Manter `docs/testes.md` sincronizado com os novos specs e suites adicionadas em `cypress/e2e`. Sempre atualizar este arquivo ao criar novos testes. **Ver [ADR-0006](./adr/0006-mandatory-documentation-for-new-tests.md)**.
2. **OBRIGATÓRIO**: Sempre adicionar novos specs ao `specPattern` em `cypress.config.js` imediatamente após criar o arquivo de teste. **Ver [ADR-0007](./adr/0007-separate-specs-by-functionality-and-type.md)**.
3. **OBRIGATÓRIO**: Sempre criar um documento em `docs/cases/architecture-<nome-do-spec>.md` para cada novo spec criado, mantendo a arquitetura detalhada e atualizada. **Ver [ADR-0006](./adr/0006-mandatory-documentation-for-new-tests.md)**.
4. Atualizar `cypress/support/pages` e `locators` quando a interface sofrer refinamentos para evitar flakiness.
5. Explorar `Percy` e `@percy/cypress` para cobertura visual adicional em telas criticas.
6. Usar tags para filtragem de testes. **Ver [ADR-0010](./adr/0010-use-tags-for-test-filtering.md)**.

## Checklist de criacao de novo teste
Ao criar um novo teste, siga esta ordem obrigatoria:
- [ ] Criar spec em `cypress/e2e/...` (**Ver [ADR-0007](./adr/0007-separate-specs-by-functionality-and-type.md)** para separação de specs)
- [ ] Criar Page Objects/Locators (se necessario) (**Ver [ADR-0002](./adr/0002-use-page-object-pattern.md)** e [ADR-0003](./adr/0003-separate-locators-from-page-objects.md))
- [ ] **Adicionar ao `specPattern` em `cypress.config.js`** (OBRIGATÓRIO) (**Ver [ADR-0007](./adr/0007-separate-specs-by-functionality-and-type.md)**)
- [ ] **Criar documentacao em `docs/cases/architecture-<nome>.md`** (OBRIGATÓRIO) (**Ver [ADR-0006](./adr/0006-mandatory-documentation-for-new-tests.md)**)
- [ ] **Atualizar `docs/testes.md`** (OBRIGATÓRIO) (**Ver [ADR-0006](./adr/0006-mandatory-documentation-for-new-tests.md)**)
- [ ] Aplicar tags no `describe` para filtragem (`@cypress/grep`) (**Ver [ADR-0010](./adr/0010-use-tags-for-test-filtering.md)**)

---

**Para padrões detalhados de criação de testes, consulte [Arquitetura dos casos de teste](./test-case-architecture.md)**
