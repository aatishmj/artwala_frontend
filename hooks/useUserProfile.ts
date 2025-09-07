import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  user_type: 'artist' | 'user';
  phone: string;
  profile_image: string;
  bio: string;
  location: string;
  website: string;
  instagram_handle: string;
  twitter_handle: string;
  is_verified: boolean;
  artist_since: string;
  date_joined: string;
  stats: {
    artworks_count?: number;
    followers_count?: number;
    total_likes_received?: number;
    total_revenue?: number;
    following_count?: number;
    likes_given?: number;
    saved_artworks?: number;
    orders_count?: number;
  };
}

export interface ProfileUpdateData {
  first_name?: string;
  last_name?: string;
  phone?: string;
  bio?: string;
  location?: string;
  website?: string;
  instagram_handle?: string;
  twitter_handle?: string;
}

export const useUserProfile = (userId?: number) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const endpoint = userId ? `/api/profile/${userId}/` : '/api/profile/';
      const response = await apiClient.get<UserProfile>(endpoint);
      setProfile(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateProfile = async (data: ProfileUpdateData) => {
    try {
      setError(null);
      const response = await apiClient.patch<UserProfile>('/api/profile/update/', data);
      // Immediately update local state with new data
      setProfile(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update profile');
      throw err;
    }
  };

  const uploadProfileImage = async (imageFile: File) => {
    try {
      setError(null);
      const formData = new FormData();
      formData.append('profile_image', imageFile);
      
      const response = await apiClient.post<UserProfile>('/api/profile/image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Immediately update local state with new data
      setProfile(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to upload image');
      throw err;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    uploadProfileImage,
    refetch: fetchProfile,
  };
};
