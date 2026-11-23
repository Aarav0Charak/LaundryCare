import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { timeAgo } from '../../utils/dateUtils';
import { 
  Bell, 
  Check, 
  Clock, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  ExternalLink 
} from 'lucide-react';

export default function NotificationDropdown({ isOpen, onClose, onSelectComplaint }) {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const { role, currentStudent } = useAuth();

  if (!isOpen) return null;

  // Filter relevant notifications
  const userNotifications = notifications.filter(n => {
    if (role === 'student') {
      return n.recipientRole === 'student' && (!n.studentId || n.studentId === currentStudent?.id);
    }
    if (role === 'staff') {
      return n.recipientRole === 'staff' || n.recipientRole === 'all';
    }
    if (role === 'admin') {
      return n.recipientRole === 'admin' || n.recipientRole === 'all';
    }
    return true;
  });

  const unreadCount = userNotifications.filter(n => !n.read).length;

  const getNotifIcon = (type) => {
    switch (type) {
      case 'submitted':
        return <Clock size={16} className="text-blue-600" />;
      case 'investigation':
        return <Search size={16} className="text-indigo-600" />;
      case 'info_requested':
        return <AlertCircle size={16} className="text-amber-600" />;
      case 'resolution_proposed':
        return <HelpCircle size={16} className="text-purple-600" />;
      case 'resolved':
      case 'closed':
        return <CheckCircle2 size={16} className="text-emerald-600" />;
      default:
        return <Bell size={16} className="text-slate-500" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div className="absolute right-0 mt-2 w-96 max-w-[92vw] bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
        {/* Header */}
        <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 text-sm">Notifications</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={() => markAllNotificationsRead(role, currentStudent?.id)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
            >
              <Check size={13} />
              Mark all read
            </button>
          )}
        </div>

        {/* List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
          {userNotifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <Bell size={28} className="mx-auto mb-2 stroke-1 opacity-50" />
              <p className="text-sm">No notifications right now</p>
            </div>
          ) : (
            userNotifications.map(n => (
              <div
                key={n.id}
                onClick={() => {
                  markNotificationRead(n.id);
                  if (n.complaintId && onSelectComplaint) {
                    onSelectComplaint(n.complaintId);
                    onClose();
                  }
                }}
                className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                  !n.read ? 'bg-blue-50/40' : ''
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                  {getNotifIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <p className={`text-xs ${!n.read ? 'font-bold text-slate-900' : 'font-medium text-slate-800'}`}>
                      {n.title}
                    </p>
                    <span className="text-[10px] text-slate-400 shrink-0 whitespace-nowrap">
                      {timeAgo(n.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">
                    {n.message}
                  </p>
                  {n.complaintId && (
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] font-mono text-blue-600 font-medium">
                      <span>{n.complaintId}</span>
                      <ExternalLink size={10} />
                    </div>
                  )}
                </div>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 text-center border-t border-slate-100">
          <p className="text-[11px] text-slate-400">
            Realtime updates for {role.toUpperCase()} workspace
          </p>
        </div>
      </div>
    </>
  );
}
