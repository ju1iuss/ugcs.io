import { NextResponse } from 'next/server';
import axios from 'axios';

const ALTAN_API_KEY = "f11d02464ceb157a48b69f8ca6c9600d18b5da83c73a194c12fb0472f4fe4abc";
const ALTAN_TABLE_ID = "e3ed7fa2-19b8-48e5-a51c-6309cd24b0ac";

export async function POST() {
  try {
    const url = 'https://api.altan.ai/tables/table/' + ALTAN_TABLE_ID + '/record/query';
    
    const requestBody = {
      filters: [],
      sort: [
        { field: "created_time", direction: "desc" }
      ],
      fields: ["video_url", "user_id", "creation_time"],
      limit: 20,
      page_token: null
    };

    console.log('Making request to:', url);
    console.log('With body:', requestBody);

    const response = await axios.post(url, requestBody, {
      headers: {
        'X-Altan-Key': ALTAN_API_KEY,
        'Content-Type': 'application/json',
      }
    });

    return NextResponse.json(response.data);

  } catch (error) {
    console.error('Error in community-videos API route:', error);
    
    if (axios.isAxiosError(error)) {
      console.error('Altan API error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      
      return NextResponse.json(
        { error: error.response?.data || error.message },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 