import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface LiveMetricsProps {
  lastUpdate: Date;
  totalCompanies: number;
}

export const LiveMetrics = ({ lastUpdate, totalCompanies }: LiveMetricsProps) => {
  const [updateCount, setUpdateCount] = useState(0);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    setUpdateCount(prev => prev + 1);
    setIsLive(true);
    
    const timeout = setTimeout(() => setIsLive(false), 2000);
    return () => clearTimeout(timeout);
  }, [lastUpdate]);

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 transition-opacity duration-1000 ${
        isLive ? 'opacity-100' : 'opacity-0'
      }`} />
      
      <CardHeader className="relative pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>Live Data Stream</span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isLive ? 'bg-success animate-pulse' : 'bg-muted-foreground'
            }`} />
            <Badge variant={isLive ? "default" : "secondary"} className="text-xs">
              {isLive ? 'LIVE' : 'STANDBY'}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-2xl font-bold text-primary">{updateCount}</span>
            </div>
            <p className="text-xs text-muted-foreground">Updates Processed</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-2xl font-bold text-accent">{totalCompanies}</span>
            </div>
            <p className="text-xs text-muted-foreground">Companies Monitored</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 pt-2 border-t border-border/50">
          <Clock className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Last Update: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Data Sources Active:</div>
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">SEC EDGAR</Badge>
            <Badge variant="outline" className="text-xs">Yahoo Finance</Badge>
            <Badge variant="outline" className="text-xs">News API</Badge>
            <Badge variant="outline" className="text-xs">Market Data</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};