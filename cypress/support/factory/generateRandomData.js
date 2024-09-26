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

module.exports = { generateRandomCustomer, generateRandomProduct }
