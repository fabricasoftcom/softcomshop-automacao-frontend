import FuncionarioListagemPage from './FuncionarioListagemPage';
import FuncionarioCadastroLocators from '../../locators/Funcionario/FuncionarioCadastroLocators';
import FuncionarioLocators from '../../locators/Funcionario/FuncionarioLocators';

class FuncionarioCadastroPage {
  /**
   * Acessa o formulário de cadastro de novo funcionário
   */
  visit() {
    FuncionarioListagemPage.acessarCadastroNovoFuncionario();
    cy.get(FuncionarioCadastroLocators.inputNome).should('be.visible');
  }

  /**
   * Verifica o layout básico do formulário (abas, botões)
   */
  verificarLayoutBasico() {
    cy.get(FuncionarioCadastroLocators.containerTabs).should('be.visible');
    cy.get(FuncionarioCadastroLocators.abaDadosCadastrais).should('be.visible');
    cy.get(FuncionarioCadastroLocators.btnVoltar).should('be.visible');
    cy.get(FuncionarioCadastroLocators.btnNovo).should('be.visible');
    cy.get(FuncionarioCadastroLocators.btnSalvar).should('be.visible');
  }

  /**
   * Preenche os campos do formulário de funcionário
   * @param {Object} funcionario - Objeto com os dados do funcionário
   */
  preencherCamposFuncionario(funcionario) {
    cy.percySnapshot('cadastro-funcionario-dados-cadastrais');

    // Campos obrigatórios
    if (funcionario.nome) {
      cy.get(FuncionarioCadastroLocators.inputNome)
        .clear()
        .type(funcionario.nome, { parseSpecialCharSequences: false });
    }

    if (funcionario.funcao) {
      this.selecionarFuncao(funcionario.funcao);
    }

    // Campos opcionais
    if (funcionario.setor) {
      this.selecionarSetor(funcionario.setor);
    }

    if (funcionario.cpf) {
      cy.get(FuncionarioCadastroLocators.inputCpf).clear().type(funcionario.cpf);
    }

    if (funcionario.rg) {
      cy.get(FuncionarioCadastroLocators.inputRg).clear().type(funcionario.rg);
    }

    if (funcionario.dataAdmissao) {
      cy.get(FuncionarioCadastroLocators.inputDataAdmissao).clear().type(funcionario.dataAdmissao);
    }

    if (funcionario.dataDemissao) {
      cy.get(FuncionarioCadastroLocators.inputDataDemissao).clear().type(funcionario.dataDemissao);
    }

    if (funcionario.cep) {
      cy.get(FuncionarioCadastroLocators.inputCep).clear().type(funcionario.cep);
    }

    if (funcionario.endereco) {
      cy.get(FuncionarioCadastroLocators.inputEndereco).clear().type(funcionario.endereco);
    }

    if (funcionario.numero) {
      cy.get(FuncionarioCadastroLocators.inputNumero).clear().type(`${funcionario.numero}`);
    }

    if (funcionario.complemento) {
      cy.get(FuncionarioCadastroLocators.inputComplemento).clear().type(funcionario.complemento);
    }

    if (funcionario.bairro) {
      this.selecionarBairro(funcionario.bairro);
    }

    if (funcionario.cidade) {
      this.selecionarCidade(funcionario.cidade);
    }

    if (funcionario.desconto !== undefined) {
      cy.get(FuncionarioCadastroLocators.inputDesconto).clear().type(funcionario.desconto);
    }

    if (funcionario.comissao !== undefined) {
      cy.get(FuncionarioCadastroLocators.inputComissao).clear().type(funcionario.comissao);
    }

    if (funcionario.supervisor !== undefined) {
      if (funcionario.supervisor) {
        cy.get(FuncionarioCadastroLocators.switcherSupervisor).check({ force: true });
        if (funcionario.numeroCartaoSupervisor) {
          cy.get(FuncionarioCadastroLocators.inputNumeroCartaoSupervisor).should('not.be.disabled');
          cy.get(FuncionarioCadastroLocators.inputNumeroCartaoSupervisor).clear().type(funcionario.numeroCartaoSupervisor);
        }
      }
    }

    if (funcionario.observacao) {
      cy.get(FuncionarioCadastroLocators.textareaObservacao).clear().type(funcionario.observacao);
    }

    if (funcionario.desativado !== undefined) {
      if (funcionario.desativado) {
        cy.get(FuncionarioCadastroLocators.switcherDesativado).check({ force: true });
      }
    }
  }

