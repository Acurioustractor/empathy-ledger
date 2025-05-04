import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface StoryCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  createdAt: string;
  engagement?: {
    views: number;
    likes: number;
    comments: number;
  };
}

const StoryCard = ({
  id,
  title,
  excerpt,
  author,
  tags = [],
  createdAt,
  engagement,
}: StoryCardProps) => {
  return (
    <Card variant="elevated" className="hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 font-medium">
                {author.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{author.name}</p>
            <p className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          <Link href={`/stories/${id}`} className="hover:text-primary-600">
            {title}
          </Link>
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {engagement && (
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span>{engagement.views} views</span>
            <span>{engagement.likes} likes</span>
            <span>{engagement.comments} comments</span>
          </div>
        )}

        <Button variant="outline" size="sm" href={`/stories/${id}`}>
          Read Story
        </Button>
      </div>
    </Card>
  );
};

export default StoryCard; 