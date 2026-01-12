# Arquitetura de Teste: SPED - Inventário Base

**Arquivo de Spec:** `cypress/e2e/sped/sped-inventario.spec.js`  
**Page Object:** `cypress/support/pages/Sped/SpedInventarioPage.js`  
**Locator:** `cypress/support/locators/Sped/SpedInventarioLocators.js`  

## 1. Objetivo
Validar a funcionalidade de "Inventário Base" no módulo SPED, garantindo que o usuário consiga acessar a tela, preencher a data de referência, e interagir com as opções de download de modelo e upload de arquivo.

## 2. Contexto e Dependências
- **Módulo**: Fiscal / SPED
- **Funcionalidade**: Inventário Base
- **Dependências de Dados**:
  - Login com usuário fiscal (`cy.login()`)
  - Arquivo `.xlsx` para teste de upload (simulado)

## 3. Estrutura do Teste
O teste cobre os seguintes cenários:
1. **Validação de Acesso**: Verifica se a tela carrega corretamente e se os elementos principais estão visíveis.
2. **Preenchimento de Data**: Valida o input de data.
3. **Download**: Verifica se o botão de download possui o link correto.
4. **Upload**: Simula o upload de um arquivo de inventário.

## 4. Padrões e Boas Práticas (ADRs)
- **Page Object Pattern (ADR-0002)**: Lógica de interação encapsulada em `SpedInventarioPage`.
- **Locators Separados (ADR-0003)**: Seletores centralizados em `SpedInventarioLocators`.
- **Login Fiscal (ADR-0004)**: Uso de `cy.login()` para autenticação com permissões fiscais.
- **Tags (ADR-0010)**: Uso de `@sped`, `@inventario`, `@regressivo`.

## 5. Relacionamentos
- **Documentações Relacionadas**:
  - [SPED Configurações](./architecture-sped-configuracoes.md)
  - [SPED Gerar Arquivo](./architecture-sped-gerar-arquivo.md)

## 6. Fluxos Críticos
- O upload é feito através de um input hidden manipulado por JavaScript. O teste utiliza `selectFile` com `{ force: true }` para contornar a visibilidade.
- O download é validado pela verificação do atributo `href` para evitar downloads desnecessários durante a execução do teste.

