export function buildIncidentsPrompt(incidentesJson) {
  return `Atue como uma Engenheira de QA Sênior especialista em Cypress.
Você receberá abaixo um ou mais registros de incidentes (bugs já corrigidos em produção) em formato JSON.

Seu objetivo é processar os incidentes seguindo ESTRITAMENTE estas 3 fases de raciocínio:

**FASE 1: Análise e Compreensão (THINK)**
- Leia a DescricaoResumo e DescricaoCompleta do incidente.
- Identifique qual tela do sistema está envolvida.
- Identifique qual foi a falha e qual é o comportamento esperado correto.

**FASE 2: Design do Cenário de Teste (PLAN)**
- Escreva um cenário de teste de regressão passo a passo.
- O cenário deve focar exclusivamente em reproduzir os passos que causavam o bug e validar que agora funciona.
- Determine quais Page Objects e Locators (arquitetura ADR-0002 e ADR-0015) provavelmente serão necessários ou precisarão ser criados.

**FASE 3: Geração das Ações (EXECUTE)**
- Com base no cenário desenhado na FASE 2, gere as ações Cursor-ready.
- A primeira ação DEVE ser sempre "explorar-tela" para mapear os locators reais.
- A ação de criar o arquivo de teste (.spec.js) DEVE obrigatoriamente usar a pasta "cypress/e2e/incidentes/".
- O nome do arquivo .spec.js DEVE obrigatoriamente começar com o número do caso (NumCaso) seguido de um nome descritivo. Exemplo: "cypress/e2e/incidentes/87409-FiltroOrdenacaoCliente.spec.js".
- Sugira ações para editar/criar Page Objects e Locators apenas se necessário para o cenário.

Para cada incidente, forneça na sua resposta:
- Um resumo do seu entendimento sobre o bug (FASE 1).
- Os cenários de regressão gerados com objetivo, passos e resultado esperado (FASE 2).
- As ações Cursor-ready necessárias (FASE 3).

JSON DOS INCIDENTES:
${incidentesJson}`;
}
