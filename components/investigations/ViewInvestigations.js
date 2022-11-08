import { FaTrash, FaChartPie, FaPenAlt } from 'react-icons/fa'
import { Search } from '..'
import moment from 'moment'

const ViewInvestigations = ({
  data,
  setInvestigations,
  deleteHandler,
  isLoadingDelete,
  setQ,
  q,
  searchHandler,
  editHandler,
}) => {
  return (
    <div className='table-responsive bg-light p-3 mt-2'>
      <div className='d-flex align-items-center flex-column mb-2'>
        <h3 className='fw-light text-muted'>
          Investigations List{' '}
          <sup className='fs-6'> [{data && data.total}] </sup>
        </h3>
        <button
          className='btn btn-outline-primary btn-sm shadow my-2'
          data-bs-toggle='modal'
          data-bs-target='#investigationModal'
        >
          Add New Investigation
        </button>
        <div className='col-auto'>
          <Search
            placeholder='Search by name'
            setQ={setQ}
            q={q}
            searchHandler={searchHandler}
          />
        </div>
      </div>
      <table className='table table-sm table-border'>
        <thead className='border-0'>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Investigation Type</th>
            <th>DateTime</th>
            <th>Requested</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.data.map((investigation) => (
              <tr key={investigation._id}>
                <td>
                  {investigation.patient && investigation.patient.patientId}
                </td>
                <td>{investigation.patient && investigation.patient.name}</td>
                <td>{investigation.investigationType}</td>
                <td>{moment(investigation.date).format('ll')}</td>
                <td>
                  {investigation.createdBy && investigation.createdBy.name}
                </td>
                <td>
                  {investigation.status === 'pending' ? (
                    <span className='bg-danger px-2 py-1 rounded-pill text-light'>
                      {investigation.status}
                    </span>
                  ) : (
                    <span className='bg-success px-2 py-1 rounded-pill text-light'>
                      {investigation.status}
                    </span>
                  )}
                </td>
                <td className='btn-group'>
                  <button
                    onClick={() => {
                      setInvestigations(investigation)
                    }}
                    data-bs-toggle='modal'
                    data-bs-target='#invoicePrint'
                    className='btn btn-success btn-sm rounded-pill ms-1'
                  >
                    <FaChartPie />
                  </button>
                  {investigation.status === 'pending' && (
                    <>
                      <button
                        className='btn btn-danger btn-sm rounded-pill ms-1'
                        onClick={() => deleteHandler(investigation._id)}
                        disabled={isLoadingDelete}
                      >
                        {isLoadingDelete ? (
                          <span className='spinner-border spinner-border-sm ms-1' />
                        ) : (
                          <span>
                            <FaTrash />
                          </span>
                        )}
                      </button>
                    </>
                  )}
                  <button
                    className='btn btn-primary btn-sm rounded-pill'
                    onClick={() => editHandler(investigation)}
                    data-bs-toggle='modal'
                    data-bs-target='#investigationModal'
                  >
                    <FaPenAlt />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewInvestigations
