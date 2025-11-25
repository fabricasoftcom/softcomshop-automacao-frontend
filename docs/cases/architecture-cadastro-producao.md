# Arquitetura do caso de teste: `producao/cadastro-producao.spec.js`

## Objetivo
- Validar o fluxo completo de finalização de uma produção com modo de preparo preenchido.
- Garantir que é possível adicionar um item inicial à produção, navegar para a tela de edição, adicionar produtos na tabela de itens, preencher o modo de preparo e finalizar a produção.
- Verificar que todos os passos do fluxo (cadastro inicial → edição → adição de itens → modo de preparo → salvamento → finalização) são executados com sucesso.
- Validar o fluxo de reversão de uma produção finalizada: localizar produção finalizada na listagem, abrir para edição e reverter a produção.

## Importações e dependências
- `CadastroProducaoPage` (`cypress/support/pages/Producao/CadastroProducaoPage.js`): encapsula navegação, validação de formulário, preenchimento de campos, seleção de produto, adição de itens, gerenciamento de modo de preparo, finalização e reversão de produção.
- `ProducaoPage` (`cypress/support/pages/Producao/ProducaoPage.js`): encapsula navegação na listagem de produção, validação de tabela e localização de produções finalizadas.
- `ProducaoLocators` (`cypress/support/locators/ProducaoLocators.js`): concentra seletores da tela de cadastro (formulário `form[action*="/producao/salvar"]`, campos `#created_at`, `#observacao`, `#auto_producao_produto_empresa_grade_id`, `#producao_quantidade`, radio button `#tipo_producao_DIRETA` (único tipo disponível), botões `#btn-lancar-item`, `#btn-salvar-modo-preparo`, `#btn-finalizar`, `#btn-reverter`, textarea `#modo_preparo`), seletores da listagem (tabela `table.table-hover`, linhas `table.table-hover tbody tr`, botão editar `.button-tab.button-edit`).
- `cy.loginArmazenandoSessao()` (custom command) garante autenticação com sessão persistida antes de cada teste.
- Hooks globais em `cypress/support/e2e.js` continuam ativos (Allure, interceptação HTTP 500, Percy, grep).

## Estrutura do teste
1. **beforeEach**: executa `cy.loginArmazenandoSessao()` e `cy.visit('/')` para garantir sessão válida antes de cada teste.
2. **Testes ativos**:
   - `deve finalizar uma produção com modo de preparo preenchido`: 
     - Chama `CadastroProducaoPage.visit()` para navegar até `/producao/novo`.
     - Define um objeto `itemInicial` com produto, quantidade e observação.
     - Utiliza `CadastroProducaoPage.adicionarItem(itemInicial)` que:
       - Preenche o formulário completo (produto via autocomplete, quantidade, observação).
       - Valida que o campo hidden do produto foi preenchido.
       - Clica em "Lançar" e aguarda o redirecionamento para a página de edição (`/producao/{id}/editar`).
     - `validarPaginaEdicao()`: valida que a URL contém `/producao/` e `/editar`, aguarda o loading desaparecer e verifica que a tabela de itens está visível.
     - `validarTabelaItensVisivel()`: valida que o título e a tabela de itens estão visíveis.
     - `adicionarProdutoNaTabela('Produto', '2.00', '10.00')`: adiciona um produto na tabela de itens da produção:
       - Seleciona produto via autocomplete na tabela.
       - Preenche quantidade (2.00) e preço (10.00).
       - Clica em "Salvar" e aguarda a requisição `POST **/producao-itens/salvar`.
       - Aguarda o loading desaparecer e valida que a tabela possui pelo menos uma linha.
     - `preencherModoPreparo('Modo de preparo teste')`: preenche o textarea do modo de preparo:
       - Aguarda o loading desaparecer para garantir estabilidade da página.
       - Re-querya o elemento textarea antes de cada interação para evitar erros de elemento desanexado.
       - Verifica se o texto já existe e adiciona um sufixo único se necessário para garantir que o botão seja habilitado.
       - Dispara o evento `blur` para habilitar o botão de salvar.
     - `salvarModoPreparo()`: clica no botão de salvar modo de preparo e aguarda o loading desaparecer.
     - `salvarProducao()`: salva a produção:
       - Intercepta `POST **/producao/salvar`.
       - Clica no botão "Salvar Produção".
       - Aguarda a requisição e verifica status code 200 ou 302 (redirect), aguarda o loading desaparecer.
     - `finalizarProducao()`: finaliza a produção:
       - Intercepta `GET **/producao/*/finalizar`.
       - Clica no botão "Finalizar".
       - Aguarda o SweetAlert de confirmação aparecer (`.sweet-alert.modal-confirm-destroy`).
       - Clica no botão "Sim, pode finalizar!" dentro do modal.
       - Aguarda a requisição e verifica status code 200 ou 302 (redirect).
       - Aguarda o SweetAlert desaparecer e o loading finalizar.
   
   - `deve localizar produção finalizada na listagem, abrir edição e reverter produção`:
     - Chama `ProducaoPage.visit()` para navegar até a listagem de produção (`/producao`).
     - `validarTabelaVisivel()`: valida que a tabela está visível na listagem.
     - `abrirPrimeiraProducaoFinalizada()`: localiza e abre uma produção finalizada:
       - Filtra as linhas da tabela que contêm "Finalizado".
       - Seleciona a primeira linha encontrada.
       - Localiza e clica no botão de editar (`.button-tab.button-edit`).
       - Valida que a URL redirecionou para `/producao/{id}/editar`.
       - Aguarda o loading desaparecer.
     - `reverterProducao()`: reverte a produção:
       - Intercepta `GET **/producao/*/reverter`.
       - Clica no botão "Reverter" (`#btn-reverter, a.btn-reverter, button.btn-reverter`).
       - Aguarda o SweetAlert de confirmação aparecer (`.sweet-alert.modal-confirm-destroy`).
       - Clica no botão "Sim, pode reverter!" dentro do modal.
       - Aguarda a requisição e verifica status code 200 ou 302 (redirect).
       - Aguarda o SweetAlert desaparecer e o loading finalizar.

