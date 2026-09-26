import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Award, ExternalLink, X, ArrowRight, ArrowLeft, Tag } from 'lucide-react';

// Sample Past Events Data
const PAST_EVENTS = [
  {
    id: 'past-1',
    year: '2025',
    title: {
      en: 'Pan-African Tech Summit 2025',
      ar: 'قمة التكنولوجيا لعموم إفريقيا 2025'
    },
    category: {
      en: 'Technology',
      ar: 'تكنولوجيا'
    },
    date: {
      en: 'Nov 14 - 16, 2025',
      ar: '14 - 16 نوفمبر 2025'
    },
    location: {
      en: 'Lagos, Nigeria',
      ar: 'لاغوس، نيجيريا'
    },
    attendees: '1,500+',
    speakersCount: '45',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    summary: {
      en: 'Explored AI integration across emerging African markets with key executive leaders and venture capitalists.',
      ar: 'استكشاف دمج الذكاء الاصطناعي في الأسواق الأفريقية الناشئة مع كبار القادة التنفيذيين المستثمرين.'
    },
    keyTakeaways: {
      en: ['$50M+ Seed Deals Announced', '30 Startup Pitch Sessions', 'Cross-border Regulatory Workshop'],
      ar: ['الإعلان عن صفقات تمويل بأكثر من 50 مليون دولار', '30 جلسة عرض مشاريع ناشئة', 'ورشة عمل للتنظيم عبر الحدود']
    }
  },
  {
    id: 'past-2',
    year: '2025',
    title: {
      en: 'Global Hospitality & Tourism Forum',
      ar: 'المنتدى العالمي للضيافة والسياحة'
    },
    category: {
      en: 'Tourism',
      ar: 'سياحة'
    },
    date: {
      en: 'Aug 22 - 24, 2025',
      ar: '22 - 24 أغسطس 2025'
    },
    location: {
      en: 'Cross River, Nigeria',
      ar: 'كروس ريفر، نيجيريا'
    },
    attendees: '800+',
    speakersCount: '28',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    summary: {
      en: 'A high-level assembly focused on sustainable eco-resort expansion and heritage tourism investments.',
      ar: 'تجمع رفيع المستوى يركز على توسيع المنتجات البيئية المستدامة واستثمارات السياحة التراثية.'
    },
    keyTakeaways: {
      en: ['Eco-Certification Accord Signed', 'VIP Sovereign Investment Panel', 'Cultural Heritage Tour'],
      ar: ['توقيع اتفاقية الاعتماد البيئي', 'جلسة استثمار سيادي رفيعة المستوى', 'جولة التراث الثقافي']
    }
  },
  {
    id: 'past-3',
    year: '2024',
    title: {
      en: 'Sovereign Wealth & Infrastructure Gala',
      ar: 'حفل الثروة السيادية والبنية التحتية'
    },
    category: {
      en: 'Finance',
      ar: 'مالية'
    },
    date: {
      en: 'Dec 10, 2024',
      ar: '10 ديسمبر 2024'
    },
    location: {
      en: 'Abuja, Nigeria',
      ar: 'أبوجا، نيجيريا'
    },
    attendees: '650+',
    speakersCount: '20',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
    summary: {
      en: 'Honoring outstanding private-public partnership (PPP) initiatives across sub-Saharan infrastructure projects.',
      ar: 'تكريم مبادرات الشراكة بين القطاعين العام والخاص المتميزة في مشاريع البنية التحتية.'
    },
    keyTakeaways: {
      en: ['Awarded 12 Excellence Medals', 'Keynote by Central Bank Policy Directors', 'Closed-Door Investment Dinner'],
      ar: ['منح 12 ميدالية تميز', 'كلمة رئيسية من مديري سياسات البنك المركزي', 'عشاء استثماري مغلق']
    }
  }
];

