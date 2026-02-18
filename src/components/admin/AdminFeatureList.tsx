import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Video, 
  Wallet, 
  Layers, 
  BarChart3, 
  FileText, 
  ShieldCheck, 
  Lock, 
  Eye,
  CheckCircle2
} from 'lucide-react';

const AdminFeatureList: React.FC = () => {
  const sections = [
    {
      title: "Functional Requirements",
      items: [
        {
          module: "User & Role Management",
          icon: Users,
          description: "Manage SSO-linked accounts and verify 'Student Ambassadors' (Year 3) who have completed rigorous training in active listening and boundaries.",
          features: ["SSO Integration", "Ambassador Certification Workflow", "Role assignment (Year 1-4, Faculty)"]
        },
        {
          module: "The Awareness CMS",
          icon: Video,
          description: "Upload and rotate 'Awareness Videos' and 'Digital Sticker Notes' on the landing page to explain the 'Why' of the program.",
          features: ["Video Upload/Hosting", "Sticky Note CMS", "Content Rotation Scheduling"]
        },
        {
          module: "Excursion & Logistics Engine",
          icon: Wallet,
          description: "Manage budgets, transport, and bookings for rapport-building events like Karura Forest hikes and Kitui/Macheo camps.",
          features: ["Budget Tracking", "Transport Coordination", "Booking Management"]
        },
        {
          module: "The Triad Pod Oversight",
          icon: Layers,
          description: "Monitor 'Closed Triad' (Junior, Senior, Faculty) engagement levels without intruding on the safe space.",
          features: ["Engagement Heatmaps", "Privacy-First Monitoring", "Health Status Indicators"]
        },
        {
          module: "Analytics & Employability Ledger",
          icon: BarChart3,
          description: "Track 'Digital Milestones' and issue 'Westminster-style' employability badges based on earned points.",
          features: ["Milestone Tracker", "Digital Badge Issuer", "Point-to-Badge Logic"]
        },
        {
          module: "Transformation Logs",
          icon: FileText,
          description: "Repository for qualitative feedback and 'radical transformation' stories to prove impact.",
          features: ["Qualitative Data Storage", "Story Archiving", "Stakeholder Reporting"]
        }
      ]
    },
    {
      title: "Security & Special Admin Features",
      items: [
        {
          module: "Role-Based Access Control (RBAC)",
          icon: ShieldCheck,
          description: "Admin-only views to toggle between student years and faculty roles to ensure data privacy.",
          features: ["Granular Permissions", "View Toggles", "Privacy Guards"]
        },
        {
          module: "Mentor Verification Workflow",
          icon: CheckCircle2,
          description: "A 'Checklist' system preventing mentor status until training certificates are uploaded.",
          features: ["Certificate Checklist", "Mandatory Training Logs", "Digital Signature Verification"]
        },
        {
          module: "Audit Trails",
          icon: Lock,
          description: "Logs of when meetings happened to prevent 'Checkbox Culture' fraud (e.g., GPS or QR check-in).",
          features: ["GPS Location Verification", "QR Attendance Logs", "Anti-Fraud Flagging"]
        },
        {
          module: "Impersonation Tool",
          icon: Eye,
          description: "Feature for the Mentoring Office to 'view as student' to troubleshoot UI issues for specific years.",
          features: ["User Impersonation", "Year-Specific UI Testing", "Safe Session Management"]
        }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {sections.map((section, idx) => (
        <section key={idx}>
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <div className="h-8 w-1 bg-indigo-600 rounded-full" />
            {section.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all border-slate-100">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <item.icon size={20} />
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">Module {idx + 1}.{i + 1}</Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-800">{item.module}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="space-y-1.5">
                    {item.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 size={12} className="text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default AdminFeatureList;