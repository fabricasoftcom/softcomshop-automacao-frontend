import listagemclientepage from "./listagemclientepage";
import clienteLocators from "../../locators/ClienteLocators";
import cadastroClienteLocators from "../../locators/Cliente/CadastroClienteLocators";

class ClientePage {
  visit() {
    listagemclientepage.acessarCadastroNovoCliente();
    cy.get(cadastroClienteLocators.formPessoaFisica).should('be.visible');
  }

  verificarLayoutBasico() {
    cy.get(cadastroClienteLocators.containerTabs).should('be.visible');
    cy.get(cadastroClienteLocators.abaDadosCadastrais).should('be.visible');
    cy.get(cadastroClienteLocators.abasExtras).should('have.length.greaterThan', 0);
    cy.get(cadastroClienteLocators.btnVoltar).should('be.visible');
    cy.get(cadastroClienteLocators.btnNovo).should('be.visible');
  }

  preencherCamposCliente(cliente) {
    cy.percySnapshot('cadastro-cliente-dados-cadastrais');

    const pessoa = cliente.pessoa || 'FISICA';
    cy.get(cadastroClienteLocators.selectPessoa).select(pessoa);
    const formSelector = pessoa === 'JURIDICA'
      ? cadastroClienteLocators.formPessoaJuridica
      : cadastroClienteLocators.formPessoaFisica;

    cy.get(formSelector).should('be.visible');

    cy.get(formSelector).within(() => {
      cy.get(cadastroClienteLocators.inputCpfCnpj)
        .clear()
        .type(cliente.cpf || cliente.cnpj, { log: false });
    });

    cy.get(cadastroClienteLocators.inputNome)
      .clear()
      .type(cliente.nome, { parseSpecialCharSequences: false });

    if (pessoa === 'JURIDICA' && cliente.razaoSocial) {
      cy.get(cadastroClienteLocators.inputRazaoSocial)
        .clear()
        .type(cliente.razaoSocial, { parseSpecialCharSequences: false });
    }

    if (cliente.inscricaoEstadual) {
      cy.get(cadastroClienteLocators.inputInscricaoEstadual).clear().type(cliente.inscricaoEstadual);
    }

    if (cliente.inscricaoMunicipal) {
      cy.get(cadastroClienteLocators.inputInscricaoMunicipal).clear().type(cliente.inscricaoMunicipal);
    }

    if (cliente.rg) {
      cy.get(cadastroClienteLocators.inputRg).clear().type(cliente.rg);
    }

    if (cliente.cep) {
      cy.get(cadastroClienteLocators.inputCep).clear().type(cliente.cep);
    }

    if (cliente.endereco) {
      cy.get(cadastroClienteLocators.inputEndereco).clear().type(cliente.endereco);
    }

    if (cliente.numero) {
      cy.get(cadastroClienteLocators.inputNumero).clear().type(`${cliente.numero}`);
    }

    if (cliente.complemento) {
      cy.get(cadastroClienteLocators.inputComplemento).clear().type(cliente.complemento);
    }

    if (cliente.observacao) {
      cy.get(cadastroClienteLocators.textareaObservacao).type(cliente.observacao);
    }
  }

  alternarSwitchesEstado() {
    this.toggleSwitch(
      cadastroClienteLocators.switchBloqueadoToggle,
      cadastroClienteLocators.switchBloqueadoCheckbox
    );
    this.toggleSwitch(
      cadastroClienteLocators.switchDesativadoToggle,
      cadastroClienteLocators.switchDesativadoCheckbox
    );
  }

  toggleSwitch(toggleSelector, checkboxSelector) {
    cy.get(toggleSelector).click({ force: true });
    cy.get(checkboxSelector).should('be.checked');

    cy.get(toggleSelector).click({ force: true });
    cy.get(checkboxSelector).should('not.be.checked');
  }

  cadastrar() {
    cy.intercept('POST', '**/cadastro/cliente/salvar').as('salvarCliente');
    cy.get(cadastroClienteLocators.btnSalvar).click();
    this.tratarModalCamposObrigatoriosSeNecessario();
    cy.wait('@salvarCliente');
    this.confirmarSweetAlertSucessoSeExistir();
  }

  confirmarCamposObrigatorios() {
    cy.get('.sweet-alert .confirm').click();
  }

