import { useNavigate } from "react-router-dom";
import { CheckCircle2, QrCode } from "lucide-react";

export default function Success({ isRtl = false }) {
  const navigate = useNavigate();

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4"
    >
      <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200/80 shadow-lg p-6 text-center space-y-5">
        
        {/* Success Icon */}
        <div className="mx-auto w-17 h-17 rounded-2xl bg-forestGreen/10 border border-forestGreen/20 flex items-center justify-center text-forestGreen">
          <CheckCircle2 className="w-10 h-10 text-gold" />
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <h1 className="text-xl font-extrabold text-slate-900">
            {isRtl ? "تم مسح التذكرة" : "Ticket Scanned"}
          </h1>
          <p className="text-xs text-slate-500">
            {isRtl ? "تم تسجيل الحضور بنجاح." : "Check-in recorded successfully."}
          </p>
        </div>

        {/* Back Button */}
        {/* <button
          type="button"
          onClick={() => navigate("/successful-login")}
          className="w-full py-2.5 px-4 rounded-xl bg-forestGreen text-white font-bold text-xs hover:bg-gold hover:text-slate-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <QrCode className="w-4 h-4" />
          <span>{isRtl ? "مسح التذكرة التالية" : "Scan Next Ticket"}</span>
        </button> */}

      </div>
    </div>
  );
}