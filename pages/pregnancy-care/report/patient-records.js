import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../../HOC/withAuth'
import Message from '../../../components/Message'
import {
  FaCheckCircle,
  FaMicroscope,
  FaSearch,
  FaShieldVirus,
  FaCamera,
  FaTimesCircle,
  FaPrescription,
} from 'react-icons/fa'
import useReportsHook from '../../../utils/api/pregnancy-care/reports'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { inputDate, inputText } from '../../../utils/dynamicForm'
import Image from 'next/image'
import { Spinner } from '../../../components'

const Record = () => {
  const { postPatientRecord } = useReportsHook()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  })

  const { isLoading, isError, error, data, mutateAsync } = postPatientRecord

  const patientRecords = data?.patientRecords
  const patientPrescriptions = data?.patientPrescriptions

  const submitHandler = async (data) => {
    mutateAsync(data)
  }

  const createMarkup = (html) => {
    return { __html: html }
  }

  return (
    <>
      <Head>
        <title>Patient Records</title>
        <meta property='og:title' content='Patient Records' key='title' />
      </Head>

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
              <button
                type='submit'
                className='btn btn-primary mt-2'
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className='spinner-border spinner-border-sm' />
                ) : (
                  <>
                    <FaSearch className='mb-1' /> Search
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
      <hr />

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {data && patientRecords && patientRecords.length > 0 && (
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
                  Ref No:{' '}
                  {data &&
                    patientRecords &&
                    patientRecords[0] &&
                    patientRecords[0]._id}
                </span>
              </div>
              <div className='card rounded-3 p-3'>
                <div className='row gy-3'>
                  <div className='col text-start'>
                    <strong> PATIENT ID: </strong> <br />{' '}
                    {data &&
                      patientRecords &&
                      patientRecords[0] &&
                      patientRecords[0].patient.patientId}
                  </div>
                  <div className='col text-center'>
                    <strong>PATIENT NAME: </strong> <br />{' '}
                    {data &&
                      patientRecords &&
                      patientRecords[0] &&
                      patientRecords[0].patient.name}
                  </div>
                  <div className='col text-end'>
                    <strong>PRINTED DATE: </strong> <br />{' '}
                    {moment().format('MMM Do YY')}
                  </div>
                </div>
              </div>

              {patientRecords &&
                patientRecords.map(
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
                            {moment(record.date).format('MMM Do YY')}
                          </div>
                        </div>

                        <table className='table table-borderless'>
                          <thead>
                            <tr className='bg-secondary text-light'>
                              <th scope='col'>#</th>
                              <th scope='col'>TEST</th>
                              <th scope='col'>RESULT</th>
                              <th scope='col'>REFERENCE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {record.labTests.map((item, index) => (
                              <tr key={item._id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.labTest.name}</td>

                                <td className='text-wrap'>{item.result}</td>
                                <td>{item.labTest.reference}</td>
                              </tr>
                            ))}{' '}
                          </tbody>
                        </table>
                      </div>
                    )
                )}

              {patientRecords &&
                patientRecords.map(
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
                            {moment(record.date).format('MMM Do YY')}
                          </div>
                        </div>

                        <table className='table table-borderless'>
                          <thead>
                            <tr className='bg-secondary text-light'>
                              <th scope='col'>#</th>
                              <th scope='col'>VACCINE</th>
                              <th scope='col'>RESULT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {record.vaccinations.map((item, index) => (
                              <tr key={item._id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.vaccination.name}</td>

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

              {patientRecords &&
                patientRecords.map(
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
                            {moment(record.date).format('MMM Do YY')}
                          </div>
                        </div>

                        <table className='table table-borderless'>
                          <thead>
                            <tr className='bg-secondary text-light'>
                              <th scope='col'>#</th>
                              <th scope='col'>IMAGE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {record.images.map((item, index) => (
                              <>
                                <tr key={item._id}>
                                  <th scope='row'>{index + 1}</th>
                                  <td>{item.image.name}</td>
                                </tr>
                              </>
                            ))}{' '}
                          </tbody>
                        </table>

                        {record.investigationType === 'image' &&
                          record.images[0].result && (
                            <>
                              <div
                                dangerouslySetInnerHTML={createMarkup(
                                  record.images[0].result
                                )}
                              />
                            </>
                          )}
                      </div>
                    )
                )}
            </div>
          )}

          {data && patientRecords.length === 0 && (
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
                      {moment(record.date).format('MMM Do YY')}
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
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Record)), {
  ssr: false,
})
