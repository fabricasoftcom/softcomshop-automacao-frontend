# Arquitetura dos casos de teste: Importação de Compra pela Nuvem Fiscal

## Objetivo

Validar o fluxo completo de importação de compra através da Nuvem Fiscal, desde a listagem e filtro por tipo de manifestação até a finalização da importação com preenchimento de campos obrigatórios.

**Funcionalidades cobertas:**
- Listagem de documentos na Nuvem Fiscal
- Filtro por tipo de manifestação (Ciência da Operação)
- Importação de NFe para compra
- Preenchimento de natureza de operação
- Aplicação de vínculo fiscal para todos os itens
- Validação de importação bem-sucedida

**Cenários principais:**
- Importar compra filtrando por "Ciência da Operação"
- Preencher campos obrigatórios (Natureza e Vínculo Fiscal)
- Validar sucesso da importação

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/compras/importacao-compra-nuvem-fiscal.spec.js` - Teste de importação de compra pela Nuvem Fiscal

### Page Objects
- `cypress/support/pages/NuvemFiscal/NuvemFiscalListagemPage.js` - Interações com a listagem da Nuvem Fiscal
- `cypress/support/pages/NuvemFiscal/NuvemFiscalImportacaoPage.js` - Interações com a tela de importação

### Locators
- `cypress/support/locators/NuvemFiscal/NuvemFiscalListagemLocators.js` - Locators da listagem
- `cypress/support/locators/NuvemFiscal/NuvemFiscalImportacaoLocators.js` - Locators da tela de importação

---

## Imports e dependências

### Page Objects
```javascript
import MenulateralProdutoPage from '../../support/pages/menulateral/MenulateralProdutoPage';
import NuvemFiscalListagemPage from '../../support/pages/NuvemFiscal/NuvemFiscalListagemPage';
import NuvemFiscalImportacaoPage from '../../support/pages/NuvemFiscal/NuvemFiscalImportacaoPage';
```

### Locators
Os locators são importados dentro dos Page Objects:
- `NuvemFiscalListagemLocators` - Usado em `NuvemFiscalListagemPage`
- `NuvemFiscalImportacaoLocators` - Usado em `NuvemFiscalImportacaoPage`

### Commands
- `cy.loginArmazenandoSessao()` - Login com sessão persistente (ADR-0004)
- `cy.visit('/')` - Navegação para página inicial
- `MenulateralProdutoPage.acessarListagemNuvemFiscal()` - Acesso via menu lateral

---

## Estrutura do teste

### Suite: Importação de Compra pela Nuvem Fiscal

**Tags:** `['@compras', '@regressivo', '@nuvem-fiscal']` (ADR-0010)

#### `it('Deve importar compra pela Nuvem Fiscal filtrando por Ciência da Operação')`

**Fluxo completo:**

1. **Acesso:**
   - Realiza login com `cy.loginArmazenandoSessao()` (ADR-0004)
   - Acessa página inicial (`cy.visit('/')`)
   - Navega até Nuvem Fiscal via menu lateral

2. **Filtro e Pesquisa:**
   - Intercepta requisição GET para `/nuvemfiscal*`
   - Filtra por tipo de manifestação "Ciência da Operação"
   - Clica em "Pesquisar"
   - Aguarda carregamento e valida resposta 200
   - Verifica que há resultados na tabela

3. **Importação:**
   - Clica no botão de importar do primeiro item da lista
   - Intercepta requisição POST para `/nuvemfiscal/import-to-purchase*`

4. **Preenchimento de Campos Obrigatórios:**
   - Preenche campo "Natureza" com busca por "compra"
   - Seleciona "1102 - COMPRA PARA COMERCIALIZAÇÃO"
   - Preenche campo "Vínculo Fiscal" global com busca por "vinculo"
   - Seleciona "TESTE TABELA PRODUTO EMPRESA VINCULO FISCAL"
   - Clica em "Lançar Vinculo" para aplicar a todos os itens

5. **Finalização:**
   - Clica no botão "Importar"
   - Aguarda modal de carregamento desaparecer
   - Valida modal de sucesso "Pronto, tudo organizado."
   - Aguarda requisição de importação com status 200

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002): Interações encapsuladas em Page Objects
- ✅ **Separate Locators** (ADR-0003): Locators separados em arquivos específicos
- ✅ **Session Persistence** (ADR-0004): Usa `cy.loginArmazenandoSessao()` para login persistente
- ✅ **Tags for Filtering** (ADR-0010): Tags aplicadas no `describe` para filtragem
- ✅ **Conditional Intercepts** (ADR-0011): Intercepts para monitorar requisições

### Boas Práticas
- Aguarda carregamento antes de interagir com elementos
- Fecha alertas automaticamente se aparecerem
- Valida requisições HTTP com intercepts
- Usa métodos reutilizáveis nos Page Objects
- Aguarda autocomplete antes de selecionar opções

### Observações
- O teste depende de haver pelo menos um documento com "Ciência da Operação" na Nuvem Fiscal
- O vínculo fiscal "TESTE TABELA PRODUTO EMPRESA VINCULO FISCAL" deve existir no sistema
- A natureza "1102 - COMPRA PARA COMERCIALIZAÇÃO" deve estar cadastrada
- Timeout aumentado para requisição de importação (60s) devido ao processamento

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0011](../adr/0011-use-conditional-intercepts.md): Conditional Intercepts

### Documentação Relacionada
- `docs/cases/architecture-cadastro-compra-manual.md` - Cadastro de compra manual (compras podem ser cadastradas manualmente ou importadas da Nuvem Fiscal)
- `docs/cases/architecture-cadastro-compra.md` - Cadastro de compra via XML (cadastro de compra pode usar importação de NFe da Nuvem Fiscal)
- [Processo de Documentação](../referencias/processo-documentacao.md): Template e processo para documentação arquitetural

