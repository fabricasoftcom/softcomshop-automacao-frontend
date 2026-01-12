import OrdemFornecimentoListagemPage from '../../support/pages/Compra/OrdemFornecimentoListagemPage';
import OrdemFornecimentoCadastroPage from '../../support/pages/Compra/OrdemFornecimentoCadastroPage';

describe('Ordem de Fornecimento', { tags: ['@compras', '@regressivo'] }, () => {
  const dadosOrdem = {
    fornecedor: 'Fornecedor Padrão', // Ajustar para um existente no ambiente
    telefone: '(83) 99999-9999'
  };

  beforeEach(() => {
    cy.loginArmazenandoSessao();
    OrdemFornecimentoListagemPage.visitar();
  });

  it('Deve acessar o cadastro de ordem de fornecimento', () => {
    OrdemFornecimentoListagemPage.clicarNovoCadastro();
    // Preencher campos básicos para validar carregamento
    OrdemFornecimentoCadastroPage.preencherFornecedor(dadosOrdem.fornecedor)
      .preencherTelefone(dadosOrdem.telefone);
      // .clicarSalvar(); // Comentar salvar até garantir dados válidos
  });
});

