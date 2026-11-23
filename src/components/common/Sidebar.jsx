import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  Sparkles,
  LayoutDashboard, 
  PlusCircle, 
  Clock, 
  FolderKanban, 
  BarChart3, 
  SlidersHorizontal, 
  Users, 
  ShieldCheck, 
  Shirt, 
  LifeBuoy,
  LogOut,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView, isMobileOpen, setIsMobileOpen, onOpenRoleModal }) {
  const { role, currentUser, currentStudent, currentStaff, availableStudents } = useAuth();
  const { complaints } = useData();

  // Calculate badges
  const pendingCount = complaints.filter(c => {
    if (role === 'student') {
      return c.studentId === currentStudent?.id && !['Resolved', 'Closed'].includes(c.status);
    }
    return !['Resolved', 'Closed'].includes(c.status);
  }).length;

  const awaitingStudentCount = complaints.filter(c => {
    if (role === 'student') {
      return c.studentId === currentStudent?.id && c.status === 'Action Required / Awaiting Student';
    }
    return c.status === 'Action Required / Awaiting Student';
  }).length;

  const studentNavItems = [
    { id: 'student-overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'student-register', label: 'Register Complaint', icon: PlusCircle, highlight: true },
    { id: 'student-tracking', label: 'Complaint Tracking', icon: Clock, badge: awaitingStudentCount > 0 ? awaitingStudentCount : null, badgeColor: 'bg-amber-500' },
    { id: 'student-complaints', label: 'My Complaints History', icon: FolderKanban, count: complaints.filter(c => c.studentId === currentStudent?.id).length },
  ];

  const staffNavItems = [
    { id: 'staff-overview', label: 'Staff Overview', icon: LayoutDashboard },
    { id: 'staff-management', label: 'All Complaints Hub', icon: FolderKanban, count: complaints.length },
    { id: 'staff-investigation', label: 'Investigation Console', icon: Shirt, badge: pendingCount > 0 ? pendingCount : null, badgeColor: 'bg-blue-500' },
  ];

  const adminNavItems = [
    { id: 'admin-overview', label: 'Executive Analytics', icon: BarChart3 },
    { id: 'admin-audit', label: 'Complaints Audit Table', icon: FolderKanban, count: complaints.length },
    { id: 'admin-performance', label: 'Staff & Turnaround SLA', icon: Users },
  ];

  let navItems = studentNavItems;
  if (role === 'staff') navItems = staffNavItems;
  if (role === 'admin') navItems = adminNavItems;

  const roleColorBadges = {
    student: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    staff: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    admin: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 w-64 bg-slate-900 text-slate-300 flex flex-col z-50 transition-transform duration-300 ease-in-out border-r border-slate-800 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* University Brand / Header */}
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Shirt size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-white tracking-tight">LaundryCare</span>
                <span className="px-1.5 py-0.2 text-[10px] font-bold bg-teal-500/20 text-teal-400 rounded border border-teal-500/30">LPU</span>
              </div>
              <p className="text-[11px] text-slate-400">Hostel Laundry Resolution</p>
            </div>
          </div>

          {/* Current Role Card */}
          <div className="mt-4 p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-between">
            <div className="min-w-0">
              <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${roleColorBadges[role]}`}>
                {role} Mode
              </span>
              <p className="text-xs font-semibold text-white truncate mt-1">
                {role === 'student' && currentStudent?.name}
                {role === 'staff' && currentStaff?.name}
                {role === 'admin' && 'Dr. K. S. Randhawa'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {role === 'student' && `${currentStudent?.hostelBlock} • #${currentStudent?.roomNo}`}
                {role === 'staff' && currentStaff?.role}
                {role === 'admin' && 'Chief Warden Office'}
              </p>
            </div>
            <button
              onClick={onOpenRoleModal}
              title="Switch role or persona"
              className="p-1.5 text-xs text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors shrink-0"
            >
              Switch
            </button>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            {role.toUpperCase()} PORTAL
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'} />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 text-[10px] font-bold text-white rounded-full ${item.badgeColor || 'bg-blue-500'}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && (
                    <span className="text-[11px] text-slate-400 group-hover:text-slate-300">
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Prototype Info Box in Sidebar */}
        <div className="p-3 mx-3 mb-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-[11px] space-y-1.5">
          <div className="flex items-center gap-1.5 text-teal-400 font-semibold">
            <Sparkles size={13} />
            <span>Design Thinking Prototype</span>
          </div>
          <p className="text-slate-400 text-[10px] leading-tight">
            Centralized data simulated on LocalStorage. Test cross-role complaint lifecycle.
          </p>
          <button
            onClick={onOpenRoleModal}
            className="w-full mt-1 py-1.5 text-center text-[10px] font-semibold text-slate-200 bg-slate-700/60 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Switch Persona / Reset Demo
          </button>
        </div>

        {/* Footer profile indicator */}
        <div className="p-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 truncate">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="truncate">LPU Central Server v2.4</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">2026-27</span>
        </div>
      </aside>
    </>
  );
}
