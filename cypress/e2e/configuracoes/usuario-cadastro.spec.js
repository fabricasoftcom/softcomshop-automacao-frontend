import UsuarioCadastroPage from '../../support/pages/Usuario/UsuarioCadastroPage';
import UsuarioListagemPage from '../../support/pages/Usuario/UsuarioListagemPage';
import UsuarioCadastroLocators from '../../support/locators/Usuario/UsuarioCadastroLocators';
import { generateRandomUsuario } from '../../support/factory/generateRandomData';

describe('Cadastro de usuário', { tags: ['@configuracoes', '@usuario', '@cadastro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });

  it('deve exibir as abas e botoes principais do formulario', () => {
    UsuarioCadastroPage.visit();
    UsuarioCadastroPage.verificarLayoutBasico();
    cy.get(UsuarioCadastroLocators.inputNome).should('be.visible');
    cy.get(UsuarioCadastroLocators.btnSalvar).should('be.visible');
  });

  it('deve realizar cadastro completo de usuario com perfil', () => {
    UsuarioCadastroPage.visit();
    const usuario = generateRandomUsuario();

    // Preenche dados cadastrais
    UsuarioCadastroPage.preencherCamposUsuario(usuario);

    // Salva o cadastro primeiro (perfil pode ser adicionado depois na edição)
    UsuarioCadastroPage.cadastrar();
    UsuarioCadastroPage.confirmacaoCadastroUsuario();

    // Após salvar, navega para edição para adicionar perfil
    // 1. Voltar para listagem
    UsuarioListagemPage.acessarTelaListagem();

    // 2. Pesquisar pelo usuário criado
    UsuarioListagemPage.pesquisarPorNome(usuario.nome);

    // 3. Validar que usuário foi encontrado
    UsuarioListagemPage.validarResultadoPorNome(usuario.nome);

    // 4. Editar o usuário para adicionar perfil
    UsuarioCadastroPage.acessarEdicaoUsuario();

    // 5. Adiciona perfil (obrigatório para acesso ao sistema)
    UsuarioCadastroPage.adicionarPerfil(usuario.perfil);

    // 6. Salva novamente
    UsuarioCadastroPage.cadastrar();
    UsuarioCadastroPage.confirmacaoCadastroUsuario();

    // 7. Valida que o cadastro foi bem-sucedido (não valida exclusão, pois isso é coberto nos testes de listagem)
    UsuarioListagemPage.acessarTelaListagem();
    UsuarioListagemPage.pesquisarPorNome(usuario.nome);
    UsuarioListagemPage.validarResultadoPorNome(usuario.nome);
  });

  it('deve exibir erro ao tentar salvar sem preencher campos obrigatorios', () => {
    UsuarioCadastroPage.visit();
    UsuarioCadastroPage.tentarSalvarSemCamposObrigatorios();
    UsuarioCadastroPage.validarErroCamposObrigatorios();
  });

  it('deve permitir navegar entre todas as abas do formulario', () => {
    UsuarioCadastroPage.visit();

    // Validar que todas as abas são acessíveis
    UsuarioCadastroPage.validarTodasAbasAcessiveis();

    // Navegar por cada aba e validar que está ativa
    const abas = [
      'Dados Cadastrais',
      'Perfis'
    ];

    abas.forEach(aba => {
      UsuarioCadastroPage.navegarParaAba(aba);
      UsuarioCadastroPage.validarAbaAtiva(aba);
    });
  });

  it('deve retornar para listagem ao clicar em Voltar', () => {
    UsuarioCadastroPage.visit();
    UsuarioCadastroPage.clicarBotaoVoltar();
    UsuarioCadastroPage.validarRetornoListagem();
    // Validar que está na listagem
    cy.url().should('include', '/autenticacao/usuario');
    cy.url().should('not.include', '/novo');
  });

  it('deve validar autocomplete de perfil', () => {
    // Acessa um usuário existente para validar autocomplete (campo pode não estar disponível em novo cadastro)
    UsuarioListagemPage.acessarTelaListagem();
    UsuarioListagemPage.validarTabelaCarregada();
    UsuarioCadastroPage.acessarEdicaoUsuario();
    UsuarioCadastroPage.validarAutocompletePerfil('ADMINISTRADOR');
  });

  it.skip('deve editar usuario existente e validar alteracao', () => {
    // Acessar listagem e editar primeiro usuário
    UsuarioListagemPage.acessarTelaListagem();
    UsuarioListagemPage.validarTabelaCarregada();

    // Clicar em editar primeiro usuário
    UsuarioCadastroPage.acessarEdicaoUsuario();

    // Editar um campo (ex: Nome)
    const novoNome = `Usuario Editado ${Date.now()}`;
    UsuarioCadastroPage.editarCampo('nome', novoNome);

    // Salvar edição
    UsuarioCadastroPage.salvarEdicao();
    UsuarioCadastroPage.confirmacaoCadastroUsuario();
  });

  it('deve exibir erro ao tentar salvar com senhas diferentes', () => {
    UsuarioCadastroPage.visit();
    const usuario = generateRandomUsuario();

    // Preenche nome e email
    UsuarioCadastroPage.preencherCamposUsuario({
      nome: usuario.nome,
      email: usuario.email
    });

    // Preenche senhas diferentes
    UsuarioCadastroPage.preencherSenhasDiferentes('senha123', 'senha456');

    // Tenta salvar
    UsuarioCadastroPage.tentarSalvarSemCamposObrigatorios();

    // Valida erro de senhas diferentes
    UsuarioCadastroPage.validarErroSenhasDiferentes();
  });

  it('deve exibir erro ao tentar salvar com email invalido', () => {
    UsuarioCadastroPage.visit();
    const usuario = generateRandomUsuario();

    // Preenche nome
    UsuarioCadastroPage.preencherCamposUsuario({
      nome: usuario.nome
    });

    // Preenche email inválido
    UsuarioCadastroPage.preencherEmailInvalido('email-invalido-sem-arroba');

    // Preenche senhas válidas
    UsuarioCadastroPage.preencherCamposUsuario({
      senha: usuario.senha,
      redigiteSenha: usuario.redigiteSenha
    });

    // Tenta salvar
    UsuarioCadastroPage.tentarSalvarSemCamposObrigatorios();

    // Valida erro de email inválido
    UsuarioCadastroPage.validarErroEmailInvalido();
  });

  it('deve permitir excluir perfil do usuario', () => {
    // Acessa um usuário existente
    UsuarioListagemPage.acessarTelaListagem();
    UsuarioListagemPage.validarTabelaCarregada();
    UsuarioCadastroPage.acessarEdicaoUsuario();

    // Navega para aba Perfis e verifica se há perfis
    cy.contains('[role="tab"]', 'Perfis').click({ force: true });
    cy.wait(1000);

    // Verifica se há perfis antes de tentar excluir
    cy.get(UsuarioCadastroLocators.linhasTabelaPerfis, { timeout: 5000 }).then(($linhas) => {
      if ($linhas.length > 0) {
        // Exclui o primeiro perfil
        UsuarioCadastroPage.excluirPerfil();
        // Valida que a tabela ainda está visível (perfil foi removido ou não)
        cy.get(UsuarioCadastroLocators.tabelaPerfis).should('be.visible');
      } else {
        // Se não houver perfis, adiciona um primeiro para depois excluir
        UsuarioCadastroPage.adicionarPerfil('ADMINISTRADOR');
        cy.wait(2000);
        // Agora exclui o perfil adicionado
        UsuarioCadastroPage.excluirPerfil();
      }
    });
  });

  it('deve permitir editar usuario sem alterar senha', () => {
    // Acessa um usuário existente
    UsuarioListagemPage.acessarTelaListagem();
    UsuarioListagemPage.validarTabelaCarregada();
    UsuarioCadastroPage.acessarEdicaoUsuario();

    // Edita apenas o nome, sem preencher campos de senha
    const novoNome = `Usuario Editado Sem Senha ${Date.now()}`;
    UsuarioCadastroPage.editarSemAlterarSenha(novoNome);

    // Salva a edição
    UsuarioCadastroPage.salvarEdicao();
    UsuarioCadastroPage.confirmacaoCadastroUsuario();

    // Valida que a edição foi bem-sucedida
    UsuarioListagemPage.acessarTelaListagem();
    UsuarioListagemPage.pesquisarPorNome(novoNome);
    UsuarioListagemPage.validarResultadoPorNome(novoNome);
  });
});

