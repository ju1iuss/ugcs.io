import { NextResponse } from 'next/server'
import { processAvatarConfig } from '@/lib/avatar-processing'
import { auth } from "@clerk/nextjs/server"

export async function POST(request: Request) {
  const { userId } = await auth()
  
  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }

  try {
    const formData = await request.formData()
    const responseData = await processAvatarConfig(formData)

    return NextResponse.json({
      success: true,
      message: 'Image processed successfully',
      data: responseData
    })
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
} 