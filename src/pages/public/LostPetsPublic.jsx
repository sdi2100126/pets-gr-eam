import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/public.css';

function LostPetsPublic({ user, onLogout }) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    area: '',
    date: '',
    species: '',
    colors: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const lostPets = [
    {
      id: 1,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    },
    {
      id: 2,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    },
    {
      id: 3,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    },
    {
      id: 4,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    },
    {
      id: 5,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    },
    {
      id: 6,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    },
    {
      id: 7,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    },
    {
      id: 8,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    },
    {
      id: 9,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    },
    {
      id: 10,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    },
    {
      id: 11,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    },
    {
      id: 12,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    },
    {
      id: 13,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    },
    {
      id: 14,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    },
    {
      id: 15,
      title: 'Χάθηκε ο Μπρούνο',
      area: 'Περιστέρι',
      date: '24/11/2025',
      species: 'Σκύλος',
      description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
    }
  ];

  const colors = ['Λευκό', 'Μπέζ', 'Πορτοκαλί', 'Μαύρο', 'Καφέ'];

  const handleColorToggle = (color) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleSearch = () => {
    console.log('Searching with filters:', filters, searchTerm);
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content public-content">
        <div className="breadcrumbs">
          Αρχική / Για Όλους
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
              <label>Ημερομηνία:</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
              />
            </div>

            <div className="filter-group">
              <label>Είδος:</label>
              <input
                type="text"
                placeholder="π.χ. Σκύλος, Γάτα"
                value={filters.species}
                onChange={(e) => setFilters({...filters, species: e.target.value})}
              />
            </div>

            <div className="filter-group">
              <label>Χρώμα:</label>
              <div className="checkbox-group">
                {colors.map(color => (
                  <label key={color} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.colors.includes(color)}
                      onChange={() => handleColorToggle(color)}
                    />
                    {color}
                  </label>
                ))}
              </div>
            </div>

            <button className="btn-primary" onClick={handleSearch} style={{ width: '100%', marginTop: '1rem' }}>
              Αναζήτηση
            </button>
          </aside>

          <div className="pets-results">
            <div className="search-bar">
              <input
                type="text"
                placeholder="🔍 Αναζήτηση"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Ταξινόμηση κατά: Ημερομηνία</option>
                <option value="area">Περιοχή</option>
                <option value="species">Είδος</option>
              </select>
            </div>

            <div className="lost-pets-grid">
              {lostPets.map(pet => (
                <div key={pet.id} className="lost-pet-card">
                  <h3>{pet.title}</h3>
                  <div className="card-info">
                    <p><strong>Περιοχή:</strong> {pet.area}</p>
                    <p><strong>Ημερομηνία:</strong> {pet.date}</p>
                    <p><strong>Είδος:</strong> {pet.species}</p>
                  </div>
                  <div className="card-description">
                    <p>{pet.description}</p>
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => navigate(`/public/report-found/${pet.id}`)}
                  >
                    Αναφορά Εύρεσης
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LostPetsPublic;