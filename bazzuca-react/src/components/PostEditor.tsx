import React, { useState, useEffect } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useClients } from '../hooks/useClients';
import { useSocialNetworks } from '../hooks/useSocialNetworks';
import type { PostInfo, PostInput, PostTypeEnum, PostStatusEnum } from '../types/bazzuca';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export interface PostEditorProps {
  postId?: number;
  initialData?: Partial<PostInput>;
  onSave?: (post: PostInfo) => void;
  onCancel?: () => void;
  className?: string;
}

const POST_TYPES = [
  { value: 1, label: 'Post' },
  { value: 2, label: 'Story' },
  { value: 3, label: 'Reel' },
];

const POST_STATUSES = [
  { value: 1, label: 'Draft' },
  { value: 2, label: 'Scheduled' },
  { value: 3, label: 'Scheduled on Network' },
  { value: 4, label: 'Posted' },
  { value: 5, label: 'Canceled' },
];

export function PostEditor({
  postId,
  initialData,
  onSave,
  onCancel,
  className,
}: PostEditorProps) {
  const { getPostById, createPost, updatePost } = usePosts(undefined, undefined, false);
  const { clients } = useClients();
  const [selectedClientId, setSelectedClientId] = useState<number | undefined>(initialData?.clientId);
  const { networks } = useSocialNetworks(selectedClientId || 0, !!selectedClientId);

  const [formData, setFormData] = useState<Partial<PostInput>>({
    title: '',
    description: '',
    mediaUrl: '',
    scheduleDate: new Date().toISOString().slice(0, 16),
    postType: 1 as PostTypeEnum,
    status: 1 as PostStatusEnum,
    ...initialData,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingPost, setExistingPost] = useState<PostInfo | null>(null);

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId]);

  const loadPost = async () => {
    if (!postId) return;
    
    setLoading(true);
    const post = await getPostById(postId);
    setLoading(false);

    if (post) {
      setExistingPost(post);
      setSelectedClientId(post.clientId);
      setFormData({
        clientId: post.clientId,
        networkId: post.networkId,
        title: post.title,
        description: post.description,
        mediaUrl: post.mediaUrl,
        scheduleDate: post.scheduleDate.slice(0, 16),
        postType: post.postType,
        status: post.status,
      });
    }
  };

  const handleChange = (field: keyof PostInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClientChange = (clientId: string) => {
    const id = Number(clientId);
    setSelectedClientId(id);
    setFormData((prev) => ({ ...prev, clientId: id, networkId: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title?.trim()) {
      setError('Title is required');
      return;
    }

    if (!formData.clientId) {
      setError('Client is required');
      return;
    }

    if (!formData.networkId) {
      setError('Social network is required');
      return;
    }

    if (!formData.scheduleDate) {
      setError('Schedule date is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const postData: PostInput = {
        clientId: formData.clientId!,
        networkId: formData.networkId!,
        title: formData.title.trim(),
        description: formData.description?.trim() || '',
        mediaUrl: formData.mediaUrl?.trim() || '',
        scheduleDate: new Date(formData.scheduleDate).toISOString(),
        postType: formData.postType || 1,
        status: formData.status || 1,
      };

      let result: PostInfo | undefined;

      if (postId && existingPost) {
        result = await updatePost({
          postId,
          ...postData,
        });
      } else {
        result = await createPost(postData);
      }

      if (result) {
        onSave?.(result);
      } else {
        setError('Failed to save post. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{postId ? 'Edit Post' : 'Create New Post'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <select
                id="client"
                value={formData.clientId?.toString() || ''}
                onChange={(e) => handleClientChange(e.target.value)}
                disabled={loading}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select a client</option>
                {clients.map((client) => (
                  <option key={client.clientId} value={client.clientId.toString()}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="network">Social Network</Label>
              <select
                id="network"
                value={formData.networkId?.toString() || ''}
                onChange={(e) => handleChange('networkId', e.target.value ? Number(e.target.value) : undefined)}
                disabled={loading || !selectedClientId}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select a network</option>
                {networks.map((network) => (
                  <option key={network.networkId} value={network.networkId.toString()}>
                    {network.user} ({network.url})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter post title"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter post description"
              disabled={loading}
              rows={5}
              className="flex w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mediaUrl">Media URL</Label>
            <Input
              id="mediaUrl"
              type="url"
              value={formData.mediaUrl}
              onChange={(e) => handleChange('mediaUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
              disabled={loading}
            />
            {formData.mediaUrl && (
              <div className="mt-2">
                <img
                  src={formData.mediaUrl}
                  alt="Preview"
                  className="max-w-xs rounded-md border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduleDate">Schedule Date & Time</Label>
              <Input
                id="scheduleDate"
                type="datetime-local"
                value={formData.scheduleDate}
                onChange={(e) => handleChange('scheduleDate', e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postType">Post Type</Label>
              <select
                id="postType"
                value={formData.postType?.toString()}
                onChange={(e) => handleChange('postType', Number(e.target.value))}
                disabled={loading}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {POST_TYPES.map((type) => (
                  <option key={type.value} value={type.value.toString()}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status?.toString()}
                onChange={(e) => handleChange('status', Number(e.target.value))}
                disabled={loading}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {POST_STATUSES.map((status) => (
                  <option key={status.value} value={status.value.toString()}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="flex items-center gap-2 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : postId ? 'Update Post' : 'Create Post'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
