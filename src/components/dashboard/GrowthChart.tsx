import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from "lucide-react";

interface GrowthChartProps {
  companies: Array<{
    company: string;
    symbol: string;
    historicalData: Array<{
      date: string;
      score: number;
      revenue: number;
      marketCap: number;
    }>;
  }>;
}

export const GrowthChart = ({ companies }: GrowthChartProps) => {
  // Combine data from all companies for comparison
  const combinedData = companies[0]?.historicalData.map((dataPoint, index) => {
    const result: any = { date: dataPoint.date };
    
    companies.forEach(company => {
      if (company.historicalData[index]) {
        result[`${company.symbol}_score`] = company.historicalData[index].score;
        result[`${company.symbol}_revenue`] = company.historicalData[index].revenue / 1000; // Convert to billions
      }
    });
    
    return result;
  }) || [];

  const colors = {
    AAPL: '#007AFF',
    TSLA: '#FF3B30',
    MSFT: '#34C759',
    GOOGL: '#FF9500',
    AMZN: '#FF2D92',
    META: '#5856D6'
  };

  return (
    <div className="space-y-6">
      {/* Credit Score Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Multi-Company Credit Score Trends</span>
            </div>
            <Badge variant="secondary">24 Month View</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  color: 'hsl(var(--foreground))'
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              />
              <Legend />
              {companies.map(company => (
                <Line
                  key={company.symbol}
                  type="monotone"
                  dataKey={`${company.symbol}_score`}
                  stroke={colors[company.symbol as keyof typeof colors]}
                  strokeWidth={2}
                  name={`${company.symbol} Score`}
                  connectNulls={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Growth Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Revenue Growth Comparison</span>
            </div>
            <Badge variant="secondary">Billions USD</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${value}B`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value: any) => [`$${value.toFixed(1)}B`, '']}
                labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              />
              <Legend />
              {companies.map(company => (
                <Line
                  key={`${company.symbol}_revenue`}
                  type="monotone"
                  dataKey={`${company.symbol}_revenue`}
                  stroke={colors[company.symbol as keyof typeof colors]}
                  strokeWidth={2}
                  name={`${company.symbol} Revenue`}
                  strokeDasharray="5 5"
                  connectNulls={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};