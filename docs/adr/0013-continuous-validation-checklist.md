# ADR-0013: Continuous Validation Checklist

## Status
Accepted

## Context

As the project grows and new tests are added, maintaining continuous compliance with Architecture Decision Records (ADRs) becomes challenging:

**Problems without validation:**
- New tests may not follow established patterns
- ADRs may be violated without detection
- Code reviews may miss non-compliance issues
- Inconsistencies accumulate over time
- Onboarding becomes more difficult
- Technical debt increases

**Previous situation:**
- No systematic validation of ADR compliance
- Reliance on individual developer knowledge
- Inconsistent code review practices
- ADR violations discovered late
- Difficult to ensure consistency

**Need:**
- Systematic validation of ADR compliance
- Checklist for code reviews
- Clear criteria for each ADR
- Examples of compliance and non-compliance
- Prevention of regressions

## Decision

We will use a continuous validation checklist (`docs/referencias/checklist-validacao-continua.md`) during code reviews to ensure continuous compliance with all ADRs.

**Implementation:**

1. **Checklist Structure:**
   - Validation for each ADR
   - General checklist (structure, validations, best practices)
   - Code review template
   - Examples of compliance and non-compliance
   - Red flags identification

2. **Usage:**
   - **During code review:** Reviewer validates each item
   - **During development:** Developer self-validates before submitting
   - **Periodic reviews:** Regular code reviews using checklist
   - **Onboarding:** New developers learn patterns through checklist

3. **Maintenance:**
   - Checklist must be updated when new ADRs are created
   - Checklist must be updated when ADRs are modified
   - Examples should be updated with real cases from the project

4. **Integration:**
   - Included in Pull Request review process
   - Referenced in development guidelines
   - Part of onboarding documentation

## Consequences

### Positive

1. **Continuous Compliance:**
   - ADR violations are caught early
   - Consistent patterns across the project
   - Prevents accumulation of technical debt
   - Maintains code quality

2. **Code Review:**
   - Systematic validation process
   - Clear criteria for reviewers
   - Faster code reviews
   - Better code quality

3. **Onboarding:**
   - New developers learn patterns quickly
   - Clear examples of correct usage
   - Reduces learning curve
   - Better understanding of project standards

4. **Prevention:**
   - Prevents regressions
   - Catches issues before merge
   - Reduces need for refactoring
   - Maintains architectural integrity

### Negative

1. **Time Overhead:**
   - Additional time for code review
   - Requires discipline to use checklist
   - May slow down initial reviews

2. **Maintenance:**
   - Checklist must be kept up to date
   - Requires updates when ADRs change
   - Additional documentation to maintain

### Risks

1. **Checklist Not Used:**
   - Reviewers may skip checklist
   - **Mitigation**: Make checklist mandatory in PR template
   - **Mitigation**: Include in development guidelines

2. **Outdated Checklist:**
   - Checklist may become outdated
   - **Mitigation**: Update when ADRs are created/modified
   - **Mitigation**: Periodic review of checklist

3. **Over-Reliance:**
   - May focus only on checklist items
   - **Mitigation**: Checklist is a tool, not the only validation
   - **Mitigation**: Encourage critical thinking

### Notes

- **Checklist location:** `docs/referencias/checklist-validacao-continua.md`
- **When to use:**
  - During Pull Request reviews
  - During development (self-validation)
  - During periodic code reviews
  - During onboarding

- **Checklist covers:**
  - ADR-0002: Page Object Pattern
  - ADR-0003: Separate Locators
  - ADR-0004: Session Persistence
  - ADR-0005: Allure Reporting
  - ADR-0006: Mandatory Documentation
  - ADR-0007: Separate Specs
  - ADR-0008: Page Object Hierarchy
  - ADR-0009: Faker for Dynamic Data
  - ADR-0010: Tags for Test Filtering
  - ADR-0011: Conditional Intercepts
  - General best practices

- **Best practices:**
  - Use checklist systematically
  - Update checklist when ADRs change
  - Provide examples of compliance
  - Document red flags
  - Make checklist part of PR process

### Example

**Before (without checklist):**
- Code review relies on reviewer knowledge
- ADR violations may be missed
- Inconsistent validation
- Patterns not enforced

**After (with checklist):**
```markdown
## Code Review Checklist

### ADR-0004: Session Persistence
- [ ] Comando de login correto?
  - [ ] Funcionalidades fiscais: usa `cy.login()`
  - [ ] Outras funcionalidades: usa `cy.loginArmazenandoSessao()`

### ADR-0010: Tags for Test Filtering
- [ ] Tags aplicadas no `describe`?
- [ ] Tags seguem padrão: `['@modulo', '@tipo', '@regressivo']`?
```

### Related ADRs

- All existing ADRs (0002-0011) - Checklist validates compliance with all ADRs
- ADR-0006: Mandatory Documentation for New Tests - Documentation is validated in checklist
- ADR-0012: Documentation of Custom Commands - Commands usage is validated in checklist

