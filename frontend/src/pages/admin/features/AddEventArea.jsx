import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { supabase } from "../../../supabaseConnection";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import MiniLoading from "../../../components/admin-components/MiniLoading";
import { 
  Calendar, 
  MapPin, 
  Ticket, 
  Upload, 
  Sparkles, 
  DollarSign, 
  FileText, 
  Type,
  CheckCircle2 
} from "lucide-react";

export default function AddEventArea() {
  const { isRtl } = useOutletContext(); // Pull language state from parent Dashboard outlet

  const [loading, setLoading] = useState(false);
  const [eventTime, setEventTime] = useState(null);
  const [eventData, setEventData] = useState({
    eventTitle: '',
    eventDescription: '',
    eventLocation: '',
    totalTickets: 0,
    vipPrice: 0,
    regularPrice: 0
  });
  const [eventDate, setEventDate] = useState(new Date());
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Bilingual UI dictionary
  const t = {
    addEventTitle: isRtl ? 'إضافة فعالية جديدة' : 'Add New Event',
    subtitle: isRtl ? 'قم بإنشاء فعالية جديدة ونشرها فوراً على المنصة' : 'Create and publish a new sovereign event listing',
    titleLabel: isRtl ? 'عنوان الفعالية' : 'Event Title',
    descLabel: isRtl ? 'وصف الفعالية' : 'Event Description',
    dateLabel: isRtl ? 'تاريخ ووقت الفعالية' : 'Event Date & Time',
    locationLabel: isRtl ? 'الموقع / القاعة' : 'Venue / Location',
    imageLabel: isRtl ? 'صورة الغلاف' : 'Event Cover Image',
    uploadPrompt: isRtl ? 'اختر صورة الفعالية' : 'Choose Cover Image',
    ticketsLabel: isRtl ? 'إجمالي التذاكر' : 'Total Tickets',
    pricingLabel: isRtl ? 'فئات الأسعار' : 'Ticket Pricing',
    vipPrice: isRtl ? 'سعر الـ VIP' : 'VIP Price',
    regularPrice: isRtl ? 'السعر العادي' : 'Regular Price',
    submitBtn: isRtl ? 'حفظ ونشر الفعالية' : 'Publish Event',
    previewTitle: isRtl ? 'معاينة بطاقة الفعالية' : 'Event Card Preview',
    aboutEvent: isRtl ? 'عن الفعالية' : 'About Event',
    buyTicket: isRtl ? 'احجز تذكرة' : 'Buy Ticket',
  };

  const handelFormChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handelImageFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const addEventToDb = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedDate = eventDate.toISOString().split('T')[0];
    const formattedTime = eventDate.toTimeString([], {
      hour: 'numeric',
      minutes: '2-digit',
      hour12: true 
    }).split(' ')[0];

    setEventTime(formattedTime);
     
    try {
      const fileName = `eventImage-${Date.now()}-${imageFile.name}`;
      
      const { data, error } = await supabase.storage.from('events_images').upload(fileName, imageFile);
      if (error) throw error;

      const { data: uploadedImage } = supabase.storage.from('events_images').getPublicUrl(fileName);
      
      const newEvent = {
        title: eventData.eventTitle,
        description: eventData.eventDescription,
        location: eventData.eventLocation,
        totalTickets: eventData.totalTickets,
        vipPrice: eventData.vipPrice,
        regularPrice: eventData.regularPrice,
        time: formattedTime,
        date: formattedDate,
        image: uploadedImage.publicUrl,
      };

      const response = await axios.post(`${API_URL}/admin/add-events`, newEvent);

      if (response.data.message === 'SUCCESS') {
        toast.success(isRtl ? "تم إضافة الفعالية بنجاح!" : "Event added to database successfully!", {
          duration: 6000,
          position: 'top-center',
        });
      }

      setEventData({
        eventTitle: '',
        eventDescription: '',
        eventLocation: '',
        totalTickets: 0,
        vipPrice: 0,
        regularPrice: 0
      });
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error('Error when trying to add event to db', error);
      toast.error(isRtl ? "حدث خطأ أثناء إضافة الفعالية" : "Failed to add event.");
    } finally {
      setLoading(false);
    }
  };

  const formatDatePreview = (date) => {
    if (!date) return "Select Date";
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTimePreview = (date) => {
    if (!date) return "Select Time";
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatPrice = (price, currencySymbol = '') => {
    if (price === null || price === undefined || price === '') return '0';
    
    // Convert to number and remove non-numeric characters if passed as string
    const numericPrice = Number(String(price).replace(/[^0-9.-]+/g, ''));

    if (isNaN(numericPrice)) return '0';

    // Format with commas using built-in Intl.NumberFormat
    const formatted = new Intl.NumberFormat('en-US').format(numericPrice);

    // return currencySymbol ? `${formatted}` : formatted;

    return formatted;

};



  if (loading) {
    return <MiniLoading />;
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="w-full pb-12 text-slate-100">
      
      {/* Header Title */}
      <div className="mb-8 px-2">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-gold" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.addEventTitle}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ---------------------------------------------------- */}
        {/* LEFT COLUMN: EVENT CREATION FORM                     */}
        {/* ---------------------------------------------------- */}
        <div className="lg:col-span-7 bg-white border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={addEventToDb} className="space-y-6">
            
            {/* Title Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Type className="w-4 h-4 text-gold" />
                <span>{t.titleLabel}</span>
              </label>
              <input 
                type="text" 
                name="eventTitle" 
                value={eventData.eventTitle} 
                onChange={handelFormChange}
                required
                placeholder={isRtl ? 'أدخل عنوان الفعالية' : 'e.g., Sovereign Gala Night'}
                className="w-full bg-white border border-forestGreen/50 px-4 py-3 rounded-md text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
              />
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <FileText className="w-4 h-4 text-gold" />
                <span>{t.descLabel}</span>
              </label>
              <textarea 
                name="eventDescription" 
                value={eventData.eventDescription} 
                onChange={handelFormChange}
                required
                placeholder={isRtl ? 'اكتب وصفاً تفصيلياً للفعالية...' : 'Write an extraordinary event description...'}
                className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-md h-32 text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all resize-none" 
              />
            </div>

            {/* Date & Time Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>{t.dateLabel}</span>
                </label>
                <div className="relative">
                  <DatePicker 
                    selected={eventDate} 
                    onChange={(date) => setEventDate(date)}  
                    showTimeSelect 
                    withPortal 
                    dateFormat="Pp"
                    className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                  />
                </div>
              </div>

              {/* Location Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>{t.locationLabel}</span>
                </label>
                <input 
                  type="text" 
                  name="eventLocation" 
                  value={eventData.eventLocation} 
                  onChange={handelFormChange}
                  required
                  placeholder={isRtl ? 'الرياض، المملكة العربية السعودية' : 'e.g., Riyadh Ballroom'}
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>
            </div>

            {/* Image File Upload */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Upload className="w-4 h-4 text-gold" />
                <span>{t.imageLabel}</span>
              </label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handelImageFile} 
                required
                className="w-3/4 bg-white border border-forestGreen/40 py-2 px-3 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-forestGreen file:text-white hover:file:bg-gold hover:file:text-slate-950 file:transition-all text-slate-400 text-xs rounded-xl cursor-pointer"
              />
            </div>

            {/* Total Tickets & Pricing Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Ticket className="w-3.5 h-3.5 text-gold" />
                  <span>{t.ticketsLabel}</span>
                </label>
                <input 
                  type="number" 
                  name="totalTickets" 
                  value={eventData.totalTickets === 0 ? '' : eventData.totalTickets} 
                  onChange={handelFormChange}
                  required
                  placeholder="500"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-2.5 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <DollarSign className="w-3.5 h-3.5 text-forestGreen" />
                  <span>{t.regularPrice}</span>
                </label>
                <input 
                  type="number" 
                  name="regularPrice" 
                  value={eventData.regularPrice === 0 ? '' : eventData.regularPrice} 
                  onChange={handelFormChange}
                  required
                  placeholder="2000"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-2.5 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>{t.vipPrice}</span>
                </label>
                <input 
                  type="number" 
                  name="vipPrice" 
                  value={eventData.vipPrice === 0 ? '' : eventData.vipPrice} 
                  onChange={handelFormChange}
                  required
                  placeholder="7000"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-2.5 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full py-3.5 rounded-full bg-forestGreen text-white font-bold text-xs uppercase tracking-wider border border-forestGreen hover:bg-white hover:text-forestGreen transition-all duration-300 shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <CheckCircle2 className="w-4 h-4 text-gold group-hover:text-slate-950" />
              <span>{t.submitBtn}</span>
            </button>

          </form>
        </div>

        {/* ---------------------------------------------------- */}
        {/* RIGHT COLUMN: LIVE TICKET CARD PREVIEW               */}
        {/* ---------------------------------------------------- */}
        <div className="lg:col-span-5 flex flex-col items-center sticky top-24">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold mb-4">
            {t.previewTitle}
          </h3>

          <div className="w-full max-w-md bg-white border border-gold/30 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col gap-4">
            
            {/* Preview Image Box */}
            <div className="relative md:h-70 h-85 bg-gold/40 rounded-xl overflow-hidden border border-white/10">
              {imageFile && imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-700 gap-2">
                  <Upload className="w-8 h-8 opacity-40" />
                  <span className="text-xs font-semibold">{t.uploadPrompt}</span>
                </div>
              )}
            </div>

            {/* Preview Content */}
            <div className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-950 truncate">
                {eventData.eventTitle || (isRtl ? 'عنوان الفعالية هنا' : 'Event Title Preview')}
              </h2>
              
              <p className="text-xs text-forestGreen line-clamp-2 leading-relaxed">
                {eventData.eventDescription || (isRtl ? 'سيظهر وصف الفعالية هنا بالتفصيل...' : 'Event description will appear here as you type...')}
              </p>

              {/* Pricing & Date Info Panel */}
              <div className="p-3 rounded-xl bg-white border border-forestGreen/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-forestGreen">{t.regularPrice}:</span>
                  <span className="font-extrabold text-gold">
                    {/* ₦{eventData.regularPrice || '0'} */}
                    ₦{formatPrice(eventData.regularPrice)}
                </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-forestGreen">{t.vipPrice}:</span>
                  <span className="font-extrabold text-gold">
                    {/* ₦{eventData.vipPrice || '0'} */}
                    ₦{formatPrice(eventData.vipPrice)}
                </span>
                </div>
                <div className="pt-2 border-t border-forestGreen/50 flex flex-col gap-1 text-forestGreen">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{formatDatePreview(eventDate)} at {formatTimePreview(eventDate)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span className="truncate">{eventData.eventLocation || (isRtl ? 'الموقع' : 'Venue Location')}</span>
                  </div>
                </div>
              </div>

              {/* Simulated Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="py-2.5 text-center rounded-full bg-forestGreen text-white font-bold text-xs border border-forestGreen hover:bg-white hover:text-forestGreen transition-all duration-300 ease-in-out">
                  {t.aboutEvent}
                </div>
                <div className="py-2.5 text-center rounded-full bg-forestGreen text-white font-bold text-xs border border-forestGreen hover:bg-white hover:text-forestGreen transition-all duration-300 ease-in-out">
                  {t.buyTicket}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}