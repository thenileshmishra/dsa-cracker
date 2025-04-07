import TopicCard from '../topiccard/TopicCard';
import sheet from '../../450DSAFinal.js';

const Topic = () => {
  // Transform the data structure to match our needs
  const dsaTopics = sheet.reduce((acc, topic) => {
    const topicName = topic.topicName;
    if (!acc[topicName]) {
      acc[topicName] = {
        name: topicName,
        totalProblems: topic.questions.length,
        solvedProblems: topic.questions.filter(q => q.Done).length
      };
    }
    return acc;
  }, {});

  return (
    <div className="container section">
      <h1 className="section__title">DSA Creacker</h1>
      <p className="section__subtitle">Your DSA Learning Journey Starts Here</p>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {Object.values(dsaTopics).map((topic) => (
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
