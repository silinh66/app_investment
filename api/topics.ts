import axiosClient from './request';
import { BaseResponse } from './types';

// Topic interfaces
export interface TopicImage {
  url: string;
}

export interface CreateTopicParams {
  title: string;
  description: string;
  image: TopicImage[];
  symbol_name?: string;
  price?: string;
  userId: number;
  recommendation: string;
}

export interface Topic {
  topic_id: number;
  userId: number;
  title: string;
  description: string;
  image: TopicImage[] | string;
  symbol_name?: string;
  author: string;
  avatar: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  view_count: number;
  likes: Array<{
    userId: number;
    name: string;
    avatar: string;
  }>;
}

export interface Comment {
  comment_id: number;
  topic_id: number;
  userId: number;
  content: string;
  parent_id: number | null;
  created_at: string;
  author: string;
  avatar: string;
  like_count: number;
  likes: Array<{
    userId: number;
  }>;
  replies?: Comment[];
}

export const topicsApi = {
  // Create new topic
  createTopic: async (params: CreateTopicParams): Promise<BaseResponse<Topic>> => {
    try {
      const response = await axiosClient.post<Topic>('/createTopic', params);
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: 'Topic created successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || 'Failed to create topic'
      };
    }
  },

  // Get topics by symbol/company
  getTopicsBySymbol: async (symbol: string, page: number = 1, limit: number = 10, sort: string = 'newest'): Promise<BaseResponse<{ topics: Topic[] }>> => {
    try {
      const response = await axiosClient.get<{ topics: Topic[] }>(`/getTopics/${symbol}`, {
        params: { page, limit, sort }
      });
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: 'Topics retrieved successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || 'Failed to retrieve topics'
      };
    }
  },

  // Get topics by user
  getTopicsByUser: async (userId: number): Promise<BaseResponse<Topic[]>> => {
    try {
      const response = await axiosClient.get<Topic[]>(`/getTopicsByUser/${userId}`);
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: 'User topics retrieved successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || 'Failed to retrieve user topics'
      };
    }
  },

  // Like topic
  likeTopic: async (topicId: number): Promise<BaseResponse<any>> => {
    try {
      const response = await axiosClient.post(`/topics/${topicId}/like`);
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: 'Topic liked successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || 'Failed to like topic'
      };
    }
  },

  // Unlike topic
  unlikeTopic: async (topicId: number): Promise<BaseResponse<any>> => {
    try {
      const response = await axiosClient.post(`/topics/${topicId}/unlike`);
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: 'Topic unliked successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || 'Failed to unlike topic'
      };
    }
  },

  // Get comments for a topic
  getComments: async (topicId: number): Promise<BaseResponse<Comment[]>> => {
    try {
      const response = await axiosClient.get<Comment[]>(`/topics/${topicId}/comments`);
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: 'Comments retrieved successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || 'Failed to retrieve comments'
      };
    }
  },

  // Post comment
  postComment: async (topicId: number, content: string, parent_id?: number): Promise<BaseResponse<Comment>> => {
    try {
      const response = await axiosClient.post<Comment>(`/topics/${topicId}/comments`, {
        content,
        ...(parent_id && { parent_id })
      });
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: 'Comment posted successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || 'Failed to post comment'
      };
    }
  },

  // Like comment
  likeComment: async (topicId: number, commentId: number): Promise<BaseResponse<any>> => {
    try {
      const response = await axiosClient.post(`/comments/${topicId}/${commentId}/like`);
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: 'Comment liked successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || 'Failed to like comment'
      };
    }
  },

  // Unlike comment
  unlikeComment: async (topicId: number, commentId: number): Promise<BaseResponse<any>> => {
    try {
      const response = await axiosClient.post(`/comments/${topicId}/${commentId}/unlike`);
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: 'Comment unliked successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || 'Failed to unlike comment'
      };
    }
  },

  // View topic (increment view count)
  viewTopic: async (topicId: number): Promise<BaseResponse<any>> => {
    try {
      const response = await axiosClient.post(`/topics/${topicId}/view`);
      return {
        data: response.data,
        status: response.status,
        error: false,
        message: 'Topic viewed successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || 'Failed to record view'
      };
    }
  }
};
