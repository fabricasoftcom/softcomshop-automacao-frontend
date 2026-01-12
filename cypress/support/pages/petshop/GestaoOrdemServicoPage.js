import MenuPage from '../Menu/MenuPage';
import MenuLateralPetshopLocators from '../../locators/Petshop/MenuLateralPetshopLocators';
import GestaoOrdemServicoLocators from '../../locators/Petshop/GestaoOrdemServicoLocators';

class GestaoOrdemServicoPage {

    acessar() {
        MenuPage.waitForAppReady();

        // Expande menu Serviços e NFS-e
        cy.contains('Serviços e NFS-e').click({ force: true });
        cy.wait(500);

        // Clica no menu Gestão de Ordem de Serviço
        cy.get(MenuLateralPetshopLocators.menuGestaoOrdemServico).click({ force: true });

        this.validarCarregamento();
    }

    validarCarregamento() {
        cy.url().should('include', '/ordem-servico/painel');
        cy.get(GestaoOrdemServicoLocators.titulo).should('be.visible');
    }

    // Métodos de Filtros
    filtrarPorCliente(cliente) {
        cy.get(GestaoOrdemServicoLocators.filtroCliente).type(cliente);
        cy.wait(1000); // Aguarda debounce do autocomplete
        cy.get('.typeahead-container .typeahead-result').first().click();
    }

    filtrarPorNumeroOS(numero) {
        cy.get(GestaoOrdemServicoLocators.filtroNumeroOS).clear().type(numero);
    }

    filtrarPorPeriodo(dataInicio, dataFim) {
        cy.get(GestaoOrdemServicoLocators.filtroPeriodo).clear();
        cy.get(GestaoOrdemServicoLocators.filtroPeriodo).type(`${dataInicio} - ${dataFim}`);
    }

    filtrarPorVendasGeradas(valor) {
        cy.get(GestaoOrdemServicoLocators.filtroVendasGeradas).select(valor, { force: true });
    }

    filtrarPorNfseGeradas(valor) {
        cy.get(GestaoOrdemServicoLocators.filtroNfseGeradas).select(valor, { force: true });
    }

    filtrarPorNfseEmitida(valor) {
        cy.get(GestaoOrdemServicoLocators.filtroNfseEmitida).select(valor, { force: true });
    }

    aplicarFiltros() {
        cy.get(GestaoOrdemServicoLocators.btnPesquisar).click({ force: true });
        cy.get(GestaoOrdemServicoLocators.loading).should('not.exist');
    }

    // Métodos de Geração de Registros
    marcarGerarVendas() {
        cy.contains('Gerar Vendas').then(($label) => {
            const checkbox = $label.siblings('input[type="checkbox"]').first();
            if (checkbox.length > 0) {
                cy.wrap(checkbox).check({ force: true });
            } else {
                // Tenta encontrar pelo input próximo
                cy.get('input[type="checkbox"]').eq(0).check({ force: true });
            }
        });
    }

    desmarcarGerarVendas() {
        cy.contains('Gerar Vendas').then(($label) => {
            const checkbox = $label.siblings('input[type="checkbox"]').first();
            if (checkbox.length > 0) {
                cy.wrap(checkbox).uncheck({ force: true });
            } else {
                cy.get('input[type="checkbox"]').eq(0).uncheck({ force: true });
            }
        });
    }

    marcarGerarNfse() {
        cy.contains('Gerar NFSe').then(($label) => {
            const checkbox = $label.siblings('input[type="checkbox"]').first();
            if (checkbox.length > 0) {
                cy.wrap(checkbox).check({ force: true });
            } else {
                cy.get('input[type="checkbox"]').eq(1).check({ force: true });
            }
        });
    }

    desmarcarGerarNfse() {
        cy.contains('Gerar NFSe').then(($label) => {
            const checkbox = $label.siblings('input[type="checkbox"]').first();
            if (checkbox.length > 0) {
                cy.wrap(checkbox).uncheck({ force: true });
            } else {
                cy.get('input[type="checkbox"]').eq(1).uncheck({ force: true });
            }
        });
    }

    marcarEmitirNfse() {
        cy.contains('Emitir NFSe').then(($label) => {
            const checkbox = $label.siblings('input[type="checkbox"]').first();
            if (checkbox.length > 0) {
                cy.wrap(checkbox).check({ force: true });
            } else {
                cy.get('input[type="checkbox"]').eq(2).check({ force: true });
            }
        });
    }

    desmarcarEmitirNfse() {
        cy.contains('Emitir NFSe').then(($label) => {
            const checkbox = $label.siblings('input[type="checkbox"]').first();
            if (checkbox.length > 0) {
                cy.wrap(checkbox).uncheck({ force: true });
            } else {
                cy.get('input[type="checkbox"]').eq(2).uncheck({ force: true });
            }
        });
    }

    gerarRegistrosSelecionados() {
        cy.get(GestaoOrdemServicoLocators.btnGerarRegistrosSelecionados).click({ force: true });
        cy.get(GestaoOrdemServicoLocators.loading).should('not.exist');
    }

    // Métodos de Validação
    validarPresencaTabela() {
        cy.get(GestaoOrdemServicoLocators.tabelaOS).should('be.visible');
    }

    validarListagemVazia() {
        cy.get(GestaoOrdemServicoLocators.mensagemSemResultados).should('be.visible');
    }

    validarResumo() {
        cy.get(GestaoOrdemServicoLocators.quantidadeTotal).should('exist');
        cy.get(GestaoOrdemServicoLocators.quantidadeSelecionados).should('exist');
        cy.get(GestaoOrdemServicoLocators.valorTotal).should('exist');
    }

    validarSecaoGeracao() {
        cy.get(GestaoOrdemServicoLocators.tituloGeracao).should('be.visible');
        cy.contains('Gerar Vendas').should('be.visible');
        cy.contains('Gerar NFSe').should('be.visible');
        cy.contains('Emitir NFSe').should('be.visible');
    }
}

export default new GestaoOrdemServicoPage();

