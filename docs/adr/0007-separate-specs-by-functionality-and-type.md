# ADR-0007: Separate Specs by Functionality and Type

## Status
Accepted

## Context

In large test suites, having all tests in a single file or mixing different functionalities/types leads to several problems:

**Problems without separation:**
- Large files with multiple responsibilities
- Difficulty locating specific tests
- Execution of all tests when only one type is needed
- Difficult maintenance in large files
- Difficulty running only listing or only registration tests
- Mixing different types/variants in the same file
- Lack of clear organization
- Hard to scale and extend

**Previous situation:**
- One file for entire module
- Listing and registration in same file
- Different types/variants in same file
- Large files difficult to maintain
- Always execute all tests

**Need:**
- Clear separation by functionality
- Separation by type/variant when applicable
- Smaller, focused files
- Easier selective execution
- Better organization and maintenance

## Decision

We will separate specs by functionality and by type/variant when applicable.

**Separation patterns:**

1. **Separation by functionality:**
   - Listing and registration in separate files
   - Examples:
     - `cadastro-cliente.spec.js` vs `listagem-clientes.spec.js`
     - `cadastro-venda.spec.js` vs `listagem-vendas.spec.js`
     - `cadastro-producao.spec.js` vs `producao-listagem.spec.js`
     - `cadastro-movimentacoes.spec.js` vs `listagem-movimentacoes.spec.js`
     - `orcamento-cadastro.spec.js` vs `orcamento-listagem.spec.js`

2. **Separation by type/variant:**
   - Multiple significant variants in separate files
   - Examples:
     - NFe: `cadastro-nfe.spec.js` (general), `cadastro-nfe-normal.spec.js`, `cadastro-nfe-devolucao.spec.js`, `cadastro-nfe-ajuste.spec.js`, `cadastro-nfe-complementar.spec.js`
     - Finance: `novaReceita.spec.js`, `novaDespesa.spec.js`, `editarReceita.spec.js`, `editarDespesa.spec.js`

3. **When NOT to separate:**
   - Single, simple functionality
   - Few related tests
   - Very similar variants

## Consequences

### Positive

1. **Maintenance:**
   - Smaller, focused files
   - Easy to locate specific tests
   - Isolated changes by functionality/type
   - Fewer merge conflicts

2. **Selective Execution:**
   - Run only listing or only registration
   - Run only a specific type
   - Reduced execution time
   - Faster debugging

3. **Organization:**
   - Clear, predictable structure
   - Easy navigation
   - Better traceability
   - Easier onboarding

4. **Scalability:**
   - Easy to add new types/variants
   - Doesn't affect existing tests
   - Organized growth
   - Less coupling

5. **CI/CD:**
   - Parallel execution by functionality
   - Selective execution in PRs
   - Better load distribution
   - Isolated failures

### Negative

1. **Multiple Files:**
   - More files to manage
   - Possible setup duplication
   - Need for synchronization

2. **Complexity:**
   - Decision on when to separate
   - Pattern to follow
   - Documentation needed

3. **Overhead:**
   - More files to create
   - More documentation (ADR-0006)
   - More registrations in `specPattern`

### Risks

1. **Excessive Separation:**
   - Files too small
   - **Mitigation**: Clear guidelines on when to separate
   - **Mitigation**: Code review

2. **Insufficient Separation:**
   - Files too large
   - **Mitigation**: Clear guidelines
   - **Mitigation**: Periodic review

3. **Inconsistency:**
   - Different patterns in different modules
   - **Mitigation**: Clear documentation
   - **Mitigation**: Code review

### Notes

- **Separation should be used when:**
  - Module has both listing and registration
  - Module has multiple significant variants
  - File becomes too large (>300 lines)
  - Different test types have different setup
  - Selective execution is valuable

- **Separation should NOT be used when:**
  - Single, simple functionality
  - Very few tests (<5)
  - Variants are very similar
  - Separation adds more complexity than value

- **Best practices observed:**
  - Separate listing and registration when both exist
  - Separate by type when variants are significantly different
  - Keep related tests together
  - Use consistent naming patterns
  - Document separation rationale

### Example

**Before (without separation):**
```
cypress/e2e/vendas/vendas.spec.js
- Listing tests
- Registration tests
- Edit tests
- Delete tests
// Large file, difficult to maintain
```

**After (with separation by functionality):**
```
cypress/e2e/vendas/
├── listagem-vendas.spec.js      # Only listing
├── cadastro-venda.spec.js        # Only registration
// Smaller files, focused, easier to maintain
```

**Example NFe (separation by type):**
```
cypress/e2e/venda-nfcenfe/
├── cadastro-nfe.spec.js              # General validations
├── cadastro-nfe-normal.spec.js       # Only NFe Normal
├── cadastro-nfe-devolucao.spec.js    # Only NFe Devolução
├── cadastro-nfe-ajuste.spec.js       # Only NFe Ajuste
├── cadastro-nfe-complementar.spec.js  # Only NFe Complementar
├── listagem-nfe.spec.js              # Only listing
// Each type isolated, easy to run selectively
```

### Implementation Details

**Naming Convention:**
- Listing: `listagem-<modulo>.spec.js` or `<modulo>-listagem.spec.js`
- Registration: `cadastro-<modulo>.spec.js` or `<modulo>-cadastro.spec.js`
- Type-specific: `cadastro-<modulo>-<tipo>.spec.js`

**Separation Criteria:**
- **By functionality**: When module has both listing and registration
- **By type**: When module has 3+ significantly different variants
- **File size**: Consider separation when file exceeds 300 lines

**Registration in specPattern:**
- Each separated spec must be registered in `specPattern`
- Maintain logical order within module block
- Group related specs together

**Documentation:**
- Each separated spec must have architecture documentation (ADR-0006)
- Document separation rationale
- Update `docs/testes.md` for each spec

### Related ADRs

- ADR-0006: Mandatory Documentation for New Tests (each separated spec must be documented)
- ADR-0010: Use Tags for Test Filtering (tags complement separation for selective execution)

