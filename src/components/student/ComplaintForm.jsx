import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { LPU_CONFIG } from '../../data/lpuConfig';
import { 
  PlusCircle, 
  Upload, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Calendar, 
  Hash, 
  Shirt, 
  ArrowRight,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';

export default function ComplaintForm({ onSuccess, onCancel }) {
  const { currentStudent } = useAuth();
  const { createComplaint } = useData();

  // Form state initialized with student profile
  const [formData, setFormData] = useState({
    studentName: currentStudent?.name || '',
    studentId: currentStudent?.regNo || '',
    hostelBlock: currentStudent?.hostelBlock || 'BH-3',
    roomNo: currentStudent?.roomNo || '',
    laundryTrackingId: '',
    submissionDate: new Date().toISOString().split('T')[0],
    collectionDate: '',
    category: 'Missing clothes',
    clothingItem: '',
    affectedCount: 1,
    description: '',
    additionalInfo: '',
    priority: 'High',
  });

  const [evidenceImages, setEvidenceImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdComplaint, setCreatedComplaint] = useState(null);

  // Auto-set recommended priority based on category
  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    const catConfig = LPU_CONFIG.categories.find(c => c.id === cat);
    setFormData(prev => ({
      ...prev,
      category: cat,
      priority: catConfig ? catConfig.defaultPriority : 'Medium'
    }));
    if (errors.category) setErrors(prev => ({ ...prev, category: null }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  // Image Upload Handler with data-URL preview
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        alert("Please upload valid image files (JPG, PNG, WebP).");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be smaller than 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setEvidenceImages(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            url: uploadEvent.target.result,
            caption: file.name
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    setEvidenceImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Form Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.studentName.trim()) newErrors.studentName = "Student name is required";
    if (!formData.studentId.trim()) newErrors.studentId = "Student Registration ID is required";
    if (!formData.hostelBlock) newErrors.hostelBlock = "Select hostel block";
    if (!formData.roomNo.trim()) newErrors.roomNo = "Room number is required";
    if (!formData.clothingItem.trim()) newErrors.clothingItem = "Specify clothing item involved (e.g. Formal Blue Shirt)";
    if (!formData.affectedCount || formData.affectedCount < 1) newErrors.affectedCount = "At least 1 item is required";
    if (!formData.description.trim() || formData.description.trim().length < 15) {
      newErrors.description = "Please describe the problem in detail (minimum 15 characters)";
    }
    if (!formData.submissionDate) newErrors.submissionDate = "Date of laundry drop-off is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const complaint = createComplaint(
        {
          ...formData,
          evidenceImages
        },
        currentStudent
      );
      setIsSubmitting(false);
      setCreatedComplaint(complaint);
    }, 400);
  };

  // SUCCESS SCREEN
  if (createdComplaint) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm max-w-2xl mx-auto text-center space-y-6 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
          <CheckCircle2 size={36} />
        </div>

        <div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
            Complaint Registered Successfully
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-3">
            Reference ID: <span className="text-blue-600 font-mono">{createdComplaint.id}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
            Your complaint has been forwarded to the <strong>Central Laundry Hub (Plant BH-4)</strong>. 
            An intake supervisor has been notified, and investigation updates will appear live on your tracking timeline.
          </p>
        </div>

        {/* Complaint Summary Card */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left text-xs space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-slate-400 font-medium">Student:</span>
              <p className="font-semibold text-slate-800">{createdComplaint.studentName} ({createdComplaint.hostelBlock})</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Category:</span>
              <p className="font-semibold text-slate-800">{createdComplaint.category}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Item Involved:</span>
              <p className="font-semibold text-slate-800">{createdComplaint.affectedCount}x {createdComplaint.clothingItem}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Tracking Slip:</span>
              <p className="font-semibold font-mono text-slate-800">{createdComplaint.laundryTrackingId}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => onSuccess(createdComplaint.id)}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
          >
            <span>Track Complaint Progress</span>
            <ArrowRight size={15} />
          </button>

          <button
            onClick={() => {
              setCreatedComplaint(null);
              setFormData(prev => ({
                ...prev,
                clothingItem: '',
                affectedCount: 1,
                description: '',
                additionalInfo: '',
                laundryTrackingId: ''
              }));
              setEvidenceImages([]);
            }}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
          >
            Register Another Complaint
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto overflow-hidden animate-in fade-in duration-200">
      
      {/* Form Header */}
      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 rounded-md">
            LPU Student Form
          </span>
          <h2 className="text-lg font-bold text-slate-900">Register Laundry Complaint</h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Please provide complete details and photograph evidence of laundry token/slip or damaged garments for faster investigation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        
        {/* Validation Alert if errors exist */}
        {Object.keys(errors).length > 0 && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5">
            <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Please check required fields:</p>
              <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-[11px]">
                {Object.values(errors).map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Section 1: Student Information */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <span>1. Student & Hostel Identification</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="e.g. Rohan Sharma"
                className={`w-full px-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 ${
                  errors.studentName ? 'border-rose-400 ring-rose-100' : 'border-slate-300 focus:border-blue-500 ring-blue-100'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registration / Student ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="e.g. 12014582"
                className={`w-full px-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 ${
                  errors.studentId ? 'border-rose-400 ring-rose-100' : 'border-slate-300 focus:border-blue-500 ring-blue-100'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hostel Block <span className="text-rose-500">*</span>
              </label>
              <select
                name="hostelBlock"
                value={formData.hostelBlock}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 ring-blue-100"
              >
                {LPU_CONFIG.hostels.map(h => (
                  <option key={h.id} value={h.id}>
                    {h.name} ({h.zone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Room Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="roomNo"
                value={formData.roomNo}
                onChange={handleChange}
                placeholder="e.g. 412-B"
                className={`w-full px-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 ${
                  errors.roomNo ? 'border-rose-400 ring-rose-100' : 'border-slate-300 focus:border-blue-500 ring-blue-100'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Laundry Drop Details */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <span>2. Drop-off & Tracking Reference</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Laundry Slip / Token ID (Optional)
              </label>
              <input
                type="text"
                name="laundryTrackingId"
                value={formData.laundryTrackingId}
                onChange={handleChange}
                placeholder="e.g. LPU-LND-9821 or 9821"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 ring-blue-100 font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Stamped on your pink carbon slip</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date of Submission <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                name="submissionDate"
                value={formData.submissionDate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date of Collection (If returned)
              </label>
              <input
                type="date"
                name="collectionDate"
                value={formData.collectionDate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 ring-blue-100"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Complaint Specifics */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <span>3. Complaint Category & Garment Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Complaint Category <span className="text-rose-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 ring-blue-100 font-medium"
              >
                {LPU_CONFIG.categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Assigned Priority Level
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 ring-blue-100 font-medium"
              >
                <option value="High">High (Missing/Damaged valuable clothing)</option>
                <option value="Medium">Medium (Count discrepancy / Exchanged item)</option>
                <option value="Low">Low (Minor delay / Non-urgent)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clothing Item Involved <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="clothingItem"
                value={formData.clothingItem}
                onChange={handleChange}
                placeholder="e.g. Formal Blue Raymond Shirt, Zara Black Chinos"
                className={`w-full px-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 ${
                  errors.clothingItem ? 'border-rose-400 ring-rose-100' : 'border-slate-300 focus:border-blue-500 ring-blue-100'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Number of Affected Items <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="50"
                name="affectedCount"
                value={formData.affectedCount}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description of the Issue <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="State what occurred in detail: what color, size, brand, unique embroidery marks, or what state the garment was returned in..."
              className={`w-full px-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 ${
                errors.description ? 'border-rose-400 ring-rose-100' : 'border-slate-300 focus:border-blue-500 ring-blue-100'
              }`}
            />
            <span className="text-[10px] text-slate-400">Minimum 15 characters. Be specific to speed up sorting bay searches.</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Additional Information (Optional)
            </label>
            <input
              type="text"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="e.g. Needed urgently for placement drive on Monday, deposited wrong item at BH-3 desk"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 ring-blue-100"
            />
          </div>
        </div>

        {/* Section 4: Image Evidence Upload */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              4. Evidence Photographs (Slip & Garment)
            </h3>
            <span className="text-[11px] text-slate-400">PNG, JPG up to 5MB</span>
          </div>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-5 text-center transition-colors bg-slate-50/50">
            <input
              type="file"
              multiple
              accept="image/*"
              id="evidence-upload"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="evidence-upload" className="cursor-pointer flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <Upload size={18} />
              </div>
              <p className="text-xs font-semibold text-slate-700">
                Click to upload photos of laundry slip or cloth damage
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Take a quick photo with your phone or select from gallery
              </p>
            </label>
          </div>

          {/* Image Previews */}
          {evidenceImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {evidenceImages.map((img, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video">
                  <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                      title="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <span className="absolute bottom-1 left-1 right-1 text-[9px] bg-slate-900/80 text-white px-1.5 py-0.5 rounded truncate">
                    {img.caption}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating ID & Submitting...</span>
              </>
            ) : (
              <>
                <PlusCircle size={16} />
                <span>Submit Complaint</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
