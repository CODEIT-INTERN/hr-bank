# HR Bank Admin

Spring 백엔드 과정 수강생들이 사용할 **인사 관리 어드민 프론트엔드**입니다.  
직원 / 부서 / 수정 이력 / 데이터 백업 / 대시보드 통계를 조회하고 관리할 수 있는 웹 애플리케이션입니다.

> 이 프로젝트는 **백엔드 수강생 학습 보조용**으로, 인증/권한 등 일부 기능은 단순화되어 있습니다.  
> (세션 스토리지 기반의 간단한 인증 상태만 사용, JWT 등은 사용하지 않음)

---

## 기술 스택

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (Untitled UI 디자인 시스템 참고)
- **상태 관리**: Zustand
- **라우팅**: React Router
- **HTTP Client**: Axios
- **차트**: Recharts
- **배포**: Vercel

## 환경 설정 (Environment Variables)

이 프로젝트는 외부 API 통신을 위해 환경 변수 설정이 필요합니다. 
루트 디렉토리에 `.env` 파일을 생성하고 아래 내용을 입력해 주세요.

| 변수명 | 필수 여부 | 설명 |
| :--- | :---: | :--- |
| `API_PROXY_TARGET` | **필수** | API 요청을 전달할 타겟 서버 주소 |

**설정 예시:**
```env
API_PROXY_TARGET=http://sprint-project-...com/sb/hrbank
```
---

## 주요 기능

### 1. 대시보드

- 총 직원 수
- 최근 일주일 수정 이력 건수
- 이번 달 신규 입사자 수
- 마지막 데이터 백업 시간
- 최근 1년 직원 수 추이 (단위: 일/주/월/분기/연도 선택)
- 부서별 / 직무별 직원 분포 차트

### 2. 부서 관리

- 부서 목록 조회
  - 이름/설명 검색 (디바운스)
  - 설립일 기준 정렬
  - 커서 기반 페이지네이션 + 무한 스크롤
- 부서 추가 / 수정 모달
  - 이름, 설명, 설립일 입력
  - 필수값 검증
  - 중복 부서명일 때 에러 메시지 표시 (`이미 존재하는 부서 이름이에요`)
- 부서 삭제
  - 소속 직원이 있는 경우 삭제 불가 → 에러 토스트 노출
  - 삭제 전 Confirm 모달

### 3. 직원 관리

- 직원 목록 조회 (검색 + 정렬 + 무한 스크롤)
- 직원 등록 / 수정 (프로필 이미지 업로드 포함)
- 상태(재직/휴직/퇴사) 변경
- 직원 상세 정보 조회
  
### 4. 수정 이력 관리

- 직원 정보 수정 이력 목록 조회 (검색 + 유형 + 정렬 + 무한 스크롤)
- 상세 diff 조회 (수정 정보 + 변경 전 + 변경 후)

### 5. 데이터 백업 관리

- 데이터 백업 이력 목록
  - 작업자 / 상태 / 기간으로 필터링
  - 상태 드롭다운 (전체, 진행중, 완료, 실패, 건너뜀)
  - 무한 스크롤
- 백업 생성 버튼
  - 백업 요청 성공 / 실패 시 토스트 알림
- 최근 백업 정보 표시
- 백업 파일 다운로드
  - Blob 응답을 받아 파일로 저장

---

## 프로젝트 구조

```txt
src/
├── api/                # Axios 기반 API 호출 모듈
│   ├── client.ts       # Axios 인스턴스 & 공통 설정
│   ├── department/     # 부서 관련 API
│   ├── employee/       # 직원 관련 API
│   ├── backup/         # 백업 관련 API
│   ├── file/           # 파일 관련 API
│   └── history/        # 수정 이력 관련 API             
├── components/
│   ├── common/         # 공통 UI 컴포넌트 (Button, Input, Table, Modal, Toast 등)
│   ├── layout/         # 레이아웃, Navigation, Header
│   ├── dashboard/      # 대시보드 전용 컴포넌트 (StatCard, 차트 등)
│   ├── department/     # 부서 페이지 전용 컴포넌트 (모달, 테이블 등)
│   └── ...
├── constants/          # 상수 (네비게이션, 상태 라벨 등)
├── hooks/              # 공통 훅 (use-infinite-scroll, use-debounced-value 등)
├── model/              # API 응답/요청 타입 정의
├── pages/              # 라우팅 되는 페이지 컴포넌트
│   ├── Dashboard.tsx
│   ├── Department.tsx
│   ├── Employee.tsx
│   ├── Backup.tsx
│   └── History.tsx
├── store/              # Zustand 스토어 (쿼리 스토어, UI 스토어)
│   ├── departmentStore.ts
│   ├── employeeStore.ts
│   ├── backupStore.ts
│   ├── employeeCountStore.ts
│   ├── employeeDistributionStore.ts
│   ├── employeeTrendStore.ts
│   ├── historyStore.ts
│   └── toastStore.ts
├── styles/
│   ├── theme.css       # Tailwind 관련 스타일
│   └── index.css       # Tailwind 엔트리 + 글로벌 스타일
├── types/              # 타입
│   ├── enums.css       
│   └── toast.css       
├── utils/              # 유틸 함수 (날짜, 정렬, axios 에러 핸들링 등)
└── main.tsx            # 진입점 (RouterProvider 포함)
