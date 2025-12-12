// RelatorioEvolucaoLocators.js
const RelatorioEvolucaoLocators = {
    titulo: 'h5:contains("Evolução")',
    filtrosContainer: 'form',
    empresaSelect: '#empresa_id',
    tipoEvolucaoSelect: '#tipo_evolucao',
    valorSelect: '#valor',
    vendedorAutocomplete: '#auto_funcionario_id',
    anoInput: '#ano',
    diaInput: '#dia',
    abasContainer: 'tablist',
    abaClientes: 'tab[aria-label*="Clientes"]',
    abaVendedor: 'tab[aria-label*="Vendedor"]',
    abaProdutos: 'tab[aria-label*="Produtos"]',
    abaFornecedores: 'tab[aria-label*="Fornecedores"]',
    abaFabricantes: 'tab[aria-label*="Fabricantes"]',
    abaGrupos: 'tab[aria-label*="Grupos"]',
    abaCidades: 'tab[aria-label*="Cidades"]',
    abaTiposCliente: 'tab[aria-label*="Tipos de Cliente"]',
    botaoPesquisar: '#btn-pesquisar',
    botaoGerarPdf: '#gerar-pdf',
    botaoPersonalizar: 'a:contains("Personalizar")',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
};

export default RelatorioEvolucaoLocators;

