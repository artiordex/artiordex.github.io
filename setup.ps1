# portfolio-structure.ps1 - 포트폴리오 프로젝트 폴더 구조 생성 스크립트

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Portfolio Project Structure Generator" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Creating in current directory..." -ForegroundColor Yellow
Write-Host ""

# 생성할 폴더 구조 정의
$folders = @(
    # SCSS 구조
    "src/scss/abstracts",
    "src/scss/base",
    "src/scss/layout",
    "src/scss/components",
    "src/scss/sections",
    "src/scss/pages",
    "src/scss/vendors",
    
    # JavaScript 구조
    "src/js/components",
    "src/js/sections",
    "src/js/utils",
    "src/js/data",
    "src/js/animations",
    
    # 빌드 결과물
    "dist/css",
    "dist/js",
    
    # 정적 자산
    "assets/images",
    "assets/fonts",
    "assets/icons"
)

Write-Host "Creating folder structure..." -ForegroundColor Yellow
Write-Host ""

# 폴더 생성
foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
    Write-Host "  [+] $folder" -ForegroundColor Gray
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  Structure created successfully!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

# 생성된 구조 출력
Write-Host "Created Structure:" -ForegroundColor Cyan
Write-Host ""
Write-Host "src/"
Write-Host "+-- scss/"
Write-Host "|   +-- abstracts/    # 변수, 함수, 믹스인"
Write-Host "|   +-- base/         # 리셋, 타이포, 전역 스타일"
Write-Host "|   +-- layout/       # 헤더, 푸터, 레이아웃"
Write-Host "|   +-- components/   # 재사용 컴포넌트"
Write-Host "|   +-- sections/     # 섹션 단위 스타일"
Write-Host "|   +-- pages/        # 페이지 전용 스타일"
Write-Host "|   +-- vendors/      # 외부 라이브러리 스타일"
Write-Host "+-- js/"
Write-Host "    +-- components/   # JS 컴포넌트"
Write-Host "    +-- sections/     # 섹션별 로직"
Write-Host "    +-- utils/        # 유틸 함수"
Write-Host "    +-- data/         # 데이터 파일"
Write-Host "    +-- animations/   # 애니메이션 관련"
Write-Host ""
Write-Host "dist/"
Write-Host "+-- css/              # 컴파일된 CSS"
Write-Host "+-- js/               # 번들된 JS"
Write-Host ""
Write-Host "assets/"
Write-Host "+-- images/           # 이미지"
Write-Host "+-- fonts/            # 폰트"
Write-Host "+-- icons/            # 아이콘"
Write-Host ""

# 다음 작업 안내
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create package.json"
Write-Host "2. Write SCSS files"
Write-Host "3. npm install && npm run dev"
Write-Host ""
