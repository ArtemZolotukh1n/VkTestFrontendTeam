import axios, { CancelToken } from 'axios'
import { ApiEndpoints, ApiMethods } from '../types'

interface BaseApiRequestOptions<T extends ApiEndpoints> {
  url: T
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: ApiMethods[T]['request']
  urlParams?: ApiMethods[T]['querystring']
  cancelToken?: CancelToken
}

export async function baseApiRequest<T extends ApiEndpoints>({
  url,
  method = 'GET',
  data,
  urlParams,
  cancelToken,
}: BaseApiRequestOptions<T>): Promise<ApiMethods[T]['response']> {
  const paramsWithoutUndefinedValues = urlParams
    ? Object.entries(urlParams).reduce((acc, [key, value]) => {
        if (value) {
          acc[key] = value as string
        }
        return acc
      }, {} as Record<string, string>)
    : {}

  const paramsToConcat = urlParams
    ? new URLSearchParams(paramsWithoutUndefinedValues).toString()
    : undefined

  let apiUrl = `${url}`
  if (paramsToConcat) {
    apiUrl += `?${paramsToConcat}`
  }

  try {
    const response = await axios({
      method,
      url: apiUrl,
      data,
      cancelToken,
    })

    return response.data
  } catch (error) {
    throw new Error(`Request failed: ${error}`)
  }
}
