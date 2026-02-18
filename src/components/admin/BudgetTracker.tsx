import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Truck, 
  Users, 
  Zap, 
  MapPin, 
  TrendingUp, 
  AlertTriangle,
  FileText,
  Loader2,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

const BudgetTracker: React.FC = () => {
  const [selectedExcursion, setSelectedExcursion] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);

  const budgetData = [
    { name: 'Excursions (Karura Forest)', allocated: 450000, spent: 320000, status: 'On Track', color: 'indigo' },
    { name: 'Community Programs (Macheo)', allocated: 600000, spent: 580000, status: 'Warning', color: 'amber' },
    { name: 'Hybrid Model Tech Stack', allocated: 200000, spent: 145000, status: 'On Track', color: 'blue' },
    { name: 'Student Ambassador Training', allocated: 150000, spent: 150000, status: 'Fully Spent', color: 'green' },
  ];

  const logisticsData = [
    { id: 'EX-001', destination: 'Karura Forest', transport: '3 Buses (60-seater)', cost: 45000, food: 120000, supplies: 35000, total: 200000, date: 'Mar 15, 2024', status: 'Confirmed', attendance: 180 },
    { id: 'EX-002', destination: 'Macheo Slum Visit', transport: '2 Vans (14-seater)', cost: 18000, food: 45000, supplies: 12000, total: 75000, date: 'Mar 22, 2024', status: 'Pending Approval', attendance: 28 },
    { id: 'EX-003', destination: 'Ngong Hills Hike', transport: '4 Buses (60-seater)', cost: 60000, food: 150000, supplies: 45000, total: 255000, date: 'Apr 05, 2024', status: 'Budget Check', attendance: 240 },
  ];

  const totalBudget = 1400000;
  const totalSpent = budgetData.reduce((acc, item) => acc + item.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  const handleExportReports = () => {
    setIsExporting(true);
    toast.loading("Compiling Report...");
    
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Logistics report exported successfully!");
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-lg bg-indigo-600 text-white">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest opacity-80">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-indigo-300 ml-auto" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-serif">KES {(totalBudget / 1000000).toFixed(1)}M</div>
          </CardContent>
        </Card>
        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Current Spend</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500 ml-auto" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-serif text-slate-900">KES {(totalSpent / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {budgetData.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-bold">KES {item.spent.toLocaleString()}</span>
                </div>
                <Progress value={(item.spent / item.allocated) * 100} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Logistics Engine</CardTitle>
            <Button onClick={handleExportReports} size="sm">
              {isExporting ? <Loader2 className="animate-spin" /> : <FileText />}
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logisticsData.map((trip) => (
                <div key={trip.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                  <div className="flex justify-between">
                    <span className="font-bold text-sm">{trip.destination}</span>
                    <span className="text-sm">KES {trip.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetTracker;