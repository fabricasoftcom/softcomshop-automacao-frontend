# 🔧 Guia de Configurações Multi-Segmento

**Versão:** 1.0  
**Data:** 2025-01-27  
**Status:** ✅ Ativo

---

## 📋 Visão Geral

Este guia documenta o padrão para criar configurações específicas por segmento no Cypress, permitindo isolar testes de diferentes segmentos (petshop, e-commerce, etc.) com URLs e configurações diferentes.

**Quando usar:**
- Quando precisar isolar testes de um segmento específico
- Quando o segmento tiver URL diferente do padrão
- Quando precisar de configurações específicas para um segmento
- Quando quiser executar apenas testes de um segmento específico

**Exemplo de uso:**
- Segmento Petshop: `https://automacaopetshop.meusoftcom.com.br`
- Segmento Padrão: `https://automacaosoftcomshopaws.meusoftcom.com.br`

---

## 🎯 Objetivo

Criar configurações isoladas que:
1. Herdam configurações base do padrão
2. Sobrescrevem apenas o necessário (URL, specPattern, env)
3. Mantêm compatibilidade com plugins e tasks existentes
4. Facilitam execução isolada de testes do segmento

---

## 📁 Estrutura do Arquivo de Configuração

### Template Completo

```javascript
const { defineConfig } = require("cypress");
const configPadrao = require('./cypress.config.js');

module.exports = defineConfig({
  e2e: {
    // Herda configurações base do padrão (exceto specPattern)
    baseUrl: 'https://url-do-segmento.com.br',
    defaultCommandTimeout: configPadrao.e2e.defaultCommandTimeout,
    viewportWidth: configPadrao.e2e.viewportWidth,
    viewportHeight: configPadrao.e2e.viewportHeight,
    testIsolation: configPadrao.e2e.testIsolation,
    experimentalStudio: configPadrao.e2e.experimentalStudio,
    video: configPadrao.e2e.video,
    numTestsKeptInMemory: configPadrao.e2e.numTestsKeptInMemory,
    
    // Isola execução apenas para a pasta do segmento
    specPattern: 'cypress/e2e/[nome-segmento]/**/*.spec.js',
    
    setupNodeEvents(on, config) {
      // Reutiliza os plugins e tasks já configurados
      return configPadrao.e2e.setupNodeEvents(on, config);
    },
    
    // Adiciona variável de ambiente de segmento
    env: {
      ...(configPadrao.e2e.env || {}),
      segmento: '[nome-segmento]',
      tags: '@[nome-segmento]'
    }
  },
});
```

### Explicação das Propriedades

#### Propriedades Herdadas do Padrão

- **`defaultCommandTimeout`**: Timeout padrão para comandos (herdado)
- **`viewportWidth`** e **`viewportHeight`**: Dimensões da viewport (herdado)
- **`testIsolation`**: Isolamento entre testes (herdado)
- **`experimentalStudio`**: Habilita Cypress Studio (herdado)
- **`video`**: Gravação de vídeo (herdado)
- **`numTestsKeptInMemory`**: Número de testes mantidos em memória (herdado)

#### Propriedades Específicas do Segmento

- **`baseUrl`**: URL do ambiente do segmento (SOBRESCRITO)
- **`specPattern`**: Padrão de arquivos de teste (SOBRESCRITO - isolado)
- **`env.segmento`**: Identificador do segmento (ADICIONADO)
- **`env.tags`**: Tag para filtro de testes (ADICIONADO)

#### Propriedades Reutilizadas

- **`setupNodeEvents`**: Reutiliza plugins e tasks do padrão (Allure, grep, etc.)

---

## 📝 Exemplo Real: Configuração do Petshop

