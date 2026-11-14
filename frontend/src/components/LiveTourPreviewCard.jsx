import React, { useState } from 'react';
import { Sparkles, MapPin, Info, Calendar, X, Image as ImageIcon, CheckCircle } from 'lucide-react';




export default function LiveTourPreviewCard({ formData, isRtl, formatNumber, formatEventDate, imagePreview, existingGalleryUrls, inclusions, startDate, endDate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fallback formatters if not passed as props
  const formatNum = formatNumber || ((val) => Number(val || 0).toLocaleString());
  const formatDate = formatEventDate || ((date) => date || 'TBD');

  console.log(inclusions);
  


  return (
    <div className="space-y-4 md:w-1/2 w-3/4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" />
          <span>Live Tour Preview Card</span>
        </h3>
        <span className="text-xs font-mono text-slate-400">
          {isRtl ? 'وضع المعاينة (العربية)' : 'Preview Mode (EN)'}
        </span>
      </div>

      <div 
        className="rounded-2xl border border-forestGreen/30 bg-white shadow-xl overflow-hidden transition-all"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Cover Image */}
        <div className="relative w-full h-64 bg-slate-800">
          {imagePreview ? (
            <img src={imagePreview} alt="Tour Cover Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-mono">
              No Image Uploaded
            </div>
          )}
          <div className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} bg-forestGreen text-white font-mono text-xs px-2.5 py-1 rounded-full shadow-md`}>
            {formData.totalTickets || 'Active Tour'}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-4">
          
          {/* Dynamic Content based on isRtl */}
          <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 inline-block">
              {isRtl ? 'معاينة رحلة السفاري' : 'Tour Live Preview'}
            </span>
            
            <h4 className="text-xl font-bold text-slate-900">
              {isRtl 
                ? (formData.eventTitleAr || 'عنوان الرحلة بالعربية') 
                : (formData.eventTitle || 'Tour Title (English)')}
            </h4>
            
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
              {isRtl 
                ? (formData.eventDescriptionAr || 'سيظهر وصف الرحلة هنا...') 
                : (formData.eventDescription || 'Tour description will appear here...')}
            </p>

            <p className={`text-xs font-semibold text-slate-700 flex items-center gap-1 pt-1 ${isRtl ? 'justify-end' : 'justify-start'}`}>
              <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>
                {isRtl 
                  ? (formData.eventLocationAr || 'موقع الرحلة بالعربية') 
                  : (formData.eventLocation || 'Tour Location (English)')}
              </span>
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Pricing & Date Footer */}
          <div className="flex items-center justify-between pt-1">
            <div className="space-y-0.5 font-mono text-xs">
              <div className="text-slate-500">
                {isRtl ? 'الحجز المبكر' : 'Early birds'} <span className="text-forestGreen font-bold">₦{formatNum(formData.earlyBirds)}</span>
              </div>
              <div className="text-slate-500">
                {isRtl? 'الحجز المتأخر' : 'Late Booking'} <span className="text-gold font-bold">₦{formatNum(formData.lateBooking)}</span>
              </div>
            </div>

            {/* date container */}
            <div>
              <div className={`flex flex-col gap-2.5 font-mono text-xs text-slate-500 ${isRtl ? 'text-left' : 'text-right'} `}>

                <div className='flex flex-col gap-1.5 bg-amber-0'>
                  <span className='text-forestGreen flex flex-row items-center gap-2'>
                    <Calendar className='text-gold size-5'/> {isRtl ? 'بداية الرحلة' : 'Tour Start'}  
                  </span>

                  <span className=''>
                    {formatDate(startDate)}
                  </span>
                </div>

                <div className='flex flex-col gap-1.5 bg-amber-0'>
                  <span className='text-forestGreen flex flex-row items-center gap-2'>
                    <Calendar className='text-gold size-5'/> {isRtl ? 'نهاية الرحلة' : 'Tour End'}  
                  </span> 

                  <span className=''>
                    {formatDate(endDate)}
                  </span>
                </div>

                
              </div>
            </div>

          </div>

          {/* About Tour Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-forestGreen hover:bg-white border border-forestGreen hover:text-forestGreen text-white py-2.5 px-4 text-xs font-mono font-semibold shadow-sm transition-all duration-300 ease-in-out"
          >
            <Info className="w-4 h-4 text-gold" />
            <span>{isRtl ? 'تفاصيل الرحلة (معرض الصور والأسعار)' : 'About Tour (Gallery & Pricing)'}</span>
          </button>
        </div>
      </div>

      {/* ================= ABOUT TOUR MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-cyan-600" />
                <h3 className="text-base font-bold text-slate-900">
                  {isRtl ? 'تفاصيل ومعلومات الرحلة' : 'Tour Details & Package Breakdown'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Tour Title & Summary */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                  {isRtl ? formData.eventTitleAr : formData.eventTitle}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isRtl ? formData.eventDescriptionAr : formData.eventDescription}
                </p>
              </div>

              {/* Package Prices Breakdown */}
              <div className="space-y-3">
                <h5 className="font-mono text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  {isRtl ? 'أسعار الباقات المختلفة' : 'Package Pricing Tiers'}
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col">
                    <span className="text-[11px] font-mono text-slate-500">
                      {isRtl ? 'الحجز المبكر' : 'Early birds'}
                    </span>
                    <span className="text-sm font-bold text-forestGreen font-mono mt-1">₦{formatNum(formData.earlyBirds)}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col">
                    <span className="text-[11px] font-mono text-slate-500">{isRtl ? 'حجز متأخر' : 'Late Booking'}</span>
                    <span className="text-sm font-bold text-slate-900 font-mono mt-1">₦{formatNum(formData.lateBooking)}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col">
                    <span className="text-[11px] font-mono text-slate-500">{isRtl ? 'غرفة خاصة' : 'Private Room' }</span>
                    <span className="text-sm font-bold text-cyan-600 font-mono mt-1">₦{formatNum(formData.privateBooking)}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col">
                    <span className="text-[11px] font-mono text-slate-500">{isRtl ? ' كبلز / عوائل' : 'Family / Couples'}</span>
                    <span className="text-sm font-bold text-gold font-mono mt-1">₦{formatNum(formData.familyCouples)}</span>
                  </div>
                </div>
              </div>

              {/* Inclusions Section */}
              {inclusions && inclusions.length > 0 && (
                <div className="space-y-3">
                  <h5 className="font-mono text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    {isRtl ? 'ما تشمله الرحلة' : 'Tour Inclusions'}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs text-slate-700">
                        <CheckCircle className="w-4 h-4 text-forestGreen shrink-0 mt-0.5" />
                        <span>{isRtl ? (inc.ar || inc.en || inc) : (inc.en || inc.ar || inc)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Images Section */}
              {existingGalleryUrls && existingGalleryUrls.length > 0 && (
                <div className="space-y-3">
                  <h5 className="font-mono text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-cyan-600" />
                    <span>{isRtl ? 'معرض صور الرحلة' : 'Gallery Images'}</span>
                  </h5>
                  <div className="grid grid-cols-3 gap-3">
                    {existingGalleryUrls.map((imgUrl, gIdx) => (
                      <div key={gIdx} className="h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                        <img src={imgUrl} alt={`Gallery item ${gIdx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-100 bg-slate-50 px-6 py-3 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full bg-forestGreen text-white border border-forestGreen px-4 py-2 text-xs font-mono font-medium hover:bg-white hover:text-forestGreen transition-all duration-300 ease-in-out"
              >
                {isRtl ? 'إغلاق المعاينة' : 'Close Preview'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}