import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../layouts/Layout';

/*

    Change the button text and make it all redirect to the contact page

*/


// Event Data isolated into English and Arabic datasets
const EVENTS_DATA = {
  en: [
    {
      id: 'gulf-africa-bilateral',
      title: 'Gulf-Africa Bilateral Corridor Conference',
      venue: 'King Abdullah Financial District',
      accessType: 'By Invitation & Sovereign Pass',
      description: 'Focusing on sovereign logistics corridors, agricultural supply chain syndications, and clean energy pacts between GCC conglomerates and ECOWAS enterprise champions.',
      region: 'saudi',
      regionName: 'Riyadh, Saudi Arabia',
      flag: '🇸🇦',
      timeline: 'upcoming',
      date: 'April 10–12, 2026',
      capacity: '500 Accredited Leaders',
      statusText: 'Tier 1 Tickets Available',
      statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      statusDot: 'bg-emerald-500',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcbLF11Hl8-92_-IQS8Z1KJbGiNL0z88Mv4PyPYIJJeCW_2D7T8_2RC6okJdOjLc4W0wm1eaSbn9SdkhEF7Nfd6733GFfsMra3W5RiRQ88DTE0D2xAGrlpQ_cyw2WsLT-hFF-nnT09oeTixOkL4YGowNAgWi75ztERBpyIL4WmXlWarG2_zTPQcaduxnvs8PuIft6uNsIklTAL9FoQfrrR9wB3ctKG8eC3sPOxRtfmdPfqyUrTVvNZTw',
      actionText: 'Access Ticket Store →',
      secondaryActionText: 'Event Dossier & Protocol',
      actionType: 'primary',
    },
    {
      id: 'eko-atlantic-climate',
      title: 'Eko Atlantic Global Climate Finance Forum',
      venue: 'Atlantic Coastal Pavilion',
      accessType: 'Chamber of Commerce',
      description: 'Staged inside an ephemeral oceanfront pavilion, anchoring sovereign carbon offset markets, green bonds, and port logistics across developing coastal megacities.',
      region: 'nigeria',
      regionName: 'Lagos (Eko Atlantic), Nigeria',
      flag: '🇳🇬',
      timeline: 'upcoming',
      date: 'May 18–20, 2026',
      capacity: '250 Plenary Delegates',
      statusText: 'Sold Out / Waitlist',
      statusColor: 'bg-rose-50 text-rose-800 border-rose-300',
      statusDot: 'bg-rose-500',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnnsnuHLXqUWP2LYLQKEhjfq8kleaWyddtdHmZfysZ2Jpme_LkeP-_wmTfA--FSU8G0MYwgLfASwkrJgsrSreDC5zxnXUbj6BdUm8TOsnMmFNgj5jsMeNpT1iUqBM_qq50XCxvi_wmwqNYu3YD12xVW2yT0ZWVVSdmNNuSqE0hbV8_Dp69mL-n68vnc0VsziLsDq2VVLx1WtiLz9RerRNnz82ZQyhqPvxmlnDwe2AiCQgqFTrBoTTmaA',
      actionText: 'Join Official Waitlist →',
      secondaryActionText: 'Event Dossier & Protocol',
      actionType: 'dark',
    },
    {
      id: 'diriyah-heritage-philanthropy',
      title: 'Diriyah Heritage & Sovereign Philanthropy Evening',
      venue: 'At-Turaif UNESCO Heritage Grounds',
      accessType: 'Curated Philanthropy',
      description: 'An atmospheric ceremonial banquet staged amidst restored Najdi mudbrick citadels, featuring live Bedouin oud quartets, custom olfactory scenting, and historic preservation pledges.',
      region: 'saudi',
      regionName: 'Diriyah, Saudi Arabia',
      flag: '🇸🇦',
      timeline: 'past',
      date: 'Conducted Jan 2025',
      capacity: '180 Benefactor Patrons',
      statusText: 'Completed Retrospective',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-300',
      statusIcon: 'check_circle',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbAbg1ca2y9v5NBN4A8MOy6RlZFn8WCjesCfb3iSeDDUBJSRp3fB9Ey46vR87N7rD0K2nFZIQkk6y9jeRrzXFBQtQwMbIE-NDfD5nhZIiVPnxIJHysvBKhCvJdpSz2bk6BeKtUD_RZC3_jOEZeOvOtNXfSLNugVo4ujZ0fNofTfSI1FAFuoq7it-xxfGlWZj5mYikXv4bcBNszIUiXKxDEL93i7wPwCIjeHtBML4dieUZRG4b3f0Oug',
      actionText: 'View Retrospective Chronicle →',
      secondaryActionText: 'Review Archival Film & Gallery',
      actionType: 'past',
    },
    {
      id: 'obudu-diplomatic-retreat',
      title: 'Obudu High-Altitude Diplomatic Retreat',
      venue: 'High-Altitude Presidential Sanctuary',
      accessType: 'Diplomatic Protocol',
      description: 'Chartered helicopter transfers, mountain canopy security cordons, and intimate diplomatic fireside sessions that mediated landmark transnational trade concessions.',
      region: 'nigeria',
      regionName: 'Abuja & Obudu Plateau, Nigeria',
      flag: '🇳🇬',
      timeline: 'past',
      date: 'Conducted Nov 2024',
      capacity: '85 Cabinet Envoys',
      statusText: 'Completed Retrospective',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-300',
      statusIcon: 'check_circle',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0FfR2Av9SlVjCx3MDrgHTUyhM54uUdnSIDVWmF-F1GFrMJ35_UcDp4TXz8PhqhT0o_tNCWrAhOGLFe_tc8jOv7BKZISkTOc6pWCjtIEGE-GMjLEqhSP6_YStOoGEir3kotptXZQafcB6rEJ0kqNERz3iro4oqKfyhbQRe_aDC_ZkSzcvelD8URLijeEHqXyOb6IKBnQ7gIg54_u2ck3gKgMvED9phiz6eHS7j7hyRDa4jxW_vxvy16A',
      actionText: 'View Retrospective Chronicle →',
      secondaryActionText: 'Review Archival Film & Gallery',
      actionType: 'past',
    },
  ],
  ar: [
    {
      id: 'gulf-africa-bilateral',
      title: 'مؤتمر الممر الثنائي بين الخليج وإفريقيا',
      venue: 'مركز الملك عبد الله المالي',
      accessType: 'بدعوة خاصة وتصريح سيادي',
      description: 'التركيز على الممرات اللوجستية السيادية، وتكتلات سلاسل الإمداد الزراعية، واتفاقيات الطاقة النظيفة بين تكتلات دول مجلس التعاون الخليجي ورواد الأعمال في إيكواس.',
      region: 'saudi',
      regionName: 'الرياض، المملكة العربية السعودية',
      flag: '🇸🇦',
      timeline: 'upcoming',
      date: '١٠ - ١٢ أبريل ٢٠٢٦',
      capacity: '٥٠٠ قائد معتمد',
      statusText: 'تذاكر الفئة الأولى متاحة',
      statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      statusDot: 'bg-emerald-500',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcbLF11Hl8-92_-IQS8Z1KJbGiNL0z88Mv4PyPYIJJeCW_2D7T8_2RC6okJdOjLc4W0wm1eaSbn9SdkhEF7Nfd6733GFfsMra3W5RiRQ88DTE0D2xAGrlpQ_cyw2WsLT-hFF-nnT09oeTixOkL4YGowNAgWi75ztERBpyIL4WmXlWarG2_zTPQcaduxnvs8PuIft6uNsIklTAL9FoQfrrR9wB3ctKG8eC3sPOxRtfmdPfqyUrTVvNZTw',
      actionText: '← شباك التذاكر',
      secondaryActionText: 'ملف الفعالية والبروتوكول',
      actionType: 'primary',
    },
    {
      id: 'eko-atlantic-climate',
      title: 'منتدى إيكو أتلانتيك العالمي لتمويل المناخ',
      venue: 'جناح الساحل الأطلسي',
      accessType: 'غرفة التجارة',
      description: 'يقام داخل جناح ساحلي مؤقت، لترسيخ أسواق تعويض الكربون السيادية، والسندات الخضراء، واللوجستيات البحرية عبر المدن الساحلية الكبرى.',
      region: 'nigeria',
      regionName: 'لاغوس (إيكو أتلانتيك)، نيجيريا',
      flag: '🇳🇬',
      timeline: 'upcoming',
      date: '١٨ - ٢٠ مايو ٢٠٢٦',
      capacity: '٢٥٠ مندوباً رئيسياً',
      statusText: 'مكتمل / قائمة الانتظار',
      statusColor: 'bg-rose-50 text-rose-800 border-rose-300',
      statusDot: 'bg-rose-500',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnnsnuHLXqUWP2LYLQKEhjfq8kleaWyddtdHmZfysZ2Jpme_LkeP-_wmTfA--FSU8G0MYwgLfASwkrJgsrSreDC5zxnXUbj6BdUm8TOsnMmFNgj5jsMeNpT1iUqBM_qq50XCxvi_wmwqNYu3YD12xVW2yT0ZWVVSdmNNuSqE0hbV8_Dp69mL-n68vnc0VsziLsDq2VVLx1WtiLz9RerRNnz82ZQyhqPvxmlnDwe2AiCQgqFTrBoTTmaA',
      actionText: '← الانضمام لقائمة الانتظار',
      secondaryActionText: 'ملف الفعالية والبروتوكول',
      actionType: 'dark',
    },
    {
      id: 'diriyah-heritage-philanthropy',
      title: 'أمسية الدرعية للتراث والأعمال الخيرية السيادية',
      venue: 'حي الطريف - موقع يونسكو للتراث',
      accessType: 'مبادرة خيرية منسقة',
      description: 'مأدبة احتفالية وسط قلاع الطين النجدي المرممة، تتميز بعروض العود البدوية الحية، والعطور المخصصة، وتعهدة الحفظ التاريخي.',
      region: 'saudi',
      regionName: 'الدرعية، المملكة العربية السعودية',
      flag: '🇸🇦',
      timeline: 'past',
      date: 'أقيم في يناير ٢٠٢٥',
      capacity: '١٨٠ راعياً وداعماً',
      statusText: 'أرشيف المؤتمر',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-300',
      statusIcon: 'check_circle',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbAbg1ca2y9v5NBN4A8MOy6RlZFn8WCjesCfb3iSeDDUBJSRp3fB9Ey46vR87N7rD0K2nFZIQkk6y9jeRrzXFBQtQwMbIE-NDfD5nhZIiVPnxIJHysvBKhCvJdpSz2bk6BeKtUD_RZC3_jOEZeOvOtNXfSLNugVo4ujZ0fNofTfSI1FAFuoq7it-xxfGlWZj5mYikXv4bcBNszIUiXKxDEL93i7wPwCIjeHtBML4dieUZRG4b3f0Oug',
      actionText: '← عرض الأرشيف التاريخي',
      secondaryActionText: 'المعرض والأرشيف سينمائي',
      actionType: 'past',
    },
    {
      id: 'obudu-diplomatic-retreat',
      title: 'ملتقى أوبودو الدبلوماسي العالي',
      venue: 'الملاذ الرئاسي الجبلي',
      accessType: 'بروتوكول دبلوماسي',
      description: 'تنقلات بمروحيات خاصة، وحراسة أمنية جبلية، وجلسات دبلوماسية رفيعة المستوى توسطت في تسهيلات تجارية عابرة للحدود.',
      region: 'nigeria',
      regionName: 'أبوجا وهضبة أوبودو، نيجيريا',
      flag: '🇳🇬',
      timeline: 'past',
      date: 'أقيم في نوفمبر ٢٠٢٤',
      capacity: '٨٥ مبعوثاً وزاريًا',
      statusText: 'أرشيف المؤتمر',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-300',
      statusIcon: 'check_circle',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0FfR2Av9SlVjCx3MDrgHTUyhM54uUdnSIDVWmF-F1GFrMJ35_UcDp4TXz8PhqhT0o_tNCWrAhOGLFe_tc8jOv7BKZISkTOc6pWCjtIEGE-GMjLEqhSP6_YStOoGEir3kotptXZQafcB6rEJ0kqNERz3iro4oqKfyhbQRe_aDC_ZkSzcvelD8URLijeEHqXyOb6IKBnQ7gIg54_u2ck3gKgMvED9phiz6eHS7j7hyRDa4jxW_vxvy16A',
      actionText: '← عرض الأرشيف التاريخي',
      secondaryActionText: 'المعرض والأرشيف سينمائي',
      actionType: 'past',
    },
  ],
  
};