export default function PreviousEventsSection({ isRtl = false }) {
  const [selectedYear, setSelectedYear] = useState('All');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  const years = ['All', '2025', '2024'];

  const filteredEvents = selectedYear === 'All' 
    ? PAST_EVENTS 
    : PAST_EVENTS.filter(event => event.year === selectedYear);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forestGreen border border-white text-white text-xs font-semibold uppercase tracking-wider mb-3"
            >
              <Award className="w-3.5 h-3.5 text-gold" />
              <span>{isRtl ? 'الفعاليات السابقة' : 'Previous events'}</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-gold"
            >
              {isRtl ? 'الفعاليات السابقة' : 'Previous Events & Highlights'}
            </motion.h2>
          </div>

          {/* Year Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-neutral-200 shadow-xs self-start md:self-auto"
          >
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedYear === year
                    ? 'bg-forestGreen text-white shadow-md'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {year === 'All' ? (isRtl ? 'الكل' : 'All') : year}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Events Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <motion.div
                layout
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden bg-neutral-200">
                  <img
                    src={event.image}
                    alt={event.title[isRtl ? 'ar' : 'en']}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-forestGreen text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                    {event.category[isRtl ? 'ar' : 'en']}
                  </span>

                  {/* Year Tag */}
                  <span className="absolute top-4 right-4 bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {event.year}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    {/* Event Meta */}
                    <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        <span>{event.date[isRtl ? 'ar' : 'en']}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gold" />
                        <span>{event.location[isRtl ? 'ar' : 'en']}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-forestGreen group-hover:text-gold line-clamp-2 mb-3 transition-all duration-300 ease-in-out">
                      {event.title[isRtl ? 'ar' : 'en']}
                    </h3>

                    <p className="text-sm text-neutral-600 line-clamp-3 mb-6 leading-relaxed">
                      {event.summary[isRtl ? 'ar' : 'en']}
                    </p>
                  </div>

                  {/* Footer Stats & Button */}
                  <div>
                    <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mb-4 text-xs text-neutral-500">
                      <span className="flex items-center gap-1 font-semibold text-neutral-700">
                        <Users className="w-3.5 h-3.5 text-neutral-400" />
                        {event.attendees} {isRtl ? 'حاضر' : 'Attendees'}
                      </span>
                      <span>
                        {event.speakersCount} {isRtl ? 'متحدث' : 'Speakers'}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveModalEvent(event)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-forestGreen bg-forestGreen hover:bg-white shadow-md hover:text-forestGreen text-white text-xs font-bold transition-all group-hover:bg-white group-hover:text-forestGreen"
                    >
                      <span>{isRtl ? 'عرض الملخص والنتائج' : 'View Summary & Highlights'}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal for Detailed View */}
        <AnimatePresence>
          {activeModalEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModalEvent(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
              >
                {/* Modal Header Image */}
                <div className="relative h-56 bg-neutral-900">
                  <img
                    src={activeModalEvent.image}
                    alt={activeModalEvent.title[isRtl ? 'ar' : 'en']}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <button
                    onClick={() => setActiveModalEvent(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black text-white backdrop-blur-md transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold mb-2">
                      {activeModalEvent.category[isRtl ? 'ar' : 'en']} • {activeModalEvent.year}
                    </span>
                    <h3 className="text-2xl font-bold">
                      {activeModalEvent.title[isRtl ? 'ar' : 'en']}
                    </h3>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                  {/* Meta Details */}
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-neutral-600 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-forestGreen" />
                      <span>{activeModalEvent.date[isRtl ? 'ar' : 'en']}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-forestGreen" />
                      <span>{activeModalEvent.location[isRtl ? 'ar' : 'en']}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-forestGreen" />
                      <span>{activeModalEvent.attendees} {isRtl ? 'مشارك' : 'Participants'}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      {isRtl ? 'عن الفعالية' : 'Event Overview'}
                    </h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {activeModalEvent.summary[isRtl ? 'ar' : 'en']}
                    </p>
                  </div>

                  {/* Highlights Bullet Points */}
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3">
                      {isRtl ? 'أبرز الإنجازات والنتائج' : 'Key Highlights & Outcomes'}
                    </h4>
                    <ul className="space-y-2">
                      {activeModalEvent.keyTakeaways[isRtl ? 'ar' : 'en'].map((item, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs text-neutral-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-forestGreen mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Close Action */}
                  <div className="pt-4 border-t border-neutral-100 flex justify-end">
                    <button
                      onClick={() => setActiveModalEvent(null)}
                      className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                    >
                      {isRtl ? 'إغلاق' : 'Close'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}