# Arquitetura do caso de teste: `cadastro-produto/cadastro-produto.spec.js`

## Objetivo
- Validar o fluxo principal de cadastro de produto (dados cadastrais + vinculo fiscal) usando dados dinamicos e mantendo o ambiente limpo apos cada cenario.

## Importacoes e dependencias
- `generateRandomProduct` (`cypress/support/factory/generateRandomData.js`) cria descricao, referencia, codigos e valores monetarios aleatorios.
- `ProdutoPage` concentra toda a navegacao/listagem e o preenchimento do formulario usando `ProdutoLocators` (inputs, dropdowns, botoes, modais SweetAlert).
- `VinculoFiscalPage` encapsula as acoes dentro da tela de "Detalhes Fiscais" reaproveitando `VinculoFiscalPageLocators`.
- Cada `it` inicia autenticado via `cy.loginArmazenandoSessao()` e `cy.visit("/")`, mantendo os hooks globais (`support/e2e.js`) ativos.
- O spec permanece registrado no `specPattern` para garantir ordem previsivel dentro do conjunto de suites de produtos.

## Estrutura do teste
1. `beforeEach` garante sessao valida e carrega a pagina inicial, permitindo que os comandos personalizados e interceptacoes globais atuem antes dos passos especificos.
2. O primeiro `it` ativo cobre o fluxo de Combo: o teste habilita o switch (`ProdutoPage.habilitarCombo()`), salva, confirma o redirecionamento para `/produto/<id>/editar`, acessa a aba Combo (`ProdutoPage.acessarAbaCombo()`), valida o estado inicial sem itens (`ProdutoPage.verificarComboSemItens()`/`ProdutoPage.verificarComboQuantidadeItens(0)`), aciona o modal para montagem (`ProdutoPage.adicionarItemCombo()`) — que seleciona automaticamente um ou mais produtos, ignorando o grupo "Taxa de Entrega" quando houver outras opções — e garante que a tabela/totalizador reflitam pelo menos um item criado (`ProdutoPage.verificarComboComItens(1)` + `ProdutoPage.verificarComboQuantidadeItens(1)`).
3. O segundo `it` ativa o fluxo de "produto sem venda": após preencher os dados, o teste desmarca o switch (`ProdutoPage.desabilitarVenda()`), salva, volta para a aba de Dados Cadastrais e garante que o estado permaneceu desativado (`ProdutoPage.verificarVendaDesativada()`), validando tanto o hidden `#vender` quanto o checkbox correspondente.
4. O terceiro `it` cobre a edição a partir da listagem: `ProdutosListPage.acessarListagem()` captura o primeiro produto, usa o botão editar da tabela, altera a observação (`ProdutoPage.atualizarObservacao()`), salva e confirma que o usuário permanece na tela de edição com o valor atualizado (`ProdutoPage.validarObservacao()`).
5. Os cenários anteriores (abas principais, vinculo fiscal, habilitar grade, exclusão pós-cadastro) permanecem documentados para referência histórica, mas estão comentados no spec `cypress/e2e/cadastro-produto/cadastro-produto.spec.js` até que retornem ao fluxo de regressão.
6. Nenhum cenario ativo seleciona manualmente a empresa matriz dentro de Detalhes Fiscais; quando o teste voltar a cobrir esse trecho, deve trabalhar com a empresa pre-carregada ou ajustar conforme necessário.

## Boas praticas
- `ProdutoPage` faz `cy.percySnapshot()` antes do preenchimento e usa normalizacao de texto ao validar os SweetAlerts restantes (exclusao), reduzindo intermitencias causadas por acentuacao ou HTML adicional.
- Os toggles de grade e combo sao encapsulados em metodos proprios, que validam os campos ocultos (`#habilitar_grade`, `#habilitar_acompanhamento`) e so continuam quando o valor `1` for aplicado, garantindo que as abas Grade/Combo estejam visiveis antes das asserts.
- `ProdutoPage.adicionarItemCombo()` centraliza a abertura do modal, o preenchimento dos campos obrigatorios (descricao, ordem, quantidades) e a selecao de multiplos produtos (ignorando o grupo "Taxa de Entrega" quando houver alternativas). Ele tambem expõe via alias `@comboItensAdicionados` o total de grupos/produtos efetivamente selecionados, permitindo garantir que o modal contemplou mais de um conjunto quando disponível, enquanto a validação da aba Combo continua exigindo pelo menos um item criado.
- `ProdutoPage.desabilitarVenda()` e `ProdutoPage.verificarVendaDesativada()` encapsulam a manipulação do switch "Vender" (via hidden + `switchery`), garantindo que o valor `0` permaneça após o salvamento.
- `ProdutoPage.atualizarObservacao()`/`ProdutoPage.validarObservacao()` centralizam a edição e verificação do campo de observação, facilitando verificações pós-salvamento na tela de edição.
- `ProdutosListPage.obterPrimeiroProdutoDaTabela()` e `ProdutosListPage.clicarEditarProdutoPeloCodigo()` permitem recuperar rapidamente um registro existente e abrir o formulário de edição a partir da listagem.
- O alerta opcional exibido após salvar edições pode ser dispensado com `ProdutoPage.cancelarAlertaAtualizacaoGrupo()` (que aguarda o carregamento do modal e clica em “Não”), garantindo que a validação prossiga mesmo quando o SweetAlert aparecer.
- `VinculoFiscalPage` aguarda o dropdown de vinculo ficar visivel (timeout dedicado), oferece `preencherNcmECest()` para selecionar as primeiras opcoes dos typeaheads e mantem o spec desacoplado dos seletores concretos.
- Os dados aleatorios minimizam colisoes entre execucoes paralelas e simplificam a limpeza.
- Tags `@cadastro-produto` e `@regressivo` continuam em uso para filtragem com `@cypress/grep`.

## Integracao com a arquitetura global
- O spec segue o padrao descrito em `docs/test-case-architecture.md`: Page Objects + locators dedicados, evita duplicacao e mantem comandos de menu concentrados.
- Continuidade com `support/e2e.js`: interceptador de erro 500, Percy e geracao de evidencias (Allure) permanecem ativos.
- A suite permanece posicionada antes das suites de atributos/grupos no `specPattern`, garantindo que o cadastro basico esteja funcional antes dos cenarios dependentes.

## Sugestoes para evolucao
1. Reativar os cenarios de abas principais, detalhes fiscais, grade e exclusao assim que o fluxo for estabilizado novamente, mantendo este documento alinhado ao conjunto de testes efetivamente em execucao.
2. Estender a cobertura do switch "Vender" para validar impactos nas listagens (produto desativado) quando esse fluxo estiver acessível via UI.
3. Avaliar a criação de massa dedicada para o caso de edição, evitando dependência do primeiro item da listagem caso a ordem mude com frequência.

