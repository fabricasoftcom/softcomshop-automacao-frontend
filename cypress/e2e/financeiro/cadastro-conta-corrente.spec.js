import contaCorrenteCadastroPage from "../../support/pages/Financeiro/ContaCorrenteCadastroPage";

describe('Cadastro de Conta Corrente', () => {
  // Lista fixa dos bancos extraídos
  const bancos = [
    { codigo: '001', nome: 'Banco do Brasil' },
    // { codigo: '033', nome: 'Santander' },
    // { codigo: '104', nome: 'Caixa Econômica' },
    // { codigo: '237', nome: 'Bradesco' },
    // { codigo: '341', nome: 'Itaú' },
    // { codigo: '748', nome: 'Sicredi' },
    // { codigo: '756', nome: 'Sicoob' },
  ];

  beforeEach(() => {
    cy.login(); // Realiza o login antes de cada teste
    contaCorrenteCadastroPage.visit(); // Acessa a página de cadastro de conta corrente
  });

  bancos.forEach(({ codigo, nome }) => {
    it(`Deve cadastrar uma conta para o banco: ${nome} (Código: ${codigo})`, () => {
      // Preenche o banco no autocomplete
      contaCorrenteCadastroPage.preencherBancoPorNome(nome);

      // Gera os dados dinâmicos para a conta
      const agenciaAleatoria = gerarNumeroAleatorio(1000, 9999).toString();
      const agenciaDVAleatorio = gerarNumeroAleatorio(0, 9).toString();
      const dataHoraAtual = obterDataHoraAtual();

      const dadosConta = {
        descricao: `${nome} (${codigo}) - ${dataHoraAtual}`,
        agencia: agenciaAleatoria,
        agenciaDV: agenciaDVAleatorio,
        conta: '567890',
        contaDV: '2',
        saldoInicial: '1000,00',
        dataSaldo: '01/01/2024',
        limiteCredito: '5000,00',
        observacao: `
          Banco: ${nome} (Código: ${codigo})
          Agência: ${agenciaAleatoria}
          Agência DV: ${agenciaDVAleatorio}
          Conta: 567890-2
          Saldo Inicial: 1000,00
          Limite de Crédito: 5000,00
          Data do Saldo: 01/01/2024
          Criado em: ${dataHoraAtual}
        `,
      };

      // Preenche o formulário e avança
      preencherFormulario(dadosConta);

      // Verifica mensagem de sucesso
      contaCorrenteCadastroPage.verificarMensagemSucesso();
    });
  });

  function preencherFormulario(dadosConta) {
    // Valida o passo inicial
    contaCorrenteCadastroPage.validarPassoAtual('2. Cadastrar Dados');

    // Preenche o formulário com os dados fornecidos
    contaCorrenteCadastroPage.preencherFormulario(dadosConta);

    // Configurações adicionais
    contaCorrenteCadastroPage.alternarContaPadrao(true);
    contaCorrenteCadastroPage.alternarCobrancaBancaria(true);

    // Avança para o próximo passo
    contaCorrenteCadastroPage.avancarParaProximoPasso();
  }

  const gerarNumeroAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const obterDataHoraAtual = () => {
    const now = new Date();
    const data = now.toLocaleDateString('pt-BR');
    const hora = now.toLocaleTimeString('pt-BR');
    return `${data} ${hora}`;
  };
});
