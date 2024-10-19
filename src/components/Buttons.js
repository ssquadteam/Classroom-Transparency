import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Buttons.css';

const Card = ({ title, subtitle, icon, onClick }) => {
  const subtitleRef = useRef(null);

  useEffect(() => {
    const subtitleElement = subtitleRef.current;
    if (!subtitleElement) return;

    const createWord = (text, index) => {
      const word = document.createElement("span");
      word.innerHTML = `${text} `;
      word.classList.add("card-subtitle-word");
      word.style.transitionDelay = `${index * 40}ms`;
      return word;
    }

    const addWord = (text, index) => subtitleElement.appendChild(createWord(text, index));
    const createSubtitle = text => text.split(" ").map(addWord);

    subtitleElement.innerHTML = '';
    createSubtitle(subtitle);
  }, [subtitle]);

  return (
    <div className="card" onClick={onClick}>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <h4 className="card-subtitle" ref={subtitleRef}></h4>
      </div>
      <i className={`card-icon fa-solid ${icon}`}></i>
    </div>
  );
}

const Buttons = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "School Notice Board", subtitle: "Click to view the latest notices", icon: "fa-book", path: "/notice" },
    { title: "Class Schedule", subtitle: "Click to view the latest class schedule", icon: "fa-calendar", path: "/routine" },
    { title: "Grade IX Gallery", subtitle: "Click to view some photos of Grade IX", icon: "fa-image", path: "/gallery" },
    { title: "Grade IX Chatroom", subtitle: "Click to access the G-IX chatroom", icon: "fa-comment", path: "/chat" },
    { title: "Project Details", subtitle: "Some information about the project", icon: "fa-users", path: "/about" },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="buttons-page">
      <div className="buttons-container">
        <div className="cards-row">
          {cards.slice(0, 3).map((card, index) => (
            <Card 
              key={index} 
              title={card.title} 
              subtitle={card.subtitle} 
              icon={card.icon} 
              onClick={() => handleCardClick(card.path)}
            />
          ))}
        </div>
        <div className="cards-row">
          {cards.slice(3, 5).map((card, index) => (
            <Card 
              key={index + 3} 
              title={card.title} 
              subtitle={card.subtitle} 
              icon={card.icon} 
              onClick={() => handleCardClick(card.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Buttons;