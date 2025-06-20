
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LoginProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const Login = ({ setIsAuthenticated }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        setIsAuthenticated(true);
        toast.success("Welcome back to Social Bazzuca!");
        navigate("/dashboard");
      } else {
        toast.error("Please fill in all fields");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/lovable-uploads/09350797-0506-4281-b51c-6b3ebcf8dc2a.png" alt="Social Bazzuca" className="h-12 w-auto mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your Social Bazzuca account</p>
        </div>

        <Card className="bg-brand-dark border-brand-gray/30">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to access your dashboard
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
              <div>
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-brand-gray border-brand-gray/50 text-white"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <Link to="/forgot-password" className="text-brand-blue hover:underline text-sm">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full btn-gradient" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-brand-blue hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
