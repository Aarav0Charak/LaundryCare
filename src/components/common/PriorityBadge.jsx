import React from 'react';
import { AlertTriangle, ArrowUpRight, Minus } from 'lucide-react';

export default function PriorityBadge({ priority = 'Low', size = 'md' }) {
  const configs = {
    High: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: AlertTriangle,
      dot: 'bg-rose-500'
    },
    Medium: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: ArrowUpRight,
      dot: 'bg-amber-500'
    },
    Low: {
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      icon: Minus,
      dot: 'bg-slate-400'
    }
  };

  const config = configs[priority] || configs.Low;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-0.5 font-medium'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-md border ${config.bg} ${sizeClasses[size]}`}>
      <Icon size={12} className="shrink-0" />
      <span>{priority}</span>
    </span>
  );
}
