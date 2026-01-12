import SpedIcmsAjustePage from "../../support/pages/Sped/SpedIcmsAjustePage";

describe('SPED - ICMS Ajuste Apuração', { tags: ['@sped', '@icms-ajuste', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.login(); // ADR-0004: Funcionalidades fiscais (SPED) devem usar cy.login()
    cy.visit('/');
    SpedIcmsAjustePage.acessarViaMenu();
  });

  it('Deve exibir a tela de listagem de ICMS Ajustes Apurações', () => {
    SpedIcmsAjustePage.validarTituloListagem();
    SpedIcmsAjustePage.validarUrlListagem();
  });

  it('Deve navegar para o cadastro ao clicar em Novo Cadastro', () => {
    SpedIcmsAjustePage.clicarNovoCadastro();
    SpedIcmsAjustePage.validarUrlCadastro();
    SpedIcmsAjustePage.validarTituloCadastro();
  });

  it('Deve preencher o formulário de cadastro de ICMS Ajuste Apuração', () => {
    const dados = {
      tipoAjuste: 'D',
      dataReferencia: '01/01/2025',
      valorAjuste: '100,00',
      mesReferencia: '1',
      descricaoAjuste: 'Ajuste de teste'
    };

    SpedIcmsAjustePage.validarTituloListagem();
    SpedIcmsAjustePage.clicarNovoCadastro();
    SpedIcmsAjustePage.validarUrlCadastro();

    // Preencher campos básicos
    SpedIcmsAjustePage.preencherFormulario(dados);

    // Validar que os campos foram preenchidos
    SpedIcmsAjustePage.validarCamposPreenchidos(dados);
  });

  it('Deve cancelar o cadastro clicando em Voltar', () => {
    SpedIcmsAjustePage.validarTituloListagem();
    SpedIcmsAjustePage.clicarNovoCadastro();
    SpedIcmsAjustePage.validarUrlCadastro();

    SpedIcmsAjustePage.clicarVoltar();

    SpedIcmsAjustePage.validarUrlListagem();
  });
});

