# Quality Ironworks - Unified Field Operations Portal Local Server
$port = 8088

# Helper to retrieve local LAN IP for Wi-Fi testing
$localIp = "localhost"
try {
    $ips = Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch "Loopback|vEthernet|Virtual" -and $_.IPAddress -notmatch "^169\.254" }
    if ($ips) {
        $localIp = $ips[0].IPAddress
    }
} catch {}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://*:$port/")

try {
    $listener.Start()
} catch {
    # If wildcard binding requires admin, fallback to localhost
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
}

Write-Host ""
Write-Host "=================================================================" -ForegroundColor DarkYellow
Write-Host "   QUALITY IRONWORKS - UNIFIED FIELD OPERATIONS PORTAL" -ForegroundColor Yellow
Write-Host "   QIW Manual Request & QIW Field Dims Dispenser" -ForegroundColor White
Write-Host "=================================================================" -ForegroundColor DarkYellow
Write-Host "  Workstation PC Link:  http://localhost:$port/index.html" -ForegroundColor Cyan
if ($localIp -ne "localhost") {
    Write-Host "  Mobile / Tablet Wi-Fi: http://${localIp}:$port/index.html" -ForegroundColor Green
}
Write-Host "=================================================================" -ForegroundColor DarkYellow
Write-Host "  Press Ctrl+C in this terminal to stop the portal server." -ForegroundColor Gray
Write-Host ""

Start-Process "http://localhost:$port/index.html"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath
        if ($path -eq "/" -or $path -eq "") {
            $path = "/index.html"
        }
        
        $cleanPath = $path.Replace("..", "").TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $filePath = Join-Path $PSScriptRoot $cleanPath
        
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css" }
                ".js"   { "application/javascript" }
                ".svg"  { "image/svg+xml" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".json" { "application/json" }
                ".xlsx" { "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
                ".pdf"  { "application/pdf" }
                ".zip"  { "application/zip" }
                default { "application/octet-stream" }
            }
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.Headers.Add("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    } catch {
        # Ignore client disconnects
    }
}
