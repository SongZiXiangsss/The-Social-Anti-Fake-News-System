import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ 
      backgroundColor: 'var(--white)',
      boxShadow: 'var(--shadow-sm)',
      padding: '16px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ 
          textDecoration: 'none',
          color: 'var(--primary)',
          fontWeight: '600'
        }}>
          <h1 style={{ 
            margin: 0,
            fontSize: '1.5rem'
          }}>Anti-Fake News System</h1>
        </Link>
        <div style={{ 
          display: 'flex',
          gap: '24px'
        }}>
          <Link to="/" style={{ 
            textDecoration: 'none',
            color: 'var(--gray-700)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            transition: 'all 0.2s ease'
          }} onMouseEnter={(e) => {
            e.target.style.color = 'var(--primary)';
            e.target.style.backgroundColor = 'var(--gray-50)';
          }} onMouseLeave={(e) => {
            e.target.style.color = 'var(--gray-700)';
            e.target.style.backgroundColor = 'transparent';
          }}>Home</Link>
          <Link to="/submit-news" style={{ 
            textDecoration: 'none',
            color: 'var(--white)',
            backgroundColor: 'var(--primary)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }} onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--primary-dark)';
          }} onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--primary)';
          }}>Submit News</Link>
          <Link to="/#filter" style={{ 
            textDecoration: 'none',
            color: 'var(--gray-700)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            transition: 'all 0.2s ease'
          }} onMouseEnter={(e) => {
            e.target.style.color = 'var(--primary)';
            e.target.style.backgroundColor = 'var(--gray-50)';
          }} onMouseLeave={(e) => {
            e.target.style.color = 'var(--gray-700)';
            e.target.style.backgroundColor = 'transparent';
          }}>News Filter</Link>
          <Link to="/#about" style={{ 
            textDecoration: 'none',
            color: 'var(--gray-700)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            transition: 'all 0.2s ease'
          }} onMouseEnter={(e) => {
            e.target.style.color = 'var(--primary)';
            e.target.style.backgroundColor = 'var(--gray-50)';
          }} onMouseLeave={(e) => {
            e.target.style.color = 'var(--gray-700)';
            e.target.style.backgroundColor = 'transparent';
          }}>About Us</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;