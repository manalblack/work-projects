import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Ticket, Info, X, Clock, Users, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import {Link} from 'react-router-dom';

const FEATURED_EVENTS = [
  {
    id: 'evt-1',
    title: {
      en: 'West Africa Tech & Innovation Summit',
      ar: 'قمة غرب إفريقيا للتكنولوجيا والابتكار'
    },
    category: {
      en: 'Summit',
      ar: 'قمة'
    },
    date: {
      en: 'Oct 24 - 26, 2026',
      ar: '24 - 26 أكتوبر 2026'
    },
    time: {
      en: '09:00 AM WAT',
      ar: '09:00 صباحًا بتوقيت غرب إفريقيا'
    },
    location: {
      en: 'Lagos, Nigeria',
      ar: 'لاغوس، نيجيريا'
    },
    venue: {
      en: 'Eko Convention Centre',
      ar: 'مركز إيكو للمؤتمرات'
    },
    price: '$250',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    description: {
      en: 'Join over 1,200 tech pioneers, investors, and policymakers for a 3-day summit exploring AI infrastructure, fintech, and digital economy growth across West Africa.',
      ar: 'انضم إلى أكثر من 1,200 من رواد التكنولوجيا والستثمرين وصناع القرار في قمة تستمر 3 أيام لاستكشاف البنية التحتية للذكاء الاصطناعي، والتكنولوجيا المالية، ونمو الاقتصاد الرقمي في غرب إفريقيا.'
    },
    speakers: [
      { en: 'Amina Bello (Tech Africa)', ar: 'أمينة بيلو (تيك إفريقيا)' },
      { en: 'David Okafor (FinPulse)', ar: 'ديفيد أوكافور (فين بالس)' },
      { en: 'Sarah Jenkins (Global Ventures)', ar: 'سارة جينكينز (جلوبال فينتشرز)' }
    ]
  },
  {
    id: 'evt-2',
    title: {
      en: 'Obudu Mountain Eco Sanctuary Retreat',
      ar: 'ملاذ محمية جبل أوبودو البيئية'
    },
    category: {
      en: 'Luxury Escape',
      ar: 'عطلة فاخرة'
    },
    date: {
      en: 'Nov 12 - 15, 2026',
      ar: '12 - 15 نوفمبر 2026'
    },
    time: {
      en: 'All Day Event',
      ar: 'حدث على مدار اليوم'
    },
    location: {
      en: 'Cross River, Nigeria',
      ar: 'كروس ريفر، نيجيريا'
    },
    venue: {
      en: 'Obudu Mountain Resort',
      ar: 'منتجع جبل أوبودو'
    },
    price: '$1,200',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: {
      en: 'An ultra-bespoke retreat combining executive networking, wellness workshops, and guided mountain expeditions designed for C-suite leaders and sovereign founders.',
      ar: 'ملاذ فاخر مصمم خصيصًا يجمع بين التواصل التنفيذي، وورش العمل الصحية، والرحلات الجبلية الموجهة المصممة لكبار التنفيذيين والمؤسسين.'
    },
    highlights: [
      { en: 'Private Helicopter Transfer', ar: 'نقل خاص بالطائرة المروحية' },
      { en: 'Executive Wellness Sessions', ar: 'جلسات صحية تنفيذية' },
      { en: 'Guided Cloud Canopy Tour', ar: 'جولة موجهة فوق السحاب' }
    ]
  },
  {
    id: 'evt-3',
    title: {
      en: 'Pan-African Sovereign Investment Gala',
      ar: 'حفل الاستثمار السيادي لعموم إفريقيا'
    },
    category: {
      en: 'Gala',
      ar: 'حفل فاخر'
    },
    date: {
      en: 'Dec 05, 2026',
      ar: '05 ديسمبر 2026'
    },
    time: {
      en: '06:30 PM WAT',
      ar: '06:30 مساءً بتوقيت غرب إفريقيا'
    },
    location: {
      en: 'Abuja, Nigeria',
      ar: 'أبوجا، نيجيريا'
    },
    venue: {
      en: 'Transcorp Hilton Grand Ballroom',
      ar: 'قاعة ترانسكورب هيلتون الكبرى'
    },
    price: '$550',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    description: {
      en: 'An exclusive black-tie gala recognizing outstanding infrastructure projects and private equity achievements across the continent.',
      ar: 'حفل رسمي فاخر لتكريم مشاريع البنية التحتية المتميزة وإنجازات الملكية الخاصة في جميع أنحاء القارة.'
    },
    highlights: [
      { en: 'Keynote Address by Industry Leaders', ar: 'كلمة رئيسية من قادة القطاع' },
      { en: '4-Course Gourmet Dinner', ar: 'عشاء فاخر مكون من 4 أطباق' },
      { en: 'Private VIP Lounge Access', ar: 'دخول حصري لصالة كبار الشخصيات' }
    ]
  }
];