  /**
   * Seleciona uma função no autocomplete
   * @param {string} funcao - Nome da função
   */
  selecionarFuncao(funcao = 'VENDEDOR') {
    cy.get(FuncionarioCadastroLocators.funcaoAutocomplete)
      .clear()
      .type(funcao, { delay: 0 });

    cy.get(FuncionarioCadastroLocators.funcaoLista, { timeout: 5000 })
      .first()
      .click();

    cy.get(FuncionarioCadastroLocators.hiddenFuncaoId)
      .invoke('val')
      .should('not.be.empty');
  }

  /**
   * Seleciona um setor no autocomplete
   * @param {string} setor - Nome do setor
   */
  selecionarSetor(setor) {
    cy.get(FuncionarioCadastroLocators.setorAutocomplete)
      .clear()
      .type(setor, { delay: 0 });

    cy.get(FuncionarioCadastroLocators.setorLista, { timeout: 5000 })
      .first()
      .click();

    cy.get(FuncionarioCadastroLocators.hiddenSetorId)
      .invoke('val')
      .should('not.be.empty');
  }

  /**
   * Seleciona um bairro no autocomplete
   * @param {string} bairro - Nome do bairro
   */
  selecionarBairro(bairro = 'CENTRO') {
    cy.get(FuncionarioCadastroLocators.bairroAutocomplete)
      .clear()
      .type(bairro, { delay: 0 });

    cy.get(FuncionarioCadastroLocators.bairroLista, { timeout: 5000 })
      .first()
      .click();

    cy.get(FuncionarioCadastroLocators.hiddenBairro)
      .invoke('val')
      .should('not.be.empty');
  }

  /**
   * Seleciona uma cidade no autocomplete
   * @param {string} cidade - Nome da cidade
   */
  selecionarCidade(cidade = 'SAO PAULO - SP') {
    cy.get(FuncionarioCadastroLocators.cidadeAutocomplete)
      .clear()
      .type(cidade, { delay: 0 });

    cy.get(FuncionarioCadastroLocators.cidadeLista, { timeout: 5000 })
      .first()
      .click();

    cy.get(FuncionarioCadastroLocators.hiddenCidadeId)
      .invoke('val')
      .should('not.be.empty');
  }

  /**
   * Preenche localização padrão (bairro e cidade)
   */
  preencherLocalizacaoPadrao() {
    this.selecionarBairro();
    this.selecionarCidade();
  }

  /**
   * Salva o cadastro do funcionário
   */
  cadastrar() {
    cy.intercept('POST', '**/cadastro/funcionario/salvar').as('salvarFuncionario');
    cy.get(FuncionarioCadastroLocators.btnSalvar).click();
    this.tratarModalCamposObrigatoriosSeNecessario();
    cy.wait('@salvarFuncionario');
    this.confirmarSweetAlertSucessoSeExistir();
  }

  /**
   * Confirma mensagem de sucesso do cadastro
   */
  confirmacaoCadastroFuncionario() {
    cy.contains('Sucesso', { matchCase: false }).should('be.visible');
  }

  /**
   * Confirma SweetAlert de sucesso se existir
   */
  confirmarSweetAlertSucessoSeExistir() {
    cy.get('body').then(($body) => {
      const modalAberto = $body.find(FuncionarioLocators.modalConfirmDestroy).length > 0;

      if (modalAberto) {
        cy.get(FuncionarioLocators.botaoConfirmar).click({ force: true });
      }
    });
  }

