import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Hash, 
  Camera, 
  Award, 
  Send, 
  Mail, 
  Globe 
} from 'lucide-react';
import Layout from '../layouts/Layout';

const content = {
  en: {
    feature: "FOUNDER DOSSIER",
    edition: "VOL. IV — 2025",
    cities: ["Lagos", "Abuja", "Dubai", "Zurich"],
    roleBadge: "Curator & Diplomatic Envoy",
    founderNameFirst: "Tariq",
    founderNameLast: "Al-Rahman",
    title: "Founder & Principal Visionary, Troviesta & TR Group",
    heroDescription: "Architecting sovereign journeys across Nigeria — ",
    heroHighlight: "where deep cultural heritage meets absolute discretion.",
    stats: [
      { val: "15+", label: "Years Protocol" },
      { val: "28", label: "Corridors" },
      { val: "340+", label: "Summits" }
    ],
    dossierLabel: "Dossier 01",
    location: "DIFC, Dubai",
    badgeTitle: "Diplomatic Protocol",
    badgeSub: "Bilateral Verified",
    sectionTitle: "Narrative & Philosophy",
    part1Header: "I. The Inception",
    part1P1: "Before Troviesta, luxury tourism in global hubs was formulaic. Tariq Al-Rahman’s background in state protocol revealed that sovereign dignitaries and global founders are moved by stillness, sanctuary, and contextual relevance.",
    part2Header: "II. Transcontinental Corridor",
    part2P1: "Tariq pioneered bespoke corridors linking West Africa (Lagos, Abuja) directly with the GCC (Dubai, Riyadh, Doha), enabling seamless enterprise, sovereign wealth investment, and private cultural expeditions.",
    axiomQuote: "“True luxury is never loud. It is the effortless alignment of sovereign discretion and human connection.”",
    part3Header: "III. The Architecture",
    part3P1: "Troviesta executes irreproducible itineraries: opening private aviation corridors, orchestrating full-island buyouts in the Arabian Gulf, and stewarding bilateral economic symposiums within restricted monuments.",
    publicRecordTag: "Record & Insights",
    press: [
      { outlet: "Forbes Africa", title: "\"Architecting West Africa-GCC Luxury Corridors\"", date: "2024" },
      { outlet: "Condé Nast", title: "\"Inside Troviesta's Private Enclaves\"", date: "Middle East" },
      { outlet: "FT", title: "\"Emerging Bilateral Wealth & Bespoke Travel\"", date: "Global" },
      { outlet: "Bloomberg", title: "\"High-Net-Worth Tourism as Trade Engine\"", date: "Dialogue" }
    ],
    keynotes: [
      { tag: "Keynote", title: "World Sovereign Tourism Forum • Geneva", sub: "\"Evolution of Quiet Luxury & State Protocols\"" },
      { tag: "Advisor", title: "Future Hospitality Summit • Riyadh", sub: "African & Arabian Luxury Integration" }
    ],
    connectTag: "Direct Dispatch",
    connectTitle: "Private Office Access",
    connectDesc: "For confidential itineraries, sovereign delegations, or keynote inquiries.",
    links: [
      { name: "LinkedIn Executive Dispatch", icon: FileText },
      { name: "X / Twitter Executive Office", icon: Hash },
      { name: "Instagram Private Journal", icon: Camera }
    ],
    emailLabel: "Confidential Contact",
    emailSub: "Monitored 24/7 by Chief Protocol Officer",
    ctaBtn: "Request Media / Speaking Inquiry"
  },
  ar: {
    feature: "ملف المؤسس",
    edition: "المجلد الرابع — ٢٠٢٥",
    cities: ["لاغوس", "أبوجا", "دبي", "زوريخ"],
    roleBadge: "قيّم ومبعوث دبلماسي",
    founderNameFirst: "طارق",
    founderNameLast: "الرحمان",
    title: "المؤسس والرائد الرؤيوي، تروفيستا ومجموعة TR",
    heroDescription: "هندسة رحلات سيادية عبر نيجيريا — ",
    heroHighlight: "حيث يلتقي التراث الثقافي بالسرية المطلقة.",
    stats: [
      { val: "+١٥", label: "عاماً في البروتوكول" },
      { val: "٢٨", label: "ممر ثنائي" },
      { val: "+٣٤٠", label: "قمة سيادية" }
    ],
    dossierLabel: "الملف ٠١",
    location: "مركز دبي المالي العالمي",
    badgeTitle: "البروتوكول الدبلوماسي",
    badgeSub: "معتمد ثنائياً",
    sectionTitle: "السيرة والفلسفة",
    part1Header: "١. البداية والنشأة",
    part1P1: "قبل تأسيس تروفيستا، كانت السياحة الفاخرة نمطية. أظهرت خبرة طارق الرحمان في بروتوكول الدولة أن الشخصيات السيادية تبحث عن السكينة، والخصوصية، والارتباط الثقافي العميق.",
    part2Header: "٢. الجسر العابر للقارات",
    part2P1: "ابتكر طارق ممرات خاصة تربط غرب إفريقيا (لاغوس، أبوجا) مباشرة بالخليج (دبي، الرياض، الدوحة)، مما مهد الطريق للتعاون الاقتصادي الاستثماري والبعثات الثقافية الخاصة.",
    axiomQuote: "“الفخامة الحقيقية ليست صاخبة أبداً. إنها التناغم السلس بين السرية السيادية والتواصل الإنساني.”",
    part3Header: "٣. هندسة التجارب",
    part3P1: "تنفذ تروفيستا مسارات فريدة: فتح ممرات طيران خاصة، حجز جزر بالكامل في الخليج العربي، وتنظيم قمم اقتصادية ثنائية داخل معالم تاريخية مغلقة.",
    publicRecordTag: "السجل والرؤى",
    press: [
      { outlet: "فوربس إفريقيا", title: "\"هندسة الممرات الفاخرة بين غرب إفريقيا والخليج\"", date: "٢٠٢٤" },
      { outlet: "كوندي ناست", title: "\"داخل الملاذات الخاصة لتروفيستا\"", date: "الشرق الأوسط" },
      { outlet: "فاينانشال تايمز", title: "\"الثروات الناشئة والسفر المخصص\"", date: "عالمي" },
      { outlet: "بلومبرغ", title: "\"السياحة الفاخرة كمحرك للتجارة\"", date: "حوار تنفيذي" }
    ],
    keynotes: [
      { tag: "متحدث", title: "المنتدى العالمي للسياحة السيادية • جنيف", sub: "\"تطور الفخامة الهادئة والبروتوكولات الحكومية\"" },
      { tag: "مستشار", title: "قمة ضيافة المستقبل • الرياض", sub: "التكامل الفاخر الإفريقي والعربي" }
    ],
    connectTag: "التواصل المباشر",
    connectTitle: "الوصول للمكتب الخاص",
    connectDesc: "للمسارات السرية، والوفود السيادية، واستفسارات المشاركات.",
    links: [
      { name: "رسائل لينكد إن التنفيذية", icon: FileText },
      { name: "المكتب التنفيذي X / تويتر", icon: Hash },
      { name: "المجلة الخاصة على إنستغرام", icon: Camera }
    ],
    emailLabel: "البريد السري",
    emailSub: "مراقب على مدار الساعة من قبل رئيس البروتوكول",
    ctaBtn: "طلب إلقاء كلمة أو استفسار إعلامي"
  }
};

