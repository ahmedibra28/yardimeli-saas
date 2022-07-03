import dynamicAPI from './dynamicAPI'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const url = '/api'

const queryKey = 'reports'

export default function useReportsHook(props) {
  const getHumanResourceReport = useQuery(
    queryKey,
    async () =>
      await dynamicAPI(
        'get',
        `${url}/human-resource/report/humanresources`,
        {}
      ),
    { retry: 0 }
  )

  return {
    getHumanResourceReport,
  }
}
