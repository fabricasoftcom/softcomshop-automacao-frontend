import CadastroVendaPage from '../../support/pages/Venda/CadastroVendaPage';
import CadastroVendaLocators from '../../support/locators/Venda/CadastroVendaLocators';

describe('Cadastro de venda', { tags: ['@vendas', '@cadastro-venda', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    CadastroVendaPage.acessarNovoCadastro();
  });

  it('exibe os botoes principais e o formulario inicial', () => {
    CadastroVendaPage.validarBotoesTopo();
    cy.get(CadastroVendaLocators.formPrincipal).within(() => {
      cy.get(CadastroVendaLocators.campoCliente).should('be.visible');
      cy.get(CadastroVendaLocators.campoVendedor).should('be.visible');
      cy.get(CadastroVendaLocators.campoObservacoes).should('be.visible');
    });
  });

  it('permite pesquisar cliente e vendedor via autocomplete', () => {
    cy.intercept('POST', '**/vendas/autocomplete/cliente', {
      statusCode: 200,
      body: {
        data: {
          results: [
            {
              id: 999,
              nome: 'Cliente Cypress',
              ddd: '11',
              telefone: '999999999',
              endereco: 'Rua Teste',
              numero: '123',
              bairro: 'Centro',
              cidade: 'São Paulo',
              short_uf: 'SP',
            },
          ],
        },
      },
    }).as('autocompleteCliente');

    cy.intercept('POST', '**/vendas/autocomplete-vendedor', {
      statusCode: 200,
      body: {
        data: {
          results: [
            {
              id: 888,
              nome: 'Vendedor Cypress',
            },
          ],
        },
      },
    }).as('autocompleteVendedor');

    CadastroVendaPage.buscarCliente('Cliente');
    cy.wait('@autocompleteCliente');
    CadastroVendaPage.expandirClienteAutocomplete();
    CadastroVendaPage.validarSugestoesCliente();
    CadastroVendaPage.selecionarSugestaoCliente();
    CadastroVendaPage.fecharAutocomplete();
    cy.get(CadastroVendaLocators.campoCliente).clear();
    CadastroVendaPage.buscarCliente('Cliente Cypress');
    cy.wait('@autocompleteCliente');
    CadastroVendaPage.expandirClienteAutocomplete();
    CadastroVendaPage.validarSugestoesCliente();

    CadastroVendaPage.buscarVendedor('Vendedor');
    cy.wait('@autocompleteVendedor');
    CadastroVendaPage.expandirVendedorAutocomplete();
    CadastroVendaPage.validarSugestoesVendedor();
    CadastroVendaPage.selecionarSugestaoVendedor();
    CadastroVendaPage.fecharAutocomplete();
    cy.get(CadastroVendaLocators.campoVendedor).clear();
    CadastroVendaPage.buscarVendedor('Vendedor Cypress');
    cy.wait('@autocompleteVendedor');
    CadastroVendaPage.expandirVendedorAutocomplete();
    CadastroVendaPage.validarSugestoesVendedor();
  });

  it('mantem o painel de itens pronto para preenchimento', () => {
    CadastroVendaPage.validarPainelItensInicial();
  });

  it('exibe sugestoes ao pesquisar produtos', () => {
    cy.intercept('POST', '**/vendas-itens/autocomplete', {
      statusCode: 200,
      body: {
        data: {
          results: [
            {
              id: 1010,
              nome_original: 'Produto Cypress',
              nome_com_pesquisa: 'Produto Cypress',
              produto_id: 1010,
              preco_venda: '10,00',
              codigo_barras: '123456789',
              codigo_sku: 'SKU-123',
              referencia: 'REF-01',
              estoque: '9',
              descricao_promocao: '',
              cor_promocao: '#000000',
            },
          ],
        },
      },
    }).as('autocompleteProduto');

    CadastroVendaPage.buscarProduto('Produto');
    cy.wait('@autocompleteProduto');
    CadastroVendaPage.expandirProdutoAutocomplete();
    CadastroVendaPage.validarSugestoesProduto();
    CadastroVendaPage.selecionarSugestaoProduto();
    CadastroVendaPage.fecharAutocomplete();
    cy.get(CadastroVendaLocators.campoProduto).clear();
    CadastroVendaPage.buscarProduto('Produto Cypress');
    cy.wait('@autocompleteProduto');
    CadastroVendaPage.expandirProdutoAutocomplete();
    CadastroVendaPage.validarSugestoesProduto();
  });

  it('apresenta o painel de pagamentos com mensagem padrao', () => {
    CadastroVendaPage.validarPainelPagamentos();
  });

  it('realiza fluxo completo alterando cliente, vendedor, item e gerando pagamento', () => {
    CadastroVendaPage.selecionarClienteAlternativo();
    CadastroVendaPage.selecionarPrimeiroVendedorDisponivel();
    CadastroVendaPage.adicionarPrimeiroProdutoDaLista();
    CadastroVendaPage.gerarPagamentoPadrao();
  });

  it('adiciona tres itens, aplica desconto e gera pagamento', () => {
    CadastroVendaPage.selecionarClienteAlternativo();
    CadastroVendaPage.selecionarPrimeiroVendedorDisponivel();

    CadastroVendaPage.adicionarProdutosDistintos('P', 4);

    CadastroVendaPage.aplicarDescontoPercentual('5,00');

    CadastroVendaPage.gerarPagamentoPadrao();
    cy.get(CadastroVendaLocators.linhasPagamentos).should('have.length.at.least', 1);
  });

  it('adiciona tres itens, aplica acrescimo e gera pagamento', () => {
    CadastroVendaPage.selecionarClienteAlternativo();
    CadastroVendaPage.selecionarPrimeiroVendedorDisponivel();

    CadastroVendaPage.adicionarProdutosDistintos('P', 3);

    CadastroVendaPage.aplicarAcrescimoPercentual('8,00');

    CadastroVendaPage.gerarPagamentoPadrao();
    cy.get(CadastroVendaLocators.linhasPagamentos).should('have.length.at.least', 1);
  });

  it('adiciona dois itens, gera duplicata em tres parcelas e valida somatorio', () => {
    CadastroVendaPage.selecionarClienteAlternativo();
    CadastroVendaPage.selecionarPrimeiroVendedorDisponivel();

    CadastroVendaPage.adicionarProdutosDistintos('P', 2);

    CadastroVendaPage.gerarPagamentoDuplicataParcelado(3);

    CadastroVendaPage.validarSomatorioParcelasIgualTotal();
  });

  it('cria venda sem pagamentos e exclui o registro', () => {
    CadastroVendaPage.selecionarClienteAlternativo();
    CadastroVendaPage.selecionarPrimeiroVendedorDisponivel();

    CadastroVendaPage.adicionarProdutosDistintos('P', 2);
    CadastroVendaPage.validarPainelPagamentos();

    CadastroVendaPage.salvarVenda();
    CadastroVendaPage.excluirVendaAtual();
  });
});
