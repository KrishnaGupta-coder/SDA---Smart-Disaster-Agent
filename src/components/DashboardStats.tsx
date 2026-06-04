import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users,
  TrendingUp,
  MapPin
} from "lucide-react";

interface DashboardStatsProps {
  userRole?: "citizen" | "authority";
}

export const DashboardStats = ({ userRole = "citizen" }: DashboardStatsProps) => {
  // Mock data - would come from Supabase in real implementation
  const citizenStats = [
    {
      title: "Active Alerts",
      value: "3",
      description: "In your area",
      icon: AlertTriangle,
      variant: "alert" as const,
      trend: "+2 from yesterday"
    },
    {
      title: "Your Reports",
      value: "12",
      description: "Total submitted",
      icon: Clock,
      variant: "default" as const,
      trend: "2 pending review"
    },
    {
      title: "Resolved Issues",
      value: "8",
      description: "This month",
      icon: CheckCircle,
      variant: "success" as const,
      trend: "+4 from last month"
    },
  ];

  const authorityStats = [
    {
      title: "Total Incidents",
      value: "247",
      description: "This month",
      icon: AlertTriangle,
      variant: "default" as const,
      trend: "+12% from last month"
    },
    {
      title: "Pending Review",
      value: "18",
      description: "Awaiting verification",
      icon: Clock,
      variant: "alert" as const,
      trend: "Priority: 3 high"
    },
    {
      title: "Resolved Cases",
      value: "229",
      description: "Successfully handled",
      icon: CheckCircle,
      variant: "success" as const,
      trend: "94% resolution rate"
    },
    {
      title: "Active Responders",
      value: "42",
      description: "Currently deployed",
      icon: Users,
      variant: "default" as const,
      trend: "Full capacity"
    },
    {
      title: "Response Time",
      value: "8.5m",
      description: "Average this week",
      icon: TrendingUp,
      variant: "success" as const,
      trend: "-2m improvement"
    },
    {
      title: "Coverage Areas",
      value: "15",
      description: "Districts monitored",
      icon: MapPin,
      variant: "default" as const,
      trend: "100% coverage"
    },
  ];

  const stats = userRole === "authority" ? authorityStats : citizenStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="transition-all hover:shadow-emergency">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {stat.description}
              </p>
              <Badge variant={stat.variant} className="text-xs">
                {stat.trend}
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};