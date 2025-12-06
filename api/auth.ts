import axiosClient from './request';
import { AuthLogin, AuthRegister, AuthResponse, BaseResponse } from './types';
import { getDataStorage, setDataStorage, removeDataStorage, STORAGE_KEY } from '../utils/storage';

// Define the user info type based on the backend response
interface UserInfo {
  userID: number;
  email: string;
  phone_number: string;
  name: string;
  createdOn: string;
  avatar: string;
  isOnline: number;
  birthdate: string;
  tiktok_url: string;
  facebook_url: string;
  youtube_url: string;
  followerCount: number;
}

export const authApi = {
  login: async (params: AuthLogin): Promise<BaseResponse<AuthResponse>> => {
    try {
      // Use the actual API endpoint for login
      const response = await axiosClient.post<AuthResponse>('/login', params);
      
      // Store the token first
      if (response.data?.token) {
        await setDataStorage(STORAGE_KEY.ACCESS_TOKEN, response.data.token);
        
        // After successful login, get user info
        try {
          const userResponse = await axiosClient.get<UserInfo>('/getUserInfo');
          // Store all user info fields
          const userData = {
            id: userResponse.data.userID,
            email: userResponse.data.email,
            name: userResponse.data.name,
            phone_number: userResponse.data.phone_number,
            createdOn: userResponse.data.createdOn,
            avatar: userResponse.data.avatar,
            isOnline: userResponse.data.isOnline,
            birthdate: userResponse.data.birthdate,
            tiktok_url: userResponse.data.tiktok_url,
            facebook_url: userResponse.data.facebook_url,
            youtube_url: userResponse.data.youtube_url,
            followerCount: userResponse.data.followerCount
          };
          await setDataStorage(STORAGE_KEY.USER_DATA, userData);
        } catch (userError) {
          console.error('Error fetching user info:', userError);
          // If we can't get user info, at least store what we have from the login response
          if (response.data.user) {
            await setDataStorage(STORAGE_KEY.USER_DATA, response.data.user);
          }
        }
      }
      
      // Return the response in the expected BaseResponse format
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: response.data.message || 'Login successful'
      };
    } catch (error: any) {
      // Handle error and return in BaseResponse format
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || error.message || 'Login failed'
      };
    }
  },

  register: async (params: AuthRegister): Promise<BaseResponse<AuthResponse>> => {
    try {
      // Use the actual API endpoint
      const response = await axiosClient.post<AuthResponse>('/register', params);
      
      // Store token and user data if registration is successful
      if (response.data?.token) {
        await setDataStorage(STORAGE_KEY.ACCESS_TOKEN, response.data.token);
        // After registration, get user info
        try {
          const userResponse = await axiosClient.get<UserInfo>('/getUserInfo');
          // Store all user info fields
          const userData = {
            id: userResponse.data.userID,
            email: userResponse.data.email,
            name: userResponse.data.name,
            phone_number: userResponse.data.phone_number,
            createdOn: userResponse.data.createdOn,
            avatar: userResponse.data.avatar,
            isOnline: userResponse.data.isOnline,
            birthdate: userResponse.data.birthdate,
            tiktok_url: userResponse.data.tiktok_url,
            facebook_url: userResponse.data.facebook_url,
            youtube_url: userResponse.data.youtube_url,
            followerCount: userResponse.data.followerCount
          };
          await setDataStorage(STORAGE_KEY.USER_DATA, userData);
        } catch (userError) {
          console.error('Error fetching user info:', userError);
          // If we can't get user info, at least store what we have from the register response
          if (response.data.user) {
            await setDataStorage(STORAGE_KEY.USER_DATA, response.data.user);
          }
        }
      }
      
      // Return the response in the expected BaseResponse format
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: response.data.message || 'Registration successful'
      };
    } catch (error: any) {
      // Handle error and return in BaseResponse format
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || error.message || 'Registration failed'
      };
    }
  },

  logout: async (): Promise<void> => {
    try {
      // Call the logout endpoint
      await axiosClient.post('/logout');
    } catch (error) {
      console.log('Logout API error (continuing with local logout):', error);
    } finally {
      // Always clear local storage regardless of API result
      await removeDataStorage(STORAGE_KEY.ACCESS_TOKEN);
      await removeDataStorage(STORAGE_KEY.USER_DATA);
    }
  },
  
  getCurrentUser: async () => {
    try {
      const userData = await getDataStorage(STORAGE_KEY.USER_DATA);
      return userData;
    } catch (error) {
      return null;
    }
  },
  
  isAuthenticated: async () => {
    try {
      const token = await getDataStorage(STORAGE_KEY.ACCESS_TOKEN);
      return !!token;
    } catch (error) {
      return false;
    }
  },
  
  // New method to fetch user info
  fetchUserInfo: async (): Promise<UserInfo | null> => {
    try {
      const response = await axiosClient.get<UserInfo>('/getUserInfo');
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  },
  
  // New method to fetch user info by ID
  fetchUserInfoById: async (userId: number): Promise<UserInfo | null> => {
    try {
      const response = await axiosClient.get<UserInfo>(`/user-info?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user info by ID:', error);
      return null;
    }
  }
};