```javascript
const { defineConfig } = require("cypress");
const configPadrao = require('./cypress.config.js');

module.exports = defineConfig({
  e2e: {
    // Herda configurações base do padrão (exceto specPattern)
    baseUrl: 'https://automacaopetshop.meusoftcom.com.br',
    defaultCommandTimeout: configPadrao.e2e.defaultCommandTimeout,
    viewportWidth: configPadrao.e2e.viewportWidth,
    viewportHeight: configPadrao.e2e.viewportHeight,
    testIsolation: configPadrao.e2e.testIsolation,
    experimentalStudio: configPadrao.e2e.experimentalStudio,
    video: configPadrao.e2e.video,
    numTestsKeptInMemory: configPadrao.e2e.numTestsKeptInMemory,
    
    // Isola execução apenas para a pasta petshop
    specPattern: 'cypress/e2e/petshop/**/*.spec.js',
    
    setupNodeEvents(on, config) {
      // Reutiliza os plugins e tasks já configurados
      return configPadrao.e2e.setupNodeEvents(on, config);
    },
    
    // Adiciona variável de ambiente de segmento
    env: {
      ...(configPadrao.e2e.env || {}),
      segmento: 'petshop',
      tags: '@petshop'
    }
  },
});
```

**Arquivo:** `cypress.config.petshop.js`

---

## 🚀 Scripts NPM Recomendados

### Scripts Obrigatórios

Adicione os seguintes scripts no `package.json`:

```json
{
  "scripts": {
    "test:[segmento]": "cypress run --config-file cypress.config.[segmento].js",
    "test:[segmento]:allure": "cypress run --config-file cypress.config.[segmento].js --env allure=true",
    "cypress:open:[segmento]": "cypress open --config-file cypress.config.[segmento].js"
  }
}
```

### Exemplo Real: Scripts do Petshop

```json
{
  "scripts": {
    "test:petshop": "cypress run --config-file cypress.config.petshop.js",
    "test:petshop:allure": "cypress run --config-file cypress.config.petshop.js --env allure=true",
    "cypress:open:petshop": "cypress open --config-file cypress.config.petshop.js"
  }
}
```

---

## 🎮 Como Executar

### Modo Interativo (Cypress UI)

```bash
# Usando script npm (recomendado)
npm run cypress:open:petshop

# Ou usando comando direto
npx cypress open --config-file cypress.config.petshop.js
```

**Resultado esperado:**
- Cypress abre em modo interativo
- Apenas testes do segmento são exibidos
- URL do segmento é usada automaticamente

### Modo Headless (CI/CD)

```bash
# Execução básica
npm run test:petshop

# Execução com Allure
npm run test:petshop:allure

# Ou usando comando direto
npx cypress run --config-file cypress.config.petshop.js
```

**Resultado esperado:**
- Testes executam em modo headless
- Apenas testes do segmento são executados
- Relatórios são gerados normalmente

---

## ✅ Boas Práticas

### ✅ FAZER

1. **Extrair apenas propriedades necessárias**
   - Não espalhe todo `configPadrao.e2e` com `...configPadrao.e2e`
   - Seja explícito sobre o que está herdando

2. **Isolar specPattern**
   - Sempre defina `specPattern` específico do segmento
   - Use padrão de glob: `cypress/e2e/[segmento]/**/*.spec.js`

3. **Reutilizar setupNodeEvents**
   - Sempre chame `configPadrao.e2e.setupNodeEvents(on, config)`
   - Mantém compatibilidade com plugins (Allure, grep, etc.)

4. **Adicionar variáveis de ambiente**
   - Adicione `segmento` e `tags` no `env`
   - Facilita filtros e identificação

5. **Criar scripts npm**
   - Adicione scripts para modo interativo e headless
   - Facilita uso e documentação

6. **Manter nomenclatura consistente**
   - Arquivo: `cypress.config.[segmento].js`
   - Scripts: `test:[segmento]`, `cypress:open:[segmento]`
   - Pasta: `cypress/e2e/[segmento]/`

### ❌ NÃO FAZER

1. **Não espalhar todo configPadrao.e2e**
   ```javascript
   // ❌ ERRADO
   e2e: {
     ...configPadrao.e2e,  // Espalha specPattern do padrão
     specPattern: 'cypress/e2e/petshop/**/*.spec.js'
   }
   
   // ✅ CORRETO
   e2e: {
     defaultCommandTimeout: configPadrao.e2e.defaultCommandTimeout,
     // ... outras propriedades explícitas
     specPattern: 'cypress/e2e/petshop/**/*.spec.js'
   }
   ```

