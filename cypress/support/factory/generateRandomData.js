const { faker } = require('@faker-js/faker');
const { cpf, cnpj } = require('cpf-cnpj-validator')

const generateValidCPF = () => {
  return cpf.generate()
};

const gerarCNPJValido = () => {
  return cnpj.generate()
}

const generateRandomCustomer = () => {
  return {
    pessoa: 'FISICA',
    nome: faker.person.fullName(),
    cpf: generateValidCPF(),
    inscricaoEstadual: faker.number.int({ min: 100000, max: 999999 }).toString(),
    rg: faker.string.numeric(9),
    cep: faker.location.zipCode('#####-###'),
    endereco: faker.location.streetAddress(),
    numero: faker.number.int({ min: 1, max: 9999 }),
    complemento: faker.location.secondaryAddress(),
    observacao: faker.lorem.sentence()
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
      prazoEntrega: Math.floor(Math.random() * 30) + 1+ ' dias',  // Prazo de entrega aleatório
      garantia: faker.date.soon().toLocaleDateString('pt-BR') // Garantia aleatória
  }
};
const generateRandomDadosOrcamentoProduto = () => {
  return {
      produto : 'Produto',
      quantidade: Math.floor(Math.random() * 999) + 1, // Quantidade aleatória
      preco: faker.commerce.price() // Preço aleatório
  }
};

module.exports = { generateRandomCustomer, generateRandomProduct ,generateRandomDadosOrcamento , generateRandomDadosOrcamentoProduto, gerarFornecedorAleatorio}
