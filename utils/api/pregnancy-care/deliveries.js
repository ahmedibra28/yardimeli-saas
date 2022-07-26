import dynamicAPI from '../dynamicAPI'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const url = '/api/pregnancy-care/deliveries'

const queryKey = 'deliveries'

export default function useDeliveriesHook(props) {
  const { page = 1, q = '', limit = 25 } = props
  const queryClient = useQueryClient()

  const getDeliveries = useQuery(
    queryKey,
    async () =>
      await dynamicAPI('get', `${url}?page=${page}&q=${q}&limit=${limit}`, {}),
    { retry: 0 }
  )

  const updateDelivery = useMutation(
    async (obj) => await dynamicAPI('put', `${url}/${obj._id}`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const deleteDelivery = useMutation(
    async (id) => await dynamicAPI('delete', `${url}/${id}`, {}),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const postDelivery = useMutation(
    async (obj) => await dynamicAPI('post', url, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  return {
    getDeliveries,
    updateDelivery,
    deleteDelivery,
    postDelivery,
  }
}
