# Arquitetura dos casos de teste: Venda com NFCe

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Venda com NFCe**, que valida o processo completo de realização de uma venda e emissão de Nota Fiscal de Consumidor Eletrônica (NFCe).

**Funcionalidades cobertas:**
- Realização de venda completa
- Seleção de cliente alternativo
- Informação de vendedor
- Adição de produto
- Adição de pagamento
- Geração de NFCe
- Confirmação de emissão de NFCe

**Cenários principais:**
- Realizar venda com sucesso e gerar NFCe

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/venda-nfcenfe/venda-nfce.spec.js` - Teste de venda com NFCe

### Page Objects
- `cypress/support/pages/Venda/VendaPage.js` - Métodos para venda

### Locators
- `cypress/support/locators/Venda/CadastroVendaLocators.js` - Seletores do cadastro de venda

---

## Imports e dependências

### Page Objects
```javascript
import VendaPage from '../../support/pages/Venda/VendaPage';
```

### Commands
- `cy.login()` - Login com usuário fiscal (ADR-0004 - funcionalidade fiscal)
- `cy.visit('/')` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Realizar venda

**Tags:** `['@venda-nfce', '@vendas', '@regressivo']` (ADR-0010)

#### `it('Realizar venda com sucesso')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa página de venda via `VendaPage.acessarPaginaVenda()` (`/vendas/novo`)
   - Valida formulário principal visível
   - Seleção de empresa padrão comentada

2. **Seleção de Cliente:**
   - Seleciona cliente alternativo (não "CONSUMIDOR" e diferente do atual)
   - Valida que cliente foi alterado

3. **Informação de Vendedor:**
   - Captura snapshot com Percy
   - Seleciona vendedor via autocomplete
   - Valida que vendedor foi selecionado

4. **Adição de Produto:**
   - Adiciona produto via autocomplete
   - Seleciona primeira opção disponível

5. **Adição de Pagamento:**
   - Clica em "Gerar Pagamento"
   - Seleciona forma de pagamento via autocomplete
   - Salva pagamento

6. **Geração de NFCe:**
   - Aguarda 6 segundos
   - Clica em botão de escolha (SweetAlert)
   - Clica em "Gerar Nota Fiscal Consumidor" (segunda opção)

7. **Confirmação de Emissão:**
   - Valida que elemento contém "Nota Fiscal Consumidor" está visível
   - Clica no elemento
   - Validações de URL e status comentadas

---

## Padrões e boas práticas

### Login Fiscal
- Uso de `cy.login()` para funcionalidades fiscais (ADR-0004)
- Diferente de outras funcionalidades que usam `cy.loginArmazenandoSessao()`

### Seleção de Cliente Alternativo
- Lógica para evitar "CONSUMIDOR"
- Validação de mudança de cliente
- Fallback para primeiro cliente se não houver alternativo

### Captura de Snapshot
- Uso de `cy.percySnapshot()` para testes visuais
- Captura antes de selecionar vendedor

### Waits Explícitos
- Uso de `cy.wait(6000)` antes de gerar NFCe
- Necessário para processamento

### Validação de Emissão
- Validação de elemento contendo "Nota Fiscal Consumidor"
- Timeout de 15 segundos
- Validações adicionais comentadas (URL, status)

### Tags aplicadas
- `@venda-nfce` - Identifica funcionalidade específica
- `@vendas` - Identifica módulo
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### VendaPage

**Navegação:**
- `acessarPaginaVenda()` - Acessa página de venda (`/vendas/novo`) e valida formulário

**Seleção:**
- `selecionarEmpresaPadrao()` - Seleciona empresa padrão (comentado no teste)
- `selecionarClienteAlternativo()` - Seleciona cliente alternativo (não CONSUMIDOR)
- `informarVendedor()` - Seleciona vendedor via autocomplete

**Adição:**
- `adicionarObservacao()` - Adiciona observação (não usado no teste atual)
- `adicionarProduto()` - Adiciona produto via autocomplete
- `adicionarPagamento()` - Adiciona pagamento e seleciona forma de pagamento
- `salvarPagamento()` - Salva pagamento no modal

**Geração de Notas:**
- `gerarNFCe()` - Gera NFCe:
  - Aguarda 6 segundos
  - Clica em botão de escolha
  - Clica em "Gerar Nota Fiscal Consumidor" (segunda opção)

- `gerarNFe()` - Gera NFe (não usado neste teste)

**Confirmações:**
- `confirmacaoEmissaoNFCe()` - Valida confirmação de emissão de NFCe:
  - Valida elemento contendo "Nota Fiscal Consumidor" visível
  - Clica no elemento
  - Validações de URL e status comentadas

- `confirmacaoEmissaoNFe()` - Valida confirmação de emissão de NFe (não usado)

---

## Locators utilizados

### CadastroVendaLocators

**Formulário:**
- `formPrincipal` - Formulário principal

**Cliente:**
- `btnClienteAutocomplete` - Botão autocomplete cliente
- `listaClienteSugestoes` - Lista de sugestões de cliente
- `hiddenClienteId` - Campo hidden com ID do cliente

**Vendedor:**
- `btnVendedorAutocomplete` - Botão autocomplete vendedor
- `listaVendedorSugestoes` - Lista de sugestões de vendedor
- `hiddenVendedorId` - Campo hidden com ID do vendedor

**Produto:**
- `#auto_icon_produto_empresa_grade_id_` - Ícone autocomplete produto

**Pagamento:**
- `#btn-gerar-pagamento` - Botão gerar pagamento
- `#auto_icon_forma_pagamento_id` - Autocomplete forma de pagamento

**NFCe:**
- `//a[contains(@class,'btn-choice btn btn-primary')]` - Botão de escolha (XPath)
- `(//a[contains(@id,'gerar-nota-fiscal-consumidor')])[2]` - Botão gerar NFCe (XPath, segunda opção)

---

## Diferenças entre NFe e NFCe

### NFe
- Geração via `gerarNFe()`
- Tratamento de alerta de confirmação
- Validação de SweetAlert com mensagens específicas

### NFCe
- Geração via `gerarNFCe()`
- Seleção de segunda opção de "Gerar Nota Fiscal Consumidor"
- Validação de elemento contendo "Nota Fiscal Consumidor"
- Validações adicionais comentadas

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.login()` usado para funcionalidade fiscal
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-venda-nfe.md` - Documentação de venda com NFe
- `docs/adr/` - Architecture Decision Records

---

## Observações

- Uso de `cy.login()` para funcionalidade fiscal (NFCe)
- Seleção inteligente de cliente alternativo
- Validação simplificada de emissão (validações adicionais comentadas)
- Waits explícitos para processamento
- Captura de snapshot para testes visuais
- Uso de XPath para seletores específicos de NFCe

---

## Fluxo de Venda com NFCe

```
Acessar página de venda
    ↓
Selecionar cliente alternativo
    ↓
Informar vendedor
    ↓
Adicionar produto
    ↓
Adicionar pagamento
    ↓
Gerar NFCe
    ↓
Validar confirmação de emissão
```

---

**Última atualização:** 2024-12-19

