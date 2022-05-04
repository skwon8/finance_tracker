import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

const About = () => {
    return (
        <div className='about'>
            <div className = 'hero-container container'>
                {/* <video src = "/videos/video-2.mp4" autoPlay loop muted /> */}
                <h1>HOW TO USE THIS <br/>FINANCE TRACKER!</h1>
                <h2 className='h2'>1. Make Your Own Account & Log in!</h2><br/>
                <h2 className='h2'>2. Once You Logged In You'll See "Add Your Spend"</h2> <br/>
                <h2 className='h2'>3. Click that and Add Your Own Spend by Categories</h2> <br/>
                <h2 className='h2'>4. Track Your Spend!</h2>
                <div className="hero-btns">
                    <Link to = '/'><Button className = 'btns' buttonStyle = 'btn--outline' buttonSize = 'btn--large'>GET STARTED</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default About;