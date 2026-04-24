import PerfilAcessoPage from '../../support/pages/Configuracoes/PerfilAcessoPage';

function gerarNomePerfilUnico() {
  const agora = new Date();
  const data = agora.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const hora = agora.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  return `perfil teste ${data}:${hora}`;
}

describe('Cadastro de Perfil de Acesso', { tags: ['@configuracoes', '@perfil-acesso', '@cadastro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });

  it('deve exibir o modal de cadastro corretamente', () => {
    PerfilAcessoPage.acessarTelaListagem();
    PerfilAcessoPage.abrirModalCadastro();
    PerfilAcessoPage.validarModalVisivel();
  });

  it('deve realizar cadastro completo de perfil com todos os campos', () => {
    PerfilAcessoPage.acessarTelaListagem();
    const nomePerfil = gerarNomePerfilUnico();

    PerfilAcessoPage.cadastrarPerfil(nomePerfil, 'CLIENTE');

    // Valida que o perfil foi criado pesquisando na listagem
    PerfilAcessoPage.pesquisarPorNome(nomePerfil);
    PerfilAcessoPage.validarResultadoPesquisa(nomePerfil);
  });

  it('deve realizar cadastro de perfil apenas com campos obrigatórios', () => {
    PerfilAcessoPage.acessarTelaListagem();
    const nomePerfil = gerarNomePerfilUnico();

    PerfilAcessoPage.abrirModalCadastro();
    PerfilAcessoPage.preencherNomePerfil(nomePerfil);
    // Profile é obrigatório, então seleciona um valor padrão
    PerfilAcessoPage.selecionarProfile('CONTADOR');
    PerfilAcessoPage.salvarPerfil();

    // Valida que o perfil foi criado
    PerfilAcessoPage.pesquisarPorNome(nomePerfil);
    PerfilAcessoPage.validarResultadoPesquisaComDados();
  });

  it('deve exibir erro ao tentar salvar sem preencher campos obrigatórios', () => {
    PerfilAcessoPage.acessarTelaListagem();
    PerfilAcessoPage.abrirModalCadastro();

    // Tenta salvar sem preencher nada
    PerfilAcessoPage.tentarSalvarSemCamposObrigatorios();
    PerfilAcessoPage.validarErroCamposObrigatorios();
  });

  it('deve fechar o modal ao clicar no botão Fechar', () => {
    PerfilAcessoPage.acessarTelaListagem();
    PerfilAcessoPage.abrirModalCadastro();
    PerfilAcessoPage.fecharModal();
    PerfilAcessoPage.validarModalFechado();
  });

  it('deve permitir selecionar diferentes tipos de Profile', () => {
    PerfilAcessoPage.acessarTelaListagem();
    PerfilAcessoPage.abrirModalCadastro();

    // Valida que o campo Profile tem as opções esperadas
    PerfilAcessoPage.validarCampoProfileVisivel();
    PerfilAcessoPage.validarCampoProfileTemOpcoes();

    // Testa selecionar CLIENTE
    PerfilAcessoPage.selecionarProfile('CLIENTE');
    PerfilAcessoPage.validarCampoProfileValor('CLIENTE');

    // Testa selecionar CONTADOR
    PerfilAcessoPage.selecionarProfile('CONTADOR');
    PerfilAcessoPage.validarCampoProfileValor('CONTADOR');
  });
});
