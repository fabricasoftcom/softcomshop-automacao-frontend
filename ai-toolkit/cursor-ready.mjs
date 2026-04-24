/**
 * Formatador de saída Cursor-ready.
 * Converte resultados estruturados (objetos) em markdown com seção de ações
 * que o Cursor Agent mode pode consumir após validação humana.
 */

/**
 * Formata uma ação Cursor-ready em markdown.
 * @param {object} acao - { titulo, tipo, arquivo, descricao, contexto?, codigoAtual?, codigoSugerido? }
 * @param {number} index - Índice da ação (1-based)
 * @returns {string}
 */
export function formatAcao(acao, index = 1) {
  const lines = [
    `### [APROVADO] Ação ${index}: ${acao.titulo || 'Sem título'}`,
    `- **Tipo**: ${acao.tipo || 'editar-arquivo'}`,
    `- **Arquivo(s)**: ${acao.arquivo || acao.url || '(não especificado)'}`,
    `- **O que fazer**: ${(acao.descricao || '').replace(/\n/g, ' ')}`,
  ];
  if (acao.url && acao.tipo === 'explorar-tela') {
    lines.splice(3, 0, `- **URL**: ${acao.url}`);
  }
  if (acao.contexto) {
    lines.push(`- **Contexto**: ${acao.contexto.replace(/\n/g, ' ')}`);
  }
  if (acao.codigoAtual) {
    lines.push(`- **Código atual**: \`${acao.codigoAtual.replace(/`/g, '\\`')}\``);
  }
  if (acao.codigoSugerido) {
    lines.push(`- **Código sugerido**:`);
    lines.push('  ```javascript');
    lines.push(acao.codigoSugerido.split('\n').map((l) => '  ' + l).join('\n'));
    lines.push('  ```');
  } else if (acao.estruturaSugerida) {
    lines.push(`- **Estrutura sugerida**:`);
    lines.push('  ```javascript');
    lines.push(acao.estruturaSugerida.split('\n').map((l) => '  ' + l).join('\n'));
    lines.push('  ```');
  }
  return lines.join('\n');
}

/**
 * Gera a seção "Ações Cursor-ready" a partir de uma lista de ações.
 * @param {Array<object>} acoes - Lista de ações (cada uma com titulo, tipo, arquivo, descricao, etc.)
 * @param {string} [intro] - Texto opcional antes das ações (ex: aviso sobre ordem de execução)
 * @param {string} [reportPath] - Caminho do relatório gerado para referência no prompt
 * @returns {string} Bloco markdown
 */
export function formatAcoesCursorReady(acoes, intro = '', reportPath = '') {
  const instrucoes = `> Instruções para o Cursor Agent mode. Copie esta seção inteira
> e cole no chat do Cursor com: "Implemente as ações aprovadas abaixo. Antes de codificar, leia a análise completa e o contexto no arquivo @${reportPath || '[nome-do-relatorio.md]'} para entender os detalhes, regras e motivos de cada ação."
> Remova ou altere [APROVADO] para [REJEITADO] nas ações que NÃO deseja executar.`;

  const parts = [
    '## Ações Cursor-ready',
    '',
    instrucoes,
    '',
  ];
  if (intro) {
    parts.push(intro.trim(), '');
  }
  acoes.forEach((acao, i) => {
    parts.push(formatAcao(acao, i + 1), '');
  });
  return parts.join('\n').trimEnd();
}

/**
 * Converte redundâncias do analyze-rules em ações Cursor-ready.
 * @param {Array<object>} redundancias - Array com regra1, regra2, sugestao, acaoCursor
 * @returns {Array<object>} Ações no formato { titulo, tipo, arquivo, descricao, contexto }
 */
export function redundanciasToAcoes(redundancias) {
  return (redundancias || []).map((r) => ({
    titulo: `Consolidar regras redundantes: ${(r.regra1 || '').slice(0, 50)}...`,
    tipo: (r.acaoCursor && r.acaoCursor.tipo) || 'editar-arquivo',
    arquivo: (r.acaoCursor && r.acaoCursor.arquivo) || '.cursor/rules/architeture.mdc',
    descricao: (r.acaoCursor && r.acaoCursor.descricao) || r.sugestao,
    contexto: `Redundância: ${r.regra1} | ${r.regra2}. ${r.sugestao}`,
  }));
}

/**
 * Converte gaps do analyze-rules em ações Cursor-ready.
 */
export function gapsToAcoes(gaps) {
  return (gaps || []).map((g) => ({
    titulo: `Cobrir gap: ${(g.descricao || '').slice(0, 60)}...`,
    tipo: (g.acaoCursor && g.acaoCursor.tipo) || 'criar-arquivo',
    arquivo: (g.acaoCursor && g.acaoCursor.arquivo) || 'docs/adr/',
    descricao: (g.acaoCursor && g.acaoCursor.descricao) || g.sugestaoRegra,
    contexto: g.descricao,
  }));
}

/**
 * Converte conflitos do analyze-rules em ações.
 */
export function conflitosToAcoes(conflitos) {
  return (conflitos || []).map((c) => ({
    titulo: `Resolver conflito entre regras`,
    tipo: (c.acaoCursor && c.acaoCursor.tipo) || 'editar-arquivo',
    arquivo: (c.acaoCursor && c.acaoCursor.arquivo) || '.cursor/rules/architeture.mdc',
    descricao: (c.acaoCursor && c.acaoCursor.descricao) || c.sugestaoResolucao,
    contexto: `Conflito: ${c.descricaoConflito}`,
  }));
}

/**
 * Converte melhorias do analyze-rules em ações.
 */
export function melhoriasToAcoes(melhorias) {
  return (melhorias || []).map((m) => ({
    titulo: `Melhorar regra: ${(m.regraAtual || '').slice(0, 50)}...`,
    tipo: (m.acaoCursor && m.acaoCursor.tipo) || 'editar-arquivo',
    arquivo: (m.acaoCursor && m.acaoCursor.arquivo) || '.cursor/rules/architeture.mdc',
    descricao: (m.acaoCursor && m.acaoCursor.descricao) || m.sugestaoMelhoria,
    contexto: m.justificativa,
    codigoSugerido: (m.acaoCursor && m.acaoCursor.codigoSugerido) || undefined,
  }));
}
