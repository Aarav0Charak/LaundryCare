import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import StatCard from '../common/StatCard';
import StatusBadge from '../common/StatusBadge';
import PriorityBadge from '../common/PriorityBadge';
import { formatDate, timeAgo, isOverdue } from '../../utils/dateUtils';
import { 
  Shirt, 
  Clock, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Flame,
  Building,
  UserCheck
} from 'lucide-react';

export default function StaffOverview({ onNavigate, onSelectComplaint }) {
  const { currentStaff } = useAuth();
  const { complaints } = useData();

  const totalComplaints = complaints.length;
  const newlyReceived = complaints.filter(c => ['Complaint Submitted', 'Complaint Received by Staff'].includes(c.status)).length;
  const underInvestigation = complaints.filter(c => c.status === 'Under Investigation').length;
  const awaitingStudent = complaints.filter(c => c.status === 'Action Required / Awaiting Student').length;
  const resolved = complaints.filter(c => ['Resolved', 'Closed'].includes(c.status)).length;
  const overdueCount = complaints.filter(c => isOverdue(c)).length;

  // Urgent High Priority pending cases
  const highPriorityCases = complaints
    .filter(c => c.priority === 'High' && !['Resolved', 'Closed'].includes(c.status))
    .slice(0, 5);

  // Overdue complaints
  const overdueCases = complaints.filter(c => isOverdue(c)).slice(0, 4);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Staff Hub Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-navy-900 to-slate-800 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
              Staff Console
            </span>
            <span className="text-xs text-slate-400">
              {currentStaff?.plant} • ID: {currentStaff?.id}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Laundry Investigation Desk – {currentStaff?.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Audit lost garments, coordinate cross-hostel exchanges, record plant findings, and propose transparent compensation resolutions.
          </p>
        </div>

        <button
          onClick={() => onNavigate('staff-management')}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <span>Open Complaints Hub</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Total Cases"
          value={totalComplaints}
          subtitle="System wide"
          icon={Shirt}
          iconColor="text-slate-700"
          iconBg="bg-slate-100"
          onClick={() => onNavigate('staff-management')}
        />
        <StatCard
          title="New Received"
          value={newlyReceived}
          subtitle="Needs review"
          icon={Clock}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          onClick={() => onNavigate('staff-management')}
        />
        <StatCard
          title="Investigating"
          value={underInvestigation}
          subtitle="In plant audit"
          icon={Search}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          onClick={() => onNavigate('staff-management')}
        />
        <StatCard
          title="Awaiting Student"
          value={awaitingStudent}
          subtitle="Inquiry sent"
          icon={AlertCircle}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          onClick={() => onNavigate('staff-management')}
        />
        <StatCard
          title="Resolved"
          value={resolved}
          subtitle="Closed / settled"
          icon={CheckCircle2}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          onClick={() => onNavigate('staff-management')}
        />
        <StatCard
          title="Overdue (>72h)"
          value={overdueCount}
          subtitle="Exceeds SLA"
          icon={AlertTriangle}
          iconColor="text-rose-600"
          iconBg="bg-rose-50"
          trend={{ isPositive: false, text: overdueCount > 0 ? 'Urgent action' : 'Within SLA' }}
          onClick={() => onNavigate('staff-management')}
        />
      </div>

      {/* Main Grid: High Priority Cases & Overdue Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* High Priority Cases Queue */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 bg-rose-50/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
                <Flame size={16} />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">High Priority Attention Queue</h3>
                <p className="text-[11px] text-slate-500">Missing clothes & severe fabric damage</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
              {highPriorityCases.length} Pending
            </span>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {highPriorityCases.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No high priority cases pending right now!
              </div>
            ) : (
              highPriorityCases.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectComplaint(c.id);
                    onNavigate('staff-investigation');
                  }}
                  className="p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-rose-700">{c.id}</span>
                      <StatusBadge status={c.status} size="sm" />
                      <span className="text-[11px] text-slate-400 font-medium">Slip #{c.laundryTrackingId}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 truncate">{c.clothingItem}</p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {c.studentName} • {c.hostelBlock} Room {c.roomNo}
                    </p>
                  </div>

                  <span className="text-xs font-bold text-blue-600 flex items-center gap-1 shrink-0">
                    Investigate <ArrowRight size={13} />
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Overdue (>72 Hours) Cases */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 bg-amber-50/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                <AlertTriangle size={16} />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Overdue SLA Cases (&gt;72 Hours)</h3>
                <p className="text-[11px] text-slate-500">Requires supervisor escalation or settlement</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {overdueCases.length} Overdue
            </span>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {overdueCases.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                All open complaints are within standard 72-hour turnaround time!
              </div>
            ) : (
              overdueCases.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectComplaint(c.id);
                    onNavigate('staff-investigation');
                  }}
                  className="p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-700">{c.id}</span>
                      <PriorityBadge priority={c.priority} size="sm" />
                      <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                        Overdue
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 truncate">{c.clothingItem}</p>
                    <p className="text-[11px] text-slate-500">
                      Submitted on {formatDate(c.createdAt)} ({timeAgo(c.createdAt)})
                    </p>
                  </div>

                  <span className="text-xs font-bold text-blue-600 flex items-center gap-1 shrink-0">
                    Resolve <ArrowRight size={13} />
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Central Plant Operations Bulletin */}
      <div className="p-4 bg-slate-100/80 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
            <Building size={18} />
          </div>
          <div>
            <p className="font-bold text-slate-800">Central Plant BH-4 Operational Status: NORMAL</p>
            <p className="text-slate-500 text-[11px]">
              Daily lot capacity: 6,500 garments • Active wash drums: 14/14 • Sorting conveyor: Clear
            </p>
          </div>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">Shift Supervisor: Balwinder Singh</span>
      </div>

    </div>
  );
}
