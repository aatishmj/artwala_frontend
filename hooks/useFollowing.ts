import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import type { UserProfile } from './useUserProfile';

export const useFollowing = () => {
  const [following, setFollowing] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFollowing = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get<UserProfile[]>('/api/following/');
      setFollowing(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch following list');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFollowing();
  }, [fetchFollowing]);

  return {
    following,
    loading,
    error,
    refetch: fetchFollowing,
  };
};
