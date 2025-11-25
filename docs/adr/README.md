# Architecture Decision Records (ADR)

This directory contains Architecture Decision Records (ADR) for this project. ADRs document important architectural decisions, their context, and consequences.

## What are ADRs?

Architecture Decision Records are a way to capture important architectural decisions along with their context and consequences. They help teams understand why certain decisions were made and provide a historical record of the project's evolution.

## ADR Format

Each ADR follows this structure:
- **Status**: Proposed | Accepted | Deprecated | Superseded
- **Context**: The issue motivating this decision
- **Decision**: The change that we're proposing or have agreed to implement
- **Consequences**: What becomes easier or more difficult to do and any risks introduced

## Index

### ADR-0001: Record Architecture Decisions
**Status**: Accepted  
**Date**: 2024  
**Summary**: Decision to use ADRs to document architectural decisions in this project.

[View ADR-0001](./0001-record-architecture-decisions.md)

### ADR-0002: Use Page Object Pattern
**Status**: Accepted  
**Date**: 2024  
**Summary**: Decision to use Page Object Pattern to abstract UI interactions and improve test maintainability.

[View ADR-0002](./0002-use-page-object-pattern.md)

### ADR-0003: Separate Locators from Page Objects
**Status**: Accepted  
**Date**: 2024  
**Summary**: Decision to separate CSS/XPath selectors from Page Objects into dedicated Locator files for better maintainability.

[View ADR-0003](./0003-separate-locators-from-page-objects.md)

### ADR-0004: Use cy.session for Login Persistence
**Status**: Accepted  
**Date**: 2024  
**Summary**: Decision to use cy.session to cache and reuse login sessions across tests, significantly improving test execution performance.

[View ADR-0004](./0004-use-cy-session-for-login-persistence.md)

### ADR-0005: Use Allure for Test Reporting
**Status**: Accepted  
**Date**: 2024  
**Summary**: Decision to use Allure Framework for generating rich HTML test reports with evidence, history, and CI/CD integration.

[View ADR-0005](./0005-use-allure-for-test-reporting.md)

### ADR-0006: Mandatory Documentation for New Tests
**Status**: Accepted  
**Date**: 2024  
**Summary**: Decision to make documentation mandatory for all new tests, ensuring consistency, better onboarding, and easier maintenance.

[View ADR-0006](./0006-mandatory-documentation-for-new-tests.md)

### ADR-0007: Separate Specs by Functionality and Type
**Status**: Accepted  
**Date**: 2024  
**Summary**: Decision to separate test specs by functionality (listing vs registration) and by type/variant, improving maintainability, organization, and enabling selective execution.

[View ADR-0007](./0007-separate-specs-by-functionality-and-type.md)

### ADR-0008: Use Page Object Hierarchy
**Status**: Accepted  
**Date**: 2024  
**Summary**: Decision to use Page Object hierarchy with base classes and specific classes that inherit from the base, reducing code duplication and improving maintainability for modules with multiple variants.

[View ADR-0008](./0008-use-page-object-hierarchy.md)

### ADR-0009: Use Faker for Dynamic Test Data
**Status**: Accepted  
**Date**: 2024  
**Summary**: Decision to use Faker.js to generate dynamic test data through centralized factory functions, avoiding data conflicts, supporting parallel executions, and making tests more robust and realistic.

[View ADR-0009](./0009-use-faker-for-dynamic-test-data.md)

### ADR-0010: Use Tags for Test Filtering
**Status**: Accepted  
**Date**: 2024  
**Summary**: Decision to use @cypress/grep plugin with tags for selective test execution, improving organization, reducing execution time, and enabling flexible CI/CD pipelines.

[View ADR-0010](./0010-use-tags-for-test-filtering.md)

### ADR-0011: Use Conditional Intercepts
**Status**: Accepted  
**Date**: 2024  
**Summary**: Decision to use conditional intercepts with boolean flags to track if requests were intercepted before waiting, avoiding unnecessary timeouts and making tests more robust.

[View ADR-0011](./0011-use-conditional-intercepts.md)

---

## How to Create a New ADR

1. Create a new file following the naming convention: `XXXX-descriptive-title.md`
2. Use the next sequential number (e.g., if the last ADR is 0005, create 0006)
3. Follow the template structure (Status, Context, Decision, Consequences)
4. Update this README with the new ADR entry
5. Reference the ADR in related code and documentation when relevant

## References

- [Michael Nygard's Article on ADRs](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR GitHub Organization](https://adr.github.io/)

