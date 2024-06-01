import React from "react";
import Footer from "./Footer";
import imageIcon from "../assets/icons8-tanjiro-kamado-48.png";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const Login = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState();

    const login = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/login`, {username, password}, {withCredentials: true})
        .then((res) => {
            console.log(res)
            navigate('/')
        })
        .catch((err) => {
            console.log(err.response.data.detail)
            setErrors(err.response.data.detail)
            // console.log(errors.email_errors)
        })
    } 

    return (
        <div className="register-container">
        <div className="register-header">
            <Link to={'/'}><h1>AnimeClub</h1></Link>
        </div>
        <div className="register-form-container">
            <div className="register-form-header">
                <h1>Sign in</h1>
            </div>
            <form onSubmit={login} className="register-form">
                <div className="register-input-section">
                    <p>Username:</p>
                    <input onChange={(e) => {setUsername(e.target.value)}} className="register-input" type="text" />
                </div>
                <div className="register-input-section">
                    <p>Password:</p>
                    <input onChange={(e) => {setPassword(e.target.value)}} className="register-input" type="text" />
                    
                </div>
                <div className="register-submit-button">
                    <button type="submit">Sign In</button>
                    <img src={imageIcon} alt="" />
                </div>
                { errors ? <p className="registration-errors">{errors}</p> : null}
            </form>
            
            <div className="register-form-header">
                <p>Don't have an account? <Link to={"/register"}>Create one</Link> today!</p>
            </div>
        </div>
        <Footer/>
    </div>
    )
}
export default Login;