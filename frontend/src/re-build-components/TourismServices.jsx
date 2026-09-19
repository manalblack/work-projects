import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, Clock, Check, ArrowRight, ArrowLeft, X, Users, Star, Send, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import {useNavigate} from 'react-router-dom';

// Sample Tour Packages Data with Bilingual Support
const TOUR_PACKAGES = [
  {
    id: 'pkg-1',
    title: {
      en: 'Obudu Cloud & Eco Sanctuary Tour',
      ar: 'جولة محمية هضبة أوبودو السحابية'
    },
    category: {
      en: 'Eco & Adventure',
      ar: 'بيئية ومغامرات'
    },
    duration: {
      en: '4 Days / 3 Nights',
      ar: '4 أيام / 3 ليالٍ'
    },
    location: {
      en: 'Cross River, Nigeria',
      ar: 'كروس ريفر، نيجيريا'
    },
    price: '$850',
    priceUnit: {
      en: '/ person',
      ar: '/ للشخص'
    },
    rating: '4.9',
    reviews: 28,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    overview: {
      en: 'Experience the serene highlands of Obudu. Includes private cable car access, cloud canopy walks, and luxury lodge accommodation with full-board dining.',
      ar: 'استمتع بهدوء مرتفعات أوبودو. تشمل الجولة ركوب التلفريك الخاص، والمشي فوق السحاب، والإقامة في منتجع فاخر مع وجبات كاملة.'
    },
    inclusions: {
      en: [
        '3 Nights in Luxury Mountain Lodge',
        'Guided Cable Car & Canopy Walks',
        'All Meals & Executive Transfers',
        'Private Eco Trail Guide'
      ],
      ar: [
        'إقامة 3 ليالٍ في منتجع جبيلي فاخر',
        'جولات التلفريك والمشي السحابي',
        'جميع الوجبات والنقل التنفيذي',
        'مرشد بيئي خاص'
      ]
    }
  },
  {
    id: 'pkg-2',
    title: {
      en: 'Badagry Heritage & Slave Route Expedition',
      ar: 'رحلة استكشاف تراث باداغري والتاريخ'
    },
    category: {
      en: 'Historical & Cultural',
      ar: 'تاريخي وثقافي'
    },
    duration: {
      en: 'Full Day Experience',
      ar: 'تجربة يوم كامل'
    },
    location: {
      en: 'Lagos, Nigeria',
      ar: 'لاغوس، نيجيريا'
    },
    price: '$180',
    priceUnit: {
      en: '/ person',
      ar: '/ للشخص'
    },
    rating: '4.8',
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    overview: {
      en: 'A deep dive into historical heritage. Visit the Mobee Slave Relics Museum, Point of No Return, and experience guided boat cruises across Badagry Creek.',
      ar: 'رحلة عميقة في التراث التاريخي. زيارة المتاحف الأثرية وجولة بالقارب عبر خور باداغري مع مرشد تاريخي.'
    },
    inclusions: {
      en: [
        'Museum & Historical Entry Fees',
        'Private Boat Cruise Access',
        'Traditional Heritage Lunch',
        'Dedicated Cultural Historian'
      ],
      ar: [
        'رسوم دخول المتاحف والمواقع',
        'جولة خاصة بالقارب',
        'غداء تقليدي فاخر',
        'مؤرخ ثقافي مخصص'
      ]
    }
  },
  {
    id: 'pkg-3',
    title: {
      en: 'Yankari Wildlife Safari & Warm Springs',
      ar: 'سفاري يانكاري للحيوانات والينابيع الدافئة'
    },
    category: {
      en: 'Wildlife Safari',
      ar: 'سفاري وحياة برية'
    },
    duration: {
      en: '3 Days / 2 Nights',
      ar: '3 أيام / ليلتان'
    },
    location: {
      en: 'Bauchi, Nigeria',
      ar: 'باوتشي، نيجيريا'
    },
    price: '$620',
    priceUnit: {
      en: '/ person',
      ar: '/ للشخص'
    },
    rating: '4.9',
    reviews: 35,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    overview: {
      en: 'Spot elephants, baboons, and exotic flora across Yankari Reserve. Wind down each evening with a dip in the natural Wikki Warm Springs.',
      ar: 'شاهد الفيلة والحيوانات البرية في محمية يانكاري، واستمتع بالاسترخاء في ينابيع ويكي الطبيعية الدافئة.'
    },
    inclusions: {
      en: [
        'Open-Top Safari Jeep Tours',
        'Resort Cabin Accommodation',
        'Unlimited Warm Springs Access',
        'Park Ranger Escort & Permits'
      ],
      ar: [
        'جولات سفاري بسيارات مكشوفة',
        'إقامة في كابينة المنتجع',
        'دخول غير محدود للينابيع الدافئة',
        'حراسة وتصاريح المحمية'
      ]
    }
  }
];

