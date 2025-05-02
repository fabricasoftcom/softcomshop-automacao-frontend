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
import 'cypress-file-upload';

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
})

Cypress.Commands.add('loginRestoreSession', () => {
    cy.session('user_session', () => {
        cy.fixture('users').then((user) => {
            LoginPage.visit();
            LoginPage.preencherCredenciais(user.valid.username, user.valid.password);
            LoginPage.clicarLogin();
            // Selecionar a empresa, necessario pois o ambiente ainda esta sendo compartilhado
            cy.get('.cont-grid-empresa > :contains("demais testes")').click();
            cy.contains('Início').should('be.visible')
        });
    })

    cy.get('body').then(($body) => {
        if ($body.find('.sweet-alert').length) {
            cy.get('button[class="confirm"]').contains('OK').click();
        }
    });
});

Cypress.Commands.add('loginArmazenandoSessao', () => {
  cy.session('user_session', () => {
    cy.fixture('users').then((user) => {
        LoginPage.visit();
        LoginPage.preencherCredenciais(user.valid.username, user.valid.password);
        LoginPage.clicarLogin();
        // Selecionar a empresa, necessario pois o ambiente ainda esta sendo compartilhado
        cy.get('.cont-grid-empresa > :contains("demais testes")').click();
        cy.contains('Início').should('be.visible')
    });
  });
});
// verificar erro 500 em tela manualmente para testes que usam laço como wrap
Cypress.Commands.add('verificarErro500Visual', () => {
  cy.get('body').then(($body) => {
    const errorImage = $body.find('img.error-image');
    const errorText = $body.find('.error-message h1').text();

    if (
      errorImage.length > 0 &&
      errorText.includes('Oops! Parece que algo deu errado')
    ) {
      throw new Error('Erro 500 detectado na interface: página de erro personalizada carregada.');
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

    cy.loginArmazenandoSessao();
    cy.visit('/')

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
      cy.get('#modulo-38').then(($checkbox) => {
        if (!$checkbox.is(':checked')) {
          cy.get('#modulo-38').check();
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
      cy.get('#cabecalho-menu:contains("Sair")').click();

  })
