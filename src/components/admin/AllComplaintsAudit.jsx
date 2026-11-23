import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { LPU_CONFIG } from '../../data/lpuConfig';
import StatusBadge from '../common/StatusBadge';
import PriorityBadge from '../common/PriorityBadge';
import { formatDate, formatDateTime, timeAgo, isOverdue } from '../../utils/dateUtils';
import { 
  Search, 
  RotateCcw, 
  FileSpreadsheet, 
  ChevronRight, 
  Eye, 
  X, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

export default function AllComplaintsAudit({ onSelectComplaint }) {
  const { complaints } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [selectedAuditComplaint, setSelectedAuditComplaint] = useState(null);

  const filtered = complaints.filter(c => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = c.id.toLowerCase().includes(q);
      const matchName = c.studentName.toLowerCase().includes(q);
      const matchItem = c.clothingItem.toLowerCase().includes(q);
      const matchSlip = c.laundryTrackingId.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchItem && !matchSlip) return false;
    }

    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (categoryFilter !== 'ALL' && c.category !== categoryFilter) return false;
    if (priorityFilter !== 'ALL' && c.priority !== priorityFilter) return false;

    return true;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setCategoryFilter('ALL');
    setPriorityFilter('ALL');
  };

  const handleExportCSV = () => {
    const headers = ['Complaint ID', 'Student', 'Hostel', 'Room', 'Category', 'Item', 'Priority', 'Status', 'Assigned Staff', 'Created At'];
    const rows = filtered.map(c => [
      c.id,
      `"${c.studentName}"`,
      c.hostelBlock,
      c.roomNo,
      `"${c.category}"`,
      `"${c.clothingItem}"`,
      c.priority,
      `"${c.status}"`,
      `"${c.assignedStaff || 'Unassigned'}"`,
      c.createdAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LPU_Executive_Audit_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">University Complaints Audit Register</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Full compliance audit log for all 14 LPU hostel blocks and central laundry facility
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 flex items-center gap-2 self-start sm:self-auto transition-colors"
        >
          <FileSpreadsheet size={15} className="text-emerald-600" />
          <span>Export Audit Log ({filtered.length})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, student, item, slip..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="ALL">All Statuses</option>
              {LPU_CONFIG.stages.map(stg => (
                <option key={stg.id} value={stg.id}>{stg.label}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="ALL">All Categories</option>
              {LPU_CONFIG.categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="ALL">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-800">{filtered.length}</strong> of {complaints.length} records
          </span>

          {(searchQuery || statusFilter !== 'ALL' || categoryFilter !== 'ALL' || priorityFilter !== 'ALL') && (
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 text-[11px]"
            >
              <RotateCcw size={12} />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Complaint ID</th>
                <th className="py-3 px-4">Student & Block</th>
                <th className="py-3 px-4">Category & Garment</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned Personnel</th>
                <th className="py-3 px-4">Turnaround Time</th>
                <th className="py-3 px-4 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(comp => {
                const overdue = isOverdue(comp);
                return (
                  <tr
                    key={comp.id}
                    onClick={() => setSelectedAuditComplaint(comp)}
                    className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-blue-600">
                      {comp.id}
                      {overdue && (
                        <span className="block text-[10px] text-rose-600 font-sans font-bold">
                          SLA Breached
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{comp.studentName}</p>
                      <p className="text-[11px] text-slate-500">{comp.hostelBlock} • Room {comp.roomNo}</p>
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-semibold text-slate-800">{comp.clothingItem}</p>
                      <p className="text-[11px] text-slate-500 truncate">{comp.category}</p>
                    </td>

                    <td className="py-3 px-4">
                      <PriorityBadge priority={comp.priority} size="sm" />
                    </td>

                    <td className="py-3 px-4">
                      <StatusBadge status={comp.status} size="sm" />
                    </td>

                    <td className="py-3 px-4 text-slate-700">
                      {comp.assignedStaff || 'Central Helpdesk'}
                    </td>

                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {timeAgo(comp.createdAt)}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAuditComplaint(comp);
                        }}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                      >
                        <Eye size={14} />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Detail Modal */}
      {selectedAuditComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-5">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-blue-700">
                    {selectedAuditComplaint.id}
                  </span>
                  <StatusBadge status={selectedAuditComplaint.status} size="sm" />
                  <PriorityBadge priority={selectedAuditComplaint.priority} size="sm" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedAuditComplaint.clothingItem}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedAuditComplaint.studentName} ({selectedAuditComplaint.hostelBlock} #{selectedAuditComplaint.roomNo}) • Slip #{selectedAuditComplaint.laundryTrackingId}
                </p>
              </div>
              <button
                onClick={() => setSelectedAuditComplaint(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                {selectedAuditComplaint.description}
              </p>
            </div>

            {/* Proposed Resolution (if any) */}
            {selectedAuditComplaint.proposedResolution && (
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700">Resolution Proposed</h4>
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 space-y-1">
                  <p className="font-medium">{selectedAuditComplaint.proposedResolution.description}</p>
                  {selectedAuditComplaint.proposedResolution.amount && (
                    <p className="font-bold text-emerald-700">Compensation: {selectedAuditComplaint.proposedResolution.amount}</p>
                  )}
                  <p className="text-[10px] text-purple-600">Status: {selectedAuditComplaint.proposedResolution.status}</p>
                </div>
              </div>
            )}

            {/* Internal Staff Notes (Visible to Admin for compliance verification) */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center justify-between">
                <span>Internal Staff Investigation Records</span>
                <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Confidential Staff Log
                </span>
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {!selectedAuditComplaint.internalNotes || selectedAuditComplaint.internalNotes.length === 0 ? (
                  <p className="text-xs text-slate-400 italic p-2 bg-slate-50 rounded-lg">No internal notes logged.</p>
                ) : (
                  selectedAuditComplaint.internalNotes.map(n => (
                    <div key={n.id} className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200 text-xs">
                      <div className="flex justify-between text-[10px] text-slate-500 font-semibold mb-0.5">
                        <span>{n.authorName} ({n.authorRole})</span>
                        <span>{formatDateTime(n.timestamp)}</span>
                      </div>
                      <p className="text-slate-800">{n.note}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Timeline Milestones ({selectedAuditComplaint.timeline.length})</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedAuditComplaint.timeline.map((t, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                      <span className="font-bold text-slate-700">{t.title}</span>
                      <span>{formatDateTime(t.timestamp)}</span>
                    </div>
                    <p className="text-slate-600">{t.remarks}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedAuditComplaint(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl"
              >
                Close Audit View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
