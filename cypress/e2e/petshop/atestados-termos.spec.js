import AtestadosTermosPage from '../../support/pages/petshop/AtestadosTermosPage';

describe('Cadastro de Atestados e Termos - Petshop', { tags: ['@petshop', '@regressivo', '@atestados', '@crud'] }, () => {

    // Dados para o teste
    const timestamp = new Date().getTime();
    const dadosAtestado = {
        descricao: `Atestado Teste ${timestamp}`,
        tipo: 'Atestado',
        conteudo: 'Conteúdo do atestado criado via automação de testes.',
        descricaoEditada: `Atestado Teste Editado ${timestamp}`,
        conteudoEditado: 'Conteúdo editado via automação.'
    };

    beforeEach(() => {
        cy.loginArmazenandoSessao();
        // Não acessa a página aqui pois cada teste pode precisar de um estado diferente
        // ou sequenciamento. Mas para garantir isolamento, pode acessar.
        // Vamos manter o padrão de acessar dentro do it ou no before.
    });

    it('Deve realizar o ciclo completo de CRUD (Criar, Listar, Editar, Excluir)', () => {
        // --- 1. CRIAR ---
        AtestadosTermosPage.acessar();
        AtestadosTermosPage.tentarClicarNovoCadastro();
        AtestadosTermosPage.preencherDescricao(dadosAtestado.descricao);
        AtestadosTermosPage.selecionarTipo(dadosAtestado.tipo);
        AtestadosTermosPage.preencherConteudo(dadosAtestado.conteudo);
        AtestadosTermosPage.salvar();
        AtestadosTermosPage.validarSucessoAposSalvar();

        // --- 2. LISTAR / VERIFICAR CRIAÇÃO ---
        AtestadosTermosPage.filtrarPorDescricao(dadosAtestado.descricao);
        AtestadosTermosPage.aplicarFiltros();
        AtestadosTermosPage.validarPresencaTabela();

        // Verifica se encontra na grid (pode ser necessário validar o texto em uma célula específica)
        cy.contains(dadosAtestado.descricao).should('be.visible');

        // --- 3. EDITAR ---
        // Assume que o item criado é o primeiro da lista filtrada
        AtestadosTermosPage.tentarClicarEditar(0);
        AtestadosTermosPage.validarCadastroCarregado();

        // Valida dados antes da edição
        AtestadosTermosPage.validarCampoDescricaoValor(dadosAtestado.descricao);

        // Edita
        AtestadosTermosPage.preencherDescricao(dadosAtestado.descricaoEditada);
        AtestadosTermosPage.preencherConteudo(dadosAtestado.conteudoEditado);
        AtestadosTermosPage.salvar();
        AtestadosTermosPage.validarSucessoAposSalvar();

        // --- 4. VERIFICAR EDIÇÃO ---
        AtestadosTermosPage.filtrarPorDescricao(dadosAtestado.descricaoEditada);
        AtestadosTermosPage.aplicarFiltros();
        cy.contains(dadosAtestado.descricaoEditada).should('be.visible');

        // --- 5. EXCLUIR ---
        AtestadosTermosPage.tentarClicarEditar(0); // Entra na edição para excluir
        AtestadosTermosPage.clicarExcluir();
        AtestadosTermosPage.confirmarExclusao();

        // --- 6. VERIFICAR EXCLUSÃO ---
        AtestadosTermosPage.validarExclusao(dadosAtestado.descricaoEditada);
    });

    it('Deve validar filtros de listagem (Existentes)', () => {
        // Teste de filtros genéricos (não dependente do CRUD acima, mas útil manter)
        AtestadosTermosPage.acessar();
        AtestadosTermosPage.filtrarPorTipo('Atestado');
        AtestadosTermosPage.aplicarFiltros();
        AtestadosTermosPage.validarPresencaTabela();
    });
});
