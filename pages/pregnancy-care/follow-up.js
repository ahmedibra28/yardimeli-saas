import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../HOC/withAuth'
import { useForm } from 'react-hook-form'
import useFollowUpsHook from '../../utils/api/pregnancy-care/follow-ups'
import usePatientsHook from '../../utils/api/pregnancy-care/patients'

import {
  FormFollowUps,
  Message,
  Pagination,
  Spinner,
  ViewFollowUps,
} from '../../components'
import { useEffect, useState } from 'react'

const FollowUps = () => {
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')

  const { postFollowUp, getFollowUps } = useFollowUpsHook({
    page,
    q,
    limit: 25,
  })
  const { getPatients } = usePatientsHook({
    limit: 1000,
  })

  const { data, isLoading, isError, error, refetch } = getFollowUps

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    if (!q) refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
    },
  })

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postFollowUp

  const { data: dataPatient } = getPatients

  const formCleanHandler = () => {
    reset()
  }

  const submitHandler = (data) => {
    mutateAsyncPost(data)
  }

  const searchHandler = (e) => {
    e.preventDefault()
    refetch()
    setPage(1)
  }

  return (
    <>
      <Head>
        <title>FollowUps</title>
        <meta property='og:title' content='FollowUps' key='title' />
      </Head>

      {isSuccessPost && (
        <Message variant='success'>
          FollowUp has been added successfully.
        </Message>
      )}
      {isErrorPost && <Message variant='danger'>{errorPost}</Message>}

      <div className='ms-auto text-end'>
        <Pagination data={data} setPage={setPage} />
      </div>

      <FormFollowUps
        formCleanHandler={formCleanHandler}
        errors={errors}
        isLoadingPost={isLoadingPost}
        register={register}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        dataPatient={dataPatient && dataPatient.data}
      />

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <ViewFollowUps
          data={data}
          setQ={setQ}
          q={q}
          searchHandler={searchHandler}
        />
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(FollowUps)), {
  ssr: false,
})
