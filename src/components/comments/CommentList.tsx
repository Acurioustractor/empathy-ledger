import Link from 'next/link';
import { Comment } from '@/lib/airtable.types';

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No comments found.</p>
        <Link
          href="/comments/new"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Comment
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Link
          href="/comments/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Comment
        </Link>
      </div>
      <ul className="space-y-4">
        {comments.map(comment => (
          <li key={comment.id} className="border rounded p-4 hover:shadow">
            <Link
              href={`/comments/${comment.id}`}
              className="text-base font-medium hover:underline"
            >
              {comment.text || 'No Comment Text'}
            </Link>
            {comment.author && (
              <div className="text-sm text-gray-700 mt-1">Author: {comment.author}</div>
            )}
            {comment.relatedRecord && (
              <div className="text-sm text-gray-700 mt-1">Related: {comment.relatedRecord}</div>
            )}
            {comment.createdTime && (
              <div className="text-xs text-gray-500 mt-1">
                Created: {new Date(comment.createdTime).toLocaleString()}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
