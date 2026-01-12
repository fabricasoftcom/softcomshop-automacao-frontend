import ServicoListagemLocators from '../../locators/Servico/ServicoListagemLocators';

class ServicoListagemPage {
  visitar() {
    cy.visit(ServicoListagemLocators.url);
  }

  clicarNovoCadastro() {
    cy.get(ServicoListagemLocators.btnNovo).click();
  }

  pesquisar() {
    // Implementar se necessário, geralmente é um input antes do botão
    cy.get(ServicoListagemLocators.btnPesquisa).click();
  }

  excluirSelecionados() {
    cy.get(ServicoListagemLocators.btnExcluirSelecionados).click();
  }
}

export default new ServicoListagemPage();

