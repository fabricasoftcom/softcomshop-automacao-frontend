# Arquitetura dos casos de teste: Cadastro de Fornecedor

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de Fornecedor**, que valida o processo completo de cadastro de fornecedores no sistema.

**Funcionalidades cobertas:**
- Cadastro de novo fornecedor
- Preenchimento de dados básicos (CNPJ, Nome, Razão Social)
- Validação de salvamento

**Cenários principais:**
- Realizar cadastro de fornecedor com dados aleatórios gerados por Faker

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/compras/cadastro-fornecedor.spec.js` - Teste de cadastro de fornecedor

### Page Objects
- `cypress/support/pages/Fornecedor/FornecedorPage.js` - Métodos para cadastro de fornecedor

### Locators
- `cypress/support/locators/FornecedorLocators.js` - Seletores do cadastro de fornecedor

### Factory
- `cypress/support/factory/generateRandomData.js` - Função `gerarFornecedorAleatorio()` para gerar dados aleatórios

---

## Imports e dependências

### Page Objects
```javascript
import FornecedorPage from '../../support/pages/Fornecedor/FornecedorPage';
```

### Factory
```javascript
import { gerarFornecedorAleatorio } from '../../support/factory/generateRandomData';
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import FornecedorLocators from "../../locators/FornecedorLocators";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial (não usado diretamente, acesso via URL)

---

## Estrutura do teste

### Suite: Cadastro de Fornecedor

**Tags:** `['@cadastro-fornecedor', '@regressivo']` (ADR-0010)

#### `it('Realizar cadastro de Fornecedor')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa página de cadastro de fornecedor via URL direta (`/cadastro/fornecedor/novo`)

2. **Geração de Dados:**
   - Gera dados aleatórios do fornecedor usando `gerarFornecedorAleatorio()`
   - Dados incluem: CNPJ válido, nome e razão social

3. **Preenchimento:**
   - Clica em "Novo cadastro"
   - Preenche CNPJ
   - Preenche nome
   - Preenche razão social

4. **Salvamento:**
   - Clica em salvar
   - Cadastro é realizado

---

## Padrões e boas práticas

### Uso de Faker para Dados Dinâmicos
- Uso de `gerarFornecedorAleatorio()` que utiliza Faker e `cpf-cnpj-validator`
- Geração de CNPJ válido automaticamente
- Dados únicos para cada execução

### Navegação Direta
- Acesso direto via URL (`/cadastro/fornecedor/novo`)
- Não utiliza menu lateral para navegação

### Page Object Pattern
- Encapsulamento de ações em `FornecedorPage`
- Separação de locators em arquivo dedicado

### Tags aplicadas
- `@cadastro-fornecedor` - Identifica funcionalidade específica
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### FornecedorPage

**Navegação:**
- `acessarPaginaFornecedor()` - Acessa página de cadastro via URL direta

**Preenchimento:**
- `preencherCamposFornecedor(fornecedor)` - Preenche todos os campos do fornecedor
  - Clica em "Novo cadastro"
  - Preenche CNPJ
  - Preenche nome
  - Preenche razão social

**Ações:**
- `cadastrar()` - Clica em salvar para cadastrar

**Validações:**
- `confirmacaoCadastroFornecedor()` - Verifica mensagem de sucesso (não usado no teste atual)

---

## Locators utilizados

### FornecedorLocators

**Botões:**
- `novoCadastro` - Botão novo cadastro (#btn-novo)

**Campos:**
- `CNPJInput` - Campo CNPJ (#cpf_cnpj)
- `nomeInput` - Campo nome (#nome)
- `razaoSocialInput` - Campo razão social (#razao_social)

**Ações:**
- `btnSalvar` - Botão salvar (#btn-salvar)

---

## Factory de Dados

### gerarFornecedorAleatorio()

Função que gera dados aleatórios de fornecedor usando Faker:

```javascript
const gerarFornecedorAleatorio = () => {
  let nome = faker.person.fullName()
  return {
    CNPJ: gerarCNPJValido(),  // CNPJ válido gerado
    nome: nome,
    razaoSocial: nome
  };
};
```

**Dependências:**
- `@faker-js/faker` - Biblioteca Faker
- `cpf-cnpj-validator` - Validador de CNPJ

**Características:**
- Gera CNPJ válido usando `cnpj.generate()`
- Nome gerado usando `faker.person.fullName()`
- Razão social igual ao nome

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - `FornecedorPage` utilizado
- **ADR-0003:** Separate Locators from Page Objects - `FornecedorLocators` separado
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0009:** Use Faker for Dynamic Test Data - Faker usado via `gerarFornecedorAleatorio()`
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/cases/architecture-cadastro-compra-manual.md` - Cadastro de compra manual (compras manuais requerem fornecedor)
- `docs/testes.md` - Inventário de testes
- `cypress/support/pages/Fornecedor/FornecedorPage.js` - Page Object
- `cypress/support/locators/FornecedorLocators.js` - Locators
- `cypress/support/factory/generateRandomData.js` - Factory de dados dinâmicos

### Arquivos relacionados
- `cypress/e2e/compras/cadastro-fornecedor.spec.js` - Spec de teste
- `cypress.config.js` - Configuração (specPattern)

---

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0009:** Use Faker for Dynamic Test Data - Faker usado para dados dinâmicos
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-cadastro-produto.md` - Documentação de cadastro de produto
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste usa `cy.loginArmazenandoSessao()` para login eficiente
- Dados são gerados dinamicamente usando Faker, garantindo unicidade
- CNPJ é gerado como válido usando `cpf-cnpj-validator`
- Acesso direto via URL simplifica navegação
- Teste focado em fluxo básico de cadastro

---

## Estrutura de Dados do Fornecedor

```javascript
{
  CNPJ: "12345678000190",  // CNPJ válido gerado
  nome: "João Silva",       // Nome gerado por Faker
  razaoSocial: "João Silva" // Razão social (igual ao nome)
}
```

---

**Última atualização:** 2024-12-19

