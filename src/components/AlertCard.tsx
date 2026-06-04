import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, MapPin, AlertTriangle, Info, CheckCircle } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "High" | "Medium" | "Low";
  disasterType: "Flood" | "Earthquake" | "Fire" | "Cyclone" | "Epidemic" | "Other";
  timestamp: Date;
  location?: string;
}

interface AlertCardProps {
  alert: Alert;
  onViewDetails?: (alert: Alert) => void;
}

export const AlertCard = ({ alert, onViewDetails }: AlertCardProps) => {
  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "High": return "danger";
      case "Medium": return "alert";
      case "Low": return "success";
      default: return "secondary";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "High": return AlertTriangle;
      case "Medium": return Info;
      case "Low": return CheckCircle;
      default: return Info;
    }
  };

  const getDisasterIcon = (type: string) => {
    // For now using AlertTriangle, but could expand with specific icons
    return AlertTriangle;
  };

  const SeverityIcon = getSeverityIcon(alert.severity);
  const DisasterIcon = getDisasterIcon(alert.disasterType);

  return (
    <Card className="border-l-4 border-l-primary transition-all hover:shadow-emergency">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-primary/10 rounded-lg">
              <SeverityIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
                {alert.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                {alert.timestamp.toLocaleTimeString()}
                {alert.location && (
                  <>
                    <span>•</span>
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{alert.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Badge variant={getSeverityVariant(alert.severity)} className="shrink-0">
            {alert.severity}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {alert.description}
        </p>
        
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <DisasterIcon className="h-4 w-4 text-accent" />
            <Badge variant="outline" className="text-xs">
              {alert.disasterType}
            </Badge>
          </div>
          
          {onViewDetails && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails(alert)}
            >
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};