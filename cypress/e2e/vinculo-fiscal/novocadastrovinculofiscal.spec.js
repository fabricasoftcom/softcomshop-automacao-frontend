import NovoCadastroVinculoFiscalPage from "../../support/pages/VinculoFiscal/NovoCadastroVinculoFiscalPage";
import VinculoConfiguracaoEntradaPage from "../../support/pages/VinculoFiscal/VinculoConfiguracaoEntradaPage";
import VinculoConfiguracaoSaidaPage from "../../support/pages/VinculoFiscal/VinculoConfiguracaoSaidaPage";

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
    VinculoConfiguracaoSaidaPage.abrirModalSaida();
    VinculoConfiguracaoSaidaPage.validarCabecalhoModal();

    // Dados de saída para o formulário
    const dadosSaida = {
        cfop: '5102 - VENDA DE MERCADORIA',
        pis: '99',
        pisAliquota: '1,65',
        cofins: '99',
        cofinsAliquota: '7,60',
        ipi: '53',
    };

    // Preenchimento do formulário de saída
    VinculoConfiguracaoSaidaPage.preencherCfopNfe(dadosSaida.cfop);
    VinculoConfiguracaoSaidaPage.selecionarModelo('NFE');
    VinculoConfiguracaoSaidaPage.selecionarUfDestino('SP');
    VinculoConfiguracaoSaidaPage.selecionarRegimeTributario('Simples Nacional');
    VinculoConfiguracaoSaidaPage.preencherCfopNfe(dadosSaida.cfop);

    // Salvar e validar saída
    VinculoConfiguracaoSaidaPage.salvarFormulario();
    NovoCadastroVinculoFiscalPage.verificarToastSucesso();

    // Valida retorno à tela de vínculo fiscal
    NovoCadastroVinculoFiscalPage.verificarTabelaConfiguracoes();
    });
});
