import { useState } from 'react';

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [showPages, setShowPages] = useState(5);

  // Calculate displayed page range
  const getVisiblePages = () => {
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = startPage + showPages - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - showPages + 1);
    }
    
    return {
      startPage,
      endPage
    };
  };

  const { startPage, endPage } = getVisiblePages();

  // Generate page array
  const generatePageNumbers = () => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Handle page click
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // Handle previous page click
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Handle next page click
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // If only one page, don't show pagination
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 0',
      gap: '16px'
    }}>
      <div className="pagination-info" style={{
        color: 'var(--gray-600)',
        fontSize: '0.875rem'
      }}>
        Page <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{currentPage}</span> of {totalPages}
      </div>
      
      <div className="pagination-controls" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        {/* Previous page button */}
        <button 
          className="pagination-button" 
          onClick={handlePreviousClick}
          disabled={currentPage === 1}
          style={{
            minWidth: '36px',
            height: '36px',
            padding: '0 12px',
            border: '1px solid var(--gray-300)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: currentPage === 1 ? 'var(--gray-100)' : 'var(--white)',
            color: currentPage === 1 ? 'var(--gray-400)' : 'var(--gray-700)',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
              e.target.style.color = 'var(--primary)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== 1) {
              e.target.style.borderColor = 'var(--gray-300)';
              e.target.style.backgroundColor = 'var(--white)';
              e.target.style.color = 'var(--gray-700)';
            }
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <span>Previous</span>
        </button>
        
        {/* First page button */}
        {startPage > 1 && (
          <>
            <button 
              className="pagination-button"
              onClick={() => handlePageClick(1)}
              style={{
                width: '36px',
                height: '36px',
                border: '1px solid var(--gray-300)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--white)',
                color: 'var(--gray-700)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
                e.target.style.color = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--gray-300)';
                e.target.style.backgroundColor = 'var(--white)';
                e.target.style.color = 'var(--gray-700)';
              }}
            >
              1
            </button>
            {startPage > 2 && (
              <span className="pagination-ellipsis" style={{
                padding: '0 8px',
                color: 'var(--gray-400)',
                fontSize: '1.25rem'
              }}>...</span>
            )}
          </>
        )}
        
        {/* Page buttons */}
        {generatePageNumbers().map((page) => (
          <button
            key={page}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => handlePageClick(page)}
            style={{
              width: '36px',
              height: '36px',
              border: '1px solid',
              borderColor: currentPage === page ? 'var(--primary)' : 'var(--gray-300)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: currentPage === page ? 'var(--primary)' : 'var(--white)',
              color: currentPage === page ? 'var(--white)' : 'var(--gray-700)',
              cursor: currentPage === page ? 'default' : 'pointer',
              fontWeight: currentPage === page ? '600' : '400',
              fontSize: '0.875rem',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== page) {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
                e.target.style.color = 'var(--primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== page) {
                e.target.style.borderColor = 'var(--gray-300)';
                e.target.style.backgroundColor = 'var(--white)';
                e.target.style.color = 'var(--gray-700)';
              }
            }}
          >
            {page}
          </button>
        ))}
        
        {/* Last page button */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="pagination-ellipsis" style={{
                padding: '0 8px',
                color: 'var(--gray-400)',
                fontSize: '1.25rem'
              }}>...</span>
            )}
            <button 
              className="pagination-button"
              onClick={() => handlePageClick(totalPages)}
              style={{
                width: '36px',
                height: '36px',
                border: '1px solid var(--gray-300)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--white)',
                color: 'var(--gray-700)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
                e.target.style.color = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--gray-300)';
                e.target.style.backgroundColor = 'var(--white)';
                e.target.style.color = 'var(--gray-700)';
              }}
            >
              {totalPages}
            </button>
          </>
        )}
        
        {/* Next page button */}
        <button 
          className="pagination-button" 
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          style={{
            minWidth: '36px',
            height: '36px',
            padding: '0 12px',
            border: '1px solid var(--gray-300)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: currentPage === totalPages ? 'var(--gray-100)' : 'var(--white)',
            color: currentPage === totalPages ? 'var(--gray-400)' : 'var(--gray-700)',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
              e.target.style.color = 'var(--primary)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== totalPages) {
              e.target.style.borderColor = 'var(--gray-300)';
              e.target.style.backgroundColor = 'var(--white)';
              e.target.style.color = 'var(--gray-700)';
            }
          }}
        >
          <span>Next</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;