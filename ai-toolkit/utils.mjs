/**
 * Utilitários do AI Toolkit - leitura de arquivos e montagem de contexto.
 */
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const PROJECT_ROOT = process.cwd();

/**
 * Lê conteúdo de um arquivo (caminho relativo à raiz do projeto).
 * @param {string} relativePath - Caminho relativo (ex: docs/adr/0001-*.md)
 * @returns {string} Conteúdo do arquivo ou string vazia se não existir
 */
export function readFile(relativePath) {
  const fullPath = path.join(PROJECT_ROOT, relativePath);
  try {
    return fs.readFileSync(fullPath, 'utf-8');
  } catch (err) {
    if (err.code === 'ENOENT') return '';
    throw err;
  }
}

/**
 * Lista arquivos que batem com o padrão glob (relativo à raiz).
 * @param {string} pattern - Padrão glob (ex: docs/adr/*.md)
 * @returns {string[]} Lista de caminhos relativos
 */
export async function listFiles(pattern) {
  const files = await glob(pattern, { cwd: PROJECT_ROOT });
  return files.sort();
}

/**
 * Lê múltiplos arquivos e retorna objeto { caminho: conteudo }.
 * @param {string[]} relativePaths - Lista de caminhos relativos
 * @returns {Record<string, string>}
 */
export function readFiles(relativePaths) {
  const out = {};
  for (const p of relativePaths) {
    out[p] = readFile(p);
  }
  return out;
}

/**
 * Monta contexto concatenando vários textos com cabeçalhos.
 * @param {Array<{ title: string, content: string }>} sections
 * @returns {string}
 */
export function buildContext(sections) {
  return sections
    .filter((s) => s.content && s.content.trim())
    .map((s) => `## ${s.title}\n\n${s.content.trim()}`)
    .join('\n\n---\n\n');
}

/**
 * Garante que o diretório existe e grava o arquivo.
 * @param {string} relativePath - Caminho relativo do arquivo
 * @param {string} content - Conteúdo a gravar
 */
export function writeReport(relativePath, content) {
  const fullPath = path.join(PROJECT_ROOT, relativePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, 'utf-8');
}

/**
 * Verifica se OPENAI_API_KEY está definida.
 * @returns {boolean}
 */
export function hasApiKey() {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}
