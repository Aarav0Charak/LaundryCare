import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { X, HelpCircle, Check, DollarSign, Shirt, Wrench, Sparkles } from 'lucide-react';

export default function ResolutionProposalModal({ isOpen, onClose, complaint }) {
  const { proposeResolution } = useData();
  const { currentStaff } = useAuth();

  const [compensationType, setCompensationType] = useState('found_and_ready');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !complaint) return null;

  const resolutionPresets = [
    {
      id: 'found_and_ready',
      label: 'Item Located & Ready',
      desc: 'Garment found during plant sweep, sanitized, and ready at counter',
      icon: Shirt,
      defaultText: 'Your garment was traced in Plant BH-4 sorting bay. It has been cleaned and kept in locked locker for verification.'
    },
    {
      id: 'replacement',
      label: 'Invisible Mending / Tailor Repair',
      desc: 'Professional repair by university master tailor at zero expense',
      icon: Wrench,
      defaultText: 'We propose full professional repair by campus master tailor with matching fabric/hardware at zero cost.'
    },
    {
      id: 'reimbursement',
      label: 'Financial Reimbursement',
      desc: 'Direct credit to student campus card or bank account as per charter',
      icon: DollarSign,
      defaultText: 'Full fair-market value compensation approved by Facilities Directorate as per LPU Laundry Charter Annexure 4.'
    },
    {
      id: 're_wash',
      label: 'Express Re-Wash & Sanitization',
      desc: 'Specialized chemical wash to remove stain or chemical odor',
      icon: Sparkles,
      defaultText: 'Garment re-processed through gentle eco-wash drum with specialized fabric conditioner.'
    }
  ];

  const handlePresetSelect = (preset) => {
    setCompensationType(preset.id);
    if (!description || description === preset.defaultText) {
      setDescription(preset.defaultText);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert("Please provide a description of the proposed resolution.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      proposeResolution(
        complaint.id,
        {
          description,
          compensationType,
          amount: amount.trim() ? amount : undefined
        },
        currentStaff?.name || 'Laundry Staff'
      );
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-purple-50/50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
              <HelpCircle size={18} />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Propose Formal Resolution</h3>
              <p className="text-xs text-slate-500">Case #{complaint.id} • {complaint.clothingItem}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Resolution Types */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Resolution Mechanism
            </label>
            <div className="grid grid-cols-2 gap-2">
              {resolutionPresets.map(preset => {
                const Icon = preset.icon;
                const isSelected = compensationType === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50/60 ring-2 ring-purple-500/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={16} className={isSelected ? 'text-purple-700' : 'text-slate-500'} />
                      <span className="text-xs font-bold text-slate-800">{preset.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 leading-tight">{preset.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount / Valuation (if reimbursement or compensation voucher) */}
          {(compensationType === 'reimbursement' || compensationType === 'replacement') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Approved Compensation Amount / Valuation (e.g. ₹1,800 or New Voucher)
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. ₹1,500 or ₹2,200 Campus Credit"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Resolution Offer <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the proposed resolution to the student clearly..."
              className="w-full p-3 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-purple-500"
            />
            <span className="text-[10px] text-slate-400">
              The student will receive an in-app notification to review and accept or request revision.
            </span>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
            >
              {isSubmitting ? 'Sending...' : 'Send Resolution Proposal'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
