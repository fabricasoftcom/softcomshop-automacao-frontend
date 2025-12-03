# ADR-0004: Use cy.session for Login Persistence

## Status
Accepted

## Context

In E2E test suites, especially long-running ones, login is typically executed multiple times - once in each test's `beforeEach` hook. This approach has several problems:

**Problems with repeated login:**
- Login is executed in every `beforeEach`, even when the session is still valid
- Each login consumes significant time (navigation, form filling, submission, validation)
- Long test suites become very slow due to repeated authentication
- Increases server load unnecessarily
- Tests become slower and more expensive to run
- Wastes time on redundant operations

**Previous situation:**
- Login executed in every `beforeEach` hook
- Each test performs complete login flow
- Time wasted on repeated authentications
- Example: Suite with 20 tests = 20 logins = ~200 seconds just for authentication

**Need:**
- Reuse authenticated session across tests
- Reduce execution time significantly
- Maintain test isolation when needed
- Improve efficiency of test suites
- Reduce server load

## Decision

We will use **`cy.session`** from Cypress to cache and reuse login sessions across tests.

**Implementation in this project:**

1. **cy.session Usage:**
   - Native Cypress plugin (available since v8.2+)
   - Caches cookies, localStorage, and sessionStorage
   - Reuses session when valid
   - Re-executes login only when necessary

2. **Custom Commands Created:**
   ```javascript
   Cypress.Commands.add('loginArmazenandoSessao', () => {
     cy.session('user_session', () => {
       // Login logic here
     });
   });
   ```

3. **Patterns Observed:**
   - Session ID: `'user_session'` (unique identifier)
   - Login logic encapsulated within callback
   - Success validation: `cy.contains('Início').should('be.visible')`
   - Use of fixtures for credentials: `cy.fixture('users')`

4. **Available Commands:**
   - `cy.login()`: Login with fiscal user (use for fiscal functionalities)
   - `cy.loginRestoreSession()`: Login with default user + alert handling
   - `cy.loginArmazenandoSessao()`: Login with default user (use for non-fiscal functionalities)

5. **Command Selection Rule:**
   - **For fiscal functionalities** (NFe, NFCe, SPED, Sintegra, etc.): Use `cy.login()` which uses fiscal user credentials (`user.validFiscal`)
   - **For other functionalities**: Use `cy.loginArmazenandoSessao()` which uses default user credentials (`user.valid`)
   - Both commands use `cy.session` for session persistence and performance optimization

## Consequences

### Positive

1. **Performance:**
   - Significant reduction in test execution time
   - Login executed once per session, not per test
   - Long test suites run much faster
   - Example: 20 tests with login = 1 login instead of 20

2. **Efficiency:**
   - Fewer requests to server
   - Reduced load on test environment
   - Faster CI/CD pipeline executions

3. **Controlled Isolation:**
   - `cy.session` manages cache automatically
   - Session cleared when necessary
   - Maintains isolation when configured correctly

4. **Maintainability:**
   - Login logic centralized in custom commands
   - Easy to update credentials or flow
   - Reusable across multiple tests

5. **Compatibility:**
   - Works with cookies, localStorage, sessionStorage
   - Supports different authentication types
   - Integrates with other Cypress features

### Negative

1. **Complexity:**
   - Requires understanding of how `cy.session` works
   - Can be confusing for beginners
   - Debugging can be harder when session issues occur

2. **Caching:**
   - Session may become stale
   - Changes in user state may not be reflected
   - May mask authentication problems

3. **Isolation:**
   - Tests may share unwanted state
   - Requires care with `testIsolation: false`
   - May cause dependencies between tests

4. **Debugging:**
   - Harder to identify when login was executed
   - Session may be cached without being visible
   - Requires knowledge of `cy.session` behavior

### Risks

1. **Stale Session:**
   - Session may become invalid without being detected
   - **Mitigation**: Success validation after login
   - **Mitigation**: Clear session when necessary

2. **Shared State:**
   - Tests may interfere with each other
   - **Mitigation**: Use `testIsolation: false` carefully
   - **Mitigation**: Clear state when necessary

3. **Cache Dependency:**
   - Tests may fail if cache is corrupted
   - **Mitigation**: Clear cache when necessary
   - **Mitigation**: Validate session before use

### Notes

