import menulateralprodutopage from "../../support/pages/menulateral/menulateralprodutopage";

describe('Acessar opções do menu lateral de Produtos', () => {
    beforeEach(function () {
        cy.login();
    })

    it('T002-Listagem de Fornecedores', () => {
        menulateralprodutopage.acessarListagemFornecedores();
    })

    it('T003-Listagem de Atributos', () => {
        menulateralprodutopage.acessarListagemAtributos();
    })

    it('T004-Listagem de Vinculos Viscais', () => {
        menulateralprodutopage.acessarListagemVinculosFiscais();
    })

    it('T005-Atualizador de dados fiscais', () => {
        menulateralprodutopage.acessarAtualizadosDadosFiscais();
    })

    it('T006-Listagem de Produtos', () => {
        menulateralprodutopage.acessarListagemProdutos();
    })

    it('T007-Listagem do Gestor de promoções', () => {
        menulateralprodutopage.acessarListagemGestorPromocoes();
    })

    it('T008-Listagem do Gestor de Preço', () => {
        menulateralprodutopage.acessarListagemGestorPrecos();
    })

    it('T009-Listagem da Nuvem Fiscal', () => {
        menulateralprodutopage.acessarListagemNuvemFiscal();
    })

    it('T010-Listagem de Ordem de Fornecimento', () => {
        menulateralprodutopage.acessarListagemOrdemFornecimento();
    })

    it('T011-Listagem de Compras', () => {
        menulateralprodutopage.acessarListagemCompras();
    })

    it('T012-Listagem de Movimentações', () => {
        menulateralprodutopage.acessarListagemMovimentacoes();
    })

    it('T013-Listagem de produção', () => {
        menulateralprodutopage.acessarListagemProducao();
    })

    it('T014-Listagem de balanços', () => {
        menulateralprodutopage.acessarListagemBalanco();
    })

    it('T016-Cadastro novo Atributo', () => {
        menulateralprodutopage.acessarCadastroNovoAtributo();
    })

    it('T017-Cadastro novo cadastro de promoção', () => {
        menulateralprodutopage.acessarCadastroNovoGestorPromocoes();
    })

    it('T018-Cadastro novo gestor preco', () => {
        menulateralprodutopage.acessarCadastroNovoGestorPrecos();
    })

    it('T019-Cadastro nova ordem fornecimento', () => {
        menulateralprodutopage.acessarCadastroNovaOrdemFornecimento();
    })

    it('T020-Cadastro novo compra', () => {
        menulateralprodutopage.acessarCadastroNovaCompra();
    })

    it('T021-Cadastro novo Movimentacoes', () => {
        menulateralprodutopage.acessarCadastroNovaMovimentacoes();
    })

    it('T022-Cadastro novo producao', () => {
        menulateralprodutopage.acessarCadastroNovaProducao();
    })

    it('T023-Cadastro novo balanco', () => {
        menulateralprodutopage.acessarCadastroNovoBalanco();
    })
})
