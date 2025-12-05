# ADR-0015: Prioritize IDs and Context in Locators

## Status
Accepted

## Context

After implementing ADR-0003 (Separate Locators from Page Objects), we established where to store locators, but we encountered significant problems when creating locators during the implementation of purchase registration tests:

**Problems encountered:**

1. **Generic locators captured wrong elements:**
   - Selectors like `input[id^="auto_produto"]` captured hidden elements (`#produto_id`) before the visible field (`#auto_produto_id`)
   - Generic attribute selectors (`id^=`, `name*=`) were not specific enough
   - Tests failed because locators found incorrect or hidden elements

2. **IDs not used when available:**
   - Locators based on generic attributes (`input[placeholder*="Preço"]`) instead of unique IDs
   - Selectors by text (`:contains()`) are fragile and depend on translation
   - Performance impact: attribute selectors are slower than ID selectors

3. **Locators didn't reflect actual DOM structure:**
   - Locators assumed structure that didn't exist (`.panel_content_adicione_os_itens_na_compra`)
   - Selectors based on expected structure, not actual structure
   - Classes used didn't exist in the DOM (`.table-pagamentos` vs `tabela-pagamento`)

4. **Locators without modal context:**
   - Locators without context captured elements outside the modal
   - Example: `#btn-salvar` captured button from main page, not from modal
   - Lack of specificity caused clicks on wrong elements

5. **Incorrect class names:**
   - Locators used class names that didn't exist
   - Subtle differences (singular vs plural) caused failures
   - Names copied incorrectly or guessed instead of inspected

**Impact:**
- Multiple test failures requiring debugging
- Significant rework to fix locators
- Time wasted on troubleshooting incorrect selectors
- Tests became fragile and unreliable

**Need:**
- Clear rules for creating locators correctly
- Validation process before using locators
- Best practices based on real problems encountered
- Guidelines to prevent similar issues in the future

## Decision

We will **prioritize IDs and use context when creating locators**, following these critical rules:

**5 Critical Rules for Creating Locators:**

1. **ALWAYS inspect DOM before creating locators:**
   - Open browser and navigate to the screen
   - Use DevTools to inspect elements
   - Copy IDs and classes directly from DOM
   - Never assume DOM structure without inspection

2. **PRIORITIZE IDs over other selectors:**
   - IDs are unique and stable
   - IDs are faster than classes or attribute selectors
   - IDs don't depend on HTML structure
   - Always use IDs when available
   - Example: `#valor_unitario_comercial` is better than `input[placeholder*="Preço"]`

3. **USE context when necessary:**
   - Modals: `.modal #elemento`
   - Panels: `.painel #elemento`
   - Sections: `.secao #elemento`
   - Prevents capturing wrong elements when multiple similar elements exist

4. **VALIDATE locators before using:**
   - Test in browser console: `document.querySelector('seu-locator')`
   - Verify it finds the correct element
   - Verify it doesn't find incorrect elements
   - Test in actual test scenario if possible

5. **AVOID generic selectors:**
   - ❌ Don't use: `input[id^="auto"]` (too generic, may capture hidden elements)
   - ❌ Don't use: `input[placeholder*="Preço"]` (fragile, depends on text)
   - ❌ Don't use: `input[name*="quantidade"]` (not specific enough)
   - ✅ Use: `.modal #auto_produto_id` (specific ID with context)

**Implementation:**

1. **Locator Creation Process:**
   - Step 1: Open browser and navigate to screen
   - Step 2: Inspect element using DevTools
   - Step 3: Copy ID or class directly from DOM
   - Step 4: Add context if necessary (`.modal`, `.painel`)
   - Step 5: Validate in browser console
   - Step 6: Use in locator file

2. **Locator Format:**
   ```javascript
   // ✅ Good: ID with context
   modalCampoProduto: '.modal #auto_produto_id'
   modalCampoPreco: '.modal #valor_unitario_comercial'
   modalBtnAdicionar: '.modal #btn-adicionar'
   
   // ✅ Good: ID without context (when unique)
   campoFornecedor: '#auto_cliente_fornecedor_id'
   
   // ✅ Good: Class with context (when ID not available)
   tabelaItens: 'table.tabela-itens tbody tr[data-id]'
   
   // ❌ Bad: Generic selector
   campoProduto: 'input[id^="auto_produto"]'
   
   // ❌ Bad: Text-based selector
   campoPreco: 'input[placeholder*="Preço"]'
   
   // ❌ Bad: No context
   btnSalvar: '#btn-salvar'  // May capture wrong button
   ```

