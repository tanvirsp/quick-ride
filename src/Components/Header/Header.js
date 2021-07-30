import React from "react";
import './Header.css';
import logo from '../../images/logo.png';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserDestinationContext } from "../../App";


const Header = () => {
    const[active, setActive] = useState(false);
    const [userDestination, setUserDestination] = useContext(UserDestinationContext);

    const history = useHistory();


    const handleLogin =()=>{
        history.push('/login')
    }

    const handleLogOut =()=>{
        setUserDestination({});
        history.push('/home')
    }

    return (
        <div className="container header">
            <Link to="/"><img className="logo" src={logo} alt="" /></Link>
            <div className="nav-bar" id={active ? "hidden" : ""}>
                <nav>
                    <Link onClick={()=>setActive(false)} to='/home'>Home</Link>
                    <Link onClick={()=>setActive(false)} to='/destination'>Destination</Link>
                    <Link onClick={()=>setActive(false)} to='/blog'>Blog</Link>
                    <Link onClick={()=>setActive(false)} to='/contact'>Contact</Link>
                    <span className="user-name" >{userDestination.name}</span>

                    {userDestination.email ? <button onClick={handleLogOut} className="log-button">Log Out</button> 
                                            : <button onClick={handleLogin} className="log-button">Login</button>  }

                    
                </nav>  
            </div>
            <button onClick={()=>setActive(!active)} className=" log-button show-menu-btn">{active ? "X" : "Menu"}</button>
          
        </div>
           
       
    );
};

export default Header;