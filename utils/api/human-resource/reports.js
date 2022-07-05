import dynamicAPI from '../dynamicAPI'
import { useQuery, useMutation } from 'react-query'

const url = '/api/human-resource/report'

const queryKey = 'reports-human-resources'

export default function useReportsHook() {
  const getHumanResourceReport = useQuery(
    queryKey,
    async () => await dynamicAPI('get', `${url}/dashboard`, {}),
    { retry: 0 }
  )

  const postEmployeeByDepartments = useMutation(
    async (obj) =>
      await dynamicAPI('post', `${url}/employee-by-departments`, obj),
    {
      retry: 0,
    }
  )

  return {
    getHumanResourceReport,
    postEmployeeByDepartments,
  }
}
