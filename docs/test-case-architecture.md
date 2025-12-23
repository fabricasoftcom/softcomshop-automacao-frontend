# Arquitetura dos casos de teste

> **Para visão geral da arquitetura do projeto, consulte [Arquitetura do Projeto](./architecture.md)**

## Architecture Decision Records (ADRs)

Este projeto utiliza **Architecture Decision Records (ADRs)** para documentar decisões arquiteturais importantes. Para contexto completo e justificativas, consulte [docs/adr/README.md](./adr/README.md).

**ADRs principais relacionados a casos de teste:**
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

Este documento descreve os padrões, dependências e classes que devem ser usados ao criar novos testes Cypress neste repositório. Use-o como checklist para manter consistência, reuso e observabilidade em todas as suites.

## 1. Estrutura esperada do caso
1. **Objetivo claro**: descreva o comportamento testado, o fluxo principal e os critérios de sucesso.
2. **Importações organizadas**:
   - Page Objects (`cypress/support/pages/...`).
   - Locators (`cypress/support/locators/...`) se necessário diretamente.
   - Fixtures (`cypress/fixtures/...`) para dados.
   - Commands (`cy.loginArmazenandoSessao()`, `cy.login()`, etc.). **Nota**: Use `cy.login()` para funcionalidades fiscais (NFe, NFCe, SPED, Sintegra) e `cy.loginArmazenandoSessao()` para demais funcionalidades.
3. **Defina hooks usados**:
   - `beforeAll` / `beforeEach` para login, setup e navegação. Sempre inclua `cy.visit('/')` logo após o comando de login para garantir que o ponto inicial da aplicação esteja carregado antes dos passos seguintes.
   - `afterEach` para limpeza de dados ou garantir que o teste falhou se algum monitor capturar erro (hooks genéricos já existentes em `support/e2e.js`).
4. **Teste principal**: log de steps (navegação → preenchimento → submissão → validação).
5. **Assertivas**: confirme toasts, estados do DOM, resposta da API quando disponível.

## 1.5. Registro no `specPattern` (OBRIGATÓRIO)
- **SEMPRE** adicione o novo spec ao `specPattern` no `cypress.config.js` imediatamente após criar o arquivo de teste.
- Mantenha a sequência prevista e permita filtragem via `grep`. 
- Atualize o comentário/filtro correspondente (por exemplo `// producao` → adicione o caminho relativo) logo após o bloco lógico onde o novo spec pertence.
- Exemplo: Se criar `cypress/e2e/producao/cadastro-producao.spec.js`, adicione `"./cypress/e2e/producao/cadastro-producao.spec.js"` no `specPattern` dentro do bloco `// producao`.
- **Ver [ADR-0007](./adr/0007-separate-specs-by-functionality-and-type.md)** para detalhes sobre separação de specs.

## 2. Dependências principais
- Cypress 13+ com plugins carregados em `cypress/support/e2e.js`: `allure-cypress`, `@shelex/cypress-allure-plugin`, `@percy/cypress`, `cypress-xpath`, `@cypress/grep`. **Ver [ADR-0005](./adr/0005-use-allure-for-test-reporting.md)** para Allure e [ADR-0010](./adr/0010-use-tags-for-test-filtering.md) para tags.
- Fixtures de dados (`cypress/fixtures/users.json`, `formasPagamento.json`, etc.).
- Helpers e comandos personalizados (`cypress/support/commands.js`) que centralizam login (`cy.login()` para funcionalidades fiscais, `cy.loginArmazenandoSessao` para demais, `cy.loginRestoreSession`), navegação de menus (`cy.clicarMenu`, `cy.expandirClicarMenuUmNivel`), e validações (`cy.verificarErro500Visual`). **Ver [ADR-0004](./adr/0004-use-cy-session-for-login-persistence.md)** para persistência de sessão e regras de seleção de comando.
- Especificações registradas no `specPattern` de `cypress.config.js` para garantir ordem de execução (começando pelo setup `_beforeConfigPadrao.spec.js`).
- Plugins para relatórios (Allure) e visual testing (Percy) usados em pipelines e `npm run e2e`.

