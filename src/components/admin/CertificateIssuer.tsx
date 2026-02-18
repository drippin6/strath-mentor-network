import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  Search, 
  Download, 
  Mail, 
  CheckCircle2, 
  History,
  FileBadge
} from 'lucide-react';
import { toast } from 'sonner';

const CertificateIssuer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const eligibleStudents = [
    { id: 1, name: 'Alice Wambui', course: 'Bachelor of Laws', role: 'Student Ambassador', hours: 45, status: 'Eligible' },
    { id: 2, name: 'Kevin Mutua', course: 'BSc. Informatics', role: 'Peer Mentor', hours: 32, status: 'Eligible' },
    { id: 3, name: 'Sarah Ochieng', course: 'Bachelor of Commerce', role: 'Senior Mentor', hours: 58, status: 'Eligible' },
    { id: 4, name: 'John Doe', course: 'Computer Science', role: 'Ambassador', hours: 40, status: 'Eligible' },
  ];

  const handleIssue = (name: string) => {
    toast.success(`Westminster-style certificate issued to ${name}`, {
      description: "A digital copy has been sent to their student email.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif">
                <Award className="text-indigo-600" />
                Digital Certificate Issuance
              </CardTitle>
              <CardDescription>
                Award prestigious "Westminster-style" digital certificates to students who have demonstrated excellence in mentoring.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    placeholder="Search by student name or ID..." 
                    className="pl-10 h-11"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button className="h-11 px-8 font-bold">Search Database</Button>
              </div>

              <div className="rounded-xl border border-slate-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase text-[10px]">Candidate</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase text-[10px]">Contribution</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase text-[10px]">Status</th>
                      <th className="px-4 py-3 text-right font-bold text-slate-500 uppercase text-[10px]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {eligibleStudents.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => (
                      <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors group">
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{student.name}</span>
                            <span className="text-xs text-slate-500">{student.course}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700">{student.role}</span>
                            <span className="text-xs text-slate-500">{student.hours} Logged Hours</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-2 font-black text-[10px] uppercase">
                            {student.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-indigo-600 font-bold hover:bg-indigo-600 hover:text-white transition-all"
                            onClick={() => handleIssue(student.name)}
                          >
                            <FileBadge size={14} className="mr-2" />
                            Issue Certificate
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <History size={18} className="text-slate-400" />
                Recently Issued
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((_, i) => (
                  <div key={i} className="p-3 rounded-lg border border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <Award size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">Student Name</span>
                        <span className="text-[10px] text-slate-500">Issued 2 hours ago</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Download size={14} /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Mail size={14} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden border-2 border-indigo-100 shadow-xl shadow-indigo-100/20">
            <CardHeader className="bg-indigo-600 text-white pb-6">
              <CardTitle className="text-lg font-serif">Certificate Preview</CardTitle>
              <CardDescription className="text-indigo-100">Current Template: "Westminster Excellence"</CardDescription>
            </CardHeader>
            <CardContent className="p-0 relative">
              <div className="aspect-[1/1.41] relative">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/westminster-style-certificate-template-1db1b87e-1771073853083.webp" 
                  alt="Westminster Style Certificate"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none">
                  {/* Overlay text mock */}
                  <div className="mt-12">
                    <p className="font-serif text-[8px] text-slate-800 uppercase tracking-widest opacity-60">The Mentoring Office Presents</p>
                    <h3 className="font-serif text-[12px] font-bold text-indigo-950 mt-1 uppercase tracking-tighter">Certificate of Excellence</h3>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white border-t border-slate-100">
                <Button variant="outline" className="w-full font-bold text-indigo-600">Edit Template Design</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white border-none">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <CheckCircle2 className="text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-bold">Blockchain Verified</h4>
                  <p className="text-xs text-slate-400">All issued certificates are cryptographically signed and stored.</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 font-mono">Last Sync: 2024-03-12 14:30:01 UTC</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CertificateIssuer;