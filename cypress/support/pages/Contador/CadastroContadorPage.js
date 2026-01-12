import CadastroContadorLocators from '../../locators/Contador/CadastroContadorLocators';

class CadastroContadorPage {
  /**
   * Acessa a página de cadastro de contador
   */
  visit() {
    cy.visit('/cadastro/contador');
    cy.get('#loading').should('not.exist');
    cy.get(CadastroContadorLocators.tituloPagina).should('be.visible').should('contain', 'Contador');
  }

  /**
   * Verifica o layout básico do formulário
   */
  verificarLayoutBasico() {
    cy.get(CadastroContadorLocators.tituloPagina).should('be.visible');
    cy.get(CadastroContadorLocators.btnVoltar).should('be.visible');
    cy.get(CadastroContadorLocators.btnSalvar).should('be.visible');
    cy.get(CadastroContadorLocators.inputCpf).should('be.visible');
    cy.get(CadastroContadorLocators.inputNome).should('be.visible');
    cy.get(CadastroContadorLocators.inputEmail).should('be.visible');
    cy.get(CadastroContadorLocators.inputCrc).should('be.visible');
  }

  /**
   * Preenche o campo CPF
   * @param {string} cpf - CPF do contador
   */
  preencherCpf(cpf) {
    cy.get(CadastroContadorLocators.inputCpf).clear().type(cpf);
  }

  /**
   * Preenche o campo CNPJ
   * @param {string} cnpj - CNPJ do contador
   */
  preencherCnpj(cnpj) {
    cy.get(CadastroContadorLocators.inputCnpj).clear().type(cnpj);
  }

  /**
   * Preenche o campo CRC
   * @param {string} crc - CRC do contador
   */
  preencherCrc(crc) {
    cy.get(CadastroContadorLocators.inputCrc).clear().type(crc);
  }

  /**
   * Preenche o campo Email
   * @param {string} email - Email do contador
   */
  preencherEmail(email) {
    cy.get(CadastroContadorLocators.inputEmail).clear().type(email);
  }

  /**
   * Preenche o campo Nome
   * @param {string} nome - Nome do contador
   */
  preencherNome(nome) {
    cy.get(CadastroContadorLocators.inputNome).clear().type(nome, { parseSpecialCharSequences: false });
  }

  /**
   * Preenche o campo Fone
   * @param {string} fone - Telefone do contador
   */
  preencherFone(fone) {
    cy.get(CadastroContadorLocators.inputFone).clear().type(fone);
  }

  /**
   * Preenche o campo Fax
   * @param {string} fax - Fax do contador
   */
  preencherFax(fax) {
    cy.get(CadastroContadorLocators.inputFax).clear().type(fax);
  }

  /**
   * Preenche o campo CEP
   * @param {string} cep - CEP do endereço
   */
  preencherCep(cep) {
    cy.get(CadastroContadorLocators.inputCep).clear().type(cep);
  }

  /**
   * Clica no botão de buscar CEP
   */
  clicarBuscarCep() {
    cy.get(CadastroContadorLocators.btnBuscarCep).click();
  }

  /**
   * Preenche o campo Endereço
   * @param {string} endereco - Endereço do contador
   */
  preencherEndereco(endereco) {
    cy.get(CadastroContadorLocators.inputEndereco).clear().type(endereco, { parseSpecialCharSequences: false });
  }

  /**
   * Preenche o campo Número
   * @param {string} numero - Número do endereço
   */
  preencherNumero(numero) {
    cy.get(CadastroContadorLocators.inputNumero).clear().type(numero);
  }

  /**
   * Preenche o campo Complemento
   * @param {string} complemento - Complemento do endereço
   */
  preencherComplemento(complemento) {
    cy.get(CadastroContadorLocators.inputComplemento).clear().type(complemento, { parseSpecialCharSequences: false });
  }

  /**
   * Seleciona bairro usando autocomplete
   * @param {string} bairro - Nome do bairro
   */
  selecionarBairro(bairro) {
    cy.get(CadastroContadorLocators.inputAutoBairro)
      .clear()
      .type(bairro, { delay: 200 });

    cy.get('body').then(($body) => {
      const possuiLista = $body.find(CadastroContadorLocators.listaResultadosBairro).length > 0;

      if (possuiLista) {
        cy.get(CadastroContadorLocators.listaResultadosBairro)
          .first()
          .click();
      } else {
        cy.get(CadastroContadorLocators.hiddenBairro).invoke('val', bairro);
      }
    });

    cy.get(CadastroContadorLocators.hiddenBairro)
      .invoke('val')
      .should('not.be.empty');
  }

  /**
   * Seleciona cidade usando autocomplete
   * @param {string} cidade - Nome da cidade (ex: "SAO PAULO - SP")
   */
  selecionarCidade(cidade) {
    cy.get(CadastroContadorLocators.inputAutoCidade)
      .clear()
      .type(cidade, { delay: 0 });

    cy.get(CadastroContadorLocators.listaResultadosCidade, { timeout: 5000 })
      .first()
      .click();

    cy.get(CadastroContadorLocators.hiddenCidade)
      .invoke('val')
      .should('not.be.empty');
  }

  /**
   * Preenche o formulário completo
   * @param {Object} dados - Objeto com os dados do contador
   */
  preencherFormulario(dados) {
    if (dados.cpf) {
      this.preencherCpf(dados.cpf);
    }
    if (dados.cnpj) {
      this.preencherCnpj(dados.cnpj);
    }
    if (dados.crc) {
      this.preencherCrc(dados.crc);
    }
    if (dados.email) {
      this.preencherEmail(dados.email);
    }
    if (dados.nome) {
      this.preencherNome(dados.nome);
    }
    if (dados.fone) {
      this.preencherFone(dados.fone);
    }
    if (dados.fax) {
      this.preencherFax(dados.fax);
    }
    if (dados.cep) {
      this.preencherCep(dados.cep);
    }
    if (dados.endereco) {
      this.preencherEndereco(dados.endereco);
    }
    if (dados.numero) {
      this.preencherNumero(dados.numero);
    }
    if (dados.complemento) {
      this.preencherComplemento(dados.complemento);
    }
    if (dados.bairro) {
      this.selecionarBairro(dados.bairro);
    }
    if (dados.cidade) {
      this.selecionarCidade(dados.cidade);
    }
  }

  /**
   * Clica no botão Salvar
   */
  clicarSalvar() {
    cy.get(CadastroContadorLocators.btnSalvar).click();
  }

  /**
   * Salva o formulário e valida mensagem de sucesso
   */
  salvar() {
    this.clicarSalvar();
    cy.get('.toast', { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'Sucesso');
  }

  /**
   * Valida mensagem de sucesso
   */
  validarMensagemSucesso() {
    cy.get('.toast', { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'Sucesso');
  }

  /**
   * Clica no botão Voltar
   */
  clicarBotaoVoltar() {
    cy.get(CadastroContadorLocators.btnVoltar).click();
  }

  /**
   * Valida que retornou para a home (URL não contém /cadastro/contador)
   */
  validarRetornoHome() {
    cy.url().should('not.include', '/cadastro/contador');
  }

  /**
   * Tenta salvar sem preencher campos obrigatórios
   */
  tentarSalvarSemCamposObrigatorios() {
    this.clicarSalvar();
  }

  /**
   * Valida erro de campos obrigatórios (formulário ainda está na tela)
   */
  validarErroCamposObrigatorios() {
    cy.url().should('include', '/cadastro/contador');
  }
}

export default new CadastroContadorPage();