## 3. Classes e Page Objects
- Cada página crítica possui classe em `cypress/support/pages`. Ao criar nova classe: **Ver [ADR-0002](./adr/0002-use-page-object-pattern.md)** para detalhes sobre o padrão Page Object.
  - Use nomes PascalCase e métodos verbos (ex.: `preencherFormulario`, `clicarSalvar`).
  - Importe os locators específicos (`cypress/support/locators/...`). **Ver [ADR-0003](./adr/0003-separate-locators-from-page-objects.md)** para separação de locators.
  - Centralize waits sensíveis e seletores complexos dentro das classes para evitar duplicação nos specs.
- **Hierarquia de Page Objects**: quando um módulo possui múltiplas variantes, considere criar uma classe base com métodos comuns e classes específicas que herdam da base. Exemplo: **Ver [ADR-0008](./adr/0008-use-page-object-hierarchy.md)** para detalhes sobre hierarquia.
  - Classe base: `CadastroNfeBasePage` (métodos comuns: itens, pagamentos, emissão)
  - Classes específicas: `CadastroNfeNormalPage`, `CadastroNfeDevolucaoPage` (métodos específicos de cada tipo)
- **Métodos de pesquisa e seleção**: quando um fluxo requer pesquisa antes do cadastro, crie métodos específicos:
  - `pesquisar[Tipo](filtros)` - preenche formulário de pesquisa
  - `selecionarPrimeira[Tipo]()` - seleciona primeiro resultado e aguarda formulário carregar
- Exemplos existentes:
  - `Financeiro/NovaReceitaPage.js`, `ListagemContasAReceberPage.js`
  - `Balanco/BalancoPage.js`
  - `menulateral/menulateralfinanceiropage.js`, `menulateral/menulateralprodutopage.js`
  - `Venda/NFe/CadastroNfeBasePage.js` (classe base), `Venda/NFe/CadastroNfeNormalPage.js` (específica)
- `locators` definem strings CSS/XPath reutilizadas por várias classes para diminuir acoplamento direto ao DOM.
- **Organização de locators**: quando há múltiplos tipos ou variantes, organize os locators em subseções (ex: `venda`, `nfce`, `devolucao.compra`, `devolucao.movimentacao`).

