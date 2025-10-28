import { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import Pagination from '../components/Pagination';
import { getNewsByStatus } from '../utils/mockData';

function HomePage() {
  const [filteredNews, setFilteredNews] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [itemsPerPage, setItemsPerPage] = useState(6); // Changed to 6 for better grid layoutChanged to 6 for better grid layout
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Get news based on filter criteria
    let news = getNewsByStatus(statusFilter);
    
    // Apply search filter
    if (searchTerm) {
      news = news.filter(news => 
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredNews(news);
    setCurrentPage(1); // Reset to first page
  }, [statusFilter, searchTerm]);

  // Handle filter change
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate current page news
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  // Get status text
  const getStatusText = (status) => {
    switch(status) {
      case 'all':
        return 'All News';
      case 'real':
        return 'Real News';
      case 'fake':
        return 'Fake News';
      case 'undetermined':
        return 'Undetermined News';
      default:
        return 'All News';
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" style={{ 
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '60px 0',
        marginBottom: '40px',
        borderRadius: '0 0 var(--radius-2xl) var(--radius-2xl)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div className="container">
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '16px', 
            fontWeight: '700',
            lineHeight: '1.2'
          }}>
            Identify Fake News, Build a Truthful Information Environment
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            maxWidth: '800px',
            marginBottom: '24px',
            opacity: 0.9
          }}>
            Through community collaboration and intelligent analysis, we are committed to exposing false information and helping the public access authentic, reliable news.
            Every piece of news undergoes community voting and professional review to ensure the truth is never buried.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#filter" style={{ 
              backgroundColor: 'white', 
              color: 'var(--primary)',
              fontWeight: '600',
              fontSize: '1rem',
              padding: '12px 24px',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none'
            }}>
              Explore Now
            </a>
            <a href="#about" style={{ 
              backgroundColor: 'transparent', 
              color: 'white',
              border: '2px solid white',
              padding: '12px 24px',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none'
            }}>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <div style={{ 
        marginBottom: '32px',
        padding: '24px',
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)'
      }} id="filter">
        <h2 style={{ 
          color: 'var(--dark)', 
          marginBottom: '20px',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>News Filter</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', marginBottom: '16px' }}>
            <label htmlFor="search-input">Search News:</label>
            <input 
              type="text" 
              id="search-input" 
              placeholder="Enter keywords to search news title or description..."
              value={searchTerm} 
              onChange={handleSearchChange}
            />
          </div>
          <div style={{ flex: '1 1 200px', marginBottom: '16px' }}>
            <label htmlFor="status-filter">News Status:</label>
            <select 
              id="status-filter" 
              value={statusFilter} 
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="real">Real</option>
              <option value="fake">Fake</option>
              <option value="undetermined">Undetermined</option>
            </select>
          </div>
          <div style={{ flex: '1 1 150px', marginBottom: '16px' }}>
            <label htmlFor="items-per-page">Items Per Page:</label>
            <select 
              id="items-per-page" 
              value={itemsPerPage} 
              onChange={handleItemsPerPageChange}
            >
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
            </select>
          </div>
        </div>
      </div>

      {/* News List */}
      <div style={{ margin: '32px 0' }}>
        <h2 style={{ 
          color: 'var(--dark)', 
          marginBottom: '24px',
          fontSize: '1.75rem',
          fontWeight: '600'
        }}>
          {getStatusText(statusFilter)} 
          <span style={{ 
            marginLeft: '8px', 
            color: 'var(--gray-500)',
            fontWeight: 'normal',
            fontSize: '1.25rem'
          }}>
            ({filteredNews.length})
          </span>
        </h2>
        
        {searchTerm && (
          <p style={{ 
            color: 'var(--gray-600)', 
            marginBottom: '20px',
            fontStyle: 'italic'
          }}>
            Search results: "{searchTerm}"
          </p>
        )}
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {currentNews.length > 0 ? (
            currentNews.map(news => (
              <NewsCard key={news.id} news={news} />
            ))
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '60px 20px',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-lg)',
              border: '2px dashed var(--gray-300)'
            }}>
              <h3 style={{ 
                color: 'var(--gray-700)', 
                marginBottom: '12px',
                fontSize: '1.25rem'
              }}>
                No News Data
              </h3>
              <p style={{ color: 'var(--gray-500)' }}>
                No news found matching the current filter criteria. Please try changing the filter or search keywords.
              </p>
            </div>
          )}
        </div>

        {filteredNews.length > itemsPerPage && (
          <Pagination
            totalItems={filteredNews.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* About Us Section */}
      <section id="about" style={{ 
        marginTop: '80px', 
        marginBottom: '60px',
        padding: '40px',
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow)'
      }}>
        <h2 style={{ 
          color: 'var(--dark)', 
          marginBottom: '24px',
          fontSize: '1.75rem',
          fontWeight: '600'
        }}>
          About Us
        </h2>
        <div style={{ maxWidth: '800px' }}>
          <p style={{ 
            marginBottom: '16px', 
            color: 'var(--gray-700)',
            fontSize: '1rem',
            lineHeight: '1.6'
          }}>
            The Anti-Fake News System is a public welfare platform dedicated to combating the spread of false information. In the era of information explosion,
            fake news spreads faster than ever, bringing many negative impacts to society. Through this platform,
            we hope to gather community strength to jointly identify and expose false information.
          </p>
          <p style={{ 
            marginBottom: '16px', 
            color: 'var(--gray-700)',
            fontSize: '1rem',
            lineHeight: '1.6'
          }}>
            Our platform uses a combination of community voting and professional review to ensure the authenticity of every piece of news is fully verified.
            At the same time, we also provide detailed news analysis to help users understand how to distinguish between real and fake news.
          </p>
          <p style={{ 
            color: 'var(--gray-700)',
            fontSize: '1rem',
            lineHeight: '1.6'
          }}>
            Join us to maintain a healthy information environment and let the truth illuminate every corner.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;