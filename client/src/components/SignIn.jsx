import React from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import '../App.css';

const SignIn = () => {

    return (
        <>
        <div className = 'sign-up signin-container1'>
            <div className='content'>
                <div className="row">
                    <div className="col">
                        <h1 className='mb-5'>Create Account</h1>
                        <RegistrationForm></RegistrationForm>
                    </div>
                    <div className="col">
                        <h1 className='mb-5'>Sign in</h1>
                        <LoginForm></LoginForm>
                    </div>
                </div>
            </div>
        </div>
        </>
        
    );
};

export default SignIn;