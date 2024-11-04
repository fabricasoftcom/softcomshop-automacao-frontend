import NovaReceitaPage from '../../support/pages/Financeiro/NovaReceitaPage';

describe('Cadastro de Nova Receita', () => {
  beforeEach(() => {
    cy.login();
    // Abre o modal de Nova Receita
    NovaReceitaPage.abrirModal();
  });

  // Arrays com as categorias específicas e as novas variações de formas de pagamento
  const categorias = ['RECEITA', 'DESPESA'];
  const formasPagamento = [
    'ESPÉCIE', 'DUPLICATA', 'CARTÃO DE CRÉDITO', 'CARTÃO DE DÉBITO', 'TROCA',
    'VALE ALIMENTAÇÃO', 'VALE REFEIÇÃO', 'VALE PRESENTE', 'VALE COMBUSTÍVEL',
    'OUTROS', 'CRÉDITO LOJA', 'ONLINE', 'PIX', 'PIX COBRANCA', 'DEPÓSITO BANCÁRIO',
    'TRANSFERÊNCIA BANCÁRIA', 'CARTEIRA DIGITAL', 'CASHBACK', 'SEM PAGAMENTO', 'PIX OFF'
  ];

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
  }
});
