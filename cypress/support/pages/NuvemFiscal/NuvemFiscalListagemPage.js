import NuvemFiscalListagemLocators from "../../locators/NuvemFiscal/NuvemFiscalListagemLocators";

class NuvemFiscalListagemPage {
    preencherTipoManifestacao(tipo) {
        cy.get(NuvemFiscalListagemLocators.campoTipoManifestacao).select(tipo);
    }

    clicarPesquisar() {
        cy.get(NuvemFiscalListagemLocators.botaoPesquisar).click();
    }

    aguardarCarregamento() {
        cy.get(NuvemFiscalListagemLocators.loading).should('not.exist');
    }

    verificarTabelaVisivel() {
        cy.get(NuvemFiscalListagemLocators.tabelaListagem).should('be.visible');
    }

    obterLinhasVisiveis() {
        return cy.get(NuvemFiscalListagemLocators.linhasTabela);
    }

    encontrarLinhaNaoImportada() {
        // Constante para coluna de status (9ª coluna)
        const COLUNA_STATUS_IMPORTADA = NuvemFiscalListagemLocators.COLUNA_STATUS_IMPORTADA || 9;
        // Limite de linhas para verificar
        const LIMITE_LINHAS = 30;

        // Aguarda a tabela estar visível e carregada
        cy.get(NuvemFiscalListagemLocators.tabelaListagem).should('be.visible');
        this.aguardarCarregamento();

        return cy.get(NuvemFiscalListagemLocators.linhasTabela, { timeout: 15000 })
            .should('have.length.greaterThan', 0)
            .then(($linhas) => {
                const linhas = Cypress._.toArray($linhas);
                const totalLinhas = Math.min(linhas.length, LIMITE_LINHAS);

                cy.log(`Verificando ${totalLinhas} linhas para encontrar status "não importada"`);

                // Seletores para status "não importada" (botão vermelho)
                const seletoresStatus = [
                    `td:nth-child(${COLUNA_STATUS_IMPORTADA}) .btn-danger`,
                    `td:nth-child(${COLUNA_STATUS_IMPORTADA}) .btn.btn-danger`,
                    `td:nth-child(${COLUNA_STATUS_IMPORTADA}) .btn.btn-xs.btn-danger`,
                    `td:nth-child(${COLUNA_STATUS_IMPORTADA}) span.btn-danger`,
                    `td:nth-child(${COLUNA_STATUS_IMPORTADA}) [class*="btn-danger"]`
                ];

                // Seletores para link de importação
                const seletoresLink = [
                    'a[href*="import-to-purchase"]',
                    'a[href*="import"]',
                    'a[title*="Importar"]',
                    'a[title*="importar"]'
                ];

                // Procura pela primeira linha que tem status "não importada" E link de importação
                for (let i = 0; i < totalLinhas; i++) {
                    const linha = linhas[i];
                    const $linha = Cypress.$(linha);

                    // Verifica se tem status "não importada"
                    let temStatusNaoImportada = false;
                    for (const seletorStatus of seletoresStatus) {
                        const $status = $linha.find(seletorStatus);
                        if ($status.length > 0 && $status.is(':visible')) {
                            temStatusNaoImportada = true;
                            break;
                        }
                    }

                    // Se tem status "não importada", verifica se tem link de importação
                    if (temStatusNaoImportada) {
                        for (const seletorLink of seletoresLink) {
                            const $link = $linha.find(seletorLink);
                            if ($link.length > 0 && $link.is(':visible')) {
                                cy.log(`Linha ${i + 1} encontrada com status "não importada" e link de importação`);
                                return cy.wrap(linha);
                            }
                        }
                    }
                }

                // Fallback 1: primeira linha com link de importação (mesmo sem status específico)
                cy.log('Nenhuma linha com status "não importada" encontrada, buscando primeira linha com link de importação');
                for (let i = 0; i < totalLinhas; i++) {
                    const linha = linhas[i];
                    const $linha = Cypress.$(linha);

                    for (const seletorLink of seletoresLink) {
                        const $link = $linha.find(seletorLink);
                        if ($link.length > 0 && $link.is(':visible')) {
                            cy.log(`Usando linha ${i + 1} com link de importação disponível`);
                            return cy.wrap(linha);
                        }
                    }
                }

                // Fallback 2: usa a primeira linha
                cy.log('Usando primeira linha como fallback');
                return cy.wrap(linhas[0]);
            });
    }

