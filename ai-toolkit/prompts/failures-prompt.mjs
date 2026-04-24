export function buildFailuresPrompt(falhasResumo, codigoSpecs) {
  return `Analise os testes que falharam na última execução e o código dos specs correspondentes.
Objetivo: Para cada falha, classifique se o problema é um "Bug na Aplicação" ou um "Erro no Teste" (script desatualizado, locator errado, falta de espera condicional, etc).

Regras de Classificação:
1. Bug na Aplicação: O teste fez a ação correta, mas a aplicação retornou erro 500, a tela quebrou, ou o elemento não apareceu porque a funcionalidade realmente falhou.
2. Erro no Teste: O teste tentou interagir com um elemento antes dele existir (falta de wait condicional), usou um locator que mudou, ou a lógica do teste está frágil.

Para cada falha, forneça:
- classificacao: "Bug na Aplicação" ou "Erro no Teste"
- motivo: Explique brevemente o porquê dessa conclusão baseada na mensagem de erro e no código do spec.
- acaoCursor: SE for "Erro no Teste", gere uma ação Cursor-ready do tipo "editar-arquivo" com a correção sugerida (codigoAtual e codigoSugerido). Se for Bug na Aplicação, retorne null para acaoCursor.

RESUMO DAS FALHAS (Teste, Arquivo e Mensagem de Erro):
${falhasResumo}

CÓDIGO DOS SPECS QUE FALHARAM:
${codigoSpecs}`;
}
