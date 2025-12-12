import RequisicaoConsignacaoLocators from "../../locators/Consignacao/RequisicaoConsignacaoLocators";

class RequisicaoConsignacaoPage {
  // ========== MÉTODOS COMUNS ==========

  visit() {
    cy.visit('/consignacao/requisicao');
    cy.get(RequisicaoConsignacaoLocators.loading).should('not.exist');
  }

  // ========== MÉTODOS DE LISTAGEM ==========

  validarTabelaVisivel() {
    cy.get(RequisicaoConsignacaoLocators.loading).should('not.exist');
    cy.get(RequisicaoConsignacaoLocators.tabelaRequisicoes, { timeout: 10000 }).should('be.visible');
  }

  clicarNovoCadastro() {
    cy.get(RequisicaoConsignacaoLocators.btnNovoCadastro, { timeout: 10000 })
      .first()
      .should('be.visible')
      .click({ force: true });
    // Aguardar navegação para tela de cadastro
    cy.url().should('include', '/consignacao/requisicao/novo');
    cy.get(RequisicaoConsignacaoLocators.loading).should('not.exist');
  }

  abrirFormularioPesquisa() {
    cy.get(RequisicaoConsignacaoLocators.btnPesquisa).click();
    cy.get(RequisicaoConsignacaoLocators.formPesquisa, { timeout: 5000 }).should('be.visible');
  }

  preencherFiltroCodigo(codigo) {
    if (codigo) {
      cy.get(RequisicaoConsignacaoLocators.campoCodigo).clear().type(codigo);
    }
  }

  preencherFiltroCliente(cliente) {
    if (cliente) {
      cy.get(RequisicaoConsignacaoLocators.dropdownCliente).click();
      cy.get(RequisicaoConsignacaoLocators.campoCliente).clear().type(cliente);
      cy.get('.typeahead-result', { timeout: 5000 }).should('be.visible').first().click();
    }
  }

  selecionarStatus(status) {
    if (status) {
      cy.get(RequisicaoConsignacaoLocators.campoStatus).select(status);
    }
  }

  aplicarFiltros(filtros = {}) {
    this.abrirFormularioPesquisa();
    this.preencherFiltroCodigo(filtros.codigo);
    this.preencherFiltroCliente(filtros.cliente);
    this.selecionarStatus(filtros.status);
    cy.get(RequisicaoConsignacaoLocators.btnSubmitPesquisa).click({ force: true });
    cy.get(RequisicaoConsignacaoLocators.loading).should('not.exist');
    cy.get(RequisicaoConsignacaoLocators.tabelaRequisicoes).should('be.visible');
  }

  selecionarTodosRegistros() {
    cy.get(RequisicaoConsignacaoLocators.checkboxTodos).check({ force: true });
  }

  desmarcarTodosRegistros() {
    cy.get(RequisicaoConsignacaoLocators.checkboxTodos).uncheck({ force: true });
  }

  contarLinhasVisiveis() {
    return cy.get(RequisicaoConsignacaoLocators.linhasTabela, { timeout: 10000 });
  }

  // ========== MÉTODOS DE CADASTRO ==========

  visitCadastro() {
    cy.visit('/consignacao/requisicao/novo');
    cy.get(RequisicaoConsignacaoLocators.loading).should('not.exist');
  }

