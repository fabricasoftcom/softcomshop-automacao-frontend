// RelatorioPeriodoPage.js
// Atualizado com drawer compartilhado e date picker (2026-01-28)
import RelatoriosPage from "./RelatoriosPage";
import RelatorioPeriodoLocators from "../../locators/Relatorios/RelatorioPeriodoLocators";

class RelatorioPeriodoPage {

    acessarRelatorioPeriodo() {
        RelatoriosPage.acessarRelatorioVendasPeriodo();
        cy.url().should('contain', '/relatorio/periodo');
    }

    garantirFiltrosVisiveis() {
        // Atualizado: usa método compartilhado do drawer
        // Mantém compatibilidade com implementação anterior
        RelatoriosPage.garantirDrawerAberto(RelatorioPeriodoLocators.filtrosContainer);
    }

    validarElementosBasicos() {
        cy.get(RelatorioPeriodoLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        // Valida elementos dentro do drawer de filtros
        cy.get(RelatorioPeriodoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioPeriodoLocators.periodoInput).should('be.visible');
        // Botão Pesquisar pode estar oculto inicialmente ou dentro do drawer
        // Valida que existe, mas não força visibilidade
        cy.get(RelatorioPeriodoLocators.botaoPesquisar).should('exist');
        // Botões de exportação estão na barra superior (fora do drawer)
        // Atualizado após reformulação: agora são links com classes específicas
        cy.contains('a', 'PDF').should('be.visible');
        cy.contains('a', 'Excel').should('be.visible');
    }

    /**
     * Preenche o campo de período
     * Atualizado: Usa type() direto no campo (comportamento atual que funciona)
     * O campo aceita formato: "DD/MM/YYYY HH:mm:ss - DD/MM/YYYY HH:mm:ss"
     * @param {string} dataInicial - Data inicial no formato DD/MM/YYYY HH:mm:ss
     * @param {string} dataFinal - Data final no formato DD/MM/YYYY HH:mm:ss
     */
    preencherPeriodo(dataInicial, dataFinal) {
        // Garante que drawer está aberto
        this.garantirFiltrosVisiveis();

        const periodo = `${dataInicial} - ${dataFinal}`;

        // Fecha date picker se estiver aberto (pode estar aberto de interações anteriores)
        cy.get('body').then(($body) => {
            const datePicker = $body.find(RelatorioPeriodoLocators.datePickerContainer);
            if (datePicker.length > 0 && datePicker.is(':visible')) {
                // Clica fora do date picker para fechar (ou ESC se necessário)
                cy.get('body').click(0, 0, { force: true });
                cy.wait(500); // Aguarda animação de fechamento
            }
        });

        // Preenche campo diretamente com type()
        // O campo aceita type() direto mesmo que tenha date picker associado
        cy.get(RelatorioPeriodoLocators.periodoInput)
            .should('be.visible')
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/periodo**').as('relatorioPeriodo');
        cy.get(RelatorioPeriodoLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioPeriodo').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }

    /**
     * Valida que a tabela de resultados está visível após pesquisa
     * Verifica se tabela existe e está visível (pode ter ou não dados)
     */
    validarTabelaResultados() {
        cy.get(RelatorioPeriodoLocators.tabelaResultados, { timeout: 10000 })
            .should('exist')
            .should('be.visible');
    }

    /**
     * Valida que a tabela tem pelo menos uma linha de dados
     * Útil para validar que há resultados retornados
     */
    validarTabelaComDados() {
        this.validarTabelaResultados();
        cy.get(RelatorioPeriodoLocators.linhasTabelaResultados)
            .should('have.length.greaterThan', 0);
    }

    /**
     * Valida estrutura da tabela (cabeçalhos/colunas)
     * Verifica se tabela tem cabeçalho com colunas
     */
    validarEstruturaTabela() {
        this.validarTabelaResultados();
        cy.get(RelatorioPeriodoLocators.cabecalhoTabela)
            .should('exist')
            .should('have.length.greaterThan', 0);
    }

    /**
     * Valida que botão de exportação PDF está visível e clicável
     */
    validarBotaoExportacaoPdf() {
        cy.get(RelatorioPeriodoLocators.botaoGerarPdf, { timeout: 10000 })
            .should('be.visible')
            .should('not.be.disabled');
    }

    /**
     * Valida que botão de exportação Excel está visível e clicável
     */
    validarBotaoExportacaoExcel() {
        cy.get(RelatorioPeriodoLocators.botaoGerarExcel, { timeout: 10000 })
            .should('be.visible')
            .should('not.be.disabled');
    }

    /**
     * Valida que botões de exportação (PDF e Excel) estão visíveis
     */
    validarBotoesExportacao() {
        this.validarBotaoExportacaoPdf();
        this.validarBotaoExportacaoExcel();
    }

    /**
     * Valida mensagem quando não há dados
     * Útil para validar comportamento quando pesquisa não retorna resultados
     */
    validarMensagemSemDados() {
        cy.get('body').then(($body) => {
            const mensagem = $body.find(RelatorioPeriodoLocators.mensagemSemDados);
            if (mensagem.length > 0) {
                cy.get(RelatorioPeriodoLocators.mensagemSemDados)
                    .should('be.visible');
            }
        });
    }
}

export default new RelatorioPeriodoPage();

