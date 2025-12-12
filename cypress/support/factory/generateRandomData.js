const { faker } = require('@faker-js/faker');
const { cpf, cnpj } = require('cpf-cnpj-validator')

const generateValidCPF = () => {
  return cpf.generate()
};

const gerarCNPJValido = () => {
  return cnpj.generate()
}

const generateRandomCustomer = (tipo = 'FISICA') => {
  const base = {
    pessoa: tipo,
    nome: faker.person.fullName(),
    cep: faker.location.zipCode('#####-###'),
    endereco: faker.location.streetAddress(),
    numero: faker.number.int({ min: 1, max: 9999 }),
    complemento: faker.location.secondaryAddress(),
    bairro: faker.location.city(),
    cidade: 'SAO PAULO - SP',
    observacao: faker.lorem.sentence()
  };

  if (tipo === 'JURIDICA') {
    return {
      ...base,
      cnpj: gerarCNPJValido(),
      inscricaoEstadual: faker.number.int({ min: 100000, max: 999999 }).toString(),
      inscricaoMunicipal: faker.number.int({ min: 10000, max: 99999 }).toString(),
      razaoSocial: `${base.nome} LTDA`
    };
  }

  return {
    ...base,
    cpf: generateValidCPF(),
    inscricaoEstadual: faker.number.int({ min: 100000, max: 999999 }).toString(),
    rg: faker.string.numeric(9)
  };
};

const gerarFornecedorAleatorio = () => {
  let nome = faker.person.fullName()
  return {
    CNPJ: gerarCNPJValido(),
    nome: nome,
    razaoSocial: nome
  };
};

const generateRandomProduct = () => {
  return {
    nome: faker.commerce.productName(),
    referencia: faker.string.alphanumeric({ length: 8 }),
    codigo_barras: faker.string.numeric(13),
    preco_compra: faker.commerce.price(),
    margem_lucro: 1000,
    preco_venda: faker.commerce.price(),
    percentual_comissao: 10,
    observacao: faker.lorem.sentence(),
    informacao_adicional: faker.lorem.sentences(2),
    peso: faker.number.float({ min: 0.1, max: 10, precision: 0.001 }),
    altura: faker.number.float({ min: 5, max: 100, precision: 0.1 }),
    largura: faker.number.float({ min: 5, max: 100, precision: 0.1 }),
    comprimento: faker.number.float({ min: 5, max: 100, precision: 0.1 }),
    estoque_inicial: faker.number.int({ min: 1, max: 20 }),
  };
};
// Função para gerar o orçamento aleatório
const generateRandomDadosOrcamento = () => {
  return {
    telefone: 11 * 100000000 + Math.floor(Math.random() * 100000000),  // Telefone aleatório
    email: faker.internet.email(),                // E-mail aleatório
    responsavel: faker.person.fullName(),        // Nome de responsável aleatório
    vendedor: faker.person.fullName(),           // Nome de vendedor aleatório
    observacoes: faker.lorem.sentence(),         // Observações aleatórias
    validade: Math.floor(Math.random() * 60) + 1, // Validade em dias
    dataValidade: faker.date.soon().toLocaleDateString('pt-BR'), // Data de validade aleatória
    cpfCnpj: generateValidCPF(),                 // CPF aleatório
    cep: '58030021',                // CEP softcomshop
    numero: Math.floor(Math.random() * 9999) + 1,  // Número aleatório de casa
    complemento: faker.address.secondaryAddress(),  // Complemento de endereço aleatório
    tipoDebito: ['Crédito', 'Débito'][Math.floor(Math.random() * 2)],
    descricaoServico: faker.lorem.sentence(),    // Descrição do serviço aleatória
    prazoEntrega: Math.floor(Math.random() * 30) + 1 + ' dias',  // Prazo de entrega aleatório
    garantia: faker.date.soon().toLocaleDateString('pt-BR') // Garantia aleatória
  }
};
const generateRandomDadosOrcamentoProduto = () => {
  return {
    produto: 'Produto',
    quantidade: Math.floor(Math.random() * 999) + 1, // Quantidade aleatória
    preco: faker.commerce.price() // Preço aleatório
  }
};

const generateRandomCompany = () => {
  const nome = faker.company.name();
  return {
    cnpj: gerarCNPJValido(),
    nome: nome.substring(0, 50), // Unidade
    fantasia: nome.substring(0, 50),
    razaoSocial: `${nome} LTDA`,
    nomeImpressao: 'FANTASIA',
    inscricaoEstadual: faker.number.int({ min: 100000, max: 999999 }).toString(),
    inscricaoMunicipal: faker.number.int({ min: 10000, max: 99999 }).toString(),
    cep: faker.location.zipCode('#####-###'),
    endereco: faker.location.streetAddress(),
    numero: faker.number.int({ min: 1, max: 9999 }),
    complemento: faker.location.secondaryAddress(),
    bairro: 'CENTRO',
    cidade: 'SAO PAULO - SP',
    ddd: '11',
    telefone: faker.phone.number('####-####'),
    email: faker.internet.email()
  };
};

const generateRandomContact = () => {
  return {
    tipo: 'PRINCIPAL',
    nome: faker.person.fullName(),
    ddd: faker.string.numeric({ length: 2 }),
    telefone: faker.string.numeric({ length: 9 }),
    email: faker.internet.email()
  };
};

