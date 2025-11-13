# Arquitetura do caso de teste: `compras/movimentacoes.spec.js`

## Objetivo
- Validar o filtro “Operação” na listagem de Movimentações dentro do menu Compras e Estoque, assegurando que a requisição GET a `/movimentacao` retorne com sucesso e apresente resultados na tabela.

## Importações e dependências
- `MenulateralProdutoPage` (em `cypress/support/pages/menulateral`) disponibiliza o acesso pelo menu “Compras e Estoque › Movimentações” e lança o botão “Novo Cadastro”.
- `ListagemMovimentacoesPage` encapsula a interação com o select `#operacao`, o botão “Pesquisar” e a verificação da tabela `table.table-hover`.
- `CadastroMovimentacoesPage` cobre os campos do formulário de cadastro (`#data_operacao`, `#operacao`, `#auto_tipo_ajuste_id`, `#observacao`, `#btn-salvar`), e `ItensMovimentacoesPage` valida os campos de produto, quantidade e preço exibidos após salvar.
- Hooks e plugins de `support/e2e.js` continuam ativos; `cy.loginArmazenandoSessao()` + `cy.visit('/')` garantem sessão e estado inicial.
- O spec está registrado no `specPattern` (`cypress.config.js`) sob o bloco `// compras e estoque`.

## Estrutura do teste
1. `beforeEach` realiza login, abre a página inicial (`cy.visit('/')`) e navega via menu lateral.
2. O primeiro `it` intercepta o GET `/movimentacao*`, seleciona “ENTRADA” no filtro de operação e clica em “Pesquisar”.
3. Aguarda a interceptação (`cy.wait("@pesquisarMovimentacao")`) e exige status 200; em seguida valida a presença e quantidade de registros na tabela.
4. O segundo `it` usa `MenulateralProdutoPage.acessarCadastroNovaMovimentacoes()` para abrir `movimentacao/novo`, valida a URL e garante que os campos data, operação e tipo estão visíveis antes de preencher a observação e clicar em “Salvar”. Depois confirma que o painel de itens (`ItensMovimentacoesPage`) aparece, expande o autocomplete do produto para selecionar o primeiro item disponível, preenche quantidade/preço na nova sessão, clica no botão “Salvar” próprio dessa área e valida que a tabela apresenta pelo menos uma linha e que os totalizadores (itens, volumes, total) refletem os valores adicionados.
5. A terceira execução repete os passos iniciais, redefine a operação para “SAIDA”, verifica o valor exibido, salva o cabeçalho, abre novamente a sessão de itens, adiciona o primeiro produto disponível com quantidade e preço diferentes, salva esse item e valida a mesma tabela/totais para garantir o comportamento da operação de saída.

-## Boas práticas
- Page Objects mantêm o spec focado no fluxo sem expor seletores complexos.
- `ItensMovimentacoesPage` abstrai as ações do formulário de itens, mantendo o spec em um nível mais alto ao preencher produto, quantidade e preço.
- Tags `@compras` e `@regressivo` no describe permitem filtrar este cenário nos pipelines.
- O helper `ListagemMovimentacoesPage.obterLinhasVisiveis()` facilita assertivas quantitativas.
- O novo `CadastroMovimentacoesPage` abstrai as verificações do formulário de cadastro, mantendo o spec focado no comportamento em vez de nos seletores.

## Integração com a arquitetura global
- Registrado em `specPattern` dentro do bloco `// compras e estoque`, alinhado com `defaultCommandTimeout` (50s) e `testIsolation: false`.
- Hooks globais (`support/e2e.js`) continuam capturando erros 500 e forçando falhas inesperadas.
- Persiste nos relatórios Allure e pode gerar screenshots/vídeos se habilitados, mantendo traço completo dos fluxos de compras.
- Documentação reforça `docs/test-case-architecture.md` como checklist para novos specs.

## Sugestões para evolução
1. Expandir os testes para validar outros filtros (empresa ou tipo) e comportamentos da tabela.
2. Criar cenários de cadastro e exclusão de movimentações usando os botões “Novo Cadastro” e “Excluir Selecionados”.
3. Capturar o `status` e o `operacao` das linhas retornadas no Allure para análise posterior.
