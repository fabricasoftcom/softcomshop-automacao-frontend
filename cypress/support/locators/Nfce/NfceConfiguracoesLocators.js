const NfceConfiguracoesLocators = {
  // Título e Cabeçalho
  tituloTela: 'h5:contains("Ambiente NFCe")',

  // Seções
  secaoAmbiente: 'h5:contains("Ambiente NFCe")',
  secaoEmissaoCpfCnpj: 'h5:contains("Emissão com CPF/CNPJ/Documento Estrangeiro")',
  secaoContingencia: 'h5:contains("Contingência")',
  secaoSerieNfce: 'h5:contains("Série NFCe")',
  secaoCsc: 'h5:contains("Listagem de CSC")',

  // Botões
  btnNovaSerie: 'a[href*="/serie/nfce/novo"]',
  btnNovoCsc: 'a[href*="/configuracoes/csc/novo"]',
  btnStatusServico: 'a[href*="/status-servico/nfce"]',

  // Tabelas
  tabelaSerie: 'table',
  tabelaCsc: 'table'
};

export default NfceConfiguracoesLocators;

