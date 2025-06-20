
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { NewPostContent } from "@/components/NewPostContent";

interface NewPostProps {
  isAuthenticated: boolean;
}

const NewPost = ({ isAuthenticated }: NewPostProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-dark">
        <AppSidebar />
        <main className="flex-1">
          <NewPostContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default NewPost;