  confirmacaoCadastroCliente() {
    cy.contains('Sucesso', { matchCase: false }).should('be.visible');
  }

  confirmarSweetAlertSucessoSeExistir() {
    cy.get('body').then(($body) => {
      const modalAberto = $body.find(clienteLocators.modalConfirmDestroy).length > 0;

      if (modalAberto) {
        cy.get(clienteLocators.botaoConfirmar).click({ force: true });
      }
    });
  }

  tratarModalCamposObrigatoriosSeNecessario() {
    cy.get('body').then(($body) => {
      const modalAberto = $body.find(clienteLocators.modalConfirmDestroy).length > 0;

      if (!modalAberto) {
        return;
      }

      cy.get(clienteLocators.tituloModal).should('contain', 'Campos obrigatórios');
      cy.get(clienteLocators.mensagemModal).should('contain', 'Cidade - UF');
      cy.get(clienteLocators.botaoConfirmar).click({ force: true });
      cy.get(clienteLocators.modalConfirmDestroy).should('not.exist');

      this.preencherLocalizacaoPadrao();

      cy.get(cadastroClienteLocators.btnSalvar).click();
    });
  }

  preencherLocalizacaoPadrao() {
    this.selecionarBairroPadrao();
    this.selecionarCidadePadrao();
  }

  selecionarCidadePadrao(cidade = 'SAO PAULO') {
    cy.get(cadastroClienteLocators.inputAutoCidade)
      .clear()
      .type(cidade, { delay: 0 });

    cy.get(cadastroClienteLocators.listaResultadosCidade, { timeout: 5000 })
      .first()
      .click();

    cy.get(cadastroClienteLocators.hiddenCidade)
      .invoke('val')
      .should('not.be.empty');
  }

  selecionarBairroPadrao(bairro = 'CENTRO') {
    cy.get(cadastroClienteLocators.inputAutoBairro)
      .clear()
      .type(bairro, { delay: 0 });

    cy.get(cadastroClienteLocators.listaResultadosBairro, { timeout: 5000 })
      .first()
      .click();

    cy.get(cadastroClienteLocators.hiddenBairro)
      .invoke('val')
      .should('not.be.empty');
  }

  abrirAbaOutrosEnderecos() {
    cy.get(cadastroClienteLocators.abaOutrosEnderecos)
      .should('be.visible')
      .click();

    cy.get(cadastroClienteLocators.painelOutrosEnderecos)
      .should('have.class', 'active')
      .and('have.class', 'in');
  }

  validarOutrosEnderecosSemResultados() {
    cy.get(cadastroClienteLocators.mensagemSemEnderecos)
      .should('contain', 'Nenhum resultado');
  }

  abrirModalNovoEndereco() {
    cy.get(cadastroClienteLocators.btnNovoEndereco)
      .should('be.visible')
      .click();

    cy.get(cadastroClienteLocators.modalEndereco)
      .should('be.visible')
      .and('have.class', 'in');

    cy.get(cadastroClienteLocators.modalEnderecoTitulo)
      .should('contain', 'Endereço');

    cy.get(cadastroClienteLocators.modalEnderecoBody)
      .should('not.be.empty');
  }

  configurarInterceptRedirecionamentoCliente() {
    cy.intercept('GET', '**/cadastro/cliente/*/editar').as('carregarEdicaoCliente');
  }

  abrirAbaContatoNotificacoes() {
    cy.get(cadastroClienteLocators.abaContatoNotificacoes)
      .should('be.visible')
      .click();

    cy.get(cadastroClienteLocators.painelContatoNotificacoes)
      .should('have.class', 'active')
      .and('have.class', 'in');

    cy.get(cadastroClienteLocators.tabelaContatos).should('be.visible');
    cy.get(cadastroClienteLocators.tabelaHistoricoNotificacoes).should('be.visible');
  }

  validarContatoNotificacoesSemRegistro() {
    cy.get(cadastroClienteLocators.mensagemSemContatos)
      .should('contain', 'Nenhum resultado');

    cy.get(cadastroClienteLocators.mensagemSemHistorico)
      .should('contain', 'Nenhum resultado');
  }

