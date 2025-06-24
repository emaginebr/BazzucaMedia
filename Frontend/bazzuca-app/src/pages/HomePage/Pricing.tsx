import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Pricing() {
    return (
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
    );
}