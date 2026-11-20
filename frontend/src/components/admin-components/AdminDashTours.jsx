import React, { useState } from 'react';
import { Compass, Clock, MapPin, Sparkles, X, Edit3, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/LanguageContext';

// Placeholder data for existing tours
const PLACEHOLDER_TOURS = [
  {
    id: '1',
    title: { en: 'AlUla Sovereign Heritage Expedition', ar: 'جولة العلا التراثية الساحرة' },
    description: { 
      en: 'Explore the ancient tombs of Hegra, marvel at Elephant Rock, and experience breathtaking desert sunsets.', 
      ar: 'استكشف مقابر الحجر الأثرية، واستمتع بروعة جبل الفيل، وعش أجمل غروب شمس في الصحراء.' 
    },
    location: { en: 'AlUla, Saudi Arabia', ar: 'العلا، السعودية' },
    tour_date: '2026-11-15T08:00:00Z',
    end_date: '2026-11-18T18:00:00Z',
    duration_days: 4,
    cover_image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800',
    gallery_images: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800'
    ],
    price_tiers: [
      {
        name: { en: 'Standard', ar: 'الباقة الأساسية' },
        price: 1200,
        subtitle: { en: 'Shared transport & standard camp', ar: 'نقل مشترك ومخيم قياسي' }
      },
      {
        name: { en: 'Silver', ar: 'الباقة الفضية' },
        price: 1850,
        subtitle: { en: 'Private SUV & 4-star stay', ar: 'سيارة خاصة وإقامة 4 نجوم' }
      },
      {
        name: { en: 'Gold', ar: 'الباقة الذهبية' },
        price: 2600,
        subtitle: { en: 'VIP lounge, private guide & 5-star', ar: 'صالة VIP ومرشد خاص و5 نجوم' },
        featured: true
      },
      {
        name: { en: 'Royal VIP', ar: 'الباقة الملكية' },
        price: 4200,
        subtitle: { en: 'Helicopter transfer & private villa', ar: 'نقل بالهليكوبتر وفيلا خاصة' }
      }
    ],
    inclusions: [
      { en: 'Airport VIP Pickup', ar: 'استقبال VIP من المطار' },
      { en: 'Professional Tour Guide', ar: 'مرشد سياحي محترف' },
      { en: '5-Star Desert Camp Stay', ar: 'إقامة في مخيم صحراوي 5 نجوم' }
    ]
  },
  {
    id: '2',
    title: { en: 'Red Sea Coral & Yacht Voyage', ar: 'رحلة اليخت ومرجان البحر الأحمر' },
    description: { 
      en: 'Sail across pristine crystal waters, snorkel among vibrant coral reefs, and enjoy fresh seaside dining.', 
      ar: 'أبحِر في المياه النقية، واغوص بين الشعاب المرجانية النابضة بالحياة، وتناول أشهى المأكولات البحرية.' 
    },
    location: { en: 'Jeddah, Saudi Arabia', ar: 'جدة، السعودية' },
    tour_date: '2026-12-01T09:00:00Z',
    end_date: '2026-12-03T17:00:00Z',
    duration_days: 3,
    cover_image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
    gallery_images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
    ],
    price_tiers: [
      {
        name: { en: 'Standard', ar: 'الباقة الأساسية' },
        price: 950,
        subtitle: { en: 'Shared boat & snorkeling equipment', ar: 'قارب مشترك ومعدات غوص' }
      },
      {
        name: { en: 'Silver', ar: 'الباقة الفضية' },
        price: 1500,
        subtitle: { en: 'Semi-private yacht & seaside lunch', ar: 'يخت شبه خاص وغداء بحري' }
      },
      {
        name: { en: 'Gold', ar: 'الباقة الذهبية' },
        price: 2300,
        subtitle: { en: 'Private yacht & certified dive guide', ar: 'يخت خاص ومدرب غوص معتمد' },
        featured: true
      },
      {
        name: { en: 'Royal VIP', ar: 'الباقة الملكية' },
        price: 3800,
        subtitle: { en: 'Superyacht charter & private chef', ar: 'يخت فائق الفخامة وطاهٍ خاص' }
      }
    ],
    inclusions: [
      { en: 'Luxury Yacht Charter', ar: 'تأجير يخت فاخر' },
      { en: 'Snorkeling Gear & Instructor', ar: 'معدات الغوص مع مدرب' },
      { en: 'Seafood Lunch Buffet', ar: 'بوفيه غداء مأكولات بحرية' }
    ]
  }
];

