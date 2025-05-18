import { useState, useEffect } from 'react';
import { Theme } from '@/lib/airtable.types';
import { createRecord, updateRecord, deleteRecord } from '@/lib/airtable.utils';
import { TABLES } from '@/lib/airtable.config';
import toast from 'react-hot-toast';

interface ThemeActionsProps {
  theme?: Theme;
  onSuccess: () => void;
  onError: (error: string) => void;
}

interface FormErrors {
  name?: string;
  // Add other fields as needed
}

export default function ThemeActions({ theme, onSuccess, onError }: ThemeActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Theme>>({});
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormData(
      theme || {
        name: '',
        description: '',
        stories: [],
        quotes: [],
        shifts: [],
        comments: [],
      }
    );
    setErrors({});
  }, [theme]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    // Add more validation rules here

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
    const loadingToastId = toast.loading(theme ? 'Updating theme...' : 'Creating theme...');

    try {
      let result;
      const successMessage = theme ? 'Theme updated successfully!' : 'Theme created successfully!';
      const failureMessage = theme ? 'Failed to update theme' : 'Failed to create theme';

      if (theme) {
        result = await updateRecord<Theme>(TABLES.THEMES, theme.id, formData);
      } else {
        result = await createRecord<Theme>(
          TABLES.THEMES,
          formData as Omit<Theme, 'id' | 'createdTime'>
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
    if (!theme) return;

    if (!confirm('Are you sure you want to delete this theme?')) return;

    setIsLoading(true);
    const loadingToastId = toast.loading('Deleting theme...');

    try {
      const result = await deleteRecord(TABLES.THEMES, theme.id);
      if (result.success) {
        toast.success('Theme deleted successfully!', { id: loadingToastId });
        onSuccess();
      } else {
        const errorMessage = result.error || 'Failed to delete theme';
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
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : ''}`}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {errors.name}
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
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : theme ? 'Update Theme' : 'Create Theme'}
          </button>
          {theme && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? 'Deleting...' : 'Delete Theme'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
