# ADR-0016: Planning Before Implementation

## Status
Accepted

## Context

During development, we noticed that implementing features directly without planning led to:

**Problems without planning:**
- Multiple iterations and rework
- Unclear requirements leading to wrong implementations
- Missing edge cases and dependencies
- Time wasted on debugging and fixing
- Solutions that didn't fully meet requirements
- Need to refactor after initial implementation

**Previous situation:**
- Direct implementation without clarification
- Assumptions about requirements
- Missing dependencies and edge cases
- Multiple iterations to get it right
- Time-consuming debugging

**Successful experience:**
When we used the planning process (Plan mode → Agent mode) for implementing XML retry functionality:
- Requirements were clarified upfront through questions
- All files and changes were mapped before coding
- Dependencies were identified early
- Implementation was faster and more accurate
- First attempt was successful with minimal adjustments

**Need:**
- Standardized process for planning before implementation
- Requirement clarification before coding
- Better understanding of scope and dependencies
- Faster and more accurate implementations
- Reduced rework and iterations

## Decision

We will **always use planning before implementation** for complex features, following this process:

**Implementation Process:**

1. **Planning Phase (Plan Mode):**
   - Ask clarifying questions about requirements
   - Identify all files that need modification
   - Map dependencies between tasks
   - Create structured plan with todos
   - Get user approval before implementation

2. **Implementation Phase (Agent Mode):**
   - Execute plan step by step
   - Follow the structured todos
   - Validate each step
   - Test implementation

**When to Use Planning:**

✅ **Use planning for:**
- Complex features with multiple files
- Features with unclear requirements
- Features with dependencies
- Refactoring existing code
- New patterns or architectures
- Features affecting multiple modules

❌ **Skip planning for:**
- Simple bug fixes (single file, clear fix)
- Trivial changes (typos, formatting)
- Very straightforward tasks (add one line)

**Planning Process:**

1. **Ask Questions:**
   - Clarify requirements
   - Understand edge cases
   - Identify constraints
   - Multiple choice questions when appropriate

2. **Create Plan:**
   - List all files to modify
   - Identify dependencies
   - Create structured todos
   - Map implementation steps

3. **Get Approval:**
   - User reviews plan
   - User confirms approach
   - Adjust if needed

4. **Implement:**
   - Follow plan step by step
   - Validate each step
   - Test implementation

## Consequences

### Positive

1. **Faster Implementation:**
   - Requirements clarified upfront
   - No time wasted on wrong approach
   - First attempt is usually correct
   - Less debugging and rework

2. **Better Quality:**
   - All edge cases considered
   - Dependencies identified early
   - Complete solution from start
   - Less technical debt

3. **Clearer Communication:**
   - Requirements are explicit
   - Expectations are clear
   - User understands approach
   - Better alignment

4. **Reduced Risk:**
   - Fewer surprises during implementation
   - Dependencies mapped early
   - Edge cases considered
   - Less chance of missing requirements

5. **Better Documentation:**
   - Plan serves as documentation
   - Clear reasoning for decisions
   - Easier to review and maintain
   - Historical record

### Negative

1. **Time Overhead:**
   - Additional time for planning
   - May seem slower initially
   - Requires discipline to follow process

2. **Process Overhead:**
   - Need to create plan
   - Need to get approval
   - May slow down very simple tasks

### Risks

1. **Over-planning:**
   - May plan too much for simple tasks
   - **Mitigation**: Use judgment - skip planning for trivial tasks
   - **Mitigation**: Balance planning time with task complexity

2. **Not Following Process:**
   - Developers may skip planning
   - **Mitigation**: Make it part of workflow
   - **Mitigation**: Document in guidelines

3. **Planning Without Implementation:**
   - Plan created but not executed
   - **Mitigation**: Plan should lead directly to implementation
   - **Mitigation**: Plan should be actionable

## Notes

### Planning Checklist

**Before Implementation:**
- [ ] Requirements clarified?
- [ ] All files identified?
- [ ] Dependencies mapped?
- [ ] Edge cases considered?
- [ ] Plan approved by user?
- [ ] Todos created?

**During Implementation:**
- [ ] Following plan step by step?
- [ ] Validating each step?
- [ ] Testing implementation?
- [ ] Updating todos?

### Example: XML Retry Implementation

**Planning Phase:**
1. Asked questions:
   - Max attempts? (Answer: Unlimited)
   - How to list XMLs? (Answer: cy.task)
   - Avoid repetition? (Answer: Yes)

