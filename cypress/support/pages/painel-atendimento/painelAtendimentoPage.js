import PainelAtendimentoLocators from "../../locators/PainelAtendimentoLocators";

class PainelAtendimentoPage {
    acessarPagina() {
        cy.visit('/petshop/painel-de-atendimento');
        cy.get(PainelAtendimentoLocators.abaPainelAtendimentos).should('have.class', 'active');
    }

    preencherDataAtendimento(data) {
        cy.get(PainelAtendimentoLocators.campoDataAtendimento).clear().type(data);
    }

    selecionarTipoAtendimento(tipo) {
        cy.get(PainelAtendimentoLocators.campoTipoAtendimento).clear().type(tipo);
        cy.wait(500);
        cy.get(PainelAtendimentoLocators.campoTipoAtendimento).type('{enter}');
    }

    selecionarFuncionario(funcionario) {
        cy.get(PainelAtendimentoLocators.campoFuncionario).clear().type(funcionario);
        cy.wait(500);
        cy.get(PainelAtendimentoLocators.campoFuncionario).type('{enter}');
    }

    selecionarStatus(status) {
        cy.get(PainelAtendimentoLocators.campoStatus).select(status);
    }

    clicarBotaoPesquisar() {
        cy.get(PainelAtendimentoLocators.botaoPesquisar).click();
    }

    validarCardKanban(status, nomeAnimal) {
        let kanban;
        switch (status.toUpperCase()) {
            case 'AGENDADO': kanban = PainelAtendimentoLocators.kanbanAgendado; break;
            case 'EM_ESPERA': kanban = PainelAtendimentoLocators.kanbanEmEspera; break;
            case 'EM_ATENDIMENTO': kanban = PainelAtendimentoLocators.kanbanEmAtendimento; break;
            case 'CONCLUIDO': kanban = PainelAtendimentoLocators.kanbanConcluido; break;
        }

        cy.get(kanban).should('contain', nomeAnimal);
    }

    abrirCardKanbanPeloNome(nomeAnimal) {
        cy.contains(PainelAtendimentoLocators.cardKanban, nomeAnimal).click();
    }

    clicarAdicionarAtendimento() {
        cy.get(PainelAtendimentoLocators.botaoAdicionarAtendimento).click();
    }
}

export default new PainelAtendimentoPage();
