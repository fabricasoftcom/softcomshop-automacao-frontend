// RelatorioFiscalSaidaAnaliticoPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioFiscalSaidaAnaliticoLocators, {
    RELATORIO_FISCAL_SAIDA_ANALITICO_ROTA,
} from "../../locators/Relatorios/RelatorioFiscalSaidaAnaliticoLocators";

class RelatorioFiscalSaidaAnaliticoPage {

    acessarRelatorioFiscalSaidaAnalitico() {
        cy.visit(RELATORIO_FISCAL_SAIDA_ANALITICO_ROTA);
        cy.url().should('contain', '/relatorio-v2/fiscal-saida-analitico');
        cy.url().should('not.include', 'sintetico');
    }

    garantirFiltrosVisiveis() {
        RelatoriosPage.garantirDrawerAberto(RelatorioFiscalSaidaAnaliticoLocators.filtrosContainer);
    }

    validarElementosBasicos() {
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.titulo).first().should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.periodoInput).should('be.visible');
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.tipoDocumentoSelect).should('exist');
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.statusSelect).should('exist');
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.serieInput).should('exist');
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.botaoPesquisar).should('exist');
        cy.get('body').then(($body) => {
            const pdfId = $body.find(RelatorioFiscalSaidaAnaliticoLocators.botaoGerarPdf);
            const pdfLink = $body.find('a:contains("PDF")');
            if (pdfId.length > 0) {
                cy.get(RelatorioFiscalSaidaAnaliticoLocators.botaoGerarPdf).should('be.visible');
            } else if (pdfLink.length > 0) {
                cy.contains('a', 'PDF').should('be.visible');
            }
        });
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.periodoInput)
            .click({ force: true })
            .type('{selectall}{backspace}', { force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.botaoPesquisar).first().click({ force: true });
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.tabelaResultados, { timeout: 20000 })
            .should('exist')
            .should('be.visible');
    }
    validarTabelaComDados() {
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.tabelaResultados, { timeout: 20000 })
            .should('exist')
            .should('be.visible');
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.tabelaResultados).contains("CFOP").should('be.visible');
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.linhasTabelaResultados)
            .should('have.length.greaterThan', 0);
    }
}

export default new RelatorioFiscalSaidaAnaliticoPage();
