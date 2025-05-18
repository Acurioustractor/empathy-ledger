'use client';

import CommentActions from '@/components/comments/CommentActions';
import { useRouter } from 'next/navigation';

export default function NewCommentPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Add Comment</h1>
      <CommentActions
        onSuccess={() => {
          router.push('/comments');
        }}
        onError={error => {
          console.error('Error:', error);
        }}
      />
    </div>
  );
}
