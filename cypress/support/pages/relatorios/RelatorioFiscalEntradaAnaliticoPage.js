// RelatorioFiscalEntradaAnaliticoPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioFiscalEntradaAnaliticoLocators, {
    RELATORIO_FISCAL_ENTRADA_ANALITICO_ROTA,
} from "../../locators/Relatorios/RelatorioFiscalEntradaAnaliticoLocators";

class RelatorioFiscalEntradaAnaliticoPage {

    acessarRelatorioFiscalEntradaAnalitico() {
        cy.visit(RELATORIO_FISCAL_ENTRADA_ANALITICO_ROTA);
        cy.url().should('contain', '/relatorio-v2/fiscal-entrada-analitico');
    }

    garantirFiltrosVisiveis() {
        RelatoriosPage.garantirDrawerAberto(RelatorioFiscalEntradaAnaliticoLocators.filtrosContainer);
    }

    validarElementosBasicos() {
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.titulo).first().should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.periodoInput).should('be.visible');
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.botaoPesquisar).should('exist');
        cy.get('body').then(($body) => {
            const pdfId = $body.find(RelatorioFiscalEntradaAnaliticoLocators.botaoGerarPdf);
            const pdfLink = $body.find('a:contains("PDF")');
            if (pdfId.length > 0) {
                cy.get(RelatorioFiscalEntradaAnaliticoLocators.botaoGerarPdf).should('be.visible');
            } else if (pdfLink.length > 0) {
                cy.contains('a', 'PDF').should('be.visible');
            }
        });
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.periodoInput)
            .click({ force: true })
            .type('{selectall}{backspace}', { force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.botaoPesquisar).click({ force: true });
        // Submit pode recarregar a página (sem XHR); valida resultado na DOM
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.tabelaResultados, { timeout: 20000 })
            .should('exist')
            .should('be.visible');
    }
}

export default new RelatorioFiscalEntradaAnaliticoPage();

