import { Link } from 'react-router-dom';
import { Compass, Mail, Phone, MapPin, Globe, ArrowUpRight } from 'lucide-react';

const FOOTER_CONTENT = {
  about: {
    en: 'Curated expeditions, luxury eco-retreats, and bespoke travel management across Western Africa.',
    ar: 'رحلات استكشافية فاخرة، منتجعات بيئية، وخدمات سفر مخصصة في جميع أنحاء غرب إفريقيا.'
  },
  quickLinksTitle: {
    en: 'Quick Links',
    ar: 'روابط سريعة'
  },
  servicesTitle: {
    en: 'Our Services',
    ar: 'خدماتنا'
  },
  contactTitle: {
    en: 'Contact Us',
    ar: 'تواصل معنا'
  },
  copyright: {
    en: 'All rights reserved.',
    ar: 'جميع الحقوق محفوظة.'
  }
};

const NAV_LINKS = [
  { path: '/', label: { en: 'Home', ar: 'الرئيسية' } },
  { path: '/tours-and-services', label: { en: 'Tours & Services', ar: 'الجولات والخدمات' } },
  { path: '/founder', label: { en: 'About Founder', ar: 'عن المؤسس' } },
  { path: '/contact', label: { en: 'Contact', ar: 'اتصل بنا' } },
];

const SERVICES_LINKS = [
  { label: { en: 'Eco & Adventure Tours', ar: 'رحلات بيئية ومغامرات' } },
  { label: { en: 'Historical Expeditions', ar: 'جولات تاريخية وثقافية' } },
  { label: { en: 'VIP Logistics & Escort', ar: 'خدمات الاستقبال وكبار الشخصيات' } },
  { label: { en: 'Corporate Eco-Retreats', ar: 'منتجعات الشركات البيئية' } },
];

export default function Footer({ isRtl = false, onToggleLanguage }) {
  const langKey = isRtl ? 'ar' : 'en';

  return (
    <footer 
      className="w-full bg-white/90 text-neutral-400 border-t border-neutral-800/80 pt-16 pb-12"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800/80">
          
          {/* Brand Info (2 Columns on Large Screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-white font-extrabold text-xl tracking-tight">
              <div className="p-2 rounded-xl bg-[#0ea5e9] text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span>Destination Tour</span>
            </Link>
            
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              {FOOTER_CONTENT.about[langKey]}
            </p>

            {/* Language Switcher Button in Footer */}
            {onToggleLanguage && (
              <button
                type="button"
                onClick={onToggleLanguage}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-300 hover:text-white hover:border-neutral-700 transition-all cursor-pointer mt-2"
              >
                <Globe className="w-4 h-4 text-[#0ea5e9]" />
                <span>{isRtl ? 'English' : 'العربية'}</span>
              </button>
            )}
          </div>

          {/* Column 1: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {FOOTER_CONTENT.quickLinksTitle[langKey]}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {NAV_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    className="hover:text-[#0ea5e9] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label[langKey]}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {FOOTER_CONTENT.servicesTitle[langKey]}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {SERVICES_LINKS.map((item, idx) => (
                <li key={idx}>
                  <span className="hover:text-neutral-200 transition-colors">
                    {item.label[langKey]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {FOOTER_CONTENT.contactTitle[langKey]}
            </h4>
            <ul className="space-y-3 text-xs font-medium">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#0ea5e9] shrink-0" />
                <span>Lagos & Cross River, Nigeria</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0ea5e9] shrink-0" />
                <span>+234 (0) 800 123 4567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0ea5e9] shrink-0" />
                <span>concierge@destinationtour.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-500">
          <p>© {new Date().getFullYear()} Destination Tour. {FOOTER_CONTENT.copyright[langKey]}</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-neutral-300 transition-colors">
              {isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </a>
            <a href="#terms" className="hover:text-neutral-300 transition-colors">
              {isRtl ? 'الشروط والأحكام' : 'Terms of Service'}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}