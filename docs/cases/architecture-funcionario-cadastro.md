# Arquitetura dos casos de teste: Cadastro de Funcionário

## Objetivo

Validar a funcionalidade de cadastro de funcionário, incluindo:
- Exibição do layout básico (abas, botões)
- Preenchimento completo do formulário
- Salvamento com validações
- Edição de funcionário existente

**Funcionalidades cobertas:**
- Cadastro completo de funcionário
- Validação de campos obrigatórios (Nome, Função)
- Autocompletes (Função, Setor, Bairro, Cidade-UF)
- Múltiplas abas no formulário (2 abas: Dados Cadastrais, Usuário)
- Switchers (Supervisor, Desativado)

**Cenários principais:**
- Validação de layout básico (abas e botões)
- Cadastro completo de funcionário com todos os campos
- Validação de campos obrigatórios
- Navegação entre as 2 abas
- Teste de botão Voltar
- Teste de edição de funcionário existente
- Validação de autocompletes (Função, Bairro e Cidade)

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracoes/funcionario-cadastro.spec.js` - Testes de cadastro de funcionário

### Page Objects
- `cypress/support/pages/Funcionario/FuncionarioCadastroPage.js` - Métodos de interação com o formulário de cadastro
- `cypress/support/pages/Funcionario/FuncionarioListagemPage.js` - Métodos de navegação para o cadastro

### Locators
- `cypress/support/locators/Funcionario/FuncionarioCadastroLocators.js` - Seletores do formulário de cadastro
- `cypress/support/locators/Funcionario/FuncionarioLocators.js` - Seletores genéricos (modais, etc)

### Factory
- `cypress/support/factory/generateRandomData.js` - Função `generateRandomFuncionario()` para gerar dados dinâmicos

---

## Imports e dependências

### Page Objects
```javascript
import FuncionarioCadastroPage from '../../support/pages/Funcionario/FuncionarioCadastroPage';
import FuncionarioListagemPage from '../../support/pages/Funcionario/FuncionarioListagemPage';
import FuncionarioCadastroLocators from '../../support/locators/Funcionario/FuncionarioCadastroLocators';
import { generateRandomFuncionario } from '../../support/factory/generateRandomData';
```

### Locators
- `FuncionarioCadastroLocators` - Contém todos os seletores do formulário (campos, botões, abas)
- `FuncionarioLocators` - Contém seletores genéricos (modal de confirmação)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

### Factory
- `generateRandomFuncionario()` - Gera dados aleatórios de funcionário usando Faker (ADR-0009)

---

## Estrutura do teste

### Suite: Cadastro de funcionário

**Tags:** `['@configuracoes', '@funcionario', '@cadastro', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`

#### `it('deve exibir as abas e botoes principais do formulario')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `FuncionarioCadastroPage.visit()` para acessar o formulário de cadastro

2. **Validação de layout:**
   - Verifica que as abas estão visíveis
   - Verifica que os botões (Voltar, Novo, Salvar) estão visíveis
   - Verifica que o campo Nome está visível

#### `it('deve realizar cadastro completo de funcionario')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `FuncionarioCadastroPage.visit()` para acessar o formulário

2. **Geração de dados:**
   - Gera dados aleatórios usando `generateRandomFuncionario()`

3. **Preenchimento:**
   - Preenche campos obrigatórios (Nome, Função)
   - Preenche campos opcionais (CPF, RG, endereço, etc)
   - Seleciona Função, Setor, Bairro e Cidade nos autocompletes

4. **Salvamento:**
   - Salva o cadastro
   - Valida mensagem de sucesso

5. **Exclusão:**
   - Retorna para listagem
   - Pesquisa pelo funcionário criado
   - Seleciona e exclui o funcionário
   - Valida exclusão

#### `it('deve exibir erro ao tentar salvar sem preencher campos obrigatorios')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa o formulário sem preencher campos

2. **Tentativa de salvamento:**
   - Tenta salvar sem preencher campos obrigatórios
   - Valida mensagens de erro

#### `it('deve permitir navegar entre todas as abas do formulario')`

**Fluxo completo:**
1. **Validação:**
   - Valida que todas as abas são acessíveis

2. **Navegação:**
   - Navega por cada aba (Dados Cadastrais, Usuário)
   - Valida que cada aba está ativa

#### `it('deve retornar para listagem ao clicar em Voltar')`

**Fluxo completo:**
1. **Navegação:**
   - Clica no botão Voltar
   - Valida que retornou para a listagem

#### `it('deve validar autocomplete de funcao')`

**Fluxo completo:**
1. **Autocomplete:**
   - Digita no campo Função
   - Seleciona opção da lista
   - Valida que o campo hidden foi preenchido

#### `it('deve validar autocomplete de bairro')`

**Fluxo completo:**
1. **Autocomplete:**
   - Digita no campo Bairro
   - Seleciona opção da lista
   - Valida que o campo hidden foi preenchido

#### `it('deve validar autocomplete de cidade')`

**Fluxo completo:**
1. **Autocomplete:**
   - Digita no campo Cidade
   - Seleciona opção da lista
   - Valida que o campo hidden foi preenchido

#### `it('deve editar funcionario existente e validar alteracao')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem
   - Abre edição do primeiro funcionário

2. **Edição:**
   - Edita um campo (ex: Observação)
   - Salva a edição
   - Valida mensagem de sucesso

---

## Padrões e boas práticas

### ADR-0002: Page Object Pattern
- ✅ Todos os métodos de interação estão encapsulados em `FuncionarioCadastroPage`
- ✅ Specs não contêm seletores CSS/XPath diretamente

### ADR-0003: Separate Locators
- ✅ Todos os seletores estão centralizados em `FuncionarioCadastroLocators`
- ✅ Locators compartilhados (modais) estão em `FuncionarioLocators`

### ADR-0004: Session Persistence
- ✅ Usa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)

