import { Spinner, Message } from '..'
import { inputText } from '../../utils/dynamicForm'

const FormEntryImages = ({
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
  image,
  RichTextEditor,
  setText,
}) => {
  return (
    <div
      className='modal fade'
      id='imageEntryModal'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='imageEntryModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content modal-background'>
          <div className='modal-header'>
            <h3 className='modal-title ' id='imageEntryModalLabel'>
              {image && image[0]?.image?.name}
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
              image &&
              image.length > 0 && (
                <form onSubmit={handleSubmit(submitHandler)}>
                  <dev style={{ height: '3000px' }}>
                    <RichTextEditor
                      setText={setText}
                      style={{ height: '2000px' }}
                    />
                  </dev>
                  {/* {image.map((v, i) => (
                    <div key={i}>
                      {inputText({
                        register,
                        errors,
                        label: v.image.name,
                        name: v.image._id,
                        placeholder: v.image.name,
                        isRequired: false,
                      })}
                    </div>
                  ))} */}

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

export default FormEntryImages
