import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import sheet from '../../450DSAFinal.js';
import './Questions.css';

const Questions = () => {
  const { topicName } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [questions, setQuestions] = useState([]);
  const [solvedQuestions, setSolvedQuestions] = useState(() => {
    const saved = localStorage.getItem(`solved-${topicName}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Find the topic in the sheet
    const topic = sheet.find(t => t.topicName === topicName);
    if (topic) {
      setQuestions(topic.questions);
    }
  }, [topicName]);

  useEffect(() => {
    // Save solved questions to localStorage
    localStorage.setItem(`solved-${topicName}`, JSON.stringify(solvedQuestions));
  }, [solvedQuestions, topicName]);

  const toggleSolved = (questionId) => {
    setSolvedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  const filteredQuestions = questions.filter(question => 
    question.Problem.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="questions container section">
      <div className="questions__header">
        <h1 className="questions__title">{topicName} Questions</h1>
        <div className="questions__search">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="questions__search-input"
          />
          <i className="uil uil-search questions__search-icon"></i>
        </div>
      </div>

      <div className="questions__stats">
        <span className="questions__count">
          Total Questions: {questions.length}
        </span>
        <span className="questions__solved">
          Solved: {solvedQuestions.length}
        </span>
      </div>

      <div className="questions__list">
        {filteredQuestions.map((question, index) => (
          <div key={index} className="question__card">
            <div className="question__content">
              <div className="question__checkbox">
                <input
                  type="checkbox"
                  id={`question-${index}`}
                  checked={solvedQuestions.includes(index)}
                  onChange={() => toggleSolved(index)}
                />
                <label htmlFor={`question-${index}`}></label>
              </div>
              
              <div className="question__info">
                <h3 className="question__title">{question.Problem}</h3>
                <div className="question__links">
                  {question.URL && (
                    <a 
                      href={question.URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="question__link"
                    >
                      Link 1
                    </a>
                  )}
                  {question.URL2 && (
                    <a 
                      href={question.URL2} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="question__link"
                    >
                      Link 2
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions; 