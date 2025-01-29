import { NextResponse } from 'next/server'
import { processAvatarConfig } from '@/lib/avatar-processing'
import { auth } from "@clerk/nextjs/server"

export async function POST(request: Request) {
  try {
    console.log('API route hit')
    
    const { userId } = await auth()
    console.log('User ID:', userId)
    
    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const formData = await request.formData()
    console.log('FormData received:', {
      hasImage: formData.has('image'),
      hasMask: formData.has('mask'),
      hasMetadata: formData.has('metadata'),
      imageSize: formData.get('image') instanceof File ? (formData.get('image') as File).size : 'not a file',
      maskSize: formData.get('mask') instanceof File ? (formData.get('mask') as File).size : 'not a file',
    })

    if (!formData.has('image') || !formData.has('mask') || !formData.has('metadata')) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields in form data'
        },
        { status: 400 }
      )
    }

    try {
      const responseData = await processAvatarConfig(formData)
      console.log('Process completed:', responseData)

      return NextResponse.json({
        success: true,
        message: 'Image processed successfully',
        data: responseData
      })
    } catch (processError) {
      console.error('Error in processAvatarConfig:', processError)
      return NextResponse.json(
        { 
          success: false, 
          message: processError instanceof Error ? processError.message : 'Error processing avatar config',
          error: processError
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Detailed error in API route:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        error: error
      },
      { status: 500 }
    )
  }
} 