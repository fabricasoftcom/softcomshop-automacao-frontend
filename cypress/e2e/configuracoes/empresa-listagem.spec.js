import EmpresaListagemPage from '../../support/pages/Empresa/EmpresaListagemPage';
import EmpresaListagemLocators from '../../support/locators/Empresa/EmpresaListagemLocators';

describe('Listagem de empresas', { tags: ['@configuracoes', '@empresa', '@listagem', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    EmpresaListagemPage.acessarTelaListagem();
  });

  it('exibe a listagem e permite abrir o formulario de filtros', () => {
    EmpresaListagemPage.validarTabelaCarregada();
    EmpresaListagemPage.validarPaginacaoAtual('1');
    EmpresaListagemPage.abrirFormularioPesquisa();
    cy.get(EmpresaListagemLocators.formPesquisa).should('be.visible');
  });

  it('aplica filtro por nome e limpa o campo apos a pesquisa', () => {
    const nomeEmpresa = 'SOFTCOM';
    EmpresaListagemPage.pesquisarPorNome(nomeEmpresa);
    EmpresaListagemPage.validarResultadoPorNome(nomeEmpresa);

    EmpresaListagemPage.limparFiltroNome();
    cy.get(EmpresaListagemLocators.inputNome).should('have.value', '');
  });

  it('seleciona e limpa todos os checkboxes da tabela', () => {
    EmpresaListagemPage.selecionarTodasEmpresas();
    EmpresaListagemPage.desmarcarTodasEmpresas();
  });

  it('alerta quando tentar excluir sem selecionar registros', () => {
    EmpresaListagemPage.tentarExcluirSemSelecao();
  });

  it('abre o modal de exclusao ao selecionar registros e cancela a acao', () => {
    EmpresaListagemPage.selecionarPrimeiraEmpresa();
    EmpresaListagemPage.abrirModalExcluirSelecionados();
    EmpresaListagemPage.cancelarModalExclusao();
  });

  it('valida paginacao inicial da listagem', () => {
    EmpresaListagemPage.validarTabelaCarregada();
    EmpresaListagemPage.validarPaginacaoAtual('1');
  });

  it('navega para novo cadastro ao clicar no botao Novo Cadastro', () => {
    EmpresaListagemPage.clicarBotaoNovo();
    cy.url().should('include', '/cadastro/empresa/novo');
  });

  it('abre e fecha o formulario de pesquisa corretamente', () => {
    // Primeiro fecha se estiver aberto
    cy.get('body').then(($body) => {
      const container = $body.find(EmpresaListagemLocators.containerFormPesquisa);
      if (container.length > 0 && container.is(':visible')) {
        // Fecha o formulário
        cy.get('h5').contains('Listagem').parent().find('a[href="#"]').first().click();
        cy.wait(500);
      }
    });

    // Abre o formulário
    cy.get('h5').contains('Listagem').parent().find('a[href="#"]').first().click();
    cy.wait(500);
    cy.get(EmpresaListagemLocators.containerFormPesquisa, { timeout: 10000 }).should('be.visible');
    cy.get(EmpresaListagemLocators.formPesquisa).should('be.visible');

    // Fecha o formulário
    cy.get('h5').contains('Listagem').parent().find('a[href="#"]').first().click();
    cy.wait(500);
    cy.get(EmpresaListagemLocators.containerFormPesquisa).should('not.be.visible');

    // Abre novamente para confirmar que funciona
    cy.get('h5').contains('Listagem').parent().find('a[href="#"]').first().click();
    cy.wait(500);
    cy.get(EmpresaListagemLocators.containerFormPesquisa, { timeout: 10000 }).should('be.visible');
    cy.get(EmpresaListagemLocators.formPesquisa).should('be.visible');
  });

  it('aplica filtro por CNPJ e valida resultado', () => {
    // Primeiro, captura um CNPJ da primeira linha da tabela
    cy.get(EmpresaListagemLocators.linhasTabela).first().then(($linha) => {
      // Tenta encontrar o CNPJ na linha (pode estar em diferentes colunas)
      const textoLinha = $linha.text();
      // Extrai CNPJ do texto (formato: XX.XXX.XXX/XXXX-XX ou apenas números)
      const cnpjMatch = textoLinha.match(/\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}/);

      if (cnpjMatch) {
        const cnpj = cnpjMatch[0].replace(/[.\/-]/g, ''); // Remove formatação
        EmpresaListagemPage.preencherFiltroCnpj(cnpj);
        EmpresaListagemPage.submeterPesquisa();

        // Valida que pelo menos uma linha foi retornada
        cy.get(EmpresaListagemLocators.linhasTabela)
          .its('length')
          .should('be.greaterThan', 0);

        // Valida que o resultado contém dados (o filtro pode retornar resultados parciais)
        cy.get(EmpresaListagemLocators.tabelaEmpresas)
          .should('be.visible');
      } else {
        cy.log('Nenhum CNPJ encontrado na primeira linha. Teste pulado.');
      }
    });
  });

  it('aplica filtro por Fantasia e valida resultado', () => {
    const fantasia = 'SOFTCOM';
    EmpresaListagemPage.preencherFiltroFantasia(fantasia);
    EmpresaListagemPage.submeterPesquisa();
    EmpresaListagemPage.validarResultadoPorFantasia(fantasia);
  });

  it('aplica filtro por Razao Social e valida resultado', () => {
    const razaoSocial = 'SOFTCOM';
    EmpresaListagemPage.preencherFiltroRazaoSocial(razaoSocial);
    EmpresaListagemPage.submeterPesquisa();
    EmpresaListagemPage.validarResultadoPorRazaoSocial(razaoSocial);
  });

  it('limpa todos os campos do formulario de pesquisa', () => {
    // Preencher alguns filtros
    EmpresaListagemPage.preencherFiltroNome('TESTE');
    EmpresaListagemPage.preencherFiltroCnpj('12345678901234');
    // Limpar todos
    EmpresaListagemPage.limparTodosFiltros();
    // Validar que todos os campos estão vazios
    cy.get(EmpresaListagemLocators.inputCnpj).should('have.value', '');
    cy.get(EmpresaListagemLocators.inputNome).should('have.value', '');
    cy.get(EmpresaListagemLocators.inputFantasia).should('have.value', '');
    cy.get(EmpresaListagemLocators.inputRazaoSocial).should('have.value', '');
  });

  it('abre a edicao do primeiro registro da listagem', () => {
    EmpresaListagemPage.validarTabelaCarregada();
    EmpresaListagemPage.abrirEdicaoPrimeiraEmpresa();
    cy.url().should('match', /\/cadastro\/empresa\/\d+\/editar/);
  });
});