    clicarImportarPrimeiraLinha() {
        this.encontrarLinhaNaoImportada().then(($linha) => {
            const $linhaJquery = Cypress.$($linha);

            // Seletores para o link de importação
            const seletores = [
                'a[href*="import-to-purchase"]',
                'a[href*="import"]',
                'a[title*="Importar"]',
                'a[title*="importar"]'
            ];

            let linkEncontrado = null;
            for (const seletor of seletores) {
                const $link = $linhaJquery.find(seletor);
                if ($link.length > 0 && $link.is(':visible')) {
                    linkEncontrado = $link.first();
                    break;
                }
            }

            if (linkEncontrado) {
                cy.wrap(linkEncontrado)
                    .should('be.visible')
                    .invoke('removeAttr', 'target')
                    .click({ force: true });
            } else {
                throw new Error('Link de importação não encontrado na linha selecionada');
            }
        });

        // Aguarda a navegação para a página de importação
        cy.url({ timeout: 20000 }).should('satisfy', (currentUrl) => {
            const isValid = currentUrl.includes('/nuvemfiscal') ||
                currentUrl.includes('/compra') ||
                currentUrl.includes('/import');

            if (!isValid) {
                cy.log(`URL atual: ${currentUrl}`);
            }

            return isValid;
        });
    }

    preencherStatusImportacao() {
        // Tenta encontrar o campo de status de importação
        cy.get('body').then(($body) => {
            const selectors = [
                '#status_importacao',
                '#importada',
                'select[id*="import"]',
                'select[id*="status"]',
                'select[name*="import"]',
                'select[name*="status"]'
            ];

            let campoEncontrado = false;
            for (const selector of selectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector, { timeout: 10000 }).then(($select) => {
                        if ($select.length > 0 && $select.is('select')) {
                            // Procura pela opção que indica "não importada"
                            const options = Array.from($select[0].options).map(opt => ({
                                value: opt.value,
                                text: opt.text
                            }));

                            const opcao = options.find(opt =>
                                opt.text.toLowerCase().includes('não importada') ||
                                opt.text.toLowerCase().includes('nao importada') ||
                                opt.text.toLowerCase().includes('não importado') ||
                                opt.text.toLowerCase().includes('nao importado') ||
                                opt.value === '0' ||
                                opt.value === 'nao_importada' ||
                                opt.value === 'nao_importado'
                            );

                            if (opcao) {
                                cy.get(selector).select(opcao.value);
                            } else {
                                // Fallback: seleciona a primeira opção que não seja "importada"
                                const opcaoNaoImportada = options.find(opt =>
                                    !opt.text.toLowerCase().includes('importada') &&
                                    !opt.text.toLowerCase().includes('importado') &&
                                    opt.value !== ''
                                );
                                if (opcaoNaoImportada) {
                                    cy.get(selector).select(opcaoNaoImportada.value);
                                }
                            }
                            campoEncontrado = true;
                        }
                    });
                    break;
                }
            }

            if (!campoEncontrado) {
                cy.log('Campo de status de importação não encontrado. Continuando sem esse filtro.');
            }
        });
    }

    filtrarPorCienciaOperacao() {
        // Tenta diferentes variações do valor
        cy.get(NuvemFiscalListagemLocators.campoTipoManifestacao).then(($select) => {
            const options = Array.from($select[0].options).map(opt => ({
                value: opt.value,
                text: opt.text
            }));

            // Procura pela opção que contém "Ciência" ou "Ciencia"
            const opcao = options.find(opt =>
                opt.text.includes('Ciência') ||
                opt.text.includes('Ciencia') ||
                opt.text.includes('Operação') ||
                opt.value.includes('ciencia') ||
                opt.value.includes('Ciencia')
            );

            if (opcao) {
                cy.get(NuvemFiscalListagemLocators.campoTipoManifestacao).select(opcao.value);
            } else {
                // Fallback: tenta selecionar por texto
                cy.get(NuvemFiscalListagemLocators.campoTipoManifestacao).select(1); // Segunda opção (índice 1)
            }
        });

        // Filtra por notas não importadas
        this.preencherStatusImportacao('nao_importada');

        this.clicarPesquisar();
        this.aguardarCarregamento();
        this.verificarTabelaVisivel();
    }
}

export default new NuvemFiscalListagemPage();

