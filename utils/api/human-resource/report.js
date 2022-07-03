import dynamicAPI from '../dynamicAPI'
import { useQuery } from 'react-query'

const url = '/api'

const queryKey = 'reports'

export default function useReportsHook() {
  const getHumanResourceReport = useQuery(
    queryKey,
    async () =>
      await dynamicAPI('get', `${url}/human-resource/report/dashboard`, {}),
    { retry: 0 }
  )

  return {
    getHumanResourceReport,
  }
}
