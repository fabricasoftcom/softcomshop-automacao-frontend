import { beforeEach } from 'mocha';
import CompraPage from '../../support/pages/Compra/CompraPage'

Cypress.on('uncaught:exception', () => {
    return false
});

describe('Cadastro de compra - Importação XML', { tags: ["@cadastro-compra-xml", "@regressivo", "@compras"] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit('/');
        CompraPage.acessarPaginaCompra();
    })

    it('Importando NFe pelo XML', () => {
        CompraPage.importarNFePorXML();
    })

    it('Importando NFe pelo XML e excluindo', () => {
        // Usa apenas XMLs sem faturas, pois só é possível excluir NFe sem a tag <dup>
        CompraPage.importarNFePorXML(null, true);
        CompraPage.excluirNFeImportada();
    })

    it('Deve aplicar grupo para todos os itens na importação', () => {
        CompraPage.prepararTelaImportacao();
        CompraPage.aplicarGrupoParaTodosItens();
        CompraPage.preencherCFOP();
        CompraPage.clicarConfirmarNatureza();
        CompraPage.informarVinculoFiscal();
        CompraPage.clicarImportarXML();
        CompraPage.aguardarImportacaoCompleta();
        CompraPage.validarGrupoAplicado();
        CompraPage.validarMensagemSucesso();
    })

    it('Deve relacionar produto na importação', () => {
        CompraPage.prepararTelaImportacao();
        CompraPage.relacionarProduto(0);
        CompraPage.preencherCFOP();
        CompraPage.clicarConfirmarNatureza();
        CompraPage.informarVinculoFiscal();
        CompraPage.clicarImportarXML();
        CompraPage.aguardarImportacaoCompleta();
        CompraPage.validarProdutoRelacionado(0);
        CompraPage.validarMensagemSucesso();
    })

    it('Deve adicionar grupo na importação', () => {
        CompraPage.prepararTelaImportacao();
        CompraPage.adicionarGrupo(0); // Adiciona grupo no primeiro item
        CompraPage.preencherCFOP();
        CompraPage.clicarConfirmarNatureza();
        CompraPage.informarVinculoFiscal();
        CompraPage.clicarImportarXML();
        CompraPage.aguardarImportacaoCompleta();
        CompraPage.validarGrupoAdicionado();
        CompraPage.validarMensagemSucesso();
    })

    it('Deve adicionar vínculo na importação', () => {
        CompraPage.prepararTelaImportacao();
        CompraPage.adicionarVinculo();
        CompraPage.preencherCFOP();
        CompraPage.clicarConfirmarNatureza();
        CompraPage.clicarImportarXML();
        CompraPage.aguardarImportacaoCompleta();
        CompraPage.validarVinculoAdicionado();
        CompraPage.validarMensagemSucesso();
    })

    it('Deve alterar CFOP do item na importação', () => {
        CompraPage.prepararTelaImportacao();
        CompraPage.alterarCFOPItem(0, '5102');
        CompraPage.preencherCFOP();
        CompraPage.clicarConfirmarNatureza();
        CompraPage.informarVinculoFiscal();
        CompraPage.clicarImportarXML();
        CompraPage.aguardarImportacaoCompleta();
        CompraPage.validarCFOPAlterado(0, '5102');
        CompraPage.validarMensagemSucesso();
    })

    it('Deve lançar categoria na importação', () => {
        CompraPage.prepararTelaImportacao();
        CompraPage.lancarCategoria(); // Lança categoria para todos os pagamentos
        CompraPage.preencherCFOP();
        CompraPage.clicarConfirmarNatureza();
        CompraPage.informarVinculoFiscal();
        CompraPage.clicarImportarXML();
        CompraPage.aguardarImportacaoCompleta();
        CompraPage.validarCategoriaLancada();
        CompraPage.validarMensagemSucesso();
    })
})

