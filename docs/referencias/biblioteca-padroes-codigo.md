# Biblioteca de Padrões de Código

**Versão:** 1.0  
**Data:** 2025-01-30  
**Status:** ✅ Ativo

---

## 🔍 Como Usar

Use `Ctrl+F` (ou `Cmd+F` no Mac) para buscar por padrão específico. Exemplos de buscas:
- "valor monetário" ou "monetário"
- "switch" ou "toggle"
- "autocomplete" ou "debounce"
- "date picker" ou "date range"
- "campo habilitado" ou "disabled"
- "método resiliente" ou "ambiente compartilhado"

**Estrutura:**
- Cada padrão contém: problema, solução, exemplo de código e referência completa
- Exemplos são copiáveis e prontos para adaptação
- Links apontam para documentação completa em `aprendizagens-e-licoes.md`

---

## 💰 Manipulação de Valores Monetários Brasileiros

### Converter Texto para Número

**Problema:** Valores exibidos como "R$ 1.234,56" precisam ser convertidos para `1234.56` para cálculos e validações.

**Solução Padrão:**
```javascript
// ✅ PADRÃO: Remover "R$", pontos (separadores de milhar) e substituir vírgula por ponto
obterValorNumerico(locator) {
  return cy.get(locator)
    .invoke('val')
    .then((valor) => {
      // Remove "R$", espaços, pontos (milhar) e substitui vírgula por ponto
      const valorFormatado = valor
        .replace('R$', '')
        .replace(/\./g, '')      // Remove pontos (separadores de milhar)
        .replace(',', '.')        // Substitui vírgula por ponto
        .trim();
      return parseFloat(valorFormatado);
    });
}
```

**Exemplo de Uso:**
```javascript
// Exemplo 1: Capturar valor de campo e converter
obterValorFinal() {
  return cy.get(RecebimentoLocators.valorFinalInput)
    .invoke('val')
    .then((valor) => {
      const valorFormatado = valor
        .replace('R$', '')
        .replace(/\./g, '')
        .replace(',', '.')
        .trim();
      return parseFloat(valorFormatado);
    });
}

// Exemplo 2: Validar valor em coluna de tabela
validarValoresNaColuna() {
  cy.get('table.table tbody tr').each(($row) => {
    cy.wrap($row)
      .get('td:nth-child(8)')
      .invoke('text')
      .then((valor) => {
        valor = valor.trim().replace(/\./g, '').replace(',', '.');
        expect(parseFloat(valor)).to.be.greaterThan(0);
      });
  });
}
```

**Referência completa:** `docs/referencias/aprendizagens-e-licoes.md#-lições-aprendidas-manipulação-de-valores-brasileiros`

---

### Gerar Valor Monetário com Faker

**Problema:** Valores aleatórios precisam ser gerados no formato brasileiro ("100,00" ou "1.234,56").

**Solução Padrão:**
```javascript
// ✅ PADRÃO: Usar Faker para gerar valor e formatar para brasileiro
import { faker } from '@faker-js/faker';

// Gerar valor entre min e max (formato brasileiro)
const valor = faker.number.float({ 
  min: 1, 
  max: 999, 
  precision: 0.01 
}).toFixed(2).replace('.', ',');

// Exemplo: Gerar valor para preencher campo
preencherValorAleatorio() {
  const valorAleatorio = faker.finance.amount({ 
    min: 1, 
    max: 229, 
    dec: 2 
  }).replace('.', ',');
  
  cy.get(NovaReceitaLocators.valorInput)
    .clear()
    .type(valorAleatorio);
}
```

**Referência completa:** `docs/referencias/aprendizagens-e-licoes.md#-lições-aprendidas-manipulação-de-valores-brasileiros`

---

### Formatar Número para Brasileiro

**Problema:** Números precisam ser formatados para formato brasileiro antes de preencher campos.

**Solução Padrão:**
```javascript
// ✅ PADRÃO: Converter número para formato brasileiro (vírgula como separador decimal)
formatarNumeroParaBrasileiro(valor) {
  return valor.toFixed(2).replace('.', ',');
}

// Exemplo de uso:
const valorFormatado = (1234.56).toFixed(2).replace('.', ','); // "1234,56"
```

**Referência completa:** `docs/referencias/aprendizagens-e-licoes.md#-lições-aprendidas-manipulação-de-valores-brasileiros`

---

### Cálculo de Valores Monetários

**Problema:** Cálculos requerem converter valores, calcular e formatar de volta.

**Solução Padrão:**
```javascript
// ✅ PADRÃO: Converter, calcular e formatar
calcularBaixaParcial(valorTotal, percentual) {
  return cy.get(RecebimentoLocators.valorTotalInput)
    .invoke('val')
    .then((valorTexto) => {
      // Converte para número
      const valor = parseFloat(
        valorTexto.replace('R$', '').replace(/\./g, '').replace(',', '.')
      );
      // Calcula valor parcial
      const valorParcial = valor * (percentual / 100);
      // Formata para brasileiro
      return valorParcial.toFixed(2).replace('.', ',');
    });
}
```

