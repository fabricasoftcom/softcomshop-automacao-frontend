// MeuLucroPage.js
import MeuLucroLocators from '../../locators/Financeiro/MeuLucroLocators';
import MenulateralFinanceiroPage from '../menulateral/MenulateralFinanceiroPage';

class MeuLucroPage {

    // Desabilitar tutorial do Meu Lucro
    desabilitarTutorialMeuLucro() {
        const baseUrl = Cypress.config('baseUrl');
        // Padrão similar ao NFe: tour_${baseUrl}_${id}_${tipo}
        // Baseado no padrão do NFe, a chave mais provável é: tour_${baseUrl}_1_meu_lucro
        // Mas vamos tentar várias variações para garantir
        const possiveisChaves = [
            `tour_${baseUrl}_1_meu_lucro`, // Padrão mais provável (similar ao NFe)
            `tour_${baseUrl}_meu_lucro`,
            `tour_${baseUrl}_1_financeiro_meu_lucro`,
            `tour_${baseUrl}_financeiro_meu_lucro`,
            `tour_meu_lucro`,
            `tour_${baseUrl}_lucro`,
            `tour_${baseUrl}_1_lucro`,
            `tour_${baseUrl}_1_configuracao_meu_lucro` // Possível chave para o modal de configurações
        ];

        cy.window().then((win) => {
            possiveisChaves.forEach((chave) => {
                win.localStorage.setItem(chave, '1');
            });
        });
    }

    // Navegação
    acessarTela() {
        // Desabilita o tutorial antes de acessar a tela
        this.desabilitarTutorialMeuLucro();

        MenulateralFinanceiroPage.acessarMeuLucro();
        cy.url().should('include', '/financeiro/meu-lucro/visao-geral');

        // Verifica se está na tela inicial (página de apresentação) e clica no link para iniciar
        cy.get('body').then(($body) => {
            const linkComece = $body.find('a').filter((i, el) =>
                Cypress.$(el).text().includes('Comece')
            );
            if (linkComece.length > 0) {
                cy.contains('Comece').click();
                // Aguarda a URL mudar para incluir o ID do período
                cy.url().should('match', /\/financeiro\/meu-lucro\/visao-geral\/\d+/);
                // Aguarda o carregamento do dashboard
                cy.get(MeuLucroLocators.contentLayout, { timeout: 10000 }).should('be.visible');
            }
        });

        this.validarTelaCarregada();

        // Fecha o modal de tutorial se ainda aparecer (fallback)
        cy.get('body').then(($body) => {
            if ($body.find('#content-plus.modal.in').length > 0) {
                cy.get('#content-plus .close, #content-plus button.close').first().click({ force: true });
                cy.wait(500);
            }
        });

        // Garante que a tab "MEU LUCRO REALIZADO" esteja ativa (alguns ambientes abrem em outra tab)
        this.clicarTabLucroRealizado();
        cy.get(MeuLucroLocators.boxRelatorioRealizado, { timeout: 10000 })
            .should('have.css', 'display', 'block')
            .and('be.visible');
    }

    // Validações gerais
    validarTelaCarregada() {
        cy.get(MeuLucroLocators.contentLayout, { timeout: 10000 }).should('be.visible');
        cy.get(MeuLucroLocators.titulo).should('be.visible').and('contain.text', 'Meu Lucro');
    }

    validarCampoData() {
        cy.get(MeuLucroLocators.campoData).should('be.visible');
        cy.get(MeuLucroLocators.campoData).should('not.have.value', '');
    }

    // Botões principais
    validarBotaoConfiguracoes() {
        cy.get(MeuLucroLocators.btnConfiguracoes).should('be.visible');
        cy.get(MeuLucroLocators.btnConfiguracoes).should('contain.text', 'Configurações');
    }

    validarBotaoGerarPdf() {
        cy.get(MeuLucroLocators.btnGerarPdf).should('be.visible');
        cy.get(MeuLucroLocators.btnGerarPdf).should('contain.text', 'Gerar PDF');
    }

