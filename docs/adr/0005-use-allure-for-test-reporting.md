# ADR-0005: Use Allure for Test Reporting

## Status
Accepted

## Context

Cypress provides basic reporting capabilities (console output, screenshots on failure), but these are limited for comprehensive test analysis and sharing:

**Problems with default Cypress reporting:**
- Basic console output only
- Screenshots only on failure
- No execution history or trends
- Difficult to share results with stakeholders
- Limited metadata (no structured suites, steps, attachments)
- Poor integration with CI/CD for automatic publication
- Hard to analyze failures and identify patterns
- No visual representation of test execution

**Previous situation:**
- Reports only in terminal console
- Screenshots only when tests fail
- No execution history
- Difficult to share results
- Manual trend analysis
- Limited evidence collection

**Need:**
- Rich HTML reports with evidence
- Execution history and trends
- Structured metadata (suites, steps, attachments)
- CI/CD integration
- Easy result sharing
- Better failure analysis

## Decision

We will use **Allure Framework** for test reporting.

**Implementation in this project:**

1. **Plugins Installed:**
   - `allure-cypress: ^3.0.2` - Main integration
   - `@shelex/cypress-allure-plugin: ^2.40.2` - Additional plugin
   - `allure-commandline: ^2.32.0` - CLI for report generation

2. **Configuration in `cypress.config.js`:**
   ```javascript
   const { allureCypress } = require("allure-cypress/reporter");
   
   setupNodeEvents(on, config) {
     allureCypress(on, config);
     return config;
   }
   ```

3. **Import in `cypress/support/e2e.js`:**
   ```javascript
   import 'allure-cypress';
   import '@shelex/cypress-allure-plugin';
   ```

4. **npm Scripts (`package.json`):**
   - `npm run e2e`: Runs Cypress with Allure enabled (`--env allure=true`)
   - `npm run report:allure`: Generates and opens HTML report
   - `npm run test:allure`: Runs tests and generates report

5. **Directory Structure:**
   - `allure-results/`: Raw results from each execution
   - `allure-report/`: Generated HTML report
   - CI/CD integration for automatic publication

## Consequences

### Positive

1. **Rich Evidence:**
   - Automatic screenshots on failures
   - Cypress command logs
   - Metadata for each step
   - Custom attachments when needed
   - Video recordings (when enabled)

2. **History and Trends:**
   - Execution history maintained
   - Success/failure trends over time
   - Identification of flaky tests
   - Trend analysis capabilities

3. **Organization:**
   - Grouping by test suites
   - Detailed steps per test
   - Structured metadata (tags, descriptions)
   - Easy navigation

4. **Sharing:**
   - Shareable HTML reports
   - Automatic publication in CI/CD
   - Access via GitHub Pages (when configured)
   - Easy sharing with stakeholders

5. **CI/CD Integration:**
   - Automatic generation in pipelines
   - Publication as artifacts
   - History maintained across executions
   - Notifications with report links

6. **Analysis:**
   - Quick failure identification
   - Pattern analysis of failures
   - Execution time per test
   - Coverage statistics

### Negative

1. **Dependencies:**
   - Additional plugins to maintain
   - Requires `allure-commandline` installed
   - May break with Cypress updates

2. **Overhead:**
   - Report generation consumes time
   - Result files take disk space
   - Generation process can be slow for large suites

3. **Complexity:**
   - Initial setup requires configuration
   - Understanding of how it works
   - May add complexity to CI/CD

4. **Maintenance:**
   - Plugins need to be updated
   - Compatibility with Cypress versions
   - May require adjustments on updates

### Risks

1. **Compatibility:**
   - Plugins may become outdated
   - **Mitigation**: Keep plugins updated
   - **Mitigation**: Test after Cypress updates

2. **Performance:**
   - Report generation can be slow
   - **Mitigation**: Generate report only when needed
   - **Mitigation**: Clean old results regularly

3. **Disk Space:**
   - `allure-results` can grow large
   - **Mitigation**: Clean old results
   - **Mitigation**: Configure appropriate `.gitignore`

### Notes

- **Allure should be used when:**
  - Rich reporting is needed
  - Evidence collection is important
  - History and trends are valuable
  - CI/CD integration is required
  - Sharing results with stakeholders

- **Allure should NOT be used when:**
  - Simple console output is sufficient
  - Disk space is very limited
  - Report generation time is critical
  - Plugins are not maintained

- **Best practices observed:**
  - Generate reports only when needed
  - Clean old results regularly
  - Configure `.gitignore` for result directories
  - Use CI/CD for automatic publication
  - Document report generation process

### Example

**Before (without Allure):**
```
Terminal output:
✓ Test 1 passed
✗ Test 2 failed
  Screenshot: cypress/screenshots/test2.png
```

**After (with Allure):**
```
Allure Report HTML:
- Suite: Cadastro de Cliente
  - Test: Deve cadastrar cliente PF
    - Step: Login
    - Step: Navegar para cadastro
    - Step: Preencher formulário
    - Screenshot: [attachment]
    - Logs: [executed commands]
    - Duration: 15.2s
  - Test: Deve cadastrar cliente PJ
    - [complete details]
```

### Implementation Details

**Report Generation:**
- Results stored in `allure-results/` after each execution
- Report generated with: `allure generate allure-results --clean -o allure-report`
- Report opened with: `allure open allure-report`

**CI/CD Integration:**
- Results generated automatically in pipelines
- Published to GitHub Pages or artifacts
- History maintained across executions
- Accessible via web interface

**Metadata Captured:**
- Test suites and cases
- Execution steps
- Screenshots and attachments
- Command logs
- Execution duration
- Status (passed/failed/skipped)

### Related ADRs

- ADR-0004: Use cy.session for Login Persistence (session info captured in reports)

