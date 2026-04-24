// RelatorioFiscalEntradaSinteticoPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioFiscalEntradaSinteticoLocators, {
    RELATORIO_FISCAL_ENTRADA_SINTETICO_ROTA,
} from "../../locators/Relatorios/RelatorioFiscalEntradaSinteticoLocators";

class RelatorioFiscalEntradaSinteticoPage {

    acessarRelatorioFiscalEntradaSintetico() {
        cy.visit(RELATORIO_FISCAL_ENTRADA_SINTETICO_ROTA);
        cy.url().should('contain', '/relatorio-v2/fiscal-entrada-sintetico');
    }

    garantirFiltrosVisiveis() {
        RelatoriosPage.garantirDrawerAberto(RelatorioFiscalEntradaSinteticoLocators.filtrosContainer);
    }

    validarElementosBasicos() {
        cy.get(RelatorioFiscalEntradaSinteticoLocators.titulo).first().should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioFiscalEntradaSinteticoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioFiscalEntradaSinteticoLocators.periodoInput).should('be.visible');
        cy.get(RelatorioFiscalEntradaSinteticoLocators.botaoPesquisar).should('exist');
        cy.get('body').then(($body) => {
            const pdfId = $body.find(RelatorioFiscalEntradaSinteticoLocators.botaoGerarPdf);
            const pdfLink = $body.find('a:contains("PDF")');
            if (pdfId.length > 0) {
                cy.get(RelatorioFiscalEntradaSinteticoLocators.botaoGerarPdf).should('be.visible');
            } else if (pdfLink.length > 0) {
                cy.contains('a', 'PDF').should('be.visible');
            }
        });
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioFiscalEntradaSinteticoLocators.periodoInput)
            .click({ force: true })
            .type('{selectall}{backspace}', { force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.get(RelatorioFiscalEntradaSinteticoLocators.botaoPesquisar).click({ force: true });
        cy.get(RelatorioFiscalEntradaSinteticoLocators.tabelaResultados, { timeout: 20000 })
            .should('exist')
            .should('be.visible');
    }
}

export default new RelatorioFiscalEntradaSinteticoPage();
