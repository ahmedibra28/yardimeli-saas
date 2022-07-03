import { Search } from '..'
import Image from 'next/image'
import moment from 'moment'

const ViewFollowUps = ({ data, setQ, q, searchHandler }) => {
  return (
    <div className='table-responsive bg-light p-3 mt-2'>
      <div className='d-flex align-items-center flex-column mb-2'>
        <h3 className='fw-light text-muted'>
          Follow Up List <sup className='fs-6'> [{data && data.total}] </sup>
        </h3>
        <button
          className='btn btn-outline-primary btn-sm shadow my-2'
          data-bs-toggle='modal'
          data-bs-target='#followUpModal'
        >
          Add New Follow Up
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
            <th>Description</th>
            <th>Created At</th>
            <th>Created By</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.data.map((followUp) => (
              <tr key={followUp._id}>
                <td>{followUp.patient.patientId}</td>
                <td>{followUp.patient.name}</td>
                <td>{followUp.description}</td>
                <td>{moment(followUp.createdAt).format('ll')}</td>
                <td>{followUp.createdBy && followUp.createdBy.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewFollowUps
