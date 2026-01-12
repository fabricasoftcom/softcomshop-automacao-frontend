# Arquitetura de Teste: SPED - ICMS Ajuste Apuração

**Arquivo de Spec:** `cypress/e2e/sped/sped-icms-ajuste.spec.js`  
**Page Object:** `cypress/support/pages/Sped/SpedIcmsAjustePage.js`  
**Locator:** `cypress/support/locators/Sped/SpedIcmsAjusteLocators.js`  

## 1. Objetivo
Validar a funcionalidade de "ICMS Ajuste Apuração" no módulo SPED, garantindo que o usuário consiga acessar a listagem, navegar para o cadastro, preencher o formulário com os campos obrigatórios e opcionais, e cancelar o cadastro.

## 2. Contexto e Dependências
- **Módulo**: Fiscal / SPED
- **Funcionalidade**: ICMS Ajuste Apuração (E111)
- **Dependências de Dados**:
  - Login com usuário fiscal (`cy.login()`)
  - Campos obrigatórios: Tipo Ajuste, Valor Ajuste, Mês Referência
  - Campos opcionais: Data Referência, Código Ajuste (autocomplete), Descrição Ajuste

## 3. Estrutura do Teste
O teste cobre os seguintes cenários:
1. **Validação de Listagem**: Verifica se a tela de listagem carrega corretamente.
2. **Navegação para Cadastro**: Valida navegação para o formulário de cadastro.
3. **Preenchimento de Formulário**: Valida preenchimento de todos os campos (obrigatórios e opcionais).
4. **Cancelamento**: Valida retorno à listagem ao clicar em "Voltar".

## 4. Padrões e Boas Práticas (ADRs)
- **Page Object Pattern (ADR-0002)**: Lógica de interação encapsulada em `SpedIcmsAjustePage`.
- **Locators Separados (ADR-0003)**: Seletores centralizados em `SpedIcmsAjusteLocators`.
- **Login Fiscal (ADR-0004)**: Uso de `cy.login()` para autenticação com permissões fiscais.
- **Tags (ADR-0010)**: Uso de `@sped`, `@icms-ajuste`, `@regressivo`.

## 5. Relacionamentos
- **Documentações Relacionadas**:
  - [SPED Configurações](./architecture-sped-configuracoes.md)
  - [SPED Gerar Arquivo](./architecture-sped-gerar-arquivo.md)
  - [Valores Declaratórios](./architecture-valores-declaratorios.md)

## 6. Fluxos Críticos
- O campo "Código Ajuste" usa autocomplete com campo oculto (`#codigo_ajuste`). O teste aguarda sugestões e seleciona a primeira opção se disponível.
- O campo "Valor Ajuste" usa máscara de decimal brasileiro (vírgula como separador).
- O campo "Data Referência" usa datepicker com máscara `00/00/0000`.

