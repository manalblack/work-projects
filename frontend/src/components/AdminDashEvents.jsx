import { useState } from "react"
import { useOutletContext } from "react-router-dom";
import { supabase } from "../supabaseConnection";
import ScannedTicketsModal from "../pages/admin/features/ScannedTicketsModal";
import { MapPin, Crown, Ticket, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashEvents({ allEvents, setAllEvents }) {
    const { isRtl } = useOutletContext() || { isRtl: false };

    // Track expansion state per event ID
    const [expandedIds, setExpandedIds] = useState({});
    const [scannedTicketsModal, setScannedTickModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handelOngoingBox = async (eventId) => {
        try {
            const { error } = await supabase.rpc('set_single_current_event', { target_id: eventId });

            if (error) {
                alert('failed to update current event');
                console.log(error);
                return;
            }
        } catch (error) {
            console.log('error when updating current event: ', error);
        }
    };

    const openScannedTicketsModal = (eventId) => {
        setSelectedEventId(eventId);
        setScannedTickModal(true);
    };

    if (!Array.isArray(allEvents) || allEvents.length === 0) {
        return (
            <div className="w-full py-12 text-center text-slate-400 text-sm">
                {isRtl ? 'لا توجد فعاليات متاحة حالياً.' : 'No events found.'}
            </div>
        );
    }

    const formatNumber = (value) => {
        if (isNaN(value)) return '0';
        return Number(value).toLocaleString('en-US');
    };

    return (
        <div className="w-full px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map((event, index) => {
                // Extract bilingual fields safely based on isRtl flag
                const title = event.title?.[isRtl ? 'ar' : 'en'] || event.title?.en || '';
                const description = event.description?.[isRtl ? 'ar' : 'en'] || event.description?.en || '';
                const location = event.location?.[isRtl ? 'ar' : 'en'] || event.location?.en || '';
                const isExpanded = !!expandedIds[event.id];

                return (
                    <motion.div 
                        key={event.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between group"
                    >
                        
                        {/* Cover Image Header */}
                        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                            <motion.img 
                                whileHover={{ scale: 1.08 }}
                                transition={{ duration: 0.4 }}
                                src={event.cover_image} 
                                alt={title || "Event image"} 
                                className="w-full h-full object-cover" 
                            />
                            {/* Date Badge Overlay */}
                            <div className="absolute top-3 right-3 bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                                <Calendar className="w-3 h-3 text-gold" />
                                <span>{event.event_date}</span>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                            <div className="space-y-2.5">
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-gold">
                                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                                    <span className="truncate">{location}</span>
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 tracking-tight line-clamp-1">{title}</h3>
                                <p className={`text-xs text-slate-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                                    {description || <span>No description found</span>}
                                </p>
                                {description && (
                                    <button 
                                        type="button"
                                        onClick={() => toggleExpand(event.id)}
                                        className="text-gold font-medium hover:underline text-xs cursor-pointer inline-block pt-0.5"
                                    >
                                        {isExpanded ? (isRtl ? 'عرض أقل' : 'Show Less') : (isRtl ? 'قراءة المزيد' : 'Read More')}
                                    </button>
                                )}

                                {/* Pricing Cards Box */}
                                <div className="p-3 rounded-xl bg-forestGreen/5 border border-forestGreen/10 grid grid-cols-2 gap-2 mt-3">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-forestGreen bg-white p-2 rounded-lg border border-forestGreen/20 shadow-xs">
                                        <Ticket className="w-3.5 h-3.5 text-gold shrink-0" />
                                        <div className="truncate">
                                            <span className="text-[10px] block text-slate-400 font-normal">Reg</span>
                                            <span>N{formatNumber(event.regular_price) || 0}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-white p-2 rounded-lg border border-gold/30 shadow-xs">
                                        <Crown className="w-3.5 h-3.5 text-gold shrink-0" />
                                        <div className="truncate">
                                            <span className="text-[10px] block text-slate-400 font-normal">VIP</span>
                                            <span>N{formatNumber(event.vip_price) || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Scanned Tickets Action Button */}
                            <div className="pt-3 border-t border-slate-100">
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={() => openScannedTicketsModal(event.id)}
                                    className="w-full py-2.5 px-4 bg-forestGreen text-white font-bold rounded-xl border border-forestGreen shadow-xs hover:bg-gold hover:text-slate-950 transition-all duration-300 ease-in-out text-xs uppercase tracking-wider cursor-pointer text-center"
                                >
                                    {isRtl ? 'عرض التذاكر الممسوحة' : 'Get Scanned Tickets'}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div> 
                );
            })}

            {/* Scanned Tickets Modal */}
            {scannedTicketsModal && selectedEventId && (
                <ScannedTicketsModal 
                    eventId={selectedEventId} 
                    isOpen={scannedTicketsModal} 
                    setScannedTickets={setScannedTickModal} 
                />
            )}
        </div>
    );
}