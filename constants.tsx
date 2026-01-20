
import { NavigationSection, TrimItem, FailureCase, Difficulty } from './types';

export const SECTIONS: NavigationSection[] = [
  { 
    id: 'foundation', 
    step: 'Step 1', 
    title: 'Foundation (기초)', 
    target: '초보 생산 관리자 / 디자이너', 
    goal: '6대 부자재의 명칭, 규격 읽는 법, 기본 용도 이해', 
    icon: 'BookOpen' 
  },
  { 
    id: 'application', 
    step: 'Step 2', 
    title: 'Application (실무)', 
    target: '주니어 MD / QC', 
    goal: '원단 혼용률에 따른 부자재 매칭, 기본 물성 테스트(Color Fastness 등)', 
    icon: 'PenTool' 
  },
  { 
    id: 'risk-mgmt', 
    step: 'Step 3', 
    title: 'Risk Mitigation (중급)', 
    target: '시니어 실무자 / 소싱 전문가', 
    goal: '공급망 리스크(REACH, CPSIA), 사고 사례 분석 및 FMEA 대응', 
    icon: 'ShieldAlert' 
  },
  { 
    id: 'risk-predictor', 
    step: 'Step 4', 
    title: 'AI Risk Predictor (예측)', 
    target: '생산 리더 / 소싱 매니저', 
    goal: '원단-부자재-가공의 조합 리스크 선제적 파악 및 사고 예방', 
    icon: 'Cpu' 
  },
];

