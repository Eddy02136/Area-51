import React, { useContext } from 'react';
import './LoginEmailDialog.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../auth/AuthContext';

const LoginEmailDialog = ({ onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: async (loginData) => {
      return axios.post('http://localhost:3000/users/login', loginData);
    },
    onSuccess: (response) => {
      console.log('Login response:', response);

      const { token } = response.data || {};
      if (token) {
        login(token);
        navigate('/');
      } else {
        alert('Unexpected error: Token not found.');
      }
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        alert('Validation failed.');
      } else if (error.response?.status === 500) {
        alert('Internal Server Error');
      } else {
        console.log('Error:', error);
        alert('An unexpected error occurred.');
      }
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className='login-email-dialog'>
      <div className='login-email-dialog-container'>
        <h2>Login with Email</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='login-email-dialog-inputs'>
          <div className='login-email-dialog-inputs-container'>
            <input
              type='email'
              className='login-input'
              placeholder='Email'
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className='error-message'>{errors.email.message}</p>}
            <input
              type='password'
              className='login-input'
              placeholder='Password'
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className='error-message'>{errors.password.message}</p>}
          </div>

          <div className='login-email-buttons-container'>
            <button
              type='submit'
              className='login-email-dialog-button'
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Logging in...' : 'Login'}
            </button>
            <button
              className='login-email-dialog-button'
              onClick={onCancel}
              type='button'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginEmailDialog;
