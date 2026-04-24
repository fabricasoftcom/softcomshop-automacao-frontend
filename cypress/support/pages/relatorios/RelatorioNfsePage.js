// RelatorioNfsePage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioNfseLocators from "../../locators/Relatorios/RelatorioNfseLocators";
import RelatoriosGeraisLocators from "../../locators/Relatorios/RelatoriosGeraisLocators";
import RelatoriosLocators from "../../locators/Relatorios/RelatoriosLocators";

class RelatorioNfsePage {

    /**
     * Card NFSe costuma ficar no nicho "Notas Fiscais" (colapsado). Expande o nicho,
     * filtra pela barra "Buscar relatório por nome" e localiza o card pelo data-href.
     */
    acessarRelatorioNfse() {
        RelatoriosPage.acessarMenuRelatorios();
        cy.get(RelatoriosLocators.containerCatalogo, { timeout: 10000 }).should('be.visible');
        cy.contains('Notas Fiscais', { timeout: 15000 }).first().scrollIntoView().click({ force: true });
        cy.get(RelatoriosGeraisLocators.campoBuscaPagina, { timeout: 15000 })
            .should('be.visible')
            .click({ force: true })
            .clear({ force: true })
            .type('NFSe', { force: true });
        cy.get(RelatoriosLocators.cardRelatorio, { timeout: 20000 }).should('exist');
        cy.get(RelatoriosLocators.cardRelatorio).then(($cards) => {
            const comHref = $cards.toArray().filter((node) => {
                const href =
                    node.getAttribute('data-href') ||
                    node.getAttribute('data-href-url') ||
                    '';
                return /relatorio-nfse/i.test(href);
            });
            expect(comHref.length, 'Card relatório NFSe no catálogo').to.be.greaterThan(0);
            const visivel = comHref.find((node) => Cypress.$(node).is(':visible'));
            const el = visivel || comHref[0];
            const href = el.getAttribute('data-href') || el.getAttribute('data-href-url');
            expect(href, 'data-href do NFSe').to.be.a('string').and.not.be.empty;
            const urlPath = href.startsWith('http') ? new URL(href).pathname : href;
            cy.visit(urlPath);
        });
        cy.url({ timeout: 20000 }).should('match', /relatorio-nfse/i);
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioNfseLocators.filtrosContainer, { timeout: 15000 }).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioNfseLocators.titulo).first().should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioNfseLocators.periodoInput).should('be.visible');
        cy.get(RelatorioNfseLocators.statusSelect).should('be.visible');
        cy.get(RelatorioNfseLocators.botaoPesquisar).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioNfseLocators.periodoInput)
            .click({ force: true })
            .type('{selectall}{backspace}', { force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.get(RelatorioNfseLocators.botaoPesquisar).click({ force: true });
        cy.get(RelatorioNfseLocators.tabelaResultados, { timeout: 20000 })
            .should('exist')
            .should('be.visible');
    }
}

export default new RelatorioNfsePage();
