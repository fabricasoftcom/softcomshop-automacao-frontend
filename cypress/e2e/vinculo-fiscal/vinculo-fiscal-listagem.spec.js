import VinculoFiscalListagemPage from "../../support/pages/VinculoFiscal/VinculoFiscalListagemPage";

describe('Testes de Listagem de Vínculo Fiscal', () => {

  beforeEach(() => {
    // Realiza o login e visita a página antes de cada teste
    cy.login();
    VinculoFiscalListagemPage.visit();
  });

  // it('Deve realizar cadastro de novo vínculo fiscal', () => {
  //   // Ação: Clicar em "Novo Cadastro"
  //   VinculoFiscalListagemPage.novoCadastro();

  //   // Validações: Redirecionamento e visibilidade do título
  //   cy.url().should('include', '/novo');
  //   cy.get('h5').should('contain', 'Vínculo Fiscal');
  // });

  it('Deve excluir todos os itens selecionados', () => {
    // Seleciona todos os registros da tabela
    VinculoFiscalListagemPage.selecionarTodosRegistros();

    // Ação: Excluir e confirmar a exclusão
    VinculoFiscalListagemPage.excluirSelecionados();
    VinculoFiscalListagemPage.confirmarExclusao();

    // Validações: Alerta de sucesso e tabela vazia
    VinculoFiscalListagemPage.validarAlerta();
    VinculoFiscalListagemPage.verificarTabelaVazia();
  });

  // it('Deve editar o primeiro vínculo fiscal da tabela', () => {
  //   // Ação: Editar a primeira linha da tabela
  //   VinculoFiscalListagemPage.editarLinha(0);

  //   // Validações: Redirecionamento e visibilidade do título
  //   cy.url().should('include', '/editar');
  //   cy.get('h5').should('contain', 'Editar Vínculo Fiscal');
  // });

  // it('Deve pesquisar um vínculo fiscal por código e descrição', () => {
  //   const codigo = '3';
  //   const descricao = 'ICMS cobrado anteriormente por Substituição';

  //   // Ação: Realizar a pesquisa
  //   VinculoFiscalListagemPage.pesquisar(codigo, descricao);

  //   // Validações: Apenas um resultado é exibido e possui os dados pesquisados
  //   VinculoFiscalListagemPage.verificarQuantidadeLinhasTabela(1);
  //   VinculoFiscalListagemPage.verificarLinhaContemTexto(0, codigo);
  //   VinculoFiscalListagemPage.verificarLinhaContemTexto(0, descricao);
  // });

  // it('Deve validar pesquisa sem resultados', () => {
  //   const codigoInvalido = '9999';
  //   const descricaoInvalida = 'Registro Inexistente';

  //   // Ação: Realizar a pesquisa com dados inexistentes
  //   VinculoFiscalListagemPage.pesquisar(codigoInvalido, descricaoInvalida);

  //   // Validações: Mensagem de "Nenhum registro encontrado"
  //   VinculoFiscalListagemPage.verificarTabelaVazia();
  //   cy.contains('Nenhum registro encontrado').should('be.visible');
  // });

  // it('Deve validar múltipla seleção de checkboxes e exclusão', () => {
  //   // Seleciona dois registros
  //   VinculoFiscalListagemPage.selecionarLinha(0);
  //   VinculoFiscalListagemPage.selecionarLinha(1);

  //   // Ação: Excluir os registros selecionados
  //   VinculoFiscalListagemPage.excluirSelecionados();
  //   VinculoFiscalListagemPage.confirmarExclusao();

  //   // Validações: Os registros foram removidos
  //   VinculoFiscalListagemPage.verificarQuantidadeLinhasTabelaMenorQue(2);
  // });

  // it('Deve validar navegação entre páginas', () => {
  //   // Ação: Ir para a próxima página
  //   VinculoFiscalListagemPage.irParaProximaPagina();
  //   VinculoFiscalListagemPage.validarPaginaAtual(2);

  //   // Ação: Voltar para a página anterior
  //   VinculoFiscalListagemPage.irParaPaginaAnterior();
  //   VinculoFiscalListagemPage.validarPaginaAtual(1);
  // });

  // it('Deve validar que o vínculo padrão não pode ser desmarcado sem outro ativo', () => {
  //   // Ação: Tentar desmarcar o vínculo padrão
  //   VinculoFiscalListagemPage.tentarDesmarcarVinculoPadrao();

  //   // Validação: Mensagem de erro
  //   VinculoFiscalListagemPage.validarMensagemAviso(
  //     'Para desmarcar esse vínculo como Vinculo Padrão é necessário ativar outro da lista.'
  //   );
  // });

  // it('Deve validar a tabela está vazia após excluir todos os registros', () => {
  //   // Seleciona todos os registros
  //   VinculoFiscalListagemPage.selecionarTodosRegistros();

  //   // Ação: Excluir e confirmar
  //   VinculoFiscalListagemPage.excluirSelecionados();
  //   VinculoFiscalListagemPage.confirmarExclusao();

  //   // Validações: Tabela vazia
  //   VinculoFiscalListagemPage.verificarTabelaVazia();
  // });
});
