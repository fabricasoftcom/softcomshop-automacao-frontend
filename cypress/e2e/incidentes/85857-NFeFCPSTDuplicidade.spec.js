import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeNormalPage from '../../support/pages/Venda/NFe/Normal';

describe(
  'Incidentes > NFe > FCPST duplicidade no XML (85857)',
  { tags: ['@incidentes', '@nfe', '@vendas', '@regressivo'] },
  () => {
    it(
      'Deve emitir NFe sem rejeição por FCPST, exibir FCP no resumo e gerar XML com campos FCP preenchidos',
      { defaultCommandTimeout: 120000 },
      () => {
        cy.login();
        cy.visit('/');
        CadastroNfePage.desabilitarTourFinalidadeNormal();
        ListagemNfePage.visitar();
        ListagemNfePage.clicarNovoCadastro();

        cy.fixture('incidents/85857-nfe-fcpst').then((d) => {
          CadastroNfeNormalPage.avancarParaCadastroNormalAvulsa();
          CadastroNfeNormalPage.preencherNatureza(d.naturezaCodigo);
          CadastroNfeNormalPage.preencherDestinatario(d.destinatarioBusca);
          CadastroNfeNormalPage.adicionarItem(d.produtoBusca, d.quantidadeItem, d.precoItem);
          CadastroNfeNormalPage.validarTelaPagamentos();
          CadastroNfeNormalPage.adicionarPagamentoBasico();
          CadastroNfeNormalPage.clicarBotaoContinuarRodape();
          CadastroNfeNormalPage.validarTelaEmitirNota();
          CadastroNfeNormalPage.validarResumoEmissaoExibeFcpSt();
          CadastroNfeNormalPage.emitirNota();
          CadastroNfeNormalPage.validarModalSucessoEmissao('listagem');
          ListagemNfePage.validarCarregamento();
          ListagemNfePage.abrirEdicaoPrimeiraLinha();
          CadastroNfeNormalPage.aguardarTelaEdicaoNfeCarregada();
          CadastroNfeNormalPage.validarXmlAutorizadaPorMaisAcoesContemCamposFcp();
        });
      },
    );
  },
);
