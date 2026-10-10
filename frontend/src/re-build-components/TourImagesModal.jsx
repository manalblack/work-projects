import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export default function TourImageGalleryModal ({ isModalOpen, setIsModalOpen, images = [], tourTitle = '', isRtl = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when modal opens
  useEffect(() => {
    if (isModalOpen) setCurrentIndex(0);
  }, [isModalOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') setIsModalOpen(false);
      if (e.key === 'ArrowRight') isRtl ? prevImage() : nextImage();
      if (e.key === 'ArrowLeft') isRtl ? nextImage() : prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentIndex, isRtl]);

  if (!isModalOpen || !images || images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Drag thresholds for mobile swiping
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-5xl bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[85vh] max-h-[800px] border border-neutral-800"
          >
            {/* Top Bar / Header */}
            <div className="flex items-center justify-between px-5 py-2 bg-neutral-900/80 border-b border-neutral-800 text-white z-30">
              <div className="flex items-center gap-2 overflow-hidden">
                <ImageIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <h3 className="text-sm sm:text-base font-bold truncate">
                  {tourTitle || 'Destination Catalogue'}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                {/* Photo Counter */}
                <span className="text-xs font-semibold text-neutral-400 bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">
                  {currentIndex + 1} / {images.length}
                </span>

                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Stage / Image Viewer */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
              {/* Swipeable Image Frame */}
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={currentIndex}
                  src={typeof images[currentIndex] === 'string' ? images[currentIndex] : images[currentIndex].url}
                  alt={`Destination view ${currentIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
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
                  className="max-h-full max-w-full object-contain cursor-grab active:cursor-grabbing pointer-events-auto"
                />
              </AnimatePresence>

              {/* Caption Overlay (if caption string provided in object) */}
              {images[currentIndex]?.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 text-center pointer-events-none">
                  <p className="text-neutral-200 text-xs sm:text-sm font-medium">
                    {images[currentIndex].caption}
                  </p>
                </div>
              )}

              {/* Desktop Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-neutral-700/50 transition-all hover:scale-110 active:scale-95 z-20"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-neutral-700/50 transition-all hover:scale-110 active:scale-95 z-20"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            {images.length > 1 && (
              <div className="px-4 py-2 bg-neutral-900/90 border-t border-neutral-800 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar z-30">
                {images.map((img, idx) => {
                  const imgUrl = typeof img === 'string' ? img : img.url;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        idx === currentIndex
                          ? 'border-emerald-500 scale-105 opacity-100 ring-2 ring-emerald-500/20'
                          : 'border-transparent opacity-40 hover:opacity-80'
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
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// export default TourImageGalleryModal;