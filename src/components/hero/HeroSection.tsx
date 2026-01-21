import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Shield, Zap, BarChart3 } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--primary)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--accent)/0.1),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            <Zap className="w-4 h-4 mr-2" />
            Real-Time Credit Intelligence Platform
          </Badge>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Explainable
              </span>
              <br />
              <span className="text-foreground">Credit Intelligence</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Next-generation credit scoring platform that processes real-time market data, 
              provides transparent risk assessments, and delivers actionable insights for 
              financial institutions and investors.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-primary" asChild>
              <a href="/dashboard">
                Launch Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button variant="outline" size="lg">
              <Shield className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
            <Card className="bg-card/50 backdrop-blur border-border/50 hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center mx-auto">
                  <TrendingUp className="w-6 h-6 text-success-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Real-Time Scoring</h3>
                <p className="text-sm text-muted-foreground">
                  Continuously updated credit scores based on live financial, operational, and market data
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50 hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Explainable AI</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent feature-level explanations and trend insights for every credit assessment
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50 hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-risk rounded-lg flex items-center justify-center mx-auto">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Multi-Source Data</h3>
                <p className="text-sm text-muted-foreground">
                  Integrates structured financial data with unstructured news, sentiment, and market signals
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};