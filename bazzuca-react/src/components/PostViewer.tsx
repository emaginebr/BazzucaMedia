import { useState, useEffect } from 'react';
import { usePosts } from '../hooks/usePosts';
import type { PostInfo } from '../types/bazzuca';
import { getSocialNetworkName, getPostTypeName, getPostStatusName, PostStatusEnum } from '../types/bazzuca';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowLeft, Send, Pencil, ExternalLink } from 'lucide-react';
import { cn } from '../utils/cn';
import { format } from 'date-fns';

export interface PostViewerProps {
  postId?: number;
  post?: PostInfo;
  onEdit?: (post: PostInfo) => void;
  onPublish?: (postId: number) => void;
  onBack?: () => void;
  className?: string;
}

export function PostViewer({
  postId,
  post: initialPost,
  onEdit,
  onPublish,
  onBack,
  className,
}: PostViewerProps) {
  const { getPostById, publishPost } = usePosts(undefined, undefined, false);
  const [post, setPost] = useState<PostInfo | null>(initialPost || null);
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (postId && !initialPost) {
      loadPost();
    } else if (initialPost) {
      setPost(initialPost);
    }
  }, [postId, initialPost]);

  const loadPost = async () => {
    if (!postId) return;
    
    setLoading(true);
    setError(null);
    const data = await getPostById(postId);
    setLoading(false);

    if (data) {
      setPost(data);
    } else {
      setError('Failed to load post');
    }
  };

  const handlePublish = async () => {
    if (!post) return;
    
    if (window.confirm('Are you sure you want to publish this post?')) {
      setPublishing(true);
      const result = await publishPost(post.postId);
      setPublishing(false);
      
      if (result) {
        setPost(result);
        onPublish?.(post.postId);
      }
    }
  };

  const getStatusColor = (status: PostStatusEnum) => {
    switch (status) {
      case PostStatusEnum.Draft:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
      case PostStatusEnum.Scheduled:
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case PostStatusEnum.ScheduledOnNetwork:
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      case PostStatusEnum.Posted:
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case PostStatusEnum.Canceled:
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="py-8">
          <div className="flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Loading post...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !post) {
    return (
      <Card className={cn('border-red-200 dark:border-red-800', className)}>
        <CardContent className="py-6">
          <p className="text-red-600 dark:text-red-400">{error || 'Post not found'}</p>
          {onBack && (
            <Button variant="outline" onClick={onBack} className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription className="mt-1">
                <span className={cn('inline-flex items-center px-2 py-1 text-xs rounded-full', getStatusColor(post.status))}>
                  {getPostStatusName(post.status)}
                </span>
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {post.status !== PostStatusEnum.Posted && (
              <Button onClick={handlePublish} disabled={publishing} size="sm">
                <Send className="h-4 w-4 mr-2" />
                {publishing ? 'Publishing...' : 'Publish'}
              </Button>
            )}
            {onEdit && (
              <Button variant="outline" onClick={() => onEdit(post)} size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Client</h3>
              <p className="mt-1 text-sm font-medium">{post.client?.name || 'N/A'}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Social Network</h3>
              {post.socialNetwork ? (
                <div className="mt-1 space-y-1">
                  <p className="text-sm font-medium">
                    {getSocialNetworkName(post.socialNetwork.network)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">@{post.socialNetwork.user}</p>
                  <a
                    href={post.socialNetwork.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Profile
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              ) : (
                <p className="mt-1 text-sm">N/A</p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Post Type</h3>
              <p className="mt-1 text-sm">{getPostTypeName(post.postType)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Scheduled Date</h3>
              <p className="mt-1 text-sm">
                {format(new Date(post.scheduleDate), 'EEEE, MMMM d, yyyy')}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {format(new Date(post.scheduleDate), 'h:mm a')}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {post.mediaUrl && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Media</h3>
                <img
                  src={post.mediaUrl}
                  alt={post.title}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage not available%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Description</h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-sm whitespace-pre-wrap">{post.description || 'No description provided.'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
