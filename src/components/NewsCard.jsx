import { Link } from 'react-router-dom';

function NewsCard({ news }) {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // If it's today's news, show time
    if (diffDays <= 1) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    // If it's news within a week, show weekday
    else if (diffDays <= 7) {
      const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return weekdays[date.getDay()];
    }
    // In other cases, show full date
    else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit'
      });
    }
  };

  // Get status style
  const getStatusClass = () => {
    switch(news.status) {
      case 'real':
        return 'status-real';
      case 'fake':
        return 'status-fake';
      default:
        return 'status-undetermined';
    }
  };

  // Get status text
  const getStatusText = () => {
    switch(news.status) {
      case 'real':
        return 'Real';
      case 'fake':
        return 'Fake';
      default:
        return 'Undetermined';
    }
  };

  // Calculate credibility percentage
  const calculateCredibility = () => {
    const totalVotes = news.votes.real + news.votes.fake;
    if (totalVotes === 0) return 50;
    return Math.round((news.votes.real / totalVotes) * 100);
  };

  const credibility = calculateCredibility();

  return (
    <div className="news-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Credibility indicator */}
      <div style={{ 
        marginBottom: '12px', 
        fontSize: '0.75rem', 
        color: 'var(--gray-600)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span>Credibility</span>
        <div style={{ 
          flex: 1, 
          height: '6px', 
          backgroundColor: 'var(--gray-200)',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div 
            style={{
              height: '100%',
              width: `${credibility}%`,
              backgroundColor: credibility > 70 ? 'var(--success)' : 
                            credibility < 30 ? 'var(--danger)' : 'var(--warning)',
              transition: 'width 0.5s ease'
            }}
          />
        </div>
        <span style={{ fontWeight: '600' }}>{credibility}%</span>
      </div>

      {/* Metadata */}
      <div className="news-meta">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          {news.reporter}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {formatDate(news.date)}
        </span>
      </div>

      {/* Title */}
      <h3 style={{ flex: 1 }}>
        <Link 
          to={`/news/${news.id}`} 
          style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}
          className="news-title"
        >
          {news.title}
        </Link>
      </h3>

      {/* Summary */}
      <p style={{ 
        color: 'var(--gray-600)', 
        marginBottom: '16px',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '1.5'
      }}>
        {news.shortDescription}
      </p>

      {/* Bottom action area */}
      <div className="news-actions" style={{ 
        marginTop: 'auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className={`news-status ${getStatusClass()}`}>
            {getStatusText()}
          </span>
          <div style={{ 
            fontSize: '0.75rem', 
            color: 'var(--gray-500)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m17 8 4 4-4 4"/>
                <path d="m3 12 4-4 4 4"/>
              </svg>
              {news.comments.length}
            </span>
          </div>
        </div>
        <Link to={`/news/${news.id}`} className="btn btn-primary">
          View Details
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 7-7 7 7"/>
            <path d="M12 19V5"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default NewsCard;