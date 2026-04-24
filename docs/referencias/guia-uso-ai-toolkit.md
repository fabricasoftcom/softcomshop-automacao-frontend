# Guia de Uso do AI Toolkit

Este guia detalha como utilizar cada uma das funcionalidades do AI Toolkit na prática. O AI Toolkit é um conjunto de scripts Node.js que utilizam a OpenAI para analisar seu projeto Cypress e gerar sugestões acionáveis para o Cursor (Agent Mode).

---

## Pré-requisitos Gerais

1. **Chave da OpenAI**: Você precisa de um arquivo `.env` na raiz do projeto com a variável `OPENAI_API_KEY` preenchida. (Copie do `.env.example`).
2. **Terminal**: Todos os comandos devem ser executados na raiz do projeto.

---

## 1. Analisador de Regras (`ai:rules`)

**Objetivo**: Revisar as regras de arquitetura, ADRs e guias do projeto em busca de redundâncias, gaps, conflitos e oportunidades de melhoria.

**Quando usar**: 
- Periodicamente (ex: a cada sprint).
- Quando você suspeitar que a documentação está confusa ou conflitante.

**Como usar**:
1. No terminal, execute:
   ```bash
   npm run ai:rules
   ```
2. Aguarde a finalização. O script lerá automaticamente os arquivos `.cursor/rules/architeture.mdc`, `docs/adr/*.md` e guias.
3. Abra o relatório gerado em `ai-reports/rules-analysis.md`.
4. Revise a análise.
5. Vá para a seção `## Ações Cursor-ready`.
6. Altere `[APROVADO]` para `[REJEITADO]` nas ações que você não quer aplicar.
7. Copie o bloco de ações aprovadas.
8. No Cursor (Agent Mode), envie a mensagem gerada no arquivo, que será parecida com:
   > Implemente as ações aprovadas abaixo. Antes de codificar, leia a análise completa e o contexto no arquivo @ai-reports/rules-analysis.md para entender os detalhes, regras e motivos de cada ação.
   > [Cole as ações aqui]

---

## 2. Gerador de Cenários (`ai:scenarios`)

**Objetivo**: Gerar cenários de teste estruturados e criar a base de código (spec, Page Object, locators) para uma **nova funcionalidade**, a partir de regras de negócio em texto livre.

**Quando usar**:
- Antes de iniciar a automação de uma nova tela ou funcionalidade.

**Como usar**:
1. Crie um arquivo Markdown dentro da pasta `ai-toolkit/inputs/` (ex: `regras-minha-feature.md`).
2. Preencha o arquivo com as regras de negócio. Exemplo mínimo:
   ```markdown
   # Regras de Negócio: Minha Feature
   ## Funcionalidade
   Cadastro de algo.
   ## Modulo
   Financeiro
   ## Regras
   1. Campo nome é obrigatório.
   ## Campos
   - Nome
   ## URL da tela
   /admin/minha-feature
   ```
3. No terminal, execute o comando apontando para o seu arquivo:
   ```bash
   npm run ai:scenarios -- --input ai-toolkit/inputs/regras-minha-feature.md
   ```
   *(Opcional: Você pode passar um spec de referência adicionando `--ref cypress/e2e/caminho/do/spec.spec.js`)*
4. Abra o relatório gerado em `ai-reports/scenarios-minha-feature.md`.
5. Revise os cenários e as ações Cursor-ready.
6. **Atenção**: A primeira ação sugerida deve ser sempre "Explorar tela" para garantir que os locators sejam reais (ADR-0015).
7. Copie as ações aprovadas e cole no Cursor Agent usando a mensagem gerada:
   > Implemente as ações aprovadas abaixo. Antes de codificar, leia a análise completa e o contexto no arquivo @ai-reports/scenarios-minha-feature.md para entender os detalhes, regras e motivos de cada ação.
   > [Cole as ações aqui]

---

## 3. Detector de Flaky e Anti-padrões (`ai:flaky`)

