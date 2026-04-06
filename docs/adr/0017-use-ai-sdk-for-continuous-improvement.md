# ADR-0017: Use AI SDK for Continuous Improvement

## Status
Accepted

## Context

The test automation project has grown to include many specs, Page Objects, locators, and extensive documentation (ADRs, architecture docs, guides). Maintaining consistency, identifying flaky tests, and generating new test scenarios from business rules require continuous effort. Manual analysis of rules and test results is time-consuming and can miss patterns.

**Needs:**
- Systematic analysis of project rules (architeture.mdc, ADRs, guides) to find redundancies, gaps, and conflicts
- Generation of test scenarios from business rules before implementation, ensuring coverage and alignment with patterns
- Detection of flaky tests and bottlenecks from Allure results and spec code, with actionable suggestions
- Output that can be validated by a human and then executed by the Cursor Agent (or developer) without re-interpreting

**Decision:** Introduce an **AI Toolkit** (Node.js scripts using Vercel AI SDK + OpenAI) that runs outside Cypress, reads project artifacts, and produces reports with a **Cursor-ready** section: structured actions that the Cursor Agent can execute after human approval.

## Decision

We will **use the AI SDK (Vercel) with OpenAI** to support continuous improvement of the automation suite through three scripts:

1. **`npm run ai:rules`** – Analyzes architeture.mdc, ADRs, and key guides. Produces a report with redundancies, gaps, conflicts, and improvements, plus a "Cursor-ready" section with concrete actions (edit/create files) to apply the suggestions.

2. **`npm run ai:scenarios`** – Accepts a business-rules file (e.g. `ai-toolkit/inputs/regras-<funcionalidade>.md`) and optionally a reference spec. Generates structured test scenarios (positive, negative, edge) and Cursor-ready actions to create spec, Page Object, locators, and documentation. The first action is always "explore screen autonomously" so locators are validated against the real DOM (ADR-0015).

3. **`npm run ai:flaky`** – Reads Allure results and spec code, identifies flaky candidates and anti-patterns (e.g. `cy.wait(n)`), and produces corrections as Cursor-ready actions (with current vs suggested code when applicable).

**Pipeline:** Generate (script) → Validate (human reviews report, marks actions as APROVADO/REJEITADO) → Execute (developer pastes approved block into Cursor Agent: "Implemente as ações aprovadas abaixo").

**Constraints:**
- All scripts require `OPENAI_API_KEY` in `.env` (not committed).
- Reports are written to `ai-reports/`. No script modifies code automatically; the human always approves before execution.
- Locators suggested by the scenario generator are estimates; exploration (Ação 0) remains mandatory for real selectors.

## Consequences

**Positive:**
- Rules stay consistent and up-to-date through periodic analysis and applied suggestions.
- New tests can be designed from business rules first, then implemented by Cursor following existing patterns.
- Flaky tests and anti-patterns are surfaced with concrete fixes, reducing manual investigation.
- Cursor-ready format reduces the step from "what to do" to "doing it" (copy-paste into Agent mode).

**Negative:**
- Dependency on OpenAI API and per-run cost (estimated on the order of a few cents per run).
- Scripts and prompts need maintenance if project structure or conventions change.

**References:**
- [AI Toolkit README](../../ai-toolkit/README.md)
- ADR-0015 (locators validated in real DOM) – respected by scenario generator via "explore screen" action
- ADR-0016 (planning before implementation) – AI Toolkit supports planning by generating scenarios and actions before coding
