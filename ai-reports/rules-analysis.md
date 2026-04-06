# Análise de Regras do Projeto

## Resumo

Análise das regras do projeto de automação Cypress, identificando redundâncias, gaps, conflitos e sugerindo melhorias.

## Redundâncias

- **Nunca use seletores CSS/XPath hardcoded em Specs ou Pages....** | **NUNCA selectors hardcoded em specs ou Page Objects....** | Impacto: medio
  - Consolidar ambas as regras em uma única fonte para evitar duplicidade.

## Gaps

- Falta de guia sobre como atualizar .cursor/rules/architeture.mdc e outros documentos ao adicionar novos specs.
  - Sugestão: Documentar o processo de atualização de documentos quando novos specs são adicionados. (Impacto: alto)

## Conflitos

- **Conflito:** A primeira regra proíbe completamente o uso de cy.wait(), enquanto a segunda permite seu uso em casos específicos.
  - **Resolução:** Clarificar a regra para permitir cy.wait() com uma justificativa adequada.

## Melhorias

- **Regra atual:** Registre sempre no specPattern após criar novos specs....
  - **Sugestão:** Adicionar uma etapa de checklist no processo de criação de novos tests para registrar no specPattern.
  - **Justificativa:** Ajuda a garantir que os testes sejam incluídos corretamente no fluxo de execução. (Impacto: alto)

---


## Ações Cursor-ready

> Instruções para o Cursor Agent mode. Copie esta seção inteira
> e cole no chat do Cursor com: "Implemente as ações aprovadas abaixo."
> Remova ou altere [APROVADO] para [REJEITADO] nas ações que NÃO deseja executar.

### [APROVADO] Ação 1: Consolidar regras redundantes: Nunca use seletores CSS/XPath hardcoded em Specs o...
- **Tipo**: editar-arquivo
- **Arquivo(s)**: docs/adr/0003-separate-locators-from-page-objects.md
- **O que fazer**: Centralizar a regra sobre não usar selectores hardcoded em uma única seção.
- **Contexto**: Redundância: Nunca use seletores CSS/XPath hardcoded em Specs ou Pages. | NUNCA selectors hardcoded em specs ou Page Objects.. Consolidar ambas as regras em uma única fonte para evitar duplicidade.

### [APROVADO] Ação 2: Cobrir gap: Falta de guia sobre como atualizar .cursor/rules/architeture...
- **Tipo**: criar-arquivo
- **Arquivo(s)**: docs/referencias/processo-atualizacao-documentacao.md
- **O que fazer**: Criar guia de instruções para atualização de documentação ao adicionar novos specs.
- **Contexto**: Falta de guia sobre como atualizar .cursor/rules/architeture.mdc e outros documentos ao adicionar novos specs.

### [APROVADO] Ação 3: Resolver conflito entre regras
- **Tipo**: editar-arquivo
- **Arquivo(s)**: docs/adr/0013-continuous-validation-checklist.md
- **O que fazer**: Especificar quando cy.wait() pode ser usado, com exemplos claros de aplicação.
- **Contexto**: Conflito: A primeira regra proíbe completamente o uso de cy.wait(), enquanto a segunda permite seu uso em casos específicos.

### [APROVADO] Ação 4: Melhorar regra: Registre sempre no specPattern após criar novos sp...
- **Tipo**: editar-arquivo
- **Arquivo(s)**: docs/referencias/procedimento-novo-teste.md
- **O que fazer**: Adicionar passo de checklist para garantir o registro no specPattern.
- **Contexto**: Ajuda a garantir que os testes sejam incluídos corretamente no fluxo de execução.
- **Código sugerido**:
  ```javascript
  - [ ] Verificar e atualizar specPattern em cypress.config.js após criar ou modificar tests.
  ```