import { beforeEach } from 'mocha';
import CompraPage from '../../support/pages/Compra/CompraPage'

describe('Cadastro de compra', { tags: ["@cadastro-compra-xml", "@regressivo"] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
    })

    const excluirNFeExistente = () => {
        CompraPage.acessarPaginaCompra();
        CompraPage.selecionarNFeImportada();
        CompraPage.clicarExcluirSelecionados();
        CompraPage.confirmarExclusao();
    };

    afterEach(() => {
        CompraPage.selecionarNFeImportada('4382813');
        CompraPage.clicarExcluirSelecionados();
        CompraPage.confirmarExclusao();
    })

    it('Cadastro de Compra importando XML - Sucesso', () => {
        const numeroNFe = '4382813';

        excluirNFeExistente(numeroNFe);
        CompraPage.acessarPaginaCompra();
        CompraPage.importarNfe();
        CompraPage.clicarImportacaoXML();
        CompraPage.clicarAnexarNFe();
        CompraPage.clicarImportar();
        CompraPage.informarCFOP();
        CompraPage.informarVinculoFiscal();
        CompraPage.importarNFe();
        CompraPage.validarMensagemSucesso();
    });

    it('Cadastro de Compra importando XML - Sem informar CFOP', () => {
        const numeroNFe = '4382813';

        excluirNFeExistente(numeroNFe);
        CompraPage.importarNfe();
        CompraPage.acessarPaginaCompra();
        CompraPage.importarNfe();
        CompraPage.clicarImportacaoXML();
        CompraPage.clicarAnexarNFe();
        CompraPage.clicarImportar();
        CompraPage.importarNFe();
        CompraPage.validarMensagemErro();
    });
})
