import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/public.css';

function PublicSearchVets({ user, onLogout }) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    area: '',
    specialization: '',
    availability: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const vets = [
    {
      id: 1,
      name: 'Δρ. Ελένη Παπαδοπούλου',
      rating: 4.7,
      area: 'Άγιοι Ανάργυροι',
      specialty: 'Παθολογία μικρών ζώων',
      description: 'Ειδικεύομαι σε παθολογικά περιστατικά μικρών ζώων, εμβολιασμούς και διαχείριση χρόνιων νοσημάτων.'
    },
    {
      id: 2,
      name: 'Δρ. Μαρία Τασοπούλου',
      rating: 4.0,
      area: 'Περιστέρι',
      specialty: 'Γενική κτηνιατρική',
      description: 'Γενική κτηνιατρική, εμβολιασμοί, στειρώσεις και grooming.'
    }
  ];

  const handleVetClick = (vetId) => {
    navigate(`/public/vet-profile/${vetId}`);
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="public-content">
        <div className="breadcrumbs">
          Αρχική / Για Όλους / Αναζήτηση Κτηνιάτρων
        </div>

        <div className="search-vets-public">
          <h1>Αναζήτηση Επαγγελματιών Κτηνιάτρων</h1>
          <p className="subtitle">Βρείτε τον κατάλληλο κτηνίατρο για το κατοικίδιό σας</p>

          <div className="search-bar-public">
            <input
              type="text"
              placeholder="🔍 Αναζήτηση κτηνιάτρου..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn-primary">Αναζήτηση</button>
          </div>

          <div className="filters-public">
            <input
              type="text"
              placeholder="Περιοχή"
              value={filters.area}
              onChange={(e) => setFilters({...filters, area: e.target.value})}
            />
            <select
              value={filters.specialization}
              onChange={(e) => setFilters({...filters, specialization: e.target.value})}
            >
              <option value="">Όλες οι ειδικότητες</option>
              <option value="pathology">Παθολογία</option>
              <option value="surgery">Χειρουργική</option>
              <option value="dentistry">Οδοντιατρική</option>
            </select>
          </div>

          <div className="vets-grid-public">
            {vets.map(vet => (
              <div key={vet.id} className="vet-card-public" onClick={() => handleVetClick(vet.id)}>
                <h3>{vet.name}</h3>
                <div className="rating">
                  {'★'.repeat(Math.floor(vet.rating))}
                  {'☆'.repeat(5 - Math.floor(vet.rating))}
                  <span>{vet.rating}/5</span>
                </div>
                <p className="area">📍 {vet.area}</p>
                <p className="specialty"><strong>Ειδικότητα:</strong> {vet.specialty}</p>
                <p className="description">{vet.description}</p>
                <button className="btn-secondary" onClick={(e) => {
                  e.stopPropagation();
                  handleVetClick(vet.id);
                }}>
                  Προβολή Προφίλ
                </button>
              </div>
            ))}
          </div>

          <div className="login-prompt">
            <p>Για να κλείσετε ραντεβού με κτηνίατρο, παρακαλούμε συνδεθείτε στην πλατφόρμα.</p>
            <button className="btn-primary" onClick={() => navigate('/login')}>
              Σύνδεση / Εγγραφή
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PublicSearchVets;