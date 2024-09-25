import "./LoginEmailDialog.css"

const LoginEmailDialog = ({ onCancel }) => {
  return (
    <div className='login-email-dialog'>
      <div className='login-email-dialog-container'>
        <h2>Login with Email</h2>
        <div className='login-email-dialog-inputs'>
            <div className='login-email-dialog-inputs-container'>
                <input type='text' className='login-input' placeholder='Email' />
                <input type='password' className='login-input' placeholder='Password' />
            </div>
            <div className="login-email-buttons-container">
                <button className='login-email-dialog-button'>Login</button>
                <button className='login-email-dialog-button'>Forgot password</button>
                <button className='login-email-dialog-button' onClick={onCancel}>Cancel</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LoginEmailDialog
