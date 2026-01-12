import PlanoContasSpedPage from "../../support/pages/Sped/PlanoContasSpedPage";

describe("SPED > Plano de Contas", { tags: ["@sped", "@plano-contas", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.login(); // ADR-0004: Funcionalidades fiscais (SPED) devem usar cy.login()
    cy.visit('/');
    PlanoContasSpedPage.acessarViaMenu();
  });

  it("Deve cadastrar um novo plano de contas com todos os campos obrigatórios", () => {
    const hoje = new Date().toLocaleDateString('pt-BR');
    const dados = {
      dataInclusao: hoje,
      natureza: '01', // 01 - Contas de ativo
      tipo: 'A', // Analítica
      nivel: '1',
      codigo: `TESTE-${Date.now()}`,
      nome: `Conta Teste Automatizado - ${obterDataHoraAtual()}`,
    };

    PlanoContasSpedPage.validarTituloListagem();
    PlanoContasSpedPage.clicarNovoCadastro();
    PlanoContasSpedPage.validarUrlCadastro();

    PlanoContasSpedPage.preencherFormulario(dados);
    PlanoContasSpedPage.clicarSalvar();

    // O clicarSalvar já valida o redirecionamento para a listagem
    PlanoContasSpedPage.validarUrlListagem();
  });

  it("Deve cadastrar um plano de contas com código referenciado opcional", () => {
    const hoje = new Date().toLocaleDateString('pt-BR');
    const dados = {
      dataInclusao: hoje,
      natureza: '02', // 02 - Contas de passivo
      tipo: 'S', // Sintética
      nivel: '2',
      codigo: `TESTE-REF-${Date.now()}`,
      nome: `Conta com Referência Teste - ${obterDataHoraAtual()}`,
      codigoReferenciado: 'REF-001',
    };

    PlanoContasSpedPage.validarTituloListagem();
    PlanoContasSpedPage.clicarNovoCadastro();
    PlanoContasSpedPage.validarUrlCadastro();

    PlanoContasSpedPage.preencherFormulario(dados);
    PlanoContasSpedPage.clicarSalvar();

    // O clicarSalvar já valida o redirecionamento para a listagem
    PlanoContasSpedPage.validarUrlListagem();
  });

  it("Deve cancelar o cadastro clicando em Voltar", () => {
    PlanoContasSpedPage.validarTituloListagem();
    PlanoContasSpedPage.clicarNovoCadastro();
    PlanoContasSpedPage.validarUrlCadastro();

    PlanoContasSpedPage.clicarVoltar();

    PlanoContasSpedPage.validarUrlListagem();
    PlanoContasSpedPage.validarTituloListagem();
  });

  // Função auxiliar para obter data e hora formatadas
  function obterDataHoraAtual() {
    const now = new Date();
    const data = now.toLocaleDateString('pt-BR');
    const hora = now.toLocaleTimeString('pt-BR');
    return `${data} ${hora}`;
  }
});

