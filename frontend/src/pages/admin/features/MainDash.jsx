import { useState, useEffect } from "react";
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import { 
  Ticket, 
  Users, 
  QrCode, 
  Calendar, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Eye 
} from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MiniLoading from "../../../components/admin-components/MiniLoading";
import AdminDashEvents from "../../../components/AdminDashEvents";
import ScannedTicketsModal from "./ScannedTicketsModal";
import { useLanguage } from "../../../hooks/LanguageContext";

export default function MainDash() {
  const { isRtl } = useLanguage(); // Pull language state from Dashboard outlet

  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [soldOut, setSoldOut] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scannedTicketsModal, setScannedTickModal] = useState(false);
  const [eventId, setEventId] = useState('');
  const [scannedTicketsCount, setScannedTicketsCount] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL;

  // Translations dictionary
  const t = {
    currentEvent: isRtl ? 'الفعالية الحالية' : 'Current Active Event',
    totalTickets: isRtl ? 'إجمالي التذاكر' : 'Total Tickets',
    soldTickets: isRtl ? 'التذاكر المباعة' : 'Sold Tickets',
    scannedTickets: isRtl ? 'التذاكر الممسوحة' : 'Scanned Tickets',
    readMore: isRtl ? 'عرض المزيد' : 'Read More',
    readLess: isRtl ? 'عرض أقل' : 'Show Less',
    regular: isRtl ? 'العادية' : 'Regular',
    vip: isRtl ? 'كبار الشخصيات' : 'VIP',
    getScanned: isRtl ? 'عرض التذاكر المسوحة' : 'Get Scanned Tickets',
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/all-events`);
        setAllEvents(response.data);
        
        const ongoingEvent = response.data.find(event => event.current_event === true);

        if (ongoingEvent) {
          const scannedTicketsResponse = await axios.get(`${API_URL}/admin/scanned-tickets/${ongoingEvent.id}`);
          const NumberOfScannedTickets = scannedTicketsResponse.data.ticketsData;
          setScannedTicketsCount(NumberOfScannedTickets.length);
        }
        console.log(allEvents);
        
            
        if (response.data.length > 0) {
          const soldOutEvent = response.data.filter(event => event.total_tickets === 0);
          const eventStatus = soldOutEvent[0]?.total_tickets <= 0 ? true : false;
          setSoldOut(eventStatus);
        } else {
          setSoldOut(null);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error when fetching events', error);
        setLoading(false);
      }
    };
       
    fetchEvents();
  }, [API_URL]);

  const openScannedTicketsModal = (id) => {
    setScannedTickModal(true);
    setEventId(id);
  };

  const ongoingEvent = allEvents.find(event => event.current_event === true);


  if (loading) {
    return <MiniLoading />;
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="flex flex-col gap-6 relative text-slate-100 pb-12">
      
      {/* Header Title */}
      <div className="flex items-center gap-2 px-2">
        <Sparkles className="w-5 h-5 text-gold" />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t.currentEvent}
        </h1>
      </div>

      {/* ---------------------------------------------------- */}
      {/* METRICS STATS CARDS                                  */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
        
        {/* Total Tickets Card */}
        <div className="p-5 rounded-2xl bg-white border border-gold shadow-xl flex items-center justify-between hover:border-gold/40 transition-all">
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950">
              {t.totalTickets}
            </h2>
            <h3 className="text-3xl font-extrabold text-forestGreen">
              {ongoingEvent?.total_tickets || 0}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-forestGreen/10 border border-gold/20 text-gold">
            <Ticket className="w-6 h-6" />
          </div>
        </div>

        {/* Sold Tickets Card */}
        <div className="p-5 rounded-2xl bg-white border border-white/10 shadow-xl flex items-center justify-between hover:border-gold/40 transition-all">
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950">
              {t.soldTickets}
            </h2>
            <h3 className="text-3xl font-extrabold text-forestGreen">
              {ongoingEvent?.sold_tickets || 0}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-forestGreen/10 border border-gold/20 text-gold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Scanned Tickets Card */}
        <div className="p-5 rounded-2xl bg-white border border-white/10 shadow-xl flex items-center justify-between hover:border-gold/40 transition-all">
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950">
              {t.scannedTickets}
            </h2>
            <h3 className="text-3xl font-extrabold text-forestGreen flex items-center">
              {!scannedTicketsCount && scannedTicketsCount !== 0 ? (
                <AiOutlineLoading3Quarters className="size-6 animate-spin text-gold" />
              ) : (
                scannedTicketsCount
              )}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-forestGreen/10 border border-gold/20 text-gold">
            <QrCode className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* ---------------------------------------------------- */}
      {/* ONGOING EVENT FEATURED CARD                          */}
      {/* ---------------------------------------------------- */}
      {ongoingEvent && (
        <div className="rounded-2xl bg-white border border-gold/30 p-5 md:p-7 shadow-2xl flex flex-col lg:flex-row gap-6 items-center">
          
          {/* Event Cover Image */}
          <div className="w-full lg:w-5/12 rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <img 
              src={ongoingEvent.image} 
              alt="event cover" 
              className="w-full h lg:h-90 object-cover" 
            />
          </div>

          {/* Event Details & Info */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between space-y-5">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                {ongoingEvent.title}
              </h2>
              <p className={`text-sm text-forestGreen leading-relaxed font-normal ${isExpanded ? 'line-clamp-none' : 'line-clamp-3'}`}>
                {/* {ongoingEvent.description} */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Non dolorum quis adipisci fuga laudantium, 
                quod dolorem quibusdam tempore itaque repellat?
              </p>
              
              <button 
                onClick={() => setIsExpanded(!isExpanded)}  
                className="text-gold font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>{isExpanded ? t.readLess : t.readMore}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Date, Location & Pricing Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
              <div className="space-y-2 text-xs text-slate-950">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold shrink-0" />
                  <span>{ongoingEvent.event_date} ({ongoingEvent.time})</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold shrink-0" />
                  <span className="truncate">{ongoingEvent.location}</span>
                </div>
              </div>

              {/* Pricing Tiers Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-forestGreen/30 text-xs">
                  <span className="text-slate-9 font-semibold text-gold">{t.regular}</span>
                  <span className="font-extrabold text-forestGreen">{ongoingEvent.regular_price}</span>
                </div>

                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-forestGreen/30 text-xs">
                  <span className="text-gold font-semibold">{t.vip}</span>
                  <span className="font-extrabold text-forestGreen">{ongoingEvent.vip_price}</span>
                </div>
              </div>
            </div>

            {/* Scanned Tickets Modal Trigger Button */}
            <div className="pt-2">
              <button 
                onClick={() => openScannedTicketsModal(ongoingEvent.id)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-forestGreen text-white font-bold text-xs border border-gold/30 hover:bg-gold hover:text-slate-950 transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-gold group-hover:text-slate-950" />
                <span>{t.getScanned}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* ALL EVENTS GRID                                      */}
      {/* ---------------------------------------------------- */}
      <div className="space-y-4 pt-4">
        <h2 className="text-3xl font-extrabold text-white tracking-tight m-6 ">
          {isRtl ? 'جميع الفعاليات' : 'All Events'}
        </h2>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap- space-y-6"> */}
            <AdminDashEvents 
              allEvents={allEvents}
              setAllEvents={setAllEvents}
              isRtl={isRtl}
            />
        {/* </div> */}
      </div>

      {/* Scanned Tickets Modal */}
      {scannedTicketsModal && (
        <ScannedTicketsModal 
          eventId={eventId} 
          isOpen={scannedTicketsModal} 
          setScannedTickets={setScannedTickModal} 
        />
      )}

    </div>
  );
}