## 4. Padrões de implementação
- Evite ganchos desnecessários e mantenha cada `it` com foco único. Separe cenários de sucesso/erro em specs distintos quando possível.
- **Separação de specs por funcionalidade**: quando um módulo possui tanto testes de listagem quanto de cadastro, separe em arquivos distintos (ex: `listagem-movimentacoes.spec.js` e `cadastro-movimentacoes.spec.js`). Isso facilita manutenção e execução seletiva. **Ver [ADR-0007](./adr/0007-separate-specs-by-functionality-and-type.md)**.
- **Separação de specs por tipo/variante**: quando um módulo possui múltiplas variantes ou tipos (ex: NFe Normal, Devolução, Ajuste, Complementar), separe em arquivos distintos. Cada arquivo pode ainda conter múltiplos tipos dentro da mesma categoria (ex: NFe Normal com tipos Avulsa, Venda, NFCe, Movimentação). **Ver [ADR-0007](./adr/0007-separate-specs-by-functionality-and-type.md)**.
- Use `cy.session` via `cy.loginArmazenandoSessao()` para acelerar autorizações em suites longas. **Para funcionalidades fiscais (NFe, NFCe, SPED, Sintegra)**, use `cy.login()` que utiliza usuário fiscal. **Ver [ADR-0004](./adr/0004-use-cy-session-for-login-persistence.md)**.
- Fixtures e dados dinâmicos (timestamp, valores aleatórios) previnem conflitos e garantem isolamento. **Ver [ADR-0009](./adr/0009-use-faker-for-dynamic-test-data.md)** para uso do Faker.
- Valide carregamentos com `cy.get('#loading').should('not.exist')` ou esperas nos toasts.
- Ao lidar com SweetAlert, aguarde o modal ficar visível antes de interagir (ex.: `cy.get('.sweet-alert').should('be.visible').wait(800)`) e prefira encapsular essa lógica nos Page Objects.
- Para os modais nativos do Softcomshop (ex.: desconto/acréscimo, formas de pagamento), aguarde explicitamente todos os elementos internos estarem visíveis antes de preencher ou clicar, e após confirmar a ação use um `cy.wait` curto + validação de fechamento (o DOM pode ser recarregado e remover o modal imediatamente).
- **Intercepts condicionais**: quando uma requisição pode ou não ser disparada (ex: salvamento de destinatário que já está preenchido), use flags para verificar se a requisição foi interceptada antes de aguardar, evitando timeouts desnecessários. **Ver [ADR-0011](./adr/0011-use-conditional-intercepts.md)**.
- **Aguardos defensivos**: simplifique validações de tela usando diretamente `should('be.visible')` e `should('not.exist')`, aproveitando o mecanismo de retry automático do Cypress, em vez de lógica condicional complexa.
- Documente tags importantes no `describe` ({ tags: ['@financeiro', '@regressivo', ...] }) para facilitar execução com `@cypress/grep`. **Ver [ADR-0010](./adr/0010-use-tags-for-test-filtering.md)**.

## 5. Hooks e monitoramento comuns
- `cypress/support/e2e.js` já intercepta erros 500 e lança falhas quando detectados via `cy.on` / `cy.intercept`.
- Sempre herdado por novos specs (não sobrescrever o arquivo, mas chame `import './commands';` se for um setup separado).
- Use `beforeEach` para resetar estados, mas evite `afterEach` com comandos longos que possam mascarar falhas reais.

## 6. Integração contínua e evidências
- Resultados vão para `allure-results`; use `npm run report:allure` para gerar e abrir `allure-report`. **Ver [ADR-0005](./adr/0005-use-allure-for-test-reporting.md)**.
- Screenshots e vídeos vão para `cypress/screenshots` e `cypress/videos` quando ativados (geralmente via CI).
- Mantenha `docs/testes.md` e `docs/cases/architecture-<nome-do-spec>.md` atualizados com novos specs e fluxos. **Ver [ADR-0006](./adr/0006-mandatory-documentation-for-new-tests.md)**.

## 7. Documentação obrigatória (OBRIGATÓRIO)
Ao criar um novo teste, você **DEVE** seguir estes passos na ordem: **Ver [ADR-0006](./adr/0006-mandatory-documentation-for-new-tests.md)** para detalhes completos.

### 7.1. Criar documentação em `docs/cases/`
- **SEMPRE** crie um arquivo `docs/cases/architecture-<nome-do-spec>.md` seguindo o padrão dos arquivos existentes.
- O arquivo deve conter:
  - **Objetivo**: descrição clara do que o teste valida
  - **Importações e dependências**: Page Objects, Locators, Commands utilizados
  - **Estrutura do teste**: descrição detalhada de cada `it` e seus passos
  - **Padrões e boas práticas**: técnicas aplicadas, intercepts, validações especiais
- Exemplos de referência: `architecture-cadastro-nfe.md`, `architecture-producao-listagem.md`, `architecture-listagem-produtos.md`

### 7.2. Atualizar `docs/testes.md`
- **SEMPRE** adicione uma nova seção ou atualize a seção existente em `docs/testes.md`.
- Inclua:
  - Título da seção (ex: `## ??? producao`)
  - Arquivo do spec (ex: `### ?? Arquivo: producao/cadastro-producao.spec.js`)
  - Suite do teste (ex: `#### ?? Suite: Cadastro de Produção`)
  - Lista de todos os testes (`it`) do spec
