export const APP_NAME = 'Bazzuca';
export const APP_DESCRIPTION = 'Social media management system powered by bazzuca-react';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  // Bazzuca Routes
  CLIENTS: '/clients',
  CLIENT_NETWORKS: (id: number) => `/clients/${id}/networks`,
  POSTS: '/posts',
  POSTS_NEW: '/posts/new',
  POSTS_EDIT: (id: number) => `/posts/edit/${id}`,
  POSTS_VIEW: (id: number) => `/posts/${id}`,
  CALENDAR: '/calendar',
} as const;

export const EXTERNAL_LINKS = {
  TERMS: '/terms',
  PRIVACY: '/privacy',
  DOCS: 'https://github.com/landim32/Bazzuca',
} as const;
