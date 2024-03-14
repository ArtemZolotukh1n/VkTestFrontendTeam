import axios from 'axios'
import { API_URL } from '../config/constats'

interface BaseApiRequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: object
}

export async function baseApiRequest<T>({
  url,
  method = 'GET',
  data,
}: BaseApiRequestOptions): Promise<T> {
  const apiUrl = `${API_URL}${url}`
  try {
    const response = await axios({
      method,
      url: apiUrl,
      data,
    })

    return response.data
  } catch (error) {
    throw new Error(`Request failed: ${error}`)
  }
}
