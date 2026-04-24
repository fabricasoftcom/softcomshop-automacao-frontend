# Análise de Flaky e Gargalos

## Resumo

Após análise dos testes candidatos a flaky e do código dos specs fornecidos, identifiquei causas prováveis de flakiness, gargalos de performance e anti-padrões.

## Candidatos a flaky

- **deve validar autocomplete de bairro** (cypress/e2e/configuracoes/cadastro-contador.spec.js) - Taxa: 33%
  - Causa provável: Timing: Possível descompasso entre o preenchimento do campo e a resposta do backend.
  - Evidência: Uso de should sem aguardar o autocomplete finalizar.

## Gargalos

- **cypress/e2e/compras/cadastro-compra-manual.spec.js**: Teste envolvido em várias operações complexas de I/O (Ex: múltiplos cliques, criação e exclusão). (Impacto: Pode causar execução lenta e aumentar a carga no servidor durante o teste.)

## Anti-padrões

- cy.wait(número) - 1 ocorrência(s) em cypress/e2e/configuracoes/cartao-cadastro.spec.js

---


## Ações Cursor-ready

> Instruções para o Cursor Agent mode. Copie esta seção inteira
> e cole no chat do Cursor com: "Implemente as ações aprovadas abaixo."
> Remova ou altere [APROVADO] para [REJEITADO] nas ações que NÃO deseja executar.

### [APROVADO] Ação 1: Corrigir flaky: deve validar autocomplete de bairro
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/configuracoes/cadastro-contador.spec.js
- **O que fazer**: Aguardar o campo de autocomplete retornar valor antes de validar.
- **Código atual**: `cy.get(CadastroContadorLocators.hiddenBairro).invoke('val').should('not.be.empty');`
- **Código sugerido**:
  ```javascript
  cy.get(CadastroContadorLocators.hiddenBairro).should('have.text', 'CENTRO').and('not.be.empty');
  ```

### [APROVADO] Ação 2: Gargalo: cypress/e2e/compras/cadastro-compra-manual.spec.js
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/compras/cadastro-compra-manual.spec.js
- **O que fazer**: Otimize para usar menos interações de UI e more API interactions para aumentar velocidade.
- **Código atual**: `Multiple UI interactions`
- **Código sugerido**:
  ```javascript
  Utilizar API calls para simular ações ao invés de UI interactions.
  ```

### [APROVADO] Ação 3: Anti-padrão: cy.wait(número)
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/configuracoes/cartao-cadastro.spec.js
- **O que fazer**: Substitua o uso de cy.wait(número) por waits assertivos.