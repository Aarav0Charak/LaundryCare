import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { LPU_CONFIG } from '../../data/lpuConfig';
import StatusBadge from '../common/StatusBadge';
import PriorityBadge from '../common/PriorityBadge';
import { formatDate, formatDateTime, timeAgo } from '../../utils/dateUtils';
import { 
  Clock, 
  CheckCircle2, 
  Search, 
  AlertCircle, 
  HelpCircle, 
  FileText, 
  Check, 
  RotateCcw, 
  Send, 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  ArrowLeft,
  Calendar,
  Tag,
  Building,
  User,
  ExternalLink
} from 'lucide-react';

export default function ComplaintTrackingView({ selectedComplaintId, onSelectComplaint, onBackToList }) {
  const { currentStudent } = useAuth();
  const { 
    complaints, 
    submitStudentResponse, 
    respondToResolution, 
    submitFeedback 
  } = useData();

  // Filter complaints for current student
  const studentComplaints = complaints.filter(c => c.studentId === currentStudent?.id);

  // Active complaint
  const activeComplaint = complaints.find(c => c.id === selectedComplaintId) || studentComplaints[0];

  // Local state for interactive actions
  const [studentReplyText, setStudentReplyText] = useState('');
  const [resolutionNote, setResolutionNote] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);
  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);

  if (!activeComplaint) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-3">
        <Clock size={36} className="mx-auto text-slate-300" />
        <h3 className="text-base font-bold text-slate-800">No Complaints to Track</h3>
        <p className="text-xs text-slate-500">
          You do not have any registered complaints to track under {currentStudent?.name}'s account.
        </p>
      </div>
    );
  }

  // Calculate current stage step (1 to 7)
  const currentStageObj = LPU_CONFIG.stages.find(s => s.id === activeComplaint.status) || LPU_CONFIG.stages[0];
  const currentStep = currentStageObj.step;

  // Handler for student responding to "Action Required"
  const handleSendClarification = (e) => {
    e.preventDefault();
    if (!studentReplyText.trim()) return;
    setIsSubmittingAction(true);
    setTimeout(() => {
      submitStudentResponse(activeComplaint.id, studentReplyText, currentStudent.name);
      setStudentReplyText('');
      setIsSubmittingAction(false);
    }, 400);
  };

  // Handler for accepting resolution
  const handleResolutionAction = (actionType) => {
    setIsSubmittingAction(true);
    setTimeout(() => {
      respondToResolution(activeComplaint.id, actionType, resolutionNote, currentStudent.name);
      setResolutionNote('');
      setIsSubmittingAction(false);
    }, 400);
  };

  // Handler for feedback submission
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    submitFeedback(activeComplaint.id, feedbackRating, feedbackComment);
    setShowFeedbackSuccess(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      
      {/* Top Navigation & Complaint Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {onBackToList && (
            <button
              onClick={onBackToList}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors"
              title="Back to complaints"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Live Complaint Tracking</span>
              <span className="font-mono text-blue-600 font-bold">#{activeComplaint.id}</span>
            </h2>
            <p className="text-xs text-slate-500">
              Assigned to {activeComplaint.assignedStaff || 'Central Inspection Desk'} • Central Plant BH-4
            </p>
          </div>
        </div>

        {/* Quick switcher between student's complaints */}
        {studentComplaints.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Switch Case:</span>
            <select
              value={activeComplaint.id}
              onChange={(e) => onSelectComplaint(e.target.value)}
              className="px-3 py-1.5 text-xs font-mono font-semibold bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
            >
              {studentComplaints.map(c => (
                <option key={c.id} value={c.id}>
                  {c.id} - {c.clothingItem} ({c.status})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Primary Header Card with Badges and Details */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                {activeComplaint.id}
              </span>
              <StatusBadge status={activeComplaint.status} size="md" />
              <PriorityBadge priority={activeComplaint.priority} size="md" />
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {activeComplaint.category}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">{activeComplaint.clothingItem}</h1>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{activeComplaint.description}</p>
          </div>

          <div className="text-left md:text-right shrink-0 space-y-1 bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-xl">
            <p className="text-[11px] text-slate-400">Laundry Tracking Slip</p>
            <p className="text-sm font-bold font-mono text-slate-800">{activeComplaint.laundryTrackingId}</p>
            <p className="text-[11px] text-slate-500">
              Submitted: {formatDate(activeComplaint.submissionDate)}
            </p>
          </div>
        </div>

        {/* 7-Stage Visual Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Lifecycle Progress</span>
            <span className="text-blue-600">Stage {currentStep} of 7: {activeComplaint.status}</span>
          </div>

          {/* Stepper bar */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {LPU_CONFIG.stages.map((stg) => {
              const isPast = stg.step < currentStep;
              const isCurrent = stg.step === currentStep;
              return (
                <div key={stg.id} className="space-y-1.5">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isPast
                        ? 'bg-blue-600'
                        : isCurrent
                        ? (activeComplaint.status === 'Resolved' || activeComplaint.status === 'Closed' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse')
                        : 'bg-slate-200'
                    }`}
                  />
                  <p className={`text-[10px] leading-tight hidden md:block ${
                    isCurrent ? 'font-bold text-blue-700' : isPast ? 'font-medium text-slate-700' : 'text-slate-400'
                  }`}>
                    {stg.step}. {stg.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ACTION REQUIRED BANNER: If Staff is awaiting Student Response */}
      {activeComplaint.status === 'Action Required / Awaiting Student' && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-sm space-y-4 animate-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
              <AlertCircle size={22} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-amber-900">
                Staff Needs Your Response / Verification
              </h4>
              <p className="text-xs text-amber-800 mt-1">
                The assigned supervisor requested additional information or action (e.g. visiting BH-4 laundry desk to inspect item, or confirming clothing details).
              </p>
            </div>
          </div>

          {/* Form to submit reply */}
          <form onSubmit={handleSendClarification} className="space-y-3 pt-2 border-t border-amber-200/70">
            <label className="block text-xs font-bold text-amber-900">
              Your Response / Clarification to Laundry Staff:
            </label>
            <textarea
              rows="3"
              value={studentReplyText}
              onChange={(e) => setStudentReplyText(e.target.value)}
              placeholder="e.g. I will visit the BH-4 desk today at 5 PM with my student ID card..."
              className="w-full p-3 text-xs rounded-xl border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-800"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmittingAction || !studentReplyText.trim()}
                className="px-5 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm disabled:opacity-50"
              >
                <Send size={14} />
                <span>Submit Response to Staff</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* RESOLUTION PROPOSED BANNER: Student can Accept or Request Further Review */}
      {activeComplaint.status === 'Resolution Proposed' && activeComplaint.proposedResolution && (
        <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-5 shadow-sm space-y-4 animate-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-800 shrink-0 mt-0.5">
              <HelpCircle size={22} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-sm font-bold text-purple-950">
                  Resolution Proposal Received from Laundry Staff
                </h4>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-purple-200 text-purple-900 rounded">
                  Pending Your Acceptance
                </span>
              </div>
              <p className="text-xs text-purple-800 mt-1">
                Please review the proposed resolution carefully. If you agree, click <strong>Accept Resolution</strong>. If you feel this does not adequately resolve your issue, you can request further review.
              </p>
            </div>
          </div>

          {/* Proposal Details Box */}
          <div className="p-4 bg-white rounded-xl border border-purple-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900">Proposed Solution:</span>
              {activeComplaint.proposedResolution.amount && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Valuation: {activeComplaint.proposedResolution.amount}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              {activeComplaint.proposedResolution.description}
            </p>
            <p className="text-[10px] text-slate-400">
              Proposed on: {formatDateTime(activeComplaint.proposedResolution.proposedAt)}
            </p>
          </div>

          {/* Action controls */}
          <div className="space-y-3 pt-1">
            <input
              type="text"
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              placeholder="Optional comment or notes regarding this resolution..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-purple-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
            />

            <div className="flex flex-col sm:flex-row gap-2.5 justify-end">
              <button
                type="button"
                onClick={() => handleResolutionAction('request_review')}
                disabled={isSubmittingAction}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-purple-900 font-bold text-xs rounded-xl border border-purple-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw size={14} />
                <span>Request Further Review / Reconsideration</span>
              </button>

              <button
                type="button"
                onClick={() => handleResolutionAction('accept')}
                disabled={isSubmittingAction}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-colors flex items-center justify-center gap-1.5"
              >
                <Check size={14} />
                <span>Accept Resolution & Mark Resolved</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photographic Evidence Gallery (if uploaded) */}
      {activeComplaint.evidenceImages && activeComplaint.evidenceImages.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Uploaded Evidence Photographs ({activeComplaint.evidenceImages.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {activeComplaint.evidenceImages.map((img, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video">
                <img src={img.url} alt={img.caption || 'Evidence'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-slate-900/90 to-transparent text-[10px] text-white truncate">
                    {img.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visual Complaint Progress Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Complaint Progress History</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified transparent timeline logs registered by laundry personnel and student
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {activeComplaint.timeline.length} Recorded Milestones
          </span>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {activeComplaint.timeline.map((event, index) => {
              const isFirst = index === 0;
              const isLatest = index === activeComplaint.timeline.length - 1;
              const isStudent = event.authorRole === 'Student';

              return (
                <div key={event.id || index} className="timeline-stem flex items-start gap-4">
                  {/* Timeline Node Icon */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${
                    isLatest
                      ? 'bg-blue-600 text-white border-blue-200 ring-4 ring-blue-50 shadow-sm'
                      : isStudent
                      ? 'bg-slate-100 text-slate-700 border-slate-300'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  }`}>
                    {isStudent ? <User size={15} /> : <CheckCircle2 size={16} />}
                  </div>

                  {/* Timeline Event Content */}
                  <div className="flex-1 bg-slate-50/70 hover:bg-slate-50 rounded-xl p-4 border border-slate-200/80 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-slate-200/50 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-900">{event.title}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                          isStudent ? 'bg-slate-200 text-slate-700' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {event.authorRole}: {event.authorName}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {formatDateTime(event.timestamp)} ({timeAgo(event.timestamp)})
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                      {event.remarks}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Student Feedback & Rating Section (When Resolved or Closed) */}
      {['Resolved', 'Closed'].includes(activeComplaint.status) && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-600" />
              <h3 className="text-sm font-bold text-emerald-950">Resolution Feedback</h3>
            </div>
            {activeComplaint.studentFeedback && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Feedback Submitted
              </span>
            )}
          </div>

          {activeComplaint.studentFeedback ? (
            <div className="p-4 bg-white rounded-xl border border-emerald-200 space-y-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= activeComplaint.studentFeedback.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                  />
                ))}
                <span className="text-xs font-bold text-slate-800 ml-2">
                  {activeComplaint.studentFeedback.rating} / 5 Stars
                </span>
              </div>
              <p className="text-xs text-slate-700 italic">
                "{activeComplaint.studentFeedback.comment}"
              </p>
              <p className="text-[10px] text-slate-400">
                Submitted on {formatDate(activeComplaint.studentFeedback.submittedAt)}
              </p>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-3">
              <p className="text-xs text-emerald-800">
                Your complaint has been marked resolved! How satisfied are you with the laundry team's investigation and response?
              </p>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedbackRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      size={24}
                      className={star <= feedbackRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-700 ml-2">
                  {feedbackRating} Stars
                </span>
              </div>

              <textarea
                rows="2"
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                placeholder="Share your comments on staff behavior, speed of resolution, or tailoring quality..."
                className="w-full p-2.5 text-xs rounded-xl border border-emerald-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />

              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl"
              >
                Submit Resolution Rating
              </button>
            </form>
          )}
        </div>
      )}

    </div>
  );
}
