import TaEmOrdemLocators from '../../locators/TaEmOrdem/TaEmOrdemLocators';
import MenulateralTaeMordemPage from '../menulateral/menulateraltaemordempage';

class TaEmOrdemPage {

    // Navegação
    acessarTela() {
        MenulateralTaeMordemPage.acessarTaEmOrdem();
        cy.url().should('include', '/ta-em-ordem');
        this.validarTelaCarregada();
    }

    // Validações gerais
    validarTelaCarregada() {
        cy.get(TaEmOrdemLocators.contentLayout).should('be.visible');
        cy.get(TaEmOrdemLocators.titulo).should('be.visible');
        cy.get(TaEmOrdemLocators.titulo).should('contain.text', 'Ta em ordem');
    }

    validarCampoDataMes() {
        cy.get(TaEmOrdemLocators.campoDataMes).should('be.visible');
        cy.get(TaEmOrdemLocators.campoDataMes).should('not.have.value', '');
    }

    // Comboboxes
    validarComboboxVendasHoje() {
        cy.get(TaEmOrdemLocators.comboboxVendasHoje).should('be.visible');
        cy.get(TaEmOrdemLocators.comboboxVendasHoje).should('be.enabled');
    }

    selecionarVendaHoje(opcao = 'VENDA DE HOJE') {
        cy.get(TaEmOrdemLocators.comboboxVendasHoje).should('be.visible').select(opcao);
    }

    validarComboboxTicketMedio() {
        cy.get(TaEmOrdemLocators.comboboxTicketMedio).should('be.visible');
        cy.get(TaEmOrdemLocators.comboboxTicketMedio).should('be.enabled');
    }

    selecionarTicketMedio(opcao = 'TICKET MEDIO') {
        cy.get(TaEmOrdemLocators.comboboxTicketMedio).should('be.visible').select(opcao);
    }

    validarComboboxRankingProdutos() {
        cy.get(TaEmOrdemLocators.comboboxRankingProdutos).should('be.visible');
        cy.get(TaEmOrdemLocators.comboboxRankingProdutos).should('be.enabled');
    }

    selecionarRankingProdutos(opcao = 'RANKING DE PRODUTOS - VALOR VENDA') {
        cy.get(TaEmOrdemLocators.comboboxRankingProdutos).should('be.visible').select(opcao);
    }

    validarComboboxRankingHabilitado() {
        cy.get(TaEmOrdemLocators.comboboxRankingProdutos).should('not.be.disabled');
    }

    validarComboboxesTemOpcoes() {
        cy.get(TaEmOrdemLocators.comboboxVendasHoje).find('option').should('have.length.greaterThan', 1);
        cy.get(TaEmOrdemLocators.comboboxTicketMedio).find('option').should('have.length.greaterThan', 1);
        cy.get(TaEmOrdemLocators.comboboxRankingProdutos).find('option').should('have.length.greaterThan', 1);
        return this;
    }

    // alterarRankingEValidarTabela(opcao) {
    //     // Captura quantidade de linhas antes
    //     cy.get(TaEmOrdemLocators.linhasTabela).then(($linhasAntes) => {
    //         const quantidadeAntes = $linhasAntes.length;

    //         // Altera o ranking
    //         this.selecionarRankingProdutos(opcao);

    //         // Valida que a tabela foi atualizada (não deve estar vazia)
    //         cy.get(TaEmOrdemLocators.linhasTabela).should('have.length.greaterThan', 0);

    //         // Valida que o valor do select foi alterado
    //         if (opcao === 'RANKING DE PRODUTOS - VALOR VENDA') {
    //             cy.get(TaEmOrdemLocators.comboboxRankingProdutos).should('have.value', 'VALOR');
    //         } else if (opcao === 'RANKING DE PRODUTOS - MARGEM DE LUCRO') {
    //             cy.get(TaEmOrdemLocators.comboboxRankingProdutos).should('have.value', 'MARGEM');
    //         }
    //     });
    // }

    // Cards de informações (totalizadores)
    validarTotalizadoresVisiveis() {
        cy.get(TaEmOrdemLocators.containerTotalizadores).should('be.visible');
        cy.get(TaEmOrdemLocators.totalizadorBox).should('have.length.greaterThan', 0);
    }

    validarTotalizadorPorIndice(indice) {
        cy.get(TaEmOrdemLocators.totalizadorBox).eq(indice).should('be.visible');
    }

    validarTotalizadoresTemValores() {
        cy.get(TaEmOrdemLocators.totalizadorBox).each(($box) => {
            cy.wrap($box).should('be.visible');
            // Valida que o card contém algum valor (número ou texto)
            cy.wrap($box).should('not.be.empty');
        });
    }

