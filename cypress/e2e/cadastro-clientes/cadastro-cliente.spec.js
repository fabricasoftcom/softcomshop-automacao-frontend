import { beforeEach } from 'mocha';
import ClientePage from '../../support/pages/Cliente/ClientePage';
import { generateRandomCustomer } from '../../support/factory/generateRandomData';

describe('Cadastro de cliente', { tags: ["@cadastro-cliente", "@regressivo"] }, () => {
    beforeEach(() => {
        cy.login();
    })
    it('Realizar cadastro de cliente', () => {
        ClientePage.visit();
        const cliente = generateRandomCustomer();
        ClientePage.preencherCamposCliente(cliente);
        ClientePage.cadastrar();
        cy.wait(3000)
        ClientePage.confirmarCamposObrigatorios();
        ClientePage.confirmacaoCadastroCliente();
    })
})
