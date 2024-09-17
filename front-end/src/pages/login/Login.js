import React from 'react'
import "./Login.css"

const Login = () => {
  return (
    <div className='login-page'>
        <h1>AREA 51</h1>
        <div className='login-buttons-container'>
            <button className='login-button-google'>Login with Google</button>
            <button className='login-button-email'>Login with Email</button>
        </div>
        <div className='register-link-container'>
            <p>Or</p>
            <button className='register-button'>Create an account</button>
        </div>
    </div>
  )
}

export default Login