import React, { useState, useEffect } from 'react';
import { Compass, Calendar, MapPin, Sparkles, Plus, Trash2, Upload, X, Save, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
// import { supabase } from '../supabaseConnection'; // adjust path as needed





export default function EditTourArea ({ tourToEdit, onCancel, isRtl, onSaveSuccess }) {
  // Form State for Bilingual Fields
  const [titleEn, setTitleEn] = useState(tourToEdit?.title?.en || '');
  const [titleAr, setTitleAr] = useState(tourToEdit?.title?.ar || '');

  const [descriptionEn, setDescriptionEn] = useState(tourToEdit?.description?.en || '');
  const [descriptionAr, setDescriptionAr] = useState(tourToEdit?.description?.ar || '');

  const [locationEn, setLocationEn] = useState(tourToEdit?.location?.en || '');
  const [locationAr, setLocationAr] = useState(tourToEdit?.location?.ar || '');

  // Pricing & Dates
  const [regularPrice, setRegularPrice] = useState(tourToEdit?.regular_price || '');
  const [vipPrice, setVipPrice] = useState(tourToEdit?.vip_price || '');
  const [startDate, setStartDate] = useState(tourToEdit?.tour_date ? new Date(tourToEdit.tour_date) : null);
  const [endDate, setEndDate] = useState(tourToEdit?.end_date ? new Date(tourToEdit.end_date) : null);

  // Inclusions List (array of {en, ar})
  const [inclusions, setInclusions] = useState(tourToEdit?.inclusions || []);
  const [inclusionInputEn, setInclusionInputEn] = useState('');
  const [inclusionInputAr, setInclusionInputAr] = useState('');

  // Cover Image
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(tourToEdit?.cover_image || '');

  // Gallery Images
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [existingGalleryUrls, setExistingGalleryUrls] = useState(tourToEdit?.gallery_images || []);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState([]);

  const [loading, setLoading] = useState(false);

  // Add inclusion
  const addInclusion = () => {
    if (!inclusionInputEn.trim() && !inclusionInputAr.trim()) return;
    setInclusions(prev => [...prev, { en: inclusionInputEn.trim(), ar: inclusionInputAr.trim() }]);
    setInclusionInputEn('');
    setInclusionInputAr('');
  };

  const removeInclusion = (index) => {
    setInclusions(prev => prev.filter((_, i) => i !== index));
  };

  // Cover image change handler
  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  // Gallery images change handler
  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setGalleryFiles(prev => [...prev, ...files]);
    setNewGalleryPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeExistingGalleryImage = (index) => {
    setExistingGalleryUrls(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewGalleryImage = (index) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    setNewGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Calculate duration days automatically
  const calculateDurationDays = (start, end) => {
    if (!start || !end) return tourToEdit?.duration_days || 1;
    const diffTime = Math.abs(new Date(end) - new Date(start));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 1 : diffDays;
  };

  // Submit Handler
  const handleUpdateTour = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverImageUrl = coverImagePreview;

      // 1. Upload new cover image to Supabase storage if a new file was selected
      if (coverImageFile) {
        const fileName = `tourCover-${Date.now()}-${coverImageFile.name}`;
        const { data, error } = await supabase.storage.from('tours_images').upload(fileName, coverImageFile);
        if (error) throw error;
        
        const { data: uploadedImage } = supabase.storage.from('tours_images').getPublicUrl(fileName);
        coverImageUrl = uploadedImage.publicUrl;
      }

      // 2. Upload new gallery images and combine with existing kept URLs
      let finalGalleryUrls = [...existingGalleryUrls];
      if (galleryFiles.length > 0) {
        for (const file of galleryFiles) {
          const fileName = `tourGallery-${Date.now()}-${file.name}`;
          const { data, error } = await supabase.storage.from('tours_images').upload(fileName, file);
          if (error) throw error;

          const { data: uploadedImage } = supabase.storage.from('tours_images').getPublicUrl(fileName);
          finalGalleryUrls.push(uploadedImage.publicUrl);
        }
      }

      // 3. Construct update payload
      const updatePayload = {
        title: { en: titleEn, ar: titleAr },
        description: { en: descriptionEn, ar: descriptionAr },
        location: { en: locationEn, ar: locationAr },
        regular_price: Number(regularPrice) || 0,
        vip_price: Number(vipPrice) || 0,
        tour_date: startDate ? startDate.toISOString() : null,
        end_date: endDate ? endDate.toISOString() : null,
        duration_days: calculateDurationDays(startDate, endDate),
        inclusions: inclusions,
        cover_image: coverImageUrl,
        gallery_images: finalGalleryUrls,
      };

      // 4. Update database record in Supabase
      const { error: updateError } = await supabase
        .from('tours')
        .update(updatePayload)
        .eq('id', tourToEdit.id);

      if (updateError) throw updateError;

      alert('Tour updated successfully!');
      if (onSaveSuccess) onSaveSuccess();
    } catch (err) {
      console.error('Error updating tour:', err);
      alert('Failed to update tour: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 my-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-forestGreen/10 border border-forestGreen/20">
            <Compass className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-forestGreen">
              {isRtl ? 'تعديل الرحلة السياحية' : 'Edit Tour Workspace'}
            </h2>
            {/* <p className="text-xs text-slate-500">
              {isRtl ? 'تحديث تفاصيل الرحلة، الصور والخدمات المشمولة' : 'Update tour details, bilingual content, and media'}
            </p> */}
          </div>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isRtl ? 'رجوع' : 'Cancel'}</span>
        </button>
      </div>

      <form onSubmit={handleUpdateTour} className="space-y-6">
        
        {/* Title (Dual Language) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Title (English)</label>
            <input 
              type="text" 
              value={titleEn} 
              onChange={(e) => setTitleEn(e.target.value)} 
              placeholder="Enter tour title in English..."
              className="w-full bg-white border border-forestGreen/40 px-4 py-2.5 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 text-right block">العنوان (العربية)</label>
            <input 
              type="text" 
              value={titleAr} 
              onChange={(e) => setTitleAr(e.target.value)} 
              dir="rtl"
              placeholder="أدخل عنوان الرحلة بالعربية..."
              className="w-full bg-white border border-forestGreen/40 px-4 py-2.5 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold text-right"
              required
            />
          </div>
        </div>

        {/* Location (Dual Language) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Location (English)</label>
            <input 
              type="text" 
              value={locationEn} 
              onChange={(e) => setLocationEn(e.target.value)} 
              placeholder="e.g. AlUla, Saudi Arabia"
              className="w-full bg-white border border-forestGreen/40 px-4 py-2.5 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 text-right block">الموقع (العربية)</label>
            <input 
              type="text" 
              value={locationAr} 
              onChange={(e) => setLocationAr(e.target.value)} 
              dir="rtl"
              placeholder="مثال: العلا، السعودية"
              className="w-full bg-white border border-forestGreen/40 px-4 py-2.5 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold text-right"
              required
            />
          </div>
        </div>

        {/* Description (Dual Language) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Description (English)</label>
            <textarea 
              rows={4}
              value={descriptionEn} 
              onChange={(e) => setDescriptionEn(e.target.value)} 
              placeholder="Enter tour description in English..."
              className="w-full bg-white border border-forestGreen/40 p-3 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 text-right block">الوصف (العربية)</label>
            <textarea 
              rows={4}
              value={descriptionAr} 
              onChange={(e) => setDescriptionAr(e.target.value)} 
              dir="rtl"
              placeholder="أدخل وصف الرحلة بالعربية..."
              className="w-full bg-white border border-forestGreen/40 p-3 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold text-right"
              required
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Regular Price (N)</label>
            <input 
              type="number" 
              value={regularPrice} 
              onChange={(e) => setRegularPrice(e.target.value)} 
              className="w-full bg-white border border-forestGreen/40 px-4 py-2.5 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">VIP Price (N)</label>
            <input 
              type="number" 
              value={vipPrice} 
              onChange={(e) => setVipPrice(e.target.value)} 
              className="w-full bg-white border border-forestGreen/40 px-4 py-2.5 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold"
              required
            />
          </div>
        </div>

        {/* Cover Image Upload */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Cover Image</label>
          <div className="flex items-center gap-4">
            {coverImagePreview && (
              <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-sm shrink-0">
                <img src={coverImagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <label className="flex-1 border-2 border-dashed border-forestGreen/40 hover:border-gold rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-forestGreen/5 transition-all">
              <Upload className="w-5 h-5 text-forestGreen mb-1" />
              <span className="text-xs font-bold text-slate-700">Click to change cover image</span>
              <input type="file" accept="image/*" onChange={handleCoverImage} className="hidden" />
            </label>
          </div>
        </div>

        {/* Gallery Images */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Gallery Images</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Existing Gallery Images */}
            {existingGalleryUrls.map((url, idx) => (
              <div key={`existing-${idx}`} className="relative h-24 rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
                <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => removeExistingGalleryImage(idx)}
                  className="absolute top-1.5 right-1.5 bg-red-600 text-white p-1 rounded-full text-xs shadow-md opacity-90 hover:opacity-100 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {/* New Gallery Previews */}
            {newGalleryPreviews.map((preview, idx) => (
              <div key={`new-${idx}`} className="relative h-24 rounded-xl overflow-hidden border border-gold shadow-sm group">
                <img src={preview} alt="New Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => removeNewGalleryImage(idx)}
                  className="absolute top-1.5 right-1.5 bg-red-600 text-white p-1 rounded-full text-xs shadow-md opacity-90 hover:opacity-100 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <label className="border-2 border-dashed border-forestGreen/40 hover:border-gold rounded-2xl p-4 flex items-center justify-center cursor-pointer bg-forestGreen/5 transition-all w-full">
            <Upload className="w-4 h-4 text-forestGreen mr-2" />
            <span className="text-xs font-bold text-slate-700">Add More Gallery Images</span>
            <input type="file" accept="image/*" multiple onChange={handleGalleryImages} className="hidden" />
          </label>
        </div>

        {/* Package Inclusions (Dual Language Inputs) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-forestGreen flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Package Inclusions (Bilingual)</span>
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-forestGreen/10 text-forestGreen">
              {inclusions.length} items
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input 
              type="text"
              value={inclusionInputEn}
              onChange={(e) => setInclusionInputEn(e.target.value)}
              placeholder="Inclusion (English)..."
              className="bg-white border border-forestGreen/40 px-3 py-2 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold"
            />
            <input 
              type="text"
              value={inclusionInputAr}
              onChange={(e) => setInclusionInputAr(e.target.value)}
              dir="rtl"
              placeholder="العنصر المشمول (العربية)..."
              className="bg-white border border-forestGreen/40 px-3 py-2 rounded-xl text-slate-950 text-xs focus:outline-none focus:border-gold text-right"
            />
          </div>
          <button 
            type="button"
            onClick={addInclusion}
            className="w-full py-2.5 rounded-full border border-forestGreen bg-forestGreen text-white font-bold text-xs hover:bg-white hover:text-forestGreen transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-gold" />
            <span>Add Inclusion Item</span>
          </button>

          {/* Inclusions List */}
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {inclusions.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2.5 rounded-xl bg-forestGreen/10 border border-forestGreen/20 text-xs text-slate-900">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 truncate pr-2">
                  <span className="font-bold text-forestGreen">{index + 1}.</span>
                  <span className="truncate"><strong className="text-slate-500">EN:</strong> {typeof item === 'object' ? item.en : item}</span>
                  <span className="truncate" dir="rtl"><strong className="text-slate-500">AR:</strong> {typeof item === 'object' ? item.ar : ''}</span>
                </div>
                <button 
                  type="button"
                  onClick={() => removeInclusion(index)}
                  className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button 
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl border bg-red-00 border-slate-200 text-slate-900 font-bold text-xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-full bg-forestGreen text-white font-bold text-xs border border-forestGreen hover:bg-white hover:text-forestGreen flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50 transition-all duration-300 ease-in-out"
          >
            <Save className="w-4 h-4 text-gold" />
            <span>{loading ? 'Saving Updates...' : 'Save Tour Changes'}</span>
          </motion.button>
        </div>

      </form>
    </motion.div>
  );
};