  preencherCliente(nomeCliente) {
    // Garantir que estamos na tela de cadastro (não na listagem)
    cy.url().should('include', '/consignacao/requisicao');
    // O campo de cadastro tem ID diferente do campo de pesquisa
    cy.get(RequisicaoConsignacaoLocators.campoClienteCadastro, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(nomeCliente);
    cy.get(RequisicaoConsignacaoLocators.resultadoCliente, { timeout: 5000 })
      .should('be.visible')
      .first()
      .click();
    cy.get(RequisicaoConsignacaoLocators.loading).should('not.exist');
  }

  preencherVendedor(nomeVendedor) {
    // Vendedor já vem preenchido por padrão, mas pode ser alterado
    if (nomeVendedor) {
      cy.get(RequisicaoConsignacaoLocators.campoVendedor).clear().type(nomeVendedor);
      cy.get(RequisicaoConsignacaoLocators.resultadoVendedor, { timeout: 5000 })
        .should('be.visible')
        .first()
        .click();
      cy.get(RequisicaoConsignacaoLocators.loading).should('not.exist');
    }
  }

  preencherObservacoes(observacoes) {
    if (observacoes) {
      cy.get(RequisicaoConsignacaoLocators.campoObservacoes).clear().type(observacoes);
    }
  }

  preencherFormulario(dados) {
    if (dados.cliente) {
      this.preencherCliente(dados.cliente);
    }
    if (dados.vendedor) {
      this.preencherVendedor(dados.vendedor);
    }
    if (dados.observacoes) {
      this.preencherObservacoes(dados.observacoes);
    }
  }

  salvarFormulario() {
    cy.get(RequisicaoConsignacaoLocators.btnSalvar).click();
    cy.get(RequisicaoConsignacaoLocators.loading).should('not.exist');
    // Após salvar, redireciona para tela de edição
    cy.url().should('include', '/consignacao/requisicao/');
    cy.url().should('include', '/editar');
  }

  validarSucesso() {
    // A mensagem de sucesso pode aparecer em diferentes formatos (alert, toast, etc)
    // Usar cy.contains para buscar por texto de sucesso
    cy.contains('sucesso', { matchCase: false, timeout: 10000 }).should('be.visible');
  }

  // ========== MÉTODOS DE PRODUTOS (Tela de Edição) ==========

  preencherProduto(nomeProduto) {
    // Buscar campo produto na seção de produtos
    // O campo está em um form que vem após o heading "Produtos"
    cy.contains('h5', 'Produtos').parent().next().within(() => {
      cy.get(RequisicaoConsignacaoLocators.campoProduto).first().clear().type(nomeProduto);
      cy.get(RequisicaoConsignacaoLocators.resultadoProduto, { timeout: 5000 })
        .should('be.visible')
        .first()
        .click();
    });
    cy.get(RequisicaoConsignacaoLocators.loading).should('not.exist');
  }

  preencherQuantidade(quantidade) {
    // Buscar campo quantidade na seção de produtos usando contexto
    cy.contains('h5', 'Produtos').parent().next().within(() => {
      cy.contains('dt', 'Quantidade').parent().find('input').clear().type(quantidade);
    });
  }

  preencherPreco(preco) {
    // Buscar campo preço na seção de produtos usando contexto
    cy.contains('h5', 'Produtos').parent().next().within(() => {
      cy.contains('dt', 'Preço').parent().find('input').clear().type(preco);
    });
  }

  adicionarItem(dadosItem) {
    if (dadosItem.produto) {
      this.preencherProduto(dadosItem.produto);
    }
    if (dadosItem.quantidade) {
      this.preencherQuantidade(dadosItem.quantidade);
    }
    if (dadosItem.preco) {
      this.preencherPreco(dadosItem.preco);
    }
    cy.get(RequisicaoConsignacaoLocators.btnAdicionarProduto).click();
    cy.get(RequisicaoConsignacaoLocators.loading).should('not.exist');
    // Validar que o item foi adicionado
    cy.get(RequisicaoConsignacaoLocators.toastSucesso, { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Item');
  }

  validarItemNaTabela(nomeProduto) {
    cy.get(RequisicaoConsignacaoLocators.tabelaItens, { timeout: 10000 }).should('be.visible');
    // A tabela deve ter pelo menos uma linha de dados (não apenas cabeçalho)
    cy.get(RequisicaoConsignacaoLocators.linhasTabelaItens, { timeout: 10000 })
      .should('have.length.at.least', 1)
      .and('not.contain', 'Nenhum resultado foi localizado');
    // Se um nome específico foi fornecido, validar que está na tabela
    if (nomeProduto) {
      cy.get(RequisicaoConsignacaoLocators.tabelaItens).should('contain.text', nomeProduto);
    }
  }
}

export default new RequisicaoConsignacaoPage();

