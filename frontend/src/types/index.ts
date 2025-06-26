export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: PhotoSrc;
}

export interface PhotoSrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  tiny: string;
  portrait: string;
  landscape: string;
  square: string;
}

export interface SearchResult {
  page: number;
  per_page: number;
  total_results: number;
  next_page: string;
  photos: Photo[];
}

export interface CuratedResult {
  page: number;
  per_page: number;
  next_page: string;
  photos: Photo[];
}

export interface Video {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  full_res: string;
  duration: number;
  video_files: VideoFile[];
  video_pictures: VideoPicture[];
}

export interface VideoFile {
  id: number;
  quality: string;
  file_type: string;
  link: string;
  height: number;
  width: number;
}

export interface VideoPicture {
  id: number;
  picture: string;
  nr: number;
}

export interface VideoSearchResult {
  page: number;
  per_page: number;
  total_results: number;
  next_page: string;
  videos: Video[];
}

export interface PopularVideos {
  page: number;
  per_page: number;
  url: string;
  total_results: number;
  videos: Video[];
}

export interface ApiInfo {
  remaining_requests: number;
  message: string;
}

export interface HealthStatus {
  status: string;
} 