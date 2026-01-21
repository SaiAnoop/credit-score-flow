import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, FileText, BarChart3 } from "lucide-react";

interface FactorData {
  name: string;
  impact: number;
  change: number;
  description: string;
}

const mockFactors: FactorData[] = [
  {
    name: "Debt-to-Equity Ratio",
    impact: 25,
    change: -2.3,
    description: "Recent debt restructuring improved leverage position"
  },
  {
    name: "Revenue Growth",
    impact: 20,
    change: 4.2,
    description: "Q4 earnings beat expectations by 12%"
  },
  {
    name: "Market Sentiment",
    impact: 15,
    change: -1.8,
    description: "Sector headwinds affecting investor confidence"
  },
  {
    name: "Cash Flow Stability",
    impact: 18,
    change: 3.1,
    description: "Improved working capital management"
  },
  {
    name: "Industry Outlook",
    impact: 12,
    change: -0.5,
    description: "Regulatory uncertainty in tech sector"
  }
];

const recentEvents = [
  {
    date: "2 hours ago",
    type: "Financial",
    event: "Q4 earnings report released - Beat EPS by $0.15",
    impact: "positive"
  },
  {
    date: "1 day ago",
    type: "News",
    event: "SEC filing: $500M debt refinancing completed",
    impact: "positive"
  },
  {
    date: "3 days ago",
    type: "Market",
    event: "Credit rating affirmed by Moody's at Baa2",
    impact: "neutral"
  }
];

export const ExplainabilityPanel = () => {
  return (
    <div className="space-y-6">
      {/* Score Drivers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Score Drivers</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockFactors.map((factor, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{factor.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{factor.impact}%</span>
                      <div className="flex items-center space-x-1">
                        {factor.change > 0 ? (
                          <TrendingUp className="w-3 h-3 text-success" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-destructive" />
                        )}
                        <span className={`text-xs ${factor.change > 0 ? 'text-success' : 'text-destructive'}`}>
                          {factor.change > 0 ? '+' : ''}{factor.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{factor.description}</p>
                </div>
              </div>
              <Progress value={factor.impact} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Recent Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentEvents.map((event, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{event.date}</span>
                </div>
                <p className="text-sm">{event.event}</p>
              </div>
              <div className={`w-2 h-2 rounded-full mt-2 ${
                event.impact === 'positive' ? 'bg-success' : 
                event.impact === 'negative' ? 'bg-destructive' : 'bg-muted-foreground'
              }`} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};