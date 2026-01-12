import DevolucaoConsignacaoPage from "../../support/pages/Consignacao/DevolucaoConsignacaoPage";
import DevolucaoConsignacaoLocators from "../../support/locators/Consignacao/DevolucaoConsignacaoLocators";
import { faker } from '@faker-js/faker';

describe('Cadastro de Devolução/Venda de Consignação', { tags: ['@consignacao', '@devolucao', '@cadastro', '@regressivo'] }, () => {
  const clienteNome = '1'; // Cliente existente para teste
  const observacoes = faker.lorem.sentence();
  const produtoNome = 'PRODUTO'; // Nome parcial para autocomplete
  const quantidadeDevolucao = faker.number.int({ min: 1, max: 11 });
  const quantidadeVenda = faker.number.int({ min: 1, max: 10 });

  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    DevolucaoConsignacaoPage.visit();
    DevolucaoConsignacaoPage.clicarNovoCadastro();
  });

  it('Deve abrir a tela de cadastro de devolução/venda', () => {
    // O método clicarNovoCadastro já valida a URL, mas vamos garantir
    cy.url().should('include', '/consignacao/devolucao/novo');
    cy.get(DevolucaoConsignacaoLocators.loading).should('not.exist');
    // Valida que os campos principais estão visíveis
    cy.get(DevolucaoConsignacaoLocators.campoClienteCadastro, { timeout: 10000 }).should('be.visible');
    cy.get(DevolucaoConsignacaoLocators.campoVendedor, { timeout: 10000 }).should('be.visible');
  });

  it('Deve realizar o cadastro de uma devolução/venda com sucesso', () => {
    DevolucaoConsignacaoPage.preencherCliente(clienteNome);
    DevolucaoConsignacaoPage.preencherObservacoes(observacoes);
    DevolucaoConsignacaoPage.salvarFormulario();
    DevolucaoConsignacaoPage.validarSucesso();
    cy.url().should('include', '/consignacao/devolucao/'); // Deve ir para tela de edição
  });

  it('Deve adicionar um produto à devolução/venda após o cadastro', () => {
    // Primeiro, cadastra a devolução/venda
    DevolucaoConsignacaoPage.preencherCliente(clienteNome);
    DevolucaoConsignacaoPage.preencherObservacoes(observacoes);
    DevolucaoConsignacaoPage.salvarFormulario();
    DevolucaoConsignacaoPage.validarSucesso();
    cy.url().should('include', '/consignacao/devolucao/');

    // Agora, adiciona o produto
    DevolucaoConsignacaoPage.adicionarItem({
      produto: produtoNome,
      devolucao: quantidadeDevolucao,
      venda: quantidadeVenda
    });
    // Validar que o produto foi adicionado à tabela
    DevolucaoConsignacaoPage.validarItemNaTabela();
  });
});

