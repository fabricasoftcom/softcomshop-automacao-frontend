# Arquitetura dos casos de teste: Cartões

## Objetivo

Validar a funcionalidade de cadastro e listagem de cartões, incluindo:
- Exibição e navegação na listagem
- Abertura do modal de cadastro/edição
- Preenchimento e salvamento completo
- Validação de campos obrigatórios
- Diferentes tipos de cartão (CRÉDITO e DÉBITO)

**Funcionalidades cobertas:**
- Listagem de cartões
- Cadastro completo de cartão
- Edição de cartão
- Validação de campos obrigatórios (Nome, Alias, Taxa Administrativa, Dia, Parcela)
- Seleção de tipo (CRÉDITO ou DÉBITO)
- Campos com autocomplete (Bandeira, Adquirente)

**Cenários principais:**
- Validação de listagem e tabela
- Abertura de modal de novo cadastro
- Abertura de modal de edição
- Cadastro completo com apenas campos obrigatórios
- Cadastro completo com todos os campos
- Validação de campos obrigatórios
- Teste de fechamento do modal
- Cadastros com diferentes tipos (CRÉDITO, DÉBITO)

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracoes/cartao-listagem.spec.js` - Testes de listagem de cartões
- `cypress/e2e/configuracoes/cartao-cadastro.spec.js` - Testes de cadastro de cartões

### Page Objects
- `cypress/support/pages/Configuracoes/CartaoListagemPage.js` - Métodos de interação com a listagem
- `cypress/support/pages/Configuracoes/CartaoCadastroPage.js` - Métodos de interação com o formulário de cadastro/edição

### Locators
- `cypress/support/locators/Configuracoes/CartaoListagemLocators.js` - Seletores da listagem
- `cypress/support/locators/Configuracoes/CartaoCadastroLocators.js` - Seletores do formulário de cadastro/edição

---

## Imports e dependências

### Page Objects
```javascript
import CartaoListagemPage from '../../support/pages/Configuracoes/CartaoListagemPage';
import CartaoCadastroPage from '../../support/pages/Configuracoes/CartaoCadastroPage';
const { faker } = require('@faker-js/faker');
```

### Locators
- `CartaoListagemLocators` - Contém todos os seletores da listagem (tabela, botões, filtros)
- `CartaoCadastroLocators` - Contém todos os seletores do formulário (campos, botões, modal)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

### Faker (ADR-0009)
- `faker.string.alphanumeric()` - Gera strings alfanuméricas aleatórias para nomes e aliases
- `faker.number.float()` - Gera números decimais para taxa administrativa
- `faker.number.int()` - Gera números inteiros para dia e parcela

---

## Estrutura do teste

### Suite: Listagem de cartões

**Tags:** `['@configuracoes', '@cartao', '@listagem', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`
- Acessa a tela de listagem via `CartaoListagemPage.acessarTelaListagem()`

#### `it('exibe a listagem e permite abrir o formulario de filtros')`

**Fluxo completo:**
1. **Validação de tabela:**
   - Valida que a tabela foi carregada e possui linhas

2. **Abertura de filtros:**
   - Abre o formulário de pesquisa (toggle)
   - Valida que o formulário de pesquisa está visível

#### `it('aplica filtro e valida resultado')`

**Fluxo completo:**
1. **Abertura de filtros:**
   - Abre o formulário de pesquisa

2. **Submissão:**
   - Submete a pesquisa
   - Aguarda a tabela ser recarregada

3. **Validação:**
   - Valida que a tabela foi recarregada

#### `it('abre o modal de novo cadastro ao clicar no botao Novo Cadastro')`

**Fluxo completo:**
1. **Validação de botão:**
   - Valida que o botão Novo Cadastro está visível

2. **Abertura do modal:**
   - Clica no botão "Novo Cadastro"
   - Valida que o modal foi aberto

#### `it('abre a edicao do primeiro registro da listagem')`

**Fluxo completo:**
1. **Validação de tabela:**
   - Valida que a tabela foi carregada
   - Valida que há linhas na tabela

2. **Abertura de edição:**
   - Clica no link de edição da primeira linha
   - Valida que o modal foi aberto

#### `it('seleciona a primeira linha da tabela')`

**Fluxo completo:**
1. **Validação de tabela:**
   - Valida que a tabela foi carregada

2. **Seleção:**
   - Seleciona a primeira linha da tabela
   - Valida que o checkbox foi marcado

---

### Suite: Cadastro de cartão

**Tags:** `['@configuracoes', '@cartao', '@cadastro', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`

#### `it('deve exibir os botoes principais do formulario')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `CartaoCadastroPage.visit()` para acessar o modal de cadastro

2. **Validação de layout:**
   - Verifica que o modal está visível
   - Verifica que os botões (Fechar, Salvar) estão visíveis
   - Verifica que os campos obrigatórios estão visíveis

#### `it('deve realizar cadastro completo de cartao apenas com campos obrigatorios')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `CartaoCadastroPage.visit()` para acessar o modal

2. **Geração de dados:**
   - Gera nome aleatório usando Faker: `CARTAO_TESTE_${faker.string.alphanumeric(8).toUpperCase()}`
   - Gera alias aleatório
   - Gera taxa administrativa, dia e parcela aleatórios

3. **Preenchimento:**
   - Preenche apenas os campos obrigatórios

4. **Salvamento:**
   - Chama `CartaoCadastroPage.salvar()`
   - Aguarda o modal fechar
   - Valida mensagem de sucesso

5. **Validação:**
   - Valida que retornou para a listagem
   - Valida que o cartão existe na listagem

#### `it('deve realizar cadastro completo de cartao com todos os campos')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `CartaoCadastroPage.visit()` para acessar o modal

2. **Geração de dados:**
   - Gera todos os dados aleatórios usando Faker
   - Inclui tipo CRÉDITO

3. **Preenchimento:**
   - Preenche todos os campos (obrigatórios e opcionais)

4. **Salvamento:**
   - Chama `CartaoCadastroPage.salvar()`
   - Valida mensagem de sucesso

5. **Validação:**
   - Valida que retornou para a listagem
   - Valida que o cartão existe na listagem

#### `it('deve exibir erro ao tentar salvar sem preencher campos obrigatorios')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `CartaoCadastroPage.visit()` para acessar o modal

2. **Tentativa de salvamento:**
   - Chama `CartaoCadastroPage.tentarSalvarSemCamposObrigatorios()` sem preencher campos

3. **Validação de erros:**
   - Valida que o modal ainda está aberto
   - Valida que há campos com erro (`.has-error`)

#### `it('deve fechar o modal ao clicar no botao Fechar')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `CartaoCadastroPage.visit()` para acessar o modal

2. **Fechamento:**
   - Chama `CartaoCadastroPage.clicarBotaoFechar()`

3. **Validação:**
   - Valida que o modal foi fechado

#### `it('deve realizar cadastro com tipo CRÉDITO')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `CartaoCadastroPage.visit()` para acessar o modal

2. **Geração de dados:**
   - Gera nome e alias aleatórios usando Faker

3. **Preenchimento:**
   - Preenche todos os campos obrigatórios
   - Seleciona tipo CRÉDITO

4. **Salvamento:**
   - Chama `CartaoCadastroPage.salvar()`
   - Valida mensagem de sucesso

5. **Validação:**
   - Valida que o cartão existe na listagem

#### `it('deve realizar cadastro com tipo DÉBITO')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `CartaoCadastroPage.visit()` para acessar o modal

2. **Geração de dados:**
   - Gera nome e alias aleatórios usando Faker

3. **Preenchimento:**
   - Preenche todos os campos obrigatórios
   - Seleciona tipo DÉBITO

4. **Salvamento:**
   - Chama `CartaoCadastroPage.salvar()`
   - Valida mensagem de sucesso

5. **Validação:**
   - Valida que o cartão existe na listagem

---

## Padrões e boas práticas

- **Page Object Pattern (ADR-0002):** Todos os métodos de interação estão encapsulados nas classes `CartaoListagemPage` e `CartaoCadastroPage`
- **Separate Locators (ADR-0003):** Todos os seletores estão centralizados em `CartaoListagemLocators` e `CartaoCadastroLocators`
- **Prioritize IDs and Context (ADR-0015):** Locators priorizam IDs quando disponíveis
- **Faker for Dynamic Data (ADR-0009):** Usa Faker para gerar nomes, aliases, números únicos, evitando conflitos entre execuções
- **No fixed waits:** Usa validações condicionais (`.should('be.visible')`, `.should('not.exist')`) ao invés de `cy.wait()` fixo
- **Tags for filtering (ADR-0010):** Tags aplicadas para permitir execução seletiva
- **Modal handling:** Aguarda o modal aparecer/desaparecer usando validações condicionais

### Observações sobre o Modal

- O cadastro/edição é realizado através de um **modal** (similar a Formas de Pagamento)
- O modal é aberto ao clicar em "Novo Cadastro" ou no link de edição de uma linha
- Após salvar, o modal fecha automaticamente e retorna para a listagem
- O modal pode ser fechado clicando no botão "Fechar" (×)

### Observações sobre os Campos

- **Campos obrigatórios:** Nome do Cartão, Alias, Taxa Administrativa, Dia, Parcela
- **Tipos disponíveis:** CRÉDITO, DÉBITO
- **Campos com autocomplete:** Bandeira e Adquirente (typeahead) - requerem interação especial
- **Campos numéricos:** Taxa Administrativa (decimal), Dia e Parcela (inteiros)

### Observações sobre Autocomplete/Typeahead

- Os campos Bandeira e Adquirente usam autocomplete/typeahead
- A interação requer digitar o texto e selecionar da lista de opções
- O método `preencherBandeira()` e `preencherAdquirente()` usam `{downarrow}{enter}` para selecionar a primeira opção

---

## Referências

- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0009](../adr/0009-use-faker-for-dynamic-test-data.md): Faker for Dynamic Data
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

