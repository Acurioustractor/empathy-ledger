import { useState, useEffect } from 'react';
import { Shift } from '@/lib/airtable.types';
import { createRecord, updateRecord, deleteRecord } from '@/lib/airtable.utils';
import { TABLES } from '@/lib/airtable.config';
import toast from 'react-hot-toast';

interface ShiftActionsProps {
  shift?: Shift;
  onSuccess: () => void;
  onError: (error: string) => void;
}

// Define error state structure
interface FormErrors {
  name?: string;
  // Add other fields as needed
}

export default function ShiftActions({ shift, onSuccess, onError }: ShiftActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Shift>>({});
  const [errors, setErrors] = useState<FormErrors>({}); // State for errors

  // Initialize form data when shift prop changes or on initial load
  useEffect(() => {
    setFormData(
      shift || {
        name: '',
        date: '',
        storyteller: '',
        theme: '',
        comments: [],
      }
    );
    setErrors({}); // Clear errors on load/prop change
  }, [shift]);

  // --- Validation Function ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
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
    const loadingToastId = toast.loading(shift ? 'Updating shift...' : 'Creating shift...');

    try {
      let result;
      const successMessage = shift ? 'Shift updated successfully!' : 'Shift created successfully!';
      const failureMessage = shift ? 'Failed to update shift' : 'Failed to create shift';

      if (shift) {
        result = await updateRecord<Shift>(TABLES.SHIFTS, shift.id, formData);
      } else {
        result = await createRecord<Shift>(
          TABLES.SHIFTS,
          formData as Omit<Shift, 'id' | 'createdTime'>
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
    if (!shift) return;

    if (!confirm('Are you sure you want to delete this shift?')) return;

    setIsLoading(true);
    const loadingToastId = toast.loading('Deleting shift...');

    try {
      const result = await deleteRecord(TABLES.SHIFTS, shift.id);
      if (result.success) {
        toast.success('Shift deleted successfully!', { id: loadingToastId });
        onSuccess();
      } else {
        const errorMessage = result.error || 'Failed to delete shift';
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
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={formData.date || ''}
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
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : shift ? 'Update Shift' : 'Create Shift'}
          </button>
          {shift && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? 'Deleting...' : 'Delete Shift'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
