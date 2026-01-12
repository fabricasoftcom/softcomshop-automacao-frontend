import ConsignacaoExtratoPage from "../../support/pages/Consignacao/ConsignacaoExtratoPage";

describe('Consignação > Extrato', { tags: ['@consignacao', '@extrato', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao(); // ADR-0004: Funcionalidades não-fiscais devem usar cy.loginArmazenandoSessao()
    cy.visit('/');
    ConsignacaoExtratoPage.acessarViaMenu();
  });

  it('Deve exibir a tela de Extrato de Consignação com todos os elementos principais', () => {
    ConsignacaoExtratoPage.validarAcesso();
    ConsignacaoExtratoPage.validarFormulario();
    ConsignacaoExtratoPage.validarTotalizadores();
  });

  it('Deve preencher o formulário de pesquisa', () => {
    const dados = {
      periodo: '01/01/2026 - 31/01/2026',
      status: 'todos' // Valor do select é minúsculo
    };

    ConsignacaoExtratoPage.preencherFormulario(dados);
    ConsignacaoExtratoPage.validarCamposPreenchidos(dados);
  });
});

