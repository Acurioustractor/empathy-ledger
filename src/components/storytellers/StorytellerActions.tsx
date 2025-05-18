import { useState, useEffect } from 'react';
import { Storyteller } from '@/lib/airtable.types';
import { createRecord, updateRecord, deleteRecord } from '@/lib/airtable.utils';
import { TABLES } from '@/lib/airtable.config';
import toast from 'react-hot-toast';

interface StorytellerActionsProps {
  storyteller?: Storyteller;
  onSuccess: () => void;
  onError: (error: string) => void;
}

interface FormErrors {
  name?: string;
  website?: string;
  // Add other fields as needed
}

export default function StorytellerActions({
  storyteller,
  onSuccess,
  onError,
}: StorytellerActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Storyteller>>({});
  const [errors, setErrors] = useState<FormErrors>({}); // State for errors

  // Initialize form data when storyteller prop changes or on initial load
  useEffect(() => {
    setFormData(
      storyteller || {
        name: '',
        bio: '',
        location: '',
        website: '',
        stories: [],
        media: [],
        quotes: [],
        shifts: [],
        comments: [],
      }
    );
    setErrors({}); // Clear errors on load/prop change
  }, [storyteller]);

  // --- Validation Function ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Website must be a valid URL (e.g., https://example.com)';
    }
    // Add more validation rules here

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
    const loadingToastId = toast.loading(
      storyteller ? 'Updating storyteller...' : 'Creating storyteller...'
    );

    try {
      let result;
      const successMessage = storyteller
        ? 'Storyteller updated successfully!'
        : 'Storyteller created successfully!';
      const failureMessage = storyteller
        ? 'Failed to update storyteller'
        : 'Failed to create storyteller';

      if (storyteller) {
        result = await updateRecord<Storyteller>(TABLES.STORYTELLERS, storyteller.id, formData);
      } else {
        result = await createRecord<Storyteller>(
          TABLES.STORYTELLERS,
          formData as Omit<Storyteller, 'id' | 'createdTime'>
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
    if (!storyteller) return;

    if (!confirm('Are you sure you want to delete this storyteller?')) return;

    setIsLoading(true);
    const loadingToastId = toast.loading('Deleting storyteller...');

    try {
      const result = await deleteRecord(TABLES.STORYTELLERS, storyteller.id);
      if (result.success) {
        toast.success('Storyteller deleted successfully!', { id: loadingToastId });
        onSuccess();
      } else {
        const errorMessage = result.error || 'Failed to delete storyteller';
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
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name || ''}
            onChange={handleInputChange} // Use central handler
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : ''}`}
            aria-describedby={errors.name ? 'name-error' : undefined}
            // Removed HTML5 required, using custom validation
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            value={formData.bio || ''}
            onChange={handleInputChange} // Use central handler
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={formData.location || ''}
            onChange={handleInputChange} // Use central handler
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            type="url"
            id="website"
            value={formData.website || ''}
            onChange={handleInputChange} // Use central handler
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.website ? 'border-red-500' : ''}`}
            aria-describedby={errors.website ? 'website-error' : undefined}
          />
          {errors.website && (
            <p id="website-error" className="mt-1 text-sm text-red-600">
              {errors.website}
            </p>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : storyteller ? 'Update Storyteller' : 'Create Storyteller'}
          </button>
          {storyteller && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? 'Deleting...' : 'Delete Storyteller'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
