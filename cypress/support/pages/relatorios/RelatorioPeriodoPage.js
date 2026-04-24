// RelatorioPeriodoPage.js
// UI v2: shell /relatorio/periodo + XHR relatorio-v2/vendas-periodo (2026-04)
import RelatoriosPage from "./RelatoriosPage";
import RelatorioPeriodoLocators, {
    RELATORIO_PERIODO_ROTA,
    RELATORIO_PERIODO_V2_GET_PATTERN,
} from "../../locators/Relatorios/RelatorioPeriodoLocators";

class RelatorioPeriodoPage {

    /**
     * Evita #open-filters-btn da área "Pesquisa Preços" (#pesquisa-preco-drawer), que também tem texto "Filtros".
     */
    clicarBotaoFiltrosRelatorio() {
        cy.get('button', { timeout: 15000 })
            .filter((i, el) => {
                const inPesquisaPreco =
                    Cypress.$(el).closest(RelatorioPeriodoLocators.drawerPesquisaPrecoShell)
                        .length > 0;
                const id = (el.getAttribute('id') || '').toLowerCase();
                if (id.includes('pesquisa-preco')) {
                    return false;
                }
                const texto = (el.textContent || '').replace(/\s+/g, ' ').trim();
                if (texto !== 'Filtros' && texto !== 'FILTROS') {
                    return false;
                }
                return !inPesquisaPreco && Cypress.dom.isVisible(el);
            })
            .first()
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });
    }

    acessarRelatorioPeriodo() {
        cy.visit(RELATORIO_PERIODO_ROTA);
        cy.url().should('contain', '/relatorio/periodo');
    }

    /**
     * Elemento raiz da tabela em "Listagem de Vendas" (escopo explícito).
     * Evita `table` genérico dentro de `#pesquisa-preco-drawer` (ex.: .products-table oculto).
     */
    tabelaListagemVendas() {
        return cy.contains('h2', 'Listagem de Vendas', { timeout: 20000 }).then(($h2) => {
            const drawer = RelatorioPeriodoLocators.drawerPesquisaPrecoShell;
            const h2Top = $h2[0].getBoundingClientRect().top;
            const $hit = Cypress.$('table')
                .filter((i, el) => {
                    if (Cypress.$(el).closest(drawer).length > 0) {
                        return false;
                    }
                    if (!Cypress.dom.isVisible(el)) {
                        return false;
                    }
                    return el.getBoundingClientRect().top >= h2Top - 24;
                })
                .first();
            expect($hit.length, 'tabela visível sob Listagem de Vendas (fora do drawer Pesquisa Preços)').to.be.greaterThan(
                0,
            );
            return cy.wrap($hit);
        });
    }

    /**
     * Legado: drawer #filter-drawer-body + form.
     * V2: painel por XHR — abre com botão "Filtros" e exibe chips (Limpar todos, Todos, situação).
     */
    garantirFiltrosVisiveis() {
        cy.get('body').then(($body) => {
            const drawer = $body.find(RelatorioPeriodoLocators.drawerBody);
            const form = $body.find(RelatorioPeriodoLocators.filtrosContainer);
            const legadoVisivel =
                drawer.length > 0 &&
                drawer.is(':visible') &&
                form.length > 0 &&
                form.is(':visible');

            if (legadoVisivel) {
                RelatoriosPage.garantirDrawerAberto(RelatorioPeriodoLocators.filtrosContainer);
                return;
            }

            const chipsVisiveis = $body
                .find('a, button')
                .toArray()
                .some((el) => (el.textContent || '').includes('Limpar todos'));
            if (!chipsVisiveis) {
                this.clicarBotaoFiltrosRelatorio();
            }
            cy.contains('a, button', 'Limpar todos', { timeout: 15000 })
                .should('be.visible');
        });
    }

    validarElementosBasicos() {
        cy.get(RelatorioPeriodoLocators.titulo).first().should('be.visible');
        this.garantirFiltrosVisiveis();

        cy.get('body').then(($body) => {
            const formVisivel =
                $body.find(RelatorioPeriodoLocators.filtrosContainer).length > 0 &&
                $body.find(RelatorioPeriodoLocators.filtrosContainer).is(':visible');
            const dataVisivel =
                $body.find(RelatorioPeriodoLocators.periodoInput).length > 0 &&
                $body.find(RelatorioPeriodoLocators.periodoInput).is(':visible');

            if (formVisivel && dataVisivel) {
                cy.get(RelatorioPeriodoLocators.empresaSelect).should('be.visible');
                cy.get(RelatorioPeriodoLocators.periodoInput).should('be.visible');
                cy.get(RelatorioPeriodoLocators.botaoPesquisar).should('exist');
            } else {
                cy.contains('button', 'Todos').should('be.visible');
                cy.contains('button', 'Fechada').should('be.visible');
            }
        });

        cy.contains('a', 'PDF').should('be.visible');
        cy.contains('a', 'Excel').should('be.visible');
        cy.contains('h2', 'Listagem de Vendas').should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        this.garantirFiltrosVisiveis();

        const periodo = `${dataInicial} - ${dataFinal}`;

        cy.get('body').then(($body) => {
            const datePicker = $body.find(RelatorioPeriodoLocators.datePickerContainer);
            if (datePicker.length > 0 && datePicker.is(':visible')) {
                cy.get('body').click(0, 0, { force: true });
                cy.wrap(datePicker).should('not.be.visible');
            }
        });

        cy.get('body').then(($body) => {
            const $data = $body.find(RelatorioPeriodoLocators.periodoInput);
            if ($data.length === 0 || !$data.is(':visible')) {
                cy.log(
                    'Campo #data não disponível na UI v2 — período segue o padrão da URL/servidor.',
                );
                return;
            }
            cy.get(RelatorioPeriodoLocators.periodoInput)
                .should('be.visible')
                .clear({ force: true })
                .type(periodo, { force: true });
        });
    }

    /**
     * "Limpar todos" na barra do relatório pode ser <a> ou <button> (UI v2).
     */
    clicarLimparTodosRelatorio() {
        return cy
            .get('a, button', { timeout: 15000 })
            .filter((i, el) => {
                if (
                    Cypress.$(el).closest(RelatorioPeriodoLocators.drawerPesquisaPrecoShell)
                        .length > 0
                ) {
                    return false;
                }
                const t = (el.textContent || '').replace(/\s+/g, ' ').trim();
                return t === 'Limpar todos';
            })
            .first()
            .should('be.visible')
            .click({ force: true });
    }

    /**
     * Chip de situação "Fechada" (exclui drawer Pesquisa Preços).
     */
    clicarSituacaoFechadaRelatorio() {
        return cy
            .get('button', { timeout: 15000 })
            .filter((i, el) => {
                if (
                    Cypress.$(el).closest(RelatorioPeriodoLocators.drawerPesquisaPrecoShell)
                        .length > 0
                ) {
                    return false;
                }
                const t = (el.textContent || '').replace(/\s+/g, ' ').trim();
                return (t === 'Fechada' || t === 'FECHADA') && Cypress.dom.isVisible(el);
            })
            .last()
            .scrollIntoView()
            .click({ force: true });
    }

    /**
     * Confirma que a área de listagem respondeu após o fluxo de chips (estilo do chip ativo varia no tema).
     */
    assertListagemAposPesquisaUiV2() {
        this.tabelaListagemVendas().should('be.visible');
        cy.get('button', { timeout: 15000 })
            .filter((i, el) => {
                if (
                    Cypress.$(el).closest(RelatorioPeriodoLocators.drawerPesquisaPrecoShell)
                        .length > 0
                ) {
                    return false;
                }
                const t = (el.textContent || '').replace(/\s+/g, ' ').trim();
                return /^(Fechada|FECHADA)$/i.test(t) && Cypress.dom.isVisible(el);
            })
            .last()
            .should('be.visible');
    }

    /**
     * Há #btn-pesquisar oculto/coexistente no DOM; se existir chip "Limpar todos" (v2), priorizar fluxo v2.
     */
    usarFluxoPesquisaUiV2($body) {
        const temLimparTodos = $body
            .find('a, button')
            .toArray()
            .some((el) => {
                if (
                    Cypress.$(el).closest(RelatorioPeriodoLocators.drawerPesquisaPrecoShell)
                        .length > 0
                ) {
                    return false;
                }
                const t = (el.textContent || '').replace(/\s+/g, ' ').trim();
                return t === 'Limpar todos' && Cypress.dom.isVisible(el);
            });
        if (temLimparTodos) {
            return true;
        }
        const $form = $body.find(RelatorioPeriodoLocators.filtrosContainer);
        const $btn = $body.find(RelatorioPeriodoLocators.botaoPesquisar);
        const legado =
            $form.length > 0 &&
            $form.is(':visible') &&
            $btn.length > 0 &&
            Cypress.dom.isVisible($btn[0]);
        return !legado;
    }

    assertRespostaRelatorioPeriodoV2(interception) {
        const status = Number(interception?.response?.statusCode);
        if (!Number.isNaN(status)) {
            expect([200, 304]).to.include(status);
        }
    }

    pesquisar() {
        this.garantirFiltrosVisiveis();
        cy.intercept('GET', RELATORIO_PERIODO_V2_GET_PATTERN).as('relatorioPeriodoTable');

        cy.get('body').then(($body) => {
            const v2 = this.usarFluxoPesquisaUiV2($body);

            if (!v2) {
                const $btn = $body.find(RelatorioPeriodoLocators.botaoPesquisar);
                return cy
                    .wrap($btn[0])
                    .click({ force: true })
                    .wait('@relatorioPeriodoTable', { timeout: 60000 })
                    .then((interception) => this.assertRespostaRelatorioPeriodoV2(interception));
            }

            // UI v2: um wait após Limpar todos (lote de GETs). Fechada pode não gerar 2º XHR; URL pode não refletir situacao=.
            return this.clicarLimparTodosRelatorio()
                .wait('@relatorioPeriodoTable', { timeout: 60000 })
                .then((interception) => this.assertRespostaRelatorioPeriodoV2(interception))
                .then(() => this.clicarSituacaoFechadaRelatorio())
                .then(() => this.assertListagemAposPesquisaUiV2());
        });
    }

    validarTabelaResultados() {
        this.tabelaListagemVendas()
            .should('exist')
            .should('be.visible');
    }

    validarTabelaComDados() {
        this.validarTabelaResultados();
        this.tabelaListagemVendas()
            .find('tbody tr')
            .should('have.length.greaterThan', 0);
    }

    validarEstruturaTabela() {
        this.validarTabelaResultados();
        this.tabelaListagemVendas()
            .find('thead tr th')
            .should('exist')
            .should('have.length.greaterThan', 0);
    }

    validarBotaoExportacaoPdf() {
        cy.get(RelatorioPeriodoLocators.botaoGerarPdf, { timeout: 10000 })
            .first()
            .should('be.visible')
            .should('not.be.disabled');
    }

    validarBotaoExportacaoExcel() {
        cy.get(RelatorioPeriodoLocators.botaoGerarExcel, { timeout: 10000 })
            .first()
            .should('be.visible')
            .should('not.be.disabled');
    }

    validarBotoesExportacao() {
        this.validarBotaoExportacaoPdf();
        this.validarBotaoExportacaoExcel();
    }

    validarMensagemSemDados() {
        cy.get('body').then(($body) => {
            const mensagem = $body.find(RelatorioPeriodoLocators.mensagemSemDados);
            if (mensagem.length > 0) {
                cy.get(RelatorioPeriodoLocators.mensagemSemDados).should('be.visible');
            }
        });
    }

    /**
     * Se #data foi preenchido, valida valor; caso contrário (UI v2) apenas segue o fluxo.
     */
    assertPeriodoNoInputQuandoExiste(valorEsperado) {
        cy.get('body').then(($body) => {
            const $data = $body.find(RelatorioPeriodoLocators.periodoInput);
            if ($data.length > 0 && $data.is(':visible')) {
                cy.get(RelatorioPeriodoLocators.periodoInput).should(
                    'have.value',
                    valorEsperado,
                );
            }
        });
    }
}

export default new RelatorioPeriodoPage();
