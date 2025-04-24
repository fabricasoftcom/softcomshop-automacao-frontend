import { beforeEach } from 'mocha';
import FornecedorPage from '../../support/pages/Fornecedor/FornecedorPage'

import { gerarFornecedorAleatorio } from '../../support/factory/generateRandomData';

describe('Cadastro de Fornecedor', { tags: ["@cadastro-fornecedor", "@regressivo"] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
    })
    it('Realizar cadastro de Fornecedor', () => {
        FornecedorPage.acessarPaginaFornecedor();
        const fornecedor = gerarFornecedorAleatorio();
        FornecedorPage.preencherCamposFornecedor(fornecedor);
        FornecedorPage.cadastrar(fornecedor);
    })
})
