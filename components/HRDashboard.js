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
        <div className='row gy-3 bg-light p-3 mt-2'>
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
              On Leave Employees <sup>[{data?.totalOnLeave}]</sup>
            </h3>

            {data?.leaves?.map((leave) => (
              <div key={leave._id} className='card border-0 shadow my-3'>
                <div className='card-body'>
                  <div className='d-flex justify-content-between'>
                    <div>
                      <span className='fw-bold'>Emp. ID: </span>
                      {leave?.employee?.employeeId}
                      <br />
                      <span className='fw-bold'>Emp. Name: </span>
                      {leave?.employee?.name}
                      <br />
                      <span className='fw-bold'>Department: </span>
                      {leave?.employee?.department?.name}
                    </div>
                    <div>
                      <span className='fw-bold'>Start Date: </span>
                      {leave?.startDate}
                      <br />
                      <span className='fw-bold'>End Date: </span>
                      {leave?.endDate}
                      <br />
                    </div>
                  </div>
                  <p className='mt-3'>
                    <span className='fw-bold'>Description: </span> <br />
                    {leave?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default HRDashboard
