const VinculoFiscalListagemLocators = {
    // Botões Principais
    btnPesquisa: '#btn-pesquisa', // Botão de pesquisa
    btnNovoCadastro: '#btn-novo', // Botão de novo cadastro
    btnExcluirSelecionados: '#btn-excluir-selecionados', // Botão de excluir selecionados

    // Campos de Pesquisa
    campoCodigo: '#id', // Campo de código
    campoDescricao: '#nome_vinculo', // Campo de descrição
    btnPesquisar: '#btn-pesquisar', // Botão de pesquisar

    // Tabela de Vínculos Fiscais
    tabelaVinculos: '#674ee97528179', // ID da tabela de vínculos fiscais
    checkboxTodos: '.check_all', // Checkbox para selecionar todos
    linhasTabela: '#table-form-body tr', // Linhas da tabela de vínculos fiscais
    botaoEditar: '.button-tab.button-edit', // Botão de editar para cada linha na tabela

    // Paginação
    paginacao: '.pagination', // Componente de paginação
    paginaAnterior: '.pagination .page-item[aria-label="« Anterior"]', // Botão de página anterior
    proximaPagina: '.pagination .page-item[aria-label="Próxima »"]', // Botão de próxima página

    // Modal de Confirmação de Exclusão
    modalConfirmacao: '.sweet-alert.modal-confirm-destroy',  // Modal de confirmação
    botaoConfirmarExclusao: '.sweet-alert .sa-confirm-button-container .confirm',  // Botão "Sim, pode excluir!"
    botaoCancelarExclusao: '.sweet-alert .sa-button-container .cancel',  // Botão "Não, desejo cancelar!"

    toastAlert:'toast toast-warning',
};

export default VinculoFiscalListagemLocators;
