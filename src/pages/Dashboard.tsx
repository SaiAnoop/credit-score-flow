import { Navbar } from "@/components/layout/Navbar";
import { CreditScoreCard } from "@/components/dashboard/CreditScoreCard";
import { ScoreTrendChart } from "@/components/dashboard/ScoreTrendChart";
import { ExplainabilityPanel } from "@/components/dashboard/ExplainabilityPanel";
import { LiveMetrics } from "@/components/dashboard/LiveMetrics";
import { GrowthChart } from "@/components/dashboard/GrowthChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, TrendingUp, Users } from "lucide-react";
import { useRealTimeData } from "@/hooks/useRealTimeData";

export default function Dashboard() {
  const { companies, lastUpdate } = useRealTimeData();
  
  // Calculate dynamic stats
  const avgScore = companies.reduce((sum, company) => sum + company.score, 0) / companies.length;
  const highRiskCount = companies.filter(company => company.riskLevel === 'high').length;
  const totalCompanies = companies.length;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Credit Intelligence Dashboard</h1>
            <p className="text-muted-foreground">Real-time creditworthiness monitoring and analysis</p>
          </div>
          <Badge variant="default" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Live Market Data</span>
          </Badge>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Issuers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCompanies}</div>
              <p className="text-xs text-muted-foreground">Real-time monitoring</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgScore.toFixed(1)}</div>
              <p className="text-xs text-success">Live updates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{highRiskCount}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.7%</div>
              <p className="text-xs text-success">+0.3% this quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Credit Score Cards */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {companies.slice(0, 4).map((company, index) => (
                <CreditScoreCard key={index} {...company} />
              ))}
            </div>
            
            {/* Trend Chart for Featured Company */}
            <ScoreTrendChart 
              company={companies[0]?.company} 
              symbol={companies[0]?.symbol}
              historicalData={companies[0]?.historicalData || []} 
            />
            
            {/* Growth Comparison Charts */}
            <GrowthChart companies={companies} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <LiveMetrics lastUpdate={lastUpdate} totalCompanies={totalCompanies} />
            <ExplainabilityPanel />
            
            {/* Additional Companies */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground">Additional Holdings</h3>
              {companies.slice(4).map((company, index) => (
                <CreditScoreCard key={index + 4} {...company} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}