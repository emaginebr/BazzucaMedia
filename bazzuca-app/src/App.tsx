import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NAuthProvider } from 'nauth-react';
import { NNewsProvider } from 'nnews-react';
import { BazzucaMediaProvider } from 'bazzuca-react';
import { Toaster } from 'sonner';
//import 'nauth-react/styles';
import 'bazzuca-react/styles';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import TagsPage from './pages/TagsPage';
import CategoryPage from './pages/CategoryPage';
import { ArticleListPage } from './pages/ArticleListPage';
import { ArticleEditPage } from './pages/ArticleEditPage';
import ClientsPage from './pages/ClientsPage';
import PostsPage from './pages/PostsPage';
import PostEditPage from './pages/PostEditPage';
import PostViewPage from './pages/PostViewPage';
import CalendarPage from './pages/CalendarPage';
import { ROUTES } from './lib/constants';

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
        <NNewsProvider
          config={{
            apiUrl: import.meta.env.VITE_NNEWS_API_URL,
          }}
        >
          <BazzucaMediaProvider
            config={{
              apiUrl: import.meta.env.VITE_BAZZUCA_API_URL,
            }}
          >
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
              path={ROUTES.TAGS}
              element={
                <ProtectedRoute>
                  <TagsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.CATEGORIES}
              element={
                <ProtectedRoute>
                  <CategoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ARTICLES}
              element={
                <ProtectedRoute>
                  <ArticleListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/articles/new"
              element={
                <ProtectedRoute>
                  <ArticleEditPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/articles/edit/:id"
              element={
                <ProtectedRoute>
                  <ArticleEditPage />
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
          </BazzucaMediaProvider>
        </NNewsProvider>
      </NAuthProvider>
    </BrowserRouter>
  );
}

export default App;
