import FuncionarioCadastroPage from '../../support/pages/Funcionario/FuncionarioCadastroPage';
import FuncionarioListagemPage from '../../support/pages/Funcionario/FuncionarioListagemPage';
import FuncionarioCadastroLocators from '../../support/locators/Funcionario/FuncionarioCadastroLocators';
import { generateRandomFuncionario } from '../../support/factory/generateRandomData';

describe('Cadastro de funcionário', { tags: ['@configuracoes', '@funcionario', '@cadastro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });

  it('deve exibir as abas e botoes principais do formulario', () => {
    FuncionarioCadastroPage.visit();
    FuncionarioCadastroPage.verificarLayoutBasico();
    cy.get(FuncionarioCadastroLocators.inputNome).should('be.visible');
    cy.get(FuncionarioCadastroLocators.btnSalvar).should('be.visible');
  });

  it('deve realizar cadastro completo de funcionario', () => {
    FuncionarioCadastroPage.visit();
    const funcionario = generateRandomFuncionario();
    FuncionarioCadastroPage.preencherCamposFuncionario(funcionario);
    FuncionarioCadastroPage.cadastrar();
    FuncionarioCadastroPage.confirmacaoCadastroFuncionario();

    // Exclusão após cadastro
    // 1. Voltar para listagem
    FuncionarioListagemPage.acessarTelaListagem();

    // 2. Pesquisar pelo funcionário criado
    FuncionarioListagemPage.pesquisarPorNome(funcionario.nome);

    // 3. Validar que funcionário foi encontrado
    FuncionarioListagemPage.validarResultadoPorNome(funcionario.nome);

    // 4. Selecionar funcionário na tabela
    FuncionarioListagemPage.selecionarPrimeiroFuncionario();

    // 5. Excluir
    FuncionarioListagemPage.abrirModalExcluirSelecionados();
    FuncionarioListagemPage.confirmarExclusao();

    // 6. Validar exclusão
    FuncionarioListagemPage.validarFuncionarioNaoExiste(funcionario.nome);
  });

  it('deve exibir erro ao tentar salvar sem preencher campos obrigatorios', () => {
    FuncionarioCadastroPage.visit();
    FuncionarioCadastroPage.tentarSalvarSemCamposObrigatorios();
    FuncionarioCadastroPage.validarErroCamposObrigatorios();
  });

  it('deve permitir navegar entre todas as abas do formulario', () => {
    FuncionarioCadastroPage.visit();

    // Validar que todas as abas são acessíveis
    FuncionarioCadastroPage.validarTodasAbasAcessiveis();

    // Navegar por cada aba e validar que está ativa
    const abas = [
      'Dados Cadastrais',
      'Usuário'
    ];

    abas.forEach(aba => {
      FuncionarioCadastroPage.navegarParaAba(aba);
      FuncionarioCadastroPage.validarAbaAtiva(aba);
    });
  });

  it('deve retornar para listagem ao clicar em Voltar', () => {
    FuncionarioCadastroPage.visit();
    FuncionarioCadastroPage.clicarBotaoVoltar();
    FuncionarioCadastroPage.validarRetornoListagem();
    // Validar que está na listagem
    cy.url().should('include', '/cadastro/funcionario');
    cy.url().should('not.include', '/novo');
  });

  it('deve validar autocomplete de funcao', () => {
    FuncionarioCadastroPage.visit();
    FuncionarioCadastroPage.validarAutocompleteFuncao('VENDEDOR');
  });

  it('deve validar autocomplete de bairro', () => {
    FuncionarioCadastroPage.visit();
    FuncionarioCadastroPage.validarAutocompleteBairro('CENTRO');
  });

  it('deve validar autocomplete de cidade', () => {
    FuncionarioCadastroPage.visit();
    FuncionarioCadastroPage.validarAutocompleteCidade('SAO PAULO - SP');
  });

  it('deve editar funcionario existente e validar alteracao', () => {
    // Acessar listagem e editar primeiro funcionário
    FuncionarioListagemPage.acessarTelaListagem();
    FuncionarioListagemPage.validarTabelaCarregada();

    // Clicar em editar primeiro funcionário
    FuncionarioCadastroPage.acessarEdicaoFuncionario();

    // Editar um campo (ex: Observação)
    const novaObservacao = `Observação Editada ${Date.now()}`;
    FuncionarioCadastroPage.editarCampo('observacao', novaObservacao);

    // Salvar edição
    FuncionarioCadastroPage.salvarEdicao();
    FuncionarioCadastroPage.confirmacaoCadastroFuncionario();
  });
});

