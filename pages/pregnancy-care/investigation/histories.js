import { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../../HOC/withAuth'
import { confirmAlert } from 'react-confirm-alert'
import { useForm } from 'react-hook-form'
import useHistoriesHook from '../../../utils/api/pregnancy-care/histories'
import usePatientsHook from '../../../utils/api/pregnancy-care/patients'
import {
  Spinner,
  ViewHistories,
  Pagination,
  FormHistories,
  Message,
  Confirm,
} from '../../../components'

const Histories = () => {
  const [page, setPage] = useState(1)
  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)
  const [q, setQ] = useState('')

  const { getHistories, postHistory, updateHistory, deleteHistory } =
    useHistoriesHook({
      page,
      q,
    })

  const { getPatients } = usePatientsHook({
    limit: 1000,
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
    },
  })

  const { data, isLoading, isError, error, refetch } = getHistories
  const { data: dataPatient } = getPatients

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateHistory

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteHistory

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postHistory

  const formCleanHandler = () => {
    setEdit(false)
    reset()
  }

  useEffect(() => {
    if (isSuccessPost || isSuccessUpdate) formCleanHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessPost, isSuccessUpdate])

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    if (!q) refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  const searchHandler = (e) => {
    e.preventDefault()
    refetch()
    setPage(1)
  }

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => mutateAsyncDelete(id)))
  }

  const submitHandler = (data) => {
    edit
      ? mutateAsyncUpdate({
          _id: id,
          status: data.status,
          complaint: data.complaint,
          hpi: data.hpi,
          pmh: data.pmh,
          fh: data.fh,
          noOfChildren: data.noOfChildren,
          gravida: data.gravida,
          para: data.para,
          abortion: data.abortion,
          stillBirth: data.stillBirth,
          aliveChildren: data.aliveChildren,
          vacuum: data.vacuum,
          caesarean: data.caesarean,
          induction: data.induction,
          ageOfLastBaby: data.ageOfLastBaby,
          bp: data.bp,
          temperature: data.temperature,
          pulse: data.pulse,
          weight: data.weight,
          diagnostics: data.diagnostics,
          patient: data.patient,
          isActive: data.isActive,
          infantDeath: data.infantDeath,
          neonatalDeath: data.neonatalDeath,
          toddlerDeath: data.toddlerDeath,
        })
      : mutateAsyncPost(data)
  }

  const editHandler = (history) => {
    setId(history._id)
    setEdit(true)
    setValue('status', history.status)
    setValue('complaint', history.complaint)
    setValue('hpi', history.hpi)
    setValue('pmh', history.pmh)
    setValue('fh', history.fh)
    setValue('noOfChildren', history.noOfChildren)
    setValue('gravida', history.gravida)
    setValue('para', history.para)
    setValue('abortion', history.abortion)
    setValue('stillBirth', history.stillBirth)
    setValue('aliveChildren', history.aliveChildren)
    setValue('vacuum', history.vacuum)
    setValue('caesarean', history.caesarean)
    setValue('induction', history.induction)
    setValue('ageOfLastBaby', history.ageOfLastBaby)
    setValue('bp', history.bp)
    setValue('temperature', history.temperature)
    setValue('pulse', history.pulse)
    setValue('weight', history.weight)
    setValue('diagnostics', history.diagnostics)
    setValue('patient', history.patient._id)
    setValue('infantDeath', history.infantDeath)
    setValue('neonatalDeath', history.neonatalDeath)
    setValue('toddlerDeath', history.toddlerDeath)
  }

  return (
    <>
      <Head>
        <title>Histories</title>
        <meta property='og:title' content='Histories' key='title' />
      </Head>
      {isSuccessDelete && (
        <Message variant='success'>
          History has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant='success'>
          History has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant='success'>
          History has been Created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant='danger'>{errorPost}</Message>}

      <FormHistories
        edit={edit}
        formCleanHandler={formCleanHandler}
        isLoading={isLoading}
        isError={isError}
        errors={errors}
        isLoadingUpdate={isLoadingUpdate}
        isLoadingPost={isLoadingPost}
        register={register}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        watch={watch}
        error={error}
        dataPatient={dataPatient && dataPatient.data}
      />

      <div className='ms-auto text-end'>
        <Pagination data={data} setPage={setPage} />
      </div>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <ViewHistories
          data={data}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          isLoadingDelete={isLoadingDelete}
          setQ={setQ}
          q={q}
          searchHandler={searchHandler}
        />
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Histories)), {
  ssr: false,
})
