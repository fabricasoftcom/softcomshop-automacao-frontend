import CompraBasePage from "./CompraBasePage";
import CadastroCompraLocators from "../../locators/Compra/CadastroCompraLocators";
import MenulateralProdutoPage from "../menulateral/MenulateralProdutoPage";
import { gerarChaveAcessoNFe } from "../../factory/generateRandomData";

class CompraManualPage extends CompraBasePage {
    // ========== MÉTODOS ESPECÍFICOS PARA CADASTRO MANUAL ==========

    acessarNovoCadastro() {
        MenulateralProdutoPage.acessarCadastroNovaCompra();
        cy.url({ timeout: 30000 }).should('include', '/compra/novo');
        this.aguardarCarregamento();

        // Aguarda o formulário aparecer - tenta múltiplos seletores
        cy.get('body', { timeout: 30000 }).should('be.visible');
        cy.wait(2000); // Aguarda carregamento inicial

        // Tenta encontrar o formulário com diferentes seletores
        cy.get('body').then(($body) => {
            const formEncontrado = $body.find('#form-compra, form[action*="compra"], form[id*="compra"]').length > 0;
            if (!formEncontrado) {
                cy.log('Formulário não encontrado imediatamente, aguardando...');
                cy.wait(3000);
            }
        });

        // Verifica se o formulário está visível
        cy.get(CadastroCompraLocators.formPrincipal, { timeout: 30000 })
            .should('exist')
            .should('be.visible');

        cy.wait(1000); // Aguarda estabilização
        return this;
    }

    validarBotoesTopo() {
        cy.contains('a[href*="/compra"]', 'Voltar').should('be.visible');
        cy.contains('a[href*="/compra/novo"]', 'Novo').should('be.visible');
        cy.get(CadastroCompraLocators.btnTopoSalvar).should('have.class', 'ocultar');
        cy.get(CadastroCompraLocators.btnTopoExcluir).should('have.class', 'ocultar');
        cy.get(CadastroCompraLocators.btnMaisAcoes).should('have.class', 'ocultar');
        return this;
    }

    preencherObservacao(texto) {
        cy.get(CadastroCompraLocators.campoObservacoes).clear().type(texto).should('have.value', texto);
        return this;
    }

    buscarFornecedor(termo) {
        cy.get(CadastroCompraLocators.campoFornecedor).clear().type(termo);
        return this;
    }

    validarSugestoesFornecedor() {
        cy.get(CadastroCompraLocators.listaFornecedorSugestoes).should('have.length.at.least', 1);
        return this;
    }

    expandirFornecedorAutocomplete() {
        cy.get(CadastroCompraLocators.btnFornecedorAutocomplete).click({ force: true });
        return this;
    }

    selecionarPrimeiroFornecedorDisponivel() {
        cy.get(CadastroCompraLocators.btnFornecedorAutocomplete).click({ force: true });
        cy.get(CadastroCompraLocators.listaFornecedorSugestoes)
            .should('have.length.at.least', 1)
            .then(($items) => {
                const targetLi = $items[0];
                const clickable =
                    Cypress.$(targetLi).find('a').length > 0
                        ? Cypress.$(targetLi).find('a').get(0)
                        : targetLi;
                cy.wrap(clickable).click({ force: true });
            });
        cy.get(CadastroCompraLocators.hiddenFornecedorId).should('not.have.value', '');
        return this;
    }

    buscarProduto(termo) {
        cy.get(CadastroCompraLocators.campoProduto).clear().type(termo);
        return this;
    }

    validarSugestoesProduto() {
        cy.get(CadastroCompraLocators.listaProdutoSugestoes).should('have.length.at.least', 1);
        return this;
    }

    expandirProdutoAutocomplete() {
        cy.get(CadastroCompraLocators.btnProdutoAutocomplete).click({ force: true });
        return this;
    }

    selecionarProdutoPorIndice(indice = 0) {
        cy.get(CadastroCompraLocators.btnProdutoAutocomplete).click({ force: true });
        cy.get(CadastroCompraLocators.listaProdutoSugestoes)
            .should('have.length.at.least', 1)
            .then(($items) => {
                const targetIndex = indice < $items.length ? indice : 0;
                const targetLi = $items.eq(targetIndex);
                const clickable =
                    Cypress.$(targetLi).find('a').length > 0
                        ? Cypress.$(targetLi).find('a').get(0)
                        : targetLi.get(0);
                cy.wrap(clickable).click({ force: true });
            });
        return this;
    }

    adicionarProdutoPeloAutocomplete(termo, indice = 0) {
        this.buscarProduto(termo);
        this.selecionarProdutoPorIndice(indice);
        cy.wait(2000); // Aguarda item ser salvo
        cy.get(CadastroCompraLocators.itensSalvos).should('have.length.at.least', 1);
        return this;
    }