**Referência completa:** `docs/referencias/aprendizagens-e-licoes.md#-lições-aprendidas-manipulação-de-valores-brasileiros`

---

## 🔄 Validação de Estado Antes e Depois

### Validar Switch (Ligado/Desligado)

**Problema:** Switches podem ter estado inicial desconhecido. Necessário validar estado antes e depois de alternar.

**Solução Padrão:**
```javascript
// ✅ PADRÃO: Alternar e validar ambos os estados
toggleSwitch(toggleSelector, checkboxSelector) {
  // Alterna para ligado e valida
  cy.get(toggleSelector).click({ force: true });
  cy.get(checkboxSelector).should('be.checked');
  
  // Alterna para desligado e valida
  cy.get(toggleSelector).click({ force: true });
  cy.get(checkboxSelector).should('not.be.checked');
}

// Exemplo de uso:
alternarSwitchesEstado() {
  this.toggleSwitch(
    cadastroClienteLocators.switchBloqueadoToggle,
    cadastroClienteLocators.switchBloqueadoCheckbox
  );
  this.toggleSwitch(
    cadastroClienteLocators.switchDesativadoToggle,
    cadastroClienteLocators.switchDesativadoCheckbox
  );
}
```

**Referência completa:** `docs/referencias/aprendizagens-e-licoes.md#-lições-aprendidas-validação-de-estado-antes-e-depois-de-operações`

---

### Validar Campo Habilitado Antes de Preencher

**Problema:** Campos podem estar desabilitados antes de preencher dependências. Necessário validar estado antes de interagir.

**Solução Padrão:**
```javascript
// ✅ PADRÃO: Validar que campo está habilitado antes de preencher
preencherCampoSeHabilitado(locator, valor) {
  cy.get(locator, { timeout: 10000 })
    .should('be.visible')
    .should('not.be.disabled')  // Valida estado antes
    .clear()
    .type(valor);
}

// Exemplo: Verificar campos desabilitados inicialmente
verificarCamposPagoEPendente() {
  // Valida que campos estão desabilitados antes de preencher forma de pagamento
  cy.get(BaixarDespesasLocators.valorPagoinput1).should('be.disabled');
  cy.get(BaixarDespesasLocators.valorPendenteInput).should('be.disabled');
}
```

**Referência completa:** `docs/referencias/aprendizagens-e-licoes.md#-lições-aprendidas-validação-de-estado-antes-e-depois-de-operações`

---

### Capturar e Comparar Valores

**Problema:** Valores podem mudar após operações. Necessário capturar valor antes e validar mudança depois.

**Solução Padrão:**
```javascript
// ✅ PADRÃO: Capturar valor antes, executar ação, validar mudança depois
capturarECompararValor(locator, operacao, validacao) {
  return cy.get(locator)
    .invoke('val')
    .then((valorAntes) => {
      operacao();
      cy.get(locator)
        .invoke('val')
        .then((valorDepois) => {
          validacao(valorAntes, valorDepois);
        });
    });
}

// Exemplo: Validar valor pendente após desfazer baixa
verificarValorPendenteAposDesfazerBaixa(valorEsperado) {
  cy.get(BaixarDespesasLocators.valorPendenteInput)
    .should('be.visible')
    .invoke('val')
    .then((valorAtual) => {
      const valorFormatado = valorAtual
        .replace('R$', '')
        .replace(',', '.')
        .trim();
      
      // Valida que valor mudou após desfazer baixa
      cy.wrap(parseFloat(valorFormatado), { timeout: 10000 })
        .should('not.equal', parseFloat(valorEsperado));
    });
}
```

**Referência completa:** `docs/referencias/aprendizagens-e-licoes.md#-lições-aprendidas-validação-de-estado-antes-e-depois-de-operações`

---

### Validar Estado em Edição

**Problema:** Em edição, necessário garantir que valor novo é diferente do atual.

**Solução Padrão:**
```javascript
// ✅ PADRÃO: Verificar valor atual antes de alterar
preencherValorAleatorio() {
  cy.get(EditarReceitaLocators.valorInput)
    .invoke('val')
    .then((valorAtual) => {
      let novoValor;
      do {
        // Gera novo valor até ser diferente do atual
        novoValor = faker.finance.amount({ 
          min: 10, 
          max: 791, 
          dec: 2 
        }).replace('.', ',');
      } while (novoValor === valorAtual);
      
      // Preenche novo valor
      cy.get(EditarReceitaLocators.valorInput)
        .clear({ force: true })
        .type(novoValor, { force: true });
    });
}
```

**Referência completa:** `docs/referencias/aprendizagens-e-licoes.md#-lições-aprendidas-validação-de-estado-antes-e-depois-de-operações`

---

## 🔍 Autocomplete com Debounce

### Selecionar Opção de Autocomplete

**Problema:** Autocomplete tem debounce (espera antes de buscar). Necessário aguardar resultados aparecerem antes de interagir.

