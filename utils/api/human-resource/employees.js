import dynamicAPI from '../dynamicAPI'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const url = '/api/human-resource/personnel/employees'

const queryKey = 'employees-key'

export default function useEmployeesHook(props) {
  const { page = 1, q = '', limit = 25 } = props
  const queryClient = useQueryClient()

  const getEmployees = useQuery(
    queryKey,
    async () =>
      await dynamicAPI('get', `${url}?page=${page}&q=${q}&limit=${limit}`, {}),
    { retry: 0 }
  )

  const updateEmployee = useMutation(
    async (obj) => await dynamicAPI('put', `${url}/${obj._id}`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const deleteEmployee = useMutation(
    async (id) => await dynamicAPI('delete', `${url}/${id}`, {}),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const postEmployee = useMutation(
    async (obj) => await dynamicAPI('post', url, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  return {
    getEmployees,
    updateEmployee,
    deleteEmployee,
    postEmployee,
  }
}
