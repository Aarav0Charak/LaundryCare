import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import NotificationDropdown from './NotificationDropdown';
import { 
  Menu, 
  Bell, 
  Search, 
  Users, 
  ShieldCheck, 
  UserCog, 
  PhoneCall, 
  HelpCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ onToggleSidebar, onOpenRoleModal, onSearchSelectComplaint }) {
  const { role, currentStudent, currentStaff, switchRole } = useAuth();
  const { complaints, notifications } = useData();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Compute unread count for current role
  const unreadCount = notifications.filter(n => {
    if (n.read) return false;
    if (role === 'student') return n.recipientRole === 'student' && (!n.studentId || n.studentId === currentStudent?.id);
    if (role === 'staff') return n.recipientRole === 'staff' || n.recipientRole === 'all';
    if (role === 'admin') return n.recipientRole === 'admin' || n.recipientRole === 'all';
    return true;
  }).length;

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }
    const q = val.toLowerCase();
    const matches = complaints.filter(c => 
      c.id.toLowerCase().includes(q) ||
      c.studentName.toLowerCase().includes(q) ||
      c.clothingItem.toLowerCase().includes(q) ||
      c.laundryTrackingId.toLowerCase().includes(q)
    ).slice(0, 5);
    setSearchResults(matches);
  };

  const handleSelectResult = (complaintId) => {
    onSearchSelectComplaint(complaintId);
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchFocused(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Mobile hamburger & breadcrumb/search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button 
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>

          {/* Quick Tracking Search Bar */}
          <div className="relative flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search complaint ID (LC-2026-...) or garment..."
                className="w-full pl-9 pr-4 py-1.5 bg-slate-100 focus:bg-white text-xs text-slate-800 placeholder-slate-400 rounded-xl border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              />
            </div>

            {/* Quick search dropdown results */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 divide-y divide-slate-100 z-50 overflow-hidden">
                <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-semibold text-slate-400 uppercase">
                  Matching Complaints ({searchResults.length})
                </div>
                {searchResults.map(res => (
                  <div
                    key={res.id}
                    onMouseDown={() => handleSelectResult(res.id)}
                    className="p-2.5 hover:bg-blue-50/60 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-600">{res.id}</span>
                        <span className="text-[11px] font-semibold text-slate-800">{res.clothingItem}</span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        {res.studentName} ({res.hostelBlock}) • Status: {res.status}
                      </p>
                    </div>
                    <ExternalLink size={12} className="text-slate-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* LPU Helpline Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-[11px] text-slate-600 border border-slate-200">
            <PhoneCall size={12} className="text-teal-600" />
            <span>Central Laundry Desk:</span>
            <span className="font-semibold text-slate-800">Ext 4022 / BH-4 Hub</span>
          </div>

          {/* Quick Role Toggle Bar */}
          <div className="bg-slate-100 p-1 rounded-xl hidden md:flex items-center gap-1 text-xs border border-slate-200">
            <button
              onClick={() => switchRole('student')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                role === 'student' ? 'bg-white text-blue-700 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users size={13} />
              <span>Student</span>
            </button>
            <button
              onClick={() => switchRole('staff')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                role === 'staff' ? 'bg-white text-blue-700 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCog size={13} />
              <span>Staff</span>
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                role === 'admin' ? 'bg-white text-blue-700 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck size={13} />
              <span>Admin</span>
            </button>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors relative"
              aria-label="Open notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <NotificationDropdown
              isOpen={isNotifOpen}
              onClose={() => setIsNotifOpen(false)}
              onSelectComplaint={onSearchSelectComplaint}
            />
          </div>

          {/* Active User Avatar / Switcher trigger */}
          <button
            onClick={onOpenRoleModal}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors border border-slate-200"
          >
            {role === 'student' && (
              <img
                src={currentStudent?.avatar}
                alt={currentStudent?.name}
                className="w-7 h-7 rounded-lg object-cover border border-slate-300"
              />
            )}
            {role === 'staff' && (
              <div className="w-7 h-7 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                {currentStaff?.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            {role === 'admin' && (
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                AD
              </div>
            )}

            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {role === 'student' && currentStudent?.name.split(' ')[0]}
                {role === 'staff' && currentStaff?.name.split(' ')[0]}
                {role === 'admin' && 'Admin'}
              </p>
              <p className="text-[10px] text-slate-500 capitalize">{role}</p>
            </div>

            <ChevronDown size={14} className="text-slate-400" />
          </button>

        </div>

      </div>
    </header>
  );
}
