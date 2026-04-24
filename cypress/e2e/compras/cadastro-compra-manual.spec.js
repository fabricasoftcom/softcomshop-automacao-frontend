import CompraPage from '../../support/pages/Compra/CompraPage';
import CadastroCompraLocators from '../../support/locators/Compra/CadastroCompraLocators';

describe('Cadastro manual de compra', { tags: ['@compras', '@cadastro-compra-manual', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    CompraPage.acessarNovoCadastro();
  });

  it('realiza fluxo completo: fornecedor, dados principais, item e pagamento', () => {
    // 1. Selecionar fornecedor
    CompraPage.selecionarPrimeiroFornecedorDisponivel();

    // 2. Preencher dados principais (chave de acesso será gerada automaticamente)
    CompraPage.preencherDadosPrincipais({
      natureza: '1102',
      numero: '12345',
      serie: '1'
      // chaveAcesso não informada = será gerada automaticamente uma chave única
    });

    // 3. Salvar compra inicial (necessário para habilitar seções de Itens e Pagamentos)
    CompraPage.salvarCompraInicial();

    // 4. Adicionar item via modal
    CompraPage.clicarNovoItem();
    CompraPage.adicionarItemNoModal({
      termoProduto: 'P',
      indiceProduto: 0,
      preco: '10,00',
      quantidade: '5',
      natureza: '1102'
    });

    // 5. Gerar pagamento
    CompraPage.gerarPagamentoPadrao();

    // Validações finais
    cy.get(CadastroCompraLocators.itensSalvos).should('have.length.at.least', 1);
    cy.get(CadastroCompraLocators.linhasPagamentos).should('have.length.at.least', 1);
  });

  it('adiciona três itens e gera pagamento', () => {
    CompraPage.selecionarPrimeiroFornecedorDisponivel();
    CompraPage.preencherDadosPrincipais();
    CompraPage.salvarCompraInicial();

    // Adiciona três itens distintos
    for (let i = 0; i < 3; i++) {
      CompraPage.clicarNovoItem();
      CompraPage.adicionarItemNoModal({
        termoProduto: 'P',
        indiceProduto: i,
        preco: '10,00',
        quantidade: '2',
        natureza: '1102'
      });
    }

    // Para compras manuais não há desconto
    CompraPage.gerarPagamentoPadrao();

    cy.get(CadastroCompraLocators.itensSalvos).should('have.length', 3);
    cy.get(CadastroCompraLocators.linhasPagamentos).should('have.length.at.least', 1);
  });

  it('cria compra sem pagamentos', () => {
    CompraPage.selecionarPrimeiroFornecedorDisponivel();
    CompraPage.preencherDadosPrincipais();
    CompraPage.salvarCompraInicial();

    // Adiciona um item
    CompraPage.clicarNovoItem();
    CompraPage.adicionarItemNoModal({
      termoProduto: 'P',
      indiceProduto: 0,
      preco: '10,00',
      quantidade: '1',
      natureza: '1102'
    });

    // Valida que não há pagamentos
    CompraPage.validarPainelPagamentos();

    // Salva e exclui
    CompraPage.salvarCompra();
    CompraPage.excluirCompraAtual();
  });
});

