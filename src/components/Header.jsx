import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  const handleOwnerClick = () => {
    if (user?.role === 'owner') {
      toggleDropdown('owners');
    } else {
      navigate('/owner/info');
      closeDropdowns();
    }
  };

  const handleVetClick = () => {
    if (user?.role === 'vet') {
      toggleDropdown('vets');
    } else {
      navigate('/vet/info');
      closeDropdowns();
    }
  };

  const handlePublicClick = () => {
    if (!user) {
      navigate('/');
      closeDropdowns();
    } else {
      toggleDropdown('public');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeDropdowns}>
          <span className="logo-icon">🐾</span>
          <span className="logo-text">Pets.gr</span>
        </Link>
        
        <nav className="main-nav">
          <div className="nav-item dropdown">
            <span onClick={handlePublicClick}>Για Όλους</span>
            {openDropdown === 'public' && user && (
              <div className="dropdown-menu">
                <Link to="/public/lost-pets" onClick={closeDropdowns}>Αναζητείστε χαμένα κατοικίδια</Link>
                <Link to="/public/search-vets" onClick={closeDropdowns}>Αναζήτηση Κτηνιάτρων</Link>
              </div>
            )}
          </div>

          <div className="nav-item dropdown">
            <span onClick={handleOwnerClick}>Για Ιδιοκτήτες</span>
            {openDropdown === 'owners' && user?.role === 'owner' && (
              <div className="dropdown-menu">
                <Link to="/owner/dashboard" onClick={closeDropdowns}>Πληροφορίες</Link>
                <Link to="/owner/pet-health/1" onClick={closeDropdowns}>Προβολή Βιβλιάριου</Link>
                <Link to="/owner/report-lost" onClick={closeDropdowns}>Δήλωση Απώλειας</Link>
                <Link to="/owner/report-found" onClick={closeDropdowns}>Δήλωση Εύρεσης</Link>
                <Link to="/owner/lost-pets-history" onClick={closeDropdowns}>Ιστορικό Δηλώσεων</Link>
                <Link to="/owner/search-vets" onClick={closeDropdowns}>Αναζήτηση Κτηνιάτρου</Link>
                <Link to="/owner/appointments-history" onClick={closeDropdowns}>Ιστορικό Ραντεβού</Link>
                <Link to="/owner/profile" onClick={closeDropdowns}>Προσωπικό Προφίλ</Link>
              </div>
            )}
          </div>

          <div className="nav-item dropdown">
            <span onClick={handleVetClick}>Για Κτηνιάτρους</span>
            {openDropdown === 'vets' && user?.role === 'vet' && (
              <div className="dropdown-menu">
                <Link to="/vet/dashboard" onClick={closeDropdowns}>Πληροφορίες</Link>
                <Link to="/vet/profile-edit" onClick={closeDropdowns}>Δημόσιο προφίλ</Link>
                <Link to="/vet/register-pet" onClick={closeDropdowns}>Καταγραφή κατοικιδίου</Link>
                <Link to="/vet/register-event" onClick={closeDropdowns}>Καταγραφή συμβάντων</Link>
                <Link to="/vet/medical-actions" onClick={closeDropdowns}>Ιατρικές Πράξεις</Link>
                <Link to="/vet/view-reviews" onClick={closeDropdowns}>Αξιολογήσεις</Link>
                <Link to="/vet/manage-appointments" onClick={closeDropdowns}>Πρόγραμμα</Link>
              </div>
            )}
          </div>

          {user ? (
            <div className="user-menu">
              <span className="username">{user.firstName} {user.lastName}</span>
              <button onClick={handleLogout} className="logout-btn">Αποσύνδεση</button>
            </div>
          ) : (
            <Link to="/login" className="login-link" onClick={closeDropdowns}>Σύνδεση</Link>
          )}
        </nav>
      </div>
      {openDropdown && <div className="dropdown-overlay" onClick={closeDropdowns}></div>}
    </header>
  );
}

export default Header;