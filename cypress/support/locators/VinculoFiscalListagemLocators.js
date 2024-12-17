const VinculoFiscalListagemLocators = {
    // **Botões Principais**
    btnPesquisa: '#btn-pesquisa', // Botão para executar a pesquisa
    btnNovoCadastro: '#btn-novo', // Botão para iniciar um novo cadastro
    btnExcluirSelecionados: '#btn-excluir-selecionados', // Botão para excluir os vínculos selecionados

    // **Campos de Pesquisa**
    campoCodigo: '#id', // Campo de entrada para código do vínculo fiscal
    campoDescricao: '#nome_vinculo', // Campo de entrada para descrição do vínculo fiscal
    btnPesquisar: '#btn-pesquisar', // Botão para confirmar a pesquisa

    // **Tabela de Vínculos Fiscais**
    tabelaVinculos: '#674ee97528179', // ID da tabela principal que lista os vínculos fiscais
    checkboxTodos: '.check_all', // Checkbox para selecionar todos os itens da tabela
    linhasTabela: '#table-form-body tr', // Linhas individuais da tabela
    botaoEditar: '.button-tab.button-edit', // Botão de editar na linha correspondente da tabela

    // **Paginação**
    paginacao: '.pagination', // Componente de paginação
    paginaAnterior: '.pagination .page-item[aria-label="« Anterior"]', // Botão para ir à página anterior
    proximaPagina: '.pagination .page-item[aria-label="Próxima »"]', // Botão para ir à próxima página

    // **Modal de Confirmação de Exclusão**
    modalConfirmacao: '.sweet-alert.modal-confirm-destroy', // Modal exibido para confirmar a exclusão
    botaoConfirmarExclusao: '.sweet-alert .sa-confirm-button-container .confirm', // Botão "Sim, pode excluir!"
    botaoCancelarExclusao: '.sweet-alert .sa-button-container .cancel', // Botão "Não, desejo cancelar!"

    // **Toast e Alertas**
    toastAlert: 'toast toast-warning', // Alerta de toast (aviso ou mensagem de alerta)
};

export default VinculoFiscalListagemLocators;
