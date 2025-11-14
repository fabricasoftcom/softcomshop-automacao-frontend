# Arquitetura do caso de teste: `vendas/listagem-vendas.spec.js`

## Objetivo
- Garantir que o menu **Vendas e NF-e > Vendas** apresenta a tabela principal com dados, paginação e form de filtros, permitindo alternar o painel de busca sem recarregar.
- Validar a submissão de filtros chave (código, situação e período), confirmando que os parâmetros são enviados para `/vendas` e que o resultado mantém o código informado visível.
- Cobrir os botões de massa (`Selecionar todos`, `Excluir selecionados`) e o dropdown de ações por linha, assegurando que o modal de exclusão aparece apenas quando há seleção e que a ação **Clonar Venda** fica disponível.
- Considerar o estado onde nenhuma venda é retornada no primeiro carregamento, mantendo os testes estáveis e registrando logs informativos em vez de falhar os cenários dependentes de registros.

## Importações e dependências
- `ListagemVendasPage` em `cypress/support/pages/Venda/ListagemVendasPage.js` centraliza o acesso via `MenulateralVendaPage`, abertura de filtros, preenchimento de inputs/selects/datepicker, submissão com `#pesquisar`, controle de checkboxes e interações com dropdown/modal.
- `ListagemVendasLocators` em `cypress/support/locators/Venda/ListagemVendasLocators.js` concentra seletores da tela (inputs `#id`, `#auto_cliente_id`, `#periodo`, selects `#nfe_nfce_faturada` e `#situacao`, tabela `.table-hover`, checkbox `.check_all`, dropdown de ações etc.).
- Reuso do `ClienteLocators.modalConfirmDestroy` para validar o SweetAlert disparado pelo botão **Excluir selecionados**.
- `cy.loginArmazenandoSessao()` + `cy.visit('/')` garantem sessão válida antes de abrir o menu; hooks globais (`support/e2e.js`) mantêm intercept de erro 500 e integrações Allure/Percy ativas.

## Estrutura do teste
1. `beforeEach`: login com sessão armazenada, `cy.visit('/')` e `ListagemVendasPage.acessarTelaListagem()` para aguardar a tabela.
2. Teste 1 valida linhas/paginação inicial e garante que o botão `#btn-pesquisa` exibe o painel `.form-pesquisa`, conferindo o campo `#periodo`.
3. Teste 2 lê o primeiro código visível, preenche filtros de código/situação, dispara `#pesquisar` e assegura (via `cy.intercept('GET', '**/vendas**')`) que a URL contém `id=<codigo>` e `situacao=FATURADA`, além de conferir o código na tabela.
4. Teste 3 foca no `#periodo`, preenchendo manualmente o range (`DD/MM/YYYY - DD/MM/YYYY`) e verificando que o parâmetro chega na query string (`periodo=`) após a submissão.
5. Teste 4 alterna o checkbox geral `.check_all`, confirmando seleção e desmarcação de todos os `input[name='simplecheck[]']`.
6. Teste 5 cobre exclusão em massa: primeiro clica sem seleção (espera o alerta “Aviso”), depois marca até duas vendas com status **NÃO FATURADA**, abre o modal SweetAlert e confirma utilizando o botão que contém “pode excluir”.
7. Teste 6 abre o dropdown da primeira linha (botão `.dropdown-toggle` que é deslocado para o `body`) e verifica se existe a opção **Clonar Venda**, garantindo também o fechamento do menu ao clicar fora.

## Integração com a arquitetura global
- O spec foi incluído no bloco `// vendas` do `specPattern` em `cypress.config.js`, mantendo a ordem após os setups e antes de `venda-nfce`.
- Tags `{ tags: ['@vendas', '@listagem-vendas', '@regressivo'] }` alinham com o padrão `@cypress/grep`, permitindo executar apenas as suítes de vendas em pipelines.
- Os comandos aproveitam o `MenulateralVendaPage` para navegar pela árvore “Vendas e NF-e”, mantendo coesão com demais specs desse menu (clientes, orçamento, NF-e/NFC-e).
- Resultados seguem fluindo para Allure (`allure-results`) e podem receber snapshots Percy futuros, pois o teste interage apenas com componentes visíveis.

## Sugestões para evolução
1. Adicionar cenários cobrindo o autocomplete de cliente (`#auto_cliente_id`) e de origem da venda (`#auto_origem_venda`) com `cy.intercept` mockando as rotas `/vendas/autocomplete/cliente` e `/softcomtecnologia/autocomplete`.
2. Validar o bloqueio do período maior que 60 dias simulando a seleção de datas no `daterangepicker` e garantindo o toast “Selecione uma data que esteja dentro do período de 60 dias”.
3. Exercitar o filtro rápido por coluna (ícones `fa-filter`) garantindo que o script de front aplica o `row.toggle(false)` apenas para linhas que não correspondem ao texto digitado.
