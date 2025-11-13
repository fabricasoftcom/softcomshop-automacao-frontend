# Arquitetura do caso de teste: `cadastro-clientes/cadastro-cliente.spec.js`

## Objetivo
- Validar que o formulário de cliente apresenta as abas e botões principais logo após a navegação a partir da listagem.
- Garantir que os switches de Bloqueado e Desativado respondem corretamente aos cliques e refletem o estado esperado antes de salvar.
- Preencher os campos obrigatórios/essenciais e salvar um novo cliente PF garantindo o retorno de sucesso.

## Importações e dependências
- `ClientePage` (Page Object em `cypress/support/pages/Cliente/ClientePage.js`) encapsula o acesso via menu, validações de layout, preenchimento do formulário e submissão.
- `CadastroClienteLocators` concentra os seletores da tela de cadastro; `ClienteLocators` continua responsável pelos seletores genéricos (modal de confirmação).
- `generateRandomCustomer` (`cypress/support/factory/generateRandomData.js`) fornece dados dinâmicos para CPF, nome e endereço reduzindo colisões.
- Hooks globais em `cypress/support/e2e.js` continuam ativos (Allure, interceptação HTTP 500, Percy), sem ajustes adicionais.

## Estrutura do teste
1. `beforeEach` executa `cy.loginArmazenandoSessao()` e `cy.visit('/')`, garantindo a sessão logada antes de abrir o menu.
2. O primeiro cenário chama `ClientePage.visit()` e `ClientePage.verificarLayoutBasico()` para confirmar abas, botões e formulário visíveis.
3. O segundo cenário reutiliza `ClientePage.visit()` e `ClientePage.alternarSwitchesEstado()` para validar o comportamento dos switches Bloqueado/Desativado.
4. O terceiro cenário gera dados via `generateRandomCustomer`, chama `ClientePage.preencherCamposCliente()`, executa `ClientePage.cadastrar()` (com intercept em `/cadastro/cliente/salvar`) e, por fim, verifica a mensagem de sucesso.

## Integração com a arquitetura global
- O spec está registrado no bloco `// clientes` do `specPattern` em `cypress.config.js`.
- Tags `{ tags: ['@cadastro-cliente', '@regressivo'] }` permitem filtros com `@cypress/grep`.
- `docs/testes.md` lista os cenários cobrindo layout, switches e salvamento, mantendo o inventário sincronizado.

## Próximos passos sugeridos
1. Cobrir preenchimento das abas adicionais (Financeiras, Contato/Notificações) quando houver requisitos específicos.
2. Exercitar a busca automática por CEP e autocomplete de cidade/bairro utilizando `cy.intercept` para controlar as respostas.
3. Adicionar validações negativas (ex.: tentar salvar sem CPF ou Nome) para reforçar a cobertura de mensagens de erro.
