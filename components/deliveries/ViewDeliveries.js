import { FaPenAlt, FaTrash } from 'react-icons/fa'
import { Search } from '..'
import moment from 'moment'

const ViewDeliveries = ({
  data,
  editHandler,
  deleteHandler,
  isLoadingDelete,
  setQ,
  q,
  searchHandler,
}) => {
  return (
    <div className='table-responsive bg-light p-3 mt-2'>
      <div className='d-flex align-items-center flex-column mb-2'>
        <h3 className='fw-light text-muted'>
          Deliveries List <sup className='fs-6'> [{data && data.total}] </sup>
        </h3>
        <button
          className='btn btn-outline-primary btn-sm shadow my-2'
          data-bs-toggle='modal'
          data-bs-target='#deliveryModal'
        >
          Add New Delivery
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
            <th>Registered</th>
            <th>Pre-Delivery Date</th>
            <th>Post-Delivery Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.data.map((delivery) => (
              <tr key={delivery._id}>
                <td>{delivery.patient && delivery.patient.patientId}</td>
                <td>{delivery.patient && delivery.patient.name}</td>
                <td>{delivery.createdBy && delivery.createdBy.name}</td>
                <td>{moment(delivery.preDelivery.date).format('ll')}</td>
                <td>{moment(delivery?.postDelivery?.postDate).format('ll')}</td>

                <td>
                  <div className='btn-group'>
                    <button
                      className='btn btn-primary btn-sm rounded-pill'
                      onClick={() => editHandler(delivery)}
                      data-bs-toggle='modal'
                      data-bs-target='#deliveryModal'
                    >
                      <FaPenAlt />
                    </button>

                    <button
                      className='btn btn-danger btn-sm ms-1 rounded-pill'
                      onClick={() => deleteHandler(delivery._id)}
                      disabled={isLoadingDelete}
                    >
                      {isLoadingDelete ? (
                        <span className='spinner-border spinner-border-sm' />
                      ) : (
                        <span>
                          <FaTrash />
                        </span>
                      )}
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

export default ViewDeliveries
