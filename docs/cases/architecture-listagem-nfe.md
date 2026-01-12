# Arquitetura do caso de teste: `venda-nfcenfe/listagem-nfe.spec.js`

## Objetivo
- Garantir que a navegaçao pelo menu **Vendas e NF-e > NF-e > Listagem NF-e** abre a tela com o titulo visivel e a tabela carregada.
- Validar o filtro avancado por numero inicial/final, serie e status (estado RECEBIDO/Autorizadas), confirmando que a submissao envia os parametros na query string.
- Bloquear a exclusao em massa quando nao ha linhas selecionadas, exibindo o SweetAlert de aviso e permitindo fechar via botao Confirmar.
- Assegurar que o checkbox geral seleciona as linhas da tabela (checando a primeira linha como evidência).

## Importacoes e dependencias
- `ListagemNfePage` em `cypress/support/pages/Venda/ListagemNfePage.js` centraliza abertura pelo menu lateral, validacao de carregamento, filtro avancado, submissao da busca, selecao em massa e interacao com o alert.
- `ListagemNfeLocators` em `cypress/support/locators/Venda/ListagemNfeLocators.js` contem os seletores do filtro (`#btn-pesquisa`, `#numero_nfe_de`, `#numero_nfe_ate`, `#serie`, `#status_nota`, `#btn-pesquisar`), tabela (`.ibox-content table`, `.check_all`) e SweetAlert (`.sweet-alert`, `.confirm`).
- `cy.login()` seguido de `cy.visit('/')` no `beforeEach` garante sessao antes de chamar `ListagemNfePage.visitar()`; hooks globais de `support/e2e.js` mantem intercept de erro 500 e integracoes Allure/Percy ativas.
- Tags `{ tags: ['@nfe', '@vendas', '@regressivo'] }` habilitam filtragem com `@cypress/grep`.

## Estrutura do teste
1. `beforeEach`: executa login padrao, visita a raiz, acessa a listagem via menu lateral e valida titulo + tabela visiveis.
2. Cenário 1: abre o filtro avancado, preenche numero inicial `349`, final `379`, serie `301` e status `RECEBIDO`, submete e verifica que a URL inclui os parametros `numero_nfe_de`, `numero_nfe_ate`, `serie` e `status_nota`.
3. Cenário 2: aciona **Excluir selecionados** sem marcar linhas e valida o modal de aviso do SweetAlert, fechando pelo botao Confirmar.
4. Cenário 3: marca o checkbox geral `.check_all` e certifica que o checkbox da primeira linha fica selecionado.

## Integracao com a arquitetura global
- O spec esta registrado no `specPattern` de `cypress.config.js` dentro do bloco de vendas/NF-e, seguindo a ordem de execucao ja definida.
- Fluxo de navegacao reutiliza `menulateralvendapage` para manter consistencia com demais specs do menu Vendas e NF-e.
- Assercoes de URL substituem intercepts de rede, mantendo o teste leve e alinhado ao padrao descrito em `docs/test-case-architecture.md`.
- Evidencias e tags sao capturadas pelo Allure, compartilhando estrutura de report com as demais suites.

## Padrões e boas práticas

### Page Object Pattern (ADR-0002)
- `ListagemNfePage` encapsula todas as interações com a listagem de NFe.

### Separação de Locators (ADR-0003)
- `ListagemNfeLocators` centraliza todos os seletores da listagem.

### Login Persistente (ADR-0004)
- Uso de `cy.login()` no `beforeEach` para funcionalidades fiscais.

### Tags para Filtragem de Testes (ADR-0010)
- Tags `@nfe`, `@vendas` e `@regressivo` aplicadas para execução seletiva.

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - `ListagemNfePage` utilizado
- **ADR-0003:** Separate Locators from Page Objects - `ListagemNfeLocators` separado
- **ADR-0004:** Use cy.session for Login Persistence - `cy.login()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/cases/architecture-cadastro-nfe.md` - Cadastro de NFe (listagem permite acesso ao cadastro)
- `docs/cases/architecture-cancelamento-nfe.md` - Cancelamento de NFe (listagem permite cancelar NFes)
- `docs/cases/architecture-carta-correcao-nfe.md` - Carta de Correção NFe (listagem permite emitir carta de correção)
- `docs/cases/architecture-cadastro-nfe-dropdown-acoes.md` - Dropdown de Ações NFe (listagem permite acessar ações via dropdown)
- `docs/testes.md` - Inventário de testes
- `cypress/support/pages/Venda/ListagemNfePage.js` - Page Object
- `cypress/support/locators/Venda/ListagemNfeLocators.js` - Locators

### Arquivos relacionados
- `cypress/e2e/venda-nfcenfe/listagem-nfe.spec.js` - Spec de teste
- `cypress.config.js` - Configuração (specPattern)

---

## Sugestoes de evolucao
1. Adicionar cobertura para o filtro por destinatario (autocomplete) incluindo intercept de `**/nfe/autocomplete/destinatario**`.
2. Verificar o comportamento do periodo padrão (`#periodo`/daterangepicker) e constraint de datas ao abrir a tela.
3. Cobrir acoes de linha (visualizar, baixar XML) quando houver massa de dados disponivel, validando navegacao e toasts.
