import { beforeEach } from 'mocha';
import CompraPage from '../../support/pages/Compra/CompraPage'

Cypress.on('uncaught:exception', () => {
    return false
});

describe('Cadastro de compra', { tags: ["@cadastro-compra-xml", "@regressivo", "@compras"] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit('/');
        CompraPage.acessarPaginaCompra();
    })

    it('Importando NFe pelo XML', () => {
        CompraPage.importarNFePorXML();
    })

    it('Importando NFe pelo XML e excluindo', () => {
        // Usa apenas XMLs sem faturas, pois só é possível excluir NFe sem a tag <dup>
        CompraPage.importarNFePorXML(null, true);
        CompraPage.excluirNFeImportada();
    })
})
