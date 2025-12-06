export interface AuthLogin {
  identifier: string;
  password: string;
}

export interface AuthRegister {
  email: string;
  name: string;
  password: string;
  phone_number: string;
}

export interface AuthResponse {
  token: string;
  message: string;
  user?: {
    id: number;
    email: string;
    name: string;
  };
}

export interface BaseResponse<T> {
  data: T;
  status: number;
  error: boolean;
  message: string;
}

// User info from backend
export interface UserInfo {
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

// Topic interface
export interface Topic {
  topic_id: number;
  userId: number;
  title: string;
  content: string;
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

// User detail with relationship status
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