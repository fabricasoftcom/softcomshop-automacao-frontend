import RelatoriosPage from "./RelatoriosPage";
import RelatorioCaixaLocators from "../../locators/Relatorios/RelatorioCaixaLocators";
import RelatoriosDrawerLocators from "../../locators/Relatorios/RelatoriosDrawerLocators";

class RelatorioCaixaPage {

    acessarRelatorioCaixa() {
        RelatoriosPage.acessarRelatorioFinanceiroCaixa();
        cy.url().should('contain', '/relatorio-v2/vendas-caixa');
    }

    acessarRelatorioCaixaViaRelatoriosGerais() {
        RelatoriosPage.acessarRelatorioViaRelatoriosGerais('Caixa');
        this.garantirFiltrosVisiveis();
    }

    garantirFiltrosVisiveis() {
        cy.get('body').then(($body) => {
            if ($body.find(RelatoriosDrawerLocators.drawerBody).length > 0 ||
                $body.find(RelatoriosDrawerLocators.btnFiltros).length > 0) {
                RelatoriosPage.garantirDrawerAberto(RelatorioCaixaLocators.filtrosContainer);
            } else {
                cy.get(RelatorioCaixaLocators.filtrosContainer, { timeout: 10000 }).should('be.visible');
            }
        });
    }

    validarElementosBasicos() {
        cy.get(`body ${RelatorioCaixaLocators.titulo}, body h1, body h2`, { timeout: 10000 })
            .filter((_, el) => /Caixa/i.test((el.textContent || '').trim()))
            .first()
            .should('be.visible');

        this.garantirFiltrosVisiveis();

        cy.get(RelatorioCaixaLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioCaixaLocators.periodoInput).should('be.visible');
        cy.get(RelatorioCaixaLocators.turnoInput).should('exist');
        cy.get(RelatorioCaixaLocators.tipoBotaoSintetico).should('be.visible');
        cy.get(RelatorioCaixaLocators.tipoBotaoAnalitico).should('be.visible');
        cy.get(RelatorioCaixaLocators.tipoBotaoConsolidado).should('be.visible');
        cy.get(RelatorioCaixaLocators.periodoBotaoHoje).should('be.visible');
        cy.get(RelatorioCaixaLocators.botaoAplicarFiltrosNoFormCaixa).should('be.visible');
    }

    validarElementosBasicosViaRelatoriosGerais() {
        cy.get('#relatorio-filters-drawer-title', { timeout: 10000 })
            .should('be.visible')
            .invoke('text')
            .then((t) => expect(t.trim()).to.eq('Caixa'));
        this.garantirFiltrosVisiveis();

        cy.get(RelatorioCaixaLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioCaixaLocators.periodoInput).should('be.visible');
        cy.get(RelatorioCaixaLocators.turnoInput).should('exist');
        cy.get(RelatorioCaixaLocators.tipoBotaoSintetico).should('be.visible');
        cy.get(RelatorioCaixaLocators.tipoBotaoAnalitico).should('be.visible');
        cy.get(RelatorioCaixaLocators.tipoBotaoConsolidado).should('be.visible');
        cy.get(RelatorioCaixaLocators.periodoBotaoHoje).should('be.visible');
        cy.get(RelatorioCaixaLocators.botaoPesquisarRelatoriosGerais).should('be.visible');
    }

    selecionarTipo(tipoValue) {
        this.garantirFiltrosVisiveis();

        const tipoNormalizado = String(tipoValue || '').trim().toLowerCase();
        const mapa = {
            sintetico: RelatorioCaixaLocators.tipoBotaoSintetico,
            'sintético': RelatorioCaixaLocators.tipoBotaoSintetico,
            analitico: RelatorioCaixaLocators.tipoBotaoAnalitico,
            'analítico': RelatorioCaixaLocators.tipoBotaoAnalitico,
            consolidado: RelatorioCaixaLocators.tipoBotaoConsolidado,
        };

        const locator = mapa[tipoNormalizado];
        if (!locator) {
            cy.log(`Tipo de relatório não reconhecido: ${tipoValue}`);
            return;
        }

        cy.get(locator, { timeout: 10000 }).first().should('be.visible').click({ force: true });
    }

