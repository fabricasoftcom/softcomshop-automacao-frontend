// RelatorioFiscalSaidaSinteticoPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioFiscalSaidaSinteticoLocators, {
    RELATORIO_FISCAL_SAIDA_SINTETICO_ROTA,
} from "../../locators/Relatorios/RelatorioFiscalSaidaSinteticoLocators";

class RelatorioFiscalSaidaSinteticoPage {

    acessarRelatorioFiscalSaidaSintetico() {
        cy.visit(RELATORIO_FISCAL_SAIDA_SINTETICO_ROTA);
        cy.url().should('contain', '/relatorio-v2/relatorio-fiscal-sintetico');
    }

    garantirFiltrosVisiveis() {
        RelatoriosPage.garantirDrawerAberto(RelatorioFiscalSaidaSinteticoLocators.filtrosContainer);
    }

    validarElementosBasicos() {
        cy.get(RelatorioFiscalSaidaSinteticoLocators.titulo).first().should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioFiscalSaidaSinteticoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioFiscalSaidaSinteticoLocators.periodoInput).should('be.visible');
        cy.get(RelatorioFiscalSaidaSinteticoLocators.tipoDocumentoSelect).should('exist');
        cy.get(RelatorioFiscalSaidaSinteticoLocators.statusSelect).should('exist');
        cy.get(RelatorioFiscalSaidaSinteticoLocators.serieInput).should('exist');
        cy.get(RelatorioFiscalSaidaSinteticoLocators.botaoPesquisar).should('exist');
        cy.get('body').then(($body) => {
            const pdfId = $body.find(RelatorioFiscalSaidaSinteticoLocators.botaoGerarPdf);
            const pdfLink = $body.find('a:contains("PDF")');
            if (pdfId.length > 0) {
                cy.get(RelatorioFiscalSaidaSinteticoLocators.botaoGerarPdf).should('be.visible');
            } else if (pdfLink.length > 0) {
                cy.contains('a', 'PDF').should('be.visible');
            }
        });
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioFiscalSaidaSinteticoLocators.periodoInput)
            .click({ force: true })
            .type('{selectall}{backspace}', { force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.get(RelatorioFiscalSaidaSinteticoLocators.botaoPesquisar).first().click({ force: true });
        cy.get(RelatorioFiscalSaidaSinteticoLocators.tabelaResultados, { timeout: 20000 })
            .should('exist')
            .should('be.visible');
    }

    validarTabelaComDados() {
        cy.get(RelatorioFiscalSaidaSinteticoLocators.tabelaResultados, { timeout: 20000 })
            .should('exist')
            .should('be.visible');
        cy.get(RelatorioFiscalSaidaSinteticoLocators.tabelaResultados).contains('CFOP').should('be.visible');
        cy.get(RelatorioFiscalSaidaSinteticoLocators.linhasTabelaResultados)
            .should('have.length.greaterThan', 0);
    }
}

export default new RelatorioFiscalSaidaSinteticoPage();
