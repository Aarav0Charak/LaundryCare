import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { LPU_CONFIG } from '../../data/lpuConfig';
import StatusBadge from '../common/StatusBadge';
import PriorityBadge from '../common/PriorityBadge';
import ResolutionProposalModal from './ResolutionProposalModal';
import { formatDate, formatDateTime, timeAgo, isOverdue } from '../../utils/dateUtils';
import { 
  ArrowLeft, 
  Search, 
  Lock, 
  PlusCircle, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Archive, 
  User, 
  Building, 
  Phone, 
  Mail, 
  Shirt, 
  Calendar, 
  FileText, 
  ChevronRight,
  ShieldAlert,
  Sparkles,
  UserCheck
} from 'lucide-react';

export default function StaffInvestigationView({ complaintId, onBackToList }) {
  const { currentStaff } = useAuth();
  const { 
    complaints, 
    updateComplaintStatus, 
    addInternalNote, 
    requestStudentAction, 
    closeComplaint,
    updatePriority,
    assignStaffMember
  } = useData();

  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'timeline' | 'details'
  const [internalNoteText, setInternalNoteText] = useState('');
  const [statusRemarks, setStatusRemarks] = useState('');
  const [studentInquiryText, setStudentInquiryText] = useState('');
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active complaint
  const complaint = complaints.find(c => c.id === complaintId) || complaints[0];

  if (!complaint) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
        <p className="text-xs text-slate-500">Complaint not found.</p>
        <button onClick={onBackToList} className="mt-3 text-xs text-blue-600 font-bold">
          Back to list
        </button>
      </div>
    );
  }

  const overdue = isOverdue(complaint);

  // Handler for adding internal note
  const handleAddInternalNote = (e) => {
    e.preventDefault();
    if (!internalNoteText.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      addInternalNote(
        complaint.id,
        internalNoteText,
        currentStaff?.name || 'Staff Member',
        currentStaff?.role || 'Laundry Specialist'
      );
      setInternalNoteText('');
      setIsSubmitting(false);
    }, 250);
  };

  // Handler for quick status change
  const handleStatusChange = (newStatus) => {
    const defaultRemarks = `Status changed to ${newStatus} by ${currentStaff?.name}.`;
    const finalRemarks = statusRemarks.trim() || defaultRemarks;
    setIsSubmitting(true);
    setTimeout(() => {
      updateComplaintStatus(
        complaint.id,
        newStatus,
        finalRemarks,
        currentStaff?.name || 'Laundry Staff'
      );
      setStatusRemarks('');
      setIsSubmitting(false);
    }, 300);
  };

  // Handler for requesting student action / information
  const handleRequestStudentInfo = (e) => {
    e.preventDefault();
    if (!studentInquiryText.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      requestStudentAction(
        complaint.id,
        studentInquiryText,
        currentStaff?.name || 'Laundry Supervisor'
      );
      setStudentInquiryText('');
      setShowInquiryForm(false);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToList}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
            title="Back to complaints table"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-blue-700">{complaint.id}</span>
              <StatusBadge status={complaint.status} size="md" />
              <PriorityBadge priority={complaint.priority} size="md" />
              {overdue && (
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                  Overdue SLA (&gt;72h)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Slip #{complaint.laundryTrackingId} • Reported by {complaint.studentName} ({complaint.hostelBlock})
            </p>
          </div>
        </div>

        {/* Action Buttons: Quick Status Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowResolutionModal(true)}
            className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <HelpCircle size={14} />
            <span>Propose Resolution</span>
          </button>

          {complaint.status !== 'Resolved' && complaint.status !== 'Closed' && (
            <button
              onClick={() => handleStatusChange('Resolved')}
              disabled={isSubmitting}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 size={14} />
              <span>Mark Resolved</span>
            </button>
          )}

          {complaint.status === 'Resolved' && (
            <button
              onClick={() => closeComplaint(complaint.id, "Case verified and formally closed by supervisor.", currentStaff?.name)}
              disabled={isSubmitting}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Archive size={14} />
              <span>Formally Close</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Left Details & Right Notes/Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Student Details, Evidence & Complaint Info */}
        <div className="space-y-6">
          
          {/* Student Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <User size={14} />
              <span>Student Profile</span>
            </h3>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                {complaint.studentName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900">{complaint.studentName}</h4>
                <p className="text-xs text-slate-500 font-mono">ID: {complaint.studentId || '12014582'}</p>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-700">
                  <Building size={12} className="text-slate-400 shrink-0" />
                  <span>{complaint.hostelBlock} • Room {complaint.roomNo}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tracking Slip:</span>
                <span className="font-mono font-bold text-slate-800">{complaint.laundryTrackingId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Drop Date:</span>
                <span className="font-medium text-slate-700">{formatDate(complaint.submissionDate)}</span>
              </div>
              {complaint.collectionDate && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Collection Date:</span>
                  <span className="font-medium text-slate-700">{formatDate(complaint.collectionDate)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Garment Details & Description */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Shirt size={14} />
              <span>Garment Involved</span>
            </h3>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                  {complaint.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Qty: {complaint.affectedCount || 1}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 pt-1">{complaint.clothingItem}</h4>
              <p className="text-xs text-slate-600 leading-relaxed pt-1 whitespace-pre-line">
                {complaint.description}
              </p>
            </div>

            {complaint.additionalInfo && (
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200/60">
                <span className="font-semibold text-slate-800">Student Note:</span> {complaint.additionalInfo}
              </div>
            )}
          </div>

          {/* Evidence Photographs */}
          {complaint.evidenceImages && complaint.evidenceImages.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Evidence Photographs ({complaint.evidenceImages.length})
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {complaint.evidenceImages.map((img, i) => (
                  <div key={i} className="group relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                    <img src={img.url} alt={img.caption || 'Evidence'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    {img.caption && (
                      <div className="absolute inset-x-0 bottom-0 p-1.5 bg-slate-900/80 text-[10px] text-white truncate">
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Priority & Staff Assignment Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Management Controls
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Complaint Priority Level
              </label>
              <select
                value={complaint.priority}
                onChange={(e) => updatePriority(complaint.id, e.target.value, currentStaff?.name || 'Supervisor')}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium"
              >
                <option value="High">High (Urgent missing/damage)</option>
                <option value="Medium">Medium (Exchanged/Count mismatch)</option>
                <option value="Low">Low (Minor delay/Non-urgent)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Assigned Investigation Staff
              </label>
              <select
                value={complaint.assignedStaff || ''}
                onChange={(e) => assignStaffMember(complaint.id, e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium"
              >
                {LPU_CONFIG.staffMembers.map(stf => (
                  <option key={stf.id} value={stf.name}>{stf.name} ({stf.role})</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Right Column (2 cols wide): Investigation Notes, Stage Controls & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Progression Controls Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Update Complaint Lifecycle Stage
              </h3>
              <span className="text-xs font-semibold text-blue-700">
                Current: {complaint.status}
              </span>
            </div>

            {/* Quick transition action buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleStatusChange('Complaint Received by Staff')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  complaint.status === 'Complaint Received by Staff'
                    ? 'bg-blue-50 border-blue-400 text-blue-800'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                1. Acknowledge Receipt
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange('Under Investigation')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  complaint.status === 'Under Investigation'
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-800'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                2. Put Under Investigation
              </button>

              <button
                type="button"
                onClick={() => setShowInquiryForm(!showInquiryForm)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  complaint.status === 'Action Required / Awaiting Student'
                    ? 'bg-amber-50 border-amber-400 text-amber-800'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                3. Request Student Input
              </button>

              <button
                type="button"
                onClick={() => setShowResolutionModal(true)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  complaint.status === 'Resolution Proposed'
                    ? 'bg-purple-50 border-purple-400 text-purple-800'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                4. Propose Resolution
              </button>
            </div>

            {/* Inquiry Form Expandable */}
            {showInquiryForm && (
              <form onSubmit={handleRequestStudentInfo} className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900">
                    Send Inquiry / Request Physical Visit to Student
                  </span>
                  <button type="button" onClick={() => setShowInquiryForm(false)} className="text-xs text-amber-700">Cancel</button>
                </div>
                <textarea
                  rows="2"
                  value={studentInquiryText}
                  onChange={(e) => setStudentInquiryText(e.target.value)}
                  placeholder="e.g. Your recovered garment is at BH-4 Central Counter. Please come between 4-7 PM with student ID card to inspect."
                  className="w-full p-2.5 text-xs rounded-xl border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  disabled={!studentInquiryText.trim()}
                  className="px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-lg"
                >
                  Send Inquiry to Student
                </button>
              </form>
            )}

            {/* Remarks Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={statusRemarks}
                onChange={(e) => setStatusRemarks(e.target.value)}
                placeholder="Optional remarks to accompany next status change (visible to student)..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleStatusChange(complaint.status)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Log Update
              </button>
            </div>
          </div>

          {/* Internal Staff Notes (PRIVATE TO STAFF - NEVER SHOWN TO STUDENTS) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Internal Staff Investigation Log</h3>
                  <p className="text-[11px] text-slate-400">
                    Confidential plant findings, operator audits & machine notes (NEVER VISIBLE TO STUDENT)
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">
                {complaint.internalNotes?.length || 0} Notes
              </span>
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddInternalNote} className="p-4 bg-slate-50 border-b border-slate-200/80 space-y-2">
              <textarea
                rows="2"
                value={internalNoteText}
                onChange={(e) => setInternalNoteText(e.target.value)}
                placeholder="Record internal findings: e.g. Checked conveyor belt 3B, spoke with shift incharge Joginder, barcode detached..."
                className="w-full p-3 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-slate-800 font-sans"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !internalNoteText.trim()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 disabled:opacity-50"
                >
                  <PlusCircle size={14} />
                  <span>Append Internal Note</span>
                </button>
              </div>
            </form>

            {/* Notes List */}
            <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
              {!complaint.internalNotes || complaint.internalNotes.length === 0 ? (
                <p className="text-xs text-slate-400 italic p-4 text-center">
                  No internal notes recorded yet. Append plant audit notes above.
                </p>
              ) : (
                complaint.internalNotes.map(n => (
                  <div key={n.id} className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/70 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-800">{n.authorName} ({n.authorRole})</span>
                      <span className="text-slate-400">{formatDateTime(n.timestamp)}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">{n.note}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Full Public Complaint History / Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <h3 className="text-sm font-bold text-slate-900">Public Audit Timeline (Visible to Student)</h3>
              <span className="text-xs text-slate-400">{complaint.timeline?.length || 0} Records</span>
            </div>

            <div className="p-6 space-y-4">
              {complaint.timeline.map((evt, i) => (
                <div key={evt.id || i} className="timeline-stem flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0 z-10 text-xs font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-200/40 mb-1">
                      <span className="font-bold text-slate-800">{evt.title}</span>
                      <span className="text-[11px] text-slate-400">{formatDateTime(evt.timestamp)}</span>
                    </div>
                    <p className="text-xs text-slate-600">{evt.remarks}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Logged by: {evt.authorRole} ({evt.authorName})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Resolution Proposal Modal */}
      <ResolutionProposalModal
        isOpen={showResolutionModal}
        onClose={() => setShowResolutionModal(false)}
        complaint={complaint}
      />

    </div>
  );
}
