# Arquitetura do caso de teste: `compras/cadastro-compra-manual.spec.js`

## Objetivo
- Validar o fluxo completo de **cadastro manual de compras**, garantindo que o formulário seja carregado corretamente ao acessar `Compras e Estoque > Gestão de Compras > Compras > Novo Cadastro`.
- Exercitar o autocomplete de **fornecedor e produto** usando dados reais do ambiente.
- Confirmar que o painel de itens inicia com valores padrão (`quantidade 1,00`, `preço 0,00`, totalizadores zerados) e que o painel de pagamentos informa a ausência de registros antes de gerar parcelas.
- Cobrir um fluxo completo selecionando fornecedor, adicionando item e gerando pagamento pelo modal padrão.
- Exercitar um fluxo com múltiplos itens, aplicação de desconto e geração de pagamento para validar as regras do modal de desconto e a disponibilidade do botão de pagamento.
- Validar a exclusão de compra após o cadastro completo.

## Importações e dependências
- `CompraPage` (`cypress/support/pages/Compra/CompraPage.js`): encapsula navegação via `MenulateralProdutoPage`, interage com autocompletes e verifica os painéis. Contém métodos tanto para importação de XML quanto para cadastro manual.
- `CadastroCompraLocators` (`cypress/support/locators/Compra/CadastroCompraLocators.js`): concentra os seletores do cabeçalho, formulário principal, tabela de itens e painel de pagamentos.
- `MenulateralProdutoPage` (`cypress/support/pages/menulateral/menulateralprodutopage.js`): disponibiliza o acesso pelo menu "Compras e Estoque › Gestão de Compras › Compras" e lança o botão "Novo Cadastro".
- `cy.loginArmazenandoSessao()` (custom command): garante autenticação antes de cada teste (não é funcionalidade fiscal, então usa login padrão). **Ver [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md)**
- Hooks globais em `cypress/support/e2e.js` continuam ativos (Allure, interceptação HTTP 500, Percy, grep).

## Estrutura do teste

### Suite: Cadastro manual de compra
**Tags**: `@compras`, `@cadastro-compra-manual`, `@regressivo` (ADR-0010)

1. **beforeEach**
   - `cy.loginArmazenandoSessao()` para autenticação.
   - `cy.visit('/')` para garantir navegação inicial.
   - `CompraPage.acessarNovoCadastro()` navega até o cadastro de compras e aguarda carregamento.

2. **Teste: realiza fluxo completo alterando fornecedor, adicionando item e gerando pagamento**
   - `CompraPage.selecionarPrimeiroFornecedorDisponivel()`: abre o autocomplete de fornecedor e seleciona o primeiro resultado disponível.
   - `CompraPage.adicionarPrimeiroProdutoDaLista()`: busca produto pelo termo 'cst', seleciona o primeiro resultado e aguarda o item ser salvo na tabela.
   - `CompraPage.gerarPagamentoPadrao()`: clica no botão "Gerar Pagamento", abre o modal, seleciona a primeira forma de pagamento e salva, validando que a tabela de pagamentos é preenchida.

3. **Teste: adiciona três itens, aplica desconto e gera pagamento**
   - `CompraPage.selecionarPrimeiroFornecedorDisponivel()`: seleciona fornecedor.
   - `CompraPage.adicionarProdutosDistintos('P', 3)`: adiciona três produtos distintos buscando pelo termo 'P', validando que todos os itens são diferentes.
   - `CompraPage.aplicarDescontoPercentual('5,00')`: abre o modal de desconto, seleciona tipo "DESCONTO", preenche 5% e aplica.
   - `CompraPage.gerarPagamentoPadrao()`: gera pagamento e valida que a tabela de pagamentos contém pelo menos uma linha.

4. **Teste: cria compra sem pagamentos e exclui o registro**
   - `CompraPage.selecionarPrimeiroFornecedorDisponivel()`: seleciona fornecedor.
   - `CompraPage.adicionarProdutosDistintos('P', 2)`: adiciona dois produtos distintos.
   - `CompraPage.validarPainelPagamentos()`: valida que o painel de pagamentos exibe a mensagem "Nenhum resultado foi localizado".
   - `CompraPage.salvarCompra()`: salva a compra e valida que a URL muda para incluir o ID da compra e que o botão de excluir fica visível.
   - `CompraPage.excluirCompraAtual()`: clica no botão excluir, confirma no SweetAlert e valida que retorna para a listagem de compras.

