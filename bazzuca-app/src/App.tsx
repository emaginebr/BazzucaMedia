import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NAuthProvider, useAuth } from 'nauth-react';
import { BazzucaProvider } from 'bazzuca-react';
import { Toaster } from 'sonner';
//import 'bazzuca-react/styles';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import ClientsPage from './pages/ClientsPage';
import ClientNetworksPage from './pages/ClientNetworksPage';
import PostsPage from './pages/PostsPage';
import PostEditPage from './pages/PostEditPage';
import PostViewPage from './pages/PostViewPage';
import CalendarPage from './pages/CalendarPage';
import { ROUTES } from './lib/constants';
import { useMemo } from 'react';

function AppContent() {
  const { token } = useAuth();

  const bazzucaConfig = useMemo(() => ({
    apiUrl: import.meta.env.VITE_BAZZUCA_API_URL,
    ...(token && {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  }), [token]);

  return (
    <BazzucaProvider config={bazzucaConfig}>
          <Toaster position="bottom-right" richColors />
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CLIENTS}
            element={
              <ProtectedRoute>
                <ClientsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients/:id/networks"
            element={
              <ProtectedRoute>
                <ClientNetworksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.POSTS}
            element={
              <ProtectedRoute>
                <PostsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.POSTS_NEW}
            element={
              <ProtectedRoute>
                <PostEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/edit/:id"
            element={
              <ProtectedRoute>
                <PostEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/view/:id"
            element={
              <ProtectedRoute>
                <PostViewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CALENDAR}
            element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Route>
      </Routes>
        </BazzucaProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NAuthProvider
        config={{
          apiUrl: import.meta.env.VITE_API_URL,
          enableFingerprinting: true,
          redirectOnUnauthorized: ROUTES.LOGIN,
          onAuthChange: (user) => {
            console.log('Auth state changed:', user);
          },
        }}
      >
        <AppContent />
      </NAuthProvider>
    </BrowserRouter>
  );
}

export default App;
