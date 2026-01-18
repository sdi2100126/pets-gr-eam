import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/owner.css';

function ReportLostPet({ user, onLogout }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    area: '',
    date: '',
    species: [],
    characteristics: [],
    title: '',
    description: ''
  });

  const handleCheckbox = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSaveDraft = () => {
    console.log('Saved as draft:', formData);
    navigate('/owner/lost-pets-history');
  };

  const handleSubmit = () => {
    console.log('Submitted:', formData);
    navigate('/owner/lost-pets-history');
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="owner" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Ιδιοκτήτες / Δήλωση απώλειας
          </div>

          <div className="form-container">
            <h2>Δήλωση Απώλειας</h2>

            <div className="form-group">
              <label>Σε ποιά περιοχή χάσατε το κατοικίδιο σας?</label>
              <input
                type="text"
                placeholder="Πχ. Παγκράτι, Αθήνα"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Πότε χάθηκε το κατοικίδιο σας?</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Είδος κατοικιδίου:</label>
              <div className="checkbox-group">
                {['Σκύλος', 'Γάτα', 'Κουνέλι', 'Παπαγάλος', 'Άλλο'].map(species => (
                  <label key={species} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.species.includes(species)}
                      onChange={() => handleCheckbox('species', species)}
                    />
                    {species}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Ποιά χαρακτηριστικά περιγράφουν καλύτερα το κατοικίδιο σας?</label>
              <div className="checkbox-group">
                {['Εκπαιδευμένο', 'Φιλικό', 'Επιθετικό', 'Φοβιτσιάρικο', 'Εμβολιασμένο', 'Εξωστρεφή'].map(char => (
                  <label key={char} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.characteristics.includes(char)}
                      onChange={() => handleCheckbox('characteristics', char)}
                    />
                    {char}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Δώστε ένα όνομα στη δήλωση σας</label>
              <input
                type="text"
                placeholder="Όνομα που περιγράφει τις ανάγκες σας σύντομα"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Γράψτε το προσωπικό σας κείμενο:</label>
              <textarea
                placeholder="Περιγράψτε εδώ το αίτημα σας"
                rows="6"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={() => navigate('/owner/dashboard')}>
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

export default ReportLostPet;