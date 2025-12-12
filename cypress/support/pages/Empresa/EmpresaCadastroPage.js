import EmpresaListagemPage from './EmpresaListagemPage';
import EmpresaCadastroLocators from '../../locators/Empresa/EmpresaCadastroLocators';
import EmpresaLocators from '../../locators/Empresa/EmpresaLocators';

class EmpresaCadastroPage {
  /**
   * Acessa o formulário de cadastro de nova empresa
   */
  visit() {
    EmpresaListagemPage.acessarCadastroNovaEmpresa();
    cy.get(EmpresaCadastroLocators.inputCnpj).should('be.visible');
  }

  /**
   * Verifica o layout básico do formulário (abas, botões)
   */
  verificarLayoutBasico() {
    cy.get(EmpresaCadastroLocators.containerTabs).should('be.visible');
    cy.get(EmpresaCadastroLocators.abaDadosCadastrais).should('be.visible');
    cy.get(EmpresaCadastroLocators.btnVoltar).should('be.visible');
    cy.get(EmpresaCadastroLocators.btnNovo).should('be.visible');
    cy.get(EmpresaCadastroLocators.btnSalvar).should('be.visible');
  }

  /**
   * Preenche os campos do formulário de empresa
   * @param {Object} empresa - Objeto com os dados da empresa
   */
  preencherCamposEmpresa(empresa) {
    cy.percySnapshot('cadastro-empresa-dados-cadastrais');

    // Campos obrigatórios
    if (empresa.cnpj) {
      cy.get(EmpresaCadastroLocators.inputCnpj)
        .clear()
        .type(empresa.cnpj, { log: false });
    }

    if (empresa.nome) {
      cy.get(EmpresaCadastroLocators.inputNome)
        .clear()
        .type(empresa.nome, { parseSpecialCharSequences: false });
    }

    if (empresa.fantasia) {
      cy.get(EmpresaCadastroLocators.inputFantasia)
        .clear()
        .type(empresa.fantasia, { parseSpecialCharSequences: false });
    }

    if (empresa.razaoSocial) {
      cy.get(EmpresaCadastroLocators.inputRazaoSocial)
        .clear()
        .type(empresa.razaoSocial, { parseSpecialCharSequences: false });
    }

    if (empresa.nomeImpressao) {
      cy.get(EmpresaCadastroLocators.selectNomeImpressao).select(empresa.nomeImpressao);
    }

    // Campos opcionais
    if (empresa.inscricaoEstadual) {
      cy.get(EmpresaCadastroLocators.inputInscricaoEstadual).clear().type(empresa.inscricaoEstadual);
    }

    if (empresa.inscricaoMunicipal) {
      cy.get(EmpresaCadastroLocators.inputInscricaoMunicipal).clear().type(empresa.inscricaoMunicipal);
    }

    if (empresa.cep) {
      cy.get(EmpresaCadastroLocators.inputCep).clear().type(empresa.cep);
    }

    if (empresa.endereco) {
      cy.get(EmpresaCadastroLocators.inputEndereco).clear().type(empresa.endereco);
    }

    if (empresa.numero) {
      cy.get(EmpresaCadastroLocators.inputNumero).clear().type(`${empresa.numero}`);
    }

    if (empresa.complemento) {
      cy.get(EmpresaCadastroLocators.inputComplemento).clear().type(empresa.complemento);
    }

    if (empresa.bairro) {
      this.selecionarBairro(empresa.bairro);
    }

    if (empresa.cidade) {
      this.selecionarCidade(empresa.cidade);
    }

    if (empresa.ddd) {
      cy.get(EmpresaCadastroLocators.inputDdd).clear().type(empresa.ddd);
    }

    if (empresa.telefone) {
      cy.get(EmpresaCadastroLocators.inputTelefone).clear().type(empresa.telefone);
    }

    if (empresa.email) {
      cy.get(EmpresaCadastroLocators.inputEmail).clear().type(empresa.email);
    }
  }

  /**
   * Seleciona um bairro no autocomplete
   * @param {string} bairro - Nome do bairro
   */
  selecionarBairro(bairro = 'CENTRO') {
    cy.get(EmpresaCadastroLocators.bairroAutocomplete)
      .clear()
      .type(bairro, { delay: 0 });

    cy.get(EmpresaCadastroLocators.bairroLista, { timeout: 5000 })
      .first()
      .click();

    cy.get(EmpresaCadastroLocators.hiddenBairro)
      .invoke('val')
      .should('not.be.empty');
  }