  /**
   * Trata modal de campos obrigatórios se necessário
   */
  tratarModalCamposObrigatoriosSeNecessario() {
    cy.get('body').then(($body) => {
      const modalAberto = $body.find(FuncionarioLocators.modalConfirmDestroy).length > 0;

      if (!modalAberto) {
        return;
      }

      cy.get(FuncionarioLocators.tituloModal).should('contain', 'Campos obrigatórios');
      cy.get(FuncionarioLocators.botaoConfirmar).click({ force: true });
      cy.get(FuncionarioLocators.modalConfirmDestroy).should('not.exist');

      // Preenche campos obrigatórios que podem estar faltando
      // Função é obrigatória
      this.selecionarFuncao();

      cy.get(FuncionarioCadastroLocators.btnSalvar).click();
    });
  }

  /**
   * Clica no botão Voltar
   */
  voltar() {
    cy.get(FuncionarioCadastroLocators.btnVoltar).click();
  }

  /**
   * Tenta salvar sem preencher campos obrigatórios
   */
  tentarSalvarSemCamposObrigatorios() {
    cy.get(FuncionarioCadastroLocators.btnSalvar).click();
    cy.wait(1000); // Aguarda validação
  }

  /**
   * Valida mensagens de erro de campos obrigatórios
   */
  validarErroCamposObrigatorios() {
    // Valida mensagens inline "É obrigatório." (pelo menos uma deve aparecer)
    cy.contains('É obrigatório.').should('be.visible');

    // Valida alerta no topo (se existir)
    cy.get('body').then(($body) => {
      const temAlerta = $body.find('.alert, [role="alert"], .sweet-alert').length > 0;
      if (temAlerta) {
        cy.get('.alert, [role="alert"], .sweet-alert').first().should('be.visible');
      }
    });
  }

  /**
   * Preenche apenas campos obrigatórios mínimos
   */
  preencherApenasCamposObrigatorios(funcionario) {
    if (funcionario.nome) {
      cy.get(FuncionarioCadastroLocators.inputNome).clear().type(funcionario.nome);
    }
    // Função é obrigatória
    if (funcionario.funcao) {
      this.selecionarFuncao(funcionario.funcao);
    } else {
      this.selecionarFuncao();
    }
  }

  /**
   * Navega para uma aba específica
   * @param {string} nomeAba - Nome da aba (ex: "Dados Cadastrais", "Usuário")
   */
  navegarParaAba(nomeAba) {
    cy.get(`[role="tab"]:contains("${nomeAba}")`).click();
  }

  /**
   * Valida que uma aba está ativa
   * @param {string} nomeAba - Nome da aba
   */
  validarAbaAtiva(nomeAba) {
    cy.get(`[role="tab"]:contains("${nomeAba}")`).should('be.visible');
    // Valida que o conteúdo da aba está visível (pelo menos o form ou tabpanel)
    cy.get('form, [role="tabpanel"], .tab-content').should('be.visible');
  }

  /**
   * Valida que todas as abas são acessíveis
   */
  validarTodasAbasAcessiveis() {
    const abas = [
      'Dados Cadastrais',
      'Usuário'
    ];

    abas.forEach(aba => {
      cy.get(`[role="tab"]:contains("${aba}")`).should('be.visible');
    });
  }

  /**
   * Clica no botão Voltar e valida retorno para listagem
   */
  clicarBotaoVoltar() {
    cy.get(FuncionarioCadastroLocators.btnVoltar).click();
  }

  /**
   * Valida que retornou para a listagem
   */
  validarRetornoListagem() {
    cy.url().should('include', '/cadastro/funcionario');
    cy.url().should('not.include', '/novo');
    cy.url().should('not.match', /\/editar/);
  }

