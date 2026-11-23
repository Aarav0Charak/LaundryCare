// Realistic demo data for LaundryCare - LPU Prototype
// Contains 12 student profiles and 14 comprehensive complaints covering all categories,
// priorities, and lifecycle stages with detailed timelines and internal staff logs.

export const SAMPLE_STUDENTS = [
  {
    id: "STU-12014582",
    regNo: "12014582",
    name: "Rohan Sharma",
    hostelBlock: "BH-3",
    roomNo: "412-B",
    course: "B.Tech Computer Science & Engineering",
    phone: "+91 98721 44521",
    email: "rohan.12014582@lpu.in",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "STU-12105433",
    regNo: "12105433",
    name: "Ananya Verma",
    hostelBlock: "GH-2",
    roomNo: "208-A",
    course: "B.Des Fashion Design",
    phone: "+91 98882 11984",
    email: "ananya.12105433@lpu.in",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "STU-12009871",
    regNo: "12009871",
    name: "Aman Deep Singh",
    hostelBlock: "BH-4",
    roomNo: "305-C",
    course: "B.Tech Mechanical Engineering",
    phone: "+91 97791 88231",
    email: "amandeep.12009871@lpu.in",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "STU-12214309",
    regNo: "12214309",
    name: "Priya Patel",
    hostelBlock: "GH-4",
    roomNo: "114-B",
    course: "MBA Business Analytics",
    phone: "+91 94172 65432",
    email: "priya.12214309@lpu.in",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "STU-12018892",
    regNo: "12018892",
    name: "Vikramaditya Rao",
    hostelBlock: "BH-1",
    roomNo: "518-A",
    course: "B.Tech Electronics & Comm.",
    phone: "+91 98141 33290",
    email: "vikram.12018892@lpu.in",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "STU-12117654",
    regNo: "12117654",
    name: "Sneha Nair",
    hostelBlock: "GH-1",
    roomNo: "302-A",
    course: "B.Pharmacy",
    phone: "+91 98451 90281",
    email: "sneha.12117654@lpu.in",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "STU-12204918",
    regNo: "12204918",
    name: "Rahul Mehta",
    hostelBlock: "BH-6",
    roomNo: "219-B",
    course: "BBA Financial Markets",
    phone: "+91 98760 12345",
    email: "rahul.12204918@lpu.in",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "STU-12103490",
    regNo: "12103490",
    name: "Tanya Kapoor",
    hostelBlock: "GH-3",
    roomNo: "410-C",
    course: "B.A. Journalism & Mass Comm",
    phone: "+91 99150 77612",
    email: "tanya.12103490@lpu.in",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "STU-12003189",
    regNo: "12003189",
    name: "Kartik Joshi",
    hostelBlock: "BH-5",
    roomNo: "107-A",
    course: "B.Tech Civil Engineering",
    phone: "+91 98822 55431",
    email: "kartik.12003189@lpu.in",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "STU-12108761",
    regNo: "12108761",
    name: "Divya Menon",
    hostelBlock: "GH-5",
    roomNo: "201-B",
    course: "B.Sc. Biotechnology",
    phone: "+91 94471 22890",
    email: "divya.12108761@lpu.in",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "STU-12019943",
    regNo: "12019943",
    name: "Gurpreet Singh",
    hostelBlock: "BH-7",
    roomNo: "314-A",
    course: "B.Tech Aerospace Engineering",
    phone: "+91 98150 99811",
    email: "gurpreet.12019943@lpu.in",
    avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "STU-12211287",
    regNo: "12211287",
    name: "Ishaan Gupta",
    hostelBlock: "UL-A",
    roomNo: "602",
    course: "Integrated MBA",
    phone: "+91 97110 33451",
    email: "ishaan.12211287@lpu.in",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_COMPLAINTS = [
  {
    id: "LC-2026-00125",
    studentId: "STU-12014582",
    studentName: "Rohan Sharma",
    hostelBlock: "BH-3",
    roomNo: "412-B",
    laundryTrackingId: "LPU-LND-9821",
    submissionDate: "2026-11-10",
    collectionDate: "2026-11-13",
    category: "Missing clothes",
    clothingItem: "Formal Blue Raymond Shirt",
    affectedCount: 1,
    description: "Submitted 12 garments on Monday at BH-3 drop point with slip #9821. On receiving the clean bundle on Thursday, my formal light blue Raymond shirt (Size 40, embroidered collar monogram 'RS') was missing. Slip clearly records 3 formal shirts, but received only 2.",
    evidenceImages: [
      {
        url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80",
        caption: "Drop slip #9821 showing 3 formal shirts marked"
      }
    ],
    additionalInfo: "I have campus placement interview scheduled on Nov 18th, this shirt is needed urgently.",
    priority: "High",
    status: "Under Investigation",
    assignedStaff: "Balwinder Singh",
    createdAt: "2026-11-13T14:30:00Z",
    updatedAt: "2026-11-15T11:20:00Z",
    timeline: [
      {
        id: "TL-001",
        stage: "Complaint Submitted",
        title: "Complaint Lodged by Student",
        timestamp: "2026-11-13T14:30:00Z",
        authorRole: "Student",
        authorName: "Rohan Sharma",
        remarks: "Complaint registered with slip #9821 for 1 missing formal blue Raymond shirt.",
        actionType: "status_change"
      },
      {
        id: "TL-002",
        stage: "Complaint Received by Staff",
        title: "Acknowledged by Central Laundry Helpdesk",
        timestamp: "2026-11-13T16:10:00Z",
        authorRole: "Staff",
        authorName: "Balwinder Singh",
        remarks: "Received and logged in Central Laundry BH-4 tracking log. Assigned priority: High.",
        actionType: "status_change"
      },
      {
        id: "TL-003",
        stage: "Under Investigation",
        title: "Bin Auditing at Plant BH-4",
        timestamp: "2026-11-14T10:45:00Z",
        authorRole: "Staff",
        authorName: "Balwinder Singh",
        remarks: "Checked sorting conveyor and pressing line for lot #9821. Two untagged blue shirts found in excess bay, verifying barcode tag with batch supervisor.",
        actionType: "investigation_update"
      }
    ],
    internalNotes: [
      {
        id: "IN-001",
        timestamp: "2026-11-13T16:12:00Z",
        authorName: "Balwinder Singh",
        authorRole: "Laundry Supervisor",
        note: "Drop slip carbon copy verified from BH-3 counter register. Count shows 12 items (3 shirts, 4 t-shirts, 3 trousers, 2 towels). Return lot was dispatched as 11 items. 1 shirt missed in dry bay."
      },
      {
        id: "IN-002",
        timestamp: "2026-11-14T11:00:00Z",
        authorName: "Balwinder Singh",
        authorRole: "Laundry Supervisor",
        note: "Found a Raymond shirt size 40 in sorting bay bin #4B. Barcode tag was partially detached. Verifying with BH-3 slip records before notifying student."
      }
    ],
    proposedResolution: null,
    studentFeedback: null
  },
  {
    id: "LC-2026-00126",
    studentId: "STU-12105433",
    studentName: "Ananya Verma",
    hostelBlock: "GH-2",
    roomNo: "208-A",
    laundryTrackingId: "LPU-LND-9742",
    submissionDate: "2026-11-08",
    collectionDate: "2026-11-12",
    category: "Damaged clothes",
    clothingItem: "Black Linen Trousers (Zara)",
    affectedCount: 1,
    description: "My black Zara linen trousers came back with a severe 4-inch tear along the right seam and heavy iron shine marks on the fabric. The trousers were brand new and submitted in perfect condition.",
    evidenceImages: [
      {
        url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
        caption: "Photograph of seam tear and heat shine marks on black linen"
      }
    ],
    additionalInfo: "Purchased last month for Rs 2,490. Invoice available if needed.",
    priority: "High",
    status: "Resolution Proposed",
    assignedStaff: "Sunita Devi",
    createdAt: "2026-11-12T16:00:00Z",
    updatedAt: "2026-11-15T14:45:00Z",
    timeline: [
      {
        id: "TL-101",
        stage: "Complaint Submitted",
        title: "Complaint Registered",
        timestamp: "2026-11-12T16:00:00Z",
        authorRole: "Student",
        authorName: "Ananya Verma",
        remarks: "Submitted damage report with uploaded photographic evidence.",
        actionType: "status_change"
      },
      {
        id: "TL-102",
        stage: "Complaint Received by Staff",
        title: "Assigned to Inspection Desk",
        timestamp: "2026-11-12T17:30:00Z",
        authorRole: "Staff",
        authorName: "Sunita Devi",
        remarks: "Complaint reviewed. High priority assigned due to fabric damage.",
        actionType: "status_change"
      },
      {
        id: "TL-103",
        stage: "Under Investigation",
        title: "Pressing Unit Audit",
        timestamp: "2026-11-13T12:00:00Z",
        authorRole: "Staff",
        authorName: "Sunita Devi",
        remarks: "Examined steam press log on Line 3. Operator acknowledged mechanical tension jam during cycle.",
        actionType: "investigation_update"
      },
      {
        id: "TL-104",
        stage: "Resolution Proposed",
        title: "Resolution Offer Submitted to Student",
        timestamp: "2026-11-15T14:45:00Z",
        authorRole: "Staff",
        authorName: "Sunita Devi",
        remarks: "We sincerely apologize for the steam press malfunction. We propose professional invisible mending by master tailor or a replacement compensation credit of ₹1,800 to your laundry student account.",
        actionType: "status_change"
      }
    ],
    internalNotes: [
      {
        id: "IN-101",
        timestamp: "2026-11-13T12:15:00Z",
        authorName: "Sunita Devi",
        authorRole: "Intake Lead",
        note: "Steam roller roller-4 was serviced improperly on Nov 9. Operator Joginder confirmed cloth snagged. Damage confirmed to be plant fault."
      }
    ],
    proposedResolution: {
      description: "Complimentary professional invisible mending at campus master tailor plus Rs 1,800 laundry credit voucher approved by Facilities Warden.",
      compensationType: "replacement",
      amount: "₹1,800 + Tailor repair",
      status: "pending",
      proposedAt: "2026-11-15T14:45:00Z",
      studentResponse: null,
      studentResponseAt: null
    },
    studentFeedback: null
  },
  {
    id: "LC-2026-00127",
    studentId: "STU-12009871",
    studentName: "Aman Deep Singh",
    hostelBlock: "BH-4",
    roomNo: "305-C",
    laundryTrackingId: "LPU-LND-9610",
    submissionDate: "2026-11-09",
    collectionDate: "2026-11-12",
    category: "Clothes exchanged with another student",
    clothingItem: "Puma Maroon Sports Hoodie (Size L)",
    affectedCount: 1,
    description: "I received a Navy Blue H&M Sweatshirt (Size M) with tag #4402 instead of my Maroon Puma Hoodie with initials 'ADS' on the inner neck tag.",
    evidenceImages: [
      {
        url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
        caption: "Received wrong item: Navy Blue H&M Sweatshirt with tag #4402"
      }
    ],
    additionalInfo: "I have deposited the received wrong hoodie at BH-4 laundry desk.",
    priority: "Medium",
    status: "Action Required / Awaiting Student",
    assignedStaff: "Harpreet Kaur",
    createdAt: "2026-11-12T18:30:00Z",
    updatedAt: "2026-11-15T09:30:00Z",
    timeline: [
      {
        id: "TL-201",
        stage: "Complaint Submitted",
        title: "Complaint Lodged",
        timestamp: "2026-11-12T18:30:00Z",
        authorRole: "Student",
        authorName: "Aman Deep Singh",
        remarks: "Exchanged hoodie reported. Deposited wrong item at BH-4 desk.",
        actionType: "status_change"
      },
      {
        id: "TL-202",
        stage: "Complaint Received by Staff",
        title: "Assigned to Exchange Coordinator",
        timestamp: "2026-11-13T09:00:00Z",
        authorRole: "Staff",
        authorName: "Harpreet Kaur",
        remarks: "Cross-referencing tag #4402 in student directory.",
        actionType: "status_change"
      },
      {
        id: "TL-203",
        stage: "Under Investigation",
        title: "Cross Student Identified",
        timestamp: "2026-11-14T15:20:00Z",
        authorRole: "Staff",
        authorName: "Harpreet Kaur",
        remarks: "Tag #4402 belongs to Rahul Mehta (BH-6). Contacted Rahul and he confirmed having your Maroon Puma hoodie in safe custody.",
        actionType: "investigation_update"
      },
      {
        id: "TL-204",
        stage: "Action Required / Awaiting Student",
        title: "Verification & Counter Pickup Required",
        timestamp: "2026-11-15T09:30:00Z",
        authorRole: "Staff",
        authorName: "Harpreet Kaur",
        remarks: "Your Puma hoodie has been retrieved and is kept at BH-4 Laundry Desk. Please visit BH-4 counter between 4 PM - 7 PM today with your original student ID card to inspect and collect it.",
        actionType: "action_requested"
      }
    ],
    internalNotes: [
      {
        id: "IN-201",
        timestamp: "2026-11-14T15:30:00Z",
        authorName: "Harpreet Kaur",
        authorRole: "Exchange Coordinator",
        note: "Rahul Mehta (BH-6) handed over the Puma maroon hoodie on Nov 14 evening. Verified tag ADS matches Aman Deep. Kept in locked cubby #12 at BH-4."
      }
    ],
    proposedResolution: null,
    studentFeedback: null
  },
  {
    id: "LC-2026-00128",
    studentId: "STU-12214309",
    studentName: "Priya Patel",
    hostelBlock: "GH-4",
    roomNo: "114-B",
    laundryTrackingId: "LPU-LND-9504",
    submissionDate: "2026-11-05",
    collectionDate: "2026-11-09",
    category: "Delayed laundry delivery",
    clothingItem: "Full weekly bundle (14 items)",
    affectedCount: 14,
    description: "Laundry was submitted on Nov 5th with guaranteed return on Nov 8th. It is now Nov 11th (over 6 days) and counter says 'lot not arrived from central wash unit'.",
    evidenceImages: [],
    additionalInfo: "Need daily uniform clothes for hospital/lab visits.",
    priority: "Low",
    status: "Resolved",
    assignedStaff: "Manjeet Singh",
    createdAt: "2026-11-11T10:15:00Z",
    updatedAt: "2026-11-14T17:00:00Z",
    timeline: [
      {
        id: "TL-301",
        stage: "Complaint Submitted",
        title: "Delay Reported",
        timestamp: "2026-11-11T10:15:00Z",
        authorRole: "Student",
        authorName: "Priya Patel",
        remarks: "Bundle overdue by 3 days.",
        actionType: "status_change"
      },
      {
        id: "TL-302",
        stage: "Complaint Received by Staff",
        title: "Dispatched to Logistics",
        timestamp: "2026-11-11T11:00:00Z",
        authorRole: "Staff",
        authorName: "Manjeet Singh",
        remarks: "Priority expedited due to lab uniform requirements.",
        actionType: "status_change"
      },
      {
        id: "TL-303",
        stage: "Under Investigation",
        title: "Van Route Dispatch Check",
        timestamp: "2026-11-12T14:00:00Z",
        authorRole: "Staff",
        authorName: "Manjeet Singh",
        remarks: "Bundle was placed in Van 3 spillover crate during heavy rain dispatch. Located safely at Central Plant packaging zone.",
        actionType: "investigation_update"
      },
      {
        id: "TL-304",
        stage: "Resolution Proposed",
        title: "Express Delivery Scheduled",
        timestamp: "2026-11-13T10:00:00Z",
        authorRole: "Staff",
        authorName: "Manjeet Singh",
        remarks: "Bundle repacked and scheduled for direct room delivery to GH-4 #114-B with no charge.",
        actionType: "status_change"
      },
      {
        id: "TL-305",
        stage: "Resolved",
        title: "Handed Over & Verified",
        timestamp: "2026-11-14T17:00:00Z",
        authorRole: "Staff",
        authorName: "Manjeet Singh",
        remarks: "Bundle of 14 items handed directly to Priya Patel at GH-4. Student confirmed all 14 garments received in good state.",
        actionType: "status_change"
      }
    ],
    internalNotes: [
      {
        id: "IN-301",
        timestamp: "2026-11-12T14:10:00Z",
        authorName: "Manjeet Singh",
        authorRole: "Dispatcher",
        note: "Van 3 driver dropped wrong crate at BH-2 instead of GH-4. Driver given reprimand. All 14 items accounted for."
      }
    ],
    proposedResolution: {
      description: "Direct doorstep delivery of clean bundle + waiver of 1 laundry turn penalty credit.",
      compensationType: "found_and_ready",
      status: "accepted",
      proposedAt: "2026-11-13T10:00:00Z",
      studentResponse: "Received the entire bundle intact. Thank you for resolving it quickly.",
      studentResponseAt: "2026-11-14T17:00:00Z"
    },
    studentFeedback: {
      rating: 5,
      comment: "Staff member Manjeet was very polite and brought the clothes to my block personally.",
      submittedAt: "2026-11-14T17:15:00Z"
    }
  },
  {
    id: "LC-2026-00129",
    studentId: "STU-12018892",
    studentName: "Vikramaditya Rao",
    hostelBlock: "BH-1",
    roomNo: "518-A",
    laundryTrackingId: "LPU-LND-9411",
    submissionDate: "2026-11-07",
    collectionDate: "2026-11-10",
    category: "Incorrect clothing count",
    clothingItem: "Cotton Innerwear & T-Shirts",
    affectedCount: 2,
    description: "Submitted 10 items (4 t-shirts, 2 trousers, 4 innerwear). Slip states 10 items. Return package contained only 8 items. Missing 2 branded jockey cotton vests.",
    evidenceImages: [
      {
        url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
        caption: "Laundry slip #9411 counter receipt showing 10 items"
      }
    ],
    additionalInfo: "White Jockey vests, medium size.",
    priority: "Medium",
    status: "Under Investigation",
    assignedStaff: "Rajesh Kumar",
    createdAt: "2026-11-11T13:40:00Z",
    updatedAt: "2026-11-14T11:15:00Z",
    timeline: [
      {
        id: "TL-401",
        stage: "Complaint Submitted",
        title: "Complaint Submitted",
        timestamp: "2026-11-11T13:40:00Z",
        authorRole: "Student",
        authorName: "Vikramaditya Rao",
        remarks: "Discrepancy of 2 items reported between slip and pack.",
        actionType: "status_change"
      },
      {
        id: "TL-402",
        stage: "Complaint Received by Staff",
        title: "Logged at BH-1 Counter",
        timestamp: "2026-11-11T15:20:00Z",
        authorRole: "Staff",
        authorName: "Rajesh Kumar",
        remarks: "Counter slip cross-verified. Audit requested at tumbler dryer bay.",
        actionType: "status_change"
      },
      {
        id: "TL-403",
        stage: "Under Investigation",
        title: "Dryer Filter Check",
        timestamp: "2026-11-14T11:15:00Z",
        authorRole: "Staff",
        authorName: "Rajesh Kumar",
        remarks: "Tumbler 4 maintenance check revealed 2 garments stuck behind lint guard. Retagging in progress.",
        actionType: "investigation_update"
      }
    ],
    internalNotes: [
      {
        id: "IN-401",
        timestamp: "2026-11-14T11:30:00Z",
        authorName: "Rajesh Kumar",
        authorRole: "Floor Incharge",
        note: "2 white vests found in Dryer 4 drum seam. Need re-wash and sanitization before handover."
      }
    ],
    proposedResolution: null,
    studentFeedback: null
  },
  {
    id: "LC-2026-00130",
    studentId: "STU-12117654",
    studentName: "Sneha Nair",
    hostelBlock: "GH-1",
    roomNo: "302-A",
    laundryTrackingId: "LPU-LND-9902",
    submissionDate: "2026-11-14",
    collectionDate: "",
    category: "Missing clothes",
    clothingItem: "Yellow Floral Anarkali Kurti",
    affectedCount: 1,
    description: "Submitted festival wear kurti for dry wash cycle. Received rest of package but the Kurti was not in the pack.",
    evidenceImages: [
      {
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
        caption: "Photograph of Kurti submitted with delicate tag"
      }
    ],
    additionalInfo: "Delicate dry cleaning label was attached.",
    priority: "High",
    status: "Complaint Received by Staff",
    assignedStaff: "Sunita Devi",
    createdAt: "2026-11-15T09:10:00Z",
    updatedAt: "2026-11-15T10:30:00Z",
    timeline: [
      {
        id: "TL-501",
        stage: "Complaint Submitted",
        title: "Complaint Lodged",
        timestamp: "2026-11-15T09:10:00Z",
        authorRole: "Student",
        authorName: "Sneha Nair",
        remarks: "Missing floral kurti reported with reference tag #9902.",
        actionType: "status_change"
      },
      {
        id: "TL-502",
        stage: "Complaint Received by Staff",
        title: "Delicate Bay Intake Acknowledged",
        timestamp: "2026-11-15T10:30:00Z",
        authorRole: "Staff",
        authorName: "Sunita Devi",
        remarks: "Delicate dry clean department notified. Checking special handling racks.",
        actionType: "status_change"
      }
    ],
    internalNotes: [
      {
        id: "IN-501",
        timestamp: "2026-11-15T10:35:00Z",
        authorName: "Sunita Devi",
        authorRole: "Intake Lead",
        note: "Delicate wash items go to GH-2 special drum unit. Checking with technician Ritu."
      }
    ],
    proposedResolution: null,
    studentFeedback: null
  },
  {
    id: "LC-2026-00131",
    studentId: "STU-12204918",
    studentName: "Rahul Mehta",
    hostelBlock: "BH-6",
    roomNo: "219-B",
    laundryTrackingId: "LPU-LND-9240",
    submissionDate: "2026-11-04",
    collectionDate: "2026-11-07",
    category: "Damaged clothes",
    clothingItem: "Levis Denim Jacket",
    affectedCount: 1,
    description: "Two metal snap buttons were torn off the front placket, leaving frayed holes in the denim fabric.",
    evidenceImages: [
      {
        url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80",
        caption: "Torn snap button rivets on denim jacket front"
      }
    ],
    additionalInfo: "Denim was washed in heavy industrial drum instead of gentle cycle.",
    priority: "High",
    status: "Closed",
    assignedStaff: "Balwinder Singh",
    createdAt: "2026-11-08T11:20:00Z",
    updatedAt: "2026-11-13T16:00:00Z",
    timeline: [
      {
        id: "TL-601",
        stage: "Complaint Submitted",
        title: "Complaint Submitted",
        timestamp: "2026-11-08T11:20:00Z",
        authorRole: "Student",
        authorName: "Rahul Mehta",
        remarks: "Torn rivets and damaged jacket reported.",
        actionType: "status_change"
      },
      {
        id: "TL-602",
        stage: "Complaint Received by Staff",
        title: "Staff Inspection",
        timestamp: "2026-11-08T14:00:00Z",
        authorRole: "Staff",
        authorName: "Balwinder Singh",
        remarks: "Jacket inspected at BH-6 counter.",
        actionType: "status_change"
      },
      {
        id: "TL-603",
        stage: "Under Investigation",
        title: "Factory Repair Consultation",
        timestamp: "2026-11-09T10:00:00Z",
        authorRole: "Staff",
        authorName: "Balwinder Singh",
        remarks: "Sent to LPU mechanical workshop tailor to replace rivet snaps with original brass hardware.",
        actionType: "investigation_update"
      },
      {
        id: "TL-604",
        stage: "Resolution Proposed",
        title: "Hardware Replaced",
        timestamp: "2026-11-11T15:00:00Z",
        authorRole: "Staff",
        authorName: "Balwinder Singh",
        remarks: "Brand new heavy duty brass snaps fixed by university master craftsman. Ready for review.",
        actionType: "status_change"
      },
      {
        id: "TL-605",
        stage: "Resolved",
        title: "Student Accepted Repair",
        timestamp: "2026-11-12T16:30:00Z",
        authorRole: "Student",
        authorName: "Rahul Mehta",
        remarks: "Inspected jacket at counter. Snaps are firm and clean. Satisfied with resolution.",
        actionType: "status_change"
      },
      {
        id: "TL-606",
        stage: "Closed",
        title: "Case Formally Closed",
        timestamp: "2026-11-13T16:00:00Z",
        authorRole: "Staff",
        authorName: "Balwinder Singh",
        remarks: "All documentation completed. Case archived.",
        actionType: "status_change"
      }
    ],
    internalNotes: [
      {
        id: "IN-601",
        timestamp: "2026-11-09T10:30:00Z",
        authorName: "Balwinder Singh",
        authorRole: "Supervisor",
        note: "Repaired by Shri Ramji tailor at Student Centre shop #12 at department expense (Rs 150)."
      }
    ],
    proposedResolution: {
      description: "Complete repair of snap buttons with heavy-duty rivets at university tailor at zero cost to student.",
      compensationType: "replacement",
      status: "accepted",
      proposedAt: "2026-11-11T15:00:00Z",
      studentResponse: "Buttons fixed properly, thank you.",
      studentResponseAt: "2026-11-12T16:30:00Z"
    },
    studentFeedback: {
      rating: 4,
      comment: "Repair quality was good. Took 4 days but resolved well.",
      submittedAt: "2026-11-12T16:45:00Z"
    }
  },
  {
    id: "LC-2026-00132",
    studentId: "STU-12103490",
    studentName: "Tanya Kapoor",
    hostelBlock: "GH-3",
    roomNo: "410-C",
    laundryTrackingId: "LPU-LND-9884",
    submissionDate: "2026-11-12",
    collectionDate: "2026-11-15",
    category: "Other",
    clothingItem: "White Silk Scarf",
    affectedCount: 1,
    description: "Strong chemical odor and color bleeding from unknown red garment onto white silk scarf. It smells like detergent concentrate was directly poured on it.",
    evidenceImages: [],
    additionalInfo: "Needs re-wash with neutralizing agent.",
    priority: "Low",
    status: "Complaint Submitted",
    assignedStaff: "Sunita Devi",
    createdAt: "2026-11-16T08:20:00Z",
    updatedAt: "2026-11-16T08:20:00Z",
    timeline: [
      {
        id: "TL-701",
        stage: "Complaint Submitted",
        title: "Complaint Lodged Online",
        timestamp: "2026-11-16T08:20:00Z",
        authorRole: "Student",
        authorName: "Tanya Kapoor",
        remarks: "Reported chemical stain and odor on silk scarf.",
        actionType: "status_change"
      }
    ],
    internalNotes: [],
    proposedResolution: null,
    studentFeedback: null
  },
  {
    id: "LC-2026-00133",
    studentId: "STU-12003189",
    studentName: "Kartik Joshi",
    hostelBlock: "BH-5",
    roomNo: "107-A",
    laundryTrackingId: "LPU-LND-9372",
    submissionDate: "2026-11-06",
    collectionDate: "2026-11-10",
    category: "Delayed laundry delivery",
    clothingItem: "Full laundry bag (11 items)",
    affectedCount: 11,
    description: "Submitted over 8 days ago. Still not returned to BH-5 collection counter.",
    evidenceImages: [],
    additionalInfo: "Token 9372.",
    priority: "Low",
    status: "Under Investigation",
    assignedStaff: "Manjeet Singh",
    createdAt: "2026-11-11T09:45:00Z",
    updatedAt: "2026-11-14T14:20:00Z",
    timeline: [
      {
        id: "TL-801",
        stage: "Complaint Submitted",
        title: "Complaint Submitted",
        timestamp: "2026-11-11T09:45:00Z",
        authorRole: "Student",
        authorName: "Kartik Joshi",
        remarks: "8 days delay reported.",
        actionType: "status_change"
      },
      {
        id: "TL-802",
        stage: "Complaint Received by Staff",
        title: "Received by Dispatch Desk",
        timestamp: "2026-11-11T12:00:00Z",
        authorRole: "Staff",
        authorName: "Manjeet Singh",
        remarks: "Tracking bag in BH-5 dispatch ledger.",
        actionType: "status_change"
      },
      {
        id: "TL-803",
        stage: "Under Investigation",
        title: "Plant Trace Initiated",
        timestamp: "2026-11-14T14:20:00Z",
        authorRole: "Staff",
        authorName: "Manjeet Singh",
        remarks: "Bag held at ironing station due to damaged barcode sticker. Reprinter requested.",
        actionType: "investigation_update"
      }
    ],
    internalNotes: [
      {
        id: "IN-801",
        timestamp: "2026-11-14T14:25:00Z",
        authorName: "Manjeet Singh",
        authorRole: "Dispatcher",
        note: "Sticker was smudged. Checked clothes against student registration 12003189. Matched."
      }
    ],
    proposedResolution: null,
    studentFeedback: null
  },
  {
    id: "LC-2026-00134",
    studentId: "STU-12108761",
    studentName: "Divya Menon",
    hostelBlock: "GH-5",
    roomNo: "201-B",
    laundryTrackingId: "LPU-LND-9128",
    submissionDate: "2026-11-03",
    collectionDate: "2026-11-06",
    category: "Missing clothes",
    clothingItem: "Grey Woolen Cardigan (Marks & Spencer)",
    affectedCount: 1,
    description: "Warm cardigan submitted in winter wear lot. Not found in package. Counter incharge asked to lodge portal complaint.",
    evidenceImages: [
      {
        url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80",
        caption: "Cardigan tag and brand detail reference"
      }
    ],
    additionalInfo: "Cardigan has distinctive horn-style wooden buttons.",
    priority: "High",
    status: "Resolution Proposed",
    assignedStaff: "Sunita Devi",
    createdAt: "2026-11-07T12:15:00Z",
    updatedAt: "2026-11-15T16:10:00Z",
    timeline: [
      {
        id: "TL-901",
        stage: "Complaint Submitted",
        title: "Complaint Lodged",
        timestamp: "2026-11-07T12:15:00Z",
        authorRole: "Student",
        authorName: "Divya Menon",
        remarks: "Missing M&S cardigan reported.",
        actionType: "status_change"
      },
      {
        id: "TL-902",
        stage: "Complaint Received by Staff",
        title: "Received by GH-5 Supervisor",
        timestamp: "2026-11-07T15:00:00Z",
        authorRole: "Staff",
        authorName: "Sunita Devi",
        remarks: "Cross-checked with winter wash special bin.",
        actionType: "status_change"
      },
      {
        id: "TL-903",
        stage: "Under Investigation",
        title: "CCTV & Sorting Review",
        timestamp: "2026-11-09T11:00:00Z",
        authorRole: "Staff",
        authorName: "Sunita Devi",
        remarks: "Item could not be traced in central plant after 48-hour exhaustive sweep.",
        actionType: "investigation_update"
      },
      {
        id: "TL-904",
        stage: "Resolution Proposed",
        title: "Financial Compensation Proposed",
        timestamp: "2026-11-15T16:10:00Z",
        authorRole: "Staff",
        authorName: "Sunita Devi",
        remarks: "Since the item cannot be located despite complete plant audit, the Central Laundry Committee approves direct reimbursement of ₹2,200 into student's campus card bank account.",
        actionType: "status_change"
      }
    ],
    internalNotes: [
      {
        id: "IN-901",
        timestamp: "2026-11-09T14:00:00Z",
        authorName: "Sunita Devi",
        authorRole: "Lead",
        note: "Cardigan confirmed lost in transit between GH-5 sub-station and central unit. Approved for loss claim by Warden Office."
      }
    ],
    proposedResolution: {
      description: "Direct bank transfer / campus card reimbursement of ₹2,200 as per LPU Laundry Charter Annexure 4.",
      compensationType: "reimbursement",
      amount: "₹2,200",
      status: "pending",
      proposedAt: "2026-11-15T16:10:00Z",
      studentResponse: null,
      studentResponseAt: null
    },
    studentFeedback: null
  },
  {
    id: "LC-2026-00135",
    studentId: "STU-12019943",
    studentName: "Gurpreet Singh",
    hostelBlock: "BH-7",
    roomNo: "314-A",
    laundryTrackingId: "LPU-LND-9080",
    submissionDate: "2026-11-02",
    collectionDate: "2026-11-06",
    category: "Clothes exchanged with another student",
    clothingItem: "Nike Track Pants (Black, XL)",
    affectedCount: 1,
    description: "Received grey Adidas track pants size S with tag for BH-8 student. My black Nike XL pants missing.",
    evidenceImages: [],
    additionalInfo: "BH-7 laundry collection desk.",
    priority: "Medium",
    status: "Resolved",
    assignedStaff: "Harpreet Kaur",
    createdAt: "2026-11-07T14:00:00Z",
    updatedAt: "2026-11-12T15:30:00Z",
    timeline: [
      {
        id: "TL-1001",
        stage: "Complaint Submitted",
        title: "Complaint Lodged",
        timestamp: "2026-11-07T14:00:00Z",
        authorRole: "Student",
        authorName: "Gurpreet Singh",
        remarks: "Exchanged trackpants reported.",
        actionType: "status_change"
      },
      {
        id: "TL-1002",
        stage: "Complaint Received by Staff",
        title: "Intake Verified",
        timestamp: "2026-11-08T09:30:00Z",
        authorRole: "Staff",
        authorName: "Harpreet Kaur",
        remarks: "Located other student in BH-8.",
        actionType: "status_change"
      },
      {
        id: "TL-1003",
        stage: "Under Investigation",
        title: "Swap Recovery Process",
        timestamp: "2026-11-09T14:00:00Z",
        authorRole: "Staff",
        authorName: "Harpreet Kaur",
        remarks: "Retrieved Nike trackpants from BH-8 student and returned grey Adidas pants.",
        actionType: "investigation_update"
      },
      {
        id: "TL-1004",
        stage: "Resolved",
        title: "Garments Exchanged & Delivered",
        timestamp: "2026-11-12T15:30:00Z",
        authorRole: "Staff",
        authorName: "Harpreet Kaur",
        remarks: "Correct track pants handed over to Gurpreet Singh at BH-7 desk.",
        actionType: "status_change"
      }
    ],
    internalNotes: [
      {
        id: "IN-1001",
        timestamp: "2026-11-09T14:30:00Z",
        authorName: "Harpreet Kaur",
        authorRole: "Coordinator",
        note: "Successful swap without friction. Both students signed token book."
      }
    ],
    proposedResolution: {
      description: "Direct swap executed and delivered to BH-7 helpdesk.",
      compensationType: "found_and_ready",
      status: "accepted",
      proposedAt: "2026-11-10T11:00:00Z",
      studentResponse: "Got my pants back, all good.",
      studentResponseAt: "2026-11-12T15:30:00Z"
    },
    studentFeedback: {
      rating: 5,
      comment: "Very swift response from Harpreet mam.",
      submittedAt: "2026-11-12T15:45:00Z"
    }
  },
  {
    id: "LC-2026-00136",
    studentId: "STU-12211287",
    studentName: "Ishaan Gupta",
    hostelBlock: "UL-A",
    roomNo: "602",
    laundryTrackingId: "LPU-LND-9941",
    submissionDate: "2026-11-14",
    collectionDate: "",
    category: "Missing clothes",
    clothingItem: "Tommy Hilfiger White Polo Shirt",
    affectedCount: 1,
    description: "White polo t-shirt submitted on Saturday at Uni-Living block counter. Did not arrive in return crate.",
    evidenceImages: [],
    additionalInfo: "Brand new polo shirt, size M.",
    priority: "High",
    status: "Complaint Submitted",
    assignedStaff: "Rajesh Kumar",
    createdAt: "2026-11-16T11:00:00Z",
    updatedAt: "2026-11-16T11:00:00Z",
    timeline: [
      {
        id: "TL-1101",
        stage: "Complaint Submitted",
        title: "Complaint Lodged Online",
        timestamp: "2026-11-16T11:00:00Z",
        authorRole: "Student",
        authorName: "Ishaan Gupta",
        remarks: "Submitted initial complaint for missing polo shirt.",
        actionType: "status_change"
      }
    ],
    internalNotes: [],
    proposedResolution: null,
    studentFeedback: null
  },
  {
    id: "LC-2026-00137",
    studentId: "STU-12014582",
    studentName: "Rohan Sharma",
    hostelBlock: "BH-3",
    roomNo: "412-B",
    laundryTrackingId: "LPU-LND-8890",
    submissionDate: "2026-10-20",
    collectionDate: "2026-10-24",
    category: "Delayed laundry delivery",
    clothingItem: "Sports Jersey & Shorts",
    affectedCount: 2,
    description: "Delay of 4 days during inter-hostel tournament week. Jersey arrived late.",
    evidenceImages: [],
    additionalInfo: "Resolved previously.",
    priority: "Low",
    status: "Closed",
    assignedStaff: "Balwinder Singh",
    createdAt: "2026-10-25T10:00:00Z",
    updatedAt: "2026-10-28T16:00:00Z",
    timeline: [
      {
        id: "TL-1201",
        stage: "Complaint Submitted",
        title: "Delay Logged",
        timestamp: "2026-10-25T10:00:00Z",
        authorRole: "Student",
        authorName: "Rohan Sharma",
        remarks: "Tournament jersey delay reported.",
        actionType: "status_change"
      },
      {
        id: "TL-1202",
        stage: "Resolved",
        title: "Item Delivered with Priority",
        timestamp: "2026-10-27T14:00:00Z",
        authorRole: "Staff",
        authorName: "Balwinder Singh",
        remarks: "Special courier delivery to BH-3 reception.",
        actionType: "status_change"
      },
      {
        id: "TL-1203",
        stage: "Closed",
        title: "Confirmed & Closed",
        timestamp: "2026-10-28T16:00:00Z",
        authorRole: "Student",
        authorName: "Rohan Sharma",
        remarks: "Received in time for tournament quarterfinal.",
        actionType: "status_change"
      }
    ],
    internalNotes: [],
    proposedResolution: null,
    studentFeedback: {
      rating: 5,
      comment: "Quick action saved my tournament participation.",
      submittedAt: "2026-10-28T16:05:00Z"
    }
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-001",
    recipientRole: "student",
    studentId: "STU-12014582",
    complaintId: "LC-2026-00125",
    title: "Investigation Update",
    message: "Supervisor Balwinder Singh updated your complaint: 2 untagged blue shirts located in Plant BH-4 sorting bay.",
    type: "investigation",
    timestamp: "2026-11-14T10:45:00Z",
    read: false
  },
  {
    id: "NOTIF-002",
    recipientRole: "student",
    studentId: "STU-12105433",
    complaintId: "LC-2026-00126",
    title: "Resolution Proposed",
    message: "Sunita Devi proposed a resolution: Invisible tailor mending or ₹1,800 laundry credit. Please review and respond.",
    type: "resolution_proposed",
    timestamp: "2026-11-15T14:45:00Z",
    read: false
  },
  {
    id: "NOTIF-003",
    recipientRole: "student",
    studentId: "STU-12009871",
    complaintId: "LC-2026-00127",
    title: "Action Required / Awaiting Your Response",
    message: "Your Puma hoodie has been retrieved and is waiting at BH-4 Laundry Desk. Please bring student ID to collect.",
    type: "info_requested",
    timestamp: "2026-11-15T09:30:00Z",
    read: false
  },
  {
    id: "NOTIF-004",
    recipientRole: "staff",
    studentId: null,
    complaintId: "LC-2026-00136",
    title: "New High Priority Complaint Submitted",
    message: "Ishaan Gupta (UL-A #602) submitted a High Priority complaint for Tommy Hilfiger Polo Shirt.",
    type: "submitted",
    timestamp: "2026-11-16T11:00:00Z",
    read: false
  },
  {
    id: "NOTIF-005",
    recipientRole: "admin",
    studentId: null,
    complaintId: "LC-2026-00134",
    title: "Compensation Claim Pending Approval",
    message: "Compensation claim of ₹2,200 proposed for lost woolen cardigan (Divya Menon, GH-5).",
    type: "resolution_proposed",
    timestamp: "2026-11-15T16:10:00Z",
    read: false
  }
];
