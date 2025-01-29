import BalancoPage from "../../support/pages/Balanco/BalancoPage";
import menulateralprodutopage from "../../support/pages/menulateral/menulateralprodutopage";

describe('Balanco' ,() => {
    beforeEach(() => {
        cy.login();
    })

    

    it('Deve realizar um novo balanco', () => {
       const responsavelBalanco = 'VENDEDOR'

       // Acessa a tela de listagem de balanco atraves do menu lateral
       menulateralprodutopage.acessarListagemBalanco()

       menulateralprodutopage.acessarCadastroNovoBalanco()
       

       // Preenche o cabecalho com o nome do responsavel pelo balanco
       BalancoPage.preencherCabecalho(responsavelBalanco)

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