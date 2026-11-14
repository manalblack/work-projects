import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import MiniLoading from '../../../components/admin-components/MiniLoading';
import Input from "../../../components/Input";
import { 
  Search, 
  User, 
  Mail, 
  Ticket, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Calendar,
  ShieldCheck,
  Clock 
} from 'lucide-react';

export default function FindTicketArea() {
  const { isRtl } = useOutletContext() || { isRtl: false }; // Pull language state from parent Dashboard outlet

  const [ticketInfo, setTicketInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Bilingual UI Dictionary
  const t = {
    title: isRtl ? 'البحث عن التذاكر' : 'Ticket Search',
    subtitle: isRtl ? 'التحقق من تذاكر العملاء وحالتها باستخدام الاسم أو البريد الإلكتروني' : 'Look up customer passes, verification status, and details',
    inputPlaceholder: isRtl ? 'أدخل اسم العميل أو البريد الإلكتروني...' : 'Enter customer name or email...',
    searchBtn: isRtl ? 'بحث عن التذكرة' : 'Search Ticket',
    searchingBtn: isRtl ? 'جاري البحث...' : 'Searching...',
    noResults: isRtl ? 'لم يتم العثور على تذاكر مطابقة لبيانات البحث' : 'No tickets found matching your query.',
    customerName: isRtl ? 'اسم العميل' : 'Customer Name',
    eventName: isRtl ? 'اسم الفعالية' : 'Event Name',
    customerEmail: isRtl ? 'البريد الإلكتروني' : 'Customer Email',
    status: isRtl ? 'حالة التذكرة' : 'Ticket Status',
    scanned: isRtl ? 'تم المسح (Scanned)' : 'Ticket Scanned',
    notScanned: isRtl ? 'لم تُمسح بعد (Not Scanned)' : 'Not Scanned',
    type: isRtl ? 'فئة التذكرة' : 'Ticket Type',
    resultsHeader: isRtl ? 'نتائج البحث' : 'Search Results',
  };

  const handelTicketSearch = async (e) => {
    e?.preventDefault();

    if (!searchQuery.trim()) {
      toast.error(isRtl ? 'يرجى إدخال كلمة البحث' : 'Please enter a search query');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/admin/find-ticket`, {
        params: { query: searchQuery }
      });
      setTicketInfo(response.data || []);
    } catch (error) {
      console.error('Error searching tickets:', error);
      toast.error(isRtl ? 'حدث خطأ أثناء البحث عن التذكرة' : 'Failed to search tickets');
    } finally {
      setLoading(false);
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
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ---------------------------------------------------- */}
        {/* SEARCH FORM CONTAINER                                */}
        {/* ---------------------------------------------------- */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handelTicketSearch} className="space-y-6">
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Search className="w-4 h-4 text-gold" />
                <span>{isRtl ? 'كلمة البحث' : 'Customer Identifier'}</span>
              </label>
              
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.inputPlaceholder}
                required
                className="w-full bg-white border border-forestGreen px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 rounded-full bg-forestGreen text-white font-bold text-xs uppercase tracking-wider border border-forestGreen hover:bg-white hover:text-forestGreen transition-all duration-300 shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-gold group-hover:text-slate-950" />
              <span>{t.searchBtn}</span>
            </button>

          </form>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SEARCH RESULTS CONTAINER                             */}
        {/* ---------------------------------------------------- */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 px-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Ticket className="w-4 h-4 text-gold" />
              <span>{t.resultsHeader} ({ticketInfo.length})</span>
            </h3>
          </div>

          {ticketInfo.length === 0 ? (
            <div className="bg-slate-900 border border-white/5 rounded-2xl p-8 text-center text-slate-400 text-sm">
              {t.noResults}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
              {ticketInfo.map((ticket) => {
                const isScanned = ticket.is_scanned;

                return (
                  <div 
                    key={ticket.id} 
                    className="bg-white border border-white/10 hover:border-gold/40 transition-all rounded-2xl p-6 shadow-xl flex flex-col gap-4"
                  >
                    
                    {/* Top Row: Customer Name & Status Badge */}
                    <div className="flex items-center justify-between gap-2 border-b border-forestGreen/50 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-forestGreen/20 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-950">{t.customerName}</span>
                          <h4 className="text-base font-extrabold text-forestGreen">{ticket.customer_name}</h4>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md ${
                        isScanned 
                          ? 'bg-forestGreen/90 text-white border border-gold/40' 
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {isScanned ? <CheckCircle2 className="w-3.5 h-3.5 text-gold" /> : <Clock className="w-3.5 h-3.5" />}
                        <span>{isScanned ? t.scanned : t.notScanned}</span>
                      </span>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      
                      {/* Event Name */}
                      <div className="p-3 rounded-xl bg-gold/80 border border-white/5 space-y-1">
                        <span className="text-white uppercase font-semibold text-[10px]">{t.eventName}</span>
                        <p className="font-bold text-forestGreen truncate">{ticket.event_name}</p>
                      </div>

                      {/* Customer Email */}
                      <div className="p-3 rounded-xl bg-gold/80 border border-white/5 space-y-1">
                        <span className="text-white uppercase font-semibold text-[10px]">{t.customerEmail}</span>
                        <p className="font-bold text-forestGreen truncate" dir="ltr">{ticket.customer_email}</p>
                      </div>

                      {/* Ticket Type */}
                      <div className="p-3 rounded-xl bg-gold/80 border border-white/5 space-y-1 sm:col-span-2 flex items-center justify-between">
                        <div>
                          <span className="text-white uppercase font-semibold text-[10px]">{t.type}</span>
                          <p className="font-extrabold text-forestGreen uppercase tracking-wider">{ticket.type}</p>
                        </div>
                        <Ticket className="w-5 h-5 text-slate-900" />
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}