import React, { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '../api/auth';
import { postsApi } from '../api/posts';
import { AuthLogin, AuthRegister, UserDetail } from '../api/types';

interface User {
  id: number;
  email: string;
  name: string;
  phone_number?: string;
  createdOn?: string;
  avatar?: string;
  isOnline?: number;
  birthdate?: string;
  tiktok_url?: string;
  facebook_url?: string;
  youtube_url?: string;
  followerCount?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  refreshAuthStatus: () => Promise<void>;
  followUser: (userId: number) => Promise<void>;
  unfollowUser: (userId: number) => Promise<void>;
  getFollowing: () => Promise<any[]>;
  getFollowers: () => Promise<any[]>;
  getUserDetail: (userId: number) => Promise<UserDetail | null>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  loading: false,
  refreshAuthStatus: async () => {},
  followUser: async () => {},
  unfollowUser: async () => {},
  getFollowing: async () => [],
  getFollowers: async () => [],
  getUserDetail: async () => null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already authenticated
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    if (authInitialized) return;
    
    try {
      const authStatus = await authApi.isAuthenticated();
      if (authStatus) {
        // If authenticated, fetch user info
        const currentUser = await authApi.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          // If we have a token but no user data, fetch it
          const userInfo = await authApi.fetchUserInfo();
          if (userInfo) {
            const userData = {
              id: userInfo.userID,
              email: userInfo.email,
              name: userInfo.name,
              phone_number: userInfo.phone_number,
              createdOn: userInfo.createdOn,
              avatar: userInfo.avatar,
              isOnline: userInfo.isOnline,
              birthdate: userInfo.birthdate,
              tiktok_url: userInfo.tiktok_url,
              facebook_url: userInfo.facebook_url,
              youtube_url: userInfo.youtube_url,
              followerCount: userInfo.followerCount
            };
            setUser(userData);
            setIsAuthenticated(true);
          }
        }
      }
      setAuthInitialized(true);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (identifier: string, password: string) => {
    try {
      setLoading(true);
      const response = await authApi.login({ identifier, password });
      // After successful login, fetch user info
      const userInfo = await authApi.fetchUserInfo();
      if (userInfo) {
        const userData = {
          id: userInfo.userID,
          email: userInfo.email,
          name: userInfo.name,
          phone_number: userInfo.phone_number,
          createdOn: userInfo.createdOn,
          avatar: userInfo.avatar,
          isOnline: userInfo.isOnline,
          birthdate: userInfo.birthdate,
          tiktok_url: userInfo.tiktok_url,
          facebook_url: userInfo.facebook_url,
          youtube_url: userInfo.youtube_url,
          followerCount: userInfo.followerCount
        };
        setUser(userData);
        setIsAuthenticated(true);
        setAuthInitialized(true);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, phone: string) => {
    try {
      setLoading(true);
      const response = await authApi.register({ name, email, password, phone_number: phone });
      // After successful registration, fetch user info
      const userInfo = await authApi.fetchUserInfo();
      if (userInfo) {
        const userData = {
          id: userInfo.userID,
          email: userInfo.email,
          name: userInfo.name,
          phone_number: userInfo.phone_number,
          createdOn: userInfo.createdOn,
          avatar: userInfo.avatar,
          isOnline: userInfo.isOnline,
          birthdate: userInfo.birthdate,
          tiktok_url: userInfo.tiktok_url,
          facebook_url: userInfo.facebook_url,
          youtube_url: userInfo.youtube_url,
          followerCount: userInfo.followerCount
        };
        setUser(userData);
        setIsAuthenticated(true);
        setAuthInitialized(true);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      setIsAuthenticated(false);
      setAuthInitialized(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Expose a method to manually refresh auth status
  const refreshAuthStatus = async () => {
    try {
      const authStatus = await authApi.isAuthenticated();
      if (authStatus) {
        // Fetch user info
        const userInfo = await authApi.fetchUserInfo();
        if (userInfo) {
          const userData = {
            id: userInfo.userID,
            email: userInfo.email,
            name: userInfo.name,
            phone_number: userInfo.phone_number,
            createdOn: userInfo.createdOn,
            avatar: userInfo.avatar,
            isOnline: userInfo.isOnline,
            birthdate: userInfo.birthdate,
            tiktok_url: userInfo.tiktok_url,
            facebook_url: userInfo.facebook_url,
            youtube_url: userInfo.youtube_url,
            followerCount: userInfo.followerCount
          };
          setUser(userData);
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setAuthInitialized(true);
    } catch (error) {
      console.error('Error refreshing auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  // Follow a user
  const followUser = async (userId: number) => {
    if (!isAuthenticated) {
      throw new Error('User not authenticated');
    }
    try {
      await postsApi.followUser(userId);
    } catch (error) {
      console.error('Error following user:', error);
      throw error;
    }
  };

  // Unfollow a user
  const unfollowUser = async (userId: number) => {
    if (!isAuthenticated) {
      throw new Error('User not authenticated');
    }
    try {
      await postsApi.unfollowUser(userId);
    } catch (error) {
      console.error('Error unfollowing user:', error);
      throw error;
    }
  };

  // Get users that current user is following
  const getFollowing = async () => {
    if (!isAuthenticated) {
      throw new Error('User not authenticated');
    }
    try {
      const response = await postsApi.getFollowing();
      return response.data;
    } catch (error) {
      console.error('Error getting following list:', error);
      throw error;
    }
  };

  // Get users that are following current user
  const getFollowers = async () => {
    if (!isAuthenticated) {
      throw new Error('User not authenticated');
    }
    try {
      const response = await postsApi.getFollowers();
      return response.data;
    } catch (error) {
      console.error('Error getting followers list:', error);
      throw error;
    }
  };

  // Get user detail with relationship status
  const getUserDetail = async (userId: number) => {
    try {
      const response = await postsApi.getUserDetail(userId);
      return response.data;
    } catch (error) {
      console.error('Error getting user detail:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        loading,
        refreshAuthStatus,
        followUser,
        unfollowUser,
        getFollowing,
        getFollowers,
        getUserDetail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};