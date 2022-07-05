import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../../HOC/withAuth'
import useReportsHook from '../../../utils/api/human-resource/reports'
import useDepartmentsHook from '../../../utils/api/human-resource/departments'
import { Spinner, Message } from '../../../components'
import TableView from '../../../components/TableView'
import { FaSearch } from 'react-icons/fa'
import { useState } from 'react'

const Employees = () => {
  const [q, setQ] = useState('')

  const { postEmployeeByDepartments } = useReportsHook()
  const { getDepartments } = useDepartmentsHook({
    limit: 1000,
  })

  const { data, isLoading, isError, error, mutateAsync } =
    postEmployeeByDepartments

  const { data: departmentData } = getDepartments

  const result = {
    data: data,
    total: data?.length,
  }

  // TableView
  const table = {
    header: [
      'Employee ID',
      'Name',
      'Mobile',
      'Department',
      'Position',
      'Status',
    ],
    body: [
      'employeeId',
      'name',
      'mobile',
      'department.name',
      'position.name',
      'status',
    ],
    data: result,
    hiredDate: 'hiredDate',
  }

  const name = 'Employees List'
  const label = 'Employee'
  const modal = 'employee'
  const searchPlaceholder = 'Search by name'

  const searchHandler = (e) => {
    e.preventDefault()

    mutateAsync({ department: q })
  }
  return (
    <>
      <Head>
        <title>Employees</title>
        <meta property='og:title' content='Employees' key='title' />
      </Head>

      <div className='text-center mb-2 bg-light py-3'>
        <div className='row'>
          <div className='col-lg-4 col-md-6 col-12 mx-auto'>
            <form onSubmit={searchHandler}>
              <div className='input-group'>
                <select
                  type='text'
                  className='form-control'
                  placeholder='Select Department'
                  aria-label='Search'
                  onChange={(e) => setQ(e.target.value)}
                  value={q}
                >
                  {departmentData?.data?.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.name}
                    </option>
                  ))}
                </select>
                <div className='input-group-append'>
                  <button type='submit' className='btn btn-outline-secondary'>
                    <FaSearch />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
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

export default dynamic(() => Promise.resolve(withAuth(Employees)), {
  ssr: false,
})
