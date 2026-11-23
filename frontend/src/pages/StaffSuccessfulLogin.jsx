import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, QrCode, ArrowRight, ArrowLeft, LogOut } from "lucide-react";
import { supabase } from "../supabaseConnection.js";
import toast from "react-hot-toast";

export default function StaffSuccessfulLogin({ isRtl = false }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("pass");
    toast.success(isRtl ? "تم تسجيل الخروج بنجاح" : "Logged out successfully", {
      position: "top-center",
    });
    navigate("/staff");
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen w-full bg-slate-50 flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden"
    >
      {/* Subtle Background Accents */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-forestGreen/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />

      {/* Top Bar with Sign Out */}
      <div className="w-full max-w-2xl mx-auto flex justify-end pt-2">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs font-bold text-slate-700 hover:border-red-500 hover:text-red-600 transition-all shadow-xs cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isRtl ? "تسجيل الخروج" : "Sign Out"}</span>
        </button>
      </div>

      {/* Main Content Card */}
      <div className="flex-1 flex items-center justify-center py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-lg bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-8 sm:p-10 text-center space-y-6"
        >
          {/* Success Icon Animation */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="w-20 h-20 rounded-3xl bg-forestGreen/10 border border-forestGreen/20 flex items-center justify-center text-forestGreen shadow-sm"
            >
              <CheckCircle2 className="w-10 h-10 text-forestGreen" />
            </motion.div>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forestGreen/10 border border-forestGreen/20 text-[11px] font-extrabold uppercase tracking-wider text-forestGreen">
              <span className="w-1.5 h-1.5 rounded-full bg-forestGreen animate-pulse" />
              {isRtl ? "تم التحقق بنجاح" : "Verified & Authorized"}
            </span>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {isRtl
                ? "يمكنك الآن استخدام هاتفك لمسح التذاكر وضبط الحضور"
                : "You can now use your phone scanner to scan tickets"}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              {isRtl
                ? "البوابة جاهزة لاستقبال المسافرين والتحقق من صلاحية رموز QR الخاصة بهم بكفاءة."
                : "The operations portal is ready for fast participant QR verification and gate check-ins."}
            </p>
          </div>

          {/* Quick Action Button */}
          {/* <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => {
                navigate("/scanner");
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-forestGreen text-white font-bold text-sm hover:bg-gold hover:text-slate-950 transition-all shadow-md shadow-forestGreen/15 flex items-center justify-center gap-2 cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-gold group-hover:text-slate-950" />
              <span>{isRtl ? "فتح الماسح الضوئي" : "Open Ticket Scanner"}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </motion.button>
          </div> */}
        </motion.div>
      </div>

      {/* Footer Branding */}
      <div className="text-center text-[11px] font-medium text-slate-400 pb-2">
        Troveista Operations &bull; Secure Staff Portal
      </div>
    </div>
  );
}