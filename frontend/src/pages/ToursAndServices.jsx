import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  ArrowRight,
  Plane,
  ShieldCheck,
  Award,
  Mountain,
  Compass,
  Network,
  CheckCircle2,
  FileText,
  Ship,
  MapPin,
  Thermometer,
  Droplets,
  Shield,
  Headphones,
  X,
  Send,
  Phone,
  Mail,
  Calendar,
  User,
  PlaneTakeoff,
  Sparkles
} from 'lucide-react';
import Layout from '../layouts/Layout';


const EXPEDITIONS = [
  {
    id: 'exp-1',
    corridor: 'south-south',
    corridorName: {
      en: 'Cross River State • 6 Days / 5 Nights',
      ar: 'ولاية كروس ريفر • 6 أيام / 5 ليالٍ'
    },
    subTitle: {
      en: 'Highland Bioclimatic Ridge',
      ar: 'سلسلة المرتفعات البيئية المناخية'
    },
    title: {
      en: 'Obudu Mountain Cloud Forest & Aerial Sanctuary',
      ar: 'غابة أوبودو الجبلية السحابية والمحمية الجوية'
    },
    description: {
      en: 'Ascend above the cloud line to private Alpine-style villas. Includes bespoke botanical canopy walks, private fire pits under sub-tropical stars, and Michelin-trained chef sourcing local mountain organic produce.',
      ar: 'اصعد فوق مستوى السحاب إلى فيلات خاصة على الطراز الألبي. تشمل جولات المسار الشجري النباتي المخصص، وحفر النار الخاصة تحت النجوم شبه الاستوائية، وطهاة مدربين بمستوى ميشلان يستوردون المنتجات الجبلية العضوية المحلية.'
    },
    tag: {
      en: 'Private Helicopter Transfer',
      ar: 'نقل خاص بالطائرة المروحية'
    },
    capacity: {
      en: 'Max 6 Guests',
      ar: '6 ضيوف كحد أقصى'
    },
    price: '$7,200',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0FfR2Av9SlVjCx3MDrgHTUyhM54uUdnSIDVWmF-F1GFrMJ35_UcDp4TXz8PhqhT0o_tNCWrAhOGLFe_tc8jOv7BKZISkTOc6pWCjtIEGE-GMjLEqhSP6_YStOoGEir3kotptXZQafcB6rEJ0kqNERz3iro4oqKfyhbQRe_aDC_ZkSzcvelD8URLijeEHqXyOb6IKBnQ7gIg54_u2ck3gKgMvED9phiz6eHS7j7hyRDa4jxW_vxvy16A',
    features: [
      { en: 'AgustaWestland AW139 Direct Helipad Access', ar: 'وصول مباشر إلى مهبط الطائرات العمودية' },
      { en: 'Dedicated Close Protection Team & Attache', ar: 'فريق حماية خاصة ومرافق مخصص' },
      { en: 'Intimate Canopy Cable Car Buyout', ar: 'حجز حصري للعربة السلكية فوق السحاب' }
    ]
  },
  {
    id: 'exp-2',
    corridor: 'south-west',
    corridorName: {
      en: 'Lagos Atlantic Coast • 4 Days / 3 Nights',
      ar: 'ساحل لاغوس الأطلسي • 4 أيام / 3 ليالٍ'
    },
    subTitle: {
      en: 'Lekki & Epe Estuary',
      ar: 'مصب ليكي وإيبي'
    },
    title: {
      en: 'Epe Mangrove Lagoon & Private Catamaran Villa',
      ar: 'بحيرة أشجار المانغروف في إيبي وفيلا الكاتاماران الخاصة'
    },
    description: {
      en: 'Quiet luxury along Lagos untamed waterways. Drift into emerald mangrove tunnels by whisper-quiet private solar boat, paired with a private beachfront architectural estate buyout and curated modern African art salon.',
      ar: 'رفاهية هادئة عبر الممرات المائية الطبيعية في لاغوس. أبحِر داخل أنفاق المانغروف الزمردية بالقوارب الشمسية الخاصة، مع حجز حصري لعقار معماري على الشاطئ وصالون للفن الأفريقي الحديث.'
    },
    tag: {
      en: 'Lagoon Catamaran Cruise',
      ar: 'رحلة بحرية بالكاتاماران في البحيرة'
    },
    capacity: {
      en: 'Up to 8 Guests',
      ar: 'حتى 8 ضيوف'
    },
    price: '$5,400',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnnsnuHLXqUWP2LYLQKEhjfq8kleaWyddtdHmZfysZ2Jpme_LkeP-_wmTfA--FSU8G0MYwgLfASwkrJgsrSreDC5zxnXUbj6BdUm8TOsnMmFNgj5jsMeNpT1iUqBM_qq50XCxvi_wmwqNYu3YD12xVW2yT0ZWVVSdmNNuSqE0hbV8_Dp69mL-n68vnc0VsziLsDq2VVLx1WtiLz9RerRNnz82ZQyhqPvxmlnDwe2AiCQgqFTrBoTTmaA',
    features: [
      { en: 'Exclusive Estate Buyout with Private Beach', ar: 'حجز حصري للعقار مع شاطئ خاص' },
      { en: 'Lagoon Seafood Degustation by Guest Chef', ar: 'تذوق المأكولات البحرية من إعداد طاهٍ زائر' },
      { en: 'Chauffeured Armored Maybach Transfers', ar: 'تنقلات بسيارة مايباخ مدرعة مع سائق خاص' }
    ]
  },
  {
    id: 'exp-3',
    corridor: 'north-east',
    corridorName: {
      en: 'Bauchi Wildlife Basin • 5 Days / 4 Nights',
      ar: 'حوض باوتشي للحياة البرية • 5 أيام / 4 ليالٍ'
    },
    subTitle: {
      en: 'Savanna Wildlife Basin',
      ar: 'حوض السافانا للحياة البرية'
    },
    title: {
      en: 'Yankari Savanna Safari & Wikki Thermal Springs',
      ar: 'سفاري سافانا يانكاري وينابيع ويكي الحرارية'
    },
    description: {
      en: 'Direct private airstrip charter to Bauchi. Encounter West African bush elephant herds with master indigenous trackers, followed by midnight private buyouts of the crystal-clear, constant 31°C Wikki warm springs.',
      ar: 'طيران خاص مباشر إلى مدرج باوتشي. شاهد قطعان الفيلة في غرب إفريقيا مع خبرا المتتبعين المحليين، يليه حجز حصري منتصف الليل لينابيع ويكي الدافئة بدراجة حرارة ثابتة 31 مئوية.'
    },
    tag: {
      en: 'Private Bush Plane Corridor',
      ar: 'ممر طائرات رحلات الصحراء الخاصة'
    },
    capacity: {
      en: 'Up to 10 Guests',
      ar: 'حتى 10 ضيوف'
    },
    price: '$6,800',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIetlhJFA-4M2RmDFEIjQwtzf6xsHIGsbxo4uyWJrW3QF_LmPTEUI6mshQDbWmaXN2F9olsDAyhnLVVqvV_Ud0GEwCkGqx8OMtQV74ehPEo6H28qbXjAt7L3y71zo6-wD6pXpNOqjAHC8pB6KN5jlwGMTOcEsUhY9yL_oC7cB2kBOhAFEtYZZFassWXtaevp4OaQr9WeNWurJGorq2y917qHmTZ3d5_xr-LZvpcHmyqgHV7ctxvkHSWg',
    features: [
      { en: 'Charter Turboprop Direct Airstrip Landing', ar: 'هبوط مباشر بطائرة مروحية خاصة على المدرج' },
      { en: 'After-Hours Private Access to Wikki Warm Springs', ar: 'دخول خاص بعد الساعات الرسمية لينابيع ويكي' },
      { en: 'Armed Wildlife Ranger Advance Protocol', ar: 'بروتوكول حماية متقدم مع حراس الحياة البرية' }
    ]
  },
  {
    id: 'exp-4',
    corridor: 'north-central',
    corridorName: {
      en: 'Jos Plateau Highlands • 7 Days / 6 Nights',
      ar: 'مرتفعات هضبة جوس • 7 أيام / 6 ليالٍ'
    },
    subTitle: {
      en: 'Granite Monoliths & Springs',
      ar: 'صخور الجرانيت العظيمة والينابيع'
    },
    title: {
      en: 'Shere Hills & Bioclimatic Plateau Sanctuary',
      ar: 'تلال شيري ومحمية الهضبة المناخية البيئية'
    },
    description: {
      en: 'Experience Jos historic spring-like highlands. Dramatic monolithic rock formations, private equestrian trails, historical tin-mining heritage villas, and alpine-fresh acoustic silence far removed from urban congestion.',
      ar: 'استمتع بمرتفعات جوس الربيعية التاريخية. تشكيلات صخرية صلبة مذهلة، ومسارات فروسية خاصة، وفيلات تراثية لتعدين القصدير، وهدوء نقي بعيدًا عن صخب المدينة.'
    },
    tag: {
      en: 'Temperate 18°C Micro-climate',
      ar: 'مناخ معتدل بدرجة 18 مئوية'
    },
    capacity: {
      en: 'Delegations & Families',
      ar: 'وفود وعائلات'
    },
    price: '$6,100',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu6QlcM5y6nX_4TZhjLw-153eRLM3GfI-yPSC--dgTqR69twHivcIWVpvYhe2ducbfMyq26rAiKVGfv5vrJSzUnA8YdClAel-rcb8Ob0PNLPIkCbSuirYFbvzO4hetd54K7GJHkdNwU16bz_fOwGTsKIJduTVUpPco1lGZGKtLavtgLgtjwbDqhYajk5Lsi728hSVYxbwQNtlhdAiU3g5CCz5NjYL49Ft9W_KwlnQQ0C9LIbpu-Oy5XQ',
    features: [
      { en: 'Private Off-Market Colonial Estate Residency', ar: 'إقامة في قصر استعماري خاص غير معروض بالسوق' },
      { en: 'Guided Shere Hills Aerial & Monolith Trekking', ar: 'رحلات مشي موجهة فوق تلال وصخور شيري' },
      { en: 'B6 Armored Escort & Concierge Attache', ar: 'مرافقة بسيارة مدرعة B6 مع مرافق كونسيرج' }
    ]
  }
];