## Padrões e boas práticas
- **Page Object completo com método chaining**: todos os métodos retornam `this`, permitindo encadeamento fluente de chamadas (`CadastroProducaoPage.adicionarItem().validarPaginaEdicao()...`).
- **Separação de responsabilidades**: `ProducaoPage` gerencia a listagem, enquanto `CadastroProducaoPage` gerencia o cadastro e edição de produção.
- **Fluxo completo de finalização**: o primeiro teste cobre todo o ciclo de vida de uma produção (cadastro → edição → itens → modo de preparo → salvamento → finalização).
- **Fluxo de reversão**: o segundo teste cobre a localização de uma produção finalizada na listagem, abertura para edição e reversão.
- **Aguardos defensivos**: 
  - `adicionarItem()` valida que o campo hidden do produto foi preenchido antes de lançar.
  - `validarPaginaEdicao()` aguarda o loading desaparecer e valida a tabela de itens antes de continuar.
  - `preencherModoPreparo()` aguarda o loading desaparecer antes de interagir e re-querya o elemento para evitar erros de elemento desanexado após recarregamento da página.
  - `abrirPrimeiraProducaoFinalizada()` valida a URL e aguarda o loading desaparecer antes de continuar.
- **Intercepts para validação**: métodos `salvarProducao()`, `finalizarProducao()` e `reverterProducao()` interceptam requisições e validam status 200 ou 302 (redirect), lidando com recarregamentos de página.
- **Tratamento de SweetAlert**: métodos `finalizarProducao()` e `reverterProducao()` aguardam explicitamente o modal de confirmação aparecer, clicam no botão de confirmação e aguardam o modal desaparecer antes de validar a resposta da requisição.
- **Métodos específicos para tela de edição**: após lançar o item inicial, a página muda para edição, então há métodos específicos (`validarPaginaEdicao()`, `adicionarProdutoNaTabela()`) que trabalham na nova tela.
- **Validações de tabela**: `adicionarProdutoNaTabela()` valida que a tabela possui pelo menos uma linha após salvar o item, em vez de depender exclusivamente do status code da requisição.
- **Tratamento de autocomplete na tabela**: `adicionarProdutoNaTabela()` usa seletores genéricos (`.typeahead-list li a, .typeahead-result li a`) e inclui verificações condicionais para garantir que a lista apareça.
- **Localização de produções finalizadas**: `abrirPrimeiraProducaoFinalizada()` usa `.filter(':contains("Finalizado")')` para localizar produções finalizadas na listagem, similar ao padrão usado em `ReverterBalancoPage`.
- **Documentação de tags**: suite anotada com `{ tags: ['@producao', '@regressivo'] }` para filtros via `@cypress/grep`.

