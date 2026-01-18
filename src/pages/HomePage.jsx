import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/homepage.css';

function HomePage() {
  return (
    <div className="page-layout">
      <Header />
      
      <main className="home-main">
        <section className="hero">
          <div className="hero-content">
            <h1>Παρέχουμε:</h1>
            <ul className="hero-list">
              <li>Κτηνίατροι σε όποια πόλη και αν βρίσκεσαι</li>
              <li>Απλή διαδικασία εγγραφής</li>
              <li>Απλουστευμένο σύστημα εύρεσης χαμένων κατοικιδίων</li>
              <li>Αμεση επικοινωνία και οργάνωση ραντεβού</li>
              <li>Δυνατότητα επιλογής των καλύτερων γιατρών</li>
            </ul>
          </div>
          <div className="hero-image">
            <div className="hero-pets">🐕 🐈</div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-card">
            <h2>Είμαι Κτηνίατρος</h2>
            <ul>
              <li>Κάνε εγγραφή ως κτηνίατρος</li>
              <li>Επικοινώνησε με ιδιοκτήτες ζώων</li>
              <li>Δήλωσε τις διαθέσημες ώρες/μέρες σου</li>
            </ul>
            <Link to="/login" className="btn-primary">Κάνε εγγραφή</Link>
          </div>

          <div className="cta-card">
            <h2>Ψάχνω Κτηνίατρο</h2>
            <ul>
              <li>Κάνε εγγραφή ως ιδιοκτήτης</li>
              <li>Αναζήτησε τον κατάλληλο κτηνίατρο για το κατοικίδιο σου μέσω φίλτρων</li>
              <li>Κανόνισε ραντεβού</li>
            </ul>
            <Link to="/login" className="btn-primary">Βρες Κτηνίατρο</Link>
          </div>
        </section>

        <section className="title-section">
          <h1>Επίλεξε από 2000+ Κτηνιάτρους</h1>
        </section>

        <section className="title-section">
          <h1>Συχνές Ερωτήσεις</h1>
          <div className="faq-list">
            <details className="faq-item">
              <summary>Πως να εγγραφώ ως κτηνίατρος;</summary>
              <p>Κάντε κλικ στο κουμπί εγγραφής και συμπληρώστε τα στοιχεία σας.</p>
            </details>
            <details className="faq-item">
              <summary>Πως δουλεύουν τα ραντεβού;</summary>
              <p>Οι ιδιοκτήτες στέλνουν αίτημα και εσείς το επιβεβαιώνετε.</p>
            </details>
            <details className="faq-item">
              <summary>Γιατί να χρησιμοποιήσω το Pets.gr;</summary>
              <p>Κεντρική πλατφόρμα για όλες τις ανάγκες του κατοικιδίου σας.</p>
            </details>
            <details className="faq-item">
              <summary>Πως μπορώ να βρω κτηνίατρο;</summary>
              <p>Χρησιμοποιήστε τα φίλτρα αναζήτησης.</p>
            </details>
            <details className="faq-item">
              <summary>Πως συνδέομαι με το TaxisNet;</summary>
              <p>Δεν απαιτείται σύνδεση με TaxisNet.</p>
            </details>
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-banner">
            <h2 className="stats-title">Pets.gr</h2>
            <p className="stats-subtitle">Τα πάντα σχετικά με το κατοικίδιο σας</p>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Προφίλ κτηνιατρων</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5000+</div>
                <div className="stat-label">ραντεβού</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2000+</div>
                <div className="stat-label">κατοικίδια βρέθηκαν</div>
              </div>
            </div>
          </div>
        </section>

        <section className="title-section">
          <h1>Αξιολογήσεις Ιδιοκτητών</h1>
        </section>

        <section className="reviews-section">
          {[1,2,3,4].map(i => (
            <div key={i} className="review-card">
              <h3>Μαρία Σ.</h3>
              <p>"Το Pets.gr διευκόλυνε πάρα πολύ τη διαδικασία εύρεσης κτηνιάτρου και μου επιτρέπει να βλέπω πως ήταν η συνεργασία τους με προηγούμενους ιδιοκτήτες"</p>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;