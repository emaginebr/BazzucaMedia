import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "./Hero";
import Features from "./Features";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IUserProvider, UserContext } from "@/lib/nauth-core";

export default function HomePage() {

  const navigate = useNavigate();

  const userContext = useContext<IUserProvider>(UserContext);

  useEffect(() => {
    userContext.loadUserSession().then((ret) => {
      if (!ret.sucesso) {
        toast.error(ret.mensagemErro);
        return;
      }
    })
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header 
        sessionInfo={userContext.sessionInfo} 
        logout={() => {
          userContext.logout();
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
