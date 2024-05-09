import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const Header = () => {

    return (
        <>
        <div className="header">
        <div className="header-left">
            <h1>AnimeClub</h1>
            {/* <div className="nav">
                <Link><h3>Browse</h3></Link>
                <h3>News</h3>
                <h3>Search</h3>
            </div> */}
        </div>
        <div>
            <button className='signInButton'>Sign in</button>
            <button className='registerButton'>Create Account</button>
        </div>
        </div>
        </>
    )
}
export default Header;