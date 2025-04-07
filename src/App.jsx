import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DarkModeToggle from './components/DarkModeToggle'
import Topic from './components/topic/Topic'
import Questions from './components/questions/Questions'


function App() {
  return (
    <Router>
      <div className="App">
        <DarkModeToggle />
        <Routes>
          <Route path="/" element={<Topic />} />
          <Route path="/questions/:topicName" element={<Questions />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
