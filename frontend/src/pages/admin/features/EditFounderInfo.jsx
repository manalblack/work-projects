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
  Calendar, 
  Building2 
} from 'lucide-react';



/*
  Founder info to be edited:

  name
  Desc
  portrait
  header
  a quote
  previous work experience
  (Below the record and partnerships section)
  Roles and expertise

  TODO: ask the client if he wants to be able to add the contact info

  Clean the design and start working on all the new API endpoints.
*/



export default function EditFounderInfo() {
  const { isRtl } = useOutletContext() || { isRtl: false };

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Founder Data State
  const [founderData, setFounderData] = useState({
    name: '',
    title: '',
    bio: '',
    image: '',
  });

  // Work Experiences State
  const [experiences, setExperiences] = useState([
    { role: 'Managing Director & Founder', company: 'Sovereign Ventures', period: '2021 - Present', description: 'Leading strategic expansion and institutional partnerships across the region.' }
  ]);

  // New Experience Input State
  const [newExp, setNewExp] = useState({ role: '', company: '', period: '', description: '' });

  // Image States
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Bilingual UI Dictionary
  const t = {
    headerTitle: isRtl ? 'إدارة صفحة المؤسس' : 'Founder Page Management',
    subtitle: isRtl ? 'تحديث السيرة الذاتية، اللقب المهني، الصورة الشخصية، وخبرات العمل السابقة' : 'Update executive biography, professional title, portrait, and career history',
    nameLabel: isRtl ? 'اسم المؤسس' : 'Founder Name',
    titleLabel: isRtl ? 'اللقب المهني / المسمى الوظيفي' : 'Professional Title / Role',
    bioLabel: isRtl ? 'نبذة تعريفية / السيرة الذاتية' : 'Executive Bio & Vision',
    imageLabel: isRtl ? 'الصورة الشخصية (Portrait)' : 'Founder Portrait Image',
    expHeader: isRtl ? 'الخبرات المهنية السابقة' : 'Previous Work Experience',
    rolePlaceholder: isRtl ? 'المسمى الوظيفي (مثال: مدير تقني أول)' : 'Role / Position (e.g., Senior Partner)',
    companyPlaceholder: isRtl ? 'اسم الشركة / المؤسسة' : 'Company / Organization',
    periodPlaceholder: isRtl ? 'فترة العمل (مثال: 2018 - 2021)' : 'Period (e.g., 2018 - 2021)',
    descPlaceholder: isRtl ? 'وصف الإنجازات والمهام الرئيسية...' : 'Key responsibilities and achievements...',
    addExpBtn: isRtl ? 'إضافة خبرة جديدة' : 'Add Experience',
    submitBtn: isRtl ? 'حفظ وتحديث صفحة المؤسس' : 'Save Founder Profile',
    successMsg: isRtl ? 'تم تحديث بيانات المؤسس بنجاح!' : 'Founder profile updated successfully!',
    errorMsg: isRtl ? 'حدث خطأ أثناء تحديث البيانات' : 'Failed to update founder profile.',
  };

  // Fetch existing founder data on load
  useEffect(() => {
    const fetchFounder = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/founder`);
        if (response.data) {
          setFounderData({
            name: response.data.name || '',
            title: response.data.title || '',
            bio: response.data.bio || '',
            image: response.data.image || '',
          });
          setImagePreview(response.data.image || '');
          if (response.data.experiences && response.data.experiences.length > 0) {
            setExperiences(response.data.experiences);
          }
        }
      } catch (error) {
        console.error('Error fetching founder data:', error);
      } finally {
        setFetching(false);
      }
    };

    fetchFounder();
  }, [API_URL]);

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
    if (!newExp.role || !newExp.company) {
      toast.error(isRtl ? 'يرجى إدخال المسمى الوظيفي واسم الشركة على الأقل' : 'Please provide at least a role and company name.');
      return;
    }
    setExperiences([...experiences, newExp]);
    setNewExp({ role: '', company: '', period: '', description: '' });
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleSaveFounder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = founderData.image;

      // Upload new image to Supabase if changed
      if (imageFile) {
        const fileName = `founderPortrait-${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage.from('events_images').upload(fileName, imageFile);
        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage.from('events_images').getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }

      const payload = {
        name: founderData.name,
        title: founderData.title,
        bio: founderData.bio,
        image: imageUrl,
        experiences: experiences,
      };

      const response = await axios.post(`${API_URL}/admin/update-founder`, payload);

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

  if (fetching || loading) {
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
        
        {/* ==================================================== */}
        {/* LEFT COLUMN: CORE FOUNDER INFO & PORTRAIT            */}
        {/* ==================================================== */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-white border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-forestGreen flex items-center gap-2">
              <User className="w-4 h-4 text-gold" />
              <span>{isRtl ? 'المعلومات الشخصية' : 'Founder Profile'}</span>
            </h3>

            {/* Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Type className="w-4 h-4 text-gold" />
                <span>{t.nameLabel}</span>
              </label>
              <input 
                type="text" 
                name="name" 
                value={founderData.name} 
                onChange={handleFounderChange}
                required
                placeholder="e.g., Faisal Al-Sultan"
                className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
              />
            </div>

            {/* Title / Role */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <Briefcase className="w-4 h-4 text-gold" />
                <span>{t.titleLabel}</span>
              </label>
              <input 
                type="text" 
                name="title" 
                value={founderData.title} 
                onChange={handleFounderChange}
                required
                placeholder="e.g., Chief Executive Officer & Founder"
                className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all"
              />
            </div>

            {/* Bio / Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forestGreen">
                <FileText className="w-4 h-4 text-gold" />
                <span>{t.bioLabel}</span>
              </label>
              <textarea 
                name="bio" 
                value={founderData.bio} 
                onChange={handleFounderChange}
                required
                rows={5}
                placeholder="Share the founder's vision, background, and sovereign leadership philosophy..."
                className="w-full bg-white border border-forestGreen/40 px-4 py-3 rounded-xl text-slate-950 placeholder-slate-500 text-sm focus:outline-none focus:border-gold transition-all resize-none"
              />
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

        {/* ==================================================== */}
        {/* RIGHT COLUMN: WORK EXPERIENCES                       */}
        {/* ==================================================== */}
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
                  name="role"
                  value={newExp.role}
                  onChange={handleExpChange}
                  placeholder={t.rolePlaceholder}
                  className="bg-white border border-forestGreen/40 px-3 py-2 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold"
                />
                <input 
                  type="text"
                  name="company"
                  value={newExp.company}
                  onChange={handleExpChange}
                  placeholder={t.companyPlaceholder}
                  className="bg-white border border-forestGreen/40 px-3 py-2 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <input 
                type="text"
                name="period"
                value={newExp.period}
                onChange={handleExpChange}
                placeholder={t.periodPlaceholder}
                className="w-full bg-white border border-forestGreen/40 px-3 py-2 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold"
              />

              <textarea 
                name="description"
                value={newExp.description}
                onChange={handleExpChange}
                rows={2}
                placeholder={t.descPlaceholder}
                className="w-full bg-white border border-forestGreen/40 px-3 py-2 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold resize-none"
              />

              <button 
                type="button"
                onClick={addExperience}
                className="w-full py-2.5 rounded-full border border-forestGreen bg-forestGreen text-white font-bold text-xs hover:bg-white hover:text-forestGreen transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md ease-in-out duration-300"
              >
                <Plus className="w-4 h-4 text-gold" />
                <span>{t.addExpBtn}</span>
              </button>
            </div>

            {/* Existing Experiences List */}
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
              {experiences.map((exp, index) => (
                <div key={index} className="p-4 rounded-xl bg-white border border-forestGreen/50 flex items-start justify-between gap-3 shadow-md">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-forestGreen text-sm">{exp.role}</h4>
                      <span className="text-[10px] font-bold text-gold px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20">{exp.period}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-950 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-gold" />
                      <span>{exp.company}</span>
                    </p>
                    {exp.description && (
                      <p className="text-xs text-slate-800 pt-1 leading-relaxed">{exp.description}</p>
                    )}
                  </div>

                  <button 
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-600 hover:text-red-400 p-1.5 rounded-lg bg-red-950/20 border border-red-800/30 cursor-pointer shrink-0 transition-all duration-300 ease-in-out"
                    title="Remove experience">
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