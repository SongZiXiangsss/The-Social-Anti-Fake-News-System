import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewsSubmissionPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    reporter: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Please enter news title';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Please enter short description';
    } else if (formData.shortDescription.length > 200) {
      newErrors.shortDescription = 'Short description cannot exceed 200 characters';
    }

    if (!formData.fullDescription.trim()) {
      newErrors.fullDescription = 'Please enter full description';
    }

    if (!formData.reporter.trim()) {
      newErrors.reporter = 'Please enter reporter name';
    }

    if (formData.image.trim() && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.image.trim())) {
      newErrors.image = 'Please enter a valid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Get news data from localStorage or use mock data as fallback
    let newsData = [];
    const storedNews = localStorage.getItem('newsData');
    
    if (storedNews) {
      newsData = JSON.parse(storedNews);
    } else {
      // Import mock data if not in localStorage
      const { mockNews } = require('../utils/mockData');
      newsData = [...mockNews];
    }

    // Create new news item
    const newNews = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString(),
      votes: {
        fake: 0,
        real: 0
      },
      status: 'undetermined',
      comments: []
    };

    // Add new news to array
    newsData.unshift(newNews);

    // Save to localStorage
    localStorage.setItem('newsData', JSON.stringify(newsData));

    setSubmitted(true);

    // Redirect to home page after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (submitted) {
    return (
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '40px 20px',
        textAlign: 'center'
      }}>
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
        <h2 style={{ color: 'var(--dark)', marginBottom: '16px' }}>News Submitted Successfully!</h2>
        <p style={{ color: 'var(--gray-700)', marginBottom: '8px' }}>
          Your news has been successfully submitted to the system.
        </p>
        <p style={{ color: 'var(--gray-500)', marginBottom: '32px' }}>
          Redirecting to home page in 3 seconds...
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
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: 'var(--dark)', marginBottom: '32px' }}>Submit News</h1>
      
      <div style={{ 
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        padding: '32px'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="title" style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500',
              color: 'var(--dark)'
            }}>
              News Title <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter news title..."
              maxLength={100}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.title ? 'var(--danger)' : 'var(--gray-300)'}`,
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                boxShadow: errors.title ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
            />
            {errors.title && (
              <p style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '4px' }}>
                {errors.title}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="shortDescription" style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500',
              color: 'var(--dark)'
            }}>
              Short Description <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Enter a short description..."
              maxLength={200}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.shortDescription ? 'var(--danger)' : 'var(--gray-300)'}`,
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                boxShadow: errors.shortDescription ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
            />
            {errors.shortDescription && (
              <p style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '4px' }}>
                {errors.shortDescription}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="fullDescription" style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500',
              color: 'var(--dark)'
            }}>
              Full Description <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <textarea
              id="fullDescription"
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              placeholder="Enter full news details..."
              rows={6}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.fullDescription ? 'var(--danger)' : 'var(--gray-300)'}`,
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                boxShadow: errors.fullDescription ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none',
                transition: 'all 0.2s ease',
                resize: 'vertical'
              }}
            />
            {errors.fullDescription && (
              <p style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '4px' }}>
                {errors.fullDescription}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="reporter" style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500',
              color: 'var(--dark)'
            }}>
              Reporter Name <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="text"
              id="reporter"
              name="reporter"
              value={formData.reporter}
              onChange={handleChange}
              placeholder="Enter reporter name..."
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.reporter ? 'var(--danger)' : 'var(--gray-300)'}`,
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                boxShadow: errors.reporter ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
            />
            {errors.reporter && (
              <p style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '4px' }}>
                {errors.reporter}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label htmlFor="image" style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500',
              color: 'var(--dark)'
            }}>
              News Image URL (Optional)
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL..."
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.image ? 'var(--danger)' : 'var(--gray-300)'}`,
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                boxShadow: errors.image ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
            />
            {errors.image && (
              <p style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '4px' }}>
                {errors.image}
              </p>
            )}
            <p style={{ color: 'var(--gray-500)', fontSize: '0.75rem', marginTop: '4px' }}>
              Supported formats: JPG, JPEG, PNG, GIF, WebP
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
              type="submit"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--primary-dark)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--primary)';
              }}
            >
              Submit News
            </button>
          </div>
        </form>
      </div>

      <div style={{ 
        marginTop: '32px', 
        padding: '20px', 
        backgroundColor: 'var(--gray-50)',
        borderRadius: 'var(--radius-md)',
        borderLeft: '4px solid var(--primary)'
      }}>
        <h3 style={{ marginBottom: '8px', color: 'var(--dark)' }}>Guidelines for News Submission</h3>
        <ul style={{ margin: 0, color: 'var(--gray-700)', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>Please ensure the news content is factual and accurate.</li>
          <li style={{ marginBottom: '8px' }}>Avoid submitting rumors or unverified information.</li>
          <li style={{ marginBottom: '8px' }}>Provide as much detail as possible to help the community evaluate the news.</li>
          <li>The community will vote on the authenticity of your submitted news.</li>
        </ul>
      </div>
    </div>
  );
}

export default NewsSubmissionPage;