3. **Validation Checklist:**
   - [ ] Locator uses ID when available?
   - [ ] Locator has appropriate context (modal, panel)?
   - [ ] Locator was validated in browser?
   - [ ] Locator doesn't capture incorrect elements?
   - [ ] Locator is not too generic?

## Consequences

### Positive

1. **Reliability:**
   - Locators are more stable and less prone to breaking
   - Tests are more reliable and predictable
   - Fewer false positives/negatives

2. **Performance:**
   - ID selectors are faster than attribute or class selectors
   - Reduced test execution time
   - Better user experience during test development

3. **Maintainability:**
   - Easier to identify and fix locator issues
   - Clear process for creating new locators
   - Less debugging time when tests fail

4. **Developer Experience:**
   - Clear guidelines prevent common mistakes
   - Faster onboarding for new developers
   - Reduced frustration from test failures

5. **Code Quality:**
   - More specific and intentional locators
   - Better separation of concerns
   - Easier code reviews

### Negative

1. **Initial Time Investment:**
   - Requires more time to inspect DOM before creating locators
   - May seem slower initially compared to guessing selectors
   - Requires browser access during development

2. **Learning Curve:**
   - Developers need to learn the process
   - Requires discipline to follow rules
   - May need training for new team members

3. **Validation Overhead:**
   - Additional step of validating locators
   - May require browser testing before committing
   - Can slow down rapid prototyping

### Risks

1. **Not Following Rules:**
   - Developers may skip inspection step
   - May revert to old habits of guessing selectors
   - **Mitigation**: Include in code review checklist (ADR-0013)
   - **Mitigation**: Document in rules and guidelines

2. **Over-specification:**
   - Risk of creating too specific locators that break easily
   - **Mitigation**: Balance specificity with maintainability
   - **Mitigation**: Use context only when necessary

3. **DOM Changes:**
   - IDs may change if application is refactored
   - **Mitigation**: IDs are generally more stable than classes
   - **Mitigation**: Document locator dependencies

## Notes

### When to Use Context

**Use context when:**
- Multiple elements with same ID exist (different contexts)
- Element is inside a modal, panel, or specific section
- Element may appear in multiple places
- Specificity is needed to avoid ambiguity

**Don't use context when:**
- ID is unique across entire page
- Context adds unnecessary complexity
- Element appears only once

### Examples from Real Problems

**Problem 1: Generic Selector**
```javascript
// ❌ Before: Captured hidden element
campoProduto: 'input[id^="auto_produto"]'

// ✅ After: Specific ID with context
modalCampoProduto: '.modal #auto_produto_id'
```

**Problem 2: No ID Used**
```javascript
// ❌ Before: Text-based selector
campoPreco: 'input[placeholder*="Preço"]'

// ✅ After: Unique ID
modalCampoPreco: '.modal #valor_unitario_comercial'
```

**Problem 3: No Context**
```javascript
// ❌ Before: May capture wrong button
btnSalvar: '#btn-salvar'

// ✅ After: Context specifies modal
modalBtnAdicionar: '.modal #btn-adicionar'
```

**Problem 4: Wrong Class Name**
```javascript
// ❌ Before: Class doesn't exist
tabelaPagamentos: '.table-pagamentos tbody tr'

// ✅ After: Correct class from DOM
linhasPagamentos: 'table.tabela-pagamento tbody tr'
```

### Validation Process

1. **In Browser Console:**
   ```javascript
   // Test locator
   document.querySelector('.modal #auto_produto_id')
   
   // Verify it returns correct element
   // Verify it doesn't return null
   // Verify it doesn't return wrong element
   ```

2. **In Cypress Test:**
   ```javascript
   // Validate locator works
   cy.get(CadastroCompraLocators.modalCampoProduto)
     .should('be.visible')
     .should('have.attr', 'id', 'auto_produto_id')
   ```

### Related Best Practices

- **ADR-0003**: Separate Locators from Page Objects (where to store)
- **This ADR**: How to create locators correctly (best practices)
- **ADR-0013**: Continuous Validation Checklist (includes locator validation)

## Related ADRs

- **ADR-0003**: Separate Locators from Page Objects (complements this decision)
- **ADR-0013**: Continuous Validation Checklist (includes locator validation items)

## References

- `docs/referencias/aprendizagens-e-licoes.md` - Section "Lições Aprendidas: Problemas com Locators"
- `docs/cases/architecture-cadastro-compra-manual.md` - Section "Lições Aprendidas: Problemas com Locators"
- `docs/referencias/guia-decisoes-rapidas.md` - Section "Como criar locators corretos?"
- `.cursor/rules/architeture.mdc` - Section "3.5. Locators Best Practices"

