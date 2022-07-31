import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../HOC/withAuth'
import { useForm } from 'react-hook-form'
import useFollowUpsHook from '../../utils/api/pregnancy-care/follow-ups'
import usePatientsHook from '../../utils/api/pregnancy-care/patients'
import moment from 'moment'

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
  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)
  const [q, setQ] = useState('')

  const { postFollowUp, getFollowUps, updateFollowUp, deleteFollowUp } =
    useFollowUpsHook({
      page,
      q,
      limit: 25,
    })
  const { getPatients } = usePatientsHook({
    limit: 1000,
  })

  const { data, isLoading, isError, error, refetch } = getFollowUps

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateFollowUp

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteFollowUp

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
    setValue,
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
    setEdit(false)
  }

  useEffect(() => {
    if (isSuccessPost || isSuccessUpdate) formCleanHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessPost, isSuccessUpdate])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => mutateAsyncDelete(id)))
  }

  const submitHandler = (data) => {
    edit
      ? mutateAsyncUpdate({
          _id: id,
          date: data.date,
          description: data.description,
          patient: data.patient,
        })
      : mutateAsyncPost(data)
  }

  const editHandler = (followUp) => {
    setId(followUp._id)
    setEdit(true)
    setValue('patient', followUp.patient?._id)
    setValue('description', followUp.description)
    setValue('date', moment(followUp?.date).format('YYYY-MM-DD'))
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

      {isSuccessUpdate && (
        <Message variant='success'>
          FollowUp has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

      {isSuccessDelete && (
        <Message variant='success'>
          FollowUp has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant='danger'>{errorDelete}</Message>}

      <div className='ms-auto text-end'>
        <Pagination data={data} setPage={setPage} />
      </div>

      <FormFollowUps
        edit={edit}
        formCleanHandler={formCleanHandler}
        errors={errors}
        isLoadingUpdate={isLoadingUpdate}
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
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          isLoadingDelete={isLoadingDelete}
        />
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(FollowUps)), {
  ssr: false,
})