export default function ToursAndServices({langKey = 'en'}) {
  const [activeCorridor, setActiveCorridor] = useState('all');
  const [dossierModal, setDossierModal] = useState(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [currentLang, setCurrentLang] = useState(langKey);

  const isRtl = currentLang === 'ar';

   const toggleLanguage = (newLang) => {
    setCurrentLang(newLang);
  };

  
  const filteredExpeditions = activeCorridor === 'all'
    ? EXPEDITIONS
    : EXPEDITIONS.filter((exp) => exp.corridor === activeCorridor);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
    }, 5000);
  };


  return (
    <Layout activeRoute='/' isRtl={isRtl} onToggleLanguage={toggleLanguage}>

      <section className="bg-black pt-10 text-[#0F172A] antialiase" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-black">
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.18),transparent_45%),radial-gradient(circle_at_15%_75%,rgba(0,108,73,0.12),transparent_45%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forestGreen border border-white text-white font-bold text-xs uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span>{isRtl ? 'رحلات تروفيستا والاستجمام السيادي' : 'TROVIESTA EXPEDITIONS & SOVEREIGN LEISURE'}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gold tracking-tight leading-[1.1]">
                {isRtl ? (
                  <>استكشافات نيجيرية فاخرة و<span className="font-serif italic font-normal text-white">رحلات سيادية</span></>
                ) : (
                  <>Bespoke Nigerian Expeditions & <span className="font-serif italic font-normal text-white">Sovereign Journeys</span></>
                )}
              </h1>

              <p className="font-serif text-xl sm:text-2xl text-gold italic font-normal mt-4">
                {isRtl ? 'هندسة نيجيريا غير المكتشفة' : 'The Architecture of Uncharted Nigeria'}
              </p>

              <p className="mt-4 text-base sm:text-lg text-white leading-relaxed max-w-2xl font-normal">
                {isRtl 
                  ? 'تتجاوز تروفيستا الرحلات التجارية التقليدية — حيث نصمم تجارب فاخرة وخاصة وآمنة عبر أجمل النظم البيئية في نيجيريا مع كونسيرج مخصص، وتسهيلات طيران دبلوماسية، وفرق حماية مقربة موثوقة.'
                  : 'Troviesta transcends standardized commercial travel — architecting secure, private-charter, ultra-luxury immersions across Nigeria’s most spectacular ecosystems with dedicated concierges, diplomatic airfield clearances, and vetted close-protection details.'}
              </p>

              {/* Quick Capability Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-slate-200/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-gold flex items-center justify-center shrink-0">
                    <Plane className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      {isRtl ? 'طيران خاص' : 'Private Aviation'}
                    </h4>
                    <p className="text-[12px] text-slate-300">
                      {isRtl ? 'طائرات ومراكز طيران' : 'AgustaWestland & Jet Hubs'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-gold flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      {isRtl ? 'سرية مضمونة' : 'Guaranteed Discretion'}
                    </h4>
                    <p className="text-[12px] text-slate-300">
                      {isRtl ? 'اتفاقيات عدم إفصاح ثنائية' : 'Bilateral NDAs Enforced'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-gold flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      {isRtl ? 'وصول سيادي' : 'Sovereign Access'}
                    </h4>
                    <p className="text-[12px] text-slate-300">
                      {isRtl ? 'حجز فيلات خاصة حصرية' : 'Off-Market Villa Buyouts'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-slate-900 border-4 border-white group">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0FfR2Av9SlVjCx3MDrgHTUyhM54uUdnSIDVWmF-F1GFrMJ35_UcDp4TXz8PhqhT0o_tNCWrAhOGLFe_tc8jOv7BKZISkTOc6pWCjtIEGE-GMjLEqhSP6_YStOoGEir3kotptXZQafcB6rEJ0kqNERz3iro4oqKfyhbQRe_aDC_ZkSzcvelD8URLijeEHqXyOb6IKBnQ7gIg54_u2ck3gKgMvED9phiz6eHS7j7hyRDa4jxW_vxvy16A" 
                  alt="Obudu Mountain Plateau" 
                  className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
                    <Mountain className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isRtl ? 'محمية مرتفعات أوبودو الجوية' : 'Obudu Highlands Aerial Sanctuary'}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-white">
                    {isRtl ? 'سلسلة مرتفعات كروس ريفر البيئية' : 'Cross River Bioclimatic Ridge'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {isRtl 
                      ? 'ملاذ سيادي مرتفع مع مهبط طائرات مروحية خاص وجناح بين الغابات السحابية.' 
                      : 'High-altitude sovereign enclave with private helicopter landing & cloud forest suites.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. EXPEDITIONS CATALOG & FILTER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full bg-black" id="expeditions-catalog">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              {isRtl ? 'الممرات والرحلات الاستكشافية المنسقة' : 'CURATED CORRIDORS & EXPEDITIONS'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gold tracking-tight mt-1">
              {isRtl ? 'مسارات نيجيرية مصممة خصيصًا' : 'Handcrafted Nigerian Itineraries'}
            </h2>
            <p className="text-sm text-white max-w-xl mt-2 leading-relaxed">
              {isRtl 
                ? 'يتم إدارة كل مسار كإنتاج فريد ومخصص — يجمع بين طيران المستأجر الخاص، والمحميات الطبيعية المحمية، وفرق الطهي الخاصة المتميزة.' 
                : 'Every itinerary is managed as an unrepeatable bespoke production — combining civil aviation charters, protected nature reserves, and Michelin-tier private culinary brigades.'}
            </p>
          </div>
        </div>

        {/* Region Filter */}
        <div className="bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-forestGreen mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-gold" />
              <span>{isRtl ? 'التصفية حسب الممر السيادي النيجيري' : 'Filter by Nigerian Sovereign Corridor'}</span>
            </span>
            <span className="text-[11px] text-slate-400 font-normal">
              {isRtl ? 'مسارات معتمدة نشطة' : 'Active Vetted Routes'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {[
              { key: 'all', label: isRtl ? 'جميع الممرات' : 'All Corridors', badge: '4 Expeditions', icon: Network },
              { key: 'south-south', label: isRtl ? 'الجنوب والساحل' : 'South-South / Coastal', sub: '(Cross River & Delta)', emoji: '🌊' },
              { key: 'south-west', label: isRtl ? 'الجنوب الغربي ولاغوس' : 'South-West / Lagos & Atlantic', sub: '(Lekki, Epe, Badagry)', emoji: '⛵' },
              { key: 'north-central', label: isRtl ? 'الشمال الأوسط والهضبة' : 'North-Central & Middle Belt', sub: '(Jos Plateau, Abuja)', emoji: '⛰️' },
              { key: 'north-east', label: isRtl ? 'الشمال الشرقي والسافانا' : 'North-East / Savanna', sub: '(Bauchi & Yankari)', emoji: '🦁' }
            ].map((filter) => {
              const isActive = activeCorridor === filter.key;
              const Icon = filter.icon;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveCorridor(filter.key)}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 border ${
                    isActive
                      ? 'bg-forestGreen text-white border-transparent shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-[#0ea5e9]" />}
                  {filter.emoji && <span className="text-base leading-none">{filter.emoji}</span>}
                  <span>{filter.label}</span>
                  {filter.sub && <span className="text-xs text-slate-400 hidden xl:inline">{filter.sub}</span>}
                  {filter.badge && <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 font-bold">{filter.badge}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Expeditions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredExpeditions.map((exp) => (
            <div 
              key={exp.id}
              className="bg-white rounded-xl border border-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative w-full h-64 overflow-hidden bg-slate-900">
                  <img 
                    src={exp.image} 
                    alt={exp.title[langKey]} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white backdrop-blur-md text-forestGreen font-bold text-xs shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gold" />
                      {exp.corridorName[langKey]}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-medium bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm flex items-center gap-1.5">
                      <PlaneTakeoff className="w-3.5 h-3.5 text-gold" />
                      {exp.tag[langKey]}
                    </span>
                    <span className="font-medium bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
                      {exp.capacity[langKey]}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-semibold">
                    <span className="text-forestGreen uppercase tracking-wider">{exp.subTitle[langKey]}</span>
                    <span>{isRtl ? 'ملاذ خاص' : 'Private Enclave'}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gold group-hover:text-gol/80 transition-colors leading-snug font-serif">
                    {exp.title[langKey]}
                  </h3>

                  <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                    {exp.description[langKey]}
                  </p>

                  <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                    {exp.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                        <span>{feat[langKey]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                    {isRtl ? 'التكلفة' : 'Cost'}
                  </span>
                  <span className="font-extrabold text-lg text-slate-900">
                    {isRtl ? `ابتداءً من ${exp.price}` : `From ${exp.price}`}
                  </span>
                  <span className="text-xs text-slate-500">{isRtl ? ' / ضيف' : ' / guest'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="#inquiry-consultation"
                    className="px-5 py-2.5 rounded-full bg-forestGreen hover:bg-white hover:text-forestGreen text-white font-bold text-xs tracking-wide transition-all duration-300 border border-forestGreen shadow-sm"
                  >
                    {isRtl ? 'استفسر الآن' : 'Inquire'}
                  </a>
                  <button
                    type="button"
                    onClick={() => setDossierModal(exp)}
                    className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                    title={isRtl ? 'عرض ملف المسار' : 'View Itinerary'}
                  >
                    <FileText className="w-4 h-4 text-gold" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 3. CONSULTATION & INQUIRY FORM */}
      <section className="bg-black text-white py-16 lg:py-24 border-t border-slate" id="inquiry-consultation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forestGreen border border-white text-white font-bold text-xs uppercase tracking-wider">
                <Headphones className="w-4 h-4 text-gold" />
                <span>{isRtl ? 'مكتب الكونسيرج الخاص' : 'PRIVATE CONCIERGE DESK'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif text-gold">
                {isRtl ? 'ابتدئ رحلتك الاستكشافية المخصصة' : 'Initiate Your Bespoke Expedition'}
              </h2>

              <p className="text-white text-sm sm:text-base leading-relaxed">
                {isRtl 
                  ? 'يتولى قسم الاستكشافات في تروفيستا تصميم وتنفيذ الرحلات للوفود الدبلوماسية، والعائلات، والباحثين عن الاستجمام السيادي بكل سرية ودقة.' 
                  : 'Troviesta Expeditions division designs and executes tailored travel protocols for diplomatic delegations, sovereign families, and private collectors with utmost confidentiality.'}
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {isRtl ? 'بروتوكول السرية التامة' : 'Strict Confidentiality Protocol'}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {isRtl ? 'يتم توقيع اتفاقية عدم إفصاح قبل مشاركة تفاصيل المسار النهائي.' : 'Bilateral Non-Disclosure Agreements enforced prior to sharing master flight manifests.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Plane className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {isRtl ? 'تراخيص الطيران والدبلوماسية' : 'Diplomatic Aviation Clearances'}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {isRtl ? 'تسهيلات سريعة للمدارج والمطارات والتصاريح الأمنية.' : 'Expedited runway permits, tarmac transfers, and regional flight clearances.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-md border border-gold shadow-2xl">
              {inquirySubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {isRtl ? 'تم استلام طلبك بنجاح' : 'Inquiry Received Successfully'}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    {isRtl 
                      ? 'سيقوم كبير مرافقي الكونسيرج بالتواصل معكم في غضون ساعتين لمعالجة تفاصيل الطلب.' 
                      : 'Our Senior Expedition Concierge will contact you within 2 hours to review your requirements under NDA.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-forestGreen mb-1.5">
                        {isRtl ? 'الاسم الكامل' : 'Full Name'}
                      </label>
                      <input 
                        required
                        type="text" 
                        placeholder={isRtl ? 'مثال: عبد الله المنصور' : 'e.g. Lord Alexander Vance'}
                        className="w-full px-4 py-3 rounded-md bg-white border border-forestGreen text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#0ea5e9]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-forestGreen mb-1.5">
                        {isRtl ? 'البريد الإلكتروني' : 'Official Email Address'}
                      </label>
                      <input 
                        required
                        type="email" 
                        placeholder="vance@office.com"
                        className="w-full px-4 py-3 rounded-md bg-white border border-forestGreen text-white placeholder-slate-400   text-sm focus:outline-none focus:border-[#0ea5e9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-forestGreen mb-1.5">
                        {isRtl ? 'الممر أو الفعالية المطلوبة' : 'Preferred Sovereign Corridor'}
                      </label>
                      <select className="w-full px-4 py-3 rounded-md bg-white border border-forestGreen text-forestGreen text-sm focus:outline-none focus:border-forestGreen">
                        <option value="obudu">{isRtl ? 'مرتفعات أوبودو السحابية' : 'Obudu Mountain Cloud Forest'}</option>
                        <option value="epe">{isRtl ? 'بحيرة إيبي وفيلات الكاتاماران' : 'Epe Mangrove & Catamaran Villa'}</option>
                        <option value="yankari">{isRtl ? 'سفاري يانكاري وينابيع ويكي' : 'Yankari Savanna & Wikki Springs'}</option>
                        <option value="jos">{isRtl ? 'تلال شيري وهضبة جوس' : 'Shere Hills & Jos Plateau'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-forestGreen mb-1.5">
                        {isRtl ? 'عدد الضيوف المتوقع' : 'Estimated Guest Count'}
                      </label>
                      <input 
                        type="number" 
                        min="1" 
                        max="30"
                        defaultValue="4"
                        className="w-full px-4 py-3 rounded-md bg-white border border-forestGreen text-forestGreen text-sm focus:outline-none focus:border-forestGreen"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forestGreen mb-1.5">
                      {isRtl ? 'متطلبات خاصة أو ترتيبات أمنية' : 'Special Security or Dietary Directives'}
                    </label>
                    <textarea 
                      rows="3"
                      placeholder={isRtl ? 'أدخل أي متطلبات خاصة بالطيران أو الأمن أو الوجبات...' : 'Specify helicopter landing preferences, close-protection level, or private chef directives...'}
                      className="w-full px-4 py-3 rounded-md bg-white border border-forestGreen text-forestGreen placeholder:text-sm focus:outline-none focus:border-forestGreen"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full border border-forestGreen bg-forestGreen hover:bg-white hover:text-forestGreen text-white font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>{isRtl ? 'إرسال الطلب' : 'Submit Request'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 4. DOSSIER MODAL */}
      <AnimatePresence>
        {dossierModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir={isRtl ? 'rtl' : 'ltr'}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDossierModal(null)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 max-h-[90vh] flex flex-col"
            >
              <div className="px-6 py-4 border-b border-forestGreen flex items-center justify-between bg-white">
                <span className="text-xs font-bold uppercase tracking-wider text-gold">
                  {isRtl ? 'ملف المسار الاستكشافي' : 'Expedition Itinerary Dossier'}
                </span>
                <button
                  type="button"
                  onClick={() => setDossierModal(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4">
                <h3 className="text-xl font-bold text-gold font-serif leading-snug">
                  {dossierModal.title[langKey]}
                </h3>

                <p className="text-xs font-bold text-forestGreen uppercase tracking-wider">
                  {dossierModal.corridorName[langKey]}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {dossierModal.description[langKey]}
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-500">
                    {isRtl ? 'مزايا الخدمات المرفقة' : 'Included Service Protocols'}
                  </h4>
                  <ul className="space-y-1.5">
                    {dossierModal.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                        {feat[langKey]}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                      {isRtl ? 'الاستثمار التقديري' : 'Estimated Investment'}
                    </span>
                    <span className="font-extrabold text-xl text-slate-900">
                      {dossierModal.price}
                    </span>
                  </div>

                  <a
                    href="#inquiry-consultation"
                    onClick={() => setDossierModal(null)}
                    className="px-6 py-2.5 rounded-full bg-forestGreen border border-forestGreen hover:bg-white hover:text-forestGreen text-white font-bold text-xs tracking-wide transition-all shadow-sm"
                  >
                    {isRtl ? 'استفسر الآن' : 'Request Official Dossier'}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      </section>

    </Layout>
  );
}