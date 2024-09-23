import "./Login.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import LoginEmailDialog from "../../components/login/LoginEmailDialog"

const Login = () => {
    const navigate = useNavigate()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleClick = () => {
        navigate('/register')
    }

    const openDialog = () => {
        setIsDialogOpen(true)
    }

    const closeDialog = () => {
        setIsDialogOpen(false)
    }

    return (
        <div className='login-page'>
            <h1>AREA 51</h1>
            <div className="login-page-container">
                {!isDialogOpen && (
                    <>
                        <div className='login-buttons-container'>
                            <button className='login-button-google'>Login with Google</button>
                            <button className='login-button-email' onClick={openDialog}>Login with Email</button>
                        </div>
                        <div className='register-link-container'>
                            <p>Or</p>
                            <button className='register-button' onClick={handleClick}>Create an account</button>
                        </div>
                    </>
                )}
                {isDialogOpen && <LoginEmailDialog onCancel={closeDialog} />}
            </div>
        </div>
    )
}

export default Login
