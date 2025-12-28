export const APP_NAME = 'BazzucaMedia';
export const APP_DESCRIPTION = 'Social media management system powered by bazzuca-react';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  // BazzucaMedia Routes
  CLIENTS: '/clients',
  POSTS: '/posts',
  POSTS_NEW: '/posts/new',
  POSTS_EDIT: (id: number) => `/posts/edit/${id}`,
  POSTS_VIEW: (id: number) => `/posts/${id}`,
  CALENDAR: '/calendar',
} as const;

export const EXTERNAL_LINKS = {
  TERMS: '/terms',
  PRIVACY: '/privacy',
  DOCS: 'https://github.com/landim32/BazzucaMedia',
} as const;
