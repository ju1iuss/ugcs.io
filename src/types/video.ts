export interface Video {
  id: number;
  video_url: string | null;
  status: string;
  thumbnail: string | null;
  created_time: string;
  last_modified_time: string;
  last_modified_by: string;
  rating: 'good' | 'bad' | null;
  correlationId?: string;
}

export interface VideoResponse {
  total: number;
  records: any[];
  credits: string;
} 