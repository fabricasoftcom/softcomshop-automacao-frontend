# Arquitetura de Teste: NF-e - Inutilizar

**Arquivo de Spec:** `cypress/e2e/nfe/nfe-inutilizar.spec.js`  
**Page Object:** `cypress/support/pages/Nfe/NfeInutilizarPage.js`  
**Locator:** `cypress/support/locators/Nfe/NfeInutilizarLocators.js`  

## 1. Objetivo
Validar a funcionalidade de "Inutilizar Faixas da NFE", garantindo que o usuário consiga acessar a tela e visualizar o formulário de inutilização de faixas de numeração da NF-e.

## 2. Contexto e Dependências
- **Módulo**: Fiscal / NF-e
- **Funcionalidade**: Inutilização de faixas de numeração da NF-e
- **Dependências de Dados**:
  - Login com usuário fiscal (`cy.login()`)

## 3. Estrutura do Teste
O teste cobre os seguintes cenários:
1. **Validação de Acesso**: Verifica se a tela carrega corretamente e se o formulário de inutilização está presente.

## 4. Padrões e Boas Práticas (ADRs)
- **Page Object Pattern (ADR-0002)**: Lógica de interação encapsulada em `NfeInutilizarPage`.
- **Locators Separados (ADR-0003)**: Seletores centralizados em `NfeInutilizarLocators`.
- **Login Fiscal (ADR-0004)**: Uso de `cy.login()` para autenticação com permissões fiscais.
- **Tags (ADR-0010)**: Uso de `@nfe`, `@inutilizar`, `@regressivo`.

## 5. Relacionamentos
- **Documentações Relacionadas**:
  - [NF-e Download XML](./architecture-nfe-download-xml.md)
  - [NF-e Configurações](./architecture-nfe-configuracoes.md)
  - [NFC-e Inutilizar](./architecture-nfce-inutilizar.md)

## 6. Fluxos Críticos
- A tela possui um formulário colapsável que pode ser expandido para adicionar inutilização de faixa.
- O formulário contém campos para série, número inicial, número final e justificativa.

