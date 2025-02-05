import contaCorrenteCadastroPage from "../../support/pages/Financeiro/ContaCorrenteCadastroPage";

describe('Cadastro de Conta Corrente', { tags: ['@cadastro-conta-corrente', '@financeiro', '@regressivo'] }, () => {
  const bancos = [
    { codigo: '001', nome: 'Banco do Brasil' },
    { codigo: '104', nome: 'Caixa Econômica' },
  ];

  beforeEach(() => {
    cy.loginFinanceiro();
    contaCorrenteCadastroPage.visit();
  });

  bancos.forEach(({ codigo, nome }) => {
    it(`Deve cadastrar uma conta para o banco: ${nome} (Código: ${codigo}) com cobrança bancária`, () => {
      // Preenche os dados da conta corrente
      contaCorrenteCadastroPage.preencherBancoPorNome(nome);

      const dadosConta = gerarDadosConta(nome, codigo);

      contaCorrenteCadastroPage.validarPassoAtual('2. Cadastrar Dados');
      contaCorrenteCadastroPage.preencherFormulario(dadosConta);

      // Ativa o switch de cobrança bancária
      contaCorrenteCadastroPage.alternarCobrancaBancaria(true);

      // Espera o tempo necessário para garantir que o alerta não apareça
      cy.wait(32334);

      // Verifica que o popup com a mensagem "Não é possível realizar as configurações bancárias" não aparece
      cy.get('div.swal2-popup').should('not.exist'); // Verifica que o modal swal2 não existe

      contaCorrenteCadastroPage.avancarParaProximoPasso();
      // Preenche todos os campos de integração bancária com dados aleatórios ou específicos
      const tipoIntegracao = (codigo === '001' || codigo === '341') ? 'api' : 'arquivo';
      const dadosIntegracao = {
        convênio: '12345',
        ultimoNossoNumero: '1234',
        ultimoNumeroRemessa: '5678',
        // modalidadeCarteira: 'Cobrança Simples',  // Modalidade padrão
        variacaoCarteira: gerarNumeroAleatorio(1, 99).toString(),
        posto: '04',
        codigoTransmissao: gerarNumeroAleatorio(1, 10).toFixed(2),
        // modalidadeJuros: '1', // Valor dia atraso
        valorJuros: gerarNumeroAleatorio(1, 10).toFixed(2),
        // modalidadeMulta: '1', // Valor dia atraso
        valorMulta: gerarNumeroAleatorio(1, 10).toFixed(2),
        // modalidadeProtesto: '1', // Protestar dias corridos
        diasProtesto: gerarNumeroAleatorio(1, 30).toString(),
        // modalidadeBaixa: '1', // Baixar / Devolver
        diasBaixa: gerarNumeroAleatorio(1, 30).toString(),
        // modalidadeDesconto: '1', // Valor fixo até a data informada
        valorDesconto: gerarNumeroAleatorio(1, 10).toFixed(2),
        // modalidadeEspecie: '02',
        // codigoAceite: 'A', // Aceite
        tipoIntegracao: tipoIntegracao, // Tipo da integração
        tipoLayout: 'A4', // Layout padrão
        mensagem1: `Informações de juros: Taxa de ${gerarNumeroAleatorio(1, 10).toFixed(2)}% ao dia.`,
        mensagem2: `Informações de multa: Taxa de ${gerarNumeroAleatorio(1, 10).toFixed(2)}% e Client ID: ${gerarChave16Bits()} e Client Secret: ${gerarChave16Bits()}`,
        clientId: gerarChave16Bits(),
        clientSecret: gerarChave16Bits(),
        tipoChavePix: 'CNPJ', // Tipo de chave Pix
        chavePix: gerarChavePix() // Gerar chave Pix aleatória
      };

      // Preenche os campos de integração bancária com os dados fornecidos
      contaCorrenteCadastroPage.preencherIntegracaoBancaria(dadosIntegracao);

      // Clica em "Próximo" para avançar para a próxima etapa
      contaCorrenteCadastroPage.avancarParaProximoPasso();

      // Verifica a mensagem de sucesso após o cadastro da conta
      contaCorrenteCadastroPage.verificarMensagemSucesso();
    });
  });

  // Funções auxiliares para gerar dados aleatórios
  function gerarChave16Bits() {
    // Gera uma chave aleatória de 16 bits (string de 16 caracteres alfanuméricos)
    return Math.random().toString(36).substring(2, 18).toUpperCase();
  }

  function gerarChavePix() {
    // Gera uma chave Pix aleatória (exemplo: CNPJ, CPF, email)
    const tiposChave = ['CNPJ', 'CPF', 'CELULAR', 'EMAIL'];
    const tipoChave = tiposChave[gerarNumeroAleatorio(0, tiposChave.length - 1)];

    switch (tipoChave) {
      case 'CNPJ':
        return `${gerarNumeroAleatorio(10000000000000, 99999999999999)}`; // CNPJ aleatório
      case 'CPF':
        return `${gerarNumeroAleatorio(10000000000, 99999999999)}`; // CPF aleatório
      case 'CELULAR':
        return `+55${gerarNumeroAleatorio(1000000000, 9999999999)}`; // Celular aleatório
      case 'EMAIL':
        return `exemplo${gerarNumeroAleatorio(1000, 9999)}@dominio.com`; // Email aleatório
      default:
        return '';
    }
  }

  // Funções do .spec
  function gerarDadosConta(nome, codigo) {
    const agenciaAleatoria = gerarNumeroAleatorio(1000, 9999).toString();
    const agenciaDVAleatorio = gerarNumeroAleatorio(0, 9).toString();
    const contaAleatoria = gerarNumeroAleatorio(1000, 99999).toString();
    const contaDVAleatorio = gerarNumeroAleatorio(0, 9).toString();
    const dataHoraAtual = obterDataHoraAtual();

    return {
      descricao: `Banco:${nome} (${codigo}) - ${dataHoraAtual}`,
      agencia: agenciaAleatoria,
      agenciaDV: agenciaDVAleatorio,
      conta: contaAleatoria,
      contaDV: contaDVAleatorio,
      saldoInicial: '1000,00',
      dataSaldo: '01/01/2024',
      limiteCredito: '5000,00',
      observacao: `
        Banco: ${nome} (Código: ${codigo})
        Agência: ${agenciaAleatoria}
        Agência DV: ${agenciaDVAleatorio}
        Conta: ${contaAleatoria}-${contaDVAleatorio}
        Saldo Inicial: 1000,00
        Limite de Crédito: 5000,00
        Data do Saldo: 01/01/2024
        Criado em: ${dataHoraAtual}
      `,
    };
  }

  function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function obterDataHoraAtual() {
    const now = new Date();
    const data = now.toLocaleDateString('pt-BR');
    const hora = now.toLocaleTimeString('pt-BR');
    return `${data} ${hora}`;
  }
});
