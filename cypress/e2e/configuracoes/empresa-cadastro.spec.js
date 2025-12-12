import EmpresaCadastroPage from '../../support/pages/Empresa/EmpresaCadastroPage';
import EmpresaListagemPage from '../../support/pages/Empresa/EmpresaListagemPage';
import EmpresaCadastroLocators from '../../support/locators/Empresa/EmpresaCadastroLocators';
import { generateRandomCompany } from '../../support/factory/generateRandomData';

describe('Cadastro de empresa', { tags: ['@configuracoes', '@empresa', '@cadastro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });

  it('deve exibir as abas e botoes principais do formulario', () => {
    EmpresaCadastroPage.visit();
    EmpresaCadastroPage.verificarLayoutBasico();
    cy.get(EmpresaCadastroLocators.inputCnpj).should('be.visible');
    cy.get(EmpresaCadastroLocators.btnSalvar).should('be.visible');
  });

  it('deve realizar cadastro completo de empresa', () => {
    EmpresaCadastroPage.visit();
    const empresa = generateRandomCompany();
    EmpresaCadastroPage.preencherCamposEmpresa(empresa);
    EmpresaCadastroPage.cadastrar();
    EmpresaCadastroPage.confirmacaoCadastroEmpresa();

    // Exclusão após cadastro
    // 1. Voltar para listagem
    EmpresaListagemPage.acessarTelaListagem();

    // 2. Pesquisar pela empresa criada
    EmpresaListagemPage.pesquisarPorNome(empresa.nome);

    // 3. Validar que empresa foi encontrada
    EmpresaListagemPage.validarResultadoPorNome(empresa.nome);

    // 4. Selecionar empresa na tabela
    EmpresaListagemPage.selecionarPrimeiraEmpresa();

    // 5. Excluir
    EmpresaListagemPage.abrirModalExcluirSelecionados();
    EmpresaListagemPage.confirmarExclusao();

    // 6. Validar exclusão
    EmpresaListagemPage.validarEmpresaNaoExiste(empresa.nome);
  });

  it('deve exibir erro ao tentar salvar sem preencher campos obrigatorios', () => {
    EmpresaCadastroPage.visit();
    EmpresaCadastroPage.tentarSalvarSemCamposObrigatorios();
    EmpresaCadastroPage.validarErroCamposObrigatorios();
  });

  it('deve permitir navegar entre todas as abas do formulario', () => {
    // Acessar edição de empresa existente (algumas abas só funcionam com empresa cadastrada)
    EmpresaListagemPage.acessarTelaListagem();
    EmpresaListagemPage.validarTabelaCarregada();

    // Clicar em editar primeira empresa (acessarEdicaoEmpresa já chama acessarTelaListagem internamente,
    // mas como já estamos na listagem, vamos clicar diretamente no link)
    cy.get(EmpresaCadastroLocators.linkEditarEmpresa).first().click();
    cy.url().should('match', /\/cadastro\/empresa\/\d+\/editar/);

    // Validar que todas as abas são acessíveis
    EmpresaCadastroPage.validarTodasAbasAcessiveis();

    // Navegar por cada aba e validar que está ativa
    const abas = [
      'Dados Cadastrais',
      'Certificado Sefaz',
      'Envio de Emails',
      'Dispositivos',
      'Logo',
      'CPFs/CNPJs Autorizados',
      'Configurações',
      'Configuração de chaves'
    ];

    abas.forEach(aba => {
      EmpresaCadastroPage.navegarParaAba(aba);
      EmpresaCadastroPage.validarAbaAtiva(aba);
    });
  });

  it('deve retornar para listagem ao clicar em Voltar', () => {
    EmpresaCadastroPage.visit();
    EmpresaCadastroPage.clicarBotaoVoltar();
    EmpresaCadastroPage.validarRetornoListagem();
    // Validar que está na listagem
    cy.url().should('include', '/cadastro/empresa');
    cy.url().should('not.include', '/novo');
  });

  it('deve validar autocomplete de bairro', () => {
    EmpresaCadastroPage.visit();
    EmpresaCadastroPage.validarAutocompleteBairro('CENTRO');
  });

  it('deve validar autocomplete de cidade', () => {
    EmpresaCadastroPage.visit();
    EmpresaCadastroPage.validarAutocompleteCidade('SAO PAULO');
  });

  it('deve editar empresa existente e validar alteracao', () => {
    // Acessar listagem e editar primeira empresa
    EmpresaListagemPage.acessarTelaListagem();
    EmpresaListagemPage.validarTabelaCarregada();

    // Clicar em editar primeira empresa
    EmpresaCadastroPage.acessarEdicaoEmpresa();

    // Editar um campo (ex: Fantasia)
    const novaFantasia = `Fantasia Editada ${Date.now()}`;
    EmpresaCadastroPage.editarCampo('fantasia', novaFantasia);

    // Salvar edição
    EmpresaCadastroPage.salvarEdicao();
    EmpresaCadastroPage.confirmacaoCadastroEmpresa();
  });
});

