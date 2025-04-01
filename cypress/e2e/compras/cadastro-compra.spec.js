import { beforeEach } from 'mocha';
import CompraPage from '../../support/pages/Compra/CompraPage'

Cypress.on('uncaught:exception', () => {
    return false
});

describe('Cadastro de compra', { tags: ["@cadastro-compra-xml", "@regressivo"] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        CompraPage.acessarPaginaCompra()
    })

    it('Importando NFe pelo XML', () => {
        cy.get('#table-form-body > tr > :nth-child(1) > .checkbox > input').check();
        cy.get('.ibox-content > #btn-excluir-selecionados > .hidden-xs').click();
        cy.wait(3000)
        cy.get('body').type('{enter}')
        cy.get('.btn-info > .hidden-xs').click();
        cy.get('#option-xml > .block-view-option').click();
        cy.get('#file').invoke('show').click({force: true}).attachFile('nfe_importacao.xml');
        cy.get('#btn-importar').click();
        cy.get('#auto_cfop').clear('1');
        cy.get('#auto_cfop').type('1102');
        cy.get('.typeahead-display').click();
        cy.get('#form-importacao > :nth-child(2) > [style="padding: 0; margin: 0"]').click();
        cy.get('#btn-importar-xml').click();
        cy.wait(5000)
        cy.get('.btn-danger').click()
        cy.wait(3000)
        cy.get('body').type('{enter}')
    })
})
