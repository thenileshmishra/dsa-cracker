import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Topic.css';
import TopicCard from './TopicCard';

function Topic({ selectedSheet }) {
  const [topics, setTopics] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState({});
  const [title, setTitle] = useState('Love Babar');
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem('solvedProblems');
    if (savedProgress) {
      setSolvedProblems(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    // Load sheet data based on selectedSheet
    const loadSheetData = async () => {
      try {
        let sheetData;
        switch (selectedSheet) {
          case 'sheet3':
            const dsaFinal = await import('../../sheets/450DSAFinal');
            sheetData = dsaFinal.default;
            setTitle('Love Babar');
            break;
          case 'sheet1':
            const arsh = await import('../../sheets/Arsh');
            sheetData = arsh.default;
            setTitle('Arsh');
            break;
          case 'sheet2':
            const fraz = await import('../../sheets/Fraz');
            sheetData = fraz.default;
            setTitle('Fraz');
            break;
          default:
            const defaultSheet = await import('../../sheets/450DSAFinal');
            sheetData = defaultSheet.default;
        }
        
        // Ensure sheetData is an array
        if (Array.isArray(sheetData)) {
          setTopics(sheetData);
        } else {
          console.error('Sheet data is not in the expected format:', sheetData);
          setTopics([]);
        }
      } catch (error) {
        console.error('Error loading sheet data:', error);
        setTopics([]);
      }
    };

    loadSheetData();
  }, [selectedSheet]);

  const handleTopicClick = (topicName) => {
    navigate(`/questions/${encodeURIComponent(topicName)}`, {
      state: { selectedSheet }
    });
  };

  const getSolvedCount = (topicName) => {
    return solvedProblems[topicName]?.length || 0;
  };

  return (
    <div className="topic-container">
      <h1 className="topic-title">{title} Sheet</h1>
      <div className="topic-grid">
        {topics.map((topic) => (
          <TopicCard
            key={topic.topicName}
            topicName={topic.topicName}
            totalQuestions={topic.questions?.length || 0}
            solvedQuestions={getSolvedCount(topic.topicName)}
            onClick={() => handleTopicClick(topic.topicName)}
          />
        ))}
      </div>
    </div>
  );
}

export default Topic;
