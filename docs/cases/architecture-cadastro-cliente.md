# Arquitetura do caso de teste: `cadastro-clientes/cadastro-cliente.spec.js`

## Objetivo
- Validar que o formulário de cliente apresenta as abas e botões principais logo após a navegação a partir da listagem.
- Garantir que os switches de Bloqueado e Desativado respondem corretamente aos cliques e refletem o estado esperado antes de salvar.
- Preencher os campos obrigatórios/essenciais e salvar novos clientes PF e PJ garantindo o retorno de sucesso.

## Importações e dependências
- `ClientePage` (Page Object em `cypress/support/pages/Cliente/ClientePage.js`) encapsula o acesso via menu, validações de layout, preenchimento do formulário e submissão.
- `CadastroClienteLocators` concentra os seletores da tela de cadastro; `ClienteLocators` continua responsável pelos seletores genéricos (modal de confirmação).
- `generateRandomCustomer` e `generateRandomContact` (`cypress/support/factory/generateRandomData.js`) fornecem dados dinâmicos para clientes (PF/PJ), endereços e contatos evitando colisões.
- Hooks globais em `cypress/support/e2e.js` continuam ativos (Allure, interceptação HTTP 500, Percy), sem ajustes adicionais.

## Estrutura do teste
1. `beforeEach` executa `cy.loginArmazenandoSessao()` e `cy.visit('/')`, garantindo a sessão logada antes de abrir o menu.
2. O primeiro cenário chama `ClientePage.visit()` e `ClientePage.verificarLayoutBasico()` para confirmar abas, botões e formulário visíveis.
3. O segundo cenário reutiliza `ClientePage.visit()` e `ClientePage.alternarSwitchesEstado()` para validar o comportamento dos switches Bloqueado/Desativado.
4. O terceiro cenário gera dados via `generateRandomCustomer`, chama `ClientePage.preencherCamposCliente()`, executa `ClientePage.cadastrar()` (com intercept em `/cadastro/cliente/salvar`, tratamento do SweetAlert clicando em "Sim, continuar", seleção automática de Bairro e Cidade no autocomplete e nova tentativa de salvar) e, por fim, verifica a mensagem de sucesso.
5. Um quarto cenário repete o fluxo completo selecionando `Pessoa = JURIDICA`, preenchendo o CNPJ e validando o retorno de sucesso para clientes PJ.
6. Um quinto cenário preenche todos os campos de endereço, salva o cliente, aguarda o redirecionamento para a página de edição, valida que não há endereços listados, abre o modal "Endereço", salva um novo registro e valida que a tabela foi populada.
7. Um sexto cenário reutiliza o fluxo de cadastro para acessar a aba "Contato/Notificações", valida que não há registros, abre o modal "Contato", salva um novo registro e confirma que a tabela deixa de apresentar a mensagem de vazio.

## Integração com a arquitetura global
- O spec está registrado no bloco `// clientes` do `specPattern` em `cypress.config.js`.
- Tags `{ tags: ['@cadastro-cliente', '@regressivo'] }` permitem filtros com `@cypress/grep`.
- `docs/testes.md` lista os cenários cobrindo layout, switches, PF/PJ e fluxos adicionais, mantendo o inventário sincronizado.

## Próximos passos sugeridos
1. Cobrir preenchimento das abas adicionais (Financeiras, Contato/Notificações) com validações negativas e edição de registros quando houver requisitos específicos.
2. Exercitar a busca automática por CEP e autocomplete de cidade/bairro utilizando `cy.intercept` para controlar as respostas.
3. Adicionar validações negativas (ex.: tentar salvar sem CPF/CNPJ ou nome fantasia/razão social) para reforçar a cobertura de mensagens de erro.
