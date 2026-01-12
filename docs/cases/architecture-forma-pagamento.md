# Arquitetura dos casos de teste: Formas de Pagamento

## Objetivo

Validar a funcionalidade de cadastro e listagem de formas de pagamento, incluindo:
- Exibição e navegação na listagem
- Abertura do modal de cadastro/edição
- Preenchimento e salvamento completo
- Validação de campos obrigatórios
- Diferentes tipos de forma de pagamento

**Funcionalidades cobertas:**
- Listagem de formas de pagamento
- Cadastro completo de forma de pagamento
- Edição de forma de pagamento
- Validação de campos obrigatórios (Descrição e Tipo)
- Seleção de tipo (ESPECIE, DUPLICATA, CARTAO, BOLETO, CHEQUE)
- Configuração de opções (POS, Integrar API, Exibir Pagamento, Pré Venda, Saldo Caixa)

**Cenários principais:**
- Validação de listagem e tabela
- Abertura de modal de novo cadastro
- Abertura de modal de edição
- Cadastro completo com apenas campos obrigatórios
- Cadastro completo com todos os campos
- Validação de campos obrigatórios
- Teste de fechamento do modal
- Cadastros com diferentes tipos (CARTAO, BOLETO)

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracoes/forma-pagamento-listagem.spec.js` - Testes de listagem de formas de pagamento
- `cypress/e2e/configuracoes/forma-pagamento-cadastro.spec.js` - Testes de cadastro de formas de pagamento

### Page Objects
- `cypress/support/pages/Configuracoes/FormaPagamentoListagemPage.js` - Métodos de interação com a listagem
- `cypress/support/pages/Configuracoes/FormaPagamentoCadastroPage.js` - Métodos de interação com o formulário de cadastro/edição

### Locators
- `cypress/support/locators/Configuracoes/FormaPagamentoListagemLocators.js` - Seletores da listagem
- `cypress/support/locators/Configuracoes/FormaPagamentoCadastroLocators.js` - Seletores do formulário de cadastro/edição

---

## Imports e dependências

### Page Objects
```javascript
import FormaPagamentoListagemPage from '../../support/pages/Configuracoes/FormaPagamentoListagemPage';
import FormaPagamentoCadastroPage from '../../support/pages/Configuracoes/FormaPagamentoCadastroPage';
import FormaPagamentoListagemLocators from '../../support/locators/Configuracoes/FormaPagamentoListagemLocators';
import FormaPagamentoCadastroLocators from '../../support/locators/Configuracoes/FormaPagamentoCadastroLocators';
const { faker } = require('@faker-js/faker');
```

### Locators
- `FormaPagamentoListagemLocators` - Contém todos os seletores da listagem (tabela, botões, filtros)
- `FormaPagamentoCadastroLocators` - Contém todos os seletores do formulário (campos, botões, modal)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

### Faker (ADR-0009)
- `faker.string.alphanumeric()` - Gera strings alfanuméricas aleatórias para descrições
- `faker.number.int()` - Gera números aleatórios para atalho número

---

## Estrutura do teste

### Suite: Listagem de formas de pagamento

**Tags:** `['@configuracoes', '@forma-pagamento', '@listagem', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`
- Acessa a tela de listagem via `FormaPagamentoListagemPage.acessarTelaListagem()`

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
   - Aguarda intercept da requisição

3. **Validação:**
   - Valida que a tabela foi recarregada

#### `it('abre o modal de novo cadastro ao clicar no botao Novo Cadastro')`

**Fluxo completo:**
1. **Abertura do modal:**
   - Clica no botão "Novo Cadastro"
   - Valida que o modal foi aberto (verificado pela presença do texto "Descrição")

#### `it('abre a edicao do primeiro registro da listagem')`

**Fluxo completo:**
1. **Validação de tabela:**
   - Valida que a tabela foi carregada

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

### Suite: Cadastro de forma de pagamento

**Tags:** `['@configuracoes', '@forma-pagamento', '@cadastro', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`

#### `it('deve exibir os botoes principais do formulario')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `FormaPagamentoCadastroPage.visit()` para acessar o modal de cadastro

2. **Validação de layout:**
   - Verifica que o modal está visível
   - Verifica que os botões (Fechar, Salvar) estão visíveis
   - Verifica que os campos obrigatórios (Descrição, Tipo) estão visíveis

#### `it('deve realizar cadastro completo de forma de pagamento apenas com campos obrigatorios')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `FormaPagamentoCadastroPage.visit()` para acessar o modal

2. **Geração de dados:**
   - Gera descrição aleatória usando Faker: `FORMA_PAG_TESTE_${faker.string.alphanumeric(8).toUpperCase()}`

3. **Preenchimento:**
   - Preenche apenas os campos obrigatórios (Descrição e Tipo)

4. **Salvamento:**
   - Chama `FormaPagamentoCadastroPage.salvar()`
   - Aguarda o modal fechar
   - Valida mensagem de sucesso

5. **Validação:**
   - Valida que retornou para a listagem
   - Valida que a forma de pagamento existe na listagem

#### `it('deve realizar cadastro completo de forma de pagamento com todos os campos')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `FormaPagamentoCadastroPage.visit()` para acessar o modal

2. **Geração de dados:**
   - Gera descrição aleatória usando Faker
   - Gera número aleatório para atalho
   - Gera código e adquirente aleatórios

3. **Preenchimento:**
   - Preenche todos os campos (obrigatórios e opcionais)
   - Marca checkboxes (POS, Integrar API, Exibir Pagamento, Saldo Caixa)
   - Desmarca Pré Venda

4. **Salvamento:**
   - Chama `FormaPagamentoCadastroPage.salvar()`
   - Valida mensagem de sucesso

5. **Validação:**
   - Valida que retornou para a listagem
   - Valida que a forma de pagamento existe na listagem

#### `it('deve exibir erro ao tentar salvar sem preencher campos obrigatorios')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `FormaPagamentoCadastroPage.visit()` para acessar o modal

2. **Tentativa de salvamento:**
   - Chama `FormaPagamentoCadastroPage.tentarSalvarSemCamposObrigatorios()` sem preencher campos

3. **Validação de erros:**
   - Valida que o modal ainda está aberto
   - Valida que há campos com erro (`.has-error`)

#### `it('deve fechar o modal ao clicar no botao Fechar')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `FormaPagamentoCadastroPage.visit()` para acessar o modal

2. **Fechamento:**
   - Chama `FormaPagamentoCadastroPage.clicarBotaoFechar()`

3. **Validação:**
   - Valida que o modal foi fechado

#### `it('deve realizar cadastro com tipo CARTAO')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `FormaPagamentoCadastroPage.visit()` para acessar o modal

2. **Geração de dados:**
   - Gera descrição aleatória usando Faker

3. **Preenchimento:**
   - Preenche Descrição
   - Seleciona tipo CARTAO
   - Marca Integrar API

4. **Salvamento:**
   - Chama `FormaPagamentoCadastroPage.salvar()`
   - Valida mensagem de sucesso

5. **Validação:**
   - Valida que a forma de pagamento existe na listagem

#### `it('deve realizar cadastro com tipo BOLETO')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `FormaPagamentoCadastroPage.visit()` para acessar o modal

2. **Geração de dados:**
   - Gera descrição aleatória usando Faker

3. **Preenchimento:**
   - Preenche Descrição
   - Seleciona tipo BOLETO

4. **Salvamento:**
   - Chama `FormaPagamentoCadastroPage.salvar()`
   - Valida mensagem de sucesso

5. **Validação:**
   - Valida que a forma de pagamento existe na listagem

---

## Padrões e boas práticas

- **Page Object Pattern (ADR-0002):** Todos os métodos de interação estão encapsulados nas classes `FormaPagamentoListagemPage` e `FormaPagamentoCadastroPage`
- **Separate Locators (ADR-0003):** Todos os seletores estão centralizados em `FormaPagamentoListagemLocators` e `FormaPagamentoCadastroLocators`
- **Prioritize IDs and Context (ADR-0015):** Locators priorizam IDs quando disponíveis (`#descricao`, `#tipo`, `#btn-salvar`)
- **Faker for Dynamic Data (ADR-0009):** Usa Faker para gerar descrições e números únicos, evitando conflitos entre execuções
- **No fixed waits:** Usa validações condicionais (`.should('be.visible')`, `.should('not.exist')`) ao invés de `cy.wait()` fixo
- **Tags for filtering (ADR-0010):** Tags aplicadas para permitir execução seletiva
- **Modal handling:** Aguarda o modal aparecer/desaparecer usando validações condicionais

### Observações sobre o Modal

- O cadastro/edição é realizado através de um **modal** (diferente de Justificativa que usa página separada)
- O modal é aberto ao clicar em "Novo Cadastro" ou no link de edição de uma linha
- Após salvar, o modal fecha automaticamente e retorna para a listagem
- O modal pode ser fechado clicando no botão "Fechar" (×)

### Observações sobre os Campos

- **Campos obrigatórios:** Descrição e Tipo
- **Tipos disponíveis:** ESPECIE, DUPLICATA, CARTAO, BOLETO, CHEQUE
- **Checkboxes opcionais:** POS, Integrar API, Exibir Pagamento, Pré Venda, Saldo Caixa
- **Campos opcionais:** Atalho Número, Código da Forma Pagamento, Adquirente

---

## Referências

- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0009](../adr/0009-use-faker-for-dynamic-test-data.md): Faker for Dynamic Data
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

