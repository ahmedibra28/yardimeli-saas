import { FaPenAlt } from 'react-icons/fa'
import { Search } from '..'
import moment from 'moment'

const ViewEntryLabTests = ({ data, editHandler, setQ, q, searchHandler }) => {
  return (
    <div className='table-responsive bg-light p-3 mt-2'>
      <div className='d-flex align-items-center flex-column mb-2'>
        <h3 className='fw-light text-muted'>
          LabTests List <sup className='fs-6'> [{data ? data.length : 0}] </sup>
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
            data.map((labTest) => (
              <tr key={labTest._id}>
                <td>{labTest.patient && labTest.patient.patientId}</td>
                <td>{labTest.patient && labTest.patient.name}</td>
                <td>{moment(labTest.date).format('ll')}</td>
                <td>{labTest.createdBy && labTest.createdBy.name}</td>
                <td>
                  {labTest.status === 'pending' ? (
                    <span className='bg-danger px-2 py-1 rounded-pill text-light'>
                      {labTest.status}
                    </span>
                  ) : (
                    <span className='bg-success px-2 py-1 rounded-pill text-light'>
                      {labTest.status}
                    </span>
                  )}
                </td>

                <td>
                  <div className='btn-group'>
                    <button
                      className='btn btn-primary btn-sm rounded-pill'
                      onClick={() => editHandler(labTest)}
                      data-bs-toggle='modal'
                      data-bs-target='#labTestEntryModal'
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

export default ViewEntryLabTests
