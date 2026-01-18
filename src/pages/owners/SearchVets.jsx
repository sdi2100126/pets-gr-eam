import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/owner.css';

function SearchVets({ user, onLogout }) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    area: '',
    experienceMonths: [0, 12],
    experienceYears: [0, 13],
    availability: '',
    cost: '',
    specializations: [],
    services: [],
    cardPayment: false,
    insurance: false
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const vets = [
    {
      id: 1,
      name: 'ΜΑΡΙΑ Τ.',
      rating: 4.0,
      area: 'Περιστέρι',
      description: 'Καλησπέρα σας. Ασχολούμαι με τη φροντίδα των ζώων. Αναλαμβάνω εμβολιασμούς, στειρώσεις και γνωματεύσεις...'
    },
    {
      id: 2,
      name: 'ΜΑΡΙΑ Τ.',
      rating: 4.0,
      area: 'Περιστέρι',
      description: 'Καλησπέρα σας. Ασχολούμαι με τη φροντίδα των ζώων. Αναλαμβάνω εμβολιασμούς, στειρώσεις και γνωματεύσεις...'
    },
    {
      id: 3,
      name: 'ΜΑΡΙΑ Τ.',
      rating: 4.0,
      area: 'Περιστέρι',
      description: 'Καλησπέρα σας. Ασχολούμαι με τη φροντίδα των ζώων. Αναλαμβάνω εμβολιασμούς, στειρώσεις και γνωματεύσεις...'
    },
    {
      id: 4,
      name: 'ΜΑΡΙΑ Τ.',
      rating: 4.0,
      area: 'Περιστέρι',
      description: 'Καλησπέρα σας. Ασχολούμαι με τη φροντίδα των ζώων. Αναλαμβάνω εμβολιασμούς, στειρώσεις και γνωματεύσεις...'
    },
    {
      id: 5,
      name: 'ΜΑΡΙΑ Τ.',
      rating: 4.0,
      area: 'Περιστέρι',
      description: 'Καλησπέρα σας. Ασχολούμαι με τη φροντίδα των ζώων. Αναλαμβάνω εμβολιασμούς, στειρώσεις και γνωματεύσεις...'
    },
    {
      id: 6,
      name: 'ΜΑΡΙΑ Τ.',
      rating: 4.0,
      area: 'Περιστέρι',
      description: 'Καλησπέρα σας. Ασχολούμαι με τη φροντίδα των ζώων. Αναλαμβάνω εμβολιασμούς, στειρώσεις και γνωματεύσεις...'
    }
  ];

  const handleCheckbox = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="owner" />
        <div className="content-area search-vets">
          <div className="breadcrumbs">
            Αρχική / Για Ιδιοκτήτες / Αναζήτηση κτηνιάτρου
          </div>

          <div className="search-layout">
            <aside className="filters-sidebar">
              <h3>Φίλτρα</h3>
              <button className="clear-filters">Καθαρισμός Φίλτρων</button>

              <div className="filter-group">
                <label>Περιοχή:</label>
                <input
                  type="text"
                  placeholder="Εισάγετε τοποθεσία"
                  value={filters.area}
                  onChange={(e) => setFilters({...filters, area: e.target.value})}
                />
              </div>

              <div className="filter-group">
                <label>Προϋπηρεσία:</label>
                <div className="slider-group">
                  <label>Μήνες (0-12)</label>
                  <input type="range" min="0" max="12" />
                  <label>Χρόνια (0-13+)</label>
                  <input type="range" min="0" max="13" />
                </div>
              </div>

              <div className="filter-group">
                <label>Διαθεσιμότητα:</label>
                <input type="text" placeholder="Επιλέξτε ώρες" />
              </div>

              <div className="filter-group">
                <label>Κόστος Επίσκεψης:</label>
                <input type="text" placeholder="Από - Έως" />
              </div>

              <div className="filter-group">
                <label>Ειδίκευση:</label>
                <div className="checkbox-group">
                  {['Γενική κτηνιατρική', 'Χειρούργος', 'Οδοντιατρική', 'Οφθαλμολογία', 'Ορθοπεδική'].map(spec => (
                    <label key={spec} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.specializations.includes(spec)}
                        onChange={() => handleCheckbox('specializations', spec)}
                      />
                      {spec}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>Επιπλέον Υπηρεσίες:</label>
                <div className="checkbox-group">
                  {['Χώρος στάθμευσης', 'Δυνατότητα κατ οίκον επίσκεψης', 'Grooming'].map(service => (
                    <label key={service} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.services.includes(service)}
                        onChange={() => handleCheckbox('services', service)}
                      />
                      {service}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>Πληρωμή με κάρτα:</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="card" /> Ναι
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="card" /> Όχι
                  </label>
                </div>
              </div>

              <div className="filter-group">
                <label>Συμβεβλιμένος σε ασφάλεια:</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="insurance" /> Ναι
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="insurance" /> Όχι
                  </label>
                </div>
              </div>
            </aside>

            <div className="vets-results">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="🔍 Αναζήτηση"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="rating">Ταξινόμηση κατά: Βαθμολογία</option>
                  <option value="name">Όνομα</option>
                  <option value="experience">Εμπειρία</option>
                </select>
              </div>

              <div className="vets-grid">
                {vets.map(vet => (
                  <div key={vet.id} className="vet-card">
                    <h3>{vet.name}</h3>
                    <div className="rating">
                      {'★'.repeat(Math.floor(vet.rating))}
                      {'☆'.repeat(5 - Math.floor(vet.rating))}
                      <span>{vet.rating}</span>
                    </div>
                    <p className="area">{vet.area}</p>
                    <p className="description">{vet.description}</p>
                    <button 
                      className="btn-primary"
                      onClick={() => navigate(`/owner/vet-profile/${vet.id}`)}
                    >
                      Προβολή Προφίλ
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchVets;