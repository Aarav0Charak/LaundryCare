import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  Shirt, 
  Users, 
  UserCog, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Sparkles, 
  RotateCcw,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function DemoLoginScreen({ onProceedToApp }) {
  const { 
    role, 
    switchRole, 
    currentStudent, 
    selectStudent, 
    currentStaff, 
    selectStaff, 
    selectAdmin,
    availableStudents, 
    availableStaff 
  } = useAuth();

  const { resetToDemoData } = useData();
  const [selectedRole, setSelectedRole] = useState(role);
  const [selectedStudentId, setSelectedStudentId] = useState(currentStudent?.id || availableStudents[0].id);
  const [selectedStaffId, setSelectedStaffId] = useState(currentStaff?.id || availableStaff[0].id);
  const [resetDone, setResetDone] = useState(false);

  const handleEnterDashboard = (chosenRole) => {
    if (chosenRole === 'student') {
      const stu = availableStudents.find(s => s.id === selectedStudentId);
      if (stu) selectStudent(stu);
    } else if (chosenRole === 'staff') {
      const stf = availableStaff.find(s => s.id === selectedStaffId);
      if (stf) selectStaff(stf);
    } else if (chosenRole === 'admin') {
      selectAdmin();
    }
    onProceedToApp();
  };

  const handleResetData = () => {
    if (window.confirm("Reset all LocalStorage data to the default sample dataset?")) {
      resetToDemoData();
      setResetDone(true);
      setTimeout(() => setResetDone(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      
      {/* Top Navbar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Shirt size={22} className="stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">LaundryCare</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-500/20 text-teal-400 rounded border border-teal-500/30">LPU PROTOTYPE</span>
            </div>
            <p className="text-xs text-slate-400">Lovely Professional University • Hostel Laundry Complaint & Resolution System</p>
          </div>
        </div>

        <button
          onClick={handleResetData}
          className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
        >
          <RotateCcw size={13} />
          <span>{resetDone ? 'Reset Done!' : 'Reset Demo Data'}</span>
        </button>
      </header>

      {/* Hero Content */}
      <main className="max-w-6xl w-full mx-auto py-10 space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Sparkles size={14} />
            <span>Academic Design Thinking Prototype</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Transparent Hostel Laundry Complaint & Resolution System
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Select a demo user role below to explore the complete lifecycle: from student complaint submission and live timeline tracking, to staff investigation and administrative turnaround analytics.
          </p>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Student Portal Card */}
          <div className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500 rounded-2xl p-6 transition-all shadow-xl flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  1. Student Interface
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Register missing/damaged items, upload photo evidence, track 7-stage visual timeline, receive in-app alerts, and accept compensation proposals.
                </p>
              </div>

              {/* Student persona selector */}
              <div className="space-y-1.5 pt-2">
                <label className="text-[11px] font-semibold text-slate-300">
                  Select Demo Student ({availableStudents.length} Available):
                </label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                >
                  {availableStudents.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.hostelBlock} #{s.roomNo})
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1 pt-1">
                <p className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <CheckCircle2 size={13} className="text-blue-400 shrink-0" />
                  <span>Unique LC-2026-XXXXX Reference ID</span>
                </p>
                <p className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <CheckCircle2 size={13} className="text-blue-400 shrink-0" />
                  <span>Interactive Resolution Acceptance</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => handleEnterDashboard('student')}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <span>Enter as Student</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* 2. Laundry Staff Card */}
          <div className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500 rounded-2xl p-6 transition-all shadow-xl flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <UserCog size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  2. Laundry Staff Desk
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Manage incoming queue, audit conveyor bays, log private internal notes, update priority levels, request student verification, and propose remedies.
                </p>
              </div>

              {/* Staff selector */}
              <div className="space-y-1.5 pt-2">
                <label className="text-[11px] font-semibold text-slate-300">
                  Select Staff Persona:
                </label>
                <select
                  value={selectedStaffId}
                  onChange={(e) => setSelectedStaffId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-amber-500 font-medium"
                >
                  {availableStaff.map(stf => (
                    <option key={stf.id} value={stf.id}>
                      {stf.name} ({stf.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1 pt-1">
                <p className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                  <span>Confidential Internal Notes</span>
                </p>
                <p className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                  <span>Priority Escalation (Low/Med/High)</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => handleEnterDashboard('staff')}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <span>Enter as Laundry Staff</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* 3. Administrator Card */}
          <div className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500 rounded-2xl p-6 transition-all shadow-xl flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  3. Executive Administrator
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Monitor university-wide SLA compliance, analyze complaints by category & hostel blocks, evaluate staff resolution turnaround, and inspect master audit logs.
                </p>
              </div>

              {/* Admin profile detail */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700/80 text-xs">
                <p className="font-bold text-slate-200">Dr. K. S. Randhawa</p>
                <p className="text-[11px] text-emerald-400">Chief Warden & Facilities Oversight</p>
                <p className="text-[10px] text-slate-400 mt-0.5">LPU Directorate of Student Welfare</p>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1 pt-1">
                <p className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>Recharts Turnaround & Volume Charts</span>
                </p>
                <p className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>Master CSV Export & SLA Audits</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => handleEnterDashboard('admin')}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <span>Enter as Administrator</span>
              <ArrowRight size={15} />
            </button>
          </div>

        </div>

      </main>

      {/* Prototype Footer */}
      <footer className="max-w-6xl w-full mx-auto pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>LaundryCare Prototype • Designed for testing with LPU hostel residents and laundry staff</p>
        <p className="font-mono text-slate-400">Persistent Shared LocalStorage Architecture</p>
      </footer>

    </div>
  );
}
