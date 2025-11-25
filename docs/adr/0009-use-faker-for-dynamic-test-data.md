# ADR-0009: Use Faker for Dynamic Test Data

## Status
Accepted

## Context

When using static test data (fixtures or hardcoded values), several problems arise:

**Problems with static test data:**
- Static data causes conflicts (e.g., duplicate CPF/CNPJ)
- Fixed data doesn't cover scenario variations
- Difficult to run tests in parallel
- Static data doesn't reflect real-world data
- Difficult maintenance when data changes
- Limited test coverage

**Previous situation:**
- Hardcoded data in tests
- Fixtures with fixed data
- Conflicts in parallel executions
- Unrealistic data

**Need:**
- Unique data for each execution
- Realistic and varied data
- Support for parallel executions
- Less maintenance
- Better test coverage

## Decision

We will use Faker.js (`@faker-js/faker`) to generate dynamic test data through centralized factory functions.

**Implementation in this project:**

1. **Factory Structure:**
   ```
   cypress/support/factory/
   └── generateRandomData.js  # Centralized factory functions
   ```

2. **Available Factory Functions:**
   - `generateRandomCustomer(tipo)`: Customer (Physical/Legal)
   - `generateRandomProduct()`: Product
   - `generateRandomDadosOrcamento()`: Budget data
   - `generateRandomDadosOrcamentoProduto()`: Budget product
   - `gerarFornecedorAleatorio()`: Supplier
   - `generateRandomContact()`: Contact

3. **Usage in Specs:**
   ```javascript
   import { generateRandomCustomer } from '../../support/factory/generateRandomData';
   
   it('Realizar cadastro de cliente', () => {
     const cliente = generateRandomCustomer(); // Dynamic data
     ClientePage.preencherCamposCliente(cliente);
     ClientePage.cadastrar();
   });
   ```

4. **Integration with Validators:**
   - CPF: `cpf-cnpj-validator` (validation)
   - CNPJ: `cpf-cnpj-validator` (validation)
   - Faker data: names, addresses, emails, etc.

## Consequences

### Positive

1. **Isolation:**
   - Unique data for each execution
   - Avoids conflicts in parallel executions
   - Independent tests
   - Fewer failures due to duplicate data

2. **Variety:**
   - Varied data for each execution
   - Better test coverage
   - More robust tests
   - Realistic data

3. **Maintainability:**
   - Centralized factory
   - Easy to add new types
   - Function reuse
   - Less duplication

4. **Realism:**
   - Data close to real-world
   - Valid names, addresses, emails
   - Proper formatting
   - Validations pass

### Negative

1. **Complexity:**
   - Requires Faker knowledge
   - Factory needs maintenance
   - More code to manage

2. **Dependency:**
   - External dependency (`@faker-js/faker`)
   - May break with updates
   - Requires maintenance

3. **Debugging:**
   - Different data each execution
   - May make reproduction difficult
   - Logs need to include generated data

4. **Performance:**
   - Data generation has overhead
   - May be slower than fixtures
   - Minimal impact in practice

### Risks

1. **Invalid Data:**
   - Faker may generate invalid data
   - **Mitigation**: Validation with libraries (CPF/CNPJ)
   - **Mitigation**: Validation tests

2. **Inconsistency:**
   - Data may not be consistent
   - **Mitigation**: Centralized factory
   - **Mitigation**: Clear documentation

3. **Faker Version:**
   - API changes may break
   - **Mitigation**: Fixed versioning
   - **Mitigation**: Regression tests

### Notes

- **When to use:**
  - Unique data is necessary
  - Parallel executions
  - Realistic data is important
  - Variety of scenarios

- **When NOT to use:**
  - Specific data is necessary
  - Regression tests with fixed data
  - Critical performance

- **Best practices observed:**
  - Centralized factory
  - Validation of critical data (CPF/CNPJ)
  - Specific functions per entity type
  - Optional parameters for variations
  - Clear documentation

### Example

**Before (static data):**
```javascript
it('Realizar cadastro de cliente', () => {
  const cliente = {
    nome: 'João Silva',
    cpf: '12345678900', // ❌ May cause conflict
    cep: '01310-100',
    endereco: 'Avenida Paulista',
    // ... fixed data
  };
  ClientePage.preencherCamposCliente(cliente);
  ClientePage.cadastrar();
});
```

**After (dynamic data with Faker):**
```javascript
import { generateRandomCustomer } from '../../support/factory/generateRandomData';

it('Realizar cadastro de cliente', () => {
  const cliente = generateRandomCustomer(); // ✅ Unique data each execution
  ClientePage.preencherCamposCliente(cliente);
  ClientePage.cadastrar();
});
```

**Factory Implementation:**
```javascript
const { faker } = require('@faker-js/faker');
const { cpf, cnpj } = require('cpf-cnpj-validator');

const generateRandomCustomer = (tipo = 'FISICA') => {
  const base = {
    pessoa: tipo,
    nome: faker.person.fullName(), // ✅ Realistic name
    cep: faker.location.zipCode('#####-###'), // ✅ Formatted CEP
    endereco: faker.location.streetAddress(),
    numero: faker.number.int({ min: 1, max: 9999 }),
    complemento: faker.location.secondaryAddress(),
    bairro: faker.location.city(),
    cidade: 'SAO PAULO - SP',
    observacao: faker.lorem.sentence()
  };

  if (tipo === 'JURIDICA') {
    return {
      ...base,
      cnpj: gerarCNPJValido(), // ✅ Valid CNPJ
      inscricaoEstadual: faker.number.int({ min: 100000, max: 999999 }).toString(),
      inscricaoMunicipal: faker.number.int({ min: 10000, max: 99999 }).toString(),
      razaoSocial: `${base.nome} LTDA`
    };
  }

  return {
    ...base,
    cpf: generateValidCPF(), // ✅ Valid CPF
    inscricaoEstadual: faker.number.int({ min: 100000, max: 999999 }).toString(),
    rg: faker.string.numeric(9)
  };
};
```

### Implementation Details

**Factory Structure:**
- Single file: `cypress/support/factory/generateRandomData.js`
- Functions exported via `module.exports`
- Import in specs: `import { functionName } from '../../support/factory/generateRandomData'`

**Types of Generated Data:**
- **People**: `faker.person.fullName()`
- **Addresses**: `faker.location.streetAddress()`, `faker.location.zipCode()`
- **Numbers**: `faker.number.int()`, `faker.number.float()`
- **Text**: `faker.lorem.sentence()`, `faker.lorem.sentences()`
- **Commerce**: `faker.commerce.productName()`, `faker.commerce.price()`
- **Internet**: `faker.internet.email()`
- **Dates**: `faker.date.soon()`

**Data Validation:**
- CPF: `cpf-cnpj-validator` to generate valid CPFs
- CNPJ: `cpf-cnpj-validator` to generate valid CNPJs
- Formatting: specific patterns (CEP, phone, etc.)

**Optional Parameters:**
- `generateRandomCustomer(tipo)`: accepts 'FISICA' or 'JURIDICA'
- Functions can have parameters for variations

**Use Cases:**
- Customer registration (Physical/Legal)
- Product registration
- Supplier registration
- Budget creation
- Contact registration

### Related ADRs

- ADR-0002: Use Page Object Pattern (dynamic data used in Page Objects)
- ADR-0006: Mandatory Documentation for New Tests (factory should be documented)
- ADR-0007: Separate Specs by Functionality and Type (dynamic data used in separated specs)

