import { beforeEach } from 'mocha';
import CompraPage from '../../support/pages/Compra/CompraPage'

describe('Cadastro de compra', { tags: ["@cadastro-compra-xml", "@regressivo"] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
    })
    it('Cadastro de Compra importando XML', () => {
        CompraPage.acessarPaginaCompra();
        CompraPage.importarNfe();
        CompraPage.clicarImportacaoXML();
        CompraPage.clicarAnexarNFe();
        CompraPage.clicarImportar();
        CompraPage.informarCFOP();
        CompraPage.informarVinculoFiscal();
        CompraPage.importarNFe();
    });
})
