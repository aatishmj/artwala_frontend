import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';

export interface UserStats {
  user_id: number;
  username: string;
  full_name: string;
  user_type: 'artist' | 'user';
  bio: string;
  location: string;
  profile_image: string;
  date_joined: string;
  last_login: string;
  profile_completion: number;
  stats: {
    // Artist stats
    artworks_count?: number;
    followers_count?: number;
    total_likes_received?: number;
    total_revenue?: number;
    // User stats
    following_count?: number;
    likes_given?: number;
    saved_artworks?: number;
    orders_count?: number;
  };
}

export const useUserStats = (userId?: number) => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const endpoint = userId ? `/api/user/${userId}/stats/` : '/api/user/stats/';
      const response = await apiClient.get<UserStats>(endpoint);
      setStats(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch user statistics');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};

export const useProfileCompletion = () => {
  const { stats, loading, error, refetch } = useUserStats();
  
  return {
    profileCompletion: stats?.profile_completion || 0,
    loading,
    error,
    refetch,
  };
};
