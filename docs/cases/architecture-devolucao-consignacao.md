# Arquitetura de Testes - Devolução/Venda de Consignação

## Objetivo

Implementar testes automatizados para o módulo Devolução/Venda de Consignação, cobrindo:
- Listagem de devoluções/vendas de consignação
- Cadastro de devolução/venda de consignação
- Adição de produtos à devolução/venda (tela de edição)

## Estrutura de Arquivos

```
cypress/
├── e2e/
│   └── consignacao/
│       ├── devolucao-consignacao-listagem.spec.js
│       └── devolucao-consignacao-cadastro.spec.js
├── support/
│   ├── locators/
│   │   └── Consignacao/
│   │       └── DevolucaoConsignacaoLocators.js
│   └── pages/
│       └── Consignacao/
│           └── DevolucaoConsignacaoPage.js
```

## Imports e Dependências

### Specs
- `DevolucaoConsignacaoPage`: Page Object para interações com a interface
- `DevolucaoConsignacaoLocators`: Locators centralizados
- `cy.loginArmazenandoSessao()`: Comando customizado para login (não é funcionalidade fiscal)
- `faker`: Para geração de dados dinâmicos (observações, quantidades)

### Page Object
- `DevolucaoConsignacaoLocators`: Locators centralizados

## Estrutura do Teste

### Listagem (`devolucao-consignacao-listagem.spec.js`)

**Suite**: `Listagem de Devoluções/Vendas de Consignação`
**Tags**: `['@consignacao', '@devolucao', '@listagem', '@regressivo']`

**Testes (`it`)**:
1. **Deve exibir a tabela de devoluções e permitir abrir o formulário de pesquisa**
   - Valida que a tabela está visível
   - Abre o formulário de pesquisa
   - Conta linhas visíveis

2. **Deve permitir navegar para novo cadastro**
   - Valida tabela visível
   - Clica em "Novo Cadastro"
   - Valida redirecionamento para `/consignacao/devolucao/novo`

3. **Deve aplicar filtros de pesquisa**
   - Valida tabela visível
   - Aplica filtros (período, cliente, vendedor)
   - Valida que a tabela permanece visível após filtros

4. **Deve selecionar e desmarcar todos os registros**
   - Seleciona todos os registros via checkbox
   - Valida que todos estão selecionados
   - Desmarca todos
   - Valida que nenhum está selecionado

### Cadastro (`devolucao-consignacao-cadastro.spec.js`)

**Suite**: `Cadastro de Devolução/Venda de Consignação`
**Tags**: `['@consignacao', '@devolucao', '@cadastro', '@regressivo']`

**Testes (`it`)**:
1. **Deve abrir a tela de cadastro de devolução/venda**
   - Valida URL `/consignacao/devolucao/novo`
   - Valida que campos principais estão visíveis (Cliente, Vendedor)

2. **Deve realizar o cadastro de uma devolução/venda com sucesso**
   - Preenche cliente (autocomplete)
   - Preenche observações (Faker)
   - Salva formulário
   - Valida mensagem de sucesso
   - Valida redirecionamento para tela de edição

3. **Deve adicionar um produto à devolução/venda após o cadastro**
   - Realiza cadastro completo
   - Adiciona produto com quantidades de devolução e venda (Faker)
   - Valida que o produto foi adicionado à tabela

## Padrões e Boas Práticas

### Locators
- **Priorização de IDs**: Sempre que disponível, usar IDs únicos (ex: `#btn-salvar`, `#auto_cliente_id`)
- **Contexto**: Usar contexto quando necessário (ex: buscar botão de pesquisa próximo ao título)
- **Seletores contextuais**: Para seção de produtos, usar `cy.contains('h5', 'Produtos').parent().next().within()`

### Page Object
- **Métodos descritivos**: Nomes claros como `preencherCliente()`, `validarTabelaVisivel()`
- **Validações condicionais**: Sempre usar `.should()` ao invés de `cy.wait()` fixos
- **Aguardar loading**: Sempre validar que `#loading` não existe após ações que podem carregar dados

### Testes
- **Dados dinâmicos**: Usar Faker para observações e quantidades
- **Dados fixos quando necessário**: Cliente e produto usam valores conhecidos do sistema
- **Validações robustas**: Validar URL, visibilidade de elementos e mensagens de sucesso

### Diferenças com Requisição de Consignação
- **Seção de Produtos**: 
  - Requisição: Campos "Quantidade" e "Preço"
  - Devolução/Venda: Campos "Devolução" e "Venda" (quantidades)
- **Formulário de Pesquisa**:
  - Requisição: Campo "Status"
  - Devolução/Venda: Campo "Período" (data)

## Referências

- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0006](../adr/0006-mandatory-documentation-for-new-tests.md): Mandatory Documentation
- [ADR-0007](../adr/0007-separate-specs-by-functionality-and-type.md): Separate Specs
- [ADR-0009](../adr/0009-use-faker-for-dynamic-test-data.md): Faker for Dynamic Data
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

