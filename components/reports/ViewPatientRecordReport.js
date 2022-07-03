import { Message } from '..'
import Image from 'next/image'
import {
  FaCamera,
  FaCheckCircle,
  FaMicroscope,
  FaPrescription,
  FaSearch,
  FaShieldVirus,
  FaTimesCircle,
} from 'react-icons/fa'
import { inputDate, inputText } from '../../utils/dynamicForm'
import moment from 'moment'
import ThreeDots from 'react-loading-icons'

const ViewPatientRecordReport = ({
  data,

  submitHandler,
  handleSubmit,
  register,
  errors,
  isLoading,
  isError,
  error,
}) => {
  const createMarkup = (html) => {
    return { __html: html }
  }

  return (
    <div className='table-responsive bg-light p-3 mt-2'>
      <div className='d-flex align-items-center flex-column mb-2'>
        <h3 className='fw-light text-muted'>
          Patient Record Report
          {/* <sup className='fs-6'> [{data && data.total}] </sup> */}
        </h3>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className='d-flex justify-content-center'>
            <div className='row align-items-center'>
              <div className='col-auto'>
                {inputText({
                  register,
                  errors,
                  name: 'patient',
                  label: 'Patient ID',
                  placeholder: 'Enter patient id',
                })}
              </div>
              <div className='col-auto'>
                {inputDate({
                  register,
                  errors,
                  name: 'startDate',
                  label: 'Start Date',
                })}
              </div>
              <div className='col-auto'>
                {inputDate({
                  register,
                  errors,
                  name: 'endDate',
                  label: 'End Date',
                })}
              </div>
              <div className='col-auto'>
                <button type='submit' className='btn btn-primary  mt-2'>
                  <FaSearch className='mb-1' /> Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {isLoading ? (
        <div className='text-center'>
          <ThreeDots
            color='#00BFFF'
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {data && data && data.length > 0 && (
            <div>
              <div className='img-box text-center'>
                <Image
                  width='350'
                  height='87'
                  priority
                  src='/logo.png'
                  alt='logo'
                  className='img-fluid'
                />
                <br />
              </div>
              <div className='d-flex justify-content-between'>
                <span className='text-primary fw-bold fs-4 text-uppercase'>
                  PATIENT RECORDS
                </span>
                <span className='text-primary'>
                  Ref No: {data && data && data[0] && data[0]._id}
                </span>
              </div>
              <div className='card rounded-3 p-3'>
                <div className='row gy-3'>
                  <div className='col text-start'>
                    <strong> PATIENT ID: </strong> <br />{' '}
                    {data && data && data[0] && data[0].patient.patientId}
                  </div>
                  <div className='col text-center'>
                    <strong>PATIENT NAME: </strong> <br />{' '}
                    {data && data && data[0] && data[0].patient.name}
                  </div>
                  <div className='col text-end'>
                    <strong>PRINTED DATE: </strong> <br />{' '}
                    {moment().format('MMM Do YY')}
                  </div>
                </div>
              </div>

              {data &&
                data.map(
                  (record) =>
                    record.investigationType === 'laboratory' && (
                      <div className='card rounded-3 p-3 mt-2'>
                        <div className='row gy-3'>
                          <div className='col text-start'>
                            <strong> INVESTIGATION TYPE: </strong> <br />{' '}
                            <span className='fw-bold text-uppercase font-monospace'>
                              <FaMicroscope className='mb-1' />{' '}
                              {record.investigationType}
                            </span>
                          </div>
                          <div className='col-auto'>
                            <strong> DOCTOR: </strong> <br />{' '}
                            <span className='fw-bold text-uppercase font-monospace'>
                              {record.createdBy.name}
                            </span>
                          </div>
                          <div className='col text-end'>
                            <strong>INVESTIGATION DATE: </strong> <br />{' '}
                            {moment(record.createdAt).format('MMM Do YY')}
                          </div>
                        </div>

                        <table className='table table-borderless'>
                          <thead>
                            <tr className='bg-secondary text-light'>
                              <th scope='col'>#</th>
                              <th scope='col'>TEST</th>
                              <th scope='col'>STATUS</th>
                              <th scope='col'>RESULT</th>
                              <th scope='col'>REFERENCE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {record.laboratory.map((item, index) => (
                              <tr key={item._id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.test.name}</td>
                                <td>
                                  {item.status === 'pending' ? (
                                    <span className='bg-danger px-2 py-1 rounded-pill text-light'>
                                      {item.status}
                                    </span>
                                  ) : (
                                    <span className='bg-success px-2 py-1 rounded-pill text-light'>
                                      {item.status}
                                    </span>
                                  )}
                                </td>

                                <td>{item.result}</td>
                                <td>{item.test.reference}</td>
                              </tr>
                            ))}{' '}
                          </tbody>
                        </table>
                      </div>
                    )
                )}

              {data &&
                data.map(
                  (record) =>
                    record.investigationType === 'vaccination' && (
                      <div className='card rounded-3 p-3 mt-2'>
                        <div className='row gy-3'>
                          <div className='col text-start'>
                            <strong> INVESTIGATION TYPE: </strong> <br />{' '}
                            <span className='fw-bold text-uppercase font-monospace'>
                              <FaShieldVirus className='mb-1' />{' '}
                              {record.investigationType}
                            </span>
                          </div>
                          <div className='col-auto'>
                            <strong> DOCTOR: </strong> <br />{' '}
                            <span className='fw-bold text-uppercase font-monospace'>
                              {record.createdBy.name}
                            </span>
                          </div>
                          <div className='col text-end'>
                            <strong>INVESTIGATION DATE: </strong> <br />{' '}
                            {moment(record.createdAt).format('MMM Do YY')}
                          </div>
                        </div>

                        <table className='table table-borderless'>
                          <thead>
                            <tr className='bg-secondary text-light'>
                              <th scope='col'>#</th>
                              <th scope='col'>VACCINE</th>
                              <th scope='col'>STATUS</th>
                              <th scope='col'>RESULT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {record.vaccination.map((item, index) => (
                              <tr key={item._id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.vaccination.name}</td>
                                <td>
                                  {item.status === 'pending' ? (
                                    <span className='bg-danger px-2 py-1 rounded-pill text-light'>
                                      {item.status}
                                    </span>
                                  ) : (
                                    <span className='bg-success px-2 py-1 rounded-pill text-light'>
                                      {item.status}
                                    </span>
                                  )}
                                </td>

                                <td>
                                  {item.result !== 'done' ? (
                                    <FaTimesCircle className='text-danger mb-1' />
                                  ) : (
                                    <FaCheckCircle className='text-success mb-1' />
                                  )}
                                </td>
                              </tr>
                            ))}{' '}
                          </tbody>
                        </table>
                      </div>
                    )
                )}

              {data &&
                data.map(
                  (record) =>
                    record.investigationType === 'image' && (
                      <div className='card rounded-3 p-3 mt-2'>
                        <div className='row gy-3'>
                          <div className='col text-start'>
                            <strong> INVESTIGATION TYPE: </strong> <br />{' '}
                            <span className='fw-bold text-uppercase font-monospace'>
                              <FaCamera className='mb-1' />{' '}
                              {record.investigationType}
                            </span>
                          </div>
                          <div className='col-auto'>
                            <strong> DOCTOR: </strong> <br />{' '}
                            <span className='fw-bold text-uppercase font-monospace'>
                              {record.createdBy.name}
                            </span>
                          </div>
                          <div className='col text-end'>
                            <strong>INVESTIGATION DATE: </strong> <br />{' '}
                            {moment(record.createdAt).format('MMM Do YY')}
                          </div>
                        </div>

                        <table className='table table-borderless'>
                          <thead>
                            <tr className='bg-secondary text-light'>
                              <th scope='col'>#</th>
                              <th scope='col'>IMAGE</th>
                              <th scope='col'>STATUS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {record.image.map((item, index) => (
                              <>
                                <tr key={item._id}>
                                  <th scope='row'>{index + 1}</th>
                                  <td>{item.image.name}</td>
                                  <td>
                                    {item.status === 'pending' ? (
                                      <span className='bg-danger px-2 py-1 rounded-pill text-light'>
                                        {item.status}
                                      </span>
                                    ) : (
                                      <span className='bg-success px-2 py-1 rounded-pill text-light'>
                                        {item.status}
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              </>
                            ))}{' '}
                          </tbody>
                        </table>

                        {record.investigationType === 'image' &&
                          record.image[0].result && (
                            <>
                              <div
                                dangerouslySetInnerHTML={createMarkup(
                                  record.image[0].result
                                )}
                              />
                            </>
                          )}
                      </div>
                    )
                )}
            </div>
          )}

          {data && data.length === 0 && (
            <>
              <div className='img-box text-center'>
                <Image
                  width='350'
                  height='87'
                  priority
                  src='/logo.png'
                  alt='logo'
                  className='img-fluid'
                />
                <br />
              </div>
              <div className='d-flex justify-content-between'>
                <span className='text-primary fw-bold fs-4 text-uppercase'>
                  PATIENT RECORDS
                </span>
                <span className='text-primary'>
                  Ref No:{' '}
                  {data &&
                    patientPrescriptions &&
                    patientPrescriptions[0] &&
                    patientPrescriptions[0]._id}
                </span>
              </div>
              <div className='card rounded-3 p-3'>
                <div className='row gy-3'>
                  <div className='col text-start'>
                    <strong> PATIENT ID: </strong> <br />{' '}
                    {data &&
                      patientPrescriptions &&
                      patientPrescriptions[0] &&
                      patientPrescriptions[0].patient.patientId}
                  </div>
                  <div className='col text-center'>
                    <strong>PATIENT NAME: </strong> <br />{' '}
                    {data &&
                      patientPrescriptions &&
                      patientPrescriptions[0] &&
                      patientPrescriptions[0].patient.name}
                  </div>
                  <div className='col text-end'>
                    <strong>PRINTED DATE: </strong> <br />{' '}
                    {moment().format('MMM Do YY')}
                  </div>
                </div>
              </div>
            </>
          )}
          {patientPrescriptions &&
            patientPrescriptions.map((record) => (
              <>
                <div className='card rounded-3 p-3 mt-2'>
                  <div className='row gy-3'>
                    <div className='col text-start'>
                      <span className='fw-bold text-uppercase font-monospace'>
                        <FaPrescription className='mb-1' /> Prescription
                      </span>
                    </div>
                    <div className='col-auto'>
                      <strong> DOCTOR: </strong> <br />{' '}
                      <span className='fw-bold text-uppercase font-monospace'>
                        {record.createdBy.name}
                      </span>
                    </div>
                    <div className='col text-end'>
                      <strong>PRESCRIBED DATE: </strong> <br />{' '}
                      {moment(record.createdAt).format('MMM Do YY')}
                    </div>
                  </div>

                  <table className='table table-borderless'>
                    <thead>
                      <tr className='bg-secondary text-light'>
                        <th scope='col'>#</th>
                        <th scope='col'>TREATMENT</th>
                        <th scope='col'>FREQUENT</th>
                        <th scope='col'>QUANTITY</th>
                        <th scope='col'>DESCRIPTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.treatment.map((item, index) => (
                        <tr key={item._id}>
                          <th scope='row'>{index + 1}</th>
                          <td>{item.treatment.name}</td>
                          <td>{item.frequency}</td>
                          <td>{item.quantity}</td>
                          <td>{item.description}</td>
                        </tr>
                      ))}{' '}
                    </tbody>
                  </table>
                </div>
              </>
            ))}
        </>
      )}
    </div>
  )
}

export default ViewPatientRecordReport
