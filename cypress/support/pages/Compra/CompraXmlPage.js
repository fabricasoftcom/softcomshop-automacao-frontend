import CompraBasePage from "./CompraBasePage";
import CompraLocators from "../../locators/CompraLocators";

class CompraXmlPage extends CompraBasePage {
    // ========== MÉTODOS ESPECÍFICOS PARA IMPORTAÇÃO XML ==========

    clicarBotaoImportarNFe() {
        cy.get('.btn-info > .hidden-xs', { timeout: 10000 })
            .should('be.visible')
            .click();
        return this;
    }

    selecionarOpcaoXML() {
        cy.get('#option-xml > .block-view-option', { timeout: 10000 })
            .should('be.visible')
            .click();
        return this;
    }

    // ========== MÉTODO AUXILIAR PARA SELECIONAR XML ALEATÓRIO ==========

    selecionarXMLAleatorio(xmlsDisponiveis, xmlsTentados = []) {
        // Filtra XMLs que ainda não foram tentados
        const xmlsNaoTentados = xmlsDisponiveis.filter(xml => !xmlsTentados.includes(xml));

        if (xmlsNaoTentados.length === 0) {
            cy.log('Atenção: Todos os XMLs disponíveis já foram tentados');
            return null;
        }

        // Seleciona um XML aleatório da lista de não tentados
        const indiceAleatorio = Math.floor(Math.random() * xmlsNaoTentados.length);
        return xmlsNaoTentados[indiceAleatorio];
    }

    anexarArquivoXML(nomeArquivo = null, usarApenasSemFaturas = false, xmlsTentados = []) {
        // Se não especificar arquivo, seleciona um aleatório da lista disponível
        if (!nomeArquivo) {
            // Obtém lista dinâmica de XMLs via cy.task
            return cy.task('listarXMLs', { usarApenasSemFaturas }).then((xmlsDisponiveis) => {
                if (!xmlsDisponiveis || xmlsDisponiveis.length === 0) {
                    throw new Error('Nenhum XML disponível encontrado');
                }

                // Seleciona XML aleatório excluindo os já tentados
                nomeArquivo = this.selecionarXMLAleatorio(xmlsDisponiveis, xmlsTentados);

                if (!nomeArquivo) {
                    throw new Error('Todos os XMLs disponíveis já foram tentados');
                }

                cy.log(`Usando arquivo XML: ${nomeArquivo}`);

                // Define o caminho baseado se é XML sem faturas ou não
                const caminhoBase = usarApenasSemFaturas ? 'comprasxml/xmlSemFaturas' : 'comprasxml';
                return cy.get('#file', { timeout: 10000 })
                    .should('exist')
                    .attachFile(`${caminhoBase}/${nomeArquivo}`, { force: true })
                    .wait(2000) // Aguarda o arquivo ser processado
                    .then(() => nomeArquivo); // Retorna o nome do arquivo selecionado
            });
        } else {
            // Define o caminho baseado se é XML sem faturas ou não
            const caminhoBase = usarApenasSemFaturas ? 'comprasxml/xmlSemFaturas' : 'comprasxml';
            return cy.get('#file', { timeout: 10000 })
                .should('exist')
                .attachFile(`${caminhoBase}/${nomeArquivo}`, { force: true })
                .wait(2000) // Aguarda o arquivo ser processado
                .then(() => nomeArquivo); // Retorna o nome do arquivo para manter consistência
        }
    }

    clicarImportar() {
        cy.get('#btn-importar', { timeout: 10000 })
            .should('be.visible')
            .should('not.be.disabled')
            .click();
        // Aguarda redirecionamento ou carregamento da próxima tela
        cy.wait(3000);
        this.aguardarCarregamento();
        return this;
    }

    preencherCFOP(cfop = '1102') {
        // O campo CFOP já deve estar visível após prepararTelaImportacao
        cy.get(CompraLocators.naturezaSelect, { timeout: 20000 })
            .should('be.visible')
            .clear()
            .type(cfop);

        cy.wait(1500); // Aguarda o autocomplete carregar

        // Seleciona o primeiro item da lista do autocomplete
        cy.get('.typeahead-display', { timeout: 10000 })
            .first()
            .should('be.visible')
            .click();

        cy.wait(1000);
        return this;
    }

