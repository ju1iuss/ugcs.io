export interface Video {
  id: number;
  video_url: string | null;
  status: string | null;
  thumbnail: string | null;
  created_time: string;
  last_modified_time: string;
  last_modified_by: string;
  rating: 'good' | 'bad' | null;
}

export interface VideoResponse {
  total: number;
  records: any[];
  credits: string;
} 