import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  iconColor = 'text-blue-600', 
  iconBg = 'bg-blue-50',
  trend,
  onClick,
  active = false
}) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white border rounded-xl p-5 shadow-sm transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-blue-400 hover:shadow-md' : ''
      } ${active ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50/20' : 'border-slate-200'}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
            {trend && (
              <span className={`text-xs font-medium ${trend.isPositive ? 'text-emerald-600' : 'text-slate-500'}`}>
                {trend.text}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-500 pt-0.5">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${iconBg} ${iconColor} shrink-0`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
