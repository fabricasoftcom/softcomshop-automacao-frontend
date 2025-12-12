# Descobertas - Funcionários

Este documento contém todas as descobertas da exploração autônoma realizada pelo Cursor usando ferramentas de browser para o módulo de Funcionários.

**Data da Exploração:** 2025-01-XX  
**Base URL:** `https://stage-release-2.softcomshop.com.br`  
**Rota Base:** `/cadastro/funcionario`

---

## 1. Listagem de Funcionários

### 1.1. URL e Navegação
- **URL:** `/cadastro/funcionario`
- **Menu:** Configurações > Funcionários
- **Título da Página:** "Listagem"

### 1.2. Botões Principais

| Elemento | Locator | Descrição |
|----------|---------|-----------|
| Botão Novo | `#btn-novo` | Link para novo cadastro |
| Botão Excluir Selecionados | `#btn-excluir-selecionados` | Botão para excluir registros selecionados |
| Ícone Pesquisa | `a[href="#"]` (próximo ao título) | Toggle do formulário de pesquisa |

### 1.3. Formulário de Pesquisa

O formulário de pesquisa é exibido/ocultado ao clicar no ícone de pesquisa (toggle).

| Campo | Locator | Tipo | Descrição |
|-------|---------|------|-----------|
| Código | `#id` | text | Campo para pesquisar por código |
| Nome | `#nome` | text | Campo para pesquisar por nome |
| Botão Pesquisar | `#pesquisar` | button | Submete a pesquisa |

**Estrutura do Form:**
- Form class: `form-horizontal`
- Container: Visível quando expandido

### 1.4. Tabela

| Elemento | Locator | Descrição |
|----------|---------|-----------|
| Tabela | `table.table-hover` | Tabela principal |
| Linhas da Tabela | `table.table-hover tbody tr` | Linhas de dados |
| Colunas | Código, Nome, Usuário, Função | Colunas exibidas |

**Colunas da Tabela:**
1. Checkbox (seleção)
2. Ícone de edição (🔄)
3. Código (ordenável)
4. Nome (ordenável)
5. Usuário
6. Função

### 1.5. Checkboxes

| Elemento | Locator | Descrição |
|----------|---------|-----------|
| Selecionar Todos | `input.check_all[name="simplecheck[]"]` | Checkbox no cabeçalho |
| Checkboxes Itens | `input[name="simplecheck[]"]:not(.check_all)` | Checkboxes das linhas |

### 1.6. Links de Edição

- **Padrão:** `a[href*="/editar"]` ou `a[href*="funcionario/{id}/editar"]`
- **Exemplo:** `funcionario/10/editar`
- Todos os elementos da linha (código, nome, etc.) são clicáveis e levam à edição

### 1.7. Ordenação

- Colunas "Código" e "Nome" possuem links de ordenação (crescente/decrescente)
- URLs de ordenação: `?order=id`, `?order=-id`, `?order=nome`, `?order=-nome`

---

## 2. Cadastro de Funcionário

### 2.1. URL e Navegação
- **URL Novo:** `/cadastro/funcionario/novo`
- **URL Edição:** `/cadastro/funcionario/{id}/editar`
- **Título:** "Funcionário -"

### 2.2. Botões Principais

| Elemento | Locator | Descrição |
|----------|---------|-----------|
| Botão Salvar | `#btn-salvar` | Salva o cadastro |
| Botão Voltar | `#btn-voltar` ou link com href para `/cadastro/funcionario` | Retorna para listagem |
| Botão Novo | `#btn-novo` | Link para novo cadastro |

### 2.3. Abas

O formulário possui 2 abas:

| Aba | Locator | Descrição |
|-----|---------|-----------|
| Dados Cadastrais | `[role="tab"]:contains("Dados Cadastrais")` | Aba principal (ativa por padrão) |
| Usuário | `[role="tab"]:contains("Usuário")` | Aba de configuração de usuário |

**Container de Abas:** `[role="tablist"]`

### 2.4. Campos do Formulário - Dados Cadastrais

#### Campos Obrigatórios (marcados com *)

| Campo | Locator | Tipo | Obrigatório | Observações |
|-------|---------|------|-------------|-------------|
| Nome | `#nome` | text | ✅ Sim | Campo obrigatório |
| Função | `#auto_funcao_id` | text (autocomplete) | ✅ Sim | Autocomplete typeahead, campo hidden: `#funcao_id` |

#### Campos Opcionais

