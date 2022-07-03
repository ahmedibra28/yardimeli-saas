import { InputAutoCompleteSelect, inputTextArea } from '../../utils/dynamicForm'

const FormFollowUps = ({
  formCleanHandler,
  register,
  errors,
  isLoadingPost,
  handleSubmit,
  submitHandler,
  dataPatient,
}) => {
  return (
    <div
      className='modal fade'
      id='followUpModal'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='followUpModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content modal-background'>
          <div className='modal-header'>
            <h3 className='modal-title ' id='followUpModalLabel'>
              Add Follow Up
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
            <form onSubmit={handleSubmit(submitHandler)}>
              {InputAutoCompleteSelect({
                register,
                label: 'Patient',
                errors,
                name: 'patient',
                value: 'patientId',
                placeholder: 'patient',
                data: dataPatient && dataPatient.filter((p) => p.isActive),
              })}
              {inputTextArea({
                register,
                errors,
                label: 'Description',
                name: 'description',
                placeholder: 'Description',
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
                  disabled={isLoadingPost}
                >
                  {isLoadingPost ? (
                    <span className='spinner-border spinner-border-sm' />
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormFollowUps
