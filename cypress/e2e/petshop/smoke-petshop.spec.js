import LoginPage from '../../support/pages/Login/LoginPage';

describe('Smoke Test - Petshop', { tags: '@petshop' }, () => {

    it('Deve carregar a página de login do Petshop corretamente', () => {
        // Acessa a URL configurada no cypress.config.petshop.js
        cy.visit('/auth/login');

        // Validação visual e de elementos
        cy.get('body').should('be.visible');
        cy.contains('Olá, seja bem vindo!').should('be.visible');

        // Valida se os campos de login estão presentes (usando o Locator atualizado)
        // Nota: Não fazemos login real pois não temos credenciais neste smoke
        LoginPage.preencherCredenciais('teste@petshop.com', '123456');
    });

});
