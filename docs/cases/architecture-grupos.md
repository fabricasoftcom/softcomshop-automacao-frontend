# Arquitetura do caso de teste: `produtos/grupos.spec.js`

## Objetivo
- Garantir o acesso à listagem de grupos via menu “Compras e Estoque › Produtos › Grupos”, validar o filtro por código/nome e a navegação para o cadastro de um novo grupo.

## Importações e dependências
- `MenulateralProdutoPage.acessarListagemGrupos()` expande o menu adequado.
- `GruposListPage` organiza o filtro (botão “Pesquisar”, campos `#id`, `#auto_nome`, botão `#btn-pesquisar`) e a tabela principal (`table.table-hover`, com timeout maior para lidar com recarga lenta). O GET usado para abrir o novo cadastro pode chegar via `/grupo/novo` ou `/grupo-padrao/novo`, por isso o `cy.intercept` usa um regex.
- `cy.loginArmazenandoSessao()` + `cy.visit('/')` preparam o estado antes de cada teste; os plugins em `support/e2e.js` continuam ativos.

## Estrutura do teste
1. `beforeEach` loga, visita `/` e abre a listagem de grupos.
2. O primeiro `it` abre o filtro, preenche código e nome, dispara a pesquisa e valida que a tabela aparecer com linhas visíveis.
3. O segundo `it` intercepta o GET `/grupo(-padrao)?/novo`, clica no botão “Novo Cadastro” e garante que a URL muda para `/grupo/novo` ou `/grupo-padrao/novo`, além de checar o título do formulário contém “Grupo”. Em seguida, preenche nome/percentual de comissão, salva o formulário interagindo com o POST `/grupo(-padrao)?/salvar` e retorna à listagem (rota `/grupo-padrao`) para confirmar que o novo grupo está presente na tabela.
4. O terceiro `it` fortalece a cobertura desenhando dois grupos temporários, marcando seus checkboxes e acionando “Excluir Selecionados” com o `swal` confirmado via stub. O POST `/grupo/excluir` é interceptado, garante que os novos registros desaparecem e os grupos padrão (ex.: “Adicionais Combo TOp”, “Adicional”) permanecem visíveis.

## Boas práticas
- O locators evita IDs específicos na tabela, mantendo `table.table-hover` mesmo que o ID mude.
- Tags `@produtos` e `@regressivo` permitem filtrar rodando apenas os fluxos de produto.

## Integração com a arquitetura global
- Registrado no `specPattern` em `cypress.config.js` logo depois dos specs de cadastro de produto e atributos.
- Hooks globais (`support/e2e.js`) continuam interceptando erros 500, e os intercepts (`cy.intercept`) garantem que o carregamento do formulário é monitorado.
- Documentação segue o padrão de `docs/test-case-architecture.md` e fica dentro de `docs/cases/`.

## Sugestões para evolução
1. Expandir com cenários de criação/edição/exclusão de grupos, validando também as dependências (família, vender, status).
2. Adicionar uma verificação visual dos filtros (p.ex. placeholder ou tooltip) para evitar regressões de UI.
