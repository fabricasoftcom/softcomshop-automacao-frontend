// RelatoriosPage.js
import MenulateralRelatoriosPage from "../menulateral/MenulateralRelatoriosPage";
import RelatoriosLocators from "../../locators/Relatorios/RelatoriosLocators";
import RelatoriosDrawerLocators from "../../locators/Relatorios/RelatoriosDrawerLocators";

class RelatoriosPage {

    acessarMenuRelatorios() {
        MenulateralRelatoriosPage.acessarRelatorios();
    }

    // Acessa o menu relatórios e navega para o relatório especificado
    // Atualizado após reformulação de layout (2026-01-27): agora usa cards .catalogo-relatorio-item
    // Navega diretamente para a URL do relatório ao invés de clicar no card (mais confiável)
    acessarRelatorio(linkLocator) {
        this.acessarMenuRelatorios();
        // Aguarda página de relatórios carregar
        cy.get('.catalogo-relatorios', { timeout: 10000 }).should('be.visible');
        // Obtém URL do card e navega diretamente (mais confiável que clicar)
        cy.get(linkLocator).first().should('exist').then(($card) => {
            const href = $card.attr('data-href') || $card.attr('data-href-url');
            if (href) {
                // Se href é absoluto (começa com http), extrai pathname; se é relativo, usa diretamente
                const urlPath = href.startsWith('http') ? new URL(href).pathname : href;
                cy.visit(urlPath);
            } else {
                // Fallback: tenta clicar (pode não funcionar se card estiver oculto)
                cy.get(linkLocator).first().should('be.visible').click({ force: true });
            }
        });
        // Validação flexível: pode ser /relatorio/, /relatorio-v2/, /relatorios/, ou /cliente/relatorio/
        cy.url().should('match', /(\/relatorio(-v2)?\/|\/relatorios\/|\/cliente\/relatorio\/)/);
    }

    acessarRelatorioComS(linkLocator) {
        this.acessarMenuRelatorios();
        // Aguarda página de relatórios carregar
        cy.get('.catalogo-relatorios', { timeout: 10000 }).should('be.visible');
        // Atualizado após reformulação: navega diretamente pela URL (mais confiável)
        cy.get(linkLocator).first().should('exist').then(($card) => {
            const href = $card.attr('data-href') || $card.attr('data-href-url');
            if (href) {
                // Se href é relativo, adiciona baseUrl; se é absoluto, usa diretamente
                const urlPath = href.startsWith('http') ? new URL(href).pathname : href;
                cy.visit(urlPath);
            } else {
                // Fallback: tenta clicar (pode não funcionar se card estiver oculto)
                cy.get(linkLocator).first().should('be.visible').click({ force: true });
            }
        });
        // Validação para URLs com /relatorios/ (plural)
        cy.url().should('include', '/relatorios/');
    }

    // Vendas
    acessarRelatorioVendasPeriodo() {
        this.acessarRelatorio(RelatoriosLocators.vendasPeriodo);
    }
    acessarRelatorioVendasMaisVendidos() {
        this.acessarRelatorio(RelatoriosLocators.vendasMaisVendidos);
    }
    acessarRelatorioVendasFormaPagamento() {
        // URL mudou para /relatorio-v2/forma-pagamento após reformulação
        this.acessarRelatorio(RelatoriosLocators.vendasFormaPagamento);
        cy.url().should('include', '/relatorio-v2/forma-pagamento');
    }
    acessarRelatorioVendasGerenteVendas() {
        this.acessarRelatorio(RelatoriosLocators.vendasGerenteVendas);
    }
    acessarRelatorioVendasEvolucao() {
        this.acessarRelatorio(RelatoriosLocators.vendasEvolucao);
    }
    acessarRelatorioVendasComissao() {
        this.acessarRelatorio(RelatoriosLocators.vendasComissao);
    }

    // Notas fiscais
    acessarRelatorioNotasFiscaisSaidaAnalitico() {
        this.acessarRelatorio(RelatoriosLocators.notasFiscaisSaidaAnalitico);
    }
    acessarRelatorioNotasFiscaisSaidaSintetico() {
        this.acessarRelatorio(RelatoriosLocators.notasFiscaisSaidaSintetico);
    }
    acessarRelatorioNotasFiscaisEntradaSintetico() {
        this.acessarRelatorio(RelatoriosLocators.notasFiscaisEntradaSintetico);
    }
    acessarRelatorioNotasFiscaisEntradaAnalitico() {
        this.acessarRelatorio(RelatoriosLocators.notasFiscaisEntradaAnalitico);
    }
    acessarRelatorioNotasFiscaisPisCofins() {
        this.acessarRelatorio(RelatoriosLocators.notasFiscaisPisCofins);
    }
    acessarRelatorioNotasFiscaisNFSe() {
        this.acessarRelatorio(RelatoriosLocators.notasFiscaisNFSe);
    }

