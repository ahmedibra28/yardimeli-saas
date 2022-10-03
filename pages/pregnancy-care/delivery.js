import { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../HOC/withAuth'
import { confirmAlert } from 'react-confirm-alert'
import { useForm } from 'react-hook-form'
import useDeliveriesHook from '../../utils/api/pregnancy-care/deliveries'
import usePatientsHook from '../../utils/api/pregnancy-care/patients'
import {
  Spinner,
  ViewDeliveries,
  Pagination,
  FormDeliveries,
  Message,
  Confirm,
} from '../../components'
import moment from 'moment'

const Deliveries = () => {
  const [page, setPage] = useState(1)
  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)
  const [q, setQ] = useState('')

  const { getDeliveries, postDelivery, updateDelivery, deleteDelivery } =
    useDeliveriesHook({
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
      breastSucking: true,
    },
  })

  const { data, isLoading, isError, error, refetch } = getDeliveries
  const { data: dataPatient } = getPatients

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateDelivery

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteDelivery

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postDelivery

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
          ...data,
        })
      : mutateAsyncPost(data)
  }

  const editHandler = (delivery) => {
    setId(delivery._id)
    setEdit(true)
    setValue('isActive', delivery.isActive)
    setValue('patient', delivery?.patient?._id)

    setValue('gravida', delivery?.preDelivery?.gravida)
    setValue('para', delivery?.preDelivery?.para)
    setValue('prevCS', delivery?.preDelivery?.prevCS)
    setValue('cervicalDilation', delivery?.preDelivery?.cervicalDilation)
    setValue('descending', delivery?.preDelivery?.descending)
    setValue('lie', delivery?.preDelivery?.lie)
    setValue('presentation', delivery?.preDelivery?.presentation)
    setValue('position', delivery?.preDelivery?.position)
    setValue('membrance', delivery?.preDelivery?.membrance)
    setValue('contraction', delivery?.preDelivery?.contraction)
    setValue('fetalHeart', delivery?.preDelivery?.fetalHeart)
    setValue('vitalSign', delivery?.preDelivery?.vitalSign)
    setValue('pulse', delivery?.preDelivery?.pulse)
    setValue('temperature', delivery?.preDelivery?.temperature)
    setValue(
      'date',
      moment(delivery?.postDelivery?.date).format('YYYY-MM-DD HH:mm')
    )
    setValue('childPatientId', delivery?.baby?.childPatientId)
    setValue('doctor', delivery?.baby?.doctor)
    setValue('gestationalAge', delivery?.baby?.gestationalAge)
    setValue('gender', delivery?.baby?.gender)
    setValue('noOfBabies', delivery?.baby?.noOfBabies)
    setValue('childStatus', delivery?.baby?.childStatus)
    setValue('apgarScore', delivery?.baby?.apgarScore)
    setValue('weight', delivery?.baby?.weight)
    setValue('breastSucking', delivery?.baby?.breastSucking)

    setValue(
      'postDate',
      moment(delivery?.postDelivery?.postDate).format('YYYY-MM-DD HH:mm')
    )
    setValue('type', delivery?.postDelivery?.type)
    setValue('mode', delivery?.postDelivery?.mode)
    setValue('episiotomy', delivery?.postDelivery?.episiotomy)
    setValue('repair', delivery?.postDelivery?.repair)
    setValue('placenta', delivery?.postDelivery?.placenta)
    setValue('perinealTear', delivery?.postDelivery?.perinealTear)
    setValue('perinealRepair', delivery?.postDelivery?.perinealRepair)
    setValue('postVitalSign', delivery?.postDelivery?.postVitalSign)
    setValue('postPulse', delivery?.postDelivery?.postPulse)
    setValue('postTemperature', delivery?.postDelivery?.postTemperature)
  }

  return (
    <>
      <Head>
        <title>Deliveries</title>
        <meta property='og:title' content='Deliveries' key='title' />
      </Head>
      {isSuccessDelete && (
        <Message variant='success'>
          Delivery has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant='success'>
          Delivery has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant='success'>
          Delivery has been Created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant='danger'>{errorPost}</Message>}

      <FormDeliveries
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
        <ViewDeliveries
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

export default dynamic(() => Promise.resolve(withAuth(Deliveries)), {
  ssr: false,
})