### ADR-0007: Separate Specs
- ✅ Spec separado para cadastro (`funcionario-cadastro.spec.js`)

### ADR-0009: Faker for Dynamic Data
- ✅ Usa `generateRandomFuncionario()` para gerar dados dinâmicos

### ADR-0010: Tags for Test Filtering
- ✅ Tags aplicadas: `['@configuracoes', '@funcionario', '@cadastro', '@regressivo']`

### ADR-0015: Prioritize IDs and Context
- ✅ Locators priorizam IDs quando disponíveis
- ✅ Locators usam contexto quando necessário (ex: `.modal #elemento`)

---

## Campos do formulário

### Campos obrigatórios
- **Nome** (`#nome`) - Texto
- **Função** (`#auto_funcao_id`) - Autocomplete typeahead

### Campos opcionais principais
- **Setor** (`#auto_setor_id`) - Autocomplete typeahead
- **CPF** (`#cpf`) - Telefone (máscara)
- **RG** (`#rg`) - Texto
- **Data Admissão** (`#data_admissao`) - Datepicker
- **Data Demissão** (`#data_demissao`) - Datepicker
- **CEP** (`#cep`) - Telefone (máscara)
- **Endereço** (`#endereco`) - Texto
- **Número** (`#numero`) - Texto
- **Complemento** (`#complemento`) - Texto
- **Bairro** (`#auto_bairro`) - Autocomplete typeahead
- **Cidade - UF** (`#auto_cidade_id`) - Autocomplete typeahead
- **Desconto (%)** (`#desconto_percentual`) - Decimal
- **Comissão (%)** (`#comissao`) - Decimal
- **Supervisor** (`#switcher_supervisor`) - Switcher (checkbox)
- **Número Cartão Supervisor** (`#numero_cartao_supervisor`) - Password (habilitado quando Supervisor está ativo)
- **Observação** (`#observacao`) - Textarea
- **Desativado** (`#switcher_desativado`) - Switcher (checkbox)

---

## Observações importantes

1. **Campos obrigatórios:** Apenas Nome e Função são obrigatórios
2. **Autocompletes:** Todos seguem padrão typeahead com container `#div_auto_{campo}`
3. **Switchers:** Usar `#switcher_{campo}` para interação, não o hidden
4. **Abas:** Apenas 2 abas (Dados Cadastrais e Usuário) - mais simples que Empresa
5. **Função padrão:** Factory gera com função 'VENDEDOR' por padrão

