// MenulateralServicoLocators.js
const MenulateralServicoLocators = {
    // Submenus e opções de Serviços e NFS-e
    clientes: '#clientes',
    servico: '#serviço',
    vinculosFiscaisServico: '#vinculos_fiscais_de_serviço',
    nfsE: '#nfs-e',
    nfsEListagem: '.active > .nav > :nth-child(1) > #nfs-e',
    configuracoesNfsE: 'a[href*="serie/nfse"]',
    ordemServico: '#ordem_de_serviço',

    // Botões de cadastro
    btnNovo: '#btn-novo',
    novoCadastroNFSe: '.ibox-content > .btn-warning:contains("Novo Cadastro")',
    cadastroAvulsa: '.sweet-alert a[href*="/nfse/cadastro-avulsa"]:contains("Avulsa")',
     novoCadastroOrdemServico: '.sweet-alert a[href*="ordem-servico/novo"]:contains("Novo Cadastro")'
};

export default MenulateralServicoLocators;
