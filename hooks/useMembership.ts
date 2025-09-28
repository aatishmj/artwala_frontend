// hooks/useMembership.ts
import { useState } from 'react';

export const useMembership = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  };

  const purchaseMembership = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      
      if (!token) {
        throw new Error('Please login to purchase membership');
      }

      // Backend route currently defined without trailing slash; keep consistent
      const response = await fetch('/api/membership/purchase', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      // Check for unauthorized response
      if (response.status === 401) {
        throw new Error('Session expired. Please login again.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Payment failed');
      }

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, purchaseMembership };
};