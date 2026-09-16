import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Ticket, Info, X, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

// Sample Event Data
const FEATURED_EVENTS = [
  {
    id: 'evt-1',
    title: 'West Africa Tech & Innovation Summit',
    category: 'Summit',
    date: 'Oct 24 - 26, 2026',
    time: '09:00 AM WAT',
    location: 'Lagos, Nigeria',
    venue: 'Eko Convention Centre',
    price: '$250',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    description: 'Join over 1,200 tech pioneers, investors, and policymakers for a 3-day summit exploring AI infrastructure, fintech, and digital economy growth across West Africa.',
    speakers: ['Amina Bello (Tech Africa)', 'David Okafor (FinPulse)', 'Sarah Jenkins (Global Ventures)'],
  },
  {
    id: 'evt-2',
    title: 'Obudu Mountain Eco Sanctuary Retreat',
    category: 'Luxury Escape',
    date: 'Nov 12 - 15, 2026',
    time: 'All Day Event',
    location: 'Cross River, Nigeria',
    venue: 'Obudu Mountain Resort',
    price: '$1,200',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'An ultra-bespoke retreat combining executive networking, wellness workshops, and guided mountain expeditions designed for C-suite leaders and sovereign founders.',
    highlights: ['Private Helicopter Transfer', 'Executive Wellness Sessions', 'Guided Cloud Canopy Tour'],
  },
  {
    id: 'evt-3',
    title: 'Pan-African Sovereign Investment Gala',
    category: 'Gala',
    date: 'Dec 05, 2026',
    time: '06:30 PM WAT',
    location: 'Abuja, Nigeria',
    venue: 'Transcorp Hilton Grand Ballroom',
    price: '$550',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    description: 'An exclusive black-tie gala recognizing outstanding infrastructure projects and private equity achievements across the continent.',
    highlights: ['Keynote Address by Industry Leaders', '4-Course Gourmet Dinner', 'Private VIP Lounge Access'],
  },
];




export default function FeaturedEvents({ isRtl = false }) {
  const [activeModal, setActiveModal] = useState(null); // { type: 'about' | 'book', event: Object }
  const [bookingSuccess, setBookingSuccess] = useState(false);


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
    <section className="w-full bg-neutral-50/50 py-12 sm:py-16 lg:py-24 border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            {/* <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0ea5e9]">
              {isRtl ? 'فعاليات مختارة' : 'Handpicked Experiences'}
            </span> */}
            <motion.div 
              variants={fadeIn} 
              className="inline-flex items-center gap-2 rounded-full mb-5 bg-white border border-neutral-200/80 px-3.5 py-1.5 shadow-sm max-w-full"
            >
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
              </span>
              <span className="text-[11px] sm:text-[12px] font-bold text-neutral-800 tracking-wide leading-tight truncate sm:whitespace-normal">
                {isRtl ? 'فعاليات مختارة' : 'Handpicked Experiences'}
              </span>
            </motion.div>

            <h2 className="mt-1 text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {isRtl ? 'الفعاليات القادمة المميزة' : 'Featured Events'}
            </h2>
          </div>

          <a 
            href="#events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0ea5e9] hover:text-[#0284c7] transition-colors self-start md:self-auto"
          >
            <span>{isRtl ? 'عرض جميع الفعاليات' : 'View All Events'}</span>
            <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          </a>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_EVENTS.map((evt) => (
            <motion.div
              key={evt.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Card Media */}
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                  <img 
                    src={evt.image} 
                    alt={evt.title}
                    className="w-full h-full object-cover" 
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-neutral-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                    {evt.category}
                  </span>
                  <span className="absolute top-3 right-3 bg-neutral-900/90 backdrop-blur-md text-white text-[12px] font-bold px-3 py-1 rounded-full shadow-sm">
                    {evt.price}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#0ea5e9]" />
                      {evt.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
                      {evt.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 line-clamp-2 leading-snug mb-2">
                    {evt.title}
                  </h3>

                  <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => openModal('about', evt)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-neutral-200 hover:border-neutral-300 bg-white text-neutral-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Info className="w-4 h-4 text-neutral-500" />
                  <span>{isRtl ? 'عن الفعالية' : 'About Event'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openModal('book', evt)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  <span>{isRtl ? 'احجز تذكرة' : 'Book Ticket'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Events Bottom CTA (Mobile friendly) */}
        <div className="mt-8 text-center md:hidden">
          <a
            href="#events"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white border border-neutral-200 text-neutral-900 font-semibold text-sm shadow-sm"
          >
            <span>{isRtl ? 'استكشف كل الفعاليات' : 'Explore All Events'}</span>
            <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          </a>
        </div>

      </div>

      {/* Dynamic Pop-up Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
                    {activeModal.event.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0ea5e9]" />
                      {activeModal.event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {activeModal.event.time}
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
                        {activeModal.event.venue}, {activeModal.event.location}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        {isRtl ? 'عن التجربة' : 'Overview'}
                      </h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {activeModal.event.description}
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
                              {sp}
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
                            placeholder="e.g. Alexander Vance"
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
              <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50 text-right">
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