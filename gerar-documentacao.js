const fs = require("fs");
const path = require("path");

const TESTS_DIR = path.join(__dirname, "cypress/e2e");
const OUTPUT_FILE = path.join(__dirname, "docs/testes.md");

// Função para extrair os testes dos arquivos .spec.js
function extractTests() {
  const testCases = {};

  function readTestFile(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");

    const describes = [...content.matchAll(/describe\(["'`](.+?)["'`]/g)].map(m => m[1]);
    const its = [...content.matchAll(/it\(["'`](.+?)["'`]/g)].map(m => m[1]);

    return { describes, its };
  }

  function scanDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        scanDirectory(fullPath);
      } else if (file.endsWith(".spec.js")) {
        const relativePath = path.relative(TESTS_DIR, fullPath).replace(/\\/g, "/");
        const moduleName = path.dirname(relativePath).split("/")[0] || "Outros";

        const { describes, its } = readTestFile(fullPath);

        if (!testCases[moduleName]) testCases[moduleName] = [];
        testCases[moduleName].push({ file: relativePath, describes, its });
      }
    });
  }

  scanDirectory(TESTS_DIR);
  return testCases;
}

// Função para gerar o Markdown
function generateMarkdown() {
  const testCases = extractTests();
  let mdContent = `# 📌 Testes Automatizados no Cypress\n\n`;
  mdContent += `> 🚀 Este documento lista os testes organizados por módulo.\n\n`;

  for (const module in testCases) {
    mdContent += `## 🗂️ ${module}\n\n`;
    testCases[module].forEach(({ file, describes, its }) => {
      mdContent += `### 📂 Arquivo: \`${file}\`\n\n`;
      describes.forEach(d => mdContent += `#### 🔹 Suite: ${d}\n`);
      its.forEach(i => mdContent += `- ✅ ${i}\n`);
      mdContent += `\n`;
    });
  }

  fs.writeFileSync(OUTPUT_FILE, mdContent, "utf-8");
  console.log(`📄 Documentação gerada: ${OUTPUT_FILE}`);
}

generateMarkdown();
