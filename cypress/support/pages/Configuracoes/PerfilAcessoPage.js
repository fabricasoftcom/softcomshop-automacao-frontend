import PerfilAcessoLocators from '../../locators/Configuracoes/PerfilAcessoLocators';
import MenulateralConfiguracoesPage from '../menulateral/MenulateralConfiguracoesPage';

class PerfilAcessoPage {

    // Navegação
    acessarTelaListagem() {
        MenulateralConfiguracoesPage.acessarListagemPerfisAcesso();
        cy.url().should('include', '/autenticacao/perfil/inicio');
        this.validarTelaCarregada();
    }

    // Validações
    validarTelaCarregada() {
        cy.get(PerfilAcessoLocators.contentLayout).should('be.visible');
        cy.get(PerfilAcessoLocators.titulo).should('be.visible');
        cy.get(PerfilAcessoLocators.titulo).should('contain.text', 'Listagem');
        cy.get(PerfilAcessoLocators.tabela).should('be.visible');
    }

    validarTabelaCarregada() {
        cy.get(PerfilAcessoLocators.tabela).should('be.visible');
        cy.get(PerfilAcessoLocators.linhasTabela).should('have.length.greaterThan', 0);
    }

    validarBotaoNovoPerfil() {
        cy.get(PerfilAcessoLocators.btnNovoPerfil).should('be.visible');
        cy.get(PerfilAcessoLocators.btnNovoPerfil).should('contain.text', 'Perfil');
        cy.get(PerfilAcessoLocators.btnNovoPerfil).should('be.enabled');
    }

    validarBotaoExcluir() {
        cy.get(PerfilAcessoLocators.btnExcluirSelecionados).should('be.visible');
        cy.get(PerfilAcessoLocators.btnExcluirSelecionados).should('contain.text', 'Excluir Selecionados');
    }

    // Formulário de pesquisa
    abrirFormularioPesquisa() {
        cy.get(PerfilAcessoLocators.formPesquisa).then(($form) => {
            if ($form.is(':visible')) {
                return;
            }
            cy.get(PerfilAcessoLocators.linkPesquisa).should('be.visible').click();
            cy.wait(1000);
        });
        cy.get(PerfilAcessoLocators.formPesquisa, { timeout: 10000 }).should('be.visible');
    }

    fecharFormularioPesquisa() {
        cy.get('body').then(($body) => {
            const form = $body.find(PerfilAcessoLocators.formPesquisa);
            if (form.length > 0 && form.is(':visible')) {
                cy.get(PerfilAcessoLocators.linkPesquisa).should('be.visible').click();
                cy.wait(500);
            }
        });
    }

    preencherFiltroNome(nome) {
        this.abrirFormularioPesquisa();
        cy.get(PerfilAcessoLocators.campoNome).clear().type(nome);
    }

    limparFiltroNome() {
        this.abrirFormularioPesquisa();
        cy.get(PerfilAcessoLocators.campoNome).clear();
    }

    submeterPesquisa() {
        cy.intercept('GET', '**/autenticacao/perfil/**').as('pesquisarPerfis');
        cy.get(PerfilAcessoLocators.btnPesquisar).click();
        cy.wait('@pesquisarPerfis', { timeout: 15000 }).then(() => {
            cy.get(PerfilAcessoLocators.tabela).should('be.visible');
        });
        cy.get(PerfilAcessoLocators.tabela).should('be.visible');
    }

    pesquisarPorNome(nome) {
        this.preencherFiltroNome(nome);
        this.submeterPesquisa();
    }

    // Checkboxes
    selecionarTodosPerfis() {
        cy.get(PerfilAcessoLocators.checkboxSelecionarTodos).check();
        cy.get(PerfilAcessoLocators.checkboxesLinhas).should('be.checked');
    }

    desmarcarTodosPerfis() {
        cy.get(PerfilAcessoLocators.checkboxSelecionarTodos).uncheck();
        cy.get(PerfilAcessoLocators.checkboxesLinhas).should('not.be.checked');
    }

    selecionarPrimeiroPerfil() {
        cy.get(PerfilAcessoLocators.linhasTabela).first().find(PerfilAcessoLocators.checkboxesLinhas).check();
    }

    // Ações
    clicarBotaoNovoPerfil() {
        cy.get(PerfilAcessoLocators.btnNovoPerfil).should('be.visible');
        cy.get(PerfilAcessoLocators.btnNovoPerfil).click();
    }

    clicarBotaoExcluirSelecionados() {
        cy.get(PerfilAcessoLocators.btnExcluirSelecionados).should('be.visible');
        cy.get(PerfilAcessoLocators.btnExcluirSelecionados).click();
    }

    tentarExcluirSemSelecao() {
        cy.get(PerfilAcessoLocators.btnExcluirSelecionados).click();
        cy.on('window:alert', (str) => {
            expect(str).to.include('selecionar');
        });
    }

    abrirEdicaoPrimeiroPerfil() {
        cy.get(PerfilAcessoLocators.linhasTabela).first().within(() => {
            cy.get(PerfilAcessoLocators.linkEditar).first().should('be.visible').invoke('removeAttr', 'target').click();
        });
        cy.url({ timeout: 15000 }).should('match', /\/autenticacao\/perfil\/editar\/\d+/);
    }

