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
          // .should('be.visible') // Aguarda até que o botão esteja visível
          .click({force: true});
    }

    clicarVoltar() {
        cy.get(EditarReceitaLocators.modalContent)
          .find(EditarReceitaLocators.voltarButton) // Garantia do botão Voltar correto
          .click({force: true});
    }

    // Métodos de preenchimento de campos

    preencherDescricao(descricao) {
        cy.get(EditarReceitaLocators.descricaoInput)
          .clear({force: true})
          .type(descricao, {force: true});
    }

    selecionarCategoria(categoria = "RECEITA") {
        cy.get(EditarReceitaLocators.categoriaAutocomplete).invoke('val').then((categoriaAtual) => {
            const valorParaPreencher = categoriaAtual || categoria;
            cy.get(EditarReceitaLocators.categoriaAutocomplete)
              .clear({force: true})
              .type(valorParaPreencher, {force: true});
            cy.get(EditarReceitaLocators.categoriaResults)
              .contains(valorParaPreencher)
              .click({force: true});
        });
    }

    selecionarConta(conta = "CAIXA") {
        cy.get(EditarReceitaLocators.modalContent).within(() => {
            cy.get(EditarReceitaLocators.contaAutocomplete).invoke('val').then((contaAtual) => {
                const valorParaPreencher = contaAtual || conta;
                cy.get(EditarReceitaLocators.contaAutocomplete)
                  .clear({force: true})
                  .type(valorParaPreencher, {force: true});
                cy.get(EditarReceitaLocators.contaResults)
                  .should('be.visible')
                  .contains(valorParaPreencher)
                  .click({force: true});
            });
        });
    }

    selecionarFormaPagamento(formaPagamento = "DUPLICATA") {
        cy.get(EditarReceitaLocators.formaPagamentoAutocomplete).invoke('val').then((formaAtual) => {
            const valorParaPreencher = formaAtual || formaPagamento;
            cy.get(EditarReceitaLocators.formaPagamentoAutocomplete)
              .clear({force: true})
              .type(valorParaPreencher, {force: true});
            cy.get(EditarReceitaLocators.formaPagamentoResults)
              .should('be.visible')
              .contains(valorParaPreencher)
              .click({force: true});
        });
    }

    preencherDataVencimento() {
        cy.get(EditarReceitaLocators.dataCompetenciaInput).invoke('val').then((dataCompetencia) => {
            const [dia, mes, ano] = dataCompetencia.split('/');
            const dataVencimento = new Date(ano, mes - 1, Number(dia) + 1);
            const dataVencimentoFormatada = dataVencimento.toLocaleDateString('pt-BR');
            cy.get(EditarReceitaLocators.dataVencimentoInput)
              .clear({force: true})
              .type(dataVencimentoFormatada, {force: true});
        });
    }

    preencherValorAleatorio() {
        cy.get(EditarReceitaLocators.modalContent).within(() => {
            cy.get(EditarReceitaLocators.valorInput).invoke('val').then((valorAtual) => {
                let novoValor;
                do {
                    novoValor = (Math.floor(Math.random() * 791) + 10).toFixed(2).replace('.', ',');
                } while (novoValor === valorAtual);
                cy.get(EditarReceitaLocators.valorInput).clear({force: true}).type(novoValor, {force: true});
            });
        });
    }

    selecionarCliente() {
        cy.get(EditarReceitaLocators.clienteAutocomplete).invoke('val').then((clienteAtual) => {
            cy.get(EditarReceitaLocators.clienteAutocomplete).clear({ force: true }).click();
            cy.get(EditarReceitaLocators.clienteResults).should('be.visible').then(($clientes) => {
                const clientesDisponiveis = Cypress.$($clientes).map((_, cliente) => cliente.innerText).get();
                const clientesValidos = clientesDisponiveis.filter(cliente => cliente !== clienteAtual && cliente !== "CONSUMIDOR");
                const clienteParaSelecionar = clientesValidos.length > 0 ? clientesValidos[0] : clientesDisponiveis[0];
                cy.contains(EditarReceitaLocators.clienteResults, clienteParaSelecionar).click({ force: true });
            });
        });
    }

    selecionarTipoDocumento(tipoDocumento = "PADRÃO") {
        cy.get(EditarReceitaLocators.tipoDocumentoAutocomplete).invoke('val').then((tipoAtual) => {
            const valorParaPreencher = tipoAtual || tipoDocumento;
            cy.get(EditarReceitaLocators.tipoDocumentoAutocomplete)
              .clear({force: true})
              .type(valorParaPreencher, {force: true});
            cy.get(EditarReceitaLocators.tipoDocumentoResults)
              .contains(valorParaPreencher)
              .click({force: true});
        });
    }
}

export default new EditarReceitaPage();
