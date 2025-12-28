import type { AxiosInstance } from 'axios';
import type { PostInfo, PostInput, PostUpdate, PostSearchParam, PostListPaged } from '../types/bazzuca';

const POST_API_ENDPOINTS = {
  LIST_BY_USER: (month: number, year: number) => `/Post/listByUser/${month}/${year}`,
  SEARCH: '/Post/search',
  GET_BY_ID: (postId: number) => `/Post/getById/${postId}`,
  INSERT: '/Post/insert',
  UPDATE: '/Post/update',
  PUBLISH: (postId: number) => `/Post/publish/${postId}`,
};

export class PostAPI {
  constructor(private client: AxiosInstance) {}

  /**
   * List posts by month and year for the authenticated user
   */
  async listPostsByUser(month: number, year: number): Promise<PostInfo[]> {
    console.log('[PostAPI] listPostsByUser - Request:', { 
      url: POST_API_ENDPOINTS.LIST_BY_USER(month, year), 
      month, 
      year 
    });
    
    const response = await this.client.get<PostInfo[]>(
      POST_API_ENDPOINTS.LIST_BY_USER(month, year)
    );
    
    console.log('[PostAPI] listPostsByUser - Response:', response.data);
    return this.transformPostDates(response.data);
  }

  /**
   * Search posts with filters (paged results)
   */
  async searchPosts(params: PostSearchParam): Promise<PostListPaged> {
    console.log('[PostAPI] searchPosts - Request:', { 
      url: POST_API_ENDPOINTS.SEARCH, 
      data: params 
    });
    
    const response = await this.client.post<PostListPaged>(
      POST_API_ENDPOINTS.SEARCH,
      params
    );
    
    console.log('[PostAPI] searchPosts - Response:', response.data);
    return {
      ...response.data,
      posts: this.transformPostDates(response.data.posts),
    };
  }

  /**
   * Get a single post by ID
   */
  async getPostById(postId: number): Promise<PostInfo> {
    console.log('[PostAPI] getPostById - Request:', { 
      url: POST_API_ENDPOINTS.GET_BY_ID(postId), 
      postId 
    });
    
    const response = await this.client.get<PostInfo>(
      POST_API_ENDPOINTS.GET_BY_ID(postId)
    );
    
    console.log('[PostAPI] getPostById - Response:', response.data);
    return this.transformPostDate(response.data);
  }

  /**
   * Create a new post
   */
  async createPost(post: PostInput): Promise<PostInfo> {
    console.log('[PostAPI] createPost - Request:', { 
      url: POST_API_ENDPOINTS.INSERT, 
      data: post 
    });
    
    const response = await this.client.post<PostInfo>(
      POST_API_ENDPOINTS.INSERT,
      post
    );
    
    console.log('[PostAPI] createPost - Response:', response.data);
    return this.transformPostDate(response.data);
  }

  /**
   * Update an existing post
   */
  async updatePost(post: PostUpdate): Promise<PostInfo> {
    console.log('[PostAPI] updatePost - Request:', { 
      url: POST_API_ENDPOINTS.UPDATE, 
      data: post 
    });
    
    const response = await this.client.post<PostInfo>(
      POST_API_ENDPOINTS.UPDATE,
      post
    );
    
    console.log('[PostAPI] updatePost - Response:', response.data);
    return this.transformPostDate(response.data);
  }

  /**
   * Publish a post to the social network
   */
  async publishPost(postId: number): Promise<PostInfo> {
    console.log('[PostAPI] publishPost - Request:', { 
      url: POST_API_ENDPOINTS.PUBLISH(postId), 
      postId 
    });
    
    const response = await this.client.get<PostInfo>(
      POST_API_ENDPOINTS.PUBLISH(postId)
    );
    
    console.log('[PostAPI] publishPost - Response:', response.data);
    return this.transformPostDate(response.data);
  }

  /**
   * Transform scheduleDate to Date object in a single post
   */
  private transformPostDate(post: PostInfo): PostInfo {
    return {
      ...post,
      scheduleDate: typeof post.scheduleDate === 'string' 
        ? post.scheduleDate 
        : new Date(post.scheduleDate).toISOString(),
    };
  }

  /**
   * Transform scheduleDate to Date object in an array of posts
   */
  private transformPostDates(posts: PostInfo[]): PostInfo[] {
    return posts.map(post => this.transformPostDate(post));
  }
}
