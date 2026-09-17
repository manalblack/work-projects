import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, User, Menu, X } from 'lucide-react';
import {Link} from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

export default function Navbar({ toggleLanguage }) {
  const [isOpen, setIsOpen] = useState(false);

  const { isRtl } = useLanguage();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-200/80 shadow-[0_1px_10px_rgba(0,0,0,0.03)]"
    >
      <div className="h-20 max-w-7xl mx-auto px-5 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center" aria-label="Troviesta Tours & Events Homepage">
            <img 
              src="/troveista-logo-cropped.png" 
              alt="Troveista Tours & Events Logo" 
              className="h-10 w-auto object-contain"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          <a href="#" aria-current="page" className="transition-colors bg-neutral-100 text-neutral-950 font-bold rounded-full px-4 py-2 text-[14px]">
            {isRtl ? 'الرئيسية' : 'Home'}
          </a>
          <a href="#" className="text-neutral-600 hover:text-neutral-950 font-medium text-[14px] transition-colors">
            {isRtl ? 'المؤسس' : 'Founder'}
          </a>
         <Link to="/tours-and-services">
           <span className="text-neutral-600 hover:text-neutral-950 font-medium text-[14px] transition-colors">
             {isRtl ? 'السياحة والخدمات' : 'Tourism & Services'}
           </span>
         </Link>
          <a href="#" className="text-neutral-600 hover:text-neutral-950 font-medium text-[14px] transition-colors">
            {isRtl ? 'الفعاليات' : 'Events'}
          </a>
          <a href="#" className="text-neutral-600 hover:text-neutral-950 font-medium text-[14px] transition-colors">
            {isRtl ? 'الأخبار والرؤى' : 'News & Insights'}
          </a>
        </nav>

        {/* Right Action Items */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            type="button" 
            onClick={() => toggleLanguage(isRtl ? 'en' : 'ar')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-800 text-[12px] font-semibold transition-all shadow-sm cursor-pointer" 
            title="Switch Language"
          >
            <Globe className="w-4 h-4 text-neutral-500" />
            <span className={!isRtl ? "font-bold text-neutral-900" : "text-neutral-500 hover:text-neutral-800 transition-colors font-medium"}>EN</span>
            <span className="text-neutral-300">|</span>
            <span className={isRtl ? "font-bold text-neutral-900" : "text-neutral-500 hover:text-neutral-800 transition-colors font-medium"}>العربية</span>
          </motion.button>

          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            href="#" 
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#0ea5e9] text-white font-semibold text-[14px] hover:bg-[#0284c7] transition-all shadow-[0_4px_14px_rgba(14,165,233,0.3)]"
          >
            {isRtl ? 'احجز الآن' : 'Inquire Now'}
          </motion.a>
{/* 
          <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-sm">
            <User className="w-4 h-4" />
          </div> */}

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-full text-neutral-700 hover:bg-neutral-100 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white/95 border-t border-neutral-100 px-5 py-4 shadow-lg"
          >
            <nav className="flex flex-col gap-3">
              <a 
                href="#" 
                onClick={() => setIsOpen(false)}
                className="bg-neutral-100 text-neutral-950 font-bold rounded-xl px-4 py-2.5 text-[15px] transition-colors"
              >
                {isRtl ? 'الرئيسية' : 'Home'}
              </a>
              <a 
                href="#" 
                onClick={() => setIsOpen(false)}
                className="text-neutral-600 hover:text-neutral-950 font-medium px-4 py-2 text-[15px] transition-colors"
              >
                {isRtl ? 'المؤسس' : 'Founder'}
              </a>
              <Link to="/tours-and-services" onClick={() => setIsOpen(false)}>
                <span className="text-neutral-600 hover:text-neutral-950 font-medium text-[14px] transition-colors">
                  {isRtl ? 'السياحة والخدمات' : 'Tourism & Services'}
                </span>
              </Link>
              <a 
                href="#" 
                onClick={() => setIsOpen(false)}
                className="text-neutral-600 hover:text-neutral-950 font-medium px-4 py-2 text-[15px] transition-colors"
              >
                {isRtl ? 'الفعاليات' : 'Events'}
              </a>
              <a 
                href="#" 
                onClick={() => setIsOpen(false)}
                className="text-neutral-600 hover:text-neutral-950 font-medium px-4 py-2 text-[15px] transition-colors"
              >
                {isRtl ? 'الأخبار والرؤى' : 'News & Insights'}
              </a>

              <a 
                href="#" 
                onClick={() => setIsOpen(false)}
                className="mt-2 md:hidden flex items-center justify-center w-full py-3 rounded-full bg-[#0ea5e9] text-white font-semibold text-[15px] hover:bg-[#0284c7] transition-all shadow-[0_4px_14px_rgba(14,165,233,0.3)]"
              >
                {isRtl ? 'احجز الآن' : 'Inquire Now'}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}