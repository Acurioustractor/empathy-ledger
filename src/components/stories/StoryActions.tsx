import { useState, useEffect } from 'react';
import { Story } from '@/lib/airtable.types';
import { createRecord, updateRecord, deleteRecord } from '@/lib/airtable.utils';
import { TABLES } from '@/lib/airtable.config';
import toast from 'react-hot-toast';

interface StoryActionsProps {
  story?: Story;
  onSuccess: () => void;
  onError: (error: string) => void;
}

// Define error state structure
interface FormErrors {
  title?: string;
  // Add other fields as needed
}

export default function StoryActions({ story, onSuccess, onError }: StoryActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Story>>({});
  const [errors, setErrors] = useState<FormErrors>({}); // State for errors

  // Initialize form data when story prop changes or on initial load
  useEffect(() => {
    setFormData(
      story || {
        title: '',
        summary: '',
        content: '',
        theme: '',
        storyteller: '',
        media: [],
        quotes: [],
        shifts: [],
        comments: [],
      }
    );
    setErrors({}); // Clear errors on load/prop change
  }, [story]);

  // --- Validation Function ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    // Add more validation rules here (e.g., for content, theme, etc.)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // --- Handle Input Change ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error for this field when user types
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // --- Validate before submitting ---
    if (!validateForm()) {
      toast.error('Please fix the errors in the form.');
      return;
    }
    // --- End Validation Check ---

    setIsLoading(true);
    const loadingToastId = toast.loading(story ? 'Updating story...' : 'Creating story...');

    try {
      let result;
      const successMessage = story ? 'Story updated successfully!' : 'Story created successfully!';
      const failureMessage = story ? 'Failed to update story' : 'Failed to create story';

      if (story) {
        result = await updateRecord<Story>(TABLES.STORIES, story.id, formData);
      } else {
        result = await createRecord<Story>(
          TABLES.STORIES,
          formData as Omit<Story, 'id' | 'createdTime'>
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
    if (!story) return;

    if (!confirm('Are you sure you want to delete this story?')) return;

    setIsLoading(true);
    const loadingToastId = toast.loading('Deleting story...');

    try {
      const result = await deleteRecord(TABLES.STORIES, story.id);
      if (result.success) {
        toast.success('Story deleted successfully!', { id: loadingToastId });
        onSuccess();
      } else {
        const errorMessage = result.error || 'Failed to delete story';
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
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={formData.title || ''}
            onChange={handleInputChange} // Use central handler
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.title ? 'border-red-500' : ''}`}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p id="title-error" className="mt-1 text-sm text-red-600">
              {errors.title}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
            Summary
          </label>
          <textarea
            id="summary"
            value={formData.summary || ''}
            onChange={handleInputChange} // Use central handler
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={2}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={formData.content || ''}
            onChange={handleInputChange} // Use central handler
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={6}
          />
        </div>
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
            Theme
          </label>
          <input
            type="text" // Consider changing this to a select/autocomplete later
            id="theme"
            value={formData.theme || ''}
            onChange={handleInputChange} // Use central handler
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="storyteller" className="block text-sm font-medium text-gray-700">
            Storyteller
          </label>
          <input
            type="text" // Consider changing this to a select/autocomplete later
            id="storyteller"
            value={typeof formData.storyteller === 'string' || Array.isArray(formData.storyteller) ? formData.storyteller : ''}
            onChange={handleInputChange} // Use central handler
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : story ? 'Update Story' : 'Create Story'}
          </button>
          {story && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? 'Deleting...' : 'Delete Story'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
