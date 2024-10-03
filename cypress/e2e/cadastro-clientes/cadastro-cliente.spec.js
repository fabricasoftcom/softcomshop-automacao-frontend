import { beforeEach } from 'mocha';
import ClientePage from '../../support/pages/Cliente/ClientePage';
import { generateRandomCustomer } from '../../support/factory/generateRandomData';
import 'allure-cypress';

describe('Cadastro de cliente', () => {
    beforeEach(() => {
        cy.login();
    })
    it('Realizar cadastro de cliente', () => {
        ClientePage.visit();
        const cliente = generateRandomCustomer();
        ClientePage.preencherCamposCliente(cliente);
        ClientePage.cadastrar();
        ClientePage.confirmacaoCadastroCliente();
    })
})
