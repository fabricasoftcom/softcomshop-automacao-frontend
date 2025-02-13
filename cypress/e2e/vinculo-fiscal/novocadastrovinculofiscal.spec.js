import NovoCadastroVinculoFiscalPage from "../../support/pages/VinculoFiscal/NovoCadastroVinculoFiscalPage";
import VinculoConfiguracaoEntradaPage from "../../support/pages/VinculoFiscal/VinculoConfiguracaoEntradaPage";
import VinculoConfiguracaoSaidaPage from "../../support/pages/VinculoFiscal/VinculoConfiguracaoSaidaPage";
import ConfiguracaoSaidaNFcePage from "../../support/pages/VinculoFiscal/ConfiguracaoSaidaNFcePage";

describe('Cadastro de Novo Vínculo Fiscal', { tags: ['@cadastro-vinculo-fiscal', '@regressivo'] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit("/");
        NovoCadastroVinculoFiscalPage.visit();
    });

    it('Deve preencher o formulário de vínculo fiscal, salvar e validar as informações exibidas', () => {
        // **1. Cadastro do Vínculo Fiscal**
        const nomeVinculo = `Novo Vínculo Fiscal-${new Date().toLocaleString()}`;
        const tipoItem = '00';

        // Preenche o formulário principal
        NovoCadastroVinculoFiscalPage.preencherNomeVinculo(nomeVinculo);
        NovoCadastroVinculoFiscalPage.selecionarTipoItem(tipoItem);

        // Salva o vínculo fiscal
        NovoCadastroVinculoFiscalPage.salvarVinculo();

        // Validações após salvamento
        NovoCadastroVinculoFiscalPage.verificarToastSucesso();
        NovoCadastroVinculoFiscalPage.verificarTituloVinculoCriado(nomeVinculo);
        NovoCadastroVinculoFiscalPage.verificarBotaoVoltar();
        NovoCadastroVinculoFiscalPage.verificarTabelaConfiguracoes();

        // **2. Configuração de Entrada**
        VinculoConfiguracaoEntradaPage.abrirModalEntrada();
        VinculoConfiguracaoEntradaPage.validarModalAberto();

        // Dados para preenchimento da configuração de entrada
        const dadosEntrada = {
            cfop: '1102 - COMPRA PARA COMERCIALIZAÇÃO',
            pis: '98',
            pisAliquota: '3,50',
            cofins: '98',
            cofinsAliquota: '7,60',
            ipi: '49',
        };

        // Preenche o formulário de entrada
        VinculoConfiguracaoEntradaPage.preencherFormularioEntrada(dadosEntrada);

        // Salva e valida o formulário de entrada
        VinculoConfiguracaoEntradaPage.salvarFormulario();
        // VinculoConfiguracaoEntradaPage.validarSalvamento();

        // **3. Configuração de Saída NFe**
        VinculoConfiguracaoSaidaPage.abrirModalSaidaNFe();
        VinculoConfiguracaoSaidaPage.validarModalAberto();

        // Dados para preenchimento da configuração de saída NFe
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
        };

        // Preenche e salva a configuração de saída NFe
        VinculoConfiguracaoSaidaPage.preencherFormularioSaida(dadosSaida);
        VinculoConfiguracaoSaidaPage.salvarFormulario();
        // VinculoConfiguracaoSaidaPage.validarSalvamento();

        // Validação final na tabela
        NovoCadastroVinculoFiscalPage.verificarTabelaConfiguracoes();

        // **4. Configuração de Saída NFCe**
        VinculoConfiguracaoSaidaPage.abrirModalSaidaNFCe();
        ConfiguracaoSaidaNFcePage.validarModalAberto();

        // Dados para preenchimento da configuração de saída NFCe
        const dadosSaidaNfce = {
            cfopNfce: '5102 - VENDA DE MERCADORIA',
            cstCsosn: '102 - Tributada pelo Simples Nacional',
            pis: '99',
            pisAliquota: '1,65',
            cofins: '99',
            cofinsAliquota: '7,60',
            icmsModalidadeBase: '3',
        };

        // Preenche e salva a configuração de saída NFCe
        ConfiguracaoSaidaNFcePage.preencherCampos(dadosSaidaNfce);
        ConfiguracaoSaidaNFcePage.salvarConfiguracao();
        // ConfiguracaoSaidaNFcePage.validarSucesso();

        // **5. Adição de Produto - Validar necesisdade**
        // NovoCadastroVinculoFiscalPage.selecionarPrimeiroProduto();
        // NovoCadastroVinculoFiscalPage.adicionarProduto();
        // NovoCadastroVinculoFiscalPage.verificarToastSucesso();
    });
});
