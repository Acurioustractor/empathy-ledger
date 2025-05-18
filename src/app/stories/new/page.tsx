'use client';

import StoryActions from '@/components/stories/StoryActions';
import { useRouter } from 'next/navigation';

export default function NewStoryPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Share Your Story</h1>
      <StoryActions
        onSuccess={() => {
          router.push('/stories');
        }}
        onError={error => {
          console.error('Error:', error);
        }}
      />
    </div>
  );
}
