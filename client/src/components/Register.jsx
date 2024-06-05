import React from "react";
import Footer from "./Footer";
import { useState } from "react";
import axios from "axios";
import imageIcon from "../assets/icons8-tanjiro-kamado-48.png";
import imageIconGojo from "../assets/Satoru_Gojo_%28Anime_2%29.png";
import { Link, useNavigate } from "react-router-dom";

const Register = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState();
    const navigate = useNavigate();
    
    const registerHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/register`, {username, email, password, confirm_password}, {withCredentials: true})
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
                        {/* <img className="register-img" src={imageIconGojo} alt="" /> */}
                        <h1>Create Account</h1>
                        {/* <img src={imageIcon} alt="" /> */}
                    </div>
                    
                    <form className="register-form" onSubmit={registerHandler}>
                    <div className="register-input-section">
                        <p>Username:</p>
                        <input className="register-input" type="text" onChange={(e) => {setUsername(e.target.value)}}/>
                        { errors ? <p className="registration-errors">{errors.username_length}</p> : null}
                        { errors ? <p className="registration-errors">{errors.username_exist}</p> : null}
                    </div>
                    
                    <div className="register-input-section">
                        <p>Email:</p>
                        <input className="register-input" type="text" onChange={(e) => {setEmail(e.target.value)}}/>
                        { errors ? <p className="registration-errors">{errors.email_errors}</p> : null}
                    </div>
                    <div className="register-input-section">
                        <p>Password:</p>
                        
                        <input className="register-input" type="text" onChange={(e) => {setPassword(e.target.value)}}/>
                        { errors ? <p className="registration-errors">{errors.password_length}</p> : null}
                    </div>
                        <div className="register-input-section">
                        <p>ConfirmPassword:</p>
                        <input className="register-input" type="text" onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                        { errors ? <p className="registration-errors">{errors.confirm_password}</p> : null}
                    </div>
                    <div className="register-submit-button">
                        <button type="submit">Create Account</button>
                        <img src={imageIcon} alt="" />
                    </div>
                </form>
                <div className="register-form-header">
                    <p>Already have an account? <Link to={"/login"}>Sign in</Link></p>
                    
                </div>
            </div>
            <div>
                <Footer/>
            </div>
            
        </div>

            
    )
}
export default Register;