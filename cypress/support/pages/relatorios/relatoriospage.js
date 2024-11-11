// RelatoriosPage.js
import menulateralrelatoriospage from "../menulateral/menulateralrelatoriospage";
import RelatoriosLocators from "../../locators/RelatoriosLocators";

class RelatoriosPage {

    acessarMenuRelatorios() {
        menulateralrelatoriospage.acessarRelatorios();
    }

    // Acessa o menu relatórios e abre o link especificado
    acessarRelatorio(linkLocator) {
        this.acessarMenuRelatorios();
        cy.get(linkLocator).click();
    }

    // Vendas
    acessarRelatorioVendasPeriodo() {
        this.acessarRelatorio(RelatoriosLocators.vendasPeriodo);
    }
    acessarRelatorioVendasMaisVendidos() {
        this.acessarRelatorio(RelatoriosLocators.vendasMaisVendidos);
    }
    acessarRelatorioVendasFormaPagamento() {
        this.acessarRelatorio(RelatoriosLocators.vendasFormaPagamento);
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
        this.acessarRelatorio(RelatoriosLocators.financeiroCaixa);
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
        this.acessarRelatorio(RelatoriosLocators.produtosMovimentacaoEstoque);
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

}

export default new RelatoriosPage();