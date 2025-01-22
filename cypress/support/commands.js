// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import LoginPage from "./pages/Login/LoginPage"

Cypress.Commands.add('login', () => {
    cy.fixture('users').then((user) => {
        LoginPage.visit();
        LoginPage.preencherCredenciais(user.valid.username, user.valid.password);
        LoginPage.clicarLogin();
        cy.contains('Início').should('be.visible')
    });

    cy.get('body').then(($body) => {
        if ($body.find('.sweet-alert').length) {
            cy.get('button[class="confirm"]').contains('OK').click();
        }
    });
});

Cypress.Commands.add('loginRestoreSession', () => {
    cy.session('user_session', () => {
        cy.fixture('users').then((user) => {
            LoginPage.visit();
            LoginPage.preencherCredenciais(user.valid.username, user.valid.password);
            LoginPage.clicarLogin();
            cy.contains('Início').should('be.visible')
        });
    })

    cy.get('body').then(($body) => {
        if ($body.find('.sweet-alert').length) {
            cy.get('button[class="confirm"]').contains('OK').click();
        }
    });
});

// temp, navegação do menu lateral:
// Clica em uma opção do menu lateral
Cypress.Commands.add('clicarMenu', function(opcaoClick){
    cy.get('span').contains(opcaoClick).click({ force: true });
})
// Acessar uma opção subnivel do menu lateral
Cypress.Commands.add('expandirClicarMenuUmNivel', function(menu, opcaoClick){
    cy.get('a[href="#"]').find('span').contains(menu).click({ force: true });
    cy.get(opcaoClick).click({ force: true });
})
// Acessar uma opção no segundo subnivel do menu lateral
Cypress.Commands.add('expandirClicarMenuDoisNiveis', function(menu,submenu1,opcaoClick){
    cy.get('a[href="#"]').find('span').contains(menu).click({ force: true });
    cy.get(submenu1).click({ force: true });
    cy.get(opcaoClick).click({ force: true });
})
Cypress.Commands.add('salvarRegistroCadsatro', function(){
    // clica no botão de Salvar no rodapé da tela
    cy.get('button[id="btn-salvar"]').click();
    // valida a mensagem de confirmação de cadastro
    cy.get('#toast-container').contains('Sucesso');

})
Cypress.Commands.add('setupSistemaPadrao', function() {

    cy.visit('/')
    cy.get('#login-email').type('fabrica@softcomtecnologia.com.br');
    cy.get('input[name="password"]').type('fab1478');
    cy.get('form button[id="login-acessar"]').click();

    cy.get('body').then(($body) => {
        if ($body.find('.sweet-alert').length) {
          cy.get('button[class="confirm"]').contains('OK').click();
        }
    })
    cy.expandirClicarMenuUmNivel('Configurações', '#módulos');
    cy.get('#select_segmento_assistencia').find('option[value="PADRAO"]').then(($option) => {
        // Verifica se a opção está selecionada
        if (!$option.is(':selected')) {
          // Se não estiver selecionada, seleciona a opção
          cy.get('#select_segmento_assistencia').select('PADRÃO');
        }
    });
    // venda
    cy.get('#modulo-14').then(($checkbox) => {
        if (!$checkbox.is(':checked')) {
          cy.get('#modulo-14').check();
        }
      });
    // NFe
    cy.get('#modulo-6').then(($checkbox) => {
        if (!$checkbox.is(':checked')) {
          cy.get('#modulo-6').check();
        }
      });
    // SPED
    cy.get('#modulo-15').then(($checkbox) => {
        if (!$checkbox.is(':checked')) {
          cy.get('#modulo-15').check();
        }
      });
    // MDfe
    cy.get('#modulo-16').then(($checkbox) => {
        if ($checkbox.is(':checked')) {
          cy.get('#modulo-16').uncheck();
        }
      });
    // compra
    cy.get('#modulo-18').then(($checkbox) => {
        if (!$checkbox.is(':checked')) {
          cy.get('#modulo-18').check();
        }
      });
    // nuvem fiscal
    cy.get('#modulo-19').then(($checkbox) => {
        if (!$checkbox.is(':checked')) {
          cy.get('#modulo-19').check();
        }
      });
    // movimentacao
    cy.get('#modulo-20').then(($checkbox) => {
        if (!$checkbox.is(':checked')) {
          cy.get('#modulo-20').check();
        }
      });
    // orçamento
    cy.get('#modulo-23').then(($checkbox) => {
        if (!$checkbox.is(':checked')) {
          cy.get('#modulo-23').check();
        }
      });
      // sintegra
          cy.get('#modulo-24').then(($checkbox) => {
        if (!$checkbox.is(':checked')) {
          cy.get('#modulo-24').check();
        }
      });
      // consignacao
      cy.get('#modulo-25').then(($checkbox) => {
        if ($checkbox.is(':checked')) {
          cy.get('#modulo-25').uncheck();
        }
      });
      // integracao marketplace
      cy.get('#modulo-35').then(($checkbox) => {
        if ($checkbox.is(':checked')) {
          cy.get('#modulo-35').uncheck();
        }
      });
      // cobrança
      cy.get('#modulo-36').then(($checkbox) => {
        if ($checkbox.is(':checked')) {
          cy.get('#modulo-36').check();
        }
      });
      // nfse
      cy.get('#modulo-37').then(($checkbox) => {
        if (!$checkbox.is(':checked')) {
          cy.get('#modulo-37').check();
        }
      });
      // notificacao
      // mudar o get para 'input[type="checkbox"][data-modulo="NotificacaoLaravel"]'
      cy.get('#modulo-41').then(($checkbox) => {
        if (!$checkbox.is(':checked')) {
          cy.get('#modulo-41').check();
        }
      });
      // tanomenu
      cy.get('#modulo-42').then(($checkbox) => {
        if ($checkbox.is(':checked')) {
          cy.get('#modulo-42').uncheck();
        }
      });
      // formacao de preco
      cy.get('#check_formacao_preco').then(($checkbox) => {
        if ($checkbox.is(':checked')) {
          cy.get('#check_formacao_preco').uncheck();
        }
      });

      cy.get('#btn-salvar-modulo').click();

      cy.get('span[class="text-muted text-xs block"]').click();
      cy.get('.dropdown > .dropdown-menu > :nth-child(1) > a').click();

  })
