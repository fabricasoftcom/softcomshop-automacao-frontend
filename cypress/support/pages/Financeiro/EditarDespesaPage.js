import EditarDespesaLocators from "../../locators/EditarDespesaLocators";
import ListagemContasAPagarPage from "./ListagemContasAPagarPage";

class EditarDespesaPage {
    // Acessa a página e abre o modal de edição de despesa
    visit() {
        ListagemContasAPagarPage.visit();
        this.abrirModal();
        cy.wait(500);
    }

    abrirModal() {
        ListagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
        cy.get('.dropdown-menu.show li a')
          .contains('Editar', { matchCase: false })
          .click({ force: true });
    }

    fecharModal() {
        cy.get(EditarDespesaLocators.closeButton).click();
    }

    clicarSalvar() {
        cy.get(EditarDespesaLocators.modalContent)
          .find(EditarDespesaLocators.salvarButton)
          .click({ force: true });
    }

    clicarVoltar() {
        cy.get(EditarDespesaLocators.modalContent)
          .find(EditarDespesaLocators.voltarButton)
          .click({ force: true });
    }

    preencherDescricao(descricao) {
        cy.get(EditarDespesaLocators.descricaoInput)
          .clear({ force: true })
          .type(descricao, { force: true });
    }

    selecionarCategoria(categoria = "DESPESA") {
        cy.get(EditarDespesaLocators.categoriaAutocomplete).invoke('val').then((categoriaAtual) => {
            const valorParaPreencher = categoriaAtual || categoria;
            cy.get(EditarDespesaLocators.categoriaAutocomplete)
                .click({ force: true })
              .clear({ force: true })
              .type(valorParaPreencher, { force: true });
            cy.get(EditarDespesaLocators.categoriaResults)
              .contains(valorParaPreencher)
              .click({ force: true });
        });
    }

    selecionarConta() {
        cy.get(EditarDespesaLocators.contaAutocomplete).invoke('val').then((contaAtual) => {
            // Abre o dropdown se necessário
            cy.get(EditarDespesaLocators.contaAutocomplete)
            .click({ force: true })
              .clear({ force: true });

            // Aguarda o carregamento dos resultados
            cy.get(EditarDespesaLocators.contaResults).should('be.visible').then(($contas) => {
                const contasDisponiveis = Cypress.$($contas).map((_, conta) => conta.innerText).get();
                const contasFiltradas = contasDisponiveis.filter(conta => conta !== contaAtual);

                if (contasFiltradas.length > 0) {
                    const contaParaSelecionar = contasFiltradas[0];
                    cy.get(EditarDespesaLocators.contaAutocomplete)
                      .clear({ force: true })
                      .type(contaParaSelecionar, { force: true });
                    cy.get(EditarDespesaLocators.contaResults)
                      .contains(contaParaSelecionar)
                      .click({ force: true });
                } else {
                    throw new Error('Nenhuma conta diferente disponível para selecionar.');
                }
            });
        });
    }

    selecionarFormaPagamento() {
        cy.get(EditarDespesaLocators.formaPagamentoAutocomplete).invoke('val').then((formaAtual) => {
            cy.get(EditarDespesaLocators.formaPagamentoAutocomplete).clear();

            cy.get(EditarDespesaLocators.formaPagamentoResults).should('be.visible').then(($formas) => {
                const formasDisponiveis = Cypress.$($formas).map((_, forma) => forma.innerText).get();
                const formasFiltradas = formasDisponiveis.filter(forma => forma !== formaAtual);
                if (formasFiltradas.length > 0) {
                    const formaParaSelecionar = formasFiltradas[0];
                    cy.get(EditarDespesaLocators.formaPagamentoAutocomplete)
                      .clear({ force: true })
                      .type(formaParaSelecionar, { force: true });
                    cy.get(EditarDespesaLocators.formaPagamentoResults)
                      .contains(formaParaSelecionar)
                      .click({ force: true });
                } else {
                    throw new Error('Nenhuma forma de pagamento diferente disponível para selecionar.');
                }
            });
        });
    }

    preencherDataVencimento() {
        const dataAtual = new Date().toLocaleDateString('pt-BR');
        cy.get(EditarDespesaLocators.dataVencimentoInput)
          .clear({ force: true })
          .type(dataAtual, { force: true });
    }

    preencherValorAleatorio() {
        cy.get(EditarDespesaLocators.valorInput).invoke('val').then((valorAtual) => {
            let novoValor;
            do {
                novoValor = (Math.floor(Math.random() * 9000) + 1000).toFixed(2).replace('.', ',');
            } while (novoValor === valorAtual);
            cy.get(EditarDespesaLocators.valorInput)
              .clear({ force: true })
              .type(novoValor, { force: true });
        });
    }
}

export default new EditarDespesaPage();
