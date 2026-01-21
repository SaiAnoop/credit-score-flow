import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditScoreCardProps {
  company: string;
  symbol: string;
  score: number;
  change: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastUpdated: string;
  sector: string;
  marketCap: string;
  revenue: string;
}

export const CreditScoreCard = ({ 
  company, 
  symbol,
  score, 
  change, 
  riskLevel, 
  lastUpdated, 
  sector,
  marketCap,
  revenue
}: CreditScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'default';
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-glow border-border/50">
      <div className="absolute inset-0 bg-gradient-surface opacity-50" />
      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg font-semibold">{company}</CardTitle>
              <Badge variant="outline" className="text-xs font-mono">{symbol}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{sector}</p>
          </div>
          <Badge variant={getRiskBadgeVariant(riskLevel)} className="capitalize">
            {riskLevel === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
            {riskLevel} Risk
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className={cn("text-3xl font-bold", getScoreColor(score))}>
                {score}
              </span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              {change > 0 ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span className={change > 0 ? 'text-success' : 'text-destructive'}>
                {change > 0 ? '+' : ''}{change.toFixed(1)}
              </span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Info className="w-3 h-3" />
              <span>Updated {lastUpdated}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Creditworthiness</span>
            <span className={getScoreColor(score)}>{score}%</span>
          </div>
          <Progress 
            value={score} 
            className="h-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
          <div>
            <div className="font-medium text-primary">{marketCap}</div>
            <div className="text-muted-foreground">Market Cap</div>
          </div>
          <div>
            <div className="font-medium text-accent">{revenue}</div>
            <div className="text-muted-foreground">Revenue (TTM)</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3 text-xs border-t border-border/50">
          <div className="text-center">
            <div className="font-medium text-success">85</div>
            <div className="text-muted-foreground">Financial</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-warning">72</div>
            <div className="text-muted-foreground">Operational</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-destructive">68</div>
            <div className="text-muted-foreground">Market</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};