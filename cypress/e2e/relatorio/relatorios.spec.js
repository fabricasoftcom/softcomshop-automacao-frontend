import relatoriospage from "../../support/pages/relatorios/relatoriospage";

describe('Acessar relatorio: ', ()=>{
    beforeEach(function () {
        cy.login();
        relatoriospage.acessarMenuRelatorios();
    })
      it('T001- Vendas > Periodo', ()=>{
        relatoriospage.acessarRelatorioVendasPeriodo();
      })
      it('T002- Vendas > Mais Vendidos', ()=>{
        relatoriospage.acessarRelatorioVendasMaisVendidos();
      })
      it('T003- Vendas > Forma Pagamento', ()=>{
        relatoriospage.acessarRelatorioVendasFormaPagamento();
      })
      it('T004- Vendas > Gerente de vendas', ()=>{
        relatoriospage.acessarRelatorioVendasGerenteVendas();
      })
      it('T005- Vendas > Evolução', ()=>{
        relatoriospage.acessarRelatorioVendasEvolucao();
      })
      it('T006- Vendas > Comissão', ()=>{
        relatoriospage.acessarRelatorioVendasComissao();
      })
      it('T007- Notas Fiscais > Saida Analitico ', ()=>{
        relatoriospage.acessarRelatorioNotasFiscaisSaidaAnalitico();
      })
      it('T008- Notas Fiscais > Saida Sintético', ()=>{
        relatoriospage.acessarRelatorioNotasFiscaisSaidaSintetico();
      })
      it('T009- Notas Fiscais > Entrada Analitico', ()=>{
        relatoriospage.acessarRelatorioNotasFiscaisEntradaAnalitico();
      })
      it('T010- Notas Fiscais > Entrada Sintetico', ()=>{
        relatoriospage.acessarRelatorioNotasFiscaisEntradaSintetico();
      })
      it('T011- Notas Fiscais > PIS/Cofins', ()=>{
        relatoriospage.acessarRelatorioNotasFiscaisPisCofins();
      })
      it('T012- Notas Fiscais > NFSe', ()=>{
        relatoriospage.acessarRelatorioNotasFiscaisNFSe();
      })
      it('T013- Financeiro > Caixa', ()=>{
        relatoriospage.acessarRelatorioFinanceiroCaixa();
      })
      it('T014- Financeiro > Contas a Receber', ()=>{
        relatoriospage.acessarRelatorioFinanceiroContasReceber();
      })
      it('T015- Financeiro > Contas a pagar', ()=>{
        relatoriospage.acessarRelatorioFinanceiroContasPagar();
      })
      it('T016- Financeiro > Projeção de Cartões', ()=>{
        relatoriospage.acessarRelatorioFinanceiroProjecaoCartoes();
      })
      it('T017- Produto > Exibir Estoque', ()=>{
        relatoriospage.acessarRelatorioProdutosExibirEstoque();
      })
      it('T018- Produto > Tabela de preço', ()=>{
        relatoriospage.acessarRelatorioProdutosExibirTabelaPreco();
      })
      it('T019- Produto > Ficha Estoque', ()=>{
        relatoriospage.acessarRelatorioProdutosFichaEstoque();
      })
      it('T020- Produto > Inventario', ()=>{
        relatoriospage.acessarRelatorioProdutosInventario();
      })
      it('T021- Produto > NCM', ()=>{
        relatoriospage.acessarRelatorioProdutosNCM();
      })
      it('T022- Produto > Movimentação estoque', ()=>{
        relatoriospage.acessarRelatorioProdutosMovimentacaoEstoque();
      })
      it('T023- Cliente > Aniversariantes', ()=>{
        relatoriospage.acessarRelatorioClientesAniversariantes();
      })
      it('T024- Cliente > Dados dos clientes', ()=>{
        relatoriospage.acessarRelatorioClientesDadosClientes();
      })
      it('T025- Cliente > Ultimas Compras', ()=>{
        relatoriospage.acessarRelatorioClientesUltimasCompras();
      })

})