const generateRandomFuncionario = () => {
  const nome = faker.person.fullName();
  return {
    // Campos obrigatórios
    nome: nome.substring(0, 100),
    funcao: 'VENDEDOR', // Função padrão (pode ser VENDEDOR, ATENDENTE, ENTREGADOR, etc.)

    // Campos opcionais
    setor: null, // Pode ser preenchido se necessário
    cpf: generateValidCPF(),
    rg: faker.string.numeric(9),
    dataAdmissao: faker.date.past({ years: 2 }).toLocaleDateString('pt-BR'),
    dataDemissao: null, // Geralmente não preenchido no cadastro
    cep: faker.location.zipCode('#####-###'),
    endereco: faker.location.streetAddress(),
    numero: faker.number.int({ min: 1, max: 9999 }),
    complemento: faker.location.secondaryAddress(),
    bairro: 'CENTRO',
    cidade: 'SAO PAULO - SP',
    desconto: faker.number.float({ min: 0, max: 50, precision: 0.01 }).toFixed(2),
    comissao: faker.number.float({ min: 0, max: 100, precision: 0.01 }).toFixed(2),
    supervisor: false,
    numeroCartaoSupervisor: null,
    observacao: faker.lorem.sentence(),
    desativado: false
  };
};

/**
 * Calcula o dígito verificador (cDV) da chave de acesso NFe usando módulo 11
 * @param {string} chaveSemDV - Os 43 primeiros dígitos da chave
 * @returns {string} - Dígito verificador (1 dígito)
 */
const calcularDigitoVerificador = (chaveSemDV) => {
  const pesos = [2, 3, 4, 5, 6, 7, 8, 9];
  let soma = 0;
  let pesoIndex = 0;

  // Percorre a chave da direita para a esquerda
  for (let i = chaveSemDV.length - 1; i >= 0; i--) {
    soma += parseInt(chaveSemDV[i]) * pesos[pesoIndex];
    pesoIndex = (pesoIndex + 1) % pesos.length;
  }

  const resto = soma % 11;
  const digito = resto < 2 ? 0 : 11 - resto;

  return digito.toString();
};

/**
 * Gera uma chave de acesso NFe válida e única (44 dígitos)
 *
 * Estrutura da chave:
 * - cUF (2 dígitos): Código da UF do emitente
 * - AAMM (4 dígitos): Ano e mês de emissão (ex: 2512 = dezembro 2025)
 * - CNPJ (14 dígitos): CNPJ do emitente
 * - mod (2 dígitos): Modelo do documento (55 = NFe)
 * - serie (3 dígitos): Série do documento
 * - nNF (9 dígitos): Número do documento fiscal
 * - tpEmis (1 dígito): Tipo de emissão (1 = normal)
 * - cNF (8 dígitos): Código numérico aleatório
 * - cDV (1 dígito): Dígito verificador (calculado)
 *
 * @param {Object} options - Opções para gerar a chave
 * @param {string} options.cUF - Código da UF (padrão: '35' para SP)
 * @param {string} options.cnpj - CNPJ do emitente (padrão: gera aleatório)
 * @param {string} options.serie - Série do documento (padrão: '001')
 * @param {number} options.numeroNota - Número da nota (padrão: aleatório)
 * @returns {string} - Chave de acesso completa (44 dígitos)
 */
const gerarChaveAcessoNFe = (options = {}) => {
  const {
    cUF = '35', // SP
    cnpj = null,
    serie = '001',
    numeroNota = null
  } = options;

  // Gera ano e mês atual (AAMM)
  const agora = new Date();
  const ano = agora.getFullYear().toString().slice(-2);
  const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
  const aamm = ano + mes;

  // Gera ou usa CNPJ fornecido
  const cnpjEmitente = cnpj || gerarCNPJValido().replace(/[^\d]/g, '');

  // Modelo NFe
  const mod = '55';

  // Série formatada com 3 dígitos
  const serieFormatada = serie.padStart(3, '0');

  // Número da nota (9 dígitos) - gera aleatório se não fornecido
  const nNF = numeroNota
    ? numeroNota.toString().padStart(9, '0')
    : faker.number.int({ min: 1, max: 999999999 }).toString().padStart(9, '0');

  // Tipo de emissão (1 = normal)
  const tpEmis = '1';

  // Código numérico aleatório (8 dígitos)
  const cNF = faker.string.numeric(8);

  // Concatena os 43 primeiros dígitos
  const chaveSemDV = `${cUF}${aamm}${cnpjEmitente}${mod}${serieFormatada}${nNF}${tpEmis}${cNF}`;

  // Calcula o dígito verificador
  const cDV = calcularDigitoVerificador(chaveSemDV);

  // Retorna a chave completa (44 dígitos)
  return chaveSemDV + cDV;
};

module.exports = {
  generateRandomCustomer,
  generateRandomProduct,
  generateRandomDadosOrcamento,
  generateRandomDadosOrcamentoProduto,
  gerarFornecedorAleatorio,
  generateRandomCompany,
  generateRandomContact,
  gerarChaveAcessoNFe,
  generateRandomFuncionario
}

