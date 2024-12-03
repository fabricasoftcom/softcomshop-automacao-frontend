import NovoCadastroVinculoFiscalLocators from "../../locators/NovoCadastroVinculoFiscalLocators";

class NovoCadastroVinculoFiscalPage {
    // Acessa a página de Novo Cadastro de Vínculo Fiscal
    visit() {
        cy.get(NovoCadastroVinculoFiscalLocators.btnNovoCadastro).click(); // Clica no botão Novo Cadastro
        cy.url().should('include', '/novo'); // Verifica se a URL está correta
    }

    // Preenche o campo "Nome do Vínculo"
    preencherNomeVinculo(nome) {
        cy.get(NovoCadastroVinculoFiscalLocators.campoNomeVinculo).clear().type(nome); // Preenche o campo com o nome do vínculo
    }

    // Preenche o campo "Tipo do Item"
    preencherTipoItem(tipo) {
        cy.get(NovoCadastroVinculoFiscalLocators.campoTipoItem).clear().type(tipo); // Preenche o campo com o tipo do item
    }

    // Submete o formulário
    salvar() {
        cy.get(NovoCadastroVinculoFiscalLocators.btnSalvar).click(); // Clica no botão de salvar
    }

    // Verifica se a mensagem de erro 500 é exibida
    verificarErroServidor() {
        cy.get(NovoCadastroVinculoFiscalLocators.msgErroServidor).should('be.visible');  // Verifica a visibilidade da mensagem de erro
    }

    // Verifica se o formulário foi enviado com sucesso
    verificarSucessoCadastro() {
        // Pode ser uma verificação de sucesso, como um redirecionamento ou uma mensagem de sucesso
        cy.url().should('include', '/vinculos-fiscais');  // Verifica se a URL foi alterada após o cadastro
    }
}

export default new NovoCadastroVinculoFiscalPage();
