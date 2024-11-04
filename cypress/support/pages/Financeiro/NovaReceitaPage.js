import menulateralfinanceiropage from "../menulateral/menulateralfinanceiropage";
import NovaReceitaLocators from "../../locators/NovaReceitaLocators";
import ListagemContasAReceberPage from "./ListagemContasAReceberPage";

class NovaReceitaPage {
  abrirModal() {
    menulateralfinanceiropage.acessarListagemContasReceberReceita();
    ListagemContasAReceberPage.clicarNovoCadastro();
    cy.get(NovaReceitaLocators.modalContent, { timeout: 30000 }).should('be.visible');
  }

  fecharModal() {
    cy.get(NovaReceitaLocators.closeButton).click();
  }

  preencherDescricao(descricao = 'Descrição padrão de teste') {
    cy.get(NovaReceitaLocators.descricaoInput).clear().type(descricao);
  }

  selecionarCategoria(categoria = 'RECEITA') {
    cy.get(NovaReceitaLocators.categoriaAutocomplete).type(categoria);
    // Aguarda até que a opção com o texto correspondente apareça na lista e a seleciona
    cy.contains(NovaReceitaLocators.categoriaOption, categoria).should('be.visible').click();
  }

  selecionarConta(conta = 'Conta Padrão') {
    cy.get(NovaReceitaLocators.contaAutocomplete).type(conta);
    // Aguarda até que a opção com o texto correspondente apareça na lista e a seleciona
    cy.contains(NovaReceitaLocators.contaOption, conta).should('be.visible').click();
  }

  selecionarFormaPagamento(forma = 'DUPLICATA') {
    cy.get(NovaReceitaLocators.formaPagamentoAutocomplete).type(forma);
    // Aguarda até que a opção com o texto correspondente apareça na lista e a seleciona
    cy.contains(NovaReceitaLocators.formaPagamentoOption, forma).should('be.visible').click();
  }

  selecionarDataCompetencia(data = '01/01/2024') {
    cy.get(NovaReceitaLocators.dataCompetenciaInput).clear().type(data);
  }

  selecionarDataVencimento(data = '01/01/2024') {
    cy.get(NovaReceitaLocators.dataVencimentoInput).clear().type(data);
  }

  preencherValor(valor = '100,00') {
    cy.get(NovaReceitaLocators.valorInput).clear().type(valor);
  }

  selecionarCliente(cliente = 'Cliente Padrão') {
    cy.get(NovaReceitaLocators.clienteAutocomplete).type(cliente);
    // Aguarda até que a opção com o texto correspondente apareça na lista e a seleciona
    cy.contains(NovaReceitaLocators.clienteOption, cliente).should('be.visible').click();
  }

  selecionarTipoDocumento(tipo = 'PADRÃO') {
    cy.get(NovaReceitaLocators.tipoDocumentoAutocomplete).type(tipo);
    // Aguarda até que a opção com o texto correspondente apareça na lista e a seleciona
    cy.contains(NovaReceitaLocators.tipoDocumentoOption, tipo).should('be.visible').click();
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
    cy.get(NovaReceitaLocators.salvarButton).click();
  }
}

export default new NovaReceitaPage();
