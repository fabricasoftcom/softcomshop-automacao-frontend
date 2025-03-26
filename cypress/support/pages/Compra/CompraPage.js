import CompraLocators from "../../locators/CompraLocators"

class CompraPage {
    acessarPaginaCompra() {
        cy.visit('/compra');
    }

    importarNfe() {
        cy.get(CompraLocators.importarNFe).click(); // Tenta clicar no primeiro botão
        cy.get('body').then(($body) => {
            // Se o segundo botão de importação estiver visível, clica nele
            if ($body.find('.btn.btn-info.importar').length > 0) {
                cy.get('.btn.btn-info.importar').click();
            }
        });
    }

    clicarImportacaoXML() {
        cy.xpath(CompraLocators.arquivoXML).click();
    }

    clicarAnexarNFe() {
        cy.get('#file').invoke('show').click({force: true}).attachFile('nfe_importacao.xml');
    }

    clicarImportar() {
        cy.xpath(CompraLocators.btnImportar).click();
    }

    informarCFOP() {
        cy.get(CompraLocators.naturezaSelect).click().type('1102');
        cy.xpath(CompraLocators.natureza).should('exist').click();
    }

    informarVinculoFiscal() {
        cy.get(CompraLocators.selectVinculoFiscal).click();
        cy.xpath(CompraLocators.vinculoFiscal).click();
        cy.get(CompraLocators.btnLancarVinculo).click();
    }

    importarNFe() {
        cy.get(CompraLocators.btnImportarNFe).click();
    }

    validarMensagemSucesso() {
        cy.contains('Pronto, tudo organizado.');
    }

    validarMensagemErro() {
        cy.contains('Verifique se o campo obrigatório está preenchido!')
    }

    selecionarNFeImportada() {
        cy.get(CompraLocators.checkboxNFeImportada).click();
    }

    clicarExcluirSelecionados() {
        cy.get(CompraLocators.btnExcluirSelecionados).click();
    }

    confirmarExclusao() {
        cy.contains('Você realmente deseja excluir essas informações?').should('exist')
        cy.wait(5000)
        cy.get('body').type('{enter}')
    }
}

module.exports = new CompraPage();
