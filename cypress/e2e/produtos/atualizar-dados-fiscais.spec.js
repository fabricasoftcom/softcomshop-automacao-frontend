import AtualizarDadosFiscaisPage from '../../support/pages/Produtos/AtualizarDadosFiscaisPage';
import AtualizarDadosFiscaisLocators from '../../support/locators/Produtos/AtualizarDadosFiscaisLocators';
import { faker } from '@faker-js/faker';

describe('Atualizar Dados Fiscais', { tags: ['@produtos', '@fiscal', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.login(); // Login fiscal
    AtualizarDadosFiscaisPage.visitar();
  });

  it('Cenário 1: Deve filtrar, editar e atualizar dados na aba Vínculos Fiscais', () => {
    const novaAliquotaIcms = faker.number.float({ min: 1, max: 18, precision: 0.01 }).toFixed(2).replace('.', ',');

    // 1. Filtrar resultados
    AtualizarDadosFiscaisPage.preencherFiltrosVinculos({
      origem: 'PB',
      documentos: 'NFe'
    })
    .aplicarFiltros()
    .validarResultadosEncontrados();

    // 2. Clicar em editar na primeira linha
    AtualizarDadosFiscaisPage.clicarEditarLinha(0);

    // 3. Alterar alíquota ICMS (usando force: true porque o campo pode estar em área com scroll)
    AtualizarDadosFiscaisPage.editarCamposLinhaVinculos({
      aliquotaIcms: novaAliquotaIcms
    }, 0);

    // 4. Validar que o valor foi preenchido antes de salvar
    cy.get(AtualizarDadosFiscaisLocators.tabela.linhas)
      .first()
      .find(AtualizarDadosFiscaisLocators.camposEditaveisLinha.vinculos.aliquotaIcms)
      .scrollIntoView()
      .should('have.value', novaAliquotaIcms);

    // 5. Salvar
    AtualizarDadosFiscaisPage.salvarLinhaEditada(0);

    // 6. Validar que a linha não está mais em modo edição
    AtualizarDadosFiscaisPage.validarLinhaNaoEstaEditando(0);

    // 7. Validar que o valor foi alterado na tabela (buscar pela célula que contém o valor)
    cy.get(AtualizarDadosFiscaisLocators.tabela.linhas)
      .first()
      .should('contain', novaAliquotaIcms);
  });

  it('Cenário 2: Deve filtrar, editar e atualizar dados na aba Produto', () => {
    // 1. Selecionar aba Produto e filtrar
    AtualizarDadosFiscaisPage.selecionarTipo('produto')
      .preencherFiltrosProduto({
        tipoItem: 'MERCADORIA PARA REVENDA'
      })
      .aplicarFiltros()
      .validarResultadosEncontrados();

    // 2. Capturar valor original (exemplo: NCM) antes de editar
    cy.get(AtualizarDadosFiscaisLocators.tabela.linhas).first().then(() => {
      // TODO: Implementar após explorar campos editáveis da aba Produto
      // Por enquanto, apenas valida que há resultados
      cy.log('Aguardando implementação dos campos editáveis da aba Produto');
    });

    // TODO: Implementar edição e validação após explorar campos da aba Produto
  });

  it('Cenário 3: Deve filtrar, editar e atualizar dados na aba Serviço', () => {
    // 1. Selecionar aba Serviço e filtrar
    AtualizarDadosFiscaisPage.selecionarTipo('servico')
      .preencherFiltrosServico({
        descricao: 'Serviço'
      })
      .aplicarFiltros()
      .validarResultadosEncontrados();

    // 2. Capturar valor original antes de editar
    cy.get(AtualizarDadosFiscaisLocators.tabela.linhas).first().then(() => {
      // TODO: Implementar após explorar campos editáveis da aba Serviço
      // Por enquanto, apenas valida que há resultados
      cy.log('Aguardando implementação dos campos editáveis da aba Serviço');
    });

    // TODO: Implementar edição e validação após explorar campos da aba Serviço
  });
});
