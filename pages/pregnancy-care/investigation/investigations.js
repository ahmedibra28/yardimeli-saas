import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../../HOC/withAuth'
import { confirmAlert } from 'react-confirm-alert'
import { useForm } from 'react-hook-form'
import useInvestigationsHook from '../../../utils/api/pregnancy-care/investigations'
import usePatientsHook from '../../../utils/api/pregnancy-care/patients'
import useLabTestsHook from '../../../utils/api/pregnancy-care/lab-tests'
import useImagesHook from '../../../utils/api/pregnancy-care/images'
import useVaccinationsHook from '../../../utils/api/pregnancy-care/vaccinations'
import {
  Spinner,
  ViewInvestigations,
  Pagination,
  FormInvestigations,
  Message,
  Confirm,
  InvestigationTemplate,
} from '../../../components'
import { FaPrint } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print'

const Investigations = () => {
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')
  const [investigations, setInvestigations] = useState({})

  const { getInvestigations, postInvestigation, deleteInvestigation } =
    useInvestigationsHook({
      page,
      q,
    })

  const { getPatients } = usePatientsHook({ limit: 1000 })
  const { getImages } = useImagesHook({ limit: 1000 })
  const { getLabTests } = useLabTestsHook({ limit: 1000 })
  const { getVaccinations } = useVaccinationsHook({ limit: 1000 })

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
    },
  })

  const { data, isLoading, isError, error, refetch } = getInvestigations
  const { data: dataPatient } = getPatients
  const { data: dataImage } = getImages
  const { data: dataLabTest } = getLabTests
  const { data: dataVaccination } = getVaccinations

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteInvestigation

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postInvestigation

  const formCleanHandler = () => {
    reset()
  }

  useEffect(() => {
    if (isSuccessPost) formCleanHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessPost])

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
    mutateAsyncPost(data)
  }

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Investigation',
  })

  return (
    <>
      <Head>
        <title>Investigations</title>
        <meta property='og:title' content='Investigations' key='title' />
      </Head>
      {isSuccessDelete && (
        <Message variant='success'>
          Investigation has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {isSuccessPost && (
        <Message variant='success'>
          Investigation has been Created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant='danger'>{errorPost}</Message>}

      <FormInvestigations
        formCleanHandler={formCleanHandler}
        isLoading={isLoading}
        isError={isError}
        errors={errors}
        isLoadingPost={isLoadingPost}
        register={register}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        watch={watch}
        error={error}
        dataPatient={dataPatient && dataPatient.data}
        dataImage={dataImage && dataImage.data}
        dataLabTest={dataLabTest && dataLabTest.data}
        dataVaccination={dataVaccination && dataVaccination.data}
      />

      <div className='ms-auto text-end'>
        <Pagination data={data} setPage={setPage} />
      </div>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <ViewInvestigations
          data={data}
          setInvestigations={setInvestigations}
          deleteHandler={deleteHandler}
          isLoadingDelete={isLoadingDelete}
          setQ={setQ}
          q={q}
          searchHandler={searchHandler}
        />
      )}

      <div
        className='modal fade'
        id='invoicePrint'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='invoicePrint'
        aria-hidden='true'
      >
        <div
          className={`
              modal-dialog ${
                investigations &&
                investigations.investigationType === 'image' &&
                investigations.status !== 'pending'
                  ? 'modal-xl'
                  : 'modal-lg'
              }
          `}
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='invoicePrint'>
                INVESTIGATION
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div ref={componentRef}>
              <InvestigationTemplate investigations={investigations} />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>

              <button
                onClick={handlePrint}
                type='submit'
                className='btn btn-success '
              >
                <FaPrint className='mb-1' />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Investigations)), {
  ssr: false,
})
