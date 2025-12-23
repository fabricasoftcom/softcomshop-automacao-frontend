// Facade pattern para manter compatibilidade com imports existentes
// Agrupa métodos de CompraXmlPage e CompraManualPage
// Segue o padrão do NFe onde classes simples são importadas diretamente

import CompraBasePage from "./CompraBasePage";
import CompraXmlPage from "./CompraXmlPage";
import CompraManualPage from "./CompraManualPage";

// Cria instâncias das classes específicas
const xmlPage = new CompraXmlPage();
const manualPage = new CompraManualPage();

// Classe facade que agrupa métodos de ambas as classes
// Mantém compatibilidade com os testes existentes
class CompraPage extends CompraBasePage {
    // ========== MÉTODOS XML (delegam para CompraXmlPage) ==========

    clicarBotaoImportarNFe() {
        return xmlPage.clicarBotaoImportarNFe();
    }

    selecionarOpcaoXML() {
        return xmlPage.selecionarOpcaoXML();
    }

    anexarArquivoXML(nomeArquivo = null, usarApenasSemFaturas = false) {
        return xmlPage.anexarArquivoXML(nomeArquivo, usarApenasSemFaturas);
    }

    clicarImportar() {
        return xmlPage.clicarImportar();
    }

    preencherCFOP(cfop = '1102') {
        return xmlPage.preencherCFOP(cfop);
    }

    clicarConfirmarNatureza() {
        return xmlPage.clicarConfirmarNatureza();
    }

    informarVinculoFiscal() {
        return xmlPage.informarVinculoFiscal();
    }

    clicarImportarXML() {
        return xmlPage.clicarImportarXML();
    }

    aguardarImportacaoCompleta() {
        return xmlPage.aguardarImportacaoCompleta();
    }

    clicarExcluirListagem() {
        return xmlPage.clicarExcluirListagem();
    }

    importarNFePorXML(nomeArquivoXML = null, usarApenasSemFaturas = false) {
        return xmlPage.importarNFePorXML(nomeArquivoXML, usarApenasSemFaturas);
    }

    prepararTelaImportacao(nomeArquivoXML = null, usarApenasSemFaturas = false) {
        return xmlPage.prepararTelaImportacao(nomeArquivoXML, usarApenasSemFaturas);
    }

    aplicarGrupoParaTodosItens(grupoId = null) {
        return xmlPage.aplicarGrupoParaTodosItens(grupoId);
    }

    relacionarProduto(itemIndex = 0, termoProduto = null) {
        return xmlPage.relacionarProduto(itemIndex, termoProduto);
    }

    adicionarGrupo(grupoId = null) {
        return xmlPage.adicionarGrupo(grupoId);
    }

    adicionarVinculoItem() {
        return xmlPage.adicionarVinculoItem();
    }

    adicionarVinculo(vinculoId = null) {
        return xmlPage.adicionarVinculo(vinculoId);
    }

    alterarCFOPItem(novoCFOP = '1403') {
        return xmlPage.alterarCFOPItem(novoCFOP);
    }

    lancarCategoria(categoriaId = null) {
        return xmlPage.lancarCategoria(categoriaId);
    }

    validarGrupoAplicado() {
        return xmlPage.validarGrupoAplicado();
    }

    validarProdutoRelacionado(itemIndex = 0) {
        return xmlPage.validarProdutoRelacionado(itemIndex);
    }

    validarGrupoAdicionado() {
        return xmlPage.validarGrupoAdicionado();
    }

    validarVinculoAdicionado() {
        return xmlPage.validarVinculoAdicionado();
    }

    validarCFOPAlterado(itemIndex = 0, cfopEsperado = '1102') {
        return xmlPage.validarCFOPAlterado(itemIndex, cfopEsperado);
    }

    validarCategoriaLancada() {
        return xmlPage.validarCategoriaLancada();
    }

    // ========== MÉTODOS MANUAL (delegam para CompraManualPage) ==========

    acessarNovoCadastro() {
        return manualPage.acessarNovoCadastro();
    }

    validarBotoesTopo() {
        return manualPage.validarBotoesTopo();
    }

