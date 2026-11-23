# LaundryCare – Hostel Laundry Complaint & Resolution System
### Academic Design Thinking Prototype for Lovely Professional University (LPU)

![LaundryCare Banner](https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1200&auto=format&fit=crop&q=80)

---

## 🎯 Project Overview

**LaundryCare** is an academic Design Thinking prototype designed to solve laundry disputes, missing clothes, damaged garments, and delivery delays in university hostels, with special contextualization for **Lovely Professional University (LPU)**. 

In large residential campuses with thousands of hostel residents and centralized industrial laundry facilities (such as the Central Laundry Plant at BH-4), garment tracking, sorting discrepancies, and communication breakdowns frequently lead to student dissatisfaction. **LaundryCare** establishes an end-to-end transparent grievance redressal and resolution framework.

---

## 🚀 Key Features

### 1. Three Dedicated User Interfaces
- **Student Portal**:
  - Personalized overview with complaint stats and urgent action notifications.
  - Comprehensive complaint registration form with automatic reference ID generation (`LC-2026-XXXXX`).
  - Drop slip / token ID tracking and live photographic evidence upload with client-side preview.
  - Dedicated **7-Stage Complaint Progress Timeline** with timestamped updates and staff remarks.
  - Interactive **Resolution Review** (Accept Resolution or Request Further Review).
  - Clarification response channel when staff marks a case *Action Required / Awaiting Student*.
  - Star rating & satisfaction feedback submission upon resolution.
  - Full complaints history with multi-parameter search, category, and priority filtering.
  
- **Laundry Staff Desk**:
  - Operational dashboard showing total cases, newly received complaints, active investigations, cases awaiting student response, and overdue SLA breaches (>72h).
  - Searchable master complaint table with inline quick actions and CSV export.
  - Detailed **Investigation Console** featuring:
    - Student contact and room details.
    - Garment descriptions & uploaded evidence photograph viewer.
    - **Confidential Internal Staff Notes** (never visible to students, preserved permanently without overwriting).
    - Status lifecycle progression controls (Receipt acknowledgment, Investigation, Inquiry request, Resolution proposal, Formal closure).
    - Dynamic priority reassignment (Low, Medium, High).
    - Staff re-assignment controls.

- **Executive Administrator Portal**:
  - Executive-level dashboard for Chief Warden and Facilities Directorate.
  - Key performance indicators: Resolution rate %, average turnaround hours, overdue cases.
  - Rich interactive **Recharts visualizations**:
    - Complaints by category (Bar Chart).
    - Lifecycle status distribution (Donut Chart).
    - Semester volume & resolution trends over time (Area Chart).
    - Highest volume hostel block hotspots (Horizontal Bar Chart).
  - **Staff & SLA Performance Oversight Table** calculating resolved counts, resolution rates, average student ratings, and SLA compliance per staff member.
  - Full **University Audit Log** with inspection modal and CSV export.

---

## 🔄 The 7-Stage Complaint Lifecycle

1. **Complaint Submitted** – Student logs issue with token reference and photos.
2. **Complaint Received by Staff** – Acknowledged by central intake desk.
3. **Under Investigation** – Plant sweep, bin audit, and dryer/press check initiated.
4. **Action Required / Awaiting Student** – Student requested to verify item at counter or provide details.
5. **Resolution Proposed** – Staff submits formal resolution (Item located, tailor repair, campus credit reimbursement).
6. **Resolved** – Student accepts proposed remedy or item is delivered.
7. **Closed** – Case verified and archived by supervision.

---

## 🛠️ Technology Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom enterprise navy & teal design tokens
- **Data Persistence**: Centralized `DataContext` synced with `LocalStorage` for cross-role real-time state simulation
- **Icons**: Lucide React
- **Analytics & Data Visualization**: Recharts
- **Typography**: Plus Jakarta Sans & JetBrains Mono

---

## 👥 Personas & Demo Data Included

The application comes pre-loaded with **12 realistic fictional LPU students** and **14 rich complaints**:
- **Students**: Rohan Sharma (BH-3), Ananya Verma (GH-2), Aman Deep Singh (BH-4), Priya Patel (GH-4), Vikramaditya Rao (BH-1), Sneha Nair (GH-1), Rahul Mehta (BH-6), Tanya Kapoor (GH-3), Kartik Joshi (BH-5), Divya Menon (GH-5), Gurpreet Singh (BH-7), Ishaan Gupta (Uni-Living A).
- **Laundry Staff**: Balwinder Singh (Plant Supervisor), Sunita Devi (Intake Lead), Rajesh Kumar (Floor Incharge), Harpreet Kaur (Exchange Coordinator), Manjeet Singh (Dispatcher).
- **Administrator**: Dr. K. S. Randhawa (Chief Warden & Facilities Oversight Director).

---

## 💻 Running the Application

To run the dev server:
```bash
npm run dev
```

Open `http://localhost:5173` in any browser.

To build for production:
```bash
npm run build
```

---

## 📌 Important Design Thinking & Academic Notice
This application is an academic Design Thinking prototype designed to demonstrate feasibility and test usability with hostel students and staff. All data is managed within the browser's persistent LocalStorage for instant prototyping without requiring external cloud backend dependencies.
