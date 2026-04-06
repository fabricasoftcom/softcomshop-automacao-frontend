# AI Toolkit - Melhoria Contínua da Automação

Scripts Node.js que usam **AI SDK (Vercel) + OpenAI** para analisar regras do projeto, gerar cenários de teste a partir de regras de negócio e detectar testes flaky. A saída inclui uma seção **Cursor-ready**: instruções que o Cursor (Agent mode) pode executar após validação humana.

**ADR:** [ADR-0017](../docs/adr/0017-use-ai-sdk-for-continuous-improvement.md)

## Pré-requisito

1. Copie `.env.example` para `.env`.
2. Defina `OPENAI_API_KEY` com sua chave da OpenAI.

```bash
cp .env.example .env
# Edite .env e preencha OPENAI_API_KEY
```

## Scripts

| Comando | Descrição | Saída |
|--------|-----------|--------|
| `npm run ai:rules` | Analisa architeture.mdc, ADRs e guias (redundâncias, gaps, conflitos, melhorias) | `ai-reports/rules-analysis.md` |
| `npm run ai:scenarios` | Gera cenários a partir de regras de negócio | `ai-reports/scenarios-<nome>.md` |
| `npm run ai:flaky` | Analisa Allure + specs (flaky, gargalos, anti-padrões) | `ai-reports/flaky-analysis.md` |

## Uso

### 1. Analisar regras

```bash
npm run ai:rules
```

Abra `ai-reports/rules-analysis.md`, revise as sugestões e marque as ações desejadas como `[APROVADO]` ou `[REJEITADO]`. Copie a seção "Ações Cursor-ready" e cole no chat do Cursor Agent com: *"Implemente as ações aprovadas abaixo."*

### 2. Gerar cenários de teste

1. Crie um arquivo de regras de negócio em `ai-toolkit/inputs/`, por exemplo `regras-conta-corrente.md`:

```markdown
# Regras de Negócio: Cadastro de Conta Corrente
## Funcionalidade
Cadastro de contas correntes no módulo financeiro.
## Modulo
Financeiro
## Regras
1. Nome e banco obrigatórios
2. Saldo inicial pode ser zero
...
## URL da tela
/admin/financeiro/conta-corrente
```

2. Execute:

```bash
npm run ai:scenarios -- --input ai-toolkit/inputs/regras-conta-corrente.md [--ref cypress/e2e/financeiro/cadastro-conta-corrente.spec.js]
```

3. Abra `ai-reports/scenarios-conta-corrente.md`, revise cenários e ações. A **primeira ação (explorar tela)** deve ser executada antes das demais para validar locators no DOM real (ADR-0015). Copie a seção Cursor-ready para o Agent e peça para implementar as ações aprovadas.

### 3. Detectar flaky

Execute após rodar os testes (para existir `allure-results/`):

```bash
npm run ai:flaky
```

Abra `ai-reports/flaky-analysis.md`, revise as correções sugeridas e use a seção Cursor-ready no Agent para aplicar as aprovadas.

## Estrutura

```
ai-toolkit/
  config.mjs           # Modelo OpenAI e paths
  utils.mjs            # Leitura de arquivos e gravação de relatórios
  cursor-ready.mjs     # Formatação da seção Cursor-ready
  prompts/
    system-prompt.mjs  # Contexto do projeto (comum a todos)
    rules-prompt.mjs
    scenarios-prompt.mjs
    flaky-prompt.mjs
  analyze-rules.mjs
  generate-scenarios.mjs
  detect-flaky.mjs
  inputs/              # Coloque aqui os arquivos de regras de negócio
ai-reports/            # Relatórios gerados
```

## Custo estimado (OpenAI)

- `ai:rules`: ~US$ 0,10–0,15 por execução (contexto grande).
- `ai:scenarios`: ~US$ 0,05–0,10 por funcionalidade.
- `ai:flaky`: ~US$ 0,05–0,20 conforme volume de candidatos.

## Troubleshooting

- **"OPENAI_API_KEY não definida"** – Crie `.env` a partir de `.env.example` e defina a chave.
- **Relatório vazio ou genérico** – Verifique se os arquivos de entrada existem (architeture.mdc, docs/adr, etc.) e se o conteúdo foi carregado (o script imprime "Carregando artefatos...").
- **Erro de schema/parsing** – A resposta do modelo pode não bater com o schema Zod; em caso de falha, o script encerra com mensagem de erro. Rodar novamente costuma ajudar.
