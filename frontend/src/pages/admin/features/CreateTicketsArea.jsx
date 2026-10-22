import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import MiniLoading from '../../../components/admin-components/MiniLoading';
import { 
  Tickets, 
  Users, 
  Hash, 
  Ticket, 
  Calendar, 
  Sparkles, 
  Copy, 
  Download, 
  ExternalLink, 
  CheckCircle2 
} from 'lucide-react';

export default function CreateTicketsArea() {
  const { isRtl } = useOutletContext() || { isRtl: false }; // Pull language state from parent Dashboard outlet

  const [events, setEvents] = useState([]);
  const [bulkData, setBulkData] = useState({
    eventId: '',
    ticketType: 'regular',
    groupName: '',
    quantity: 5
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTickets, setGeneratedTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Bilingual UI Dictionary
  const t = {
    title: isRtl ? 'إنشاء تذاكر متعددة (بالدفعة)' : 'Bulk Ticket Generation',
    subtitle: isRtl ? 'إصدار مجموعة تذاكر دفعة واحدة للمجموعات وكبار الضيوف' : 'Issue batch sovereign tickets for groups, sponsors, and guest lists',
    prefixLabel: isRtl ? 'اسم المجموعة / البادئة' : 'Name / Group Prefix',
    prefixPlaceholder: isRtl ? 'مثال: ضيوف VIP' : 'e.g. VIP Guest',
    quantityLabel: isRtl ? 'الكمية المطلوب إصدارها' : 'Quantity',
    typeLabel: isRtl ? 'فئة التذاكر' : 'Ticket Category',
    vipOption: isRtl ? 'كبار الشخصيات (VIP Pass)' : 'VIP Sovereign Pass',
    regularOption: isRtl ? 'التذكرة العادية (Standard Pass)' : 'Standard Pass',
    eventLabel: isRtl ? 'اختر الفعالية' : 'Select Event',
    selectEventPrompt: isRtl ? 'اختر الفعالية المناسبة' : 'Select an active event',
    generateBtn: isRtl ? 'إنشاء وتوليد التذاكر' : 'Generate Bulk Tickets',
    generatingBtn: isRtl ? 'جاري التوليد...' : 'Generating Tickets...',
    generatedHeader: isRtl ? 'التذاكر المصدرة' : 'Generated Passes',
    copyLink: isRtl ? 'نسخ الرابط' : 'Copy Link',
    openPdf: isRtl ? 'فتح الملف' : 'Open PDF',
    downloadPdf: isRtl ? 'تحميل التذكرة' : 'Download Ticket',
    fillFormError: isRtl ? 'يرجى اختيار الفعالية وإدخال اسم المجموعة والكمية' : 'Please select an event, group prefix, and a valid quantity',
    createdSuccess: isRtl ? 'تم إنشاء التذاكر المتعددة بنجاح!' : 'Bulk Tickets Generated Successfully!',
    copiedSuccess: isRtl ? 'تم نسخ رابط التذكرة إلى الحافظة' : 'Ticket link copied to clipboard!',
    downloadError: isRtl ? 'فشل تحميل التذكرة' : 'Download failed, opening in new tab',
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBulkData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();

    if (!bulkData.eventId || !bulkData.groupName || bulkData.quantity < 1) {
      toast.error(t.fillFormError);
      return;
    }

    setLoading(true);
    setIsGenerating(true);
    setGeneratedTickets([]);

    try {
      const response = await axios.post(`${API_URL}/admin/create-bulk-tickets`, {
        bulkInfo: bulkData
      });

      if (response.data.tickets) {
        setGeneratedTickets(response.data.tickets);
        toast.success(t.createdSuccess);
      }
    } catch (error) {
      console.error('Bulk Ticket Error:', error);
      toast.error(isRtl ? 'حدث خطأ أثناء توليد التذاكر' : 'Failed to generate bulk tickets');
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast.success(t.copiedSuccess);
  };

  const handleDirectDownload = async (pdfUrl, fileName) => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName || 'ticket.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download error:', error);
      toast.error(t.downloadError);
      window.open(pdfUrl, '_blank');
    }
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
        <div className="lg:col-span-5 bg-white border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleBulkSubmit} className="space-y-6">
            
            {/* Group Name Prefix */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Users className="w-4 h-4 text-gold" />
                <span>{t.prefixLabel}</span>
              </label>
              <input 
                type="text"
                name="groupName"
                value={bulkData.groupName}
                onChange={handleFormChange}
                placeholder={t.prefixPlaceholder}
                required
                className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
              />
            </div>

            {/* Quantity Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Hash className="w-4 h-4 text-gold" />
                <span>{t.quantityLabel}</span>
              </label>
              <input 
                type="number"
                name="quantity"
                value={bulkData.quantity}
                onChange={handleFormChange}
                min="1"
                max="100"
                required
                placeholder="10"
                className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
              />
            </div>

            {/* Ticket Category Select */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Ticket className="w-4 h-4 text-gold" />
                <span>{t.typeLabel}</span>
              </label>
              <select 
                name="ticketType" 
                value={bulkData.ticketType} 
                onChange={handleFormChange}
                className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all cursor-pointer"
              >
                <option value="vip" className="bg-white text-slate-950">{t.vipOption}</option>
                <option value="regular" className="bg-white text-slate-950">{t.regularOption}</option>
              </select>
            </div>

            {/* Event Select */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                <Calendar className="w-4 h-4 text-gold" />
                <span>{t.eventLabel}</span>
              </label>
              <select 
                name="eventId" 
                value={bulkData.eventId} 
                onChange={handleFormChange}
                required
                className="w-full bg-white border border-forestGreen px-4 py-3 rounded-xl text-slate-950 text-sm focus:outline-none focus:border-gold transition-all cursor-pointer"
              >
                <option value="" disabled>{t.selectEventPrompt}</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id} className="bg-white text-slate-950">
                    {typeof event.title === 'object' ? event.title[isRtl ? 'ar' : 'en'] : event.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Action Button */}
            <button 
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 rounded-full bg-forestGreen text-white font-bold text-xs uppercase tracking-wider border border-forestGreen hover:bg-white hover:text-forestGreen transition-all duration-300 shadow-xl active:scale-95 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
            >
              <CheckCircle2 className="w-4 h-4 text-gold group-hover:text-slate-950" />
              <span>{isGenerating ? t.generatingBtn : t.generateBtn}</span>
            </button>

          </form>
        </div>

        {/* ---------------------------------------------------- */}
        {/* GENERATED TICKETS PREVIEW GRID                       */}
        {/* ---------------------------------------------------- */}
        {generatedTickets.length > 0 && (
          <div className="bg-white rounded-xl p-3 py-8 lg:col-span-7 space-y-4 max-h-[95vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gold flex items-center gap-2">
                <Tickets className="w-4 h-4 text-gold" />
                <span>{t.generatedHeader} ({generatedTickets.length})</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {generatedTickets.map((ticket, index) => (
                <div 
                  key={index} 
                  className="bg-gold/40 border border-gold/70 rounded-2xl p-4 shadow-xl flex flex-col gap-3 hover:border-gold/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-forestGreen text-md flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-gold shrink-0" />
                      <span>{ticket.name}</span>
                    </span>
                  </div>

                  {/* Embedded Mini Iframe Preview */}
                  <div className="relative w-full h-80 bg-slate-950 rounded-xl overflow-hidden border border-white/5">
                    <iframe 
                      src={`${ticket.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                      title={`Ticket Preview ${index}`}
                      className="w-full h-full border-none pointer-events-none rounded-xl"
                    />
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-1 border-t border-white/5">
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(ticket.pdfUrl)}  
                      className="px-3 py-1.5 rounded-full bg-forestGreen text-white border border-forestGreen hover:bg-white hover:text-forestGreen font-bold text-xs transition-all duration-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-gold" />
                      <span>{t.copyLink}</span>
                    </button>

                    <a
                      href={ticket.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-full bg-forestGreen text-white border border-forestGreen hover:bg-white hover:text-forestGreen font-bold text-xs transition-all duration-300 flex items-center gap-1 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-gold" />
                      <span>{t.openPdf}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDirectDownload(ticket.pdfUrl, `${ticket.name}.pdf`)}
                      className="px-3 py-1.5 rounded-full bg-forestGreen text-white border border-gold/30 hover:bg-gold hover:text-white font-bold text-xs transition-all duration-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t.downloadPdf}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}