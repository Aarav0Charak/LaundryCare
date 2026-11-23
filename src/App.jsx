import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider, useData } from './context/DataContext';

// Common Components
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import RoleSwitcherModal from './components/common/RoleSwitcherModal';
import DemoLoginScreen from './components/common/DemoLoginScreen';

// Student Components
import StudentOverview from './components/student/StudentOverview';
import ComplaintForm from './components/student/ComplaintForm';
import ComplaintTrackingView from './components/student/ComplaintTrackingView';
import StudentComplaintsList from './components/student/StudentComplaintsList';

// Staff Components
import StaffOverview from './components/staff/StaffOverview';
import StaffComplaintTable from './components/staff/StaffComplaintTable';
import StaffInvestigationView from './components/staff/StaffInvestigationView';

// Admin Components
import AdminOverview from './components/admin/AdminOverview';
import StaffPerformanceTable from './components/admin/StaffPerformanceTable';
import AllComplaintsAudit from './components/admin/AllComplaintsAudit';

function AppContent() {
  const { role, currentStudent } = useAuth();
  const { complaints } = useData();

  // Navigation State
  const [showDemoLogin, setShowDemoLogin] = useState(false);
  const [currentView, setCurrentView] = useState(() => {
    if (role === 'student') return 'student-overview';
    if (role === 'staff') return 'staff-overview';
    if (role === 'admin') return 'admin-overview';
    return 'student-overview';
  });

  const [selectedComplaintId, setSelectedComplaintId] = useState(() => {
    return 'LC-2026-00125'; // Default to interesting initial case
  });

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync default view when role changes
  React.useEffect(() => {
    if (role === 'student' && !currentView.startsWith('student')) {
      setCurrentView('student-overview');
    } else if (role === 'staff' && !currentView.startsWith('staff')) {
      setCurrentView('staff-overview');
    } else if (role === 'admin' && !currentView.startsWith('admin')) {
      setCurrentView('admin-overview');
    }
  }, [role]);

  // Navigate to complaint tracking/investigation from global search or notification
  const handleSelectComplaintFromSearchOrNotif = (complaintId) => {
    setSelectedComplaintId(complaintId);
    if (role === 'student') {
      setCurrentView('student-tracking');
    } else if (role === 'staff') {
      setCurrentView('staff-investigation');
    } else if (role === 'admin') {
      setCurrentView('admin-audit');
    }
  };

  if (showDemoLogin) {
    return (
      <DemoLoginScreen
        onProceedToApp={() => {
          setShowDemoLogin(false);
          if (role === 'student') setCurrentView('student-overview');
          if (role === 'staff') setCurrentView('staff-overview');
          if (role === 'admin') setCurrentView('admin-overview');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        
        {/* Top Navbar */}
        <Navbar
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenRoleModal={() => setIsRoleModalOpen(true)}
          onSearchSelectComplaint={handleSelectComplaintFromSearchOrNotif}
        />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          
          {/* STUDENT VIEWS */}
          {role === 'student' && (
            <>
              {currentView === 'student-overview' && (
                <StudentOverview
                  onNavigate={setCurrentView}
                  onSelectComplaint={(id) => {
                    setSelectedComplaintId(id);
                    setCurrentView('student-tracking');
                  }}
                />
              )}

              {currentView === 'student-register' && (
                <ComplaintForm
                  onSuccess={(newId) => {
                    setSelectedComplaintId(newId);
                    setCurrentView('student-tracking');
                  }}
                  onCancel={() => setCurrentView('student-overview')}
                />
              )}

              {currentView === 'student-tracking' && (
                <ComplaintTrackingView
                  selectedComplaintId={selectedComplaintId}
                  onSelectComplaint={setSelectedComplaintId}
                  onBackToList={() => setCurrentView('student-complaints')}
                />
              )}

              {currentView === 'student-complaints' && (
                <StudentComplaintsList
                  onSelectComplaint={(id) => {
                    setSelectedComplaintId(id);
                    setCurrentView('student-tracking');
                  }}
                  onRegisterNew={() => setCurrentView('student-register')}
                />
              )}
            </>
          )}

          {/* LAUNDRY STAFF VIEWS */}
          {role === 'staff' && (
            <>
              {currentView === 'staff-overview' && (
                <StaffOverview
                  onNavigate={setCurrentView}
                  onSelectComplaint={(id) => {
                    setSelectedComplaintId(id);
                    setCurrentView('staff-investigation');
                  }}
                />
              )}

              {currentView === 'staff-management' && (
                <StaffComplaintTable
                  onSelectComplaint={setSelectedComplaintId}
                  onOpenInvestigation={() => setCurrentView('staff-investigation')}
                />
              )}

              {currentView === 'staff-investigation' && (
                <StaffInvestigationView
                  complaintId={selectedComplaintId}
                  onBackToList={() => setCurrentView('staff-management')}
                />
              )}
            </>
          )}

          {/* ADMINISTRATOR VIEWS */}
          {role === 'admin' && (
            <>
              {currentView === 'admin-overview' && (
                <AdminOverview
                  onNavigate={setCurrentView}
                  onSelectComplaint={(id) => {
                    setSelectedComplaintId(id);
                    setCurrentView('admin-audit');
                  }}
                />
              )}

              {currentView === 'admin-audit' && (
                <AllComplaintsAudit
                  onSelectComplaint={(id) => {
                    setSelectedComplaintId(id);
                  }}
                />
              )}

              {currentView === 'admin-performance' && (
                <StaffPerformanceTable
                  onSelectComplaint={(id) => {
                    setSelectedComplaintId(id);
                    setCurrentView('admin-audit');
                  }}
                  onNavigate={setCurrentView}
                />
              )}
            </>
          )}

        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white/70 py-4 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">LaundryCare LPU Prototype</span>
            <span>•</span>
            <span>Academic Design Thinking Prototype for Lovely Professional University</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowDemoLogin(true)}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Demo Role Selector
            </button>
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              Switch Persona ({role})
            </button>
          </div>
        </footer>

      </div>

      {/* Role & Persona Switcher Modal */}
      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}
