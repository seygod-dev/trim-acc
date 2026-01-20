
import React, { useState, useMemo } from 'react';
import { SECTIONS, TRIM_ITEMS, FAILURE_CASES } from './constants';
import { Difficulty, FailureCase, TrimItem } from './types';
import { analyzeRiskScenario, getExpertFailureCase, predictApparelRisk, RiskAnalysis } from './services/geminiService';

// --- Icons (Simplified) ---
const Icon = ({ name, className }: { name: string, className?: string }) => {
  const icons: Record<string, string> = {
    BookOpen: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    PenTool: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
    ShieldAlert: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M12 8v4 M12 16h.01',
    Search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    Filter: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
    Tag: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
    ClipboardCheck: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    Trash: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    Cpu: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z m2 4h6v6H9V9z'
  };
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d={icons[name] || ''} />
    </svg>
  );
};

// --- Sub-components ---

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => (
  <aside className="w-72 bg-slate-900 text-white h-screen fixed left-0 top-0 overflow-y-auto z-10 flex flex-col">
    <div className="p-8 border-b border-slate-800">
      <h1 className="text-xl font-black tracking-tighter text-blue-400">TRIM <span className="text-white">GUARDIAN</span></h1>
      <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-[0.2em] font-bold">SMART MATERIAL MASTER</p>
    </div>
    <div className="px-4 pt-8">
      <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Learning Roadmap</p>
      <nav className="space-y-2">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`w-full text-left px-4 py-4 rounded-2xl transition-all flex items-center gap-4 border ${
              activeTab === section.id 
                ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-900/40 translate-x-1' 
                : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Icon name={section.icon} className="w-5 h-5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold opacity-60 leading-none mb-1">{section.step}</span>
              <span className="text-sm font-bold truncate">{section.title}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
    <div className="mt-auto p-6 bg-slate-950/40 border-t border-slate-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-blue-400">Gemini 3 Pro</span>
          <span className="text-[9px] text-slate-500 uppercase tracking-tighter">Expert Analysis Active</span>
        </div>
      </div>
    </div>
  </aside>
);

const Header = ({ section }: { section: typeof SECTIONS[0] }) => (
  <header className="mb-10">
    <div className="flex items-center gap-3 mb-3">
      <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-wider">{section.step}</span>
    </div>
    <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">{section.title}</h2>
    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-3xl">{section.goal}</p>
  </header>
);

const FoundationView = () => {
  const [selectedTopic, setSelectedTopic] = useState<number>(0);

  const topics = [
    {
      title: "1. 라벨 및 태그 (Label & Tag)",
      desc: "의류의 'ID 카드' 역할을 하는 섹션입니다. 부착 방식(봉제 vs 고리)에 따라 구분합니다.",
      imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200",
      subItems: [
        {
          name: "1-1. 라벨 (Label - 봉제형)",
          details: [
            "종류: 메인(브랜드), 케어(세탁/혼용률), 사이즈, 포인트(외부 노출).",
            "규격 읽기: 폭(Width) x 총길이(Full Length). (예: 15mm x 50mm). '접힘 분량(Seam Allowance)'을 반드시 확인해야 합니다.",
            "마감 종류: 센터폴드(Center Fold), 엔드폴드(End Fold), 미터폴드(Miter Fold - 양끝을 대각선으로 접음)."
          ]
        },
        {
          name: "1-2. 태그 (Tag - 탈부착형)",
          details: [
            "종류: 메인 태그(브랜드 이미지), 가격 태그(바코드/가격), 기능성 태그(고어텍스, 리사이클 등 소재 설명).",
            "구성 요소: 태그(종이/플라스틱) + 인쇄 + 스트링(끈) + 씰/로크(Seal/Lock - 끈 고정 플라스틱).",
            "규격 읽기: 종이의 평량(g/㎡ - 보통 250~400g 사용), 코팅 유무(무광/유광), 타공(Hole) 위치 및 지름."
          ]
        }
      ]
    },
    {
      title: "2. 봉제사 (Thread)",
      desc: "의류의 형태를 유지하는 '뼈대'입니다. 원단과 색상, 강도를 맞추는 것이 핵심입니다.",
      imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1200",
      content: [
        "핵심 명칭: 스판폴리(일반적인 면 느낌), 코아사(심지에 필라멘트를 감아 강도가 높고 광택이 있음).",
        "규격 읽기: 번수/합.",
        "숫자가 클수록 얇음: 60s(얇음) < 40s(보통) < 20s(두꺼움).",
        "합(Ply): 2합(두 가닥 꼬임), 3합(세 가닥 꼬임).",
        "현장 예시: '청바지 스티치는 20수 3합, 일반 봉제는 40수 2합으로 진행하세요.'"
      ]
    },
    {
      title: "3. 지퍼 (Zipper)",
      desc: "가장 클레임이 많은 복합 부자재입니다. 슬라이더의 작동과 이빨의 견고함이 중요합니다.",
      imageUrl: "https://images.unsplash.com/photo-1583095117194-9c8030999511?auto=format&fit=crop&q=80&w=1200",
      content: [
        "핵심 명칭: 슬라이더(Slider), 엘리먼트(Teeth/이빨), 테이프(Tape), 상지/하지(Stoppers).",
        "규격 읽기: 호수(#)와 길이.",
        "호수: 이빨이 맞물렸을 때의 폭(mm). 3호(여성복/바지), 5호(점퍼/아우터), 8호 이상(두꺼운 가방/헤비 아우터).",
        "타입: 니켈(실버), 골드, 흑니켈, 비슬론(플라스틱), 코일(나일론)."
      ]
    },
    {
      title: "4. 심지 (Interlining)",
      desc: "원단 뒷면에 붙어 형태를 잡아주는 '보이지 않는 조력자'입니다. 겉감과의 수축률 매칭이 필수입니다.",
      imageUrl: "https://images.unsplash.com/photo-1605117814643-09414b436997?auto=format&fit=crop&q=80&w=1200",
      content: [
        "핵심 명칭: 접착(Fusible - 다림질로 부착), 비접착(Non-fusible - 봉제로 고정).",
        "규격 읽기: 베이스 재질 + 중량(gsm).",
        "부직포 심지: 종이 같은 느낌, 저렴함.",
        "직물(Woven) 심지: 원단 느낌, 세탁 후 변형이 적음.",
        "니트 심지: 신축성이 있는 원단(다이마루 등)에 사용."
      ]
    },
    {
      title: "5. 단추 (Button)",
      desc: "심미성과 기능성을 동시에 담당합니다. 재질에 따라 세탁 및 충격 내구성이 다릅니다.",
      imageUrl: "https://images.unsplash.com/photo-1584184924103-e310d9dc85fc?auto=format&fit=crop&q=80&w=1200",
      content: [
        "핵심 명칭: 2홀/4홀 단추, 샹크(Shank - 기둥이 있는 단추), 스냅(Snap - 일명 똑딱이), 캔톤(청바지용 단추).",
        "규격 읽기: 리드(Ligne, L). 1L = 0.635mm.",
        "자주 쓰이는 규격: 14L(셔츠 소매), 18L(셔츠 앞단), 24L(바지 허리), 30L 이상(코트)."
      ]
    },
    {
      title: "6. 엘라스틱 밴드 (Elastic)",
      desc: "신축성이 필요한 부위에 사용됩니다. 반복 사용 후의 환원력이 품질의 핵심입니다.",
      imageUrl: "https://images.unsplash.com/photo-1582733367170-4f2482e9999a?auto=format&fit=crop&q=80&w=1200",
      content: [
        "핵심 명칭: 편직(Knit) 밴드(부드러움, 속옷용), 직조(Woven) 밴드(탄탄함, 바지 허리용), 자카드 밴드(로고가 짜인 형태).",
        "규격 읽기: 폭(mm) x 두께 x 신도(Stretch %).",
        "신도 100%란 10cm 밴드가 20cm까지 늘어남을 의미합니다. 아동복이나 임산부복은 신도와 환원력(원래대로 돌아오는 힘)이 매우 중요합니다."
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Foundation Guide</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">부자재 마스터를 위한 6대 핵심 아이템의 기초 명칭과 규격 읽는 법을 학습하세요.</p>
          </div>
          {topics.map((topic, index) => (
            <button
              key={index}
              onClick={() => setSelectedTopic(index)}
              className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center gap-4 ${
                selectedTopic === index 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg translate-x-1' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${selectedTopic === index ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {index + 1}
              </div>
              <div className="font-bold text-sm tracking-tight">{topic.title.split('. ')[1]}</div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8 bg-white p-0 rounded-[2.5rem] border border-slate-200 shadow-sm min-h-[600px] relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="relative z-10 flex flex-col h-full">
            {/* Header Image */}
            <div className="w-full h-80 overflow-hidden relative shrink-0">
              <img 
                src={topics[selectedTopic].imageUrl} 
                alt={topics[selectedTopic].title} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-110"
                onError={(e) => {
                  // Fallback for image errors
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-10">
                <span className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-2 block">Trim Masterclass</span>
                <h3 className="text-4xl font-black text-white drop-shadow-xl tracking-tight">{topics[selectedTopic].title}</h3>
              </div>
            </div>

            <div className="p-10 flex-1 overflow-y-auto">
              <p className="text-slate-600 font-medium text-lg mb-10 leading-relaxed border-l-4 border-blue-600 pl-6 italic">
                "{topics[selectedTopic].desc}"
              </p>

              <div className="space-y-8 pb-10">
                {topics[selectedTopic].subItems ? (
                  topics[selectedTopic].subItems.map((sub, i) => (
                    <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
                      <h4 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                        {sub.name}
                      </h4>
                      <ul className="grid grid-cols-1 gap-4">
                        {sub.details.map((detail, di) => (
                          <li key={di} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:border-blue-200 transition-colors">
                            <span className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0">0{di+1}</span>
                            <span className="text-slate-700 font-bold leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {topics[selectedTopic].content?.map((item, i) => (
                      <div key={i} className={`p-6 rounded-2xl border transition-all ${
                        item.includes('현장 예시') || item.includes('의미합니다')
                          ? 'bg-blue-900 text-white border-blue-800 shadow-xl mt-4 scale-105 mx-2'
                          : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-white hover:border-blue-200'
                      }`}>
                        <div className="flex items-start gap-4">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black shrink-0 ${
                            item.includes('현장 예시') || item.includes('의미합니다')
                              ? 'bg-blue-400 text-white'
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {item.includes('현장 예시') ? 'TIP' : (i + 1)}
                          </div>
                          <span className="font-bold leading-relaxed">{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-0"></div>
        </div>
      </div>
    </div>
  );
};

const QualityChecklist = ({ trimId }: { trimId: string }) => {
  const checklistData: Record<string, { item: string, standard: string, requirement: string, isKidsCritical: boolean, tip: string }[]> = {
    label: [
      { item: "세탁 견뢰도 (Color Fastness)", standard: "ISO 105-C06", requirement: "4.0 Grade 이상", isKidsCritical: true, tip: "배색 원단에 이염되지 않는지 확인" },
      { item: "프탈레이트 (Phthalate)", standard: "CPSIA / REACH", requirement: "1,000 ppm 미만", isKidsCritical: true, tip: "PVC 전사 라벨 필수 체크" },
      { item: "열 저항성 (Heat Resistance)", standard: "Internal", requirement: "150℃ 가열 시 변형 무", isKidsCritical: false, tip: "아이언 작업 시 녹음 방지" },
      { item: "pH 수치 (pH Value)", standard: "ISO 3071", requirement: "4.0 - 7.5 (중성)", isKidsCritical: true, tip: "피부 직접 접촉 시 자극 최소화" },
      { item: "인쇄 내구성 (Rubbing)", standard: "ISO 105-X12", requirement: "4.0 Grade (건/습)", isKidsCritical: true, tip: "케어 정보 유실 방지" }
    ],
    thread: [
      { item: "색상 일치도 (DTM)", standard: "Delta E Colorimeter", requirement: "ΔE < 1.0", isKidsCritical: false, tip: "메인 원단과 비커 테스트 필수" },
      { item: "봉합 강도 (Seam Strength)", standard: "ISO 13935", requirement: "원단 파괴 하중 기준", isKidsCritical: true, tip: "터짐 사고 방지 위해 적정 번수 사용" },
      { item: "수축률 (Shrinkage)", standard: "ISO 6330", requirement: "1.0% 미만", isKidsCritical: false, tip: "세탁 후 심 퍼커링 예방" },
      { item: "유해 물질 (Formaldehyde)", standard: "ISO 14184", requirement: "20 ppm 미만 (Kids)", isKidsCritical: true, tip: "영유아용은 미검출 수준 요구" },
      { item: "마찰 강도 (Rubbing)", standard: "ISO 105-X12", requirement: "4.0 Grade 이상", isKidsCritical: false, tip: "스티치 부위 색 빠짐 확인" }
    ],
    zipper: [
      { item: "왕복 개폐 (Reciprocating)", standard: "ISO 20261", requirement: "500회 이상 무결함", isKidsCritical: false, tip: "슬라이더와 이빨 내구성 보증" },
      { item: "니켈 용출량 (Nickel)", standard: "EN 1811", requirement: "0.5 μg/cm²/week", isKidsCritical: true, tip: "금속 알레르기 방지 (유럽 수출)" },
      { item: "납 함유량 (Lead)", standard: "CPSIA", requirement: "90 ppm 미만 (Paint)", isKidsCritical: true, tip: "지퍼 코팅면 유해 성분 체크" },
      { item: "횡인장 강도 (Lateral)", standard: "ISO 20261", requirement: "호수별 최소 강도 준수", isKidsCritical: false, tip: "지퍼 터짐 방지 핵심 지표" },
      { item: "슬라이더 락킹 (Locking)", standard: "Internal", requirement: "자동 낙하 방지", isKidsCritical: false, tip: "바지/스커트 흘러내림 방지" }
    ],
    interlining: [
      { item: "박리 강도 (Peeling)", standard: "ISO 2411", requirement: "0.5 kg/inch 이상", isKidsCritical: false, tip: "원단과 심지 결합력 측정" },
      { item: "세탁 후 외관 (Appearance)", standard: "ISO 6330", requirement: "Bubbling/Delam 무", isKidsCritical: false, tip: "세탁 후 표면 우그러짐 확인" },
      { item: "수축률 매칭 (Shrinkage)", standard: "Internal", requirement: "±0.5% (Shell 대비)", isKidsCritical: false, tip: "겉감과 동일 수축률 심지 소싱" },
      { item: "포름알데히드 (Formaldehyde)", standard: "ISO 14184", requirement: "20 ppm 미만", isKidsCritical: true, tip: "접착 수지 내 유해 성분 확인" },
      { item: "삼출 현상 (Strike-through)", standard: "Internal", requirement: "표면 수지 비침 무", isKidsCritical: false, tip: "박지 원단 접착 시 온도 조절" }
    ],
    button: [
      { item: "인장 강도 (Pull Test)", standard: "ASTM D7142", requirement: "90N / 10초 견딤", isKidsCritical: true, tip: "영유아 질식 사고 방지 (스냅)" },
      { item: "내충격성 (Impact)", standard: "ASTM D5171", requirement: "균열 및 파손 무", isKidsCritical: false, tip: "세탁/프레스 시 깨짐 방지" },
      { item: "납 함유량 (Lead)", standard: "CPSIA", requirement: "100 ppm 미만", isKidsCritical: true, tip: "금속/플라스틱 성분 분석 필수" },
      { item: "날카로운 모서리 (Edges)", standard: "16 CFR 1500", requirement: "Sharp points 무", isKidsCritical: true, tip: "아동 상해 방지 전수 검수" },
      { item: "세탁 견뢰도 (Migration)", standard: "ISO 105-C06", requirement: "4.0 Grade 이상", isKidsCritical: false, tip: "단추 색상이 원단에 묻는지 체크" }
    ],
    elastic: [
      { item: "신장 회복률 (Recovery)", standard: "ISO 20932", requirement: "95% 이상 회복", isKidsCritical: false, tip: "반복 사용 시 늘어남 방지" },
      { item: "열 노화 (Heat Aging)", standard: "ISO 188", requirement: "고온 건조 후 탄성 유지", isKidsCritical: false, tip: "건조기 사용 빈도 고려 테스트" },
      { item: "니들 커팅 (Needle Cut)", standard: "Internal", requirement: "고무사 절단 무", isKidsCritical: false, tip: "봉제 시 고무 탄성 유지 확인" },
      { item: "내염소성 (Chlorine)", standard: "ISO 105-E03", requirement: "4.0 Grade 이상", isKidsCritical: false, tip: "수영복용 밴드 필수 항목" },
      { item: "에코텍스 (Oeko-Tex)", standard: "Standard 100", requirement: "Class I (Baby)", isKidsCritical: true, tip: "민감성 피부용 안전 인증 소싱" }
    ]
  };

  const data = checklistData[trimId] || [];

  return (
    <div className="mt-12 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shadow-sm">
          <Icon name="ClipboardCheck" className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xl font-black text-slate-900 leading-none">품질 검사 결과서(Test Report) 필수 항목 5</h4>
          <p className="text-xs text-slate-500 mt-1 font-medium">소싱 시 반드시 체크해야 할 기술 성적서 가이드라인</p>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-xl bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">검사 항목</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">테스트 표준</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">합격 기준</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-center">아동복 필수</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">실무 팁</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-5">
                  <div className="font-bold text-slate-900">{row.item}</div>
                </td>
                <td className="px-6 py-5">
                  <code className="text-[10px] font-mono font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{row.standard}</code>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-bold text-slate-700">{row.requirement}</div>
                </td>
                <td className="px-6 py-5 text-center">
                  {row.isKidsCritical ? (
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 font-black text-xs">Y</span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-300 font-black text-xs">N</span>
                  )}
                </td>
                <td className="px-6 py-5">
                  <div className="text-xs text-slate-500 font-medium leading-relaxed group-hover:text-slate-900 transition-colors italic">{row.tip}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-start gap-3 bg-red-50 p-4 rounded-2xl border border-red-100">
        <Icon name="ShieldAlert" className="w-5 h-5 text-red-600 shrink-0" />
        <p className="text-[11px] text-red-800 leading-relaxed">
          <strong>아동복 수출 유의사항:</strong> 북미(CPSIA), 유럽(REACH) 시장의 경우 납(Lead), 프탈레이트, 밴지딘 계열 염료에 대한 물리적 성분 분석표가 없을 시 전량 리콜 대상이 될 수 있습니다. 매 로트(Lot)마다 공인 검사 기관의 성적서를 확보하십시오.
        </p>
      </div>
    </div>
  );
};

const ApplicationView = () => {
  const [selectedTrim, setSelectedTrim] = useState<TrimItem | null>(TRIM_ITEMS[0]);
  const [activeTab, setActiveTab] = useState<'strategy' | 'checklist'>('strategy');

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 space-y-3">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-4">6대 핵심 부자재 (실무)</h4>
          {TRIM_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedTrim(item)}
              className={`w-full text-left p-5 rounded-2xl border transition-all flex flex-col ${
                selectedTrim?.id === item.id 
                  ? 'bg-white border-blue-500 shadow-xl ring-4 ring-blue-50' 
                  : 'bg-slate-50 border-transparent hover:border-slate-300 text-slate-500'
              }`}
            >
              <div className={`font-bold text-lg mb-1 ${selectedTrim?.id === item.id ? 'text-slate-900' : 'text-slate-600'}`}>{item.name}</div>
              <div className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">{item.description}</div>
            </button>
          ))}
        </div>
        
        <div className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 min-h-[600px] relative overflow-hidden">
          {selectedTrim ? (
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-4">
                  <h3 className="text-3xl font-black text-slate-900">{selectedTrim.name} 실무 가이드</h3>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase shrink-0">Step 2: Application</span>
                </div>
                
                {/* Tab Switcher */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl self-start md:self-auto">
                  <button 
                    onClick={() => setActiveTab('strategy')}
                    className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'strategy' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    매칭 전략
                  </button>
                  <button 
                    onClick={() => setActiveTab('checklist')}
                    className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'checklist' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    품질 체크리스트
                  </button>
                </div>
              </div>
              
              {activeTab === 'strategy' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-8">
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div> 원단 혼용률 매칭 전략
                      </h4>
                      <ul className="space-y-4">
                        {selectedTrim.content.intermediate.slice(0, 2).map((text, i) => (
                          <li key={i} className="text-sm text-slate-700 flex items-start gap-3 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                            <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">√</span>
                            <span className="font-bold">{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-blue-900 p-8 rounded-3xl text-white shadow-xl">
                      <h4 className="font-bold text-blue-400 mb-6 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-blue-400 rounded-full"></div> 필수 품질 가이드 (실무)
                      </h4>
                      <ul className="space-y-4">
                        {selectedTrim.content.intermediate.slice(2).map((text, i) => (
                          <li key={i} className="text-sm text-blue-50 flex items-start gap-4 border-b border-white/10 pb-5">
                            <span className="text-blue-400 font-black mt-1">●</span>
                            <span className="opacity-90 font-medium leading-relaxed">{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <QualityChecklist trimId={selectedTrim.id} />
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 italic">부자재를 선택하여 실무 전략을 확인하세요.</div>
          )}
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-0"></div>
        </div>
      </div>
    </div>
  );
};

const RiskMitigationView = () => {
  const [cases, setCases] = useState<FailureCase[]>(FAILURE_CASES);
  const [analyzing, setAnalyzing] = useState(false);
  const [scenario, setScenario] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // 기본 카테고리(6대 부자재) 목록을 상수로 관리하거나 추출
  const BASE_TRIM_TYPES = useMemo(() => TRIM_ITEMS.map(item => item.name), []);

  // 필터 버튼 목록 구성: 기본 6대 부자재 + 사례에만 있는 새로운 부자재
  const categories = useMemo(() => {
    const uniqueFromCases = Array.from(new Set(cases.map(c => c.trimType)));
    const merged = Array.from(new Set([...BASE_TRIM_TYPES, ...uniqueFromCases]));
    return ["All", ...merged];
  }, [cases, BASE_TRIM_TYPES]);

  // 필터링된 사례 목록
  const filteredCases = useMemo(() => {
    if (selectedCategory === "All") return cases;
    return cases.filter(c => c.trimType === selectedCategory);
  }, [cases, selectedCategory]);

  const handleGenerateCase = async () => {
    setAnalyzing(true);
    
    // AI에게 현재 요청하는 카테고리 정보를 전달하여 가급적 일치시키도록 유도
    const targetType = selectedCategory === "All" ? BASE_TRIM_TYPES[0] : selectedCategory;
    
    const newCase = await getExpertFailureCase(targetType, BASE_TRIM_TYPES);
    
    if (newCase) {
      // AI가 반환한 trimType이 기존 카테고리와 유사하면(포함 관계 등) 기존 명칭으로 교정
      const matchedBaseType = BASE_TRIM_TYPES.find(base => 
        newCase.trimType.includes(base) || base.includes(newCase.trimType)
      );
      
      const standardizedCase = matchedBaseType 
        ? { ...newCase, trimType: matchedBaseType } 
        : newCase;

      setCases([standardizedCase, ...cases]);
    }
    setAnalyzing(false);
  };

  const handleDeleteCase = (id: string) => {
    setCases(prev => prev.filter(c => c.caseId !== id));
  };

  const handleAnalyzeScenario = async () => {
    if (!scenario) return;
    setAnalyzing(true);
    const result = await analyzeRiskScenario(scenario);
    setAnalysisResult(result);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Icon name="ShieldAlert" className="w-6 h-6 text-white" />
            </span>
            <h3 className="text-2xl font-black text-white">시니어 전용: AI 리스크 매니저</h3>
          </div>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">공급망 리스크(REACH, CPSIA) 및 사고 발생 시의 즉각적인 대응 전략을 수립합니다. 사고 정황을 상세히 입력하세요.</p>
          <div className="relative group">
            <textarea
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="상황 입력: (예) 북미 수출용 아동복 스냅 단추가 세탁 중 이탈 사고가 발생했습니다. CPSIA 규정 위반 가능성과 FMEA 대응 방안은?"
              className="w-full h-48 bg-slate-950/50 border border-slate-700 rounded-3xl p-6 text-white text-lg focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all placeholder:text-slate-600"
            />
          </div>
          <button
            onClick={handleAnalyzeScenario}
            disabled={analyzing}
            className="mt-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-blue-600/30 transition-all active:scale-95 flex items-center gap-3"
          >
            {analyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                전문가 분석 중...
              </>
            ) : 'Gemini 3 Pro 고급 시뮬레이션 실행'}
          </button>
        </div>
        {analysisResult && (
          <div className="mt-10 p-8 bg-blue-600/10 border border-blue-500/30 rounded-3xl text-blue-50 text-lg whitespace-pre-wrap leading-relaxed animate-in fade-in zoom-in-95 duration-500">
            <div className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Gemini Risk Assessment Report</div>
            {analysisResult}
          </div>
        )}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-end justify-between px-2 gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-black text-slate-900 mb-1">Failure Case Database</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">시니어 실무자들의 경험이 축적된 사고 원인 분석(RCA) 데이터베이스</p>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
                    selectedCategory === category
                      ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'
                  }`}
                >
                  {category}
                  <span className="ml-2 opacity-50 text-[10px]">
                    {category === "All" ? cases.length : cases.filter(c => c.trimType === category).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={handleGenerateCase}
            disabled={analyzing}
            className="group flex items-center gap-3 text-sm font-black text-blue-600 hover:text-blue-700 transition-all bg-blue-50 hover:bg-blue-100 py-3 px-6 rounded-2xl whitespace-nowrap"
          >
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center transition-colors">+</span>
            실시간 전문가 사례 생성
          </button>
        </div>

        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredCases.map(c => (
              <div key={c.caseId} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full group">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{c.trimType}</div>
                    <h4 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{c.claimType}</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black shrink-0 ${
                    c.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {c.severity} RISK
                  </span>
                </div>
                <div className="space-y-6 flex-1">
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <div className="w-1 h-1 bg-slate-300 rounded-full"></div> Root Cause (RCA)
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">{c.rca}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div> Prevention (FMEA)
                    </div>
                    <p className="text-blue-600 font-bold bg-blue-50 p-5 rounded-2xl border border-blue-100/50">{c.prevention}</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold text-slate-400">{c.caseId}</span>
                    <button 
                      onClick={() => handleDeleteCase(c.caseId)}
                      className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="사례 삭제"
                    >
                      <Icon name="Trash" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{c.standards}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-slate-300 rounded-[3rem] p-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Filter" className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-500 font-bold">해당 카테고리의 사고 사례가 아직 등록되지 않았습니다.</p>
            <p className="text-slate-400 text-sm mt-1">상단의 '실시간 전문가 사례 생성' 버튼을 눌러 AI 사례를 만들어보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const RiskPredictorView = () => {
  const [fabric, setFabric] = useState("");
  const [trim, setTrim] = useState("");
  const [process, setProcess] = useState("");
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState<RiskAnalysis | null>(null);

  const handlePredict = async () => {
    if (!fabric || !trim || !process) return;
    setPredicting(true);
    const analysis = await predictApparelRisk(fabric, trim, process);
    setResult(analysis);
    setPredicting(false);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200 animate-pulse';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
        {/* Input Side */}
        <div className="lg:w-2/5 p-12 bg-slate-50 border-r border-slate-200">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
              <Icon name="Cpu" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 leading-none">AI Risk Engine</h3>
              <p className="text-xs text-slate-500 mt-1 font-bold">조합 기반 잠재적 클레임 예측</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Fabric Type (원단 종류)</label>
              <input 
                value={fabric} 
                onChange={e => setFabric(e.target.value)}
                placeholder="예) 면 100%, 폴리/레이온 혼방" 
                className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Sub-material (부자재 종류)</label>
              <input 
                value={trim} 
                onChange={e => setTrim(e.target.value)}
                placeholder="예) 금속 지퍼, 폴리에스터 단추" 
                className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Processing (후가공 방식)</label>
              <input 
                value={process} 
                onChange={e => setProcess(e.target.value)}
                placeholder="예) 가먼트 워싱, 고온 다림질" 
                className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
              />
            </div>

            <button
              onClick={handlePredict}
              disabled={predicting || !fabric || !trim || !process}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black py-5 rounded-3xl shadow-2xl shadow-blue-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              {predicting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  조합 리스크 연산 중...
                </>
              ) : '분석 보고서 생성하기'}
            </button>
          </div>
        </div>

        {/* Result Side */}
        <div className="flex-1 p-12 min-h-[500px] flex flex-col justify-center relative">
          {result ? (
            <div className="animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h4 className="text-3xl font-black text-slate-900 leading-tight mb-2">{result.predictedFailure}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Category</span>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border ${getRiskColor(result.riskLevel)}`}>
                      {result.riskLevel} LEVEL
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <div>
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Technical Reason
                    </h5>
                    <p className="text-slate-700 font-medium leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      {result.technicalReason}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> Expert Insight
                    </h5>
                    <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 italic font-bold text-orange-900 text-sm">
                      " {result.expertInsight} "
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                  <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">Prevention Checklist</h5>
                  <ul className="space-y-4">
                    {result.preventionChecklist.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 border-b border-white/10 pb-4 last:border-0">
                        <span className="w-5 h-5 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">0{i+1}</span>
                        <span className="text-xs font-medium text-slate-300 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold border-t border-slate-100 pt-6">
                <Icon name="ClipboardCheck" className="w-3.5 h-3.5" />
                <span>데이터 기반 예측값이며, 최종 결정은 현장 테스트 결과를 기반으로 해야 합니다.</span>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 py-20">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Cpu" className="w-8 h-8 text-slate-300" />
              </div>
              <h4 className="text-xl font-black text-slate-400">분석 대기 중</h4>
              <p className="text-sm text-slate-400 max-w-sm mx-auto font-medium">좌측 폼에 원단과 부자재, 가공 정보를 입력하여 AI의 리스크 예측 보고서를 확인하세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('foundation');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'foundation': return <FoundationView />;
      case 'application': return <ApplicationView />;
      case 'risk-mgmt': return <RiskMitigationView />;
      case 'risk-predictor': return <RiskPredictorView />;
      default: return <FoundationView />;
    }
  };

  const activeSection = SECTIONS.find(s => s.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="ml-72 p-12 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {activeSection && (
            <Header section={activeSection} />
          )}
          
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
            {renderContent()}
          </div>
        </div>
      </main>
      
      <footer className="ml-72 p-10 text-center border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tighter text-slate-900">TRIM <span className="text-blue-600">GUARDIAN</span></span>
            <span className="text-[10px] text-slate-400 font-bold border-l border-slate-200 pl-2">2026 EDITION</span>
          </div>
          <p className="text-xs text-slate-400 font-medium tracking-tight">
            &copy; Apparel Sub-material Mastery Platform. Powered by Google Gemini 3 Pro Engineering.
          </p>
        </div>
      </footer>
    </div>
  );
}
