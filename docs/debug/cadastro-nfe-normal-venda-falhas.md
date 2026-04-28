# Debug: Falhas nos testes de venda — `cadastro-nfe-normal.spec.js`

## Contexto

**Branch:** `chore/paralelismo-ci-seguranca`  
**Spec:** `cypress/e2e/venda-nfcenfe/cadastro-nfe-normal.spec.js`  
**Data:** 2026-04-27

O spec tem 8 testes. 6 passam consistentemente. 2 falham desde o início da branch:

| # | Teste | Status |
|---|---|---|
| 1 | abre formulario de NFe normal avulsa apos continuar | ✅ passa |
| 2 | preenche formulario com natureza e destinatario na NFe normal avulsa | ✅ passa |
| 3 | **abre formulario de NFe normal venda apos pesquisar e selecionar** | ❌ falha |
| 4 | **realiza fluxo completo da NFe normal venda** | ❌ falha |
| 5 | abre formulario de NFe normal NFCe apos pesquisar e selecionar | ✅ passa |
| 6 | realiza fluxo completo da NFe normal NFCe | ✅ passa |
| 7 | abre formulario de NFe normal movimentacao apos pesquisar e selecionar | ✅ passa |
| 8 | realiza fluxo completo da NFe normal movimentacao | ✅ passa |

---

## Erros observados

**Teste 3:**
```
AssertionError: Timed out retrying after 30000ms: Formulário principal da NFe disponível: expected false to be true
at CadastroNfeBasePage.js:22
```

**Teste 4:**
```
AssertionError: Timed out retrying after 200000ms:
Expected to find element: `.sweet-alert.showSweetAlert.visible`, but never found it.
at CadastroNfeNormalPage.validarModalSucessoEmissao (CadastroNfeBasePage.js:218)
```

**Sintoma comum:** após clicar em Continuar, a página **não navega** para `/nfe2/{id}/editar`. O Cypress fica esperando a URL mudar ou o formulário aparecer e estoura o timeout.

---

## Fluxo que falha

Ambos os testes chamam `selecionarVendaClienteDiferenteConsumidor()`:

```javascript
// CadastroNfeNormalVendaPage.js
selecionarVendaClienteDiferenteConsumidor(confirmarEmissao = true) {
  cy.intercept('POST', '**/nfe2/**').as('criarNfeVendaConsumidor');   // adicionado na tentativa 8
  cy.intercept('GET', '**/nfe2/**').as('carregarNfeVendaConsumidor'); // adicionado na tentativa 8

  this.selecionarPrimeiraLinhaDaListagem({
    obterLinhasFn: () => this.obterLinhasTabelaVenda(),
    ignorarConsumidor: true,
    colunaCliente: 2,
  });

  this.validarLinhaVendaSelecionada();       // passa — checkbox fica marcado no DOM

  this.prosseguirAposSelecao({              // clica Continuar — navegação não acontece
    confirmarEmissao,
    aguardarModalEmissao: true,
  });
  // ...
}
```

---

## Método que funciona para comparação

`selecionarPrimeiraVenda()` (testes 1 e 2 passam com ele):

```javascript
selecionarPrimeiraVenda() {
  cy.intercept('POST', '**/nfe2/**').as('criarNfeVenda');
  cy.intercept('GET', '**/nfe2/**').as('carregarNfeVenda');

  this.selecionarPrimeiraLinhaDaListagem({
    obterLinhasFn: () => this.obterLinhasTabelaVenda(),
    // sem ignorarConsumidor, sem colunaCliente
  });

  this.validarLinhaVendaSelecionada();

  cy.wait(500);
  this.clicarBotaoContinuarRodape();        // NÃO usa prosseguirAposSelecao

  cy.url({ timeout: 30000 }).should('match', /\/nfe2\/\d+\/(editar|novo)/);
  // ...
}
```

---

## Diferenças entre o método que passa e o que falha

| Aspecto | `selecionarPrimeiraVenda` (✅) | `selecionarVendaClienteDiferenteConsumidor` (❌) |
|---|---|---|
| `ignorarConsumidor` | `false` (padrão) | `true` |
| `colunaCliente` | não definido | `2` |
| Clique no Continuar | `cy.wait(500)` + `clicarBotaoContinuarRodape()` | `prosseguirAposSelecao()` |
| `tratarModalAvisoSelecaoSeNecessario` | não chama | chama (dentro de `prosseguirAposSelecao`) |
| `cy.intercept` | sim (desde o início) | sim (adicionado na tentativa 8, **não validado**) |

---

