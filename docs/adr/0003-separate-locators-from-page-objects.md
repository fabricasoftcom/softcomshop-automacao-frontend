# ADR-0003: Separate Locators from Page Objects

## Status
Accepted

## Context

When implementing Page Object Pattern (see ADR-0002), there's a decision to make about where to store CSS/XPath selectors. Initially, selectors can be embedded directly in Page Object methods, but this approach has limitations:

**Problems with selectors in Page Objects:**
- CSS/XPath selectors are mixed with interaction logic in Page Object methods
- When DOM changes, Page Object methods need to be modified
- Selectors are duplicated across multiple Page Objects
- Difficult to identify which selectors are used where
- Page Objects become large and harder to maintain
- Hard to track all selectors for a given screen

**Previous situation:**
- Selectors hardcoded directly in Page Object methods
- Example: `cy.get('#btn-salvar').click()` directly in code
- DOM changes require modifying multiple methods
- No centralized place to update selectors

**Need:**
- Centralize selectors in dedicated files
- Make it easier to update when DOM changes
- Reduce coupling between Page Objects and DOM structure
- Improve organization and maintainability
- Enable easier identification of selector usage

## Decision

We will **separate CSS/XPath selectors from Page Objects**, keeping them in dedicated Locator files.

**Implementation in this project:**

1. **Locator File Structure:**
   - Locator files stored in `cypress/support/locators/`
   - Organized by module/functionality (e.g., `Venda/`, `Produtos/`, `Cliente/`)
   - Naming convention: `*Locators.js` (e.g., `CadastroNfeLocators.js`, `ProducaoLocators.js`)

2. **Locator Format:**
   - JavaScript objects with descriptive property names
   - Hierarchical structure when needed (nested objects)
   - Support for both CSS and XPath selectors
   - Export as default export

3. **Patterns Observed:**
   ```javascript
   const CadastroNfeLocators = {
     formulario: '#nfe-form',
     camposPrincipais: {
       finalidade: '#finalidade',
       naturezaAuto: '#auto_natureza',
     },
     destinatario: {
       painel: '#painel-destinatario',
       nome: '#auto_destinatario_nome',
     }
   };
   ```

4. **Usage in Page Objects:**
   - Import: `import CadastroNfeLocators from '../../../locators/Venda/CadastroNfeLocators';`
   - Usage: `cy.get(CadastroNfeLocators.formulario)`
   - Page Objects do not contain hardcoded selectors

## Consequences

### Positive

1. **Maintainability:**
   - When DOM changes, only Locator files need updating
   - Centralized updates reduce maintenance effort
   - Easy to identify all selectors for a given screen
   - Changes are isolated to specific files

2. **Reusability:**
   - Locators can be shared across multiple Page Objects
   - Reduces selector duplication
   - Easier to create related Page Objects

3. **Organization:**
   - Clear, hierarchical structure
   - Easy to navigate and locate selectors
   - Better separation of concerns
   - Reflects UI structure in code

4. **Testability:**
   - Locators can be tested in isolation
   - Easier to refactor selectors
   - Better separation of concerns

5. **Readability:**
   - Descriptive names improve understanding
   - Page Objects focus on logic, not selectors
   - Hierarchical structure reflects UI organization

### Negative

1. **Initial Overhead:**
   - Creating Locator files requires upfront time investment
   - May seem excessive for simple selectors
   - Additional files to maintain

2. **Additional Abstraction:**
   - Another layer between test and DOM
   - May make initial debugging harder
   - Requires navigating between files

3. **Maintenance Burden:**
   - Locators need to be kept in sync with DOM changes
   - Risk of creating unused or outdated locators
   - Need to synchronize with Page Objects

4. **Complexity:**
   - Hierarchical structure can add complexity
   - Many files can make navigation harder
   - Need to understand structure to find selectors

### Risks

1. **Stale Locators:**
   - Locators may become outdated if not maintained
   - **Mitigation**: Include locator validation in tests
   - **Mitigation**: Code review process should check locator updates

2. **Over-engineering:**
   - Risk of creating unnecessary abstractions
   - **Mitigation**: Create locators only when there's real reusability
   - **Mitigation**: Start simple and refactor when patterns emerge

3. **Duplication:**
   - Selectors may be duplicated across locators
   - **Mitigation**: Create shared locators when appropriate
   - **Mitigation**: Regular review to identify duplications

### Notes

- **Locators should contain:**
  - CSS selectors
  - XPath selectors (when needed)
  - Descriptive property names
  - Hierarchical organization when appropriate

- **Locators should NOT:**
  - Contain interaction logic
  - Contain wait logic
  - Contain validation logic
  - Depend on other locators

- **Best practices observed:**
  - Use descriptive names that reflect UI elements
  - Group related selectors in nested objects
  - Keep locators focused on a single screen/component
  - Use consistent naming conventions

### Example

**Before (without separation):**
```javascript
class ClientePage {
  preencherNome(nome) {
    cy.get('#cliente_nome').type(nome);
  }
  
  clicarSalvar() {
    cy.get('#btn-salvar-cliente').click();
  }
}
```

**After (with Locators separated):**
```javascript
// ClienteLocators.js
const ClienteLocators = {
  nomeInput: '#cliente_nome',
  btnSalvar: '#btn-salvar-cliente'
};

// ClientePage.js
import ClienteLocators from '../../locators/ClienteLocators';

class ClientePage {
  preencherNome(nome) {
    cy.get(ClienteLocators.nomeInput).type(nome);
  }
  
  clicarSalvar() {
    cy.get(ClienteLocators.btnSalvar).click();
  }
}
```

### Related ADRs

- ADR-0002: Use Page Object Pattern (this ADR complements that decision)

