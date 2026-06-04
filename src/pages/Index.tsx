import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { DashboardStats } from "@/components/DashboardStats";
import { AlertCard } from "@/components/AlertCard";
import { IncidentReportForm } from "@/components/IncidentReportForm";
import { SupabaseTest } from "@/components/SupabaseTest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Zap } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [userRole, setUserRole] = useState<"citizen" | "authority">("citizen");

  // Mock alerts data
  const mockAlerts = [
    {
      id: "1",
      title: "Flash Flood Warning",
      description: "Heavy rainfall expected in downtown area. Avoid low-lying areas and monitor local conditions.",
      severity: "High" as const,
      disasterType: "Flood" as const,
      timestamp: new Date(),
      location: "Downtown District"
    },
    {
      id: "2", 
      title: "Road Closure - Main Street",
      description: "Construction work ongoing on Main Street between 1st and 3rd Avenue. Use alternate routes.",
      severity: "Medium" as const,
      disasterType: "Other" as const,
      timestamp: new Date(Date.now() - 3600000),
      location: "Main Street"
    },
    {
      id: "3",
      title: "Power Outage Resolved",
      description: "Electricity has been restored to affected areas in the north district.",
      severity: "Low" as const,
      disasterType: "Other" as const,
      timestamp: new Date(Date.now() - 7200000),
      location: "North District"
    }
  ];

  const handleGetStarted = () => {
    setActiveSection("alerts");
  };

  const handleRoleSwitch = () => {
    setUserRole(prev => prev === "citizen" ? "authority" : "citizen");
    setActiveSection(userRole === "citizen" ? "dashboard" : "alerts");
  };

  const renderMainContent = () => {
    if (activeSection === "home") {
      return <HeroSection onGetStarted={handleGetStarted} />;
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role Switch for Demo */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {userRole === "authority" ? "Emergency Management Dashboard" : "Citizen Portal"}
            </h1>
            <p className="text-muted-foreground">
              {userRole === "authority" 
                ? "Monitor and manage emergency incidents across the region"
                : "Stay informed and report incidents in your area"
              }
            </p>
          </div>
          <Button variant="outline" onClick={handleRoleSwitch}>
            Switch to {userRole === "authority" ? "Citizen" : "Authority"} View
          </Button>
        </div>

        {/* Dashboard Stats */}
        <div className="mb-8">
          <DashboardStats userRole={userRole} />
        </div>

        {/* Main Content Based on Active Section */}
        {activeSection === "alerts" || activeSection === "dashboard" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Alerts List */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent" />
                    {userRole === "authority" ? "Recent Incident Reports" : "Active Alerts"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAlerts.map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div className="space-y-6">
              <Card className="h-96">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Live Incident Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-64 bg-muted/30 rounded-lg">
                  <div className="w-full">
                    <SupabaseTest />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : activeSection === "report" ? (
          <IncidentReportForm />
        ) : activeSection === "map" ? (
          <Card className="h-[600px]">
            <CardContent className="flex items-center justify-center h-full bg-muted/30 rounded-lg">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Interactive Map View</h3>
                <p className="text-muted-foreground mb-4">Full-screen map with incident markers and real-time updates</p>
                <Badge variant="outline">Requires Supabase Integration</Badge>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Feature Coming Soon</h2>
            <p className="text-muted-foreground">This section will be available once connected to Supabase.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {activeSection !== "home" && (
        <Navigation 
          userRole={userRole}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      )}
      {renderMainContent()}
    </div>
  );
};

export default Index;