| Campo | Locator | Tipo | Observações |
|-------|---------|------|-------------|
| Setor | `#auto_setor_id` | text (autocomplete) | Autocomplete typeahead, campo hidden: `#setor_id` |
| CPF | `#cpf` | tel | Campo de telefone (máscara) |
| RG | `#rg` | text | |
| Data Admissão | `#data_admissao` | text (datepicker) | Datepicker com ícone calendário |
| Data Demissão | `#data_demissao` | text (datepicker) | Datepicker com ícone calendário |
| CEP | `#cep` | tel | Campo de telefone (máscara), botão buscar CEP |
| Endereço | `#endereco` | text | |
| Número | `#numero` | text | |
| Complemento | `#complemento` | text | |
| Bairro | `#auto_bairro` | text (autocomplete) | Autocomplete typeahead, campo hidden: `#bairro` |
| Cidade - UF | `#auto_cidade_id` | text (autocomplete) | Autocomplete typeahead, campo hidden: `#cidade_id` |
| Desconto (%) | `#desconto_percentual` | text | Campo numérico decimal |
| Comissão (%) | `#comissao` | text | Campo numérico decimal |
| Supervisor | `#switcher_supervisor` | checkbox | Switcher, campo hidden: `#supervisor` |
| Número Cartão Supervisor | `#numero_cartao_supervisor` | password | Desabilitado até ativar Supervisor |
| Observação | `#observacao` | textarea | |
| Desativado | `#switcher_desativado` | checkbox | Switcher, campo hidden: `#desativado` |

### 2.5. Autocompletes (Typeahead)

Os seguintes campos usam autocomplete typeahead:

1. **Função** (`#auto_funcao_id`)
   - Hidden: `#funcao_id`
   - Container: `#div_auto_funcao_id`

2. **Setor** (`#auto_setor_id`)
   - Hidden: `#setor_id`
   - Container: `#div_auto_setor_id`

3. **Bairro** (`#auto_bairro`)
   - Hidden: `#bairro`
   - Container: `#div_auto_bairro`

4. **Cidade - UF** (`#auto_cidade_id`)
   - Hidden: `#cidade_id`
   - Container: `#div_auto_cidade_id`

**Padrão de Locators para Autocompletes:**
- Input visível: `#auto_{campo}_id` ou `#auto_{campo}`
- Hidden: `#{campo}_id` ou `#{campo}`
- Container: `#div_auto_{campo}_id` ou `#div_auto_{campo}`
- Lista de resultados: `#div_auto_{campo}_id .typeahead-list li a` ou similar

### 2.6. Campos Hidden

Campos hidden importantes:
- `#id` - ID do funcionário (edição)
- `#funcao_id` - ID da função selecionada
- `#setor_id` - ID do setor selecionado
- `#bairro` - ID do bairro selecionado
- `#cidade_id` - ID da cidade selecionada
- `#empresa_id` - ID da empresa
- `#endereco_id` - ID do endereço
- `#supervisor` - Flag de supervisor (switcher)
- `#desativado` - Flag de desativado (switcher)

### 2.7. Switchers

Dois campos usam switcher (checkbox estilizado):

1. **Supervisor** (`#switcher_supervisor`)
   - Quando ativado, habilita campo `#numero_cartao_supervisor`
   - Hidden: `#supervisor`

2. **Desativado** (`#switcher_desativado`)
   - Hidden: `#desativado`

---

## 3. Fluxos Identificados

### 3.1. Fluxo de Listagem

1. Acessar via menu: Configurações > Funcionários
2. Tela exibe tabela com funcionários
3. Clicar no ícone de pesquisa (toggle) para abrir/fechar formulário
4. Preencher filtros (Código ou Nome)
5. Clicar em "Pesquisar"
6. Tabela é atualizada com resultados

### 3.2. Fluxo de Cadastro

1. Na listagem, clicar em "Novo Cadastro" (`#btn-novo`)
2. Preencher campos obrigatórios:
   - Nome (`#nome`)
   - Função (`#auto_funcao_id` - selecionar do autocomplete)
3. Preencher campos opcionais conforme necessário
4. Clicar em "Salvar" (`#btn-salvar`)
5. Sistema valida e exibe mensagem de sucesso/erro

### 3.3. Fluxo de Edição

1. Na listagem, clicar em qualquer elemento da linha (código, nome, etc.)
2. URL muda para `/cadastro/funcionario/{id}/editar`
3. Formulário é preenchido com dados existentes
4. Editar campos desejados
5. Clicar em "Salvar"
6. Sistema valida e exibe mensagem de sucesso/erro

### 3.4. Fluxo de Exclusão