2. **Não modificar configPadrao**
   - Nunca altere `cypress.config.js` para adicionar segmentos
   - Mantenha configuração padrão isolada

3. **Não duplicar setupNodeEvents**
   - Não recrie plugins e tasks
   - Sempre reutilize do padrão

4. **Não misturar testes de segmentos**
   - Mantenha testes do segmento isolados na pasta específica
   - Não adicione testes do segmento no padrão

---

## 🔍 Troubleshooting

### Problema: Testes do segmento não aparecem no modo interativo

**Sintoma:**
- Executa `npx cypress open --config-file cypress.config.petshop.js`
- Nenhum teste é exibido

**Soluções:**
1. Verifique se o `specPattern` está correto
2. Verifique se os arquivos `.spec.js` estão na pasta correta
3. Verifique se o arquivo de configuração está na raiz do projeto
4. Verifique se o caminho do `specPattern` está relativo à raiz

### Problema: Configuração não herda plugins do padrão

**Sintoma:**
- Allure não funciona
- Grep não funciona
- Tasks customizadas não funcionam

**Solução:**
- Verifique se `setupNodeEvents` está chamando `configPadrao.e2e.setupNodeEvents(on, config)`
- Verifique se está retornando o resultado da chamada

### Problema: URL errada sendo usada

**Sintoma:**
- Testes executam na URL do padrão em vez da URL do segmento

**Solução:**
- Verifique se `baseUrl` está definido corretamente no arquivo de configuração do segmento
- Verifique se não está sendo sobrescrito por variável de ambiente

### Problema: Testes de outros segmentos aparecem

**Sintoma:**
- Executa configuração do petshop, mas testes de outros segmentos aparecem

**Solução:**
- Verifique se `specPattern` está isolado corretamente
- Verifique se não está usando `**/*.spec.js` que captura tudo
- Verifique se a pasta do segmento está isolada

---

## 📚 Referências Relacionadas

### Documentação do Projeto

- [Guia de Decisões Rápidas](./guia-decisoes-rapidas.md) - Referência rápida para dúvidas
- [Referência de Comandos Customizados](./referencia-comandos-customizados.md) - Comandos disponíveis
- [README de Referências](./README.md) - Índice completo de referências

### Documentação Externa

- [Cypress Configuration](https://docs.cypress.io/guides/references/configuration) - Documentação oficial do Cypress
- [Cypress CLI](https://docs.cypress.io/guides/guides/command-line) - Comandos de linha

---

## 🔄 Processo de Criação de Novo Segmento

### Passo a Passo

1. **Criar arquivo de configuração**
   - Copie o template acima
   - Substitua `[segmento]` pelo nome do segmento
   - Ajuste `baseUrl` e `specPattern`

2. **Criar pasta de testes**
   - Crie pasta: `cypress/e2e/[segmento]/`
   - Mova ou crie testes do segmento nesta pasta

3. **Adicionar scripts npm**
   - Adicione scripts no `package.json`
   - Siga nomenclatura: `test:[segmento]`, `cypress:open:[segmento]`

4. **Validar configuração**
   - Execute `npm run cypress:open:[segmento]`
   - Verifique se apenas testes do segmento aparecem
   - Verifique se URL está correta

5. **Documentar**
   - Adicione referência no README principal
   - Atualize documentação de arquitetura se necessário

---

## 📊 Checklist de Validação

Antes de considerar a configuração completa, valide:

- [ ] Arquivo de configuração criado: `cypress.config.[segmento].js`
- [ ] Pasta de testes criada: `cypress/e2e/[segmento]/`
- [ ] Scripts npm adicionados no `package.json`
- [ ] `specPattern` isolado corretamente
- [ ] `baseUrl` configurado corretamente
- [ ] `setupNodeEvents` reutiliza configuração padrão
- [ ] Variáveis `env.segmento` e `env.tags` adicionadas
- [ ] Modo interativo funciona: `npm run cypress:open:[segmento]`
- [ ] Modo headless funciona: `npm run test:[segmento]`
- [ ] Apenas testes do segmento são exibidos/executados
- [ ] URL correta é usada nos testes

---

**Última atualização:** 2025-01-27  
**Status:** ✅ Documentação Ativa e Mantida

