import React from "react";
import Footer from "./Footer";
import imageIcon from "../assets/icons8-tanjiro-kamado-48.png";
import { Link } from "react-router-dom";

const Login = (props) => {
    return (
        <div className="register-container">
        <div className="register-header">
            <Link to={'/'}><h1>AnimeClub</h1></Link>
        </div>
        <div className="register-form-container">
            <div className="register-form-header">
                <h1>Sign in</h1>
                
            </div>
            
            <form className="register-form">
                <div className="register-input-section">
                    <p>Username:</p>
                    <input className="register-input" type="text" />
                </div>
                <div className="register-input-section">
                    <p>Password:</p>
                    <input className="register-input" type="text" />
                </div>
                <div className="register-submit-button">
                    <button>Sign In</button>
                    <img src={imageIcon} alt="" />
                </div>
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