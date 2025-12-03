# ADR-0008: Use Page Object Hierarchy

## Status
Accepted

## Context

When a module has multiple variants or types that share common functionality, duplicating code across multiple Page Objects leads to several problems:

**Problems without hierarchy:**
- Code duplication for common methods
- Common methods repeated in multiple classes
- Difficulty maintaining consistency between variants
- Changes to common logic require updates in multiple places
- Large classes mixing common and specific methods
- Difficulty identifying what is common vs specific
- Maintenance overhead
- Risk of inconsistencies

**Previous situation:**
- Each variant had its own complete class
- Common methods duplicated
- Difficult maintenance
- Inconsistencies between variants

**Need:**
- Reuse of common methods
- Clear separation between common and specific
- Centralized maintenance
- Easier extensibility

## Decision

We will use Page Object hierarchy with a base class and specific classes that inherit from the base.

**Implementation in this project:**

1. **Hierarchy Structure:**
   ```
   cypress/support/pages/Venda/NFe/
   ├── CadastroNfeBasePage.js            # Base class with common methods
   ├── Normal/                            # Directory with Normal classes (hierarchical structure)
   │   ├── CadastroNfeNormalBasePage.js
   │   ├── CadastroNfeNormalAvulsaPage.js
   │   ├── CadastroNfeNormalVendaPage.js
   │   ├── CadastroNfeNormalNfcePage.js
   │   ├── CadastroNfeNormalMovimentacaoPage.js
   │   └── index.js                       # Facade pattern for backward compatibility
   ├── Devolucao/                         # Directory with Devolução classes (hierarchical structure)
   │   ├── CadastroNfeDevolucaoBasePage.js
   │   ├── CadastroNfeDevolucaoAvulsaPage.js
   │   ├── CadastroNfeDevolucaoCompraPage.js
   │   ├── CadastroNfeDevolucaoMovimentacaoPage.js
   │   ├── CadastroNfeDevolucaoNotaFiscalSaidaPage.js
   │   ├── CadastroNfeDevolucaoTrocasPage.js
   │   └── index.js                       # Facade pattern for backward compatibility
   ├── CadastroNfeAjustePage.js          # Inherits from Base, Ajuste-specific methods
   └── CadastroNfeComplementarPage.js    # Inherits from Base, Complementar-specific methods
   ```

2. **Base Class (`CadastroNfeBasePage`):**
   - Common methods for all NFe types:
     - `clicarBotaoContinuarRodape()`
     - `validarTelaSelecaoItens()`
     - `validarTelaPagamentos()`
     - `abrirModalNovoPagamento()`
     - `preencherModalPagamento()`
     - `adicionarItem()`
     - `emitirNota()`
     - `preencherNatureza()`
     - `preencherDestinatario()`

3. **Specific Classes (inherit from `CadastroNfeBasePage`):**
   - `CadastroNfeNormalPage`: specific methods for NFe Normal
     - `avancarParaCadastroNormalAvulsa()`
     - `avancarParaCadastroNormalVenda()`
     - `pesquisarVenda()`
     - `selecionarPrimeiraVenda()`
   - `CadastroNfeDevolucaoPage`: specific methods for NFe Devolução
     - `avancarParaCadastroDevolucaoAvulsa()`
     - `avancarParaCadastroDevolucaoCompra()`
     - `pesquisarDevolucaoCompra()`
   - Similar pattern for Ajuste and Complementar

4. **Usage in specs:**
   ```javascript
   import CadastroNfeNormalPage from '../../support/pages/Venda/NFe/CadastroNfeNormalPage';
   
   // Use base class methods (inherited)
   CadastroNfeNormalPage.validarTelaSelecaoItens();
   CadastroNfeNormalPage.adicionarItem();
   
   // Use specific methods
   CadastroNfeNormalPage.avancarParaCadastroNormalVenda();
   CadastroNfeNormalPage.pesquisarVenda();
   ```

## Consequences

### Positive

1. **Reusability:**
   - Common methods defined once
   - Avoids code duplication
   - Consistency between variants
   - Less code to maintain

2. **Maintenance:**
   - Changes to common logic in one place
   - Easy to identify common vs specific
   - Less risk of inconsistencies
   - Simpler maintenance

3. **Extensibility:**
   - Easy to add new variants
   - Inherits common methods automatically
   - Only specific methods need implementation
   - Organized growth

