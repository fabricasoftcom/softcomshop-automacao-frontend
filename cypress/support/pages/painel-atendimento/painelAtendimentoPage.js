import PainelAtendimentoLocators from "../../locators/PainelAtendimentoLocators";

class PainelAtendimentoPage {

    // Visitar a página do painel de atendimento
    visit() {
        cy.visit('/petshop/painel-de-atendimento');
    }

    // Iniciar um novo atendimento clicando no botão correspondente
    iniciarNovoAtendimento() {
        cy.get(PainelAtendimentoLocators.btnNovoAtendimento).click();
        cy.wait(5000); // aguarda carregamento da lista
        cy.get(PainelAtendimentoLocators.btnAbrirBuscaAnimal).click();
        cy.wait(5000); // aguarda carregamento da lista
        cy.get(PainelAtendimentoLocators.listaResultadoBuscaAnimal).click();
    }

    // Pesquisar atendimentos utilizando filtros
    pesquisarAtendimentos(data, tipoAtendimento, funcionario, cliente, animal) {
        cy.get(PainelAtendimentoLocators.filtroDataAtendimento).type(data);
        cy.get(PainelAtendimentoLocators.filtroTipoAtendimento).select(tipoAtendimento);
        cy.get(PainelAtendimentoLocators.filtroFuncionario).select(funcionario);
        cy.get(PainelAtendimentoLocators.filtroCliente).select(cliente);
        cy.get(PainelAtendimentoLocators.filtroAnimal).select(animal);
        cy.get(PainelAtendimentoLocators.btnPesquisar).click();
    }

    // Verificar o painel do Kanban
    verificarPainelKanban(status, quantidadeEsperada) {
        cy.get(PainelAtendimentoLocators[`painel${status}`])
            .should('exist');
        cy.get(PainelAtendimentoLocators[`painel${status}`])
            .find(PainelAtendimentoLocators.tabelaBody)
            .children()
            .should('have.length', quantidadeEsperada);
    }

    // Configurações do painel
    configurarPainel() {
        cy.get(PainelAtendimentoLocators.btnConfigurar).click();
    }

    // Filtrar pelo status
    filtrarStatus(status) {
        cy.get(PainelAtendimentoLocators.filtroStatus)
            .select(status);
        cy.get(PainelAtendimentoLocators.btnPesquisar).click();
    }

    // Filtrar por data
    filtrarPorData(data) {
        cy.get(PainelAtendimentoLocators.filtroDataAtendimento)
            .type(data);
        cy.get(PainelAtendimentoLocators.btnPesquisar).click();
    }
    preencherFormularioNovoAtendimento() {
        cy.get(PainelAtendimentoLocators.btnAbrirTipoAtendimento).click();
        cy.get(PainelAtendimentoLocators.listaResultadoTipoAtendimento).click();
        // Quando por horario
        // cy.get(PainelAtendimentoLocators.campoHorario).clear().type('14:00');
        cy.get(PainelAtendimentoLocators.campoDuracao).select('30 minutos');

        cy.get(PainelAtendimentoLocators.btnAbrirProfissional).click();
        cy.get(PainelAtendimentoLocators.listaResultadoProfissional).click();

        cy.get(PainelAtendimentoLocators.campoData).click();
        cy.get(PainelAtendimentoLocators.dataHoje).click();
        cy.get(PainelAtendimentoLocators.campoObservacao).type('Consulta de rotina');

        cy.get(PainelAtendimentoLocators.btnProximo).click();
    }
    preencherCamposAtendimento() {
        cy.get(PainelAtendimentoLocators.btnAbrirservicoProduto).click();
        cy.wait(5000);
        cy.get(PainelAtendimentoLocators.listaResultadoProduto).click();
        cy.get(PainelAtendimentoLocators.campoQuantidade).clear().type((Math.floor(Math.random() * 5) + 1)*100);
        cy.get(PainelAtendimentoLocators.botaoAdicionarItem).click();
        cy.get(PainelAtendimentoLocators.btnImprimir).click();
    }
    clicarNoPrimeiroCardAgendado() {
        cy.get(PainelAtendimentoLocators.cardKanbanAgendado)
            .first() // Seleciona o primeiro card
            .click();
    }
    selecionarStatus(statusValue) {
        cy.get(PainelAtendimentoLocators.campoStatus).select(statusValue)

    }
    salvarAtendimento(){
        cy.get(PainelAtendimentoLocators.btnSalvarAtendimento).click()
    }
    clicarNoPrimeiroCardDaColunaEmAtendimento() {
        cy.get(PainelAtendimentoLocators.cardKanbanEmAtendimento)
          .first()
          .click();
      }
    clicarAbaOrdemServico(){
        cy.get(PainelAtendimentoLocators.abaOrdemServico).click();
    }
    gerarVenda(){
        cy.get(PainelAtendimentoLocators.btnGerarVenda).click();
        cy.get(PainelAtendimentoLocators.botaoSimPopupConfirmacao).click();
    }

}

export default new PainelAtendimentoPage();
