import { useMemo } from 'react';
import { usePosts } from '../hooks/usePosts';
import type { PostInfo } from '../types/bazzuca';
import { PostStatusEnum } from '../types/bazzuca';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '../utils/cn';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

export interface PostCalendarProps {
  month: number;
  year: number;
  clientId?: number;
  onPostClick?: (post: PostInfo) => void;
  className?: string;
}

export function PostCalendar({
  month,
  year,
  clientId,
  onPostClick,
  className,
}: PostCalendarProps) {
  const { posts, loading, error } = usePosts(month, year, true);

  const filteredPosts = useMemo(() => {
    return clientId
      ? posts.filter((post) => post.clientId === clientId)
      : posts;
  }, [posts, clientId]);

  const calendarDays = useMemo(() => {
    const date = new Date(year, month - 1, 1);
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  }, [month, year]);

  const getPostsForDay = (day: Date) => {
    return filteredPosts.filter((post) =>
      isSameDay(new Date(post.scheduleDate), day)
    );
  };

  const getStatusColor = (status: PostStatusEnum) => {
    switch (status) {
      case PostStatusEnum.Draft:
        return 'bg-gray-400';
      case PostStatusEnum.Scheduled:
        return 'bg-blue-500';
      case PostStatusEnum.ScheduledOnNetwork:
        return 'bg-purple-500';
      case PostStatusEnum.Posted:
        return 'bg-green-500';
      case PostStatusEnum.Canceled:
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  if (error) {
    return (
      <Card className={cn('border-red-200 dark:border-red-800', className)}>
        <CardContent className="pt-6">
          <p className="text-red-600 dark:text-red-400">Error loading calendar: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{format(new Date(year, month - 1), 'MMMM yyyy')}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Loading calendar...</p>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before the start of the month */}
              {Array.from({ length: calendarDays[0]?.getDay() || 0 }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {/* Calendar days */}
              {calendarDays.map((day) => {
                const dayPosts = getPostsForDay(day);
                const isToday = isSameDay(day, new Date());

                return (
                  <div
                    key={day.toISOString()}
                    className={cn(
                      'aspect-square border rounded-md p-1 overflow-hidden',
                      isToday
                        ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700',
                      'hover:border-blue-300 dark:hover:border-blue-600 transition-colors'
                    )}
                  >
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {format(day, 'd')}
                    </div>
                    <div className="space-y-1">
                      {dayPosts.slice(0, 3).map((post) => (
                        <button
                          key={post.postId}
                          onClick={() => onPostClick?.(post)}
                          className={cn(
                            'w-full text-left px-1 py-0.5 rounded text-xs truncate',
                            getStatusColor(post.status),
                            'text-white hover:opacity-80 transition-opacity'
                          )}
                          title={post.title}
                        >
                          {post.title}
                        </button>
                      ))}
                      {dayPosts.length > 3 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 px-1">
                          +{dayPosts.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Draft</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Scheduled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Scheduled on Network</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Posted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Canceled</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
