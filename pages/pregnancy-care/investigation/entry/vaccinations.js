import { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../../../HOC/withAuth'
import { useForm } from 'react-hook-form'
import useEntriesHook from '../../../../utils/api/pregnancy-care/entries'
import {
  Spinner,
  ViewEntryVaccinations,
  FormEntryVaccinations,
  Message,
} from '../../../../components'

const Vaccinations = () => {
  const [q, setQ] = useState('')
  const [id, setId] = useState('')
  const [vaccination, setVaccination] = useState({})

  const { postVaccinationEntry, updateVaccinationEntry } = useEntriesHook()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  })

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateVaccinationEntry

  const {
    data: dataPost,
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    mutateAsync: mutateAsyncPost,
  } = postVaccinationEntry

  const formCleanHandler = () => {
    reset()
  }

  useEffect(() => {
    if (isSuccessUpdate) formCleanHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpdate])

  const searchHandler = (e) => {
    e.preventDefault()
    mutateAsyncPost(q.toUpperCase())
  }

  const submitHandler = (data) => {
    mutateAsyncUpdate({
      _id: id,
      data,
    })
  }

  const editHandler = (vaccination) => {
    setId(vaccination._id)
    setVaccination(vaccination.vaccinations)
  }

  return (
    <>
      <Head>
        <title>Vaccinations</title>
        <meta property='og:title' content='Vaccinations' key='title' />
      </Head>

      {isSuccessUpdate && (
        <Message variant='success'>
          Vaccination has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {isErrorPost && <Message variant='danger'>{errorPost}</Message>}

      <FormEntryVaccinations
        formCleanHandler={formCleanHandler}
        isLoadingUpdate={isLoadingUpdate}
        isLoadingPost={isLoadingPost}
        register={register}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        watch={watch}
        errors={errors}
        vaccination={vaccination}
      />

      {isLoadingPost ? (
        <Spinner />
      ) : (
        <ViewEntryVaccinations
          data={dataPost}
          editHandler={editHandler}
          setQ={setQ}
          q={q}
          searchHandler={searchHandler}
        />
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Vaccinations)), {
  ssr: false,
})
