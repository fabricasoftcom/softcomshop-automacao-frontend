# Arquitetura do caso de teste: `produtos/listagem-produtos.spec.js`

## Objetivo
- Garantir que o menu de **Compras e Estoque > Produtos > Produto** apresenta corretamente os filtros, realiza pesquisas e controla os seletores de linha na listagem principal.
- Validar o comportamento do botão “Limpar Filtros” após submissão, confirmando que limpa os campos e switches mesmo quando o formulário é reaberto automaticamente.
- Cobrir o toggle do checkbox “selecionar todos” da tabela para garantir que as linhas podem ser marcadas e desmarcadas em massa.

## Importações e dependências
- `ProdutosListPage` (Page Object em `cypress/support/pages/Produtos/ProdutosListPage.js`) encapsula a navegação via `MenulateralProdutoPage`, a abertura do formulário de filtros, o preenchimento dos inputs (`auto_produto_id`, `grupo`), o acionamento dos switches (`Desativado`, `Combo`), os botões de pesquisa e limpeza e as interações com a tabela/checkboxes.
- `ProdutosListLocators` concentra todos os seletores da tela de listagem (filtros, tabela, bulk actions) para manter a reutilização e facilitar ajustes futuros.
- O `beforeEach` reutiliza `cy.loginArmazenandoSessao()` + `cy.visit('/')` para garantir que a sessão logada e a tela inicial estejam prontas antes de acionar o menu.
- Hooks globais em `support/e2e.js` (captura de erros 500, Percy, Allure, etc.) continuam ativos sem alterações específicas para esse spec.

## Estrutura do teste
1. `beforeEach` faz login com sessão guardada, visita a raiz da aplicação e usa `ProdutosListPage.acessarListagem()` para entrar no menu produto e aguardar a tabela visível.
2. O primeiro `it` abre o formulário de filtros, certifica-se de que ele aparece e valida que a tabela já contém linhas (checando o tamanho).
3. O segundo `it` aplica filtro de grupo, habilita os switches “Desativado” e “Combo”, dispara a pesquisa e, com o formulário escondido após o reload, reabre o filtro para clicar em “Limpar filtros”. Em seguida, verifica que o `<select>` e os switches voltaram ao estado não selecionado.
4. O terceiro `it` dispara o “selecionar todos” do checkbox principal, valida que todas as linhas foram marcadas, e então alterna novamente para garantir que eles foram desmarcados, usando o novo método `desmarcarTodosCheckboxes`.
5. Dois testes adicionais lidam com a ação “Alterar Grupo”: um garante que o modal aparece após selecionar um produto e que o `<select>` apresenta uma opção não vazia (além do campo oculto com os IDs), e outro escolhe a primeira opção diferente daquela exibida na linha da tabela, clica em “Salvar”, aguarda o fechamento do modal e recarrega a listagem antes de validar que o grupo exibido refletirá o novo valor.
5. Nenhuma das etapas depende de fixtures adicionais além da sessão padrão; o foco é a navegação e visibilidade dos elementos dinâmicos.

## Integração com a arquitetura global
- O novo spec entra no `specPattern` logo após os outros specs de produto em `cypress.config.js` sob o bloco `// produto`, mantendo a ordem prevista para execuções com `npm run e2e`.
- As tags `{ tags: ["@produtos", "@regressivo"] }` permitem filtrar via `@cypress/grep` em pipelines e garantem consistência com outras suítes que cobrem o mesmo módulo.
- Os comandos reutilizam a camada de menu (`MenulateralProdutoPage`) e os locators centralizados, reduzindo acoplamento e facilitando atualização se o layout mudar.
- O caso gera evidências no Allure através das hooks padrão e pode ser complementado com snapshots do Percy, já que o spec apenas interage com componentes visíveis.

## Sugestões para evolução
1. Adicionar um caso que valide o autocomplete `auto_produto_id` (buscar e selecionar produto) para cobrir o comportamento do dropdown de filtros.
2. Introduzir monitoramento de toast ou mensagem de erro ao alternar switches com valores inválidos para garantir que o backend aceite o toggle nas consultas.
3. Criar um spec visual leve (Percy) que capture o estado padrão da listagem de produto antes e depois de abrir o painel de filtros para detectar regressões visuais.
