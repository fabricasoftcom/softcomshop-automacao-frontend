// RelatorioListagemClientesPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioListagemClientesLocators from "../../locators/Relatorios/RelatorioListagemClientesLocators";

class RelatorioListagemClientesPage {

    acessarRelatorioListagemClientes() {
        RelatoriosPage.acessarRelatorioClientesDadosClientes();
        cy.url().should('contain', '/relatorio/dados-clientes');
    }

    validarElementosBasicos() {
        cy.contains('h5', /Listagem dos Clientes/i).should('be.visible');
        cy.get(RelatorioListagemClientesLocators.tipoClienteAutocomplete).should('be.visible');
        cy.get(RelatorioListagemClientesLocators.atendenteAutocomplete).should('be.visible');
        cy.get(RelatorioListagemClientesLocators.periodoCadastroInput).should('be.visible');
        cy.get(RelatorioListagemClientesLocators.tipoPessoaSelect).should('be.visible');
        cy.get(RelatorioListagemClientesLocators.bloqueadoSelect).should('be.visible');
        cy.get(RelatorioListagemClientesLocators.desativadoSelect).should('be.visible');
        cy.get(RelatorioListagemClientesLocators.bairroAutocomplete).should('be.visible');
        cy.get(RelatorioListagemClientesLocators.ufSelect).should('be.visible');
        cy.get(RelatorioListagemClientesLocators.cidadeAutocomplete).should('be.visible');
        cy.get(RelatorioListagemClientesLocators.cepInput).should('be.visible');
        cy.get(RelatorioListagemClientesLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioListagemClientesLocators.botaoGerarPdf).should('be.visible');
        cy.get(RelatorioListagemClientesLocators.botaoVendaMais).should('be.visible');
    }

    preencherTipoCliente(tipoCliente) {
        cy.get(RelatorioListagemClientesLocators.tipoClienteAutocomplete)
            .clear({ force: true })
            .type(tipoCliente, { force: true });
    }

    preencherPeriodoCadastro(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioListagemClientesLocators.periodoCadastroInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    selecionarTipoPessoa(tipoPessoa) {
        cy.get(RelatorioListagemClientesLocators.tipoPessoaSelect).select(tipoPessoa);
    }

    selecionarBloqueado(bloqueado) {
        cy.get(RelatorioListagemClientesLocators.bloqueadoSelect).select(bloqueado);
    }

    selecionarDesativado(desativado) {
        cy.get(RelatorioListagemClientesLocators.desativadoSelect).select(desativado);
    }

    selecionarUF(uf) {
        cy.get(RelatorioListagemClientesLocators.ufSelect).select(uf);
    }

    preencherCidade(cidade) {
        cy.get(RelatorioListagemClientesLocators.cidadeAutocomplete)
            .clear({ force: true })
            .type(cidade, { force: true });
    }

    preencherCEP(cep) {
        cy.get(RelatorioListagemClientesLocators.cepInput)
            .clear({ force: true })
            .type(cep, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/dados-clientes**').as('relatorioListagemClientes');
        cy.get(RelatorioListagemClientesLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioListagemClientes').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioListagemClientesPage();