const SERVICES_SUMMARY = [
  {
    title: {
      en: 'Custom Itinerary Design',
      ar: 'تصميم برامج رحلات مخصصة'
    },
    desc: {
      en: 'Tailor-made itineraries for executive retreats, private groups, and luxury solo travelers.',
      ar: 'جولات مصممة خصيصًا للاجتماعات التنفيذية، المجموعات الخاصة، والرحلات الفاخرة.'
    }
  },
  {
    title: {
      en: 'VIP Airport & Escort Logistics',
      ar: 'خدمات استقبال وإسكورت لكبار الشخصيات'
    },
    desc: {
      en: 'Seamless ground transportation, protocol assistance, and private security detail upon request.',
      ar: 'وسائل نقل بري سلسة، خدمات بروتوكول وحراسة خاصة عند الطلب.'
    }
  },
  {
    title: {
      en: 'Corporate Eco-Retreats',
      ar: 'منتجعات بيئية للشركات'
    },
    desc: {
      en: 'Off-site team retreats focused on wellness, leadership alignment, and immersive natural escapes.',
      ar: 'رحلات عمل جماعية تركز على الصحة النفسية، القيادة والاسترخاء الطبيعي.'
    }
  }
];

export default function TourismServices({ isRtl = false }) {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const langKey = isRtl ? 'ar' : 'en';


  const fadeIn = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } 
    }
};

  const handleOpenModal = (pkg) => {
    setIsSubmitted(false);
    setSelectedPackage(pkg);
  };

  const handleCloseModal = () => {
    setSelectedPackage(null);
    setIsSubmitted(false);
  };

  const handleNavigateToTours = () => {
    navigate('/tours-and-services'); // Update this path to match your router route
  };

  return (
    <section className="w-full bg-black py-12 sm:py-16 lg:py-24 border-t border-neutral-100" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
      {/* Section Header + Redirect Button Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-3xl">
            {/* <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0ea5e9] flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> 
              {isRtl ? 'باقات وخدمات الوجهات' : 'Destination Packages & Services'}
            </span> */}
            <motion.div 
                variants={fadeIn} 
                className="inline-flex items-center gap-2 rounded-full mb-5 bg-forestGreen border border-neutral-200/80 px-3.5 py-1.5 shadow-sm max-w-full">
                <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                </span>
                <span className="text-[11px] sm:text-[12px] font-bold text-white tracking-wide leading-tight truncate sm:whitespace-normal">
                    {isRtl ? 'باقات وخدمات الوجهات' : 'Destination Packages & Services'}
                </span>
            </motion.div>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-gold tracking-tight">
              {isRtl ? 'رحلات استكشافية وسياحة مخصصة' : 'Curated Expeditions & Bespoke Tourism'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white leading-relaxed">
              {isRtl 
                ? 'استكشف باقات جولات مصممة بعناية تجمع بين الثقافة، المنتجعات الفاخرة، وحماية الحياة البرية في جميع أنحاء غرب إفريقيا.'
                : 'Explore carefully crafted tour packages designed around culture, luxury retreats, and wildlife conservation across Western Africa.'
              }
            </p>
          </div>

          {/* Header Redirect Button */}
          <button
            type="button"
            onClick={handleNavigateToTours}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-forestGreen text-white hover:bg-white hover:text-forestGreen font-bold text-xs shadow-md border border-forestGreen transition-all shrink-0 cursor-pointer"
          >
            <span>{isRtl ? 'عرض جميع الجولات والخدمات' : 'Explore All Tours & Services'}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

       

        {/* Value Services Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-gold/60">
          {SERVICES_SUMMARY.map((srv, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="p-2.5 rounded-2xl bg-white border border-neutral-200/80 text-gold shadow-sm shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">{srv.title[langKey]}</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">{srv.desc[langKey]}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tour Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOUR_PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Media Header */}
                <div className="relative h-56 w-full overflow-hidden bg-neutral-100">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title[langKey]}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
                  
                  <span className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-md text-gold text-[11px] font-bold px-3 py-1 rounded-full shadow-sm`}>
                    {pkg.category[langKey]}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xl font-extrabold">{pkg.price} <span className="text-xs font-normal text-neutral-200">{pkg.priceUnit[langKey]}</span></span>
                    <div className="flex items-center gap-1 bg-neutral-900/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{pkg.rating}</span>
                      <span className="text-neutral-400">({pkg.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Package Info */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs font-semibold text-neutral-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      {pkg.duration[langKey]}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      {pkg.location[langKey]}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 line-clamp-1 mb-2">
                    {pkg.title[langKey]}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2 mb-4">
                    {pkg.overview[langKey]}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      {isRtl ? 'محتويات الباقة' : 'Package Inclusions'}
                    </span>
                    {pkg.inclusions[langKey].slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => handleOpenModal(pkg)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-forestGreen hover:bg-white hover:text-forestGreen text-white border border-forestGreen text-xs font-bold transition-all duration-300 ease-in-out shadow-md cursor-pointer"
                >
                  <span>{isRtl ? 'حجز / الاستفسار عن الباقة' : 'Book / Enquire Package'}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global CTA Banner with Redirect Button */}
        <div className="mt-16 p-8 rounded-3xl bg-neutral-50 border border-gold/60 text flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-right">
            <h3 className="text-xl font-bold text-gold">
              {isRtl ? 'هل تريد استكشاف المزيد من الخيارات؟' : 'Looking for More Destinations & Services?'}
            </h3>
            <p className="text-xs text-forestGreen max-w-lg">
              {isRtl 
                ? 'تصفح الكتالوج الكامل لجولاتنا الفاخرة، والخدمات الخاصة، والرحلات الاستكشافية.'
                : 'Browse our full catalog of luxury tour packages, corporate retreats, and bespoke travel services.'
              }
            </p>
          </div>
          
          <button
            type="button"
            onClick={handleNavigateToTours}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-forestGreen text-white hover:bg-white hover:text-forestGreen font-bold text-xs shrink-0 cursor-pointer transition-all duration-300 ease-in-out shadow-md border border-forestGreen"
          >
            <span>{isRtl ? 'الانتقال لصفحة الجولات والخدمات' : 'Go to Tours & Services Page'}</span>
            <ExternalLink className="w-4 h-4 text-gold" />
          </button>
        </div>

      </div>

      {/* Booking / Enquiry Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir={isRtl ? 'rtl' : 'ltr'}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-neutral-100 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0ea5e9] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> 
                  {isRtl ? 'استفسار عن حجز جولة' : 'Tour Booking Enquiry'}
                </span>
                <button
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5">
                <div>
                  <span className="text-xs font-bold text-[#0ea5e9] uppercase">{selectedPackage.category[langKey]}</span>
                  <h3 className="text-xl font-bold text-neutral-900 leading-snug">
                    {selectedPackage.title[langKey]}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">
                    {selectedPackage.duration[langKey]} • {selectedPackage.location[langKey]}
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-8 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto">
                      <Send className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-neutral-900">
                      {isRtl ? 'تم تقديم الطلب بنجاح!' : 'Enquiry Submitted!'}
                    </h4>
                    <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                      {isRtl 
                        ? 'سيتواصل معك مكتب السفر لدينا في غضون 4 ساعات لتأكيد تفاصيل رحلتك وخيارات الدفع.'
                        : 'Our travel desk will contact you within 4 hours to finalize itinerary details and payment options.'
                      }
                    </p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-4">
                    {/* Full inclusions summary */}
                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
                      <span className="text-[11px] font-bold text-neutral-700 uppercase">
                        {isRtl ? 'تشمل الباقة:' : 'Package Includes:'}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedPackage.inclusions[langKey].map((inc, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-xs text-neutral-600 font-medium">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                          {isRtl ? 'عدد الضيوف / المسافرين' : 'Guests / Travelers'}
                        </label>
                        <select className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50">
                          <option>{isRtl ? 'بالغ واحد' : '1 Adult'}</option>
                          <option>{isRtl ? 'بالغان (زوجين)' : '2 Adults (Couple)'}</option>
                          <option>{isRtl ? 'مجموعة صغيرة (3 - 5)' : 'Small Group (3 - 5)'}</option>
                          <option>{isRtl ? 'مجموعة شركات (6+)' : 'Corporate Group (6+)'}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                          {isRtl ? 'التاريخ المتوقع' : 'Estimated Date'}
                        </label>
                        <input 
                          type="date" 
                          required
                          className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                        {isRtl ? 'الاسم الكامل' : 'Full Name'}
                      </label>
                      <input 
                        required
                        type="text" 
                        placeholder={isRtl ? 'مثال: أحمد عبد الله' : 'e.g. Sarah Jenkins'}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                        {isRtl ? 'البريد الإلكتروني' : 'Contact Email'}
                      </label>
                      <input 
                        required
                        type="email" 
                        placeholder="example@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold text-xs transition-all shadow-md mt-2"
                    >
                      {isRtl 
                        ? `إرسال طلب حجز الجولة (${selectedPackage.price})` 
                        : `Submit Tour Reservation Enquiry (${selectedPackage.price})`}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}