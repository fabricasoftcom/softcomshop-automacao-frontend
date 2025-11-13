# Arquitetura do caso de teste: `novaReceita.spec.js`

## Objetivo
- Verificar o cadastro de uma nova receita no módulo financeiro, garantindo que o fluxo fique disponível para cada forma de pagamento listada no fixture `formasPagamento.json` e que o formulário seja preenchido completamente antes do salvamento.

## Importações e dependências
- `NovaReceitaPage` e `ListagemContasAReceberPage` (ambas em `cypress/support/pages/Financeiro`) encapsulam a interação com o modal e o formulário de receitas.
- Fixture `cypress/fixtures/formasPagamento.json` provê os valores iterados pelo `forEach`.
- Custom commands `cy.loginArmazenandoSessao()` e `.abrirNovoCadastro()` (via Page Objects/commands) garantem que o estado da sessão e da página esteja pronto antes de preencher o formulário.
- Plugins carregados em `support/e2e.js` (como Allure, Percy e `@cypress/grep`) também se aplicam a este caso, fornecendo relatórios e filtragem.

## Estrutura do teste
1. **BeforeEach implícito**: `cy.loginArmazenandoSessao()` reutiliza `cy.session` para acelerar o login; chama `ListagemContasAReceberPage.abrirNovoCadastro()` para iniciar o modal.
2. **Iteração dinamica**: o array `formasPagamento` determina quantos `it` são gerados, cada um com uma `formaPagamento` diferente e com o identificador no título (`Deve preencher...`).
3. **Preenchimento do formulário**:
   - Título e categoria são definidos (`NovaReceitaPage.preencherDescricao`, `.selecionarCategoria`).
   - Conta padrão (`CAIXA`) e forma de pagamento são escolhidas via autocomplete e seleção com comparação case-insensitive.
   - Datas e valor aleatório (1-230) são calculados no próprio teste, garantindo registros únicos.
   - Cliente e tipo de documento são selecionados via dropdowns padrão do layout.
4. **Salvamento e validação**: após clicar em salvar (`.clicarSalvar()`), o teste espera o elemento `#loading` sumir; a validação explícita de toast está comentada, mas o cenário considera que a ausência de erro indica sucesso.

## Padrões e boas práticas evidenciadas
- **Page Object** separa seletores (`locators/NovaReceitaLocators`) de ações, facilitando reuso e manutenção.
- **Fixtures + iteração** permitem testar o mesmo fluxo com múltiplas formas de pagamento sem duplicar lógica.
- **Comandos personalizados** encapsulam login com persistência de sessão e interação com o menu lateral, simplificando os specs.
- **Dados dinâmicos** (descrição com timestamp e valor randômico) evitam colisões no ambiente compartilhado.
- **Controle de carregamento** com `cy.get('#loading').should('not.exist')` garante que o back-end terminou antes de prosseguir.

## Integração com o restante da arquitetura
- Está coberto pelo `cypress.config.js` (ordem do `specPattern`, timeout ampliado, `testIsolation: false`) e pelos hooks globais (`beforeEach`/`afterEach` em `support/e2e.js`) que monitoram erros 500.
- Faz parte dos relatórios Allure quando `npm run e2e` é executado; cada `it` gera um item com tags `@nova-receita`, `@financeiro`, `@regressivo`.
- Pode ser executado isoladamente usando `npx cypress run --spec cypress/e2e/financeiro/novaReceita.spec.js` ou filtrado com `@cypress/grep`.

## Sugestão para evolução
1. Ativar novamente a verificação de toast de sucesso para garantir feedback visual.
2. Adicionar uma validação após o salvamento (como busca na listagem) para confirmar persistência.
3. Separar testes de erro (ex.: duplicata para consumidor) em outro arquivo com tags específicas, como já iniciado no comentário do spec.
