import dynamicAPI from '../dynamicAPI'
import { useMutation, useQueryClient, useQuery } from 'react-query'

const url = '/api/pregnancy-care/follow-up'

const queryKey = 'follow-up'

export default function useFollowUpsHook(props) {
  const { page = 1, q = '', limit = 25 } = props
  const queryClient = useQueryClient()

  const getFollowUps = useQuery(
    queryKey,
    async () =>
      await dynamicAPI('get', `${url}?page=${page}&q=${q}&limit=${limit}`, {}),
    { retry: 0 }
  )

  const postFollowUp = useMutation(
    async (obj) => await dynamicAPI('post', url, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  return {
    postFollowUp,
    getFollowUps,
  }
}