**Objetivo**: Analisar os resultados dos testes e o código fonte para encontrar testes intermitentes (flaky), gargalos de performance e anti-padrões (como `cy.wait(numero)`).

**Quando usar**:
- Após rodar a suíte de testes (quando você notar que alguns testes falham e passam sem mudança no código).

**Como usar**:
1. Certifique-se de que você rodou os testes recentemente e a pasta `allure-results/` contém dados.
2. No terminal, execute:
   ```bash
   npm run ai:flaky
   ```
3. Abra o relatório gerado em `ai-reports/flaky-analysis.md`.
4. Revise os candidatos a flaky e as correções de código sugeridas.
5. Copie as ações aprovadas e cole no Cursor Agent usando a mensagem gerada:
   > Implemente as ações aprovadas abaixo. Antes de codificar, leia a análise completa e o contexto no arquivo @ai-reports/flaky-analysis.md para entender os detalhes, regras e motivos de cada ação.
   > [Cole as ações aqui]

---

## 4. Analisador de Falhas (`ai:failures`)

**Objetivo**: Analisar os testes que falharam na última execução e classificar se a falha foi um "Bug na Aplicação" (a aplicação quebrou) ou um "Erro no Teste" (script desatualizado, falta de espera, locator errado).

**Quando usar**:
- Logo após rodar os testes e obter falhas reais. Ideal para triagem rápida.

**Como usar**:
1. Certifique-se de que você rodou os testes e houve falhas (a pasta `allure-results/` deve conter os JSONs das falhas).
2. No terminal, execute:
   ```bash
   npm run ai:failures
   ```
3. Abra o relatório gerado em `ai-reports/failures-analysis.md`.
4. Revise a classificação. A IA indicará 🐛 para Bugs na Aplicação e 🔧 para Erros no Teste.
5. Para os "Erros no Teste", a IA gerará ações Cursor-ready com a correção do código.
6. Copie as ações aprovadas e cole no Cursor Agent usando a mensagem gerada:
   > Implemente as ações aprovadas abaixo. Antes de codificar, leia a análise completa e o contexto no arquivo @ai-reports/failures-analysis.md para entender os detalhes, regras e motivos de cada ação.
   > [Cole as ações aqui]

---

## 5. Analisador de Incidentes (`ai:incidents`)

**Objetivo**: Analisar arquivos JSON de tickets de incidentes (bugs já corrigidos em produção) e gerar cenários de teste automatizados (regressão) para garantir que o erro não volte a acontecer.

**Quando usar**:
- Quando um bug for corrigido e você quiser garantir que ele não volte a ocorrer no futuro.

**Como usar**:
1. Coloque os arquivos JSON com os dados dos incidentes na pasta `ai-toolkit/inputs/incidents/`.
2. No terminal, execute:
   ```bash
   npm run ai:incidents
   ```
3. Abra o relatório gerado em `ai-reports/incidents-analysis.md`.
4. Revise os cenários de regressão gerados e as ações Cursor-ready sugeridas.
5. Copie as ações aprovadas e cole no Cursor Agent usando a mensagem gerada:
   > Implemente as ações aprovadas abaixo. Antes de codificar, leia a análise completa e o contexto no arquivo @ai-reports/incidents-analysis.md para entender os detalhes, regras e motivos de cada ação.
   > [Cole as ações aqui]

---

## Dicas Importantes para o Cursor Agent

- **Sempre revise o código sugerido** pela IA antes de colar no Cursor.
- O Cursor ignora automaticamente qualquer ação que comece com `### [REJEITADO]`.
- Se a IA sugerir criar um arquivo que já existe, o Cursor tentará editá-lo ou sobrescrevê-lo. Fique atento ao tipo da ação (`criar-arquivo` vs `editar-arquivo`).
- Após o Cursor aplicar as mudanças, **sempre rode o teste afetado** para validar se a correção ou implementação funcionou.