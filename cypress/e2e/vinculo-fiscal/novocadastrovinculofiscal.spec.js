import NovoCadastroVinculoFiscalPage from "../../support/pages/VinculoFiscal/NovoCadastroVinculoFiscalPage";
import VinculoConfiguracaoEntradaPage from "../../support/pages/VinculoFiscal/VinculoConfiguracaoEntradaPage";
import VinculoConfiguracaoSaidaPage from "../../support/pages/VinculoFiscal/VinculoConfiguracaoSaidaPage";
import ConfiguracaoSaidaNFcePage from "../../support/pages/VinculoFiscal/ConfiguracaoSaidaNFcePage";

describe('Cadastro de Novo Vínculo Fiscal', () => {
    beforeEach(() => {
        cy.login();
        NovoCadastroVinculoFiscalPage.visit();
    });

    it('Deve preencher o formulário de vínculo fiscal, salvar e validar as informações exibidas', () => {
        const nomeVinculo = `Novo Vínculo Fiscal-${new Date().toLocaleString()}`;
        const tipoItem = '00';

        // Preenche o formulário
        NovoCadastroVinculoFiscalPage.preencherNomeVinculo(nomeVinculo);
        NovoCadastroVinculoFiscalPage.selecionarTipoItem(tipoItem);

        // Salva o vínculo
        NovoCadastroVinculoFiscalPage.salvarVinculo();

        // Validações após o salvamento
        NovoCadastroVinculoFiscalPage.verificarToastSucesso();
        NovoCadastroVinculoFiscalPage.verificarTituloVinculoCriado(nomeVinculo);
        NovoCadastroVinculoFiscalPage.verificarBotaoVoltar();
        NovoCadastroVinculoFiscalPage.verificarTabelaConfiguracoes();

        VinculoConfiguracaoEntradaPage.abrirModalEntrada();

        VinculoConfiguracaoEntradaPage.validarModalAberto();

        // Dados de entrada para o formulário
        const dadosEntrada = {
            cfop: '1102 - COMPRA PARA COMERCIALIZAÇÃO',
            pis: '98',
            pisAliquota: '3,50',
            cofins: '98',
            cofinsAliquota: '7,60',
            ipi: '49',
        };

        // Preenchimento do formulário
        VinculoConfiguracaoEntradaPage.preencherFormularioEntrada(dadosEntrada);

        // Salvar e validar
        VinculoConfiguracaoEntradaPage.salvarFormulario();
        //VinculoConfiguracaoEntradaPage.validarSalvamento();

        // Configuração de Saída
        VinculoConfiguracaoSaidaPage.abrirModalSaidaNFe();
        VinculoConfiguracaoSaidaPage.validarModalAberto();

        const dadosSaida = {
            cfopNfe: '5102 - VENDA DE MERCADORIA',
            cfopNfce: '5102 - VENDA DE MERCADORIA',
            cstCsosn: '102',
            icmsModalidadeBase: '3 - Valor da operação',
            icmsAcrescimo: '2,50',
            icmsReducao: '10,00',
            icmsOrigem: '0',
            icmsStModalidadeBase: '4 - Margem Valor Agregado (%)',
            icmsStMva: '20,00',
            icmsStAliquota: '18,00',
            icmsStReducao: '5,00',
            icmsValorPauta: '500,00',
            ipi: '53',
            pis: '99',
            pisAliquota: '1,65',
            cofins: '99',
            cofinsAliquota: '7,60',
        }

        VinculoConfiguracaoSaidaPage.preencherFormularioSaida(dadosSaida);
        VinculoConfiguracaoSaidaPage.salvarFormulario();
        //VinculoConfiguracaoSaidaPage.validarSalvamento();

        // Validação final na tela principal
        NovoCadastroVinculoFiscalPage.verificarTabelaConfiguracoes();

        VinculoConfiguracaoSaidaPage.abrirModalSaidaNFCe();
        ConfiguracaoSaidaNFcePage.validarModalAberto();

        const dadosSaidaNfce = {
            cfopNfce: '5102 - VENDA DE MERCADORIA',
            cstCsosn: '102 - Tributada pelo Simples Nacional',
            pis: '99',
            pisAliquota: '1,65',
            cofins: '99',
            cofinsAliquota: '7,60',
            icmsModalidadeBase: '3',
        };

        ConfiguracaoSaidaNFcePage.preencherCampos(dadosSaidaNfce);
        ConfiguracaoSaidaNFcePage.salvarConfiguracao();
        //ConfiguracaoSaidaNFcePage.validarSucesso();
        // Seleciona o primeiro produto
        NovoCadastroVinculoFiscalPage.selecionarPrimeiroProduto();

        // Adiciona o produto selecionado
        NovoCadastroVinculoFiscalPage.adicionarProduto();

        NovoCadastroVinculoFiscalPage.verificarToastSucesso();

    });
});
