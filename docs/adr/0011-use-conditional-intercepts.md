# ADR-0011: Use Conditional Intercepts

## Status
Accepted

## Context

In some test flows, API requests may or may not be triggered depending on the application state (e.g., field already filled, data already loaded):

**Problems without conditional intercepts:**
- Using `cy.wait('@alias')` when request doesn't occur causes timeout
- Difficult to handle conditional application states
- Tests become fragile when depending on optional requests
- Unnecessary timeouts increase execution time
- Difficult to validate scenarios where request may or may not occur
- Tests fail when fields are already filled

**Previous situation:**
- Always wait for requests with `cy.wait()`
- Timeouts when request doesn't occur
- Fragile tests with conditional states
- Difficulty handling already filled fields

**Need:**
- Wait for requests only when they occur
- Avoid unnecessary timeouts
- Support conditional states
- More robust and faster tests

## Decision

We will use conditional intercepts with boolean flags to track if a request was intercepted before waiting.

**Implementation in this project:**

1. **Flag Pattern:**
   ```javascript
   // Global variables at top of Page Object file
   let itensRequestInterceptada = false;
   let destinatarioRequestInterceptada = false;
   ```

2. **Intercept with Flag:**
   ```javascript
   cy.intercept(
     { method: 'POST', url: /.*\/nfe2\/salvar.*/, middleware: true },
     (req) => {
       destinatarioRequestInterceptada = true; // Mark as intercepted
       req.continue();
     },
   ).as('salvarDestinatario');
   ```

3. **Conditional Wait:**
   ```javascript
   // Check if request was intercepted before waiting
   if (destinatarioRequestInterceptada) {
     cy.wait('@salvarDestinatario');
   } else {
     cy.log('Nenhuma requisição de destinatário foi interceptada; o destinatário pode não ter mudado ou já estava salvo');
   }
   ```

4. **Flag Reset:**
   ```javascript
   // Reset flag at beginning of method
   destinatarioRequestInterceptada = false;
   ```

## Consequences

### Positive

1. **Robustness:**
   - Avoids timeouts when request doesn't occur
   - Supports conditional application states
   - More stable tests
   - Fewer failures due to timeouts

2. **Performance:**
   - Doesn't wait for requests that don't occur
   - Faster execution
   - Fewer unnecessary waits

3. **Flexibility:**
   - Works with already filled fields
   - Supports conditional flows
   - Adapts to different application states

4. **Maintainability:**
   - Clearer code about when to wait
   - Informative logs when request doesn't occur
   - Easy to understand and maintain

### Negative

1. **Complexity:**
   - Requires flag management
   - More code to maintain
   - Need to understand the pattern

2. **Overhead:**
   - Global variables per file
   - Flag reset in each method
   - More conditional logic

3. **Risks:**
   - Flags not reset can cause problems
   - Dependency on global state
   - Possible confusion if poorly implemented

### Risks

1. **Flags Not Reset:**
   - Flag may remain `true` from previous test
   - **Mitigation**: Always reset flags at beginning of method
   - **Mitigation**: Use local variables when possible

2. **Race Conditions:**
   - Flag may be set after check
   - **Mitigation**: Use `middleware: true` in intercept
   - **Mitigation**: Check flag immediately after action

3. **Excessive Complexity:**
   - Too many flags can make code hard to maintain
   - **Mitigation**: Use only when necessary
   - **Mitigation**: Document flag usage

### Notes

- **When to use:**
  - Request may or may not occur depending on state
  - Field may already be filled
  - Flow has conditional paths
  - Avoiding timeout is critical

- **When NOT to use:**
  - Request always occurs
  - Flow is deterministic
  - Complexity doesn't pay off

- **Best practices observed:**
  - Reset flags at beginning of method
  - Use `middleware: true` to intercept before response
  - Informative logs when request doesn't occur
  - Descriptive flag names
  - Document flag usage

### Example

**Before (without conditional intercept):**
```javascript
preencherDestinatario(nome) {
  cy.intercept('POST', '**/nfe2/salvar*').as('salvarDestinatario');
  
  cy.get(CadastroNfeLocators.destinatario.nome)
    .clear()
    .type(nome);
  
  // Always waits, even if destinatário was already filled
  // Causes timeout if request is not triggered
  cy.wait('@salvarDestinatario'); // ❌ Timeout if no request
}
```

**After (with conditional intercept):**
```javascript
let destinatarioRequestInterceptada = false;

preencherDestinatario(nome) {
  destinatarioRequestInterceptada = false; // Reset
  
  cy.intercept(
    { method: 'POST', url: /.*\/nfe2\/salvar.*/, middleware: true },
    (req) => {
      destinatarioRequestInterceptada = true; // Mark as intercepted
      req.continue();
    },
  ).as('salvarDestinatario');
  
  cy.get(CadastroNfeLocators.destinatario.nome)
    .clear()
    .type(nome);
  
  // Wait only if request was intercepted
  if (destinatarioRequestInterceptada) {
    cy.wait('@salvarDestinatario'); // ✅ Waits only if necessary
  } else {
    cy.log('Nenhuma requisição de destinatário foi interceptada; o destinatário pode não ter mudado ou já estava salvo');
  }
}
```

### Implementation Details

**Flag Pattern:**
- Global variables at top of Page Object file
- Descriptive name: `<action>RequestInterceptada`
- Type: `boolean` (initialized as `false`)

**Intercept with Middleware:**
- Use `middleware: true` to intercept before response
- Set flag inside intercept handler
- Call `req.continue()` to allow request

**Flag Reset:**
- Always reset at beginning of method that uses flag
- Ensure clean state for each execution

**Conditional Check:**
- Check flag before `cy.wait()`
- Informative log when request doesn't occur
- Continue flow normally if no request

**Use Cases:**
- Destinatário already filled (doesn't trigger request)
- Items already loaded (doesn't trigger request)
- Optional fields that may or may not trigger requests
- Conditional flows with different paths

### Related ADRs

- ADR-0002: Use Page Object Pattern (conditional intercepts are implemented in Page Objects)
- ADR-0003: Separate Locators from Page Objects (locators used alongside intercepts)
- ADR-0008: Use Page Object Hierarchy (conditional intercepts used in base and specific classes)

