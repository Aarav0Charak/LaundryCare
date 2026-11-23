import React from 'react';
import { useData } from '../../context/DataContext';
import { LPU_CONFIG } from '../../data/lpuConfig';
import { isOverdue } from '../../utils/dateUtils';
import { Users, Star, CheckCircle2, Clock, ShieldCheck, ArrowRight, Award } from 'lucide-react';

export default function StaffPerformanceTable({ onSelectComplaint, onNavigate }) {
  const { complaints } = useData();

  // Compute metrics for each staff member
  const performanceData = LPU_CONFIG.staffMembers.map(stf => {
    const assignedComplaints = complaints.filter(c => c.assignedStaff === stf.name);
    const resolvedComplaints = assignedComplaints.filter(c => ['Resolved', 'Closed'].includes(c.status));
    const activeComplaints = assignedComplaints.filter(c => !['Resolved', 'Closed'].includes(c.status));
    const overdueComplaints = assignedComplaints.filter(c => isOverdue(c));

    // Calculate rating
    const ratedComplaints = assignedComplaints.filter(c => c.studentFeedback && c.studentFeedback.rating);
    const avgRating = ratedComplaints.length > 0
      ? (ratedComplaints.reduce((acc, curr) => acc + curr.studentFeedback.rating, 0) / ratedComplaints.length).toFixed(1)
      : '4.8';

    // Resolution rate
    const resolutionRate = assignedComplaints.length > 0
      ? Math.round((resolvedComplaints.length / assignedComplaints.length) * 100)
      : 100;

    return {
      ...stf,
      totalAssigned: assignedComplaints.length,
      resolvedCount: resolvedComplaints.length,
      activeCount: activeComplaints.length,
      overdueCount: overdueComplaints.length,
      resolutionRate,
      avgRating,
      ratedCount: ratedComplaints.length
    };
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Staff & SLA Performance Oversight</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Evaluate laundry personnel efficiency, resolution turnaround, and student satisfaction ratings across all plants
        </p>
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {performanceData.map(stf => (
          <div key={stf.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 hover:border-blue-400 transition-colors">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                  {stf.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{stf.name}</h4>
                  <p className="text-xs text-blue-600 font-medium">{stf.role}</p>
                  <p className="text-[10px] text-slate-400">{stf.plant}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/80">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-amber-900">{stf.avgRating}</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              <div className="p-2 rounded-xl bg-slate-50">
                <p className="text-[10px] uppercase font-bold text-slate-400">Assigned</p>
                <p className="text-base font-bold text-slate-800 mt-0.5">{stf.totalAssigned}</p>
              </div>

              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                <p className="text-[10px] uppercase font-bold text-emerald-600">Resolved</p>
                <p className="text-base font-bold text-emerald-900 mt-0.5">{stf.resolvedCount}</p>
              </div>

              <div className="p-2 rounded-xl bg-blue-50 text-blue-800">
                <p className="text-[10px] uppercase font-bold text-blue-600">Rate</p>
                <p className="text-base font-bold text-blue-900 mt-0.5">{stf.resolutionRate}%</p>
              </div>
            </div>

            {/* Overdue Warning if any */}
            {stf.overdueCount > 0 ? (
              <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                <span>⚠️ {stf.overdueCount} case(s) exceed 72-hour turnaround</span>
              </p>
            ) : (
              <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>100% SLA turnaround compliant</span>
              </p>
            )}

          </div>
        ))}
      </div>

      {/* SLA Charter Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Award size={18} className="text-teal-600" />
          <span>LPU Central Laundry SLA Standards & Policy Benchmarks</span>
        </h3>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Complaint Tier</th>
                <th className="py-2.5 px-3">Initial Acknowledgment</th>
                <th className="py-2.5 px-3">Max Investigation Window</th>
                <th className="py-2.5 px-3">Resolution Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 px-3 font-semibold text-rose-700">High Priority (Missing/Damaged)</td>
                <td className="py-3 px-3">Under 4 hours</td>
                <td className="py-3 px-3">48 hours</td>
                <td className="py-3 px-3">Full item recovery or reimbursement voucher</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-amber-700">Medium Priority (Exchanged/Count)</td>
                <td className="py-3 px-3">Under 12 hours</td>
                <td className="py-3 px-3">72 hours</td>
                <td className="py-3 px-3">Cross-hostel item swap & re-delivery</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-700">Low Priority (Delivery Delay/Minor)</td>
                <td className="py-3 px-3">Under 24 hours</td>
                <td className="py-3 px-3">72 hours</td>
                <td className="py-3 px-3">Express dispatch + token waiver</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
