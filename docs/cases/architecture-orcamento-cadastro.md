# Arquitetura dos casos de teste: Cadastro de Orçamento

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de Orçamento**, que valida o processo completo de criação de orçamentos no sistema, incluindo preenchimento de dados do cliente, informações adicionais, produtos e condições de pagamento.

**Funcionalidades cobertas:**
- Cadastro de novo orçamento
- Preenchimento de dados do cliente
- Preenchimento de informações adicionais
- Adição de produtos ao orçamento
- Seleção de condição de pagamento
- Validação de salvamento

**Cenários principais:**
- Preencher e salvar um novo orçamento com sucesso usando dados aleatórios gerados por Faker

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/orcamento/orcamento-cadastro.spec.js` - Teste de cadastro de orçamento

### Page Objects
- `cypress/support/pages/Orcamento/OrcamentoCadastroPage.js` - Métodos para cadastro de orçamento

### Locators
- `cypress/support/locators/OrcamentoCadastroLocators.js` - Seletores do cadastro de orçamento

### Factory
- `cypress/support/factory/generateRandomData.js` - Funções `generateRandomDadosOrcamento()` e `generateRandomDadosOrcamentoProduto()` para gerar dados aleatórios

---

## Imports e dependências

### Page Objects
```javascript
import OrcamentoCadastroPage from "../../support/pages/Orcamento/OrcamentoCadastroPage";
```

### Factory
```javascript
import {generateRandomDadosOrcamento} from "../../support/factory/generateRandomData";
import {generateRandomDadosOrcamentoProduto} from "../../support/factory/generateRandomData";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import OrcamentoCadastroLocators from "../../locators/OrcamentoCadastroLocators";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial (não usado diretamente, acesso via URL)

---

## Estrutura do teste

### Suite: Cadastro de Novo Orçamento

**Tags:** `['@orcamento', '@cadastro-orcamento', '@regressivo']` (ADR-0010)

#### `it('Deve preencher e salvar um novo orçamento com sucesso')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa página de cadastro de orçamento via URL direta (`/orcamento/novo`)

2. **Geração de Dados:**
   - Gera dados aleatórios do orçamento usando `generateRandomDadosOrcamento()`
   - Gera dados aleatórios do produto usando `generateRandomDadosOrcamentoProduto()`
   - Logs dos dados gerados para debug

3. **Preenchimento do Formulário:**
   - Preenche dados básicos (cliente, telefone, email, responsável, vendedor, observações, validade, data validade)
   - Preenche dados do orçamento (CPF/CNPJ, CEP, número, complemento)
   - Preenche informações adicionais (descrição serviço, prazo entrega, garantia)

4. **Adição de Produto:**
   - Adiciona produto ao orçamento com quantidade e preço

5. **Condição de Pagamento:**
   - Preenche condição de pagamento (fixo: "À vista")

6. **Salvamento:**
   - Salva o formulário
   - Valida mensagem de sucesso

---

## Padrões e boas práticas

### Uso de Faker para Dados Dinâmicos
- Uso de `generateRandomDadosOrcamento()` e `generateRandomDadosOrcamentoProduto()` que utilizam Faker
- Dados únicos para cada execução
- Valores realistas (telefone, email, datas, etc.)

### Navegação Direta
- Acesso direto via URL (`/orcamento/novo`)
- Não utiliza menu lateral para navegação

### Page Object Pattern
- Encapsulamento de ações em `OrcamentoCadastroPage`
- Separação de locators em arquivo dedicado
- Métodos específicos para cada etapa do preenchimento

### Logs para Debug
- Uso de `cy.log()` para registrar dados gerados
- Facilita troubleshooting durante execução

### Tags aplicadas
- `@orcamento` - Identifica módulo
- `@cadastro-orcamento` - Identifica funcionalidade específica
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### OrcamentoCadastroPage

**Navegação:**
- `visit()` - Acessa página de cadastro via URL direta e valida status label

**Preenchimento:**
- `preencherFormulario(dados)` - Preenche dados básicos do formulário
  - Seleciona cliente via autocomplete
  - Preenche telefone, email, responsável
  - Seleciona vendedor via autocomplete
  - Preenche observações, validade, data validade

- `preencherDadosOrcamento(dados)` - Preenche dados do orçamento
  - Preenche CPF/CNPJ
  - Preenche CEP e busca endereço
  - Preenche número e complemento