    preencherObservacao(texto) {
        return manualPage.preencherObservacao(texto);
    }

    buscarFornecedor(termo) {
        return manualPage.buscarFornecedor(termo);
    }

    validarSugestoesFornecedor() {
        return manualPage.validarSugestoesFornecedor();
    }

    expandirFornecedorAutocomplete() {
        return manualPage.expandirFornecedorAutocomplete();
    }

    selecionarPrimeiroFornecedorDisponivel() {
        return manualPage.selecionarPrimeiroFornecedorDisponivel();
    }

    buscarProduto(termo) {
        return manualPage.buscarProduto(termo);
    }

    validarSugestoesProduto() {
        return manualPage.validarSugestoesProduto();
    }

    expandirProdutoAutocomplete() {
        return manualPage.expandirProdutoAutocomplete();
    }

    selecionarProdutoPorIndice(indice = 0) {
        return manualPage.selecionarProdutoPorIndice(indice);
    }

    adicionarProdutoPeloAutocomplete(termo, indice = 0) {
        return manualPage.adicionarProdutoPeloAutocomplete(termo, indice);
    }

    adicionarPrimeiroProdutoDaLista(termo = 'cst') {
        return manualPage.adicionarPrimeiroProdutoDaLista(termo);
    }

    adicionarProdutosDistintos(termo, quantidade = 3) {
        return manualPage.adicionarProdutosDistintos(termo, quantidade);
    }

    validarPainelItensInicial() {
        return manualPage.validarPainelItensInicial();
    }

    preencherNatureza(natureza = '1102') {
        return manualPage.preencherNatureza(natureza);
    }

    preencherNumero(numero = '12345') {
        return manualPage.preencherNumero(numero);
    }

    preencherSerie(serie = '1') {
        return manualPage.preencherSerie(serie);
    }

    preencherChaveAcesso(chave = null) {
        // null = gera automaticamente uma chave única via factory
        return manualPage.preencherChaveAcesso(chave);
    }

    preencherDadosPrincipais(dados = {}) {
        return manualPage.preencherDadosPrincipais(dados);
    }

    salvarCompraInicial() {
        return manualPage.salvarCompraInicial();
    }

    clicarNovoItem() {
        return manualPage.clicarNovoItem();
    }

    preencherProdutoNoModal(termo = 'P') {
        return manualPage.preencherProdutoNoModal(termo);
    }

    selecionarProdutoNoModal(indice = 0) {
        return manualPage.selecionarProdutoNoModal(indice);
    }

    preencherPrecoNoModal(preco = '10,00') {
        return manualPage.preencherPrecoNoModal(preco);
    }

    preencherQuantidadeNoModal(quantidade = '5') {
        return manualPage.preencherQuantidadeNoModal(quantidade);
    }

    preencherNaturezaNoModal(natureza = '1102') {
        return manualPage.preencherNaturezaNoModal(natureza);
    }

    adicionarItemNoModal(dadosItem = {}) {
        return manualPage.adicionarItemNoModal(dadosItem);
    }
}

// Exporta a instância da classe facade como default (mantém compatibilidade)
export default new CompraPage();

// Também exporta como module.exports para compatibilidade
module.exports = new CompraPage();

/*
* NOTA: Este arquivo foi refatorado para seguir a hierarquia de Page Objects (ADR-0008).
 * Estrutura da hierarquia:
 * - CompraBasePage.js: Métodos comuns (aguardarCarregamento, salvarCompra, excluirCompraAtual, etc.)
 * - CompraXmlPage.js: Métodos específicos de importação XML (extends CompraBasePage)
 * - CompraManualPage.js: Métodos específicos de cadastro manual (extends CompraBasePage)
 * - CompraPage.js: Facade pattern que agrupa métodos de ambas as classes (este arquivo)
 * Para usar classes específicas diretamente:
 * import { CompraXmlPage, CompraManualPage } from './CompraXmlPage' ou './CompraManualPage';
 * Para manter compatibilidade (recomendado):
 * import CompraPage from './CompraPage';
 */