// UI Translations map for static interface labels
const UI_TEXT = {
  en: {
    heading: 'Sovereign Events & Gatherings',
    subheading: 'Explore summits, bilateral forums, and private diplomatic retreats.',
    allRegions: 'All Regions',
    saudi: '🇸🇦 Saudi Arabia',
    nigeria: '🇳🇬 Nigeria',
    upcoming: 'Upcoming',
    past: 'Retrospective',
    noEvents: 'No events found matching the selected filters.',
    ctaTag: 'Bespoke Commissions & Pass Exchange',
    ctaTitle: "Don't see what you're looking for?",
    ctaDesc: 'Explore our complete sovereign ticketing exchange or commission a fully bespoke bilateral summit or private celebration.',
    viewStore: 'View Ticket Store →',
    privateInquiries: 'Private Inquiries',
    formTitle: 'Commission Private Briefing or Bilateral Summit',
    formDesc: 'Our Protocol Directors in Dubai, Riyadh, and Lagos will initiate confidential contact.',
    namePlaceholder: 'Principal Name & Title',
    emailPlaceholder: 'Institutional Email',
    option1: 'Sovereign Forum / Summit',
    option2: 'Private Luxury Gala & Residency',
    option3: 'Bilateral Trade Delegation',
    submitBtn: 'Submit Encrypted Request',
  },
  ar: {
    heading: 'الفعاليات والمؤتمرات السيادية',
    subheading: 'استكشف القمم، والمؤتمرات الثنائية، والملتقيات الدبلوماسية المغلقة.',
    allRegions: 'جميع المناطق',
    saudi: '🇸🇦 المملكة العربية السعودية',
    nigeria: '🇳🇬 نيجيريا',
    upcoming: 'القادمة',
    past: 'الأرشيف',
    noEvents: 'لا توجد فعاليات تطابق الفلاتر المحددة.',
    ctaTag: 'طلبات خاصة وتذاكر سيادية',
    ctaTitle: 'لم تجد ما تبحث عنه؟',
    ctaDesc: 'استكشف منصة التذاكر السيادية الكاملة أو قم بطلب تنظيم قمة ثنائية خاصة أو احتفالية رفيعة المستوى.',
    viewStore: '← شباك التذاكر',
    privateInquiries: 'استفسار خاص',
    formTitle: 'طلب تنظيم قمة ثنائية أو اجتماع مغلق',
    formDesc: 'سيتواصل معك مدراء البروتوكول في دبي والرياض ولاغوس بشكل سري.',
    namePlaceholder: 'الاسم الكامل والمنصب',
    emailPlaceholder: 'البريد الإلكتروني المؤسسي',
    option1: 'قمة سيادية / منتدى',
    option2: 'حفل خاص / إقامة رفيعة المستوى',
    option3: 'وفد تجاري ثنائي',
    submitBtn: 'إرسال الطلب المشفر',
  },
};

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } 
  }
};


