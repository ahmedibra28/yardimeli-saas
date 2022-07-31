import Image from 'next/image'
import moment from 'moment'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const InvestigationTemplate = ({ investigations }) => {
  const createMarkup = (html) => {
    return { __html: html }
  }
  const laboratoryFunc = () => {
    if (investigations && investigations._id) {
      return (
        <>
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
            {investigations.labTests &&
              investigations.labTests.map((item, index) => (
                <tr key={item._id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{item.labTest.name}</td>
                  <td>
                    {!item.result ? (
                      <span className='bg-danger px-2 py-1 rounded-pill text-light'>
                        pending
                      </span>
                    ) : (
                      <span className='bg-success px-2 py-1 rounded-pill text-light'>
                        completed
                      </span>
                    )}
                  </td>

                  <td>
                    {!item.result ? (
                      <FaTimesCircle className='text-danger mb-1' />
                    ) : (
                      item.result
                    )}
                  </td>
                  <td>{item.labTest.reference}</td>
                </tr>
              ))}{' '}
          </tbody>
        </>
      )
    }
  }

  const vaccinationFunc = () => {
    if (investigations && investigations._id) {
      return (
        <>
          <thead>
            <tr className='bg-secondary text-light'>
              <th scope='col'>#</th>
              <th scope='col'>VACCINE</th>
              <th scope='col'>STATUS</th>
              <th scope='col'>RESULT</th>
            </tr>
          </thead>
          <tbody>
            {investigations.vaccinations &&
              investigations.vaccinations.map((item, index) => (
                <tr key={item._id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{item.vaccination.name}</td>
                  <td>
                    {!item.result ? (
                      <span className='bg-danger px-2 py-1 rounded-pill text-light'>
                        pending
                      </span>
                    ) : (
                      <span className='bg-success px-2 py-1 rounded-pill text-light'>
                        completed
                      </span>
                    )}
                  </td>
                  <td>
                    {!item.result ? (
                      <FaTimesCircle className='text-danger mb-1' />
                    ) : (
                      <FaCheckCircle className='text-success mb-1' />
                    )}
                  </td>
                </tr>
              ))}{' '}
          </tbody>
        </>
      )
    }
  }

  const imageFunc = () => {
    if (investigations && investigations._id) {
      return (
        <>
          <thead>
            <tr className='bg-secondary text-light'>
              <th scope='col'>#</th>
              <th scope='col'>IMAGE</th>
              <th scope='col'>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {investigations.images &&
              investigations.images.map((item, index) => (
                <>
                  <tr key={item._id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.image.name}</td>
                    <td>
                      {!item.result ? (
                        <span className='bg-danger px-2 py-1 rounded-pill text-light'>
                          pending
                        </span>
                      ) : (
                        <span className='bg-success px-2 py-1 rounded-pill text-light'>
                          completed
                        </span>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={3} className='p-5'>
                      {!item.result ? (
                        <FaTimesCircle className='text-danger mb-1' />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={createMarkup(item.result)}
                        />
                      )}
                    </td>
                  </tr>
                </>
              ))}{' '}
          </tbody>
        </>
      )
    }
  }

  if (investigations && investigations._id) {
    return (
      <div className='modal-body'>
        <div className='container'>
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
            {investigations.status === 'pending' ? (
              <span className='badge rounded-pill bg-danger p-2 mt-3'>
                {investigations.status}
              </span>
            ) : (
              <span className='badge rounded-pill bg-success p-2 mt-3'>
                {investigations.status}
              </span>
            )}
          </div>
          <div className='d-flex justify-content-between'>
            <span className='text-primary fw-bold fs-4 text-uppercase'>
              {investigations.investigationType}
            </span>
            <span className='text-primary'>Ref No: {investigations._id}</span>
          </div>
          <div className='border border-1 border-primary rounded-3 p-3'>
            <div className='row gy-3'>
              <div className='col text-start'>
                <strong>PATIENT NAME: </strong> <br />{' '}
                {investigations.patient.name}
              </div>
              <div className='col text-center'>
                <strong>REQUESTER NAME: </strong> <br />{' '}
                {investigations.createdBy && investigations.createdBy.name}
              </div>
              <div className='col text-end'>
                <strong>CREATED AT: </strong> <br />{' '}
                {moment(investigations.date).format('MMM Do YY')}
              </div>
            </div>

            <div className='row'>
              <div className='col text-start'>
                <strong> PATIENT ID: </strong> <br />{' '}
                {investigations.patient.patientId}
              </div>

              {investigations.status !== 'pending' && (
                <div className='col text-center'>
                  <strong>DONE AT: </strong> <br />{' '}
                  {moment(investigations.updatedAt).format('MMM Do YY')}
                </div>
              )}

              <div className='col text-end'>
                <strong>PRINTED DATE: </strong> <br />{' '}
                {moment().format('MMM Do YY')}
              </div>
            </div>
          </div>

          <table className='table table-borderless mt-3'>
            {investigations.investigationType === 'laboratory' && (
              <>{laboratoryFunc()}</>
            )}
            {investigations.investigationType === 'vaccination' && (
              <>{vaccinationFunc()}</>
            )}
            {investigations.investigationType === 'image' && <>{imageFunc()}</>}
          </table>

          {investigations.investigationType === 'image' &&
            investigations.image &&
            investigations.image.result && (
              <>
                <div
                  dangerouslySetInnerHTML={createMarkup(
                    investigations.image && investigations.image.result
                  )}
                />
              </>
            )}

          <div className='row'>
            <div className='col-12 text-center my-3'>
              Generated by the system with help of <br />
              <strong>
                {' '}
                {investigations &&
                  investigations.updatedBy &&
                  investigations.updatedBy.name}{' '}
              </strong>
            </div>
            <div className='col-6 mx-auto text-center'>
              <span className='fw-bold'>CONTACT:</span> <br />
              <address>
                <span>
                  Scuola Polizia, Afisioni, Hamar-Jajb, Mogadishu - Somalia
                </span>{' '}
                <br />
                <span>Tel: +252 (0) 613 33 4666</span>
                <br />
                <span>
                  Email:{' '}
                  <a href='mailto:info@yardimelihospital.so' target='blank'>
                    info@yardimelihospital.so
                  </a>
                </span>
              </address>
            </div>

            <div className='col-12 text-center my-3 bg-secondary text-light p-3'>
              <a
                href='https://www.yardimelihospital.so'
                target='blank'
                className='text-light'
              >
                {' '}
                https://www.yardimelihospital.so
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  } else return <span>Nothing</span>
}

export default InvestigationTemplate
