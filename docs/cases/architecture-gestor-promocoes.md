# Arquitetura dos casos de teste: Gestor de Promoções

## Objetivo

Validar o fluxo completo do módulo **Gestor de Promoções**, cobrindo:
- Visualização e navegação na listagem de promoções
- Ordenação de dados na tabela
- Cadastro completo de novas promoções com validações

**Funcionalidades cobertas:**
- Listagem de promoções com tabela de dados
- Ordenação por colunas (Código, Descrição)
- Acesso ao formulário de novo cadastro
- Cadastro de promoção com todos os campos obrigatórios
- Seleção de dias da semana e horários
- Validação de sucesso após cadastro

**Cenários principais:**
- Exibição correta da listagem
- Ordenação crescente e decrescente
- Cadastro completo com dados dinâmicos (Faker)
- Cadastro com diferentes combinações de dias da semana
- Navegação entre listagem e formulário

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/produtos/gestor-promocoes.spec.js` - Testes de listagem e cadastro de promoções

### Page Objects
- `cypress/support/pages/Promocoes/PromocoesListagemPage.js` - Métodos para interação com a listagem
- `cypress/support/pages/Promocoes/PromocoesCadastroPage.js` - Métodos para preenchimento e validação do formulário

### Locators
- `cypress/support/locators/Promocoes/PromocoesListagemLocators.js` - Seletores da página de listagem
- `cypress/support/locators/Promocoes/PromocoesCadastroLocators.js` - Seletores do formulário de cadastro

---

## Imports e dependências

### Page Objects
```javascript
import PromocoesListagemPage from '../../support/pages/Promocoes/PromocoesListagemPage';
import PromocoesCadastroPage from '../../support/pages/Promocoes/PromocoesCadastroPage';
```

### Locators
Os locators são importados internamente pelos Page Objects:
- `PromocoesListagemLocators` - usado em `PromocoesListagemPage`
- `PromocoesCadastroLocators` - usado em `PromocoesCadastroPage`

### Commands
- `cy.loginArmazenandoSessao()` - Login persistente para funcionalidades não-fiscais (ADR-0004)
- `MenulateralProdutoPage.acessarListagemGestorPromocoes()` - Navegação via menu lateral

### Dados Dinâmicos
- `@faker-js/faker` - Geração de descrições aleatórias (ADR-0009)
- Função `gerarDataFutura()` - Geração de datas futuras formatadas para o date range picker

---

## Estrutura do teste

### Suite: Gestor de Promoções

**Tags:** `['@produtos', '@promocoes', '@regressivo']` (ADR-0010)

#### `it('Deve exibir a listagem de promoções')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem via `PromocoesListagemPage.acessarListagem()`
   - Valida título "Listagem de Promoções"

2. **Validação:**
   - Valida que a tabela está visível
   - Valida que todas as colunas estão presentes (Código, Descrição, Data inicio, Data Fim, Status)

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

#### `it('Deve permitir ordenar por descrição (crescente)')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem

2. **Ação:**
   - Clica no link de ordenação crescente por descrição

3. **Validação:**
   - Valida que a tabela contém dados após ordenação

#### `it('Deve permitir acessar novo cadastro')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem

2. **Ação:**
   - Clica no botão "Novo Cadastro" (`#btn-novo`)

3. **Validação:**
   - Valida redirecionamento para `/produto/promocoes/novo`
   - Valida que o formulário está visível

#### `it('Deve exibir formulário de novo cadastro')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem e clica em "Novo Cadastro"

2. **Validação:**
   - Valida título "Gestor de Promoções"
   - Valida seção "Dados Principais"
   - Valida campos obrigatórios visíveis (Descrição, Período)
   - Valida botão Salvar visível

#### `it('Deve cadastrar promoção com sucesso')`

**Fluxo completo:**
1. **Geração de Dados:**
   - Gera descrição aleatória usando Faker (ADR-0009)
   - Gera datas futuras (1 dia e 60 dias a partir de hoje)
   - Define dias da semana (segunda a sexta)
   - Define horários (08:00 - 20:00)

2. **Acesso:**
   - Acessa listagem e clica em "Novo Cadastro"

3. **Preenchimento:**
   - Preenche descrição
   - Preenche período usando date range picker
   - Seleciona dias da semana (checkboxes)
   - Preenche horários de início e fim

4. **Ação:**
   - Clica em "Salvar"

5. **Validação:**
   - Valida toast de sucesso: "Você adicionou um(a) Promocao!"
   - Valida redirecionamento para `/produto/promocoes/{id}/editar`
   - Valida título com número da promoção

#### `it('Deve permitir voltar para listagem')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem e clica em "Novo Cadastro"

2. **Ação:**
   - Clica no botão "Voltar"

3. **Validação:**
   - Valida redirecionamento para `/produto/promocoes`
   - Valida que a tabela está visível

#### `it('Deve cadastrar promoção com todos os dias da semana')`

**Fluxo completo:**
1. **Geração de Dados:**
   - Gera descrição aleatória
   - Gera datas futuras (1 dia e 90 dias)
   - Define todos os dias da semana
   - Define horários completos (00:00 - 23:59)

2. **Preenchimento e Validação:**
   - Similar ao teste anterior, mas com todos os dias selecionados

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002): Separação de lógica de interação em classes dedicadas
- ✅ **Separate Locators** (ADR-0003): Locators centralizados em arquivos separados
- ✅ **Session Persistence** (ADR-0004): Uso de `cy.loginArmazenandoSessao()` para login persistente
- ✅ **Faker for Dynamic Data** (ADR-0009): Geração de descrições aleatórias para evitar duplicatas
- ✅ **Tags for Filtering** (ADR-0010): Tags aplicadas para filtro de execução (`@produtos`, `@promocoes`, `@regressivo`)

### Boas Práticas
- Uso de métodos encadeáveis nos Page Objects (retorno de `this`)
- Validações explícitas após cada ação importante
- Aguardar carregamento da tabela antes de interações
- Formatação correta de datas para o date range picker
- Seleção e deseleção de checkboxes de forma explícita

### Observações
- O campo `#periodo` é um **date range picker** complexo com dois calendários e seletores de hora/minuto/segundo
- Formato esperado: `DD/MM/YYYY HH:mm:ss - DD/MM/YYYY HH:mm:ss`
- Após salvar com sucesso, o sistema redireciona para a tela de edição (`/produto/promocoes/{id}/editar`)
- O botão "Empresas Participantes" fica desabilitado inicialmente e só é habilitado após salvar
- A seção "Produtos" aparece após salvar, mas não é testada nesta fase
- A tabela usa ID dinâmico, portanto o seletor usa classe `table.table-hover`

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0009](../adr/0009-use-faker-for-dynamic-test-data.md): Faker for Dynamic Data
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering

### Documentação Relacionada
- [Processo de Documentação](../referencias/processo-documentacao.md)
- [Guia de Decisões Rápidas](../referencias/guia-decisoes-rapidas.md)

