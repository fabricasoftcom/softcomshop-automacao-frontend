# Regra: Validação de Métodos no Navegador

## Objetivo
Garantir que métodos e funções recorrentes sejam validados no navegador real antes de serem implementados ou quando houver problemas recorrentes.

## Quando Validar

### Obrigatório (Sempre)
1. **Métodos novos que interagem com elementos dinâmicos** (dropdowns, modais, tabelas)
2. **Métodos que manipulam estados complexos** (wizard, multi-step forms)
3. **Métodos que lidam com elementos que aparecem/desaparecem** (loading, skeletons, animações)
4. **Métodos que interagem com elementos dentro de contextos específicos** (linhas de tabela, modais aninhados)

### Recomendado (Quando houver problemas)
1. **Métodos que falham frequentemente** em testes
2. **Métodos que dependem de timing** (aguardar elementos aparecerem)
3. **Métodos que interagem com múltiplos elementos similares** (vários dropdowns na página)

## Como Validar

### Passos
1. **Navegar para a tela** onde o método será usado
2. **Reproduzir o fluxo manualmente** no navegador
3. **Observar o comportamento real** dos elementos:
   - Quando aparecem/desaparecem
   - Estrutura do DOM
   - Animações e delays
   - Contextos e hierarquias
4. **Ajustar o método** baseado nas observações
5. **Testar novamente** no navegador após ajustes

### Ferramentas Disponíveis
- `browser_navigate`: Navegar para URLs
- `browser_click`: Clicar em elementos
- `browser_type`: Preencher campos
- `browser_snapshot`: Capturar estado da página
- `browser_wait_for`: Aguardar elementos ou tempo
- `browser_evaluate`: Executar JavaScript

## Exemplo de Validação

### Método: `selecionarPrimeiraDevolucaoCompra()`

**Problema identificado:**
- Dropdown menu não estava dentro da linha `<tr>`
- Múltiplos dropdowns na página causavam conflitos
- Link só ficava visível após abrir o dropdown

**Solução validada:**
1. Clicar no botão de ações
2. Aguardar diretamente que o link fique visível (sem buscar dropdown)
3. Validar que o link existe e está visível antes de clicar

## Observações Importantes

1. **Sempre aguardar animações**: Elementos podem ter delays de animação
2. **Contexto é importante**: Elementos podem estar em hierarquias específicas do DOM
3. **Múltiplos elementos similares**: Usar filtros ou contextos específicos
4. **Estados dinâmicos**: Validar estados antes de interagir

## Notas

- Esta validação ajuda a identificar problemas de timing, estrutura DOM e comportamento real dos elementos
- Métodos validados no navegador têm maior taxa de sucesso em testes automatizados
- Quando possível, validar também casos de erro (ex: "Nenhum resultado encontrado")