- Mantenha a ordem alfabética ou lógica das seções.

### 7.3. Checklist final
Antes de considerar o teste completo, verifique:
- [ ] Spec criado em `cypress/e2e/...`
- [ ] Page Objects e Locators criados (se necessário)
- [ ] Spec adicionado ao `specPattern` em `cypress.config.js`
- [ ] Documentação criada em `docs/cases/architecture-<nome>.md`
- [ ] `docs/testes.md` atualizado com o novo teste
- [ ] Tags aplicadas no `describe` para filtragem (`@cypress/grep`)

## Próximos passos para novos testes (CHECKLIST OBRIGATÓRIO)

Siga esta ordem ao criar um novo teste:

1. **Criar o spec**: Crie um novo spec em `cypress/e2e/...` seguindo o template acima.
   - **Separe por funcionalidade**: Se o módulo possui listagem e cadastro, crie arquivos separados. **Ver [ADR-0007](./adr/0007-separate-specs-by-functionality-and-type.md)**.
   - **Separe por tipo/variante**: Se o módulo possui múltiplas variantes, considere separar em arquivos distintos. **Ver [ADR-0007](./adr/0007-separate-specs-by-functionality-and-type.md)**.
2. **Criar Page Objects/Locators**: Adicione Page Object/locator se o fluxo exigir interações repetidas.
   - **Hierarquia quando necessário**: Se houver métodos comuns e específicos, crie classe base e classes que herdam. **Ver [ADR-0008](./adr/0008-use-page-object-hierarchy.md)**.
   - **Métodos de pesquisa**: Se o fluxo requer pesquisa, crie métodos específicos para pesquisa e seleção.
3. **Adicionar ao specPattern**: **OBRIGATÓRIO** - Registre o spec no `specPattern` de `cypress.config.js` imediatamente após criar o arquivo. Mantenha a ordem lógica dentro do bloco correspondente (ex: `// producao`, `// vendas`, etc.). **Ver [ADR-0007](./adr/0007-separate-specs-by-functionality-and-type.md)**.
4. **Criar documentação**: **OBRIGATÓRIO** - Crie `docs/cases/architecture-<nome-do-spec>.md` seguindo o padrão dos arquivos existentes. Inclua objetivo, dependências, estrutura do teste e boas práticas. **Ver [ADR-0006](./adr/0006-mandatory-documentation-for-new-tests.md)**.
5. **Atualizar testes.md**: **OBRIGATÓRIO** - Adicione ou atualize a seção correspondente em `docs/testes.md` com o novo teste e todos os seus `it`. **Ver [ADR-0006](./adr/0006-mandatory-documentation-for-new-tests.md)**.
6. **Fluxos derivados**: Quando houver fluxos derivados (por exemplo, reaproveitar um cadastro base para validar abas ou modais adicionais), encapsule o setup comum em helpers do Page Object e crie `its` que apenas estendam esse fluxo.
7. **Tags específicas**: Adicione tags específicas para permitir execução seletiva (ex: `@listagem-movimentacoes`, `@cadastro-movimentacoes`, `@nfe-normal`, `@nfe-devolucao`). **Ver [ADR-0010](./adr/0010-use-tags-for-test-filtering.md)**.

**IMPORTANTE**: Não considere o teste completo até que todos os itens acima estejam finalizados. A documentação e o registro no `specPattern` são obrigatórios e devem ser feitos imediatamente após a criação do spec.

## Padrões aprendidos e aplicados

### Separação de specs
- **Por funcionalidade**: Separe listagem e cadastro em arquivos distintos quando ambos existem no mesmo módulo.
- **Por tipo/variante**: Separe em arquivos distintos quando há múltiplas variantes significativas (ex: NFe Normal, Devolução, Ajuste, Complementar).
- **Benefícios**: Facilita manutenção, execução seletiva, organização e escalabilidade.
- **Ver [ADR-0007](./adr/0007-separate-specs-by-functionality-and-type.md)** para detalhes completos.

