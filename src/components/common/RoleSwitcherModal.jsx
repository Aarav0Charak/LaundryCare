import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  X, 
  Users, 
  ShieldCheck, 
  UserCog, 
  RotateCcw, 
  Check, 
  Building2, 
  Sparkles,
  Info
} from 'lucide-react';

export default function RoleSwitcherModal({ isOpen, onClose }) {
  const { 
    role, 
    currentStudent, 
    selectStudent, 
    currentStaff, 
    selectStaff, 
    selectAdmin,
    availableStudents, 
    availableStaff 
  } = useAuth();
  
  const { resetToDemoData } = useData();
  const [activeTab, setActiveTab] = useState(role);
  const [resetSuccess, setResetSuccess] = useState(false);

  if (!isOpen) return null;

  const handleReset = () => {
    if (window.confirm("Reset all complaints, notifications, and notes to original demo prototype data?")) {
      resetToDemoData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-md">
                LPU Prototype Demo
              </span>
              <h3 className="text-lg font-bold text-slate-900">Switch Role & Persona</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Experience the platform from Student, Laundry Staff, or Administrative perspectives.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Role Tabs */}
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-100/50 p-1.5 gap-1.5">
          <button
            onClick={() => setActiveTab('student')}
            className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'student'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users size={16} />
            <span>Student ({availableStudents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('staff')}
            className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'staff'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCog size={16} />
            <span>Laundry Staff ({availableStaff.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'admin'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck size={16} />
            <span>Administrator</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Student Personas */}
          {activeTab === 'student' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                <span>Select a student profile to test personalized complaints & tracking:</span>
                <span className="font-semibold text-blue-600">{availableStudents.length} Students Available</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableStudents.map(stu => {
                  const isSelected = role === 'student' && currentStudent?.id === stu.id;
                  return (
                    <div
                      key={stu.id}
                      onClick={() => {
                        selectStudent(stu);
                        onClose();
                      }}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/30'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <img 
                        src={stu.avatar} 
                        alt={stu.name} 
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900 truncate">{stu.name}</p>
                          {isSelected && <Check size={14} className="text-blue-600" />}
                        </div>
                        <p className="text-[11px] text-slate-500">ID: {stu.regNo} • <span className="font-semibold text-slate-700">{stu.hostelBlock}</span> #{stu.roomNo}</p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{stu.course}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Staff Personas */}
          {activeTab === 'staff' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 pb-1">
                Select a staff member responsible for inspecting, assigning, and resolving issues:
              </div>
              <div className="space-y-2">
                {availableStaff.map(stf => {
                  const isSelected = role === 'staff' && currentStaff?.id === stf.id;
                  return (
                    <div
                      key={stf.id}
                      onClick={() => {
                        selectStaff(stf);
                        onClose();
                      }}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/30'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                          {stf.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{stf.name}</p>
                          <p className="text-[11px] text-blue-700 font-medium">{stf.role}</p>
                          <p className="text-[10px] text-slate-400">{stf.plant} • {stf.email}</p>
                        </div>
                      </div>
                      {isSelected ? (
                        <span className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg inline-flex items-center gap-1">
                          <Check size={12} /> Active
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 group-hover:text-slate-600 font-medium">
                          Select
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Admin Persona */}
          {activeTab === 'admin' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Dr. K. S. Randhawa</h4>
                  <p className="text-xs text-blue-600 font-medium">Chief Warden & Facilities Oversight Director</p>
                  <p className="text-xs text-slate-500 mt-1">
                    LPU Student Welfare & Campus Facilities Directorate. Oversees university-wide laundry turnaround SLAs, dispute appeals, and vendor performance audits.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  selectAdmin();
                  onClose();
                }}
                className="w-full py-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <ShieldCheck size={18} />
                Switch to Administrator Dashboard
              </button>
            </div>
          )}

          {/* Prototype Context Banner */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2.5">
            <Info size={16} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Academic Design Thinking Prototype Notice</p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                All data is synchronized seamlessly via browser LocalStorage. Changes made in Student view are immediately visible in Staff and Admin view on the same machine.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50"
          >
            <RotateCcw size={14} />
            <span>Reset Demo Data</span>
          </button>

          {resetSuccess && (
            <span className="text-xs font-medium text-emerald-600 animate-in fade-in">
              Data reset successfully!
            </span>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
