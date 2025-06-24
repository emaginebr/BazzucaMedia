import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "@/assets/images/logo.png";
import { useContext } from "react";
import { AuthContext, AuthSession, IAuthProvider } from "nauth-core";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown, LockIcon, LogOut, User } from "lucide-react";

interface HeaderProps {
  sessionInfo?: AuthSession;
}

export default function Header(param: HeaderProps) {

  const navigate = useNavigate();

  return (
    <header className="border-b border-brand-gray/20 bg-brand-dark/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Bazzuca Social" className="h-10 w-auto" />
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center space-x-4">
          {param.sessionInfo ? (
            <>
              <Link to="/dashboard">
                <Button className="btn-gradient">
                  Go to Dashboard
                </Button>
              </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="flex items-center space-x-2 text-black">
                  <User className="h-5 w-5" />
                  <span>{param.sessionInfo?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/change-password')}>
                  <LockIcon className="h-4 w-4 mr-2" />
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.preventDefault();
                  //userContext.logout();
                  navigate('/');
                }}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-gradient">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}