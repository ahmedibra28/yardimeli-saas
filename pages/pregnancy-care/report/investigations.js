import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../../HOC/withAuth'
import useReportsHook from '../../../utils/api/pregnancy-care/reports'
import { Spinner, Message } from '../../../components'
import TableView from '../../../components/TableView'
import { FaSearch } from 'react-icons/fa'
import { useState } from 'react'

const Investigation = () => {
  const [patient, setPatient] = useState('')
  const [investigationType, setInvestigationType] = useState('')

  const { postInvestigation } = useReportsHook()

  const { data, isLoading, isError, error, mutateAsync } = postInvestigation

  const result = {
    data: data,
    total: data?.length,
  }

  // TableView
  const table = {
    header: ['Patient ID', 'Name', 'investigation Type', 'Status', 'User'],
    body: [
      'patient.patientId',
      'patient.name',
      'investigationType',
      'status',
      'createdBy.name',
    ],
    data: result,
    createdAt: 'createdAt',
  }

  const name = 'Patient Investigations List'
  const label = 'Patient'
  const modal = 'employee'
  const searchPlaceholder = 'Search by name'

  const searchHandler = (e) => {
    e.preventDefault()

    mutateAsync({ patient, investigationType })
  }
  return (
    <>
      <Head>
        <title>Patients Investigations</title>
        <meta
          property='og:title'
          content='Patients Investigations'
          key='title'
        />
      </Head>

      <div className='text-center mb-2 bg-light py-3'>
        <form onSubmit={searchHandler}>
          <div className='row px-5'>
            {/* <div className='col-lg-4 col-md-6 col-12 mx-auto'> */}
            <div className='mb-2 col-lg-4 col-md-6 col-12 mx-auto'>
              <input
                type='text'
                className='form-control'
                onChange={(e) => setPatient(e.target.value)}
                value={patient}
                placeholder='Patient ID'
              />
            </div>
            <div className='mb-2 col-lg-4 col-md-6 col-12 mx-auto'>
              <select
                type='text'
                className='form-control'
                placeholder='Select Investigation Type'
                aria-label='Search'
                onChange={(e) => setInvestigationType(e.target.value)}
                value={investigationType}
              >
                <option value=''>Choose Investigation Type</option>
                {['laboratory', 'image', 'vaccination'].map((inv, index) => (
                  <option key={index} value={inv}>
                    {inv}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-2 col-lg-4 col-md-6 col-12 mx-auto'>
              <button
                type='submit'
                className='btn btn-outline-secondary form-control'
              >
                <FaSearch /> SEARCH
              </button>
            </div>
            {/* </div> */}
          </div>
        </form>
      </div>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <TableView
          table={table}
          //   searchHandler={searchHandler}
          name={name}
          modal={modal}
          label={label}
          //   setQ={setQ}
          //   q={q}
          searchPlaceholder={searchPlaceholder}
          searchInput={false}
          addBtn={false}
        />
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Investigation)), {
  ssr: false,
})
