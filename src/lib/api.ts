import { VideoResponse } from '@/types/video';

export async function fetchUserVideos(userId: string): Promise<VideoResponse> {
  try {
    console.log('Making API request with userId:', userId);
    
    const response = await fetch(
      `https://api.altan.ai/galaxia/hook/kS4dIT`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      }
    );

    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      throw new Error(`Failed to fetch videos: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('Raw data:', data);
    console.log('Keys in data:', Object.keys(data));
    console.log('Type of data:', typeof data);
    console.log('Is data array?', Array.isArray(data));
    
    if (!data) {
      throw new Error('No data received from API');
    }

    const videos = data['[2]']?.videos || data[2]?.videos || data?.videos;
    
    if (!videos) {
      console.error('Response structure:', data);
      throw new Error('Could not find videos in response');
    }

    if (!Array.isArray(videos)) {
      console.error('Videos is not an array:', typeof videos);
      throw new Error('Invalid videos format');
    }

    const result = {
      total: videos.length,
      records: videos
    };

    console.log('Processed response:', result);
    return result;
    
  } catch (error) {
    console.error('Detailed error in fetchUserVideos:', error);
    throw error;
  }
}

export async function updateVideoRating(videoId: number, rating: 'good' | 'bad') {
  try {
    const response = await fetch('https://api.altan.ai/galaxia/hook/f9dZXP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        videoId,
        rating,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update rating');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating rating:', error);
    throw error;
  }
} 