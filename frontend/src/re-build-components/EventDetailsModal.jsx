import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  X, MapPin, Calendar, Ticket, Store, 
  Sparkles, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight 
} from 'lucide-react';

// Fallback test images if event.images is not provided
const TEST_IMAGES = [
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  "/red-area-stage.jpeg",
  "/red-area-cart.jpeg"
];

export default function EventDetailsModal ({ isOpen, onClose, event, isRtl = false }) {
  if (!event) return null;

  // Derive images list from event props or fallback test array
  const images = (event.images && event.images.length > 0) 
    ? event.images 
    : (event.image ? [event.image, ...TEST_IMAGES.slice(1)] : TEST_IMAGES);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const t = {
    eventName: isRtl ? 'المنطقة الحمراء' : 'Red Area',
    eventExplanation: isRtl ? 'يوم استثنائي مليء بالإضاءة الحمراء والموسيقى والرقص، بحضور فنانين ومؤثرين على مواقع التواصل الاجتماعي' : 'An extraordinary day filled with red lighting, music, and dancing, attended by artists and social media influencers',
    eventDescription: isRtl ? 'وصف الفعالية' : 'Event Description',
    ticketsAndStalls: isRtl ? 'فئات التذاكر والأكشاك' : 'Tickets & Stall Pricing',
    regularTitle: isRtl ? 'التذكرة العادية' : 'Regular Pass',
    regularDesc: isRtl ? 'دخول عام لمناطق الفعالية الرئيسية والمسرح الرئيسي' : 'Standard general admission & main stage access',
    vipTitle: isRtl ? 'تذكرة كبار الشخصيات (VIP)' : 'VIP Sovereign Pass',
    vipDesc: isRtl ? 'دخول مخصص لصالة VIP، مقاعد الأمامية، ومشروبات ضيافة' : 'Priority front seating, VIP lounge access & refreshments',
    vipBadge: isRtl ? 'كبار الشخصيات' : 'VIP',
    stallTitle: isRtl ? 'مساحة كشك / طاولة' : 'Exhibitor / Stall Booth',
    stallDesc: isRtl ? 'مساحة عرض 3×3م للمنتجات والخدمات + تصريحي عارضين' : '3m x 3m display booth space + 2 Exhibitor passes',
    close: isRtl ? 'إغلاق' : 'Close',
    bookAction: isRtl ? 'احجز تذكرتك / كشكك الآن' : 'Book Ticket / Stall',
  };

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const LeftNavIcon = isRtl ? ChevronRight : ChevronLeft;
  const RightNavIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          dir={isRtl ? 'rtl' : 'ltr'} 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 text-neutral-900 select-none"
        >
          {/* Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Pop-Out Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-9/10 max-w-2xl bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* ---------------------------------------------------- */}
            {/* MULTI-IMAGE CAROUSEL HEADER                          */}
            {/* ---------------------------------------------------- */}
            <div className="relative md:h-98 h-80 bg-slate-900 flex-shrink-0 group overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={typeof event.title === 'object' ? event.title[isRtl ? 'ar' : 'en'] : event.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  /* SWIPE / DRAG HANDLERS */
                  drag={images.length > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipeThreshold = 50; // Minimum px distance needed to trigger swipe
                    if (offset.x < -swipeThreshold) {
                      // Swiped left
                      isRtl ? handlePrevImage() : handleNextImage();
                    } else if (offset.x > swipeThreshold) {
                      // Swiped right
                      isRtl ? handleNextImage() : handlePrevImage();
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/30 to-transparent pointer-events-none" />

             <button
                onClick={onClose}
                className={`absolute top-3 sm:top-4 ${isRtl ? 'left-3 sm:left-4' : 'right-3 sm:right-4'} p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all z-20 cursor-pointer`}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className={`absolute top-3 sm:top-4 ${isRtl ? 'right-3 sm:right-4' : 'left-3 sm:left-4'} z-10`}>
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 font-bold text-[11px] sm:text-xs shadow-sm flex items-center gap-1.5">
                  <span>{event.flag}</span>
                  <span className="truncate max-w-[120px] sm:max-w-none">
                    {typeof event.regionName === 'object' ? event.regionName[isRtl ? 'ar' : 'en'] : event.regionName}
                  </span>
                </span>
              </div>

              {/* Image Navigation Controls (Show if > 1 image) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className={`hidden md:flex absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-2 sm:right-3' : 'left-2 sm:left-3'} p-1.5 sm:p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all z-20 cursor-pointer`}
                >
                  <LeftNavIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={handleNextImage}
                  className={`hidden md:flex absolute top-1/2 -translate-y-1/2 ${isRtl ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} p-1.5 sm:p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all z-20 cursor-pointer`}
                >
                  <RightNavIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Dots Positioned Cleanly Above Content */}
                <div className="absolute bottom-16 sm:bottom-20 inset-x-0 flex items-center justify-center gap-1.5 z-20">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === currentImageIndex 
                          ? 'w-5 sm:w-6 bg-gold' 
                          : 'w-1.5 bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

              {/* Title & Venue Overlay */}
              <div className="absolute bottom-3 sm:bottom-4 inset-x-4 sm:inset-x-6 text-white z-10">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] sm:text-xs font-semibold text-gold mb-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gold shrink-0" />
                    <span>{typeof event.date === 'object' ? event.date[isRtl ? 'ar' : 'en'] : event.date}</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gold shrink-0" />
                    <span className="truncate max-w-[160px] sm:max-w-none">
                      {typeof event.venue === 'object' ? event.venue[isRtl ? 'ar' : 'en'] : event.venue}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                  {typeof event.title === 'object' ? event.title[isRtl ? 'ar' : 'en'] : event.title}
                </h3>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* MODAL BODY                                           */}
            {/* ---------------------------------------------------- */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Event Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                  {t.eventDescription}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {t.eventExplanation}
                </p>
              </div>

              {/* ---------------------------------------------------- */}
              {/* TICKET TYPES & STALL PRICING SECTION                 */}
              {/* ---------------------------------------------------- */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-3 flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-forestGreen" />
                  <span>{t.ticketsAndStalls}</span>
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  
                  {/* 1. REGULAR TICKET */}
                  <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:border-forestGreen/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          {t.regularTitle}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {/* {t.regularDesc} */}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                      <span className="text-base font-extrabold text-forestGreen">
                        {event.regularPrice || '₦2,000'}
                      </span>
                    </div>
                  </div>

                  {/* 2. VIP TICKET */}
                  <div className="relative p-4 rounded-xl border border-gold/40 bg-gradient-to-r from-amber-50/30 via-white to-amber-50/20 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-neutral-900">
                          {t.vipTitle}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/15 text-gold text-[10px] font-bold border border-gold/30">
                          <Sparkles className="w-3 h-3" />
                          {t.vipBadge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {/* {t.vipDesc} */}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-amber-100">
                      <span className="text-base font-extrabold text-forestGreen">
                        {event.vipPrice || '₦5,000'}
                      </span>
                    </div>
                  </div>

                  {/* 3. EXHIBITOR / STALL SPACE */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-gold" />
                        <span className="font-bold text-sm text-slate-900">
                          {t.stallTitle}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {/* {t.stallDesc} */}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                      <span className="text-base font-extrabold text-forestGreen">
                        {event.stallPrice || '₦15,000'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-full text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  {t.close}
                </button>

                <a 
                  target='_blank'
                  href='https://wa.me/message/DRZ3AJKQ32KJA1'
                  className="flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-forestGreen text-white font-bold text-xs border border-forestGreen hover:bg-white hover:text-forestGreen transition-all shadow-md cursor-pointer"
                >
                  <Ticket className="w-4 h-4 text-gold" />
                  <span>{t.bookAction}</span>
                  <ArrowIcon className="w-4 h-4" />
                </a>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};