  abrirModalContato() {
    cy.get(cadastroClienteLocators.btnContato)
      .should('be.visible')
      .click();

    cy.get(cadastroClienteLocators.modalContato)
      .should('be.visible')
      .and('have.class', 'in');

    cy.get(cadastroClienteLocators.modalContatoTitulo)
      .should('contain', 'Contato');

    cy.get(cadastroClienteLocators.modalContatoBody)
      .should('not.be.empty');

    cy.get(cadastroClienteLocators.modalContatoFormulario).should('be.visible');
  }

  preencherModalContato(contato) {
    cy.get(cadastroClienteLocators.modalContatoSelectTipo).select(contato.tipo || 'PRINCIPAL');
    cy.get(cadastroClienteLocators.modalContatoInputNome).clear().type(contato.nome);

    if (contato.ddd) {
      cy.get(cadastroClienteLocators.modalContatoInputDDD).clear().type(contato.ddd);
    }

    if (contato.telefone) {
      cy.get(cadastroClienteLocators.modalContatoInputTelefone).clear().type(contato.telefone);
    }

    if (contato.email) {
      cy.get(cadastroClienteLocators.modalContatoInputEmail).clear().type(contato.email);
    }
  }

  salvarModalContato() {
    cy.intercept('POST', '**/cadastro/cliente-contato/salvar').as('salvarContato');
    cy.get(cadastroClienteLocators.modalContatoBtnSalvar).click();
    cy.wait('@salvarContato');
    cy.get(cadastroClienteLocators.modalContato).should('not.be.visible');
  }

  validarContatoListado() {
    cy.get(cadastroClienteLocators.tabelaContatos)
      .find('tbody tr')
      .should('not.contain', 'Nenhum resultado');
  }

  aguardarRedirecionamentoCliente() {
    cy.wait('@carregarEdicaoCliente', { timeout: 40000 });
    cy.location('pathname').should('match', /\/cadastro\/cliente\/\d+\/editar$/);
    cy.get('#tabs-cliente', { timeout: 20000 }).should('be.visible');
  }

  preencherModalEndereco(endereco) {
    cy.get(cadastroClienteLocators.modalEnderecoSelectTipo).select(endereco.tipo || 'ENTREGA');

    cy.get(cadastroClienteLocators.modalEnderecoInputCep)
      .clear()
      .type(endereco.cep);

    cy.get(cadastroClienteLocators.modalEnderecoInputNumero)
      .clear()
      .type(`${endereco.numero}`);

    cy.get(cadastroClienteLocators.modalEnderecoInputEndereco)
      .clear()
      .type(endereco.endereco);

    cy.get(cadastroClienteLocators.modalEnderecoInputCidade)
      .clear()
      .type(endereco.cidade, { delay: 0 });

    cy.get(cadastroClienteLocators.modalEnderecoListaCidades)
      .first()
      .click();

    cy.get(cadastroClienteLocators.modalEnderecoHiddenCidade)
      .invoke('val')
      .should('not.be.empty');

    this.selecionarBairroModal(endereco.bairro);

    if (endereco.complemento) {
      cy.get(cadastroClienteLocators.modalEnderecoInputComplemento)
        .clear()
        .type(endereco.complemento);
    }
  }

  salvarModalEndereco() {
    cy.intercept('POST', '**/cadastro/cliente-endereco/salvar').as('salvarEndereco');
    cy.get(cadastroClienteLocators.modalEnderecoBtnSalvar).click();
    cy.wait('@salvarEndereco');
    cy.get(cadastroClienteLocators.modalEndereco).should('not.be.visible');
  }

  validarEnderecoListado() {
    cy.get(cadastroClienteLocators.linhasOutrosEnderecos)
      .its('length')
      .should('be.greaterThan', 0);
  }

  selecionarBairroModal(bairro) {
    cy.get(cadastroClienteLocators.modalEnderecoInputBairro)
      .clear()
      .type(bairro, { delay: 200 });

    cy.get('body').then(($body) => {
      const possuiLista = $body.find(cadastroClienteLocators.modalEnderecoListaBairros).length > 0;

      if (possuiLista) {
        cy.get(cadastroClienteLocators.modalEnderecoListaBairros)
          .first()
          .click();
      } else {
        cy.get(cadastroClienteLocators.modalEnderecoHiddenBairro).invoke('val', bairro);
      }
    });

    cy.get(cadastroClienteLocators.modalEnderecoHiddenBairro)
      .invoke('val')
      .should('not.be.empty');
  }
}

module.exports = new ClientePage();
