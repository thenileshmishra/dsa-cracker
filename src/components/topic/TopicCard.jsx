import React from 'react';
import './TopicCard.css';

function TopicCard({ topicName, totalQuestions, solvedQuestions, onClick }) {
  const progress = totalQuestions > 0 ? (solvedQuestions / totalQuestions) * 100 : 0;

  return (
    <div className="topic-card" onClick={onClick}>
      <div className="topic-card-content">
        <h3 className="topic-name">{topicName}</h3>
        <div className="progress-info">
          <span className="progress-text">
            {solvedQuestions}/{totalQuestions} Solved
          </span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicCard; 