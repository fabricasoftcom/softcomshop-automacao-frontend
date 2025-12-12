import ContaCorrenteCadastroLocator from "../../locators/Financeiro/ContaCorrenteCadastroLocator";

class ContaCorrenteEdicaoPage {
    validarCamposPreenchidos() {
        const campos = [
            ContaCorrenteCadastroLocator.descricao,
            ContaCorrenteCadastroLocator.agencia,
            ContaCorrenteCadastroLocator.agenciaDV,
            ContaCorrenteCadastroLocator.contaCorrente,
            ContaCorrenteCadastroLocator.contaDV,
            ContaCorrenteCadastroLocator.saldoInicial,
            ContaCorrenteCadastroLocator.dataSaldoInicial,
            ContaCorrenteCadastroLocator.limiteCredito,
            ContaCorrenteCadastroLocator.recipientCode,
            ContaCorrenteCadastroLocator.lastOurNumber,
            ContaCorrenteCadastroLocator.lastDispatch,
            ContaCorrenteCadastroLocator.walletVariation,
            ContaCorrenteCadastroLocator.companyCode,
            ContaCorrenteCadastroLocator.posto,
        ];

        campos.forEach((campo) => {
            this.validarCampo(campo);
        });
    }

    /**
     * Valida um único campo, verificando se está visível e preenchido (se aplicável).
     * Aguarda que o campo esteja completamente carregado antes de validar.
     * @param {string} campo - O seletor do campo a ser validado.
     */
    validarCampo(campo) {
        // Aguarda que o loading desapareça e a página esteja carregada
        cy.get('#loading').should('not.exist');

        // Aguarda que o campo exista e esteja visível (com timeout maior para campos que carregam dinamicamente)
        cy.get(campo, { timeout: 15000 })
            .should('exist') // Garante que o elemento existe
            .and('be.visible') // Garante que o elemento está visível
            .then(($el) => {
                // Se o campo não estiver desabilitado, valida que está preenchido
                if (!$el.prop('disabled')) {
                    cy.wrap($el)
                        .invoke('val')
                        .should('not.be.empty'); // Valida que o campo está preenchido
                    cy.log(`✅ Validação concluída com sucesso para o campo: ${campo}`);
                } else {
                    cy.log(`ℹ️ Campo desabilitado, não será validado: ${campo}`);
                }
            });
    }
    /**
     * Encontra o switchery de ativação/desativação tentando múltiplos locators
     * Aguarda que o elemento esteja completamente renderizado antes de retornar
     * @returns {Cypress.Chainable} Chainable do elemento switchery encontrado
     */
    encontrarSwitchery() {
        // Aguarda o loading desaparecer completamente
        cy.get('#loading').should('not.exist');

        // Tenta encontrar o switch em diferentes estruturas possíveis
        // Usa validação condicional em vez de wait fixo
        return cy.get('body').then(($body) => {
            const divActive = $body.find('#div_active .switchery');
            const divPattern = $body.find('#div_patternBankAccount .switchery');
            const anySwitchery = $body.find('.switchery:visible');

            if (divActive.length > 0 && divActive.is(':visible')) {
                cy.log('✅ Switchery encontrado em #div_active');
                // Aguarda explicitamente que o switchery esteja visível
                return cy.get('#div_active .switchery', { timeout: 15000 })
                    .should('be.visible')
                    .should('exist');
            } else if (divPattern.length > 0 && divPattern.is(':visible')) {
                cy.log('✅ Switchery encontrado em #div_patternBankAccount');
                // Aguarda explicitamente que o switchery esteja visível
                return cy.get('#div_patternBankAccount .switchery', { timeout: 15000 })
                    .should('be.visible')
                    .should('exist');
            } else if (anySwitchery.length > 0) {
                cy.log('✅ Usando primeiro switchery visível encontrado');
                return cy.get('.switchery:visible', { timeout: 15000 })
                    .first()
                    .should('be.visible');
            } else {
                // Se não encontrou nenhum, aguarda um pouco mais e tenta novamente
                cy.log('⚠️ Nenhum switchery encontrado, aguardando renderização...');
                // Aguarda que qualquer switchery apareça na página
                return cy.get('.switchery', { timeout: 20000 })
                    .first()
                    .should('be.visible')
                    .should('exist');
            }
        });
    }

    desativarConta() {
        cy.get('#loading').should('not.exist');
        // Encontra o switchery e verifica se está ativado
        this.encontrarSwitchery().then(($switchery) => {
            if ($switchery && $switchery.length > 0) {
                cy.wrap($switchery).find('small').then(($small) => {
                    const style = $small.attr('style') || '';
                    if (style.includes('left: 20px')) {
                        // Está ativado → clica para desativar
                        cy.wrap($switchery).click();
                    }
                });
            } else {
                cy.log('Switchery não encontrado, pulando desativação');
            }
        });
    }

    ativarConta() {
        cy.get('#loading').should('not.exist');
        // Encontra o switchery e verifica se está desativado
        this.encontrarSwitchery().then(($switchery) => {
            if ($switchery && $switchery.length > 0) {
                cy.wrap($switchery).find('small').then(($small) => {
                    const style = $small.attr('style') || '';
                    if (!style.includes('left: 20px')) {
                        // Está desativado → ativa clicando
                        cy.wrap($switchery).click();
                    }
                });
            } else {
                cy.log('Switchery não encontrado, pulando ativação');
            }
        });
    }
    salvar() {
        cy.get('.btn:contains("Salvar")').click();
    }
    validarSucesso() {
        cy.get('.Toastify__toast--success').should('be.visible');
    }
    alterarUltimoNumeroRemessa(novoNumero) {
        // Aguarda que o loading desapareça
        cy.get('#loading').should('not.exist');

        // Aguarda que o campo esteja visível (pode estar em seção colapsada)
        // Usa timeout maior pois o campo pode estar em seção que precisa ser expandida
        cy.get(ContaCorrenteCadastroLocator.lastDispatch, { timeout: 15000 })
            .should('exist')
            .and('be.visible')
            .scrollIntoView() // Garante que o campo está visível na viewport
            .clear()
            .type(novoNumero);
    }
    validarUltimoNumeroRemessa(numeroEsperado) {
        cy.get(ContaCorrenteCadastroLocator.lastDispatch)
            .invoke('val')
            .should('equal', numeroEsperado);
    }
}

export default new ContaCorrenteEdicaoPage();
