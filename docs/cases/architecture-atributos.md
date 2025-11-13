# Arquitetura do caso de teste: `produtos/atributos.spec.js`

## Objetivo
- Garantir que o menu Compras e Estoque › Produtos › Atributos abra a listagem com os filtros, permita realizar uma pesquisa e acessar o formulário de novo cadastro.

## Importações e dependências
- `MenulateralProdutoPage` abre o menu e clica em “Atributos”.
- `AtributosListPage` (Page Object) controla o botão de pesquisa, os campos `#id` e `#nome`, o botão de submissão, a tabela de resultados e o botão “Novo Cadastro”.
- O comando `cy.loginArmazenandoSessao()` + `cy.visit('/')` garante estado inicial antes de cada `it`.
- Plugins comuns (`support/e2e.js`) permanecem ativos; o spec está registrado no `specPattern` sob o bloco `// produto`.

## Estrutura do teste
1. `beforeEach` loga, visita `/` e navega para a listagem de atributos.
2. Um `it` abre o filtro, preenche `Código` e `Descrição`, dispara a pesquisa e valida que a tabela aparece com pelo menos uma linha.
3. Outro `it` clica em “Novo Cadastro”, intercepta o GET `/produto/atributo/novo`, confere a URL/título e garante que o formulário é exibido; preenche o campo de descrição, intercepta o POST `/produto/atributo/salvar` e valida que o submit retorna 200. Segue validando a seção “Opções” (botão/tabela); após salvar o atributo, clica em “Opções”, intercepta o GET do modal, preenche o campo “Nome” da opção, salva e garante que o POST `/produto/opcoes/*` foi disparado com sucesso.
4. Um terceiro `it` cria dois atributos temporais (com timestamp) e volta à listagem. Seleciona o checkbox de cada nova linha, usa um stub para confirmar o `swal`, dispara o botão “Excluir Selecionados” e aguarda o POST `/produto/atributo/excluir`. O teste garante que os dois registros somem da tabela enquanto os atributos padrão “COR” (código 7) e “TAMANHO” (código 1) continuam visíveis, proibindo exclusões involuntárias desses itens críticos.

- Mesmo sem criar um novo atributo, o fluxo valida a navegação completa e o form de filtro, o que é suficiente para detectar regressões de menu ou layout.
- A Page Object concentra esperas e seletores específicos da tela de atributos. Note que as tabelas de listagem e de opções possuem IDs dinâmicos, por isso os locators usam seletores mais genéricos (`table.table-hover`) para continuar funcionando mesmo com o ID flutuante.
- Tags `@produtos` e `@regressivo` permitem filtrar via `@cypress/grep`.

## Integração com a arquitetura global
- Registrado no `specPattern` em `cypress.config.js` após os specs de cadastro de produto, respeitando os timeouts de 50s.
- Captura erros HTTP globais via `support/e2e.js` e reporta no Allure.
- Documentação segue o template em `docs/test-case-architecture.md`, mantendo novos casos organizados dentro de `docs/cases/`.

## Sugestões para evolução
1. Incluir uma validação visual da lista exibindo os totais de opções vinculadas.
2. Complementar com um spec que edite ou exclua atributos para cobrir o CRUD completo.
