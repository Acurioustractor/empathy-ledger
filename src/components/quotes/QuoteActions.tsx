import { useState, useEffect } from 'react';
import { Quote } from '@/lib/airtable.types';
import { createRecord, updateRecord, deleteRecord } from '@/lib/airtable.utils';
import { TABLES } from '@/lib/airtable.config';
import toast from 'react-hot-toast';

interface QuoteActionsProps {
  quote?: Quote;
  onSuccess: () => void;
  onError: (error: string) => void;
}

// Define error state structure
interface FormErrors {
  text?: string;
  // Add other fields as needed
}

export default function QuoteActions({ quote, onSuccess, onError }: QuoteActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Quote>>({});
  const [errors, setErrors] = useState<FormErrors>({}); // State for errors

  // Initialize form data when quote prop changes or on initial load
  useEffect(() => {
    setFormData(
      quote || {
        text: '',
        author: '',
        theme: '',
        story: '',
        storyteller: '',
        comments: [],
      }
    );
    setErrors({}); // Clear errors on load/prop change
  }, [quote]);

  // --- Validation Function ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.text?.trim()) {
      newErrors.text = 'Quote text is required';
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
    const loadingToastId = toast.loading(quote ? 'Updating quote...' : 'Creating quote...');

    try {
      let result;
      const successMessage = quote ? 'Quote updated successfully!' : 'Quote created successfully!';
      const failureMessage = quote ? 'Failed to update quote' : 'Failed to create quote';

      if (quote) {
        result = await updateRecord<Quote>(TABLES.QUOTES, quote.id, formData);
      } else {
        result = await createRecord<Quote>(
          TABLES.QUOTES,
          formData as Omit<Quote, 'id' | 'createdTime'>
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
    if (!quote) return;

    if (!confirm('Are you sure you want to delete this quote?')) return;

    setIsLoading(true);
    const loadingToastId = toast.loading('Deleting quote...');

    try {
      const result = await deleteRecord(TABLES.QUOTES, quote.id);
      if (result.success) {
        toast.success('Quote deleted successfully!', { id: loadingToastId });
        onSuccess();
      } else {
        const errorMessage = result.error || 'Failed to delete quote';
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
            Quote Text <span className="text-red-500">*</span>
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
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
            Theme
          </label>
          <input
            type="text" // Consider changing this to a select/autocomplete later
            id="theme"
            value={formData.theme || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="story" className="block text-sm font-medium text-gray-700">
            Story
          </label>
          <input
            type="text" // Consider changing this to a select/autocomplete later
            id="story"
            value={formData.story || ''}
            onChange={handleInputChange}
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
            {isLoading ? 'Saving...' : quote ? 'Update Quote' : 'Create Quote'}
          </button>
          {quote && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? 'Deleting...' : 'Delete Quote'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