### Hierarquia de Page Objects
- **Classe base**: Contém métodos comuns reutilizáveis (ex: `CadastroNfeBasePage` com métodos de itens, pagamentos, emissão).
- **Classes específicas**: Herdam da base e adicionam métodos específicos (ex: `CadastroNfeNormalPage` com métodos para tipos Venda, NFCe, etc.).
- **Benefícios**: Evita duplicação de código, facilita manutenção e permite extensão.
- **Ver [ADR-0008](./adr/0008-use-page-object-hierarchy.md)** para detalhes completos.

### Intercepts condicionais
- Use flags para verificar se uma requisição foi interceptada antes de aguardar.
- Evita timeouts quando a requisição não é disparada (ex: destinatário já preenchido).
- Exemplo: `if (destinatarioRequestInterceptada) { cy.wait('@salvarDestinatario'); }`
- **Ver [ADR-0011](./adr/0011-use-conditional-intercepts.md)** para detalhes completos.

### Validações simplificadas
- Use diretamente `should('be.visible')` e `should('not.exist')` aproveitando o retry automático do Cypress.
- Evite lógica condicional complexa que pode causar flakiness.
- Exemplo: `cy.get('#loading').should('not.exist')` em vez de verificar se existe antes de aguardar.

### Seleção de checkboxes em tabelas
Quando é necessário selecionar um checkbox específico em uma tabela baseado em critérios (ex: selecionar venda com cliente diferente de "CONSUMIDOR"):

1. **Use seletores específicos**: Adicione seletores específicos para as linhas da tabela no arquivo de locators (ex: `tabelaVendas: '#table-form-body tr.table-vendas-checkbox'`).

2. **Filtre linhas com `.filter()`**: Use `.filter()` do Cypress para filtrar linhas baseado no conteúdo de colunas específicas:
   ```javascript
   cy.get(CadastroNfeLocators.venda.tabelaVendas)
     .filter((index, tr) => {
       const cliente = Cypress.$(tr).find('td').eq(2).text().trim();
       return cliente !== 'CONSUMIDOR';
     })
   ```

3. **Selecione a primeira linha**: Use `.first()` após o filtro para selecionar a primeira linha que atende ao critério.

4. **Localize o checkbox**: Use `.find('input[type="checkbox"]')` para localizar o checkbox dentro da linha filtrada.

5. **Marque com `force: true`**: Use `.check({ force: true })` para garantir que o checkbox seja marcado mesmo se houver overlay ou elementos ocultos.

6. **Valide imediatamente**: Sempre valide com `.should('be.checked')` após marcar o checkbox para confirmar que a ação foi bem-sucedida.

7. **Mantenha a lógica simples**: Evite loops complexos ou condicionais desnecessárias. O Cypress já possui retry automático, então a lógica pode ser direta e sequencial.

**Exemplo completo**:
```javascript
selecionarVendaClienteDiferenteConsumidor() {
  cy.get(CadastroNfeLocators.venda.tabelaVendas)
    .filter((index, tr) => {
      const cliente = Cypress.$(tr).find('td').eq(2).text().trim();
      return cliente !== 'CONSUMIDOR';
    })
    .first()
    .find('input[type="checkbox"]')
    .check({ force: true })
    .should('be.checked');

  this.clicarBotaoContinuarRodape();
}
```

**Lições aprendidas**:
- Não é necessário clicar na linha inteira; marque diretamente o checkbox.
- Use `force: true` quando houver overlay ou elementos que possam interceptar o clique.
- Valide imediatamente após marcar para garantir que a ação foi bem-sucedida antes de prosseguir.
- Mantenha a lógica simples e direta, aproveitando o retry automático do Cypress.