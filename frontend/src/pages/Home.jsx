import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  User,
  Compass,
  Gem,
  ArrowRight,
  Calendar,
  CheckCircle,
  Award,
  Headphones,
  Hotel,
  ShieldCheck,
  MapPin,
  Trees,
  Leaf,
  Share2,
  Lock,
  Route,
  Building2,
  Plane,
  ChevronRight,
  Star,
  Check
} from 'lucide-react';
import Navbar from '../re-build-components/Navbar';
import Hero from '../re-build-components/Hero';
import FeaturedEvents from '../re-build-components/FeaturedEvents';
import TourismServices from '../re-build-components/TourismServices';
import FounderVisionSection from '../re-build-components/FounderVisionSection';
import Layout from '../layouts/Layout';

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
};

const hoverCard = {
  rest: { y: 0, scale: 1, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)" },
  hover: { 
    y: -4, 
    scale: 1.01, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)",
    transition: { type: "spring", stiffness: 350, damping: 25 }
  }
};

export default function Home({ lang = 'en' }) {

  const [currentLang, setCurrentLang] = useState(lang);
  
  const isRtl = currentLang === 'ar';

  const toggleLanguage = (newLang) => {
    setCurrentLang(newLang);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    'name': 'TR Travel & Events',
    'description': isRtl 
      ? 'رحلات فاخرة ومؤتمرات رفيعة المستوى في نيجيريا وأفريقيا'
      : 'Bespoke luxury travel, sovereign retreats, and monumental summits across Nigeria and Africa.',
    'url': 'https://trtravelevents.com',
    'areaServed': 'Worldwide',
    'inLanguage': currentLang
  };

  return (
    <>

    {/* the element below is for SEO */}
      <Helmet>
        <html lang={currentLang} dir={isRtl ? 'rtl' : 'ltr'} />
        <title>
          {isRtl 
            ? 'تي آر للسياحة والفعاليات | رحلات فاخرة ومؤتمرات عالمية' 
            : 'Troveista Travel & Events | Journeys & World-Stage Summits'}
        </title>
        <meta 
          name="description" 
          content={
            isRtl 
              ? 'نقدم أروع الرحلات الفاخرة والمؤتمرات الدولية في نيجيريا وأفريقيا بأعلى مستويات الخصوصية والاحترافية.' 
              : 'Pioneering travel, sovereign retreats, and monumental summits across Nigeria, and elite hubs with unrivaled discretion.'
          } 
        />
        <link rel="canonical" href={`https://trtravelevents.com/${currentLang}`} />
      </Helmet>

      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      <Layout activeRoute='/' isRtl={isRtl} onToggleLanguage={toggleLanguage}>
        <div className="flex flex-col mt-20 lg:mt-0 w-full">
            
          {/* 2. Hero Section */}
          <Hero isRtl={isRtl} fadeIn={fadeIn} staggerContainer={staggerContainer} />

          <TourismServices isRtl={isRtl} />

          <FeaturedEvents isRtl={isRtl} />
          
          <FounderVisionSection isRtl={isRtl} />

        

          </div>
      </Layout>
    </>
  );
}