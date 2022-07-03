import { Spinner, Message } from '..'
import { inputText } from '../../utils/dynamicForm'

const FormEntryLabTests = ({
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
  labTest,
}) => {
  return (
    <div
      className='modal fade'
      id='labTestEntryModal'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='labTestEntryModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content modal-background'>
          <div className='modal-header'>
            <h3 className='modal-title ' id='labTestEntryModalLabel'>
              {edit ? 'Edit Lab' : 'Post Lab'}
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
              labTest &&
              labTest.length > 0 && (
                <form onSubmit={handleSubmit(submitHandler)}>
                  {labTest.map((v, i) => (
                    <div key={i}>
                      {inputText({
                        register,
                        errors,
                        label: v.labTest.name,
                        name: v.labTest._id,
                        placeholder: v.labTest.name,
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

export default FormEntryLabTests
