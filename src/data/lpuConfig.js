export const LPU_CONFIG = {
  university: "Lovely Professional University (LPU)",
  tagline: "Transparent Laundry Complaint & Resolution System",
  location: "Jalandhar - Delhi G.T. Road, Phagwara, Punjab 144411",
  academicYear: "2026-2027",
  hostels: [
    { id: "BH-1", name: "Boys Hostel 1 (BH-1)", zone: "North Campus" },
    { id: "BH-2", name: "Boys Hostel 2 (BH-2)", zone: "North Campus" },
    { id: "BH-3", name: "Boys Hostel 3 (BH-3)", zone: "Central Campus" },
    { id: "BH-4", name: "Boys Hostel 4 (BH-4 - Mega Plant)", zone: "Central Campus" },
    { id: "BH-5", name: "Boys Hostel 5 (BH-5)", zone: "East Campus" },
    { id: "BH-6", name: "Boys Hostel 6 (BH-6)", zone: "East Campus" },
    { id: "BH-7", name: "Boys Hostel 7 (BH-7)", zone: "South Campus" },
    { id: "BH-8", name: "Boys Hostel 8 (BH-8)", zone: "South Campus" },
    { id: "GH-1", name: "Girls Hostel 1 (GH-1)", zone: "West Campus" },
    { id: "GH-2", name: "Girls Hostel 2 (GH-2)", zone: "West Campus" },
    { id: "GH-3", name: "Girls Hostel 3 (GH-3)", zone: "West Campus" },
    { id: "GH-4", name: "Girls Hostel 4 (GH-4)", zone: "South Wing" },
    { id: "GH-5", name: "Girls Hostel 5 (GH-5)", zone: "South Wing" },
    { id: "GH-6", name: "Girls Hostel 6 (GH-6)", zone: "South Wing" },
    { id: "UL-A", name: "Uni-Living Apartments Block A", zone: "Executive Zone" },
  ],
  categories: [
    {
      id: "Missing clothes",
      label: "Missing clothes",
      defaultPriority: "High",
      description: "Clothing item was submitted with token but not returned in laundry lot",
      color: "red"
    },
    {
      id: "Damaged clothes",
      label: "Damaged clothes",
      defaultPriority: "High",
      description: "Torn fabric, severe color bleeding, iron burn, or chemical stains",
      color: "amber"
    },
    {
      id: "Clothes exchanged with another student",
      label: "Clothes exchanged with another student",
      defaultPriority: "Medium",
      description: "Received someone else's clothing or your labelled item went to another student",
      color: "purple"
    },
    {
      id: "Delayed laundry delivery",
      label: "Delayed laundry delivery",
      defaultPriority: "Low",
      description: "Laundry delivery delayed past standard 72-hour turnaround time",
      color: "blue"
    },
    {
      id: "Incorrect clothing count",
      label: "Incorrect clothing count",
      defaultPriority: "Medium",
      description: "Discrepancy between laundry drop-off slip count and return bundle count",
      color: "indigo"
    },
    {
      id: "Other",
      label: "Other laundry concern",
      defaultPriority: "Low",
      description: "Special wash requests, packaging problems, or billing issues",
      color: "slate"
    }
  ],
  stages: [
    { id: "Complaint Submitted", step: 1, label: "Complaint Submitted", color: "slate" },
    { id: "Complaint Received by Staff", step: 2, label: "Complaint Received by Staff", color: "blue" },
    { id: "Under Investigation", step: 3, label: "Under Investigation", color: "indigo" },
    { id: "Action Required / Awaiting Student", step: 4, label: "Action Required / Awaiting Student", color: "amber" },
    { id: "Resolution Proposed", step: 5, label: "Resolution Proposed", color: "purple" },
    { id: "Resolved", step: 6, label: "Resolved", color: "emerald" },
    { id: "Closed", step: 7, label: "Closed", color: "teal" }
  ],
  priorities: [
    { id: "Low", label: "Low Priority", badgeClass: "bg-slate-100 text-slate-700 border-slate-200" },
    { id: "Medium", label: "Medium Priority", badgeClass: "bg-amber-50 text-amber-700 border-amber-200" },
    { id: "High", label: "High Priority", badgeClass: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  staffMembers: [
    { id: "STF-01", name: "Balwinder Singh", role: "Laundry Supervisor", plant: "Central Plant BH-4", email: "balwinder.lnd@lpu.co.in" },
    { id: "STF-02", name: "Sunita Devi", role: "Intake & Inspection Lead", plant: "West Hub GH-2", email: "sunita.lnd@lpu.co.in" },
    { id: "STF-03", name: "Rajesh Kumar", role: "Floor Incharge", plant: "North Unit BH-1", email: "rajesh.lnd@lpu.co.in" },
    { id: "STF-04", name: "Harpreet Kaur", role: "Exchange Coordinator", plant: "Central Plant BH-4", email: "harpreet.lnd@lpu.co.in" },
    { id: "STF-05", name: "Manjeet Singh", role: "Logistics Dispatcher", plant: "Distribution Bay B", email: "manjeet.lnd@lpu.co.in" }
  ],
  adminMember: {
    id: "ADM-01",
    name: "Dr. K. S. Randhawa",
    role: "Chief Warden & Facilities Oversight Director",
    department: "LPU Department of Student Welfare & Campus Life",
    email: "warden.central@lpu.co.in"
  }
};
