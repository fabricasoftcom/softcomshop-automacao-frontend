import CompraPage from '../../support/pages/Compra/CompraPage';

describe('Incidentes > Importação NF de compra (múltiplas + XML)', { tags: ['@incidentes', '@compras', '@cadastro-compra-xml', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });

  it('Deve importar duas NFs em sequência e em seguida importar por XML sem erro 500', function () {
    cy.task('listarXMLs', { usarApenasSemFaturas: false }).then(function (xmls) {
      if (!xmls || xmls.length < 2) {
        cy.log('Menos de 2 XMLs em fixtures — teste ignorado');
        this.skip();
      }

      CompraPage.acessarPaginaCompra();
      CompraPage.importarNFePorXML(xmls[0]);
      cy.verificarErro500Visual();

      CompraPage.acessarPaginaCompra();
      CompraPage.importarNFePorXML(xmls[1]);
      cy.verificarErro500Visual();

      CompraPage.acessarPaginaCompra();
      CompraPage.importarNFePorXML(xmls[0]);
      cy.verificarErro500Visual();
    });
  });
});
