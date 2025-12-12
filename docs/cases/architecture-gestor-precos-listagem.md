# Arquitetura dos casos de teste: Gestor de Preços - Listagem

## Objetivo

Validar o fluxo de **listagem de preços** no módulo Gestor de Preços, cobrindo:
- Visualização da tabela de preços
- Validação de colunas
- Ordenação de dados
- Navegação para novo cadastro

**Funcionalidades cobertas:**
- Exibição da listagem de preços
- Validação de todas as colunas da tabela
- Validação de presença de dados na tabela
- Acesso ao formulário de novo cadastro

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/produtos/gestor-precos-listagem.spec.js` - Testes de listagem de preços

### Page Objects
- `cypress/support/pages/Precos/PrecosListagemPage.js` - Métodos para interação com a listagem

### Locators
- `cypress/support/locators/Precos/PrecosListagemLocators.js` - Seletores da página de listagem

---

## Imports e dependências

### Page Objects
```javascript
import PrecosListagemPage from '../../support/pages/Precos/PrecosListagemPage';
import PrecosCadastroPage from '../../support/pages/Precos/PrecosCadastroPage';
```

### Commands
- `cy.loginArmazenandoSessao()` - Login persistente para funcionalidades não-fiscais (ADR-0004)
- `MenulateralProdutoPage.acessarListagemGestorPrecos()` - Navegação via menu lateral

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

#### `it('Deve validar que a tabela contém dados')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem

2. **Validação:**
   - Valida que a tabela contém pelo menos uma linha

#### `it('Deve permitir acessar novo cadastro')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem

2. **Ação:**
   - Clica no botão "Novo Cadastro" (`#btn-novo`)

3. **Validação:**
   - Valida redirecionamento para `/produto/gestor-preco/novo`
   - Valida que o formulário está visível

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002): Separação de lógica de interação em classes dedicadas
- ✅ **Separate Locators** (ADR-0003): Locators centralizados em arquivos separados
- ✅ **Session Persistence** (ADR-0004): Uso de `cy.loginArmazenandoSessao()` para login persistente
- ✅ **Tags for Filtering** (ADR-0010): Tags aplicadas para filtro de execução (`@produtos`, `@precos`, `@regressivo`)
- ✅ **Code Simplification** (ADR-0013): Nenhum wait fixo - todas as esperas são condicionais
- ✅ **Prioritize IDs** (ADR-0015): Locators priorizam IDs quando disponíveis

### Boas Práticas
- Uso de métodos encadeáveis nos Page Objects (retorno de `this`)
- Validações explícitas após cada ação importante
- Aguardar carregamento da tabela antes de interações
- Validação de presença de dados após ordenação

### Observações
- A tabela usa ID dinâmico, portanto o seletor usa classe `table.table-hover.table-gestor-preco`
- O título da página é simplesmente "Listagem" (sem "de Preços")
- As colunas da tabela são: Código, Data do Lançamento, Tipo, Operação, Tabela de Preço
- Não há waits fixos no código - todas as esperas são condicionais (ADR-0013)

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0013](../adr/0013-continuous-validation-checklist.md): Continuous Validation Checklist (Code Simplification)
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Documentação Relacionada
- [Processo de Documentação](../referencias/processo-documentacao.md)
- [Guia de Decisões Rápidas](../referencias/guia-decisoes-rapidas.md)

