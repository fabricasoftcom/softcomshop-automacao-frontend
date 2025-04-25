import PainelAtendimentoPage from "../../support/pages/painel-atendimento/PainelAtendimentoPage";

describe('Painel de Atendimentos - Petshop', () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    PainelAtendimentoPage.acessarPagina();
  });

  it('Deve filtrar atendimentos por data e status', () => {
    const data = '25/04/2025 - 25/04/2025';
    const status = 'AGENDADO';
    const nomeAnimal = 'Rex';

    PainelAtendimentoPage.preencherDataAtendimento(data);
    PainelAtendimentoPage.selecionarStatus(status);
    PainelAtendimentoPage.clicarBotaoPesquisar();
    PainelAtendimentoPage.validarCardKanban(status, nomeAnimal);
  });

  it('Deve abrir detalhes do atendimento pelo nome do animal', () => {
    const nomeAnimal = 'Rex';
    PainelAtendimentoPage.abrirCardKanbanPeloNome(nomeAnimal);
  });
});
