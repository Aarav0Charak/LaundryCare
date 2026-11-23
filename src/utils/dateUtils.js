// Date formatting and calculation utilities

export function formatDate(isoString) {
  if (!isoString) return '—';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return isoString;
  }
}

export function formatDateTime(isoString) {
  if (!isoString) return '—';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return isoString;
  }
}

export function timeAgo(isoString) {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    const now = new Date('2026-11-16T16:25:00Z'); // Context anchored time
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 30) return `${days}d ago`;
    return formatDate(isoString);
  } catch {
    return formatDate(isoString);
  }
}

// Calculate turnaround hours between submission and resolved/closed
export function calculateTurnaroundHours(startIso, endIso) {
  if (!startIso || !endIso) return null;
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  const diffHours = (end - start) / (1000 * 60 * 60);
  return Math.max(0, Math.round(diffHours * 10) / 10);
}

// Determine if a pending complaint is overdue (e.g. > 72 hours without resolution)
export function isOverdue(complaint) {
  if (['Resolved', 'Closed'].includes(complaint.status)) return false;
  const created = new Date(complaint.createdAt).getTime();
  const now = new Date('2026-11-16T16:25:00Z').getTime();
  const hoursElapsed = (now - created) / (1000 * 60 * 60);
  return hoursElapsed > 72; // SLA standard 72 hours
}
