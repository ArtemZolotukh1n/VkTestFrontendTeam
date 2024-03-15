export const DOMAIN = 'someRealDomain'

export const API_URL =
  import.meta.env.VITE_NODE_ENV === 'production'
    ? `https://${DOMAIN}`
    : import.meta.env.VITE_API_URL || ''
