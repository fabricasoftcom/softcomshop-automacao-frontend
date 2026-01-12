# Arquitetura de Teste: NF-e - Configurações

**Arquivo de Spec:** `cypress/e2e/nfe/nfe-configuracoes.spec.js`  
**Page Object:** `cypress/support/pages/Nfe/NfeConfiguracoesPage.js`  
**Locator:** `cypress/support/locators/Nfe/NfeConfiguracoesLocators.js`  

## 1. Objetivo
Validar a funcionalidade de "Configurações da NF-e", garantindo que o usuário consiga acessar a tela e visualizar todas as seções principais: Ambiente NFe, Nome utilizado na Nota Fiscal, Nome utilizado no Destinário, ICMS, Contingência, Exibir tipo de pagamento, Configuração do CFOP e Série NFe.

## 2. Contexto e Dependências
- **Módulo**: Fiscal / NF-e
- **Funcionalidade**: Configurações de Série e parâmetros da NF-e
- **Dependências de Dados**:
  - Login com usuário fiscal (`cy.login()`)

## 3. Estrutura do Teste
O teste cobre os seguintes cenários:
1. **Validação de Acesso**: Verifica se a tela carrega corretamente e se todas as seções estão visíveis.

## 4. Padrões e Boas Práticas (ADRs)
- **Page Object Pattern (ADR-0002)**: Lógica de interação encapsulada em `NfeConfiguracoesPage`.
- **Locators Separados (ADR-0003)**: Seletores centralizados em `NfeConfiguracoesLocators`.
- **Login Fiscal (ADR-0004)**: Uso de `cy.login()` para autenticação com permissões fiscais.
- **Tags (ADR-0010)**: Uso de `@nfe`, `@configuracoes`, `@regressivo`.

## 5. Relacionamentos
- **Documentações Relacionadas**:
  - [NF-e Inutilizar](./architecture-nfe-inutilizar.md)
  - [NF-e Download XML](./architecture-nfe-download-xml.md)
  - [NFC-e Configurações](./architecture-nfce-configuracoes.md)

## 6. Fluxos Críticos
- A tela possui múltiplas seções de configuração: Ambiente, Nomes, ICMS, Contingência, Pagamento, CFOP e Série.
- Cada seção possui elementos específicos que devem ser validados.
- A seção de Série possui tabela com listagem de séries cadastradas.