  /**
   * Seleciona uma cidade no autocomplete
   * @param {string} cidade - Nome da cidade
   */
  selecionarCidade(cidade = 'SAO PAULO') {
    cy.get(EmpresaCadastroLocators.cidadeAutocomplete)
      .clear()
      .type(cidade, { delay: 0 });

    cy.get(EmpresaCadastroLocators.cidadeLista, { timeout: 5000 })
      .first()
      .click();

    cy.get(EmpresaCadastroLocators.hiddenCidade)
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
   * Salva o cadastro da empresa
   */
  cadastrar() {
    cy.intercept('POST', '**/cadastro/empresa/salvar').as('salvarEmpresa');
    cy.get(EmpresaCadastroLocators.btnSalvar).click();
    this.tratarModalCamposObrigatoriosSeNecessario();
    cy.wait('@salvarEmpresa');
    this.confirmarSweetAlertSucessoSeExistir();
  }

  /**
   * Confirma mensagem de sucesso do cadastro
   */
  confirmacaoCadastroEmpresa() {
    cy.contains('Sucesso', { matchCase: false }).should('be.visible');
  }

  /**
   * Confirma SweetAlert de sucesso se existir
   */
  confirmarSweetAlertSucessoSeExistir() {
    cy.get('body').then(($body) => {
      const modalAberto = $body.find(EmpresaLocators.modalConfirmDestroy).length > 0;

      if (modalAberto) {
        cy.get(EmpresaLocators.botaoConfirmar).click({ force: true });
      }
    });
  }

  /**
   * Trata modal de campos obrigatórios se necessário
   */
  tratarModalCamposObrigatoriosSeNecessario() {
    cy.get('body').then(($body) => {
      const modalAberto = $body.find(EmpresaLocators.modalConfirmDestroy).length > 0;

      if (!modalAberto) {
        return;
      }

      cy.get(EmpresaLocators.tituloModal).should('contain', 'Campos obrigatórios');
      cy.get(EmpresaLocators.botaoConfirmar).click({ force: true });
      cy.get(EmpresaLocators.modalConfirmDestroy).should('not.exist');

      // Preenche campos obrigatórios que podem estar faltando
      this.preencherLocalizacaoPadrao();

      cy.get(EmpresaCadastroLocators.btnSalvar).click();
    });
  }

  /**
   * Clica no botão Voltar
   */
  voltar() {
    cy.get(EmpresaCadastroLocators.btnVoltar).click();
  }

  /**
   * Tenta salvar sem preencher campos obrigatórios
   */
  tentarSalvarSemCamposObrigatorios() {
    cy.get(EmpresaCadastroLocators.btnSalvar).click();
    cy.wait(1000); // Aguarda validação
  }

  /**
   * Valida mensagens de erro de campos obrigatórios
   */
  validarErroCamposObrigatorios() {
    // Valida mensagens inline "É obrigatório." (pelo menos uma deve aparecer)
    cy.contains('É obrigatório.').should('be.visible');

    // Valida alerta no topo (se existir)
    // O alerta pode aparecer de diferentes formas, então validamos de forma flexível
    cy.get('body').then(($body) => {
      const temAlerta = $body.find('.alert, [role="alert"], .sweet-alert').length > 0;
      if (temAlerta) {
        cy.get('.alert, [role="alert"], .sweet-alert').first().should('be.visible');
      }
      // Se não houver alerta, ainda validamos que as mensagens inline estão presentes
    });
  }

  /**
   * Preenche apenas campos obrigatórios mínimos
   */
  preencherApenasCamposObrigatorios(empresa) {
    if (empresa.cnpj) {
      cy.get(EmpresaCadastroLocators.inputCnpj).clear().type(empresa.cnpj, { log: false });
    }
    if (empresa.nome) {
      cy.get(EmpresaCadastroLocators.inputNome).clear().type(empresa.nome);
    }
    if (empresa.fantasia) {
      cy.get(EmpresaCadastroLocators.inputFantasia).clear().type(empresa.fantasia);
    }
    if (empresa.razaoSocial) {
      cy.get(EmpresaCadastroLocators.inputRazaoSocial).clear().type(empresa.razaoSocial);
    }
    // Cidade é obrigatória
    if (empresa.cidade) {
      this.selecionarCidade(empresa.cidade);
    } else {
      this.selecionarCidade();
    }
  }

  /**
   * Navega para uma aba específica
   * @param {string} nomeAba - Nome da aba (ex: "Dados Cadastrais", "Certificado Sefaz")
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
      'Certificado Sefaz',
      'Envio de Emails',
      'Dispositivos',
      'Logo',
      'CPFs/CNPJs Autorizados',
      'Configurações',
      'Configuração de chaves'
    ];

    abas.forEach(aba => {
      cy.get(`[role="tab"]:contains("${aba}")`).should('be.visible');
    });
  }

  /**
   * Valida conteúdo básico de uma aba
   * @param {string} nomeAba - Nome da aba
   */
  validarConteudoAba(nomeAba) {
    this.navegarParaAba(nomeAba);
    this.validarAbaAtiva(nomeAba);
    // Valida que o conteúdo da aba está visível (pelo menos o form ou container)
    cy.get('form, [role="tabpanel"]').should('be.visible');
  }

  /**
   * Clica no botão Voltar e valida retorno para listagem
   */
  clicarBotaoVoltar() {
    cy.get(EmpresaCadastroLocators.btnVoltar).click();
  }

  /**
   * Valida que retornou para a listagem
   */
  validarRetornoListagem() {
    cy.url().should('include', '/cadastro/empresa');
    cy.url().should('not.include', '/novo');
    cy.url().should('not.match', /\/editar/);
  }

  /**
   * Clica no botão de buscar CEP
   */
  clicarBuscarCep() {
    cy.get(EmpresaCadastroLocators.btnBuscarCep).first().click();
  }

  /**
   * Clica no link de pesquisar Receita Federal
   */
  clicarPesquisarReceita() {
    cy.get(EmpresaCadastroLocators.btnPesquisarReceita).click();
  }

  /**
   * Valida autocomplete de bairro isoladamente
   */
  validarAutocompleteBairro(bairro = 'CENTRO') {
    cy.get(EmpresaCadastroLocators.bairroAutocomplete)
      .clear()
      .type(bairro, { delay: 0 });

    cy.get(EmpresaCadastroLocators.bairroLista, { timeout: 5000 })
      .should('be.visible')
      .first()
      .click();

    cy.get(EmpresaCadastroLocators.hiddenBairro)
      .invoke('val')
      .should('not.be.empty');
  }

  /**
   * Valida autocomplete de cidade isoladamente
   */
  validarAutocompleteCidade(cidade = 'SAO PAULO') {
    cy.get(EmpresaCadastroLocators.cidadeAutocomplete)
      .clear()
      .type(cidade, { delay: 0 });

    cy.get(EmpresaCadastroLocators.cidadeLista, { timeout: 5000 })
      .should('be.visible')
      .first()
      .click();

    cy.get(EmpresaCadastroLocators.hiddenCidade)
      .invoke('val')
      .should('not.be.empty');
  }

  /**
   * Acessa edição de empresa existente pela listagem
   */
  acessarEdicaoEmpresa() {
    EmpresaListagemPage.acessarTelaListagem();
    // Clica no primeiro link de edição
    cy.get(EmpresaCadastroLocators.linkEditarEmpresa).first().click();
    cy.url().should('match', /\/cadastro\/empresa\/\d+\/editar/);
  }

  /**
   * Valida que dados foram carregados na edição
   * @param {Object} empresa - Objeto com dados esperados
   */
  validarDadosCarregados(empresa) {
    if (empresa.cnpj) {
      cy.get(EmpresaCadastroLocators.inputCnpj).should('have.value', empresa.cnpj);
    }
    if (empresa.nome) {
      cy.get(EmpresaCadastroLocators.inputNome).should('have.value', empresa.nome);
    }
    if (empresa.fantasia) {
      cy.get(EmpresaCadastroLocators.inputFantasia).should('have.value', empresa.fantasia);
    }
  }

  /**
   * Edita um campo específico
   * @param {string} campo - Nome do campo (ex: 'fantasia', 'nome')
   * @param {string} valor - Novo valor
   */
  editarCampo(campo, valor) {
    const locators = {
      fantasia: EmpresaCadastroLocators.inputFantasia,
      nome: EmpresaCadastroLocators.inputNome,
      razaoSocial: EmpresaCadastroLocators.inputRazaoSocial,
      cnpj: EmpresaCadastroLocators.inputCnpj
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

export default new EmpresaCadastroPage();

