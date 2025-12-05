// PromocoesCadastroLocators.js
const PromocoesCadastroLocators = {
    // **Campos do Formulário**
    campoDescricao: '#descricao', // Campo de descrição da promoção (obrigatório)
    campoPeriodo: '#periodo', // Campo de período da promoção (date range picker)

    // **Date Range Picker**
    datePickerAplicar: 'button:contains("Aplicar")', // Botão Aplicar do date picker
    datePickerLimpar: 'button:contains("Limpar")', // Botão Limpar do date picker

    // **Checkboxes - Dias da Semana**
    checkboxSegunda: '#check_segunda', // Checkbox Segunda-feira
    checkboxTerca: '#check_terca', // Checkbox Terça-feira
    checkboxQuarta: '#check_quarta', // Checkbox Quarta-feira
    checkboxQuinta: '#check_quinta', // Checkbox Quinta-feira
    checkboxSexta: '#check_sexta', // Checkbox Sexta-feira
    checkboxSabado: '#check_sabado', // Checkbox Sábado
    checkboxDomingo: '#check_domingo', // Checkbox Domingo

    // **Campos de Horário**
    campoHoraInicio: '#hora_inicio', // Campo de hora de início
    campoHoraFim: '#hora_fim', // Campo de hora de fim

    // **Botões**
    btnSalvar: '#btn-salvar', // Botão para salvar a promoção
    btnVoltar: '#btn-voltar', // Botão para voltar à listagem
    btnNovoCadastro: 'a:contains("Novo Cadastro")', // Link para novo cadastro
    btnEmpresasParticipantes: 'button:contains("Empresas Participantes")', // Botão Empresas Participantes

    // **Títulos e Seções**
    tituloGestorPromocoes: 'h5:contains("Gestor de Promoções")', // Título principal
    tituloDadosPrincipais: 'h5:contains("Dados Principais")', // Título da seção Dados Principais
    tituloProdutos: 'h5:contains("Produtos")', // Título da seção Produtos (aparece após salvar)

    // **Toast e Mensagens**
    toastSucesso: '.alert-success, .toast-success', // Toast de sucesso
    mensagemSucesso: 'Você adicionou um(a) Promocao!', // Texto da mensagem de sucesso

    // **Seção Produtos (aparece após salvar)**
    secaoProdutos: 'h5:contains("Produtos")', // Título da seção Produtos (usado como referência de contexto)

    // Select Tipo - ID específico descoberto no mapeamento
    selectTipo: '#tipo', // Select para escolher entre "Produto" ou "Grupo" (id="tipo")

    // Campo Produto (autocomplete) - ID específico descoberto no mapeamento
    campoProduto: '#auto_produto_empresa_grade_id', // Campo de autocomplete do produto (id="auto_produto_empresa_grade_id")
    campoProdutoIcon: '#auto_produto_empresa_grade_id ~ div span button, .fa-search', // Ícone de busca do autocomplete
    campoProdutoResultado: '.typeahead-list li a, .typeahead-result li a, ul.typeahead li a', // Resultados do autocomplete

    // Campos Desconto - IDs específicos descobertos no mapeamento
    campoDescontoPercentual: '#percentual_promocao', // Campo desconto percentual (id="percentual_promocao")
    campoDescontoReais: '#valor_promocional_unidade', // Campo desconto em reais (id="valor_promocional_unidade")

    // Botão Adicionar - ID específico descoberto no mapeamento
    btnAdicionarProduto: '#btn_aplicar', // Botão para adicionar produto à promoção (id="btn_aplicar")

    // Tabela de Produtos
    tabelaProdutos: 'table.table-itens, table.table-hover.table-itens', // Tabela de produtos adicionados
    linhasTabelaProdutos: 'table.table-itens tbody tr, table.table-hover.table-itens tbody tr', // Linhas da tabela de produtos
    mensagemTabelaVazia: 'td:contains("Nenhum resultado foi localizado")', // Mensagem quando tabela está vazia

    // **Modal SweetAlert - Produto já existe na promoção**
    sweetAlertModalProdutoExistente: '.sweet-alert, .swal2-container', // Modal SweetAlert que aparece quando produto já existe
    sweetAlertMensagemProdutoExistente: 'h2:contains("Você já possui itens lançados nesta promoção")', // Mensagem do modal
    sweetAlertBtnApagarEAdicionar: 'button:contains("Apagar e Adicionar")', // Botão "Apagar e Adicionar"
    sweetAlertBtnAdicionar: 'button:contains("Adicionar")', // Botão "Adicionar"

    // **Toast de sucesso - Adição de produto**
    toastSucessoItem: '.alert-success, .toast-success', // Toast de sucesso ao adicionar item
    mensagemSucessoItem: 'Você adicionou um Item', // Texto da mensagem de sucesso ao adicionar item

    // **Ativação/Desativação de Promoção**
    btnAtivarPromocao: '#btn-ativar-desativar', // Botão para ativar/desativar promoção (id="btn-ativar-desativar")
    linkAtivarPromocao: 'a:contains("Ativar Promoção")', // Link "Ativar Promoção" (aparece quando promoção está inativa)
    linkDesativarPromocao: 'a:contains("Desativar Promoção")', // Link "Desativar Promoção" (aparece quando promoção está ativa)
    mensagemSucessoAtivacao: 'Promoção Ativada com sucesso', // Mensagem de sucesso ao ativar promoção
    mensagemSucessoDesativacao: 'Promoção Desativada com sucesso', // Mensagem de sucesso ao desativar promoção (se aplicável)
};

export default PromocoesCadastroLocators;

