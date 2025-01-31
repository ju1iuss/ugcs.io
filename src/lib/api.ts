import { VideoResponse } from '@/types/video';

export async function fetchUserVideos(userId: string): Promise<VideoResponse> {
  try {
    console.log('Making API request with userId:', userId);
    
    // Add timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 4000); // 4 second timeout
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
export async function fetchCommunityVideos() {
  try {
    console.log('Fetching community videos...');
    
    const response = await fetch('https://api.altan.ai/galaxia/hook/5t7GIU', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch community videos: ${response.status}`);
    }

    const data = await response.json();
    console.log('Raw response:', data);
    
    if (!data['[2]']?.output) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format');
    }

    // The output is already a string, no need to stringify it
    const videos = JSON.parse(data['[2]'].output);
    console.log('Parsed videos:', videos);
    
    const formattedVideos = videos.map((video: any) => ({
      video_url: video.video_url,
      user_id: `User ${video.user_id}`,
      creation_time: video.created_time 
        ? new Date(video.created_time).toLocaleDateString('de-DE')
        : 'Kürzlich'
    }));

    console.log('Formatted videos:', formattedVideos);
    return formattedVideos;

  } catch (error) {
    console.error('Detailed error in fetchCommunityVideos:', error);
    // Return some mock data for testing
    return [
      {
        video_url: "https://api.altan.ai/platform/media/3aa1c4a1-5875-4bb0-84b0-8dec1794fc5c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
        user_id: "User 14",
        creation_time: "Kürzlich"
      },
      {
        video_url: "https://api.altan.ai/platform/media/3aa1c4a1-5875-4bb0-84b0-8dec1794fc5c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
        user_id: "User 18",
        creation_time: "31.01.2025"
      }
    ];
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