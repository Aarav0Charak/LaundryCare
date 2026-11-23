import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { LPU_CONFIG } from '../../data/lpuConfig';
import StatusBadge from '../common/StatusBadge';
import PriorityBadge from '../common/PriorityBadge';
import { formatDate, timeAgo } from '../../utils/dateUtils';
import { 
  Search, 
  Filter, 
  PlusCircle, 
  ChevronRight, 
  FileText, 
  SlidersHorizontal,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

export default function StudentComplaintsList({ onSelectComplaint, onRegisterNew }) {
  const { currentStudent } = useAuth();
  const { complaints } = useData();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  // Filter complaints for current student
  const studentComplaints = complaints.filter(c => c.studentId === currentStudent?.id);

  // Apply filters
  const filtered = studentComplaints.filter(c => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = c.id.toLowerCase().includes(q);
      const matchItem = c.clothingItem.toLowerCase().includes(q);
      const matchDesc = c.description.toLowerCase().includes(q);
      const matchSlip = c.laundryTrackingId.toLowerCase().includes(q);
      if (!matchId && !matchItem && !matchDesc && !matchSlip) return false;
    }

    // Status filter
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;

    // Category filter
    if (categoryFilter !== 'ALL' && c.category !== categoryFilter) return false;

    // Priority filter
    if (priorityFilter !== 'ALL' && c.priority !== priorityFilter) return false;

    return true;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setCategoryFilter('ALL');
    setPriorityFilter('ALL');
  };

  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'ALL' || categoryFilter !== 'ALL' || priorityFilter !== 'ALL';

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Complaints History</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete records of all reported laundry issues for {currentStudent?.name} ({currentStudent?.hostelBlock})
          </p>
        </div>

        <button
          onClick={onRegisterNew}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle size={15} />
          <span>New Complaint</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search box */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, item, slip..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status filter */}
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

          {/* Category filter */}
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

          {/* Priority filter */}
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="ALL">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

        </div>

        {/* Filter chips / Active count */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-800">{filtered.length}</strong> of {studentComplaints.length} complaints
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

      {/* Complaints Table (Desktop) / Cards (Mobile) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <FileText size={22} />
            </div>
            <h4 className="text-sm font-bold text-slate-800">No Matching Complaints Found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {hasActiveFilters 
                ? "Try adjusting your search criteria or resetting the filters."
                : "No complaints have been registered yet under this student profile."}
            </p>
            {hasActiveFilters ? (
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
              >
                Clear Filters
              </button>
            ) : (
              <button
                onClick={onRegisterNew}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl"
              >
                Register a Complaint
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4 sm:px-6">Complaint ID</th>
                  <th className="py-3 px-4">Garment & Description</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4">Last Updated</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map(comp => (
                  <tr
                    key={comp.id}
                    onClick={() => onSelectComplaint(comp.id)}
                    className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-blue-600">
                      {comp.id}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        Slip: {comp.laundryTrackingId}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {comp.clothingItem}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{comp.description}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 text-[11px] font-medium rounded bg-slate-100 text-slate-700">
                        {comp.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <PriorityBadge priority={comp.priority} size="sm" />
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={comp.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {formatDate(comp.submissionDate)}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {timeAgo(comp.updatedAt)}
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <span className="inline-flex items-center gap-1 font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                        <span>Track</span>
                        <ChevronRight size={14} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