  /**
   * Clica no botão de buscar CEP
   */
  clicarBuscarCep() {
    cy.get(FuncionarioCadastroLocators.btnBuscarCep).first().click();
  }

  /**
   * Valida autocomplete de função isoladamente
   */
  validarAutocompleteFuncao(funcao = 'VENDEDOR') {
    cy.get(FuncionarioCadastroLocators.funcaoAutocomplete)
      .clear()
      .type(funcao, { delay: 0 });

    cy.get(FuncionarioCadastroLocators.funcaoLista, { timeout: 5000 })
      .should('be.visible')
      .first()
      .click();

    cy.get(FuncionarioCadastroLocators.hiddenFuncaoId)
      .invoke('val')
      .should('not.be.empty');
  }

  /**
   * Valida autocomplete de bairro isoladamente
   */
  validarAutocompleteBairro(bairro = 'CENTRO') {
    cy.get(FuncionarioCadastroLocators.bairroAutocomplete)
      .clear()
      .type(bairro, { delay: 0 });

    cy.get(FuncionarioCadastroLocators.bairroLista, { timeout: 5000 })
      .should('be.visible')
      .first()
      .click();

    cy.get(FuncionarioCadastroLocators.hiddenBairro)
      .invoke('val')
      .should('not.be.empty');
  }

  /**
   * Valida autocomplete de cidade isoladamente
   */
  validarAutocompleteCidade(cidade = 'SAO PAULO - SP') {
    cy.get(FuncionarioCadastroLocators.cidadeAutocomplete)
      .clear()
      .type(cidade, { delay: 0 });

    cy.get(FuncionarioCadastroLocators.cidadeLista, { timeout: 5000 })
      .should('be.visible')
      .first()
      .click();

    cy.get(FuncionarioCadastroLocators.hiddenCidadeId)
      .invoke('val')
      .should('not.be.empty');
  }

  /**
   * Acessa edição de funcionário existente pela listagem
   */
  acessarEdicaoFuncionario() {
    FuncionarioListagemPage.acessarTelaListagem();
    // Clica no primeiro link de edição da tabela (não do mobile)
    // Usa seletor da tabela para evitar links do mobile que podem estar ocultos
    cy.get('table.table-hover tbody tr').first().within(() => {
      cy.get('a[href*="/editar"]').first().click({ force: true });
    });
    cy.url().should('match', /\/cadastro\/funcionario\/\d+\/editar/);
  }

  /**
   * Valida que dados foram carregados na edição
   * @param {Object} funcionario - Objeto com dados esperados
   */
  validarDadosCarregados(funcionario) {
    if (funcionario.nome) {
      cy.get(FuncionarioCadastroLocators.inputNome).should('have.value', funcionario.nome);
    }
    if (funcionario.cpf) {
      cy.get(FuncionarioCadastroLocators.inputCpf).should('have.value', funcionario.cpf);
    }
    if (funcionario.rg) {
      cy.get(FuncionarioCadastroLocators.inputRg).should('have.value', funcionario.rg);
    }
  }

  /**
   * Edita um campo específico
   * @param {string} campo - Nome do campo (ex: 'nome', 'cpf')
   * @param {string} valor - Novo valor
   */
  editarCampo(campo, valor) {
    const locators = {
      nome: FuncionarioCadastroLocators.inputNome,
      cpf: FuncionarioCadastroLocators.inputCpf,
      rg: FuncionarioCadastroLocators.inputRg,
      observacao: FuncionarioCadastroLocators.textareaObservacao
    };

    const locator = locators[campo];
    if (locator) {
      cy.get(locator).clear().type(valor);
    }
  }

  /**
   * Salva edição (mesmo método de cadastro, mas pode ter validações diferentes)
   */
  salvarEdicao() {
    this.cadastrar();
  }
}

export default new FuncionarioCadastroPage();

