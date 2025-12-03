# ADR-0012: Documentation of Custom Commands

## Status
Accepted

## Context

The project has 12 custom Cypress commands defined in `cypress/support/commands.js` that provide reusable functionality across tests:

**Authentication commands (4):**
- `cy.login()` - For fiscal functionalities
- `cy.loginArmazenandoSessao()` - For general functionalities
- `cy.loginRestoreSession()` - For iterative tests
- `cy.loginArmazenandoSessaoCobranca()` - For billing functionalities

**Validation commands (1):**
- `cy.verificarErro500Visual()` - Visual error 500 validation

**Navigation commands (3):**
- `cy.clicarMenu()` - Simple menu navigation
- `cy.expandirClicarMenuUmNivel()` - Menu with submenu
- `cy.expandirClicarMenuDoisNiveis()` - Two-level menu (currently unused)

**Registration commands (1):**
- `cy.salvarRegistroCadsatro()` - Save and validate toast (currently unused, has typo)

**Setup commands (2):**
- `cy.setupSistemaPadrao()` - Standard system configuration
- `cy.setupSistemaPetshop()` - Petshop system configuration

**Problems without documentation:**
- Developers don't know which command to use in each situation
- Commands are used incorrectly (e.g., wrong login command for fiscal vs non-fiscal)
- New team members have difficulty discovering available commands
- Commands are duplicated or created unnecessarily
- Unused commands are not identified for cleanup

**Need:**
- Centralized reference for all custom commands
- Clear guidance on when to use each command
- Examples of correct usage
- Identification of unused commands
- Easy discovery for new developers

## Decision

We will maintain centralized documentation for all custom commands in `docs/referencias/referencia-comandos-customizados.md`.

**Implementation:**

1. **Documentation Structure:**
   - Complete description of each command
   - When to use each command
   - Parameters and behavior
   - Usage examples
   - Related ADRs
   - Analysis of usage
   - Quick reference guide

2. **Maintenance:**
   - Documentation must be updated when new commands are created
   - Documentation must be updated when commands are modified
   - Unused commands should be identified and documented
   - Commands with issues (e.g., typos) should be documented

3. **Usage in Development:**
   - Developers should consult documentation before creating new commands
   - Developers should verify if an existing command meets their needs
   - Code reviews should validate correct command usage

4. **Reference in Code:**
   - New tests should reference the documentation when using custom commands
   - Comments in code can reference the documentation for complex commands

## Consequences

### Positive

1. **Discoverability:**
   - Easy to find available commands
   - Clear understanding of command purposes
   - Better onboarding for new developers
   - Reduces duplicate command creation

2. **Correct Usage:**
   - Clear guidance on when to use each command
   - Examples of correct usage
   - Reduces incorrect command usage
   - Prevents bugs from wrong command selection

3. **Maintenance:**
   - Unused commands are identified
   - Commands with issues are documented
   - Easier to identify cleanup opportunities
   - Better understanding of command usage patterns

4. **Consistency:**
   - Standardized command usage across the project
   - Consistent patterns in tests
   - Easier code review
   - Better test maintainability

### Negative

1. **Maintenance Overhead:**
   - Documentation must be kept up to date
   - Requires discipline to update when commands change
   - Additional documentation to maintain

2. **Initial Effort:**
   - Time required to create initial documentation
   - Time required to analyze existing commands

### Risks

1. **Outdated Documentation:**
   - Documentation may become outdated if not maintained
   - **Mitigation**: Include in code review checklist
   - **Mitigation**: Update documentation when commands are modified

2. **Incomplete Documentation:**
   - Some commands may not be fully documented
   - **Mitigation**: Review documentation periodically
   - **Mitigation**: Include examples for all commands

### Notes

- **Documentation location:** `docs/referencias/referencia-comandos-customizados.md`
- **Commands location:** `cypress/support/commands.js`
- **Related ADR:** ADR-0004 (Session Persistence) - Documents login commands

- **When to create new commands:**
  - When functionality is reused across multiple tests
  - When functionality is complex and benefits from encapsulation
  - When functionality improves test readability

- **When NOT to create new commands:**
  - For one-time use functionality
  - When Page Object methods are more appropriate
  - When functionality is too simple to warrant a command

- **Best practices:**
  - Document all custom commands
  - Provide usage examples
  - Reference related ADRs
  - Identify unused commands for cleanup
  - Use clear, descriptive command names

### Example

**Before (without documentation):**
- Developers guess which login command to use
- Commands are used incorrectly
- New commands are created unnecessarily
- Unused commands remain in codebase

**After (with documentation):**
```markdown
# Referência de Comandos Customizados

## cy.login()

**Quando usar:**
- ✅ Funcionalidades fiscais (NFe, NFCe, SPED, Sintegra)

**Exemplo:**
```javascript
cy.login(); // Para funcionalidades fiscais
cy.visit('/');
```

**ADR relacionada:** ADR-0004
```

### Related ADRs

- ADR-0004: Use cy.session for Login Persistence (login commands)
- ADR-0002: Use Page Object Pattern (commands complement Page Objects)
- ADR-0003: Separate Locators from Page Objects (commands use locators)

