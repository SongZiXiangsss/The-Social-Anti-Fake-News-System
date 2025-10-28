import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getNewsById, updateNewsVote, addComment } from '../utils/mockData';

function VotingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [selectedVote, setSelectedVote] = useState('');
  const [comment, setComment] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [userName, setUserName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Simulate loading delay
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

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!userName.trim()) {
      newErrors.userName = 'Please enter your nickname';
    } else if (userName.trim().length > 20) {
      newErrors.userName = 'Nickname cannot exceed 20 characters';
    }
    
    if (!selectedVote) {
      newErrors.selectedVote = 'Please select your vote option';
    }
    
    if (comment.trim() && comment.trim().length > 500) {
      newErrors.comment = 'Comment content cannot exceed 500 characters';
    }
    
    if (imageUrl.trim() && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(imageUrl.trim())) {
      newErrors.imageUrl = 'Please enter a valid image URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle vote selection
  const handleVoteSelect = (vote) => {
    setSelectedVote(vote);
    // Clear vote-related errors
    if (errors.selectedVote) {
      setErrors(prev => ({ ...prev, selectedVote: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Update news votes
    updateNewsVote(id, selectedVote);
    
    // Add comment (if any)
    if (comment.trim()) {
      addComment(id, {
        content: comment,
        user: userName,
        vote: selectedVote,
        image: imageUrl.trim()
      });
    }
    
    setSubmitted(true);
    
    // Redirect back to news detail page after 3 seconds
    setTimeout(() => {
      navigate(`/news/${id}`);
    }, 3000);
  };

  // Calculate vote percentages
  const calculateVotePercentages = () => {
    const totalVotes = news.votes.real + news.votes.fake;
    if (totalVotes === 0) return { real: 50, fake: 50 };
    return {
      real: Math.round((news.votes.real / totalVotes) * 100),
      fake: Math.round((news.votes.fake / totalVotes) * 100)
    };
  };

  const votePercentages = calculateVotePercentages();

  if (submitted) {
    return (
      <div className="voting-form" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ 
          width: '100px', 
          height: '100px', 
          margin: '0 auto 24px',
          borderRadius: '50%',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--success)' }}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h2 style={{ color: 'var(--dark)', marginBottom: '16px' }}>Thank You for Participating!</h2>
        <p style={{ color: 'var(--gray-700)', marginBottom: '8px', fontSize: '1.125rem' }}>
          Your vote and comment have been successfully submitted.
        </p>
        <p style={{ color: 'var(--gray-500)', marginBottom: '32px' }}>
          Redirecting to news details in 3 seconds...
        </p>
        <div style={{ 
          display: 'inline-block',
          padding: '4px 0',
          backgroundColor: 'var(--gray-200)',
          borderRadius: '4px',
          width: '200px'
        }}>
          <div style={{
            height: '4px',
            backgroundColor: 'var(--success)',
            borderRadius: '4px',
            width: '0%',
            animation: 'progress 3s linear forwards'
          }} />
        </div>
        <style jsx>{`
          @keyframes progress {
            0% { width: '0%'; }
            100% { width: '100%'; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {/* Back Button */}
      <Link 
        to={`/news/${id}`} 
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
        Back to News Details
      </Link>

      <div style={{ 
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h2 style={{ marginBottom: '8px' }}>{news.title}</h2>
        <div style={{ 
          marginBottom: '32px', 
          padding: '16px', 
          backgroundColor: 'var(--gray-50)',
          borderRadius: 'var(--radius-md)',
          borderLeft: '4px solid var(--primary)'
        }}>
          <p style={{ margin: 0, color: 'var(--gray-700)', fontSize: '0.875rem' }}>
          Your vote will help the community judge the authenticity of the news and jointly maintain a healthy information environment.
        </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="userName" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Your Nickname <span style={{ color: 'var(--danger)' }}>*</span>
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              if (errors.userName) {
                setErrors(prev => ({ ...prev, userName: '' }));
              }
            }}
            placeholder="Please enter your nickname"
            maxLength={20}
            style={{
              borderColor: errors.userName ? 'var(--danger)' : 'var(--gray-300)',
              boxShadow: errors.userName ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none'
            }}
          />
            {errors.userName && (
              <p style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '4px' }}>
                {errors.userName}
              </p>
            )}
          </div>
          
          <div style={{ margin: '32px 0' }}>
            <h3 style={{ 
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              Is this fake news? <span style={{ color: 'var(--danger)' }}>*</span>
            </h3>
            {errors.selectedVote && (
              <p style={{ 
                color: 'var(--danger)', 
                fontSize: '0.75rem', 
                marginBottom: '12px',
                textAlign: 'center'
              }}>
                {errors.selectedVote}
              </p>
            )}
            <div className="voting-options">
              <div 
                className={`voting-option ${selectedVote === 'real' ? 'selected' : ''}`}
                onClick={() => handleVoteSelect('real')}
                style={{
                  borderColor: selectedVote === 'real' ? 'var(--success)' : 'var(--gray-300)',
                  backgroundColor: selectedVote === 'real' ? 'rgba(16, 185, 129, 0.05)' : 'var(--gray-50)'
                }}
              >
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  margin: '0 auto 16px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--success)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h4>Real News</h4>
                <p>I believe this news is real</p>
              </div>
              <div 
                className={`voting-option ${selectedVote === 'fake' ? 'selected' : ''}`}
                onClick={() => handleVoteSelect('fake')}
                style={{
                  borderColor: selectedVote === 'fake' ? 'var(--danger)' : 'var(--gray-300)',
                  backgroundColor: selectedVote === 'fake' ? 'rgba(239, 68, 68, 0.05)' : 'var(--gray-50)'
                }}
              >
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  margin: '0 auto 16px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--danger)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </div>
                <h4>Fake News</h4>
                <p>I believe this news is fake</p>
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="comment">Your Comment (Optional)</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (errors.comment) {
                setErrors(prev => ({ ...prev, comment: '' }));
              }
            }}
            placeholder="Please share your reasons why you think this news is real or fake..."
            maxLength={500}
            style={{
              borderColor: errors.comment ? 'var(--danger)' : 'var(--gray-300)',
              boxShadow: errors.comment ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none'
            }}
          />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: '4px'
            }}>
              {errors.comment && (
                <p style={{ color: 'var(--danger)', fontSize: '0.75rem', margin: 0 }}>
                  {errors.comment}
                </p>
              )}
              <p style={{ 
                color: 'var(--gray-500)', 
                fontSize: '0.75rem', 
                margin: errors.comment ? '0 0 0 auto' : '0'
              }}>
                {comment.length}/500
              </p>
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="imageUrl">Evidence Image URL (Optional)</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              if (errors.imageUrl) {
                setErrors(prev => ({ ...prev, imageUrl: '' }));
              }
            }}
            placeholder="If you have evidence images, please enter the image URL"
            style={{
              borderColor: errors.imageUrl ? 'var(--danger)' : 'var(--gray-300)',
              boxShadow: errors.imageUrl ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none'
            }}
          />
            {errors.imageUrl && (
              <p style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '4px' }}>
                {errors.imageUrl}
              </p>
            )}
          </div>
          
          <button 
            type="submit" 
            style={{ 
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              padding: '12px 32px',
              fontSize: '1.125rem',
              minWidth: '200px',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Submit Vote and Comment
          </button>
        </form>
        
        {/* Current Voting Results */}
        <div style={{ 
          marginTop: '48px', 
          padding: '24px', 
          backgroundColor: 'var(--gray-50)', 
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--gray-200)'
        }}>
          <h4 style={{ 
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            Current Voting Results
          </h4>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '8px',
              fontSize: '0.875rem'
            }}>
              <span style={{ fontWeight: '500', color: 'var(--success)' }}>Real News</span>
              <span style={{ color: 'var(--gray-700)' }}>{news.votes.real} votes ({votePercentages.real}%)</span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '12px', 
              backgroundColor: 'var(--gray-200)',
              borderRadius: '6px',
              overflow: 'hidden'
            }}>
              <div 
                style={{
                  height: '100%',
                  width: `${votePercentages.real}%`,
                  backgroundColor: 'var(--success)',
                  transition: 'width 0.5s ease'
                }}
              />
            </div>
          </div>
          
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '8px',
              fontSize: '0.875rem'
            }}>
              <span style={{ fontWeight: '500', color: 'var(--danger)' }}>Fake News</span>
              <span style={{ color: 'var(--gray-700)' }}>{news.votes.fake} votes ({votePercentages.fake}%)</span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '12px', 
              backgroundColor: 'var(--gray-200)',
              borderRadius: '6px',
              overflow: 'hidden'
            }}>
              <div 
                style={{
                  height: '100%',
                  width: `${votePercentages.fake}%`,
                  backgroundColor: 'var(--danger)',
                  transition: 'width 0.5s ease'
                }}
              />
            </div>
          </div>
          
          <div style={{ 
            marginTop: '16px', 
            paddingTop: '16px', 
            borderTop: '1px solid var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.875rem',
            color: 'var(--gray-600)'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="m8 14 4-4 4 4"/>
            </svg>
            Total Votes: {news.votes.real + news.votes.fake}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VotingPage;