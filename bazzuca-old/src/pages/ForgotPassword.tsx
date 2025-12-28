
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email) {
        setIsSubmitted(true);
        toast.success("Password reset link sent to your email!");
      } else {
        toast.error("Please enter your email address");
      }
      setIsLoading(false);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <Link to="/">
              <img src="/lovable-uploads/09350797-0506-4281-b51c-6b3ebcf8dc2a.png" alt="Social Bazzuca" className="h-12 w-auto mx-auto mb-4" />
            </Link>
          </div>

          <Card className="bg-brand-dark border-brand-gray/30">
            <CardHeader>
              <CardTitle className="text-white">Check Your Email</CardTitle>
              <CardDescription className="text-gray-400">
                We've sent a password reset link to {email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-6">
                Click the link in your email to reset your password. If you don't see it, check your spam folder.
              </p>
              <Link to="/login">
                <Button className="w-full btn-gradient">
                  Back to Sign In
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/lovable-uploads/09350797-0506-4281-b51c-6b3ebcf8dc2a.png" alt="Social Bazzuca" className="h-12 w-auto mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          <p className="text-gray-400">Enter your email to receive a reset link</p>
        </div>

        <Card className="bg-brand-dark border-brand-gray/30">
          <CardHeader>
            <CardTitle className="text-white">Forgot Password</CardTitle>
            <CardDescription className="text-gray-400">
              We'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-brand-gray border-brand-gray/50 text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <Button type="submit" className="w-full btn-gradient" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
            <div className="mt-6">
              <Link to="/login" className="flex items-center justify-center text-brand-blue hover:underline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
