import OrcamentoCadastroPage from "../../support/pages/orcamento/OrcamentoCadastroPage";

describe('Cadastro de Novo Orçamento', () => {
    let dadosProduto;
    let dadosOrcamento;
    const condicaoPagamento = 'À vista';

    beforeEach(() => {
        // Carrega os dados da fixture antes de cada teste
        cy.fixture('orcamento.json').then((dados) => {
            dadosProduto = dados.dadosProduto;
            dadosOrcamento = dados.dadosOrcamento;
        });
        cy.loginArmazenandoSessao();
        OrcamentoCadastroPage.visit();
    });

    it('Deve preencher e salvar um novo orçamento com sucesso', () => {
        OrcamentoCadastroPage.preencherFormulario(dadosOrcamento);
        OrcamentoCadastroPage.preencherDadosOrcamento(dadosOrcamento);
        OrcamentoCadastroPage.preencherInformacoesAdicionais(dadosOrcamento);

        OrcamentoCadastroPage.adicionarProduto(dadosProduto);

        OrcamentoCadastroPage.preencherCondicaoPagamento(condicaoPagamento);
        OrcamentoCadastroPage.validarSucesso();
    });
});
