import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CheckCircle2, 
  ShieldCheck, 
  UserPlus, 
  Search, 
  Filter, 
  Star, 
  ShieldAlert,
  GraduationCap,
  FileCheck,
  FileX,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';

const MentorVerification: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [checklist, setChecklist] = useState({
    activeListening: false,
    boundaries: false,
    ethics: false,
    certificateUploaded: false
  });

  const matchAudits = [
    { id: 1, mentor: 'Alice Wambui', mentee: 'Peter Mwangi', qualityScore: 94, engagement: 'High', status: 'Healthy' },
    { id: 2, mentor: 'John Doe', mentee: 'Sarah King', qualityScore: 45, engagement: 'Low', status: 'At Risk' },
    { id: 3, mentor: 'David Kiprop', mentee: 'Grace Ochieng', qualityScore: 82, engagement: 'Moderate', status: 'Healthy' },
  ];

  const applicants = [
    { id: 1, name: 'Alice Wambui', year: 3, course: 'Bachelor of Laws', progress: 100, status: 'pending' },
    { id: 2, name: 'John Doe', year: 3, course: 'Informatics & CS', progress: 85, status: 'in-review' },
    { id: 3, name: 'Sarah Kemunto', year: 3, course: 'Business Administration', progress: 100, status: 'pending' },
    { id: 4, name: 'David Kiprop', year: 3, course: 'Economics', progress: 40, status: 'training' },
  ];

  const handleApprove = (student: any) => {
    const allChecked = Object.values(checklist).every(v => v === true);
    if (!allChecked) {
      toast.error("Please complete the verification checklist first.");
      return;
    }
    toast.success(`${student.name} has been certified and verified as an Ambassador.`);
    setSelectedStudent(null);
    setChecklist({
      activeListening: false,
      boundaries: false,
      ethics: false,
      certificateUploaded: false
    });
  };

  const isChecklistComplete = Object.values(checklist).every(v => v === true);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full mb-2">
            <UserPlus size={20} />
          </div>
          <span className="text-2xl font-bold">12</span>
          <span className="text-xs text-slate-500 uppercase font-semibold">Awaiting Audit</span>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="p-3 bg-green-50 text-green-600 rounded-full mb-2">
            <ShieldCheck size={20} />
          </div>
          <span className="text-2xl font-bold">128</span>
          <span className="text-xs text-slate-500 uppercase font-semibold">Certified Mentors</span>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="p-3 bg-red-50 text-red-600 rounded-full mb-2">
            <ShieldAlert size={20} />
          </div>
          <span className="text-2xl font-bold">3</span>
          <span className="text-xs text-slate-500 uppercase font-semibold">Match Interventions</span>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center bg-indigo-600 text-white">
          <div className="p-3 bg-white/20 text-white rounded-full mb-2">
            <Star size={20} />
          </div>
          <span className="text-2xl font-bold">8.9/10</span>
          <span className="text-xs text-indigo-100 uppercase font-semibold">Avg Match Quality</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Mentor Training & Certification Audit</CardTitle>
              <CardDescription>Ensuring all 3rd-year ambassadors meet Strathmore quality standards.</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm"><Search size={14} className="mr-2" /> Search</Button>
              <Button variant="outline" size="sm"><Filter size={14} className="mr-2" /> Filter</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-slate-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase text-[10px]">Ambassador</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase text-[10px]">Module Progress</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase text-[10px]">Status</th>
                    <th className="px-4 py-3 text-right font-bold text-slate-500 uppercase text-[10px]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applicants.map((student) => (
                    <tr key={student.id} className={`hover:bg-slate-50/50 transition-colors ${selectedStudent?.id === student.id ? 'bg-indigo-50/50' : ''}`}>
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{student.name}</span>
                          <span className="text-xs text-slate-500">{student.course}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
                            <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${student.progress}%` }} />
                          </div>
                          <span className="text-xs font-bold">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="outline" className={`
                          ${student.status === 'pending' ? 'border-amber-200 text-amber-700 bg-amber-50' : 
                            student.status === 'in-review' ? 'border-blue-200 text-blue-700 bg-blue-50' : 
                            'border-slate-200 text-slate-600 bg-slate-50'}
                          text-[10px] font-black uppercase
                        `}>
                          {student.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button 
                          size="sm" 
                          variant={selectedStudent?.id === student.id ? 'secondary' : 'default'}
                          className="h-8 px-4 font-bold text-xs"
                          disabled={student.progress < 100}
                          onClick={() => setSelectedStudent(student)}
                        >
                          Audit Requirements
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className={`transition-all duration-300 ${selectedStudent ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="text-indigo-600" size={20} />
              {selectedStudent ? 'Verification Checklist' : 'Match Quality Audit'}
            </CardTitle>
            <CardDescription>
              {selectedStudent 
                ? `Mandatory checks for ${selectedStudent.name}` 
                : 'Auditing active mentoring pairs for effectiveness and safety.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedStudent ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="listening" 
                      checked={checklist.activeListening} 
                      onCheckedChange={(v) => setChecklist({...checklist, activeListening: !!v})}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label htmlFor="listening" className="text-sm font-bold leading-none cursor-pointer">
                        Active Listening Module
                      </label>
                      <p className="text-xs text-slate-500">Verified completion of empathy and mirroring exercises.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="boundaries" 
                      checked={checklist.boundaries} 
                      onCheckedChange={(v) => setChecklist({...checklist, boundaries: !!v})}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label htmlFor="boundaries" className="text-sm font-bold leading-none cursor-pointer">
                        Boundaries & Professionalism
                      </label>
                      <p className="text-xs text-slate-500">Passed the boundary violation scenario assessment.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="ethics" 
                      checked={checklist.ethics} 
                      onCheckedChange={(v) => setChecklist({...checklist, ethics: !!v})}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label htmlFor="ethics" className="text-sm font-bold leading-none cursor-pointer">
                        Mentoring Ethics
                      </label>
                      <p className="text-xs text-slate-500">Acknowledged the Strathmore Mentoring Code of Conduct.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    <Checkbox 
                      id="cert" 
                      checked={checklist.certificateUploaded} 
                      onCheckedChange={(v) => setChecklist({...checklist, certificateUploaded: !!v})}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label htmlFor="cert" className="text-sm font-bold leading-none cursor-pointer flex items-center gap-2 text-indigo-700">
                        <FileCheck size={14} /> Training Certificate Uploaded
                      </label>
                      <p className="text-[10px] text-slate-500 uppercase font-black">Mandatory PDF File</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button 
                    className="w-full font-bold" 
                    disabled={!isChecklistComplete}
                    onClick={() => handleApprove(selectedStudent)}
                  >
                    {isChecklistComplete ? 'Verify Student Ambassador' : 'Awaiting Documentation'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-xs font-bold text-slate-400"
                    onClick={() => setSelectedStudent(null)}
                  >
                    Cancel Audit
                  </Button>
                </div>
                
                {!isChecklistComplete && (
                  <div className="p-3 bg-amber-50 rounded-lg flex items-center gap-2">
                    <Lock size={14} className="text-amber-600" />
                    <span className="text-[10px] font-bold text-amber-700 uppercase">Verification Locked until checklist complete</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {matchAudits.map((match) => (
                  <div key={match.id} className="p-4 rounded-xl border border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">{match.mentor[0]}</div>
                        <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-xs -ml-4 border-2 border-white">{match.mentee[0]}</div>
                      </div>
                      <Badge className={match.status === 'Healthy' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-red-100 text-red-700 hover:bg-red-100'}>
                        {match.status}
                      </Badge>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-900 mb-1">
                        <span>Match Quality Score</span>
                        <span>{match.qualityScore}%</span>
                      </div>
                      <Progress value={match.qualityScore} className={`h-1.5 ${match.qualityScore < 50 ? 'bg-red-100' : 'bg-green-100'}`} />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Engagement: {match.engagement}</span>
                      <button className="text-indigo-600 hover:underline">Review Feedback</button>
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <Button variant="outline" className="w-full font-bold text-slate-600 border-dashed border-2">
                    Generate Random Audit Sample
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentorVerification;