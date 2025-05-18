import { useState, useEffect } from 'react';
import { Media } from '@/lib/airtable.types';
import { createRecord, updateRecord, deleteRecord } from '@/lib/airtable.utils';
import { TABLES } from '@/lib/airtable.config';
import toast from 'react-hot-toast';

interface MediaActionsProps {
  media?: Media;
  onSuccess: () => void;
  onError: (error: string) => void;
}

// Define error state structure
interface FormErrors {
  title?: string;
  type?: string;
  url?: string;
  // Add other fields as needed
}

export default function MediaActions({ media, onSuccess, onError }: MediaActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Media>>({});
  const [errors, setErrors] = useState<FormErrors>({}); // State for errors

  // Initialize form data when media prop changes or on initial load
  useEffect(() => {
    setFormData(
      media || {
        title: '',
        description: '',
        type: '',
        url: '',
        storyteller: '',
        stories: [],
        quotes: [],
        shifts: [],
        comments: [],
      }
    );
    setErrors({}); // Clear errors on load/prop change
  }, [media]);

  // --- Validation Function ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.type) {
      newErrors.type = 'Type is required';
    }
    if (!formData.url?.trim()) {
      newErrors.url = 'URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.url)) {
      newErrors.url = 'URL must be a valid URL (e.g., https://example.com)';
    }
    // Add more validation rules here

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // --- Handle Input Change ---
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error for this field when user interacts
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
    const loadingToastId = toast.loading(media ? 'Updating media...' : 'Creating media...');

    try {
      let result;
      const successMessage = media ? 'Media updated successfully!' : 'Media created successfully!';
      const failureMessage = media ? 'Failed to update media' : 'Failed to create media';

      if (media) {
        result = await updateRecord<Media>(TABLES.MEDIA, media.id, formData);
      } else {
        result = await createRecord<Media>(
          TABLES.MEDIA,
          formData as Omit<Media, 'id' | 'createdTime'>
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
    if (!media) return;

    if (!confirm('Are you sure you want to delete this media?')) return;

    setIsLoading(true);
    const loadingToastId = toast.loading('Deleting media...');

    try {
      const result = await deleteRecord(TABLES.MEDIA, media.id);
      if (result.success) {
        toast.success('Media deleted successfully!', { id: loadingToastId });
        onSuccess();
      } else {
        const errorMessage = result.error || 'Failed to delete media';
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
            onChange={handleInputChange}
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            value={formData.type || ''}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.type ? 'border-red-500' : ''}`}
            aria-describedby={errors.type ? 'type-error' : undefined}
          >
            <option value="">Select a type</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="document">Document</option>
          </select>
          {errors.type && (
            <p id="type-error" className="mt-1 text-sm text-red-600">
              {errors.type}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="url"
            value={formData.url || ''}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.url ? 'border-red-500' : ''}`}
            aria-describedby={errors.url ? 'url-error' : undefined}
          />
          {errors.url && (
            <p id="url-error" className="mt-1 text-sm text-red-600">
              {errors.url}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="storyteller" className="block text-sm font-medium text-gray-700">
            Storyteller
          </label>
          <input
            type="text" // Consider changing this to a select/autocomplete later
            id="storyteller"
            value={formData.storyteller || ''}
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
            {isLoading ? 'Saving...' : media ? 'Update Media' : 'Create Media'}
          </button>
          {media && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? 'Deleting...' : 'Delete Media'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
