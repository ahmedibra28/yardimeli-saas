import { Spinner, Message } from '..'
import {
  inputCheckBox,
  inputDate,
  inputNumber,
  inputTel,
  inputText,
  staticInputSelect,
} from '../../utils/dynamicForm'

const FormPatients = ({
  edit,
  formCleanHandler,
  isLoading,
  register,
  isError,
  errors,
  watch,
  isLoadingUpdate,
  isLoadingPost,
  handleSubmit,
  submitHandler,
  error,
}) => {
  const districts = [
    { name: 'Dharkeynley' },
    { name: 'Wadajir' },
    { name: 'Waberi' },
    { name: 'Hamr Jajab' },
    { name: 'Hamar Weyne' },
    { name: 'Abdiaziz' },
    { name: 'Shibis' },
    { name: 'Karan' },
    { name: 'Bondhere' },
    { name: 'Kahda' },
    { name: 'Hodan' },
    { name: 'Hawlwadag' },
    { name: 'Yaqshid' },
    { name: 'Daynile' },
    { name: 'Hiliwa' },
    { name: 'Wartanabada' },
    { name: 'Shangani' },
  ]

  return (
    <div
      className='modal fade'
      id='patientModal'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='patientModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content modal-background'>
          <div className='modal-header'>
            <h3 className='modal-title ' id='patientModalLabel'>
              {edit ? 'Edit Patient' : 'Post Patient'}
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
                <div className='row'>
                  <div className='col-md-6 col-12'>
                    {inputText({
                      register,
                      errors,
                      label: 'Patient ID',
                      name: 'patientId',
                      placeholder: 'Patient ID',
                    })}
                  </div>
                  <div className='col-md-6 col-12'>
                    {inputText({
                      register,
                      errors,
                      label: 'Name',
                      name: 'name',
                      placeholder: 'Name',
                    })}
                  </div>
                  <div className='col-md-6 col-12'>
                    {inputDate({
                      register,
                      errors,
                      label: 'Date of Birth',
                      name: 'dateOfBirth',
                      placeholder: 'Date of Birth',
                    })}
                  </div>
                  <div className='col-md-6 col-12'>
                    {inputTel({
                      register,
                      errors,
                      label: 'Mobile',
                      name: 'mobile',
                      placeholder: 'Mobile',
                    })}
                  </div>
                  <div className='col-md-6 col-12'>
                    {staticInputSelect({
                      register,
                      errors,
                      label: 'District',
                      name: 'district',
                      placeholder: 'District',
                      data: districts,
                    })}
                  </div>
                  <div className='col-md-6 col-12'>
                    {inputNumber({
                      register,
                      errors,
                      label: 'Trimester',
                      name: 'trimester',
                      placeholder: 'Trimester',
                    })}
                  </div>
                  <div className='col-md-6 col-12'>
                    {staticInputSelect({
                      register,
                      errors,
                      label: 'Status',
                      name: 'status',
                      placeholder: 'Status',
                      data: [{ name: 'Married' }, { name: 'Divorced' }],
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

                {inputCheckBox({
                  register,
                  errors,
                  watch,
                  name: 'isActive',
                  label: 'Is Active?',
                  isRequired: false,
                  placeholder: 'Is Active?',
                })}
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

export default FormPatients
