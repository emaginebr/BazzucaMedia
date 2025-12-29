// ============================================================================
// Core Enums
// ============================================================================

export enum SocialNetworkEnum {
  X = 1,
  Instagram = 2,
  Facebook = 3,
  LinkedIn = 4,
  TikTok = 5,
  YouTube = 6,
  WhatsApp = 7,
  SMS = 8,
  Email = 9,
}

export enum PostTypeEnum {
  Post = 1,
  Story = 2,
  Reel = 3,
}

export enum PostStatusEnum {
  Draft = 1,
  Scheduled = 2,
  ScheduledOnNetwork = 3,
  Posted = 4,
  Canceled = 5,
}

// ============================================================================
// Core Interfaces
// ============================================================================

export interface ClientInfo {
  clientId: number;
  userId: number;
  name: string;
  socialNetworks: SocialNetworkEnum[];
}

export interface SocialNetworkInfo {
  networkId: number;
  clientId: number;
  network: SocialNetworkEnum;
  url: string;
  user: string;
  password: string;
}

export interface PostInfo {
  postId: number;
  networkId: number;
  clientId: number;
  scheduleDate: string; // ISO 8601 date string
  postType: PostTypeEnum;
  mediaUrl: string;
  title: string;
  status: PostStatusEnum;
  description: string;
  socialNetwork?: SocialNetworkInfo;
  client?: ClientInfo;
}

// ============================================================================
// Input/Update Interfaces
// ============================================================================

export interface ClientInput {
  name: string;
  socialNetworks?: SocialNetworkEnum[];
}

export interface ClientUpdate extends ClientInput {
  clientId: number;
  userId: number;
}

export interface SocialNetworkInput {
  clientId: number;
  network: SocialNetworkEnum;
  url: string;
  user: string;
  password: string;
}

export interface SocialNetworkUpdate extends SocialNetworkInput {
  networkId: number;
}

export interface PostInput {
  networkId: number;
  clientId: number;
  scheduleDate: string; // ISO 8601 date string
  postType: PostTypeEnum;
  mediaUrl: string;
  title: string;
  status: PostStatusEnum;
  description: string;
}

export interface PostUpdate extends PostInput {
  postId: number;
}

// ============================================================================
// Search/Filter Interfaces
// ============================================================================

export interface PostSearchParam {
  userId: number;
  clientId?: number;
  network?: SocialNetworkEnum;
  status?: PostStatusEnum;
  pageNum: number;
}

export interface PostListPaged {
  posts: PostInfo[];
  pageNum: number;
  pageCount: number;
}

// ============================================================================
// Configuration
// ============================================================================

export interface BazzucaMediaConfig {
  apiUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
  onError?: (error: Error) => void;
}

// ============================================================================
// Helper Type Guards
// ============================================================================

export function isSocialNetworkEnum(value: number): value is SocialNetworkEnum {
  return Object.values(SocialNetworkEnum).includes(value);
}

export function isPostTypeEnum(value: number): value is PostTypeEnum {
  return Object.values(PostTypeEnum).includes(value);
}

export function isPostStatusEnum(value: number): value is PostStatusEnum {
  return Object.values(PostStatusEnum).includes(value);
}

// ============================================================================
// Utility Functions
// ============================================================================

export function getSocialNetworkName(network: SocialNetworkEnum): string {
  const names: Record<SocialNetworkEnum, string> = {
    [SocialNetworkEnum.X]: 'X (Twitter)',
    [SocialNetworkEnum.Instagram]: 'Instagram',
    [SocialNetworkEnum.Facebook]: 'Facebook',
    [SocialNetworkEnum.LinkedIn]: 'LinkedIn',
    [SocialNetworkEnum.TikTok]: 'TikTok',
    [SocialNetworkEnum.YouTube]: 'YouTube',
    [SocialNetworkEnum.WhatsApp]: 'WhatsApp',
    [SocialNetworkEnum.SMS]: 'SMS',
    [SocialNetworkEnum.Email]: 'Email',
  };
  return names[network] || 'Unknown';
}

export function getPostTypeName(type: PostTypeEnum): string {
  const names: Record<PostTypeEnum, string> = {
    [PostTypeEnum.Post]: 'Post',
    [PostTypeEnum.Story]: 'Story',
    [PostTypeEnum.Reel]: 'Reel',
  };
  return names[type] || 'Unknown';
}

export function getPostStatusName(status: PostStatusEnum): string {
  const names: Record<PostStatusEnum, string> = {
    [PostStatusEnum.Draft]: 'Draft',
    [PostStatusEnum.Scheduled]: 'Scheduled',
    [PostStatusEnum.ScheduledOnNetwork]: 'Scheduled on Network',
    [PostStatusEnum.Posted]: 'Posted',
    [PostStatusEnum.Canceled]: 'Canceled',
  };
  return names[status] || 'Unknown';
}
