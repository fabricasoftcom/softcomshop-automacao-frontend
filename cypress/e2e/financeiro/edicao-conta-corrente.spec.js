import ListagemContasPage from "../../support/pages/Financeiro/ListagemContasPage";
import ContaCorrenteEdicaoPage from "../../support/pages/Financeiro/ContaCorrenteEdicaoPage";

describe('Testes de Edição de Conta Corrente', { tags: ['@edicao-conta-corrente', '@financeiro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessaoCobranca();
    cy.visit("/");
    ListagemContasPage.visit();
  });

  it('Deve acessar uma conta ativa com nome "Banco" e validar os campos preenchidos', () => {
    // Verifica se há contas bancárias ativas disponíveis
    ListagemContasPage.verificarSeHaContasBancariasAtivas().then((temContas) => {
      if (!temContas) {
        cy.log('Não há contas bancárias ativas disponíveis - teste será pulado');
        this.skip();
      }
    });

    // Seleciona a primeira conta ativa com "Banco" no nome
    ListagemContasPage.selecionarPrimeiraContaBancoAtiva();
    cy.get('#loading').should('not.exist');
    // Valida os campos na tela de edição
    ContaCorrenteEdicaoPage.validarCamposPreenchidos();
  });

  it('Deve desativar uma conta ativa', () => {
    // Verifica se há contas bancárias ativas disponíveis
    ListagemContasPage.verificarSeHaContasBancariasAtivas().then((temContas) => {
      if (!temContas) {
        cy.log('Não há contas bancárias ativas disponíveis - teste será pulado');
        this.skip();
      }
    });

    // Seleciona a primeira conta ativa com "Banco" no nome
    ListagemContasPage.selecionarPrimeiraContaBancoAtiva();
    cy.get('#loading').should('not.exist');
    // EXCEÇÃO JUSTIFICADA: Wait fixo necessário - a página de edição precisa de tempo adicional
    // para carregar completamente o switch de ativação/desativação após o loading desaparecer
    // Tentativas de validação condicional falharam (elemento não encontrado mesmo com timeout de 15s)
    cy.wait(5000);
    // Desativa a conta
    ContaCorrenteEdicaoPage.desativarConta();
    ContaCorrenteEdicaoPage.salvar();
    ContaCorrenteEdicaoPage.validarSucesso();

    // Verifica que o switch mudou para a aparência de "desativado"
    ContaCorrenteEdicaoPage.encontrarSwitchery().then(($switchery) => {
      cy.wrap($switchery).find('small')
        .invoke('attr', 'style')
        .should('not.include', 'left: 20px');
    });
  });
  it('Deve alterar o último número da remessa, salvar e validar a alteração', () => {
    // Verifica se há contas bancárias ativas disponíveis
    ListagemContasPage.verificarSeHaContasBancariasAtivas().then((temContas) => {
      if (!temContas) {
        cy.log('Não há contas bancárias ativas disponíveis - teste será pulado');
        this.skip();
      }
    });

    // Seleciona uma conta ativa para edição
    ListagemContasPage.selecionarPrimeiraContaBancoAtiva();
    cy.get('#loading').should('not.exist');
    // Gera um novo número de remessa
    const novoNumeroRemessa = '9999';

    // Altera o campo "último número da remessa"
    ContaCorrenteEdicaoPage.alterarUltimoNumeroRemessa(novoNumeroRemessa);

    // Salva as alterações
    ContaCorrenteEdicaoPage.salvar();

    // Valida a mensagem de sucesso
    ContaCorrenteEdicaoPage.validarSucesso();

    // Valida que o "último número da remessa" foi alterado
    ContaCorrenteEdicaoPage.validarUltimoNumeroRemessa(novoNumeroRemessa);
  });

  it('Deve ativar uma conta inativa', () => {
    // Verifica se há contas bancárias inativas disponíveis
    ListagemContasPage.verificarSeHaContasBancariasInativas().then((temContas) => {
      if (!temContas) {
        cy.log('Não há contas bancárias inativas disponíveis - teste será pulado');
        this.skip();
      }
    });

    // Seleciona a primeira conta inativa com "Banco" no nome
    ListagemContasPage.selecionarPrimeiraContaBancoInativa();
    cy.get('#loading').should('not.exist');
    // EXCEÇÃO JUSTIFICADA: Wait fixo necessário - a página de edição precisa de tempo adicional
    // para carregar completamente o switch de ativação/desativação após o loading desaparecer
    // Tentativas de validação condicional falharam (elemento não encontrado mesmo com timeout de 15s)
    cy.wait(5000);
    // Ativa a conta
    ContaCorrenteEdicaoPage.ativarConta();
    ContaCorrenteEdicaoPage.salvar();
    ContaCorrenteEdicaoPage.validarSucesso();

    // Verifica que o switch mudou para a aparência de "ativado"
    ContaCorrenteEdicaoPage.encontrarSwitchery().then(($switchery) => {
      cy.wrap($switchery)
        .should('have.attr', 'style')
        .and('include', 'border-color: rgb(255, 192, 103)');
    });
  });
});
