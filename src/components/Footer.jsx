import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Για Όλους</h3>
            <Link to="/lost-pets">Αναζητείστε χαμένα κατοικίδια</Link>
            <Link to="/">Ενημερωθείτε για τη λειτουργια της σελίδας</Link>
            <Link to="/login">Δημιουργία προφίλ</Link>
          </div>

          <div className="footer-section">
            <h3>Για Ιδιοκτήτες</h3>
            <Link to="/owner/search-vets">Βρείτε Κτηνίατρο</Link>
            <Link to="/owner/pet-health/1">Προβολή βιβλιαρίου</Link>
            <Link to="/owner/report-lost">Δήλωση απώλειας</Link>
          </div>

          <div className="footer-section">
            <h3>Για Κτηνιάτρους</h3>
            <Link to="/vet/profile">Βρείτε νέους πελάτες</Link>
            <Link to="/vet/appointments">Κλείστε ραντεβού</Link>
            <Link to="/vet/register-event">Καταγράψτε Συμβάντα</Link>
            <Link to="/vet/medical-actions">Ιατρικες πράξεις</Link>
          </div>

          <div className="footer-section">
            <h3>Επικοινωνία</h3>
            <p>E-mail: petsgreece@gmail.com</p>
            <p>Σταθερό Τηλέφωνο: +30 211 0934597</p>
            <p>Κινητό Τηλέφωνο: +30 695 4267405</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>🇬🇷 Ελληνικά</p>
          <p>@Pets.gr All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;