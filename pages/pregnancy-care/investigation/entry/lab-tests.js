import { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../../../HOC/withAuth'
import { useForm } from 'react-hook-form'
import useEntriesHook from '../../../../utils/api/pregnancy-care/entries'
import {
  Spinner,
  ViewEntryLabTests,
  FormEntryLabTests,
  Message,
} from '../../../../components'

const LabTests = () => {
  const [q, setQ] = useState('')
  const [id, setId] = useState('')
  const [labTest, setLabTest] = useState({})

  const { postLabTestEntry, updateLabTestEntry } = useEntriesHook()

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
  } = updateLabTestEntry

  const {
    data: dataPost,
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    mutateAsync: mutateAsyncPost,
  } = postLabTestEntry

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

  const editHandler = (labTest) => {
    setId(labTest._id)
    setLabTest(labTest.labTests)
  }

  return (
    <>
      <Head>
        <title>LabTests</title>
        <meta property='og:title' content='LabTests' key='title' />
      </Head>

      {isSuccessUpdate && (
        <Message variant='success'>
          LabTest has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

      {isErrorPost && <Message variant='danger'>{errorPost}</Message>}

      <FormEntryLabTests
        formCleanHandler={formCleanHandler}
        isLoadingUpdate={isLoadingUpdate}
        isLoadingPost={isLoadingPost}
        register={register}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        watch={watch}
        errors={errors}
        labTest={labTest}
      />

      {isLoadingPost ? (
        <Spinner />
      ) : (
        <ViewEntryLabTests
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

export default dynamic(() => Promise.resolve(withAuth(LabTests)), {
  ssr: false,
})
