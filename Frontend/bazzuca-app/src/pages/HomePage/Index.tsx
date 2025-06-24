
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, BarChart3, Zap, Check, Rocket, Instagram, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "./Hero";
import Features from "./Features";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import { useContext, useEffect } from "react";
import { AuthContext, IAuthProvider } from "nauth-core";
import { toast } from "sonner";

export default function Index() {

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
      <Header sessionInfo={authContext.sessionInfo} />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};
