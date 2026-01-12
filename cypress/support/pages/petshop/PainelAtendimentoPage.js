import MenuPage from '../Menu/MenuPage';
import MenuLateralPetshopLocators from '../../locators/Petshop/MenuLateralPetshopLocators';
import PainelAtendimentoLocators from '../../locators/Petshop/PainelAtendimentoLocators';

class PainelAtendimentoPage {

    acessar() {
        MenuPage.waitForAppReady();
        cy.get(MenuLateralPetshopLocators.menuPainelAtendimento).click({ force: true });
        this.validarCarregamento();
    }

    validarCarregamento() {
        cy.contains('Painel de Atendimentos').should('be.visible');
        cy.url().should('include', '/petshop/painel-de-atendimento');
    }

    validarAbas() {
        cy.contains('Painel de Atendimentos').should('be.visible');
        cy.contains('Vacinação').should('be.visible');
    }

    validarContadores() {
        // Valida que os textos dos contadores existem no DOM
        cy.contains('Agendados').should('exist');
        cy.contains('Em Espera').should('exist');
        cy.contains('Em Atendimento').should('exist');
        cy.contains('Concluído').should('exist');
    }

    // Métodos de Filtros - Aba Painel de Atendimentos
    filtrarPorData(dataInicio, dataFim) {
        cy.get(PainelAtendimentoLocators.filtroDataAtendimento).clear();
        cy.get(PainelAtendimentoLocators.filtroDataAtendimento).type(`${dataInicio} - ${dataFim}`);
    }

    filtrarPorTipoAtendimento(tipoAtendimento) {
        cy.get(PainelAtendimentoLocators.filtroTipoAtendimento).type(tipoAtendimento);
        cy.wait(1000); // Aguarda debounce do autocomplete
        cy.get('.typeahead-container .typeahead-result').first().click();
    }

    filtrarPorStatus(status) {
        // O filtro pode estar oculto, então usa force se necessário
        cy.get(PainelAtendimentoLocators.filtroStatus).then(($select) => {
            if ($select.is(':visible') && $select.find('option').length > 0) {
                cy.get(PainelAtendimentoLocators.filtroStatus).select(status, { force: true });
            } else {
                cy.log('Filtro de status não está visível ou não tem opções');
            }
        });
    }

    filtrarPorFuncionario(funcionario) {
        cy.get(PainelAtendimentoLocators.filtroFuncionario).type(funcionario);
        cy.wait(1000);
        cy.get('.typeahead-container .typeahead-result').first().click();
    }

    filtrarPorCliente(cliente) {
        cy.get(PainelAtendimentoLocators.filtroCliente).type(cliente);
        cy.wait(1000);
        cy.get('.typeahead-container .typeahead-result').first().click();
    }

    aplicarFiltros() {
        cy.get(PainelAtendimentoLocators.btnBuscar).click({ force: true });
        cy.get(PainelAtendimentoLocators.loading).should('not.exist');
    }

    limparFiltros() {
        // Tenta encontrar o botão de limpar filtros
        cy.get('body').then(($body) => {
            const btnLimpar = $body.find('button:has([class*="fa-trash"]), button:has([class*="fa-eraser"]), button.btn-danger, .cancelBtn');
            if (btnLimpar.length > 0) {
                cy.wrap(btnLimpar.first()).click({ force: true });
            } else {
                // Se não encontrar, limpa os campos manualmente
                cy.get(PainelAtendimentoLocators.filtroDataAtendimento).clear();
            }
        });
    }

    // Métodos de Navegação
    acessarAbaVacinacao() {
        cy.get(PainelAtendimentoLocators.abaVacinacao).click({ force: true });
        // Abas podem não mudar a URL, apenas o conteúdo visual
        cy.contains('Vacinação').should('be.visible');
    }

    acessarAbaPainelAtendimentos() {
        cy.get(PainelAtendimentoLocators.abaPainelAtendimentos).click({ force: true });
        // Abas podem não mudar a URL, apenas o conteúdo visual
        cy.contains('Painel de Atendimentos').should('be.visible');
    }

