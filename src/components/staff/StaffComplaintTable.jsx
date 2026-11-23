import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { LPU_CONFIG } from '../../data/lpuConfig';
import StatusBadge from '../common/StatusBadge';
import PriorityBadge from '../common/PriorityBadge';
import { formatDate, timeAgo, isOverdue } from '../../utils/dateUtils';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  ChevronRight, 
  FileSpreadsheet, 
  UserCheck, 
  AlertTriangle,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';

export default function StaffComplaintTable({ onSelectComplaint, onOpenInvestigation }) {
  const { complaints, updatePriority, assignStaffMember } = useData();
  const { currentStaff } = useAuth();

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [staffFilter, setStaffFilter] = useState('ALL');
  const [hostelFilter, setHostelFilter] = useState('ALL');

  // Filter logic
  const filtered = complaints.filter(c => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = c.id.toLowerCase().includes(q);
      const matchName = c.studentName.toLowerCase().includes(q);
      const matchStuId = (c.studentId || '').toLowerCase().includes(q);
      const matchItem = c.clothingItem.toLowerCase().includes(q);
      const matchSlip = c.laundryTrackingId.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchStuId && !matchItem && !matchSlip) return false;
    }

    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (priorityFilter !== 'ALL' && c.priority !== priorityFilter) return false;
    if (categoryFilter !== 'ALL' && c.category !== categoryFilter) return false;
    if (staffFilter !== 'ALL' && c.assignedStaff !== staffFilter) return false;
    if (hostelFilter !== 'ALL' && c.hostelBlock !== hostelFilter) return false;

    return true;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setPriorityFilter('ALL');
    setCategoryFilter('ALL');
    setStaffFilter('ALL');
    setHostelFilter('ALL');
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'ALL' || priorityFilter !== 'ALL' || categoryFilter !== 'ALL' || staffFilter !== 'ALL' || hostelFilter !== 'ALL';

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Complaint ID', 'Student Name', 'Hostel', 'Room', 'Category', 'Item', 'Priority', 'Status', 'Assigned Staff', 'Submitted Date'];
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
      c.submissionDate
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LPU_Laundry_Complaints_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">All Complaints Hub</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Central management register of all hostel laundry complaints across LPU campuses
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 flex items-center gap-2 self-start sm:self-auto transition-colors"
        >
          <FileSpreadsheet size={15} className="text-emerald-600" />
          <span>Export Filtered ({filtered.length})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          
          {/* Search box */}
          <div className="relative lg:col-span-2">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, student, item, slip..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="ALL">All Statuses</option>
              {LPU_CONFIG.stages.map(stg => (
                <option key={stg.id} value={stg.id}>{stg.label}</option>
              ))}
            </select>
          </div>

          {/* Priority filter */}
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="ALL">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Category filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="ALL">All Categories</option>
              {LPU_CONFIG.categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Assigned Staff Filter */}
          <div>
            <select
              value={staffFilter}
              onChange={(e) => setStaffFilter(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="ALL">All Staff</option>
              {LPU_CONFIG.staffMembers.map(stf => (
                <option key={stf.id} value={stf.name}>{stf.name}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Filter chips / Active count */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-800">{filtered.length}</strong> of {complaints.length} complaints
          </span>

          {hasActiveFilters && (
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
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No complaints match the specified filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Complaint ID</th>
                  <th className="py-3 px-4">Student & Hostel</th>
                  <th className="py-3 px-4">Category & Garment</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Assigned Staff</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(comp => {
                  const overdue = isOverdue(comp);
                  return (
                    <tr
                      key={comp.id}
                      onClick={() => {
                        onSelectComplaint(comp.id);
                        onOpenInvestigation();
                      }}
                      className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                    >
                      {/* ID */}
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">
                        {comp.id}
                        {overdue && (
                          <span className="block text-[10px] text-rose-600 font-sans font-bold">
                            ⚠️ Overdue
                          </span>
                        )}
                      </td>

                      {/* Student */}
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {comp.studentName}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          <span className="font-semibold text-slate-700">{comp.hostelBlock}</span> #{comp.roomNo}
                        </p>
                      </td>

                      {/* Category & Item */}
                      <td className="py-3 px-4 max-w-xs">
                        <p className="font-semibold text-slate-800">{comp.clothingItem}</p>
                        <p className="text-[11px] text-slate-500 truncate">{comp.category}</p>
                      </td>

                      {/* Priority */}
                      <td className="py-3 px-4">
                        <PriorityBadge priority={comp.priority} size="sm" />
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <StatusBadge status={comp.status} size="sm" />
                      </td>

                      {/* Staff */}
                      <td className="py-3 px-4 text-slate-700">
                        <span className="font-medium">{comp.assignedStaff || 'Unassigned'}</span>
                      </td>

                      {/* Submitted */}
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        {formatDate(comp.submissionDate)}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectComplaint(comp.id);
                            onOpenInvestigation();
                          }}
                          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg inline-flex items-center gap-1 transition-colors"
                        >
                          <span>Investigate</span>
                          <ChevronRight size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