// Animation Variants




export default function Founder({lang = 'en'}) {

  // const [lang, setLang] = useState('EN');
  // const isArabic = lang === 'AR';

  const [currentLang, setCurrentLang] = useState(lang);
    
    const isRtl = currentLang === 'ar';
  
    const toggleLanguage = (newLang) => {
      setCurrentLang(newLang);
    };

  const t = content[lang];


  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };


  return (
    <Layout isRtl={isRtl} onToggleLanguage={toggleLanguage}>
      <div 
      className={`min-h-screen w-full bg-black mt-15 font-sans text-editorial-dark antialiased`}
    >
      {/* HEADER BAR & LANG SWITCHER */}

      {/* SINGLE COMPACT PAGE WITH ANIMATE PRESENCE FOR LANGUAGE TRANSITIONS */}
      <AnimatePresence mode="wait">
        <motion.main 
          key={lang}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12"
        >
          {/* TOP HERO & PROFILE */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-200 pb-10"
          >
            {/* Typography */}
            <div className="lg:col-span-7 space-y-4">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-forestGreen border border-white text-white text-[11px] font-semibold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                {t.roleBadge}
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="font-serif text-4xl text-gold sm:text-5xl lg:text-6xl tracking-tight text-editorial-dark font-medium leading-tight">
                {t.founderNameFirst} <span className="italic font-normal text-slate-00">{t.founderNameLast}</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-xs uppercase tracking-[0.2em] text-white font-bold">
                {t.title}
              </motion.p>

              <motion.p variants={fadeInUp} className="text-gold font-serif text-lg sm:text-xl text-editorial-dark font-light leading-relaxed max-w-xl">
                {t.heroDescription}
                <span className="italic text-white font-normal">{t.heroHighlight}</span>
              </motion.p>

              {/* Quick Stats Bar */}
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 max-w-md">
                {t.stats.map((stat, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="block text-xl lg:text-2xl font-bold text-gold">{stat.val}</span>
                    <span className="text-[10px] uppercase tracking-wider text-white font-medium">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Portrait Image */}
            <motion.div variants={fadeInUp} className="lg:col-span-5 relative">
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded border-4 border-white shadow-xl bg-slate-900 group"
              >
                <img
                  alt="Tariq Al-Rahman"
                  className="w-full h-[360px] sm:h-[400px] object-cover object-center grayscale contrast-105 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtj91lOzdWXdAkHWHYkENGdW0yFNZ3dx-SYMMfuJ1x2I5XsPCW6GUJH66fdk6Ns_EsJcSHd1_srbAdtsRqPe7USWGmbDhomBFvEP8zBvc6Ctte5zeI7kAe2pDsMA4oZvv__ssIZUpNqXNuqd6ZWLKWfrWuv6ULs7OpiLhjRbTtqE7PS7L8jSVnjzZsqEnm1o5l9FUY9tmgNOFi6geVBfhoboTx-yDuv6ZllLNIdOH7_Dp_TqpO3i-Puw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white font-bold">{t.dossierLabel}</p>
                    <p className="font-serif text-sm font-medium">{t.founderNameFirst} {t.founderNameLast}</p>
                  </div>
                  <span className="text-[11px] font-medium text-slate-300">{t.location}</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* MIDDLE GRID: NARRATIVE & QUOTE / RECOGNITION */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 border-b border-slate-200"
          >
            {/* Main Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif text-3xl font-normal text-white border-b border-slate-200 pb-2">
                {t.sectionTitle}
              </h2>

              <div className="space-y-4 text-sm text-editorial-slate leading-relaxed">
                <div>
                  <h3 className="text-xs uppercase font-bold text-gold tracking-wider mb-1">{t.part1Header}</h3>
                  <p className='text-white'>{t.part1P1}</p>
                </div>

                <div>
                  <h3 className="text-xs uppercase font-bold text-gold tracking-wider mb-1">{t.part2Header}</h3>
                  <p className='text-white'>{t.part2P1}</p>
                </div>

                <div>
                  <h3 className="text-xs uppercase font-bold text-gold tracking-wider mb-1">{t.part3Header}</h3>
                  <p className='text-white'>{t.part3P1}</p>
                </div>
              </div>

              {/* Compact Axiom Quote */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-xl bg-white border border-white shadow-sm"
              >
                <blockquote className="font-serif text-base text-forestGreen italic font-normal leading-snug">
                  {t.axiomQuote}
                </blockquote>
                <span className="block text-[11px] uppercase font-bold text-black tracking-wider mt-2">
                  — {t.founderNameFirst} {t.founderNameLast}
                </span>
              </motion.div>
            </div>

            {/* Press, Keynotes & Links (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-serif text-3xl font-normal text-gold border-b border-slate-200 pb-2">
                {t.publicRecordTag}
              </h2>

              {/* Press Grid */}
              <div className="grid grid-cols-2 gap-3">
                {t.press.map((p, i) => (
                  <motion.div 
                    key={i}
                    // whileHover={{ y: -1 }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 bg-white rounded-lg border border-gold text-xs shadow-sm"
                  >
                    <span className="font-bold text-gold block mb-0.5">{p.outlet}</span>
                    <p className="font-medium text-forestGreen text-[11px] line-clamp-2">{p.title}</p>
                  </motion.div>
                ))}
              </div>

              {/* Keynotes */}
              <div className="space-y-2">
                {t.keynotes.map((k, i) => (
                  <motion.div 
                    key={i} 
                    // whileHover={{ x: isArabic ? -3 : 3 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 bg-white rounded-lg border border-gold flex items-start gap-2.5 text-xs shadow-sm"
                  >
                    <Award className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-forestGreen uppercase text-[10px]">{k.tag}</span>
                      <h4 className="font-semibold text-editorial-dark">{k.title}</h4>
                      <p className="text-slate-500 text-[11px]">{k.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* BOTTOM: DIRECT CONNECT CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pt-8"
          >
            <div className="bg-editorial-dark text-white rounded-xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="space-y-2 max-w-xl">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white block">{t.connectTag}</span>
                <h3 className="font-serif text-2xl font-normal text-gold">{t.connectTitle}</h3>
                <p className="text-slate-300 text-xs">{t.connectDesc}</p>
                <div className="pt-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold" />
                  <a className="font-serif text-base text-white hover:text-gold transition-colors hover:underline" href="mailto:founder-office@tr-tourism.com">
                    founder-office@tr-tourism.com
                  </a>
                </div>
              </div>

              {/* Dispatch Actions & Channels */}
              <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                <div className="flex gap-5">
                  {t.links.map((link, idx) => {
                    const IconComponent = link.icon;
                    return (
                      <motion.a 
                        key={idx} 
                        href="#" 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 rounded-lg bg-forestGreen/70 hover:bg-slate-700 text-gold border border-forestGreen transition-colors" 
                        title={link.name}
                      >
                        <IconComponent className="w-4 h-4" />
                      </motion.a>
                    );
                  })}
                </div>
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full bg-forestGreen hover:bg-white hover:text-forestGreen text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all duration-300 ease-in-out" 
                  href="#"
                >
                  <span>{t.ctaBtn}</span>
                  <Send className="w-3.5 h-3.5 text-gold" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.main>
      </AnimatePresence>
    </div>
    </Layout>
  );
}