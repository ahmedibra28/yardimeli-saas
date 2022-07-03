import Link from 'next/link'
import { FaTimesCircle, FaFolder } from 'react-icons/fa'
import Search from './Search'

const ResourcesTableView = (props) => {
  const table = props?.table
  const deleteHandler = props?.deleteHandler
  const isLoadingDelete = props?.isLoadingDelete
  const setQ = props?.setQ
  const q = props?.q
  const searchHandler = props?.searchHandler
  const name = props?.name
  const label = props?.label
  const modal = props?.modal
  const searchPlaceholder = props?.searchPlaceholder
  const searchInput = props?.searchInput
  const addBtn = props?.addBtn

  return (
    <div className='table-responsive bg-light p-3 mt-2'>
      <div className='d-flex align-items-center flex-column mb-2'>
        <h3 className='fw-light text-muted'>
          {name}
          <sup className='fs-6'> [{table.data && table.data.total}] </sup>
        </h3>
        {addBtn && (
          <button
            className='btn btn-outline-primary btn-sm shadow my-2'
            data-bs-toggle='modal'
            data-bs-target={`#${modal}`}
          >
            Add New {label}
          </button>
        )}
        {searchInput && (
          <div className='col-auto'>
            <Search
              placeholder={searchPlaceholder}
              setQ={setQ}
              q={q}
              searchHandler={searchHandler}
            />
          </div>
        )}
      </div>

      <div className='row gy-3 my-3'>
        {table?.data?.data?.map((item, index) => (
          <div key={index} className='col-lg-3 col-md-4 col-6'>
            <div className='card border-0 shadow bg-transparent'>
              <Link href={`resources/${item._id}`}>
                <a>
                  <FaFolder className='display-1 text-warning card-img-top' />
                </a>
              </Link>

              <div className='card-body text-center'>
                <Link href={`resources/${item._id}`}>
                  <a className='text-decoration-none text-muted'>
                    <h5 className='card-title'>{item?.employee?.employeeId}</h5>
                    <div className='card-text'>
                      <p>{item?.employee?.name}</p>
                    </div>
                  </a>
                </Link>
                <button
                  disabled={isLoadingDelete}
                  onClick={() => deleteHandler(item._id)}
                  className='btn btn-danger btn-sm'
                >
                  {isLoadingDelete ? (
                    <span className='spinner-border spinner-border-sm' />
                  ) : (
                    <span>
                      <FaTimesCircle className='mb-1' /> Delete Resources
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResourcesTableView
