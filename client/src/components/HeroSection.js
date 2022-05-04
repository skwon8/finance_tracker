import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <div className = 'hero-container container'>
            <video src = "/videos/video-1.mp4" autoPlay loop muted />
            <h1>TRACK YOUR FINANCE!</h1>            
            <p>"Beware of little expenses; a small leak will sink a great ship" -Benjamin Franklin</p>
            <div className="hero-btns">
                <Link to = '/'><Button className = 'btns' buttonStyle = 'btn--outline' buttonSize = 'btn--large'>GET STARTED</Button></Link>
            </div>
        </div>
    );
};

export default HeroSection;