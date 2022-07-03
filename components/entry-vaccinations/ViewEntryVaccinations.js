import { FaPenAlt } from 'react-icons/fa'
import { Search } from '..'
import moment from 'moment'

const ViewEntryVaccinations = ({
  data,
  editHandler,
  setQ,
  q,
  searchHandler,
}) => {
  return (
    <div className='table-responsive bg-light p-3 mt-2'>
      <div className='d-flex align-items-center flex-column mb-2'>
        <h3 className='fw-light text-muted'>
          Vaccinations List{' '}
          <sup className='fs-6'> [{data ? data.length : 0}] </sup>
        </h3>

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
            <th>DateTime</th>
            <th>Requested</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((vaccination) => (
              <tr key={vaccination._id}>
                <td>{vaccination.patient && vaccination.patient.patientId}</td>
                <td>{vaccination.patient && vaccination.patient.name}</td>
                <td>{moment(vaccination.createdAt).format('ll')}</td>
                <td>{vaccination.createdBy && vaccination.createdBy.name}</td>
                <td>
                  {vaccination.status === 'pending' ? (
                    <span className='bg-danger px-2 py-1 rounded-pill text-light'>
                      {vaccination.status}
                    </span>
                  ) : (
                    <span className='bg-success px-2 py-1 rounded-pill text-light'>
                      {vaccination.status}
                    </span>
                  )}
                </td>

                <td>
                  <div className='btn-group'>
                    <button
                      className='btn btn-primary btn-sm rounded-pill'
                      onClick={() => editHandler(vaccination)}
                      data-bs-toggle='modal'
                      data-bs-target='#vaccinationEntryModal'
                    >
                      <FaPenAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewEntryVaccinations
