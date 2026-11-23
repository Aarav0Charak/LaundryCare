// Utility to generate unique sequential and safe IDs

export function generateComplaintId(existingComplaints = []) {
  const currentYear = 2026;
  const prefix = `LC-${currentYear}-`;
  
  // Extract existing sequence numbers
  let maxSeq = 137;
  existingComplaints.forEach(c => {
    if (c.id && c.id.startsWith(prefix)) {
      const numPart = parseInt(c.id.replace(prefix, ''), 10);
      if (!isNaN(numPart) && numPart > maxSeq) {
        maxSeq = numPart;
      }
    }
  });

  const nextSeq = maxSeq + 1;
  return `${prefix}${String(nextSeq).padStart(5, '0')}`;
}

export function generateId(prefix = 'ID') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
}
