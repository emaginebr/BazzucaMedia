// Main entry point for bazzuca-react package

// Styles - Import first
import './styles/index.css';

// BazzucaMedia Components - Clients
export { ClientList } from './components/ClientList';
export { ClientModal } from './components/ClientModal';
export { ConfirmDialog } from './components/ConfirmDialog';
export type { ClientListProps } from './components/ClientList';
export type { ClientModalProps } from './components/ClientModal';
export type { ConfirmDialogProps } from './components/ConfirmDialog';

// BazzucaMedia Components - Social Networks
export { SocialNetworkList } from './components/SocialNetworkList';
export { SocialNetworkModal } from './components/SocialNetworkModal';
export type { SocialNetworkListProps } from './components/SocialNetworkList';
export type { SocialNetworkModalProps } from './components/SocialNetworkModal';

// BazzucaMedia Components - Posts
export { PostList } from './components/PostList';
export { PostEditor } from './components/PostEditor';
export { PostViewer } from './components/PostViewer';
export { PostCalendar } from './components/PostCalendar';
export type { PostListProps } from './components/PostList';
export type { PostEditorProps } from './components/PostEditor';
export type { PostViewerProps } from './components/PostViewer';
export type { PostCalendarProps } from './components/PostCalendar';

// Context Providers & Hooks
export { BazzucaMediaProvider, useBazzucaMedia } from './contexts/BazzucaContext';
export type { BazzucaMediaContextValue, BazzucaMediaProviderProps } from './contexts/BazzucaContext';

// Custom Hooks - BazzucaMedia
export { useClients } from './hooks/useClients';
export type { UseClientsReturn } from './hooks/useClients';
export { useSocialNetworks } from './hooks/useSocialNetworks';
export type { UseSocialNetworksReturn } from './hooks/useSocialNetworks';
export { usePosts } from './hooks/usePosts';
export type { UsePostsReturn } from './hooks/usePosts';

// API Services
export { ClientAPI } from './services/client-api';
export { SocialNetworkAPI } from './services/social-network-api';
export { PostAPI } from './services/post-api';

// UI Components
export { Button } from './components/ui/button';
export { Input } from './components/ui/input';
export { Label } from './components/ui/label';
export { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar';
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './components/ui/card';
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from './components/ui/table';

// BazzucaMedia Types
export type {
  BazzucaMediaConfig,
  ClientInfo,
  ClientInput,
  ClientUpdate,
  SocialNetworkInfo,
  SocialNetworkInput,
  SocialNetworkUpdate,
  PostInfo,
  PostInput,
  PostUpdate,
  PostSearchParam,
  PostListPaged,
} from './types/bazzuca';

// BazzucaMedia Enums
export {
  SocialNetworkEnum,
  PostTypeEnum,
  PostStatusEnum,
} from './types/bazzuca';

// BazzucaMedia Utility Functions
export {
  getSocialNetworkName,
  getPostTypeName,
  getPostStatusName,
  isSocialNetworkEnum,
  isPostTypeEnum,
  isPostStatusEnum,
} from './types/bazzuca';

// General Utility Functions
export { cn } from './utils/cn';
export {
  validateCPF,
  validateCNPJ,
  validateEmail,
  validatePhone,
  formatPhone,
  formatDocument,
  formatZipCode,
  validatePasswordStrength,
  debounce,
  throttle,
} from './utils/validators';

export type { PasswordStrength } from './utils/validators';
