import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-brand-blue/20 text-brand-blue border-brand-blue/30">
              <Rocket className="w-4 h-4 mr-2" />
              Launch Your Social Media Success
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Schedule <span className="gradient-text">Smart</span>,<br />
              Grow <span className="gradient-text">Faster</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Automate your social media presence with intelligent scheduling, 
              analytics, and multi-platform management. Focus on creating, 
              we'll handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="btn-gradient text-lg px-8 py-4">
                  Launch App
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-brand-purple text-brand-white hover:bg-brand-purple hover:text-white">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
}