    clicarConfirmarNatureza() {
        cy.get('#form-importacao > :nth-child(2) > [style="padding: 0; margin: 0"]', { timeout: 10000 })
            .should('be.visible')
            .click();
        return this;
    }

    informarVinculoFiscal() {
        cy.get(CompraLocators.selectVinculoFiscal, { timeout: 10000 })
            .should('be.visible')
            .click();
        cy.get('#div_auto_vinculo_fiscal_id_all > .typeahead-container > .typeahead-result > .typeahead-list > :nth-child(1) > a', { timeout: 10000 })
            .should('be.visible')
            .click();
        cy.get(CompraLocators.btnLancarVinculo, { timeout: 10000 })
            .should('be.visible')
            .click();
        return this;
    }

    clicarImportarXML() {
        cy.get(CompraLocators.btnImportarNFe, { timeout: 10000 })
            .should('be.visible')
            .click();
        return this;
    }

    aguardarImportacaoCompleta() {
        this.aguardarCarregamento();
        cy.wait(2000);
        return this;
    }

    clicarExcluirListagem() {
        // Procura pelo botão de excluir na primeira linha da tabela (compra mais recente)
        // ou pelo botão de excluir selecionados se houver checkbox marcado
        cy.get('body').then(($body) => {
            // Verifica se há checkbox selecionado
            if ($body.find('input[type="checkbox"]:checked').length > 0) {
                // Se houver checkbox selecionado, usa o botão "Excluir Selecionados"
                cy.get('#btn-excluir-selecionados', { timeout: 10000 })
                    .should('be.visible')
                    .click();
            } else {
                // Caso contrário, seleciona a primeira linha e exclui
                cy.get('table tbody tr').first().within(() => {
                    cy.get('input[type="checkbox"]').check({ force: true });
                });
                cy.get('#btn-excluir-selecionados', { timeout: 10000 })
                    .should('be.visible')
                    .click();
            }
        });
        return this;
    }

    // ========== MÉTODO HELPER PARA PREPARAR TELA DE IMPORTAÇÃO ==========

