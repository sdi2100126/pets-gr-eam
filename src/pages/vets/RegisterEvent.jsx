import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/vet.css';

function RegisterEvent({ user, onLogout }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventType: '',
    eventDate: '',
    location: '',
    newOwner: '',
    comments: ''
  });

  const petInfo = {
    chip: '12131',
    name: 'ΜΑΧ',
    species: 'Σκύλος',
    color: 'Μαύρο',
    birthDate: '10/03/2020'
  };

  const eventTypes = [
    'Γέννηση',
    'Υιοθεσία',
    'Μεταβίβαση',
    'Απώλεια',
    'Εύρεση',
    'Θάνατος'
  ];

  const handleSaveDraft = () => {
    console.log('Event saved as draft:', formData);
    navigate('/vet/dashboard');
  };

  const handleSubmit = () => {
    console.log('Event submitted:', formData);
    navigate('/vet/dashboard');
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="vet" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Κτηνιάτρους / Καταγραφή συμβάντων
          </div>

          <div className="form-container">
            <h2>Συμβάντα Ζωής</h2>

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

            <div className="form-group">
              <label>Τύπος Συμβάντος:</label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({...formData, eventType: e.target.value})}
              >
                <option value="">Επιλέξτε τύπο</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Ημερομηνία Συμβάντος:</label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Τοποθεσία:</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            {formData.eventType === 'Μεταβίβαση' && (
              <div className="form-group">
                <label>Νέος Ιδιοκτήτης (μόνο για μεταβίβαση):</label>
                <input
                  type="text"
                  value={formData.newOwner}
                  onChange={(e) => setFormData({...formData, newOwner: e.target.value})}
                />
              </div>
            )}

            <div className="form-group">
              <label>Σχόλια / Περιγραφή:</label>
              <textarea
                rows="5"
                value={formData.comments}
                onChange={(e) => setFormData({...formData, comments: e.target.value})}
              />
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={() => navigate('/vet/dashboard')}>
                Ακύρωση
              </button>
              <button className="btn-secondary" onClick={handleSaveDraft}>
                Αποθήκευση στο Πρόχειρο
              </button>
              <button className="btn-primary" onClick={handleSubmit}>
                Οριστική Υποβολή
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterEvent;