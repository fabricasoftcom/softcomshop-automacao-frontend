// RelatorioFiscalPisCofinsPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioFiscalPisCofinsLocators from "../../locators/Relatorios/RelatorioFiscalPisCofinsLocators";
import RelatoriosDrawerLocators from "../../locators/Relatorios/RelatoriosDrawerLocators";

class RelatorioFiscalPisCofinsPage {

    /**
     * Card no catálogo fica no nicho "Notas Fiscais" (colapsado); localiza href que contenha pis + cofins.
     */
    acessarRelatorioFiscalPisCofins() {
        RelatoriosPage.acessarMenuRelatorios();
        cy.get('.catalogo-relatorios', { timeout: 10000 }).should('be.visible');
        cy.contains('Notas Fiscais', { timeout: 15000 }).first().scrollIntoView().click({ force: true });
        cy.get('.catalogo-relatorio-item', { timeout: 15000 }).should('exist');
        cy.get('.catalogo-relatorio-item').then(($cards) => {
            const el = $cards.toArray().find((node) => {
                const href =
                    node.getAttribute('data-href') ||
                    node.getAttribute('data-href-url') ||
                    '';
                return /pis/i.test(href) && /cofins/i.test(href);
            });
            expect(el, 'Card Pis/Cofins com data-href').to.not.equal(undefined);
            cy.wrap(el).scrollIntoView().click({ force: true });
        });
        cy.url({ timeout: 25000 }).should('match', /pis-cofins|relatorio-fiscal-pis-cofins/i);
    }

    garantirFiltrosVisiveis() {
        cy.get('body').then(($body) => {
            const temBotaoFiltros = $body.find(RelatoriosDrawerLocators.btnFiltros).length > 0;
            if (temBotaoFiltros) {
                RelatoriosPage.garantirDrawerAberto(RelatorioFiscalPisCofinsLocators.filtrosContainer);
            } else {
                cy.get(RelatorioFiscalPisCofinsLocators.filtrosContainer, { timeout: 15000 }).should(
                    'be.visible',
                );
            }
        });
    }

    validarElementosBasicos() {
        cy.get(RelatorioFiscalPisCofinsLocators.titulo).first().should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioFiscalPisCofinsLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioFiscalPisCofinsLocators.periodoInput).should('be.visible');
        cy.get('body').then(($body) => {
            if ($body.find(RelatorioFiscalPisCofinsLocators.tipoDocumentoSelect).length > 0) {
                cy.get(RelatorioFiscalPisCofinsLocators.tipoDocumentoSelect).should('be.visible');
            }
            if ($body.find(RelatorioFiscalPisCofinsLocators.statusSelect).length > 0) {
                cy.get(RelatorioFiscalPisCofinsLocators.statusSelect).should('be.visible');
            }
        });
        cy.get(RelatorioFiscalPisCofinsLocators.botaoPesquisar).should('exist');
        cy.get('body').then(($body) => {
            const pdfId = $body.find(RelatorioFiscalPisCofinsLocators.botaoGerarPdf);
            const pdfLink = $body.find('a:contains("PDF")');
            if (pdfId.length > 0) {
                cy.get(RelatorioFiscalPisCofinsLocators.botaoGerarPdf).should('be.visible');
            } else if (pdfLink.length > 0) {
                cy.contains('a', 'PDF').should('be.visible');
            }
        });
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioFiscalPisCofinsLocators.periodoInput)
            .click({ force: true })
            .type('{selectall}{backspace}', { force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.get(RelatorioFiscalPisCofinsLocators.botaoPesquisar).click({ force: true });
        cy.get(RelatorioFiscalPisCofinsLocators.tabelaResultados, { timeout: 20000 })
            .should('exist')
            .should('be.visible');
    }
}

export default new RelatorioFiscalPisCofinsPage();
