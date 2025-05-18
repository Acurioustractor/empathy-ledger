import { useState, useEffect } from 'react';
import { Comment } from '@/lib/airtable.types';
import { createRecord, updateRecord, deleteRecord } from '@/lib/airtable.utils';
import { TABLES } from '@/lib/airtable.config';
import toast from 'react-hot-toast';

interface CommentActionsProps {
  comment?: Comment;
  onSuccess: () => void;
  onError: (error: string) => void;
}

interface FormErrors {
  text?: string;
}

export default function CommentActions({ comment, onSuccess, onError }: CommentActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Comment>>({});
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormData(comment || ({ text: '', author: '', relatedRecord: '' } as Partial<Comment>));
    setErrors({});
  }, [comment]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.text?.trim()) {
      newErrors.text = 'Comment text is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    setIsLoading(true);
    const loadingToastId = toast.loading(comment ? 'Updating comment...' : 'Creating comment...');

    try {
      let result;
      const successMessage = comment
        ? 'Comment updated successfully!'
        : 'Comment created successfully!';
      const failureMessage = comment ? 'Failed to update comment' : 'Failed to create comment';

      if (comment) {
        result = await updateRecord<Comment>(TABLES.COMMENTS, comment.id, formData);
      } else {
        result = await createRecord<Comment>(
          TABLES.COMMENTS,
          formData as Omit<Comment, 'id' | 'createdTime'>
        );
      }

      if (result.success) {
        toast.success(successMessage, { id: loadingToastId });
        onSuccess();
      } else {
        const errorMessage = result.error || failureMessage;
        toast.error(errorMessage, { id: loadingToastId });
        onError(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage, { id: loadingToastId });
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!comment) return;

    if (!confirm('Are you sure you want to delete this comment?')) return;

    setIsLoading(true);
    const loadingToastId = toast.loading('Deleting comment...');

    try {
      const result = await deleteRecord(TABLES.COMMENTS, comment.id);
      if (result.success) {
        toast.success('Comment deleted successfully!', { id: loadingToastId });
        onSuccess();
      } else {
        const errorMessage = result.error || 'Failed to delete comment';
        toast.error(errorMessage, { id: loadingToastId });
        onError(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage, { id: loadingToastId });
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700">
            Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            id="text"
            value={formData.text || ''}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.text ? 'border-red-500' : ''}`}
            rows={3}
            aria-describedby={errors.text ? 'text-error' : undefined}
          />
          {errors.text && (
            <p id="text-error" className="mt-1 text-sm text-red-600">
              {errors.text}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={formData.author || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="relatedRecord" className="block text-sm font-medium text-gray-700">
            Related Record
          </label>
          <input
            type="text"
            id="relatedRecord"
            value={formData.relatedRecord || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : comment ? 'Update Comment' : 'Create Comment'}
          </button>
          {comment && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? 'Deleting...' : 'Delete Comment'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
