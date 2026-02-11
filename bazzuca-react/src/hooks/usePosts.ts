import { useState, useCallback, useEffect } from 'react';
import { useBazzuca } from '../contexts/BazzucaContext';
import type { PostInfo, PostInput, PostUpdate, PostSearchParam, PostListPaged } from '../types/bazzuca';

export interface UsePostsReturn {
  posts: PostInfo[];
  pagedPosts: PostListPaged | null;
  loading: boolean;
  error: Error | null;
  fetchPosts: (month: number, year: number) => Promise<void>;
  searchPosts: (params: PostSearchParam) => Promise<void>;
  getPostById: (postId: number) => Promise<PostInfo | undefined>;
  createPost: (post: PostInput) => Promise<PostInfo | undefined>;
  updatePost: (post: PostUpdate) => Promise<PostInfo | undefined>;
  publishPost: (postId: number) => Promise<PostInfo | undefined>;
  refreshPosts: () => Promise<void>;
}

export function usePosts(month?: number, year?: number, autoFetch: boolean = false): UsePostsReturn {
  const { postApi } = useBazzuca();
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [pagedPosts, setPagedPosts] = useState<PostListPaged | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastFetchParams, setLastFetchParams] = useState<{ month?: number; year?: number }>({
    month,
    year,
  });

  const fetchPosts = useCallback(async (fetchMonth: number, fetchYear: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await postApi.listPostsByUser(fetchMonth, fetchYear);
      setPosts(data);
      setLastFetchParams({ month: fetchMonth, year: fetchYear });
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch posts');
      setError(error);
      console.error('[usePosts] fetchPosts error:', error);
    } finally {
      setLoading(false);
    }
  }, [postApi]);

  const searchPosts = useCallback(async (params: PostSearchParam) => {
    try {
      setLoading(true);
      setError(null);
      const data = await postApi.searchPosts(params);
      setPagedPosts(data);
      setPosts(data.posts);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to search posts');
      setError(error);
      console.error('[usePosts] searchPosts error:', error);
    } finally {
      setLoading(false);
    }
  }, [postApi]);

  const getPostById = useCallback(async (postId: number): Promise<PostInfo | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const data = await postApi.getPostById(postId);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get post');
      setError(error);
      console.error('[usePosts] getPostById error:', error);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [postApi]);

  const createPost = useCallback(async (post: PostInput): Promise<PostInfo | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const newPost = await postApi.createPost(post);
      setPosts(prev => [...prev, newPost]);
      return newPost;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create post');
      setError(error);
      console.error('[usePosts] createPost error:', error);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [postApi]);

  const updatePost = useCallback(async (post: PostUpdate): Promise<PostInfo | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const updatedPost = await postApi.updatePost(post);
      setPosts(prev => 
        prev.map(p => p.postId === updatedPost.postId ? updatedPost : p)
      );
      return updatedPost;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update post');
      setError(error);
      console.error('[usePosts] updatePost error:', error);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [postApi]);

  const publishPost = useCallback(async (postId: number): Promise<PostInfo | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const publishedPost = await postApi.publishPost(postId);
      setPosts(prev => 
        prev.map(p => p.postId === publishedPost.postId ? publishedPost : p)
      );
      return publishedPost;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to publish post');
      setError(error);
      console.error('[usePosts] publishPost error:', error);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [postApi]);

  const refreshPosts = useCallback(async () => {
    if (lastFetchParams.month && lastFetchParams.year) {
      await fetchPosts(lastFetchParams.month, lastFetchParams.year);
    }
  }, [fetchPosts, lastFetchParams]);

  useEffect(() => {
    if (autoFetch && month && year) {
      fetchPosts(month, year);
    }
  }, [autoFetch, month, year, fetchPosts]);

  return {
    posts,
    pagedPosts,
    loading,
    error,
    fetchPosts,
    searchPosts,
    getPostById,
    createPost,
    updatePost,
    publishPost,
    refreshPosts,
  };
}
