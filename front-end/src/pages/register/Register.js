import { useNavigate } from "react-router-dom"
import "./Register.css"


const Register = () => {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/login')
    }
  return (
    <div className='register-page'>
        <h1>Create an account</h1>
        <div className='register-inputs-container'>
            <input type="text" className='register-input' placeholder='First Name'/>
            <input type="text" className='register-input' placeholder='Last Name'/>
            <input type="text" className='register-input' placeholder='Email'/>
            <input type="text" className='register-input' placeholder='Password'/>
            <input type="text" className='register-input' placeholder='Confirm Password'/>
        </div>
        <div className="register-button-email">
            <button>Register with Email</button>
        </div>
        <div className='register-link-container'>
            <p>Or</p>
            <button className='login-button' onClick={handleClick}>Login</button>
        </div>
    </div>
  )
}

export default Register