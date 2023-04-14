import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import studentsService from '../../../services/students';
import { AuthContext } from '../../../contexts/AuthStore';

function StudentsLogin() {
  const { register, handleSubmit, setError, formState: { errors }} = useForm({ mode: 'onBlur' });
  const [serverError, setServerError] = useState(undefined);
  const { onUserChange } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLoginSubmit = async (student) => {
    try {
      setServerError();
      student = await studentsService.login(student);
      onUserChange(student);
      navigate('/');
    } catch (error) {
      const errors = error.response?.data?.errors;
      if (errors) {
        Object.keys(errors)
          .forEach((inputName) => setError(inputName, { message: errors[inputName] }))
      } else {
        setServerError(error.message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onLoginSubmit)}>
      {serverError && <div className="alert alert-danger d-none d-lg-block">{serverError}</div>}
      <div className="input-group mb-1">
        <span className="input-group-text"><i className='fa fa-tag fa-fw'></i></span>
        <input
          type="text"
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          placeholder="johndoe" {...register('username', {
            required: 'Username is required'
          })} />
        {errors.username && <div className='invalid-feedback'>{errors.username?.message}</div>}
      </div>

      <div className="input-group mb-1">
        <span className="input-group-text"><i className='fa fa-lock fa-fw'></i></span>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          placeholder="****" {...register('password', {
            required: 'Student password is required'
          })} />
        {errors.password && <div className='invalid-feedback'>{errors.password?.message}</div>}
      </div>

      <div className="d-grid mt-2">
        <button type="submit" className='btn btn-primary'>Login</button>
      </div>
    </form>
  )
}

export default StudentsLogin