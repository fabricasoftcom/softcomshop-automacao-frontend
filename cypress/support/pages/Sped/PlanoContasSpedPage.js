// PlanoContasSpedPage.js
import MenulateralFiscalPage from "../menulateral/MenulateralFiscalPage";
import PlanoContasSpedLocators from "../../locators/Sped/PlanoContasSpedLocators";

class PlanoContasSpedPage {
  // Navegação
  acessarViaMenu() {
    MenulateralFiscalPage.acessarSpedPlanoContas();
  }

  acessarListagem() {
    cy.visit('/sped/plano-de-contas');
  }

  acessarNovoCadastro() {
    cy.get(PlanoContasSpedLocators.btnNovoCadastro).click();
  }

  // Ações na Listagem
  clicarNovoCadastro() {
    cy.contains('a', 'Novo Cadastro').click();
  }

  clicarVoltar() {
    cy.get(PlanoContasSpedLocators.btnVoltar).click();
  }

  // Preenchimento do Formulário
  preencherDataInclusao(data) {
    cy.get(PlanoContasSpedLocators.campoDataInclusao)
      .clear()
      .type(data);
  }

  selecionarNatureza(valor) {
    cy.get(PlanoContasSpedLocators.campoNatureza).select(valor);
  }

  selecionarTipo(valor) {
    cy.get(PlanoContasSpedLocators.campoTipo).select(valor);
  }

  preencherNivel(nivel) {
    cy.get(PlanoContasSpedLocators.campoNivel)
      .clear()
      .type(nivel);
  }

  preencherCodigo(codigo) {
    cy.get(PlanoContasSpedLocators.campoCodigo)
      .clear()
      .type(codigo);
  }

  preencherNome(nome) {
    cy.get(PlanoContasSpedLocators.campoNome)
      .clear()
      .type(nome);
  }

  preencherCodigoReferenciado(codigo) {
    cy.get(PlanoContasSpedLocators.campoCodigoReferenciado)
      .clear()
      .type(codigo);
  }

  // Preenchimento completo do formulário
  preencherFormulario(dados) {
    if (dados.dataInclusao) {
      this.preencherDataInclusao(dados.dataInclusao);
    }
    if (dados.natureza) {
      this.selecionarNatureza(dados.natureza);
    }
    if (dados.tipo) {
      this.selecionarTipo(dados.tipo);
    }
    if (dados.nivel) {
      this.preencherNivel(dados.nivel);
    }
    if (dados.codigo) {
      this.preencherCodigo(dados.codigo);
    }
    if (dados.nome) {
      this.preencherNome(dados.nome);
    }
    if (dados.codigoReferenciado) {
      this.preencherCodigoReferenciado(dados.codigoReferenciado);
    }
  }

  // Ações de Botões
  clicarSalvar() {
    cy.get(PlanoContasSpedLocators.btnSalvar).click();
    // Aguarda o redirecionamento para a listagem
    cy.url({ timeout: 15000 }).should('include', '/sped/plano-de-contas');
    cy.url({ timeout: 15000 }).should('not.include', '/novo');
    // Aguarda o carregamento da página
    cy.get('#loading', { timeout: 10000 }).should('not.exist');
  }

  // Validações
  validarTituloListagem() {
    cy.get('#loading', { timeout: 10000 }).should('not.exist');
    cy.get(PlanoContasSpedLocators.tituloListagem, { timeout: 10000 })
      .should('be.visible')
      .contains('Listagem Plano de Contas');
  }

  validarMensagemSucesso() {
    cy.get('#toast-container', { timeout: 10000 }).should('be.visible');
    cy.get('#toast-container').contains('Sucesso', { timeout: 10000 });
  }

  validarUrlListagem() {
    cy.url().should('include', '/sped/plano-de-contas');
    cy.url().should('not.include', '/novo');
  }

  validarUrlCadastro() {
    cy.url().should('include', '/sped/plano-de-contas/novo');
  }
}

export default new PlanoContasSpedPage();

