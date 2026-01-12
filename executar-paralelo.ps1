# SCRIPT DE EXECUCAO PARALELA (OPTIMIZED - 14 THREADS)
# Divisão Granular Baseada em Pastas para Performance Otimizada em 14 Threads
# Uso: ./executar-paralelo.ps1 [TagOpcional]

param (
    [string]$FiltroExtra = ""
)

# Definição dos Grupos por PASTAS (Filesystem)
# Quebra os módulos grandes em subgrupos para balancear a carga em 14 threads

$grupos = @(
    # 1. FISCAL GERAL (Sped, Sintegra, NFCe, NFe)
    @{ Nome = "Fiscal_Geral";        Specs = "cypress/e2e/sped/**/*.spec.js,cypress/e2e/sintegra/**/*.spec.js,cypress/e2e/nfce/**/*.spec.js,cypress/e2e/nfe/**/*.spec.js" },
    
    # 2. FISCAL VENDAS (NFCe/NFe Mix - Volume Alto)
    @{ Nome = "Fiscal_Vendas";       Specs = "cypress/e2e/venda-nfcenfe/**/*.spec.js" },
    
    # 3. VENDAS COMPLETO
    @{ Nome = "Vendas_Completo";     Specs = "cypress/e2e/vendas/**/*.spec.js,cypress/e2e/orcamento/**/*.spec.js,cypress/e2e/consignacao/**/*.spec.js,cypress/e2e/cadastro-clientes/**/*.spec.js" },

    # 4. FINANCEIRO MOVIMENTACOES
    @{ Nome = "Financeiro_Mov";      Specs = "cypress/e2e/financeiro/nova*.spec.js,cypress/e2e/financeiro/editar*.spec.js,cypress/e2e/financeiro/baixar*.spec.js,cypress/e2e/financeiro/recebimento.spec.js,cypress/e2e/financeiro/recibo.spec.js,cypress/e2e/financeiro/transferencia*.spec.js" },

    # 5. FINANCEIRO GESTAO (Resto)
    @{ Nome = "Financeiro_Gestao";   Specs = "cypress/e2e/financeiro/**/*.spec.js"; Exclude = "cypress/e2e/financeiro/nova*.spec.js,cypress/e2e/financeiro/editar*.spec.js,cypress/e2e/financeiro/baixar*.spec.js,cypress/e2e/financeiro/recebimento.spec.js,cypress/e2e/financeiro/recibo.spec.js,cypress/e2e/financeiro/transferencia*.spec.js" },

    # 6. ESTOQUE PRODUTOS
    @{ Nome = "Estoque_Produtos";    Specs = "cypress/e2e/produtos/**/*.spec.js,cypress/e2e/cadastro-produto/**/*.spec.js,cypress/e2e/producao/**/*.spec.js,cypress/e2e/produto/**/*.spec.js" },

    # 7. ESTOQUE GESTAO
    @{ Nome = "Estoque_Gestao";      Specs = "cypress/e2e/compras/**/*.spec.js,cypress/e2e/estoque/**/*.spec.js,cypress/e2e/Balanco/**/*.spec.js,cypress/e2e/vinculo-fiscal/**/*.spec.js" },

    # 8. CONFIG ENTIDADES
    @{ Nome = "Config_Entidades";    Specs = "cypress/e2e/configuracoes/empresa*.spec.js,cypress/e2e/configuracoes/funcionario*.spec.js,cypress/e2e/configuracoes/usuario*.spec.js,cypress/e2e/configuracoes/cadastro-contador.spec.js" },

    # 9. CONFIG GERAL (Resto)
    @{ Nome = "Config_Geral";        Specs = "cypress/e2e/configuracoes/**/*.spec.js"; Exclude = "cypress/e2e/configuracoes/empresa*.spec.js,cypress/e2e/configuracoes/funcionario*.spec.js,cypress/e2e/configuracoes/usuario*.spec.js,cypress/e2e/configuracoes/cadastro-contador.spec.js" },

    # 10. RELATORIOS FISCAL
    @{ Nome = "Relatorios_Fiscal";   Specs = "cypress/e2e/relatorio/relatorio-fiscal*.spec.js,cypress/e2e/relatorio/relatorio-contas*.spec.js,cypress/e2e/relatorio/relatorio-caixa.spec.js" },

    # 11. RELATORIOS VENDAS/ESTOQUE
    @{ Nome = "Relatorios_Vendas";   Specs = "cypress/e2e/relatorio/relatorio-comissao.spec.js,cypress/e2e/relatorio/relatorio-gerente-vendas.spec.js,cypress/e2e/relatorio/relatorio-mais-vendidos.spec.js,cypress/e2e/relatorio/relatorio-listagem-clientes.spec.js,cypress/e2e/relatorio/relatorio-forma-pagamento.spec.js,cypress/e2e/relatorio/relatorio-tabela-preco.spec.js,cypress/e2e/relatorio/relatorio-exibir-estoque.spec.js,cypress/e2e/relatorio/relatorio-ficha-estoque.spec.js,cypress/e2e/relatorio/relatorio-movimentacao-estoque.spec.js,cypress/e2e/relatorio/relatorio-inventario.spec.js" },

    # 12. RELATORIOS DIVERSOS (Resto)
    @{ Nome = "Relatorios_Diversos"; Specs = "cypress/e2e/relatorio/**/*.spec.js"; Exclude = "cypress/e2e/relatorio/relatorio-fiscal*.spec.js,cypress/e2e/relatorio/relatorio-contas*.spec.js,cypress/e2e/relatorio/relatorio-caixa.spec.js,cypress/e2e/relatorio/relatorio-comissao.spec.js,cypress/e2e/relatorio/relatorio-gerente-vendas.spec.js,cypress/e2e/relatorio/relatorio-mais-vendidos.spec.js,cypress/e2e/relatorio/relatorio-listagem-clientes.spec.js,cypress/e2e/relatorio/relatorio-forma-pagamento.spec.js,cypress/e2e/relatorio/relatorio-tabela-preco.spec.js,cypress/e2e/relatorio/relatorio-exibir-estoque.spec.js,cypress/e2e/relatorio/relatorio-ficha-estoque.spec.js,cypress/e2e/relatorio/relatorio-movimentacao-estoque.spec.js,cypress/e2e/relatorio/relatorio-inventario.spec.js" },

    # 13. SISTEMA E SERVICOS
    @{ Nome = "Sistema_Servicos";    Specs = "cypress/e2e/login/**/*.spec.js,cypress/e2e/menulateral/**/*.spec.js,cypress/e2e/setup/**/*.spec.js,cypress/e2e/servicos/**/*.spec.js,cypress/e2e/contratos/**/*.spec.js,cypress/e2e/ta-em-ordem/**/*.spec.js" },

    # 14. PETSHOP
    @{ Nome = "Segmento_Petshop";    Config = "cypress.config.petshop.js" }
)

