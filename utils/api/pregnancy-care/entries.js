import dynamicAPI from '../dynamicAPI'
import { useMutation, useQueryClient } from 'react-query'

const url = '/api/pregnancy-care/investigation/entry'

const queryKey = 'investigations'

export default function useInvestigationEntriesHook() {
  const queryClient = useQueryClient()

  const updateImageEntry = useMutation(
    async (obj) => await dynamicAPI('put', `${url}/images/${obj._id}`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const postImageEntry = useMutation(
    async (obj) => await dynamicAPI('post', `${url}/images`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const updateLabTestEntry = useMutation(
    async (obj) => await dynamicAPI('put', `${url}/lab-tests/${obj._id}`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const postLabTestEntry = useMutation(
    async (obj) => await dynamicAPI('post', `${url}/lab-tests`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const updateVaccinationEntry = useMutation(
    async (obj) =>
      await dynamicAPI('put', `${url}/vaccinations/${obj._id}`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const postVaccinationEntry = useMutation(
    async (obj) => await dynamicAPI('post', `${url}/vaccinations`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  return {
    postImageEntry,
    updateImageEntry,

    postLabTestEntry,
    updateLabTestEntry,

    postVaccinationEntry,
    updateVaccinationEntry,
  }
}
