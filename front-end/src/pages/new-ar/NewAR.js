import "./NewAR.css";
import { useContext } from "react";
import {Select} from "antd";
import AuthContext from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const NewAR = () => {

    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

  return (
    <div className='new-ar-page'>
        <h1>Create an action reaction</h1>
    <div className="new-ar-container">
        <h2>Choose an action and a reaction</h2>
        <div className="new-ar-form">
            <form>
            <div className="new-ar-form-group">
                <label htmlFor="action">Select an action</label>
                <Select options={[{ value: 'sample', label: <span>sample</span> }]} />
            </div>
            <div className="new-ar-form-group">
                <label htmlFor="reaction">Select a reaction</label>
                <Select options={[{ value: 'sample', label: <span>sample</span> }]} />
            </div>
            <button className='create-button' type="submit">Create</button>
            </form>
        </div>
    </div>
    <button className="disconnect-button" onClick={handleLogout}>Disconnect</button>
    </div>
  )
}

export default NewAR