    abrirPermissoesPrimeiroPerfil() {
        cy.get(PerfilAcessoLocators.linhasTabela).first().within(() => {
            cy.get(PerfilAcessoLocators.linkPermissoes).first().click();
        });
    }

    abrirClonarPrimeiroPerfil() {
        cy.get(PerfilAcessoLocators.linhasTabela).first().within(() => {
            cy.get(PerfilAcessoLocators.linkClonar).first().click();
        });
    }

    // Métodos de cadastro
    abrirModalCadastro() {
        cy.get(PerfilAcessoLocators.btnNovoPerfil).should('be.visible').click();
        cy.get(PerfilAcessoLocators.modal, { timeout: 10000 }).should('be.visible');
        cy.get(PerfilAcessoLocators.modalTitulo).should('contain.text', 'Adicione um Perfil');
    }

    preencherNomePerfil(nome) {
        // Usa contexto do modal para evitar conflito com formulário de pesquisa
        cy.get(PerfilAcessoLocators.modal).within(() => {
            cy.get(PerfilAcessoLocators.campoNomeCadastro.replace('#modal-perfil ', '')).should('be.visible').clear().type(nome);
        });
    }

    selecionarProfile(profile) {
        // Usa contexto do modal para evitar conflito
        cy.get(PerfilAcessoLocators.modal).within(() => {
            cy.get(PerfilAcessoLocators.campoProfile.replace('#modal-perfil ', '')).should('be.visible').select(profile);
        });
    }

    salvarPerfil() {
        cy.intercept('POST', '**/autenticacao/perfil/salvar**').as('salvarPerfil');
        // Usa contexto do modal
        cy.get(PerfilAcessoLocators.modal).within(() => {
            cy.get('#btn-salvar').should('be.visible').click();
        });
        cy.wait('@salvarPerfil', { timeout: 15000 });
        // Aguarda modal fechar (pode ser removido ou oculto)
        cy.get(PerfilAcessoLocators.modal).should('not.be.visible');
    }

    cadastrarPerfil(nome, profile = 'CLIENTE') {
        this.abrirModalCadastro();
        this.preencherNomePerfil(nome);
        this.selecionarProfile(profile);
        this.salvarPerfil();
    }

    fecharModal() {
        // Usa contexto do modal e pega o primeiro botão fechar
        cy.get(PerfilAcessoLocators.modal).within(() => {
            cy.get('.close').first().should('be.visible').click();
        });
        // Aguarda modal fechar (pode ser removido ou oculto)
        cy.wait(1000);
        cy.get(PerfilAcessoLocators.modal).should('not.be.visible');
    }

    validarModalVisivel() {
        cy.get(PerfilAcessoLocators.modal).should('be.visible');
        cy.get(PerfilAcessoLocators.modalTitulo).should('contain.text', 'Adicione um Perfil');
        // Valida campos dentro do contexto do modal
        cy.get(PerfilAcessoLocators.modal).within(() => {
            cy.get('#role_title').should('be.visible');
            cy.get('#profile').should('be.visible');
            cy.get('#btn-salvar').should('be.visible');
        });
    }

    validarModalFechado() {
        cy.get(PerfilAcessoLocators.modal).should('not.be.visible');
    }

    tentarSalvarSemCamposObrigatorios() {
        cy.get(PerfilAcessoLocators.btnSalvar).click();
        cy.wait(1000);
    }

    validarErroCamposObrigatorios() {
        cy.get(PerfilAcessoLocators.modal).should('be.visible');
        cy.get('body').then(($body) => {
            const temMensagemObrigatorio = $body.text().includes('obrigatório') ||
                                         $body.text().includes('obrigat') ||
                                         $body.text().includes('required');
            const temAlerta = $body.find('.alert, [role="alert"], .help-block, .text-danger').length > 0;

            if (temMensagemObrigatorio || temAlerta) {
                cy.get('.alert, [role="alert"], .help-block, .text-danger').first().should('be.visible');
            } else {
                cy.get(PerfilAcessoLocators.modal).should('be.visible');
            }
        });
    }

    // Validações de resultado de pesquisa
    validarResultadoPesquisa(nomePerfil) {
        cy.get(PerfilAcessoLocators.linhasTabela).should('have.length.greaterThan', 0);
        cy.get(PerfilAcessoLocators.linhasTabela).first().should('contain.text', nomePerfil);
    }

    validarResultadoPesquisaComDados() {
        cy.get(PerfilAcessoLocators.linhasTabela).should('have.length.greaterThan', 0);
    }

    // Validações de campo Profile
    validarCampoProfileVisivel() {
        cy.get(PerfilAcessoLocators.modal).within(() => {
            cy.get('#profile').should('be.visible');
        });
    }

    validarCampoProfileTemOpcoes() {
        cy.get(PerfilAcessoLocators.modal).within(() => {
            cy.get('#profile').find('option').should('have.length.greaterThan', 1);
        });
    }

    validarCampoProfileValor(profile) {
        cy.get(PerfilAcessoLocators.modal).within(() => {
            cy.get('#profile').should('have.value', profile);
        });
    }
}

export default new PerfilAcessoPage();
