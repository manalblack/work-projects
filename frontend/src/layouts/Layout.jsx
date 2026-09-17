import { useState } from 'react';
import { Compass, Globe, Menu, X } from 'lucide-react';
// import Footer from './Footer';
import Navbar from '../re-build-components/Navbar';
import Footer from '../re-build-components/Footer'
import { useLanguage } from '../hooks/useLanguage';

export default function Layout({ 
  children, 
  isRtl: externalIsRtl, 
  onToggleLanguage: externalToggleLanguage,
  activeRoute = '/' 
}) {
  // Internal fallback state if language state isn't managed by a global parent
  const [internalIsRtl, setInternalIsRtl] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use props if provided, otherwise fall back to internal state
  const isRtl = externalIsRtl !== undefined ? externalIsRtl : internalIsRtl;
  const toggleLanguage = externalToggleLanguage || (() => setInternalIsRtl((prev) => !prev));

  const langKey = isRtl ? 'ar' : 'en';

  return (
    <div 
      className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-[#0ea5e9] selection:text-white"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
        <Navbar isRtl={isRtl} toggleLanguage={toggleLanguage} />

      {/* Main Wrapped Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Global Footer */}
      <Footer isRtl={isRtl} onToggleLanguage={toggleLanguage} />
    </div>
  );
}