import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  QrCode, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

const AuditTrail: React.FC = () => {
  const logs = [
    {
      id: "LOG-001",
      event: "Karura Hike Verification",
      type: "GPS Check-in",
      location: "Karura Forest, Gate A",
      mentor: "Alice Wambui",
      mentee: "Peter Mwangi",
      time: "Mar 15, 2024 - 10:24 AM",
      status: "Verified",
      accuracy: "98%"
    },
    {
      id: "LOG-002",
      event: "Triad Monthly Sync",
      type: "QR Scan",
      location: "Library Hub - Booth 4",
      mentor: "John Doe",
      mentee: "Sarah King",
      time: "Mar 14, 2024 - 2:00 PM",
      status: "Verified",
      accuracy: "N/A"
    },
    {
      id: "LOG-003",
      event: "Macheo Outreach",
      type: "GPS Check-in",
      location: "Kibera Community Center",
      mentor: "David Kiprop",
      mentee: "Grace Ochieng",
      time: "Mar 12, 2024 - 9:15 AM",
      status: "Flagged",
      accuracy: "12%",
      note: "GPS location far from target area"
    },
    {
      id: "LOG-004",
      event: "Kitui Field Trip",
      type: "QR Scan",
      location: "Mutomo Station",
      mentor: "Sarah Kemunto",
      mentee: "Kevin Ruto",
      time: "Mar 10, 2024 - 4:45 PM",
      status: "Verified",
      accuracy: "N/A"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-black text-slate-900">Verification Audit Trails</h2>
          <p className="text-slate-500 text-sm">Combating 'Checkbox Culture' via GPS and QR verification.</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 font-bold px-3 py-1">92% Verified</Badge>
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 font-bold px-3 py-1">8 Flagged</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {logs.map((log) => (
          <Card key={log.id} className="overflow-hidden border-slate-100 hover:border-indigo-200 transition-colors shadow-sm">
            <div className="flex flex-col md:flex-row">
              <div className={`w-1 md:w-2 ${log.status === 'Verified' ? 'bg-green-500' : 'bg-red-500'}`} />
              <div className="flex-1 p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${log.type === 'GPS Check-in' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                      {log.type === 'GPS Check-in' ? <MapPin size={20} /> : <QrCode size={20} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900">{log.event}</h4>
                        <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest px-1.5 py-0">{log.id}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{log.mentor} • {log.mentee}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Location</span>
                      <span className="text-sm font-bold text-slate-700">{log.location}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Timestamp</span>
                      <span className="text-sm font-bold text-slate-700">{log.time}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Status</span>
                      <div className="flex items-center gap-1.5">
                        {log.status === 'Verified' ? (
                          <CheckCircle2 size={14} className="text-green-500" />
                        ) : (
                          <AlertCircle size={14} className="text-red-500" />
                        )}
                        <span className={`text-sm font-black ${log.status === 'Verified' ? 'text-green-700' : 'text-red-700'}`}>
                          {log.status}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-slate-50 rounded-full transition-colors self-center">
                      <ExternalLink size={18} className="text-slate-400" />
                    </button>
                  </div>
                </div>
                {log.note && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-red-500" />
                    <span className="text-xs font-bold text-red-700">Fraud Alert: {log.note}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AuditTrail;