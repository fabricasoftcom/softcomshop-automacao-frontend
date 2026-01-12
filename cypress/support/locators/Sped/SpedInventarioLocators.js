const SpedInventarioLocators = {
  // Título e Cabeçalho
  tituloTela: 'h5:contains("Inventário Base")',

  // Campos
  inputData: '#date',

  // Botões/Links
  btnDownload: 'a[href*="/sped/inventario/exportar"]',
  btnUpload: '#upload',

  // Inputs Ocultos
  inputArquivo: '#file-excel'
};

export default SpedInventarioLocators;

