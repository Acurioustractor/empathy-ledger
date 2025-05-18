import { Comment } from '@/lib/airtable.types';

interface CommentDetailProps {
  comment: Comment;
}

export default function CommentDetail({ comment }: CommentDetailProps) {
  return (
    <div className="border rounded p-6 shadow">
      <h1 className="text-2xl font-bold mb-2">Comment</h1>
      {comment.comment && (
        <div className="mb-2">
          <span className="font-semibold">Text:</span> {comment.comment}
        </div>
      )}
      {comment.date && (
        <div className="mb-2">
          <span className="font-semibold">Date:</span> {comment.date}
        </div>
      )}
      {comment.resolvedStatus && (
        <div className="mb-2">
          <span className="font-semibold">Status:</span> {comment.resolvedStatus}
        </div>
      )}
      {comment.adminResponse && (
        <div className="mb-2">
          <span className="font-semibold">Admin Response:</span> {comment.adminResponse}
        </div>
      )}
      {/* Add more fields as needed */}
    </div>
  );
}
