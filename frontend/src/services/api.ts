import axios from 'axios';
import {
  SearchResult,
  CuratedResult,
  Photo,
  VideoSearchResult,
  PopularVideos,
  Video,
  ApiInfo,
  HealthStatus,
} from '../types';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const photoApi = {
  searchPhotos: async (query: string, page: number = 1, perPage: number = 10): Promise<SearchResult> => {
    const response = await api.get(`/photos/search`, {
      params: { query, page, per_page: perPage },
    });
    return response.data;
  },

  getCuratedPhotos: async (page: number = 1, perPage: number = 10): Promise<CuratedResult> => {
    const response = await api.get(`/photos/curated`, {
      params: { page, per_page: perPage },
    });
    return response.data;
  },

  getPhoto: async (id: number): Promise<Photo> => {
    const response = await api.get(`/photos/${id}`);
    return response.data;
  },

  getRandomPhoto: async (): Promise<Photo> => {
    const response = await api.get('/photos/random');
    return response.data;
  },
};

export const videoApi = {
  searchVideos: async (query: string, page: number = 1, perPage: number = 10): Promise<VideoSearchResult> => {
    const response = await api.get(`/videos/search`, {
      params: { query, page, per_page: perPage },
    });
    return response.data;
  },

  getPopularVideos: async (page: number = 1, perPage: number = 10): Promise<PopularVideos> => {
    const response = await api.get(`/videos/popular`, {
      params: { page, per_page: perPage },
    });
    return response.data;
  },

  getRandomVideo: async (): Promise<Video> => {
    const response = await api.get('/videos/random');
    return response.data;
  },
};

export const utilityApi = {
  getApiInfo: async (): Promise<ApiInfo> => {
    const response = await api.get('/info');
    return response.data;
  },

  getHealthStatus: async (): Promise<HealthStatus> => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api; 