# ADR-0010: Use Tags for Test Filtering

## Status
Accepted

## Context

In large test suites, executing all tests is time-consuming and inefficient:

**Problems without test filtering:**
- All tests must be executed every time
- No way to run tests for a specific module
- No way to run tests for a specific type (e.g., only NFe Normal)
- No way to organize tests by category (regressive, smoke, etc.)
- Lack of flexibility in CI/CD pipelines for selective execution
- Difficulty isolating tests during development/debugging
- Long execution times for full suite
- Wasted time running unrelated tests

**Previous situation:**
- Always execute all tests
- No filtering by module or type
- Long execution times
- Difficulty isolating problems
- No organization by category

**Need:**
- Selective test execution
- Organization by module and type
- Flexibility in pipelines
- Reduced execution time
- Better organization and maintenance

## Decision

We will use the `@cypress/grep` plugin with tags for test filtering.

**Implementation in this project:**

1. **Plugin Installed:**
   - `@cypress/grep: ^4.1.0` (devDependency)

2. **Configuration in `cypress.config.js`:**
   ```javascript
   setupNodeEvents(on, config) {
     require('@cypress/grep/src/plugin')(config)
     return config;
   },
   env: {
     grepFilterSpecs: true
   }
   ```

3. **Registration in `cypress/support/e2e.js`:**
   ```javascript
   const registerCypressGrep = require('@cypress/grep')
   registerCypressGrep()
   ```

4. **Usage in specs:**
   ```javascript
   describe('Cadastro NFe Normal', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-normal'] }, () => {
     // tests
   });
   ```

5. **Tag Pattern:**
   - **Module tags**: `@financeiro`, `@vendas`, `@compras`, `@producao`, `@nfe`
   - **Type tags**: `@regressivo`, `@smoke`, `@critical`
   - **Specific tags**: `@nfe-normal`, `@nfe-devolucao`, `@listagem-movimentacoes`, `@cadastro-movimentacoes`

## Consequences

### Positive

1. **Selective Execution:**
   - Run only tests for a specific module
   - Run only tests for a specific type
   - Run only regressive tests
   - Significant reduction in execution time

2. **Organization:**
   - Tests organized by module
   - Tests organized by type/functionality
   - Easy identification of test scope
   - Better traceability

3. **CI/CD Pipelines:**
   - Parallel execution by module
   - Selective execution in PRs
   - Fast smoke tests
   - Full regression when needed

4. **Development:**
   - Run only related tests during development
   - Faster debugging
   - Quick validation of changes
   - Problem isolation

5. **Maintenance:**
   - Identify tests affected by changes
   - Run only relevant tests after refactoring
   - Incremental validation

### Negative

1. **Overhead:**
   - Need to define tags in each spec
   - Tag maintenance when structure changes
   - Risk of inconsistent tags

2. **Complexity:**
   - Understanding tag pattern
   - Documentation needed
   - Team training

3. **Dependency:**
   - Additional plugin to maintain
   - May break with Cypress updates
   - Requires configuration

### Risks

1. **Inconsistent Tags:**
   - Different tags for same purpose
   - **Mitigation**: Documented standard and code review
   - **Mitigation**: Mandatory checklist

2. **Forgotten Tags:**
   - Specs without tags
   - **Mitigation**: Mandatory checklist
   - **Mitigation**: Validation in code review

3. **Outdated Tags:**
   - Tags don't reflect current structure
   - **Mitigation**: Periodic review
   - **Mitigation**: Updated documentation

### Notes

- **Tags should be used when:**
  - Test suite is large
  - Tests are organized by module
  - Selective execution is needed
  - CI/CD pipelines require flexibility
  - Development/debugging needs isolation

- **Tags should NOT be used when:**
  - Test suite is very small
  - All tests must always run
  - No need for organization

- **Best practices observed:**
  - Always add tags when creating new specs
  - Use consistent tag naming
  - Document tag patterns
  - Review tags periodically
  - Use module + type + specific tags

### Example

**Before (without tags):**
```bash
# Always executes ALL tests
npm run e2e
# Time: 30+ minutes
```

**After (with tags):**
```bash
# Run only NFe Normal tests
npm run e2e -- --grep "@nfe-normal"
# Time: 5 minutes

# Run only listing tests
npm run e2e -- --grep "@listagem"
# Time: 10 minutes

# Run only regressive finance tests
npm run e2e -- --grep "@financeiro" --grep "@regressivo"
# Time: 8 minutes
```

### Implementation Details

**Tag Pattern:**
- **Module tags**: `@modulo` (e.g., `@financeiro`, `@vendas`, `@compras`)
- **Type tags**: `@regressivo`, `@smoke`, `@critical`
- **Specific tags**: `@nfe-normal`, `@listagem-movimentacoes`, `@cadastro-movimentacoes`

**Tag Structure:**
- Each spec should have at least: module tag + type tag
- Additional specific tags for granular filtering
- Example: `['@nfe', '@vendas', '@regressivo', '@nfe-normal']`

**Execution Commands:**
```bash
# Single tag
npm run e2e -- --grep "@nfe-normal"

# Multiple tags (AND)
npm run e2e -- --grep "@financeiro" --grep "@regressivo"

# Multiple tags (OR) - use grepTags
npm run e2e -- --grep "@nfe" --env grepTags="any"
```

**Configuration:**
- `grepFilterSpecs: true` in `cypress.config.js` enables spec filtering
- Plugin registered in `setupNodeEvents`
- Plugin imported in `cypress/support/e2e.js`

### Related ADRs

- ADR-0006: Mandatory Documentation for New Tests (tags should be documented)
- ADR-0007: Separate Specs by Functionality and Type (tags complement separation)

