import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";
import Index from "./pages/HomePage/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard/Index";
import Post from "./pages/Post/Index";
import NotFound from "./pages/NotFound";
import { AuthContext, AuthProvider, ContextBuilder, IAuthProvider, UserProvider } from "nauth-core";
import ClientProvider from "./Contexts/Client/ClientProvider";
import ClientList from "./pages/ClientList/Index";
import SocialNetworkProvider from "./Contexts/SocialNetwork/SocialNetworkProvider";
import ClientDetail from "./pages/ClientDetail/Index";
import PostProvider from "./Contexts/Post/PostProvider";
import PostList from "./pages/PostList/Index";
import CalendarPage from "./pages/CalendarPage/Index";

const queryClient = new QueryClient();

function App() {

  const ContextContainer = ContextBuilder([
    AuthProvider, UserProvider, ClientProvider, SocialNetworkProvider,
    PostProvider
  ]);

  return (
    <ContextContainer>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients">
                <Route index element={<ClientList />} />
                <Route path=":clientId" element={<ClientDetail />} />
              </Route>
              <Route path="/posts">
                <Route index element={<PostList />} />
                <Route path="new" element={<Post />} />
                <Route path=":postId" element={<Post />} />
              </Route>
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ContextContainer>
  );
}

export default App;
