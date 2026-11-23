import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Globe,
} from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "../supabaseConnection.js";
import Loading from "../components/Loading.jsx";

export default function Staff({ isRtl = false, toggleLanguage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const allowAccess = async (e) => {
    if (e) e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error(
        isRtl
          ? "يرجى إدخال البريد الإلكتروني وكلمة المرور"
          : "Please enter both email and password",
        { position: "top-center" }
      );
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(
          isRtl
            ? "وصول غير مصرح به! بيانات الدخول غير صحيحة"
            : "Unauthorized access! Invalid credentials",
          { position: "top-center" }
        );
      } else {
        toast.success(
          isRtl
            ? "تم منح الوصول! مرحباً بك في بوابة الموظفين"
            : "Access granted! Welcome staff member",
          { position: "top-center" }
        );
        navigate("/successful-login");
      }
    } catch (error) {
      console.error("Error when staff tries to sign in:", error);
      toast.error(
        isRtl
          ? "حدث خطأ غير متوقع أثناء تسجيل الدخول"
          : "An unexpected error occurred during login",
        { position: "top-center" }
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loading>
        {isRtl ? "جاري التحقق من صلاحيات الموظف..." : "Verifying staff..."}
      </Loading>
    );
  }

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden"
    >
      {/* Subtle Brand Background Accents */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-forestGreen/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />

      {/* Optional Language Toggle */}
      {toggleLanguage && (
        <button
          type="button"
          onClick={toggleLanguage}
          className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs font-bold text-slate-700 hover:border-forestGreen hover:text-forestGreen transition-all shadow-xs cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-gold" />
          <span>{isRtl ? "English" : "العربية"}</span>
        </button>
      )}

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 overflow-hidden"
      >
        {/* Top Accent Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-forestGreen via-gold to-forestGreen" />

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header & Restricted Badge */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-13 h-13 rounded-2xl bg-forestGreen/10 border border-forestGreen/20 flex items-center justify-center text-forestGreen shadow-xs">
              <ShieldCheck className="w-7 h-7 text-forestGreen" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-[11px] font-extrabold uppercase tracking-wider text-slate-900">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              {isRtl ? "منطقة مقيدة للموظفين" : "Restricted Staff Portal"}
            </span>

            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {isRtl ? "تسجيل دخول الموظفين" : "Staff Sign In"}
              </h1>
              <p className="text-xs text-slate-500 max-w-xs">
                {isRtl
                  ? "أدخل بيانات الاعتماد المصرح بها للوصول إلى لوحة التحكم وإدارة التذاكر."
                  : "Enter your authorized credentials to access operations and ticket management."}
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={allowAccess} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="staff-email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                {isRtl ? "البريد الإلكتروني" : "Email Address"}
              </label>
              <div className="relative flex items-center">
                <Mail
                  className={`w-4 h-4 text-slate-400 absolute ${
                    isRtl ? "right-3.5" : "left-3.5"
                  } pointer-events-none`}
                />
                <input
                  id="staff-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={isRtl ? "staff@troveista.com" : "staff@troveista.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full py-2.5 ${
                    isRtl ? "pr-10 pl-3.5" : "pl-10 pr-3.5"
                  } rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-forestGreen focus:ring-2 focus:ring-forestGreen/15 transition-all`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="staff-password"
                className="block text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                {isRtl ? "كلمة المرور" : "Password"}
              </label>
              <div className="relative flex items-center">
                <Lock
                  className={`w-4 h-4 text-slate-400 absolute ${
                    isRtl ? "right-3.5" : "left-3.5"
                  } pointer-events-none`}
                />
                <input
                  id="staff-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full py-2.5 ${
                    isRtl ? "pr-10 pl-10" : "pl-10 pr-10"
                  } rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-forestGreen focus:ring-2 focus:ring-forestGreen/15 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className={`absolute ${
                    isRtl ? "left-3" : "right-3"
                  } text-slate-400 hover:text-slate-700 transition-colors cursor-pointer`}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-forestGreen text-white font-bold text-sm hover:bg-gold hover:text-slate-950 transition-all shadow-md shadow-forestGreen/15 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isRtl ? "تسجيل الدخول" : "Verify & Sign In"}</span>
              {isRtl ? (
                <ArrowLeft className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}