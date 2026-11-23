import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  HelpCircle, 
  FileCheck, 
  Archive
} from 'lucide-react';

export const STATUS_CONFIG = {
  'Complaint Submitted': {
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
    icon: Clock,
  },
  'Complaint Received by Staff': {
    bg: 'bg-blue-50 text-blue-700 border-blue-200',
    dot: 'bg-blue-500',
    icon: FileCheck,
  },
  'Under Investigation': {
    bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    dot: 'bg-indigo-500 animate-pulse',
    icon: Search,
  },
  'Action Required / Awaiting Student': {
    bg: 'bg-amber-50 text-amber-800 border-amber-300',
    dot: 'bg-amber-500 animate-ping',
    icon: AlertCircle,
  },
  'Resolution Proposed': {
    bg: 'bg-purple-50 text-purple-700 border-purple-200',
    dot: 'bg-purple-500',
    icon: HelpCircle,
  },
  'Resolved': {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    icon: CheckCircle2,
  },
  'Closed': {
    bg: 'bg-slate-100 text-slate-600 border-slate-200',
    dot: 'bg-slate-400',
    icon: Archive,
  }
};

export default function StatusBadge({ status, size = 'md', showIcon = true }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['Complaint Submitted'];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5 font-medium'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${sizeClasses[size]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {showIcon && <Icon size={iconSizes[size]} className="shrink-0" />}
      <span>{status}</span>
    </span>
  );
}
