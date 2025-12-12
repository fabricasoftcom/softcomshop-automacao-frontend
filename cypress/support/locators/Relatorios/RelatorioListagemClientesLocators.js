// RelatorioListagemClientesLocators.js
const RelatorioListagemClientesLocators = {
    titulo: 'h5:contains("Listagem dos Clientes")',
    filtrosContainer: 'form',
    tipoClienteAutocomplete: '#auto_tipo_cliente_id',
    atendenteAutocomplete: '#auto_funcionario_id',
    periodoCadastroInput: '#data_cadastro',
    tipoPessoaSelect: '#tipo_pessoa',
    bloqueadoSelect: '#bloqueado',
    desativadoSelect: '#desativado',
    bairroAutocomplete: '#auto_bairro_id',
    ufSelect: '#uf',
    cidadeAutocomplete: '#auto_cidade_id',
    cepInput: '#cep',
    tagsClassificacao: '.select2-selection__rendered',
    botaoPesquisar: '#btn-pesquisar',
    botaoGerarPdf: '#gerar-pdf',
    botaoVendaMais: 'a:contains("Venda Mais")',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
};

export default RelatorioListagemClientesLocators;

