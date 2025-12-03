import BalancoPage from "../../support/pages/Balanco/BalancoPage";
import MenulateralProdutoPage from "../../support/pages/menulateral/MenulateralProdutoPage";

describe('Balanco', { tags: ["@balanco", "@regressivo"] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit("/")
    })

    it('Deve realizar um novo balanco', () => {
       // Acessa a tela de listagem de balanco atraves do menu lateral
       MenulateralProdutoPage.acessarListagemBalanco()

       MenulateralProdutoPage.acessarCadastroNovoBalanco()

       // Preenche o cabecalho com o nome do responsavel pelo balanco
       BalancoPage.preencherCabecalho()

       // Salvar o cabecalho para ser exibido as proximas opcoes da tela
       BalancoPage.salvarCabecalho()

       // Seleciona o produto que será realizado o balanco
       BalancoPage.selecionarProduto()

       // Salva o balanco apos o produto ser inserido
       BalancoPage.salvarBalanco()

       // Clica no botao de finalizar para alterar o status do balanco
       BalancoPage.finalizarBalanco()

       // Verifica se foi exibido o Toast do sucesso e se o status foi alterado para finalizado
       BalancoPage.verificarToastSucesso()
       BalancoPage.verificarStatusFinalizado()
    })
})
