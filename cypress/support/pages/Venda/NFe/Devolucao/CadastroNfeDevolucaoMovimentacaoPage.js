import CadastroNfeDevolucaoBasePage from './CadastroNfeDevolucaoBasePage';
import CadastroNfeLocators from '../../../../locators/Venda/CadastroNfeLocators';

class CadastroNfeDevolucaoMovimentacaoPage extends CadastroNfeDevolucaoBasePage {
  avancarParaCadastroDevolucaoMovimentacao() {
    this.fecharTutorialSeVisivel();
    cy.get(CadastroNfeLocators.tabsTipoNota.devolucao).click({ force: true });
    cy.get(CadastroNfeLocators.radiosTipoDevolucao.movimentacao).click({ force: true });
    cy.wait(500);
    cy.get(CadastroNfeLocators.devolucao.movimentacao.form).should('exist');
  }

  pesquisarDevolucaoMovimentacao(fornecedor = null, cnpj = null, notaFiscal = null, chaveAcesso = null) {
    // Aguarda o loading desaparecer se existir
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Aguarda alguns instantes após o loading para garantir que os objetos estejam totalmente carregados
    cy.wait(1500);

    // Aguarda o campo de data estar visível e pronto para interação
    cy.get(CadastroNfeLocators.devolucao.movimentacao.campoData, { timeout: 10000 })
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
    cy.get(CadastroNfeLocators.devolucao.movimentacao.campoData)
      .clear()
      .type(periodoData, { delay: 100 });

    if (fornecedor) {
      cy.get(CadastroNfeLocators.devolucao.movimentacao.campoFornecedor).clear().type(fornecedor, { delay: 200 });
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
      cy.get(CadastroNfeLocators.devolucao.movimentacao.campoCnpj).clear().type(cnpj, { delay: 200 });
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
      cy.get(CadastroNfeLocators.devolucao.movimentacao.campoNotaFiscal).clear().type(notaFiscal, { delay: 200 });
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
      cy.get(CadastroNfeLocators.devolucao.movimentacao.campoChaveAcesso).clear().type(chaveAcesso, { delay: 200 });
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
    cy.get(CadastroNfeLocators.devolucao.movimentacao.botaoPesquisar).click({ force: true });

    // Aguarda o loading desaparecer se existir
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Aguarda a tabela de resultados aparecer e estar completamente visível
    cy.get(CadastroNfeLocators.devolucao.movimentacao.tabelaResultados, { timeout: 15000 })
      .should('exist')
      .should('be.visible');

    // Verifica se há linhas na tabela
    cy.get(CadastroNfeLocators.devolucao.movimentacao.tabelaResultados)
      .find('tr')
      .filter(':visible')
      .should('have.length.at.least', 1);
  }

  selecionarPrimeiraDevolucaoMovimentacao() {
    // Garante que a tabela existe e tem linhas visíveis
    cy.get(CadastroNfeLocators.devolucao.movimentacao.tabelaResultados, { timeout: 10000 })
      .should('exist')
      .find('tr')
      .filter(':visible')
      .should('have.length.at.least', 1)
      .then(() => {
        // Encontra a primeira linha com valor maior que 0
        let linhaEncontrada = false;
        cy.get(CadastroNfeLocators.devolucao.movimentacao.tabelaResultados)
          .find('tr')
          .filter(':visible')
          .each(($row) => {
            if (linhaEncontrada) return false; // Para a iteração se já encontrou

            // Obtém o valor da coluna (geralmente a coluna de valor está na posição 5 ou 6)
            // A estrutura da tabela: checkbox, código, data, operação, tipo, valor
            const cells = $row.find('td');
            if (cells.length >= 6) {
              const valorText = cells.eq(5).text().trim(); // Coluna de valor (índice 5)
              // Remove caracteres não numéricos e converte para número
              const valor = parseFloat(valorText.replace(/[^\d,]/g, '').replace(',', '.'));

              if (valor > 0) {
                linhaEncontrada = true;
                // Clica no checkbox da linha para selecioná-la (pode estar oculto com opacity: 0)
                cy.wrap($row)
                  .find('input[type="checkbox"]')
                  .first()
                  .check({ force: true });

                return false; // Para a iteração
              }
            }
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

  validarFormularioDevolucaoMovimentacao() {
    const campos = CadastroNfeLocators.camposPrincipais;
    cy.get(campos.finalidade).should('have.value', '4');
    cy.get(campos.serie).should('exist');
    cy.get(campos.naturezaAuto).should('exist');
    cy.get(CadastroNfeLocators.destinatario.painel).should('exist');
    cy.get(CadastroNfeLocators.destinatario.nome).should('exist');
  }
}

export default CadastroNfeDevolucaoMovimentacaoPage;

