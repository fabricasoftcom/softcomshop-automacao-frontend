// EditarReceitaPage.js
import EditarReceitaLocators from "../../locators/EditarReceitaLocators";
import ListagemContasAReceberPage from "./ListagemContasAReceberPage";

class EditarReceitaPage {

    // Acessa a página e abre o modal de edição de receita
    visit() {
        ListagemContasAReceberPage.visit();
        this.abrirModal();
        cy.wait(499)
    }

    // Ações no modal
    abrirModal() {
        ListagemContasAReceberPage.selecionarOpcaoEditar();
    }

    fecharModal() {
        cy.get(EditarReceitaLocators.closeButton).click();
    }

    clicarSalvar() {
        cy.get(EditarReceitaLocators.modalContent)
            .find(EditarReceitaLocators.salvarButton) // Confirma que o botão específico do modal é buscado
            .click({ force: true });
    }

    clicarVoltar() {
        cy.get(EditarReceitaLocators.modalContent)
            .find(EditarReceitaLocators.voltarButton) // Garantia do botão Voltar correto
            .click({ force: true });
    }

    // Métodos de preenchimento de campos

    preencherDescricao(descricao) {
        cy.get(EditarReceitaLocators.descricaoInput)
            .clear({ force: true })
            .type(descricao, { force: true });
    }

    selecionarCategoria() {
        this.selecionarValorDiferenteAtual(EditarReceitaLocators.categoriaAutocomplete);
    }

    selecionarConta() {
        this.selecionarValorDiferenteAtual(EditarReceitaLocators.contaAutocomplete);
    }

    selecionarFormaPagamento() {
        this.selecionarValorDiferenteAtual(EditarReceitaLocators.formaPagamentoAutocomplete);
    }

    preencherDataVencimento() {
        cy.get(EditarReceitaLocators.dataCompetenciaInput).invoke('val').then((dataCompetencia) => {
            const [dia, mes, ano] = dataCompetencia.split('/');
            const dataVencimento = new Date(ano, mes - 1, Number(dia) + 1);
            const dataVencimentoFormatada = dataVencimento.toLocaleDateString('pt-BR');
            cy.get(EditarReceitaLocators.dataVencimentoInput)
                .clear({ force: true })
                .type(dataVencimentoFormatada, { force: true });
        });
    }

    preencherValorAleatorio() {
        cy.get(EditarReceitaLocators.modalContent).within(() => {
            cy.get(EditarReceitaLocators.valorInput).invoke('val').then((valorAtual) => {
                let novoValor;
                do {
                    novoValor = (Math.floor(Math.random() * 791) + 10).toFixed(2).replace('.', ',');
                } while (novoValor === valorAtual);
                cy.get(EditarReceitaLocators.valorInput).clear({ force: true }).type(novoValor, { force: true });
            });
        });
    }

    selecionarCliente() {
        this.selecionarValorDiferenteAtual(EditarReceitaLocators.clienteAutocomplete);
    }

    selecionarTipoDocumento() {
        this.selecionarValorDiferenteAtual(EditarReceitaLocators.tipoDocumentoAutocomplete);
    }
    selecionarValorDiferenteAtual(locator) {
        cy.get(locator)  // Localiza o autocomplete e pega o valor Atual
            .invoke('text')
            .then((valorAtual) => {
                cy.get(locator).click({ force: true });// Abre o dropdown
                cy.get('.soft-select__option')
                    .should('have.length.greaterThan', 1) // Garante que há mais de uma opção
                    .each(($opcao) => {
                        const textoOpcao = $opcao.text().trim();
                        if (textoOpcao !== valorAtual) { // Se a opção for diferente da atual, clica nela
                            cy.wrap($opcao).click({ force: true });
                            return false; // interrompe o .each apos o click
                        }
                    });
            });
    }
}

export default new EditarReceitaPage();
