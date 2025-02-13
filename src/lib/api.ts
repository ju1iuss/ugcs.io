import { VideoResponse, ApiResponse } from '@/types/video';

interface Video {
  video_url: string;
  user_id: string;
  creation_time: string;
  category?: string;
  title?: string;
}

const ALTAN_API_KEY = "f11d02464ceb157a48b69f8ca6c9600d18b5da83c73a194c12fb0472f4fe4abc";
const ALTAN_TABLE_ID = "e3ed7fa2-19b8-48e5-a51c-6309cd24b0ac";
const BASE_URL = "https://api.altan.ai";

export async function fetchUserVideos(userId: string): Promise<VideoResponse> {
  try {
    const response = await fetch(`https://api.altan.ai/galaxia/hook/kS4dIT`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      throw new Error(`Failed to fetch videos: ${response.status}`);
    }

    const data = await response.json();
    console.log('Raw API response:', data);
    
    // Handle both nested and flat response structures
    const videos = data['[2]']?.videos || data.videos || [];
    const credits = data['[2]']?.credits || data.credits || '0';
    console.log('Extracted videos:', videos);
    console.log('Extracted credits:', credits);
    
    return {
      videos,
      credits,
      total: videos.length
    };
  } catch (error) {
    console.error('Detailed error in fetchUserVideos:', error);
    return {
      videos: [],
      credits: '0',
      total: 0
    };
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

export async function notifyAvatarCreation(variantUrl: string, userId: string) {
  try {
    const response = await fetch('https://api.altan.ai/galaxia/hook/J0i5VB', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variantUrl,
        userId
      })
    })

    if (!response.ok) {
      throw new Error('Failed to notify avatar creation')
    }

    return true
  } catch (error) {
    console.error('Error notifying avatar creation:', error)
    return false
  }
}

// Add this function to handle background removal
export async function removeBackground(file: File): Promise<Blob> {
  const formData = new FormData()
  formData.append('image_file', file)
  formData.append('size', 'auto')

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': 'TXGokPbsWefV4e5UsWcA7q4w',
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to remove background')
  }

  return await response.blob()
}

// Update the fetchCommunityVideos function
export async function fetchCommunityVideos(): Promise<Video[]> {
  try {
    const url = `${BASE_URL}/table/${ALTAN_TABLE_ID}/record/query`;
    console.log('Attempting to fetch from URL:', url);
    
    const requestBody = {
      filters: [],
      sort: [
        { field: "created_time", direction: "desc" }
      ],
      fields: ["video_url", "user_id", "creation_time"],
      limit: 20,
      page_token: null
    };
    console.log('Request body:', requestBody);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ALTAN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Full response details:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: errorText
      });
      throw new Error(`API call failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    
    return data.records.map((record: any) => ({
      video_url: record.fields.video_url,
      user_id: record.fields.user_id,
      creation_time: record.fields.creation_time,
    }));

  } catch (error) {
    console.error('Error fetching videos from Altan:', error);
    throw error;
  }
}

export async function generateAIScript(productInfo: string, brandInfo: string, theme: string, length: string) {
  try {
    const response = await fetch('https://api.altan.ai/galaxia/hook/MEGvbm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productInfo,
        brandInfo,
        theme,
        length
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate script');
    }

    const data = await response.json();
    return data.script || '';
  } catch (error) {
    console.error('Error generating script:', error);
    throw error;
  }
}

export async function downloadVideoFile(url: string) {
  try {
    const response = await fetch('https://api.altan.ai/galaxia/hook/downloadVideo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      throw new Error('Failed to download video');
    }

    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error('Error downloading video:', error);
    throw error;
  }
} 