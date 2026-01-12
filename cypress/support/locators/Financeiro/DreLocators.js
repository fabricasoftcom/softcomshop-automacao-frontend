// DreLocators.js
const DreLocators = {
  // Título
  titulo: 'h5:contains("DRE - Demonstração do Resultado do Exercício")',

  // Campo de período (datepicker)
  campoPeriodo: '#date_text',

  // Botão Gerar PDF
  btnGerarPdf: '#gerar-pdf',

  // Seções principais
  secaoTotalVendas: 'h4:contains("Total Vendas")',
  secaoDespesasReceitas: 'h4:contains("Despesas/Receitas")',
  secaoDespesas: 'h4:contains("Despesas")',
  secaoReceitas: 'h4:contains("Receitas")',
  secaoLucroLiquido: 'h4:contains("Lucro Líquido")',
  secaoBalancoPatrimonial: 'h4:contains("Balanço Patrimonial")',
  secaoSaldoAtualContas: 'h4:contains("Saldo Atual das Contas")',
  secaoContasReceber: 'h4:contains("Contas a Receber")',
  secaoVencido: 'h4:contains("Vencido")',
  secaoAVencer: 'h4:contains("A Vencer")',

  // Tabelas (usando contexto do .ibox-content que contém o h4)
  tabelaTotalVendas: '.ibox-content:has(h4:contains("Total Vendas")) table',
  tabelaDespesas: '.ibox-content:has(h4:contains("Despesas")) table',
  tabelaReceitas: '.ibox-content:has(h4:contains("Receitas")) table',
  tabelaLucroLiquido: '.ibox-content:has(h4:contains("Lucro Líquido")) table',
  tabelaSaldoAtualContas: '.ibox-content:has(h4:contains("Saldo Atual das Contas")) table',
  tabelaContasReceberVencido: '.ibox-content:has(h4:contains("Vencido")) table',
  tabelaContasReceberAVencer: '.ibox-content:has(h4:contains("A Vencer")) table',

  // Mensagem de dados não encontrados
  mensagemSemDados: '.ibox-content:contains("Nenhum dado foi encontrado nesse período")',
};

export default DreLocators;

