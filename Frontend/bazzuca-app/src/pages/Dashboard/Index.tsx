
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "./Header";
import StatCards from "./StatCards";
import CalendarPart from "./CalendarPart";
import RecentPosts from "./RecentPosts";
import { IUserProvider, UserContext } from "@/lib/nauth-core";

export default function Dashboard() {

  const navigate = useNavigate();

  const userContext = useContext<IUserProvider>(UserContext);

  useEffect(() => {
    userContext.loadUserSession().then((ret) => {
      if (!userContext.sessionInfo) {
        navigate("/login");
        return;
      }
    })
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-dark">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-6">
            <Header />
            <StatCards />

            <div className="grid lg:grid-cols-2 gap-8">
              <CalendarPart />
              <RecentPosts />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
