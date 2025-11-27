import CadastroNfeNormalBasePage from './CadastroNfeNormalBasePage';
import CadastroNfeNormalAvulsaPage from './CadastroNfeNormalAvulsaPage';
import CadastroNfeNormalVendaPage from './CadastroNfeNormalVendaPage';
import CadastroNfeNormalNfcePage from './CadastroNfeNormalNfcePage';
import CadastroNfeNormalMovimentacaoPage from './CadastroNfeNormalMovimentacaoPage';

// Exporta todas as classes individuais
export {
  CadastroNfeNormalBasePage,
  CadastroNfeNormalAvulsaPage,
  CadastroNfeNormalVendaPage,
  CadastroNfeNormalNfcePage,
  CadastroNfeNormalMovimentacaoPage,
};

// Cria instâncias das classes específicas
const avulsa = new CadastroNfeNormalAvulsaPage();
const venda = new CadastroNfeNormalVendaPage();
const nfce = new CadastroNfeNormalNfcePage();
const movimentacao = new CadastroNfeNormalMovimentacaoPage();

// Classe facade que agrupa todas as instâncias e métodos compartilhados
// Mantém compatibilidade com os testes existentes
class CadastroNfeNormalPage extends CadastroNfeNormalBasePage {
  // Métodos de Avulsa
  avancarParaCadastroNormalAvulsa() {
    return avulsa.avancarParaCadastroNormalAvulsa();
  }

  validarFormularioNormalAvulsa() {
    return avulsa.validarFormularioNormalAvulsa();
  }

  // Métodos de Venda
  avancarParaCadastroNormalVenda() {
    return venda.avancarParaCadastroNormalVenda();
  }

  pesquisarVenda(cliente = null, pedido = null) {
    return venda.pesquisarVenda(cliente, pedido);
  }

  selecionarPrimeiraVenda() {
    return venda.selecionarPrimeiraVenda();
  }

  selecionarVendaClienteDiferenteConsumidor(confirmarEmissao = true) {
    return venda.selecionarVendaClienteDiferenteConsumidor(confirmarEmissao);
  }

  validarFormularioNormalVenda() {
    return venda.validarFormularioNormalVenda();
  }

  // Métodos de NFCe
  avancarParaCadastroNormalNfce() {
    return nfce.avancarParaCadastroNormalNfce();
  }

  pesquisarNfce(cliente = null, pedido = null) {
    return nfce.pesquisarNfce(cliente, pedido);
  }

  selecionarPrimeiraNfce(confirmarEmissao = true) {
    return nfce.selecionarPrimeiraNfce(confirmarEmissao);
  }

  validarFormularioNormalNfce() {
    return nfce.validarFormularioNormalNfce();
  }

  // Métodos de Movimentação
  avancarParaCadastroNormalMovimentacao() {
    return movimentacao.avancarParaCadastroNormalMovimentacao();
  }

  pesquisarMovimentacao(operacao = null, tipo = null) {
    return movimentacao.pesquisarMovimentacao(operacao, tipo);
  }

  selecionarPrimeiraMovimentacao(confirmarEmissao = true) {
    return movimentacao.selecionarPrimeiraMovimentacao(confirmarEmissao);
  }

  validarFormularioNormalMovimentacao() {
    return movimentacao.validarFormularioNormalMovimentacao();
  }
}

// Exporta a instância da classe facade como default (mantém compatibilidade)
export default new CadastroNfeNormalPage();

