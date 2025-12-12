# Arquitetura dos casos de teste: Gestor de Preços

## Objetivo

Validar o fluxo completo do módulo **Gestor de Preços**, cobrindo:
- Visualização e navegação na listagem de preços
- Ordenação de dados na tabela
- Cadastro completo de novos reajustes de preço com validações
- Aplicação automática de reajuste aos produtos que atendem aos filtros
- Visualização da tabela de itens afetados após salvar

**Funcionalidades cobertas:**
- Listagem de preços com tabela de dados
- Ordenação por colunas (Código, Data do Lançamento)
- Acesso ao formulário de novo cadastro
- Cadastro de reajuste com filtros de produtos (Tipo, Produto, Grupo, Fabricante, Fornecedor)
- Configuração de reajuste (Tabela de Preço, Operação, Reajuste %)
- Validação de sucesso após cadastro
- Exibição da tabela de itens afetados após salvar

**Cenários principais:**
- Exibição correta da listagem
- Ordenação crescente e decrescente
- Cadastro completo com dados dinâmicos (Faker)
- Cadastro com diferentes tipos de filtro (TODOS, NOTAS DE ENTRADA)
- Cadastro com diferentes operações (AJUSTAR PREÇO, FORMAR PREÇO)
- Navegação entre listagem e formulário
- Fluxo completo: cadastro → validação → tabela de itens afetados

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/produtos/gestor-precos-listagem.spec.js` - Testes de listagem de preços
- `cypress/e2e/produtos/gestor-precos.spec.js` - Testes de cadastro de reajuste de preço

### Page Objects
- `cypress/support/pages/Precos/PrecosListagemPage.js` - Métodos para interação com a listagem
- `cypress/support/pages/Precos/PrecosCadastroPage.js` - Métodos para preenchimento e validação do formulário

### Locators
- `cypress/support/locators/Precos/PrecosListagemLocators.js` - Seletores da página de listagem
- `cypress/support/locators/Precos/PrecosCadastroLocators.js` - Seletores do formulário de cadastro

---

## Imports e dependências

### Page Objects
```javascript
import PrecosListagemPage from '../../support/pages/Precos/PrecosListagemPage';
import PrecosCadastroPage from '../../support/pages/Precos/PrecosCadastroPage';
```

### Locators
Os locators são importados internamente pelos Page Objects:
- `PrecosListagemLocators` - usado em `PrecosListagemPage`
- `PrecosCadastroLocators` - usado em `PrecosCadastroPage`

### Commands
- `cy.loginArmazenandoSessao()` - Login persistente para funcionalidades não-fiscais (ADR-0004)
- `MenulateralProdutoPage.acessarListagemGestorPrecos()` - Navegação via menu lateral

### Dados Dinâmicos
- `@faker-js/faker` - Geração de valores de reajuste aleatórios (ADR-0009)

---

## Estrutura do teste

### Suite: Gestor de Preços - Listagem

**Tags:** `['@produtos', '@precos', '@regressivo']` (ADR-0010)

#### `it('Deve exibir a listagem de preços')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem via `PrecosListagemPage.acessarListagem()`
   - Valida título "Listagem"

2. **Validação:**
   - Valida que a tabela está visível
   - Valida que todas as colunas estão presentes (Código, Data do Lançamento, Tipo, Operação, Tabela de Preço)

#### `it('Deve permitir ordenar por código (crescente)')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem

2. **Ação:**
   - Clica no link de ordenação crescente por código

3. **Validação:**
   - Valida que a tabela contém dados após ordenação

#### `it('Deve permitir ordenar por código (decrescente)')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem

2. **Ação:**
   - Clica no link de ordenação decrescente por código

3. **Validação:**
   - Valida que a tabela contém dados após ordenação

#### `it('Deve permitir ordenar por data (crescente)')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem

2. **Ação:**
   - Clica no link de ordenação crescente por data

3. **Validação:**
   - Valida que a tabela contém dados após ordenação

#### `it('Deve permitir ordenar por data (decrescente)')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem

2. **Ação:**
   - Clica no link de ordenação decrescente por data

3. **Validação:**
   - Valida que a tabela contém dados após ordenação

#### `it('Deve permitir acessar novo cadastro')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem

2. **Ação:**
   - Clica no botão "Novo Cadastro" (`#btn-novo`)

3. **Validação:**
   - Valida redirecionamento para `/produto/gestor-preco/novo`
   - Valida que o formulário está visível

### Suite: Gestor de Preços - Cadastro

**Tags:** `['@produtos', '@precos', '@regressivo']` (ADR-0010)

#### `it('Deve exibir formulário de novo cadastro')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa formulário diretamente via `PrecosCadastroPage.visit()`

2. **Validação:**
   - Valida título "Gestor de Preços"
   - Valida seção "Filtro de Produtos"
   - Valida seção "Configurações"
   - Valida campos obrigatórios visíveis (Tipo, Operação, Reajuste %)
   - Valida botão "Lançar Reajuste" visível

#### `it('Deve cadastrar reajuste de preço com sucesso')`

**Fluxo completo:**
1. **Geração de Dados:**
   - Gera valor de reajuste aleatório usando Faker (ADR-0009)
   - Formato: número decimal com 2 casas (ex: "10,00")

2. **Acesso:**
   - Acessa formulário diretamente

3. **Preenchimento:**
   - Seleciona tipo "TODOS"
   - Seleciona operação "AJUSTAR PREÇO"
   - Preenche reajuste percentual

4. **Ação:**
   - Clica em "Lançar Reajuste"