export const TRIM_ITEMS: TrimItem[] = [
  { 
    id: 'label', 
    name: '라벨 및 행택 (Label/Tag)', 
    description: '의류의 ID 카드 및 케어 정보 전달 매체', 
    difficulty: Difficulty.Step1, 
    content: { 
      beginner: [
        '라벨 종류: 메인, 케어, 사이즈, 포인트 라벨',
        '태그 종류: 메인 태그, 가격 태그, 기능성 태그',
        '필수 기재: 품질경영촉진법 준수 (ISO 3758 케어 심볼)'
      ], 
      intermediate: [
        '색상 견뢰도: 세탁 및 마찰 시 라벨 잉크가 원단에 묻어나지 않는지 확인 (ISO 105-C06)',
        '열 저항성: 다림질 온도(150도)에서 라벨이 녹거나 변형되지 않는지 체크',
        '소싱 팁: 판매 국가별 필수 표기 문구와 기호 표준(ISO 3758) 매칭',
        '가공 옵션: 목 부위 까칠함 방지를 위한 초음파 컷팅(Ultrasonic Cut) 검토'
      ], 
      advanced: [
        '피부 자극 관리: pH Test 및 저자극 소재 소싱 (Oeko-Tex)',
        '절단면 클레임: 열처리 미흡으로 인한 거칠음(Scratchy) 방지 기술',
        '스마트 라벨: RFID/NFC 시스템 도입 시 리스크 및 보안 관리'
      ] 
    } 
  },
  { 
    id: 'thread', 
    name: '봉제사 (Sewing Thread)', 
    description: '의류의 형태를 유지하는 뼈대와 같은 실', 
    difficulty: Difficulty.Step1, 
    content: { 
      beginner: [
        '사종 구분: 스판 폴리(일반용), 코아사(고강력), 자수사',
        '번수 체계: 숫자가 클수록 얇음 (60s < 40s < 20s)',
        '합(Ply): 2합, 3합 등 가닥 꼬임 수 이해'
      ], 
      intermediate: [
        'DTM(Dye To Match): 메인 원단과 비커 테스트를 통해 색상 오차 확인',
        '고속 봉제성: 자동화 기계에서 실이 끊어지지 않도록 오일링 상태 확인',
        '실무 매칭: 고강도 코아사(Core Spun) vs 신축용 벌키사(Textured) 선택',
        '심 퍼커링 관리: 원단 두께에 따른 적정 번수 및 봉제 장력 조절'
      ], 
      advanced: [
        '고속 봉제 대응: 바늘 열에 의한 실 끊김(Melting) 해결법',
        '이염 방지: 색상 이염(Color Migration) 방지 특수 코팅사 가이드',
        '기능성 사종: 방화(Fire-retardant), 방수 봉제사 특수 소싱'
      ] 
    } 
  },
  {
    id: 'zipper',
    name: '지퍼 (Zipper)',
    description: '의류 개폐를 담당하는 복합 기능성 부자재',
    difficulty: Difficulty.Step1,
    content: {
      beginner: [
        '지퍼 3요소: 슬라이더, 이빨(Element), 테이프',
        '호수(#): 이빨 맞물림 폭(mm). 3호(바지), 5호(점퍼), 8호(헤비)',
        '타입 구분: 오픈, 클로즈, 투웨이(2-way) 타입'
      ],
      intermediate: [
        '왕복 개폐 테스트: 최소 500회 이상 개폐 시 내구성 확인',
        '측면 강도: 지퍼를 닫은 상태에서 양옆으로 당겼을 때의 견고함 측정',
        '기능 매칭: Auto-lock(바지/스커트) vs Non-lock(주머니/가방) 구분',
        '원단 수축 대응: 고수축 원단 사용 시 저수축 지퍼 테이프 소싱'
      ],
      advanced: [
        '자유 낙하 테스트: 슬라이더 고정 강도(Locking strength) 정밀 측정',
        '환경 규제: 니켈 프리(Nickel-free) 도금 기준 준수 여부',
        '염색 가공 리스크: 원단 후가공 시 지퍼 변색/부식 리스크 관리'
      ]
    }
  },
  { 
    id: 'interlining', 
    name: '심지 (Interlining)', 
    description: '형태 유지와 보강을 위한 보이지 않는 조력자', 
    difficulty: Difficulty.Step1, 
    content: { 
      beginner: [
        '접착 구분: 접착(Fusible) vs 비접착(Non-fusible)',
        '재질 구분: 부직포(저렴), 직물(Woven, 변형적음), 니트(신축성)',
        '규격 단위: 중량(gsm, g/㎡)으로 보강 정도 결정'
      ], 
      intermediate: [
        '박리 강도(Peeling Strength): 원단과 심지 간 접착력(0.5kg/inch 이상) 측정',
        '버블링 방지: 원단과 심지의 수축률 편차 사전 체크',
        'T.P.T 데이터 관리: 온도(Temp), 압력(Pressure), 시간(Time) 최적화',
        '외관 검사: 세탁 후 박리 여부 및 원단 표면 변화 확인'
      ], 
      advanced: [
        '박리 강도 테스트: Peeling Strength 정밀 측정을 통한 품질 보증',
        '버블링 해결: 세탁 후 거품 현상(Bubbling) 및 수축 불일치 RCA',
        '삼출 방지: 심지 수지 삼출(Striking through) 방지 대책 수립'
      ] 
    } 
  },
  { 
    id: 'button', 
    name: '단추 (Button)', 
    description: '심미성과 기능성을 동시에 담당하는 잠금 자재', 
    difficulty: Difficulty.Step1, 
    content: { 
      beginner: [
        '규격 단위: 리드(Ligne, L). 1L = 0.635mm',
        '종류 구분: 2홀/4홀, 샹크(기둥), 스냅(똑딱이), 캔톤(청바지)',
        '재질 이해: 폴리, 천연 너트, 금속, 자개 단추'
      ], 
      intermediate: [
        '충격 테스트: 일정 높이 낙하 충격 시 깨짐 여부 확인 (ISO/ASTM 기준)',
        '인장 테스트: 스냅(Snap) 이탈 방지를 위한 90N 인장력 테스트',
        '안전 기준: Nickel-Free(알레르기), Lead-Free(아동복 납 성분) 준수',
        '원단 두께 매칭: 스냅 발(Leg) 길이와 원단 두께의 적합성 검토'
      ], 
      advanced: [
        '충격 테스트: Impact Test 기준 준수를 통한 파손 리스크 관리',
        '마찰 견뢰도: 단추 구멍(Buttonhole)과의 마찰에 의한 오염 방지',
        '아동복 규정: 유아용 스냅 단추 인장 강도(90N 이상) 규정 대응'
      ] 
    } 
  },
  { 
    id: 'elastic', 
    name: '엘라스틱 밴드 (Elastic)', 
    description: '신축성이 필요한 부위에 사용되는 탄성 자재', 
    difficulty: Difficulty.Step1, 
    content: { 
      beginner: [
        '제조 구분: 편직(Knit, 부드러움), 직조(Woven, 탄탄함), 자카드(로고)',
        '신도 개념: 100% 신도는 10cm가 20cm까지 늘어남을 의미',
        '규격 읽기: 폭(mm) x 두께 x 신도(Stretch %)'
      ], 
      intermediate: [
        '신장 회복률(Recovery): 100% 늘린 후 원래 길이로 돌아오는 힘 측정',
        '열 노화 테스트(Heat Aging): 건조기 고온 노출 후 고무사 끊어짐 체크',
        '니들 커팅 주의: 고무사 절단 방지를 위한 볼 포인트 바늘 사용',
        '탄성 유지력: 반복 신장 후 잔류 변형 및 탄성 저하율 관리'
      ], 
      advanced: [
        '내노화 테스트: Heat Aging Test를 통한 고무 수명 예측',
        '내염소성: 수영복용의 경우 내염소성 탄성사 사용 의무화',
        '꼬임 방지: 세탁 후 밴드 뒤집힘(Rolling/Twisting) 방지 공정'
      ] 
    } 
  },
];

