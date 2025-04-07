import React from 'react';
import { Link } from 'react-router-dom';
import './TopicCard.css';

const TopicCard = ({ topic, totalProblems, solvedProblems }) => {
  // Calculate progress percentage
  const progress = (solvedProblems / totalProblems) * 100;

  return (
    <Link to={`/questions/${topic}`} className="topic-card">
      <div className="topic-card__progress" style={{ width: `${progress}%` }} />
      <div className="topic-card__content">
        <h3 className="topic-card__title">{topic}</h3>
        
        <div className="topic-card__stats">
          <div className="topic-card__info">
            <span className="topic-card__count">
              Problems solved: {solvedProblems}/{totalProblems}
            </span>
            <span className="topic-card__percentage">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard; 