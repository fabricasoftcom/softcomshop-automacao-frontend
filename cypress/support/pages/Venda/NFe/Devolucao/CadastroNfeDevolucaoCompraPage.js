import CadastroNfeDevolucaoBasePage from './CadastroNfeDevolucaoBasePage';
import CadastroNfeLocators from '../../../../locators/Venda/CadastroNfeLocators';

class CadastroNfeDevolucaoCompraPage extends CadastroNfeDevolucaoBasePage {
  avancarParaCadastroDevolucaoCompra() {
    this.fecharTutorialSeVisivel();
    cy.get(CadastroNfeLocators.tabsTipoNota.devolucao).click({ force: true });
    cy.get(CadastroNfeLocators.radiosTipoDevolucao.compra).click({ force: true });

    // Aguarda o loading desaparecer se existir
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Aguarda alguns instantes após o loading para garantir que os objetos estejam totalmente carregados
    cy.wait(1500);

    // Valida que o formulário foi carregado
    cy.get(CadastroNfeLocators.devolucao.compra.form, { timeout: 10000 })
      .should('exist')
      .should('be.visible');
  }

  pesquisarDevolucaoCompra(fornecedor = null, cnpj = null, notaFiscal = null, chaveAcesso = null) {
    // Aguarda o loading desaparecer se existir
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Aguarda alguns instantes após o loading para garantir que os objetos estejam totalmente carregados
    cy.wait(1500);

    // Aguarda o campo de data estar visível e pronto para interação
    cy.get(CadastroNfeLocators.devolucao.compra.campoData, { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled');

    // Calcula a data dos últimos 2 meses
    const hoje = new Date();
    const dataFim = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    // Data de início: 2 meses atrás, primeiro dia do mês
    const dataInicio = new Date(hoje.getFullYear(), hoje.getMonth() - 2, 1);
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
    // Limpa o campo e digita a data dos últimos 2 meses
    cy.get(CadastroNfeLocators.devolucao.compra.campoData)
      .clear()
      .type(periodoData, { delay: 100 });
    if (fornecedor) {
      cy.get(CadastroNfeLocators.devolucao.compra.campoFornecedor).clear().type(fornecedor, { delay: 200 });
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
      cy.get(CadastroNfeLocators.devolucao.compra.campoCnpj).clear().type(cnpj, { delay: 200 });
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
      cy.get(CadastroNfeLocators.devolucao.compra.campoNotaFiscal).clear().type(notaFiscal, { delay: 200 });
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
      cy.get(CadastroNfeLocators.devolucao.compra.campoChaveAcesso).clear().type(chaveAcesso, { delay: 200 });
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
    cy.get(CadastroNfeLocators.devolucao.compra.botaoPesquisar).click({ force: true });

    // Aguarda o loading desaparecer se existir
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Aguarda a tabela de resultados aparecer e estar completamente visível
    cy.get(CadastroNfeLocators.devolucao.compra.tabelaResultados, { timeout: 15000 })
      .should('exist')
      .should('be.visible');

    // Verifica se há linhas na tabela
    cy.get(CadastroNfeLocators.devolucao.compra.tabelaResultados)
      .find('tr')
      .filter(':visible')
      .should('have.length.at.least', 1);

    // Verifica se há pelo menos uma linha com botão de ações (linhas de compras válidas)
    // Isso garante que não é apenas a mensagem "Nenhuma compra encontrada!"
    cy.get(CadastroNfeLocators.devolucao.compra.tabelaResultados)
      .find('tr')
      .filter(':visible')
      .then(($linhas) => {
        // Verifica se pelo menos uma linha tem o botão de ações
        const linhasComAcoes = $linhas.filter((index, tr) => {
          const texto = Cypress.$(tr).find('td').first().text().trim();
          const temBotaoAcoes = Cypress.$(tr).find(CadastroNfeLocators.devolucao.compra.botaoAcoesLinha).length > 0;
          return texto !== 'Nenhuma compra encontrada!' && temBotaoAcoes;
        });

        if (linhasComAcoes.length > 0) {
          // Valida a primeira linha com ações
          cy.wrap(linhasComAcoes.first())
            .should('be.visible')
            .within(() => {
              cy.get('td').should('have.length.at.least', 1).should('be.visible');
              cy.get(CadastroNfeLocators.devolucao.compra.botaoAcoesLinha)
                .should('exist')
                .should('be.visible');
            });
        } else {
          cy.log('Nenhuma compra encontrada ou linhas sem botão de ações');
        }
      });
  }

  selecionarPrimeiraDevolucaoCompra() {
    // Garante que a tabela existe e tem linhas visíveis
    cy.get(CadastroNfeLocators.devolucao.compra.tabelaResultados, { timeout: 10000 })
      .should('exist')
      .find('tr.table-compras-checkbox')
      .filter(':visible')
      .should('have.length.at.least', 1)
      .then(() => {
        // Seleciona a primeira linha e clica no botão de ações (dropdown)
        cy.get(CadastroNfeLocators.devolucao.compra.tabelaCompras)
          .first()
          .should('be.visible')
          .then(($linha) => {
            // Clica no botão de ações (ícone de três pontos) para abrir o dropdown
            cy.wrap($linha)
              .find(CadastroNfeLocators.devolucao.compra.botaoAcoesLinha)
              .should('be.visible')
              .scrollIntoView()
              .click({ force: true });

            // Aguarda um momento para o dropdown aparecer
            cy.wait(500);
            // Busca o link "Gerar nota de devolução" visível no dropdown
            // Filtra apenas elementos visíveis e pega o primeiro (do dropdown aberto)
            cy.get(CadastroNfeLocators.devolucao.compra.linkGerarDevolucao, { timeout: 10000 })
              .filter(':visible')
              .first()
              .should('be.visible')
              .should('not.have.css', 'display', 'none')
              .should('not.have.css', 'visibility', 'hidden')
              .scrollIntoView()
              .click({ force: true });
          });
      });

    // Aguarda o modal de seleção de itens aparecer
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Valida que o modal de seleção de itens foi carregado
    cy.get('h2:contains("Dados da nota fiscal de compra")', { timeout: 15000 })
      .should('exist')
      .should('be.visible');
  }

  validarModalSelecaoItensDevolucaoCompra() {
    // Valida que o modal está visível
    cy.get(CadastroNfeLocators.devolucao.compra.modalSelecaoItens, { timeout: 15000 })
      .should('exist')
      .should('be.visible');

    // Valida o título do modal
    cy.get(CadastroNfeLocators.devolucao.compra.modalTitulo, { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .should('contain.text', 'Dados da nota fiscal de compra');

    // Valida informações da nota fiscal (Fornecedor, Data, Nota Fiscal, Chave de Acesso)
    cy.get(CadastroNfeLocators.devolucao.compra.modalSelecaoItens).first().within(() => {
      cy.get('strong').should('have.length.at.least', 4);
      cy.contains('strong', 'Fornecedor').should('exist');
      cy.contains('strong', 'Data').should('exist');
      cy.contains('strong', 'Nota Fiscal').should('exist');
      cy.contains('strong', 'Chave de Acesso').should('exist');
    });

    // Valida a tabela de itens
    cy.get(CadastroNfeLocators.devolucao.compra.modalTabelaItens, { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .within(() => {
        // Valida cabeçalhos da tabela
        cy.get('thead').should('exist');
        cy.get('thead th').should('have.length.at.least', 8);
        cy.contains('th', 'Código').should('exist');
        cy.contains('th', 'Referência').should('exist');
        cy.contains('th', 'Descrição').should('exist');
        cy.contains('th', 'Quantidade').should('exist');
        cy.contains('th', 'Devolver').should('exist');
        cy.contains('th', 'Preço Unitario').should('exist');
        cy.contains('th', 'Valor').should('exist');

        // Valida que existem linhas de itens
        cy.get('tbody tr').should('have.length.at.least', 1);

        // Valida estrutura da primeira linha
        cy.get('tbody tr').first().within(() => {
          // Valida checkbox de seleção
          cy.get('input[type="checkbox"]').should('exist');

          // Valida campo de quantidade para devolver
          cy.get('input[type="text"], input[type="number"]').should('exist');

          // Valida que tem pelo menos 8 células (checkbox + 7 colunas)
          cy.get('td').should('have.length.at.least', 8);
        });
      });

    // Valida totais
    cy.get(CadastroNfeLocators.devolucao.compra.modalTotalItens, { timeout: 5000 })
      .should('exist')
      .should('be.visible')
      .should('contain.text', 'Total de Itens');

    cy.get(CadastroNfeLocators.devolucao.compra.modalTotalVolumes, { timeout: 5000 })
      .should('exist')
      .should('be.visible')
      .should('contain.text', 'Total de Volumes');

    cy.get(CadastroNfeLocators.devolucao.compra.modalItensSelecionados, { timeout: 5000 })
      .should('exist')
      .should('be.visible')
      .should('contain.text', 'Itens Selecionados');

    cy.get(CadastroNfeLocators.devolucao.compra.modalVolumeSelecionado, { timeout: 5000 })
      .should('exist')
      .should('be.visible')
      .should('contain.text', 'Volume Selecionado');

    // Valida botões
    cy.get(CadastroNfeLocators.devolucao.compra.modalBotaoCancelar, { timeout: 5000 })
      .should('exist')
      .should('be.visible')
      .should('contain.text', 'Cancelar');

    cy.get(CadastroNfeLocators.devolucao.compra.modalBotaoGerar, { timeout: 5000 })
      .should('exist')
      .should('be.visible')
      .should('contain.text', 'Gerar Nota de Devolução')
      .should('not.be.disabled');

    // Valida mensagem informativa
    cy.get(CadastroNfeLocators.devolucao.compra.modalSelecaoItens).first().within(() => {
      cy.contains('Ao confirmar, apenas os itens selecionados irão compor a nota de devolução')
        .should('exist')
        .should('be.visible');
    });
  }

  preencherQuantidadeDevolverMetade() {
    // Preenche a quantidade a devolver para cada item (metade da quantidade)
    // Se a quantidade for 1, preenche 1 ao invés de 0.5
    cy.get(CadastroNfeLocators.devolucao.compra.modalTabelaItens, { timeout: 10000 })
      .should('exist')
      .find('tbody tr')
      .each(($row) => {
        cy.wrap($row).within(() => {
          // Obtém a quantidade da coluna "Quantidade" (índice 4)
          cy.get('td').eq(4).then(($quantidadeCell) => {
            const quantidadeText = $quantidadeCell.text().trim();
            const quantidade = parseFloat(quantidadeText.replace(',', '.'));
            // Se a quantidade for 1, preenche 1; caso contrário, preenche metade
            let quantidadeDevolver;
            if (quantidade === 1) {
              quantidadeDevolver = 1;
            } else {
              quantidadeDevolver = quantidade / 2;
            }

            // Formata para o padrão brasileiro (vírgula como separador decimal)
            const quantidadeDevolverFormatada = quantidadeDevolver.toFixed(2).replace('.', ',');

            // Preenche o campo "Devolver" (índice 5)
            cy.get('td').eq(5).within(() => {
              cy.get('input[type="text"], input[type="number"]')
                .clear()
                .type(quantidadeDevolverFormatada, { delay: 100 })
                .should('have.value', quantidadeDevolverFormatada);
            });
          });
        });
      });

    // Aguarda um momento para que os cálculos sejam atualizados
    cy.wait(500);
  }

  gerarNotaDevolucaoCompra() {
    // Clica no botão "Gerar Nota de Devolução"
    cy.get(CadastroNfeLocators.devolucao.compra.modalBotaoGerar, { timeout: 5000 })
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true });

    // Aguarda o modal de confirmação aparecer
    cy.wait(2000);
    cy.get('body').then(($body) => {
      if ($body.find('.sweet-alert, [role="dialog"]').length > 0) {
        cy.contains('button', 'Sim, pode gerar!', { timeout: 10000 })
          .should('be.visible')
          .click({ force: true });
      }
    });

    // Aguarda o loading desaparecer
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Valida que foi redirecionado para a tela de edição da nota
    cy.url({ timeout: 30000 }).should('match', /\/nfe2\/\d+\/(editar|novo)/);

    // Valida que o formulário foi carregado
    cy.get(CadastroNfeLocators.formularioPadrao, { timeout: 15000 }).should('exist');
    cy.get(CadastroNfeLocators.formulario).should('exist');
  }

  validarFormularioDevolucaoCompra() {
    const campos = CadastroNfeLocators.camposPrincipais;
    cy.get(campos.finalidade).should('have.value', '4');
    cy.get(campos.serie).should('exist');
    cy.get(campos.naturezaAuto).should('exist');
    cy.get(CadastroNfeLocators.destinatario.painel).should('exist');
    cy.get(CadastroNfeLocators.destinatario.nome).should('exist');
  }
}

export default CadastroNfeDevolucaoCompraPage;

