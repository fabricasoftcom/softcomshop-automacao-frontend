const NfeConfiguracoesLocators = {
  // Título e Cabeçalho
  tituloTela: 'h5:contains("Ambiente NFe")',

  // Seções
  secaoAmbiente: 'h5:contains("Ambiente NFe")',
  secaoNomeNotaFiscal: 'h5:contains("Nome utilizado na Nota Fiscal")',
  secaoNomeDestinatario: 'h5:contains("Nome utilizado no Destinário da Nota")',
  secaoIcms: 'h5:contains("ICMS")',
  secaoContingencia: 'h5:contains("Contingência")',
  secaoExibirPagamento: 'h5:contains("Exibir tipo de pagamento na impressão")',
  secaoConfiguracaoCfop: 'h5:contains("Configuração do CFOP")',
  secaoSerieNfe: 'h5:contains("Série NFe")',

  // Botões
  btnNovaSerie: 'a[href*="/serie/nfe/novo"]',
  btnStatusServico: 'a[href*="/status-servico/nfe"]',

  // Tabelas
  tabelaSerie: 'table'
};

export default NfeConfiguracoesLocators;

