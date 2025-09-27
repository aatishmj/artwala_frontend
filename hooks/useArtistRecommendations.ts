import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';

interface ArtistRecommendation {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  profile_image?: string;
  bio?: string;
  location?: string;
  is_verified: boolean;
  follower_count?: number;
  date_joined: string;
}

interface ArtistRecommendationsData {
  trending_artists: ArtistRecommendation[];
  new_artists: ArtistRecommendation[];
  recommended_count: number;
}

export const useArtistRecommendations = () => {
  const [recommendations, setRecommendations] = useState<ArtistRecommendationsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getArtistRecommendations();
      setRecommendations(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return {
    recommendations,
    loading,
    error,
    refetch: fetchRecommendations,
  };
};
