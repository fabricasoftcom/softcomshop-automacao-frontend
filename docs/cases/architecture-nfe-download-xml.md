# Arquitetura de Teste: NF-e - Download XML

**Arquivo de Spec:** `cypress/e2e/nfe/nfe-download-xml.spec.js`  
**Page Object:** `cypress/support/pages/Nfe/NfeDownloadXmlPage.js`  
**Locator:** `cypress/support/locators/Nfe/NfeDownloadXmlLocators.js`  

## 1. Objetivo
Validar a funcionalidade de "Download do XML da NF-e", garantindo que o usuário consiga acessar a tela, preencher o formulário de pesquisa e realizar o download do XML das notas fiscais.

## 2. Contexto e Dependências
- **Módulo**: Fiscal / NF-e
- **Funcionalidade**: Download de XMLs de NF-e
- **Dependências de Dados**:
  - Login com usuário fiscal (`cy.login()`)

## 3. Estrutura do Teste
O teste cobre os seguintes cenários:
1. **Validação de Acesso**: Verifica se a tela carrega corretamente com todos os elementos principais.
2. **Preenchimento de Formulário**: Valida o preenchimento dos campos de período e número da nota.

## 4. Padrões e Boas Práticas (ADRs)
- **Page Object Pattern (ADR-0002)**: Lógica de interação encapsulada em `NfeDownloadXmlPage`.
- **Locators Separados (ADR-0003)**: Seletores centralizados em `NfeDownloadXmlLocators`.
- **Login Fiscal (ADR-0004)**: Uso de `cy.login()` para autenticação com permissões fiscais.
- **Tags (ADR-0010)**: Uso de `@nfe`, `@download-xml`, `@regressivo`.

## 5. Relacionamentos
- **Documentações Relacionadas**:
  - [NF-e Inutilizar](./architecture-nfe-inutilizar.md)
  - [NF-e Configurações](./architecture-nfe-configuracoes.md)
  - [NFC-e Download XML](./architecture-nfce-download-xml.md)

## 6. Fluxos Críticos
- O formulário possui campos para período (date range picker), número da nota e chave de acesso.
- É necessário fechar o datepicker antes de interagir com outros campos.
- O download pode ser realizado por período, número da nota ou chave de acesso.