Write-Host "PREPARANDO AMBIENTE (OPTIMIZED - 14 THREADS)..." -ForegroundColor Yellow
if ($FiltroExtra) {
    Write-Host "Filtro de Tag Adicional Ativo: $FiltroExtra" -ForegroundColor Cyan
}

# Limpeza
if (Test-Path "allure-results") { 
    Remove-Item -Recurse -Force "allure-results\*" -ErrorAction SilentlyContinue
    Write-Host "Pasta 'allure-results' limpa." -ForegroundColor Gray
} else {
    New-Item -ItemType Directory -Force "allure-results" | Out-Null
}
if (Test-Path "allure-report") { 
    Remove-Item -Recurse -Force "allure-report" -ErrorAction SilentlyContinue
}
if (-not (Test-Path "logs")) { New-Item -ItemType Directory -Force "logs" | Out-Null }

Write-Host "INICIANDO EXECUCAO PARALELA..." -ForegroundColor Green

$currentDir = Get-Location
$processos = @()

foreach ($grupo in $grupos) {
    $nome = $grupo.Nome
    $config = $grupo.Config
    $specs = $grupo.Specs
    $exclude = $grupo.Exclude 
    
    $logFile = "$currentDir\logs\$nome.txt"
    
    Write-Host "Iniciando: $nome" -ForegroundColor Cyan
    
    # Argumento de Tag Extra
    if ($FiltroExtra) {
        $envTag = "--env grepTags=`"$FiltroExtra`""
    } else {
        $envTag = ""
    }
    
    # Se o grupo tem Config personalizada, usa Cypress CLI diretamente
    if ($config) {
        # Usa config file - o specPattern já está definido no arquivo de config
        $cmdInterno = "npx cypress run --browser chrome --config-file $config $envTag | Tee-Object -FilePath '$logFile'"
    } else {
        # Usa npm script padrão com --spec
        # Tratamento de Specs (Array ou String)
        if ($specs -is [array]) {
            $specsString = $specs -join ","
        } else {
            $specsString = $specs
        }

        # Tratamento de Exclusao Específica
        # Se houver exclusao explicita, transformamos em glob de negacao
        if ($exclude) {
            $excludeArr = $exclude -split ","
            $negatedExclude = $excludeArr | ForEach-Object { "!$_" }
            $specsString = "$specsString," + ($negatedExclude -join ",")
        }
        
        $cmdInterno = "npm run test:chrome -- --spec `"$specsString`" $envTag | Tee-Object -FilePath '$logFile'"
    }
    
    $argumentos = "-WindowStyle", "Minimized", "-NoExit", "-Command", "& { cd '$currentDir'; Write-Host 'Grupo: $nome'; $cmdInterno; Write-Host 'FIM. Fechando em 5s...'; Start-Sleep -Seconds 5; Exit }"
    
    $p = Start-Process powershell -ArgumentList $argumentos -PassThru
    $processos += $p
    
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "--- AGUARDANDO TERMINO DOS TESTES ---" -ForegroundColor Yellow
Write-Host "Nao feche esta janela. O relatorio sera gerado automaticamente ao final." -ForegroundColor Gray

while ($processos | Where-Object { -not $_.HasExited }) {
    Start-Sleep -Seconds 5
}

Write-Host ""
Write-Host "TODOS OS TESTES FINALIZADOS!" -ForegroundColor Green
Write-Host "Gerando relatorio Allure..." -ForegroundColor Cyan

npm run report:allure
