import { faker } from '@faker-js/faker';
import VinculoFiscalServicoListagemPage from '../../support/pages/Servico/VinculoFiscalServicoListagemPage';
import VinculoFiscalServicoCadastroPage from '../../support/pages/Servico/VinculoFiscalServicoCadastroPage';

describe('Vínculos Fiscais de Serviço', { tags: ['@servicos', '@fiscal', '@regressivo'] }, () => {
  const dadosVinculo = {
    descricao: `Vínculo ${faker.commerce.department()} ${faker.string.numeric(3)}`
  };

  beforeEach(() => {
    cy.login(); // Login fiscal
    VinculoFiscalServicoListagemPage.visitar();
  });

  it('Deve cadastrar um novo vínculo fiscal de serviço', () => {
    VinculoFiscalServicoListagemPage.clicarNovoCadastro();
    VinculoFiscalServicoCadastroPage.preencherDescricao(dadosVinculo.descricao)
      .clicarSalvar();

    // Validação
    // cy.contains('Sucesso').should('be.visible');
  });
});

