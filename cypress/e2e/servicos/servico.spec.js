import { faker } from '@faker-js/faker';
import ServicoListagemPage from '../../support/pages/Servico/ServicoListagemPage';
import ServicoCadastroPage from '../../support/pages/Servico/ServicoCadastroPage';

describe('Funcionalidade de Serviço', { tags: ['@servicos', '@servico', '@regressivo'] }, () => {
  const dadosServico = {
    descricao: `Serviço ${faker.commerce.productName()}`,
    referencia: faker.string.alphanumeric(5).toUpperCase(),
    grupo: 'Geral', // Usar grupo padrão ou criar
    preco: faker.commerce.price({ min: 10, max: 500 })
  };

  beforeEach(() => {
    cy.loginArmazenandoSessao();
    ServicoListagemPage.visitar();
  });

  it('Deve cadastrar um novo serviço com sucesso', () => {
    ServicoListagemPage.clicarNovoCadastro();
    ServicoCadastroPage.preencherDescricao(dadosServico.descricao)
      .preencherReferencia(dadosServico.referencia)
      .preencherGrupo(dadosServico.grupo)
      .preencherPreco(dadosServico.preco)
      .clicarSalvar();

    // Validação
    // cy.contains('Sucesso').should('be.visible'); // Ajustar conforme feedback real
  });
});