    validarBotaoEditarMeta() {
        // O botão está dentro da tab ativa (box-relatorio-realizado)
        cy.get('#box-relatorio-realizado')
            .should('have.css', 'display', 'block')
            .and('be.visible');
        cy.get(MeuLucroLocators.btnEditarMeta).should('be.visible');
        cy.get(MeuLucroLocators.btnEditarMeta).should('contain.text', 'Editar');
    }

    // Tabs
    validarTabLucroRealizado() {
        cy.contains('MEU LUCRO REALIZADO').should('be.visible');
    }

    validarTabLucroProjetado() {
        cy.contains('MEU LUCRO PROJETADO').should('be.visible');
    }

    clicarTabLucroRealizado() {
        // Fecha modal de ajuda se estiver aberto
        cy.get('body').then(($body) => {
            if ($body.find('#content-plus.modal.in').length > 0) {
                cy.get('#content-plus .close, #content-plus button.close').first().click({ force: true });
                cy.get('#content-plus').should('not.be.visible');
            }
        });
        cy.contains('MEU LUCRO REALIZADO').click({ force: true });
    }

    clicarTabLucroProjetado() {
        cy.contains('MEU LUCRO PROJETADO').click({ force: true });
    }

    validarTabRealizadoVisivel(timeout = 10000) {
        cy.get(MeuLucroLocators.boxRelatorioRealizado, { timeout })
            .should('have.css', 'display', 'block')
            .and('be.visible');
        return this;
    }

    validarTabProjetadoVisivel(timeout = 10000) {
        cy.get(MeuLucroLocators.boxRelatorioProjetado, { timeout }).should('be.visible');
        return this;
    }

    validarUrlGerarPdf() {
        cy.get(MeuLucroLocators.btnGerarPdf)
            .should('have.attr', 'href')
            .and('include', '/financeiro/meu-lucro/print-pdf');
        return this;
    }

    // Seção Meta de Lucro
    validarSecaoMetaLucro() {
        cy.contains('META DE LUCRO').should('be.visible');
    }

    validarCampoMetaLucro() {
        // Garante que a tab Realizado está ativa (pode não ter a classe active, mas o conteúdo deve estar visível)
        cy.get('#box-relatorio-realizado', { timeout: 10000 }).should('be.visible');
        cy.get(MeuLucroLocators.campoMetaLucro).should('be.visible');
    }

    // Tabela de Ponto de Equilíbrio
    validarTabelaPontoEquilibrio() {
        cy.get(MeuLucroLocators.tabelaPontoEquilibrio).should('be.visible');
        cy.get(MeuLucroLocators.theadTabela).should('be.visible');
        cy.get(MeuLucroLocators.tbodyTabela).should('be.visible');
    }

    validarTabelaPontoEquilibrioTemDados() {
        cy.get(MeuLucroLocators.linhasTabela).should('have.length.greaterThan', 0);
    }

    // Gráfico
    validarSecaoGrafico() {
        cy.contains('GRÁFICO DO PONTO DE EQUILÍBRIO').should('be.visible');
    }

    // Modal de Configurações
    abrirModalConfiguracoes() {
        cy.get(MeuLucroLocators.btnConfiguracoes).should('be.visible').click({ force: true });
        cy.get(MeuLucroLocators.modalConfiguracoes, { timeout: 10000 }).should('be.visible');
        cy.get(MeuLucroLocators.modalTitulo).should('contain.text', 'Configurações');
    }

    fecharModalConfiguracoes() {
        cy.get(MeuLucroLocators.btnFecharModal).should('be.visible').click();
        cy.get(MeuLucroLocators.modalConfiguracoes).should('not.be.visible');
    }

    validarModalConfiguracoesVisivel() {
        cy.get(MeuLucroLocators.modalConfiguracoes).should('be.visible');
        cy.get(MeuLucroLocators.modalTitulo).should('contain.text', 'Configurações');
    }

    // Campos do modal - Informações básicas
    validarCampoLucroPretendido() {
        cy.get(MeuLucroLocators.campoLucroPretendido).should('be.visible');
    }

