import { useState } from "react"
import { useOutletContext } from "react-router-dom";
import { supabase } from "../supabaseConnection";
import ScannedTicketsModal from "../pages/admin/features/ScannedTicketsModal";
import { MapPin, Crown, Ticket, Calendar, Sparkles } from "lucide-react";

export default function AdminDashEvents({ allEvents, setAllEvents }) {
    const { isRtl } = useOutletContext() || { isRtl: false };

    // Track expansion state per event ID
    const [expandedIds, setExpandedIds] = useState({});
    const [scannedTicketsModal, setScannedTickModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);

    console.log(allEvents);
    

    const toggleExpand = (id) => {
        setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handelOngoingBox = async (eventId) => {
        const updatedEvents = allEvents.map((ev) => ({
            ...ev,
            current_event: ev.id === eventId
        }));

        try {
            const { error } = await supabase.rpc('set_single_current_event', { target_id: eventId });

            if (error) {
                alert('failed to update current event');
                console.log(error);
                return;
            }
            // setAllEvents(updatedEvents);
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

    return (
        <div className="w-full px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map((event) => {
                // Extract bilingual fields safely based on isRtl flag
                const title = event.title?.[isRtl ? 'ar' : 'en'] || event.title?.en || '';
                const description = event.description?.[isRtl ? 'ar' : 'en'] || event.description?.en || '';
                const location = event.location?.[isRtl ? 'ar' : 'en'] || event.location?.en || '';
                const isExpanded = !!expandedIds[event.id];

                return (
                    <div key={event.id}
                        className="h-auto w-full bg-white border border-white/10 shadow-xl flex flex-col justify-between p-4 rounded-2xl">
                        
                        {/* Cover Image */}
                        <div className="w-full bg-slate-950 rounded-xl overflow-hidden aspect-video relative shadow-inner">
                            <img src={event.cover_image} alt={title || "Event image"} className="w-full h-full object-cover" />
                        </div>

                        {/* Content Body */}
                        <div className="text-slate-100 flex flex-col gap-3 py-4 flex-1 justify-between">
                            <div className="space-y-2">
                                <h2 className="text-lg font-extrabold text-forestGreen tracking-tight">{title}</h2>
                                <p className={`${isExpanded ? '' : 'line-clamp-4'} text-xs text-slate-950 leading-relaxed`}>
                                    {description || <span>No description found</span>}
                                </p>
                                {description && (
                                    <button 
                                        onClick={() => toggleExpand(event.id)}
                                        className="mt-1 text-gold font-medium hover:underline text-xs cursor-pointer"
                                    >
                                        {isExpanded ? (isRtl ? 'عرض أقل' : 'Show Less') : (isRtl ? 'قراءة المزيد' : 'Read More')}
                                    </button>
                                )}

                                <div className="flex flex-col gap-3 w-full pt-2">
                                    <div className="p-2.5 rounded-md bg-white border border-forestGreen/50 flex flex-row justify-between items-center gap-2">
                                        <div className="text-xs text-slate-300 space-y-1">
                                            <p className="flex items-center gap-1 font-semibold text-forestGreen">
                                                <Calendar className="w-3.5 h-3.5 text-gold" />
                                                <span>{event.event_date} | {event.event_time}</span>
                                            </p>
                                            <p className="flex items-center gap-1 text-forestGreen">
                                                <MapPin className="w-3.5 h-3.5 text-gold" />
                                                <span>{location}</span>
                                            </p>
                                        </div>

                                        <div className="flex flex-col font-bold gap-1.5 shrink-0">
                                            <span className="bg-white text-forestGreen text-[11px] border border-forestGreen/30 px-3 py-1 rounded-sm flex items-center gap-1">
                                                <Ticket className="w-3 h-3" /> Reg: N{event.regular_price || 0}
                                            </span>
                                            <span className="bg-white text-gold text-[11px] border border-gold/30 px-3 py-1 rounded-sm flex items-center gap-1">
                                                <Crown className="w-3 h-3" /> VIP: N{event.vip_price || 0}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Scanned Tickets Button */}
                        <button onClick={() => openScannedTicketsModal(event.id)}
                            className="w-full py-2.5 bg-forestGreen text-white font-bold rounded-xl border border-forestGreen shadow-md active:scale-95 hover:bg-white hover:text-forestGreen transition-all duration-300 ease-in-out text-xs uppercase tracking-wider cursor-pointer">
                            {isRtl ? 'عرض التذاكر الممسوحة' : 'Get Scanned Tickets'}
                        </button>
                    </div> 
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