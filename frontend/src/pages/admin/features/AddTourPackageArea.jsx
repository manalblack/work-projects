import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";
import MiniLoading from "../../../components/admin-components/MiniLoading";
import { supabase } from "../../../supabaseConnection";
import { 
  Sparkles, 
  Type, 
  FileText, 
  Calendar, 
  MapPin, 
  Upload, 
  Images, 
  DollarSign, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Compass, 
  Users, 
  Clock,
  BedDouble,
  X,
  UserRound,
  UsersRound
} from 'lucide-react';


/*
  fix the ui and work on the backend endpoint
*/


export default function AddTourPackageArea() {
  const { isRtl } = useOutletContext() || { isRtl: false };

  const [loading, setLoading] = useState(false);

  const [tourStartDate, setTourStartDate] = useState(new Date());
  const [tourEndDate, setTourEndDate] = useState(new Date());
  
  // Main Tour Info State
  const [tourData, setTourData] = useState({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    locationEn: '',
    locationAr: '',
    earlyBirdsPrice: '',
    lateBookingPrice: '',
    familyCouplesPrice: '',
    privateRoomPrice: '',
  });

  // Media States
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  
  const [carouselFiles, setCarouselFiles] = useState([]);
  const [carouselPreviews, setCarouselPreviews] = useState([]);

  // Inclusions State (Targeting 6 to 12 items)
  const [inclusions, setInclusions] = useState([
    {
      en: 'Luxury 5-Star Hotel Accommodation',
      ar: 'إقامة فاخرة في فندق 5 نجوم'
    },
    {
      en: 'Private VIP Airport Transfers',
      ar: 'توصيل خاص من وإلى المطار بخدمة VIP'
    },
    {
      en: 'Professional Certified Tour Guide',
      ar: 'مرشد سياحي محترف ومعتمد'
    },
    {
      en: 'All Gourmet Meals & Beverages',
      ar: 'جميع الوجبات الفاخرة والمشروبات'
    },
    {
      en: 'Exclusive Desert Safari Access',
      ar: 'دخول حصري إلى سفاري الصحراء'
    },
    {
      en: 'Comprehensive Travel Insurance',
      ar: 'تأمين سفر شامل'
    }
  ]);

  const [inclusionInputEn, setInclusionInputEn] = useState('')
  const [inclusionInputAr, setInclusionInputAr] = useState('')

  const API_URL = import.meta.env.VITE_API_URL;

  // Bilingual UI Dictionary
  const t = {
    title: isRtl ? 'إضافة باقة رحلات جديدة (Tour Package)' : 'Create Tour Package',
    subtitle: isRtl ? 'تصميم باقة سياحية جديدة مع الأسعار، الصور المتعددة، والمميزات' : 'Design an exclusive tour package with tiered pricing and multi-image galleries',
    tourTitleLabel: isRtl ? 'عنوان الباقة السياحية' : 'Tour Package Title',
    tourDescLabel: isRtl ? 'وصف الرحلة' : 'Tour Description',
    dateLabel: isRtl ? 'تاريخ انطلاق الرحلة' : 'Departure Date & Time',
    startDate: isRtl ? 'تاريخ البداية' : 'Start Date',
    endDate: isRtl ? 'تاريخ النهاية' : 'End Date',
    locationLabel: isRtl ? 'الوجهة / الموقع' : 'Destination / Location',
    coverImageLabel: isRtl ? 'صورة الغلاف الرئيسية' : 'Main Cover Image',
    carouselLabel: isRtl ? 'صور المعرض (4-5 صور للـ Carousel)' : 'Gallery Carousel Images (4-5 Photos)',
    pricingHeader: isRtl ? 'فئات الأسعار والاشتراك' : 'Tiered Pricing Structure',
    earlyBirds: isRtl ? 'سعر الحجز المبكر (Early Birds)' : 'Early Birds Price',
    lateBooking: isRtl ? 'سعر الحجز المتأخر (Late Booking)' : 'Late Booking Price',
    familyCouples: isRtl ? 'باقة العائلات / الأزواج' : 'Family / Couples Price',
    privateRoom: isRtl ? 'رسوم الغرفة الخاصة (Private Room)' : 'Private Room Supplement',
    inclusionsHeader: isRtl ? 'ما تشمله الباقة (6-12 ميزة)' : 'Package Inclusions (6-12 Items)',
    addItemPlaceholder: isRtl ? 'أضف ميزة جديدة (مثال: وجبة عشاء فاخرة)...' : 'Add package inclusion e.g. VIP Lounge Access...',
    addBtn: isRtl ? 'إضافة' : 'Add',
    submitBtn: isRtl ? 'حفظ ونشر الباقة السياحية' : 'Publish Tour Package',
    successMsg: isRtl ? 'تم إضافة الباقة السياحية بنجاح!' : 'Tour package published successfully!',
    errorMsg: isRtl ? 'حدث خطأ أثناء رفع البيانات' : 'Failed to publish tour package.',
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setTourData(prev => ({ ...prev, [name]: value }));
  };

  // Cover Image Handler
  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }

    console.log(file);
    console.log(URL.createObjectURL(file));
    
    
  };

  // Carousel Images Handler (Max 5)
  const handleCarouselImages = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length === 0) return;

  // Combine existing files with the newly selected files
    const combinedFiles = [...carouselFiles, ...newFiles];

    // Enforce the maximum limit of 5 images
    if (combinedFiles.length > 5) {
        toast.error(isRtl ? 'يمكنك اختيار 5 صور كحد أقصى للمعرض' : 'Maximum 5 images allowed in total. Please remove some before adding more.');
        e.target.value = ''; // Reset input
        return;
    }

    // Create previews for the new files only
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    
    // Combine previews
    const combinedPreviews = [...carouselPreviews, ...newPreviews];

    setCarouselFiles(combinedFiles);
    setCarouselPreviews(combinedPreviews);

    // Clear the input value so selecting the same file/batch again triggers onChange properly
    e.target.value = '';
  };

  const removeCarouselImage = (index) => {
    URL.revokeObjectURL(carouselPreviews[index]);
    
    const updatedFiles = carouselFiles.filter((_, i) => i !== index);
    const updatedPreviews = carouselPreviews.filter((_, i) => i !== index);
    
    setCarouselFiles(updatedFiles);
    setCarouselPreviews(updatedPreviews);
  };
  // Inclusions Handlers

  const addInclusion = () => {
    if (!inclusionInputEn.trim() && !inclusionInputAr.trim()) return;

    const newItem = {
      en: inclusionInputEn.trim(),
      ar: inclusionInputAr.trim(),
    };

    setInclusions((prev) => [...prev, newItem]);
    
    // Clear inputs after adding
    setInclusionInputEn('');
    setInclusionInputAr('');
  };

  const removeInclusion = (index) => {
    setInclusions((prev) => prev.filter((_, i) => i !== index));
  };

  // create a function to calculate the duration days using the start and end dates and return the number of days

  const calculateDurationDays = (start, end) => {
    if (!start || !end) return 1; // Default to 1 day if not set
    
    const diffTime = Math.abs(new Date(end) - new Date(start));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Return at least 1 day even if it's a same-day tour
    return diffDays === 0 ? 1 : diffDays;
  };

  // Submit Handler
  const handleSubmitTour = async (e) => {
    e.preventDefault();

    // if (!coverImageFile || carouselFiles.length < 4) {
    //   toast.error(isRtl ? 'يرجى إرفاق صورة الغلاف و 4 صور على الأقل للمعرض' : 'Please upload a cover image and at least 4 gallery carousel images.');
    //   return;
    // }

    // if (inclusions.length < 6) {
    //   toast.error(isRtl ? 'يجب إضافة 6 ميزات على الأقل تشملها الباقة' : 'Please provide at least 6 package inclusions.');
    //   return;
    // }


    setLoading(true);

    try {


      // handle image logic before sending data to backend

      // COVER IMAGE FILE LOGIC
      let coverImageUrl;
      if (coverImageFile) {
        const fileName = `tourCover-${Date.now()}-${coverImageFile.name}`;
        
        const { data, error } = await supabase.storage.from('tours_images').upload(fileName, coverImageFile);
        if (error) throw error;
        
        const { data: uploadedImage } = supabase.storage.from('tours_images').getPublicUrl(fileName)

        coverImageUrl = uploadedImage.publicUrl;
      }

      // CAROUSEL IMAGES FILE LOGIC

      const galleryImageUrls = [];
      if (carouselFiles && carouselFiles.length > 0) {
        for (const file of carouselFiles) {
          const fileName = `tourGallery-${Date.now()}-${file.name}`;
          
          const { data, error } = await supabase.storage.from('tours_images').upload(fileName, file);
          if (error) throw error;
          
          const { data: uploadedImage } = supabase.storage.from('tours_images').getPublicUrl(fileName);
          galleryImageUrls.push(uploadedImage.publicUrl);
        }
      }


      const updatedEvent = {
        title: {
          en: tourData.titleEn || '',
          ar: tourData.titleAr || '',
        },
        description: {
          en: tourData.descriptionEn || '',
          ar: tourData.descriptionAr || '',
        },
        location: {
          en: tourData.locationEn || '',
          ar: tourData.locationAr || '',
        },
        tour_start_date: tourStartDate.toISOString().split('T')[0],
        tour_end_date: tourEndDate.toISOString().split('T')[0],

        duration_days: Math.ceil((tourEndDate - tourStartDate) / (1000 * 60 * 60 * 24)) + 1, // Calculate duration in days
        early_birds: Number(tourData.earlyBirdsPrice) || 0,
        late_booking: Number(tourData.lateBookingPrice) || 0,
        family_couples: Number(tourData.familyCouplesPrice) || 0,
        individual_room: Number(tourData.privateRoomPrice) || 0,
        inclusions: inclusions,
        cover_image: coverImageUrl || '',
        gallery_images: galleryImageUrls || [],
      } 


      const newTour = {
        titleEn: tourData.titleEn,
        titleAr: tourData.titleAr,
        descriptionEn: tourData.descriptionEn,
        descriptionAr: tourData.descriptionAr,
        locationEn: tourData.locationEn,
        locationAr: tourData.locationAr,
        startDate: tourStartDate.toISOString().split('T')[0],
        endDate: tourEndDate.toISOString().split('T')[0],
        durationDays: calculateDurationDays(tourStartDate, tourEndDate),
        earlyBirds: Number(tourData.earlyBirdsPrice) || 0,
        lateBooking: Number(tourData.lateBookingPrice) || 0,
        familyCouples: Number(tourData.familyCouplesPrice) || 0,
        privateRoom: Number(tourData.privateRoomPrice) || 0,
        inclusions: inclusions,
        coverImage: coverImageUrl,
        carouselImages: galleryImageUrls,

      }
    

      const response = await axios.post(`${API_URL}/admin/add-tour`, {newTour});

      console.log(response);
    

    } catch (error) {
      
      console.error('Error adding tour package:', error);
      toast.error(t.errorMsg);

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <MiniLoading />;
  }

  return (
    <div className="w-full pb-16 text-slate-100 font-sans">
      
      {/* Header */}
      <div className="mb-8 px-2">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-gold" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.title}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          {t.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmitTour} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ==================================================== */}
        {/* LEFT COLUMN: BASIC DETAILS & MEDIA                   */}
        {/* ==================================================== */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Info Card */}
          <div className="bg-white border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-forestGreen flex items-center gap-2">
              <Compass className="w-4 h-4 text-gold" />
              <span>{isRtl ? 'تفاصيل الرحلة الأساسية' : 'Tour Core Information'}</span>
            </h3>

            {/* Titles container */}
            <div className='bg-amber-00 flex justify-between gap-2'>

              {/* Title Arabic */}
              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Type className="w-4 h-4 text-gold" />
                  <span>
                    عنوان الرحلة
                  </span>
                </label>
                <input 
                  type="text" 
                  name="titleAr" 
                  value={tourData.titleAr || ''} 
                  onChange={handleFormChange}
                  required
                  dir='rtl'
                  placeholder="Add arabic placeholder"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>

              {/* Title english */}
              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Type className="w-4 h-4 text-gold" />
                  <span>{t.tourTitleLabel}</span>
                </label>
                <input 
                  type="text" 
                  name="titleEn" 
                  value={tourData.titleEn || ''} 
                  onChange={handleFormChange}
                  required
                  dir="ltr"
                  placeholder="Yankari Natural Sanctuary"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all text-right font-arabic"
                />
              </div>

            </div>

            {/* Description container */}
            <div className='flex justify-between gap-2'>

              {/* Description (Arabic) */}
              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <FileText className="w-4 h-4 text-gold" />
                  <span>
                    وصف الرحلة
                  </span>
                </label>
                <textarea 
                  name="descriptionAr" 
                  value={tourData.descriptionAr || ''} 
                  onChange={handleFormChange}
                  required
                  dir='rtl'
                  placeholder="Add Arabic description"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl h-32 text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all resize-none"
                />
              </div>

            {/* Description English */}
              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <FileText className="w-4 h-4 text-gold" />
                  <span>{t.tourDescLabel}</span>
                </label>
                <textarea 
                  name="descriptionEn" 
                  value={tourData.descriptionEn || ''} 
                  onChange={handleFormChange}
                  required
                  dir="ltr"
                  placeholder="Get lost in the natural beauty of yankari"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl h-32 text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all resize-none text-right font-arabic"
                />
              </div>
            </div>

            <div className='flex justify-between gap-2'>
            {/* Location (Arabic) */}
              
              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>
                    الوجهة
                  </span>
                </label>
                <input 
                  type="text" 
                  name="locationAr" 
                  value={tourData.locationAr || ''} 
                  onChange={handleFormChange}
                  required
                  dir='rtl'
                  placeholder="Add arabic description"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>

              {/* Location (English) */}
              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>{t.locationLabel}</span>
                </label>
                <input 
                  type="text" 
                  name="locationEn" 
                  value={tourData.locationEn || ''} 
                  onChange={handleFormChange}
                  required
                  dir="rtl"
                  placeholder="Yankari Natural Sanctuary, Bauchi State"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all text-right font-arabic"
                />
              </div>
            
            </div>

            {/* Start date & end Date */}
            <div className='flex justify-between gap-2'>

              {/* Start date container */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>{t.startDate}</span>
                </label>
                <DatePicker 
                  selected={tourStartDate} 
                  onChange={(date) => setTourStartDate(date)}  
                  showTimeSelect 
                  withPortal 
                  dateFormat="Pp"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>

              {/* End date container */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>{t.endDate}</span>
                </label>
                <DatePicker 
                  selected={tourEndDate} 
                  onChange={(date) => setTourEndDate(date)}  
                  showTimeSelect 
                  withPortal 
                  dateFormat="Pp"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>



            </div>


          </div>

          {/* Media Uploads Card */}
          <div className="bg-white border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-forestGreen flex items-center gap-2">
              <Images className="w-4 h-4 text-gold" />
              <span>{isRtl ? 'وسائط الباقة والمعرض' : 'Tour Media & Gallery'}</span>
            </h3>

            {/* Cover Image Upload */}
            <div className="space-y-2 ">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Upload className="w-4 h-4 text-gold" />
                <span>{t.coverImageLabel}</span>
              </label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleCoverImage} 
                required
                className="w-full bg-white p-2 border border-forestGreen/40 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-forestGreen file:text-white hover:file:bg-gold hover:file:text-slate-950 text-slate-400 text-xs rounded-xl cursor-pointer"
              />
              {coverImagePreview && (
                <div className="relative w-full h-120 rounded-xl overflow-hidden border border-white/10 mt-3">
                  <img src={coverImagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Carousel Images Upload (4-5 Images) */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Images className="w-4 h-4 text-forestGreen" />
                <span>{t.carouselLabel}</span>
              </label>
              <input 
                type="file" 
                accept="image/*" 
                multiple
                onChange={handleCarouselImages} 
                // required
                className="w-full bg-white p-2 border border-forestGreen/40 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-forestGreen file:text-white hover:file:bg-gold hover:file:text-slate-950 text-slate-400 text-xs rounded-xl cursor-pointer"
              />
              <span className="text-[11px] text-slate-950 block">
                {isRtl ? 'اختر من 4 إلى 5 صور لتظهر في معرض الوسائط (Modal Carousel)' : 'Select 4 to 5 images for the read-about modal carousel.'}
              </span>

              {/* Carousel Previews Grid */}
              {carouselPreviews.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mt-3">
                  {carouselPreviews.map((src, idx) => (
                    <div key={idx} className="relative h-auto rounded-lg overflow-hidden border border-white/10 bg-slate-800">
                      <img src={src} alt={`Carousel ${idx}`} className="w-full h-full object-cover" />
                      {/* Overlay Remove Button */}
                        <button 
                            type="button"
                            onClick={() => removeCarouselImage(idx)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600/90 text-white opacity group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-lg hover:bg-red-500"
                            title="Remove image"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                        
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-white">
                            #{idx + 1}
                        </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* ==================================================== */}
        {/* RIGHT COLUMN: 4 PRICING TIERS & INCLUSIONS           */}
        {/* ==================================================== */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Pricing Tiers Card */}
          <div className="bg-white border border-forestGreen/30 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-forestGreen flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gold" />
              <span>{t.pricingHeader}</span>
            </h3>

            <div className="space-y-4">
              {/* Early Birds */}
              <div className="space-y-1">
                <label className="flex gap-3 text-xs text-forestGreen font-semibold">
                    <UserRound className='h-4 w-4 text-gold' />
                    {t.earlyBirds}
                </label>

                <input 
                  type="number" 
                  name="earlyBirdsPrice" 
                  value={tourData.earlyBirdsPrice} 
                  onChange={handleFormChange}
                  required
                  placeholder="1500"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-2.5 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>

              {/* Late Booking */}
              <div className="space-y-1">
                <label className="text-xs flex gap-3 text-forestGreen font-semibold">
                    <UserRound className='h-4 w-4 text-gold' />
                    {t.lateBooking}
                </label>
                <input 
                  type="number" 
                  name="lateBookingPrice" 
                  value={tourData.lateBookingPrice} 
                  onChange={handleFormChange}
                  required
                  placeholder="2200"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-2.5 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>

              {/* Family / Couples */}
              <div className="space-y-1">
                <label className="text-xs text-forestGreen font-semibold">
                     <UsersRound className='h-4 w-4 text-gold' />
                    {t.familyCouples}
                </label>
                <input 
                  type="number" 
                  name="familyCouplesPrice" 
                  value={tourData.familyCouplesPrice} 
                  onChange={handleFormChange}
                  required
                  placeholder="3800"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-2.5 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>

              {/* Private Room Supplement */}
              <div className="space-y-1">
                <label className="text-xs text-forestGreen font-semibold flex items-center gap-1">
                  {/* <BedDouble className="w-3.5 h-3.5 text-forestGreen" /> */}
                   <UserRound className='h-4 w-4 text-gold' />
                  <span>{t.privateRoom}</span>
                </label>
                <input 
                  type="number" 
                  name="privateRoomPrice" 
                  value={tourData.privateRoomPrice} 
                  onChange={handleFormChange}
                  required
                  placeholder="850"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-2.5 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>
            </div>
          </div>

          {/* Package Inclusions Card (6-12 items) */}
          <div className="bg-white border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">

            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-forestGreen flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>{t.inclusionsHeader}</span>
              </h3>
              <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${inclusions.length >= 6 ? 'bg-forestGreen text-white' : 'bg-amber-500/20 text-amber-400'}`}>
                {inclusions.length} / 12
              </span>
            </div>

            {/* Add Inclusions Inputs (English & Arabic) */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={inclusionInputEn}
                  onChange={(e) => setInclusionInputEn(e.target.value)}
                  placeholder="Add inclusion (English)..."
                  className="flex-1 bg-white border border-forestGreen/50 px-3 py-2 rounded-md text-slate-950 text-xs focus:outline-none focus:border-gold"
                />

                <input 
                  type="text"
                  value={inclusionInputAr}
                  onChange={(e) => setInclusionInputAr(e.target.value)}
                  dir="rtl"
                  placeholder="إضافة عنصر (العربية)..."
                  className="flex-1 bg-white border border-forestGreen/50 px-3 py-2 rounded-md text-slate-950 text-xs focus:outline-none focus:border-gold text-right font-arabic"
                />
              </div>
              <button 
                type="button"
                onClick={addInclusion}
                className="w-full py-2.5 rounded-full bg-forestGreen text-white font-bold text-xs border border-forestGreen hover:bg-white hover:text-forestGreen transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
              >
                <Plus className="w-4 h-4 text-gold" />
                <span>{t.addBtn}</span>
              </button>
            </div>

            {/* Inclusions List */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
              {inclusions.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2.5 rounded-xl bg-forestGreen/20 border border-white/5 text-xs text-slate-950">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 truncate pr-2">
                    <span className="font-bold text-forestGreen">{index + 1}.</span>
                    <span className="truncate text-slate-900"><strong className="text-xs text-slate-500">EN:</strong> {typeof item === 'object' ? item.en : item}</span>
                    <span className="truncate text-slate-900" dir="rtl"><strong className="text-xs text-slate-500">AR:</strong> {typeof item === 'object' ? item.ar : ''}</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeInclusion(index)}
                    className="text-red-600 hover:text-red-800 p-1 cursor-pointer transition-all duration-300 ease-in-out shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

          </div>

          {/* Submit Action Button */}
          <button 
            type="submit"
            className="w-full py-4 rounded-full bg-forestGreen text-white font-bold text-xs uppercase tracking-widest border border-forestGreen hover:bg-white hover:text-forestGreen transition-all duration-300 shadow-2xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-gold group-hover:text-slate-950" />
            <span>{t.submitBtn}</span>
          </button>

        </div>

      </form>
    </div>
  );
}