import React, { useEffect, useState, useCallback } from 'react';
import './SchoolInfo.css';

const SchoolInfo = () => {
    const [visible, setVisible] = useState(false);

    const animate = useCallback((star) => {
        star.style.setProperty("--star-left", `${Math.floor(Math.random() * 100)}%`);
        star.style.setProperty("--star-top", `${Math.floor(Math.random() * 100)}%`);
        star.style.animation = "none";
        // Force a reflow without causing the 'no-unused-expressions' error
        void star.offsetHeight;
        star.style.animation = "";
    }, []);

    useEffect(() => {
        setVisible(true);
        
        // Add star animation
        const stars = document.getElementsByClassName("magic-star");
        let index = 0;
        const interval = 1000;

        const animationIntervals = [];

        for (const star of stars) {
            const timeout = setTimeout(() => {
                animate(star);
                const intervalId = setInterval(() => animate(star), 1000);
                animationIntervals.push(intervalId);
            }, index++ * (interval / 3));

            animationIntervals.push(timeout);
        }

        // Cleanup function
        return () => {
            animationIntervals.forEach(clearInterval);
        };
    }, [animate]);

    return (
        <div className={`school-info ${visible ? 'visible' : ''}`}>
            <div className="school-info-content">
                <h2>
                    <span className="magic">
                        <span className="magic-star"><svg viewBox="0 0 512 512"><path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" /></svg></span>
                        <span className="magic-star"><svg viewBox="0 0 512 512"><path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" /></svg></span>
                        <span className="magic-star"><svg viewBox="0 0 512 512"><path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" /></svg></span>
                        <span className="magic-text">Jahanara Israil School & College</span>
                    </span>
                </h2>
                <p>The primary purpose of this website is to establish communication and information sharing between peers of JISC Grade IX.</p>
            </div>
        </div>
    );
};

export default SchoolInfo;