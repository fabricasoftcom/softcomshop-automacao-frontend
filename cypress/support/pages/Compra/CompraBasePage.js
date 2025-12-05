import CadastroCompraLocators from "../../locators/Compra/CadastroCompraLocators";

class CompraBasePage {
    // ========== MÉTODOS COMUNS PARA TODOS OS FLUXOS ==========

    acessarPaginaCompra() {
        cy.visit('/compra');
        this.aguardarCarregamento();
        return this;
    }

    aguardarCarregamento() {
        cy.get('body').then(($body) => {
            if ($body.find('#loading').length > 0) {
                cy.get('#loading', { timeout: 20000 }).should('not.exist');
            }
        });
        return this;
    }

    clicarExcluir() {
        cy.wait(10000);
        cy.get('.title_nota_fiscal_de_compra .btn-danger:contains("Excluir")', { timeout: 100000 })
            .should('be.visible')
            .click();
        // Aguarda um pouco após o clique para o sweet-alert aparecer
        cy.wait(1500);
        return this;
    }

    confirmarExclusao() {
        // Aguarda o sweet-alert aparecer - tenta diferentes seletores comuns
        cy.get('.sweet-alert.showSweetAlert.visible, .sweet-alert.modal-confirm-destroy, .sweet-alert:visible, .sweet-alert', { timeout: 20000 })
            .should('be.visible')
            .then(($alert) => {
                // Verifica se contém a mensagem esperada
                cy.wrap($alert).within(() => {
                    cy.contains('Você realmente deseja excluir essas informações?', { timeout: 10000, matchCase: false })
                        .should('be.visible');
                });
            });
        cy.wait(1000);
        // Clica no botão de confirmar - tenta diferentes seletores
        cy.get('.sweet-alert .confirm, .sweet-alert .sa-confirm-button-container .confirm, .sweet-alert button.confirm', { timeout: 10000 })
            .should('be.visible')
            .click({ force: true });
        // Aguarda o sweet-alert desaparecer
        cy.get('.sweet-alert', { timeout: 20000 }).should('not.exist');
        this.aguardarCarregamento();
        return this;
    }

    excluirNFeImportada() {
        this.clicarExcluir();
        this.confirmarExclusao();
        return this;
    }

    validarMensagemSucesso() {
        cy.contains('Pronto, tudo organizado.', { timeout: 10000 })
            .should('be.visible');
        return this;
    }

    validarMensagemErro() {
        cy.contains('Verifique se o campo obrigatório está preenchido!', { timeout: 10000 })
            .should('be.visible');
        return this;
    }

    gerarPagamentoPadrao() {
        cy.get(CadastroCompraLocators.btnGerarPagamento).should('be.visible').click();
        // Aguarda modal aparecer
        cy.get(CadastroCompraLocators.modalVisivel, { timeout: 10000 }).should('be.visible');
        cy.wait(1000);
        // Clica no ícone de autocomplete da forma de pagamento
        cy.get(CadastroCompraLocators.modalFormaPagamentoIcon).should('be.visible').click({ force: true });
        cy.wait(1500);
        // Seleciona a primeira forma de pagamento disponível
        cy.get(CadastroCompraLocators.modalSugestoesFormaPagamento)
            .should('have.length.at.least', 1)
            .first()
            .find('a')
            .click({ force: true });
        cy.wait(1000);
        // Salva o pagamento
        cy.get(CadastroCompraLocators.modalBtnSalvarPagamento)
            .should('be.visible')
            .click({ force: true });
        // Aguarda modal fechar
        this.aguardarFechamentoModal(CadastroCompraLocators.modalVisivel);
        cy.wait(2000);

        // Valida que o pagamento foi criado
        cy.get(CadastroCompraLocators.linhasPagamentos, { timeout: 15000 })
            .should('have.length.at.least', 1);
        return this;
    }

    salvarCompra() {
        cy.get(CadastroCompraLocators.btnTopoSalvar)
            .should('be.visible')
            .and('not.have.class', 'ocultar')
            .click();

        cy.url({ timeout: 30000 }).should('match', /\/compra\/\d+(\/editar)?/);

        cy.get(CadastroCompraLocators.btnTopoExcluir, { timeout: 10000 }).should(
            'not.have.class',
            'ocultar'
        );
        return this;
    }

    excluirCompraAtual() {
        cy.get(CadastroCompraLocators.btnTopoExcluir)
            .should('be.visible')
            .and('not.have.class', 'ocultar')
            .click();

        cy.get('.sweet-alert').should('be.visible');
        cy.wait(500);
        cy.contains('.sweet-alert button', /Sim, pode excluir!/i)
            .should('be.visible')
            .click({ force: true });

        cy.url({ timeout: 30000 }).should('include', '/compra');
        return this;
    }

    aplicarDescontoPercentual(percentual = '5,00') {
        cy.get(CadastroCompraLocators.btnAplicarDesconto)
            .should('be.visible')
            .and('not.have.class', 'ocultar')
            .click();

        cy.get(CadastroCompraLocators.formAplicarDesconto).should('be.visible');
        cy.get(CadastroCompraLocators.selectTipoDesconto).select('DESCONTO');
        cy.get(CadastroCompraLocators.inputDescontoPercentual)
            .clear()
            .type(percentual)
            .blur();
        cy.wait(400);

        cy.get('body').then(($body) => {
            const botaoAplicar = $body.find('#btn_aplicar_desconto, #btn_aplicar');
            if (botaoAplicar.length) {
                cy.wrap(botaoAplicar.first())
                    .should('be.visible')
                    .and('not.be.disabled')
                    .click({ force: true });
            }
        });

        cy.wait(2000);
        return this;
    }

    aguardarFechamentoModal(locator, tempoExtra = 1500) {
        cy.wait(tempoExtra);
        cy.get('body', { timeout: tempoExtra + 15000 }).then(($body) => {
            const modal = $body.find(locator);
            if (modal.length) {
                cy.wrap(modal.first()).should('not.be.visible');
            } else {
                cy.log('Modal fechado e removido do DOM.');
            }
        });
        return this;
    }

    validarPainelPagamentos() {
        // Quando não há pagamentos, pode não haver tabela ou pode haver uma mensagem
        // Valida que não há linhas de pagamento
        cy.get('body').then(($body) => {
            const tabela = $body.find('table.tabela-pagamento, .table-pagamentos');
            if (tabela.length > 0) {
                // Se a tabela existe, verifica que não há linhas ou há mensagem de "sem resultados"
                cy.get(CadastroCompraLocators.linhasPagamentos).should('have.length', 0);
            } else {
                // Se não há tabela, valida que o painel de pagamentos existe mas está vazio
                cy.get('.panel_content_pagamentos, [class*="pagamento"]').should('exist');
            }
        });
        return this;
    }
}

export default CompraBasePage;

