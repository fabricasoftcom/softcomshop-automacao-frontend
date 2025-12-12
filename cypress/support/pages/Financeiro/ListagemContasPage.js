import ListagemContasLocators from "../../locators/Financeiro/ListagemContasLocators";
import MenulateralFinanceiroPage from "../menulateral/MenulateralFinanceiroPage";

class ListagemContasPage {
  // Método para visitar a página de listagem de contas
  visit() {
    MenulateralFinanceiroPage.acessarListagemContas();
    cy.get('h5').contains('Listagem de contas').should('be.visible');
  }

  // Verificar se a tabela está visível
  verificarTabelaVisivel() {
    cy.get(ListagemContasLocators.tabelaContas).should('be.visible');
  }

  // Buscar uma conta pelo nome
  buscarConta(nomeConta) {
    cy.get(ListagemContasLocators.buscarButton).click();
    cy.get('input').type(nomeConta).type('{enter}');
  }

  // Verificar a primeira linha da tabela
  verificarPrimeiraLinha() {
    cy.get(ListagemContasLocators.linhaTabela).first().within(() => {
      cy.get(ListagemContasLocators.colunaNomeConta).should('be.visible');
      cy.get(ListagemContasLocators.colunaAgencia).should('be.visible');
      cy.get(ListagemContasLocators.colunaNumeroConta).should('be.visible');
      cy.get(ListagemContasLocators.colunaStatus).should('be.visible');
    });
  }

  // Abrir o dropdown de ações na primeira linha
  abrirDropdownAcoesPrimeiraLinha() {
    cy.get(ListagemContasLocators.linhaTabela).first()
      .find(ListagemContasLocators.dropdownAcoes)
      .click();
  }

  // Selecionar uma opção no dropdown
  selecionarOpcaoDropdown(opcao) {
    cy.get(ListagemContasLocators.opcoesDropdown)
      .contains(opcao)
      .click();
  }

  // Verificar o status da conta como "Ativa"
  verificarStatusAtiva() {
    cy.get(ListagemContasLocators.statusAtiva).should('be.visible');
  }
    // Clicar no botão de novo cadastro
    clicarNovoCadastro() {
      cy.get(ListagemContasLocators.novoCadastroButton).click();
    }

    // Verificar se a página de cadastro foi carregada
    verificarPaginaCadastro() {
      cy.get(ListagemContasLocators.paginaCadastroTitulo).should('be.visible');
    }
    // Sem orgnaização
    selecionarPrimeiraContaBancoAtiva() {
      cy.get(ListagemContasLocators.tabelaLinhas).each(($row) => {
          const nomeConta = $row.find(ListagemContasLocators.colunaNomeConta).text().trim();
          const statusConta = $row.find(ListagemContasLocators.colunaStatus).text().trim();

          // Verifica se o nome contém "banco" (case-insensitive) e o status é "Ativa"
          if (nomeConta.toLowerCase().includes('banco') && statusConta.toLowerCase().includes('ativa')) {
              cy.wrap($row)
                  .find(ListagemContasLocators.dropdownAcoes)
                  .click(); // Abre o dropdown de ações

              cy.wrap($row)
                  .find(ListagemContasLocators.opcaoEditar)
                  .click({ force: true }); // Clica na opção "Editar"

              cy.log(`Conta ativa selecionada para edição: ${nomeConta}`);
              return false; // Encerra a iteração após encontrar a conta válida
          }
      });
  }
  selecionarPrimeiraContaBancoInativa() {
    cy.get(ListagemContasLocators.tabelaLinhas).each(($row) => {
        const nomeConta = $row.find(ListagemContasLocators.colunaNomeConta).text().trim();
        const statusConta = $row.find(ListagemContasLocators.colunaStatus).text().trim();

        // Verifica se o nome contém "banco" (case-insensitive) e o status é "Inativa"
        if (nomeConta.toLowerCase().includes('banco') && statusConta.toLowerCase().includes('inativa')) {
            cy.wrap($row)
                .find(ListagemContasLocators.dropdownAcoes)
                .click(); // Abre o dropdown de ações

            cy.wrap($row)
                .find(ListagemContasLocators.opcaoEditar)
                .click({ force: true }); // Clica na opção "Editar"

            cy.log(`Conta inativa selecionada para edição: ${nomeConta}`);
            return false; // Encerra a iteração após encontrar a conta válida
        }
    });
  }

  /**
   * Verifica se há contas bancárias disponíveis na tabela
   * @returns {Cypress.Chainable<boolean>} true se houver contas, false caso contrário
   */
  verificarSeHaContasBancarias() {
    return cy.get(ListagemContasLocators.tabelaLinhas).then(($linhas) => {
      if ($linhas.length === 0) {
        return false;
      }
      // Verifica se há pelo menos uma conta com "banco" no nome
      let temContaBanco = false;
      $linhas.each((index, row) => {
        const nomeConta = Cypress.$(row).find(ListagemContasLocators.colunaNomeConta).text().trim();
        if (nomeConta.toLowerCase().includes('banco')) {
          temContaBanco = true;
          return false; // Encerra o loop
        }
      });
      return temContaBanco;
    });
  }

  /**
   * Verifica se há contas bancárias ativas disponíveis
   * @returns {Cypress.Chainable<boolean>} true se houver contas ativas, false caso contrário
   */
  verificarSeHaContasBancariasAtivas() {
    return cy.get(ListagemContasLocators.tabelaLinhas).then(($linhas) => {
      if ($linhas.length === 0) {
        return false;
      }
      let temContaAtiva = false;
      $linhas.each((index, row) => {
        const nomeConta = Cypress.$(row).find(ListagemContasLocators.colunaNomeConta).text().trim();
        const statusConta = Cypress.$(row).find(ListagemContasLocators.colunaStatus).text().trim();
        if (nomeConta.toLowerCase().includes('banco') && statusConta.toLowerCase().includes('ativa')) {
          temContaAtiva = true;
          return false; // Encerra o loop
        }
      });
      return temContaAtiva;
    });
  }

  /**
   * Verifica se há contas bancárias inativas disponíveis
   * @returns {Cypress.Chainable<boolean>} true se houver contas inativas, false caso contrário
   */
  verificarSeHaContasBancariasInativas() {
    return cy.get(ListagemContasLocators.tabelaLinhas).then(($linhas) => {
      if ($linhas.length === 0) {
        return false;
      }
      let temContaInativa = false;
      $linhas.each((index, row) => {
        const nomeConta = Cypress.$(row).find(ListagemContasLocators.colunaNomeConta).text().trim();
        const statusConta = Cypress.$(row).find(ListagemContasLocators.colunaStatus).text().trim();
        if (nomeConta.toLowerCase().includes('banco') && statusConta.toLowerCase().includes('inativa')) {
          temContaInativa = true;
          return false; // Encerra o loop
        }
      });
      return temContaInativa;
    });
  }

}

export default new ListagemContasPage();
