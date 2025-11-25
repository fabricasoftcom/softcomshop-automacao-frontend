# ADR-0002: Use Page Object Pattern

## Status
Accepted

## Context

When writing E2E tests with Cypress, it's common to see selectors and interaction logic scattered directly in test specifications. This approach leads to several problems:

**Problems without Page Object Pattern:**
- CSS/XPath selectors are repeated across multiple test files
- When the DOM changes, multiple test files need to be updated
- Interaction logic is mixed with test logic, making tests harder to read
- Common actions (like filling forms, validating tables) cannot be easily reused
- Tests become long and difficult to maintain
- Changes in UI require updating many files simultaneously

**Previous situation:**
- Selectors scattered throughout test files
- Duplicated interaction logic across tests
- High maintenance cost when UI changes
- Difficult to understand test intent due to low-level DOM operations

**Need:**
- Abstract UI interactions from test logic
- Centralize selectors for easier maintenance
- Enable code reuse across tests
- Improve test readability and maintainability
- Make tests more resilient to UI changes

## Decision

We will use the **Page Object Pattern** as defined by Martin Fowler and widely adopted in automated testing.

**Implementation in this project:**

1. **Class Structure:**
   - Each page/screen has a corresponding class in `cypress/support/pages/`
   - Classes use PascalCase naming: `CadastroNfeNormalPage`, `ProducaoPage`, `ClientePage`
   - Methods use verb-based names: `preencherFormulario()`, `clicarSalvar()`, `validarTabela()`

2. **Separation of Concerns:**
   - **Page Objects**: Contain interaction logic and reusable methods
   - **Locators**: Centralize CSS/XPath selectors in `cypress/support/locators/`
   - **Specs**: Contain only test logic and calls to Page Object methods

3. **Patterns Observed:**
   - Methods return `this` for method chaining when appropriate
   - Methods encapsulate necessary waits and validations
   - Inheritance is used when there are common functionalities (e.g., `CadastroNfeBasePage`)
   - Export as singleton or single instance for consistency

4. **Implementation Examples:**
   ```javascript
   // Example: ProducaoPage.js
   class ProducaoPage {
     visit() {
       cy.visit('/producao');
       cy.get('#loading').should('not.exist');
     }
     
     abrirFormularioPesquisa() {
       // Encapsulated logic for opening search form
     }
   }
   ```

## Consequences

### Positive

1. **Maintainability:**
   - When DOM changes, only Page Objects/Locators need updating
   - Centralized updates reduce maintenance effort
   - Changes are isolated to specific classes

2. **Reusability:**
   - Common actions can be shared across multiple tests
   - Reduces code duplication
   - Promotes DRY (Don't Repeat Yourself) principle

3. **Readability:**
   - Tests read like user stories: `clientePage.preencherCamposCliente(dados)`
   - Focus on behavior, not implementation details
   - Clear intent in test code

4. **Testability:**
   - Page Objects can be tested in isolation
   - Easier to refactor and improve
   - Better separation of concerns

5. **Team Collaboration:**
   - Standard pattern familiar to most test automation engineers
   - Easier onboarding for new team members
   - Consistent structure across the project

### Negative

1. **Initial Overhead:**
   - Creating classes and methods requires upfront time investment
   - May seem excessive for simple, one-off tests
   - Additional files to maintain

2. **Abstraction Layer:**
   - Can hide important details from test writers
   - Debugging may require navigating through abstraction layers
   - May make it harder to understand what's happening under the hood

3. **Maintenance Burden:**
   - Page Objects need to be kept in sync with UI changes
   - Risk of creating unused or outdated methods
   - Need to balance between too many and too few methods

4. **Complexity:**
   - Inheritance can add complexity
   - Many classes can make navigation harder
   - Need to understand the structure to find the right method

### Risks

1. **Over-engineering:**
   - Risk of creating unnecessary abstractions
   - **Mitigation**: Create Page Objects only when there's real reusability
   - **Mitigation**: Start simple and refactor when patterns emerge

2. **Stale Page Objects:**
   - Page Objects may become outdated if not maintained
   - **Mitigation**: Include Page Object validation in tests
   - **Mitigation**: Code review process should check Page Object updates

3. **Tight Coupling:**
   - Page Objects too specific may reduce flexibility
   - **Mitigation**: Create generic methods when possible
   - **Mitigation**: Use composition over inheritance when appropriate

### Notes

- **Page Objects should encapsulate:**
  - Navigation to pages
  - Form filling
  - Button/link clicks
  - State validations
  - Necessary waits

- **Page Objects should NOT:**
  - Contain business logic
  - Make complex assertions (leave to specs)
  - Depend on other Page Objects in circular ways

- **Best practices observed:**
  - Small, focused methods
  - Descriptive method names
  - JSDoc documentation when needed
  - Reuse of common methods

### Example

**Before (without Page Object):**
```javascript
it('deve cadastrar cliente', () => {
  cy.get('#nome').type('João Silva');
  cy.get('#email').type('joao@email.com');
  cy.get('#btn-salvar').click();
  cy.get('.toast-success').should('be.visible');
});
```

**After (with Page Object):**
```javascript
it('deve cadastrar cliente', () => {
  const cliente = generateRandomCustomer();
  clientePage.preencherCamposCliente(cliente);
  clientePage.cadastrar();
  clientePage.validarMensagemSucesso();
});
```

### Related ADRs

- ADR-0003: Separate Locators from Page Objects (complements this decision)

