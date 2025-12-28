import { useParams, useNavigate } from 'react-router-dom';
import { PostViewer } from 'bazzuca-react';
import type { PostInfo } from 'bazzuca-react';
import { ROUTES } from '../lib/constants';
import { toast } from 'sonner';

export default function PostViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleEdit = (post: PostInfo) => {
    navigate(ROUTES.POSTS_EDIT(post.postId));
  };

  const handlePublish = () => {
    toast.success('Post published successfully');
  };

  const handleBack = () => {
    navigate(ROUTES.POSTS);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PostViewer
        postId={id ? Number(id) : undefined}
        onEdit={handleEdit}
        onPublish={handlePublish}
        onBack={handleBack}
      />
    </div>
  );
}