export default function AdminDashTour({ onEditTour, tours }) {

  console.log(tours);
  
  // const [tours, setTours] = useState(PLACEHOLDER_TOURS);

  const [selectedTour, setSelectedTour] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { isRtl } = useLanguage();

  const handleOpenModal = (tour) => {
    setSelectedTour(tour);
    setActiveImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedTour(null);
  };

  console.log('selected tour object', selectedTour);
  

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6 mt-12"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="p-2.5 rounded-2xl bg-white/0 border border-forestGreen/20"
          >
            <Compass className="w-6 h-6 text-gold" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {isRtl ? 'إدارة الرحلات السياحية' : 'Tours Management'}
            </h2>
          </div>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour, index) => {
          const title = isRtl ? tour.title.ar : tour.title.en;
          const desc = isRtl ? tour.description.ar : tour.description.en;
          const location = isRtl ? tour.location.ar : tour.location.en;

          return (
            <motion.div 
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between group"
            >
              {/* Card Header Image */}
              <div className="relative h-80 md:h-70 w-full overflow-hidden bg-slate-100">
                <motion.img 
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  src={tour.cover_image} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Clock className="w-3 h-3 text-gold" />
                  <span>{tour.duration_days} {isRtl ? 'أيام' : 'Days'}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{location}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{desc}</p>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleOpenModal(tour)}
                    className="flex-1 py-2 px-3 rounded-xl bg-forestGreen/10 text-forestGreen font-bold text-xs hover:bg-forestGreen hover:text-white transition-all text-center cursor-pointer shadow-xs"
                  >
                    {isRtl ? 'تفاصيل الرحلة' : 'About Tour'}
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => onEditTour(tour)}
                    className="py-2 px-3 rounded-xl bg-gold/20 text-slate-950 font-bold text-xs hover:bg-gold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                    title={isRtl ? 'تعديل الرحلة' : 'Edit Tour'}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* About Tour Modal */}
      <AnimatePresence>

        {selectedTour && (() => {
          const carouselImages = Array.from(
            new Set(
              [
                selectedTour.cover_image,
                ...(Array.isArray(selectedTour.gallery_images) ? selectedTour.gallery_images : []),
              ].filter(Boolean)
            )
        );

          return (
            <div
              onClick={handleCloseModal}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4"
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-white rounded-xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
              >
                {/* Carousel Header (Pinned at top) */}
                <div className="relative h-64 sm:h-65 w-full bg-slate-900 shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      src={carouselImages[activeImageIndex] || selectedTour.cover_image}
                      alt="Tour Gallery Preview"
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 bg-slate-950/60 hover:bg-slate-950 text-white p-2 rounded-full transition-all cursor-pointer shadow-md"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  {/* Thumbnail Selector Bar (Cover + Gallery Images) */}
                  {carouselImages.length > 0 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-4">
                      {carouselImages.map((img, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative w-12 h-10 rounded-lg overflow-hidden border-2 transition-all shadow-md cursor-pointer ${
                            activeImageIndex === idx ? 'border-gold scale-105' : 'border-white/50 opacity-70'
                          }`}
                        >
                          <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Modal Body (Scrolls smoothly in the remaining space) */}
                <div className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
                  {/* Title & Location */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-gold">
                      <MapPin className="w-4 h-4" />
                      <span>{isRtl ? selectedTour.location.ar : selectedTour.location.en}</span>
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900">
                      {isRtl ? selectedTour.title.ar : selectedTour.title.en}
                    </h2>
                  </div>

                  {/* Dates & Duration Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-forestGreen/5 border border-forestGreen/10">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {isRtl ? 'تاريخ البدء' : 'Start Date'}
                      </span>
                      <p className="text-xs font-bold text-slate-900">
                        {new Date(selectedTour.start_date || selectedTour.tour_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {isRtl ? 'تاريخ الانتهاء' : 'End Date'}
                      </span>
                      <p className="text-xs font-bold text-slate-900">
                        {new Date(selectedTour.end_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {isRtl ? 'المدة' : 'Duration'}
                      </span>
                      <p className="text-xs font-bold text-forestGreen">
                        {selectedTour.duration_days} {isRtl ? 'أيام' : 'Days'}
                      </p>
                    </div>
                  </div>

                  {/* 4 Price Tiers Section */}
                  {(selectedTour.early_birds ||
                    selectedTour.late_booking ||
                    selectedTour.family_couples ||
                    selectedTour.individual_room) && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-gold" />
                        <span>{isRtl ? 'فئات الأسعار' : 'Pricing Tiers'}</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Early Birds */}
                        {selectedTour.early_birds && (
                          <div className="p-3.5 rounded-2xl border bg-slate-50/80 text-slate-900 border-slate-200/80 flex flex-col justify-between gap-2.5">
                            <span className="text-xs font-extrabold uppercase tracking-wide text-forestGreen">
                              {isRtl ? 'الحجز المبكر' : 'Early Birds'}
                            </span>
                            <div className="flex flex-wrap items-center gap-2">
                              {selectedTour.early_birds.ngn != null && selectedTour.early_birds.ngn !== '' && (
                                <span dir="ltr" className="text-xs font-black px-2.5 py-1 rounded-lg bg-forestGreen/10 text-forestGreen">
                                  ₦{Number(selectedTour.early_birds.ngn).toLocaleString()}
                                </span>
                              )}
                              {selectedTour.early_birds.sar != null && selectedTour.early_birds.sar !== '' && (
                                <span dir="ltr" className="text-xs font-black px-2.5 py-1 rounded-lg bg-gold/15 text-slate-900">
                                  {Number(selectedTour.early_birds.sar).toLocaleString()} {isRtl ? 'ر.س' : 'SAR'}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Late Booking */}
                        {selectedTour.late_booking && (
                          <div className="p-3.5 rounded-2xl border bg-slate-50/80 text-slate-900 border-slate-200/80 flex flex-col justify-between gap-2.5">
                            <span className="text-xs font-extrabold uppercase tracking-wide text-forestGreen">
                              {isRtl ? 'الحجز المتأخر' : 'Late Booking'}
                            </span>
                            <div className="flex flex-wrap items-center gap-2">
                              {selectedTour.late_booking.ngn != null && selectedTour.late_booking.ngn !== '' && (
                                <span dir="ltr" className="text-xs font-black px-2.5 py-1 rounded-lg bg-forestGreen/10 text-forestGreen">
                                  ₦{Number(selectedTour.late_booking.ngn).toLocaleString()}
                                </span>
                              )}
                              {selectedTour.late_booking.sar != null && selectedTour.late_booking.sar !== '' && (
                                <span dir="ltr" className="text-xs font-black px-2.5 py-1 rounded-lg bg-gold/15 text-slate-900">
                                  {Number(selectedTour.late_booking.sar).toLocaleString()} {isRtl ? 'ر.س' : 'SAR'}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Family / Couples (Featured Card) */}
                        {selectedTour.family_couples && (
                          <div className="p-3.5 rounded-2xl border bg-forestGreen text-white border-gold shadow-md flex flex-col justify-between gap-2.5">
                            <span className="text-xs font-extrabold uppercase tracking-wide text-gold">
                              {isRtl ? 'العائلات والأزواج' : 'Family / Couples'}
                            </span>
                            <div className="flex flex-wrap items-center gap-2">
                              {selectedTour.family_couples.ngn != null && selectedTour.family_couples.ngn !== '' && (
                                <span dir="ltr" className="text-xs font-black px-2.5 py-1 rounded-lg bg-white/15 text-white">
                                  ₦{Number(selectedTour.family_couples.ngn).toLocaleString()}
                                </span>
                              )}
                              {selectedTour.family_couples.sar != null && selectedTour.family_couples.sar !== '' && (
                                <span dir="ltr" className="text-xs font-black px-2.5 py-1 rounded-lg bg-gold/20 text-gold">
                                  {Number(selectedTour.family_couples.sar).toLocaleString()} {isRtl ? 'ر.س' : 'SAR'}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Individual Room */}
                        {selectedTour.individual_room && (
                          <div className="p-3.5 rounded-2xl border bg-slate-50/80 text-slate-900 border-slate-200/80 flex flex-col justify-between gap-2.5">
                            <span className="text-xs font-extrabold uppercase tracking-wide text-forestGreen">
                              {isRtl ? 'غرفة فردية' : 'Individual Room'}
                            </span>
                            <div className="flex flex-wrap items-center gap-2">
                              {selectedTour.individual_room.ngn != null && selectedTour.individual_room.ngn !== '' && (
                                <span dir="ltr" className="text-xs font-black px-2.5 py-1 rounded-lg bg-forestGreen/10 text-forestGreen">
                                  ₦{Number(selectedTour.individual_room.ngn).toLocaleString()}
                                </span>
                              )}
                              {selectedTour.individual_room.sar != null && selectedTour.individual_room.sar !== '' && (
                                <span dir="ltr" className="text-xs font-black px-2.5 py-1 rounded-lg bg-gold/15 text-slate-900">
                                  {Number(selectedTour.individual_room.sar).toLocaleString()} {isRtl ? 'ر.س' : 'SAR'}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {isRtl ? 'وصف الرحلة' : 'Description'}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {isRtl ? selectedTour.description.ar : selectedTour.description.en}
                    </p>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      <span>{isRtl ? 'الخدمات المشمولة' : 'Package Inclusions'}</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedTour.inclusions.map((inc, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-forestGreen/10 text-xs font-medium text-slate-900 border border-forestGreen/20"
                        >
                          ✓ {isRtl ? inc.ar : inc.en}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer (Pinned at bottom) */}
                <div className="p-2 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleCloseModal}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    {isRtl ? 'إغلاق' : 'Close'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => {
                      onEditTour(selectedTour);
                      handleCloseModal();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-forestGreen text-white font-bold text-xs hover:bg-gold hover:text-slate-950 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'تعديل هذه الرحلة' : 'Edit This Tour'}</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          );
        })()}

      </AnimatePresence>
    </motion.div>
  );
}