5. **Validação:**
   - Valida toast de sucesso (se aparecer)
   - Valida redirecionamento para `/produto/gestor-preco/{id}/editar`
   - Valida título "Gestor de Preços"

#### `it('Deve permitir voltar para listagem')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa formulário diretamente

2. **Ação:**
   - Clica no botão "Voltar"

3. **Validação:**
   - Valida redirecionamento para `/produto/gestor-preco`
   - Valida que a tabela está visível

#### `it('Deve cadastrar reajuste com filtro de tipo NOTAS DE ENTRADA')`

**Fluxo completo:**
1. **Geração de Dados:**
   - Gera valor de reajuste aleatório

2. **Preenchimento:**
   - Seleciona tipo "NOTAS DE ENTRADA"
   - Seleciona operação "AJUSTAR PREÇO"
   - Preenche reajuste

3. **Ação e Validação:**
   - Lança reajuste e valida sucesso

#### `it('Deve cadastrar reajuste com operação FORMAR PREÇO')`

**Fluxo completo:**
1. **Geração de Dados:**
   - Gera valor de reajuste aleatório

2. **Preenchimento:**
   - Seleciona tipo "TODOS"
   - Seleciona operação "FORMAR PREÇO"
   - Preenche reajuste

3. **Ação e Validação:**
   - Lança reajuste e valida sucesso

#### `it('Deve exibir tabela de itens afetados após salvar')`

**Fluxo completo:**
1. **Geração de Dados:**
   - Gera valor de reajuste aleatório

2. **Cadastro:**
   - Preenche formulário completo
   - Lança reajuste
   - Valida sucesso

3. **Validação:**
   - Valida que a tabela de itens afetados está visível
   - Valida que a tabela contém pelo menos uma linha

#### `it('Deve cadastrar reajuste completo com filtros opcionais')`

**Fluxo completo:**
1. **Geração de Dados:**
   - Gera valor de reajuste aleatório

2. **Preenchimento:**
   - Seleciona tipo "TODOS"
   - Seleciona produto (autocomplete)
   - Seleciona tabela de preço
   - Seleciona operação "AJUSTAR PREÇO"
   - Preenche reajuste

3. **Ação e Validação:**
   - Lança reajuste e valida sucesso

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002): Separação de lógica de interação em classes dedicadas
- ✅ **Separate Locators** (ADR-0003): Locators centralizados em arquivos separados
- ✅ **Session Persistence** (ADR-0004): Uso de `cy.loginArmazenandoSessao()` para login persistente
- ✅ **Faker for Dynamic Data** (ADR-0009): Geração de valores de reajuste aleatórios para evitar duplicatas
- ✅ **Tags for Filtering** (ADR-0010): Tags aplicadas para filtro de execução (`@produtos`, `@precos`, `@regressivo`)
- ✅ **Code Simplification** (ADR-0013): Nenhum wait fixo - todas as esperas são condicionais
- ✅ **Prioritize IDs** (ADR-0015): Locators priorizam IDs quando disponíveis

### Boas Práticas
- Uso de métodos encadeáveis nos Page Objects (retorno de `this`)
- Validações explícitas após cada ação importante
- Aguardar carregamento da tabela antes de interações
- Formatação correta de valores decimais (vírgula como separador)
- Tratamento de autocompletes com validação de campos hidden

### Observações
- O campo `#reajuste` é um campo numérico decimal com formatação brasileira (vírgula)
- Após salvar com sucesso, o sistema redireciona para a tela de edição (`/produto/gestor-preco/{id}/editar`)
- A tabela de itens afetados aparece automaticamente após salvar e pode ter centenas ou milhares de linhas
- Os campos de autocomplete seguem o padrão: campo visível `#auto_{campo}_id` e campo hidden `#{campo}_id`
- Não há funcionalidade de ativação/desativação (diferente do Gestor de Promoções)
- Não há seção de produtos para adicionar manualmente - o reajuste é aplicado automaticamente aos produtos que atendem aos filtros
- A tabela usa ID dinâmico, portanto o seletor usa classe `table.table-hover.table-gestor-preco`
- Não há waits fixos no código - todas as esperas são condicionais (ADR-0013)

---

## Diferenças com Gestor de Promoções

### Estrutura
- **Gestor de Preços**: Não tem seção de produtos para adicionar manualmente. O reajuste é aplicado automaticamente aos produtos que atendem aos filtros.
- **Gestor de Promoções**: Tem seção de produtos onde você adiciona produtos manualmente à promoção.

### Ativação/Desativação
- **Gestor de Preços**: ❌ NÃO possui funcionalidade de ativação/desativação
- **Gestor de Promoções**: ✅ Possui funcionalidade de ativação/desativação

### Botão de Salvar
- **Gestor de Preços**: Usa botão "Lançar Reajuste" (`#aplicar-reajuste`)
- **Gestor de Promoções**: Usa botão "Salvar" (`#btn-salvar`)

### Campos
- **Gestor de Preços**: 
  - Filtros: Tipo, Produto, Grupo, Fabricante, Fornecedor
  - Configurações: Tabela de Preço, Operação, Reajuste %
- **Gestor de Promoções**: 
  - Dados Principais: Descrição, Período, Dias da semana, Horários
  - Produtos: Seção para adicionar produtos manualmente

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0009](../adr/0009-use-faker-for-dynamic-test-data.md): Faker for Dynamic Data
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0013](../adr/0013-continuous-validation-checklist.md): Continuous Validation Checklist (Code Simplification)
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Documentação Relacionada
- [Processo de Documentação](../referencias/processo-documentacao.md)
- [Guia de Decisões Rápidas](../referencias/guia-decisoes-rapidas.md)