**Solução Padrão:**
```javascript
// ✅ PADRÃO: Digitar, aguardar resultados, selecionar
selecionarAutocomplete(locator, termo) {
  cy.get(locator).type(termo, { delay: 0, force: true });
  cy.get(`${locator} + .typeahead-result`, { timeout: 10000 })
    .should('exist')
    .should('be.visible')
    .first()
    .click();
}

// Exemplo: Selecionar produto em autocomplete
selecionarProduto(nomeProduto) {
  cy.get(PromocoesCadastroLocators.campoProduto)
    .type(nomeProduto, { delay: 0, force: true });
  cy.get(PromocoesCadastroLocators.campoProdutoResultado, { timeout: 10000 })
    .should('exist')
    .should('be.visible')
    .first()
    .click();
}
```

**Referência completa:** `docs/referencias/aprendizagens-e-licoes.md#5-validação-de-autocomplete-com-debounce`

---

## 📅 Date Range Picker

### Validar Date Range Picker

**Problema:** Validar resultado final (campo preenchido) ao invés de estado intermediário.

**Solução Padrão:**
```javascript
// ✅ PADRÃO: Validar que campo foi preenchido, não desaparecimento de botão
validarDateRangePicker(campoPeriodo) {
  cy.get(campoPeriodo)
    .should('be.visible')
    .should('not.have.value', '');  // Valida resultado final
}

// ❌ ERRADO - Espera que botão desapareça (pode não acontecer)
// cy.get(datePickerAplicar).should('not.exist');

// ✅ CORRETO - Valida que o campo foi preenchido
cy.get(PromocoesCadastroLocators.campoPeriodo)
    .should('be.visible')
    .should('not.have.value', '');
```

**Referência completa:** `docs/referencias/aprendizagens-e-licoes.md#1-validação-de-date-range-picker`

---

## 🛡️ Métodos Resilientes em Ambiente Compartilhado

### Método Resiliente para Falhas Esperadas

**Problema:** Em ambientes compartilhados, ações podem falhar devido a conflitos. Métodos devem ser resilientes.

**Solução Padrão:**
```javascript
// ✅ PADRÃO: Verificar existência antes de interagir, logar se não existir
desativarPromocao() {
  cy.get('body').then(($body) => {
    const link = $body.find(PromocoesCadastroLocators.linkDesativarPromocao);
    if (link.length > 0 && link.is(':visible')) {
      // Pode desativar
      cy.get(PromocoesCadastroLocators.linkDesativarPromocao).click();
    } else {
      // Apenas loga - não falha o teste
      cy.log('⚠️ Link "Desativar Promoção" não encontrado');
    }
  });
}

// Exemplo: Método que verifica existência de elemento opcional
marcarNaoExibirDRE() {
  cy.get('body').then(($body) => {
    const checkbox = $body.find('input[type="checkbox"]');
    if (checkbox.length > 0) {
      cy.wrap(checkbox).check({ force: true });
    }
  });
}
```

**Referência completa:** `docs/referencias/aprendizagens-e-licoes.md#3-tratamento-de-falhas-em-ambiente-compartilhado`

---

## ⏱️ Substituição de Waits Fixos

### Substituir cy.wait() por Validações Condicionais

**Problema:** Waits fixos são frágeis e lentos. Devem ser substituídos por validações condicionais.

**Solução Padrão:**
```javascript
// ❌ ANTES - Wait fixo
cy.wait(2000); // Aguarda processamento

// ✅ DEPOIS - Validação condicional
cy.get('#loading').should('not.exist'); // Valida que loading terminou

// Padrões de substituição:
// cy.wait(1000) → cy.get(elemento).should('be.visible')
// cy.wait(2000) → cy.get('#loading').should('not.exist')
// cy.wait(500) → cy.get(resultado).should('exist')
```

**Referência completa:** `docs/referencias/aprendizagens-e-licoes.md#2-remoção-de-waits-fixos`

---

## 📚 Referências Cruzadas

### Documentação Completa

Para explicações detalhadas, exemplos adicionais e contexto completo de cada padrão, consulte:

- **Manipulação de Valores Brasileiros:** `docs/referencias/aprendizagens-e-licoes.md#-lições-aprendidas-manipulação-de-valores-brasileiros`
- **Validação de Estado:** `docs/referencias/aprendizagens-e-licoes.md#-lições-aprendidas-validação-de-estado-antes-e-depois-de-operações`
- **Autocomplete com Debounce:** `docs/referencias/aprendizagens-e-licoes.md#5-validação-de-autocomplete-com-debounce`
- **Date Range Picker:** `docs/referencias/aprendizagens-e-licoes.md#1-validação-de-date-range-picker`
- **Métodos Resilientes:** `docs/referencias/aprendizagens-e-licoes.md#3-tratamento-de-falhas-em-ambiente-compartilhado`
- **Waits Fixos:** `docs/referencias/aprendizagens-e-licoes.md#2-remoção-de-waits-fixos`

---

## 🔄 Manutenção

Este documento deve ser atualizado sempre que:
- Novos padrões são identificados nas lições aprendidas
- Padrões existentes são refinados ou melhorados
- Novos exemplos de uso são descobertos

**Última atualização:** 2025-01-30  
**Mantido por:** Equipe de Automação

