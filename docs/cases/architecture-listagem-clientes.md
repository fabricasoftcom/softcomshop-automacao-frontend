# Arquitetura do caso de teste: `cadastro-clientes/listagem-clientes.spec.js`

## Objetivo
- Garantir que a tela **Vendas e NF-e > Clientes** apresenta a tabela inicial paginada, permite pesquisa por nome e mantém os botões principais funcionais.
- Validar as salvaguardas de exclusão: alerta quando não há linhas selecionadas e modal de confirmação quando há seleção ativa.
- Certificar que o fluxo não altera registros em ambiente compartilhado; todos os testes cancelam as confirmações.

## Importações e dependências
- `ListagemClientePage` (`cypress/support/pages/Cliente/listagemclientepage.js`) encapsula navegação via menu lateral e todas as interações com filtros, tabela, paginação e botões de exclusão.
- `ListagemClienteLocators` concentra os seletores da tela (filtros, tabela, checkbox, paginação), enquanto `ClienteLocators` segue responsável apenas pelos seletores de modais globais.
- `beforeEach` reutiliza `cy.loginArmazenandoSessao()` seguido de `cy.visit('/')` para cumprir o checklist de `docs/test-case-architecture.md` e garantir contexto estável antes de acessar o menu.
- Hooks globais definidos em `cypress/support/e2e.js` continuam habilitados (Allure, interceptação de erro 500, Percy, grep), não sendo necessário configuração adicional no spec.

## Estrutura do teste
1. `beforeEach` faz login com sessão armazenada, visita a home e chama `ListagemClientePage.acessarTelaListagem()` para aguardar a tabela visível antes de cada `it`.
2. O primeiro teste garante que a tabela está carregada, valida que a paginação ativa é "1" e abre o formulário de filtros (`abrirFormularioPesquisa`) antes de seguir.
3. O segundo teste aplica um filtro por nome (`pesquisarPorNome`), valida o resultado (`validarResultadoPorNome`) e limpa o campo via `limparFiltroNome`, confirmando que o input ficou vazio.
4. O terceiro teste usa `selecionarTodosClientes` e `desmarcarTodosClientes` para validar o comportamento do checkbox "Selecionar todos" e das linhas da tabela.
5. O quarto teste reproduz o cenário de exclusão sem seleção (`tentarExcluirSemSelecao`), esperando o alerta de aviso do SweetAlert.
6. O quinto teste marca a primeira linha, abre o modal de exclusão (`abrirModalExcluirSelecionados`) e cancela a ação (`cancelarModalExclusao`), garantindo que o modal fecha sem efeitos.

## Integração com a arquitetura global
- O spec está registrado explicitamente no bloco `// clientes` do `specPattern` em `cypress.config.js`, logo após `cadastro-cliente.spec.js`, preservando a ordem do módulo.
- As tags `{ tags: ['@listagem-clientes', '@regressivo'] }` permitem filtrar execuções com `@cypress/grep`.
- O inventário em `docs/testes.md` lista o spec sob o módulo `cadastro-clientes`, atendendo ao processo descrito em `docs/architecture.md`.

## Próximos passos sugeridos
1. Cobrir filtros adicionais (Código, CPF/CNPJ, Razão Social) e verificar se o resultado corresponde ao valor digitado.
2. Adicionar teste para paginação (clicar em “Próxima” e validar o número da página ativa).
3. Integrar validação de bulk-select (marcar todos e confirmar que todas as linhas foram selecionadas e desmarcadas após o toggle).

