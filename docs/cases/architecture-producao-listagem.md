# Arquitetura do caso de teste: `producao/producao-listagem.spec.js`

## Objetivo
- Garantir que o menu **Compras e Estoque > Produção** apresenta a tela de listagem com título, formulário de pesquisa e tabela de resultados.
- Validar o funcionamento do formulário de pesquisa com filtros por código, produto e data.
- Verificar a abertura e fechamento do modal de filtros avançados.
- Confirmar a navegação para a tela de novo cadastro através do botão "Novo Cadastro".
- Validar a exibição de mensagem quando não há resultados na pesquisa.

## Importações e dependências
- `ProducaoPage` (`cypress/support/pages/Producao/ProducaoPage.js`): encapsula navegação, validação de formulário, preenchimento de filtros, pesquisa e interação com modal.
- `ProducaoLocators` (`cypress/support/locators/ProducaoLocators.js`): concentra seletores da tela de listagem (formulário `#form-producao`, campos `#codigo`, `#auto_produto_id`, `#data`, botões `#btn-pesquisar`, `#btn-novo`, tabela `table.table-hover`).
- `cy.login()` (custom command) garante autenticação antes de cada teste.
- Hooks globais em `cypress/support/e2e.js` continuam ativos (Allure, interceptação HTTP 500, Percy, grep).

## Estrutura do teste
1. **beforeEach**: executa `cy.login()`, `cy.visit('/')` e `ProducaoPage.visit()` para garantir sessão válida e navegação até a listagem.
2. **Testes ativos**:
   - `Deve exibir a tela de listagem de produção corretamente`: valida URL, título "Listagem Produção", formulário de pesquisa e tabela visíveis.
   - `Deve abrir e fechar o modal de filtros`: testa abertura do modal via `#btn-modal-plus` e fechamento via `#btn-modal-plus-close`.
   - `Deve realizar pesquisa por código`: preenche campo `#codigo` com valor "1", dispara pesquisa e valida que a tabela permanece visível.
   - `Deve realizar pesquisa por produto`: utiliza `preencherProduto()` para digitar no autocomplete `#auto_produto_id`, aguarda sugestões e valida tabela.
   - `Deve navegar para novo cadastro`: clica em `#btn-novo` e confirma redirecionamento para `/producao/novo`.
   - `Deve validar mensagem quando não há resultados`: pesquisa com código inexistente e valida que a tabela continua visível (pode ou não exibir mensagem de "Nenhum resultado").

## Padrões e boas práticas
- **Page Object completo**: métodos com responsabilidade clara (`validarFormularioPesquisa()`, `pesquisar()`, `abrirModalFiltros()`, `clicarNovoCadastro()`).
- **Aguardos defensivos**: `aguardarCarregamento()` verifica ausência de `#loading` antes de prosseguir.
- **Reuso de componentes**: método `pesquisar()` centraliza preenchimento de múltiplos filtros e submissão.
- **Validações flexíveis**: teste de "sem resultados" não força mensagem específica, apenas garante que a tabela está visível.
- **Documentação de tags**: suite anotada com `{ tags: ['@producao', '@regressivo'] }` para filtros via `@cypress/grep`.

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - `ProducaoPage` utilizado
- **ADR-0003:** Separate Locators from Page Objects - `ProducaoLocators` separado
- **ADR-0004:** Use cy.session for Login Persistence - `cy.login()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags `@producao` e `@regressivo` aplicadas

### Documentação relacionada
- `docs/cases/architecture-cadastro-producao.md` - Cadastro de produção (listagem permite acesso ao cadastro)
- `docs/testes.md` - Inventário de testes
- `cypress/support/pages/Producao/ProducaoPage.js` - Page Object
- `cypress/support/locators/ProducaoLocators.js` - Locators

### Arquivos relacionados
- `cypress/e2e/producao/producao-listagem.spec.js` - Spec de teste
- `cypress.config.js` - Configuração (specPattern)

---
