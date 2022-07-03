import dynamicAPI from './dynamicAPI'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const url = '/api/human-resource/personnel/resources'

const queryKey = 'resources'

export default function useResourcesHook(props) {
  const { page = 1, id, q = '', limit = 25 } = props
  const queryClient = useQueryClient()

  const getResources = useQuery(
    queryKey,
    async () =>
      await dynamicAPI('get', `${url}?page=${page}&q=${q}&limit=${limit}`, {}),
    { retry: 0 }
  )

  const getResourceDetails = useQuery(
    `resources details`,
    async () => await dynamicAPI('get', `${url}/${id}`, {}),
    { retry: 0, enabled: !!id }
  )

  const updateResource = useMutation(
    async (obj) => await dynamicAPI('put', `${url}/${obj._id}`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const deleteResource = useMutation(
    async (id) => await dynamicAPI('delete', `${url}/${id}`, {}),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const deleteResourceFile = useMutation(
    async (obj) => await dynamicAPI('put', `${url}/files/${obj._id}`, { obj }),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([`resources details`]),
    }
  )

  const postResource = useMutation(
    async (obj) => await dynamicAPI('post', url, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  return {
    getResources,
    updateResource,
    deleteResource,
    postResource,
    deleteResourceFile,
    getResourceDetails,
  }
}