4. **Organization:**
   - Clear, predictable structure
   - Separation of concerns
   - Easy navigation
   - Better understanding

5. **Testability:**
   - Common methods tested once
   - Specific tests focused
   - Less duplicate tests
   - Better coverage

### Negative

1. **Complexity:**
   - Understanding inheritance needed
   - More files to manage
   - Dependency between classes
   - Learning curve

2. **Overhead:**
   - More classes to create
   - Decision on what is common vs specific
   - Refactoring when needed
   - Additional documentation

3. **Coupling:**
   - Specific classes depend on base
   - Changes in base can affect all classes
   - Requires care when modifying

### Risks

1. **Excessive Hierarchy:**
   - Too many inheritance levels
   - **Mitigation**: Maximum 2 levels (base + specific)
   - **Mitigation**: Code review

2. **Poorly Defined Common Methods:**
   - Specific logic in base
   - **Mitigation**: Careful review
   - **Mitigation**: Clear documentation

3. **Breaking Changes:**
   - Base changes breaking child classes
   - **Mitigation**: Comprehensive tests
   - **Mitigation**: Careful review

### Notes

- **Hierarchy should be used when:**
  - Module has 3+ variants with significant common functionality
  - Common methods represent >30% of total methods
  - Variants share complex workflows (e.g., items, payments, emission)
  - Maintenance of common code is difficult without hierarchy

- **Hierarchy should NOT be used when:**
  - Only 1-2 variants exist
  - Variants are very different
  - Common methods are minimal (<30% of total methods)
  - Hierarchy adds more complexity than value
  - Variants don't share significant workflows

- **Best practices observed:**
  - Base class contains only truly common methods (used by ALL variants)
  - Specific classes contain only variant-specific methods
  - Maximum 2 levels of inheritance (Base → Specific)
  - Clear naming convention (BasePage, SpecificPage)
  - Document what goes in base vs specific
  - Use Facade pattern (`index.js`) for backward compatibility when needed
  - Keep hierarchy shallow (avoid deep inheritance chains)

- **Current Implementation Status:**
  - ✅ **NFe module** - Fully implemented and compliant with ADR-0008
    - Structure: `CadastroNfeBasePage` → `CadastroNfeNormalBasePage` → Specific classes
    - Maximum 2 levels of inheritance
    - Facade pattern used for backward compatibility
    - Well-organized and maintainable
  - ⚠️ **Other modules** - Currently using flat structure (appropriate for their use cases)
    - Financeiro (Receitas/Despesas) - Potential candidate (optional, benefit medium)
    - Financeiro (Listagens) - Not recommended (benefit low, complexity medium)

- **Analysis and Patterns:**
  - See `docs/referencias/analise-page-objects-hierarquicos.md` for detailed analysis
  - Analysis identified 1 fully implemented hierarchy (NFe)
  - Analysis identified 2 optional opportunities (Financeiro modules)
  - Patterns documented and validated

### Example

**Before (without hierarchy):**
```javascript
// CadastroNfeNormalPage.js - ALL methods
class CadastroNfeNormalPage {
  validarTelaSelecaoItens() { /* duplicated code */ }
  adicionarItem() { /* duplicated code */ }
  emitirNota() { /* duplicated code */ }
  avancarParaCadastroNormalVenda() { /* specific */ }
  pesquisarVenda() { /* specific */ }
}

// CadastroNfeDevolucaoPage.js - SAME common methods duplicated
class CadastroNfeDevolucaoPage {
  validarTelaSelecaoItens() { /* duplicated code */ }
  adicionarItem() { /* duplicated code */ }
  emitirNota() { /* duplicated code */ }
  avancarParaCadastroDevolucaoCompra() { /* specific */ }
  pesquisarDevolucaoCompra() { /* specific */ }
}
```

