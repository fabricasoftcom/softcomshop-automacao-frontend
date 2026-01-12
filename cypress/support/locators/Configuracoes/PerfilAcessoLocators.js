// PerfilAcessoLocators.js
const PerfilAcessoLocators = {
    // Container principal
    contentLayout: '#content-layout',

    // Título da página
    titulo: '#content-layout h5',

    // Botões principais
    btnNovoPerfil: '#btn-perfil',
    btnExcluirSelecionados: '#btn-excluir-selecionados',

    // Formulário de pesquisa
    linkPesquisa: '#btn-pesquisa', // ID confirmado via browser_evaluate
    formPesquisa: '#form-search-perfil',
    containerFormPesquisa: '.form-pesquisa',
    campoNome: '#role_title',
    btnPesquisar: '#pesquisar',

    // Tabela
    tabela: '#content-layout table',
    tbody: '#table-form-body',
    linhasTabela: '#table-form-body tr',
    primeiraLinha: '#table-form-body tr:first-of-type',

    // Checkboxes
    checkboxSelecionarTodos: 'thead input[name="simplecheck[]"]',
    checkboxesLinhas: '#table-form-body input[type="checkbox"]',

    // Links de ação
    linkEditar: 'a[href*="/editar/"]',
    linkPermissoes: 'a[href*="/permissoes/"]',
    linkClonar: 'a[href*="/clonar/"]',

    // Modal de cadastro
    modal: '#modal-perfil',
    modalTitulo: '#title-simplemodal',
    modalBody: '#modal-body-perfil',
    btnFecharModal: '#modal-perfil .close',

    // Formulário de cadastro (dentro do modal) - usar contexto do modal
    campoNomeCadastro: '#modal-perfil #role_title',
    campoProfile: '#modal-perfil #profile',
    btnSalvar: '#modal-perfil #btn-salvar',
};

export default PerfilAcessoLocators;

