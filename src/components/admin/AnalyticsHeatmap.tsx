import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  Target, 
  Users, 
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  BarChart4,
  FileDown,
  Loader2,
  TrendingUp,
  BrainCircuit,
  Zap,
  Activity,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const AnalyticsHeatmap: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const readinessData = [
    { faculty: 'Law', readiness: 42, career: 38, social: 65, active: 45, color: '#3b82f6' },
    { faculty: 'IT', readiness: 88, career: 92, social: 84, active: 120, color: '#10b981' },
    { faculty: 'Business', readiness: 65, career: 70, social: 60, active: 88, color: '#f59e0b' },
    { faculty: 'Humanities', readiness: 31, career: 25, social: 45, active: 32, color: '#ef4444' },
    { faculty: 'Math', readiness: 74, career: 68, social: 80, active: 64, color: '#8b5cf6' },
  ];

  const trendData = [
    { month: 'Jan', students: 400, readiness: 24 },
    { month: 'Feb', students: 520, readiness: 36 },
    { month: 'Mar', students: 480, readiness: 48 },
    { month: 'Apr', students: 610, readiness: 55 },
    { month: 'May', students: 730, readiness: 68 },
    { month: 'Jun', students: 850, readiness: 82 },
  ];

  const handleExportPDF = () => {
    setIsExporting(true);
    toast.loading("Preparing detailed analytical report...");
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Analytical Report exported successfully");
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section with Decorative Image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-slate-900 text-white min-h-[300px] flex items-center"
      >
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/dashboard-bg-b2aacdba-1771097192569.webp" 
          alt="Dashboard Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
        
        <div className="relative z-10 p-8 md:p-12 max-w-2xl">
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30 backdrop-blur-md">
            System Intelligence Active
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Institutional Readiness <span className="text-blue-400">Heatmap</span>
          </h1>
          <p className="text-slate-300 text-lg mb-8">
            Advanced behavioral analytics and growth projections across all university faculties. Track engagement, fatigue, and academic readiness in real-time.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleExportPDF} disabled={isExporting} className="bg-white text-slate-900 hover:bg-slate-200">
              {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileDown className="mr-2 h-4 w-4" />}
              Generate Report
            </Button>
            <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Overall Readiness', value: '64.2%', icon: Target, trend: '+5.2%', up: true, color: 'text-blue-500' },
          { label: 'Active Pairs', value: '349', icon: Users, trend: '+12', up: true, color: 'text-emerald-500' },
          { label: 'Engagement Rate', value: '78%', icon: Activity, trend: '-2.4%', up: false, color: 'text-amber-500' },
          { label: 'Growth Index', value: 'A+', icon: TrendingUp, trend: 'Stable', up: true, color: 'text-purple-500' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-lg shadow-slate-200/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">{kpi.label}</CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center mt-1">
                  {kpi.up ? (
                    <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs ${kpi.up ? 'text-emerald-500' : 'text-red-500'}`}>
                    {kpi.trend} from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Readiness Breakdown Chart */}
        <Card className="lg:col-span-2 border-none shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Faculty Readiness Comparison</CardTitle>
                <CardDescription>Multi-dimensional analysis of student success metrics</CardDescription>
              </div>
              <Badge variant="outline" className="text-slate-500 uppercase tracking-wider text-[10px]">Comparative Data</Badge>
            </div>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={readinessData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="faculty" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Readiness Score"
                  dataKey="readiness"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Social Integration"
                  dataKey="social"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.4}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Decorative Card / Secondary Visual */}
        <Card className="border-none bg-gradient-to-br from-indigo-500 to-purple-600 text-white overflow-hidden relative">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/students-collaborating-5224cc94-1771097192475.webp" 
            alt="Students" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
          />
          <CardHeader className="relative z-10">
            <CardTitle className="text-white">Community Health</CardTitle>
            <CardDescription className="text-indigo-100">Student collaboration & sentiment</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Social Integration</span>
                <span className="font-bold">82%</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[82%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Support Satisfaction</span>
                <span className="font-bold">91%</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[91%]" />
              </div>
            </div>
            
            <div className="pt-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm opacity-80">Highest Readiness</div>
                  <div className="text-lg font-bold">Faculty of IT</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-indigo-900/40 rounded-2xl border border-white/10">
              <p className="text-sm italic font-light">
                "We've observed a 15% increase in cross-faculty peer support requests this quarter."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trend Analysis */}
        <Card className="border-none shadow-xl overflow-hidden">
          <CardHeader className="bg-slate-50/50">
            <CardTitle>Historical Growth Trend</CardTitle>
            <CardDescription>Readiness index and student participation over time</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorReadiness" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="readiness" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorReadiness)" />
                  <Area type="monotone" dataKey="students" stroke="#10b981" strokeWidth={2} fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Faculty Performance */}
        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle>Faculty Performance Matrix</CardTitle>
            <CardDescription>Detailed statistical breakdown by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {readinessData.map((faculty, idx) => (
                <div key={faculty.faculty} className="group relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 text-slate-600 font-bold text-xs" style={{ color: faculty.color }}>
                        {faculty.faculty.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-700">{faculty.faculty}</span>
                    </div>
                    <Badge variant={faculty.readiness > 70 ? "default" : faculty.readiness > 50 ? "secondary" : "destructive"}>
                      {faculty.readiness}% Ready
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${faculty.readiness}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="h-full"
                        style={{ backgroundColor: faculty.color }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-slate-400 uppercase tracking-widest">
                    <span>Active Pairs: {faculty.active}</span>
                    <span>Social Score: {faculty.social}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actionable Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-amber-50 border-amber-100 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-lg">
                <BrainCircuit className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900">Resource Allocation</h4>
                <p className="text-sm text-amber-800/80">Humanities faculty shows declining readiness. Recommend additional mentor assignment.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-emerald-50 border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Zap className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-900">Success Pipeline</h4>
                <p className="text-sm text-emerald-800/80">IT students are 20% ahead of schedule. Opportunity for advanced certificate offering.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900">Engagement Peak</h4>
                <p className="text-sm text-blue-800/80">Social interactions peak on Tuesdays. Ideal for broadcasting important institutional updates.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visual Statistics Graphic */}
      <Card className="border-none bg-slate-50 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-8 md:p-12 flex-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Real-time Momentum</h3>
            <p className="text-slate-600 mb-6">Our algorithms track over 50 data points per student to predict academic success and identify early warning signs of burnout.</p>
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-black text-blue-600">94%</div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Prediction Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-black text-emerald-600">2.4k</div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Data Points/Sec</div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full h-[300px] relative">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/data-growth-abstract-af4a219a-1771097191905.webp" 
              alt="Data Growth" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-transparent" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsHeatmap;