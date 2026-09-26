import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ArrowRight, ShieldCheck, Star, Calendar, MapPin, X, ArrowLeft, CheckCircle2, Info } from 'lucide-react';
import {Link} from 'react-router-dom';
import { useState } from 'react';

// Testing dark background with the client

export default function Hero({ isRtl, fadeIn, staggerContainer }) {

  // TODO: make the hero image, make it the first ever tour with two buttons

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hero Featured Tour Data Object
  const heroTour = {
    title: isRtl ? 'جولة منتجع ومحمية أوبودو الفاخرة' : 'Yankari Sanctuary',
    startDate: isRtl ? '12 نوفمبر 2026' : 'Nov 12, 2026',
    endDate: isRtl ? '18 نوفمبر 2026' : 'Nov 18, 2026',
    location: isRtl ? 'ولاية كروس ريفر، نيجيريا' : 'Cross River State, Nigeria',
    price: '$2,450',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: isRtl 
      ? 'استمتع بتجربة سياحية فاخرة ومصممة خصيصاً فوق القمم الجبلية. تشمل الجولة إقامة VIP رفيعة المستوى، ورحلات استكشافية موجهة، وجلسات استرخاء واستجمام في أحضان الطبيعة الخلابة.'
      : 'Experience an ultra-bespoke mountain sanctuary getaway. This signature tour includes luxury VIP accommodations, private guided canopy expeditions, and executive wellness sessions amidst breathtaking landscapes.',
    highlights: [
      isRtl ? 'نقل خاص بالطائرة المروحية VIP' : 'VIP Private Helicopter Transfer',
      isRtl ? 'إقامة فاخرة 5 نجوم شاملة بالكامل' : '5-Star All-Inclusive Luxury Resort',
      isRtl ? 'جولات جبلية موجهة وبرامج استجمام' : 'Guided Mountain Expeditions & Spa',
      isRtl ? 'لقاءات وتواصل رفيع المستوى' : 'Exclusive Executive Networking Dinners'
    ]
  };


  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    // <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#faf8ff] to-[#faf8ff] pt-6 pb-10 sm:pt-12 sm:pb-16 lg:pt-20 lg:pb-28">
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
                  ? 'تروفيستا: حيث تلتقي الرحلات الاستثنائية بالمناسبات الفاخرة' 
                  : 'Troviesta: Where Extraordinary Escapes Meet Unforgettable Events'}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={fadeIn} 
              className="mt-4 sm:mt-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gold tracking-tight leading-[1.15] sm:leading-[1.1]"
            >
              {isRtl ? (
                <>وجهات استثنائية<br />فعاليات لا تنسى.</>
              ) : (
                <>Extraordinary Escapes.<br />Unforgettable events.</>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={fadeIn} 
              className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base lg:text-lg text-white leading-relaxed"
            >
              {isRtl 
                ? '.ريادة في جولات السفر والسياحة، والملتقيات السيادية، والفعاليات الرائعة وإدارتها' 
                : 'Pioneering travel and tourism tours, sovereign retreats, and amazing events and event management'}
            </motion.p>

            {/* Responsive Search & Call to Action Bar */}
            <motion.div 
              variants={fadeIn} 
              className="mt-6 sm:mt-8 w-full max-w-xl rounded-2xl bg-white p-2 sm:p-2.5 shadow-lg border border-white flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
            >
              <div className="flex items-center gap-2.5 px-3 py-2 w-full">
                <Compass className="w-5 h-5 text-gold shrink-0" />
                <input 
                  type="text"
                  placeholder={isRtl ? 'أدخل الوجهة أو نوع الفعالية...' : 'Where to next or event type?'}
                  className="w-full bg-transparent text-sm text-forestGreen placeholder:text-neutral-400 focus:outline-none font-medium"
                />
              </div>

              <Link 
                to='/tours-and-services'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }} 
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-forestGreen px-5 py-3 text-sm text-white font-semibold shadow-md hover:bg-white hover:text-forestGreen border border-forestGreen transition-all text-center"
              >
                <span>{isRtl ? 'استكشف الآن' : 'Explore Now'}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>
            </motion.div>

            {/* Responsive Trust Indicators */}
            <motion.div variants={fadeIn} className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-neutral-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                {isRtl ? 'نسبة الرضا %100' : '100% Satisfaction rate'}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-gold fill-current shrink-0" />
                {isRtl ? 'رحلات مخصصة' : 'Curated Journeys'}
              </span>
            </motion.div>
          </motion.div>

          {/* Right Hero Image Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative lg:col-span-5 mt-2 lg:mt-0"
          >
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative z-10 overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl lg:shadow-2xl border-2 sm:border-4 border-white">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmebbR3etZJ7iNRlDopkXkNzgPG7wHCQGFLcv9uaX5mQCWknRXcfouWJBhxMUE1leUwvv91YMP5b6fhS862EpTgL5peOzt7_tbmUozSmxro7KsJHNc-04SCMD5cuGj3b3by0LbqCSX3ExOifRuVRfiFFcYfhD-hlMRZpD1EMVAn_Tm9BYQtXfFPPVJiV5DNwWJ_18gLtnsUQMubE7qkn2Quspcj99YJP1KQPTmMGg915g7O-XuXwoCOg" 
                  alt="Troviesta luxury destination" 
                  className="h-[480px] lg:h-[420px] w-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
                
                <div className="absolute flex flex-col gap-2 bg- bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5">
                  <div className="rounded-xl bg-gold/30 p-3 sm:p-3.5 backdrop-blur-md shadow-md border border-gold/60">
                    <p className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
                      {isRtl ? 'وجهة مميزة' : 'Featured Sanctuary'}
                    </p>
                    {/* TODO: ask the client what to add here */}
                    <p className="font-bold text-neutral-950 text-sm sm:text-base mt-0.5">
                      {isRtl ? 'محمية يانكاري' : 'Yankari sanctuary'}
                    </p>
                      <div className='flex flex-row gap-3 rounded-lg bg- mt-3'>
                        <button className='bg-white text-forestGreen font-semibold py-0.5 px-4 rounded-xl shadow-md border border-forestGreen hover:bg-forestGreen hover:text-white active:scale-85 transition-all duration-300 ease-in-out'>
                          {isRtl ? 'سعر الرحلة' : 'Tour price'}
                        </button>
                        <button onClick={() => setIsModalOpen(true)}
                         className='bg-white text-forestGreen font-semibold py-0.5 px-4 rounded-xl shadow-md border border-forestGreen hover:bg-forestGreen hover:text-white active:scale-85 transition-all duration-300 ease-in-out'>
                          {isRtl ? 'عن الرحلة' : 'Tour Description'}
                        </button>
                      </div>
                  </div>
                  {/* <div className='bg-white rounded-lg p-2'>
                    <button className='bg-forestGreen text-white py-0.5 px-4 rounded-full shadow-md'>
                      {isRtl ? 'سعر الرحلة' : 'Tour price'}
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Models and stuff */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 text-neutral-900">
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Pop-Out Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]"
            >
              {/* Header Image inside Modal */}
              <div className="relative h-56 sm:h-64 bg-neutral-900 flex-shrink-0">
                <img
                  src={heroTour.image}
                  alt={heroTour.title}
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-forestGreen" />
                    <span>{heroTour.location}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {heroTour.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {/* Tour Start/End Date & Pricing Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-forestGreen/10 text-forestGreen">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        {isRtl ? 'تاريخ البداية والنهاية' : 'Start & End Date'}
                      </p>
                      <p className="text-xs font-bold text-neutral-800">
                        {heroTour.startDate} – {heroTour.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end border-t sm:border-t-0 sm:border-l border-neutral-200/80 pt-3 sm:pt-0 sm:pl-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        {isRtl ? 'التكلفة الإجمالية' : 'Total Price'}
                      </p>
                      <p className="text-xl font-extrabold text-forestGreen">{heroTour.price}</p>
                    </div>
                  </div>
                </div>

                {/* Full Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    {isRtl ? 'وصف الجولة' : 'Tour Description'}
                  </h4>
                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {heroTour.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                    {isRtl ? 'أبرز مميزات الجولة' : 'Tour Highlights'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {heroTour.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-forestGreen flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 rounded-full text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    {isRtl ? 'إلغاء' : 'Close'}
                  </button>

                  <a
                    href="/contact"
                    className="flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-forestGreen text-white font-bold text-xs border border-forestGreen hover:bg-neutral-900 hover:border-neutral-900 transition-all shadow-md"
                  >
                    <span>{isRtl ? 'احجز الجولة الآن' : 'Book This Tour'}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}