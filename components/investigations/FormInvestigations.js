import { Spinner, Message } from '..'
import {
  dynamicInputSelect,
  InputAutoCompleteSelect,
  inputMultipleCheckBox,
} from '../../utils/dynamicForm'

const FormInvestigations = ({
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
  dataPatient,
  dataImage,
  dataLabTest,
  dataVaccination,
}) => {
  return (
    <div
      className='modal fade'
      id='investigationModal'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='investigationModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content modal-background'>
          <div className='modal-header'>
            <h3 className='modal-title ' id='investigationModalLabel'>
              Post Investigation
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
                  <div className='col-12'>
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
                  <div className='col-12 text-center'>
                    <label htmlFor=''>
                      Please, select any investigation type to request it
                    </label>
                    <hr />
                  </div>
                  <div className='col-md-4 col-12'>
                    <div className='form-check'>
                      <input
                        className='form-check-input rounded-pill'
                        {...register('investigationType')}
                        type='radio'
                        id='laboratory'
                        value='laboratory'
                      />
                      <label
                        className='form-check-label ms-1'
                        htmlFor='laboratory'
                      >
                        Laboratory
                      </label>
                    </div>
                  </div>
                  <div className='col-md-4 col-12'>
                    <div className='form-check'>
                      <input
                        className='form-check-input rounded-pill'
                        {...register('investigationType')}
                        type='radio'
                        id='image'
                        value='image'
                      />
                      <label className='form-check-label ms-1' htmlFor='image'>
                        Image
                      </label>
                    </div>
                  </div>
                  <div className='col-md-4 col-12'>
                    <div className='form-check'>
                      <input
                        className='form-check-input rounded-pill'
                        {...register('investigationType')}
                        type='radio'
                        id='vaccination'
                        value='vaccination'
                      />
                      <label
                        className='form-check-label ms-1'
                        htmlFor='vaccination'
                      >
                        Vaccination
                      </label>
                    </div>
                  </div>
                  <div className='col-12 text-center'>
                    {errors && errors.investigationType && (
                      <span className='text-danger'>
                        {errors.investigationType.message}
                      </span>
                    )}
                  </div>
                </div>

                <hr />

                {watch().investigationType === 'laboratory' && (
                  <div className='row gy-3'>
                    <div className='col-lg-3.col-md-4.col-6 mx-auto'>
                      {inputMultipleCheckBox({
                        register,
                        label: 'Laboratory Tests',
                        placeholder: 'Laboratory Tests',
                        errors,
                        name: 'labTests',
                        data:
                          dataLabTest &&
                          dataLabTest.filter((test) => test.isActive),
                      })}
                    </div>
                  </div>
                )}

                {watch().investigationType === 'image' && (
                  <div className='row gy-3'>
                    <div className='col-lg-3.col-md-4.col-6 mx-auto'>
                      {inputMultipleCheckBox({
                        register,
                        label: 'Images',
                        placeholder: 'Images',
                        errors,
                        name: 'images',
                        data:
                          dataImage &&
                          dataImage.filter((image) => image.isActive),
                      })}
                    </div>
                  </div>
                )}

                {watch().investigationType === 'vaccination' && (
                  <div className='row gy-3'>
                    <div className='col-lg-3.col-md-4.col-6 mx-auto'>
                      {inputMultipleCheckBox({
                        register,
                        label: 'Vaccination',
                        placeholder: 'Vaccination',
                        errors,
                        name: 'vaccinations',
                        data:
                          dataVaccination &&
                          dataVaccination.filter(
                            (vaccination) => vaccination.isActive
                          ),
                      })}
                    </div>
                  </div>
                )}

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

export default FormInvestigations
