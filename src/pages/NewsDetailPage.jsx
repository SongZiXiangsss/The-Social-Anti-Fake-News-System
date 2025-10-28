import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsById } from '../utils/mockData';
import Pagination from '../components/Pagination';

function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better user experience
    const timer = setTimeout(() => {
      const newsData = getNewsById(id);
      setNews(newsData);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '1.125rem',
        color: 'var(--gray-500)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            margin: '0 auto 16px',
            border: '3px solid var(--gray-200)',
            borderTop: '3px solid var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          Loading...
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 20px',
        backgroundColor: 'var(--gray-50)',
        borderRadius: 'var(--radius-lg)',
        margin: '40px 0'
      }}>
        <h3 style={{ color: 'var(--gray-700)', marginBottom: '12px' }}>News Not Found</h3>
        <p style={{ color: 'var(--gray-500)', marginBottom: '24px' }}>
          Sorry, the news you're looking for doesn't exist or has been deleted.
        </p>
        <Link to="/" style={{ 
          backgroundColor: 'var(--primary)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          Return to Home
        </Link>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
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
  const totalVotes = news.votes.real + news.votes.fake;

  // Calculate current page comments
  const indexOfLastComment = currentPage * itemsPerPage;
  const indexOfFirstComment = indexOfLastComment - itemsPerPage;
  const currentComments = news.comments.slice(indexOfFirstComment, indexOfLastComment);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Back button */}
      <Link 
        to="/" 
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--gray-600)',
          textDecoration: 'none',
          marginBottom: '24px',
          padding: '8px 12px',
          borderRadius: 'var(--radius-md)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'var(--gray-100)';
          e.target.style.color = 'var(--primary)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = 'var(--gray-600)';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Back to News List
      </Link>

      <div className="news-detail">
        {/* Metadata and title */}
        <div className="news-meta" style={{ marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            {news.reporter}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {formatDate(news.date)}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            {news.comments.length} Comments
          </span>
        </div>

        <h2>{news.title}</h2>

        {/* Status and Credibility */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px', 
          margin: '20px 0',
          flexWrap: 'wrap' 
        }}>
          <span style={{ 
            padding: '8px 16px',
            fontSize: '0.875rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            backgroundColor: news.status === 'real' ? 'var(--success)' : 
                           news.status === 'fake' ? 'var(--danger)' : 'var(--warning)',
            color: 'white'
          }}>
            {getStatusText()}
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--gray-700)', fontSize: '0.875rem' }}>Credibility</span>
            <div style={{ 
              width: '100px', 
              height: '8px', 
              backgroundColor: 'var(--gray-200)',
              borderRadius: '4px',
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
            <span style={{ 
              fontWeight: '600', 
              color: credibility > 70 ? 'var(--success)' : 
                     credibility < 30 ? 'var(--danger)' : 'var(--warning)',
              fontSize: '0.875rem'
            }}>
              {credibility}%
            </span>
          </div>
        </div>

        {/* Voting and Actions */}
        <div style={{ 
          margin: '24px 0', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '20px',
          backgroundColor: 'var(--gray-50)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--gray-200)'
        }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success)' }}>
                {news.votes.real}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Real Votes</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--danger)' }}>
                {news.votes.fake}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Fake Votes</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--gray-700)' }}>
                {totalVotes}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Total Votes</div>
            </div>
          </div>
          <Link to={`/news/${news.id}/vote`} style={{ 
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Vote Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12 7-7 7 7"/>
              <path d="M12 19V5"/>
            </svg>
          </Link>
        </div>

        {/* News Image */}
        <div style={{ margin: '32px 0', textAlign: 'center' }}>
          <img 
            src={news.image} 
            alt={news.title} 
            className="news-image" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/800x400?text=Image+Loading+Failed';
            }}
            loading="lazy"
          />
        </div>

        {/* News Content */}
        <div style={{ 
          fontSize: '1.125rem', 
          lineHeight: '1.8', 
          color: 'var(--gray-800)',
          whiteSpace: 'pre-wrap'
        }}>
          {news.fullDescription}
        </div>

        {/* Prompt message */}
        <div style={{ 
          marginTop: '32px', 
          padding: '20px', 
          backgroundColor: 'rgba(37, 99, 235, 0.05)',
          borderLeft: '4px solid var(--primary)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
          <div>
            <h4 style={{ 
              marginBottom: '8px', 
              color: 'var(--primary-dark)',
              fontWeight: '600'
            }}>
              About News Credibility
            </h4>
            <p style={{ 
              color: 'var(--gray-700)',
              fontSize: '0.875rem',
              lineHeight: '1.5'
            }}>
              News credibility on this platform is determined by a combination of community voting and professional review.
              We encourage you to participate in voting and commenting after reading to help maintain a truthful information environment.
              Please note that even highly credible news should be cross-verified through multiple channels.
            </p>
          </div>
        </div>
      </div>

      {/* Comment button */}
      <button 
        className="btn btn-secondary" 
        onClick={() => setShowComments(!showComments)}
        style={{ 
          margin: '32px 0 20px',
          padding: '12px 24px',
          fontSize: '1rem',
          backgroundColor: showComments ? 'var(--gray-300)' : 'var(--gray-200)'
        }}
      >
        {showComments ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
            Hide Comments
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            View Comments ({news.comments.length})
          </>
        )}
      </button>

      {/* Comment section */}
      {showComments && (
        <div className="comments-section">
          <h3 style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Comments List
            <span style={{ 
              fontSize: '0.875rem', 
              fontWeight: 'normal', 
              color: 'var(--gray-500)'
            }}>
              ({news.comments.length} comments)
            </span>
          </h3>
          
          {currentComments.length > 0 ? (
            <div>
              {currentComments.map(comment => (
                <div key={comment.id} className="comment-item" style={{ padding: '24px 0' }}>
                  <div className="comment-header" style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '32px', 
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: comment.vote === 'real' ? 'rgba(16, 185, 129, 0.2)' : 
                                       comment.vote === 'fake' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: comment.vote === 'real' ? 'var(--success)' : 
                               comment.vote === 'fake' ? 'var(--danger)' : 'var(--gray-600)',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        {comment.user.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{comment.user}</span>
                      <span style={{ 
                        padding: '4px 8px',
                        fontSize: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: comment.vote === 'real' ? 'var(--success)' : 'var(--danger)',
                        color: 'white',
                        fontWeight: '600'
                      }}>
                        {comment.vote === 'real' ? 'Real' : 'Fake'}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                      {formatDate(comment.date)}
                    </span>
                  </div>
                  <p style={{ 
                    color: 'var(--gray-700)',
                    marginBottom: '12px',
                    lineHeight: '1.6'
                  }}>
                    {comment.content}
                  </p>
                  {comment.image && (
                    <div style={{ margin: '16px 0' }}>
                      <img 
                        src={comment.image} 
                        alt="Comment Image" 
                        className="comment-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Loading+Failed';
                        }}
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              ))}
              {news.comments.length > itemsPerPage && (
                <Pagination
                  totalItems={news.comments.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 20px',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ 
                color: 'var(--gray-300)', 
                margin: '0 auto 16px'
              }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <p style={{ color: 'var(--gray-500)' }}>No comments yet, be the first to comment!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NewsDetailPage;