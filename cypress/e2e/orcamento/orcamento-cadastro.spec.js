import OrcamentoCadastroPage from "../../support/pages/Orcamento/OrcamentoCadastroPage";
import {generateRandomDadosOrcamento} from "../../support/factory/generateRandomData";
import {generateRandomDadosOrcamentoProduto} from "../../support/factory/generateRandomData";

describe('Cadastro de Novo Orçamento', () => {
    const condicaoPagamento = 'À vista';

    beforeEach(() => {
        cy.loginArmazenandoSessao();
        OrcamentoCadastroPage.visit();
    });

    it('Deve preencher e salvar um novo orçamento com sucesso', () => {
        const dadosOrcamento = generateRandomDadosOrcamento();
        const dadosProduto = generateRandomDadosOrcamentoProduto();
        cy.log(dadosOrcamento)
        cy.log(dadosProduto)

        OrcamentoCadastroPage.preencherFormulario(dadosOrcamento);
        OrcamentoCadastroPage.preencherDadosOrcamento(dadosOrcamento);
        OrcamentoCadastroPage.preencherInformacoesAdicionais(dadosOrcamento);

        OrcamentoCadastroPage.adicionarProduto(dadosProduto);

        OrcamentoCadastroPage.preencherCondicaoPagamento(condicaoPagamento);

        OrcamentoCadastroPage.salvarFormulario();
        OrcamentoCadastroPage.validarSucesso();
    });
});
