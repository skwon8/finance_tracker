import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from './Button';
import './Navbar.css';

const Navbar = (props) => {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to = "/" className = "navbar-logo" onClick = {closeMobileMenu}>
                        TYF <span><i class="fa-solid fa-chart-line p-1"></i></span>
                    </Link>
                    <div className="menu-icon" onClick = {handleClick}>
                        <i className = {click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className = {click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to = '/' className='nav-links' onClick = {closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to = '/about' className='nav-links' onClick = {closeMobileMenu}>
                                About
                            </Link>
                        </li>
                        {
                            props.loggedInUser?
                        <>
                        <li className='nav-item'>
                            <Link to = '/finances/new' className='nav-links' onClick = {closeMobileMenu}>
                                Add Your Spend
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to = '/finances' className='nav-links' onClick = {closeMobileMenu}>
                                My Finance
                            </Link>
                        </li> </>: null
                        }
                        
                        <li className='nav-item'>
                            <Link to = '/signup' className='nav-links-mobile' onClick = {closeMobileMenu}>
                                SIGN UP
                            </Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle = 'btn--outline'>SIGN UP</Button>}
                </div>
            </nav>
        </>
    );
};

export default Navbar;