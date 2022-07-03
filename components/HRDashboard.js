import useReportsHook from '../utils/api/human-resource/report'
import { Spinner, Message } from '.'
import {
  FaMicroscope,
  FaWalking,
  FaExclamationTriangle,
  FaBuilding,
  FaArrowsAlt,
} from 'react-icons/fa'

const HRDashboard = () => {
  const { getHumanResourceReport } = useReportsHook()

  const { data, isLoading, isError, error } = getHumanResourceReport

  return (
    <div className='container'>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='row  bg-light p-3 mt-2'>
          <div className='col-lg-2 col-md-4 col-sm-4 col-6 mx-auto'>
            <div className='card border-0 shadow'>
              <div className='card-body text-center fw-bold'>
                <FaMicroscope className='card-img-top mb-2' />
                <h6 className='card-title'>Current Employees</h6>
                <p className='card-text'>{data?.employees}</p>
              </div>
            </div>
          </div>

          <div className='col-lg-2 col-md-4 col-sm-4 col-6 mx-auto'>
            <div className='card border-0 shadow'>
              <div className='card-body text-center fw-bold'>
                <FaWalking className='card-img-top mb-2' />
                <h6 className='card-title'>Resigned Employees</h6>
                <p className='card-text'>{data?.resigns}</p>
              </div>
            </div>
          </div>

          <div className='col-lg-2 col-md-4 col-sm-4 col-6 mx-auto'>
            <div className='card border-0 shadow'>
              <div className='card-body text-center fw-bold'>
                <FaExclamationTriangle className='card-img-top mb-2' />
                <h6 className='card-title'>Write Up Employees</h6>
                <p className='card-text'>{data?.writeups}</p>
              </div>
            </div>
          </div>

          <div className='col-lg-2 col-md-4 col-sm-4 col-6 mx-auto'>
            <div className='card border-0 shadow'>
              <div className='card-body text-center fw-bold'>
                <FaBuilding className='card-img-top mb-2' />
                <h6 className='card-title'>Departments</h6>
                <p className='card-text'>{data?.departments}</p>
              </div>
            </div>
          </div>

          <div className='col-lg-2 col-md-4 col-sm-4 col-6 mx-auto'>
            <div className='card border-0 shadow'>
              <div className='card-body text-center fw-bold'>
                <FaArrowsAlt className='card-img-top mb-2' />
                <h6 className='card-title'>Positions</h6>
                <p className='card-text'>{data?.positions}</p>
              </div>
            </div>
          </div>

          <div className='col-lg-2 col-md-4 col-sm-4 col-6 mx-auto'>
            <div className='card border-0 shadow'>
              <div className='card-body text-center fw-bold'>
                <FaArrowsAlt className='card-img-top mb-2' />
                <h6 className='card-title'>Current On Leave</h6>
                <p className='card-text'>{data?.totalOnLeave}</p>
              </div>
            </div>
          </div>

          <div className='col-12  mt-5'>
            <hr />
            <h3 className='text-center'>
              On Leave Employees <sup>[{data?.totalOnLeave}]</sup>{' '}
            </h3>
            <table className='table table-sm table-border'>
              <thead className='border-0'>
                <tr>
                  <th>Emp. ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {data?.leaves?.map((leave) => (
                  <tr key={leave._id}>
                    <td>{leave?.employee?.employeeId}</td>
                    <td>{leave?.employee?.name}</td>
                    <td>{leave?.employee?.department?.name}</td>
                    <td>{leave?.type}</td>
                    <td>{leave?.startDate}</td>
                    <td>{leave?.endDate}</td>
                    <td>{leave?.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default HRDashboard
