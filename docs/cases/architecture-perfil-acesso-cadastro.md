# Arquitetura dos casos de teste: Cadastro de Perfil de Acesso

## Objetivo

Validar a funcionalidade de cadastro de perfis de acesso, incluindo:
- Abertura do modal de cadastro
- Preenchimento do formulário (Nome e Profile)
- Validação de campos obrigatórios
- Salvamento de novo perfil
- Fechamento do modal

**Funcionalidades cobertas:**
- Abertura do modal de cadastro via botão "Perfil"
- Preenchimento do campo Nome
- Seleção do campo Profile (CLIENTE, CONTADOR)
- Validação de campos obrigatórios
- Salvamento de novo perfil
- Fechamento do modal (botão Fechar)
- Validação de cadastro bem-sucedido na listagem

**Cenários principais:**
- Exibição do modal de cadastro
- Cadastro completo com todos os campos
- Cadastro apenas com campos obrigatórios
- Validação de erro ao tentar salvar sem campos obrigatórios
- Fechamento do modal
- Seleção de diferentes tipos de Profile

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracoes/perfil-acesso-cadastro.spec.js` - Testes de cadastro de perfis de acesso

### Page Objects
- `cypress/support/pages/Configuracoes/PerfilAcessoPage.js` - Métodos de interação com cadastro e listagem

### Locators
- `cypress/support/locators/Configuracoes/PerfilAcessoLocators.js` - Seletores do modal e formulário de cadastro

---

## Imports e dependências

### Page Objects
```javascript
import PerfilAcessoPage from '../../support/pages/Configuracoes/PerfilAcessoPage';
import PerfilAcessoLocators from '../../support/locators/Configuracoes/PerfilAcessoLocators';
```

### Locators
- `PerfilAcessoLocators` - Contém todos os seletores do modal e formulário de cadastro

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

### Dados dinâmicos
- `@faker-js/faker` - Geração de dados dinâmicos para nomes de perfis (ADR-0009)

---

## Estrutura do teste

### Suite: Cadastro de Perfil de Acesso

**Tags:** `['@configuracoes', '@perfil-acesso', '@cadastro', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`

#### `it('deve exibir o modal de cadastro corretamente')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela de listagem
   - Abre o modal de cadastro

2. **Validações:**
   - Valida que o modal está visível
   - Valida que o título do modal está correto ("Adicione um Perfil")
   - Valida que os campos estão visíveis (Nome, Profile)
   - Valida que o botão Salvar está visível

#### `it('deve realizar cadastro completo de perfil com todos os campos')`

**Fluxo completo:**
1. **Preparação:**
   - Acessa a tela de listagem
   - Gera nome dinâmico usando Faker

2. **Cadastro:**
   - Abre o modal de cadastro
   - Preenche o campo Nome
   - Seleciona Profile (CLIENTE)
   - Salva o perfil

3. **Validação:**
   - Pesquisa pelo perfil criado na listagem
   - Valida que o perfil foi encontrado

#### `it('deve realizar cadastro de perfil apenas com campos obrigatórios')`

**Fluxo completo:**
1. **Preparação:**
   - Acessa a tela de listagem
   - Gera nome dinâmico usando Faker

2. **Cadastro:**
   - Abre o modal de cadastro
   - Preenche apenas o campo Nome (obrigatório)
   - Seleciona Profile (CONTADOR) - obrigatório
   - Salva o perfil

3. **Validação:**
   - Pesquisa pelo perfil criado
   - Valida que o perfil foi encontrado

#### `it('deve exibir erro ao tentar salvar sem preencher campos obrigatórios')`

**Fluxo completo:**
1. **Abertura:**
   - Acessa a tela de listagem
   - Abre o modal de cadastro

2. **Tentativa de salvamento:**
   - Tenta salvar sem preencher campos obrigatórios

3. **Validação:**
   - Valida que o modal ainda está aberto (não foi salvo)
   - Valida que há mensagem de erro ou campo obrigatório

#### `it('deve fechar o modal ao clicar no botão Fechar')`

**Fluxo completo:**
1. **Abertura:**
   - Acessa a tela de listagem
   - Abre o modal de cadastro

2. **Fechamento:**
   - Clica no botão Fechar do modal

3. **Validação:**
   - Valida que o modal foi fechado (não está mais visível)

#### `it('deve permitir selecionar diferentes tipos de Profile')`

**Fluxo completo:**
1. **Abertura:**
   - Acessa a tela de listagem
   - Abre o modal de cadastro

2. **Validação de opções:**
   - Valida que o campo Profile tem opções disponíveis
   - Testa selecionar CLIENTE
   - Testa selecionar CONTADOR
   - Valida que a seleção foi aplicada corretamente

---

## Padrões e boas práticas

### Page Object Pattern (ADR-0002)
- Todos os métodos de interação estão encapsulados em `PerfilAcessoPage`
- O spec apenas chama os métodos do Page Object, sem seletores diretos
- Métodos de validação separados por responsabilidade

### Locators Centralizados (ADR-0003)
- Todos os seletores estão em `PerfilAcessoLocators`
- Uso de IDs quando disponíveis (ADR-0015)
- IDs únicos encontrados: `#modal-perfil`, `#title-simplemodal`, `#role_title`, `#profile`, `#btn-salvar`

### Session Persistence (ADR-0004)
- Uso de `cy.loginArmazenandoSessao()` para funcionalidades não fiscais
- Sessão é reutilizada entre testes

### Tags para Filtragem (ADR-0010)
- Tags aplicadas: `@configuracoes`, `@perfil-acesso`, `@cadastro`, `@regressivo`
- Permite execução seletiva: `npm run e2e -- --grep "@cadastro"`

### Faker para Dados Dinâmicos (ADR-0009)
- Uso de `faker.person.firstName()` para gerar nomes únicos
- Uso de `Date.now()` para garantir unicidade
- Evita conflitos entre execuções de testes

### Validações Condicionais
- Uso de intercepts para aguardar requisições de salvamento
- Validação de modal fechado após salvamento
- Validação de mensagens de erro de forma flexível

---

## Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0009](../adr/0009-use-faker-for-dynamic-test-data.md): Use Faker for Dynamic Test Data
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Documentação relacionada
- `docs/cases/architecture-perfil-acesso.md` - Listagem de perfis de acesso (perfis cadastrados podem ser listados)

---

## Observações

- O cadastro é realizado através de um **modal** (não é uma página separada)
- O modal tem ID único: `#modal-perfil`
- O campo Nome (`#role_title`) é obrigatório
- O campo Profile (`#profile`) é um select com opções: [selecione], CLIENTE, CONTADOR
- O botão Salvar (`#btn-salvar`) está dentro do modal
- O botão Fechar não tem ID, usa seletor por classe: `.modal .close`
- Após salvar, o modal é fechado automaticamente
- O perfil criado pode ser validado na listagem através de pesquisa
- O intercept da requisição POST usa padrão: `**/autenticacao/perfil/salvar**`

