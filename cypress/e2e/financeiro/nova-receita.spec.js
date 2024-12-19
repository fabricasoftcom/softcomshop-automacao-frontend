import NovaReceitaPage from '../../support/pages/Financeiro/NovaReceitaPage';

describe('Cadastro de Nova Receita', () => {
  beforeEach(() => {
    cy.login();
    // Abre o modal de Nova Receita
    NovaReceitaPage.abrirModal();
  });

  // Arrays com as categorias específicas e as novas variações de formas de pagamento
  const categorias = ['RECEITA', 'DESPESA'];
  // const categorias = ['RECEITA'];
  const formasPagamento = [
    'ESPÉCIE', 'DUPLICATA', 'CARTÃO DE CRÉDITO', 'CARTÃO DE DÉBITO', 'TROCA',
    'VALE ALIMENTAÇÃO', 'VALE REFEIÇÃO', 'VALE PRESENTE', 'VALE COMBUSTÍVEL',
    'OUTROS', 'CRÉDITO LOJA', 'ONLINE', 'PIX', 'PIX COBRANCA', 'DEPÓSITO BANCÁRIO',
    'TRANSFERÊNCIA BANCÁRIA', 'CARTEIRA DIGITAL', 'CASHBACK', 'SEM PAGAMENTO', 'PIX OFF'
  ];
  // const formasPagamento = [
  //   'DUPLICATA'
  // ];

  // Percorre cada combinação de categoria e forma de pagamento
  categorias.forEach((categoria) => {
    formasPagamento.forEach((formaPagamento) => {
      it(`Preencher o formulário de Nova Receita com Categoria: ${categoria} e Forma de Pagamento: ${formaPagamento}`, () => {
        preencherFormulario(categoria, formaPagamento);
      });
    });
  });

  function preencherFormulario(categoria, formaPagamento) {
    // Preenche a descrição, categoria e forma de pagamento
    const descricaoTeste = `Receita Teste - ${new Date().toLocaleString()} - ${categoria}/${formaPagamento}`;
    NovaReceitaPage.preencherDescricao(descricaoTeste);
    NovaReceitaPage.selecionarCategoria(categoria);
    NovaReceitaPage.selecionarConta(); // Agora não precisa de argumento
    NovaReceitaPage.selecionarFormaPagamento(formaPagamento);
  
    // Define as datas e valor, e finaliza o preenchimento do formulário
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    NovaReceitaPage.selecionarDataCompetencia(dataAtual);
    NovaReceitaPage.selecionarDataVencimento(dataAtual);
    const valorAleatorio = (Math.random() * 229 + 1).toFixed(2).replace('.', ',');
    NovaReceitaPage.preencherValor(valorAleatorio);
    NovaReceitaPage.selecionarCliente('{downarrow}{enter}');
    NovaReceitaPage.selecionarTipoDocumento('Padrão');
    NovaReceitaPage.clicarSalvar();
  
    // Valida o sucesso
    cy.contains('Sucesso').should('be.visible');

    // //avaliar, apenas algumas formas de pagamento geram registro em tela.
    // cy.get('table tbody').should('be.visible');
    // cy.contains(descricaoTeste).should('exist');
  }
  it('Valida erro ao tentar criar receita com tipo "Duplicata" para cliente "Consumidor"', () => {
  
    // Preenche o campo Descrição
    NovaReceitaPage.preencherDescricao('Teste - Receita Duplicata para Consumidor');
  
    // Seleciona a categoria
    NovaReceitaPage.selecionarCategoria('Receita');
  
    // Seleciona a conta
    NovaReceitaPage.selecionarConta('CAIXA');
  
    // Seleciona o tipo de pagamento "Duplicata"
    NovaReceitaPage.selecionarFormaPagamento('Duplicata');
  
    // Preenche o campo Data de Competência com a data atual
    NovaReceitaPage.selecionarDataCompetencia('04/11/2024');
  
    // Preenche o campo Data de Vencimento com a data atual
    NovaReceitaPage.selecionarDataVencimento('04/11/2024');
  
    // Preenche o campo Valor
    NovaReceitaPage.preencherValor('100,00');
  
    // Seleciona o cliente "Consumidor" no primeiro item da lista de resultados
    cy.get('#autocomplete_client')
      .type('Consumidor', { force: true });
    cy.get('#autocomplete_client_addon').click();
    cy.get('.client_results > :nth-child(1)').click(); // Seleciona o primeiro cliente (Consumidor)
  
    // Seleciona o tipo de documento "Duplicata"
    NovaReceitaPage.selecionarTipoDocumento('Duplicata');
  
    // Clica no botão "Salvar" e espera o erro
    NovaReceitaPage.clicarSalvar();
  
    // Valida a exibição do erro de restrição para o cliente "Consumidor"
    cy.get('.Toastify__toast--error', { timeout: 10000 }) // Aguarda até 10 segundos para a notificação de erro
      .should('be.visible')
      .and('contain', 'Não é possível criar a receita para o cliente Consumidor com o tipo Duplicata');
  });
  
});
