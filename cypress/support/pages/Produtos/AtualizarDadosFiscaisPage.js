import AtualizarDadosFiscaisLocators from '../../locators/Produtos/AtualizarDadosFiscaisLocators';

class AtualizarDadosFiscaisPage {
  visitar() {
    cy.visit(AtualizarDadosFiscaisLocators.url);
  }

  selecionarTipo(tipo) {
    // tipo: 'vinculos', 'produto', 'servico'
    const key = `radio${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
    const seletor = AtualizarDadosFiscaisLocators.selecaoTipo[key];

    if (seletor) {
      cy.get(seletor).should('be.visible').click();
    }
    return this;
  }

  // Métodos para Vínculos Fiscais
  preencherFiltrosVinculos(dados) {
    if (dados.descricao) cy.get(AtualizarDadosFiscaisLocators.filtrosVinculos.descricao).clear().type(dados.descricao);
    if (dados.origem) cy.get(AtualizarDadosFiscaisLocators.filtrosVinculos.origem).select(dados.origem);
    if (dados.destino) cy.get(AtualizarDadosFiscaisLocators.filtrosVinculos.destino).select(dados.destino);
    if (dados.regime) cy.get(AtualizarDadosFiscaisLocators.filtrosVinculos.regime).select(dados.regime);
    if (dados.documentos) cy.get(AtualizarDadosFiscaisLocators.filtrosVinculos.documentos).select(dados.documentos);
    return this;
  }

  // Métodos para Produto
  preencherFiltrosProduto(dados) {
    if (dados.descricao) cy.get(AtualizarDadosFiscaisLocators.filtrosProduto.descricao).clear().type(dados.descricao);
    if (dados.grupo) cy.get(AtualizarDadosFiscaisLocators.filtrosProduto.grupo).select(dados.grupo, { force: true });
    if (dados.tipoItem) cy.get(AtualizarDadosFiscaisLocators.filtrosProduto.tipoItem).select(dados.tipoItem, { force: true });
    if (dados.fabricante) cy.get(AtualizarDadosFiscaisLocators.filtrosProduto.fabricante).select(dados.fabricante, { force: true });
    return this;
  }

  // Métodos para Serviço
  preencherFiltrosServico(dados) {
    if (dados.descricao) cy.get(AtualizarDadosFiscaisLocators.filtrosServico.descricao).clear().type(dados.descricao);
    if (dados.codigoTributacao) cy.get(AtualizarDadosFiscaisLocators.filtrosServico.codigoTributacao).clear().type(dados.codigoTributacao);
    return this;
  }

  aplicarFiltros() {
    cy.get(AtualizarDadosFiscaisLocators.botoes.aplicarFiltros).click();
    cy.get('#loading').should('not.exist');
    return this;
  }

  validarResultadosEncontrados() {
    cy.get(AtualizarDadosFiscaisLocators.tabela.linhas).should('have.length.greaterThan', 0);
    return this;
  }

  // Métodos para edição individual na tabela
  clicarEditarLinha(indiceLinha = 0) {
    // Aguarda a tabela carregar completamente
    cy.get(AtualizarDadosFiscaisLocators.tabela.linhas).should('have.length.greaterThan', 0);

    // Clica no link de edição da linha especificada (padrão: primeira linha)
    // O link está na primeira célula (td:first-child) da linha
    // Pode haver múltiplos links, então pegamos o primeiro que contém "edit-line" (não "salvar")
    cy.get(AtualizarDadosFiscaisLocators.tabela.linhas)
      .eq(indiceLinha)
      .find('td:first-child')
      .find('a[href*="edit-line"]')
      .not('[href*="/salvar"]') // Exclui o link de salvar
      .first()
      .should('be.visible')
      .click({ force: true });

    // Aguarda a linha entrar em modo de edição (campos ficam visíveis)
    cy.get(AtualizarDadosFiscaisLocators.tabela.linhas)
      .eq(indiceLinha)
      .find('input[type="text"]')
      .first()
      .should('be.visible');

    return this;
  }

  // Editar campos na linha (Vínculos Fiscais)
  editarCamposLinhaVinculos(dados, indiceLinha = 0) {
    // Garante que a linha está em modo edição antes de preencher
    cy.get(AtualizarDadosFiscaisLocators.tabela.linhas)
      .eq(indiceLinha)
      .find('input[type="text"]')
      .first()
      .should('exist');

    if (dados.aliquotaIcms !== undefined) {
      cy.get(AtualizarDadosFiscaisLocators.tabela.linhas)
        .eq(indiceLinha)
        .find(AtualizarDadosFiscaisLocators.camposEditaveisLinha.vinculos.aliquotaIcms)
        .scrollIntoView()
        .clear({ force: true })
        .type(dados.aliquotaIcms, { force: true });
    }
    if (dados.aliquotaPis !== undefined) {
      cy.get(AtualizarDadosFiscaisLocators.tabela.linhas)
        .eq(indiceLinha)
        .find(AtualizarDadosFiscaisLocators.camposEditaveisLinha.vinculos.aliquotaPis)
        .scrollIntoView()
        .clear({ force: true })
        .type(dados.aliquotaPis, { force: true });
    }
    if (dados.aliquotaCofins !== undefined) {
      cy.get(AtualizarDadosFiscaisLocators.tabela.linhas)
        .eq(indiceLinha)
        .find(AtualizarDadosFiscaisLocators.camposEditaveisLinha.vinculos.aliquotaCofins)
        .scrollIntoView()
        .clear({ force: true })
        .type(dados.aliquotaCofins, { force: true });
    }
    if (dados.aliquotaIpi !== undefined) {
      cy.get(AtualizarDadosFiscaisLocators.tabela.linhas)
        .eq(indiceLinha)
        .find(AtualizarDadosFiscaisLocators.camposEditaveisLinha.vinculos.aliquotaIpi)
        .scrollIntoView()
        .clear({ force: true })
        .type(dados.aliquotaIpi, { force: true });
    }

    return this;
  }

  // Editar campos na linha (Produto) - será implementado após explorar aba Produto
  editarCamposLinhaProduto() {
    // TODO: Implementar após explorar campos da aba Produto
    return this;
  }

  // Editar campos na linha (Serviço) - será implementado após explorar aba Serviço
  editarCamposLinhaServico() {
    // TODO: Implementar após explorar campos da aba Serviço
    return this;
  }

  salvarLinhaEditada(indiceLinha = 0) {
    // Clica no botão salvar da linha editada
    cy.get(AtualizarDadosFiscaisLocators.tabela.linhas)
      .eq(indiceLinha)
      .get(AtualizarDadosFiscaisLocators.tabela.linkSalvarLinha)
      .first()
      .click({ force: true });

    // Aguarda o carregamento finalizar (validação condicional, não wait fixo)
    cy.get('#loading').should('not.exist');

    // Aguarda a linha sair do modo edição (validação condicional)
    cy.get(AtualizarDadosFiscaisLocators.tabela.linhas)
      .eq(indiceLinha)
      .find('input[type="text"]')
      .should('not.exist');

    return this;
  }

  // Validar que um valor específico foi alterado na linha
  validarValorNaLinha(indiceLinha, coluna, valorEsperado) {
    cy.get(AtualizarDadosFiscaisLocators.tabela.linhas)
      .eq(indiceLinha)
      .find('td')
      .eq(coluna)
      .should('contain', valorEsperado);

    return this;
  }

  // Validar que a linha não está mais em modo edição (não possui campos de input)
  validarLinhaNaoEstaEditando(indiceLinha = 0) {
    cy.get(AtualizarDadosFiscaisLocators.tabela.linhas)
      .eq(indiceLinha)
      .find('input[type="text"]')
      .should('not.exist');

    return this;
  }

  validarSucesso() {
    // Validação genérica de sucesso (ajustar conforme feedback real: toast, swal, etc.)
    cy.contains('sucesso', { matchCase: false }).should('be.visible');
    return this;
  }
}

export default new AtualizarDadosFiscaisPage();
