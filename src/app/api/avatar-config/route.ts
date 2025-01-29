import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Get the form data from the request
    const formData = await request.formData()
    const imageFile = formData.get('image') as File
    const maskFile = formData.get('mask') as File
    const metadataStr = formData.get('metadata') as string
    const metadata = JSON.parse(metadataStr)

    // Validate the data
    if (!imageFile || !maskFile || !metadata) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Convert both files to base64
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer())
    const maskBuffer = Buffer.from(await maskFile.arrayBuffer())

    // Prepare the webhook payload
    const webhookPayload = {
      image: imageBuffer.toString('base64'),
      mask: maskBuffer.toString('base64'),
      metadata: metadata
    }

    // Send to the actual webhook
    const webhookResponse = await fetch('https://api.altan.ai/galaxia/hook/sz9XHK', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload)
    })

    // Don't try to parse JSON if the response isn't JSON
    const responseText = await webhookResponse.text()
    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch (e) {
      responseData = { message: responseText }
    }

    if (!webhookResponse.ok) {
      throw new Error(responseData.message || 'Webhook request failed')
    }

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