1. Na listagem, selecionar checkbox(es) de funcionário(s)
2. Clicar em "Excluir Selecionados" (`#btn-excluir-selecionados`)
3. Sistema exibe modal de confirmação
4. Confirmar exclusão
5. Sistema remove registros e atualiza tabela

---

## 4. Validações Observadas

### 4.1. Campos Obrigatórios

- **Nome:** Obrigatório (marcado com *)
- **Função:** Obrigatório (marcado com *)

### 4.2. Mensagens de Sucesso/Erro

- Mensagens aparecem via SweetAlert ou toast
- Padrão: `.sweet-alert` para modais
- Toast: `.toast-success`, `.toast-error`

---

## 5. Diferenças com Implementação de Referência (Empresa)

### 5.1. Semelhanças
- Estrutura de listagem similar (tabela, checkboxes, botões)
- Formulário de pesquisa com toggle
- Abas no cadastro (Dados Cadastrais + outras)
- Autocompletes para localização (Bairro, Cidade)

### 5.2. Diferenças
- Funcionário tem apenas 2 abas (vs 8 abas em Empresa)
- Campos específicos: Função, Setor, Supervisor, Comissão, Desconto
- Não possui campos de CNPJ/Razão Social (é pessoa física)
- Possui campos de CPF/RG
- Possui switchers (Supervisor, Desativado)

---

## 6. Locators Principais - Resumo

### Listagem
```javascript
// Botões
btnNovo: '#btn-novo'
btnExcluirSelecionados: '#btn-excluir-selecionados'
btnPesquisaToggle: 'a[href="#"]' // Próximo ao título

// Formulário de pesquisa
formPesquisa: 'form.form-horizontal'
inputCodigo: '#id'
inputNome: '#nome'
btnPesquisar: '#pesquisar'

// Tabela
tabelaEmpresas: 'table.table-hover'
linhasTabela: 'table.table-hover tbody tr'
checkboxSelecionarTodos: 'input.check_all[name="simplecheck[]"]'
checkboxItens: 'input[name="simplecheck[]"]:not(.check_all)'
linksEdicao: 'a[href*="/editar"]'
```

### Cadastro
```javascript
// Botões
btnSalvar: '#btn-salvar'
btnVoltar: '#btn-voltar'
btnNovo: '#btn-novo'

// Abas
containerTabs: '[role="tablist"]'
abaDadosCadastrais: '[role="tab"]:contains("Dados Cadastrais")'
abaUsuario: '[role="tab"]:contains("Usuário")'

// Campos obrigatórios
inputNome: '#nome'
inputFuncao: '#auto_funcao_id'
hiddenFuncaoId: '#funcao_id'

// Campos opcionais principais
inputSetor: '#auto_setor_id'
inputCpf: '#cpf'
inputRg: '#rg'
inputDataAdmissao: '#data_admissao'
inputDataDemissao: '#data_demissao'
inputCep: '#cep'
inputEndereco: '#endereco'
inputNumero: '#numero'
inputComplemento: '#complemento'
inputBairro: '#auto_bairro'
inputCidade: '#auto_cidade_id'
inputDesconto: '#desconto_percentual'
inputComissao: '#comissao'
switcherSupervisor: '#switcher_supervisor'
inputNumeroCartaoSupervisor: '#numero_cartao_supervisor'
textareaObservacao: '#observacao'
switcherDesativado: '#switcher_desativado'

// Autocompletes
funcaoAutocomplete: '#auto_funcao_id'
funcaoLista: '#div_auto_funcao_id .typeahead-list li a'
setorAutocomplete: '#auto_setor_id'
setorLista: '#div_auto_setor_id .typeahead-list li a'
bairroAutocomplete: '#auto_bairro'
bairroLista: '#div_auto_bairro .typeahead-list li a'
cidadeAutocomplete: '#auto_cidade_id'
cidadeLista: '#div_auto_cidade_id .typeahead-list li a'
```

---

## 7. Observações Importantes

1. **Formulário de Pesquisa:** É um toggle - verificar se está visível antes de clicar
2. **Autocompletes:** Todos seguem padrão typeahead com container `#div_auto_{campo}`
3. **Switchers:** Usar `#switcher_{campo}` para interação, não o hidden
4. **Links de Edição:** Todos os elementos da linha são clicáveis e levam à edição
5. **Campos Obrigatórios:** Apenas Nome e Função são obrigatórios
6. **Abas:** Apenas 2 abas (Dados Cadastrais e Usuário) - muito mais simples que Empresa

---

## 8. Próximos Passos

Com essas descobertas, podemos:
1. Criar os Locators files
2. Criar os Page Objects
3. Criar os Specs de teste
4. Criar a factory para dados aleatórios

