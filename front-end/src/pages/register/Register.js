import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) => {
      return axios.post('http://localhost:3000/users/register', newUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      alert('User successfully created!');
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        alert('Validation failed.');
      } else if (error.response?.status === 500) {
        alert('Internal Server Error');
      } else {
        alert('An unexpected error occurred.');
      }
    },
  });

  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className='register-page'>
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='register-inputs-container'>
          <input
            type="text"
            className='register-input'
            placeholder='First Name'
            {...register('firstname', { required: 'First name is required' })}
          />
          {errors.firstname && <p>{errors.firstname.message}</p>}

          <input
            type="text"
            className='register-input'
            placeholder='Last Name'
            {...register('lastname', { required: 'Last name is required' })}
          />
          {errors.lastname && <p>{errors.lastname.message}</p>}

          <input
            type="email"
            className='register-input'
            placeholder='Email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Enter a valid email address',
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}

          <input
            type="password"
            className='register-input'
            placeholder='Password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <input
            type="password"
            className='register-input'
            placeholder='Confirm Password'
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>

        <div className="register-button-email">
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>

      <div className='register-link-container'>
        <p>Or</p>
        <button className='login-button' onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
