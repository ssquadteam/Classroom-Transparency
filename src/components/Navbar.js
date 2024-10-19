import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import groupImage from '../assets/images/group.jpg';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="navbar-container">
            <div className="image-background">
                <img src={groupImage} alt="Group" className="background-image" />
            </div>
            <nav className="glass-navbar">
                <img src={logo} alt="Logo" className="logo" />
                {isMobile ? (
                    <div className="hamburger" onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                ) : (
                    <div className="nav-links">
                        <Link to="/Classroom-Transparency" className="nav-item">Home</Link>
                        <Link to="/notice" className="nav-item">Notices</Link>
                        <Link to="/gallery" className="nav-item">Gallery</Link>
                        <Link to="/chat" className="nav-item">Chatroom</Link>
                        <Link to="/about" className="nav-item">About</Link>
                    </div>
                )}
            </nav>
            {isMobile && isMenuOpen && (
                <div className="mobile-menu">
                    <Link to="/Classroom-Transparency" className="nav-item" onClick={toggleMenu}>Home</Link>
                    <Link to="/notice" className="nav-item" onClick={toggleMenu}>Notices</Link>
                    <Link to="/gallery" className="nav-item" onClick={toggleMenu}>Gallery</Link>
                    <Link to="/chat" className="nav-item" onClick={toggleMenu}>Chatroom</Link>
                    <Link to="/about" className="nav-item" onClick={toggleMenu}>About</Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;