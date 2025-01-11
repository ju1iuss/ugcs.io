export interface WebhookPayload {
  script: string
  styleId: string
  avatarId: string
  userId: string
}

export interface WebhookResponse {
  success: boolean
  message: string
  videoId?: string
} 