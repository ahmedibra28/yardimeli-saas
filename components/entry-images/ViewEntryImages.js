import { FaPenAlt } from 'react-icons/fa'
import { Search } from '..'
import moment from 'moment'

const ViewEntryImages = ({ data, editHandler, setQ, q, searchHandler }) => {
  return (
    <div className='table-responsive bg-light p-3 mt-2'>
      <div className='d-flex align-items-center flex-column mb-2'>
        <h3 className='fw-light text-muted'>
          Images List <sup className='fs-6'> [{data ? data.length : 0}] </sup>
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
            data.map((image) => (
              <tr key={image._id}>
                <td>{image.patient && image.patient.patientId}</td>
                <td>{image.patient && image.patient.name}</td>
                <td>{moment(image.createdAt).format('ll')}</td>
                <td>{image.createdBy && image.createdBy.name}</td>
                <td>
                  {image.status === 'pending' ? (
                    <span className='bg-danger px-2 py-1 rounded-pill text-light'>
                      {image.status}
                    </span>
                  ) : (
                    <span className='bg-success px-2 py-1 rounded-pill text-light'>
                      {image.status}
                    </span>
                  )}
                </td>

                <td>
                  <div className='btn-group'>
                    <button
                      className='btn btn-primary btn-sm rounded-pill'
                      onClick={() => editHandler(image)}
                      data-bs-toggle='modal'
                      data-bs-target='#imageEntryModal'
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

export default ViewEntryImages
