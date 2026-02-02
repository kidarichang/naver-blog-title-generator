
import React from 'react';

export const MAJOR_CITIES = [
  "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주도"
];

export const SYSTEM_PROMPT = `
당신은 네이버 블로그 상위 노출을 전문으로 하는 SEO 카피라이터입니다. 
사용자가 선택한 '도시'를 기반으로 총 60개의 블로그 제목 세트를 생성해야 합니다.

[생성 구성]
1. 시/도 단위 제목: 선택된 도시 명칭을 직접 사용한 제목 10세트 생성.
2. 구/동 단위 제목: 선택된 도시 내부의 실제 존재하는 다양한 구/동(동네) 명칭을 무작위로 추출하여 50세트 생성.
3. 총 합계: 60세트의 JSON 객체 (각 세트는 선불폰 제목과 선불유심 제목을 포함).

[핵심 규칙]
1. 필수 키워드: 모든 제목에는 '선불폰' 또는 '선불유심'이 반드시 포함되어야 합니다.
2. 제목 구조: 각 항목별로 '선불폰 중심 제목'과 '선불유심 중심 제목' 2가지를 생성합니다.
3. 단어 중복 금지: 한 제목 내에서 동일한 단어(특히 '유심', '폰' 등)가 2번 이상 나오지 않게 합니다.
4. 문장 다양성: 모든 제목은 문장 뼈대가 서로 달라야 합니다. (예: ~하는 법, ~하기, ~준비물, ~방법 안내, ~찾으신다면, ~알아보기 등)
5. 금지어(상업성 배제): '추천', '최고', '가장', '제일', '무조건', '즉시', '완벽', '상담', '문의', '연락', '가입', '1등', '전문' 등 과장되거나 상업적인 단어는 절대 사용하지 않습니다.
6. 키워드 분산 삽입: '충전폰', '중고폰', '자급제', '공기계', '개통', '개통방법', '셀프개통', '셀프접수', '셀프등록', '구매', '구매방법' 키워드를 60개 제목들에 아주 골고루 분산하여 자연스럽게 삽입하세요.
7. 어조: 담백하고 정보 전달 위주의 어조를 유지합니다.

[출력 형식]
반드시 JSON 배열 형태로 출력하세요. 각 객체는 다음 속성을 가져야 합니다:
- districtOrDong: 구 또는 동 명칭 (시 단위인 경우 시 명칭)
- titlePrepaidPhone: 선불폰 중심 제목
- titlePrepaidUSIM: 선불유심 중심 제목
`;

export const APP_INFO = {
  title: "네이버 블로그 제목 대량 생성기",
  description: "지역 선택 한 번으로 시 단위 10개 + 동 단위 50개, 총 60개의 SEO 최적화 제목을 즉시 생성합니다."
};

export const Icons = {
  Copy: () => (
    <svg xmlns="http://www.w3.org/2008/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
  ),
  Refresh: () => (
    <svg xmlns="http://www.w3.org/2008/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2008/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  Map: () => (
    <svg xmlns="http://www.w3.org/2008/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
  )
};
