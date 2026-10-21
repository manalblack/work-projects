import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, Outlet, NavLink } from 'react-router-dom';
import { 
  House, 
  CalendarPlus2, 
  Ticket, 
  Tickets, 
  FilePen, 
  Search, 
  PanelLeftClose, 
  PanelLeft, 
  ExternalLink, 
  Menu, 
  X,
  Sparkles,
  Globe,
  Plane
} from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useLanguage } from '../../src/hooks/LanguageContext'; // Update to your hook's path

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Pull language state & toggle function from your hook
  const { lang, isRtl, toggleLanguage } = useLanguage();

  // Keep document direction synced with hook state
  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = isRtl ? 'ar' : 'en';
  }, [isRtl]);

  // UI Translations Dictionary
  const t = {
    brandName: isRtl ? 'تروفيستا' : 'TROVEISTA',
    dashTitle: isRtl ? 'لوحة المشرف' : 'Admin Dashboard',
    mainSite: isRtl ? 'الموقع الرئيسي' : 'Live Site',
    version: isRtl ? 'لوحة التحكم v2.0' : 'Sovereign Admin v2.0',
    nav: {
      main: isRtl ? 'الرئيسية' : 'Main Area',
      addEvents: isRtl ? 'إضافة فعالية' : 'Add Event',
      createTicket: isRtl ? 'إنشاء تذكرة' : 'Create Ticket',
      bulkTickets: isRtl ? 'تذاكر متعددة' : 'Bulk Tickets',
      editEvent: isRtl ? 'تعديل فعالية' : 'Edit Event',
      findTicket: isRtl ? 'البحث عن تذكرة' : 'Find Ticket',
      tours: isRtl ? 'اضف جولة سياحية' : 'Add Tourist Tour',
    }
  };

  const tabs = [
    { to: 'main', icon: House, label: t.nav.main },
    { to: 'add-events', icon: CalendarPlus2, label: t.nav.addEvents },
    { to: 'create-ticket', icon: Ticket, label: t.nav.createTicket },
    { to: 'create-tickets', icon: Tickets, label: t.nav.bulkTickets },
    { to: 'edit-event', icon: FilePen, label: t.nav.editEvent },
    { to: 'find-ticket', icon: Search, label: t.nav.findTicket },
    {to: 'add-tours', icon: Plane, label: t.nav.tours}
  ];

  // Responsive Motion Variants (Accounting for LTR / RTL slide directions)
  const sidebarVariants = {
    open: { 
      x: 0,
      width: isMobile ? "280px" : "240px",
      transition: { type: "spring", stiffness: 300, damping: 28 }
    },
    closed: { 
      x: isMobile ? (isRtl ? "100%" : "-100%") : 0,
      width: isMobile ? "280px" : "80px",
      transition: { type: "spring", stiffness: 300, damping: 28 }
    }
  };

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'} 
      className={`bg-slate-900 text-slate-100 h-screen w-full flex overflow-hidden ${isRtl ? 'font-arabic' : 'font-sans'} selection:bg-gold selection:text-slate-950`}
    >

      {/* ---------------------------------------------------- */}
      {/* MOBILE BACKDROP OVERLAY                              */}
      {/* ---------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------- */}
      {/* SOVEREIGN SIDEBAR NAVIGATION                         */}
      {/* ---------------------------------------------------- */}
      <motion.aside 
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`fixed md:relative z-[80] top-0 ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} h-full bg-slate-950 border-gold/20 shadow-2xl flex flex-col shrink-0 overflow-hidden`}
      >
        {/* Sidebar Header / Logo */}
        <div className="relative h-20 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-white border border-gold/30 flex items-center justify-center shrink-0 shadow-md">
              {/* <Sparkles className="w-5 h-5 text-gold" /> */}
              <img src="/troveista-logo-cropped.png" alt="" />
            </div>
            <span className={`font-extrabold text-base tracking-wider text-white transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
              {t.brandName}
            </span>
          </div>

          {/* Mobile Close Button */}
          {isMobile && (
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Tab Links */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {tabs.map(({ to, icon: Icon, label }) => (
            <NavLink 
              key={to} 
              to={to} 
              onClick={() => isMobile && setIsOpen(false)}
              className={({ isActive }) => 
                `sidebar-link-item group relative flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-bold text-xs tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-forestGreen text-white border border-gold/40 shadow-lg shadow-forestGreen/20' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-white/5'
                }`
              }
              data-tooltip-id="sidebar-tooltip"
              data-tooltip-content={!isOpen && !isMobile ? label : ''}
            >
              <Icon className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
              
              <span className={`whitespace-nowrap transition-all duration-200 ${isOpen || isMobile ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
                {label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer Indicator */}
        <div className="p-4 border-t border-white/10 text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center justify-center">
          <span className={`${isOpen || isMobile ? 'block' : 'hidden md:hidden'}`}>
            {t.version}
          </span>
        </div>
      </motion.aside>

      {/* ---------------------------------------------------- */}
      {/* MAIN CONTENT WRAPPER & TOP NAVBAR                    */}
      {/* ---------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-slate-900">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-4 md:px-6 py-3.5 flex items-center justify-between shadow-md shrink-0">
          
          <div className="flex items-center gap-4">
            {/* Desktop Sidebar Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="hidden md:flex p-2 rounded-xl bg-white border-white/10 text-gold hover:text-gold hover:bg-white/95 transition-all cursor-pointer"
              title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {isOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
            </button>

            {/* Mobile Sidebar Trigger */}
            <button 
              onClick={() => setIsOpen(true)}
              className="flex md:hidden p-2 rounded-xl bg-forestGreen text-white border border-forestGreen hover:bg-white hover:text-forestGreen transition-all cursor-pointer shadow-md duration-300 ease-in-out"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Live Indicator */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                {t.dashTitle}
              </span>
            </div>
          </div>

          {/* Action Area: Language Switcher & Live Site Link */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Toggle Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gold/30 text-slate-950 hover:bg-white/90 hover:text-slate-950 text-xs font-bold transition-all duration-300 shadow-md cursor-pointer active:scale-95"
            >
              <Globe className="w-4 h-4 text-gold group-hover:text-slate-950 shrink-0" />
              <span>{isRtl ? 'English' : 'العربية'}</span>
            </button>

            {/* Live Site External Link */}
            <Link 
              to="/" 
              target="_blank" 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-forestGreen text-white border border-forestGreen hover:bg-white hover:text-forestGreen font-bold text-xs transition-all duration-300 shadow-md active:scale-95"
            >
              <span>{t.mainSite}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>

        </header>

        {/* Dynamic Page Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-900">
          <Outlet context={{ isRtl, lang }} />
        </main>
      </div>

      {/* Tooltip for Collapsed Sidebar Icons */}
      <Tooltip 
        id="sidebar-tooltip" 
        place={isRtl ? 'left' : 'right'}
        className="z-[99] !bg-slate-950 !border !border-gold/30 !text-white !font-bold !text-xs !rounded-lg !px-3 !py-1.5 shadow-xl"
      />
    </div>
  );
}