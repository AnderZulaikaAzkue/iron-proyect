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
      <div className="input-group mb-1">
        <span className="input-group-text"><i className='fa fa-user fa-fw'></i></span>
        <input 
          type="text" 
          className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
          placeholder="Name" {...register('name', { 
            required: 'Student name is required' 
          })} />
        {errors.name && <div className='invalid-feedback'>{errors.name?.message}</div>}
      </div>

      <div className="input-group mb-1">
        <span className="input-group-text"><i className='fa fa-envelope-o fa-fw'></i></span>
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

      <div className="input-group mb-1">
        <span className="input-group-text"><i className='fa fa-tag fa-fw'></i></span>
        <input
          type="text"
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          placeholder="johndoe" {...register('username', {
            required: 'Username is required',
            pattern: {
              value: /^[a-z0-9]+$/,
              message: 'Username must be lowercase and without spaces'
            }
          })} />
        {errors.username && <div className='invalid-feedback'>{errors.username?.message}</div>}
      </div>

      <div className="input-group mb-1">
        <span className="input-group-text"><i className='fa fa-lock fa-fw'></i></span>
        <input
          type="text"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          placeholder="****" {...register('password', {
            required: 'Student password is required',
            minLength: {
              value: 8,
              message: 'Student password needs at least 8 chars'
            }
          })} />
        {errors.password && <div className='invalid-feedback'>{errors.password?.message}</div>}
      </div>

      <div className="d-grid mt-2">
        <button type="submit" className='btn btn-primary'>Register</button>
      </div>
    </form>
  )
}

export default StudentsForm