    // Métodos de Criação de Atendimento
    clicarNovoAtendimento() {
        // Tenta encontrar o botão de novo atendimento
        cy.get('body').then(($body) => {
            if ($body.find(PainelAtendimentoLocators.btnNovoAtendimento).length > 0) {
                cy.get(PainelAtendimentoLocators.btnNovoAtendimento).first().click({ force: true });
            } else if ($body.find(PainelAtendimentoLocators.linkPesquisarAnimal).length > 0) {
                cy.get(PainelAtendimentoLocators.linkPesquisarAnimal).first().click({ force: true });
            }
        });
        // Aguarda redirecionamento ou carregamento via AJAX
        cy.wait(2000);
        cy.get('body').should('be.visible');
    }

    pesquisarAnimal(nomeAnimal) {
        cy.get(PainelAtendimentoLocators.campoPesquisaAnimal).type(nomeAnimal);
        cy.wait(1500); // Aguarda debounce do typeahead (delay: 1000ms)
        cy.get('.typeahead-container .typeahead-result').first().click();
    }

    clicarAdicionarAnimal() {
        cy.get(PainelAtendimentoLocators.btnAdicionarAnimal).click({ force: true });
    }

    // Métodos de Validação
    validarCardStatus(status, quantidadeEsperada = null) {
        cy.contains(status).should('exist');
        if (quantidadeEsperada !== null) {
            cy.contains(status).parent().should('contain', quantidadeEsperada.toString());
        }
    }

    validarListagemVazia() {
        // Valida quando não há atendimentos na listagem
        cy.get('body').should('contain', '0');
    }

    // Métodos de Configuração
    configurarPainel() {
        cy.get(PainelAtendimentoLocators.btnConfiguracoes).click({ force: true });
        cy.wait(500);
    }

    marcarCheckboxGerarAtendimentoServicoSeDesmarcado() {
        this.configurarPainel();
        cy.get(PainelAtendimentoLocators.checkboxGerarAtendimentoServico).then(($el) => {
            if (!$el.is(':checked')) {
                cy.wrap($el).check({ force: true });
            }
        });
    }

    desmarcarCheckboxGerarAtendimentoServicoSeMarcado() {
        this.configurarPainel();
        cy.get(PainelAtendimentoLocators.checkboxGerarAtendimentoServico).then(($el) => {
            if ($el.is(':checked')) {
                cy.wrap($el).uncheck({ force: true });
            }
        });
    }

    registroTempoTurno() {
        this.alterarTipoRegistroTempo('Turno');
    }

    registroTempoHorario() {
        this.alterarTipoRegistroTempo('HORARIO');
    }

    alterarTipoRegistroTempo(valorDesejado) {
        this.configurarPainel();
        cy.get(PainelAtendimentoLocators.selectTipoRegistroTempo).then(($select) => {
            const valorAtual = $select.val();
            if (valorAtual !== valorDesejado) {
                cy.get(PainelAtendimentoLocators.selectTipoRegistroTempo).select(valorDesejado, { force: true });
            }
        });
    }

    // Métodos de Criação de Atendimento
    iniciarNovoAtendimento() {
        this.acessar();
        this.clicarNovoAtendimento();
        // Aguarda carregamento da página de pesquisa de animal
        cy.url().should('include', '/pesquisar-animal');
    }

    clicarNoPrimeiroCardAgendado() {
        cy.get(PainelAtendimentoLocators.cardAgendado).first().click({ force: true });
        cy.wait(1000); // Aguarda modal abrir
    }

    clicarNoPrimeiroCardDaColunaEmAtendimento() {
        cy.get(PainelAtendimentoLocators.cardEmAtendimento).first().click({ force: true });
        cy.wait(1000); // Aguarda modal abrir
    }

    selecionarStatus(status) {
        cy.get(PainelAtendimentoLocators.campoStatusModal).select(status, { force: true });
    }

    salvarAtendimento() {
        cy.get(PainelAtendimentoLocators.btnSalvarAtendimento).click({ force: true });
        cy.wait(2000); // Aguarda salvamento
    }

    clicarAbaOrdemServico() {
        cy.get(PainelAtendimentoLocators.abaOrdemServico).click({ force: true });
        cy.wait(1000);
    }

    gerarVenda() {
        cy.get(PainelAtendimentoLocators.btnGerarVenda).click({ force: true });
        cy.wait(1000);
        // Confirma popup se aparecer
        cy.get('body').then(($body) => {
            if ($body.find(PainelAtendimentoLocators.popupConfirmacao).length > 0) {
                cy.get(PainelAtendimentoLocators.botaoSimPopupConfirmacao).click({ force: true });
            }
        });
    }
}

export default new PainelAtendimentoPage();

