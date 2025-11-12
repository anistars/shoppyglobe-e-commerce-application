import { useNavigate } from 'react-router-dom';
import '../index.css';
function Header() {
  const navigate = useNavigate();
  return (
    <header className="header-container">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
        <div className="container-fluid">
          <a className="navbar-brand">
            <button className="btn home-btn"onClick={()=>navigate('/')}>ShoppyGlobe</button>
          </a>
          <div className="d-flex ms-auto">
            <button
              className="btn cart-btn"
              type="button"
              onClick={() => navigate('/cart')}
            >
              <i className="bi bi-cart"></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;