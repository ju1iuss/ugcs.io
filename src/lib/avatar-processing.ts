import { NextResponse } from 'next/server'

export async function processAvatarConfig(formData: FormData) {
  try {
    console.log('Starting processAvatarConfig')
    
    const imageFile = formData.get('image') as File
    const maskFile = formData.get('mask') as File
    const metadataStr = formData.get('metadata') as string
    
    console.log('Files received:', {
      hasImageFile: !!imageFile,
      hasMaskFile: !!maskFile,
      hasMetadata: !!metadataStr
    })

    const metadata = JSON.parse(metadataStr)
    console.log('Parsed metadata:', metadata)

    // Validate the data
    if (!imageFile || !maskFile || !metadata) {
      throw new Error('Missing required fields')
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

    console.log('Sending webhook request')
    // Send to the actual webhook
    const webhookResponse = await fetch('https://api.altan.ai/galaxia/hook/sz9XHK', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload)
    })

    // Parse response
    const responseText = await webhookResponse.text()
    console.log('Webhook response:', responseText)
    
    if (!webhookResponse.ok) {
      throw new Error(`Webhook failed: ${responseText}`)
    }

    const responseData = responseText ? JSON.parse(responseText) : null
    return responseData
  } catch (error) {
    console.error('Error in processAvatarConfig:', error)
    throw error
  }
} 