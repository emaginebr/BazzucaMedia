
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext, IAuthProvider } from 'nauth-core';
import logo from "@/assets/images/logo.png";

//interface LoginProps {
//  setIsAuthenticated: (auth: boolean) => void;
//}

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const authContext = useContext<IAuthProvider>(AuthContext);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let ret = await authContext.loginWithEmail(email, password);
    if (!ret.sucesso) {
      toast.error(ret.mensagemErro);
      return;
    }
    toast.success("Welcome back to Social Bazzuca!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="Social Bazzuca" className="h-12 w-auto mx-auto mb-4" />
          </Link>
          {/*<h1 className="text-2xl font-bold text-white">Welcome Back</h1>*/}
          <p className="text-gray-400">Sign in to your Social Bazzuca account</p>
        </div>

        <Card className="bg-brand-dark border-brand-gray/30">
          <CardHeader className="text-center">
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
              <Button type="submit" className="w-full btn-gradient" disabled={authContext.loading}>
                {authContext.loading ? "Signing in..." : "Sign In"}
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
