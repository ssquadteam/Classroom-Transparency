import React, { useEffect, useRef, useState, useMemo } from 'react';
import './NoticeBoard.css';
import noticesData from './notice.json';

// Import your images
import puja from '../assets/notice/puja.jpg';
import schoolhour from '../assets/notice/revisedschedule.jpg';
// Import more images as needed

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A horizontal scrolling notice board with a progress bar and a detail overlay.
 * 
 * This component takes in a JSON array of notice objects with the following properties:
 * - title (string): The title of the notice.
 * - description (string): A short description of the notice.
 * - date (string): The date the notice was posted.
 * - image (string): The filename of the image associated with the notice. The image should be imported and added to the imageMap object.
 * - additionalInfo (string): Additional information about the notice.
 * 
 * The component will display the notices in a horizontal scrolling track, with the ability to click on a notice and view its details in an overlay.
 * The component also includes a progress bar that shows the percentage of the track that has been scrolled.
 * 
 * The component uses the `useRef` and `useState` hooks to manage the state of the component.
 * The component also uses the `useMemo` hook to create a memoized object that maps image names to imported images.
 */
/******  71e8e01b-a7fb-4094-b4b1-6371076e8341  *******/
const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const trackRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [selectedNotice, setSelectedNotice] = useState(null);

    // Create a memoized object to map image names to imported images
    const imageMap = useMemo(() => ({
        'puja.jpg': puja,
        'revisedschedule.jpg': schoolhour,
        // Add more mappings as needed
    }), []);

    useEffect(() => {
        // Map the notices data to include the actual imported image
        const mappedNotices = noticesData.map(notice => ({
            ...notice,
            image: notice.image ? imageMap[notice.image] : null
        }));
        setNotices(mappedNotices);
    }, [imageMap]);

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
            const delta = Math.sign(e.deltaY) * 5;
            const nextPercentageUnconstrained = parseFloat(track.dataset.percentage || 0) - delta,
                  nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
            
            updateTrackPosition(nextPercentage);
        }

        const updateTrackPosition = (percentage) => {
            track.dataset.percentage = percentage;
            
            track.animate({
                transform: `translate(${percentage}%, -50%)`
            }, { duration: 1200, fill: "forwards" });
            
            for(const notice of track.getElementsByClassName("notice-container")) {
                notice.animate({
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

    const handleNoticeClick = (notice) => {
        setSelectedNotice(notice);
    };

    const handleCloseDetail = () => {
        setSelectedNotice(null);
    };

    return (
        <div className="notice-board-container">
            <h1 className="notice-board-header">Notice Board</h1>
            <div id="notice-track" ref={trackRef} data-mouse-down-at="0" data-prev-percentage="0">
                {notices.map((notice, index) => (
                    <div key={index} className="notice-container" onClick={() => handleNoticeClick(notice)}>
                        {notice.image ? (
                            <img 
                                className="notice-image" 
                                src={notice.image} 
                                alt={`Notice ${index + 1}`} 
                                draggable="false"
                            />
                        ) : (
                            <div className="notice-placeholder"></div>
                        )}
                        <div className="notice-content">
                            <h2 className="notice-title">{notice.title}</h2>
                            <p className="notice-description">{notice.description}</p>
                            <p className="notice-date">{notice.date}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="progress-bar">
                <div className="progress" style={{width: `${progress}%`}}></div>
            </div>
            {selectedNotice && (
                <div className="notice-detail-overlay" onClick={handleCloseDetail}>
                    <div className="notice-detail-content" onClick={(e) => e.stopPropagation()}>
                        <div className="notice-detail-image">
                            <img src={selectedNotice.image} alt={selectedNotice.title} />
                        </div>
                        <div className="notice-detail-info">
                            <h2>{selectedNotice.title}</h2>
                            <p>{selectedNotice.description}</p>
                            <p>Date: {selectedNotice.date}</p>
                            <p>Additional Info: {selectedNotice.additionalInfo}</p>
                        </div>
                        <button className="close-button" onClick={handleCloseDetail}>&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoticeBoard;