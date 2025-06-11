# Todo App

Next.js와 JSON Server를 사용한 간단한 Todo 애플리케이션입니다.

## 기술 스택

- **Frontend**
  - Next.js
  - TypeScript
  - Tailwind CSS
  - Tanstack Query
  - Headless UI

- **Backend**
  - JSON Server
  - Render (호스팅)

## 주요 기능

- 할 일 추가/삭제
- 할 일 완료 상태 토글
- 할 일 필터링 (전체/완료/미완료)
- 반응형 디자인
- 스켈레톤 UI

## 시작하기

### 프론트엔드 (Next.js)

```bash
# 저장소 클론
git clone [repository-url]

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 백엔드 (JSON Server)

```bash
# JSON Server 설치
npm install -g json-server

# 서버 실행
json-server --watch db.json --port 3000
```

## 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경변수를 설정합니다:
