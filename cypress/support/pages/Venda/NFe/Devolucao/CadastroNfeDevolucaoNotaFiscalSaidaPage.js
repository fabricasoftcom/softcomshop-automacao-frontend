import CadastroNfeDevolucaoBasePage from './CadastroNfeDevolucaoBasePage';
import CadastroNfeLocators from '../../../../locators/Venda/CadastroNfeLocators';

class CadastroNfeDevolucaoNotaFiscalSaidaPage extends CadastroNfeDevolucaoBasePage {
  avancarParaCadastroDevolucaoNotaFiscalSaida() {
    this.fecharTutorialSeVisivel();
    cy.get(CadastroNfeLocators.tabsTipoNota.devolucao).click({ force: true });
    cy.get(CadastroNfeLocators.radiosTipoDevolucao.notaFiscalSaida).click({ force: true });
    // Aguarda o loading desaparecer se existir
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });
    // Aguarda alguns instantes para garantir que o formulário esteja totalmente carregado
    cy.wait(1500);
    // Valida que o campo de data foi carregado (mais confiável que o formulário)
    cy.get(CadastroNfeLocators.devolucao.notaFiscalSaida.campoData, { timeout: 15000 })
      .should('exist')
      .should('be.visible');
  }

  pesquisarDevolucaoNotaFiscalSaida(cliente = null, cnpj = null, notaFiscal = null, chaveAcesso = null) {
    // Aguarda o loading desaparecer se existir
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Aguarda alguns instantes após o loading para garantir que os objetos estejam totalmente carregados
    cy.wait(1500);

    // Aguarda o campo de data estar visível e pronto para interação
    cy.get(CadastroNfeLocators.devolucao.notaFiscalSaida.campoData, { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled');

    // Calcula a data dos últimos 60 dias (não pode ser maior que 60 dias)
    const hoje = new Date();
    const dataFim = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

    // Data de início: exatamente 60 dias atrás
    const dataInicio = new Date(hoje);
    dataInicio.setDate(dataInicio.getDate() - 60);

    // Formata as datas no padrão DD/MM/YYYY
    const formatarData = (data) => {
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    };

    const dataInicioFormatada = formatarData(dataInicio);
    const dataFimFormatada = formatarData(dataFim);
    const periodoData = `${dataInicioFormatada} - ${dataFimFormatada}`;

    // Limpa o campo e digita a data dos últimos 60 dias
    cy.get(CadastroNfeLocators.devolucao.notaFiscalSaida.campoData)
      .clear()
      .type(periodoData, { delay: 100 });

    if (cliente) {
      cy.get(CadastroNfeLocators.devolucao.notaFiscalSaida.campoCliente).clear().type(cliente, { delay: 200 });
      cy.get(CadastroNfeLocators.typeaheadPrimeiroItem, { timeout: 10000 })
        .should('exist')
        .then(() => {
          cy.get(CadastroNfeLocators.typeaheadPrimeiroItem)
            .filter(':visible')
            .first()
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });
        });
    }
    if (cnpj) {
      cy.get(CadastroNfeLocators.devolucao.notaFiscalSaida.campoCnpj).clear().type(cnpj, { delay: 200 });
      cy.get(CadastroNfeLocators.typeaheadPrimeiroItem, { timeout: 10000 })
        .should('exist')
        .then(() => {
          cy.get(CadastroNfeLocators.typeaheadPrimeiroItem)
            .filter(':visible')
            .first()
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });
        });
    }
    if (notaFiscal) {
      cy.get(CadastroNfeLocators.devolucao.notaFiscalSaida.campoNotaFiscal).clear().type(notaFiscal, { delay: 200 });
      cy.get(CadastroNfeLocators.typeaheadPrimeiroItem, { timeout: 10000 })
        .should('exist')
        .then(() => {
          cy.get(CadastroNfeLocators.typeaheadPrimeiroItem)
            .filter(':visible')
            .first()
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });
        });
    }
    if (chaveAcesso) {
      cy.get(CadastroNfeLocators.devolucao.notaFiscalSaida.campoChaveAcesso).clear().type(chaveAcesso, { delay: 200 });
      cy.get(CadastroNfeLocators.typeaheadPrimeiroItem, { timeout: 10000 })
        .should('exist')
        .then(() => {
          cy.get(CadastroNfeLocators.typeaheadPrimeiroItem)
            .filter(':visible')
            .first()
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });
        });
    }
    // Clica no botão pesquisar
    cy.get(CadastroNfeLocators.devolucao.notaFiscalSaida.botaoPesquisar).click({ force: true });

    // Aguarda o loading desaparecer se existir
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Aguarda a tabela de resultados aparecer e estar completamente visível
    cy.get(CadastroNfeLocators.devolucao.notaFiscalSaida.tabelaResultados, { timeout: 15000 })
      .should('exist')
      .should('be.visible');

    // Verifica se há linhas na tabela
    cy.get(CadastroNfeLocators.devolucao.notaFiscalSaida.tabelaResultados)
      .find('tr')
      .filter(':visible')
      .should('have.length.at.least', 1);
  }

  selecionarPrimeiraDevolucaoNotaFiscalSaida() {
    // Garante que a tabela existe e tem linhas visíveis
    cy.get(CadastroNfeLocators.devolucao.notaFiscalSaida.tabelaResultados, { timeout: 10000 })
      .should('exist')
      .find('tr')
      .filter(':visible')
      .should('have.length.at.least', 1)
      .then(() => {
        // Seleciona a primeira linha visível e marca o checkbox
        cy.get(CadastroNfeLocators.devolucao.notaFiscalSaida.tabelaResultados)
          .find('tr')
          .filter(':visible')
          .first()
          .should('be.visible')
          .scrollIntoView()
          .within(() => {
            // Marca o checkbox da primeira linha
            cy.get('input[type="checkbox"]')
              .first()
              .check({ force: true });
          });
      });

    // Aguarda um momento após selecionar o checkbox
    cy.wait(500);

    // Clica no botão "Continuar" no rodapé após selecionar
    cy.get('body')
      .find('button')
      .filter(':visible')
      .filter((_, el) => /continuar/i.test(Cypress.$(el).text().trim()))
      .then(($btns) => {
        expect($btns.length, 'Botão "Continuar" visível na tela').to.be.greaterThan(0);
        const botaoContinuar = $btns.last();
        cy.wrap(botaoContinuar)
          .scrollIntoView()
          .should('not.be.disabled')
          .click({ force: true });
      });

    // Aguarda o loading desaparecer após o clique
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Verifica se há algum modal de confirmação ou alerta que precisa ser tratado
    cy.get('body').then(($body) => {
      if ($body.find('.sweet-alert.showSweetAlert.visible').length > 0) {
        cy.get('.sweet-alert.showSweetAlert.visible')
          .should('be.visible')
          .within(() => {
            cy.contains('button', /confirmar|ok|sim/i)
              .should('be.visible')
              .click({ force: true });
          });
        cy.get('.sweet-alert.showSweetAlert.visible', { timeout: 10000 }).should('not.exist');
      }
    });

    // Aguarda alguns instantes para garantir que a navegação/redirecionamento ocorreu
    cy.wait(1500);

    // Valida que o formulário foi carregado após a seleção
    cy.get(CadastroNfeLocators.formularioPadrao, { timeout: 30000 }).should('exist');
    cy.get(CadastroNfeLocators.formulario).should('exist');
  }

  validarFormularioDevolucaoNotaFiscalSaida() {
    const campos = CadastroNfeLocators.camposPrincipais;
    cy.get(campos.finalidade).should('have.value', '4');
    cy.get(campos.serie).should('exist');
    cy.get(campos.naturezaAuto).should('exist');
    cy.get(CadastroNfeLocators.destinatario.painel).should('exist');
    cy.get(CadastroNfeLocators.destinatario.nome).should('exist');
  }
}

export default CadastroNfeDevolucaoNotaFiscalSaidaPage;

