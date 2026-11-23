import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_COMPLAINTS, INITIAL_NOTIFICATIONS } from '../data/initialData';
import { generateComplaintId, generateId } from '../utils/idGenerator';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  COMPLAINTS: 'laundrycare_complaints_v1',
  NOTIFICATIONS: 'laundrycare_notifications_v1',
};

export const DataProvider = ({ children }) => {
  // Central Complaints State
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Failed to parse cached complaints", e);
      }
    }
    return INITIAL_COMPLAINTS;
  });

  // Central Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Failed to parse cached notifications", e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Push a new notification helper
  const addNotification = (notif) => {
    const newNotif = {
      id: generateId('NOTIF'),
      timestamp: new Date().toISOString(),
      read: false,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // 1. Create a new complaint
  const createComplaint = (formData, student) => {
    const newId = generateComplaintId(complaints);
    const nowIso = new Date().toISOString();

    const newComplaint = {
      id: newId,
      studentId: student.id,
      studentName: student.name,
      hostelBlock: formData.hostelBlock || student.hostelBlock,
      roomNo: formData.roomNo || student.roomNo,
      laundryTrackingId: formData.laundryTrackingId || `LPU-LND-${Math.floor(1000 + Math.random() * 9000)}`,
      submissionDate: formData.submissionDate || nowIso.split('T')[0],
      collectionDate: formData.collectionDate || '',
      category: formData.category,
      clothingItem: formData.clothingItem,
      affectedCount: Number(formData.affectedCount) || 1,
      description: formData.description,
      evidenceImages: formData.evidenceImages || [],
      additionalInfo: formData.additionalInfo || '',
      priority: formData.priority || (['Missing clothes', 'Damaged clothes'].includes(formData.category) ? 'High' : 'Medium'),
      status: 'Complaint Submitted',
      assignedStaff: 'Balwinder Singh', // auto-assign intake supervisor
      createdAt: nowIso,
      updatedAt: nowIso,
      timeline: [
        {
          id: generateId('TL'),
          stage: 'Complaint Submitted',
          title: 'Complaint Lodged by Student',
          timestamp: nowIso,
          authorRole: 'Student',
          authorName: student.name,
          remarks: `Initial submission: ${formData.affectedCount || 1}x ${formData.clothingItem}. Category: ${formData.category}.`,
          actionType: 'status_change'
        }
      ],
      internalNotes: [
        {
          id: generateId('IN'),
          timestamp: nowIso,
          authorName: 'System Gatekeeper',
          authorRole: 'Automated Dispatch',
          note: `Complaint received online via student portal. Routed to Central Plant BH-4 intake queue.`
        }
      ],
      proposedResolution: null,
      studentFeedback: null
    };

    setComplaints(prev => [newComplaint, ...prev]);

    // Student notification
    addNotification({
      recipientRole: 'student',
      studentId: student.id,
      complaintId: newId,
      title: 'Complaint Registered Successfully',
      message: `Your complaint #${newId} for ${formData.clothingItem} has been received and queued for investigation.`,
      type: 'submitted'
    });

    // Staff notification
    addNotification({
      recipientRole: 'staff',
      studentId: null,
      complaintId: newId,
      title: `New Complaint: ${newId} (${newComplaint.priority} Priority)`,
      message: `${student.name} (${newComplaint.hostelBlock}) reported: ${formData.category} - ${formData.clothingItem}.`,
      type: 'submitted'
    });

    return newComplaint;
  };

  // 2. Staff updates complaint status
  const updateComplaintStatus = (complaintId, newStatus, remarks, staffName, authorRole = 'Staff') => {
    const nowIso = new Date().toISOString();

    setComplaints(prev => prev.map(c => {
      if (c.id !== complaintId) return c;

      const updatedTimeline = [
        ...c.timeline,
        {
          id: generateId('TL'),
          stage: newStatus,
          title: `Status updated to ${newStatus}`,
          timestamp: nowIso,
          authorRole: authorRole,
          authorName: staffName,
          remarks: remarks || `Status transitioned to ${newStatus}`,
          actionType: 'status_change'
        }
      ];

      return {
        ...c,
        status: newStatus,
        updatedAt: nowIso,
        timeline: updatedTimeline
      };
    }));

    // Find complaint for notifications
    const target = complaints.find(c => c.id === complaintId);
    if (target) {
      addNotification({
        recipientRole: 'student',
        studentId: target.studentId,
        complaintId,
        title: `Complaint Status: ${newStatus}`,
        message: `${staffName} updated #${complaintId}: ${remarks || newStatus}`,
        type: newStatus === 'Resolved' ? 'resolved' : (newStatus === 'Closed' ? 'closed' : 'investigation')
      });
    }
  };

  // 3. Staff adds internal note (never shown to student)
  const addInternalNote = (complaintId, noteText, authorName, authorRole = 'Staff') => {
    const nowIso = new Date().toISOString();
    const newNote = {
      id: generateId('IN'),
      timestamp: nowIso,
      authorName,
      authorRole,
      note: noteText
    };

    setComplaints(prev => prev.map(c => {
      if (c.id !== complaintId) return c;
      return {
        ...c,
        internalNotes: [...(c.internalNotes || []), newNote],
        updatedAt: nowIso
      };
    }));
  };

  // 4. Staff requests student action / info
  const requestStudentAction = (complaintId, instructions, staffName) => {
    const nowIso = new Date().toISOString();

    setComplaints(prev => prev.map(c => {
      if (c.id !== complaintId) return c;

      const updatedTimeline = [
        ...c.timeline,
        {
          id: generateId('TL'),
          stage: 'Action Required / Awaiting Student',
          title: 'Action / Information Required from Student',
          timestamp: nowIso,
          authorRole: 'Staff',
          authorName: staffName,
          remarks: instructions,
          actionType: 'action_requested'
        }
      ];

      return {
        ...c,
        status: 'Action Required / Awaiting Student',
        updatedAt: nowIso,
        timeline: updatedTimeline
      };
    }));

    const target = complaints.find(c => c.id === complaintId);
    if (target) {
      addNotification({
        recipientRole: 'student',
        studentId: target.studentId,
        complaintId,
        title: 'Action Required: Staff Needs Your Input',
        message: `${staffName}: "${instructions}"`,
        type: 'info_requested'
      });
    }
  };

  // 5. Student submits clarification/reply
  const submitStudentResponse = (complaintId, responseText, studentName) => {
    const nowIso = new Date().toISOString();

    setComplaints(prev => prev.map(c => {
      if (c.id !== complaintId) return c;

      const updatedTimeline = [
        ...c.timeline,
        {
          id: generateId('TL'),
          stage: 'Under Investigation',
          title: 'Student Provided Response / Clarification',
          timestamp: nowIso,
          authorRole: 'Student',
          authorName: studentName,
          remarks: responseText,
          actionType: 'student_reply'
        }
      ];

      return {
        ...c,
        status: 'Under Investigation',
        updatedAt: nowIso,
        timeline: updatedTimeline
      };
    }));

    addNotification({
      recipientRole: 'staff',
      studentId: null,
      complaintId,
      title: `Student Responded: #${complaintId}`,
      message: `${studentName} replied to inquiry: "${responseText.substring(0, 80)}..."`,
      type: 'investigation'
    });
  };

  // 6. Staff proposes a resolution
  const proposeResolution = (complaintId, resolutionData, staffName) => {
    const nowIso = new Date().toISOString();

    const resolutionObj = {
      description: resolutionData.description,
      compensationType: resolutionData.compensationType || 'found_and_ready',
      amount: resolutionData.amount || '',
      status: 'pending',
      proposedAt: nowIso,
      studentResponse: null,
      studentResponseAt: null
    };

    setComplaints(prev => prev.map(c => {
      if (c.id !== complaintId) return c;

      const updatedTimeline = [
        ...c.timeline,
        {
          id: generateId('TL'),
          stage: 'Resolution Proposed',
          title: 'Resolution Proposal Submitted to Student',
          timestamp: nowIso,
          authorRole: 'Staff',
          authorName: staffName,
          remarks: `${resolutionData.description} (${resolutionData.amount ? 'Comp: ' + resolutionData.amount : 'Action: ' + resolutionData.compensationType})`,
          actionType: 'status_change'
        }
      ];

      return {
        ...c,
        status: 'Resolution Proposed',
        proposedResolution: resolutionObj,
        updatedAt: nowIso,
        timeline: updatedTimeline
      };
    }));

    const target = complaints.find(c => c.id === complaintId);
    if (target) {
      addNotification({
        recipientRole: 'student',
        studentId: target.studentId,
        complaintId,
        title: 'Resolution Proposed by Staff',
        message: `${staffName} proposed a resolution for #${complaintId}. Please review and accept or request revision.`,
        type: 'resolution_proposed'
      });
    }
  };

  // 7. Student responds to resolution (accept or request revision)
  const respondToResolution = (complaintId, actionType, studentComment, studentName) => {
    const nowIso = new Date().toISOString();
    const isAccepted = actionType === 'accept';
    const nextStatus = isAccepted ? 'Resolved' : 'Under Investigation';

    setComplaints(prev => prev.map(c => {
      if (c.id !== complaintId) return c;

      const updatedResolution = c.proposedResolution ? {
        ...c.proposedResolution,
        status: isAccepted ? 'accepted' : 'revision_requested',
        studentResponse: studentComment,
        studentResponseAt: nowIso
      } : null;

      const updatedTimeline = [
        ...c.timeline,
        {
          id: generateId('TL'),
          stage: nextStatus,
          title: isAccepted ? 'Resolution Accepted by Student' : 'Resolution Revision Requested by Student',
          timestamp: nowIso,
          authorRole: 'Student',
          authorName: studentName,
          remarks: studentComment || (isAccepted ? 'Student confirmed agreement with resolution proposal.' : 'Student requested reconsideration.'),
          actionType: isAccepted ? 'resolution_accepted' : 'revision_requested'
        }
      ];

      return {
        ...c,
        status: nextStatus,
        proposedResolution: updatedResolution,
        updatedAt: nowIso,
        timeline: updatedTimeline
      };
    }));

    addNotification({
      recipientRole: 'staff',
      studentId: null,
      complaintId,
      title: isAccepted ? `Resolution Accepted: #${complaintId}` : `Resolution Disputed: #${complaintId}`,
      message: `${studentName} ${isAccepted ? 'accepted the proposed resolution' : 'requested revision'}: "${(studentComment || '').substring(0, 80)}"`,
      type: isAccepted ? 'resolved' : 'investigation'
    });
  };

  // 8. Student submits feedback
  const submitFeedback = (complaintId, rating, comment) => {
    const nowIso = new Date().toISOString();
    setComplaints(prev => prev.map(c => {
      if (c.id !== complaintId) return c;
      return {
        ...c,
        studentFeedback: {
          rating,
          comment,
          submittedAt: nowIso
        }
      };
    }));
  };

  // 9. Staff or Admin closes complaint
  const closeComplaint = (complaintId, remarks, staffName, authorRole = 'Staff') => {
    updateComplaintStatus(complaintId, 'Closed', remarks || 'Case resolved and formally closed.', staffName, authorRole);
  };

  // 10. Change priority
  const updatePriority = (complaintId, newPriority, staffName) => {
    const nowIso = new Date().toISOString();
    setComplaints(prev => prev.map(c => {
      if (c.id !== complaintId) return c;
      return {
        ...c,
        priority: newPriority,
        updatedAt: nowIso,
        timeline: [
          ...c.timeline,
          {
            id: generateId('TL'),
            stage: c.status,
            title: `Priority updated to ${newPriority}`,
            timestamp: nowIso,
            authorRole: 'Staff',
            authorName: staffName,
            remarks: `Priority changed from ${c.priority} to ${newPriority}`,
            actionType: 'priority_change'
          }
        ]
      };
    }));
  };

  // 11. Assign staff member
  const assignStaffMember = (complaintId, newStaffName) => {
    const nowIso = new Date().toISOString();
    setComplaints(prev => prev.map(c => {
      if (c.id !== complaintId) return c;
      return {
        ...c,
        assignedStaff: newStaffName,
        updatedAt: nowIso,
        timeline: [
          ...c.timeline,
          {
            id: generateId('TL'),
            stage: c.status,
            title: `Reassigned to ${newStaffName}`,
            timestamp: nowIso,
            authorRole: 'Staff',
            authorName: 'Central Supervisor',
            remarks: `Investigation responsibility assigned to ${newStaffName}`,
            actionType: 'assignment'
          }
        ]
      };
    }));
  };

  // Notifications helpers
  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = (role, studentId = null) => {
    setNotifications(prev => prev.map(n => {
      if (role === 'student' && n.studentId === studentId) {
        return { ...n, read: true };
      }
      if (role !== 'student' && n.recipientRole === role) {
        return { ...n, read: true };
      }
      return n;
    }));
  };

  // Reset demo data
  const resetToDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.COMPLAINTS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    setComplaints(INITIAL_COMPLAINTS);
    setNotifications(INITIAL_NOTIFICATIONS);
  };

  return (
    <DataContext.Provider
      value={{
        complaints,
        notifications,
        createComplaint,
        updateComplaintStatus,
        addInternalNote,
        requestStudentAction,
        submitStudentResponse,
        proposeResolution,
        respondToResolution,
        submitFeedback,
        closeComplaint,
        updatePriority,
        assignStaffMember,
        markNotificationRead,
        markAllNotificationsRead,
        resetToDemoData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
