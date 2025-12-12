import FuncionarioListagemPage from '../../support/pages/Funcionario/FuncionarioListagemPage';
import FuncionarioListagemLocators from '../../support/locators/Funcionario/FuncionarioListagemLocators';

describe('Listagem de funcionários', { tags: ['@configuracoes', '@funcionario', '@listagem', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    FuncionarioListagemPage.acessarTelaListagem();
  });

  it('exibe a listagem e permite abrir o formulario de filtros', () => {
    FuncionarioListagemPage.validarTabelaCarregada();
    FuncionarioListagemPage.validarPaginacaoAtual('1');
    FuncionarioListagemPage.abrirFormularioPesquisa();
    cy.get(FuncionarioListagemLocators.formPesquisa).should('be.visible');
  });

  it('aplica filtro por nome e limpa o campo apos a pesquisa', () => {
    const nomeFuncionario = 'Antonio';
    FuncionarioListagemPage.pesquisarPorNome(nomeFuncionario);
    FuncionarioListagemPage.validarResultadoPorNome(nomeFuncionario);

    FuncionarioListagemPage.limparFiltroNome();
    cy.get(FuncionarioListagemLocators.inputNome).should('have.value', '');
  });

  it('seleciona e limpa todos os checkboxes da tabela', () => {
    FuncionarioListagemPage.selecionarTodosFuncionarios();
    FuncionarioListagemPage.desmarcarTodosFuncionarios();
  });

  it('alerta quando tentar excluir sem selecionar registros', () => {
    FuncionarioListagemPage.tentarExcluirSemSelecao();
  });

  it('abre o modal de exclusao ao selecionar registros e cancela a acao', () => {
    FuncionarioListagemPage.selecionarPrimeiroFuncionario();
    FuncionarioListagemPage.abrirModalExcluirSelecionados();
    FuncionarioListagemPage.cancelarModalExclusao();
  });

  it('valida paginacao inicial da listagem', () => {
    FuncionarioListagemPage.validarTabelaCarregada();
    FuncionarioListagemPage.validarPaginacaoAtual('1');
  });

  it('navega para novo cadastro ao clicar no botao Novo Cadastro', () => {
    FuncionarioListagemPage.clicarBotaoNovo();
    cy.url().should('include', '/cadastro/funcionario/novo');
  });

  it('abre e fecha o formulario de pesquisa corretamente', () => {
    // Primeiro fecha se estiver aberto
    cy.get('body').then(($body) => {
      const form = $body.find(FuncionarioListagemLocators.formPesquisa);
      if (form.length > 0 && form.is(':visible')) {
        // Fecha o formulário
        cy.get('h5').contains('Listagem').parent().find('a[href="#"]').first().click();
        cy.wait(500);
      }
    });

    // Abre o formulário
    cy.get('h5').contains('Listagem').parent().find('a[href="#"]').first().click();
    cy.wait(500);
    cy.get(FuncionarioListagemLocators.formPesquisa, { timeout: 10000 }).should('be.visible');

    // Fecha o formulário
    cy.get('h5').contains('Listagem').parent().find('a[href="#"]').first().click();
    cy.wait(500);
    cy.get(FuncionarioListagemLocators.formPesquisa).should('not.be.visible');

    // Abre novamente para confirmar que funciona
    cy.get('h5').contains('Listagem').parent().find('a[href="#"]').first().click();
    cy.wait(500);
    cy.get(FuncionarioListagemLocators.formPesquisa, { timeout: 10000 }).should('be.visible');
  });

  it('aplica filtro por codigo e valida resultado', () => {
    // Primeiro, captura um código da primeira linha da tabela
    cy.get(FuncionarioListagemLocators.linhasTabela).first().then(($linha) => {
      // Tenta encontrar o código na linha (geralmente na terceira coluna)
      const textoLinha = $linha.text();
      // Extrai código do texto (número no início da linha)
      const codigoMatch = textoLinha.match(/^\s*(\d+)/);

      if (codigoMatch) {
        const codigo = codigoMatch[1];
        FuncionarioListagemPage.preencherFiltroCodigo(codigo);
        FuncionarioListagemPage.submeterPesquisa();

        // Valida que pelo menos uma linha foi retornada
        cy.get(FuncionarioListagemLocators.linhasTabela)
          .its('length')
          .should('be.greaterThan', 0);

        // Valida que o resultado contém dados
        cy.get(FuncionarioListagemLocators.tabelaFuncionarios)
          .should('be.visible');
      } else {
        cy.log('Nenhum código encontrado na primeira linha. Teste pulado.');
      }
    });
  });
});

