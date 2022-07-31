import { Spinner, Message } from '..'
import {
  inputText,
  inputNumber,
  staticInputSelect,
  InputAutoCompleteSelect,
  inputDate,
} from '../../utils/dynamicForm'

const FormHistories = ({
  edit,
  formCleanHandler,
  isLoading,
  register,
  isError,
  errors,
  isLoadingUpdate,
  isLoadingPost,
  handleSubmit,
  submitHandler,
  error,
  dataPatient,
}) => {
  return (
    <div
      className='modal fade'
      id='historyModal'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='historyModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content modal-background'>
          <div className='modal-header'>
            <h3 className='modal-title ' id='historyModalLabel'>
              {edit ? 'Edit History' : 'Post History'}
            </h3>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={formCleanHandler}
            ></button>
          </div>
          <div className='modal-body'>
            {isLoading ? (
              <Spinner />
            ) : isError ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <form onSubmit={handleSubmit(submitHandler)}>
                <h6 className='font-monospace fw-bold text-uppercase'>
                  General History
                </h6>
                <div className='row'>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {InputAutoCompleteSelect({
                      register,
                      label: 'Patient',
                      errors,
                      name: 'patient',
                      placeholder: 'patient',
                      value: 'patientId',
                      data:
                        dataPatient && dataPatient.filter((p) => p.isActive),
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {staticInputSelect({
                      register,
                      label: 'Marital Status',
                      placeholder: 'Marital Status',
                      errors,
                      name: 'status',
                      data: [{ name: 'Married' }, { name: 'Divorced' }],
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Chief Complaint',
                      placeholder: 'Chief Complaint',
                      errors,
                      name: 'complaint',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'History of Present Illness',
                      placeholder: 'History of Present Illness',
                      errors,
                      name: 'hpi',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Past Medical History',
                      placeholder: 'Past Medical History',
                      errors,
                      name: 'pmh',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Family History',
                      placeholder: 'Family History',
                      errors,
                      name: 'fh',
                    })}
                  </div>
                </div>

                <hr />
                <div className='row'>
                  <h6 className='font-monospace fw-bold text-uppercase'>
                    Past Obstetric History
                  </h6>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'No of Children',
                      placeholder: 'No of Children',
                      errors,
                      name: 'noOfChildren',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Gravida',
                      placeholder: 'Gravida',
                      errors,
                      name: 'gravida',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Para',
                      placeholder: 'Para',
                      errors,
                      name: 'para',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Abortion',
                      placeholder: 'Abortion',
                      errors,
                      name: 'abortion',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Still Birth',
                      placeholder: 'Still Birth',
                      errors,
                      name: 'stillBirth',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Alive Children',
                      placeholder: 'Alive Children',
                      errors,
                      name: 'aliveChildren',
                    })}
                  </div>

                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Infant Death',
                      placeholder: 'Infant Death',
                      errors,
                      name: 'infantDeath',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Neonatal Death',
                      placeholder: 'Neonatal Death',
                      errors,
                      name: 'neonatalDeath',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Toddler Death',
                      placeholder: 'Toddler Death',
                      errors,
                      name: 'toddlerDeath',
                    })}
                  </div>
                </div>

                <hr />
                <div className='row'>
                  <h6 className='font-monospace fw-bold text-uppercase'>
                    Made of Delivery
                  </h6>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Vacuum',
                      placeholder: 'Vacuum',
                      errors,
                      name: 'vacuum',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Induction',
                      placeholder: 'Induction',
                      errors,
                      name: 'induction',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Caesarean',
                      placeholder: 'Caesarean',
                      errors,
                      name: 'caesarean',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Age of Last Baby',
                      placeholder: 'Age of Last Baby',
                      errors,
                      name: 'ageOfLastBaby',
                    })}
                  </div>
                </div>

                <hr />
                <div className='row'>
                  <h6 className='font-monospace fw-bold text-uppercase'>
                    General Examination
                  </h6>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Blood Pressure',
                      placeholder: 'Blood Pressure',
                      errors,
                      name: 'bp',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Pulse Rate',
                      placeholder: 'Pulse Rate',
                      errors,
                      name: 'pulse',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Temperature',
                      placeholder: 'Temperature',
                      errors,
                      name: 'temperature',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Weight',
                      placeholder: 'Weight',
                      errors,
                      name: 'weight',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Diagnostics',
                      placeholder: 'Diagnostics',
                      errors,
                      name: 'diagnostics',
                    })}
                  </div>
                  <div className='col-md-6 col-12'>
                    {inputDate({
                      register,
                      errors,
                      label: 'Date',
                      name: 'date',
                      placeholder: 'Date',
                    })}
                  </div>
                </div>

                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary '
                    data-bs-dismiss='modal'
                    onClick={formCleanHandler}
                  >
                    Close
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary '
                    disabled={isLoadingPost || isLoadingUpdate}
                  >
                    {isLoadingPost || isLoadingUpdate ? (
                      <span className='spinner-border spinner-border-sm' />
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormHistories
