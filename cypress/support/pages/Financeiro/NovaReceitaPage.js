import 'cypress-wait-until'; // Certifique-se de que o pacote esteja instalado
import MenulateralFinanceiroPage from "../menulateral/MenulateralFinanceiroPage";
import NovaReceitaLocators from "../../locators/Financeiro/NovaReceitaLocators";
import ListagemContasAReceberPage from "./ListagemContasAReceberPage";

class NovaReceitaPage {
  abrirModal() {
    MenulateralFinanceiroPage.acessarListagemContasReceberReceita();
    ListagemContasAReceberPage.abrirNovoCadastro();
    // Valida elemento funcional ao invés de container (pode ter display: none)
    cy.get(NovaReceitaLocators.descricaoInput, { timeout: 30000 })
        .should('be.visible')
        .and('not.be.disabled');
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
    cy.get('.soft-select__option').should('be.visible').eq(1).click();
  }

  selecionarTipoDocumento(tipo = 'Padrão') {
    // Localiza o campo de autocomplete para tipo de documento e digita o valor
    cy.get(NovaReceitaLocators.tipoDocumentoAutocomplete)
      .type(tipo);  // Digita o valor no campo de tipo de documento
    // Seleciona o primeiro item na lista de resultados para o tipo de documento
    cy.get('.soft-select__option').should('be.visible').first().click();
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
    // Validação de sucesso removida - deve estar no spec, não no Page Object
    cy.get(NovaReceitaLocators.salvarButton).click();
  }
}

export default new NovaReceitaPage();
