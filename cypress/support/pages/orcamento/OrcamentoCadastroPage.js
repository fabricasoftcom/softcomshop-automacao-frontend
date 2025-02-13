import OrcamentoCadastroLocators from "../../locators/OrcamentoCadastroLocators";

class OrcamentoCadastroPage {
    visit() {
        cy.visit('/orcamento/novo');
        cy.get(OrcamentoCadastroLocators.statusLabel).should('be.visible');
    }

    preencherFormulario(dados) {
        cy.get(OrcamentoCadastroLocators.dropdownCliente).click();
        cy.get(OrcamentoCadastroLocators.campoClienteResultado).click();
        cy.log(dados.telefone)
        cy.get(OrcamentoCadastroLocators.campoTelefone).clear().type(dados.telefone);
        cy.get(OrcamentoCadastroLocators.campoEmail).clear().type(dados.email);
        cy.get(OrcamentoCadastroLocators.campoResponsavel).clear().type(dados.responsavel);

        cy.get(OrcamentoCadastroLocators.dropdownVendedor).click();
        cy.get(OrcamentoCadastroLocators.campoVendedorResultado).click();

        cy.get(OrcamentoCadastroLocators.campoObservacoes).clear().type(dados.observacoes);
        cy.get(OrcamentoCadastroLocators.campoValidade).clear().type(dados.validade);
        cy.get(OrcamentoCadastroLocators.campoDataValidade).clear().type(dados.dataValidade);
    }

    salvarFormulario() {
        cy.get(OrcamentoCadastroLocators.btnSalvar).first().click();
    }

    validarSucesso() {
        cy.get(OrcamentoCadastroLocators.toastSucesso).should('contain', 'sucesso');
    }

    preencherDadosOrcamento(dados) {
        cy.get(OrcamentoCadastroLocators.campoCpfCnpj).clear().type(dados.cpfCnpj);
        cy.get(OrcamentoCadastroLocators.campoCep).clear().type(dados.cep);
        cy.get(OrcamentoCadastroLocators.btnBuscarCep).click();
        cy.get(OrcamentoCadastroLocators.campoNumero).clear().type(dados.numero);
        cy.get(OrcamentoCadastroLocators.campoComplemento).clear().type(dados.complemento);

    }
    preencherInformacoesAdicionais(dados) {
        cy.get(OrcamentoCadastroLocators.campoDescricaoServico).clear().type(dados.descricaoServico);
        cy.get(OrcamentoCadastroLocators.campoPrazoEntrega).clear().type(dados.prazoEntrega);
        cy.get(OrcamentoCadastroLocators.campoGarantia).clear().type(dados.garantia);
    }
    adicionarProduto(dados) {
        cy.get(OrcamentoCadastroLocators.campoProduto).clear().type(dados.produto);
        cy.get(OrcamentoCadastroLocators.campoProdutoResultado).first().click();
        cy.get(OrcamentoCadastroLocators.campoQuantidade).clear().type(dados.quantidade);
        cy.get(OrcamentoCadastroLocators.campoPreco).clear().type(dados.preco);
    }
    preencherCondicaoPagamento(condicaoPagamento) {
        cy.get(OrcamentoCadastroLocators.campoCondicaoPagamento).clear().type(condicaoPagamento);
    }

}

export default new OrcamentoCadastroPage();
