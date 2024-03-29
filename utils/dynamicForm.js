export const inputText = (args) => {
  const { register, placeholder, errors, name, label, isRequired = true } = args

  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type='text'
        placeholder={`${placeholder}`}
        className='form-control'
      />
      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}

export const inputTel = (args) => {
  const { register, placeholder, errors, name, label, isRequired = true } = args

  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type='tel'
        placeholder={`${placeholder}`}
        className='form-control'
      />
      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}

export const inputTextArea = (args) => {
  const { register, placeholder, errors, name, label, isRequired = true } = args

  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <textarea
        rows='5'
        cols='30'
        {...register(name, isRequired && { required: `${label} is required` })}
        type='text'
        placeholder={`${placeholder}`}
        className='form-control'
      />
      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}

export const inputNumber = (args) => {
  const { register, placeholder, errors, name, label, isRequired = true } = args

  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type='number'
        step='0.01'
        placeholder={`${placeholder}`}
        className='form-control'
      />
      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}

export const inputEmail = (args) => {
  const { register, placeholder, errors, label, name, isRequired = true } = args

  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name, {
          required: isRequired ? `${label} is required` : null,
          pattern: {
            value: /\S+@\S+\.+\S+/,
            message: 'Entered value does not match email format',
          },
        })}
        type='email'
        placeholder={`${placeholder}`}
        className='form-control'
      />
      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}

export const inputPassword = (args) => {
  const {
    register,
    placeholder,
    errors,
    watch,
    name,
    label,
    validate = false,
    isRequired = true,
    minLength = false,
  } = args

  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name, {
          required: isRequired ? `${label} is required` : null,
          minLength: minLength
            ? {
                value: 6,
                message: 'Password must have at least 6 characters',
              }
            : null,
          validate: validate
            ? (value) =>
                value === watch().password || 'The passwords do not match'
            : null,
        })}
        type='password'
        placeholder={`${placeholder}`}
        className='form-control'
      />
      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}

export const dynamicInputSelect = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    label,
    data,
    isRequired = true,
    value,
  } = args

  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        type='text'
        placeholder={`${placeholder}`}
        className='form-control'
      >
        <option value=''>-------</option>
        {data &&
          data.map((d) => (
            <option key={d._id} value={d._id}>
              {d[value]}
            </option>
          ))}
      </select>
      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}

export const staticInputSelect = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    data,
    label,
    isRequired = true,
  } = args

  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        type='text'
        placeholder={`${placeholder}`}
        className='form-control'
      >
        <option value=''>-------</option>
        {data &&
          data.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
      </select>
      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}

export const inputCheckBox = (args) => {
  const { register, placeholder, errors, name, label, isRequired = true } = args

  return (
    <div className='mb-3'>
      <div className='form-check form-switch'>
        <input
          className='form-check-input'
          type='checkbox'
          id={name}
          {...register(
            name,
            isRequired && { required: `${label} is required` }
          )}
        />
        <label className='form-check-label' htmlFor={name}>
          {label}
        </label>
      </div>
      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}

export const inputMultipleCheckBox = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    data,
    label,
    isRequired = true,
  } = args

  return (
    <div className='mb-3'>
      <div className='row g-1 mb-3'>
        {data &&
          data.map((d) => (
            <div key={d._id} className='col-md-4 col-6'>
              <div className='form-check form-switch'>
                <input
                  {...register(
                    name,
                    isRequired && { required: `${label} is required` }
                  )}
                  className='form-check-input'
                  type='checkbox'
                  value={d._id}
                  id={`flexCheck${d._id}`}
                />
                <label
                  className='form-check-label'
                  htmlFor={`flexCheck${d._id}`}
                >
                  {d.name}
                </label>
              </div>
            </div>
          ))}
      </div>
      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}

export const inputFile = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    isRequired = true,
    label,
    setFile,
  } = args

  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type='file'
        placeholder={`${placeholder}`}
        className='form-control'
        id='formFile'
        onChange={(e) => setFile(e.target.files[0])}
      />
      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}

export const inputDate = (args) => {
  const { register, placeholder, errors, name, label, isRequired = true } = args

  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type='date'
        placeholder={`${placeholder}`}
        className='form-control'
      />
      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}

export const inputDateTime = (args) => {
  const { register, placeholder, errors, name, label, isRequired = true } = args

  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name, isRequired && { required: `${label} is required` })}
        type='datetime-local'
        placeholder={`${placeholder}`}
        className='form-control'
      />
      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}

export const InputAutoCompleteSelect = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    data,
    label,
    isRequired = true,
    value,
  } = args

  return (
    <div className='mb-3'>
      <label htmlFor='exampleDataList' className='form-label mb-0'>
        {label}
      </label>
      <input
        list='datalistOptions'
        autoComplete='off'
        id='exampleDataList'
        {...register(name, isRequired && { required: `${label} is required` })}
        type='text'
        placeholder={`${placeholder}`}
        className='form-control'
      />
      <datalist id='datalistOptions'>
        <option value=''>-------------</option>
        {data &&
          data.map((d) => (
            <option key={d._id} value={d._id}>
              {`${value && d[value] + ' - '}  ${d.name}`}
            </option>
          ))}
      </datalist>

      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}

export const dynamicInputSelectNumber = (args) => {
  const {
    register,
    placeholder,
    errors,
    name,
    label,
    data,
    isRequired = true,
  } = args

  return (
    <div className='mb-3'>
      <label htmlFor={name}>{label}</label>
      <select
        {...register(name, isRequired && { required: `${label} is required` })}
        type='text'
        placeholder={`${placeholder}`}
        className='form-control'
      >
        <option value=''>-------</option>

        {[...Array(data).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>
            {num + 1}
          </option>
        ))}
      </select>
      {errors && errors[name] && (
        <span className='text-danger'>{errors[name].message}</span>
      )}
    </div>
  )
}