// original background : bg-neutral-50/50

export default function FeaturedEvents({ isRtl = false }) {
  const [activeModal, setActiveModal] = useState(null); // { type: 'about' | 'book', event: Object }
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const langKey = isRtl ? 'ar' : 'en';

  const fadeIn = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } 
    }
  };

  const openModal = (type, event) => {
    setBookingSuccess(false);
    setActiveModal({ type, event });
  };

  const closeModal = () => {
    setActiveModal(null);
    setBookingSuccess(false);
  };

  return (
    <section className="w-full bg-black py-12 sm:py-16 lg:py-24 border-t border-neutral-200/60" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <motion.div 
              variants={fadeIn} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full mb-5 bg-forestGreen border border-neutral-200/80 px-3.5 py-1.5 shadow-sm max-w-full"
            >
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <span className="text-[11px] sm:text-[12px] font-bold text-white tracking-wide leading-tight truncate sm:whitespace-normal">
                {isRtl ? 'فعاليات مختارة' : 'Handpicked Experiences'}
              </span>
            </motion.div>

            <h2 className="mt-1 text-2xl sm:text-4xl font-extrabold text-gold tracking-tight">
              {isRtl ? 'الفعاليات القادمة المميزة' : 'Featured Events'}
            </h2>
          </div>

          <a 
            href="#events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-forestGreen px-3 py-1 rounded-full transition-colors self-start md:self-auto"
          >
            <span>{isRtl ? 'عرض جميع الفعاليات' : 'View All Events'}</span>
            <ArrowRight className={`w-4 h-4 text-gold ${isRtl ? 'rotate-180' : ''}`} />
          </a>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_EVENTS.map((evt) => (
            <motion.div
              key={evt.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Card Media */}
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                  <img 
                    src={evt.image} 
                    alt={evt.title[langKey]}
                    className="w-full h-full object-cover" 
                  />
                  <span className="absolute top-3 start-3 bg-white/90 backdrop-blur-md text-gold text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                    {evt.category[langKey]}
                  </span>
                  <span className="absolute top-3 end-3 bg-forestGreen backdrop-blur-md text-white text-[12px] font-bold px-3 py-1 rounded-full shadow-sm">
                    {evt.price}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      {evt.date[langKey]}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      {evt.location[langKey]}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 line-clamp-2 leading-snug mb-2">
                    {evt.title[langKey]}
                  </h3>

                  <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                    {evt.description[langKey]}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => openModal('about', evt)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full border border-neutral-200 hover:border-forestGreen bg-white text-neutral-800 text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <Info className="w-4 h-4 text-gold" />
                  <span>{isRtl ? 'عن الفعالية' : 'About Event'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openModal('book', evt)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-forestGreen hover:bg-white hover:text-forestGreen text-white text-xs sm:text-sm font-semibold shadow-sm cursor-pointer border border-forestGreen transition-all duration-300 ease-in-out"
                >
                  <Ticket className="w-4 h-4 text-gold" />
                  <span>{isRtl ? 'احجز تذكرة' : 'Book Ticket'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Events Bottom CTA (Mobile friendly) */}
        <div className="mt-8 text-center md:hidden">

          {/* Redirect to the events page */}
          <Link
            // to="/events"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-forestGreen border border-forestGreen text-white hover:bg-white hover:text-forestGreen font-semibold text-sm shadow-sm transition-all duration-300 ease-in-out"
          >
            <span>{isRtl ? 'استكشف كل الفعاليات' : 'Explore All Events'}</span>
            <ArrowRight className={`w-4 h-4 text-gold ${isRtl ? 'rotate-180' : ''}`} />
          </Link>
        </div>

      </div>

      {/* Dynamic Pop-up Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-neutral-100 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0ea5e9]">
                  {activeModal.type === 'about' ? (isRtl ? 'تفاصيل الفعالية' : 'Event Details') : (isRtl ? 'حجز التذاكر' : 'Ticket Reservation')}
                </span>
                <button
                  onClick={closeModal}
                  className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 leading-snug">
                    {activeModal.event.title[langKey]}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0ea5e9]" />
                      {activeModal.event.date[langKey]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {activeModal.event.time[langKey]}
                    </span>
                  </div>
                </div>

                {/* CONTENT FOR "ABOUT EVENT" MODAL */}
                {activeModal.type === 'about' && (
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-neutral-50 p-4 border border-neutral-100 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 uppercase">
                        <MapPin className="w-4 h-4 text-[#10b981]" />
                        {isRtl ? 'الموقع والمكان' : 'Venue & Location'}
                      </div>
                      <p className="text-sm font-semibold text-neutral-900">
                        {activeModal.event.venue[langKey]}, {activeModal.event.location[langKey]}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        {isRtl ? 'عن التجربة' : 'Overview'}
                      </h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {activeModal.event.description[langKey]}
                      </p>
                    </div>

                    {activeModal.event.speakers && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                          {isRtl ? 'المتحدثون البارزون' : 'Featured Speakers'}
                        </h4>
                        <ul className="space-y-1.5">
                          {activeModal.event.speakers.map((sp, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-neutral-700 font-medium">
                              <Users className="w-4 h-4 text-[#0ea5e9]" />
                              {sp[langKey]}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeModal.event.highlights && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                          {isRtl ? 'أبرز مميزات الفعالية' : 'Event Highlights'}
                        </h4>
                        <ul className="space-y-1.5">
                          {activeModal.event.highlights.map((hl, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-neutral-700 font-medium">
                              <Sparkles className="w-4 h-4 text-[#10b981]" />
                              {hl[langKey]}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* CONTENT FOR "BOOK TICKET" MODAL */}
                {activeModal.type === 'book' && (
                  <div>
                    {bookingSuccess ? (
                      <div className="text-center py-6 space-y-3">
                        <div className="w-12 h-12 rounded-full bg-[#10b981]/15 text-[#10b981] flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-bold text-neutral-900">
                          {isRtl ? 'تم تأكيد طلب الحجز!' : 'Reservation Confirmed!'}
                        </h4>
                        <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                          {isRtl 
                            ? 'لقد حجزنا تذكرتك المؤقتة. سيقوم فريق الكونسيرج بالتواصل معك.' 
                            : 'We have reserved your pass. Our concierge team will reach out shortly.'}
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={(e) => { e.preventDefault(); setBookingSuccess(true); }} className="space-y-4">
                        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0ea5e9]/10 text-[#0ea5e9] border border-[#0ea5e9]/20">
                          <span className="text-xs font-bold">{isRtl ? 'سعر التذكرة' : 'Ticket Price'}</span>
                          <span className="text-lg font-extrabold">{activeModal.event.price}</span>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                            {isRtl ? 'الاسم الكامل' : 'Full Name'}
                          </label>
                          <input 
                            required
                            type="text" 
                            placeholder={isRtl ? 'مثال: أحمد علي' : 'e.g. Alexander Vance'}
                            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                            {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
                          </label>
                          <input 
                            required
                            type="email" 
                            placeholder="alexander@company.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold text-sm transition-all shadow-md mt-2"
                        >
                          {isRtl ? 'تأكيد الحجز' : 'Confirm Pass Reservation'}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50 text-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-800 transition-colors"
                >
                  {isRtl ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}