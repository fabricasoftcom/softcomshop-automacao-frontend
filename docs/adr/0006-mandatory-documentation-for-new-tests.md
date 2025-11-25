# ADR-0006: Mandatory Documentation for New Tests

## Status
Accepted

## Context

When creating new tests, documentation was optional and inconsistent:

**Problems without mandatory documentation:**
- Some tests documented, others not
- Inconsistent documentation format
- Information scattered across files
- Difficult to understand test purpose and structure
- Slow onboarding for new team members
- Hard to maintain tests without context
- Lack of traceability between code and documentation
- Difficult to identify dependencies and patterns used
- No clear structure for test documentation

**Previous situation:**
- Documentation was optional
- Inconsistent format when present
- Information scattered
- Difficult to find documentation
- No clear requirements

**Need:**
- Mandatory and standardized documentation
- Clear and consistent structure
- Easy to find and understand tests
- Faster onboarding
- Easier maintenance
- Better traceability

## Decision

We will make documentation **mandatory** for all new tests, following a defined standard.

**Mandatory requirements:**

1. **Architecture file in `docs/cases/`:**
   - Name: `architecture-<nome-do-spec>.md`
   - Must contain:
     - **Objective**: Clear description of what the test validates
     - **Imports and dependencies**: Page Objects, Locators, Commands used
     - **Test structure**: Detailed description of each `it` and its steps
     - **Patterns and best practices**: Techniques applied, intercepts, special validations
   - Reference examples: `architecture-cadastro-nfe.md`, `architecture-producao-listagem.md`, `architecture-listagem-produtos.md`

2. **Update in `docs/testes.md`:**
   - Add new section or update existing section
   - Include:
     - Section title (e.g., `## ??? producao`)
     - Spec file (e.g., `### ?? Arquivo: producao/cadastro-producao.spec.js`)
     - Test suite (e.g., `#### ?? Suite: Cadastro de Produção`)
     - List of all tests (`it`) in the spec
   - Maintain alphabetical or logical order

3. **Registration in `specPattern`:**
   - Add to `specPattern` in `cypress.config.js` immediately after creating the file
   - Maintain logical sequence within corresponding block
   - Update corresponding comment/filter

**Mandatory checklist:**
1. Create spec in `cypress/e2e/...`
2. Create Page Objects/Locators (if necessary)
3. **Add to `specPattern` in `cypress.config.js`** (MANDATORY)
4. **Create documentation in `docs/cases/architecture-<nome>.md`** (MANDATORY)
5. **Update `docs/testes.md`** (MANDATORY)
6. Apply tags in `describe` for filtering (`@cypress/grep`)

## Consequences

### Positive

1. **Consistency:**
   - All tests documented
   - Standardized format
   - Organized information
   - Easy to locate

2. **Onboarding:**
   - New team members understand quickly
   - Clear context for each test
   - Explicit dependencies
   - Documented patterns

3. **Maintenance:**
   - Context preserved
   - Documented changes
   - Identified dependencies
   - Clear patterns

4. **Traceability:**
   - Code linked to documentation
   - Decision history
   - Documented changes
   - Cross-references

5. **Quality:**
   - Clearer tests
   - Consistently applied patterns
   - Documented best practices
   - Better coverage

### Negative

1. **Overhead:**
   - Additional time to document
   - Documentation maintenance
   - Update when code changes
   - Greater initial effort

2. **Compliance:**
   - Need to verify compliance
   - Documentation review
   - Validation process
   - Possible delay if not followed

3. **Maintenance:**
   - Documentation may become outdated
   - Need for synchronization
   - Effort to keep updated
   - Risk of inconsistency

### Risks

1. **Outdated Documentation:**
   - Code changes, documentation doesn't
   - **Mitigation**: Review documentation in PRs
   - **Mitigation**: Mandatory checklist
   - **Mitigation**: Automated validation when possible

2. **Low Adoption:**
   - Development without documentation
   - **Mitigation**: Mandatory checklist
   - **Mitigation**: Code review
   - **Mitigation**: Documentation culture

3. **Inconsistent Quality:**
   - Incomplete or vague documentation
   - **Mitigation**: Templates and examples
   - **Mitigation**: Peer review
   - **Mitigation**: Clear standards

### Notes

- **Documentation should be created when:**
  - Creating a new test spec
  - Adding significant new functionality to existing tests
  - Refactoring test structure
  - Changing test dependencies

- **Documentation should NOT be skipped when:**
  - Test is "simple" or "obvious"
  - Time is limited
  - Test is temporary
  - Documentation seems redundant

- **Best practices observed:**
  - Create documentation immediately after creating test
  - Update documentation when test changes
  - Review documentation in code reviews
  - Use templates and examples
  - Keep documentation concise but complete

### Example

**Before (without mandatory documentation):**
```
cypress/e2e/producao/cadastro-producao.spec.js
// Test created, but no documentation
// Difficult to understand purpose
// Dependencies not clear
```

**After (with mandatory documentation):**
```
docs/cases/architecture-cadastro-producao.md
# Architecture of test case: cadastro-producao.spec.js

## Objective
- Validate complete production registration flow...

## Imports and dependencies
- `CadastroProducaoPage`...
- `ProducaoLocators`...

## Test structure
1. beforeEach...
2. Test 1...
...

docs/testes.md
## ??? producao
### ?? Arquivo: producao/cadastro-producao.spec.js
#### ?? Suite: Cadastro de Produção
- Deve cadastrar nova produção
- Deve validar campos obrigatórios
...
```

### Implementation Details

**Documentation Structure:**
- Each test spec must have a corresponding `architecture-<nome>.md` file
- File should follow the standard template
- Include all required sections
- Reference examples from existing documentation

**Update Process:**
- Update `docs/testes.md` immediately after creating test
- Add to appropriate section
- Maintain alphabetical or logical order
- Include all test cases (`it`)

**Registration Process:**
- Add to `specPattern` in `cypress.config.js` immediately
- Place in appropriate logical block
- Update corresponding comment/filter
- Maintain execution order

**Validation:**
- Code review should verify documentation exists
- Checklist should be verified before merging
- Documentation should be reviewed for completeness
- Templates should be used for consistency

### Related ADRs

- ADR-0001: Record Architecture Decisions (documentation of decisions)
- ADR-0002: Use Page Object Pattern (documented in architecture files)
- ADR-0003: Separate Locators from Page Objects (documented in architecture files)
- ADR-0005: Use Allure for Test Reporting (reports complement documentation)

