import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Progress } from 'antd';
import './Topic.css';
import TopicCard from './TopicCard';

function Topic({ selectedSheet }) {
  const [topics, setTopics] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState({});
  const [title, setTitle] = useState('Love Babar');
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved progress from localStorage
    const loadSolvedProblems = () => {
      const savedProgress = {};
      // Scan all localStorage keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('solved-')) {
          try {
            const topicName = key.replace('solved-', '');
            const solvedData = JSON.parse(localStorage.getItem(key));
            if (Array.isArray(solvedData)) {
              savedProgress[topicName] = solvedData;
            }
          } catch (error) {
            console.error('Error parsing solved problems:', error);
          }
        }
      }
      setSolvedProblems(savedProgress);
    };

    loadSolvedProblems();
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
    // Get the solved problems for this topic from localStorage directly
    const key = `solved-${topicName}`;
    try {
      const solvedData = localStorage.getItem(key);
      if (solvedData) {
        const solved = JSON.parse(solvedData);
        return Array.isArray(solved) ? solved.length : 0;
      }
    } catch (error) {
      console.error('Error getting solved count:', error);
    }
    return 0;
  };

  const getTotalProgress = () => {
    let totalSolved = 0;
    let totalQuestions = 0;
    
    topics.forEach(topic => {
      totalSolved += getSolvedCount(topic.topicName);
      totalQuestions += topic.questions?.length || 0;
    });

    const percentage = totalQuestions > 0 ? Math.round((totalSolved / totalQuestions) * 100) : 0;
    return {
      percentage,
      solved: totalSolved,
      total: totalQuestions
    };
  };

  const progress = getTotalProgress();

  return (
    <div className="topic-container">
      <h1 className="topic-title">{title} Sheet</h1>
      <Flex gap="small" vertical style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Progress 
          percent={progress.percentage} 
          showInfo
          style={{width: '95%'}}
          strokeWidth={20}
          strokeColor="#B0B0B0" 
          strokeLinecap="butt"
          format={() => `${progress.solved} / ${progress.total}`} 
          percentPosition={{ align: 'center', type: 'inner' }} 
        />
      </Flex>
      

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
