# Arquitetura: DRE - Demonstração do Resultado do Exercício

## Objetivo

Este documento descreve a arquitetura dos testes automatizados para a tela de **DRE (Demonstração do Resultado do Exercício)** do módulo Financeiro.

A DRE é um relatório financeiro que apresenta o resultado do exercício, incluindo:
- Total de Vendas
- Despesas e Receitas
- Lucro Líquido
- Balanço Patrimonial
- Contas a Receber (Vencido e A Vencer)

## Estrutura de Arquivos

```
cypress/
├── e2e/
│   └── financeiro/
│       └── dre.spec.js                    # Spec de testes
├── support/
│   ├── locators/
│   │   └── Financeiro/
│   │       └── DreLocators.js             # Locators da tela DRE
│   └── pages/
│       └── Financeiro/
│           └── DrePage.js                 # Page Object da tela DRE
```

## Imports e Dependências

### Spec (`dre.spec.js`)
```javascript
import DrePage from "../../support/pages/Financeiro/DrePage";
```

### Page Object (`DrePage.js`)
```javascript
import DreLocators from "../../locators/Financeiro/DreLocators";
import MenulateralFinanceiroPage from "../menulateral/MenulateralFinanceiroPage";
```

### Locators (`DreLocators.js`)
- Título: `h5:contains("DRE - Demonstração do Resultado do Exercício")`
- Campo Período: `#date_text`
- Botão Gerar PDF: `#gerar-pdf`
- Seções: `h4:contains("...")` para cada seção principal
- Tabelas: `.ibox-content:has(h4:contains("...")) table` (estrutura simplificada)

## Estrutura dos Testes

### Suite: Financeiro > DRE

**Tags:** `@financeiro`, `@dre`, `@regressivo`

**Login:** `cy.loginArmazenandoSessao()` (ADR-0004: Funcionalidades não-fiscais)

### Testes Implementados

1. **Deve exibir a tela de DRE com todos os elementos principais**
   - Valida título, campo de período, botão Gerar PDF
   - Valida todas as seções principais (Total Vendas, Despesas/Receitas, Lucro Líquido, Balanço Patrimonial, Contas a Receber)
   - Valida URL

2. **Deve exibir todas as seções do DRE**
   - Valida seção Total Vendas
   - Valida seção Despesas/Receitas (Despesas e Receitas)
   - Valida seção Lucro Líquido
   - Valida seção Balanço Patrimonial (Saldo Atual das Contas)
   - Valida seção Contas a Receber (Vencido e A Vencer)

3. **Deve exibir o botão Gerar PDF**
   - Clica no botão Gerar PDF
   - Valida que a requisição de download foi feita (intercept)

## Padrões e Boas Práticas

### ADR-0002: Page Object Pattern
- ✅ Todas as interações com a UI estão encapsuladas em `DrePage`
- ✅ Spec contém apenas lógica de teste, sem seletores CSS/XPath

### ADR-0003: Locators Separados
- ✅ Todos os seletores estão centralizados em `DreLocators.js`
- ✅ Nenhum seletor hardcoded no Page Object ou Spec

### ADR-0004: Session Persistence
- ✅ Usa `cy.loginArmazenandoSessao()` para funcionalidades não-fiscais
- ✅ Session ID: `'user_session'`

### ADR-0010: Tags para Filtragem
- ✅ Tags aplicadas: `@financeiro`, `@dre`, `@regressivo`

### ADR-0015: Priorização de IDs e Contexto
- ✅ Campo de período usa ID: `#date_text`
- ✅ Botão Gerar PDF usa ID: `#gerar-pdf`
- ✅ Seções usam texto com contexto: `h4:contains("...")`

### Navegação
- ✅ Acesso via menu lateral: `MenulateralFinanceiroPage.acessarDRE()`
- ✅ Método já existente no `MenulateralFinanceiroPage`

### Validações
- ✅ Validações de visibilidade para elementos principais
- ✅ Validação de URL para confirmar navegação
- ✅ Intercept de requisição HTTP para validar download de PDF

## Observações Técnicas

1. **Estrutura de Tabelas**: As tabelas estão dentro de containers `.ibox-content`, mas a estrutura HTML não permite seletores diretos simples. A validação foi simplificada para validar apenas as seções (h4) e a existência de tabelas na página.

2. **Campo de Período**: O campo `#date_text` é um datepicker que permite selecionar o período para visualização do DRE. Atualmente, os testes não incluem interação com o datepicker, apenas validam sua presença.

3. **Download de PDF**: A validação do download é feita interceptando a requisição HTTP e verificando o status code 200. Não é possível validar o conteúdo do PDF diretamente no Cypress sem plugins adicionais.

4. **Seções Dinâmicas**: As seções do DRE podem variar dependendo dos dados disponíveis. Os testes validam a presença das seções principais, mas não validam conteúdo específico das tabelas.

## Referências

- [ADR-0002: Page Object Pattern](../adr/0002-use-page-object-pattern.md)
- [ADR-0003: Separate Locators](../adr/0003-separate-locators-from-page-objects.md)
- [ADR-0004: Session Persistence](../adr/0004-use-cy-session-for-login-persistence.md)
- [ADR-0010: Tags for Test Filtering](../adr/0010-use-tags-for-test-filtering.md)
- [ADR-0015: Prioritize IDs and Context in Locators](../adr/0015-prioritize-ids-and-context-in-locators.md)

