import React, { useState, useEffect } from 'react';

import GoogleImg from '../../assets/images/google-logo.png';
import './LogIn.css';

const LogIn = props =>  {
    function LogInButton() {
        return (
            <button className='logInBtn' id='logInBtn' onClick={() => props.logIn()}>
                <img src={GoogleImg} id="google-logo"/>
                <p>Log In with Google</p>
            </button>
        );
    }

    function LogOutButton() {
        return (
            <button className='logInBtn' id='logOutBtn' onClick={() => props.logOut()}>
                <img src={GoogleImg} id="google-logo"/>
                <p>Log Out as {props.currentUser.displayName}</p>
            </button>  
        );
    }

    function GoogleLoginOut(){
        return(
            <div>
                <h3>LOG IN</h3>
                <br></br>
                <br></br>
                {props.currentUser !== undefined
                    ? <LogOutButton />
                    : <LogInButton />
                }                
            </div>

        );
    }

    function StatusContainer(){
        return (
            <div>
                <h3>LOG IN</h3>
                <h1>Please select your status to log in.</h1>
                <div className='status-container'>
                    <div className='status-login-box'>
                        <h2 className='status-title'>Teacher Portal</h2>
                        <p className='status-description'>
                            Customize questions... 
                        </p>
                        <button onClick={() => props.setCurrentUserStatus('teacher')}>Log In</button>
                    </div>
                    <div className='status-login-box'>
                        <h2 className='status-title'>Student Portal</h2>
                        <p className='status-description'> 
                            Answer questions......
                        </p>
                        <button onClick={() => props.setCurrentUserStatus('student')}>Log In</button>
                    </div>
                </div>                
            </div>

        );
    }

    return (
        <div className='logInContainer'>
            { props.currentUserStatus === undefined 
                ? <StatusContainer />
                : <GoogleLoginOut />
            }
        </div>     
    )
}
export default LogIn;