    // Financeiro
    acessarRelatorioFinanceiroCaixa() {
        // URL mudou para /relatorio-v2/vendas-caixa após reformulação
        this.acessarRelatorio(RelatoriosLocators.financeiroCaixa);
        cy.url().should('include', '/relatorio-v2/vendas-caixa');
    }
    acessarRelatorioFinanceiroContasReceber() {
        this.acessarRelatorio(RelatoriosLocators.financeiroContasReceber);
    }
    acessarRelatorioFinanceiroContasPagar() {
        this.acessarRelatorio(RelatoriosLocators.financeiroContasPagar);
    }
    acessarRelatorioFinanceiroProjecaoCartoes() {
        this.acessarRelatorio(RelatoriosLocators.financeiroProjecaoCartoes);
    }

    // Produtos
    acessarRelatorioProdutosExibirEstoque() {
        this.acessarRelatorio(RelatoriosLocators.produtosExibirEstoque);
    }
    acessarRelatorioProdutosExibirTabelaPreco() {
        this.acessarRelatorio(RelatoriosLocators.produtosTabelaPreco);
    }
    acessarRelatorioProdutosFichaEstoque() {
        this.acessarRelatorio(RelatoriosLocators.produtosFichaEstoque);
    }
    acessarRelatorioProdutosInventario() {
        this.acessarRelatorio(RelatoriosLocators.produtosInventario);
    }
    acessarRelatorioProdutosNCM() {
        this.acessarRelatorio(RelatoriosLocators.produtosNCM);
    }
    acessarRelatorioProdutosMovimentacaoEstoque() {
        this.acessarRelatorioComS(RelatoriosLocators.produtosMovimentacaoEstoque);
    }

    // Clientes
    acessarRelatorioClientesAniversariantes() {
        this.acessarRelatorio(RelatoriosLocators.clientesAniversariantes);
    }
    acessarRelatorioClientesDadosClientes() {
        this.acessarRelatorio(RelatoriosLocators.clientesDadosClientes);
    }
    acessarRelatorioClientesUltimasCompras() {
        this.acessarRelatorio(RelatoriosLocators.clientesUltimasCompras);
    }

    validateRoute(expectedUrl) {
        cy.url().should('contain', expectedUrl)
    }

    // ========== MÉTODOS COMPARTILHADOS DO DRAWER DE FILTROS ==========
    // Criado: 2026-01-28
    // Referência: docs/temp-descobertas-drawer-relatorios.md

    /**
     * Verifica se o drawer de filtros está aberto/visível
     * @returns {Cypress.Chainable<boolean>} true se drawer está visível, false caso contrário
     */
    verificarDrawerAberto() {
        return cy.get('body').then(($body) => {
            const drawerBody = $body.find(RelatoriosDrawerLocators.drawerBody);
            return drawerBody.length > 0 &&
                   drawerBody.css('visibility') !== 'hidden' &&
                   drawerBody.is(':visible');
        });
    }

    /**
     * Abre o drawer de filtros se estiver fechado
     * @param {number} timeout - Timeout em ms (padrão: 10000)
     * @returns {RelatoriosPage} Instância para method chaining
     */
    abrirDrawerFiltros(timeout = 10000) {
        cy.get('body').then(($body) => {
            const drawerBody = $body.find(RelatoriosDrawerLocators.drawerBody);
            const isDrawerVisible = drawerBody.length > 0 &&
                                   drawerBody.css('visibility') !== 'hidden' &&
                                   drawerBody.is(':visible');

            if (!isDrawerVisible) {
                // Clica no botão Filtros para abrir drawer
                cy.get(RelatoriosDrawerLocators.btnFiltros, { timeout })
                    .should('be.visible')
                    .click({ force: true });
                // Aguarda drawer aparecer no DOM e ficar visível
                cy.get(RelatoriosDrawerLocators.drawerBody, { timeout })
                    .should('exist')
                    .should('not.have.css', 'visibility', 'hidden');
            }
        });
        return this;
    }

    /**
     * Garante que o drawer de filtros está aberto
     * Wrapper reutilizável do método garantirFiltrosVisiveis() usado em múltiplos Page Objects
     * @param {string} filtrosContainer - Locator do formulário específico dentro do drawer
     * @param {number} timeout - Timeout em ms (padrão: 10000)
     * @returns {RelatoriosPage} Instância para method chaining
     */
    garantirDrawerAberto(filtrosContainer, timeout = 10000) {
        this.abrirDrawerFiltros(timeout);
        // Aguarda formulário específico estar visível dentro do drawer
        cy.get(filtrosContainer, { timeout })
            .should('exist')
            .should('be.visible');
        return this;
    }
}

export default new RelatoriosPage();