- `preencherInformacoesAdicionais(dados)` - Preenche informações adicionais
  - Descrição do serviço
  - Prazo de entrega
  - Garantia

- `adicionarProduto(dados)` - Adiciona produto ao orçamento
  - Seleciona produto via autocomplete
  - Preenche quantidade
  - Preenche preço

- `preencherCondicaoPagamento(condicaoPagamento)` - Preenche condição de pagamento

**Ações:**
- `salvarFormulario()` - Clica em salvar (primeiro botão)

**Validações:**
- `validarSucesso()` - Verifica toast de sucesso contendo "sucesso"

---

## Locators utilizados

### OrcamentoCadastroLocators

**Campos:**
- `statusLabel` - Label de status
- `dropdownCliente` - Dropdown de cliente
- `campoClienteResultado` - Resultado do autocomplete cliente
- `campoTelefone` - Campo telefone
- `campoEmail` - Campo email
- `campoResponsavel` - Campo responsável
- `dropdownVendedor` - Dropdown de vendedor
- `campoVendedorResultado` - Resultado do autocomplete vendedor
- `campoObservacoes` - Campo observações
- `campoValidade` - Campo validade (dias)
- `campoDataValidade` - Campo data validade
- `campoCpfCnpj` - Campo CPF/CNPJ
- `campoCep` - Campo CEP
- `btnBuscarCep` - Botão buscar CEP
- `campoNumero` - Campo número
- `campoComplemento` - Campo complemento
- `campoDescricaoServico` - Campo descrição serviço
- `campoPrazoEntrega` - Campo prazo entrega
- `campoGarantia` - Campo garantia
- `campoProduto` - Campo produto
- `campoProdutoResultado` - Resultado do autocomplete produto
- `campoQuantidade` - Campo quantidade
- `campoPreco` - Campo preço
- `campoCondicaoPagamento` - Campo condição pagamento

**Botões:**
- `btnSalvar` - Botão salvar

**Validações:**
- `toastSucesso` - Toast de sucesso

---

## Factory de Dados

### generateRandomDadosOrcamento()

Função que gera dados aleatórios de orçamento usando Faker:

```javascript
{
  telefone: 11 * 100000000 + Math.floor(Math.random() * 100000000),
  email: faker.internet.email(),
  responsavel: faker.person.fullName(),
  vendedor: faker.person.fullName(),
  observacoes: faker.lorem.sentence(),
  validade: Math.floor(Math.random() * 60) + 1,
  dataValidade: faker.date.soon().toLocaleDateString('pt-BR'),
  cpfCnpj: generateValidCPF(),
  cep: '58030021',
  numero: Math.floor(Math.random() * 9999) + 1,
  complemento: faker.address.secondaryAddress(),
  tipoDebito: ['Crédito', 'Débito'][Math.floor(Math.random() * 2)],
  descricaoServico: faker.lorem.sentence(),
  prazoEntrega: Math.floor(Math.random() * 30) + 1 + ' dias',
  garantia: faker.date.soon().toLocaleDateString('pt-BR')
}
```

### generateRandomDadosOrcamentoProduto()

Função que gera dados aleatórios de produto para orçamento:

```javascript
{
  produto: 'Produto',
  quantidade: Math.floor(Math.random() * 999) + 1,
  preco: faker.commerce.price()
}
```

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0009:** Use Faker for Dynamic Test Data - Faker usado para dados dinâmicos
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-orcamento-listagem.md` - Documentação de listagem de orçamento
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste usa `cy.loginArmazenandoSessao()` para login eficiente
- Dados são gerados dinamicamente usando Faker
- Condição de pagamento fixa: "À vista" (pode ser parametrizada no futuro)
- Busca de CEP automática após preenchimento
- Uso de autocomplete para seleção de cliente, vendedor e produto
- Logs de dados gerados para facilitar debug

---

## Estrutura de Dados do Orçamento

```javascript
{
  // Dados básicos
  telefone: "11987654321",
  email: "cliente@exemplo.com",
  responsavel: "João Silva",
  vendedor: "Maria Santos",
  observacoes: "Observações do orçamento",
  validade: 30,
  dataValidade: "31/12/2024",
  
  // Dados do orçamento
  cpfCnpj: "12345678900",
  cep: "58030021",
  numero: "123",
  complemento: "Apto 45",
  
  // Informações adicionais
  descricaoServico: "Descrição do serviço",
  prazoEntrega: "15 dias",
  garantia: "31/12/2025"
}
```

---

**Última atualização:** 2024-12-19

