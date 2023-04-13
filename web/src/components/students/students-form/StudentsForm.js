import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import studentsService from '../../../services/students';

function StudentsForm() {
  // https://react-hook-form.com/get-started#Applyvalidation
  const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'onBlur' });
  const [serverError, setServerError] = useState(undefined);

  const onStudentSubmit = (student) => {
    setServerError(undefined);
    studentsService.create(student)
      .then(student => console.info(student))
      .catch(error => {
        const errors = error.response?.data?.errors;
        if (errors) {
          Object.keys(errors)
            .forEach((inputName) => setError(inputName, { message: errors[inputName] }))
        } else {
          setServerError(error.message)
        }
      })
  }

  return (
    <form onSubmit={handleSubmit(onStudentSubmit)}>
      {serverError && <div className="alert alert-danger d-none d-lg-block">{serverError}</div>}
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">@</span>
        <input 
          type="text" 
          className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
          placeholder="Name" {...register('name', { 
            required: 'Student name is required' 
          })} />
        {errors.name && <div className='invalid-feedback'>{errors.name?.message}</div>}
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">@</span>
        <input 
          type="text" 
          className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
          placeholder="student@example.org" {...register('email', { 
            required: 'Student email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Student email must be valid'
            }
          })} />
        {errors.email && <div className='invalid-feedback'>{errors.email?.message}</div>}
      </div>

      <div className="d-grid">
        <button type="submit" className='btn btn-primary'>Register</button>
      </div>
    </form>
  )
}

export default StudentsForm