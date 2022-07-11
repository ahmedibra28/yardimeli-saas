import dynamicAPI from '../dynamicAPI'
import { useMutation, useQuery } from 'react-query'

const url = '/api/pregnancy-care/report/'

export default function useReportsHook() {
  const postPatientRecord = useMutation(
    async (obj) => await dynamicAPI('post', `${url}/patient-records`, obj),
    {
      retry: 0,
    }
  )
  const getDashboard = useQuery(
    'dashboard',
    async () => await dynamicAPI('get', `${url}/dashboard`, {}),
    { retry: 0 }
  )

  const postInvestigation = useMutation(
    async (obj) => await dynamicAPI('post', `${url}/investigations`, obj),
    {
      retry: 0,
    }
  )

  return {
    postPatientRecord,
    getDashboard,
    postInvestigation,
  }
}
