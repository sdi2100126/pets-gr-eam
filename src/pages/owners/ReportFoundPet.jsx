import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/owner.css';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

function ReportFoundPet({ user, onLogout }) {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    area: '',
    date: '',
    condition: '',
    behavior: '',
    microchip: '',
  });

  const handleSubmit = async () => {
    if (!user?.id) {
      alert('Απαιτείται σύνδεση.');
      return;
    }

    const location = formData.area.trim();
    const date = formData.date;
    const condition = formData.condition.trim();
    const behavior = formData.behavior.trim();
    const microchip = formData.microchip.trim();

    if (!location || !date || !condition || !behavior || !microchip) {
      alert('Παρακαλώ συμπληρώστε όλα τα πεδία.');
      return;
    }

    setIsSaving(true);

    try {
      const found_dec = {
        location,
        date,
        condition,
        behavior,
        microchip,
      };

      await addDoc(collection(db, 'found_dec'), {
        ...found_dec,
        reporterid: user.id,
        createdAt: serverTimestamp(),
      });

      navigate('/owner/dashboard');
    } catch (e) {
      alert('Αποτυχία αποθήκευσης.');
    } finally {
      setIsSaving(false);
    }
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
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label>Πότε βρέθηκε το κατοικίδιο;</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label>Σε τι κατάσταση βρέθηκε?</label>
              <div className="radio-group">
                {['Υγιές', 'Νεκρό', 'Σε ανάγκη ιατρικής περίθαλψης'].map((cond) => (
                  <label key={cond} className="radio-label">
                    <input
                      type="radio"
                      name="condition"
                      checked={formData.condition === cond}
                      onChange={() => setFormData({ ...formData, condition: cond })}
                      disabled={isSaving}
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
                onChange={(e) => setFormData({ ...formData, behavior: e.target.value })}
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label>Γράψτε τον προσωπικό κωδικό microchip του κατοικιδίου:</label>
              <input
                type="text"
                placeholder="Πχ. 124151366"
                value={formData.microchip}
                onChange={(e) => setFormData({ ...formData, microchip: e.target.value })}
                disabled={isSaving}
              />
            </div>

            <div className="form-actions">
              <button
                className="btn-secondary"
                onClick={() => navigate('/owner/dashboard')}
                disabled={isSaving}
              >
                Ακύρωση
              </button>
              <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={isSaving}
              >
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
