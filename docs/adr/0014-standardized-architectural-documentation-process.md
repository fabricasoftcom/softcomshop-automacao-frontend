# ADR-0014: Standardized Architectural Documentation Process

## Status
Accepted

## Context

The project requires architectural documentation for all test cases (ADR-0006), but without a standardized process:

**Problems without standardization:**
- Documentation created inconsistently
- Different formats and structures
- Missing information in some documentations
- Difficult to find documentation
- Hard to maintain documentation
- Onboarding becomes more difficult

**Previous situation:**
- Documentation created ad-hoc
- No standard template
- Inconsistent quality
- No central index
- Difficult to navigate

**Need:**
- Standardized process for creating documentation
- Consistent template
- Central index of all documentations
- Clear guidelines
- Quality standards

## Decision

We will follow a standardized process for creating architectural documentation, defined in `docs/referencias/processo-documentacao.md`, with a central index in `docs/cases/README.md`.

**Implementation:**

1. **Process Steps:**
   - Create spec in `cypress/e2e/...`
   - Create Page Objects/Locators (if necessary)
   - **Add to `specPattern` in `cypress.config.js`** (MANDATORY)
   - **Create `docs/cases/architecture-<nome>.md`** (MANDATORY)
   - **Update `docs/testes.md`** (MANDATORY)
   - **Update `docs/cases/README.md`** (MANDATORY)
   - Apply tags in `describe` (ADR-0010)

2. **Template Structure:**
   - Objective
   - File structure (specs, Page Objects, Locators, Factories)
   - Imports and dependencies
   - Test structure (detailed steps)
   - Patterns and best practices
   - Related ADRs
   - References

3. **Index Maintenance:**
   - All documentations listed in `docs/cases/README.md`
   - Organized by module/functionality
   - Easy to navigate
   - Updated when new documentation is created

4. **Quality Standards:**
   - Clear objective description
   - Complete file structure
   - All dependencies listed
   - Detailed test steps
   - Patterns documented
   - ADRs referenced

## Consequences

### Positive

1. **Consistency:**
   - All documentations follow same structure
   - Easy to understand and navigate
   - Predictable format
   - Better quality

2. **Maintainability:**
   - Easy to update documentation
   - Clear what information to include
   - Central index for discovery
   - Better organization

3. **Onboarding:**
   - New developers understand structure quickly
   - Clear examples to follow
   - Reduced learning curve
   - Better understanding of project

4. **Quality:**
   - Standard ensures completeness
   - Missing information is obvious
   - Better documentation overall
   - Easier to review

### Negative

1. **Time Overhead:**
   - Additional time to create documentation
   - Requires discipline to follow process
   - May slow down initial development

2. **Maintenance:**
   - Index must be kept up to date
   - Documentation must be updated when tests change
   - Additional files to maintain

### Risks

1. **Process Not Followed:**
   - Developers may skip steps
   - **Mitigation**: Make steps mandatory in checklist
   - **Mitigation**: Include in code review

2. **Outdated Documentation:**
   - Documentation may become outdated
   - **Mitigation**: Update when tests are modified
   - **Mitigation**: Periodic review

3. **Incomplete Documentation:**
   - Some information may be missing
   - **Mitigation**: Use checklist to validate
   - **Mitigation**: Code review validation

### Notes

- **Process location:** `docs/referencias/processo-documentacao.md`
- **Template location:** Included in process document
- **Index location:** `docs/cases/README.md`
- **Documentation location:** `docs/cases/architecture-<nome>.md`

- **When to create documentation:**
  - For every new test spec
  - When test is significantly modified
  - When architecture changes

- **Mandatory steps:**
  1. Create spec
  2. Create Page Objects/Locators (if needed)
  3. **Add to `specPattern`** (MANDATORY)
  4. **Create documentation** (MANDATORY)
  5. **Update `docs/testes.md`** (MANDATORY)
  6. **Update `docs/cases/README.md`** (MANDATORY)

- **Best practices:**
  - Follow template strictly
  - Include all required sections
  - Reference related ADRs
  - Provide clear examples
  - Keep documentation up to date

### Example

**Before (without standardization):**
- Documentation created inconsistently
- Different formats
- Missing information
- No central index

**After (with standardization):**
```markdown
# Arquitetura dos casos de teste: Nova Receita

## Objetivo
[Clear description following template]

## Estrutura de arquivos
[Complete file structure]

## Imports e dependências
[All dependencies listed]

## Estrutura do teste
[Detailed steps]

## Padrões e boas práticas
[Patterns and best practices]

## Referências
[Related ADRs]
```

**Index entry:**
```markdown
### 💰 Financeiro
- `architecture-nova-receita.md` - Cadastro de nova receita
```

### Related ADRs

- ADR-0006: Mandatory Documentation for New Tests - This ADR defines the process for mandatory documentation
- ADR-0013: Continuous Validation Checklist - Checklist validates documentation creation
- ADR-0002: Use Page Object Pattern - Documentation includes Page Objects
- ADR-0003: Separate Locators from Page Objects - Documentation includes Locators
- ADR-0010: Use Tags for Test Filtering - Documentation includes tags

