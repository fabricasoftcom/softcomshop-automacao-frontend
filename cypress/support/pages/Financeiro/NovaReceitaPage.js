import 'cypress-wait-until'; // Certifique-se de que o pacote esteja instalado
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
    cy.waitUntil(() => cy.get('#autocomplete_category_list').should('be.visible'), {
      timeout: 10000,
      interval: 500
    });
    cy.contains('.category_results .category_result', categoria).click();
  }

  selecionarConta() {
    const conta = 'CAIXA';
    cy.get(NovaReceitaLocators.contaAutocomplete).type(conta, { force: true });

    // Tenta mostrar explicitamente o contêiner de opções
    cy.get(NovaReceitaLocators.contaOptionList).invoke('show');

    // Aguarda um curto período para garantir o carregamento da lista
    cy.wait(1000);

    // Clica na opção "CAIXA" na lista de resultados
    cy.contains(NovaReceitaLocators.contaOptionResult, conta).click({ force: true });
  }

  selecionarFormaPagamento(forma = 'DUPLICATA') {
    cy.get(NovaReceitaLocators.formaPagamentoAutocomplete).type(forma);
    cy.waitUntil(() => cy.get('#autocomplete_payment_method_list').should('be.visible'), {
      timeout: 10000,
      interval: 500
    });
    cy.contains('.payment_method_results .payment_method_result', forma).click();
  }

  selecionarDataCompetencia(data = '01/01/2024') {
    cy.get(NovaReceitaLocators.dataCompetenciaInput).clear().type(data);
  }

  selecionarDataVencimento(data = '01/01/2024') {
    cy.get(NovaReceitaLocators.dataVencimentoInput).clear().type(data);
  }

  preencherValor(valor = '100,00') {
    // Localiza o campo de valor usando o seletor direto dentro do formulário
    cy.get('#form-receive > :nth-child(3) > :nth-child(3)')
      .find('input')        // Encontra o input dentro da estrutura localizada
      .clear()              // Limpa o campo
      .type(valor);         // Digita o valor especificado
  }
   
  selecionarCliente(cliente = 'Cliente Padrão') {
    // Localiza o campo de autocomplete para cliente e clica no botão para exibir a lista
    cy.get(NovaReceitaLocators.clienteAutocomplete)
      .type(cliente, { force: true });  // Digita o valor no campo de cliente (se necessário)
  
    // Clica no botão para expandir o autocomplete
    cy.get('#autocomplete_client_addon').click();
  
    // Aguarda um curto período para garantir que a lista seja carregada
    cy.wait(1000);
  
    // Seleciona o segundo item na lista de resultados
    cy.get('.client_results > :nth-child(2)').click();
  }  

  selecionarTipoDocumento(tipo = 'Padrão') {
    // Localiza o campo de autocomplete para tipo de documento e digita o valor
    cy.get(NovaReceitaLocators.tipoDocumentoAutocomplete)
      .type(tipo, { force: true });  // Digita o valor no campo de tipo de documento
  
    // Aguarda um curto período para garantir que a lista seja carregada
    cy.wait(1000);
  
    // Seleciona o primeiro item na lista de resultados para o tipo de documento
    cy.get('.document_type_results .document_type_result:first-child').click();
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
    cy.get('.Toastify__toast--success', { timeout: 10000 }) // Ajusta para esperar até 10 segundos
      .should('be.visible');                 // Verifica se o Toastify de sucesso está visível
  }
  
}

export default new NovaReceitaPage();