export const FAILURE_CASES: FailureCase[] = [
  // --- ZIPPER CASES ---
  {
    caseId: 'CASE_ZIP_001',
    trimType: '지퍼 (Zipper)',
    claimType: '슬라이더 락킹 불량 (Locking Failure)',
    rca: '슬라이더 내부 판스프링 탄성 저하 및 하중 테스트 설계 오류',
    standards: 'ISO 20261 (Zipper test methods)',
    severity: 'High',
    prevention: '입고 시 자유 낙하 테스트(Locking strength) 시료 수 증대 및 정밀 측정'
  },
  {
    caseId: 'CASE_ZIP_002',
    trimType: '지퍼 (Zipper)',
    claimType: '색상 전이 (Color Migration)',
    rca: '지퍼 테이프의 미고착 염료가 연색 원단으로 이염됨',
    standards: 'ISO 105-X12 (Rubbing fastness)',
    severity: 'Medium',
    prevention: '담색 원단 사용 시 소수성(Hydrophobic) 가공 테이프 지퍼 선택'
  },
  {
    caseId: 'CASE_ZIP_003',
    trimType: '지퍼 (Zipper)',
    claimType: '지퍼 이빨 탈락 (Teeth Detachment)',
    rca: '사출 압력 부족으로 인한 이빨과 테이프 간의 결합 강도 미달',
    standards: 'ISO 20261 (Cross-pull strength)',
    severity: 'High',
    prevention: '생산 로트별 횡인장 강도 테스트 리포트 확인 의무화'
  },
  {
    caseId: 'CASE_ZIP_004',
    trimType: '지퍼 (Zipper)',
    claimType: '니켈 기준치 초과 (Nickel Violation)',
    rca: '슬라이더 도금 공정 중 저가형 니켈 도금액 사용',
    standards: 'ISO 17234-1 (Chemical testing)',
    severity: 'High',
    prevention: '유럽 수출용의 경우 Nickel-free 인증 공급업체 소싱 및 분석 검사'
  },
  {
    caseId: 'CASE_ZIP_005',
    trimType: '지퍼 (Zipper)',
    claimType: '웨이브 현상 (Wavy Seam)',
    rca: '원단 수축률(2%) 대비 지퍼 테이프 수축률(4%) 과다로 인한 울음 현상',
    standards: 'ISO 6330 (Washing shrinkage)',
    severity: 'Medium',
    prevention: '메인 원단과 동일한 수축률을 가진 저수축 지퍼(Low Shrinkage Tape) 매칭'
  },

  // --- BUTTON CASES ---
  {
    caseId: 'CASE_BTN_001',
    trimType: '단추 (Button)',
    claimType: '단추 파손 (Impact Shattering)',
    rca: '폴리에스터 수지의 경화제 비율 오류로 인한 내충격성 약화',
    standards: 'ASTM D5171 (Impact resistance)',
    severity: 'High',
    prevention: '생산 전 Impact Test(낙하식 충격 테스트) 2.94J 기준 통과 확인'
  },
  {
    caseId: 'CASE_BTN_002',
    trimType: '단추 (Button)',
    claimType: '스냅 탈락 (Pull-off Failure)',
    rca: '아동복 원단 두께 대비 스냅 다리(Leg) 길이가 짧아 결합력 약화',
    standards: 'ISO 13935-2 (Seam strength)',
    severity: 'High',
    prevention: '아동복 90N(약 9kg) 인장 강도 테스트 전수 검사 체계 구축'
  },
  {
    caseId: 'CASE_BTN_003',
    trimType: '단추 (Button)',
    claimType: '금속 버튼 부식 (Corrosion)',
    rca: '습한 환경에서의 장기 보관 및 염수 노출에 의한 산화 현상',
    standards: 'ISO 9227 (Salt spray test)',
    severity: 'Medium',
    prevention: '해상 운송 시 내부 방습제 보강 및 염수 분무 테스트 성적서 확인'
  },
  {
    caseId: 'CASE_BTN_004',
    trimType: '단추 (Button)',
    claimType: '단추 구멍 마찰 이염 (Friction Staining)',
    rca: '단추 표면 코팅제가 마찰에 의해 원단 단추 구멍 부위를 오염시킴',
    standards: 'ISO 105-X12 (Color fastness)',
    severity: 'Medium',
    prevention: '표면 무광/코팅 처리된 단추의 경우 건/습 마찰 테스트 4급 이상 요구'
  },
  {
    caseId: 'CASE_BTN_005',
    trimType: '단추 (Button)',
    claimType: '도료 납 성분 검출 (Lead Contamination)',
    rca: '금속 버튼 위 도장(Painting) 시 비인증 페인트 사용',
    standards: 'CPSIA Section 101 (Lead content)',
    severity: 'High',
    prevention: '북미 수출용 부자재의 경우 Lead-free 성분 분석표 로트별 관리'
  },

  // --- THREAD CASES ---
  {
    caseId: 'CASE_THR_001',
    trimType: '봉제사 (Thread)',
    claimType: '심 퍼커링 (Seam Puckering)',
    rca: '봉제 시 실의 과도한 장력(Tension) 및 고수축 원단 매칭 오류',
    standards: 'ISO 13935 (Seam properties)',
    severity: 'Medium',
    prevention: '고신축 원단 사용 시 저수축 코아사(Core Spun) 및 장력 자동 조절기 사용'
  },
  {
    caseId: 'CASE_THR_002',
    trimType: '봉제사 (Thread)',
    claimType: '봉제 중 실 끊김 (Needle Melting)',
    rca: '고속 봉제 시 바늘과의 마찰열로 인해 폴리에스터 실이 녹음',
    standards: 'ISO 13934 (Tensile strength)',
    severity: 'Low',
    prevention: '실 표면 실리콘 오일 오일링(Lubrication) 처리 강화 및 냉각 바늘 사용'
  },
  {
    caseId: 'CASE_THR_003',
    trimType: '봉제사 (Thread)',
    claimType: '실 색상 번짐 (Bleeding)',
    rca: '미고착 염료가 세탁 시 원단으로 번짐(Wet Rubbing)',
    standards: 'ISO 105-C06 (Washing fastness)',
    severity: 'Medium',
    prevention: '배색 봉제 시 세탁 견뢰도 4.5급 이상의 고급 염색사 사용'
  },
  {
    caseId: 'CASE_THR_004',
    trimType: '봉제사 (Thread)',
    claimType: '봉합 강도 미달 (Low Tenacity)',
    rca: '부적절한 번수(굵기) 선택으로 인해 하중을 견디지 못하고 터짐',
    standards: 'ISO 2062 (Thread strength)',
    severity: 'High',
    prevention: '하중 부위(사타구니 등)에 고강력사(High Tenacity) 및 적정 번수 설계'
  },
  {
    caseId: 'CASE_THR_005',
    trimType: '봉제사 (Thread)',
    claimType: '이염 현상 (Color Migration)',
    rca: '가공제와 염료의 결합력이 약해 장기 보관 시 원단으로 색소 이동',
    standards: 'ISO 105-Z11 (Migration fastness)',
    severity: 'Medium',
    prevention: '입고 시 승화 전이 테스트(Sublimation test) 실시'
  },

  // --- LABEL/TAG CASES ---
  {
    caseId: 'CASE_LBL_001',
    trimType: '라벨 및 행택 (Label/Tag)',
    claimType: '피부 자극 (Skin Irritation)',
    rca: '라벨 가공 공정 중 잔류 화학물질의 pH 수치가 강산성/강알칼리성임',
    standards: 'ISO 3071 (Determination of pH)',
    severity: 'Medium',
    prevention: '피부 직접 접촉 라벨은 pH 4.0~7.5 범위 관리 및 Oeko-Tex 인증 확인'
  },
  {
    caseId: 'CASE_LBL_002',
    trimType: '라벨 및 행택 (Label/Tag)',
    claimType: '까칠함 클레임 (Scratchiness)',
    rca: '라벨 절단면의 열처리 미흡으로 인해 미세한 플라스틱 돌기 형성',
    standards: 'ISO 12947 (Abrasion resistance)',
    severity: 'Low',
    prevention: '초음파 컷(Ultrasonic cut) 방식 도입 및 부드러운 직조 라벨(Soft edge) 적용'
  },
  {
    caseId: 'CASE_LBL_003',
    trimType: '라벨 및 행택 (Label/Tag)',
    claimType: '인쇄 흐려짐 (Print Fading)',
    rca: '케어 라벨 인쇄 시 원단 재질과 인쇄 리본 간의 상성 불일치',
    standards: 'ISO 105-C06 (Washing durability)',
    severity: 'Medium',
    prevention: '고온 세탁용 레진 리본(Resin Ribbon) 사용 및 세탁 5회 후 가독성 테스트'
  },
  {
    caseId: 'CASE_LBL_004',
    trimType: '라벨 및 행택 (Label/Tag)',
    claimType: '케어 기호 오류 (Symbol Error)',
    rca: '수출 국가별 세탁 기호 표준 미숙지로 인한 오기재',
    standards: 'ISO 3758 (Care labelling code)',
    severity: 'High',
    prevention: '국가별 케어 심볼 가이드라인(GINETEX 등) 크로스 체크 프로세스 도입'
  },
  {
    caseId: 'CASE_LBL_005',
    trimType: '라벨 및 행택 (Label/Tag)',
    claimType: '열판 압착 손상 (Heat Damage)',
    rca: '봉제 공정 중 열판 가압 시 라벨 원단이 수축하거나 녹음',
    standards: 'ISO 15797 (Heat resistance)',
    severity: 'Low',
    prevention: '고온 프레스 가공이 필요한 경우 내열성이 강한 나일론 태피터 대신 폴리에스터 라벨 사용'
  },

  // --- ELASTIC CASES ---
  {
    caseId: 'CASE_ELC_001',
    trimType: '엘라스틱 밴드 (Elastic)',
    claimType: '밴드 내부 고무사 절단 (Needle Cutting)',
    rca: '봉제 시 바늘이 밴드 내부의 고무사(Elastic thread)를 직접 타격하여 끊어버림',
    standards: 'ISO 13936 (Seam slippage)',
    severity: 'High',
    prevention: '고무사 밀도가 낮은 밴드 선택 및 끝이 둥근 바늘(Ball point needle) 사용'
  },
  {
    caseId: 'CASE_ELC_002',
    trimType: '엘라스틱 밴드 (Elastic)',
    claimType: '환원력 상실 (Loss of Recovery)',
    rca: '고온 건조기 노출 시 고무의 가열 노화로 인한 탄성 저하',
    standards: 'ISO 188 (Heat aging test)',
    severity: 'High',
    prevention: '고온 건조 환경이 예상되는 의류는 내열성 고무(Heat resistant rubber) 사용'
  },
  {
    caseId: 'CASE_ELC_003',
    trimType: '엘라스틱 밴드 (Elastic)',
    claimType: '내염소성 취약 (Chlorine Damage)',
    rca: '수영복용 밴드가 수영장 물의 염소 성분에 노출되어 고무가 딱딱하게 굳음',
    standards: 'ISO 105-E03 (Chlorinated water)',
    severity: 'Medium',
    prevention: '수영복 전용 고무(Chlorine resistant elastic) 필수 사용'
  },
  {
    caseId: 'CASE_ELC_004',
    trimType: '엘라스틱 밴드 (Elastic)',
    claimType: '밴드 꼬임 현상 (Rolling/Twisting)',
    rca: '바지 허리 밴드 터널 내부에서 밴드가 접히거나 꼬여 착용감 저하',
    standards: 'Internal Comfort Std',
    severity: 'Low',
    prevention: 'Woven 방식의 Non-roll 밴드 선택 및 중심부 스티치(Stitch-through) 고정'
  },
  {
    caseId: 'CASE_ELC_005',
    trimType: '엘라스틱 밴드 (Elastic)',
    claimType: '황변 현상 (Blooming)',
    rca: '고무 내부의 노화 방지제가 표면으로 배어나와 백색 원단을 오염시킴',
    standards: 'ISO 1431 (Ozone resistance)',
    severity: 'Medium',
    prevention: '안정화된 배합비의 고무사 사용 및 장기 보관 시 암모니아 가스 노출 차단'
  },

  // --- INTERLINING CASES ---
  {
    caseId: 'CASE_INT_001',
    trimType: '심지 (Interlining)',
    claimType: '박리 현상 (Delamination)',
    rca: '접착 온도 부족으로 인한 접착 수지의 불충분한 용융 및 원단 침투 실패',
    standards: 'ISO 2411 (Bond strength)',
    severity: 'High',
    prevention: 'T.P.T 가이드 준수 및 열전사 라벨을 이용한 실제 온도 보정 실시간 실시'
  },
  {
    caseId: 'CASE_INT_002',
    trimType: '심지 (Interlining)',
    claimType: '버블링 (Bubbling)',
    rca: '겉감과 심지의 세탁 수축률 편차로 인한 표면 우그러짐',
    standards: 'ISO 6330 (Washing procedures)',
    severity: 'High',
    prevention: '메인 생산 전 원단과 심지를 접착한 상태에서 수축률 매칭 테스트 의무화'
  },
  {
    caseId: 'CASE_INT_003',
    trimType: '심지 (Interlining)',
    claimType: '삼출 현상 (Strike-through)',
    rca: '박지 원단에 고온/고압 접착 시 수지가 원단 표면으로 배어나옴',
    standards: 'ISO 15797 (Industrial laundering)',
    severity: 'Medium',
    prevention: '저온 접착용 파우더 도트 심지 선택 및 다단 코팅 심지 적용'
  },
  {
    caseId: 'CASE_INT_004',
    trimType: '심지 (Interlining)',
    claimType: '형태 변형 (Warping)',
    rca: '겉감과 심지의 식서 방향 불일치로 인한 봉제 부위 뒤틀림',
    standards: 'ISO 13934-1 (Tensile properties)',
    severity: 'Medium',
    prevention: '재단실 매뉴얼에 심지 방향성 표기 강화 및 형입 검수 공정 추가'
  },
  {
    caseId: 'CASE_INT_005',
    trimType: '심지 (Interlining)',
    claimType: '유해물질 검출 (Formaldehyde)',
    rca: '심지 수지 가공 공정 중 가교제에서 발생한 유리 포름알데히드 기준치 초과',
    standards: 'ISO 14184-1 (Formaldehyde determination)',
    severity: 'High',
    prevention: 'Oeko-Tex Standard 100 인증 공급선 확보 및 입고 전 전수 로트별 유해물질 성적서 검토'
  },

  // --- CHILDREN SAFETY CASES ---
  {
    caseId: 'CASE_CHL_001',
    trimType: '라벨 및 행택 (Label/Tag)',
    claimType: '아동복 프린트 프탈레이트(Phthalate) 기준치 초과',
    rca: 'PVC 프린트 전사 라벨 제작 시 저가형 가소제 사용으로 인한 유해물질 용출',
    standards: 'CPSIA Section 108 / REACH Annex XVII',
    severity: 'High',
    prevention: 'Non-phthalate 가공 성적서 필수 확인 및 외부 공인 기관 정밀 분석'
  },
  {
    caseId: 'CASE_CHL_002',
    trimType: '단추 (Button)',
    claimType: '금속 스냅 단추 납(Lead) 함유량 규정 위반',
    rca: '금속 단추 베이스 합금 및 표면 도장 페인트 내 납 성분 관리 소홀',
    standards: 'CPSIA Section 101 (Children’s Products)',
    severity: 'High',
    prevention: '납 프리(Lead-free) 원부자재 관리 및 XRF 스캐닝을 통한 전수 로트 사전 검사'
  },
  {
    caseId: 'CASE_CHL_003',
    trimType: '지퍼 (Zipper)',
    claimType: '아동복 지퍼 도색면 납 성분 검출로 인한 리콜',
    rca: '지퍼 슬라이더 및 손잡이 도장 과정에서 규제 대상 안료(Pigment) 혼입',
    standards: 'ASTM F963 / CPSIA',
    severity: 'High',
    prevention: '검증된 글로벌 공급사(YKK 등) 소싱 및 아동 전용 라벨 생산 라인 운영'
  }
];