2. Created plan:
   - Add cy.task to cypress.config.js
   - Create retry method in CompraXmlPage.js
   - Modify importarNFePorXML to use retry
   - Adjust anexarArquivoXML to avoid duplicates

3. Got approval and implemented

**Result:**
- First implementation was successful
- Test passed on first run
- Minimal adjustments needed
- Faster than direct implementation

### When to Skip Planning

**Skip planning for:**
- Single line changes
- Obvious bug fixes
- Formatting changes
- Simple refactoring (rename variable)
- Adding one method to existing class

**Use planning for:**
- Multiple file changes
- New patterns
- Complex logic
- Unclear requirements
- Features with dependencies

### Planning Tools

**In Cursor:**
- Use Plan mode to create structured plan
- Use Agent mode to execute plan
- Use todos to track progress
- Use questions to clarify requirements

**Plan Structure:**
- Overview: High-level description
- Todos: Step-by-step tasks
- Dependencies: Task relationships
- Files: List of files to modify

## Mode Selection Guide

**When implementing features, use this guide to select the appropriate mode:**

### Use Plan Mode When:

✅ **Complex features:**
- Multiple files need modification (3+ files)
- Features affecting multiple modules
- New patterns or architectures
- Significant refactoring

✅ **Unclear requirements:**
- Requirements are ambiguous or incomplete
- Need to clarify edge cases
- Multiple possible approaches
- User needs to make decisions

✅ **Dependencies:**
- Tasks depend on each other
- Need to identify dependencies first
- Sequential implementation required
- Risk of breaking existing code

✅ **Examples:**
- "Implement retry mechanism for XML import"
- "Refactor Page Object hierarchy"
- "Add new test suite with multiple specs"
- "Create new module with multiple components"

### Use Agent Mode When:

✅ **Simple tasks:**
- Single file modification
- Clear, straightforward fix
- Obvious solution
- No ambiguity

✅ **Direct implementation:**
- Plan already exists and approved
- Following existing pattern
- Adding simple method to existing class
- Trivial changes (typos, formatting)

✅ **Examples:**
- "Fix typo in line 42"
- "Add validation method to existing Page Object"
- "Update locator selector"
- "Execute approved plan"

### Use Ask Mode When:

✅ **Consultation only:**
- Questions about existing code
- Understanding how something works
- Reviewing implementation
- Clarifying ADRs or patterns
- No code changes needed

✅ **Examples:**
- "How does the retry mechanism work?"
- "What ADR should I follow for this?"
- "Explain this code pattern"
- "Review this implementation"

### Decision Flow:

```
Start → Is it a question/consultation only?
  │
  ├─ YES → Use Ask Mode
  │
  └─ NO → Is it a complex feature?
      │
      ├─ YES → Use Plan Mode → Get approval → Use Agent Mode
      │
      └─ NO → Is there an approved plan?
          │
          ├─ YES → Use Agent Mode
          │
          └─ NO → Is it a simple task?
              │
              ├─ YES → Use Agent Mode
              │
              └─ NO → Use Plan Mode → Get approval → Use Agent Mode
```

### Quick Reference Table:

| Situation | Mode | Reason |
|-----------|------|--------|
| Complex feature (3+ files) | Plan → Agent | Need planning first |
| Unclear requirements | Plan → Agent | Need clarification |
| Multiple dependencies | Plan → Agent | Need to map dependencies |
| Simple bug fix (1 file) | Agent | Direct implementation |
| Typo/formatting | Agent | Trivial change |
| Approved plan exists | Agent | Execute plan |
| Question only | Ask | No changes needed |
| Review code | Ask | Consultation |
| Understand pattern | Ask | Learning |

### Automatic Mode Suggestion:

When you receive a task, evaluate:
1. **Complexity**: How many files? How complex is the logic?
2. **Clarity**: Are requirements clear? Any ambiguity?
3. **Dependencies**: Are there dependencies to consider?
4. **Type**: Is it implementation, consultation, or execution?

Based on evaluation:
- **High complexity + Unclear → Plan Mode**
- **Low complexity + Clear → Agent Mode**
- **Question only → Ask Mode**
- **Plan exists → Agent Mode**

## Related ADRs

- **ADR-0014**: Standardized Architectural Documentation Process - Similar process for documentation
- **ADR-0013**: Continuous Validation Checklist - Validation during implementation
- **ADR-0006**: Mandatory Documentation for New Tests - Documentation process

## References

- Experience from XML retry implementation (2025-12-12)
- Plan mode → Agent mode workflow in Cursor
- "Measure twice, cut once" principle

