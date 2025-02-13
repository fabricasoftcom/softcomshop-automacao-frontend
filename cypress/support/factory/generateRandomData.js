const { faker } = require('@faker-js/faker');
const { cpf } = require('cpf-cnpj-validator')

const generateValidCPF = () => {
  return cpf.generate()
};

const generateRandomCustomer = () => {
  return {
    nome: faker.person.fullName(),
    cpf: generateValidCPF(),
  };
};

const generateRandomProduct = () => {
  return {
    nome: faker.commerce.productName(),
    preco_compra: faker.commerce.price(),
    margem_lucro: 1000,
    preco_venda: faker.commerce.price(),
    percentual_comissao: 10
  }
}
// Função para gerar o orçamento aleatório
const generateRandomDadosOrcamento = () => {
  return {
    dadosOrcamento: {
      telefone: 11 * 100000000 + Math.floor(Math.random() * 100000000),  // Telefone aleatório
      email: faker.internet.email(),                // E-mail aleatório
      responsavel: faker.person.fullName(),        // Nome de responsável aleatório
      vendedor: faker.person.fullName(),           // Nome de vendedor aleatório
      observacoes: faker.lorem.sentence(),         // Observações aleatórias
      validade: Math.floor(Math.random() * 60) + 1, // Validade em dias
      dataValidade: faker.date.soon().toLocaleDateString('pt-BR'), // Data de validade aleatória
      cpfCnpj: generateValidCPF(),                 // CPF aleatório
      cep: faker.address.zipCode(),                // CEP aleatório
      numero: Math.floor(Math.random() * 9999) + 1,  // Número aleatório de casa
      complemento: faker.address.secondaryAddress(),  // Complemento de endereço aleatório
      tipoDebito: ['Crédito', 'Débito'][Math.floor(Math.random() * 2)],
      descricaoServico: faker.lorem.sentence(),    // Descrição do serviço aleatória
      prazoEntrega: Math.floor(Math.random() * 30) + 1+ ' dias',  // Prazo de entrega aleatório
      garantia: faker.date.soon().toLocaleDateString('pt-BR') // Garantia aleatória
    }
  }
};
const generateRandomDadosOrcamentoProduto = () => {
  return {
    dadosProduto: {
      produto : 'Produto',
      quantidade: Math.floor(Math.random() * 999) + 1, // Quantidade aleatória
      preco: faker.commerce.price() // Preço aleatório
    }
  }
};

module.exports = { generateRandomCustomer, generateRandomProduct ,generateRandomDadosOrcamento , generateRandomDadosOrcamentoProduto}
