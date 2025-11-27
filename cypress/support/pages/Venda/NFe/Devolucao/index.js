import CadastroNfeDevolucaoBasePage from './CadastroNfeDevolucaoBasePage';
import CadastroNfeDevolucaoAvulsaPage from './CadastroNfeDevolucaoAvulsaPage';
import CadastroNfeDevolucaoCompraPage from './CadastroNfeDevolucaoCompraPage';
import CadastroNfeDevolucaoMovimentacaoPage from './CadastroNfeDevolucaoMovimentacaoPage';
import CadastroNfeDevolucaoNotaFiscalSaidaPage from './CadastroNfeDevolucaoNotaFiscalSaidaPage';
import CadastroNfeDevolucaoTrocasPage from './CadastroNfeDevolucaoTrocasPage';

// Exporta todas as classes individuais
export {
  CadastroNfeDevolucaoBasePage,
  CadastroNfeDevolucaoAvulsaPage,
  CadastroNfeDevolucaoCompraPage,
  CadastroNfeDevolucaoMovimentacaoPage,
  CadastroNfeDevolucaoNotaFiscalSaidaPage,
  CadastroNfeDevolucaoTrocasPage,
};

// Cria instâncias das classes específicas
const avulsa = new CadastroNfeDevolucaoAvulsaPage();
const compra = new CadastroNfeDevolucaoCompraPage();
const movimentacao = new CadastroNfeDevolucaoMovimentacaoPage();
const notaFiscalSaida = new CadastroNfeDevolucaoNotaFiscalSaidaPage();
const trocas = new CadastroNfeDevolucaoTrocasPage();

// Classe facade que agrupa todas as instâncias e métodos compartilhados
// Mantém compatibilidade com os testes existentes
class CadastroNfeDevolucaoPage extends CadastroNfeDevolucaoBasePage {
  // Métodos de Avulsa
  avancarParaCadastroDevolucaoAvulsa() {
    return avulsa.avancarParaCadastroDevolucaoAvulsa();
  }

  validarFormularioDevolucaoAvulsa() {
    return avulsa.validarFormularioDevolucaoAvulsa();
  }

  // Métodos de Compra
  avancarParaCadastroDevolucaoCompra() {
    return compra.avancarParaCadastroDevolucaoCompra();
  }

  pesquisarDevolucaoCompra(fornecedor = null, cnpj = null, notaFiscal = null, chaveAcesso = null) {
    return compra.pesquisarDevolucaoCompra(fornecedor, cnpj, notaFiscal, chaveAcesso);
  }

  selecionarPrimeiraDevolucaoCompra() {
    return compra.selecionarPrimeiraDevolucaoCompra();
  }

  validarModalSelecaoItensDevolucaoCompra() {
    return compra.validarModalSelecaoItensDevolucaoCompra();
  }

  preencherQuantidadeDevolverMetade() {
    return compra.preencherQuantidadeDevolverMetade();
  }

  gerarNotaDevolucaoCompra() {
    return compra.gerarNotaDevolucaoCompra();
  }

  validarFormularioDevolucaoCompra() {
    return compra.validarFormularioDevolucaoCompra();
  }

  // Métodos de Movimentação
  avancarParaCadastroDevolucaoMovimentacao() {
    return movimentacao.avancarParaCadastroDevolucaoMovimentacao();
  }

  pesquisarDevolucaoMovimentacao(fornecedor = null, cnpj = null, notaFiscal = null, chaveAcesso = null) {
    return movimentacao.pesquisarDevolucaoMovimentacao(fornecedor, cnpj, notaFiscal, chaveAcesso);
  }

  selecionarPrimeiraDevolucaoMovimentacao() {
    return movimentacao.selecionarPrimeiraDevolucaoMovimentacao();
  }

  validarFormularioDevolucaoMovimentacao() {
    return movimentacao.validarFormularioDevolucaoMovimentacao();
  }

  // Métodos de Nota Fiscal Saída
  avancarParaCadastroDevolucaoNotaFiscalSaida() {
    return notaFiscalSaida.avancarParaCadastroDevolucaoNotaFiscalSaida();
  }

  pesquisarDevolucaoNotaFiscalSaida(cliente = null, cnpj = null, notaFiscal = null, chaveAcesso = null) {
    return notaFiscalSaida.pesquisarDevolucaoNotaFiscalSaida(cliente, cnpj, notaFiscal, chaveAcesso);
  }

  selecionarPrimeiraDevolucaoNotaFiscalSaida() {
    return notaFiscalSaida.selecionarPrimeiraDevolucaoNotaFiscalSaida();
  }

  validarFormularioDevolucaoNotaFiscalSaida() {
    return notaFiscalSaida.validarFormularioDevolucaoNotaFiscalSaida();
  }

  // Métodos de Trocas
  avancarParaCadastroDevolucaoTrocas() {
    return trocas.avancarParaCadastroDevolucaoTrocas();
  }

  pesquisarDevolucaoTrocas(cliente = null) {
    return trocas.pesquisarDevolucaoTrocas(cliente);
  }

  selecionarPrimeiraDevolucaoTrocas() {
    return trocas.selecionarPrimeiraDevolucaoTrocas();
  }

  validarFormularioDevolucaoTrocas() {
    return trocas.validarFormularioDevolucaoTrocas();
  }
}

// Exporta a instância da classe facade como default (mantém compatibilidade)
export default new CadastroNfeDevolucaoPage();