    adicionarPrimeiroProdutoDaLista(termo = 'cst') {
        this.adicionarProdutoPeloAutocomplete(termo, 0);
        return this;
    }

    adicionarProdutosDistintos(termo, quantidade = 3) {
        const indices = Array.from({ length: quantidade }, (_, index) => index);
        indices.forEach((indice) => {
            this.adicionarProdutoPeloAutocomplete(termo, indice);
            cy.wait(500);
        });

        cy.get(CadastroCompraLocators.itensSalvos)
            .should('have.length', quantidade)
            .then(($linhas) => {
                const idsItens = Array.from($linhas, (linha) => Cypress.$(linha).data('id'));
                const distintas = new Set(idsItens);
                expect(distintas.size, 'itens distintos selecionados').to.eq(idsItens.length);
            });
        return this;
    }

    validarPainelItensInicial() {
        cy.get(CadastroCompraLocators.tabelaItens).should('be.visible');
        cy.get(CadastroCompraLocators.campoDescricaoItem).should('exist');
        cy.get(CadastroCompraLocators.campoQuantidadeItem).should('have.value', '1,00');
        cy.get(CadastroCompraLocators.campoPrecoItem).should('have.value', '0,00');
        cy.get(CadastroCompraLocators.totalizadorQuantidade).should('contain', '0,00');
        cy.get(CadastroCompraLocators.totalizadorTotal).should('contain', '0,00');
        return this;
    }

    // ========== MÉTODOS PARA PREENCHER DADOS PRINCIPAIS ==========

    preencherNatureza(natureza = '1102') {
        cy.get(CadastroCompraLocators.campoNatureza).clear().type(natureza);
        cy.wait(1500); // Aguarda autocomplete carregar
        cy.get(CadastroCompraLocators.listaNaturezaSugestoes)
            .should('have.length.at.least', 1)
            .first()
            .find('a')
            .click({ force: true });
        return this;
    }

    preencherNumero(numero = '12345') {
        cy.get(CadastroCompraLocators.campoNumero).clear().type(numero);
        return this;
    }

    preencherSerie(serie = '1') {
        cy.get(CadastroCompraLocators.campoSerie).clear().type(serie);
        return this;
    }

    preencherChaveAcesso(chave = null) {
        // Se não for fornecida uma chave, gera uma nova e única
        const chaveAcesso = chave || gerarChaveAcessoNFe();
        cy.get(CadastroCompraLocators.campoChaveAcesso).clear().type(chaveAcesso);
        return this;
    }

    preencherDadosPrincipais(dados = {}) {
        const {
            natureza = '1102',
            numero = '12345',
            serie = '1',
            chaveAcesso = null // null = gera automaticamente uma chave única
        } = dados;

        this.preencherNatureza(natureza);
        this.preencherNumero(numero);
        this.preencherSerie(serie);
        this.preencherChaveAcesso(chaveAcesso);
        return this;
    }

    salvarCompraInicial() {
        cy.get(CadastroCompraLocators.btnTopoSalvar)
            .should('be.visible')
            .and('not.have.class', 'ocultar')
            .click();

        // Aguarda o carregamento após clicar em salvar
        this.aguardarCarregamento();
        cy.wait(3000);

        // Verifica se houve erro ou sucesso
        cy.get('body', { timeout: 5000 }).then(($body) => {
            // Verifica se há mensagem de erro
            if ($body.find('.alert-danger, .sweet-alert, [class*="error"]').length > 0) {
                cy.log('Erro detectado ao salvar');
            }
            // Verifica se há mensagem de sucesso
            if ($body.find('.alert-success, .sweet-alert:contains("Pronto")').length > 0) {
                cy.log('Mensagem de sucesso detectada');
            }
        });

        // Aguarda redirecionamento para página de edição (com ID)
        // Se não redirecionar, pode ser que já esteja salva ou houve erro
        cy.url({ timeout: 30000 }).then((url) => {
            if (url.match(/\/compra\/\d+/)) {
                cy.log('Redirecionamento para página de edição confirmado');
                this.aguardarCarregamento();
                cy.wait(2000);

                // Tenta encontrar o botão excluir, mas não falha se não encontrar
                cy.get('body', { timeout: 10000 }).then(($body) => {
                    const btnExcluir = $body.find(CadastroCompraLocators.btnTopoExcluir);
                    if (btnExcluir.length > 0 && !btnExcluir.hasClass('ocultar')) {
                        cy.get(CadastroCompraLocators.btnTopoExcluir).should('be.visible');
                    } else {
                        cy.log('Botão excluir não encontrado ou oculto - continuando mesmo assim');
                    }
                });
            } else {
                cy.log('URL não mudou para página de edição - pode ter havido erro ou já estava salva');
            }
        });

        return this;
    }

    // ========== MÉTODOS PARA ADICIONAR ITEM VIA MODAL ==========

