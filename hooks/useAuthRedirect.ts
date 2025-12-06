import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';

export const useAuthRedirect = () => {
  const { isAuthenticated, loading } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!loading && !checked) {
      setChecked(true);
      // Removed automatic redirect to login
      // Authentication checks should be handled per-component basis
    }
  }, [isAuthenticated, loading, checked]);

  return { isAuthenticated, loading };
};