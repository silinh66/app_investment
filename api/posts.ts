import axiosClient from './request';
import { BaseResponse } from './types';

// Define interfaces for our data models
export interface Topic {
  topic_id: number;
  userId: number;
  title: string;
  description: string;
  image: string[];
  created_at: string;
  author: string;
  avatar: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  likes: {
    userId: number;
    name: string;
    avatar: string;
  }[];
}

export interface CreatePostData {
  title: string;
  content: string;
  image?: string[];
}

export interface FollowData {
  followingId: number;
}

export interface UserDetail {
  userID: number;
  email: string;
  phone_number: string;
  name: string;
  createdOn: string;
  avatar: string;
  isOnline: number;
  followerCount: number;
  status: 'pending' | 'accepted' | 'not';
}

export interface GetAllTopicsParams {
  page?: number;
  pageSize?: number;
  sortLike?: 'newest' | 'more-interaction';
}

// Response interfaces for the new API endpoints
interface GetAllTopicsResponse {
  success: boolean;
  topics: Topic[];
  totalTopics: number;
  currentPage: number;
  pageSize: number;
}

interface GetTopicsByUserResponse {
  success: boolean;
  topics: Topic[];
}

// Add interface for single topic response
interface GetTopicByIdResponse {
  success: boolean;
  topic: Topic;
}

export const postsApi = {
  // Create a new post
  createPost: async (postData: CreatePostData): Promise<BaseResponse<any>> => {
    try {
      const response = await axiosClient.post('/createTopic', postData);
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: response.data.message || 'Post created successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || error.message || 'Failed to create post'
      };
    }
  },

  // Get all topics with pagination and sorting
  getAllTopics: async (params?: GetAllTopicsParams): Promise<BaseResponse<{topics: Topic[], totalTopics: number, currentPage: number, pageSize: number}>> => {
    try {
      const response = await axiosClient.get<GetAllTopicsResponse>('/getTopicsAll', { params });
      
      // Transform the response to match our expected format
      return {
        data: {
          topics: response.data.topics,
          totalTopics: response.data.totalTopics,
          currentPage: response.data.currentPage,
          pageSize: response.data.pageSize
        },
        status: response.status,
        error: false,
        message: 'Topics retrieved successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || error.message || 'Failed to retrieve topics'
      };
    }
  },

  // Get topics by user ID
  getTopicsByUser: async (userId: number): Promise<BaseResponse<Topic[]>> => {
    try {
      const response = await axiosClient.get<GetTopicsByUserResponse>(`/getTopicsByUser/${userId}`);
      
      // Transform the response to match our expected format
      return {
        data: response.data.topics,
        status: response.status,
        error: false,
        message: 'User topics retrieved successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || error.message || 'Failed to retrieve user topics'
      };
    }
  },

  // Get a single topic by ID
  getTopicById: async (topicId: number): Promise<BaseResponse<Topic>> => {
    try {
      // Since there's no specific endpoint for getting a single topic,
      // we'll fetch all topics and filter for the one we need
      // In a real implementation, you would have a specific endpoint like /getTopicById/:id
      const response = await axiosClient.get<GetAllTopicsResponse>('/getTopicsAll');
      
      const topic = response.data.topics.find(t => t.topic_id === topicId);
      
      if (!topic) {
        throw {
          data: null,
          status: 404,
          error: true,
          message: 'Topic not found'
        };
      }
      
      return {
        data: topic,
        status: response.status,
        error: false,
        message: 'Topic retrieved successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || error.message || 'Failed to retrieve topic'
      };
    }
  },

  // Record a post view
  recordPostView: async (postId: number): Promise<BaseResponse<any>> => {
    try {
      const response = await axiosClient.post(`/topics/${postId}/view`);
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: response.data.message || 'View recorded successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || error.message || 'Failed to record view'
      };
    }
  },

  // Follow a user
  followUser: async (followingId: number): Promise<BaseResponse<any>> => {
    try {
      const response = await axiosClient.post('/followUser', { followingId });
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: response.data.message || 'User followed successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || error.message || 'Failed to follow user'
      };
    }
  },

  // Unfollow a user
  unfollowUser: async (followingId: number): Promise<BaseResponse<any>> => {
    try {
      const response = await axiosClient.post('/unfollowUser', { followingId });
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: response.data.message || 'User unfollowed successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || error.message || 'Failed to unfollow user'
      };
    }
  },

  // Get users that current user is following
  getFollowing: async (): Promise<BaseResponse<any[]>> => {
    try {
      const response = await axiosClient.get('/getFollowing');
      return {
        data: response.data.following,
        status: response.status,
        error: false,
        message: 'Following list retrieved successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || error.message || 'Failed to retrieve following list'
      };
    }
  },

  // Get users that are following current user
  getFollowers: async (): Promise<BaseResponse<any[]>> => {
    try {
      const response = await axiosClient.get('/getFollowers');
      return {
        data: response.data.followers,
        status: response.status,
        error: false,
        message: 'Followers list retrieved successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || error.message || 'Failed to retrieve followers list'
      };
    }
  },

  // Get user detail with relationship status
  getUserDetail: async (userId: number): Promise<BaseResponse<UserDetail>> => {
    try {
      const response = await axiosClient.get(`/getUserDetail/${userId}`);
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: 'User detail retrieved successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || error.message || 'Failed to retrieve user detail'
      };
    }
  }
};