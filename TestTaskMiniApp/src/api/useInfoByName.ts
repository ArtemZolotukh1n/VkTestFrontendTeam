import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { GetPersonInfoReq, GetPersonInfoRes } from '../types/PersonInfo'
import { baseApiRequest } from './baseApiRequest'
import axios from 'axios'

export const useGetInfoByName = (name: GetPersonInfoReq['name']) => {
  const options: UseQueryOptions<GetPersonInfoRes> = {
    queryKey: ['person_info', name],
    enabled: !!name,
    queryFn: ({ signal }) => {
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()

      signal.addEventListener('abort', () => {
        source.cancel('Query was cancelled by TanStack Query')
      })
      return baseApiRequest({
        url: 'https://api.agify.io',
        urlParams: { name },
        cancelToken: source.token,
      })
    },
  }

  return useQuery(options)
}
