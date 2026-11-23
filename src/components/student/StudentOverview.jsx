import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import StatCard from '../common/StatCard';
import StatusBadge from '../common/StatusBadge';
import PriorityBadge from '../common/PriorityBadge';
import { formatDate, timeAgo } from '../../utils/dateUtils';
import { 
  PlusCircle, 
  Clock, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  FileText, 
  ChevronRight, 
  ShieldAlert,
  Sparkles,
  Info
} from 'lucide-react';

export default function StudentOverview({ onNavigate, onSelectComplaint }) {
  const { currentStudent } = useAuth();
  const { complaints } = useData();

  // Filter complaints for current student
  const studentComplaints = complaints.filter(c => c.studentId === currentStudent?.id);

  const totalSubmitted = studentComplaints.length;
  const pending = studentComplaints.filter(c => !['Resolved', 'Closed'].includes(c.status)).length;
  const underInvestigation = studentComplaints.filter(c => c.status === 'Under Investigation').length;
  const resolved = studentComplaints.filter(c => ['Resolved', 'Closed'].includes(c.status)).length;

  // Urgent items requiring student attention
  const actionRequiredComplaints = studentComplaints.filter(c => 
    ['Action Required / Awaiting Student', 'Resolution Proposed'].includes(c.status)
  );

  // Recent complaints sorted by updatedAt
  const recentComplaints = [...studentComplaints]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-blue-500/10 skew-x-12 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[11px] font-bold bg-teal-500/20 text-teal-300 rounded border border-teal-500/30">
                {currentStudent?.hostelBlock} • Room {currentStudent?.roomNo}
              </span>
              <span className="text-xs text-slate-400 font-mono">Reg: {currentStudent?.regNo}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, {currentStudent?.name}!
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              Transparent laundry complaint management for LPU Hostels. Track missing items, report damages, and inspect live resolution milestones.
            </p>
          </div>

          <button
            onClick={() => onNavigate('student-register')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 shrink-0"
          >
            <PlusCircle size={16} />
            <span>Register Complaint</span>
          </button>
        </div>
      </div>

      {/* Urgent Action Required Banner (If any) */}
      {actionRequiredComplaints.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 shadow-sm animate-pulse-subtle">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
              <AlertCircle size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-sm font-bold text-amber-900">
                  Action Required on {actionRequiredComplaints.length} Complaint{actionRequiredComplaints.length > 1 ? 's' : ''}
                </h4>
                <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Needs Your Review
                </span>
              </div>
              <p className="text-xs text-amber-800 mt-1">
                The laundry desk has updated your case or proposed a resolution. Please review and respond to complete your case.
              </p>

              <div className="mt-3 space-y-2">
                {actionRequiredComplaints.map(ac => (
                  <div 
                    key={ac.id} 
                    onClick={() => {
                      onSelectComplaint(ac.id);
                      onNavigate('student-tracking');
                    }}
                    className="p-2.5 bg-white rounded-xl border border-amber-200 flex items-center justify-between hover:border-amber-400 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-amber-900">{ac.id}</span>
                      <span className="text-xs font-medium text-slate-800">{ac.clothingItem}</span>
                      <StatusBadge status={ac.status} size="sm" />
                    </div>
                    <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                      Review Now <ChevronRight size={14} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Submitted"
          value={totalSubmitted}
          subtitle="All-time complaints"
          icon={FileText}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          onClick={() => onNavigate('student-complaints')}
        />
        <StatCard
          title="Pending Complaints"
          value={pending}
          subtitle="Awaiting final closure"
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          onClick={() => onNavigate('student-complaints')}
        />
        <StatCard
          title="Under Investigation"
          value={underInvestigation}
          subtitle="Active plant audits"
          icon={Search}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          onClick={() => onNavigate('student-complaints')}
        />
        <StatCard
          title="Resolved"
          value={resolved}
          subtitle="Successfully closed"
          trend={{ isPositive: true, text: totalSubmitted > 0 ? `${Math.round((resolved/totalSubmitted)*100)}% resolved` : '100%' }}
          icon={CheckCircle2}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          onClick={() => onNavigate('student-complaints')}
        />
      </div>

      {/* Recently Updated Complaints */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recently Updated Complaints</h3>
            <p className="text-xs text-slate-500 mt-0.5">Live tracking for items reported in your account</p>
          </div>
          <button
            onClick={() => onNavigate('student-complaints')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All ({studentComplaints.length})</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {recentComplaints.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <FileText size={24} />
            </div>
            <h4 className="text-sm font-bold text-slate-800">No Complaints Lodged Yet</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You haven't submitted any laundry complaints yet. If you have missing, damaged, or delayed laundry, file a complaint below.
            </p>
            <button
              onClick={() => onNavigate('student-register')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
            >
              Submit First Complaint
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentComplaints.map(comp => (
              <div 
                key={comp.id}
                onClick={() => {
                  onSelectComplaint(comp.id);
                  onNavigate('student-tracking');
                }}
                className="p-4 sm:px-6 hover:bg-slate-50/80 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-blue-700">{comp.id}</span>
                    <PriorityBadge priority={comp.priority} size="sm" />
                    <span className="text-xs text-slate-400 font-medium">Slip #{comp.laundryTrackingId}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{comp.clothingItem}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{comp.description}</p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <StatusBadge status={comp.status} size="sm" />
                  <span className="text-[11px] text-slate-400">Updated {timeAgo(comp.updatedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Guidelines / Notice */}
      <div className="p-4 bg-slate-100/70 rounded-2xl border border-slate-200/80 flex items-start gap-3">
        <Info size={18} className="text-slate-500 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 space-y-1">
          <p className="font-semibold text-slate-800">LPU Laundry Charter & Turnaround Guidelines</p>
          <p>
            Standard wash turnaround is <strong>72 hours</strong>. Please retain your pink drop token slip until all garments are returned and counted. 
            Missing item searches take up to 48 hours for central plant bin audits.
          </p>
        </div>
      </div>

    </div>
  );
}
