import SpedIpiAjustePage from "../../support/pages/Sped/SpedIpiAjustePage";

describe('SPED - IPI Ajuste Apuração', { tags: ['@sped', '@ipi-ajuste', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.login(); // ADR-0004: Funcionalidades fiscais (SPED) devem usar cy.login()
    cy.visit('/');
    SpedIpiAjustePage.acessarViaMenu();
  });

  it('Deve exibir a tela de listagem de IPI Ajustes Apurações', () => {
    SpedIpiAjustePage.validarTituloListagem();
    SpedIpiAjustePage.validarUrlListagem();
  });

  it('Deve navegar para o cadastro ao clicar em Novo Cadastro', () => {
    SpedIpiAjustePage.clicarNovoCadastro();
    SpedIpiAjustePage.validarUrlCadastro();
    SpedIpiAjustePage.validarTituloCadastro();
  });

  it('Deve preencher o formulário de cadastro de IPI Ajuste Apuração', () => {
    const dados = {
      tipoAjuste: 'D',
      dataReferencia: '01/01/2025',
      valorAjuste: '100,00',
      descricaoAjuste: 'Ajuste de teste IPI'
    };

    SpedIpiAjustePage.validarTituloListagem();
    SpedIpiAjustePage.clicarNovoCadastro();
    SpedIpiAjustePage.validarUrlCadastro();

    // Preencher campos básicos
    SpedIpiAjustePage.preencherFormulario(dados);

    // Validar que os campos foram preenchidos
    SpedIpiAjustePage.validarCamposPreenchidos(dados);
  });

  it('Deve cancelar o cadastro clicando em Voltar', () => {
    SpedIpiAjustePage.validarTituloListagem();
    SpedIpiAjustePage.clicarNovoCadastro();
    SpedIpiAjustePage.validarUrlCadastro();

    SpedIpiAjustePage.clicarVoltar();

    SpedIpiAjustePage.validarUrlListagem();
  });
});

