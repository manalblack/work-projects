import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { supabase } from '../../../supabaseConnection';
import MiniLoading from '../../../components/admin-components/MiniLoading';
import { 
  Sparkles, 
  User, 
  Briefcase, 
  Type, 
  FileText, 
  Upload, 
  Plus, 
  Trash2, 
  CheckCircle2,
  Quote
} from 'lucide-react';
import imageCompression from 'browser-image-compression';


import { useAuth } from '../hooks/userAuth';

export default function EditFounderInfo() {
  const { isRtl } = useOutletContext() || { isRtl: false };

  const [loading, setLoading] = useState(true);

  const [founderId, setFounderId] = useState(null);

  // Founder Data State (mapped to bilingual fields)
  const [founderData, setFounderData] = useState({
    name: '',
    nameAr: '',
    title: '',
    titleAr: '',
    bio: '',
    bioAr: '',
    quote: '',
    quoteAr: '',
    image: '',
  });


  // Work Experiences / Partnerships State (matches DB JSONB structure)
  const [experiences, setExperiences] = useState([]);

  // New Experience Input State
  const [newExp, setNewExp] = useState({
    roleEn: '',
    roleAr: '',
    brandNameEn: '',
    brandNameAr: '',
    period: '',
    brandImageFile: '',
    brandImagePreview: '',
  });

  // Image States
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {user} = useAuth();

  // const userId = user.id;

  // console.log(user.id);

  // 2. Handler for selecting & compressing the brand logo
  const handleBrandImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 0.3,          // Small target size for brand logos
        maxWidthOrHeight: 400,   // Logos don't need 1280px
        useWebWorker: true,
      };

      const compressedBlob = await imageCompression(file, options);
      const compressedFile = new File([compressedBlob], file.name, {
        type: compressedBlob.type,
        lastModified: Date.now(),
      });

      // Revoke previous preview if user picks a different file before clicking Add
      if (newExp.brandImagePreview) {
        URL.revokeObjectURL(newExp.brandImagePreview);
      }

      setNewExp((prev) => ({
        ...prev,
        brandImageFile: compressedFile,
        brandImagePreview: URL.createObjectURL(compressedFile),
      }));
    } catch (error) {
      console.error('Error compressing brand image:', error);
      toast.error(isRtl ? 'فشل ضغط شعار الشركة' : 'Failed to compress brand logo.');
    } finally {
      e.target.value = '';
    }
  };
  
  

  const API_URL = import.meta.env.VITE_API_URL;

  const t = {
    headerTitle: isRtl ? 'إدارة صفحة المؤسس' : 'Founder Page Management',
    subtitle: isRtl ? 'تحديث السيرة الذاتية، اللقب المهني، الصورة الشخصية، وخبرات العمل السابقة' : 'Update executive biography, professional title, portrait, and career history',
    imageLabel: isRtl ? 'الصورة الشخصية (Portrait)' : 'Founder Portrait Image',
    expHeader: isRtl ? 'الخبرات المهنية والشراكات' : 'Previous Work Experience & Partnerships',
    companyPlaceholder: isRtl ? 'اسم الشركة / المؤسسة (EN)' : 'Company / Organization (EN)',
    periodPlaceholder: isRtl ? 'فترة العمل (مثال: 2018 - 2021)' : 'Period (e.g., 2018 - 2021)',
    addExpBtn: isRtl ? 'إضافة خبرة جديدة' : 'Add Experience',
    submitBtn: isRtl ? 'حفظ وتحديث صفحة المؤسس' : 'Save Founder Profile',
    successMsg: isRtl ? 'تم تحديث بيانات المؤسس بنجاح!' : 'Founder profile updated successfully!',
    errorMsg: isRtl ? 'حدث خطأ أثناء تحديث البيانات' : 'Failed to update founder profile.',
  };

  // Fetch and populate existing founder data on load
  useEffect(() => {
    const fetchFounder = async () => {

      try {

        const response = await axios.get(`${API_URL}/admin/founder`);
        // Handle both array response ([{...}]) and single object response ({...})
        const data = Array.isArray(response.data) ? response.data[0] : response.data;

        if (data) {
          setFounderId(data.id);

          setFounderData({
            name: data.name?.en || '',
            nameAr: data.name?.ar || '',
            title: data.header?.en || '',
            titleAr: data.header?.ar || '',
            bio: data.description?.en || '',
            bioAr: data.description?.ar || '',
            quote: data.founder_quote?.en || '',
            quoteAr: data.founder_quote?.ar || '',
            image: data.image || '',
          });

          // Populate existing portrait preview
          if (data.image) {
            setImagePreview(data.image);
          }

          // Populate existing partnerships/experiences
          if (Array.isArray(data.partnerships)) {
            setExperiences(data.partnerships);
          }

          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching founder data from database:', error);
        toast.error(isRtl ? 'فشل تحميل بيانات المؤسس' : 'Failed to load founder data.');
      } finally {
        setLoading(false);
      }
    };

    fetchFounder();
  }, [API_URL, isRtl]);

  const handleFounderChange = (e) => {
    const { name, value } = e.target;
    setFounderData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleExpChange = (e) => {
    const { name, value } = e.target;
    setNewExp(prev => ({ ...prev, [name]: value }));
  };

  const addExperience = () => {
    if (!newExp.roleEn && !newExp.roleAr) {
      toast.error(isRtl ? 'يرجى إدخال المسمى الوظيفي' : 'Please provide a role/position.');
      return;
    }

    const formattedExp = {
      role: {
        en: newExp.roleEn,
        ar: newExp.roleAr,
      },
      brand_name: {
        en: newExp.brandNameEn,
        ar: newExp.brandNameAr,
      },
      period: newExp.period,
      brand_image: newExp.brandImagePreview || '/bk-est.jpeg', // Used for immediate preview
      brandImageFile: newExp.brandImageFile || null,           // Held until form submit
    };

    setExperiences((prev) => [...prev, formattedExp]);

    // Reset sub-form
    setNewExp({
      roleEn: '',
      roleAr: '',
      brandNameEn: '',
      brandNameAr: '',
      period: '',
      brandImageFile: null,
      brandImagePreview: '',
    });
  };

  const removeExperience = (index) => {
    const target = experiences[index];
    if (target?.brand_image?.startsWith('blob:')) {
      URL.revokeObjectURL(target.brand_image);
    }
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  
  const handleSaveFounder = async (e) => {
    e.preventDefault();

    setLoading(true);

    const resolvedPartnerships = await Promise.all(

      experiences.map(async (exp) => {

        let finalBrandImage = exp.brand_image;

        // Upload only if a new File object was attached to this item
        if (exp.brandImageFile instanceof File) {
          const fileExt = exp.brandImageFile.name.split('.').pop();
          const fileName = `brandLogo-${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('brand_images')
            .upload(fileName, exp.brandImageFile);

          if (uploadError) throw uploadError;

          const { data: publicUrlData } = supabase.storage
            .from('brand_images')
            .getPublicUrl(fileName);

          finalBrandImage = publicUrlData.publicUrl;
        }

        // Return clean JSONB object without temporary File properties
        return {
          role: exp.role,
          brand_name: exp.brand_name,
          period: exp.period,
          brand_image: finalBrandImage,
        };
      })
    );

    try {
      let imageUrl = founderData.image;

      // Upload new portrait to Supabase if selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `founderPortrait-${crypto.randomUUID()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('brand_images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('brand_images')
          .getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }
      

      // Reconstruct the exact JSONB schema expected by your Supabase table
      const payload = {
        id: founderId,
        name: { en: founderData.name, ar: founderData.nameAr },
        header: { en: founderData.title, ar: founderData.titleAr },
        description: { en: founderData.bio, ar: founderData.bioAr },
        founder_quote: { en: founderData.quote, ar: founderData.quoteAr },
        image: imageUrl,
        partnerships: resolvedPartnerships,
      };

      const response = await axios.patch(`${API_URL}/admin/update-founder/${user.id}`, {payload});

      console.log(response);
      

      if (response.status === 200 || response.data?.message === 'SUCCESS') {
        toast.success(t.successMsg);
      }
    } catch (error) {
      console.error('Error saving founder profile:', error);
      toast.error(t.errorMsg);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <MiniLoading />;
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="w-full pb-16 text-slate-100 font-sans">
      
      {/* Header */}
      <div className="mb-8 px-2">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-gold" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.headerTitle}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          {t.subtitle}
        </p>
      </div>

      <form onSubmit={handleSaveFounder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: CORE FOUNDER INFO & PORTRAIT */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-forestGreen flex items-center gap-2">
              <User className="w-4 h-4 text-gold" />
              <span>{isRtl ? 'المعلومات الشخصية' : 'Founder Profile'}</span>
            </h3>

            {/* Name Container (AR & EN) */}
            <div className="flex gap-2">
              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Type className="w-4 h-4 text-gold" />
                  <span>اسم المؤسس</span>
                </label>
                <input 
                  type="text" 
                  name="nameAr" 
                  value={founderData.nameAr} 
                  onChange={handleFounderChange}
                  required
                  dir="rtl"
                  placeholder="مثال: منال م."
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>

              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Type className="w-4 h-4 text-gold" />
                  <span>Founder Name</span>
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={founderData.name} 
                  onChange={handleFounderChange}
                  required
                  dir="ltr"
                  placeholder="e.g., Manal M."
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>
            </div>

            {/* Header / Title (AR & EN) */}
            <div className="flex flex-row gap-2">
              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Briefcase className="w-4 h-4 text-gold" />
                  <span>اللقب المهني / العنوان</span>
                </label>
                <input 
                  type="text" 
                  name="titleAr" 
                  value={founderData.titleAr} 
                  onChange={handleFounderChange}
                  required
                  dir="rtl"
                  placeholder="مثال: صانع محتوى"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>

              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Briefcase className="w-4 h-4 text-gold" />
                  <span>Header / Professional Title</span>
                </label>
                <input 
                  type="text" 
                  name="title" 
                  value={founderData.title} 
                  onChange={handleFounderChange}
                  required
                  dir="ltr"
                  placeholder="e.g., Content Creator and Visionary"
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
                />
              </div>
            </div>

            {/* Bio / Description (AR & EN) */}
            <div className="flex gap-2">
              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <FileText className="w-4 h-4 text-gold" />
                  <span>نبذة تعريفية / السيرة الذاتية</span>
                </label>
                <textarea 
                  name="bioAr" 
                  value={founderData.bioAr} 
                  onChange={handleFounderChange}
                  required
                  dir="rtl"
                  rows={5}
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all resize-none"
                />
              </div>

              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <FileText className="w-4 h-4 text-gold" />
                  <span>Executive Bio & Vision</span>
                </label>
                <textarea 
                  name="bio" 
                  value={founderData.bio} 
                  onChange={handleFounderChange}
                  required
                  dir="ltr"
                  rows={5}
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all resize-none"
                />
              </div>
            </div>

            {/* Founder Quote (AR & EN) */}
            <div className="flex gap-2">
              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Quote className="w-4 h-4 text-gold" />
                  <span>اقتباس المؤسس</span>
                </label>
                <textarea 
                  name="quoteAr" 
                  value={founderData.quoteAr} 
                  onChange={handleFounderChange}
                  dir="rtl"
                  rows={2}
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all resize-none"
                />
              </div>

              <div className="space-y-2 w-1/2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                  <Quote className="w-4 h-4 text-gold" />
                  <span>Founder Quote</span>
                </label>
                <textarea 
                  name="quote" 
                  value={founderData.quote} 
                  onChange={handleFounderChange}
                  dir="ltr"
                  rows={2}
                  className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all resize-none"
                />
              </div>
            </div>

            {/* Portrait Image Upload */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Upload className="w-4 h-4 text-gold" />
                <span>{t.imageLabel}</span>
              </label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="w-full p-2 bg-white border border-forestGreen/40 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-forestGreen file:text-white hover:file:bg-gold hover:file:text-slate-950 text-slate-400 text-xs rounded-xl cursor-pointer"
              />

              {imagePreview && (
                <div className="relative w-36 h-36 rounded-2xl overflow-hidden border border-gold/30 shadow-xl bg-slate-950 mt-3">
                  <img src={imagePreview} alt="Founder Portrait" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: WORK EXPERIENCES & PARTNERSHIPS */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-forestGreen flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gold" />
              <span>{t.expHeader} ({experiences.length})</span>
            </h3>

            {/* Add Experience Sub-form */}
            <div className="p-4 rounded-xl bg-white border border-forestGreen/50 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text"
                  name="roleAr"
                  value={newExp.roleAr}
                  onChange={handleExpChange}
                  dir="rtl"
                  placeholder="المسمى الوظيفي (عربي)"
                  className="bg-white border border-forestGreen/40 px-3 py-2 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold"
                />
                <input 
                  type="text"
                  name="roleEn"
                  value={newExp.roleEn}
                  onChange={handleExpChange}
                  dir="ltr"
                  placeholder="Role / Position (English)"
                  className="bg-white border border-forestGreen/40 px-3 py-2 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text"
                  name="brandNameAr"
                  value={newExp.brandNameAr}
                  onChange={handleExpChange}
                  dir="rtl"
                  placeholder="الشركة أو المؤسسة (عربي)"
                  className="bg-white border border-forestGreen/40 px-3 py-2 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold"
                />
                <input 
                  type="text"
                  name="brandNameEn"
                  value={newExp.brandNameEn}
                  onChange={handleExpChange}
                  dir="ltr"
                  placeholder='Company name (English)'
                  className="bg-white border border-forestGreen/40 px-3 py-2 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold"
                />
              </div>

              {/* Period + Brand Logo Upload Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <input 
                  type="text"
                  name="period"
                  value={newExp.period}
                  onChange={handleExpChange}
                  placeholder={t.periodPlaceholder}
                  className="w-full bg-white border border-forestGreen/40 px-3 py-2.5 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold"
                />

                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 border border-dashed border-forestGreen/50 hover:border-gold rounded-xl px-3 py-2 cursor-pointer bg-slate-50 text-forestGreen text-xs font-bold transition-all">
                    <Upload className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span className="truncate">
                      {newExp.brandImageFile 
                        ? newExp.brandImageFile.name 
                        : (isRtl ? 'رفع شعار الشركة' : 'Upload Brand Logo')}
                    </span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleBrandImageChange} 
                      className="hidden" 
                    />
                  </label>

                  {newExp.brandImagePreview && (
                    <img 
                      src={newExp.brandImagePreview} 
                      alt="Brand Preview" 
                      className="w-9 h-9 rounded-lg object-cover border border-gold/40 shrink-0" 
                    />
                  )}
                </div>
              </div>

              <button 
                type="button"
                onClick={addExperience}
                className="w-full py-2.5 rounded-full border border-forestGreen bg-forestGreen text-white font-bold text-xs hover:bg-white hover:text-forestGreen transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md ease-in-out duration-300"
              >
                <Plus className="w-4 h-4 text-gold" />
                <span>{t.addExpBtn}</span>
              </button>
            </div>
            {/* Existing Experiences / Partnerships List */}
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
              {experiences.map((exp, index) => (
                <div key={index} className="p-4 rounded-xl bg-white border border-forestGreen/50 flex items-start justify-between gap-3 shadow-md">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-forestGreen text-sm">
                        {isRtl ? (exp.role?.ar || exp.role?.en) : (exp.role?.en || exp.role?.ar)}
                      </h4>
                      {exp.period && (
                        <span className="text-[10px] font-bold text-gold px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20">
                          {exp.period}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-slate-950 flex items-center gap-1.5">
                      <img 
                        src={exp.brand_image || '/bk-est.jpeg'} 
                        alt="" 
                        className="w-7 h-7 rounded object-cover" 
                      />
                      <span>
                        {isRtl ? (exp.brand_name?.ar || exp.brand_name?.en) : (exp.brand_name?.en || exp.brand_name?.ar)}
                      </span>
                    </p>
                  </div>

                  <button 
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-600 hover:text-red-400 p-1.5 rounded-lg bg-red-950/20 border border-red-800/30 cursor-pointer shrink-0 transition-all duration-300 ease-in-out"
                    title="Remove experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action Button */}
          <button 
            type="submit"
            className="w-full py-4 rounded-full bg-forestGreen text-white font-bold text-xs uppercase tracking-widest border border-gold/50 hover:bg-white hover:text-forestGreen transition-all duration-300 shadow-2xl active:scale-95 cursor-pointer flex items-center justify-center gap-2 ease-in-out"
          >
            <CheckCircle2 className="w-4 h-4 text-gold group-hover:text-slate-950" />
            <span>{t.submitBtn}</span>
          </button>
        </div>

      </form>
    </div>
  );
}