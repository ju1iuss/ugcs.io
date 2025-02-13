export interface Video {
  id: number;
  created_time: string;
  last_modified_by: string;
  last_modified_time: string;
  video_url: string | null;
  status: string;
  thumbnail: string | null;
  rating: string | null;
  correlationId?: string;
  script?: string;
  avatar_id?: string;
  style_id?: string;
}

export interface ApiResponse {
  '[$vars]'?: any;
  '[2]'?: {
    videos: Video[];
    credits: string;
  };
  videos?: Video[];
  credits?: string;
}

export interface VideoResponse {
  videos: Video[];
  credits: string;
  total: number;
} 