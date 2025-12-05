import NuvemFiscalImportacaoLocators from "../../locators/NuvemFiscal/NuvemFiscalImportacaoLocators";

class NuvemFiscalImportacaoPage {
    aguardarCarregamento() {
        cy.get(NuvemFiscalImportacaoLocators.loading).should('not.exist');
    }

    fecharAlertaSeExistir() {
        cy.get('body').then(($body) => {
            if ($body.find(NuvemFiscalImportacaoLocators.modalAlerta).length > 0) {
                cy.get(NuvemFiscalImportacaoLocators.botaoOkAlerta).click();
            }
        });
    }

    aguardarImportacaoCompleta() {
        // Aguarda o redirecionamento para a página de compra
        // A URL muda para /compra/{id}/editar após importação bem-sucedida
        cy.wait(5000);
        cy.url({ timeout: 60000 })
            .should('include', '/compra/')
            .should('include', '/editar')
            .should('not.include', '/import')
            .should('not.include', '/nuvemfiscal');

        cy.log('Redirecionamento para página de compra detectado');

        // Aguarda o carregamento da página de compra completar
        this.aguardarCarregamento();

        // Verifica se o modal de "Carregando" desapareceu (se existir)
        cy.get('body', { timeout: 30000 }).then(($body) => {
            const modalCarregando = $body.find('.sweet-alert');
            if (modalCarregando.length > 0) {
                const textoModal = modalCarregando.text();
                if (textoModal.includes('Carregando')) {
                    cy.get('.sweet-alert', { timeout: 30000 }).should('not.exist');
                }
            }
        });
    }

    validarImportacaoSucesso() {
        // Aguarda a importação completar e redirecionar para página de compra
        this.aguardarImportacaoCompleta();

        // Valida que estamos na página de compra editando
        cy.url({ timeout: 10000 })
            .should('include', '/compra/')
            .should('include', '/editar')
            .should('not.include', '/import')
            .should('not.include', '/nuvemfiscal');

        cy.log('Sucesso validado: redirecionado para página de compra');

        // Aguarda o carregamento final da página
        this.aguardarCarregamento();

        // Valida que a página de compra está carregada (verifica se há elementos característicos)
        cy.get('body', { timeout: 10000 }).then(($body) => {
            // Verifica se há elementos da página de compra (botões, formulário, etc)
            const temElementosCompra = $body.find('#btn-salvar, [id*="compra"], .title_nota_fiscal_de_compra').length > 0;
            if (temElementosCompra) {
                cy.log('Página de compra carregada com sucesso');
            }
        });
    }

    importarCompra() {
        // Aguarda a página de importação carregar completamente
        cy.url({ timeout: 30000 }).then((url) => {
            const isValid = url.includes('/nuvemfiscal') || url.includes('/compra') || url.includes('/import');
            expect(isValid, `URL deve conter /nuvemfiscal, /compra ou /import. URL atual: ${url}`).to.be.true;
        });

        this.aguardarCarregamento();
        this.fecharAlertaSeExistir();

        // Verifica se o formulário de importação está visível
        cy.get(NuvemFiscalImportacaoLocators.formImportacao, { timeout: 20000 })
            .should('be.visible');

        // Preenche CFOP/Natureza
        cy.get(NuvemFiscalImportacaoLocators.campoCFOP, { timeout: 20000 })
            .should('be.visible')
            .clear()
            .type('1102');

        cy.get(NuvemFiscalImportacaoLocators.typeaheadDisplay, { timeout: 10000 })
            .should('be.visible')
            .click();

        // Confirma a natureza
        cy.get(NuvemFiscalImportacaoLocators.botaoConfirmarNatureza, { timeout: 10000 })
            .should('be.visible')
            .click();

        this.aguardarCarregamento();

        // Aplica vínculo fiscal para todos os itens
        // Passo 1: Clica no ícone do campo de vínculo fiscal
        cy.get(NuvemFiscalImportacaoLocators.iconVinculoFiscal, { timeout: 10000 })
            .should('be.visible')
            .should('not.be.disabled')
            .click();

        // Passo 2: Seleciona a primeira opção do typeahead
        cy.get(NuvemFiscalImportacaoLocators.typeaheadVinculoPrimeiraOpcao, { timeout: 10000 })
            .should('be.visible')
            .click();

        // Passo 3: Clica no botão "Lançar" para aplicar o vínculo
        cy.get(NuvemFiscalImportacaoLocators.botaoLancarVinculo, { timeout: 10000 })
            .should('be.visible')
            .should('not.be.disabled')
            .click();

        // Aguarda o vínculo ser aplicado
        this.aguardarCarregamento();

        // Intercepta a requisição POST de importação ANTES de clicar
        cy.intercept('POST', '**/compra/importar/salvar').as('importarCompra');

        // Clica em importar
        cy.get(NuvemFiscalImportacaoLocators.botaoImportarXML, { timeout: 10000 })
            .should('be.visible')
            .should('not.be.disabled')
            .click();

        // Aguarda a requisição POST completar
        cy.wait('@importarCompra', { timeout: 60000 }).then((interception) => {
            if (interception?.response?.statusCode) {
                const statusCode = interception.response.statusCode;
                expect([200, 302]).to.include(statusCode);
                cy.log(`Importação concluída com status ${statusCode}`);
            }
        });

        // Valida sucesso
        this.validarImportacaoSucesso();
    }
}

export default new NuvemFiscalImportacaoPage();

