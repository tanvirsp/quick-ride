import React from 'react';
import { useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserDestinationContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }



const Login = () => {
    const [userDestination, setUserDestination] = useContext(UserDestinationContext);
    const [isNewUser, setIsNewUser] = useState(false);

    const [userInfo, setUserInfo] = useState({
        isLoggedIn: false,
        name:'',
        email:'',
        password: '',
        error: '',
        success:''
    });

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
   
    
//google login method
    const googleLogIn =()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {       
            const {displayName, email} = result.user;    
            const newUser = {
                isLoggedIn: true,
                name: displayName,
                email: email,
    
            } 
            setUserInfo(newUser); 
            //set In Context API
            const allUserInfo = {...newUser, ...userDestination}
            setUserDestination(allUserInfo);
            history.replace(from);
        }).catch((error) => {
            console.log(error);
        });
    }
    


    //Our own Authentication
    const handleOnBlur = (e)=>{
        let isFormValid = true;
        if(e.target.name ==='name'){
            isFormValid = e.target.value;
        }
        if(e.target.name ==='email'){
            isFormValid = /^[^\s@]+@[^\s@]+$/.test(e.target.value); 
        }
        if(e.target.name === 'password'){
            isFormValid= e.target.value.length > 5 &&  /\d{1}/.test(e.target.value)
        }
        if(e.target.name === 'confirmPssword'){
            if(userInfo.password === e.target.value){
                isFormValid= e.target.value.length > 5 &&  /\d{1}/.test(e.target.value)
            }else {
                alert('Password is not same')
            }  
        }


        if(isFormValid){
            const newUserInfo = {...userInfo};
            newUserInfo[e.target.name] = e.target.value;
            setUserInfo(newUserInfo);
           
          }
    }

    const handleSignUp =(e)=>{
        const {email, password, name} = userInfo
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                updaterUserProfile(name)
                const user = userCredential.user;
                const updateUderInfo ={
                    isLoggedIn: true,
                    name: name,
                    email: email
                }
                setUserDestination(updateUderInfo);
                history.replace(from);

            })

            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                alert(errorMessage)
            });
        e.preventDefault();  
    }

    console.log(userInfo);



    
    //Own Sign In Method
    const handleSignIn = ()=>{
        firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            const {displayName, email} = user;
            const updateUserInfo ={
                isLoggedIn: true,
                name: displayName,
                email: email,
            }

            setUserDestination(updateUserInfo);
            console.log(user);
            history.replace(from);
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });

    }




    const updaterUserProfile =(name)=>{
        const user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name,
        
        }).then(() => {
        // Update successful
        // ...
        }).catch((error) => {
        // An error occurred
        // ...
        }); 
    }



    
    return (
        <div className="container register-section " >
            {
                isNewUser ? 
                    <div className="form-container">
                        <h3 className="forn-title">Create an account</h3>
                        <form>
                            <input onBlur={handleOnBlur} type="text" name="name" id="" placeholder="Name" />
                            <input onBlur={handleOnBlur}  type="text" name="email" id="" placeholder="Username or Email" />
                            <input onBlur={handleOnBlur} type="password" name="password" id="" placeholder="Password" />
                            <input onBlur={handleOnBlur}  type="password" name="confirmPssword" id="" placeholder="Confirm Password" />
                            <button onClick={handleSignUp} className="login-btn">Create an account</button>
                            <p>{userInfo.error}</p>
                        </form>
                        <p>Already have an account? <span className="signin-up" onClick={()=>setIsNewUser(false)}>Login</span></p>
                    </div> :
                    <div className="form-container">
                        <input onBlur={handleOnBlur}  type="text" name="email" id="" placeholder="Email" />
                        <input onBlur={handleOnBlur} type="password" name="password" id="" placeholder="Password" />
                        <button onClick={handleSignIn} className="login-btn">Login</button>
                        <p>New user? <span className="signin-up" onClick={()=>setIsNewUser(true)}>Sign Up</span></p>
                    </div>
            }

            <p>Or</p>
            <button onClick={googleLogIn} className="other-login-btn">Continue with Google</button>
        </div>
    );
};

export default Login;