import DevolucaoConsignacaoLocators from "../../locators/Consignacao/DevolucaoConsignacaoLocators";

class DevolucaoConsignacaoPage {
  // ========== MÉTODOS COMUNS ==========

  visit() {
    cy.visit('/consignacao/devolucao');
    cy.get(DevolucaoConsignacaoLocators.loading).should('not.exist');
  }

  // ========== MÉTODOS DE LISTAGEM ==========

  validarTabelaVisivel() {
    cy.get(DevolucaoConsignacaoLocators.loading).should('not.exist');
    cy.get(DevolucaoConsignacaoLocators.tabelaDevolucoes, { timeout: 10000 }).should('be.visible');
  }

  clicarNovoCadastro() {
    cy.get(DevolucaoConsignacaoLocators.btnNovoCadastro, { timeout: 10000 })
      .first()
      .should('be.visible')
      .click({ force: true });
    // Aguardar navegação para tela de cadastro
    cy.url().should('include', '/consignacao/devolucao/novo');
    cy.get(DevolucaoConsignacaoLocators.loading).should('not.exist');
  }

  abrirFormularioPesquisa() {
    // O botão de pesquisa pode ter múltiplos matches, usar first() para pegar o primeiro
    // Buscar o botão que está próximo ao título "Listagem de Devoluções"
    cy.contains('h5', 'Listagem de Devoluções').parent().within(() => {
      cy.get('a[href="#"]').first().click();
    });
    // Aguardar o formulário aparecer (pode estar oculto inicialmente)
    cy.get(DevolucaoConsignacaoLocators.formPesquisa, { timeout: 5000 }).should('be.visible');
  }

  validarFormularioPesquisaVisivel() {
    cy.get(DevolucaoConsignacaoLocators.formPesquisa).should('be.visible');
  }

  preencherFiltroPeriodo(periodo) {
    if (periodo) {
      cy.get(DevolucaoConsignacaoLocators.campoPeriodo).clear().type(periodo);
    }
  }

  preencherFiltroCliente(cliente) {
    if (cliente) {
      cy.get(DevolucaoConsignacaoLocators.campoClientePesquisa).clear().type(cliente);
      cy.get('.typeahead-result', { timeout: 5000 }).should('be.visible').first().click();
    }
  }

  preencherFiltroVendedor(vendedor) {
    if (vendedor) {
      cy.get(DevolucaoConsignacaoLocators.campoVendedorPesquisa).clear().type(vendedor);
      cy.get('.typeahead-result', { timeout: 5000 }).should('be.visible').first().click();
    }
  }

  aplicarFiltros(filtros = {}) {
    this.abrirFormularioPesquisa();
    this.preencherFiltroPeriodo(filtros.periodo);
    this.preencherFiltroCliente(filtros.cliente);
    this.preencherFiltroVendedor(filtros.vendedor);
    cy.get(DevolucaoConsignacaoLocators.btnPesquisar).click({ force: true });
    cy.get(DevolucaoConsignacaoLocators.loading).should('not.exist');
    cy.get(DevolucaoConsignacaoLocators.tabelaDevolucoes).should('be.visible');
  }

  selecionarTodosRegistros() {
    cy.get(DevolucaoConsignacaoLocators.checkboxTodos).check({ force: true });
  }

  validarTodosRegistrosSelecionados() {
    cy.get(`${DevolucaoConsignacaoLocators.linhasTabela} ${DevolucaoConsignacaoLocators.checkboxLinha}`).should('be.checked');
  }

  desmarcarTodosRegistros() {
    cy.get(DevolucaoConsignacaoLocators.checkboxTodos).uncheck({ force: true });
  }

  validarNenhumRegistroSelecionado() {
    cy.get(`${DevolucaoConsignacaoLocators.linhasTabela} ${DevolucaoConsignacaoLocators.checkboxLinha}`).should('not.be.checked');
  }

  contarLinhasVisiveis() {
    return cy.get(DevolucaoConsignacaoLocators.linhasTabela).filter(':visible');
  }

  // ========== MÉTODOS DE CADASTRO ==========

