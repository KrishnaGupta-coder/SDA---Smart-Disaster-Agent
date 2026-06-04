import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Users, MapPin } from "lucide-react";
import heroImage from "@/assets/emergency-hero.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Emergency Response Team" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-in">
          <Badge className="mb-6 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
            <Shield className="h-3 w-3 mr-1" />
            Emergency Response Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Smart Disaster
            <span className="block bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Real-time incident reporting and emergency response coordination. 
            Empowering citizens and authorities to work together during critical situations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="alert" 
              size="lg" 
              onClick={onGetStarted}
              className="text-lg px-8 py-6 shadow-glow hover:scale-105"
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Get Started Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <MapPin className="h-5 w-5 mr-2" />
              View Live Map
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border border-primary-foreground/20">
              <div className="text-2xl font-bold text-primary-foreground">24/7</div>
              <div className="text-primary-foreground/80">Real-time Monitoring</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border border-primary-foreground/20">
              <div className="text-2xl font-bold text-primary-foreground">Instant</div>
              <div className="text-primary-foreground/80">Alert Notifications</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border border-primary-foreground/20">
              <div className="text-2xl font-bold text-primary-foreground">Coordinated</div>
              <div className="text-primary-foreground/80">Emergency Response</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse-emergency">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};