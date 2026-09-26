import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, User, Menu, X } from 'lucide-react';
import {Link, NavLink} from 'react-router-dom';
import { useLanguage } from '../hooks/LanguageContext';


/*  TODOS:
  The navbar needs to show a light background color on the based on the current page
  The mobile Menu is not functional and the ui needs some work


  الرئيسية 
  المؤسس
  السياحة والخدمات
  الفعاليات
  الأخبار والرؤى
  احجز الآن
*/


/*
  Working on this today: make the language state managed using context and localstorage
  Starting with the home page
*/


export default function Navbar({ toggleLanguage, isRtl }) {
  const [isOpen, setIsOpen] = useState(false);

  // const { isRtl } = useLanguage();

  const navItems = [
    { path: '/', label: { en: 'Home', ar: 'الرئيسية' } },
    { path: '/tours-and-services', label: { en: 'Tours & Services', ar: 'الرحلات والخدمات' } },
    { path: '/founder', label: { en: 'Founder', ar: 'المؤسس' } },
    { path: '/contact', label: { en: 'Contact', ar: 'اتصل بنا' } },
    { path: '/events', label: { en: 'Events', ar: 'الفعاليات' } },
  ];



  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl shadow-[0_1px_10px_rgba(0,0,0,0.03)]"
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
        {/* <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          <Link to="/">
            {isRtl ? 'الرئيسية' : 'Home'}
          </Link>
          
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

        </nav> */}

        <nav className="hidden md:flex items-center gap-5 p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-2xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-forestGreen/90 text-white shadow-sm' // Active background color (gray-900)
                    : 'text-slate-800 hover:bg-slate-100/40 hover:text-slate-900' // Inactive state
                }`
              }
            >
              {item.label[isRtl ? 'ar' : 'en']}
            </NavLink>
          ))}
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
            <Globe className="w-4 h-4 text-gold" />
            <span className={!isRtl ? "font-bold text-neutral-900" : "text-neutral-500 hover:text-neutral-800 transition-colors font-medium"}>EN</span>
            <span className="text-neutral-300">|</span>
            <span className={isRtl ? "font-bold text-neutral-900" : "text-neutral-500 hover:text-neutral-800 transition-colors font-medium"}>العربية</span>
          </motion.button>

          {/* thi should redirect to the contact page */}
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            href="#" 
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-forestGreen text-white font-semibold text-[14px] hover:bg-white hover:text-forestGreen shadow-md transition-all duration-300 ease-in-out border border-forestGreen"
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
            className="lg:hidden p-2 rounded-full text-forestGreen hover:bg-gold/20 focus:outline-none transition-colors duration-200 ease-in-out"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Animated Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 h-screen top-50 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
                aria-hidden="true"
              />

              {/* Animated Dropdown Panel */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="relative z-50 lg:hidden overflow-hidden bg-white/95 px-5 py-4 backdrop-blur-xl shadow-lg border-b border-neutral-100"
              >
                <nav className="flex flex-col gap-3">
                  <Link 
                    to="/" 
                    onClick={() => setIsOpen(false)}
                    className="text-neutral-600 hover:text-neutral-950 font-medium px-4 py-2 text-[15px] transition-colors"
                  >
                    {isRtl ? 'الرئيسية' : 'Home'}
                  </Link>
                  <Link
                    to="/founder"
                    onClick={() => setIsOpen(false)}
                    className="text-neutral-600 hover:text-neutral-950 font-medium px-4 py-2 text-[15px] transition-colors"
                  >
                    {isRtl ? 'المؤسس' : 'Founder'}
                  </Link>
                  <Link 
                    to="/tours-and-services" 
                    onClick={() => setIsOpen(false)}
                    className="text-neutral-600 hover:text-neutral-950 font-medium px-4 py-2 text-[15px] transition-colors"
                  >
                    {isRtl ? 'السياحة والخدمات' : 'Tourism & Services'}
                  </Link>
                  <Link
                    to="/events"
                    onClick={() => setIsOpen(false)}
                    className="text-neutral-600 hover:text-neutral-950 font-medium px-4 py-2 text-[15px] transition-colors"
                  >
                    {isRtl ? 'الفعاليات' : 'Events'}
                  </Link>
                  <Link 
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="text-neutral-600 hover:text-neutral-950 font-medium px-4 py-2 text-[15px] transition-colors"
                  >
                    {isRtl ? 'التواصل' : 'Contact'}
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="mt-2 md:hidden flex items-center justify-center w-full py-3 rounded-full bg-forestGreen text-white font-semibold text-[15px] border border-forestGreen hover:bg-white hover:text-forestGreen transition-all shadow-[0_4px_14px_rgba(14,165,233,0.3)]"
                  >
                    {isRtl ? 'احجز الآن' : 'Inquire Now'}
                  </Link>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
    </motion.header>
  );
}