export default function EventsAndCommissionPage({ lang = 'en' }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(lang);

  const t = UI_TEXT[currentLang];
  const currentEvents = EVENTS_DATA[currentLang];

  const isRtl = currentLang === 'ar';

  const toggleLanguage = (newLang) => {
    setCurrentLang(newLang);
  };

  return (
    <Layout isRtl={isRtl} onToggleLanguage={toggleLanguage}>
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className="min-h-screen bg-black font-sans transition-all duration-300 mt-15"
      >
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-">
          <motion.div
            variants={fadeIn}
            className="inline-flex items-center gap-2 rounded-full bg-forestGreen border border-white/80 px-3.5 py-1.5 mb-8 shadow-sm max-w-full"
          >
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            <span className="text-[11px] sm:text-[12px] font-bold text-white tracking-wide leading-tight truncate sm:whitespace-normal">
              {isRtl
                ? 'تروفيستا: حيث تلتقي الرحلات الاستثنائية بالمناسبات الفاخرة'
                : 'Troviesta: Where Extraordinary Escapes Meet Unforgettable Occasions'}
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-20 pb-6">
            <div>
              <h2 className="text-4xl font-bold text-gold">{t.heading}</h2>
              <p className="text-sm text-white mt-1">{t.subheading}</p>
            </div>
          </div>
        </section>

        {/* Event Cards Grid — filtering removed, renders all events for the current language */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <AnimatePresence mode="wait">
            {currentEvents.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 bg-pink rounded-xl border border-slate-200 text-slate-500"
              >
                <p>{t.noEvents}</p>
              </motion.div>
            ) : (
              <motion.div
                key={currentLang}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {currentEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    variants={cardVariants}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="event-card group bg-white rounded-xl border border-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Visual Container */}
                      <div className="relative w-full h-64 overflow-hidden bg-slate-900">
                        <motion.img
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          alt={event.title}
                          src={event.image}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                        <div className="absolute top-4 start-4 flex gap-2">
                          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 font-bold text-xs shadow-sm flex items-center gap-1.5">
                            <span>{event.flag}</span>
                            <span>{event.regionName}</span>
                          </span>
                        </div>

                        <div className="absolute top-4 end-4">
                          <span className={`px-3 py-1 rounded-full border font-bold text-[11px] shadow-sm flex items-center gap-1.5 ${event.statusColor}`}>
                            {event.statusDot && <span className={`w-1.5 h-1.5 rounded-full ${event.statusDot}`}></span>}
                            {event.statusIcon && <span className="material-symbols-outlined text-[13px]">{event.statusIcon}</span>}
                            <span>{event.statusText}</span>
                          </span>
                        </div>

                        <div className="absolute bottom-3 start-4 end-4 flex items-center justify-between text-white text-xs">
                          <span className="font-medium bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm flex items-center gap-1">
                            <span>{event.date}</span>
                          </span>
                          <span className="font-medium bg-gold/40 px-2.5 py-1 border border-gold rounded-2xl backdrop-blur-sm">
                            {event.capacity}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                          {event.venue}
                        </div>
                        <h3 className="text-xl font-bold text-forestGreen group-hover: transition-colors leading-snug">
                          {event.title}
                        </h3>
                        <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 space-y-2.5 border-t border-slate-100 pt-5">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2.5 px-4 rounded-xl border bg-white text-forestGreen border-forestGreen hover:bg-forestGreen hover:text-white font-bold text-xs tracking-wide flex items-center justify-between shadow-sm transition-all duration-300 ease-in-out"
                      >
                        <span className="flex items-center gap-2">
                          <span>{event.actionText}</span>
                        </span>
                      </motion.button>

                      <button
                        type="button"
                        onClick={() => alert(event.secondaryActionText)}
                        className="w-full py-2 px-4 rounded-xl bg-white hover:bg-forestGreen hover:text-white text-forestGreen font-semibold text-xs flex items-center justify-between border border-forestGreen transition-all duration-300 ease-in-out"
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{event.secondaryActionText}</span>
                        </span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Full-Width Luxury CTA Strip — unchanged, still commented out below */}
      </div>
    </Layout>
  );
}