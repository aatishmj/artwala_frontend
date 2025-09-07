import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';

export interface ProfileCompletionField {
  field: string;
  label: string;
}

export interface ProfileCompletionData {
  percentage: number;
  completed_fields: ProfileCompletionField[];
  missing_fields: ProfileCompletionField[];
  total_fields: number;
  completed_count: number;
}

export const useProfileCompletion = () => {
  const [completionData, setCompletionData] = useState<ProfileCompletionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompletion = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.getProfileCompletion();
      setCompletionData(response);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch profile completion');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompletion();
  }, [fetchCompletion]);

  return {
    completionData,
    loading,
    error,
    refetch: fetchCompletion,
  };
};
