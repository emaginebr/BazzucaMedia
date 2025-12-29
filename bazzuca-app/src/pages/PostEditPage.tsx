import { useNavigate, useParams } from 'react-router-dom';
import { PostEditor } from 'bazzuca-react';
import { ROUTES } from '../lib/constants';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

export default function PostEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id, 10) : undefined;

  const handleSave = () => {
    toast.success('Post saved successfully');
    navigate(ROUTES.POSTS);
  };

  const handleCancel = () => {
    navigate(ROUTES.POSTS);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleCancel}
        className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Posts
      </button>

      <PostEditor
        postId={postId}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
