import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_STUDENTS } from '../data/initialData';
import { LPU_CONFIG } from '../data/lpuConfig';

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  CURRENT_ROLE: 'laundrycare_current_role',
  CURRENT_STUDENT: 'laundrycare_current_student',
  CURRENT_STAFF: 'laundrycare_current_staff',
};

export const AuthProvider = ({ children }) => {
  // Current active role: 'student' | 'staff' | 'admin'
  const [role, setRole] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE) || 'student';
  });

  // Active student profile (default: Rohan Sharma)
  const [currentStudent, setCurrentStudent] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_STUDENT);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return SAMPLE_STUDENTS[0];
  });

  // Active staff profile (default: Balwinder Singh)
  const [currentStaff, setCurrentStaff] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_STAFF);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return LPU_CONFIG.staffMembers[0];
  });

  // Admin profile
  const adminProfile = LPU_CONFIG.adminMember;

  // Persist role
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, role);
  }, [role]);

  // Persist student
  useEffect(() => {
    if (currentStudent) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_STUDENT, JSON.stringify(currentStudent));
    }
  }, [currentStudent]);

  // Persist staff
  useEffect(() => {
    if (currentStaff) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_STAFF, JSON.stringify(currentStaff));
    }
  }, [currentStaff]);

  const switchRole = (newRole) => {
    setRole(newRole);
  };

  const selectStudent = (student) => {
    setCurrentStudent(student);
    setRole('student');
  };

  const selectStaff = (staff) => {
    setCurrentStaff(staff);
    setRole('staff');
  };

  const selectAdmin = () => {
    setRole('admin');
  };

  // Get active user object based on current role
  const currentUser = {
    role,
    ...(role === 'student' ? currentStudent : {}),
    ...(role === 'staff' ? currentStaff : {}),
    ...(role === 'admin' ? adminProfile : {})
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        switchRole,
        currentStudent,
        selectStudent,
        currentStaff,
        selectStaff,
        adminProfile,
        selectAdmin,
        currentUser,
        availableStudents: SAMPLE_STUDENTS,
        availableStaff: LPU_CONFIG.staffMembers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
