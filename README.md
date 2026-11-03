# JW_Log

전북대학교 컴퓨터인공지능학부 3학년 위지우의 개인 소개 및 활동 기록 사이트입니다. Hugo와 PaperMod 테마를 사용하며 GitHub Pages로 배포합니다.

- 공개 사이트: https://jiwoo301.github.io/MyWebPage/
- 저장소: https://github.com/Jiwoo301/MyWebPage
- 배포 이력: https://github.com/Jiwoo301/MyWebPage/actions

## 프로젝트 구조

실제 사이트 소스는 저장소 루트가 아닌 `site/`에 있습니다. 아래 명령은 별도 안내가 없으면 저장소 루트(`MyWebPage`)에서 실행합니다.

| 위치 | 용도 |
| --- | --- |
| `site/hugo.toml` | 사이트 이름, 홈 소개, 연락처, 상단 메뉴, 운영 주소 |
| `site/content/posts/hello.md` | 관심분야 |
| `site/content/posts/learning-goals.md` | 학습목표와 실행 계획 |
| `site/content/posts/skills.md` | 역량과 활용 사례 |
| `site/content/posts/featured-activity.md` | 대표활동 |
| `site/assets/images/` | 합창단 사진 |
| `site/assets/css/extended/` | 사이트에 추가한 스타일 |
| `site/assets/js/choir-gallery.js` | 사진 전환 동작 |
| `site/layouts/_shortcodes/choir-gallery.html` | 사진 슬라이드 구성 |
| `site/static/files/` | 공개 첨부파일 |
| `site/themes/template/` | PaperMod 테마 원본 |
| `.github-pages.json` | 배포 빌드의 설정 파일 선택 |
| `.github/pages_build.py` | 배포용 빌드 스크립트 3.1 |
| `.github/workflows/hugo-pages.yml` | main push 후 자동 빌드·배포 |

## 도구와 설치

- Git: 저장소 복제, 커밋, push에 사용합니다.
- Python 3.12: GitHub Actions에서 사용하는 버전입니다. 빌드 스크립트는 3.9 이상을 지원하며 로컬에서는 3.12.6으로 확인했습니다.
- Hugo Extended 0.167.0: GitHub Actions에 고정된 버전입니다. 테마의 최소 요구 버전은 0.158.0이며 로컬 빌드는 Extended 0.168.0에서 확인했습니다.
- 테마는 저장소의 `site/themes/template/`에 포함되어 있습니다.

Windows PowerShell에서는 다음과 같이 Git과 Python을 설치할 수 있습니다. 이미 설치되어 있다면 버전만 확인합니다.

```powershell
winget install --id Git.Git -e
winget install --id Python.Python.3.12 -e
```

[Hugo 공식 릴리스](https://github.com/gohugoio/hugo/releases/tag/v0.167.0)에서 운영체제에 맞는 **Extended 0.167.0** 파일을 내려받아 압축을 풀고, `hugo` 실행 파일이 있는 폴더를 PATH에 추가합니다. 설치 후 터미널을 새로 열어 확인합니다.

```powershell
git --version
python --version
hugo version
```

현재 사이트는 별도의 Python 패키지나 npm 패키지 설치 없이 빌드할 수 있습니다. 기존 CI는 Node.js 24, Go 1.27.1, Dart Sass 1.105.0도 준비하지만 현재 콘텐츠와 스타일의 로컬 빌드에는 사용하지 않습니다.

## 복제와 로컬 실행

```powershell
git clone https://github.com/Jiwoo301/MyWebPage.git
cd MyWebPage
$env:HUGO_CACHEDIR = Join-Path (Get-Location).Path '.pages-tools/hugo-cache'
hugo server --source site
```

터미널에 표시되는 로컬 주소를 브라우저에서 엽니다. 종료할 때는 `Ctrl+C`를 누릅니다. 캐시를 작업 폴더 안에 지정하면 Windows의 기본 캐시 폴더 접근 문제를 피할 수 있습니다.

## 배포 방식으로 빌드하기

저장소 루트에서 다음 명령을 실행합니다.

```powershell
$env:HUGO_CACHEDIR = Join-Path (Get-Location).Path '.pages-tools/hugo-cache'
python .github/pages_build.py --build
```

성공하면 루트의 `public/`에 홈과 상세 페이지, 자산이 생성됩니다. 이 명령은 배포와 동일하게 `site/hugo.toml`을 읽습니다. `.github-pages.json`의 `config`는 `hugo.toml`로 유지합니다.

운영 주소의 `/MyWebPage/` 하위 경로를 유지하고, 메뉴는 `pageRef`로 상세 페이지를 연결합니다. `public/`, `.pages-tools/`, Hugo 임시 생성물은 `.gitignore`로 제외되어 있습니다.

## 내용 수정과 재배포

1. 위 표에서 대상 파일을 찾아 수정합니다. 소개 문구·메뉴는 `site/hugo.toml`, 각 상세 본문은 `site/content/posts/`에서 수정합니다.
2. 로컬 미리보기와 배포용 빌드로 확인합니다. 메뉴 목적지, 사진 전환, 첨부 PDF 링크, 좁은 화면 배치, 키보드 조작을 점검합니다.
3. 변경한 파일만 선택해 커밋하고 `main`에 push합니다. 다음은 README만 수정했을 때의 예시입니다.

```powershell
git status --short
git diff --check
git add README.md
git commit -m "README에 사이트 실행과 재배포 안내 추가"
git push origin main
```

4. [Actions](https://github.com/Jiwoo301/MyWebPage/actions)에서 해당 커밋의 `Deploy Hugo to GitHub Pages` 실행을 엽니다. push로 시작되었는지, `build`와 `deploy`가 모두 성공했는지 확인합니다.
5. [공개 사이트](https://jiwoo301.github.io/MyWebPage/)를 새로고침하고 실제 수정 내용과 링크 동작을 확인합니다. push 완료와 공개 반영 완료를 구분합니다.

GitHub 저장소의 **Settings → Pages → Build and deployment → Source**는 **GitHub Actions**를 사용합니다. 자동 배포 대상 브랜치는 `main`입니다. 배포가 실패하면 해당 실행의 실패 단계와 로그를 확인합니다.

## 테마 출처와 라이선스

- 사용 테마: [Hugo PaperMod](https://github.com/adityatelange/hugo-PaperMod), 제작자 Aditya Telange, MIT 라이선스.
- 테마 기반 원본: [hugo-paper](https://github.com/nanxiaobei/hugo-paper), 제작자 nanxiaobei.
- 원본 테마의 설명과 참고 링크는 [테마 README](site/themes/template/README.md)에 보존되어 있습니다.
- 라이선스 고지는 [루트 LICENSE](LICENSE)와 [테마 LICENSE](site/themes/template/LICENSE)에 보존되어 있습니다. 사이트 하단의 Hugo·PaperMod 출처 고지도 유지합니다.
