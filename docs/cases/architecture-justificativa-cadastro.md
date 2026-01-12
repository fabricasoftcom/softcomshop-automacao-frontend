# Arquitetura dos casos de teste: Cadastro de Justificativa

## Objetivo

Validar a funcionalidade de cadastro de justificativa, incluindo:
- Exibição do layout básico do formulário
- Preenchimento e salvamento completo
- Validação de campos obrigatórios

**Funcionalidades cobertas:**
- Cadastro completo de justificativa
- Validação de campos obrigatórios
- Seleção de rotinas (select múltiplo com Chosen)
- Navegação e botão Voltar

**Cenários principais:**
- Validação de layout básico (botões e campos)
- Cadastro completo com apenas descrição
- Cadastro completo com descrição e rotinas
- Validação de campos obrigatórios
- Teste de botão Voltar

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracoes/justificativa-cadastro.spec.js` - Testes de cadastro de justificativa

### Page Objects
- `cypress/support/pages/Configuracoes/JustificativaCadastroPage.js` - Métodos de interação com o formulário de cadastro
- `cypress/support/pages/Configuracoes/JustificativaListagemPage.js` - Métodos de navegação para o cadastro

### Locators
- `cypress/support/locators/Configuracoes/JustificativaCadastroLocators.js` - Seletores do formulário de cadastro

---

## Imports e dependências

### Page Objects
```javascript
import JustificativaCadastroPage from '../../support/pages/Configuracoes/JustificativaCadastroPage';
import JustificativaListagemPage from '../../support/pages/Configuracoes/JustificativaListagemPage';
import JustificativaCadastroLocators from '../../support/locators/Configuracoes/JustificativaCadastroLocators';
const { faker } = require('@faker-js/faker');
```

### Locators
- `JustificativaCadastroLocators` - Contém todos os seletores do formulário (campos, botões)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

### Faker (ADR-0009)
- `faker.string.alphanumeric()` - Gera strings alfanuméricas aleatórias para descrições

---

## Estrutura do teste

### Suite: Cadastro de justificativa

**Tags:** `['@configuracoes', '@justificativa', '@cadastro', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`

#### `it('deve exibir os botoes principais do formulario')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `JustificativaCadastroPage.visit()` para acessar o formulário de cadastro

2. **Validação de layout:**
   - Verifica que o título está visível
   - Verifica que os botões (Voltar, Salvar) estão visíveis
   - Verifica que o campo Descrição está visível

#### `it('deve realizar cadastro completo de justificativa apenas com descricao')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `JustificativaCadastroPage.visit()` para acessar o formulário

2. **Geração de dados:**
   - Gera descrição aleatória usando Faker: `JUSTIFICATIVA_TESTE_${faker.string.alphanumeric(8).toUpperCase()}`

3. **Preenchimento:**
   - Preenche apenas o campo Descrição (obrigatório)

4. **Salvamento:**
   - Chama `JustificativaCadastroPage.salvar()`
   - Valida mensagem de sucesso

5. **Validação:**
   - Valida que retornou para a listagem

#### `it('deve realizar cadastro completo de justificativa com descricao e rotinas')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `JustificativaCadastroPage.visit()` para acessar o formulário

2. **Geração de dados:**
   - Gera descrição aleatória usando Faker
   - Define array de rotinas: `['delivery']`

3. **Preenchimento:**
   - Preenche o campo Descrição
   - Seleciona rotinas no select múltiplo (Chosen)

4. **Salvamento:**
   - Chama `JustificativaCadastroPage.salvar()`
   - Valida mensagem de sucesso

5. **Validação:**
   - Valida que retornou para a listagem

#### `it('deve exibir erro ao tentar salvar sem preencher campos obrigatorios')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `JustificativaCadastroPage.visit()` para acessar o formulário

2. **Tentativa de salvamento:**
   - Chama `JustificativaCadastroPage.tentarSalvarSemCamposObrigatorios()` sem preencher campos

3. **Validação de erros:**
   - Valida que o formulário ainda está na tela (URL contém `/novo`)

#### `it('deve retornar para listagem ao clicar em Voltar')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `JustificativaCadastroPage.visit()` para acessar o formulário

2. **Navegação:**
   - Chama `JustificativaCadastroPage.clicarBotaoVoltar()`

3. **Validação:**
   - Valida que retornou para a listagem (`/configuracao/tipo-justificativa`)
   - Valida que não está mais em `/novo` ou `/editar`

---

## Padrões e boas práticas

- **Page Object Pattern (ADR-0002):** Todos os métodos de interação estão encapsulados na classe `JustificativaCadastroPage`
- **Separate Locators (ADR-0003):** Todos os seletores estão centralizados em `JustificativaCadastroLocators`
- **Prioritize IDs and Context (ADR-0015):** Locators priorizam IDs quando disponíveis (`#descricao`, `#btn-salvar`, `#rotina`)
- **Faker for Dynamic Data (ADR-0009):** Usa Faker para gerar descrições únicas, evitando conflitos entre execuções
- **No fixed waits:** Usa validações condicionais (`.should('be.visible')`) ao invés de `cy.wait()` fixo
- **Tags for filtering (ADR-0010):** Tags aplicadas para permitir execução seletiva

### Observações sobre o campo Rotinas

- O campo Rotinas é um **select múltiplo** usando o plugin **Chosen**
- Para interagir, usamos o método `.select()` do Cypress diretamente no select nativo (`#rotina`)
- O Cypress consegue interagir com Chosen através do select HTML nativo subjacente

---

## Referências

### ADRs relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0009](../adr/0009-use-faker-for-dynamic-test-data.md): Faker for Dynamic Data
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Documentação relacionada
- `docs/cases/architecture-justificativa-listagem.md` - Listagem de justificativas (justificativas cadastradas podem ser listadas)

