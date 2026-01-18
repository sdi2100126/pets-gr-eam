import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/vet.css';

function MedicalActions({ user, onLogout }) {
  const navigate = useNavigate();
  const [chipSearch, setChipSearch] = useState('');
  const [petFound, setPetFound] = useState(false);
  const [formData, setFormData] = useState({
    actionType: '',
    medication: '',
    comments: ''
  });

  const petInfo = {
    chip: '12131',
    name: 'ΜΑΧ',
    species: 'Σκύλος',
    color: 'Μαύρο',
    birthDate: '10/03/2020'
  };

  const actionTypes = [
    'Εμβολιασμός',
    'Στείρωση',
    'Αποπαρασίτωση',
    'Χειρουργείο',
    'Εξέταση γενικής υγείας',
    'Ακτινογραφία',
    'Υπερηχογράφημα',
    'Αιματολογικές εξετάσεις'
  ];

  const handleSearch = () => {
    if (chipSearch) {
      setPetFound(true);
    }
  };

  const handleAdd = () => {
    console.log('Medical action added:', formData);
    setFormData({ actionType: '', medication: '', comments: '' });
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="vet" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Κτηνιάτρους / Ιατρικές πράξεις
          </div>

          <div className="form-container">
            <h2>Καταγραφή ιατρικών πράξεων</h2>

            <div className="search-section">
              <label>Αριθμός chip:</label>
              <div className="search-input-group">
                <input
                  type="text"
                  placeholder="κωδικός"
                  value={chipSearch}
                  onChange={(e) => setChipSearch(e.target.value)}
                />
                <button className="btn-secondary" onClick={handleSearch}>
                  Αναζήτηση
                </button>
              </div>
            </div>

            {petFound && (
              <>
                <div className="pet-info-readonly">
                  <h3>Στοιχεία Κατοικιδίου</h3>
                  <div className="info-grid">
                    <p><strong>Αριθμός chip:</strong> {petInfo.chip}</p>
                    <p><strong>Όνομα:</strong> {petInfo.name}</p>
                    <p><strong>Είδος:</strong> {petInfo.species}</p>
                    <p><strong>Χρώμα:</strong> {petInfo.color}</p>
                    <p><strong>Ημ/νια Γέννησης:</strong> {petInfo.birthDate}</p>
                  </div>
                </div>

                <h3>Ιατρικές Πράξεις</h3>

                <div className="form-group">
                  <label>Τύπος πράξης:</label>
                  <select
                    value={formData.actionType}
                    onChange={(e) => setFormData({...formData, actionType: e.target.value})}
                  >
                    <option value="">Επιλέξτε πράξη</option>
                    {actionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Φαρμακευτική αγωγή:</label>
                  <input
                    type="text"
                    value={formData.medication}
                    onChange={(e) => setFormData({...formData, medication: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Σχόλια / Οδηγίες:</label>
                  <textarea
                    rows="5"
                    value={formData.comments}
                    onChange={(e) => setFormData({...formData, comments: e.target.value})}
                  />
                </div>

                <div className="form-actions">
                  <button className="btn-primary" onClick={handleAdd}>
                    Προσθήκη
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => navigate('/vet/medical-actions-history')}
                  >
                    Αναζήτηση Ιστορικού
                  </button>
                  <button className="btn-secondary" onClick={() => navigate('/vet/dashboard')}>
                    Ακύρωση
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MedicalActions;