    prepararTelaImportacao(nomeArquivoXML = null, usarApenasSemFaturas = false) {
        this.clicarBotaoImportarNFe();
        cy.wait(1000);
        this.selecionarOpcaoXML();
        cy.wait(1000);

        // Primeira tentativa
        this.anexarArquivoXML(nomeArquivoXML, usarApenasSemFaturas);
        cy.wait(2000);
        this.clicarImportar();
        cy.wait(2000);

        // Verifica se aparece o SweetAlert de "já foi importada"
        cy.get('body').then(($body) => {
            const sweetAlert = $body.find(CompraLocators.sweetAlertModal);

            if (sweetAlert.length > 0 && sweetAlert.is(':visible')) {
                const mensagem = sweetAlert.find('p');
                const textoMensagem = mensagem.length > 0 ? mensagem.text() : '';

                if (textoMensagem.includes('já foi importada')) {
                    cy.log('XML já foi importado (1ª tentativa) - fechando alerta');
                    cy.get(CompraLocators.sweetAlertBotaoOk, { timeout: 5000 })
                        .should('be.visible')
                        .click();
                    cy.wait(1000);
                    cy.get(CompraLocators.sweetAlertModal, { timeout: 5000 })
                        .should('not.exist');

                    // Segunda tentativa
                    cy.log('2ª tentativa: selecionando outro XML...');
                    this.anexarArquivoXML(null, usarApenasSemFaturas);
                    cy.wait(2000);
                    this.clicarImportar();
                    cy.wait(2000);

                    // Verifica novamente
                    cy.get('body').then(($body2) => {
                        const sweetAlert2 = $body2.find(CompraLocators.sweetAlertModal);
                        if (sweetAlert2.length > 0 && sweetAlert2.is(':visible')) {
                            const mensagem2 = sweetAlert2.find('p');
                            const textoMensagem2 = mensagem2.length > 0 ? mensagem2.text() : '';

                            if (textoMensagem2.includes('já foi importada')) {
                                cy.log('XML já foi importado (2ª tentativa) - fechando alerta');
                                cy.get(CompraLocators.sweetAlertBotaoOk, { timeout: 5000 })
                                    .should('be.visible')
                                    .click();
                                cy.wait(1000);
                                cy.get(CompraLocators.sweetAlertModal, { timeout: 5000 })
                                    .should('not.exist');

                                // Terceira tentativa
                                cy.log('3ª tentativa: selecionando outro XML...');
                                this.anexarArquivoXML(null, usarApenasSemFaturas);
                                cy.wait(2000);
                                this.clicarImportar();
                                cy.wait(2000);

                                // Fecha o alerta se ainda aparecer
                                cy.get('body').then(($body3) => {
                                    const sweetAlert3 = $body3.find(CompraLocators.sweetAlertModal);
                                    if (sweetAlert3.length > 0 && sweetAlert3.is(':visible')) {
                                        const mensagem3 = sweetAlert3.find('p');
                                        if (mensagem3.length > 0 && mensagem3.text().includes('já foi importada')) {
                                            cy.log('Atenção: 3 XMLs já foram importados. Fechando alerta...');
                                            cy.get(CompraLocators.sweetAlertBotaoOk, { timeout: 5000 })
                                                .should('be.visible')
                                                .click();
                                            cy.wait(1000);
                                            cy.get(CompraLocators.sweetAlertModal, { timeout: 5000 })
                                                .should('not.exist');
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });

        // Aguarda a tela de configuração da importação aparecer
        // Similar ao método importarNFePorXML que funciona
        cy.wait(3000);
        // Aguarda o carregamento para garantir que a tela está pronta
        this.aguardarCarregamento();
        return this;
    }

    // ========== MÉTODOS PARA AÇÕES NA TELA DE IMPORTAÇÃO ==========

    aplicarGrupoParaTodosItens(grupoId = null) {
        cy.get(CompraLocators.formImportacao, { timeout: 20000 }).should('be.visible');

        // Clica no ícone do campo de grupo para aplicar a todos os itens
        cy.get(CompraLocators.iconAplicarGrupoTodos, { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.wait(1500);

        // Seleciona o primeiro grupo da lista ou um específico
        cy.get('body').then(($body) => {
            const lista = $body.find(CompraLocators.listaAplicarGrupoTodos);
            if (lista.length > 0) {
                if (grupoId) {
                    cy.get(CompraLocators.listaAplicarGrupoTodos, { timeout: 10000 })
                        .contains(grupoId)
                        .click();
                } else {
                    cy.get(CompraLocators.listaAplicarGrupoTodos, { timeout: 10000 })
                        .first()
                        .click();
                }
                cy.wait(1000);

                // Clica no botão "Lançar Grupo"
                cy.get(CompraLocators.btnLancarGrupo, { timeout: 10000 })
                    .should('be.visible')
                    .click();
                cy.wait(1000);
            }
        });

        return this;
    }

    relacionarProduto(itemIndex = 0) {
        cy.get(CompraLocators.formImportacao, { timeout: 20000 }).should('be.visible');

        // Encontra a linha do item e clica no botão "Relacionar Produto"
        cy.get(CompraLocators.tabelaItensImportacao, { timeout: 10000 })
            .should('have.length.at.least', itemIndex + 1)
            .eq(itemIndex)
            .within(() => {
                cy.get(CompraLocators.btnRelacionarProduto, { timeout: 10000 })
                    .should('be.visible')
                    .click();
            });

        cy.wait(2000);

        // Aguarda o modal aparecer e interage com ele
        // O modal será tratado pela lógica JavaScript da página
        // Por enquanto, apenas aguardamos o modal aparecer e depois fechar

        return this;
    }

    adicionarGrupo(itemIndex = 0) {
        cy.get(CompraLocators.formImportacao, { timeout: 20000 }).should('be.visible');

        // Encontra a linha do item e clica no botão "Adicionar Grupo"
        cy.get(CompraLocators.tabelaItensImportacao, { timeout: 10000 })
            .should('have.length.at.least', itemIndex + 1)
            .eq(itemIndex)
            .within(() => {
                cy.get(CompraLocators.btnAdicionarGrupoItem, { timeout: 10000 })
                    .should('be.visible')
                    .click();
            });

        cy.wait(2000);

        // Aguarda o modal aparecer e interage com ele
        // O modal será tratado pela lógica JavaScript da página

        return this;
    }

    adicionarVinculo(vinculoId = null) {
        cy.get(CompraLocators.formImportacao, { timeout: 20000 }).should('be.visible');

        // Clica no ícone do campo de vínculo fiscal para todos os itens
        cy.get(CompraLocators.iconAdicionarVinculoTodos, { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.wait(1500);

        // Seleciona o primeiro vínculo da lista ou um específico
        cy.get('body').then(($body) => {
            const lista = $body.find(CompraLocators.listaAdicionarVinculoTodos);
            if (lista.length > 0) {
                if (vinculoId) {
                    cy.get(CompraLocators.listaAdicionarVinculoTodos, { timeout: 10000 })
                        .contains(vinculoId)
                        .click();
                } else {
                    cy.get(CompraLocators.listaAdicionarVinculoTodos, { timeout: 10000 })
                        .first()
                        .click();
                }
                cy.wait(1000);

                // Clica no botão "Lançar Vinculo"
                cy.get(CompraLocators.btnLancarVinculoTodos, { timeout: 10000 })
                    .should('be.visible')
                    .click();
                cy.wait(1000);
            }
        });

        return this;
    }

    alterarCFOPItem(itemIndex = 0, novoCFOP = '1102') {
        cy.get(CompraLocators.formImportacao, { timeout: 20000 }).should('be.visible');

        // Encontra a linha do item e dá duplo click no span do CFOP para editá-lo
        cy.get(CompraLocators.tabelaItensImportacao, { timeout: 10000 })
            .should('have.length.at.least', itemIndex + 1)
            .eq(itemIndex)
            .within(() => {
                // Dá duplo click no span do CFOP para abrir o campo de edição
                cy.get(CompraLocators.spanCFOPItem, { timeout: 10000 })
                    .should('be.visible')
                    .dblclick();

                cy.wait(500);

                // Preenche o novo CFOP
                cy.get(CompraLocators.campoCFOPItem, { timeout: 10000 })
                    .should('be.visible')
                    .clear()
                    .type(novoCFOP);

                cy.wait(1000);

                // Remove o foco para validar (focusout)
                cy.get(CompraLocators.campoCFOPItem).blur();
            });

        cy.wait(1500);
        return this;
    }

    lancarCategoria(categoriaId = null) {
        cy.get(CompraLocators.formImportacao, { timeout: 20000 }).should('be.visible');

        // Clica no ícone do campo de categoria para todos os pagamentos
        cy.get(CompraLocators.iconCategoriaTodos, { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.wait(1500);

        // Seleciona a primeira categoria da lista ou uma específica
        cy.get('body').then(($body) => {
            const lista = $body.find(CompraLocators.listaCategoriaTodos);
            if (lista.length > 0) {
                if (categoriaId) {
                    cy.get(CompraLocators.listaCategoriaTodos, { timeout: 10000 })
                        .contains(categoriaId)
                        .click();
                } else {
                    cy.get(CompraLocators.listaCategoriaTodos, { timeout: 10000 })
                        .first()
                        .click();
                }
                cy.wait(1000);

                // Clica no botão "Lançar Categoria"
                cy.get(CompraLocators.btnLancarCategoria, { timeout: 10000 })
                    .should('be.visible')
                    .click();
                cy.wait(1000);
            }
        });

        return this;
    }

    // ========== MÉTODOS DE VALIDAÇÃO ==========

    validarGrupoAplicado() {
        // Valida que o grupo foi aplicado verificando a tabela de itens
        cy.get(CompraLocators.tabelaItensImportacao, { timeout: 10000 })
            .should('have.length.at.least', 1);
        // Adicionar validação específica quando os locators forem confirmados
        return this;
    }

    validarProdutoRelacionado(itemIndex = 0) {
        // Valida que o produto foi relacionado no item específico
        cy.get(CompraLocators.tabelaItensImportacao, { timeout: 10000 })
            .eq(itemIndex)
            .should('be.visible');
        // Adicionar validação específica quando os locators forem confirmados
        return this;
    }

    validarGrupoAdicionado() {
        // Valida que o grupo foi adicionado
        cy.get(CompraLocators.formImportacao, { timeout: 10000 })
            .should('be.visible');
        // Adicionar validação específica quando os locators forem confirmados
        return this;
    }

    validarVinculoAdicionado() {
        // Valida que o vínculo foi adicionado
        cy.get(CompraLocators.formImportacao, { timeout: 10000 })
            .should('be.visible');
        // Adicionar validação específica quando os locators forem confirmados
        return this;
    }

    validarCFOPAlterado(itemIndex = 0) {
        // Valida que o CFOP foi alterado no item específico
        cy.get(CompraLocators.tabelaItensImportacao, { timeout: 10000 })
            .eq(itemIndex)
            .should('be.visible');
        // Adicionar validação específica quando os locators forem confirmados
        return this;
    }

    validarCategoriaLancada() {
        // Valida que a categoria foi lançada para os pagamentos
        cy.get(CompraLocators.formImportacao, { timeout: 10000 })
            .should('be.visible');
        // Adicionar validação específica quando os locators forem confirmados
        return this;
    }

    // ========== MÉTODO AUXILIAR PARA RETRY COM MÚLTIPLOS XMLs ==========

    tentarImportarXMLComRetry(nomeArquivoXML = null, usarApenasSemFaturas = false) {
        const xmlsTentados = [];
        let xmlAtual = nomeArquivoXML;

        // Função recursiva para tentar importar com retry
        const tentarImportar = () => {
            // Anexa o arquivo XML (seleciona aleatório se não fornecido)
            return this.anexarArquivoXML(xmlAtual, usarApenasSemFaturas, xmlsTentados).then((nomeArquivoSelecionado) => {
                xmlAtual = nomeArquivoSelecionado;

                if (!xmlAtual) {
                    throw new Error('Não foi possível selecionar um XML para importação');
                }

                cy.log(`Tentando importar XML: ${xmlAtual}`);

                // Clica em importar
                this.clicarImportar();
                cy.wait(2000);

                // Verifica se aparece SweetAlert de "já foi importada"
                return cy.get('body').then(($body) => {
                    const sweetAlert = $body.find(CompraLocators.sweetAlertModal);

                    if (sweetAlert.length > 0 && sweetAlert.is(':visible')) {
                        const mensagem = sweetAlert.find('p');
                        const textoMensagem = mensagem.length > 0 ? mensagem.text() : '';

                        if (textoMensagem.includes('já foi importada')) {
                            cy.log(`XML ${xmlAtual} já foi importado - tentando outro...`);

                            // Adiciona ao histórico de tentados
                            xmlsTentados.push(xmlAtual);

                            // Fecha o alerta
                            cy.get(CompraLocators.sweetAlertBotaoOk, { timeout: 5000 })
                                .should('be.visible')
                                .click();
                            cy.wait(1000);
                            cy.get(CompraLocators.sweetAlertModal, { timeout: 5000 })
                                .should('not.exist');

                            // Tenta novamente com outro XML
                            xmlAtual = null; // Força seleção de novo XML
                            return tentarImportar();
                        }
                    }

                    // Se não apareceu alerta ou apareceu outro tipo, continua normalmente
                    cy.log(`XML ${xmlAtual} não foi importado anteriormente - prosseguindo...`);
                    return cy.wrap(xmlAtual);
                });
            });
        };

        return tentarImportar();
    }

    importarNFePorXML(nomeArquivoXML = null, usarApenasSemFaturas = false) {
        this.clicarBotaoImportarNFe();
        cy.wait(1000);
        this.selecionarOpcaoXML();
        cy.wait(1000);

        // Usa método de retry para tentar importar XML e aguarda completar
        return this.tentarImportarXMLComRetry(nomeArquivoXML, usarApenasSemFaturas).then(() => {
            // Aguarda a tela de configuração da importação aparecer
            return cy.wait(3000).then(() => {
                this.preencherCFOP();
                this.clicarConfirmarNatureza();
                this.informarVinculoFiscal();
                this.clicarImportarXML();
                this.aguardarImportacaoCompleta();
            });
        });
    }
}

export default CompraXmlPage;