## Métodos do Page Object

### Navegação
- `acessarNovoCadastro()`: navega via `MenulateralProdutoPage.acessarCadastroNovaCompra()`, valida URL e aguarda carregamento do formulário.

### Seleção de Fornecedor
- `buscarFornecedor(termo)`: limpa e digita o termo no campo de fornecedor.
- `expandirFornecedorAutocomplete()`: clica no ícone do autocomplete de fornecedor.
- `selecionarPrimeiroFornecedorDisponivel()`: abre o autocomplete e seleciona o primeiro resultado disponível, validando que o campo oculto é preenchido.

### Seleção de Produtos
- `buscarProduto(termo)`: limpa e digita o termo no campo de produto.
- `expandirProdutoAutocomplete()`: clica no ícone do autocomplete de produto.
- `selecionarProdutoPorIndice(indice = 0)`: abre o autocomplete e seleciona o produto pelo índice especificado.
- `adicionarProdutoPeloAutocomplete(termo, indice = 0)`: busca produto, seleciona pelo índice e aguarda item ser salvo na tabela.
- `adicionarPrimeiroProdutoDaLista(termo = 'cst')`: adiciona o primeiro produto da lista usando o termo especificado.
- `adicionarProdutosDistintos(termo, quantidade = 3)`: adiciona múltiplos produtos distintos, validando que todos têm IDs diferentes.

### Validações de Painéis
- `validarPainelItensInicial()`: valida que a tabela de itens está visível, campos têm valores padrão e totalizadores estão zerados.
- `validarPainelPagamentos()`: valida que o painel de pagamentos está visível e exibe a mensagem padrão de ausência de registros.

### Pagamentos
- `gerarPagamentoPadrao()`: clica no botão "Gerar Pagamento", abre o modal, seleciona a primeira forma de pagamento e salva, validando que a tabela de pagamentos é preenchida.

### Descontos
- `aplicarDescontoPercentual(percentual = '5,00')`: abre o modal de desconto, seleciona tipo "DESCONTO", preenche o percentual e aplica.

### Persistência
- `salvarCompra()`: clica no botão salvar, valida que a URL muda para incluir o ID da compra e que o botão de excluir fica visível.
- `excluirCompraAtual()`: clica no botão excluir, confirma no SweetAlert e valida que retorna para a listagem.

### Utilitários
- `aguardarFechamentoModal(locator, tempoExtra = 1500)`: aguarda o modal fechar e ser removido do DOM.

## Padrões e boas práticas
- **Page Object completo**: métodos com responsabilidade clara e retorno de `this` para encadeamento.
- **Aguardos defensivos**: `aguardarCarregamento()` verifica ausência de `#loading` antes de prosseguir.
- **Timeouts adequados**: todos os elementos aguardam visibilidade com timeout de 10-20 segundos.
- **Métodos compostos**: métodos como `adicionarProdutosDistintos()` facilitam reutilização e manutenção.
- **Validação de modais**: métodos de exclusão validam o conteúdo do SweetAlert antes de confirmar.
- **Documentação de tags**: suite anotada com tags específicas (`@cadastro-compra-manual`, `@compras`, `@regressivo`) para filtros via `@cypress/grep`. **Ver [ADR-0010](../adr/0010-use-tags-for-test-filtering.md)**
- **Separação de responsabilidades**: métodos de cadastro manual estão separados dos métodos de importação de XML no mesmo Page Object.

## Fluxo de execução

1. **Login e navegação**
   - Autenticação via `cy.loginArmazenandoSessao()`.
   - Navegação até `/compra/novo` via menu lateral.

2. **Preenchimento do formulário**
   - Seleção de fornecedor via autocomplete.
   - Adição de produtos via autocomplete.
   - Aplicação de descontos (quando necessário).

3. **Pagamentos**
   - Geração de pagamento via modal.
   - Validação da tabela de pagamentos.

4. **Persistência**
   - Salvamento da compra.
   - Exclusão (quando necessário).

