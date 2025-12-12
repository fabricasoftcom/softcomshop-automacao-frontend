// MenulateralVendaLocators.js
const MenulateralVendaLocators = {
    // Submenus e opções de "Vendas e NF-e"
    clientes: '#clientes',
    orcamento: '#orçamento',
    vendas: '#vendas',
    nfce: '#nfc-e',
    nfceListagem: ':nth-child(1) > #nfc-e',
    nfceInutilizar: '#inutilizar',
    nfceDownloadXml: '#download_xml',
    nfceConfiguracoes: 'a[href*="serie/nfce"]',
    nfe: '#nf-e',
    nfeListagem: '#nota_fiscal',
    nfeInutilizar: '.active > .nav > :nth-child(2) > #inutilizar',
    nfeDownloadXml: '.active > .nav > :nth-child(3) > #download_xml',
    nfeConfiguracoes: '.active > .nav > :nth-child(4) > #configurações',
    pdvWeb: '#pdv',
    pesquisaPreco: '#menu_pesquisa_preco',

    // Botão de cadastro
    btnNovo: '#btn-novo',
};

export default MenulateralVendaLocators;
