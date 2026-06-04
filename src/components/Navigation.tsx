import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  BarChart3,
  Menu,
  X,
  Bell
} from "lucide-react";

interface NavigationProps {
  userRole?: "citizen" | "authority";
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navigation = ({ userRole = "citizen", activeSection, onSectionChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const citizenSections = [
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "report", label: "Report Incident", icon: AlertTriangle },
    { id: "map", label: "Map View", icon: MapPin },
  ];

  const authoritySections = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "incidents", label: "Incident Management", icon: AlertTriangle },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "map", label: "Map View", icon: MapPin },
  ];

  const sections = userRole === "authority" ? authoritySections : citizenSections;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-emergency rounded-lg">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Smart Disaster Agent</h1>
              <Badge variant={userRole === "authority" ? "default" : "secondary"} className="text-xs">
                {userRole === "authority" ? "Authority Dashboard" : "Citizen Portal"}
              </Badge>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "emergency" : "ghost"}
                  size="sm"
                  onClick={() => onSectionChange(section.id)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </Button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-2 space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "emergency" : "ghost"}
                  size="sm"
                  onClick={() => {
                    onSectionChange(section.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};