- **cy.session should be used when:**
  - Login is expensive (time-consuming)
  - Multiple tests need authentication
  - Test suite is long-running
  - Performance is a concern

- **cy.session should NOT be used when:**
  - Tests need fresh login every time
  - Authentication state changes between tests
  - Tests are testing login functionality itself
  - Isolation is critical

- **Best practices observed:**
  - Use descriptive session IDs
  - Validate login success
  - Clear session when needed
  - Use fixtures for credentials
  - Document session behavior in tests

- **Command selection:**
  - **Fiscal functionalities** require fiscal user permissions → use `cy.login()`
    - Examples: NFe, NFCe, SPED, Sintegra, and other fiscal/tax-related features
  - **Other functionalities** use default user → use `cy.loginArmazenandoSessao()`
    - Examples: Sales, Purchases, Production, Financial, Clients, Products, etc.
  - Both commands cache sessions using `cy.session` for performance

### Example

**Before (without cy.session):**
```javascript
beforeEach(() => {
  // Login executed in EVERY test
  cy.fixture('users').then((user) => {
    LoginPage.visit();
    LoginPage.preencherCredenciais(user.valid.username, user.valid.password);
    LoginPage.clicarLogin();
    cy.contains('Início').should('be.visible');
  });
});
// 20 tests = 20 logins = ~200 seconds
```

**After (with cy.session):**
```javascript
// For non-fiscal functionalities
beforeEach(() => {
  // Login executed only once per session
  cy.loginArmazenandoSessao();
  cy.visit('/');
});
// 20 tests = 1 login = ~10 seconds

// For fiscal functionalities (NFe, NFCe, SPED, Sintegra, etc.)
beforeEach(() => {
  // Login with fiscal user, executed only once per session
  cy.login();
  cy.visit('/');
});
// 20 tests = 1 login = ~10 seconds
```

### Implementation Details

**Session ID:**
- `'user_session'`: Standard session identifier
- Can be customized per user type if needed
- Must be unique per session type

**Session Validation:**
- Validates login success with `cy.contains('Início').should('be.visible')`
- Ensures session is valid before caching
- Prevents caching invalid sessions

**Session Lifecycle:**
- Created on first use
- Reused in subsequent tests
- Cleared when test isolation is enabled
- Re-executed if session becomes invalid

**Command Selection:**
- **Fiscal functionalities**: Use `cy.login()` for tests related to:
  - NFe (Nota Fiscal Eletrônica)
  - NFCe (Nota Fiscal de Consumidor Eletrônica)
  - SPED (Sistema Público de Escrituração Digital)
  - Sintegra (Sistema Integrado de Informações sobre Operações Interestaduais)
  - Other fiscal/tax-related features
- **Other functionalities**: Use `cy.loginArmazenandoSessao()` for all other tests
- Both commands utilize `cy.session` for performance optimization

### Custom Commands Reference

For complete documentation of all custom login commands, including detailed usage examples, parameters, and when to use each command, see:

- **`docs/referencias/referencia-comandos-customizados.md`** - Complete reference of all custom commands
- **ADR-0012: Documentation of Custom Commands** - ADR that establishes the documentation standard

**Available Login Commands Summary:**

1. **`cy.login()`** - Fiscal functionalities
   - User: `user.validFiscal`
   - Use for: NFe, NFCe, SPED, Sintegra, and other fiscal/tax-related features
   - Session ID: `'user_session'`

2. **`cy.loginArmazenandoSessao()`** - General functionalities
   - User: `user.valid`
   - Use for: Sales, Purchases, Production, Financial, Clients, Products, etc.
   - Session ID: `'user_session'`

3. **`cy.loginRestoreSession()`** - Iterative tests
   - User: `user.valid`
   - Use for: Tests with loops (`cy.wrap().each()`) where session may expire
   - Handles SweetAlert automatically
   - Session ID: `'user_session'`

4. **`cy.loginArmazenandoSessaoCobranca()`** - Billing functionalities
   - User: `user.validApiCobranca`
   - Use for: Billing-related features requiring specific API permissions
   - Session ID: `'user_session'`

**Important:** All commands use `cy.session()` for session persistence and performance optimization.

### Related ADRs

- ADR-0002: Use Page Object Pattern (Page Objects used in login commands)
- ADR-0003: Separate Locators from Page Objects (Locators used in login flow)
- ADR-0012: Documentation of Custom Commands (complete command documentation)

