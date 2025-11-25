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
   ├── CadastroNfeNormalPage.js          # Inherits from Base, Normal-specific methods
   ├── CadastroNfeDevolucaoPage.js        # Inherits from Base, Devolução-specific methods
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
  - Variants share complex workflows
  - Maintenance of common code is difficult

- **Hierarchy should NOT be used when:**
  - Only 1-2 variants exist
  - Variants are very different
  - Common methods are minimal
  - Hierarchy adds more complexity than value

- **Best practices observed:**
  - Base class contains only truly common methods
  - Specific classes contain only variant-specific methods
  - Maximum 2 levels of inheritance
  - Clear naming convention (BasePage, SpecificPage)
  - Document what goes in base vs specific

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

// CadastroNfeNormalPage.js - Only specific methods
class CadastroNfeNormalPage extends CadastroNfeBasePage {
  avancarParaCadastroNormalVenda() { /* specific */ }
  pesquisarVenda() { /* specific */ }
  // Inherits all base methods automatically
}

// CadastroNfeDevolucaoPage.js - Only specific methods
class CadastroNfeDevolucaoPage extends CadastroNfeBasePage {
  avancarParaCadastroDevolucaoCompra() { /* specific */ }
  pesquisarDevolucaoCompra() { /* specific */ }
  // Inherits all base methods automatically
}
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

### Related ADRs

- ADR-0002: Use Page Object Pattern (hierarchy extends this pattern)
- ADR-0003: Separate Locators from Page Objects (locators used by both base and specific classes)
- ADR-0007: Separate Specs by Functionality and Type (hierarchy complements spec separation)

