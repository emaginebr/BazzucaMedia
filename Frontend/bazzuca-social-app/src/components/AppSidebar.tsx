
import { Calendar, Home, Plus, BarChart3, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "New Post",
    url: "/new-post",
    icon: Plus,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="bg-brand-dark border-brand-gray/30">
      <SidebarHeader className="border-b border-brand-gray/30 p-4">
        <div className="flex items-center space-x-3">
          <img src="/lovable-uploads/09350797-0506-4281-b51c-6b3ebcf8dc2a.png" alt="Social Bazzuca" className="h-8 w-auto" />
        </div>
        <SidebarTrigger className="ml-auto text-white" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`text-gray-300 hover:text-white hover:bg-brand-gray/50 ${
                      location.pathname === item.url ? 'bg-brand-blue/20 text-brand-blue' : ''
                    }`}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-brand-gray/30 p-4">
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-brand-gray/50">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
