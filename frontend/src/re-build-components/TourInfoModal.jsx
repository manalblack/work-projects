import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  X, MapPin, Calendar, CheckCircle2, 
  ChevronLeft, ChevronRight, SaudiRiyal 
} from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa6";
import PriceOption from './PricingOption';

// const testTourImages = [
//   {
//     url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
//     caption: "Lekki Canopy Walkway & Nature Reserve"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
//     caption: "Coastal Beach Resort View"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
//     caption: "Mountain Trail & Valley Viewpoint"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
//     caption: "Safari Tour & Wildlife Excursion"
//   }
// ];


// Inside your main component:

export default function TourInfoModal({heroTour, isModalOpen, setIsModalOpen, isRtl}) {

    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const testTourImages = [
        {
        url: "/yankari-room.png",
        caption: isRtl ? 'رؤية وحيد القرن في المحمية' : 'Rhino sighting',
        },
        {
        url: "/rhino.png",
        caption: isRtl ? 'رؤية وحيد القرن في المحمية' : 'Rhino sighting',
        },
        {
            url: "safari-car.png",
            caption: isRtl ? 'جولة سفاري في يانكاري' : 'Safari tour inside Yankari',
        },
        {
            url: "wiki-spring.png",
            caption: isRtl ? 'ينابيع ويكي الحارة' : 'Wiki hot springs',
        },
        {
            url: "yankari-huts.png",
            caption: isRtl ? 'اكواخ الزوار' : 'Visitors huts',
        }
    ]

    console.log(heroTour);
    

    // Determine image list (checks heroTour.gallery, falls back to testTourImages or single heroTour.image)
    const tourImages = heroTour?.gallery?.length 
    ? heroTour.gallery 
    : testTourImages;

    // Reset active photo when modal opens
    useEffect(() => {
    if (isModalOpen) setCurrentImgIndex(0);
    }, [isModalOpen]);

    const nextImage = () => {
        setCurrentImgIndex((prev) => (prev === tourImages.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setCurrentImgIndex((prev) => (prev === 0 ? tourImages.length - 1 : prev - 1));
    };

    // Change this array to a more appropriate name
    

    // Swiping physics for touch devices
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

    return (
    <AnimatePresence>
        {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 text-neutral-900">
            {/* Dark Backdrop Overlay */}
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            aria-hidden="true"
            />

            {/* Pop-Out Modal Card */}
            <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]"
            >
            {/* Header Image Catalogue Gallery inside Modal */}
            <div className="relative h-55 md:h-85 bg-neutral-700 flex-shrink-0 select-none overflow-hidden group">
                
                {/* Swipeable & Animated Main Image */}
                <AnimatePresence mode="wait">
                <motion.img
                    key={currentImgIndex}
                    src={typeof tourImages[currentImgIndex] === 'string' ? tourImages[currentImgIndex] : tourImages[currentImgIndex].url}
                    alt={heroTour.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.85 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                        nextImage();
                    } else if (swipe > swipeConfidenceThreshold) {
                        prevImage();
                    }
                    }}
                    className="md:w-full w-full h-full object-contain md:object-cover cursor-grab active:cursor-grabbing"
                />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Close Button */}
                <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all z-30"
                >
                <X className="w-5 h-5" />
                </button>

                {/* Desktop Navigation Arrows */}
                {tourImages.length > 1 && (
                <>
                    <button
                    onClick={prevImage}
                    className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/80 text-white backdrop-blur-md transition-all z-20 opacity-0 group-hover:opacity-100"
                    >
                    <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                    onClick={nextImage}
                    className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition-all z-20 opacity-0 group-hover:opacity-100"
                    >
                    <ChevronRight className="w-5 h-5" />
                    </button>
                </>
                )}

                {/* Title & Location Overlay */}
                <div className="absolute bottom-14 left-6 right-6 text-white z-10 pointer-events-none">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-forestGreen" />
                    {heroTour.location && <span>{heroTour.location}</span>}
                </div>
                <h3 className="md:text-2xl text-md font-extrabold tracking-tight">
                    {heroTour.title}
                </h3>
                </div>

                {/* Catalogue Thumbnail Strip at Bottom of Header */}
                {tourImages.length > 1 && (
                <div className="bg-amber-00 absolute bottom-3 inset-x-6 z-20 flex items-center justify-between gap-2">
                    <div className="bg-amber-00 w-full flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                    {tourImages.map((img, idx) => {
                        const imgUrl = typeof img === 'string' ? img : img.url;
                        return (
                        <button
                            key={idx}
                            onClick={() => setCurrentImgIndex(idx)}
                            className={`relative flex-shrink-0 md:w-9 md:h-9 w-7 h-7 rounded-lg overflow-hidden border-2 transition-all ${
                            idx === currentImgIndex
                                ? 'border-emerald-400 scale-105 opacity-100'
                                : 'border-transparent opacity-50 hover:opacity-100'
                            }`}
                        >
                            <img
                            src={imgUrl}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                            />
                        </button>
                        );
                    })}
                    </div>

                    {/* Counter Pill */}
                    <span className="text-[10px] font-bold text-neutral-200 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md flex-shrink-0">
                    {currentImgIndex + 1} / {tourImages.length}
                    </span>
                </div>
                )}
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {/* Tour Start/End Date & Pricing Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">

                <div className="flex justify-center gap-3">
                    <div className="p-2.5 rounded-xl bg-forestGreen/0 text-forestGreen">
                    <Calendar className="w-5 h-5 text-gold bg" />
                    </div>
                    <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        {isRtl ? 'تاريخ البداية والنهاية' : 'Start & End Date'}
                    </p>
                    <p className="text-xs font-bold text-neutral-800">
                        {heroTour.startDate} – {heroTour.endDate}
                    </p>
                    </div>
                </div>

                {/* pricing section */}
                <div className="bg-amber-00 flex items-center justify sm:jus border-t sm:border-t-0 sm:border-l border-neutral-200/80 pt-3 sm:pt-0 sm:pl-4">

                    <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        {isRtl ? 'التكلفة الإجمالية' : 'Total Price'}
                    </p>
                    
                    <div className='flex flex-col gap-2 mt-1 w-[200px] bg-amber-00'>
                        <p>{isRtl ? 'الحجز المسبق للفرد' : 'Early birds'}</p>
                        
                    <div className='flex flex-row gap-2'>
                        <div>
                            <PriceOption 
                            tourName={heroTour.title}
                            price={`₦${heroTour.earlyPricingN} -- SAR${heroTour.earlyPricingR}`}
                            packageType={isRtl? 'الحجز المسبق للفرد' : 'Early birds'}
                            currency='$' />
                        </div>
                        <span className="text- font-extrabold text-forestGreen">
                            ₦{heroTour.earlyPricingN}
                        </span>
                            ---
                        {/* <span className="flex text- font-extrabold text-forestGreen"><SaudiRiyal className='size-4'/>{heroTour.earlyPricingR}</span> */}
                        {isRtl ? <span className="flex text- font-extrabold text-forestGreen">{heroTour.earlyPricingR}<SaudiRiyal className='size-4'/></span> : <span className="flex text- font-extrabold text-forestGreen"><SaudiRiyal className='size-4'/>{heroTour.latePricingR}</span>}
                    </div>
                    </div>

                    <div className='flex flex-col gap-2 mt-1'>
                        <p>{isRtl ? 'الحجز المتأخر للفرد من 10 نوفمبر' : 'Late booking from 10th NOV'}</p>
                        {/* <p className="text- font-extrabold text-forestGreen">
                            ₦{heroTour.latePricingN} --- ${heroTour.latePricingR}
                        </p> */}
                        <div className='flex flex-row gap-2'>
                                <div>
                                    <PriceOption 
                                    tourName={heroTour.title}
                                    price={`₦${heroTour.latePricingN} -- SAR${heroTour.latePricingR}`}
                                    packageType={isRtl? 'الحجز المتأخر للفرد' : 'Early birds'}
                                    currency='$' />
                                </div>
                            <span className="text- font-extrabold text-forestGreen">
                                ₦{heroTour.latePricingN}
                            </span>
                                ---
                            {isRtl ? <span className="flex text- font-extrabold text-forestGreen">{heroTour.latePricingR}<SaudiRiyal className='size-4'/></span> : <span className="flex text- font-extrabold text-forestGreen"><SaudiRiyal className='size-4'/>{heroTour.latePricingR}</span>}
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 mt-1'>
                        <p>{isRtl ? 'عائلة / كبلز' : 'Families / Couples(3)'}</p>
                        {/* <p className="text- font-extrabold text-forestGreen">
                            ₦{heroTour.familyPricingN} --- ${heroTour.familyPricingR}
                        </p> */}  
                        <div className='flex flex-row gap-2'>
                            <div>
                                <PriceOption 
                                tourName={heroTour.title}
                                price={`₦${heroTour.familyPricingN} -- SAR${heroTour.familyPricingR}`}
                                packageType={isRtl? 'عائلة / كبلز' : 'Families / Couples(3)'}
                                currency='$' />
                            </div>
                            <span className="text- font-extrabold text-forestGreen">
                                ₦{heroTour.familyPricingN}
                            </span>
                                ---
                            {/* <span className="flex text- font-extrabold text-forestGreen"><SaudiRiyal className='size-4'/>{heroTour.familyPricingR}</span> */}
                            {isRtl ? <span className="flex text- font-extrabold text-forestGreen">{heroTour.familyPricingR}<SaudiRiyal className='size-4'/></span> : <span className="flex text- font-extrabold text-forestGreen"><SaudiRiyal className='size-4'/>{heroTour.latePricingR}</span>}
                        </div>

                    </div>

                    <div className='flex flex-col gap-1 mt-1'>
                        <p>{isRtl ? 'غرفة خاصة للشخص' : 'Private room / individual'}</p>
                        {/* <p className="text- font-extrabold text-forestGreen">
                            ₦{heroTour.soloRoomN} --- ${heroTour.soloRoomR}
                        </p> */}
                        <div className='flex flex-row gap-2'>
                            <div>
                                <PriceOption 
                                tourName={heroTour.title}
                                price={`₦${heroTour.soloRoomN} -- SAR${heroTour.soloRoomR}`}
                                packageType={isRtl? 'غرفة خاصة للشخص' : 'Private room / individual'}
                                currency='$' />
                            </div>
                            <span className="text- font-extrabold text-forestGreen">
                                ₦{heroTour.soloRoomN}
                            </span>
                                ---
                            {/* <span className="flex text- font-extrabold text-forestGreen"><SaudiRiyal className='size-4'/>{heroTour.soloRoomR}</span> */}
                            {isRtl ? <span className="flex text- font-extrabold text-forestGreen">{heroTour.soloRoomR}<SaudiRiyal className='size-4'/></span> : <span className="flex text- font-extrabold text-forestGreen"><SaudiRiyal className='size-4'/>{heroTour.latePricingR}</span>}
                             
                        </div>
                    </div>

                    </div>
                </div>
                </div>

                {/* Full Description */}
                <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    {isRtl ? 'وصف الجولة' : 'Tour Description'}
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {heroTour.description}
                </p>
                </div>

                {/* Highlights List */}
                <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                    {isRtl ? 'أبرز مميزات الجولة' : 'Tour Highlights'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {heroTour.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-forestGreen flex-shrink-0" />
                        <span>{item}</span>
                    </div>
                    ))}
                </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 rounded-full text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                    {isRtl ? 'إلغاء' : 'Close'}
                </button>

                {/* this button should redirect to troviesta whatsapp */}
                {/* <Link
                    to="/tours-and-services"
                    className="flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-forestGreen text-white font-bold text-xs border border-forestGreen hover:bg-neutral-900 hover:border-neutral-900 transition-all shadow-md"
                >
                    <span>{isRtl ? 'المزيد من التفاصيل' : 'Book Tour / Whatsapp'} <FaWhatsapp /></span>
                  
                </Link> */}
                <button className="flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-forestGreen text-white font-bold text-xs border border-forestGreen hover:bg-white hover:text-forestGreen transition-all shadow-md">
                    <a href='https://wa.me/message/DRZ3AJKQ32KJA1' target='_blank' rel="noopener noreferrer">
                        {isRtl ? "احجز عبر الواتساب" : "Book on whatsapp"} 
                    </a>
                    <span><FaWhatsapp className='text-gold text-lg'/></span>
                </button>
              
                </div>
            </div>
            </motion.div>
        </div>
        )}
    </AnimatePresence>
    );

}
