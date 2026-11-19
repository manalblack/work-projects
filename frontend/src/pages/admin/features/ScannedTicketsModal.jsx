import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TicketCheck, TicketX, X } from 'lucide-react';
import Overlay from '../../../components/Overlay';

export default function ScannedTicketsModal({ eventId, isOpen, setScannedTickets, isRtl = false }) {
  const [loading, setLoading] = useState(false);
  const [numberOfScannedTickets, setNumberOfScannedTickets] = useState(0);
  const [error, setError] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!eventId || !isOpen) return;

    const getScannedTickets = async () => {
      setLoading(true);
      setError(false);
      setNumberOfScannedTickets(0); // Reset previous event count

      try {
        const response = await axios.get(`${API_URL}/admin/scanned-tickets/${eventId}`);
        const ticketsList = response.data?.ticketsData || [];

        setNumberOfScannedTickets(ticketsList.length);
      } catch (err) {
        console.error('Error when trying to fetch scanned tickets:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getScannedTickets();
  }, [eventId, isOpen, API_URL]);

  const closeModal = () => {
    setScannedTickets(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <Overlay closeOverlay={closeModal} />

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.45 }}
            className="relative bg-ghostWhite w-full max-w-md min-h-[260px] z-[999] flex flex-col justify-center items-center p-6 sm:p-8 rounded-2xl shadow-2xl border border-forestGreen/20 text-slate-900"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {loading ? (
              <div className="flex flex-col justify-center items-center gap-4 text-center">
                <AiOutlineLoading3Quarters className="size-12 text-gold animate-spin" />
                <p className="text-sm font-semibold text-forestGreen">
                  {isRtl ? 'جاري تحميل التذاكر الممسوحة...' : 'Loading scanned tickets...'}
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col justify-center items-center gap-3 text-center">
                <p className="text-base font-bold text-red-600">
                  {isRtl ? 'تعذر تحميل بيانات التذاكر' : 'Failed to load scanned tickets'}
                </p>
                <p className="text-xs text-slate-500">
                  {isRtl ? 'يرجى المحاولة مرة أخرى لاحقاً.' : 'Please try again in a moment.'}
                </p>
              </div>
            ) : numberOfScannedTickets === 0 ? (
              <div className="flex flex-col justify-center items-center gap-3 text-center">
                <div className="p-3.5 rounded-full bg-slate-200/70 text-slate-500">
                  <TicketX className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  {isRtl ? 'لم يتم مسح أي تذاكر بعد' : 'No tickets were scanned'}
                </h2>
                <p className="text-xs text-slate-500 max-w-xs">
                  {isRtl
                    ? 'لم يتم تسجيل أي عمليات دخول أو مسح ضوئي لهذه الفعالية حتى الآن.'
                    : 'No check-ins or QR ticket scans have been recorded for this event yet.'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-3 text-center">
                <div className="p-3.5 rounded-full bg-forestGreen/10 text-forestGreen">
                  <TicketCheck className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-forestGreen">
                  {isRtl ? 'عدد التذاكر الممسوحة' : 'Scanned Tickets'}
                </h2>
                <span className="text-5xl font-extrabold text-slate-950">
                  {numberOfScannedTickets}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}