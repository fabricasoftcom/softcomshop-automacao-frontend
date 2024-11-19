import ListagemContasPage from "../../support/pages/Financeiro/ListagemContasPage";

describe('Testes de Listagem de Contas', () => {
  beforeEach(() => {
    cy.login();
    ListagemContasPage.visit();
  });

//   it('Deve verificar a exibição da tabela de contas', () => {
//     ListagemContasPage.verificarTabelaVisivel();
//     ListagemContasPage.verificarPrimeiraLinha();
//   });

//   it('Deve abrir o dropdown e selecionar uma opção', () => {
//     ListagemContasPage.abrirDropdownAcoesPrimeiraLinha();
//     ListagemContasPage.selecionarOpcaoDropdown('Editar');
//   });

//   it('Deve buscar por uma conta específica', () => {
//     ListagemContasPage.buscarConta('CAIXA');
//     ListagemContasPage.verificarPrimeiraLinha();
//   });

//   it('Deve verificar que o status da conta é "Ativa"', () => {
//     ListagemContasPage.verificarStatusAtiva();
//   });
it('Deve clicar no botão de novo cadastro e redirecionar para a página de cadastro', () => {
    // Clicar no botão de novo cadastro
    ListagemContasPage.clicarNovoCadastro();

    // Validar que foi redirecionado para a página de cadastro
    ListagemContasPage.verificarPaginaCadastro();
  });
});
