import { useState, useEffect } from "react"
import axios from 'axios';
import { supabase } from "../../../supabaseConnection";
import MiniLoading from "../../../components/admin-components/MiniLoading";
import AdminDashEvents from "../../../components/AdminDashEvents";
import Input from "../../../components/Input";
import DatePicker from "react-datepicker";
// IMPORTANT: You must import the CSS or the calendar will look broken
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../../../components/Modal";
import Overlay from "../../../components/Overlay";
import {motion, AnimatePresence} from 'motion/react'
import imageCompression from 'browser-image-compression';
import toast from "react-hot-toast";
import { useOutletContext } from 'react-router-dom';
import { 
  Edit3, 
  Trash2, 
  Calendar, 
  MapPin, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Type, 
  FileText, 
  Ticket, 
  DollarSign,
  UserRound,
  UsersRound,
  Plus
} from 'lucide-react';



// keep testing 

export default function EditEventArea() {

  // loading states
  const [loading, setLoading] = useState(true);
  const [loadingEventDetails, setLoadingEventDetails] = useState(false);

  const [initialPageLoad, setInitialPageLoad] = useState(true);
    
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [allEvents, setAllEvents] = useState([]);
  const [tourId, setTourId] = useState('');
  const [isConfirmationModel, setIsConfirmationModal] = useState(false);
  // states for from editing and image change.
  const [imageFile, setImageFile] = useState(null)
  const [eventDate, setEventDate] = useState(new Date());
  const [startDate, setStartDate ] = useState(new Date());
  const [endDate, setEndDate ] = useState(new Date());

  const [imagePreview, setImagePreview] = useState(null);
  const [existingGalleryUrls, setExistingGalleryUrls] = useState([]);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState([]);
  const [formData, setFormData] = useState({
    eventTitle: '',
    eventTitleAr: '',
    eventDescription: '',
    eventDescriptionAr: '',
    eventLocation: '',
    eventLocationAr: '',
    totalTickets: '',
    earlyBirds: 0,
    lateBooking: 0,
    familyCouples: 0,
    privateBooking: 0,
    vipPrice: '',
    regularPrice: '',
    eventTime: '',
  });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [inclusions, setInclusions] = useState([]);

  const [inclusionInputEn, setInclusionInputEn] = useState('')
  const [inclusionInputAr, setInclusionInputAr] = useState('')
  

  // Pull language state from parent Dashboard outlet
  const { isRtl } = useOutletContext() || { isRtl: false }; 

  // Bilingual UI Dictionary
  const t = {
    selectTitle: isRtl ? 'اختر رحلة للتعديل' : 'Select A Tour To Edit',
    selectPrompt: isRtl ? 'اختر الرحلة المطلوبة' : 'Select A Tour',
    editBtn: isRtl ? 'بدء التعديل' : 'Edit Tour',
    formHeader: isRtl ? 'تعديل تفاصيل الفعالية' : 'Edit Tour',
    formSubtitle: isRtl ? 'قم بتحديث بيانات الرحلة أو حذفها نهائياً' : 'Update tour specifications or remove listing',
    titleLabel: isRtl ? 'عنوان الرحلة' : 'Tour Title',
    descLabel: isRtl ? 'وصف الرحلة' : 'Tour Description',
    dateLabel: isRtl ? 'تاريخ ووقت الرحلة' : 'Tour Date & Time',
    locationLabel: isRtl ? 'الموقع' : 'Location',
    currentImage: isRtl ? 'الصورة الحالية' : 'Current Cover Image',
    newImage: isRtl ? 'اختر صورة جديدة' : 'Select New Image',
    totalTickets: isRtl ? 'إجمالي التذاكر' : 'Total Tickets',
    pricingLabel: isRtl ? 'فئات الأسعار' : 'Ticket Pricing',
    vipPrice: isRtl ? 'سعر الـ VIP' : 'VIP Price',
    regularPrice: isRtl ? 'السعر العادي' : 'Regular Price',
    submitBtn: isRtl ? 'حفظ التعديلات' : 'Save Changes',
    deleteBtn: isRtl ? 'حذف الرحلة' : 'Delete Tour',
    confirmUpdateTitle: isRtl ? 'هل أنت متأكد من حفظ التعديلات؟' : 'Are you sure you want to save these changes?',
    confirmDeleteTitle: isRtl ? 'هل أنت متأكد من رغبتك في حذف هذه الرحلة؟' : 'Are you sure you want to delete this tour?',
    confirmBtn: isRtl ? 'تأكيد' : 'Confirm',
    cancelBtn: isRtl ? 'إلغاء' : 'Cancel',
  };

  // CHANGE TO THIS BEFORE DEPLOYMENT
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    try {

      const fetchEvents = async () => {
        // change this link to ngrok 
        const response = await axios.get(`${API_URL}/admin/all-tours`);

        console.log(response.data);

        setAllEvents(response.data);
        setLoading(false)      

      }

      fetchEvents();
    } catch (error) {
        console.error('error when fetching events', error)
        
    }
  }, [])


  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 2,          // Aim for 1MB
      maxWidthOrHeight: 1920, // Resize if it's a massive 4K photo
      useWebWorker: true     // Keeps the UI from freezing during compression
    }
    const compressedFile = await imageCompression(file, options);

    const finalFile = new File([compressedFile], file.name, {
        type: compressedFile.type,
        lastModified: Date.now(),
    });

      setImageFile(finalFile);

      setImagePreview(URL.createObjectURL(finalFile));
  };

  const handelImageFile = async (e) => {

    const selectedFile = e.target.files[0];
    if(selectedFile) {
        compressImage(selectedFile)
    }
    // setImageFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setNewGalleryPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeExistingGalleryImage = (index) => {
    setExistingGalleryUrls(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewGalleryImage = (index) => {
    setNewGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openEditingForm = async () => {

    setInitialPageLoad(false);
    setLoadingEventDetails(true);

    console.log(tourId);

    try {

        const response = await axios.get(`${API_URL}/admin/retrieve-tour/${tourId}`);

        console.log(response.data);
        
        const pulledEvent = response.data;

        setFormData({
          eventTitle: pulledEvent.title['en'],
          eventTitleAr: pulledEvent.title['ar'],
          eventDescription: pulledEvent.description['en'],
          eventDescriptionAr: pulledEvent.description['ar'],
          eventLocation: pulledEvent.location['en'],
          eventLocationAr: pulledEvent.location['ar'],
          totalTickets: pulledEvent.total_tickets,
          vipPrice: pulledEvent.vip_price,
          regularPrice: pulledEvent.regular_price,
          eventTime: pulledEvent.event_time,
          earlyBirds: pulledEvent.early_birds || 0,
          lateBooking: pulledEvent.late_booking || 0,
          familyCouples: pulledEvent.family_couples || 0,
          privateBooking: pulledEvent.individual_room || 0
        });

        setInclusions(pulledEvent.inclusions);
        setStartDate(pulledEvent.start_date);
        setEndDate(pulledEvent.end_date)


        setImagePreview(pulledEvent.cover_image);
        setExistingGalleryUrls(pulledEvent.gallery_images || []);

        // setImageFile(pulledEvent.image);

        setTourId(pulledEvent.id);
        

    // date and time processing 
    const combinedDateTime = `${pulledEvent.event_date}T${pulledEvent.time}`
    const initialDate = new Date(combinedDateTime)

    console.log(pulledEvent.event_date);
    

    setEventDate(pulledEvent.event_date)


        setLoadingEventDetails(false);
    } catch (error) {
        console.log('error when sending event id to the backend', error);
        
    }
      
  }

  const openConfirmationModel = (e) => {

    e.preventDefault();

    setIsConfirmationModal(true);

  }

  const closeModal = () => {
    setIsConfirmationModal(false)
  };



  const updateEvent = async () => {

    console.log(imageFile);
    console.log(tourId);
    

    setLoadingUpdate(true);

    //  1 slice and format the date and time 
    // const updatedDate = eventDate.toISOString().split('T')[0]; // "2026-04-02"
    // const updatedTime = eventDate.toTimeString().split(' ')[0].slice(0, 5); // "18:30"
    
    // 2 Process image file 
    let imageUrlToSave = imagePreview;
    // TODO: FIX THE IMAGE UPLOAD PART IT'S ONLY WORKING WITH NEW IMAGES AND NOT THE EXISTING ONE.

    // const fileName = `eventImage-${imageFile.name}`

    if(imageFile) {

        const fileName = `tourImage-${imageFile.name}`;

        const { data, error } = await supabase.storage
        .from('tours_images')
        .upload(fileName, imageFile, {
            contentType: 'img/*'
        });

        if (error) throw error;

        // Get the public url to save image to database
        const { data: publicData } = supabase.storage
          .from('tours_images')
          .getPublicUrl(fileName);
          
        imageUrlToSave = publicData.publicUrl;
    }

      const galleryImageUrls = [];

      if (existingGalleryUrls && existingGalleryUrls.length > 0) {
        for (const file of existingGalleryUrls) {
          const fileName = `tourGallery-${crypto.randomUUID()}-${file.name}`;
          
          const { data, error } = await supabase.storage.from('tours_images').upload(fileName, file);
          if (error) throw error;
          
          const { data: uploadedImage } = supabase.storage.from('tours_images').getPublicUrl(fileName);
          galleryImageUrls.push(uploadedImage.publicUrl);
        }
      }

    try {

        // create a new object that contains all the updated event data to send it to db
        const updatedEvent = {
          title: {
            en: formData.eventTitle || '',
            ar: formData.eventTitleAr || '',
          },
          description: {
            en: formData.eventDescription || '',
            ar: formData.eventDescriptionAr || '',
          },
          location: {
            en: formData.eventLocation || '',
            ar: formData.eventLocationAr || '',
          },
          start_date: formatEventDate(startDate),
          end_date: formatEventDate(endDate),
          // event_time: formData.eventTime,
          early_birds: formData.earlyBirds,
          late_booking: formData.lateBooking,
          family_couples: formData.familyCouples,
          individual_room: formData.privateBooking,
          cover_image: imageUrlToSave,
          gallery_images: galleryImageUrls,
          inclusions: inclusions,
        } 

        console.log(updatedEvent);
        

        const response = await axios.patch(`${API_URL}/admin/edit-tour/${tourId}`, {updatedEvent});

        // console.log(response);
        
        setIsConfirmationModal(false);

        setLoadingUpdate(false);
        
        console.log('event updated !!!!');
        toast.success('Event updated successfully!')
        
    } catch (error) {
        console.log('error when trying to update event data', error);
        
    }   
  }

  const openConfirmDeleteModal = (e) => {
    e.preventDefault();
    setConfirmDelete(true);
  }

  const closeConfirmDeleteModal = (e) => {
    e.preventDefault();
    setConfirmDelete(false);
  }

  const deleteEvent = async () => {
    setLoadingDelete(true)
    try {
        const response = await axios.delete(`${API_URL}/admin/delete-event/${eventId}`);

        console.log(response);
        if(response.status === 200) {
            setFormData({
                eventTitle: '',
                eventDescription: '',
                eventLocation: '',
                totalTickets: 0,
                vipPrice: 0,
                regularPrice: 0
            })
            setImagePreview(null);
            setImageFile(null);
            setEventDate('');
        }
        setConfirmDelete(false)
        setLoadingDelete(false);

        toast.success('Event deleted successfully!')
        
    } catch (error) {
        console.log('error when deleting event', error);
        
    }
  }

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

  if (loading) {
    return <MiniLoading />;
  };

    if(loadingEventDetails) {
      return (
        <div>
            <h2>
                loading event data
            </h2>

            <MiniLoading />
        </div>
      )
        // console.log(eventDetails.title);
  }

  if(loadingDelete) {
    return (
      <div>
          <h2>
              Deleting event from database
          </h2>
          <MiniLoading />
      </div>
    )
  }

  if (loadingUpdate) {
    return (
      <div className='h-screen w-full flex flex-col justify-center items-center'>
          <h2 className="text-2xl font-bold">
              updating event
          </h2>
          <MiniLoading />
      </div>
    )
  }


  const formatEventDate = (dateInput) => {
    if (!dateInput) return 'Date not set';
    
    const date = new Date(dateInput);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return 'Invalid date';

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatNumber = (value) => {

    if (isNaN(value)) return '0';
    return Number(value).toLocaleString('en-US');
  };
    


  return(
    <div dir={isRtl ? 'rtl' : 'ltr'} className="w-full pb-12 text-slate-100 font-sans">
    
    {initialPageLoad ? (
      /* ---------------------------------------------------- */
      /* STAGE 1: SELECT EVENT SELECTION SCREEN               */
      /* ---------------------------------------------------- */
      <div className="max-w-xl mx-auto mt-10 bg-white border border-white/10 rounded-xl p-8 shadow-2xl flex flex-col items-center gap-6 text-center">
        <div className="p-3 rounded-2xl bg-forestGreen/10 border border-gold/30 text-gold shadow-md">
          <Edit3 className="w-8 h-8 text-gold" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-forestGreen tracking-tight">
            {t.selectTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-950">
            {isRtl ? 'اختر الرحلة التي تود تعديل بياناتها من القائمة أدناه' : 'Select an active listing to modify its specifications'}
          </p>
        </div>

        <select 
          value={tourId} 
          onChange={(e) => setTourId(e.target.value)}
          required
          className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all cursor-pointer"
        >
          <option value="" disabled>{t.selectPrompt}</option>
          {allEvents.map((event) => (
            <option key={event.id} value={event.id} className="bg-white text-forestGreen">
              {typeof event.title === 'object' ? event.title[isRtl ? 'ar' : 'en'] : event.title}
            </option>
          ))}
        </select>

        <button 
          onClick={openEditingForm}
          className="w-full py-3.5 rounded-full bg-forestGreen text-white font-bold text-xs uppercase tracking-wider border border-forestGreen hover:bg-white hover:text-forestGreen transition-all duration-300 shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <Edit3 className="w-4 h-4 text-gold group-hover:text-slate-950" />
          <span>{t.editBtn}</span>
        </button>
      </div>

    ) : (

      /* ---------------------------------------------------- */
      /* STAGE 2: EDITING FORM SCREEN                         */
      /* ---------------------------------------------------- */
      <div className="flex flex-col justify-center md:items-start items-center md:flex-row gap-7 w-full bg-amber-00">

        <div className="md:w-1/2 mx-auto bg-white border border-forestGreen rounded-2xl p-6 sm:p-10 shadow-2xl">
      
          <div className="mb-8 border-b border-forestGreen/50 pb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-forestGreen tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <span>{t.formHeader}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {/* {t.formSubtitle} */}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            
            {/* Title (English) */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Type className="w-4 h-4 text-gold" />
                <span>{t.titleLabel} (English)</span>
              </label>
              <Input 
                value={formData.eventTitle || ''} 
                name='eventTitle' 
                onChange={handleChange}
                placeholder="Event Title (EN)"
                className="w-full bg-gold/80 border border-white/10 px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:border-gold transition-all"
              />
            </div>

            {/* Title (Arabic) */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Type className="w-4 h-4 text-gold" />
                <span>{t.titleLabel} (العربية)</span>
              </label>
              <Input 
                value={formData.eventTitleAr || ''} 
                name='eventTitleAr' 
                onChange={handleChange}
                placeholder="عنوان الفعالية (AR)"
                dir="rtl"
                className="w-full bg-gold/80 border border-white/10 px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:border-gold transition-all text-right"
              />
            </div>

            {/* Description (English) */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <FileText className="w-4 h-4 text-gold" />
                <span>{t.descLabel} (English)</span>
              </label>
              <textarea 
                value={formData.eventDescription || ''} 
                name='eventDescription' 
                onChange={handleChange}
                placeholder="Event Description (EN)" 
                className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl h-32 text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all resize-none"
              />
            </div>

            {/* Description (Arabic) */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <FileText className="w-4 h-4 text-gold" />
                <span>{t.descLabel} (العربية)</span>
              </label>
              <textarea 
                value={formData.eventDescriptionAr || ''} 
                name='eventDescriptionAr' 
                onChange={handleChange}
                placeholder="وصف الفعالية (AR)" 
                dir="rtl"
                className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl h-32 text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all resize-none text-right"
              />
            </div>

            {/* Date & Time Picker */}
            <div className='flex gap-3'>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>
                    {isRtl ? 'تاريخ بداية الرحلة' : 'Tour Start Date'}
                  </span>
                </label>
                <DatePicker 
                  selected={startDate} 
                  onChange={(date) => setStartDate(date)}  
                  showTimeSelect 
                  withPortal 
                  dateFormat="Pp"
                  className="w-full sm:w-72 bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>{t.dateLabel}</span>
                </label>
                <DatePicker 
                  selected={endDate} 
                  onChange={(date) => setEndDate(date)}  
                  showTimeSelect 
                  withPortal 
                  dateFormat="Pp"
                  className="w-full sm:w-72 bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>

            </div>

            <div className='flex flex-row gap-4 w-full '>
              {/* Location (English) */}
              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>{t.locationLabel} (English)</span>
                </label>
                <Input 
                  name='eventLocation' 
                  value={formData.eventLocation || ''} 
                  onChange={handleChange} 
                  placeholder="Location (EN)"
                  className="w-full bg-gold/80 border border-white/10 px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>

            {/* Location (Arabic) */}
              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>{t.locationLabel} (العربية)</span>
                </label>
                <Input 
                  name='eventLocationAr' 
                  value={formData.eventLocationAr || ''} 
                  onChange={handleChange} 
                  placeholder="موقع الفعالية (AR)"
                  dir="rtl"
                  className="w-full bg-gold/80 border border-white/10 px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:border-gold transition-all text-right"
                />
              </div>
            </div>

            {/* Current Image Preview */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-forestGreen block">
                {t.currentImage}
              </label>
              {imagePreview && (
                <div className="relative w-full max-w-sm h-50 rounded-xl overflow-hidden shadow-lg bg-slate-800">
                  <img src={imagePreview} alt="Current Event Cover" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Upload New Image */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Upload className="w-4 h-4 text-gold" />
                <span>{t.newImage}</span>
              </label>
              <input 
                type="file" 
                accept='image/*' 
                onChange={handelImageFile}
                className="w-full bg-white p-2 border border-forestGreen/40 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-forestGreen file:text-white hover:file:bg-gold hover:file:text-slate-950 file:transition-all text-slate-400 text-xs rounded-xl cursor-pointer"
              />
            </div>

            {/* Gallery Images */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Gallery Images</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {existingGalleryUrls.map((url, idx) => (
                  <div key={`existing-${idx}`} className="relative h-24 rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
                    <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeExistingGalleryImage(idx)}
                      className="absolute top-1.5 right-1.5 bg-red-600 text-white p-1 rounded-full text-xs shadow-md cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {newGalleryPreviews.map((preview, idx) => (
                  <div key={`new-${idx}`} className="relative h-24 rounded-xl overflow-hidden border border-amber-500 shadow-sm group">
                    <img src={preview} alt="New Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeNewGalleryImage(idx)}
                      className="absolute top-1.5 right-1.5 bg-red-600 text-white p-1 rounded-full text-xs shadow-md cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <label className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl p-4 flex items-center justify-center cursor-pointer bg-slate-50 transition-all w-full">
                <Upload className="w-4 h-4 text-slate-600 mr-2" />
                <span className="text-xs font-bold text-slate-700">Add More Gallery Images</span>
                <input type="file" accept="image/*" multiple onChange={handleGalleryImages} className="hidden" />
              </label>
            </div>

            <div className='grid grid-cols-2 gap-4 w-full'>
              {/* packages */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <UserRound className="w-4 h-4 text-gold" />
                  <span>{isRtl ? ' الحجز المبكر' : 'Early Birds'}</span>
                </label>
                <input 
                  type="number" 
                  name="earlyBirds" 
                  value={formData.earlyBirds} 
                  onChange={handleChange}
                  placeholder="500"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <UserRound className="w-4 h-4 text-gold" />
                  <span>{isRtl ? ' الحجز المتأخر' : 'Late Booking'}</span>
                </label>
                <input 
                  type="number" 
                  name="lateBooking" 
                  value={formData.lateBooking} 
                  onChange={handleChange}
                  placeholder="500"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Ticket className="w-4 h-4 text-gold" />
                  <span>
                    {isRtl ? 'العوائل او الكبلز' : 'Family / Couples'}
                  </span>
                </label>
                <input 
                  type="number" 
                  name="familyCouples" 
                  value={formData.familyCouples} 
                  onChange={handleChange}
                  placeholder="500"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Ticket className="w-4 h-4 text-gold" />
                  <span>{t.totalTickets}</span>
                </label>
                <input 
                  type="number" 
                  name="privateBooking" 
                  value={formData.privateBooking} 
                  onChange={handleChange}
                  placeholder="500"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all" 
                />
              </div>
            </div>

             {/* Package Inclusions Card (6-12 items) */}
              <div className="bg-white border-white/0 rounded-2xl p-6 sm:p-8 space-y-5">
    
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

                  <div className="flex gap-2 bg-amber-00">
                    
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
                    <span>
                      {isRtl ? 'أضف' : 'Add'}
                    </span>
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

            {/* Ticket Prices Box */}
            <div className="p-5 rounded-2xl bg-gold/80 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-forestGreen">
                {t.pricingLabel}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-white font-semibold">{t.vipPrice}</label>
                  <input 
                    type="number" 
                    name="vipPrice" 
                    value={formData.vipPrice || ''} 
                    onChange={handleChange}
                    placeholder="5000" 
                    className="w-full bg-white border border-forestGreen/40 px-4 py-2.5 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-white font-semibold">{t.regularPrice}</label>
                  <input 
                    type="number" 
                    name="regularPrice" 
                    value={formData.regularPrice || ''} 
                    onChange={handleChange}
                    placeholder="2000" 
                    className="w-full bg-white border border-white/10 px-4 py-2.5 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all" 
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              <button 
                type="button"
                onClick={openConfirmationModel}
                className="flex-1 py-3.5 rounded-full bg-forestGreen text-white font-bold text-xs uppercase tracking-wider border border-forestGreen hover:bg-white hover:text-forestGreen transition-all duration-300 shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-gold group-hover:text-slate-950" />
                <span>{t.submitBtn}</span>
              </button>

              <button 
                type="button"
                onClick={openConfirmDeleteModal}
                className="py-3.5 px-6 rounded-full bg-red-950/80 text-red-400 font-bold text-xs uppercase tracking-wider border border-red-800/40 hover:bg-red-700 hover:text-white transition-all duration-300 shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.deleteBtn}</span>
              </button>
            </div>

          </form>

        </div>

          {/* Live Preview Card */}
        <div className="space-y-4 md:w-1/2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Live Event Preview Card</span>
          </h3>

          <div 
            className="rounded-2xl border border-forestGreen/30 bg-white shadow-xl overflow-hidden transition-all"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Cover Image */}
            <div className="relative w-full h-75 bg-slate-800">
              {imagePreview ? (
                <img src={imagePreview} alt="Event Cover Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-mono">
                  No Image Uploaded
                </div>
              )}
              <div className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} bg-forestGreen text-white font-mono text-xs px-2.5 py-1 rounded-full shadow-md`}>
                {formData.totalTickets || 0} Tickets
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-4">
              
              {/* Dynamic Content based on isRtl */}
              <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 inline-block">
                  {isRtl ? 'عرض اللغة العربية' : 'English View'}
                </span>
                
                <h4 className="text-xl font-bold text-slate-900">
                  {isRtl 
                    ? (formData.eventTitleAr || 'عنوان الفعالية بالعربية') 
                    : (formData.eventTitle || 'Event Title (English)')}
                </h4>
                
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {isRtl 
                    ? (formData.eventDescriptionAr || 'سيظهر وصف الفعالية هنا...') 
                    : (formData.eventDescription || 'Event description will appear here...')}
                </p>

                <p className={`text-xs font-semibold text-slate-700 flex items-center gap-1 pt-1 ${isRtl ? 'justify-end' : 'justify-start'}`}>
                  <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>
                    {isRtl 
                      ? (formData.eventLocationAr || 'موقع الفعالية بالعربية') 
                      : (formData.eventLocation || 'Event Location (English)')}
                  </span>
                </p>
              </div>

              <hr className="border-slate-100" />

              {/* Pricing & Date Footer */}

             

              <div className="flex items-center justify-between pt-2">

                <div className="space-y-0.5 font-mono text-xs">
                  <div className="text-slate-500">Regular: <span className="text-forestGreen font-bold">₦{formatNumber(formData.regularPrice) || 0}</span></div>
                  <div className="text-slate-500">VIP: <span className="text-gold font-bold">₦{formatNumber(formData.vipPrice) || 0}</span></div>
                </div>

                <div className={`font-mono text-xs text-slate-500 ${isRtl ? 'text-left' : 'text-right'}`}>
                  <div>{formatEventDate(eventDate)}</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


    )}

    


    {/* ---------------------------------------------------- */}
    {/* UPDATE CONFIRMATION MODAL                            */}
    {/* ---------------------------------------------------- */}
    {isConfirmationModel && (
      <AnimatePresence>
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm'>
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="bg-slate-900 border border-gold/40 w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-6 text-center"
          >
            <div className="p-3 rounded-2xl bg-forestGreen/20 border border-gold/30 text-gold shadow-md">
              <Sparkles className="w-6 h-6 text-gold" />
            </div>

            <h2 className="text-base font-bold text-white">
              {t.confirmUpdateTitle}
            </h2>

            <div className="flex items-center gap-4 w-full">
              <button 
                type="button"
                onClick={updateEvent}
                className="flex-1 py-3 rounded-xl bg-forestGreen text-white font-bold text-xs uppercase tracking-wider border border-gold/30 hover:bg-gold hover:text-slate-950 transition-all cursor-pointer shadow-md"
              >
                {t.confirmBtn}
              </button>
              <button 
                type="button"
                onClick={closeModal}
                className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 border border-white/10 hover:bg-slate-700 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                {t.cancelBtn}
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    )}

    {/* ---------------------------------------------------- */}
    {/* DELETE CONFIRMATION MODAL                            */}
    {/* ---------------------------------------------------- */}
    {confirmDelete && (
      <AnimatePresence>
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm'>
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="bg-slate-900 border border-red-500/40 w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-6 text-center"
          >
            <div className="p-3 rounded-2xl bg-red-950/80 border border-red-800/40 text-red-400 shadow-md">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>

            <h2 className="text-base font-bold text-white">
              {t.confirmDeleteTitle}
            </h2>

            <div className="flex items-center gap-4 w-full">
              <button 
                type="button"
                onClick={deleteEvent}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-500 transition-all cursor-pointer shadow-md"
              >
                {t.confirmBtn}
              </button>
              <button 
                type="button"
                onClick={closeConfirmDeleteModal}
                className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 border border-white/10 hover:bg-slate-700 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                {t.cancelBtn}
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    )}

  </div>
  )
}