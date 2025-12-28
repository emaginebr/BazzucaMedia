import { useState } from 'react';
import { PostList, PostCalendar, useClients } from 'bazzuca-react';
import type { PostInfo } from 'bazzuca-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../lib/constants';
import { toast } from 'sonner';
import { Calendar, List } from 'lucide-react';

export default function PostsPage() {
  const navigate = useNavigate();
  const { clients } = useClients();
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedClientId, setSelectedClientId] = useState<number | undefined>(undefined);
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());

  const handleEdit = (post: PostInfo) => {
    navigate(ROUTES.POSTS_EDIT(post.postId));
  };

  const handleView = (post: PostInfo) => {
    navigate(ROUTES.POSTS_VIEW(post.postId));
  };

  const handlePublish = () => {
    toast.success('Post published successfully');
  };

  const handleCreate = () => {
    navigate(ROUTES.POSTS_NEW);
  };

  const handlePostClick = (post: PostInfo) => {
    navigate(ROUTES.POSTS_VIEW(post.postId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Posts</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage and schedule your social media posts
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-md ${
                viewMode === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Client:
          </label>
          <select
            value={selectedClientId || ''}
            onChange={(e) => setSelectedClientId(e.target.value ? Number(e.target.value) : undefined)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="">All Clients</option>
            {clients.map((client) => (
              <option key={client.clientId} value={client.clientId}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {viewMode === 'calendar' && (
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Month:
            </label>
            <input
              type="month"
              value={`${year}-${month.toString().padStart(2, '0')}`}
              onChange={(e) => {
                const [y, m] = e.target.value.split('-');
                setYear(Number(y));
                setMonth(Number(m));
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        )}
      </div>

      {viewMode === 'list' ? (
        <PostList
          month={month}
          year={year}
          clientId={selectedClientId}
          onEdit={handleEdit}
          onView={handleView}
          onPublish={handlePublish}
          onCreate={handleCreate}
          showCreateButton={true}
        />
      ) : (
        <PostCalendar
          month={month}
          year={year}
          clientId={selectedClientId}
          onPostClick={handlePostClick}
        />
      )}
    </div>
  );
}
