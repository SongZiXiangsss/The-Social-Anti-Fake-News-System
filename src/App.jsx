import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsDetailPage from './pages/NewsDetailPage';
import VotingPage from './pages/VotingPage';
import NewsSubmissionPage from './pages/NewsSubmissionPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px'
      }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/news/:id/vote" element={<VotingPage />} />
          <Route path="/submit-news" element={<NewsSubmissionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;