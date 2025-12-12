# Portfolio Site Setup Script - Structure Only
# Creates folders in current directory

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Portfolio Project Structure Generator" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Creating in current directory..." -ForegroundColor Yellow
Write-Host ""

# Folder structure
$folders = @(
    # SCSS Structure
    "src/scss/abstracts",
    "src/scss/base",
    "src/scss/layout",
    "src/scss/components",
    "src/scss/sections",
    "src/scss/pages",
    "src/scss/vendors",
    
    # JavaScript Structure
    "src/js/components",
    "src/js/sections",
    "src/js/utils",
    "src/js/data",
    "src/js/animations",
    
    # Build Output
    "dist/css",
    "dist/js",
    
    # Assets
    "assets/images",
    "assets/fonts",
    "assets/icons"
)

Write-Host "Creating folder structure..." -ForegroundColor Yellow
Write-Host ""

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
    Write-Host "  [+] $folder" -ForegroundColor Gray
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  Structure created successfully!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Created Structure:" -ForegroundColor Cyan
Write-Host ""
Write-Host "src/"
Write-Host "+-- scss/"
Write-Host "|   +-- abstracts/    # Variables, functions, mixins, animations"
Write-Host "|   +-- base/         # Reset, typography, global styles"
Write-Host "|   +-- layout/       # Header, footer, navigation, grid"
Write-Host "|   +-- components/   # Buttons, cards, modals (reusable)"
Write-Host "|   +-- sections/     # Hero, portfolio page sections"
Write-Host "|   +-- pages/        # Page-specific styles"
Write-Host "|   +-- vendors/      # External library styles"
Write-Host "+-- js/"
Write-Host "    +-- components/   # JS components"
Write-Host "    +-- sections/     # Section-specific JS"
Write-Host "    +-- utils/        # Utility functions"
Write-Host "    +-- data/         # Data files"
Write-Host "    +-- animations/   # Animation related"
Write-Host ""
Write-Host "dist/"
Write-Host "+-- css/              # Compiled CSS"
Write-Host "+-- js/               # Bundled JS"
Write-Host ""
Write-Host "assets/"
Write-Host "+-- images/           # Image files"
Write-Host "+-- fonts/            # Font files"
Write-Host "+-- icons/            # Icon files"
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create package.json"
Write-Host "2. Write SCSS files"
Write-Host "3. npm install && npm run dev"
Write-Host ""