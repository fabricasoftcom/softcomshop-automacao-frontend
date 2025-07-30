import 'cypress-wait-until'; // Certifique-se de que o pacote esteja instalado
import menulateralfinanceiropage from "../menulateral/menulateralfinanceiropage";
import NovaReceitaLocators from "../../locators/NovaReceitaLocators";
import ListagemContasAReceberPage from "./ListagemContasAReceberPage";

class NovaReceitaPage {
  abrirModal() {
    menulateralfinanceiropage.acessarListagemContasReceberReceita();
    ListagemContasAReceberPage.abrirNovoCadastro();
    cy.get(NovaReceitaLocators.modalContent, { timeout: 30000 }).should('be.visible');
  }

  fecharModal() {
    cy.get(NovaReceitaLocators.closeButton).click();
  }

  preencherDescricao(descricao = 'Descrição padrão de teste') {
    cy.get(NovaReceitaLocators.descricaoInput).clear().type(descricao);
  }

  selecionarCategoria(categoria) {
    cy.get(NovaReceitaLocators.categoriaAutocomplete).type(categoria);
    cy.get('.soft-select__option').should('be.visible');
    cy.get('.soft-select__option')
      .filter((_, el) => el.innerText.trim().toLowerCase() === categoria.toLowerCase())
      .click();
  }

  selecionarConta() {
    const conta = 'CAIXA';
    cy.get(NovaReceitaLocators.contaAutocomplete).type(conta);
    // Clica na opção "CAIXA" na lista de resultados
    cy.contains(NovaReceitaLocators.contaOptionResult, conta).click({ force: true });
  }

  selecionarFormaPagamento(forma) {
    cy.get(NovaReceitaLocators.formaPagamentoAutocomplete).type(forma);
    cy.get('.soft-select__option').should('be.visible')
    cy.get('.soft-select__option')
      .filter((_, el) => el.innerText.trim().toLowerCase() === forma.toLowerCase())
      .click();
  }

  selecionarDataCompetencia(data = '01/01/2024') {
    cy.get(NovaReceitaLocators.dataCompetenciaInput).clear().type(data);
  }

  selecionarDataVencimento(data = '01/01/2024') {
    cy.get(NovaReceitaLocators.dataVencimentoInput).clear().type(data);
  }

  preencherValor(valor = '100,00') {
    // Localiza o campo de valor usando o seletor direto dentro do formulário
    cy.get(NovaReceitaLocators.valorInput)
      .clear()              // Limpa o campo
      .type(valor);         // Digita o valor especificado
  }

  selecionarCliente(cliente = 'Cliente Padrão') {
    // Localiza o campo de autocomplete para cliente e clica no botão para exibir a lista
    cy.get(NovaReceitaLocators.clienteAutocomplete)
      .type(cliente);  // Digita o valor no campo de cliente (se necessário)
    // Seleciona o segundo item na lista de resultados
    cy.get('.soft-select__option').eq(1).click();
  }

  selecionarTipoDocumento(tipo = 'Padrão') {
    // Localiza o campo de autocomplete para tipo de documento e digita o valor
    cy.get(NovaReceitaLocators.tipoDocumentoAutocomplete)
      .type(tipo);  // Digita o valor no campo de tipo de documento
    // Seleciona o primeiro item na lista de resultados para o tipo de documento
    cy.get('.soft-select__option').first().click();
  }
  preencherNumeroDocumento(numero = '12345') {
    cy.get(NovaReceitaLocators.numeroDocumentoInput).clear().type(numero);
  }

  clicarRepetir() {
    cy.get(NovaReceitaLocators.repetirButton).click();
  }

  clicarOutrasInformacoes() {
    cy.get(NovaReceitaLocators.outrasInformacoesButton).click();
  }

  clicarAnexarArquivos() {
    cy.get(NovaReceitaLocators.anexarArquivosButton).click();
  }

  clicarVoltar() {
    cy.get(NovaReceitaLocators.voltarButton).click();
  }

  clicarSalvar() {
    // Limita a busca do botão "Salvar" ao modal "Nova Receita"
    cy.get('.modal-content')                 // Seleciona o escopo do modal
      .find('.btn-primary')                  // Busca o botão "Salvar" dentro do modal
      .click();                              // Clica no botão "Salvar"

    // Aguarda até que o Toastify de sucesso seja exibido
    // cy.get('.Toastify__toast--success', { timeout: 10000 }) // Ajusta para esperar até 10 segundos
    //   .should('be.visible');                 // Verifica se o Toastify de sucesso está visível
  }
}

export default new NovaReceitaPage();