  visitCadastro() {
    cy.visit('/consignacao/devolucao/novo');
    cy.get(DevolucaoConsignacaoLocators.loading).should('not.exist');
  }

  preencherCliente(nomeCliente) {
    // Garantir que estamos na tela de cadastro (não na listagem)
    cy.url().should('include', '/consignacao/devolucao');
    // O campo de cadastro tem ID diferente do campo de pesquisa
    cy.get(DevolucaoConsignacaoLocators.campoClienteCadastro, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(nomeCliente);
    cy.get(DevolucaoConsignacaoLocators.resultadoCliente, { timeout: 5000 })
      .should('be.visible')
      .first()
      .click();
    cy.get(DevolucaoConsignacaoLocators.loading).should('not.exist');
  }

  preencherVendedor(nomeVendedor) {
    // Vendedor já vem preenchido por padrão, mas pode ser alterado
    if (nomeVendedor) {
      cy.get(DevolucaoConsignacaoLocators.campoVendedor).clear().type(nomeVendedor);
      cy.get(DevolucaoConsignacaoLocators.resultadoVendedor, { timeout: 5000 })
        .should('be.visible')
        .first()
        .click();
      cy.get(DevolucaoConsignacaoLocators.loading).should('not.exist');
    }
  }

  preencherObservacoes(observacoes) {
    if (observacoes) {
      cy.get(DevolucaoConsignacaoLocators.campoObservacoes).clear().type(observacoes);
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
    cy.get(DevolucaoConsignacaoLocators.btnSalvar).click();
    cy.get(DevolucaoConsignacaoLocators.loading).should('not.exist');
    // Após salvar, redireciona para tela de edição
    cy.url().should('include', '/consignacao/devolucao/');
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
    cy.contains('h5', 'Produtos').parent().next().within(() => {
      cy.get('input.autocompleter.typeahead').first().clear().type(nomeProduto);
      cy.get(DevolucaoConsignacaoLocators.resultadoProduto, { timeout: 5000 })
        .should('be.visible')
        .first()
        .click();
    });
    cy.get(DevolucaoConsignacaoLocators.loading).should('not.exist');
  }

  preencherDevolucao(quantidade) {
    // Buscar campo devolução na seção de produtos usando contexto
    cy.contains('h5', 'Produtos').parent().next().within(() => {
      cy.contains('dt', 'Devolução').parent().find('input').clear().type(quantidade);
    });
  }

  preencherVenda(quantidade) {
    // Buscar campo venda na seção de produtos usando contexto
    cy.contains('h5', 'Produtos').parent().next().within(() => {
      cy.contains('dt', 'Venda').parent().find('input').clear().type(quantidade);
    });
  }

  adicionarItem(dadosItem) {
    if (dadosItem.produto) {
      this.preencherProduto(dadosItem.produto);
    }
    if (dadosItem.devolucao) {
      this.preencherDevolucao(dadosItem.devolucao);
    }
    if (dadosItem.venda) {
      this.preencherVenda(dadosItem.venda);
    }
    // Buscar botão adicionar na seção de produtos
    cy.contains('h5', 'Produtos').parent().next().within(() => {
      cy.contains('button', 'Adicionar').click();
    });
    cy.get(DevolucaoConsignacaoLocators.loading).should('not.exist');
  }

  validarItemNaTabela(nomeProduto = null) {
    cy.get(DevolucaoConsignacaoLocators.tabelaItens, { timeout: 10000 }).should('be.visible');
    // A tabela deve ter pelo menos uma linha de dados (não apenas cabeçalho)
    cy.get(DevolucaoConsignacaoLocators.linhasTabelaItens, { timeout: 10000 })
      .should('have.length.at.least', 1)
      .and('not.contain', 'Nenhum resultado foi localizado');
    // Se um nome específico foi fornecido, validar que ele está na tabela
    if (nomeProduto) {
      cy.get(DevolucaoConsignacaoLocators.tabelaItens).should('contain.text', nomeProduto);
    }
  }
}

export default new DevolucaoConsignacaoPage();

