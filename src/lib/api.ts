import { VideoResponse } from '@/types/video';

export async function fetchUserVideos(userId: string): Promise<VideoResponse> {
  try {
    console.log('Making API request with userId:', userId);
    
    // Add timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 2000); // 2 second timeout
    });

    const fetchPromise = fetch(
      `https://api.altan.ai/galaxia/hook/kS4dIT`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      }
    );

    // Race between timeout and fetch
    const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;

    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      throw new Error(`Failed to fetch videos: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('Raw data:', data);
    
    if (!data) {
      return { total: 0, records: [], credits: "0" };
    }

    // Extract videos and credits from the response
    const videos = data['[2]']?.videos || data[2]?.videos || data?.videos || [];
    const credits = data['[2]']?.credits || data[2]?.credits || data?.credits || "0";
    
    // Return empty array if no videos found instead of throwing error
    const result = {
      total: videos?.length || 0,
      records: videos || [],
      credits: credits
    };

    console.log('Processed response:', result);
    return result;
    
  } catch (error) {
    console.error('Detailed error in fetchUserVideos:', error);
    // Return empty state instead of throwing
    return { total: 0, records: [], credits: "0" };
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

export async function deleteVideo(videoId: number): Promise<void> {
  try {
    const response = await fetch('https://api.altan.ai/galaxia/hook/TSIqS9', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete video: ${response.status}`);
    }

    await response.json(); // consume the response
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
} 