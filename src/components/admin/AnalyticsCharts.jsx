import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';

export default function AnalyticsCharts({ complaints }) {
  // 1. Data by Category
  const categoryCountMap = {};
  complaints.forEach(c => {
    categoryCountMap[c.category] = (categoryCountMap[c.category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryCountMap).map(cat => ({
    name: cat.length > 18 ? cat.substring(0, 16) + '...' : cat,
    fullName: cat,
    count: categoryCountMap[cat]
  })).sort((a, b) => b.count - a.count);

  // 2. Data by Status Distribution
  const statusCountMap = {};
  complaints.forEach(c => {
    statusCountMap[c.status] = (statusCountMap[c.status] || 0) + 1;
  });

  const statusColors = {
    'Complaint Submitted': '#94a3b8',
    'Complaint Received by Staff': '#3b82f6',
    'Under Investigation': '#6366f1',
    'Action Required / Awaiting Student': '#f59e0b',
    'Resolution Proposed': '#a855f7',
    'Resolved': '#10b981',
    'Closed': '#0d9488'
  };

  const statusData = Object.keys(statusCountMap).map(st => ({
    name: st,
    value: statusCountMap[st],
    color: statusColors[st] || '#3b82f6'
  }));

  // 3. Trends over time / monthly
  const monthlyData = [
    { month: 'Jul', received: 18, resolved: 18 },
    { month: 'Aug', received: 34, resolved: 32 },
    { month: 'Sep', received: 42, resolved: 39 },
    { month: 'Oct', received: 58, resolved: 53 },
    { month: 'Nov', received: complaints.length, resolved: complaints.filter(c => ['Resolved', 'Closed'].includes(c.status)).length }
  ];

  // 4. Breakdown by Hostel Block Zone
  const hostelCountMap = {};
  complaints.forEach(c => {
    const block = c.hostelBlock || 'Other';
    hostelCountMap[block] = (hostelCountMap[block] || 0) + 1;
  });

  const hostelData = Object.keys(hostelCountMap)
    .map(hb => ({ hostel: hb, complaints: hostelCountMap[hb] }))
    .sort((a, b) => b.complaints - a.complaints)
    .slice(0, 6);

  return (
    <div className="space-y-6">
      
      {/* Row 1: Category Bar Chart & Status Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Complaints by Category */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Complaints by Category</h3>
              <p className="text-xs text-slate-500">Distribution across reported complaint types</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
              {complaints.length} Total
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#64748b' }} 
                  angle={-20} 
                  textAnchor="end" 
                  interval={0} 
                />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-lg">
                          <p className="font-bold">{data.fullName}</p>
                          <p className="text-blue-300 font-mono mt-0.5">{data.count} Complaints</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Donut Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Lifecycle Status Distribution</h3>
              <p className="text-xs text-slate-500">Current progress stages of all complaints</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              Active Cases
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-2 rounded-xl text-xs shadow-lg">
                          <p className="font-bold">{data.name}</p>
                          <p className="font-mono mt-0.5">{data.value} cases ({Math.round((data.value / complaints.length) * 100)}%)</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Row 2: Resolution Trends Over Time & Hostel Block Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly Complaint Resolution Trends */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Monthly Complaint & Resolution Trends</h3>
              <p className="text-xs text-slate-500">Semester intake volume vs resolved rate</p>
            </div>
            <span className="text-xs font-mono text-slate-400">2026-27</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-lg">
                          <p className="font-bold">{label} 2026</p>
                          <p className="text-blue-300">Received: {payload[0]?.value}</p>
                          <p className="text-emerald-300">Resolved: {payload[1]?.value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="received" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRec)" name="Received" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" fillOpacity={1} fill="url(#colorRes)" name="Resolved" />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '5px' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Complaints by Hostel Block */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Highest Volume Hostel Blocks</h3>
              <p className="text-xs text-slate-500">Hostel collection points with most complaints</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              Campus Hotspots
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hostelData} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis type="category" dataKey="hostel" tick={{ fontSize: 11, fill: '#1e293b', fontWeight: 600 }} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-2 rounded-xl text-xs shadow-lg">
                          <p className="font-bold">{d.hostel}</p>
                          <p className="text-teal-300">{d.complaints} complaints recorded</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="complaints" fill="#0d9488" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
