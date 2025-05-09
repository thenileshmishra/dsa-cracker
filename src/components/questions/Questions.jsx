import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Questions.css';

const Questions = ({ selectedSheet }) => {
  const { topicName } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [questions, setQuestions] = useState([]);
  const [solvedQuestions, setSolvedQuestions] = useState(() => {
    const saved = localStorage.getItem(`solved-${topicName}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Find the topic in the sheet
  useEffect(() => {
    // Load sheet data based on selectedSheet
    const loadSheetData = async () => {
      try {
        let sheetData;
        switch (selectedSheet) {
          case 'sheet3':
            const dsaFinal = await import('../../sheets/450DSAFinal');
            sheetData = dsaFinal.default;
            break;
          case 'sheet1':
            const arsh = await import('../../sheets/Arsh');
            sheetData = arsh.default;
            break;
          case 'sheet2':
            const fraz = await import('../../sheets/Fraz');
            sheetData = fraz.default;
            break;
          default:
            const defaultSheet = await import('../../sheets/450DSAFinal');
            sheetData = defaultSheet.default;
        }
        
        // Ensure sheetData is an array and find the topic
        if (Array.isArray(sheetData)) {
          // More flexible topic matching
          const topic = sheetData.find(t => {
            const normalizedTopicName = t.topicName.toLowerCase().replace(/\s+/g, '');
            const normalizedParam = topicName.toLowerCase().replace(/\s+/g, '');
            return normalizedTopicName.includes(normalizedParam) || 
                   normalizedParam.includes(normalizedTopicName);
          });
          
          if (topic && Array.isArray(topic.questions)) {
            setQuestions(topic.questions);
          } else {
            console.warn('Topic not found or questions array is invalid:', topicName);
            setQuestions([]);
          }
        } else {
          console.error('Sheet data is not an array:', sheetData);
          setQuestions([]);
        }
      } catch (error) {
        console.error('Error loading sheet data:', error);
        setQuestions([]);
      }
    };
    
    loadSheetData();
  }, [topicName, selectedSheet]);
    
  useEffect(() => {
    // Save solved questions to localStorage
    localStorage.setItem(`solved-${topicName}`, JSON.stringify(solvedQuestions));
    
    // Update parent component about solved questions
    const solvedCount = solvedQuestions.length;
    const totalQuestions = questions.length;
    const progress = (solvedCount / totalQuestions) * 100;
    
    // Emit event to update parent
    window.dispatchEvent(new CustomEvent('questionProgress', {
      detail: {
        topicName,
        solvedCount,
        totalQuestions,
        progress
      }
    }));
  }, [solvedQuestions, topicName, questions.length]);

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

      <div className="questions__table">
        <div className="questions__table-header">
          <div className="questions__table-cell number">No.</div>
          <div className="questions__table-cell problem">Problem</div>
          <div className="questions__table-cell links">Links</div>
        </div>
        {filteredQuestions.map((question, index) => (
          <div 
            key={index} 
            className={`questions__table-row ${solvedQuestions.includes(index) ? 'solved' : ''}`}
            onClick={() => toggleSolved(index)}
          >
            <div className="questions__table-cell number">{index + 1}</div>
            <div className="questions__table-cell problem">
              {question.Problem}
            </div>
            <div className="questions__table-cell links">
              <div className="question__links">
                {question.URL && (
                  <a 
                    href={question.URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="question__link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {question.URL.includes('geeksforgeeks') ? 'Geeks' :
                     question.URL.includes('leetcode') ? 'Leet' :
                     question.URL.includes('codingninjas') ? 'CN' : 'Link'}
                  </a>
                )}
                {question.URL2 && (
                  <a 
                    href={question.URL2} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="question__link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {question.URL2.includes('geeksforgeeks') ? 'Geeks' :
                     question.URL2.includes('leetcode') ? 'Leet' :
                     question.URL2.includes('codingninjas') ? 'CN' : 'Link'}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions; 