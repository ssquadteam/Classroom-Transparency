import React, { useEffect, useRef } from 'react';
import './About.css';

const Card = ({ title, subtitle }) => {
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
    <div className="card">
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <h4 className="card-subtitle" ref={subtitleRef}></h4>
      </div>
      <i className="card-icon fa-solid fa-code"></i>
    </div>
  );
}

const About = () => {
  const cards = [
    { title: "Sadat Sahib", subtitle: "I did everything. (I am not in any of the group photos 😔)" },
    { title: "Akid Rahaman", subtitle: "Thank you for giving the Images - Sahib, 2024" },
    { title: "Tahmid Taha", subtitle: "Helped testing the website. And gave some ideas ig." },
    { title: "Samir", subtitle: "Did nothing. (I don't even know his full name)" },
    { title: "Suprio Ghosh", subtitle: "Not even in the group 😭." },
  ];

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="cards-row">
          {cards.slice(0, 3).map((card, index) => (
            <Card key={index} title={card.title} subtitle={card.subtitle} />
          ))}
        </div>
        <div className="cards-row">
          {cards.slice(3, 5).map((card, index) => (
            <Card key={index + 3} title={card.title} subtitle={card.subtitle} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;