**After (with hierarchy):**
```javascript
// CadastroNfeBasePage.js - Common methods
class CadastroNfeBasePage {
  validarTelaSelecaoItens() { /* common code */ }
  adicionarItem() { /* common code */ }
  emitirNota() { /* common code */ }
}

// Normal/CadastroNfeNormalBasePage.js - Common methods for all normal types
class CadastroNfeNormalBasePage extends CadastroNfeBasePage {
  selecionarPrimeiraLinhaDaListagem() { /* common to all normal types */ }
  prosseguirAposSelecao() { /* common to all normal types */ }
}

// Normal/CadastroNfeNormalVendaPage.js - Specific methods for venda type
class CadastroNfeNormalVendaPage extends CadastroNfeNormalBasePage {
  pesquisarVenda() { /* specific to venda */ }
  selecionarPrimeiraVenda() { /* specific to venda */ }
  // Inherits from CadastroNfeNormalBasePage and CadastroNfeBasePage
}

// Normal/index.js - Facade pattern for backward compatibility
class CadastroNfeNormalPage extends CadastroNfeNormalBasePage {
  // Delegates to specific classes (Venda, NFCe, Movimentacao, etc.)
}

// Devolucao/CadastroNfeDevolucaoBasePage.js - Common methods for all devolução types
class CadastroNfeDevolucaoBasePage extends CadastroNfeBasePage {
  adicionarNotaReferenciada() { /* common to all devolução types */ }
  finalizarEmissaoDevolucao() { /* common to all devolução types */ }
}

// Devolucao/CadastroNfeDevolucaoCompraPage.js - Specific methods for compra type
class CadastroNfeDevolucaoCompraPage extends CadastroNfeDevolucaoBasePage {
  pesquisarDevolucaoCompra() { /* specific to compra */ }
  selecionarPrimeiraDevolucaoCompra() { /* specific to compra */ }
  // Inherits from CadastroNfeDevolucaoBasePage and CadastroNfeBasePage
}

// Devolucao/index.js - Facade pattern for backward compatibility
class CadastroNfeDevolucaoPage extends CadastroNfeDevolucaoBasePage {
  // Delegates to specific classes (Compra, Movimentacao, etc.)
}

// Note: CadastroNfeDevolucaoPage was refactored into a hierarchy:
// - CadastroNfeDevolucaoBasePage (common devolução methods)
// - Multiple specific classes (Compra, Movimentacao, NotaFiscalSaida, etc.)
// - index.js facade for backward compatibility
```

### Implementation Details

**When to Use Hierarchy:**
- Module has 3+ variants with significant common functionality
- Common methods represent >30% of total methods
- Variants share complex workflows (e.g., items, payments, emission)
- Maintenance of common code is difficult without hierarchy

**Naming Convention:**
- Base class: `<Module>BasePage.js` (e.g., `CadastroNfeBasePage.js`)
- Specific classes: `<Module><Variant>Page.js` (e.g., `CadastroNfeNormalPage.js`)

**Structure:**
- Base class in same directory or parent directory
- Specific classes in subdirectory or same directory
- Clear import paths

**Method Organization:**
- Base: Only truly common methods (used by all variants)
- Specific: Only variant-specific methods
- Avoid: Methods used by only some variants (consider composition instead)

**Documentation:**
- Document what methods are in base vs specific
- Explain inheritance relationship
- Provide examples of usage

### Analysis and Validation

A comprehensive analysis of Page Objects was performed to validate hierarchy implementation and identify opportunities. The analysis covered ~60 Page Objects and confirmed:

- ✅ **NFe module** is fully compliant with ADR-0008
  - Well-structured hierarchy with maximum 2 levels
  - Clear separation of common vs specific methods
  - Facade pattern for backward compatibility
  - Proper naming conventions

- ⚠️ **Optional opportunities identified:**
  - Financeiro (Receitas/Despesas): 4 pages with ~7 common methods (>50% code common)
    - Benefit: Medium | Complexity: Low
    - Recommendation: Optional - consider if new types are added
  - Financeiro (Listagens): 3 pages with ~3-4 similar methods (~30% code common)
    - Benefit: Low | Complexity: Medium
    - Recommendation: Not recommended - maintain current structure

- **Modules that DON'T need hierarchy:**
  - Single-page modules (Login, Menu, Home, etc.)
  - Modules with only 2 variants (Cliente, Produto, Orçamento)
  - Modules with very different variants (Vínculo Fiscal, Relatórios)

**Reference:** See `docs/referencias/analise-page-objects-hierarquicos.md` for complete analysis, patterns, and recommendations.

### Related ADRs

- ADR-0002: Use Page Object Pattern (hierarchy extends this pattern)
- ADR-0003: Separate Locators from Page Objects (locators used by both base and specific classes)
- ADR-0007: Separate Specs by Functionality and Type (hierarchy complements spec separation)
- ADR-0013: Continuous Validation Checklist (validates hierarchy compliance)

