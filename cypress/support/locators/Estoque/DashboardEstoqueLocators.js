const DashboardEstoqueLocators = {
  url: '/gestao-estoque/dashboard',
  cards: {
    giroEstoque: 'h5:contains("Gestão de Estoque")', // Ajustar seletor específico
    cobertura: 'div:contains("Cobertura de Estoque")',
    ruptura: 'div:contains("Taxa de Ruptura")',
    positivacao: 'div:contains("Positivação")',
    excesso: 'div:contains("Excesso")',
    baixaDemanda: 'div:contains("Baixa Demanda")'
  },
  filtros: 'select', // Genérico, idealmente específico por card
  btnProdutos: 'a:contains("Produtos")'
};

export default DashboardEstoqueLocators;

