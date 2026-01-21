import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Activity } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  CredTech
                </h1>
                <p className="text-xs text-muted-foreground">Intelligence Platform</p>
              </div>
            </div>
            
            <Badge variant="secondary" className="ml-4">
              <Activity className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Shield className="w-4 h-4 mr-2" />
              Explainability
            </Button>
            <Button variant="default" size="sm" asChild>
              <a href="/dashboard">Dashboard</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};