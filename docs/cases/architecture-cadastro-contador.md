# Arquitetura dos casos de teste: Cadastro de Contador

## Objetivo

Validar a funcionalidade de cadastro de contador, incluindo:
- Exibição do layout básico do formulário
- Preenchimento e salvamento completo
- Validação de campos obrigatórios
- Autocompletes de bairro e cidade

**Funcionalidades cobertas:**
- Cadastro completo de contador com todos os campos
- Cadastro apenas com campos obrigatórios
- Validação de campos obrigatórios (CPF, CRC, Email, Nome)
- Seleção de bairro e cidade através de autocomplete
- Navegação e botão Voltar

**Cenários principais:**
- Validação de layout básico (botões e campos)
- Cadastro completo com todos os campos
- Cadastro apenas com campos obrigatórios
- Validação de campos obrigatórios
- Teste de botão Voltar
- Validação de autocomplete de bairro
- Validação de autocomplete de cidade

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracoes/cadastro-contador.spec.js` - Testes de cadastro de contador

### Page Objects
- `cypress/support/pages/Contador/CadastroContadorPage.js` - Métodos de interação com o formulário de cadastro

### Locators
- `cypress/support/locators/Contador/CadastroContadorLocators.js` - Seletores do formulário de cadastro

---

## Imports e dependências

### Page Objects
```javascript
import CadastroContadorPage from '../../support/pages/Contador/CadastroContadorPage';
import CadastroContadorLocators from '../../support/locators/Contador/CadastroContadorLocators';
```

### Locators
- `CadastroContadorLocators` - Contém todos os seletores do formulário (campos, botões, autocompletes)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

### Faker (ADR-0009)
- `faker.person.fullName()` - Gera nomes aleatórios
- `faker.internet.email()` - Gera emails aleatórios
- `faker.location.zipCode()` - Gera CEPs
- `faker.location.streetAddress()` - Gera endereços
- `faker.string.alphanumeric()` - Gera CRC aleatório
- `faker.phone.number()` - Gera telefones

### Validador CPF/CNPJ
- `cpf.generate()` - Gera CPF válido usando biblioteca `cpf-cnpj-validator`

---

## Estrutura do teste

### Suite: Cadastro de contador

**Tags:** `['@configuracoes', '@contador', '@cadastro', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`

#### `it('deve exibir os botoes principais do formulario')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `CadastroContadorPage.visit()` para acessar a página de cadastro (`/cadastro/contador`)
   - Aguarda o loading desaparecer
   - Valida que o título "Contador" está visível

2. **Validação de layout:**
   - Verifica que o título está visível
   - Verifica que os botões (Voltar, Salvar) estão visíveis
   - Verifica que os campos obrigatórios (CPF, Nome, Email, CRC) estão visíveis

#### `it('deve realizar cadastro completo de contador com todos os campos')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `CadastroContadorPage.visit()` para acessar o formulário

2. **Geração de dados:**
   - Gera dados aleatórios usando `generateRandomContador()` que inclui:
     - CPF válido (usando `cpf.generate()`)
     - CRC alfanumérico
     - Email, nome, telefone, fax
     - CEP, endereço, número, complemento
     - Bairro padrão: 'CENTRO'
     - Cidade padrão: 'SAO PAULO - SP'

3. **Preenchimento:**
   - Preenche todos os campos do formulário através de `preencherFormulario()`

4. **Salvamento:**
   - Chama `CadastroContadorPage.salvar()`
   - Valida mensagem de sucesso (toast contendo "Sucesso")

#### `it('deve realizar cadastro completo de contador apenas com campos obrigatorios')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `CadastroContadorPage.visit()` para acessar o formulário

2. **Geração de dados:**
   - Gera apenas os campos obrigatórios:
     - CPF válido
     - CRC
     - Email
     - Nome

3. **Preenchimento:**
   - Preenche apenas os campos obrigatórios

4. **Salvamento:**
   - Chama `CadastroContadorPage.salvar()`
   - Valida mensagem de sucesso

#### `it('deve exibir erro ao tentar salvar sem preencher campos obrigatorios')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `CadastroContadorPage.visit()` para acessar o formulário

2. **Tentativa de salvamento:**
   - Chama `CadastroContadorPage.tentarSalvarSemCamposObrigatorios()` sem preencher campos

3. **Validação de erros:**
   - Valida que o formulário ainda está na tela (URL contém `/cadastro/contador`)

#### `it('deve retornar para home ao clicar em Voltar')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `CadastroContadorPage.visit()` para acessar o formulário

2. **Navegação:**
   - Chama `CadastroContadorPage.clicarBotaoVoltar()`

3. **Validação:**
   - Valida que retornou para a home (URL não contém `/cadastro/contador`)

#### `it('deve validar autocomplete de bairro')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `CadastroContadorPage.visit()` para acessar o formulário

2. **Seleção de bairro:**
   - Chama `CadastroContadorPage.selecionarBairro('CENTRO')`
   - O método preenche o campo `#auto_bairro`
   - Aguarda a lista de resultados aparecer
   - Clica no primeiro resultado
   - Valida que o campo hidden `#bairro` foi preenchido

3. **Validação:**
   - Valida que o campo hidden tem valor preenchido

#### `it('deve validar autocomplete de cidade')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `CadastroContadorPage.visit()` para acessar o formulário

2. **Seleção de cidade:**
   - Chama `CadastroContadorPage.selecionarCidade('SAO PAULO - SP')`
   - O método preenche o campo `#auto_cidade_id`
   - Aguarda a lista de resultados aparecer
   - Clica no primeiro resultado
   - Valida que o campo hidden `#cidade_id` foi preenchido

3. **Validação:**
   - Valida que o campo hidden tem valor preenchido

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern (ADR-0002):** Todos os métodos de interação estão encapsulados na classe `CadastroContadorPage`
- ✅ **Separate Locators (ADR-0003):** Todos os seletores estão centralizados em `CadastroContadorLocators`
- ✅ **Session Persistence (ADR-0004):** Usa `cy.loginArmazenandoSessao()` para login persistente (não é funcionalidade fiscal)
- ✅ **Prioritize IDs and Context (ADR-0015):** Locators priorizam IDs quando disponíveis (`#cpf`, `#nome`, `#email`, `#btn-salvar`)
- ✅ **Faker for Dynamic Data (ADR-0009):** Usa Faker para gerar dados únicos, evitando conflitos entre execuções
- ✅ **No fixed waits:** Usa validações condicionais (`.should('be.visible')`, `.should('not.exist')`) ao invés de `cy.wait()` fixo
- ✅ **Tags for filtering (ADR-0010):** Tags aplicadas para permitir execução seletiva

### Observações sobre Autocompletes

- Os campos **Bairro** e **Cidade** usam autocomplete (typeahead)
- Para cada autocomplete existe:
  - Campo visível: `#auto_bairro`, `#auto_cidade_id`
  - Campo hidden relacionado: `#bairro`, `#cidade_id`
  - Container do typeahead: `#div_auto_bairro`, `#div_auto_cidade_id`
  - Lista de resultados: `#div_auto_bairro .typeahead-list li a`, `#div_auto_cidade_id .typeahead-list li a`
- Após selecionar um item na lista, o campo hidden é preenchido automaticamente
- A validação verifica que o campo hidden foi preenchido

### Campos Obrigatórios

Os campos obrigatórios são (marcados com * no formulário):
- **CPF** (`#cpf`)
- **CRC** (`#crc`)
- **Email** (`#email`)
- **Nome** (`#nome`)

### Campos Opcionais

- CNPJ, Fone, Fax
- Endereço completo (CEP, Endereço, Número, Complemento, Bairro, Cidade)

---

## Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0009](../adr/0009-use-faker-for-dynamic-test-data.md): Faker for Dynamic Data
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

