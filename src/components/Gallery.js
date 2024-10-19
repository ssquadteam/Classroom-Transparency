import React, { useEffect, useRef, useState } from 'react';
import './Gallery.css';
import group from '../assets/images/group.jpg';
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import image4 from '../assets/images/image4.jpg';
import image5 from '../assets/images/image5.jpg';
import image6 from '../assets/images/image6.jpg';
import image8 from '../assets/images/image8.jpg';


const Gallery = () => {
    const images = [group, image1, image2, image3, image4, image5, image6, image8];
    const captions = [
        "Class Photo 2024",
        "Donation to Disaster Funds",
        "International Mother Language Day, 2024",
        "World Environment Day, 2024",
        "Health Camp, 2024",
        "Picnic, 2024",
        "Picnic, 2023",
        "Sheikh Russel Day, 2022"
    ];
    const trackRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const track = trackRef.current;

        const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

        const handleOnUp = () => {
            track.dataset.mouseDownAt = "0";  
            track.dataset.prevPercentage = track.dataset.percentage;
        }

        const handleOnMove = e => {
            if(track.dataset.mouseDownAt === "0") return;
            
            const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
                  maxDelta = window.innerWidth / 2;
            
            const percentage = (mouseDelta / maxDelta) * -100,
                  nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
                  nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
            
            updateTrackPosition(nextPercentage);
        }

        const handleOnScroll = e => {
            e.preventDefault();
            const delta = Math.sign(e.deltaY) * 5; // Adjust 5 to change scroll sensitivity
            const nextPercentageUnconstrained = parseFloat(track.dataset.percentage || 0) - delta,
                  nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
            
            updateTrackPosition(nextPercentage);
        }

        const updateTrackPosition = (percentage) => {
            track.dataset.percentage = percentage;
            
            track.animate({
                transform: `translate(${percentage}%, -50%)`
            }, { duration: 1200, fill: "forwards" });
            
            for(const image of track.getElementsByClassName("image")) {
                image.animate({
                    objectPosition: `${100 + percentage}% center`
                }, { duration: 1200, fill: "forwards" });
            }

            setProgress(-percentage);
        }

        const preventScroll = e => {
            e.preventDefault();
            e.stopPropagation();
        }

        track.addEventListener('wheel', handleOnScroll, { passive: false });
        track.addEventListener('wheel', preventScroll, { passive: false });

        window.onmousedown = e => handleOnDown(e);
        window.ontouchstart = e => handleOnDown(e.touches[0]);
        window.onmouseup = e => handleOnUp(e);
        window.ontouchend = e => handleOnUp(e);
        window.onmousemove = e => handleOnMove(e);
        window.ontouchmove = e => handleOnMove(e.touches[0]);

        return () => {
            track.removeEventListener('wheel', handleOnScroll);
            track.removeEventListener('wheel', preventScroll);
            window.onmousedown = null;
            window.ontouchstart = null;
            window.onmouseup = null;
            window.ontouchend = null;
            window.onmousemove = null;
            window.ontouchmove = null;
        };
    }, []);

    return (
        <div className="gallery-container">
            <h1 className="gallery-header">Grade IX Album</h1>
            <div id="image-track" ref={trackRef} data-mouse-down-at="0" data-prev-percentage="0">
                {images.map((image, index) => (
                    <div key={index} className="image-container">
                        <img 
                            className="image" 
                            src={image} 
                            alt={`Picture ${index + 1}`} 
                            draggable="false"
                        />
                        <div className="image-caption">{captions[index]}</div>
                    </div>
                ))}
            </div>
            <div className="progress-bar">
                <div className="progress" style={{width: `${progress}%`}}></div>
            </div>
        </div>
    );
};

export default Gallery;