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
  FaBaby,
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
  const deliveries = data?.deliveries

  const submitHandler = async (data) => {
    mutateAsync(data)
  }

  const createMarkup = (html) => {
    return { __html: html }
  }

  const d = {
    preDelivery: {
      date: '2022-10-03T17:09:00.000Z',
      gravida: '2',
      para: '1',
      prevCS: true,
      cervicalDilation: '0cm',
      descending: '0\\5',
      lie: 'longitudinal',
      presentation: 'cephalic',
      position: 'occiputoanterior',
      membrance: 'Clear',
      contraction: 'no contraction',
      fetalHeart: '145',
      vitalSign: '120\\81',
      pulse: '95',
      temperature: '35.5',
    },
    postDelivery: {
      postDate: '2022-09-06T12:40:00.000Z',
      type: 'CS',
      mode: 'Induction',
      episiotomy: false,
      repair: false,
      placenta: 'Complete',
      perinealTear: false,
      perinealRepair: false,
      postVitalSign: '120\\69',
      postPulse: '93',
      postTemperature: '35.5',
    },
    baby: {
      childPatientId: 'P276158',
      doctor: 'Mashhura',
      gestationalAge: '3',
      gender: 'Male',
      noOfBabies: '2',
      childStatus: 'Alive',
      apgarScore: '10/10',
      weight: '4',
      breastSucking: true,
    },
    _id: '6330008111e72997d9357ca2',
    patient: '62888f3d941ec402087a049c',
    isActive: true,
    createdBy: '6295ac794ce83d712ec62ede',
    createdAt: '2022-09-25T07:17:21.263Z',
    updatedAt: '2022-10-03T17:10:26.486Z',
    __v: 0,
    updatedBy: '62c1960e61c221dbc0fcdf04',
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
                  (record, i) =>
                    record.investigationType === 'laboratory' && (
                      <div key={i} className='card rounded-3 p-3 mt-2'>
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
                              <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.labTest.name}</td>

                                <td className='text-wrap'>{item.result}</td>
                                <td>{item.labTest.reference}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                )}

              {patientRecords &&
                patientRecords.map(
                  (record, index) =>
                    record.investigationType === 'vaccination' && (
                      <div key={index} className='card rounded-3 p-3 mt-2'>
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
                              <tr key={index}>
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
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                )}

              {patientRecords &&
                patientRecords.map(
                  (record, i) =>
                    record.investigationType === 'image' && (
                      <div key={i} className='card rounded-3 p-3 mt-2'>
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
                              <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.image.name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {record.investigationType === 'image' &&
                          record.images[0].result && (
                            <div
                              dangerouslySetInnerHTML={createMarkup(
                                record.images[0].result
                              )}
                            />
                          )}
                      </div>
                    )
                )}
            </div>
          )}

          {/* {data && deliveries && ( */}
          {data && deliveries && (
            <>
              <div className='card rounded-3 p-3 mt-2'>
                <div className='row gy-3 mb-3'>
                  <div className='col text-start'>
                    <strong> TYPE: </strong> <br />{' '}
                    <span className='fw-bold text-uppercase font-monospace'>
                      <FaBaby className='mb-1' /> Delivery
                    </span>
                  </div>
                  <div className='col-auto'>
                    <strong> DOCTOR: </strong> <br />{' '}
                    <span className='fw-bold text-uppercase font-monospace'>
                      {deliveries?.createdBy?.name}
                    </span>
                  </div>
                  <div className='col text-end'>
                    <strong>DELIVERY DATE: </strong> <br />{' '}
                    {moment(deliveries?.preDelivery?.date).format('MMM Do YY')}
                  </div>
                </div>{' '}
                <hr />
                <div className='row gy-3'>
                  <div className='col'>
                    <strong> BRE-DELIVERY: </strong> <br /> <hr />
                    <div className='mt-2'>
                      <strong>Pre-delivery Date: </strong>
                      <span>
                        {moment(deliveries?.preDelivery?.date).format(
                          'MMM Do YY'
                        )}
                      </span>
                    </div>
                    {Object.keys(
                      delete deliveries?.preDelivery?.date &&
                        deliveries?.preDelivery
                    )?.map((obj, i) => (
                      <div key={i} className='mt-2'>
                        <strong>{obj} </strong>
                        <span>{deliveries?.preDelivery[obj]}</span>
                      </div>
                    ))}
                  </div>
                  <div className='col'>
                    <strong>POST-DELIVERY: </strong> <br /> <hr />
                    <div className='mt-2'>
                      <strong>Post-delivery Date: </strong>
                      <span>
                        {moment(deliveries?.postDelivery?.postDate).format(
                          'MMM Do YY'
                        )}
                      </span>
                    </div>
                    {Object.keys(
                      delete deliveries?.postDelivery?.postDate &&
                        deliveries?.postDelivery
                    )?.map((obj, i) => (
                      <div key={i} className='mt-2'>
                        <strong>{obj}: </strong>
                        <span>{deliveries?.postDelivery[obj]}</span>
                      </div>
                    ))}
                  </div>

                  <div className='col'>
                    <strong>BABY: </strong> <br /> <hr />
                    {Object.keys(deliveries?.baby)?.map((obj, i) => (
                      <div key={i} className='mt-2'>
                        <strong>{obj}: </strong>
                        <span>{deliveries?.baby[obj]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Record)), {
  ssr: false,
})
