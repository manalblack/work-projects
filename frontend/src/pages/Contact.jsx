import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  ArrowRight,
  ArrowLeft,
  Lock,
  Send,
  ShieldCheck,
  MessageSquare,
  Phone,
  Plane,
  CheckCircle2,
  MapPin,
  Mail,
  Share2, 
   Compass, Star
} from 'lucide-react';
import Layout from '../layouts/Layout';
import { FaTiktok, FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from '../hooks/LanguageContext';
import emailjs from '@emailjs/browser';

// --- Translations Data ---
const translations = {
  en: {
    banner: "DISPATCHES & EXPEDITION PROTOCOLS • EDITION VOL. IV — 2025",
    cities: ["LAGOS", "ABUJA", "CALABAR", "OBUDU", "JOS"],
    nav: {
      home: "Home",
      founder: "Founder",
      tourism: "Tourism & Services",
      events: "Events",
      news: "News & Insights",
      inquire: "Inquire Now",
    },
    hero: {
      badge: "Confidential Protocol Desk",
      titleStart: "Get in ",
      titleItalic: "Touch",
      subtitle: "Commission an expedition, secure ministerial accreditation, or request private protocol coordination with our executive secretariat.",
    },
    form: {
      confidential: "Confidential Dispatch System",
      transmission: "AES-256 Bit Transmission",
      heading: "Commission an Expedition or Delegation",
      subheading: "Complete the protocol parameters below. Your transmission is routed directly to the Chief Protocol Officer's terminal with immediate non-disclosure status.",
      step1: "1. Select Mission Classification",
      classifications: ["Expedition", "Accreditation", "Bilateral Summit", "Founder Audience"],
      labels: {
        title: "Diplomatic Title",
        leadEnvoy: "Lead Envoy / Principal Name",
        institution: "Institution / Organization",
        email: "Encrypted Email Address",
        venue: "Preferred Expedition / Venue",
        delegationSize: "Delegation Size & Tiers",
        clearances: "Protocol Clearances & Accreditations",
        notes: "Confidential Dispatch Notes & Itinerary Specifics",
      },
      titles: [
        "His Excellency (H.E.)",
        "Honorable / Minister",
        "Ambassador",
        "Doctor (Dr.)",
        "Mr. / Ms. / Esq.",
        "Sovereign Family Office",
      ],
      venues: [
        "Obudu Mountain Cloud Forest Sanctuary",
        "Epe Mangroves & Private Gulf Catamaran",
        "Yankari Wildlife Savanna & Hot Springs",
        "Lagos Sovereign Bilateral Summit Complex",
        "AlUla Desert Falconry & Heritage Tour",
        "Cross-River Calabar Cultural Odyssey",
        "Custom Sovereign Corridor (Multi-leg)",
      ],
      delegationOptions: [
        "Solo Sovereign Principal (with aide)",
        "Small Executive Delegation (2 - 5 PAX)",
        "Cabinet / Ministerial Retinue (6 - 15 PAX)",
        "Institutional Assembly (20 - 60+ PAX)",
      ],
      checkboxes: [
        "Bilateral NDA Executed by Default",
        "Armored Transport (VR7 / B6)",
        "Direct Tarmac / Apron Diplomatic Pass",
        "Dedicated Gulfstream / Challenger Charter",
      ],
      placeholders: {
        leadEnvoy: "Full name of designated principal",
        institution: "Ministry, Fund, or Corporate Group",
        email: "principal@institution.gov / proton",
        notes: "Detail dates, security escorts, dietary or cultural dietary protocols, and specific objectives...",
      },
      submitBtn: "Submit Confidential Dispatch",
      securityGuaranteed: "Encrypted transit directly to the Senior Protocol Envoy. Response guaranteed within 24 hours.",
    },
    standby: {
      badge: "Standby Channel",
      level: "SECURE LEVEL 1",
      title: "Direct Envoy WhatsApp",
      description: "For urgent ministerial flight clearances, imminent motorcade coordination, or direct communication with the founder's secretariat.",
      avgResponse: "Average Response Time",
      respTime: "Under 12 Mins",
      btn: "Launch Diplomatic WhatsApp",
    },
    hotlines: {
      title: "Dedicated Protocol Directory",
      ngTitle: "Nigeria Protocol Command",
      ngSub: "Lagos & Abuja Diplomatic Desks",
      gulfTitle: "Gulf & Sovereign Finance Desk",
      gulfSub: "Dubai & Riyadh Capital Coordination",
      aviationTitle: "Emergency Aviation & Flight Operations",
      aviationSub: "NCAA & GCAA Overflight Clearance",
    },
    pledge: {
      title: "Our Confidentiality Pledge",
      points: [
        "Zero unsolicited commercial marketing.",
        "Immediate Mutual NDA executed before itinerary reveal.",
        "Biometric vetting for all security drivers & private air escorts.",
      ],
    },
    modal: {
      title: "Dispatch Encrypted & Received",
      body: "Your expedition parameters have been securely routed to the Executive Secretariat. A designated protocol envoy will establish contact via your preferred confidential channel within hours.",
      btn: "Return to Portal",
    },
    footer: {
      brandDesc: "Curators of ultra-luxury bespoke journeys, monumental corporate summits, and Arabian-African hospitality engagements crafted for world-class travelers and global institutions.",
      badge: "Premier Destination Management & Protocol",
      exploration: "Exploration",
      concierge: "Concierge Hubs",
      dubai: "Dubai: Boulevard Plaza Tower 1, Downtown",
      lagos: "Lagos: Victoria Island Executive Enclave",
      abuja: "Abuja: Maitama Diplomatic District",
      bulletinTitle: "Private Bulletin",
      bulletinDesc: "Receive diplomatic calendar previews, sovereign expeditions, and confidential retreat announcements.",
      join: "Join",
      copyright: "© 2025 TR Tourism & Events LLC & Troviesta. All rights reserved. Registered across GCC and ECOWAS jurisdictions.",
      links: ["Privacy Protocol", "Terms of Accreditation", "Sovereign Licensing"],
    },
  },
  ar: {
    banner: "البلاغات وبروتوكولات الحملات • الطبعة الرابعة — ٢٠٢٥",
    cities: ["لاغوس", "أبوجا", "كالابار", "أوبودو", "جوس"],
    nav: {
      home: "الرئيسية",
      founder: "المؤسس",
      tourism: "السياحة والخدمات",
      events: "الفعاليات",
      news: "الأخبار والرؤى",
      inquire: "استفسر الآن",
    },
    hero: {
      badge: "مكتب البروتوكول السري",
      titleStart: "تواصل ",
      titleItalic: "معنا",
      subtitle: "طلب حملة استكشافية، أو الحصول على اعتماد وزاري، أو تنسيق بروتوكول خاص مع الأمانة التنفيذية.",
    },
    form: {
      confidential: "نظام الإرسال السري",
      transmission: "تشفير AES-256 بت",
      heading: "طلب حملة استكشافية أو وفد",
      subheading: "يرجى استكمال المعايير البروتوكولية أدناه. يتم توجيه إرسالك مباشرة إلى رئيس مكتب البروتوكول مع حالة سرية فورية.",
      step1: "١. اختر تصنيف المهمة",
      classifications: ["حملة استكشافية", "اعتماد دبلوماسي", "قمة ثنائية", "لقاء مع المؤسس"],
      labels: {
        title: "اللقب الدبلوماسي",
        leadEnvoy: "اسم المبعوث الرئيسي / المسؤول",
        institution: "المؤسسة / المنظمة",
        email: "البريد الإلكتروني المشفر",
        venue: "الوجهة / الممر المفضل",
        delegationSize: "حجم الوفد والدرجات",
        clearances: "التصاريح والاعتمادات البروتوكولية",
        notes: "ملاحظات إرسال سرية وتفاصيل خطة السفر",
      },
      titles: [
        "معالي (H.E.)",
        "معالي الوزير / سعادة",
        "سفير",
        "دكتور (Dr.)",
        "السيد / السيدة",
        "المكتب العائلي السيادي",
      ],
      venues: [
        "محمية غابات سحاب جبل أوبودو",
        "أشجار المانغروف في إيبي وك القطماران الخاص",
        "محمية يانكاري للحياة البرية والينابيع الحارة",
        "مجمع القمة الثنائية السيادي في لاغوس",
        "جولة الصقارة والتراث في العلا",
        "ملحمة كروس ريفر كالابار الثقافية",
        "ممر سيادي مخصص (متعدد المحطات)",
      ],
      delegationOptions: [
        "مسؤول سيادي بمفرده (مع مرافق)",
        "وفد تنفيذي صغير (٢ - ٥ أفراد)",
        "حاشية وزارية / حكومية (٦ - ١٥ فردًا)",
        "جمعية مؤسسية (٢٠ - ٦٠+ فردًا)",
      ],
      checkboxes: [
        "توقيع اتفاقية عدم إفصاح ثنائية افتراضيًا",
        "نقل مصفح (VR7 / B6)",
        "تصريح دبلوماسي مباشر إلى مدرج الطائرات",
        "طائرة خاصة مخصصة (Gulfstream / Challenger)",
      ],
      placeholders: {
        leadEnvoy: "الاسم الكامل للمسؤول المحدد",
        institution: "الوزارة، الصندوق، أو المجموعة الاستثمارية",
        email: "principal@institution.gov / proton",
        notes: "تفاصيل التواريخ، الحراسة الأمنية، البروتوكولات الغذائية أو الثقافية، والأهداف المحددة...",
      },
      submitBtn: "إرسال الطلب السري",
      securityGuaranteed: "نقل مشفر مباشرة إلى كبير مبعوثي البروتوكول. الاستجابة مضمونة خلال ٢٤ ساعة.",
    },
    standby: {
      badge: "قناة الطوارئ",
      level: "مستوى أمان ١",
      title: "واتساب المبعوث المباشر",
      description: "للتصاريح الجوية الوزارية العاجلة، وتنسيق المواكب الرسمية، أو التواصل المباشر مع أمانة المؤسس.",
      avgResponse: "متوسط وقت الاستجابة",
      respTime: "أقل من ١٢ دقيقة",
      btn: "بدء محادثة واتساب الدبلوماسية",
    },
    hotlines: {
      title: "دليل البروتوكول المخصص",
      ngTitle: "قيادة البروتوكول في نيجيريا",
      ngSub: "مكاتب لاغوس وأبوجا الدبلوماسية",
      gulfTitle: "مكتب الخليج والتمويل السيادي",
      gulfSub: "تنسيق الاستثمار في دبي والرياض",
      aviationTitle: "عمليات الطيران السريع والطوارئ",
      aviationSub: "تصاريح الطيران من NCAA و GCAA",
    },
    pledge: {
      title: "تعهد السرية الخاص بنا",
      points: [
        "عدم إرسال أي رسائل تسويقية غير مطلوبة.",
        "توقيع اتفاقية عدم إفصاح متبادلة قبل كشف خطة السفر.",
        "تدقيق بيومتري لجميع السائقين الأمنيين والمرافقين الجويين.",
      ],
    },
    modal: {
      title: "تم تشفير الإرسال واستلامه",
      body: "تم توجيه معايير رحلتك بأمان إلى الأمانة التنفيذية. سيقوم مبعوث بروتوكول معين بالتواصل معك عبر قناتك السرية المفضلة خلال ساعات.",
      btn: "العودة إلى البوابة",
    },
    footer: {
      brandDesc: "قائمون على تنظيم الرحلات الاستكشافية الفاخرة، والقمم المؤسسية الكبرى، وتجارب الضيافة العربية الأفريقية لنخبة المسافرين والمؤسسات العالمية.",
      badge: "إدارة الوجهات والبروتوكول الرائدة",
      exploration: "الاستكشاف",
      concierge: "مراكز الكونسيرج",
      dubai: "دبي: برج بوليفارد بلازا ١، الداون تاون",
      lagos: "لاغوس: جزر فيكتوريا النخبوية",
      abuja: "أبوجا: الحي الدبلوماسي في مايتاما",
      bulletinTitle: "النشرة الخاصة",
      bulletinDesc: "احصل على معاينات التقويم الدبلوماسي، الحملات الاستكشافية السيادية، وإعلانات الملاذات السرية.",
      join: "انضمام",
      copyright: "© ٢٠٢٥ شركة TR للسياحة والفعاليات وTroviesta. جميع الحقوق محفوظة. مسجلة في دول مجلس التعاون الخليجي والإيكواس.",
      links: ["بروتوكول السرية", "شروط الاعتماد", "الترخيص السيادي"],
    },
  },
};

export default function ContactDispatchPage() {
  // const [currentLang, setCurrentLang] = useState(lang);
  const [activeClassification, setActiveClassification] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
      user_name: '',
      user_email: '',
      phone_number: '',
      message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const { lang, toggleLanguage, isRtl } = useLanguage();

  const t = translations[lang];
  // const isRtl = currentLang === 'ar';

  const handleDispatch = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

   const handleInquirySubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        'service_xgquvfj',     // <-- Paste your Service ID here
        'template_y6o946r',    // <-- Paste your Template ID here
        formData,
        'ah1Y-zeBkndkLjhx3'      // <-- Paste your Public Key here
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setLoading(false);
          setStatus('success');
          // formRef.current.reset();
        },
        (error) => {
          console.log('FAILED...', error);
          setLoading(false);
          setStatus('error');
        }
      );
  };

    // const toggleLanguage = (newLang) => {
    //   setCurrentLang(newLang);
    // };

    const fadeIn = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } 
    }
    };

    const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 }
    }
    };




  return (
    <Layout isRtl={isRtl} onToggleLanguage={toggleLanguage}>
        <div dir={isRtl ? 'rtl' : 'ltr'} className="bg-black font-sans antialiased selection:bg-sky-100 transition-all duration-300">
      
      {/* MAIN CONTENT AREA */}
            <main className="pt-[90px]">
                <section className="relative w-full overflow-hidden bg-black pt-6 pb-10 sm:pt-12 sm:pb-16 lg:pt-25 lg:pb-28">
                    {/* Background Soft Glows */}
                    <div className="absolute -left-24 top-0 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
                    <div className="absolute right-0 top-1/4 h-[320px] w-[320px] sm:h-[480px] sm:w-[480px] rounded-full bg-[#10b981]/10 blur-3xl pointer-events-none" />

                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
                        <div className="grid grid-cols-1 items-center gap-8 lg:gap-10 lg:grid-cols-12">
                        
                        {/* Left Content */}
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="flex flex-col items-start lg:col-span-7"
                        >
                            {/* Catchphrase / Brand Tagline Badge */}
                            <motion.div 
                            variants={fadeIn} 
                            className="inline-flex items-center gap-2 rounded-full bg-forestGreen border border-white/80 px-3.5 py-1.5 shadow-sm max-w-full"
                            >
                            <span className="flex h-2 w-2 relative shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                            </span>
                            <span className="text-[11px] sm:text-[12px] font-bold text-white tracking-wide leading-tight truncate sm:whitespace-normal">
                                {isRtl 
                                ? 'تواصل معانا' 
                                : 'Contact Us'}
                            </span>
                            </motion.div>

                            {/* Main Headline */}
                            <motion.h1 
                            variants={fadeIn} 
                            className="mt-4 sm:mt-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gold tracking-tight leading-[1.15] sm:leading-[1.1]"
                            >
                            {isRtl ? (
                                <>
                                    تواصل معانا عبر الايميل او خلال حسابتنا في السوشيل ميديا
                                </>
                            ) : (
                                <>
                                    Contact us via email or <br/> through our social media accounts
                                </>
                            )}
                            </motion.h1>

                            {/* Subtitle */}
                    

                            {/* Responsive Search & Call to Action Bar */}
                           

                            {/* Responsive Trust Indicators */}
                            <motion.div variants={fadeIn} className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-neutral-500">
                            {/* <span className="flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                                {isRtl ? 'خدمة كونسيرج 24/7' : '24/7 Dedicated Concierge'}
                            </span> */}
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-gold fill-current shrink-0" />
                                {isRtl ? '+500 رحلة مخصصة' : '500+ Curated Journeys'}
                            </span>
                            </motion.div>
                        </motion.div>
                        </div>
                    </div>
                </section>
                
                <section className='m-auto flex bg-pink-00 md:flex-row flex-col gap-9 md:justify-between md:w-3xl justify-center items-center pb-10 mt-10'>
                   <form 
  action=""
  onSubmit={handleInquirySubmit}
  className="relative overflow-hidden bg-white rounded-xl p-2 w-80 md:w-md min-h-[560px] flex flex-col justify-between"
>
  {/* ---------------------------------------------------- */}
  {/* SUCCESS OVERLAY (Shows when status === 'success')    */}
  {/* ---------------------------------------------------- */}
  <AnimatePresence>
    {status === 'success' && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute inset-0 z-30 bg-white/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center space-y-4"
      >
        {/* Animated Checkmark Circle */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
          className="w-16 h-16 bg-forestGreen/10 rounded-full flex items-center justify-center border border-forestGreen/20 shadow-sm"
        >
          <CheckCircle2 className="w-10 h-10 text-forestGreen" />
        </motion.div>

        {/* Message Heading */}
        <h3 className="text-xl font-extrabold text-forestGreen">
          {isRtl ? 'تم إرسال رسالتك بنجاح!' : 'Message Sent Successfully!'}
        </h3>

        {/* Subtext */}
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          {isRtl 
            ? 'شكراً لتواصلك معنا. قام فريقنا باستلام رسالتك وسنرد عليك في أقرب وقت.' 
            : 'Thank you for reaching out. team has received your inquiry and will respond shortly.'}
        </p>

        {/* Action Button to Send Another Message */}
        <button
          type="button"
          onClick={() => {
            setStatus(null);
            setFormData({
              user_name: '',
              user_email: '',
              phone_number: '',
              message: ''
            });
          }}
          className="mt-2 px-6 py-2.5 rounded-full bg-forestGreen text-white font-bold text-xs border border-forestGreen hover:bg-white hover:text-forestGreen transition-all duration-300 shadow-md cursor-pointer"
        >
          {isRtl ? 'إرسال رسالة أخرى' : 'Send Another Message'}
        </button>
      </motion.div>
    )}
  </AnimatePresence>

  {/* ---------------------------------------------------- */}
  {/* FORM FIELDS                                         */}
  {/* ---------------------------------------------------- */}
  <motion.div 
    variants={fadeIn} 
    className="inline-flex items-center m-5 gap-2 rounded-full bg-forestGreen border border-white/80 px-3.5 py-1.5 shadow-sm max-w-full"
  >
    <span className="flex h-2 w-2 relative shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
    </span>
    <span className="text-[11px] sm:text-[12px] font-bold text-white tracking-wide leading-tight truncate sm:whitespace-normal">
      {isRtl ? 'تواصل معانا عبر الايميل' : 'Email Us'}
    </span>
  </motion.div>

  <div className="flex flex-col gap-4 justify-center items-center pb-4">

    {/* Full Name */}
    <div className="flex flex-col gap-2">
      <label htmlFor="fullName" className="font-bold text-forestGreen text-base">
        {isRtl ? 'الاسم كامل' : 'Full name'}
      </label>
      <input 
        value={formData.user_name} 
        onChange={handleChange}
        type="text" 
        name="user_name" 
        placeholder={isRtl ? 'أدخل اسمك' : 'Enter your full name'}
        required
        className="bg-gray-50 md:w-90 w-70 px-3 py-2 rounded-md shadow-xs border border-forestGreen text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-gold transition-all"
      />
    </div>

    {/* Email */}
    <div className="flex flex-col gap-2">
      <label htmlFor="user_email" className="font-bold text-forestGreen text-base">
        {isRtl ? 'الايميل' : 'Email'}
      </label>
      <input 
        value={formData.user_email} 
        onChange={handleChange}
        type="email" 
        name="user_email" 
        placeholder="you@example.com"
        required
        dir="ltr"
        className="bg-gray-50 md:w-90 w-70 px-3 py-2 rounded-md shadow-xs border border-forestGreen text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-gold transition-all text-left"
      />
    </div>

    {/* Phone Number */}
    <div className="flex flex-col gap-2">
      <label className="font-bold text-forestGreen text-base">
        {isRtl ? 'رقم الجوال' : 'Phone number'}
      </label>
      <input 
        value={formData.phone_number} 
        onChange={handleChange}
        type="tel" 
        name="phone_number" 
        placeholder="+218..."
        dir="ltr"
        className="bg-gray-50 md:w-90 w-70 px-3 py-2 rounded-md shadow-xs border border-forestGreen text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-gold transition-all text-left"
      />
    </div>

    {/* Message */}
    <div className="flex flex-col gap-2">
      <label className="font-bold text-forestGreen text-base">
        {isRtl ? 'الرسالة' : 'Message'}
      </label>
      <textarea 
        value={formData.message} 
        onChange={handleChange}
        name="message" 
        required
        placeholder={isRtl ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
        className="border border-forestGreen md:w-90 w-70 h-24 px-3 py-2 rounded-md shadow-xs text-slate-900 text-sm focus:outline-none focus:border-gold transition-all resize-none" 
      />
    </div>

    {/* Error Alert Box (Only shows if EmailJS fails) */}
    {status === 'error' && (
      <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-md text-xs w-70 md:w-90 text-center">
        {isRtl ? 'حدث خطأ، يرجى المحاولة لاحقاً.' : 'Failed to send message. Please try again.'}
      </div>
    )}

    {/* Submit Button */}
    <button 
      type="submit"
      disabled={loading}
      className="text-[15px] sm:text-[17px] rounded-full shadow-md px-6 py-2 font-bold text-white bg-forestGreen tracking-wide border border-forestGreen hover:bg-white hover:text-forestGreen transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
    >
      <span>{loading ? (isRtl ? 'جاري الإرسال...' : 'Sending...') : (isRtl ? 'ارسل' : 'Send')}</span>
      {!loading && <Send className="w-4 h-4 text-gold" />}
    </button>
  </div>
</form>

                    {/* TODO: Add the social links from the notes file */}
                    <div className='flex flex-col bg-white lg:h-70 rounded-md'>
                        <motion.div 
                            variants={fadeIn} 
                            className="inline-flex items-center m-5 gap-2 rounded-full bg-forestGreen border border-white/80 px-3.5 py-1.5 shadow-sm max-w-full"
                            >
                            <span className="flex h-2 w-2 relative shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                            </span>
                            <span className="text-[11px] sm:text-[12px] font-bold text-white tracking-wide leading-tight truncate sm:whitespace-normal">
                                {isRtl 
                                ? 'تواصل معانا عبر حسابتنا' 
                                : 'Our Social Media'}
                            </span>
                        </motion.div>
                        <div className='flex flex-row lg:flex-col justify-between items-center lg:h-45 h-20 w-50 p-2 rounded-md'>
                            <a href='https://www.instagram.com/trv.ev?stkn=MWJrZ3RoaG5kbTdraw%3D%3D&utm_source=qr' target='_blank'  className=''>
                              <FaInstagram className='size-10 text-gold hover:bg-forestGreen p-1 rounded-md transition-all duration-300 ease-in-out'/>
                            </a>
                            <a href='https://www.tiktok.com/@trv.ev?_r=1&_t=ZS-99v1Bt5qiQ9' target='_blank'  className=''>
                              <FaTiktok className='size-10 text-gold hover:bg-forestGreen p-1 rounded-md transition-all duration-300 ease-in-out'/>
                            </a>
                            <a href='https://wa.me/message/DRZ3AJKQ32KJA1' target='_blank'  className=''>
                              <FaWhatsapp className='size-10 text-gold hover:bg-forestGreen p-1 rounded-md transition-all duration-300 ease-in-out'/>
                            </a>
                        </div>
                    </div>
                </section>      
            </main>

        {/* SUCCESS MODAL SIMULATION */}
            <AnimatePresence>
                {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsModalOpen(false)}
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />
                    <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative z-10 bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl text-center"
                    >
                    <div className="w-16 h-16 rounded-full bg-[#6cf8bb] text-[#00714d] flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.modal.title}</h3>
                    <p className="text-sm text-slate-600 mb-6 leading-relaxed">{t.modal.body}</p>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="w-full py-3 px-6 rounded-full bg-[#0ea5e9] hover:bg-[#006591] text-white text-sm font-bold transition-colors"
                    >
                        {t.modal.btn}
                    </button>
                    </motion.div>
                </div>
                )}
            </AnimatePresence>
        </div>

    </Layout>
  );
}