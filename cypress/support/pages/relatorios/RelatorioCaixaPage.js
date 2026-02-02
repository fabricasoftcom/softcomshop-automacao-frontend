// RelatorioCaixaPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioCaixaLocators from "../../locators/Relatorios/RelatorioCaixaLocators";

class RelatorioCaixaPage {

    acessarRelatorioCaixa() {
        RelatoriosPage.acessarRelatorioFinanceiroCaixa();
        // Atualizado após reformulação: URL mudou para /relatorio-v2/vendas-caixa
        cy.url().should('contain', '/relatorio-v2/vendas-caixa');
    }

    garantirFiltrosVisiveis() {
        // Atualizado: usa método compartilhado do drawer
        // Mantém compatibilidade com implementação anterior
        RelatoriosPage.garantirDrawerAberto(RelatorioCaixaLocators.filtrosContainer);
    }

    validarElementosBasicos() {
        // Atualizado após reformulação: título mudou de h5 para h1.relatorio-title
        cy.get('h1.relatorio-title').should('be.visible').and('contain', 'Caixa');
        this.garantirFiltrosVisiveis();
        // Valida elementos dentro do drawer de filtros
        cy.get(RelatorioCaixaLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioCaixaLocators.periodoInput).should('be.visible');
        // Valida que elementos existem (podem estar no drawer)
        cy.get(RelatorioCaixaLocators.turnoInput).should('exist');
        // Campo tipo foi removido - não valida mais
        // Valida botão "Aplicar Filtros" no drawer
        cy.get('button:contains("Aplicar Filtros")').should('be.visible');
        // Valida botões de exportação na barra superior (fora do drawer)
        cy.contains('a', 'Gerar PDF').should('be.visible');
        cy.contains('a', 'Imprimir 80mm').should('be.visible');
    }

    selecionarTipo(tipoValue) {
        // Atualizado após reformulação: campo tipo foi removido do formulário
        // Método mantido para compatibilidade, mas não faz nada
        // O relatório Caixa agora não tem mais seleção de tipo (analítico/sintético)
        cy.log(`Campo tipo foi removido na reformulação. Valor solicitado: ${tipoValue} (ignorado)`);
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioCaixaLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    preencherTurno(turno) {
        cy.get(RelatorioCaixaLocators.turnoInput)
            .clear({ force: true })
            .type(turno, { force: true });
    }

    pesquisar() {
        // Atualizado após reformulação: botão mudou de "Pesquisar" para "Aplicar Filtros"
        // URL mudou para /relatorio-v2/vendas-caixa
        cy.intercept('GET', '**/relatorio-v2/vendas-caixa**').as('relatorioCaixa');
        // Clica no botão "Aplicar Filtros" dentro do drawer
        cy.get('button:contains("Aplicar Filtros")', { timeout: 10000 })
            .should('be.visible')
            .click({ force: true });
        // Aguarda drawer fechar e dados carregarem
        cy.wait(1000);
        cy.wait('@relatorioCaixa', { timeout: 30000 }).then((interception) => {
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
        cy.get(RelatorioCaixaLocators.tabelaResultados, { timeout: 10000 })
            .should('exist')
            .should('be.visible');
    }

    /**
     * Valida estrutura da tabela (cabeçalhos/colunas)
     * Verifica se tabela tem cabeçalho com colunas
     */
    validarEstruturaTabela() {
        this.validarTabelaResultados();
        cy.get(RelatorioCaixaLocators.tabelaResultados)
            .find('thead tr th')
            .should('exist')
            .should('have.length.greaterThan', 0);
    }

    /**
     * Valida que botão de exportação PDF está visível e clicável
     */
    validarBotaoExportacaoPdf() {
        cy.get(RelatorioCaixaLocators.botaoGerarPdf, { timeout: 10000 })
            .should('be.visible')
            .should('not.be.disabled');
    }

    /**
     * Valida que botão de impressão 80mm está visível e clicável
     */
    validarBotaoImprimir80mm() {
        cy.contains('a', 'Imprimir 80mm', { timeout: 10000 })
            .should('be.visible')
            .should('not.be.disabled');
    }

    /**
     * Valida que botões de exportação (PDF e Imprimir 80mm) estão visíveis
     */
    validarBotoesExportacao() {
        this.validarBotaoExportacaoPdf();
        this.validarBotaoImprimir80mm();
    }
}

export default new RelatorioCaixaPage();
