import { Link } from 'react-router-dom';
import { APP_NAME } from '../../config';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container flex items-center justify-between">
        <Link to="/" className="header-logo">
          <span className="header-logo-icon">✈</span>
          <span className="header-logo-text">{APP_NAME}</span>
        </Link>

        <nav className="header-nav">
          {/* Navigation links will be expanded in Phase 2+ */}
        </nav>
      </div>
    </header>
  );
}
