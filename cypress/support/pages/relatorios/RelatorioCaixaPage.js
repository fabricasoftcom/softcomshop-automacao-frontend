// RelatorioCaixaPage.js
import relatoriospage from "./relatoriospage";
import RelatorioCaixaLocators from "../../locators/RelatorioCaixaLocators";

class RelatorioCaixaPage {

    acessarRelatorioCaixa() {
        relatoriospage.acessarRelatorioFinanceiroCaixa();
        cy.url().should('contain', '/relatorio/vendas-caixa');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioCaixaLocators.filtrosContainer).then(($form) => {
            if (!$form.is(':visible')) {
                cy.get(RelatorioCaixaLocators.botaoToggleFiltros).click();
            }
        });
    }

    validarElementosBasicos() {
        cy.contains('h5', /Relat.*rio de Caixa/i).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioCaixaLocators.tipoSelect).should('be.visible');
        cy.get(RelatorioCaixaLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioCaixaLocators.vendedorAutocomplete).should('be.visible');
        cy.get(RelatorioCaixaLocators.dispositivoAutocomplete).should('be.visible');
        cy.get(RelatorioCaixaLocators.usuarioCaixaAutocomplete).should('be.visible');
        cy.get(RelatorioCaixaLocators.turnoInput).should('be.visible');
        cy.get(RelatorioCaixaLocators.periodoInput).should('be.visible');
        cy.get(RelatorioCaixaLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioCaixaLocators.botaoGerarPdf).should('be.visible');
        cy.get(RelatorioCaixaLocators.botaoImprimir80mm).should('be.visible');
    }

    selecionarTipo(tipoValue) {
        cy.get(RelatorioCaixaLocators.tipoSelect).select(tipoValue);
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioCaixaLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    preencherTurno(turno) {
        cy.get(RelatorioCaixaLocators.turnoInput)
            .clear({ force: true })
            .type(turno, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/vendas-caixa**').as('relatorioCaixa');
        cy.get(RelatorioCaixaLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioCaixa').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioCaixaPage();
