import { faker } from '@faker-js/faker';
import CadastroModelosListagemPage from '../../support/pages/Contrato/CadastroModelosListagemPage';
import CadastroModelosCadastroPage from '../../support/pages/Contrato/CadastroModelosCadastroPage';

describe('Cadastro de Modelos de Contrato', { tags: ['@contratos', '@regressivo'] }, () => {
  const dadosModelo = {
    titulo: `Modelo Contrato ${faker.company.name()}`
  };

  beforeEach(() => {
    cy.loginArmazenandoSessao();
    CadastroModelosListagemPage.visitar();
  });

  it('Deve criar um novo modelo de contrato', () => {
    CadastroModelosListagemPage.clicarNovoCadastro();
    CadastroModelosCadastroPage.preencherTitulo(dadosModelo.titulo)
      .clicarSalvar();

    // Validação
    // cy.contains('Sucesso').should('be.visible');
  });
});

