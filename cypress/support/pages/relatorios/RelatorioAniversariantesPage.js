// RelatorioAniversariantesPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioAniversariantesLocators from "../../locators/Relatorios/RelatorioAniversariantesLocators";

class RelatorioAniversariantesPage {

    acessarRelatorioAniversariantes() {
        RelatoriosPage.acessarRelatorioClientesAniversariantes();
        cy.url().should('contain', '/relatorio-v2/aniversariante');
    }

    abrirFiltros() {
        cy.get(RelatorioAniversariantesLocators.btnFiltros).should('be.visible').click();
        cy.get(RelatorioAniversariantesLocators.drawerTitulo).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioAniversariantesLocators.container).should('be.visible');
        cy.get(RelatorioAniversariantesLocators.tituloRelatorio).should('be.visible');

        cy.get(RelatorioAniversariantesLocators.btnFiltros).should('be.visible');
        cy.get(RelatorioAniversariantesLocators.linkPdf).should('be.visible');
        cy.get(RelatorioAniversariantesLocators.btnLimparTodos).should('be.visible');

        cy.get(RelatorioAniversariantesLocators.tituloListagem).should('be.visible');

        // Campos de filtro ficam dentro do drawer (aberto via botão "Filtros")
        this.abrirFiltros();
        cy.get(RelatorioAniversariantesLocators.mesInput).should('be.visible');
        cy.get(RelatorioAniversariantesLocators.cidadeAutocomplete).should('be.visible');
        cy.get(RelatorioAniversariantesLocators.btnAplicarFiltros).should('be.visible');

    }

    preencherMes(mesMM) {
        const mesTexto = {
          '01':'Jan','02':'Fev','03':'Mar','04':'Abr','05':'Mai','06':'Jun',
          '07':'Jul','08':'Ago','09':'Set','10':'Out','11':'Nov','12':'Dez',
        }[mesMM];

        this.abrirFiltros();
        cy.wait(1000);
        cy.get(RelatorioAniversariantesLocators.mesInput).click();
        cy.wait(1000);
        cy.get(RelatorioAniversariantesLocators.datepickerMonth)
          .contains(mesTexto)
          .click({ force: true });
        cy.get(RelatorioAniversariantesLocators.mesInput).should('have.value', mesMM);
        cy.get(RelatorioAniversariantesLocators.btnAplicarFiltros).should('be.visible').click();

      }

    preencherCidade(cidade) {
        this.abrirFiltros();
        cy.get(RelatorioAniversariantesLocators.cidadeAutocomplete)
            .should('be.visible')
            .clear()
            .type(cidade);
    }

    pesquisar() {
        this.abrirFiltros();
        cy.get(RelatorioAniversariantesLocators.btnAplicarFiltros).should('be.visible').click();
        cy.url().should('contain', '/relatorio-v2/aniversariante');
        cy.get(RelatorioAniversariantesLocators.container).should('be.visible');
        cy.get(RelatorioAniversariantesLocators.tituloListagem).should('be.visible');
    }
}

export default new RelatorioAniversariantesPage();

