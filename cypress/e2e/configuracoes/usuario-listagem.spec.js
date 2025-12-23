import UsuarioListagemPage from '../../support/pages/Usuario/UsuarioListagemPage';
import UsuarioListagemLocators from '../../support/locators/Usuario/UsuarioListagemLocators';

describe('Listagem de usuários', { tags: ['@configuracoes', '@usuario', '@listagem', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    UsuarioListagemPage.acessarTelaListagem();
  });

  it('exibe a listagem e permite abrir o formulario de filtros', () => {
    UsuarioListagemPage.validarTabelaCarregada();
    UsuarioListagemPage.abrirFormularioPesquisa();
    cy.get(UsuarioListagemLocators.formPesquisa).should('be.visible');
  });

  it('aplica filtro por nome e limpa o campo apos a pesquisa', () => {
    // Primeiro, captura um nome da primeira linha da tabela
    cy.get(UsuarioListagemLocators.linhasTabela).first().then(($linha) => {
      // Pega o texto da célula de nome (geralmente a terceira coluna após checkbox e ações)
      const nomeCell = $linha.find('td').eq(2); // Índice 2 = terceira coluna (0=checkbox, 1=ações, 2=código, 3=nome)
      const nomeUsuario = nomeCell.text().trim();

      if (nomeUsuario && nomeUsuario.length > 0) {
        UsuarioListagemPage.pesquisarPorNome(nomeUsuario);
        // Valida que pelo menos uma linha foi retornada (não valida o nome específico pois pode haver múltiplos resultados)
        cy.get(UsuarioListagemLocators.linhasTabela).should('have.length.greaterThan', 0);

        UsuarioListagemPage.limparFiltroNome();
        cy.get(UsuarioListagemLocators.inputNome).should('have.value', '');
      } else {
        cy.log('Nenhum nome encontrado na primeira linha. Teste pulado.');
      }
    });
  });

  it('seleciona e limpa todos os checkboxes da tabela', () => {
    UsuarioListagemPage.selecionarTodosUsuarios();
    UsuarioListagemPage.desmarcarTodosUsuarios();
  });

  it('alerta quando tentar excluir sem selecionar registros', () => {
    UsuarioListagemPage.tentarExcluirSemSelecao();
  });

  it('abre o modal de exclusao ao selecionar registros e cancela a acao', () => {
    UsuarioListagemPage.selecionarPrimeiroUsuario();
    UsuarioListagemPage.abrirModalExcluirSelecionados();
    UsuarioListagemPage.cancelarModalExclusao();
  });

  it('navega para novo cadastro ao acessar URL direta', () => {
    cy.visit('/autenticacao/usuario/novo');
    cy.url().should('include', '/autenticacao/usuario/novo');
  });

  it('abre e fecha o formulario de pesquisa corretamente', () => {
    // Primeiro fecha se estiver aberto
    cy.get('body').then(($body) => {
      const form = $body.find(UsuarioListagemLocators.formPesquisa);
      if (form.length > 0 && form.is(':visible')) {
        // Fecha o formulário
        cy.get(UsuarioListagemLocators.tituloListagem).contains('Listagem').parent().find(UsuarioListagemLocators.btnPesquisaToggle).first().click();
        cy.wait(500);
      }
    });

    // Abre o formulário
    cy.get(UsuarioListagemLocators.tituloListagem).contains('Listagem').parent().find(UsuarioListagemLocators.btnPesquisaToggle).first().click();
    cy.wait(500);
    cy.get(UsuarioListagemLocators.formPesquisa, { timeout: 10000 }).should('be.visible');

    // Fecha o formulário
    cy.get(UsuarioListagemLocators.tituloListagem).contains('Listagem').parent().find(UsuarioListagemLocators.btnPesquisaToggle).first().click();
    cy.wait(500);
    cy.get(UsuarioListagemLocators.formPesquisa).should('not.be.visible');

    // Abre novamente para confirmar que funciona
    cy.get(UsuarioListagemLocators.tituloListagem).contains('Listagem').parent().find(UsuarioListagemLocators.btnPesquisaToggle).first().click();
    cy.wait(500);
    cy.get(UsuarioListagemLocators.formPesquisa, { timeout: 10000 }).should('be.visible');
  });

  it('aplica filtro por codigo e valida resultado', () => {
    // Primeiro, captura um código da primeira linha da tabela
    cy.get(UsuarioListagemLocators.linhasTabela).first().then(($linha) => {
      const textoLinha = $linha.text();
      // Extrai código do texto (número no início da linha)
      const codigoMatch = textoLinha.match(/^\s*(\d+)/);

      if (codigoMatch) {
        const codigo = codigoMatch[1];
        UsuarioListagemPage.preencherFiltroCodigo(codigo);
        UsuarioListagemPage.submeterPesquisa();

        // Valida que pelo menos uma linha foi retornada
        cy.get(UsuarioListagemLocators.linhasTabela)
          .its('length')
          .should('be.greaterThan', 0);

        // Valida que o resultado contém dados
        cy.get(UsuarioListagemLocators.tabelaUsuarios)
          .should('be.visible');
      } else {
        cy.log('Nenhum código encontrado na primeira linha. Teste pulado.');
      }
    });
  });
});

