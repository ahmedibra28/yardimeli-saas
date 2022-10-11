import { Spinner, Message } from '..'
import {
  inputText,
  inputNumber,
  staticInputSelect,
  InputAutoCompleteSelect,
  inputCheckBox,
  inputDate,
  inputDateTime,
} from '../../utils/dynamicForm'

const FormDeliveries = ({
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
      id='deliveryModal'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='deliveryModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content modal-background'>
          <div className='modal-header'>
            <h3 className='modal-title ' id='deliveryModalLabel'>
              {edit ? 'Edit Delivery' : 'Post Delivery'}
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
                  Pre-Delivery
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
                      label: 'Patient Doctor',
                      errors,
                      name: 'patientDoctor',
                      placeholder: 'patient doctor',
                      value: 'patientDoctor',
                      data: [{ name: 'Dr Oksana' }, { name: 'Dr Mashhura' }],
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Gravida',
                      placeholder: 'Gravida',
                      errors,
                      name: 'gravida',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Para',
                      placeholder: 'Para',
                      errors,
                      name: 'para',
                    })}
                  </div>
                  <div className='col-12'>
                    {inputCheckBox({
                      isRequired: false,
                      register,
                      label: 'Previous Cesarian',
                      placeholder: 'Previous Cesarian',
                      errors,
                      name: 'prevCS',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Cervical Dilation',
                      placeholder: 'Cervical Dilation',
                      errors,
                      name: 'cervicalDilation',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Descending',
                      placeholder: 'Descending',
                      errors,
                      name: 'descending',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Lie',
                      placeholder: 'Lie',
                      errors,
                      name: 'lie',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Presentation',
                      placeholder: 'Presentation',
                      errors,
                      name: 'presentation',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Position',
                      placeholder: 'Position',
                      errors,
                      name: 'position',
                    })}
                  </div>

                  <div className='col-lg-4 col-md-6 col-12'>
                    {staticInputSelect({
                      register,
                      label: 'Membrance',
                      placeholder: 'Membrance',
                      errors,
                      name: 'membrance',
                      data: [
                        { name: 'Rupture' },
                        { name: 'Meconium' },
                        { name: 'Blood' },
                        { name: 'Clear' },
                        { name: 'Intact' },
                      ],
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Contraction',
                      placeholder: 'Contraction',
                      errors,
                      name: 'contraction',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Fetal Heart',
                      placeholder: 'Fetal Heart',
                      errors,
                      name: 'fetalHeart',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Blood Pressure',
                      placeholder: 'Blood Pressure',
                      errors,
                      name: 'vitalSign',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Pulse',
                      placeholder: 'Pulse',
                      errors,
                      name: 'pulse',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Temperature',
                      placeholder: 'Temperature',
                      errors,
                      name: 'temperature',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputDateTime({
                      register,
                      label: 'Admission Date',
                      placeholder: 'Admission Date',
                      errors,
                      name: 'date',
                    })}
                  </div>
                </div>

                <hr />
                <div className='row'>
                  <h6 className='font-monospace fw-bold text-uppercase'>
                    Past-Delivery
                  </h6>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputDateTime({
                      register,
                      label: 'Delivery Date',
                      placeholder: 'Delivery Date',
                      errors,
                      name: 'postDate',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {staticInputSelect({
                      register,
                      label: 'Delivery Type',
                      placeholder: 'Delivery Type',
                      errors,
                      name: 'type',
                      data: [{ name: 'CS' }, { name: 'SVD' }],
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {staticInputSelect({
                      register,
                      label: 'Delivery Mode',
                      placeholder: 'Delivery Mode',
                      errors,
                      name: 'mode',
                      data: [
                        { name: 'Induction' },
                        { name: 'Spontaneous' },
                        { name: 'C/Section' },
                      ],
                    })}
                  </div>
                  <div className='col-12'>
                    {inputCheckBox({
                      isRequired: false,
                      register,
                      label: 'Episiotomy',
                      placeholder: 'Episiotomy',
                      errors,
                      name: 'episiotomy',
                    })}
                  </div>
                  <div className='col-12'>
                    {inputCheckBox({
                      isRequired: false,
                      register,
                      label: 'Repair',
                      placeholder: 'Repair',
                      errors,
                      name: 'repair',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {staticInputSelect({
                      register,
                      label: 'Placenta',
                      placeholder: 'Placenta',
                      errors,
                      name: 'placenta',
                      data: [{ name: 'Complete' }, { name: 'Incomplete' }],
                    })}
                  </div>
                  <div className='col-12'>
                    {inputCheckBox({
                      isRequired: false,
                      register,
                      label: 'Perineal Tear',
                      placeholder: 'Perineal Tear',
                      errors,
                      name: 'perinealTear',
                    })}
                  </div>
                  <div className='col-12'>
                    {inputCheckBox({
                      isRequired: false,
                      register,
                      label: 'Perineal Repair',
                      placeholder: 'Perineal Repair',
                      errors,
                      name: 'perinealRepair',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Post Vital Sign',
                      placeholder: 'Post Vital Sign',
                      errors,
                      name: 'postVitalSign',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Post Pulse',
                      placeholder: 'Post Pulse',
                      errors,
                      name: 'postPulse',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Post Temperature',
                      placeholder: 'Post Temperature',
                      errors,
                      name: 'postTemperature',
                    })}
                  </div>
                  <div className='col-12'>
                    {inputCheckBox({
                      isRequired: false,
                      register,
                      label: 'Is Active?',
                      placeholder: 'Is Active?',
                      errors,
                      name: 'isActive',
                    })}
                  </div>
                </div>

                <hr />
                <div className='row'>
                  <h6 className='font-monospace fw-bold text-uppercase'>
                    Baby
                  </h6>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Child Patient ID',
                      placeholder: 'Child Patient ID',
                      errors,
                      name: 'childPatientId',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Doctor name',
                      placeholder: 'Doctor name',
                      errors,
                      name: 'doctor',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Gestational Age',
                      placeholder: 'Gestational Age',
                      errors,
                      name: 'gestationalAge',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Gender',
                      placeholder: 'Gender',
                      errors,
                      name: 'gender',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputNumber({
                      register,
                      label: 'Number of Babies',
                      placeholder: 'Number of Babies',
                      errors,
                      name: 'noOfBabies',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {staticInputSelect({
                      register,
                      label: 'Child Status',
                      placeholder: 'Child Status',
                      errors,
                      name: 'childStatus',
                      data: [{ name: 'Alive' }, { name: 'Death' }],
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Apgar Score',
                      placeholder: 'Apgar Score',
                      errors,
                      name: 'apgarScore',
                    })}
                  </div>
                  <div className='col-lg-4 col-md-6 col-12'>
                    {inputText({
                      register,
                      label: 'Weight',
                      placeholder: 'Weight',
                      errors,
                      name: 'weight',
                    })}
                  </div>
                  <div className='col-12'>
                    {inputCheckBox({
                      register,
                      label: 'Breast Sucking',
                      placeholder: 'Breast Sucking',
                      errors,
                      name: 'breastSucking',
                      isRequired: false,
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

export default FormDeliveries