## O que foi descartado como causa raiz

1. **`tratarModalAvisoSelecaoSeNecessario` mascarando erro** — Fix 6 substituiu `prosseguirAposSelecao` por `clicarBotaoContinuarRodape` sem o tratamento do modal e o erro foi idêntico.

2. **`obterLinhasTabelaVenda` buscando tabela errada** — Fix 7 scopou para `venda.form` (igual ao que NFCe faz com `nfce.form`) e o erro foi idêntico. Revertido.

3. **Checkbox não sendo marcado** — `validarLinhaVendaSelecionada()` passa em ambos os testes, confirmando que o input `checked` está no DOM.

---

## Hipótese ativa (não confirmada)

O app usa `turnSaleIntoFiscalDocument()` para validar a seleção antes de navegar. O seletor interno dessa função é:

```javascript
querySelectorAll(".table-vendas .table-vendas-checkbox .checkbox input:checked")
```

O Cypress marca o checkbox via `.check({ force: true })` em `selecionarPrimeiraLinhaDaListagem()`, que encontra o `input[type="checkbox"]` dentro de `tabelaResultados` (`.table-hover, table tbody`). 

**Suspeita:** o Cypress pode estar marcando o checkbox certo no DOM mas a função do app não está enxergando como selecionado porque o evento `change` / `click` não está sendo disparado corretamente no contexto do Bootstrap 3 custom checkbox — onde o clique funcional deve acontecer no `<label>` ou no wrapper `.checkbox`, não diretamente no `input`.

O locator `venda.tabelaVendas = '#table-form-body tr.table-vendas-checkbox'` é mais específico e **nunca foi usado** no método de seleção. Pode ser o seletor correto para chegar às linhas que o app realmente monitora.

---

## Tentativas realizadas

| # | Mudança | Arquivo | Resultado |
|---|---|---|---|
| 1–5 | Variações de seletores, waits, estrutura do método | `CadastroNfeNormalVendaPage.js` | Mesmo erro |
| 6 | Substituiu `prosseguirAposSelecao` por `clicarBotaoContinuarRodape` direto | `CadastroNfeNormalVendaPage.js` | Mesmo erro |
| 7 | Scopou `obterLinhasTabelaVenda` para `#form-venda` | `CadastroNfeNormalBasePage.js` | Mesmo erro → **revertido** |
| 8 | Adicionou `cy.intercept` antes da seleção | `CadastroNfeNormalVendaPage.js` | **Não validado** — run com grep inválido, todos os testes ficaram `pending` |

---

## Estado atual dos arquivos

**`cypress/support/pages/Venda/NFe/Normal/CadastroNfeNormalVendaPage.js`**
- Intercepts adicionados na tentativa 8 (não validados com run completo)
- Usa `prosseguirAposSelecao` (revertido da tentativa 6)
- `colunaCliente: 2` sem validação se é o índice correto da coluna cliente

**`cypress/support/pages/Venda/NFe/Normal/CadastroNfeNormalBasePage.js`**
- Revertido ao estado original (tentativa 7 desfeita)

---

## Próximos passos sugeridos

1. **Validar a tentativa 8** — rodar o spec completo com `--browser chrome --headless` sem grep filter para confirmar se os intercepts ajudam.

2. **Investigar o índice da coluna** — verificar na UI se a coluna do cliente na tabela de vendas é índice 2 ou 3 (0-based). NFCe usa `colunaCliente: 3`.

3. **Investigar o mecanismo de check** — em vez de `.check({ force: true })` no `input`, tentar clicar no `<label>` ou no wrapper `.checkbox` para disparar o evento da forma que o Bootstrap 3 espera.

4. **Usar o locator específico** — `venda.tabelaVendas = '#table-form-body tr.table-vendas-checkbox'` nunca foi testado como origem das linhas. Pode substituir `obterLinhasTabelaVenda()` neste fluxo.

---

## Arquivos relevantes

```
cypress/e2e/venda-nfcenfe/cadastro-nfe-normal.spec.js              ← spec (não modificar)
cypress/support/pages/Venda/NFe/Normal/CadastroNfeNormalVendaPage.js
cypress/support/pages/Venda/NFe/Normal/CadastroNfeNormalBasePage.js
cypress/support/pages/Venda/NFe/Normal/CadastroNfeNormalNfcePage.js ← referência (passa)
cypress/support/locators/Venda/CadastroNfeLocators.js
cypress/support/pages/Venda/NFe/CadastroNfeBasePage.js              ← aguardarFormularioPrincipalCarregado, validarModalSucessoEmissao
```
