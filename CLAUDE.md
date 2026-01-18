# CLAUDE.md

> **버전**: 1.0
> **마지막 업데이트**: 2026-01-18
> **용도**: Claude Code가 이 프로젝트 작업 시 참조하는 가이드

---

## Project Overview

**지독해 2026 스텝 모집 랜딩페이지** - 경주/포항 독서모임 "지독해"의 운영진 모집을 위한 프리미엄 랜딩페이지.

**Brand Tone:** "Premium Dark & Glowing" - 따뜻한 캠프파이어가 밤하늘 별빛 속에 빛나는 분위기. Aceternity UI 스타일.

**Target:** 기존 멤버 (모바일 우선 360px)

---

## Commands

```bash
npm run dev      # 개발 서버 (localhost:5173)
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 프리뷰
```

---

## Tech Stack

| Category | Technology | Notes |
|----------|------------|-------|
| Framework | **React 18** | Vite 기반 |
| Bundler | **Vite** | v7+ |
| Styling | **Tailwind CSS v4** | @tailwindcss/vite 플러그인 |
| Animation | **Framer Motion** | Aceternity UI 스타일 |
| Icons | **lucide-react** | 일관된 아이콘 |
| Utilities | **clsx + tailwind-merge** | cn() 함수 |

---

## Design System

### Colors (Dark Theme)

```css
/* index.css에 정의됨 */

/* 배경 */
--color-dark: #0a0a0f;           /* 메인 배경 */
--color-dark-card: #111118;      /* 카드 배경 */
--color-dark-elevated: #1a1a24;  /* 강조 배경 */

/* 텍스트 */
--color-text-primary: #ffffff;    /* 주요 텍스트 */
--color-text-secondary: #a3a3a3;  /* 보조 텍스트 */
--color-text-muted: #737373;      /* 비활성 텍스트 */

/* 브랜드 (Neon Orange) */
--color-neon: #FF6B00;            /* 메인 액센트 */
--color-neon-light: #FFB366;      /* 밝은 액센트 */
```

### Typography

| 용도 | 클래스 | 예시 |
|------|--------|------|
| 히어로 제목 | `text-4xl sm:text-5xl md:text-6xl font-bold` | 메인 헤드라인 |
| 섹션 제목 | `text-3xl sm:text-4xl font-bold` | 섹션 헤더 |
| 본문 | `text-base text-text-secondary` | 설명 텍스트 |
| 캡션 | `text-sm text-text-muted` | 보조 정보 |

### Spacing

모든 섹션: `py-24 sm:py-32` (일관된 수직 여백)

```
py-2  (8px)   - 요소 내부
py-4  (16px)  - 요소 간
py-6  (24px)  - 그룹 간
py-12 (48px)  - 섹션 내 구분
py-24 (96px)  - 섹션 간
```

---

## Component Structure

```
src/
├── components/
│   ├── ui/              # 재사용 UI 컴포넌트 (Aceternity 스타일)
│   │   ├── SparklesCore.jsx
│   │   ├── TextGenerateEffect.jsx
│   │   ├── MovingBorder.jsx
│   │   ├── WobbleCard.jsx
│   │   ├── InfiniteMovingCards.jsx
│   │   ├── Accordion.jsx
│   │   └── BentoGrid.jsx
│   │
│   ├── Hero.jsx          # 히어로 섹션
│   ├── VibeCheck.jsx     # 멤버 리뷰 (소셜 프루프)
│   ├── OurStory.jsx      # 숫자 통계
│   ├── RecruitmentRoles.jsx  # 모집 역할
│   ├── LeadersLetter.jsx # 팀장 메시지
│   ├── Benefits.jsx      # 혜택
│   ├── FAQ.jsx           # 자주 묻는 질문
│   ├── CountdownTimer.jsx
│   └── StickyBottomBar.jsx
│
├── lib/
│   └── utils.js          # cn() 유틸리티
│
└── index.css             # Tailwind + 커스텀 스타일
```

---

## Animation Patterns (Framer Motion)

### 스크롤 애니메이션

```jsx
const isInView = useInView(ref, { once: true, margin: '-100px' })

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
>
```

### 호버 효과

```jsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
```

### Stagger (순차 등장)

```jsx
transition={{ duration: 0.5, delay: index * 0.1 }}
```

---

## Code Conventions

### 파일 네이밍

| 유형 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `RecruitmentRoles.jsx` |
| 유틸리티 | camelCase | `utils.js` |
| UI 컴포넌트 | PascalCase | `WobbleCard.jsx` |

### 필수 규칙

```
✅ 모바일 우선 (360px 기준)
✅ Tailwind 클래스 사용 (인라인 스타일 금지)
✅ framer-motion으로 애니메이션
✅ 한글 UI 텍스트, 영어 코드/주석

❌ console.log 남기지 않기
❌ 하드코딩된 URL (상수로 분리)
❌ 200줄 초과 컴포넌트 (분리 필요)
```

---

## Key Constants

```javascript
// StickyBottomBar.jsx
const TARGET_DATE = new Date('2026-01-25T23:59:59+09:00').getTime()
const GOOGLE_FORM_URL = 'https://forms.gle/WdTMC4QseoCPmP288'
```

---

## Privacy Rules

리뷰/후기 섹션에서:
- 실명 사용 금지 → "새싹 멤버", "열혈 멤버", "고인물 멤버" 등 사용
- 이모지를 아바타로 사용

---

## Build Checklist

작업 완료 시:

```bash
npm run build    # 빌드 성공 확인
```

- [ ] 빌드 에러 없음
- [ ] 모바일 (360px) 확인
- [ ] 모든 CTA 버튼 링크 확인
- [ ] 타이머/날짜 정확성 확인

---

## Section Order

```
1. Hero (풀스크린)
2. VibeCheck (멤버 리뷰)
3. OurStory (숫자 통계)
4. RecruitmentRoles (역할 소개)
5. LeadersLetter (팀장 메시지)
6. Benefits (혜택)
7. FAQ (자주 묻는 질문)
8. StickyBottomBar (하단 CTA)
```
