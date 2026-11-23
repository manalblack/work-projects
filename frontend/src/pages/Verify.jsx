import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../supabaseConnection.js";
import Loading from "../components/Loading";
import { CheckCircle2, AlertTriangle, ShieldCheck, Tag, Calendar, Hash, ArrowRight, ArrowLeft } from "lucide-react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from "./admin/hooks/userAuth.jsx";

export default function Verify({ isRtl = false }) {
    const [ticketStatus, setTicketStatus] = useState(true); // true initially for loading
    const [isScanned, setIsScanned] = useState(false);
    const [verifyTicket, setVerifyTicket] = useState(false);
    const [scanningTime, setScanningTime] = useState(null);
    const [eventName, setEventName] = useState('');

    const { ticketId } = useParams();
    const [searchParams] = useSearchParams();
    const ticketType = searchParams.get('type') || 'Standard';

    const { isStaff, IsAdmin } = useAuth();
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const passKey = import.meta.env.VITE_ADMIN_PASS;

    const formatDate = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return new Intl.DateTimeFormat(isRtl ? 'ar-SA' : 'en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(date);
    };

    useEffect(() => {
        const checkTicketStatus = async () => {
            try {
                const { data, error } = await supabase
                    .from('tickets')
                    .select('is_scanned, scanned_at, event_name')
                    .eq('id', ticketId)
                    .single();

                if (error) {
                    console.error('Error checking ticket status in db:', error);
                    toast.error('Error checking ticket status');
                    setTicketStatus(false);
                    return;
                }

                if (data) {
                    if (data.scanned_at) {
                        setScanningTime(data.scanned_at);
                    }
                    setEventName(data.event_name || (isRtl ? 'فعالية تروفيستا' : 'Troveista Event'));

                    if (data.is_scanned === true) {
                        setIsScanned(true);
                    }
                }
            } catch (error) {
                console.error('Network error when checking ticket status:', error);
                toast.error(isRtl ? 'تحقق من اتصال الإنترنت وأعد المحاولة' : 'Check your internet connection and refresh', {
                    duration: 6000
                });
            } finally {
                setTicketStatus(false);
            }
        };

        checkTicketStatus();
    }, []);

    const handleTicketVerification = async () => {
        setVerifyTicket(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
            console.error('No active session found');
            toast.error(isRtl ? 'انتهت صلاحية الجلسة، يرجى تسجيل الدخول مجدداً' : 'Session expired, please sign in again');
            setVerifyTicket(false);
            navigate('/staff');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/staff/scan-tickets`, {
                ticketId: ticketId,
                bouncerId: passKey
            }, {
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.message === 'SUCCESS') {
                toast.success(isRtl ? 'تم التحقق من التذكرة بنجاح!' : 'Ticket successfully verified!');
                navigate('/success');
            } else {
                toast.error(isRtl ? 'فشل التحقق من التذكرة' : 'Ticket verification failed');
            }
        } catch (error) {
            console.error('Error scanning ticket:', error);
            toast.error(isRtl ? 'فشل الاتصال بالخادم. حاول مرة أخرى' : 'Connection failed. Please try again');
        } finally {
            setVerifyTicket(false);
        }
    };

    if (ticketStatus) {
        return <Loading>{isRtl ? 'جاري التحقق من حالة التذكرة...' : 'Verifying Ticket Status...'}</Loading>;
    }
    
    if (verifyTicket) {
        return <Loading>{isRtl ? 'جاري تأكيد صلاحية التذكرة...' : 'Verifying Ticket Validity...'}</Loading>;
    }

    const isVip = ticketType.toLowerCase() === 'vip';

    return (
        <div
            dir={isRtl ? "rtl" : "ltr"}
            className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden"
        >
            {/* Background Accent Glows */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-forestGreen/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />

            {isScanned ? (
                /* ALREADY SCANNED STATE */
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full max-w-md bg-white rounded-2xl border border-red-200/80 shadow-xl shadow-red-500/5 p-8 text-center space-y-6"
                >
                    <div className="flex justify-center">
                        <div className="w-20 h-20 rounded-3xl bg-red-50 border border-red-200 flex items-center justify-center text-red-500 shadow-sm">
                            <AlertTriangle className="w-10 h-10 animate-pulse text-red-500" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-[11px] font-extrabold uppercase tracking-wider text-red-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                            {isRtl ? 'تذكرة مستخدمة مسبقاً' : 'Already Scanned'}
                        </span>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            {isRtl ? 'تم مسح هذه التذكرة من قبل' : 'Ticket Already Scanned'}
                        </h1>
                        <p className="text-xs text-slate-500">
                            {isRtl
                                ? 'هذا الرمز تم التحقق منه مسبقاً ولا يمكن استخدامه مرة أخرى.'
                                : 'This ticket has already been checked in and cannot be admitted a second time.'}
                        </p>
                    </div>

                    {scanningTime && (
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                {isRtl ? 'وقت المسح السابق' : 'Previously Scanned At'}
                            </span>
                            <p className="text-xs font-bold text-slate-900">
                                {formatDate(scanningTime)}
                            </p>
                        </div>
                    )}

                    {/* <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => navigate('/staff')}
                        className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-forestGreen transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                        <span>{isRtl ? 'العودة للوحة التحكم' : 'Return to Dashboard'}</span>
                    </motion.button> */}
                </motion.div>
            ) : (
                /* VALID UN-SCANNED TICKET STATE */
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 overflow-hidden"
                >
                    {/* Top Accent Strip */}
                    <div className={`h-1.5 w-full ${isVip ? 'bg-gradient-to-r from-gold via-amber-400 to-gold' : 'bg-gradient-to-r from-forestGreen via-emerald-400 to-forestGreen'}`} />

                    <div className="p-6 sm:p-8 space-y-6">
                        {/* Header & Status Badge */}
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xs border ${isVip ? 'bg-gold/15 border-gold/30 text-amber-700' : 'bg-forestGreen/10 border-forestGreen/20 text-forestGreen'}`}>
                                <ShieldCheck className="w-8 h-8" />
                            </div>

                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${isVip ? 'bg-gold/15 border-gold/30 text-amber-800' : 'bg-forestGreen/10 border-forestGreen/20 text-forestGreen'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isVip ? 'bg-amber-600' : 'bg-forestGreen'} animate-pulse`} />
                                {isVip ? (isRtl ? 'تذكرة كبار الشخصيات' : 'VIP Ticket') : (isRtl ? 'تذكرة قياسية' : 'Standard Ticket')}
                            </span>

                            <div className="space-y-1">
                                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                    {isRtl ? 'التحقق من التذكرة' : 'Verify Ticket'}
                                </h1>
                                <p className="text-xs text-slate-500">
                                    {isRtl ? 'راجع تفاصيل التذكرة أدناه قبل تأكيد الحضور.' : 'Review ticket details below before confirming entry.'}
                                </p>
                            </div>
                        </div>

                        {/* Ticket Details Box */}
                        <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                            <div className="flex items-start gap-2.5">
                                <Calendar className="w-4 h-4 text-forestGreen shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                        {isRtl ? 'اسم الفعالية' : 'Event Name'}
                                    </span>
                                    <p className="text-xs font-bold text-slate-900">{eventName}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                                <Tag className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                        {isRtl ? 'فئة التذكرة' : 'Category'}
                                    </span>
                                    <p className="text-xs font-black text-slate-900 uppercase tracking-wide">{ticketType}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                                <Hash className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                        {isRtl ? 'معرف التذكرة' : 'Ticket ID'}
                                    </span>
                                    <p className="text-[11px] font-mono text-slate-600 break-all">{ticketId}</p>
                                </div>
                            </div>
                        </div>

                        {/* Verify Action Button */}
                        {isStaff ? (
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={handleTicketVerification}
                                className="w-full py-3.5 px-4 rounded-xl bg-forestGreen text-white font-bold text-sm hover:bg-gold hover:text-slate-950 transition-all shadow-md shadow-forestGreen/15 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{isRtl ? 'تأكيد الحضور والتحقق' : 'Verify & Check In'}</span>
                                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                            </motion.button>
                        ) : (
                            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center text-xs font-bold text-amber-800">
                                Staff Only
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
}