    selecionarPeriodoRapido(opcao) {
        this.garantirFiltrosVisiveis();
        const key = String(opcao || '').trim().toLowerCase();
        const mapa = {
            hoje: RelatorioCaixaLocators.periodoBotaoHoje,
            ontem: RelatorioCaixaLocators.periodoBotaoOntem,
        };

        const locator = mapa[key];
        if (!locator) {
            cy.log(`Período rápido não reconhecido: ${opcao}`);
            return;
        }

        cy.get(locator, { timeout: 10000 }).first().should('be.visible').click({ force: true });

        cy.get(RelatorioCaixaLocators.periodoInput, { timeout: 10000 })
            .should(($el) => {
                const v = String($el.val() || '').trim();
                expect(v.length).to.be.greaterThan(0);
                expect(v).to.match(/\d{2}\/\d{2}\/\d{4}/);
            });
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioCaixaLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    preencherTurno(turno) {
        cy.get(RelatorioCaixaLocators.turnoInput, { timeout: 10000 }).then(($el) => {
            if ($el.is('select')) {
                cy.wrap($el).select(String(turno), { force: true });
            } else {
                cy.wrap($el).clear({ force: true }).type(String(turno), { force: true });
            }
        });
    }

    limparTurno() {
        cy.get(RelatorioCaixaLocators.turnoInput, { timeout: 10000 }).then(($el) => {
            if ($el.is('select')) {
                const valPrimeira = $el.find('option').first().val();
                cy.wrap($el).select(valPrimeira, { force: true });
            } else {
                cy.wrap($el).clear({ force: true });
            }
        });
    }

    preencherVendedor(termo = 'a') {
        this.garantirFiltrosVisiveis();
        this.preencherTypeahead(RelatorioCaixaLocators.vendedorAutocomplete, termo, RelatorioCaixaLocators.vendedorPrimeiraOpcao);
    }

    preencherDispositivo(termo = 'a') {
        this.garantirFiltrosVisiveis();
        this.preencherTypeahead(RelatorioCaixaLocators.dispositivoAutocomplete, termo, RelatorioCaixaLocators.dispositivoPrimeiraOpcao);
    }

    preencherUsuarioCaixa(termo = 'a') {
        this.garantirFiltrosVisiveis();
        this.preencherTypeahead(RelatorioCaixaLocators.usuarioCaixaAutocomplete, termo, RelatorioCaixaLocators.usuarioCaixaPrimeiraOpcao);
    }

    preencherTypeahead(inputLocator, termo, firstOptionLocator) {
        cy.get(inputLocator, { timeout: 10000 })
            .scrollIntoView()
            .should('be.visible')
            .clear({ force: true })
            .type(termo, { force: true });

        cy.get(firstOptionLocator, { timeout: 10000 })
            .filter(':visible')
            .first()
            .click({ force: true });
    }

    pesquisar() {
        // Prioriza o botão do drawer (quando existe/está visível)
        cy.get(RelatorioCaixaLocators.botaoAplicarFiltrosNoFormCaixa, { timeout: 2000 })
            .then(($btn) => {
                if ($btn.filter(':visible').length) {
                    cy.wrap($btn.filter(':visible').first()).click({ force: true });
                    cy.get(RelatoriosDrawerLocators.drawerBody, { timeout: 10000 }).should('not.be.visible');
                    return;
                }

                cy.get(RelatorioCaixaLocators.botaoPesquisar, { timeout: 10000 })
                    .filter(':visible')
                    .first()
                    .click({ force: true });
            });
    }

    validarKpisEAcordeonsEFiltrosAtivos() {
        cy.contains('Filtros ativos', { timeout: 30000 }).should('be.visible');
        cy.contains(/Data inicial/i).should('be.visible');
        cy.contains(/Empresa:/i).should('be.visible');
        cy.contains(/Tipo de relat[oó]rio:/i).should('be.visible');

        cy.contains(/Total de Vendas/i, { timeout: 30000 }).should('be.visible');
        cy.contains(/Total de Entradas/i).should('be.visible');
        cy.contains(/Total de Sa[ií]das/i).should('be.visible');
        cy.contains(/Saldo Geral/i).should('be.visible');

        cy.contains('h3.collapse-section-title:visible', /Movimenta[cç][aã]o do Caixa/i, { timeout: 30000 }).should('be.visible');
        cy.contains('h3.collapse-section-title:visible', /Totaliza[cç][aã]o do Caixa/i).should('be.visible');
        cy.contains('h3.collapse-section-title:visible', /Vendas Cart[aã]o/i).should('be.visible');
    }

    validarAcordeonVendasPorPedidoDetalhamentoComVendas() {
        cy.contains(`${RelatorioCaixaLocators.acordeonTitulo}:visible`, /Vendas por Pedido \(Detalhamento\)/i, { timeout: 30000 })
        .scrollIntoView()
        .should('be.visible')
        .closest(RelatorioCaixaLocators.acordeonSecao)
        .within(() => {
          cy.contains('th', /Pedido/i, { timeout: 30000 }).should('be.visible');
          cy.contains('th', /Cliente/i).should('be.visible');
          cy.contains(/Ver detalhes/i).should('be.visible'); // garante que há itens listados
          cy.get('tbody tr').should('have.length.greaterThan', 0);
        });
    }

    validarAcordeonsConsolidadosFormaPagamentoECartao() {
        cy.contains(`${RelatorioCaixaLocators.acordeonTitulo}:visible`, /Forma de pagamento consolidado/i, { timeout: 30000 })
            .scrollIntoView()
            .should('be.visible');

        cy.contains(`${RelatorioCaixaLocators.acordeonTitulo}:visible`, /Cart[aã]o Bandeiras consolidado/i, { timeout: 30000 })
            .scrollIntoView()
            .should('be.visible');
    }

    validarTabelaResultados() {
        cy.get(RelatorioCaixaLocators.tabelaResultados, { timeout: 10000 })
            .should('exist')
            .should('be.visible');
    }

    validarEstruturaTabela() {
        this.validarTabelaResultados();
        cy.get(RelatorioCaixaLocators.tabelaResultados)
            .find('thead tr th')
            .should('exist')
            .should('have.length.greaterThan', 0);
    }

    validarBotaoExportacaoPdf() {
        cy.get(RelatorioCaixaLocators.botaoGerarPdf, { timeout: 10000 })
            .filter(':visible')
            .first()
            .should('be.visible')
            .should('not.be.disabled');
    }

    validarBotaoImprimir80mm() {
        cy.get(RelatorioCaixaLocators.botaoImprimir80mm, { timeout: 10000 })
            .filter(':visible')
            .first()
            .should('be.visible')
            .should('not.be.disabled');
    }

    validarBotoesExportacao() {
        this.validarBotaoExportacaoPdf();
        this.validarBotaoImprimir80mm();
    }

    periodoLongoParaRegressaoPdf(dias = 15) {
        const fim = new Date();
        const ini = new Date();
        ini.setDate(fim.getDate() - (dias - 1));
        const pad = (n) => String(n).padStart(2, '0');
        const fmt = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
        return { inicio: fmt(ini), fim: fmt(fim) };
    }

    /**
     * Pesquisa relatório de caixa com intervalo longo e aciona "Gerar PDF" (regressão timeout 504 / erro 500).
     */
    preencherPesquisarEGerarPdfPeriodoLongo(dias = 15) {
        const { inicio, fim } = this.periodoLongoParaRegressaoPdf(dias);
        this.preencherPeriodo(inicio, fim);
        this.selecionarTipo('sintetico');
        this.pesquisar();
        cy.verificarErro500Visual();
        cy.contains('Filtros ativos', { timeout: 120000 }).should('be.visible');
        this.validarBotaoExportacaoPdf();
        cy.get(RelatorioCaixaLocators.botaoGerarPdf, { timeout: 20000 })
            .filter(':visible')
            .first()
            .should('not.be.disabled')
            .click({ force: true });
        cy.get('body', { timeout: 90000 }).find('img.error-image').should('not.exist');
        cy.verificarErro500Visual();
    }
}

export default new RelatorioCaixaPage();