    validarCampoSaldoCaixa() {
        cy.get(MeuLucroLocators.campoSaldoCaixa).should('be.visible');
    }

    validarCampoQuantidadeFuncionarios() {
        cy.get(MeuLucroLocators.campoQuantidadeFuncionarios).should('be.visible');
    }

    validarCampoTamanhoEstrutura() {
        cy.get(MeuLucroLocators.campoTamanhoEstrutura).should('be.visible');
    }

    // Campos do modal - Despesas fixas
    validarCampoFolhaPagamento() {
        cy.get(MeuLucroLocators.campoFolhaPagamento).should('be.visible');
    }

    validarCampoProLabore() {
        cy.get(MeuLucroLocators.campoProLabore).should('be.visible');
    }

    validarCampoAluguel() {
        cy.get(MeuLucroLocators.campoAluguel).should('be.visible');
    }

    validarCampoOutrasDespesasFixas() {
        cy.get(MeuLucroLocators.campoOutrasDespesasFixas).should('be.visible');
    }

    // Campos do modal - Despesas variáveis
    validarCampoImposto() {
        cy.get(MeuLucroLocators.campoImposto).should('be.visible');
    }

    validarCampoTaxaAntecipacao() {
        cy.get(MeuLucroLocators.campoTaxaAntecipacao).should('be.visible');
    }

    validarCampoComissao() {
        cy.get(MeuLucroLocators.campoComissao).should('be.visible');
    }

    validarCampoOutrasDespesasVariaveis() {
        cy.get(MeuLucroLocators.campoOutrasDespesasVariaveis).should('be.visible');
    }

    validarCampoMargemLucroBruto() {
        cy.get(MeuLucroLocators.campoMargemLucroBruto).should('be.visible');
    }

    validarCampoCMV() {
        cy.get(MeuLucroLocators.campoCMV).should('be.visible');
    }

    // Campos do modal - Categorias
    validarCampoCategoriaReceita() {
        cy.get(MeuLucroLocators.campoCategoriaReceita).scrollIntoView().should('be.visible');
    }

    validarCampoCategoriaDespesa() {
        cy.get(MeuLucroLocators.campoCategoriaDespesa).scrollIntoView().should('be.visible');
    }

    // Botões do modal
    validarBotaoCancelar() {
        // O botão pode estar dentro de um container que precisa ser scrollado
        cy.get(MeuLucroLocators.btnAcaoBox, { timeout: 10000 })
            .should('not.have.css', 'display', 'none');
        cy.get(MeuLucroLocators.btnCancelar).scrollIntoView().should('be.visible');
        cy.get(MeuLucroLocators.btnCancelar).should('contain.text', 'Cancelar');
    }

    validarBotaoSalvar() {
        cy.get(MeuLucroLocators.btnSalvar).should('be.visible');
        cy.get(MeuLucroLocators.btnSalvar).should('contain.text', 'Salvar');
    }

    // Validações completas
    validarElementosPrincipais() {
        this.validarBotaoConfiguracoes();
        this.validarBotaoGerarPdf();
        this.validarTabLucroRealizado();
        this.validarTabLucroProjetado();
        this.validarSecaoMetaLucro();
        this.validarTabelaPontoEquilibrio();
        this.validarSecaoGrafico();
    }

    validarCamposModalConfiguracoes() {
        this.validarCampoLucroPretendido();
        this.validarCampoSaldoCaixa();
        this.validarCampoQuantidadeFuncionarios();
        this.validarCampoTamanhoEstrutura();
        this.validarCampoFolhaPagamento();
        this.validarCampoProLabore();
        this.validarCampoAluguel();
        this.validarCampoOutrasDespesasFixas();
        this.validarCampoImposto();
        this.validarCampoTaxaAntecipacao();
        this.validarCampoComissao();
        this.validarCampoOutrasDespesasVariaveis();
        this.validarCampoMargemLucroBruto();
        this.validarCampoCMV();
        this.validarCampoCategoriaReceita();
        this.validarCampoCategoriaDespesa();
        this.validarBotaoCancelar();
        this.validarBotaoSalvar();
    }
}

export default new MeuLucroPage();

