import axiosClient from './request';
import { BaseResponse } from './types';

// Define interfaces for news data models
export interface NewsItem {
  id?: string;
  title: string;
  description: string;
  image: string;
  type: string;
  time: string;
  url?: string;
  author?: string;
}

export interface NewsResponse {
  data: NewsItem[];
  status: number;
  message: string;
}

export const newsApi = {
  // Get all news
  getAllNews: async (): Promise<BaseResponse<NewsItem[]>> => {
    try {
      const response = await axiosClient.get<NewsResponse>('/news-all');
      return {
        data: response.data.data,
        status: response.status,
        error: false,
        message: response.data.message || 'News retrieved successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || error.message || 'Failed to retrieve news'
      };
    }
  },

  // Get news by type
  getNewsByType: async (type: string): Promise<BaseResponse<NewsItem[]>> => {
    try {
      const response = await axiosClient.get<NewsResponse>(`/news-by-type/${encodeURIComponent(type)}`);
      return {
        data: response.data.data,
        status: response.status,
        error: false,
        message: response.data.message || 'News retrieved successfully'
      };
    } catch (error: any) {
      throw {
        data: null,
        status: error.response?.status || 500,
        error: true,
        message: error.response?.data?.message || error.message || 'Failed to retrieve news by type'
      };
    }
  }
};