# 📚 Documentação do Projeto

Este diretório contém toda a documentação arquitetural, decisões e guias do projeto de automação de testes.

---

## 📂 Estrutura

### 📋 ADRs (Architecture Decision Records)
- `adr/` - Decisões arquiteturais importantes do projeto
- [Ver índice completo](./adr/README.md)

### 📝 Documentações de Casos
- `cases/` - Documentações arquiteturais detalhadas de cada spec
- [Ver índice completo](./cases/README.md)

### 📖 Referências e Guias
- `referencias/` - Guias práticos e ferramentas de apoio
- [Ver índice completo](./referencias/README.md)

### 📋 Lista de Testes
- `testes.md` - Inventário completo de todos os testes organizados por módulo

---

## 🚀 Início Rápido

### Para Desenvolvedores

1. Leia [Guia de Decisões Rápidas](./referencias/guia-decisoes-rapidas.md) - Guia principal para dúvidas comuns
2. Consulte [ADRs](./adr/README.md) para entender decisões arquiteturais
3. Siga [Processo de Documentação](./referencias/processo-documentacao.md) ao criar novos recursos
4. Consulte [Lista de Testes](./testes.md) para ver todos os testes disponíveis

### Para Revisores

1. Use [Checklist de Validação](./referencias/checklist-validacao-continua.md) durante code review
2. Valide conformidade com ADRs
3. Verifique documentação quando aplicável

---

## 🎓 Onboarding

### Para Novos Desenvolvedores

1. **Leitura obrigatória:**
   - Este README (visão geral)
   - [Guia de Decisões Rápidas](./referencias/guia-decisoes-rapidas.md) - Guia principal
   - [ADRs](./adr/README.md) - Decisões arquiteturais

2. **Leitura recomendada:**
   - ADRs principais relacionadas ao trabalho
   - Documentações dos módulos que vai trabalhar
   - [Processo de Documentação](./referencias/processo-documentacao.md)

3. **Prática:**
   - Criar primeiro ADR (com supervisão)
   - Criar primeira documentação (seguindo template)
   - Participar de code review usando checklist

---

## 🔄 Manutenção

### Atualização de ADRs

1. **Quando atualizar:**
   - Decisão mudou → Atualizar status para "Deprecated" ou "Superseded"
   - Nova informação relevante → Adicionar na seção "Notes"
   - Contexto mudou → Atualizar seção "Context"

2. **Como atualizar:**
   - Editar o arquivo do ADR
   - Atualizar status se necessário
   - Adicionar referência ao novo ADR se houver supersedência
   - Atualizar README dos ADRs

### Criação de Novos ADRs

1. **Quando criar:**
   - Decisão arquitetural significativa
   - Escolha de tecnologia importante
   - Padrão que afeta múltiplas partes do projeto
   - Decisão que pode ser questionada no futuro

2. **Processo:**
   - Criar arquivo seguindo nomenclatura: `XXXX-descriptive-title.md`
   - Usar próximo número sequencial
   - Seguir template padrão
   - Atualizar README dos ADRs
   - Referenciar em código/documentação relacionada

### Atualização de Documentações

1. **Quando atualizar:**
   - Código relacionado mudou significativamente
   - Novos padrões foram aplicados
   - ADRs relacionadas mudaram

2. **Processo:**
   - Identificar o que mudou
   - Atualizar seções relevantes
   - Manter histórico se necessário
   - Revisar referências a ADRs

---

## 📊 Métricas e Indicadores

### Indicadores de Qualidade

- **Cobertura de ADRs:** 16 ADRs documentadas
- **Documentações:** 54 documentações de casos
- **Atualização:** Verificar data da última atualização de cada ADR
- **Referências:** Número de referências a ADRs no código

### Revisão Periódica

- **Mensal:** Revisar ADRs antigas (>6 meses sem atualização)
- **Trimestral:** Revisar estrutura de documentação
- **Semestral:** Avaliar necessidade de novos guias/referências

---

## 🔗 Links Importantes

- [ADRs](./adr/README.md) - Todas as decisões arquiteturais
- [Documentações](./cases/README.md) - Documentações detalhadas
- [Referências](./referencias/README.md) - Guias e ferramentas
- [Lista de Testes](./testes.md) - Inventário completo de testes
- [Guia de Replicação](./referencias/guia-replicacao-estrutura-documentacao.md) - Como replicar esta estrutura em outros projetos

---

**Última atualização:** 2025-01-XX  
**Mantido por:** Equipe de Automação
