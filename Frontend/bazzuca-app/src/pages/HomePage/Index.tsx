import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "./Hero";
import Features from "./Features";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import { useContext, useEffect } from "react";
import { AuthContext, IAuthProvider } from "nauth-core";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();

  const authContext = useContext<IAuthProvider>(AuthContext);

  useEffect(() => {
    authContext.loadUserSession().then((ret) => {
      if (!ret.sucesso) {
        toast.error(ret.mensagemErro);
        return;
      }
    })
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header 
        sessionInfo={authContext.sessionInfo} 
        logout={() => {
          authContext.logout();
          navigate('/');
        }}
      />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};
