import { useNavigate } from 'react-router-dom'; // Use 'next/navigation' if using Next.js
import { motion } from 'framer-motion';
import { UserCheck, ArrowRight, ArrowLeft, Quote, Compass, Sparkles } from 'lucide-react';

const FOUNDER_DATA = {
  name: {
    en: 'John Doe',
    ar: 'جون دو'
  },
  role: {
    en: 'Founder & Managing Director',
    ar: 'المؤسس والمدير التنفيذي'
  },
  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  quote: {
    en: 'We believe travel should be more than just visiting a place—it should transform how you see the world while preserving the communities and nature that make it extraordinary.',
    ar: 'نؤمن بأن السفر يجب أن يكون أكثر من مجرد زيارة مكان—بل ينبغي أن يغير طريقة رؤيتك للعالم مع الحفاظ على المجتمعات والطبيعة التي تجعله استثنائياً.'
  },
  bioSummary: {
    en: 'Founded with a passion for sustainable eco-tourism and cultural preservation, our mission is to deliver authentic, high-end travel experiences that leave a lasting positive impact across West Africa.',
    ar: 'تأسست الشركة بشغف لسياحة بيئية مستدامة وحفظ التراث الثقافي، ومهمتنا هي تقديم تجارب سفر فاخرة وأصيلة تترك أثراً إيجابياً مستداماً في جميع أنحاء غرب إفريقيا.'
  }
};

export default function FounderVisionSection({ isRtl = false, founderPageRoute = '/founder' }) {
  const navigate = useNavigate();
  const langKey = isRtl ? 'ar' : 'en';

  const handleNavigateToFounder = () => {
    navigate(founderPageRoute);
  };

  return (
    <section 
      className="w-full bg-forestGreen text-white py-12 sm:py-16 lg:py-24 overflow-hidden border-t border-forestGreen/30" 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Top Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-1.5 mb-2">
            <Compass className="w-4 h-4 text-gold" />
            {isRtl ? 'قيادتنا ورؤيتنا' : 'Our Leadership & Vision'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gold leading-tight">
            {isRtl 
              ? 'تعرف على مؤسسنا والرؤية الكامنة وراء رحلتنا' 
              : 'Meet Our Founder & The Vision Behind Our Journey'
            }
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
            {isRtl 
              ? 'نحن مدفوعون بالالتزام بالتميز، وحفظ الثقافة، وإنشاء تجارب سفر لا تُنسى في جميع أنحاء المنطقة.'
              : 'Driven by a commitment to excellence, cultural preservation, and creating unforgettable travel experiences across the region.'
            }
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Founder Image Card */}
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Background Glow */}
              {/* <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0ea5e9] to-emerald-500 rounded-3xl blur-md opacity-30" /> */}

              <div className="relative rounded-xl overflow-hidden border border-gold/80 bg-neutral-950 aspect-[4/5] shadow-2xl">
                <img
                  src={FOUNDER_DATA.image}
                  alt={FOUNDER_DATA.name[langKey]}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800">
                  <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider mb-1">
                    <UserCheck className="w-4 h-4 text-gold" />
                    <span>{FOUNDER_DATA.role[langKey]}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {FOUNDER_DATA.name[langKey]}
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details & Quote Column */}
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-white text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{isRtl ? 'رسالة المؤسس' : "Founder's Message"}</span>
            </div>

            {/* Founder Quote Card */}
            <div className="p-6 rounded-2xl bg-gold/30 border border-gold/60 relative">
              <Quote className="w-8 h-8 text-forestGreen absolute top-4 right-4" />
              <p className="text-sm sm:text-base text-neutral-200 italic leading-relaxed relative z-10">
                "{FOUNDER_DATA.quote[langKey]}"
              </p>
            </div>

            {/* Mission Overview */}
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              {FOUNDER_DATA.bioSummary[langKey]}
            </p>

            {/* Redirection Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNavigateToFounder}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-forestGreen font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer group"
              >
                <span>
                  {isRtl ? 'اقرأ القصة الكاملة للمؤسس' : 'Read Full Founder Story'}
                </span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4 text-gold group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}