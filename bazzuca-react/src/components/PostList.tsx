import { useState } from 'react';
import { Pencil, Plus, Send, Eye } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';
import type { PostInfo } from '../types/bazzuca';
import { getSocialNetworkName, getPostTypeName, getPostStatusName, PostStatusEnum } from '../types/bazzuca';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { cn } from '../utils/cn';
import { format } from 'date-fns';

export interface PostListProps {
  month?: number;
  year?: number;
  clientId?: number;
  onEdit?: (post: PostInfo) => void;
  onDelete?: (postId: number) => void;
  onPublish?: (postId: number) => void;
  onView?: (post: PostInfo) => void;
  onCreate?: () => void;
  showCreateButton?: boolean;
  className?: string;
}

export function PostList({
  month,
  year,
  clientId,
  onEdit,
  onPublish,
  onView,
  onCreate,
  showCreateButton = true,
  className,
}: PostListProps) {
  const { posts, loading, error, publishPost } = usePosts(month, year, true);
  const [actioningId, setActioningId] = useState<number | null>(null);

  const filteredPosts = clientId
    ? posts.filter((post) => post.clientId === clientId)
    : posts;

  const handlePublish = async (postId: number) => {
    if (window.confirm('Are you sure you want to publish this post?')) {
      setActioningId(postId);
      const result = await publishPost(postId);
      setActioningId(null);
      
      if (result && onPublish) {
        onPublish(postId);
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

  if (error) {
    return (
      <Card className={cn('border-red-200 dark:border-red-800', className)}>
        <CardContent className="pt-6">
          <p className="text-red-600 dark:text-red-400">Error loading posts: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>
          Posts
          {month && year && (
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              {format(new Date(year, month - 1), 'MMMM yyyy')}
            </span>
          )}
        </CardTitle>
        {showCreateButton && (
          <Button onClick={onCreate} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {loading && filteredPosts.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No posts found. Create your first post to get started.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Network</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.postId}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.client?.name || 'N/A'}</TableCell>
                  <TableCell>
                    {post.socialNetwork && (
                      <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {getSocialNetworkName(post.socialNetwork.network)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{getPostTypeName(post.postType)}</TableCell>
                  <TableCell>
                    {format(new Date(post.scheduleDate), 'MMM d, yyyy HH:mm')}
                  </TableCell>
                  <TableCell>
                    <span className={cn('inline-flex items-center px-2 py-1 text-xs rounded-full', getStatusColor(post.status))}>
                      {getPostStatusName(post.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onView?.(post)}
                        disabled={actioningId === post.postId}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit?.(post)}
                        disabled={actioningId === post.postId}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      {post.status !== PostStatusEnum.Posted && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePublish(post.postId)}
                          disabled={actioningId === post.postId}
                        >
                          <Send className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="sr-only">Publish</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
