import RequisicaoConsignacaoPage from "../../support/pages/Consignacao/RequisicaoConsignacaoPage";
import RequisicaoConsignacaoLocators from "../../support/locators/Consignacao/RequisicaoConsignacaoLocators";
import { faker } from '@faker-js/faker';

describe('Cadastro de Requisição de Consignação', { tags: ['@consignacao', '@requisicao', '@cadastro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RequisicaoConsignacaoPage.visit();
    RequisicaoConsignacaoPage.clicarNovoCadastro();
  });

  it('Deve abrir a tela de cadastro de requisição', () => {
    // O método clicarNovoCadastro já valida a URL, mas vamos garantir
    cy.url().should('include', '/consignacao/requisicao/novo');
    cy.get(RequisicaoConsignacaoLocators.loading).should('not.exist');
    // Valida que os campos principais estão visíveis
    cy.get(RequisicaoConsignacaoLocators.campoClienteCadastro, { timeout: 10000 }).should('be.visible');
    cy.get(RequisicaoConsignacaoLocators.campoVendedor).should('be.visible');
  });

  it('Deve preencher e salvar um novo cadastro de requisição com sucesso', () => {
    const observacoes = faker.lorem.sentence();

    // Preencher formulário
    RequisicaoConsignacaoPage.preencherCliente('1');
    RequisicaoConsignacaoPage.preencherObservacoes(observacoes);

    // Salvar formulário
    RequisicaoConsignacaoPage.salvarFormulario();

    // Validar sucesso e redirecionamento para tela de edição
    RequisicaoConsignacaoPage.validarSucesso();
    cy.url().should('include', '/consignacao/requisicao/');
    cy.url().should('include', '/editar');
  });

  it('Deve adicionar um produto à requisição após salvar', () => {
    const observacoes = faker.lorem.sentence();
    const quantidade = faker.number.int({ min: 1, max: 10 }).toString();
    const preco = faker.number.float({ min: 10, max: 100, precision: 0.01 }).toFixed(2).replace('.', ',');

    // Preencher e salvar formulário
    RequisicaoConsignacaoPage.preencherCliente('1');
    RequisicaoConsignacaoPage.preencherObservacoes(observacoes);
    RequisicaoConsignacaoPage.salvarFormulario();
    RequisicaoConsignacaoPage.validarSucesso();

    // Aguardar tela de edição carregar
    cy.url().should('include', '/editar');
    cy.get(RequisicaoConsignacaoLocators.loading).should('not.exist');

    // Adicionar produto
    const dadosItem = {
      produto: 'PRODUTO',
      quantidade: quantidade,
      preco: preco
    };

    RequisicaoConsignacaoPage.adicionarItem(dadosItem);

    // Validar que o produto foi adicionado à tabela
    // Validar que há pelo menos um item na tabela (o nome exato pode variar)
    RequisicaoConsignacaoPage.validarItemNaTabela();
  });
});