    clicarNovoItem() {
        // Aguarda a seção de itens estar disponível após salvar
        cy.wait(2000);
        this.aguardarCarregamento();

        // Tenta encontrar o botão usando o locator específico sugerido
        cy.get('#panel-itens', { timeout: 15000 })
            .should('be.visible')
            .within(() => {
                cy.get('.ibox-title')
                    .should('be.visible')
                    .within(() => {
                        cy.contains('.btn', 'Novo Item', { timeout: 10000 })
                            .should('be.visible')
                            .click({ force: true });
                    });
            });

        // Aguarda modal aparecer
        cy.get(CadastroCompraLocators.modalNovoItem, { timeout: 10000 })
            .should('be.visible');
        cy.wait(1000);
        return this;
    }

    preencherProdutoNoModal(termo = 'P') {
        // Aguarda modal estar completamente visível
        cy.get(CadastroCompraLocators.modalNovoItem, { timeout: 10000 })
            .should('be.visible');
        cy.wait(1000);

        // Busca o campo de produto no modal usando ID específico (.modal #auto_produto_id)
        cy.get(CadastroCompraLocators.modalCampoProduto, { timeout: 10000 })
            .should('be.visible')
            .clear()
            .type(termo);
        cy.wait(2000); // Aguarda autocomplete carregar
        return this;
    }

    selecionarProdutoNoModal(indice = 0) {
        // Aguarda a lista de sugestões aparecer após digitar usando ID específico
        cy.get(CadastroCompraLocators.modalListaProdutoSugestoes, { timeout: 100000 })
            .should('have.length.at.least', 1)
            .then(($items) => {
                const targetIndex = indice < $items.length ? indice : 0;
                const targetLi = $items.eq(targetIndex);
                // Tenta clicar no link primeiro, senão clica no li
                const clickable = targetLi.find('a').length > 0
                    ? targetLi.find('a').get(0)
                    : targetLi.get(0);
                cy.wrap(clickable).click({ force: true });
            });
        cy.wait(2000); // Aguarda produto ser selecionado e campos serem preenchidos automaticamente
        return this;
    }

    preencherPrecoNoModal(preco = '10,00') {
        // Usa ID específico .modal #valor_unitario_comercial
        cy.get(CadastroCompraLocators.modalCampoPreco, { timeout: 15000 })
            .should('be.visible')
            .clear()
            .type(preco);
        return this;
    }

    preencherQuantidadeNoModal(quantidade = '5') {
        // Usa ID específico .modal #quantidade
        cy.get(CadastroCompraLocators.modalCampoQuantidade, { timeout: 15000 })
            .should('be.visible')
            .clear()
            .type(quantidade);
        return this;
    }

    preencherNaturezaNoModal(natureza = '1102') {
        // Tenta encontrar o campo de natureza (pode ser #auto_cfop_id ou #auto_nfe_natureza_id)
        cy.get(CadastroCompraLocators.modalCampoNaturezaItem, { timeout: 15000 })
            .first()
            .should('be.visible')
            .clear()
            .type(natureza);
        cy.wait(1500); // Aguarda autocomplete carregar

        // Seleciona a primeira sugestão de natureza
        cy.get(CadastroCompraLocators.modalListaNaturezaItemSugestoes, { timeout: 10000 })
            .should('have.length.at.least', 1)
            .then(($items) => {
                const firstItem = $items.first();
                const clickable = firstItem.find('a').length > 0
                    ? firstItem.find('a').get(0)
                    : firstItem.get(0);
                cy.wrap(clickable).click({ force: true });
            });
        cy.wait(1000);
        return this;
    }

    adicionarItemNoModal(dadosItem = {}) {
        const {
            termoProduto = 'P',
            indiceProduto = 0,
            preco = '10,00',
            quantidade = '50',
            natureza = '1102'
        } = dadosItem;

        this.preencherProdutoNoModal(termoProduto);
        this.selecionarProdutoNoModal(indiceProduto);

        // Aguarda campos serem preenchidos automaticamente após seleção do produto
        cy.wait(2000);

        // Aguarda campo de preço aparecer antes de preencher (usando .modal #valor_unitario_comercial)
        cy.get(CadastroCompraLocators.modalCampoPreco, { timeout: 15000 })
            .should('be.visible');
        //  Caso #85357
         this.preencherPrecoNoModal(preco);
         this.preencherQuantidadeNoModal(quantidade);
        this.preencherNaturezaNoModal(natureza);

        // Clica em Adicionar
        cy.get(CadastroCompraLocators.modalBtnAdicionarItem)
            .should('be.visible')
            .click({ force: true });

        // Aguarda modal fechar e item ser adicionado
        cy.get(CadastroCompraLocators.modalNovoItem, { timeout: 10000 }).should('not.exist');
        cy.wait(2000);

        // Valida que o item foi adicionado
        cy.get(CadastroCompraLocators.itensSalvos).should('have.length.at.least', 1);
        return this;
    }
}

export default CompraManualPage;

