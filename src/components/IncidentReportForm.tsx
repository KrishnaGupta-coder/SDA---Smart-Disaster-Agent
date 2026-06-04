import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, Send, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IncidentReport {
  title: string;
  description: string;
  disasterType: string;
  location: {
    latitude?: number;
    longitude?: number;
    address: string;
  };
  media?: File;
}

interface IncidentReportFormProps {
  onSubmit?: (report: IncidentReport) => void;
}

export const IncidentReportForm = ({ onSubmit }: IncidentReportFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [formData, setFormData] = useState<IncidentReport>({
    title: "",
    description: "",
    disasterType: "",
    location: {
      address: "",
    },
  });

  const disasterTypes = [
    "Flood",
    "Earthquake", 
    "Fire",
    "Cyclone",
    "Epidemic",
    "Landslide",
    "Accident",
    "Other"
  ];

  const handleLocationCapture = async () => {
    setIsGettingLocation(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });

      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
        },
      }));

      toast({
        title: "Location captured",
        description: "Your current location has been added to the report.",
      });
    } catch (error) {
      toast({
        title: "Location error",
        description: "Unable to get your location. Please enter it manually.",
        variant: "destructive",
      });
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.disasterType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSubmit?.(formData);
      
      toast({
        title: "Report submitted successfully",
        description: "Your incident report has been sent to local authorities.",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        disasterType: "",
        location: { address: "" },
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Unable to submit your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Report Emergency Incident
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Incident Title *</Label>
            <Input
              id="title"
              placeholder="Brief description of the incident"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          {/* Disaster Type */}
          <div className="space-y-2">
            <Label htmlFor="disaster-type">Disaster Type *</Label>
            <Select value={formData.disasterType} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, disasterType: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select disaster type" />
              </SelectTrigger>
              <SelectContent>
                {disasterTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed information about the incident..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="Enter location or use GPS"
                value={formData.location.address}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, address: e.target.value }
                }))}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleLocationCapture}
                disabled={isGettingLocation}
                className="shrink-0"
              >
                <MapPin className="h-4 w-4" />
                {isGettingLocation ? "Getting..." : "GPS"}
              </Button>
            </div>
            {formData.location.latitude && (
              <Badge variant="outline" className="text-xs">
                GPS: {formData.location.latitude.toFixed(4)}, {formData.location.longitude?.toFixed(4)}
              </Badge>
            )}
          </div>

          {/* Media Upload */}
          <div className="space-y-2">
            <Label htmlFor="media">Photo/Video Evidence</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload photos or videos to support your report
              </p>
              <Button type="button" variant="outline" size="sm">
                Choose File
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="danger" 
            size="lg" 
            disabled={isSubmitting}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Submitting Report..." : "Submit Emergency Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};