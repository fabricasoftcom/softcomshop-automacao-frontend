# Script para executar todos os specs de relatórios individualmente
$specs = @(
    "cypress/e2e/relatorio/relatorio-caixa.spec.js",
    "cypress/e2e/relatorio/relatorio-periodo.spec.js",
    "cypress/e2e/relatorio/relatorio-mais-vendidos.spec.js",
    "cypress/e2e/relatorio/relatorio-forma-pagamento.spec.js",
    "cypress/e2e/relatorio/relatorio-gerente-vendas.spec.js",
    "cypress/e2e/relatorio/relatorio-evolucao.spec.js",
    "cypress/e2e/relatorio/relatorio-comissao.spec.js",
    "cypress/e2e/relatorio/relatorio-fiscal-saida-analitico.spec.js",
    "cypress/e2e/relatorio/relatorio-fiscal-saida-sintetico.spec.js",
    "cypress/e2e/relatorio/relatorio-fiscal-entrada-analitico.spec.js",
    "cypress/e2e/relatorio/relatorio-fiscal-entrada-sintetico.spec.js",
    "cypress/e2e/relatorio/relatorio-fiscal-pis-cofins.spec.js",
    "cypress/e2e/relatorio/relatorio-nfse.spec.js",
    "cypress/e2e/relatorio/relatorio-contas-receber.spec.js",
    "cypress/e2e/relatorio/relatorio-contas-pagar.spec.js",
    "cypress/e2e/relatorio/relatorio-projecao-cartoes.spec.js",
    "cypress/e2e/relatorio/relatorio-exibir-estoque.spec.js",
    "cypress/e2e/relatorio/relatorio-tabela-preco.spec.js",
    "cypress/e2e/relatorio/relatorio-ficha-estoque.spec.js",
    "cypress/e2e/relatorio/relatorio-inventario.spec.js",
    "cypress/e2e/relatorio/relatorio-ncm.spec.js",
    "cypress/e2e/relatorio/relatorio-movimentacao-estoque.spec.js",
    "cypress/e2e/relatorio/relatorio-aniversariantes.spec.js",
    "cypress/e2e/relatorio/relatorio-listagem-clientes.spec.js",
    "cypress/e2e/relatorio/relatorio-ultimas-compras.spec.js"
)

$results = @()

foreach ($spec in $specs) {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "Executando: $spec" -ForegroundColor Yellow
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    $output = npx cypress run --spec $spec --headless 2>&1
    $exitCode = $LASTEXITCODE
    
    $result = [PSCustomObject]@{
        Spec = $spec
        ExitCode = $exitCode
        Status = if ($exitCode -eq 0) { "PASSOU" } else { "FALHOU" }
    }
    
    $results += $result
    
    Write-Host "`nResultado: $($result.Status) (Exit Code: $exitCode)" -ForegroundColor $(if ($exitCode -eq 0) { "Green" } else { "Red" })
}

Write-Host "`n`n========================================" -ForegroundColor Cyan
Write-Host "RESUMO FINAL" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan

$passed = ($results | Where-Object { $_.Status -eq "PASSOU" }).Count
$failed = ($results | Where-Object { $_.Status -eq "FALHOU" }).Count

Write-Host "Total de Specs: $($results.Count)" -ForegroundColor White
Write-Host "Passou: $passed" -ForegroundColor Green
Write-Host "Falhou: $failed" -ForegroundColor Red

Write-Host "`nDetalhes:" -ForegroundColor Yellow
$results | Format-Table -AutoSize

