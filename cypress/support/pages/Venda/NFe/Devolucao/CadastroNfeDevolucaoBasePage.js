import CadastroNfeBasePage from '../CadastroNfeBasePage';
import CadastroNfeLocators from '../../../../locators/Venda/CadastroNfeLocators';

class CadastroNfeDevolucaoBasePage extends CadastroNfeBasePage {
  fecharTutorialSeVisivel() {
    cy.get('body').then(($body) => {
      if ($body.find(CadastroNfeLocators.tour.container).length) {
        cy.get(CadastroNfeLocators.tour.naoMostrarNovamente).click({ force: true });
      }
    });
  }

  adicionarNotaReferenciada() {
    const notasRef = CadastroNfeLocators.notasReferenciadas;
    // Expande o accordion "Notas referenciadas"
    cy.get(notasRef.botaoExpandirAccordion, { timeout: 10000 })
      .should('exist')
      .scrollIntoView()
      .click({ force: true });
    // Aguarda o formulário renderizar completamente
    cy.wait(3000);
    // Aguarda o campo de chave de acesso ficar visível (pode estar com display: none inicialmente)
    cy.get(notasRef.campoChaveAcesso, { timeout: 20000 })
      .should('exist')
      .should('not.have.css', 'display', 'none', { timeout: 15000 })
      .should('be.visible', { timeout: 10000 })
      .scrollIntoView()
      .click({ force: true });
    // Clica no ícone de busca para expandir a listagem
    cy.get(notasRef.campoChaveAcessoIcone, { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .scrollIntoView()
      .click({ force: true });
    // Aguarda o autocomplete carregar e seleciona o primeiro resultado válido
    cy.get(CadastroNfeLocators.typeaheadPrimeiroItem, { timeout: 15000 })
      .should('have.length.at.least', 1)
      .filter(':visible')
      .first()
      .should(($el) => {
        const texto = $el.text().trim();
        // Verifica se o texto é válido
        expect(texto, 'Texto do autocomplete deve ser válido').to.not.be.empty;
        expect(texto.toLowerCase(), 'Texto não deve indicar ausência de resultados').to.not.include('não foram encontrados');
        expect(texto.toLowerCase(), 'Texto não deve indicar ausência de resultados').to.not.include('nenhum');
        expect(texto.toLowerCase(), 'Texto não deve indicar ausência de resultados').to.not.include('nenhum resultado');
      })
      .click({ force: true });
    // Aguarda um momento após selecionar o item
    cy.wait(1000);
    // Clica no botão Salvar
    cy.get(notasRef.botaoSalvar, { timeout: 10000 })
      .should('be.visible')
      .scrollIntoView()
      .click({ force: true });
    // Aguarda a requisição de salvamento ser concluída
    cy.wait(2000);
    // Valida mensagem de sucesso
    // cy.get('.alert-success, .alert', { timeout: 5000 })
    //   .should('be.visible')
    //   .should('contain', 'Nota Referenciada');
  }

  finalizarEmissaoDevolucao() {
    // Fecha o tutorial se estiver visível
    this.fecharTutorialSeVisivel();
    // Aguarda o loading desaparecer se existir
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });
    // Avança do passo 2 (Cadastro) para o passo 3 (Produtos)
    this.clicarBotaoContinuarRodape();
    this.validarTelaSelecaoItens();
    // Avança do passo 3 (Produtos) para o passo 4 (Financeiro)
    this.clicarBotaoContinuarRodape();
    this.validarTelaPagamentos();
    // Avança do passo 4 (Financeiro) para o passo 5 (Finalizar)
    this.clicarBotaoContinuarRodape();
    this.validarTelaEmitirNota();
    // Emite a nota
    this.emitirNota();
    // Valida o modal de sucesso da emissão
    this.validarModalSucessoEmissao('listagem');
  }
}

export default CadastroNfeDevolucaoBasePage;

