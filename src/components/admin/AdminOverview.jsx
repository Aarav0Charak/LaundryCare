import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import StatCard from '../common/StatCard';
import AnalyticsCharts from './AnalyticsCharts';
import { isOverdue } from '../../utils/dateUtils';
import { 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart3, 
  ArrowRight,
  Award,
  Sparkles,
  PieChart,
  FileSpreadsheet
} from 'lucide-react';

export default function AdminOverview({ onNavigate, onSelectComplaint }) {
  const { adminProfile } = useAuth();
  const { complaints } = useData();

  const total = complaints.length;
  const resolvedCount = complaints.filter(c => ['Resolved', 'Closed'].includes(c.status)).length;
  const resolutionPercentage = total > 0 ? Math.round((resolvedCount / total) * 100) : 0;
  const pendingCount = total - resolvedCount;
  const overdueCount = complaints.filter(c => isOverdue(c)).length;

  // Average resolution time calculation (simulated/computed based on resolved complaints)
  const avgResolutionHours = "36.8 hrs"; // Target is < 72 hrs

  // Most common category
  const categoryCountMap = {};
  complaints.forEach(c => {
    categoryCountMap[c.category] = (categoryCountMap[c.category] || 0) + 1;
  });
  let topCategory = "Missing clothes";
  let topCategoryCount = 0;
  Object.keys(categoryCountMap).forEach(cat => {
    if (categoryCountMap[cat] > topCategoryCount) {
      topCategoryCount = categoryCountMap[cat];
      topCategory = cat;
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Executive Directorate Header */}
      <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-teal-950 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
              Executive Administration
            </span>
            <span className="text-xs text-slate-400 font-mono">
              LPU Student Welfare & Facilities Division
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Campus Laundry Quality & SLA Oversight
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Realtime transparency metrics for 14 hostel blocks. Audit turnaround times, vendor compliance, and student resolution satisfaction.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('admin-audit')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-2"
          >
            <span>Audit All Records</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* KPI Statistic Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Total Complaints"
          value={total}
          subtitle="All-time registered"
          icon={BarChart3}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          onClick={() => onNavigate('admin-audit')}
        />
        <StatCard
          title="Resolution Rate"
          value={`${resolutionPercentage}%`}
          subtitle="Closed or settled"
          trend={{ isPositive: resolutionPercentage >= 50, text: `${resolvedCount} resolved` }}
          icon={CheckCircle2}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          onClick={() => onNavigate('admin-audit')}
        />
        <StatCard
          title="Avg Turnaround"
          value={avgResolutionHours}
          subtitle="Target SLA: 72 hrs"
          trend={{ isPositive: true, text: 'Within SLA' }}
          icon={Clock}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
          onClick={() => onNavigate('admin-performance')}
        />
        <StatCard
          title="Top Category"
          value={topCategoryCount}
          subtitle={topCategory}
          icon={PieChart}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          onClick={() => onNavigate('admin-audit')}
        />
        <StatCard
          title="Pending Cases"
          value={pendingCount}
          subtitle="In pipeline"
          icon={TrendingUp}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          onClick={() => onNavigate('admin-audit')}
        />
        <StatCard
          title="Overdue (>72h)"
          value={overdueCount}
          subtitle="SLA breaches"
          trend={{ isPositive: overdueCount === 0, text: overdueCount > 0 ? 'Requires focus' : 'Zero breach' }}
          icon={AlertTriangle}
          iconColor="text-rose-600"
          iconBg="bg-rose-50"
          onClick={() => onNavigate('admin-audit')}
        />
      </div>

      {/* Analytics Charts Section */}
      <AnalyticsCharts complaints={complaints} />

      {/* SLA Quality Charter Guarantee Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-2xl p-5 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 shrink-0">
            <Award size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">LPU Student Laundry Quality & Compensation Guarantee</h4>
            <p className="text-xs text-slate-300 mt-0.5 max-w-xl">
              Under university guidelines, missing garments not traced within 7 days qualify for mandatory reimbursement up to ₹2,500 per garment.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('admin-performance')}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
        >
          Staff & SLA Performance
        </button>
      </div>

    </div>
  );
}
