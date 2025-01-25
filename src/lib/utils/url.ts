export const appendUrlParams = (baseUrl: string, params: Record<string, string>) => {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
};

export const getStripeUrlWithParams = (baseUrl: string, email?: string, userId?: string, toltReferral?: string) => {
  const params: Record<string, string> = {};
  
  if (email) {
    params.prefilled_email = email;
  }
  
  if (userId) {
    params.client_reference_id = userId;
  }
  
  // Add tolt_referral if available from window object
  if (typeof window !== 'undefined' && (window as any).tolt_referral) {
    params.client_reference_id = (window as any).tolt_referral;
  }
  
  return appendUrlParams(baseUrl, params);
}; 