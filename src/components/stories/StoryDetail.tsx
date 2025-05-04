import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface StoryDetailProps {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
  engagement?: {
    views: number;
    likes: number;
    comments: number;
  };
  onLike?: () => void;
  onComment?: () => void;
}

const StoryDetail = ({
  id,
  title,
  content,
  author,
  tags = [],
  createdAt,
  updatedAt,
  engagement,
  onLike,
  onComment,
}: StoryDetailProps) => {
  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        
        <div className="flex items-center gap-4 mb-6">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 font-medium text-xl">
                {author.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{author.name}</p>
            <p className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString()}
              {updatedAt && ` (Updated ${new Date(updatedAt).toLocaleDateString()})`}
            </p>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium text-primary-600 bg-primary-50 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {engagement && (
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
            <span>{engagement.views} views</span>
            <button
              onClick={onLike}
              className="flex items-center gap-1 hover:text-primary-600"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {engagement.likes} likes
            </button>
            <button
              onClick={onComment}
              className="flex items-center gap-1 hover:text-primary-600"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {engagement.comments} comments
            </button>
          </div>
        )}
      </header>

      <Card className="mb-8">
        <div className="p-6 prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </Card>

      {author.bio && (
        <Card className="mb-8">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              About the Author
            </h3>
            <p className="text-gray-600">{author.bio}</p>
          </div>
        </Card>
      )}

      <div className="flex justify-center gap-4">
        <Button variant="primary" onClick={onLike}>
          Like Story
        </Button>
        <Button variant="outline" onClick={onComment}>
          Add Comment
        </Button>
      </div>
    </article>
  );
};

export default StoryDetail; 