## Dados de teste
- **Fornecedor**: primeiro resultado do autocomplete (dados reais do ambiente).
- **Produtos**: busca por termo 'P' ou 'cst', seleciona resultados do autocomplete (dados reais do ambiente).
- **Desconto padrão**: `5,00%` (configurável via parâmetro).
- **Forma de pagamento**: primeira opção disponível no modal.

## Integração com a arquitetura global
- O spec foi registrado em `cypress.config.js` logo após o teste de importação de XML, mantendo a ordenação temática no `specPattern`.
- Tags `{ tags: ['@compras', '@cadastro-compra-manual', '@regressivo'] }` permitem filtrar rapidamente os testes relacionados ao módulo.
- O fluxo respeita a camada de navegação existente (`MenulateralProdutoPage`) e compartilha locators com outros testes de compras.
- Usa dados reais do ambiente (sem intercepts) para validar o fluxo completo de cadastro manual.

## Lições Aprendidas: Problemas com Locators

Durante a implementação deste teste, encontramos múltiplos problemas com locators que causaram falhas e retrabalho significativo. Esta seção documenta os problemas encontrados e as soluções aplicadas.

### Problemas Identificados

1. **Locators Genéricos Demais:**
   - Seletores como `input[id^="auto_produto"]` capturavam elementos ocultos (`#produto_id`) antes do campo visível (`#auto_produto_id`)
   - **Solução:** Usar IDs específicos com contexto: `.modal #auto_produto_id`

2. **Não Uso de IDs Quando Disponíveis:**
   - Locators baseados em atributos genéricos (`input[placeholder*="Preço"]`) em vez de IDs únicos
   - **Solução:** Priorizar IDs: `.modal #valor_unitario_comercial`

3. **Locators Não Refletiam Estrutura Real:**
   - Locators assumiam estrutura que não existia (`.panel_content_adicione_os_itens_na_compra`)
   - **Solução:** Usar classes reais encontradas no DOM: `table.tabela-itens`

4. **Locators Sem Contexto do Modal:**
   - Locators sem contexto capturavam elementos fora do modal
   - **Solução:** Sempre usar contexto: `.modal #btn-adicionar`

5. **Nomes de Classes Incorretos:**
   - Locators usavam nomes que não existiam (`.table-pagamentos` vs `tabela-pagamento`)
   - **Solução:** Copiar nomes diretamente do DOM

### Correções Aplicadas

| Elemento | Locator Antes | Locator Depois |
|----------|---------------|----------------|
| Campo Produto | `input[id^="auto_produto"]` | `.modal #auto_produto_id` |
| Campo Preço | `input[placeholder*="Preço"]` | `.modal #valor_unitario_comercial` |
| Campo Quantidade | `input[name*="quantidade"]` | `.modal #quantidade_comercial` |
| Botão Adicionar | `.modal #btn-salvar` | `.modal #btn-adicionar` |
| Tabela Itens | `.panel_content_adicione_os_itens_na_compra table.table-form` | `table.tabela-itens tbody tr[data-id]` |
| Tabela Pagamentos | `.table-pagamentos tbody tr` | `table.tabela-pagamento tbody tr` |

### Boas Práticas Estabelecidas

1. **Sempre inspecionar o DOM antes de criar locators**
2. **Priorizar IDs sobre outros seletores**
3. **Usar contexto quando necessário (`.modal #elemento`)**
4. **Validar locators no browser antes de usar**
5. **Manter fallbacks quando apropriado**

### Referências

- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators from Page Objects
- `docs/referencias/aprendizagens-e-licoes.md`: Seção "Lições Aprendidas: Problemas com Locators"

## Sugestões futuras
1. Adicionar validação de mensagem de sucesso após salvar compra.
2. Adicionar cenários negativos (fornecedor obrigatório não preenchido, produto inválido).
3. Testar aplicação de acréscimo percentual.
4. Testar geração de pagamento com múltiplas formas de pagamento.
5. Validar campos preenchidos automaticamente após seleção de fornecedor.
6. Adicionar validação de totalizadores após aplicação de desconto.
7. Criar checklist de validação de locators para prevenir problemas similares.

