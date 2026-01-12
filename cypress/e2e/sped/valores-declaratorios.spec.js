// valores-declaratorios.spec.js
import ValoresDeclaratoriosPage from "../../support/pages/Sped/ValoresDeclaratoriosPage";

describe("SPED > Valores Declaratórios", { tags: ["@sped", "@valores-declaratorios", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.login(); // ADR-0004: Funcionalidades fiscais (SPED) devem usar cy.login()
    cy.visit('/');
    ValoresDeclaratoriosPage.acessarViaMenu();
  });

  it("Deve exibir a tela de listagem de Valores Declaratórios", () => {
    ValoresDeclaratoriosPage.validarTituloListagem();
    ValoresDeclaratoriosPage.validarUrlListagem();
  });

  it("Deve navegar para o cadastro ao clicar em Novo Cadastro", () => {
    ValoresDeclaratoriosPage.clicarNovoCadastro();
    ValoresDeclaratoriosPage.validarUrlCadastro();
    ValoresDeclaratoriosPage.validarTituloCadastro();
  });

  it("Deve preencher o formulário de cadastro de valores declaratórios", () => {
    const dados = {
      dataReferencia: '01/01/2025',
      valorAjuste: '100,00',
    };

    ValoresDeclaratoriosPage.validarTituloListagem();
    ValoresDeclaratoriosPage.clicarNovoCadastro();
    ValoresDeclaratoriosPage.validarUrlCadastro();

    // Preencher apenas campos básicos (sem autocomplete que pode causar problemas)
    ValoresDeclaratoriosPage.preencherFormulario(dados);

    // Validar que os campos foram preenchidos
    ValoresDeclaratoriosPage.validarCamposPreenchidos(dados);
  });

  it("Deve cancelar o cadastro clicando em Voltar", () => {
    ValoresDeclaratoriosPage.validarTituloListagem();
    ValoresDeclaratoriosPage.clicarNovoCadastro();
    ValoresDeclaratoriosPage.validarUrlCadastro();

    ValoresDeclaratoriosPage.clicarVoltar();

    ValoresDeclaratoriosPage.validarUrlListagem();
  });
});