    // Tabela de ranking
    validarTabelaRanking() {
        cy.get(TaEmOrdemLocators.tabelaRanking).should('be.visible');
        cy.get(TaEmOrdemLocators.tabelaThead).should('be.visible');
        cy.get(TaEmOrdemLocators.tabelaTbody).should('be.visible');
    }

    validarTabelaRankingTemDados() {
        cy.get(TaEmOrdemLocators.linhasTabela).should('have.length.greaterThan', 0);
    }

    validarEstruturaTabelaRanking() {
        cy.get(TaEmOrdemLocators.tabelaThead).within(() => {
            cy.contains('Margem de Lucro').should('be.visible');
            cy.contains('Valor Venda').should('be.visible');
        });
    }

    capturarPrimeiraLinhaTabela() {
        return cy.get(TaEmOrdemLocators.linhasTabela).first();
    }

    validarLinhaTabelaTemColunas(linha) {
        linha.within(() => {
            cy.get('td').should('have.length.greaterThan', 0);
        });
    }

    // Links de ação rápida
    validarLinkNovaVenda() {
        cy.get(TaEmOrdemLocators.linkNovaVenda).should('be.visible');
        cy.get(TaEmOrdemLocators.linkNovaVenda).should('contain.text', 'Nova venda');
    }

    validarLinkNovaCompra() {
        cy.get(TaEmOrdemLocators.linkNovaCompra).should('be.visible');
        cy.get(TaEmOrdemLocators.linkNovaCompra).should('contain.text', 'Nova Compra');
    }

    validarLinkEmitirNfe() {
        cy.get(TaEmOrdemLocators.linkEmitirNfe).should('be.visible');
        cy.get(TaEmOrdemLocators.linkEmitirNfe).should('contain.text', 'Emitir NF-e');
    }

    validarLinkCadastrarCliente() {
        cy.get(TaEmOrdemLocators.linkCadastrarCliente).should('be.visible');
        cy.get(TaEmOrdemLocators.linkCadastrarCliente).should('contain.text', 'Cadastrar cliente');
    }

    validarLinksAcaoRapida() {
        this.validarLinkNovaVenda();
        this.validarLinkNovaCompra();
        this.validarLinkEmitirNfe();
        this.validarLinkCadastrarCliente();
    }

    validarNavegacaoLinkNovaVenda() {
        cy.get(TaEmOrdemLocators.linkNovaVenda).should('have.attr', 'href').and('include', '/vendas/novo');
    }

    validarNavegacaoLinkNovaCompra() {
        cy.get(TaEmOrdemLocators.linkNovaCompra).should('have.attr', 'href').and('include', '/compra/novo');
    }

    validarNavegacaoLinkEmitirNfe() {
        cy.get(TaEmOrdemLocators.linkEmitirNfe).should('have.attr', 'href').and('include', '/nfe2/novo');
    }

    validarNavegacaoLinkCadastrarCliente() {
        cy.get(TaEmOrdemLocators.linkCadastrarCliente).should('have.attr', 'href').and('include', '/cadastro/cliente/novo');
    }

    validarNavegacaoLinksAcaoRapida() {
        this.validarNavegacaoLinkNovaVenda();
        this.validarNavegacaoLinkNovaCompra();
        this.validarNavegacaoLinkEmitirNfe();
        this.validarNavegacaoLinkCadastrarCliente();
    }

    // Seções de gráficos
    validarSecaoVendasHorario() {
        cy.contains('Vendas por horário').should('be.visible');
    }

    validarSecaoVendasDiaSemana() {
        cy.contains('Vendas por dia da semana').should('be.visible');
    }

    validarSecaoFormaPagamento() {
        cy.contains('Forma de pagamento').should('be.visible');
    }

    validarSecaoEvolucaoReceita() {
        cy.contains('Evolução Receita').should('be.visible');
    }

    validarSecaoVendasDiaMes() {
        cy.contains('VENDAS POR DIA DO MÊS').should('be.visible');
    }

    validarSecaoOrigemVenda() {
        cy.contains('Origem da venda').should('be.visible');
    }

    validarSecoesGraficos() {
        this.validarSecaoVendasHorario();
        this.validarSecaoVendasDiaSemana();
        this.validarSecaoFormaPagamento();
        this.validarSecaoEvolucaoReceita();
        this.validarSecaoVendasDiaMes();
        this.validarSecaoOrigemVenda();
    }
}

export default new TaEmOrdemPage();

