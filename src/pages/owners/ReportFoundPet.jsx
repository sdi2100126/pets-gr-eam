import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/owner.css';

function ReportFoundPet({ user, onLogout }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    area: '',
    date: '',
    condition: '',
    behavior: '',
    microchip: ''
  });

  const handleSubmit = () => {
    console.log('Found pet report:', formData);
    navigate('/owner/dashboard');
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="owner" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Ιδιοκτήτες / Δήλωση εύρεσης
          </div>

          <div className="form-container">
            <h2>Δήλωση Εύρεσης</h2>

            <div className="form-group">
              <label>Σε ποιά περιοχή βρέθηκε το κατοικίδιο;</label>
              <input
                type="text"
                placeholder="Πχ. Παγκράτι, Αθήνα"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Πότε βρέθηκε το κατοικίδιο;</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Σε τι κατάσταση βρέθηκε?</label>
              <div className="radio-group">
                {['Υγιές', 'Νεκρό', 'Σε ανάγκη ιατρικής περίθαλψης'].map(cond => (
                  <label key={cond} className="radio-label">
                    <input
                      type="radio"
                      name="condition"
                      checked={formData.condition === cond}
                      onChange={() => setFormData({...formData, condition: cond})}
                    />
                    {cond}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Πως συμπεριφέρθηκε κατά την εύρεση του?</label>
              <textarea
                placeholder="Περιγράψτε τη συμπεριφορά του σύντομα"
                rows="4"
                value={formData.behavior}
                onChange={(e) => setFormData({...formData, behavior: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Γράψτε τον προσωπικό κωδικό microchip του κατοικιδίου:</label>
              <input
                type="text"
                placeholder="Πχ. 124151366"
                value={formData.microchip}
                onChange={(e) => setFormData({...formData, microchip: e.target.value})}
              />
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={() => navigate('/owner/dashboard')}>
                Ακύρωση
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

export default ReportFoundPet;