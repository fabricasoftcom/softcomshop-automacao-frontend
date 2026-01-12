# Arquitetura dos casos de teste: Cadastro de Empresa

## Objetivo

Validar a funcionalidade de cadastro de empresa, incluindo:
- Exibição do layout básico (abas, botões)
- Preenchimento completo do formulário
- Salvamento com validações

**Funcionalidades cobertas:**
- Cadastro completo de empresa
- Validação de campos obrigatórios
- Autocompletes (Bairro, Cidade-UF)
- Múltiplas abas no formulário (8 abas disponíveis)

**Cenários principais:**
- Validação de layout básico (abas e botões)
- Cadastro completo de empresa com todos os campos
- Validação de campos obrigatórios
- Navegação entre todas as 8 abas
- Teste de botão Voltar
- Teste de edição de empresa existente
- Validação de autocompletes (Bairro e Cidade)

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracoes/empresa-cadastro.spec.js` - Testes de cadastro de empresa

### Page Objects
- `cypress/support/pages/Empresa/EmpresaCadastroPage.js` - Métodos de interação com o formulário de cadastro
- `cypress/support/pages/Empresa/EmpresaListagemPage.js` - Métodos de navegação para o cadastro

### Locators
- `cypress/support/locators/Empresa/EmpresaCadastroLocators.js` - Seletores do formulário de cadastro
- `cypress/support/locators/Empresa/EmpresaLocators.js` - Seletores genéricos (modais, etc)

### Factory
- `cypress/support/factory/generateRandomData.js` - Função `generateRandomCompany()` para gerar dados dinâmicos

---

## Imports e dependências

### Page Objects
```javascript
import EmpresaCadastroPage from '../../support/pages/Empresa/EmpresaCadastroPage';
import EmpresaCadastroLocators from '../../support/locators/Empresa/EmpresaCadastroLocators';
import { generateRandomCompany } from '../../support/factory/generateRandomData';
```

### Locators
- `EmpresaCadastroLocators` - Contém todos os seletores do formulário (campos, botões, abas)
- `EmpresaLocators` - Contém seletores genéricos (modal de confirmação)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

### Factory
- `generateRandomCompany()` - Gera dados aleatórios de empresa usando Faker (ADR-0009)

---

## Estrutura do teste

### Suite: Cadastro de empresa

**Tags:** `['@configuracoes', '@empresa', '@cadastro', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`

#### `it('deve exibir as abas e botoes principais do formulario')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `EmpresaCadastroPage.visit()` para acessar o formulário de cadastro

2. **Validação de layout:**
   - Verifica que as abas estão visíveis
   - Verifica que os botões (Voltar, Novo, Salvar) estão visíveis
   - Verifica que o campo CNPJ está visível

#### `it('deve realizar cadastro completo de empresa')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `EmpresaCadastroPage.visit()` para acessar o formulário

2. **Geração de dados:**
   - Gera dados aleatórios usando `generateRandomCompany()`

3. **Preenchimento:**
   - Preenche todos os campos obrigatórios (CNPJ, Unidade, Fantasia, Razão Social, Impressões)
   - Preenche campos opcionais (endereço, telefone, email, etc)
   - Seleciona Bairro e Cidade nos autocompletes

4. **Salvamento:**
   - Chama `EmpresaCadastroPage.cadastrar()`
   - Trata modal de campos obrigatórios se necessário
   - Aguarda resposta do servidor

5. **Validação:**
   - Verifica mensagem de sucesso

#### `it('deve exibir erro ao tentar salvar sem preencher campos obrigatorios')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `EmpresaCadastroPage.visit()` para acessar o formulário

2. **Tentativa de salvamento:**
   - Chama `EmpresaCadastroPage.tentarSalvarSemCamposObrigatorios()` sem preencher campos

3. **Validação de erros:**
   - Valida mensagens inline "É obrigatório." abaixo dos campos obrigatórios
   - Valida alerta no topo com mensagem "Aviso: Verifique os dados e tente novamente."

#### `it('deve permitir navegar entre todas as abas do formulario')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `EmpresaCadastroPage.visit()` para acessar o formulário

2. **Validação de abas:**
   - Valida que todas as 8 abas são acessíveis
   - Navega por cada aba e valida que está ativa

3. **Abas testadas:**
   - Dados Cadastrais, Certificado Sefaz, Envio de Emails, Dispositivos, Logo, CPFs/CNPJs Autorizados, Configurações, Configuração de chaves

#### `it('deve retornar para listagem ao clicar em Voltar')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `EmpresaCadastroPage.visit()` para acessar o formulário

2. **Navegação:**
   - Chama `EmpresaCadastroPage.clicarBotaoVoltar()`

3. **Validação:**
   - Valida que retornou para a listagem (`/cadastro/empresa`)
   - Valida que não está mais em `/novo` ou `/editar`

#### `it('deve validar autocomplete de bairro')` e `it('deve validar autocomplete de cidade')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `EmpresaCadastroPage.visit()` para acessar o formulário

2. **Teste de autocomplete:**
   - Digita texto no campo de autocomplete
   - Valida que lista de resultados aparece
   - Seleciona primeira opção
   - Valida que campo hidden foi preenchido

#### `it('deve editar empresa existente e validar alteracao')`

**Fluxo completo:**
1. **Acesso à listagem:**
   - Acessa listagem de empresas
   - Valida que tabela está carregada

2. **Acesso à edição:**
   - Clica no primeiro link de edição
   - Valida que URL contém `/editar`

3. **Edição:**
   - Edita campo Fantasia com novo valor
   - Salva edição

4. **Validação:**
   - Verifica mensagem de sucesso

---

## Padrões e boas práticas

### Page Object Pattern (ADR-0002)
- Todos os métodos de interação estão encapsulados em `EmpresaCadastroPage`
- O spec apenas chama os métodos do Page Object

### Locators Centralizados (ADR-0003)
- Todos os seletores estão em `EmpresaCadastroLocators`
- Uso de IDs quando disponíveis (ADR-0015)

### Session Persistence (ADR-0004)
- Uso de `cy.loginArmazenandoSessao()` para funcionalidades não fiscais

### Faker para Dados Dinâmicos (ADR-0009)
- Uso de `generateRandomCompany()` para evitar colisões de dados
- Gera CNPJ válido, nomes, endereços, etc.

### Tags para Filtragem (ADR-0010)
- Tags aplicadas: `@configuracoes`, `@empresa`, `@cadastro`, `@regressivo`
- Permite execução seletiva: `npm run e2e -- --grep "@empresa"`

### Tratamento de Modais
- Tratamento automático de modal de campos obrigatórios
- Preenchimento automático de localização (Bairro/Cidade) quando necessário

### Autocompletes
- Métodos específicos para selecionar Bairro e Cidade
- Validação de campos hidden após seleção

---

## Campos do Formulário

### Campos Obrigatórios (*)
- **CPF/CNPJ** (`#cnpj`) - Type: tel - Validação: "É obrigatório."
- **Unidade** (`#nome`) - Type: text - Validação: "É obrigatório."
- **Fantasia** (`#fantasia`) - Type: text - Validação: "É obrigatório."
- **Razão Social** (`#razao_social`) - Type: text - Validação: "É obrigatório."
- **Cidade - UF** (`#auto_cidade_id`) - Type: text (autocomplete) - Validação: "É obrigatório."
- **Impressões** (`#nome_impressao`) - Type: select (FANTASIA/RAZAO) - Tem valor padrão "FANTASIA"

### Campos Opcionais
- Inscrição Estadual (`#inscricao_estadual`)
- Inscrição Municipal (`#inscricao_municipal`)
- CEP (`#cep`) - Com botão de busca
- Endereço (`#endereco`)
- Número (`#numero`)
- Complemento (`#complemento`)
- Bairro (`#auto_bairro`) - Autocomplete
- Cidade-UF (`#auto_cidade_id`) - Autocomplete
- DDD (`#ddd`)
- Telefone (`#telefone`)
- E-mail (`#email`)

### Abas Disponíveis
1. Dados Cadastrais (ativa por padrão)
2. Certificado Sefaz
3. Envio de Emails
4. Dispositivos
5. Logo
6. CPFs/CNPJs Autorizados
7. Configurações
8. Configuração de chaves

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
- `docs/cases/architecture-empresa-listagem.md` - Listagem de empresas (empresas cadastradas podem ser listadas)

---

## Observações

- O formulário possui 8 abas, todas testadas para navegação
- Os campos Bairro e Cidade-UF usam autocomplete (typeahead) e requerem seleção na lista
- Existe link para pesquisar dados na Receita Federal pelo CNPJ
- Existe botão para buscar CEP automaticamente
- O campo CNPJ aceita tanto CPF quanto CNPJ (campo unificado)
- Validação de campos obrigatórios exibe mensagens inline e alerta no topo
- Teste de edição permite validar alteração de dados de empresa existente

