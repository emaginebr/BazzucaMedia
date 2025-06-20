
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, BarChart3, Zap, Check, Rocket, Instagram, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-brand-gray/20 bg-brand-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/lovable-uploads/09350797-0506-4281-b51c-6b3ebcf8dc2a.png" alt="Social Bazzuca" className="h-10 w-auto" />
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="btn-gradient">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Simple <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-gray-400 text-lg">Choose the perfect plan for your social media goals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="bg-brand-dark border-brand-gray/30 card-hover">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">Free</CardTitle>
                <div className="text-3xl font-bold text-white mt-4">
                  $0<span className="text-lg text-gray-400">/month</span>
                </div>
                <CardDescription className="text-gray-400">Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-brand-blue mr-3" />
                  Up to 3 social accounts
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-brand-blue mr-3" />
                  10 posts per month
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-brand-blue mr-3" />
                  Basic analytics
                </div>
                <Button className="w-full mt-6 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="bg-brand-dark border-brand-blue/50 card-hover relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-brand text-white">
                Most Popular
              </Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">Professional</CardTitle>
                <div className="text-3xl font-bold text-white mt-4">
                  $29<span className="text-lg text-gray-400">/month</span>
                </div>
                <CardDescription className="text-gray-400">For growing businesses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-brand-blue mr-3" />
                  Up to 10 social accounts
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-brand-blue mr-3" />
                  Unlimited posts
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-brand-blue mr-3" />
                  Advanced analytics
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-brand-blue mr-3" />
                  AI-powered scheduling
                </div>
                <Button className="w-full mt-6 btn-gradient">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            {/* Agency Plan */}
            <Card className="bg-brand-dark border-brand-gray/30 card-hover">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">Agency</CardTitle>
                <div className="text-3xl font-bold text-white mt-4">
                  $99<span className="text-lg text-gray-400">/month</span>
                </div>
                <CardDescription className="text-gray-400">For agencies and teams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-brand-blue mr-3" />
                  Unlimited accounts
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-brand-blue mr-3" />
                  Team collaboration
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-brand-blue mr-3" />
                  White-label reports
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-brand-blue mr-3" />
                  Priority support
                </div>
                <Button className="w-full mt-6 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-gray-400 text-lg">Everything you need to know about Social Bazzuca</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-brand-gray/30">
              <AccordionTrigger className="text-white hover:text-brand-blue">
                How does the AI-powered scheduling work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Our AI analyzes your audience engagement patterns, optimal posting times, and content performance to automatically suggest the best times to post your content for maximum reach and engagement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-brand-gray/30">
              <AccordionTrigger className="text-white hover:text-brand-blue">
                Which social media platforms do you support?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We support all major social media platforms including Instagram, Facebook, Twitter, LinkedIn, YouTube, TikTok, and Pinterest. More platforms are being added regularly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-brand-gray/30">
              <AccordionTrigger className="text-white hover:text-brand-blue">
                Can I try Social Bazzuca for free?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Yes! We offer a completely free plan with up to 3 social accounts and 10 posts per month. You can also start a 14-day free trial of our Professional plan with no credit card required.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-brand-gray/30">
              <AccordionTrigger className="text-white hover:text-brand-blue">
                How detailed are the analytics reports?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Our analytics provide comprehensive insights including engagement rates, reach, impressions, best performing content, audience demographics, optimal posting times, and custom reports you can export and share.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-brand-gray/30">
              <AccordionTrigger className="text-white hover:text-brand-blue">
                Is there team collaboration support?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Yes! Our Agency plan includes full team collaboration features with role-based permissions, approval workflows, team member management, and shared content calendars.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-brand-gray/30">
              <AccordionTrigger className="text-white hover:text-brand-blue">
                What kind of customer support do you provide?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We offer email support for all users, live chat support for Professional plan users, and priority phone support for Agency plan customers. Our support team is available 24/7.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-gray/30 bg-brand-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src="/lovable-uploads/09350797-0506-4281-b51c-6b3ebcf8dc2a.png" alt="Social Bazzuca" className="h-10 w-auto mb-4" />
              <p className="text-gray-400 text-sm">
                Automate your social media success with intelligent scheduling and powerful analytics.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-brand-gray/30 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Social Bazzuca. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
