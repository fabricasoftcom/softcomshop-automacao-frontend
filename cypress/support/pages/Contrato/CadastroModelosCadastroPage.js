import CadastroModelosCadastroLocators from '../../locators/Contrato/CadastroModelosCadastroLocators';

class CadastroModelosCadastroPage {
  visitar() {
    cy.visit(CadastroModelosCadastroLocators.url);
  }

  preencherTitulo(titulo) {
    cy.get(CadastroModelosCadastroLocators.titulo).type(titulo);
    return this;
  }

  // Método placeholder para CKEditor - implementação real pode variar
  preencherEditor() {
    // Exemplo genérico, ajustar conforme CKEditor específico
    // cy.get(CadastroModelosCadastroLocators.editor).type(conteudo);
    return this;
  }

  clicarSalvar() {
    cy.get(CadastroModelosCadastroLocators.btnSalvar).click();
  }
}

export default new CadastroModelosCadastroPage();

