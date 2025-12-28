import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Calendar, Facebook, Instagram, Linkedin, Twitter, Youtube, Zap } from "lucide-react";

export default function Features() {
    return (
        <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Dominate</span> Social Media
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Powerful features designed to streamline your workflow and maximize your reach
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-brand-dark border-brand-gray/30 card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Smart Scheduling</CardTitle>
                <CardDescription className="text-gray-400">
                  AI-powered optimal posting times based on your audience engagement patterns
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-brand-dark border-brand-gray/30 card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Multi-Platform</CardTitle>
                <CardDescription className="text-gray-400">
                  Connect and manage all your social media accounts from one powerful dashboard
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-brand-dark border-brand-gray/30 card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Performance Analytics</CardTitle>
                <CardDescription className="text-gray-400">
                  Detailed insights and reports to track your growth and optimize your strategy
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Social Platform Logos */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-8">Connect with all major platforms</p>
            <div className="flex justify-center space-x-8 opacity-60">
              <Instagram className="w-8 h-8 text-gray-400" />
              <Facebook className="w-8 h-8 text-gray-400" />
              <Twitter className="w-8 h-8 text-gray-400" />
              <Linkedin className="w-8 h-8 text-gray-400" />
              <Youtube className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>
      </section>
    );
}