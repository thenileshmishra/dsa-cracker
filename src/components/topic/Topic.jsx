import React, { useState, useEffect } from 'react';
import TopicCard from '../topiccard/TopicCard';
import sheet from '../../450DSAFinal.js';

const Topic = () => {
  const [topics, setTopics] = useState({});

  // Initialize topics with data from sheet and localStorage
  useEffect(() => {
    const initialTopics = sheet.reduce((acc, topic) => {
      const topicName = topic.topicName;
      const saved = localStorage.getItem(`solved-${topicName}`);
      const solvedQuestions = saved ? JSON.parse(saved) : [];
      
      acc[topicName] = {
        name: topicName,
        totalProblems: topic.questions.length,
        solvedProblems: solvedQuestions.length
      };
      return acc;
    }, {});
    setTopics(initialTopics);
  }, []);

  // Listen for question progress updates
  useEffect(() => {
    const handleQuestionProgress = (event) => {
      const { topicName, solvedCount, totalQuestions } = event.detail;
      setTopics(prevTopics => ({
        ...prevTopics,
        [topicName]: {
          ...prevTopics[topicName],
          solvedProblems: solvedCount,
          totalProblems: totalQuestions
        }
      }));
    };

    window.addEventListener('questionProgress', handleQuestionProgress);
    return () => window.removeEventListener('questionProgress', handleQuestionProgress);
  }, []);

  return (
    <div className="container section">
      <h1 className="section__title">DSA Creacker</h1>
      <p className="section__subtitle">Your DSA Learning Journey Starts Here</p>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {Object.values(topics).map((topic) => (
          <TopicCard
            key={topic.name}
            topic={topic.name}
            totalProblems={topic.totalProblems}
            solvedProblems={topic.solvedProblems}
          />
        ))}
      </div>
    </div>
  );
};

export default Topic;
