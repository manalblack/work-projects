import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import MiniLoading from "../../../components/admin-components/MiniLoading";
import { 
  Ticket, 
  Mail, 
  User, 
  Calendar, 
  Sparkles, 
  Copy, 
  Download, 
  CheckCircle2 
} from 'lucide-react';


export default function CreateTicketArea() {
  const { isRtl } = useOutletContext() || { isRtl: false }; // Pull language state from parent Dashboard outlet

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    ticketType: '',
    eventId: '',
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // Selected Event metadata
  const selectedEvent = events.find(e => e.id === selectedEventId);
  const eventName = selectedEvent ? (typeof selectedEvent.title === 'object' ? selectedEvent.title[isRtl ? 'ar' : 'en'] : selectedEvent.title) : '';

  // Dictionary for UI Translations
  const t = {
    title: isRtl ? 'إنشاء تذكرة' : 'Create Ticket',
    subtitle: isRtl ? 'إصدار تذكرة مخصصة للعميل ومعاينتها مباشرة' : 'Issue a sovereign ticket and generate a PDF preview',
    emailLabel: isRtl ? 'البريد الإلكتروني للعميل' : 'Customer Email Address',
    nameLabel: isRtl ? 'اسم العميل' : 'Customer Name',
    typeLabel: isRtl ? 'فئة التذكرة' : 'Ticket Category',
    selectTypePrompt: isRtl ? 'اختر فئة التذكرة' : 'Select ticket type',
    vipOption: isRtl ? 'كبار الشخصيات (VIP)' : 'VIP Pass',
    regularOption: isRtl ? 'التذكرة العادية (Standard)' : 'Standard Pass',
    eventLabel: isRtl ? 'اختر الفعالية' : 'Select Event',
    selectEventPrompt: isRtl ? 'اختر الفعالية المناسبة' : 'Select an active event',
    createBtn: isRtl ? 'إنشاء وإصدار التذكرة' : 'Issue Ticket',
    previewTitle: isRtl ? 'معاينة التذكرة (PDF)' : 'Generated Ticket PDF',
    copyBtn: isRtl ? 'نسخ الرابط' : 'Copy PDF Link',
    downloadBtn: isRtl ? 'تحميل التذكرة' : 'Download Ticket',
    fillFormError: isRtl ? 'يرجى ملء كافة حقول النموذج' : 'Please fill out all required fields in the form',
    ticketCreatedSuccess: isRtl ? 'تم إنشاء التذكرة بنجاح' : 'Ticket Created Successfully',
    downloadSuccess: isRtl ? 'تم تحميل التذكرة بنجاح' : 'Download completed!',
    downloadError: isRtl ? 'فشل تحميل ملف التذكرة' : 'Failed to download ticket PDF',
    copiedSuccess: isRtl ? 'تم نسخ الرابط إلى الحافظة' : 'Link copied to clipboard',
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/all-events`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error when fetching events: ', error);
      }
    };

    fetchEvents();
  }, [API_URL]);

  const handelFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handelTicketCreation = async (e) => {
    e.preventDefault();

    if (!formData.customerName || !formData.customerEmail || !selectedEventId || !formData.ticketType) {
      toast.error(t.fillFormError, { duration: 6000 });
      return;
    }

    setLoading(true);

    const newTicket = {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      type: formData.ticketType,
      eventId: selectedEventId,
      eventName: eventName
    };

    try {
      const response = await axios.post(`${API_URL}/admin/create-ticket`, { ticketInfo: newTicket });

      setPdfUrl(response.data);
      setLoading(false);
      setFormData({
        customerName: '',
        customerEmail: '',
        ticketType: '',
        eventId: '',
      });
      setSelectedEventId('');
      toast.success(t.ticketCreatedSuccess, { duration: 6000 });
    } catch (error) {
      console.error('Error when creating a ticket!: ', error);
      toast.error(isRtl ? 'حدث خطأ أثناء إنشاء التذكرة' : 'Error creating ticket');
      setLoading(false);
    }
  };

  const handleDirectDownload = async (url) => {
    if (!url) return;

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `Ticket-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      toast.success(t.downloadSuccess);
    } catch (error) {
      console.error('Download failed:', error);
      toast.error(t.downloadError);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pdfUrl);
    toast.success(t.copiedSuccess);
  };

  if (loading) {
    return <MiniLoading />;
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="w-full pb-12 text-slate-100 font-sans">
      
      {/* Header Title */}
      <div className="mb-8 px-2">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-gold" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.title}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          {/* {t.subtitle} */}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ---------------------------------------------------- */}
        {/* FORM CONTAINER                                       */}
        {/* ---------------------------------------------------- */}
        <div className="lg:col-span-6 bg-white border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handelTicketCreation} className="space-y-6">
            
            {/* Customer Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Mail className="w-4 h-4 text-gold" />
                <span>{t.emailLabel}</span>
              </label>
              <input 
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handelFormChange}
                placeholder="customer@domain.com"
                required
                dir="ltr"
                className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all text-left"
              />
            </div>

            {/* Customer Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <User className="w-4 h-4 text-gold" />
                <span>{t.nameLabel}</span>
              </label>
              <input 
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handelFormChange}
                placeholder={isRtl ? 'أدخل اسم العميل' : 'Full Name'}
                required
                className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
              />
            </div>

            {/* Ticket Type Select */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Ticket className="w-4 h-4 text-forestGreen" />
                <span>{t.typeLabel}</span>
              </label>
              <select 
                name="ticketType" 
                value={formData.ticketType} 
                onChange={handelFormChange}
                required
                className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all cursor-pointer"
              >
                <option value="" disabled>{t.selectTypePrompt}</option>
                <option value="vip" className="bg-white text-forestGreen">{t.vipOption}</option>
                <option value="regular" className="bg-white text-forestGreen">{t.regularOption}</option>
              </select>
            </div>

            {/* Event Select */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Calendar className="w-4 h-4 text-gold" />
                <span>{t.eventLabel}</span>
              </label>
              <select 
                name="eventId" 
                value={selectedEventId} 
                onChange={(e) => setSelectedEventId(e.target.value)}
                required
                className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all cursor-pointer"
              >
                <option value="" disabled>{t.selectEventPrompt}</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id} className="bg-white text-forestGreen">
                    {typeof event.title === 'object' ? event.title[isRtl ? 'ar' : 'en'] : event.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Action Button */}
            <button 
              type="submit"
              className="w-full py-3.5 rounded-full bg-forestGreen text-white font-bold text-xs uppercase tracking-wider border border-forestGreen hover:bg-white hover:text-forestGreen transition-all duration-300 shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2 mt-4 ease-in-out"
            >
              <CheckCircle2 className="w-4 h-4 text-gold group-hover:text-slate-950" />
              <span>{t.createBtn}</span>
            </button>

          </form>
        </div>

        {/* ---------------------------------------------------- */}
        {/* PDF PREVIEW & ACTIONS CONTAINER                      */}
        {/* ---------------------------------------------------- */}
        {pdfUrl && (
          <div className="lg:col-span-6 bg-white border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col items-center gap-5">
            
            <div className="w-full flex items-center justify-between pb-3 border-b border-forestGreen/50">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gold flex items-center gap-2">
                <Ticket className="w-4 h-4 text-gold" />
                <span>{t.previewTitle}</span>
              </h3>

              {/* Copy URL Button */}
              <button 
                type="button"
                onClick={copyToClipboard}
                className="px-3 py-1.5 rounded-full bg-white text-gold border border-gold/30 hover:bg-gold hover:text-slate-950 font-bold text-xs transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{t.copyBtn}</span>
              </button>
            </div>

            {/* Embedded PDF Viewer Frame */}
            <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-md overflow-hidden border border-white/10 shadow-inner">
              <iframe 
                src={pdfUrl} 
                title="Generated Ticket PDF"
                className="absolute inset-0 w-full h-full rounded-xl"
              />
            </div>

            {/* Direct Download Button */}
            <button
              type="button"
              onClick={() => handleDirectDownload(pdfUrl)}
              className="w-full py-3.5 rounded-full bg-forestGreen text-white font-bold text-xs uppercase tracking-wider border border-forestGreen hover:bg-white hover:text-forestGreen transition-all duration-300 shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-gold group-hover:text-slate-950" />
              <span>{t.downloadBtn}</span>
            </button>

          </div>
        )}

      </div>
    </div>
  );
}