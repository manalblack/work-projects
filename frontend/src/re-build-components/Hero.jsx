import { motion } from 'framer-motion';
import { Compass, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export default function Hero({ isRtl, fadeIn, staggerContainer }) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#faf8ff] to-[#faf8ff] pt-6 pb-10 sm:pt-12 sm:pb-16 lg:pt-20 lg:pb-28">
      {/* Background Soft Glows */}
      <div className="absolute -left-24 top-0 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[#0ea5e9]/10 blur-3xl pointer-events-none" />
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
              className="inline-flex items-center gap-2 rounded-full bg-white border border-neutral-200/80 px-3.5 py-1.5 shadow-sm max-w-full"
            >
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
              </span>
              <span className="text-[11px] sm:text-[12px] font-bold text-neutral-800 tracking-wide leading-tight truncate sm:whitespace-normal">
                {isRtl 
                  ? 'تروفيستا: حيث تلتقي الرحلات الاستثنائية بالمناسبات الفاخرة' 
                  : 'Troviesta: Where Extraordinary Escapes Meet Unforgettable Occasions'}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={fadeIn} 
              className="mt-4 sm:mt-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-[1.15] sm:leading-[1.1]"
            >
              {isRtl ? (
                <>وجهات استثنائية.<br />مناسبات لا تُنسى.</>
              ) : (
                <>Extraordinary Escapes.<br />Unforgettable Occasions.</>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={fadeIn} 
              className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base lg:text-lg text-neutral-600 leading-relaxed"
            >
              {isRtl 
                ? 'ابتكار تجارب السفر الفاخر والقمم الدولية بأسلوب مخصص وأعلى درجات الخصوصية.' 
                : 'Pioneering bespoke luxury travel, sovereign retreats, and monumental summits with unrivaled discretion.'}
            </motion.p>

            {/* Responsive Search & Call to Action Bar */}
            <motion.div 
              variants={fadeIn} 
              className="mt-6 sm:mt-8 w-full max-w-xl rounded-2xl bg-white p-2 sm:p-2.5 shadow-lg border border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
            >
              <div className="flex items-center gap-2.5 px-3 py-2 w-full">
                <Compass className="w-5 h-5 text-[#0ea5e9] shrink-0" />
                <input 
                  type="text"
                  placeholder={isRtl ? 'أدخل الوجهة أو نوع الفعالية...' : 'Where to next or event type?'}
                  className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none font-medium"
                />
              </div>

              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#" 
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0ea5e9] px-5 py-3 text-sm text-white font-semibold shadow-md hover:bg-[#0284c7] transition-all text-center"
              >
                <span>{isRtl ? 'استكشف الآن' : 'Explore Now'}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </motion.a>
            </motion.div>

            {/* Responsive Trust Indicators */}
            <motion.div variants={fadeIn} className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-neutral-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0" />
                {isRtl ? 'خدمة كونسيرج 24/7' : '24/7 Dedicated Concierge'}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#0ea5e9] fill-current shrink-0" />
                {isRtl ? '+500 رحلة مخصصة' : '500+ Curated Journeys'}
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
                  className="h-[280px] sm:h-[380px] lg:h-[420px] w-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5">
                  <div className="rounded-xl bg-white/90 p-3 sm:p-3.5 backdrop-blur-md shadow-md border border-white/50">
                    <p className="text-[10px] sm:text-xs font-bold text-[#0ea5e9] uppercase tracking-wider">
                      {isRtl ? 'وجهة مميزة' : 'Featured Sanctuary'}
                    </p>
                    <p className="font-bold text-neutral-950 text-sm sm:text-base mt-0.5">
                      {isRtl ? 'هضبة أوبودو الجبلية' : 'Obudu Mountain Plateau'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}