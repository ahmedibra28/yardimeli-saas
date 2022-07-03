import { Spinner, Message } from '..'
import { inputText } from '../../utils/dynamicForm'

const FormEntryVaccinations = ({
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
  vaccination,
}) => {
  return (
    <div
      className='modal fade'
      id='vaccinationEntryModal'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='vaccinationEntryModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content modal-background'>
          <div className='modal-header'>
            <h3 className='modal-title ' id='vaccinationEntryModalLabel'>
              {edit ? 'Edit Vaccination' : 'Post Vaccination'}
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
              vaccination &&
              vaccination.length > 0 && (
                <form onSubmit={handleSubmit(submitHandler)}>
                  {vaccination.map((v, i) => (
                    <div key={i}>
                      {inputText({
                        register,
                        errors,
                        label: v.vaccination.name,
                        name: v.vaccination._id,
                        placeholder: v.vaccination.name,
                        isRequired: false,
                      })}
                    </div>
                  ))}

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
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormEntryVaccinations
