import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/owner.css';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

function ReportLostPet({ user, onLogout }) {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    area: '',
    date: '',
    species: [],
    characteristics: [],
    title: '',
    description: '',
  });

  const handleCheckbox = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const saveMissing = async (state) => {
    if (!user?.id) {
      alert('Απαιτείται σύνδεση.');
      return;
    }

    const location = formData.area.trim();
    const date = formData.date;
    const race = formData.species.join(', ');
    const characteristic = formData.characteristics.join(', ');
    const title = formData.title.trim();
    const text = formData.description.trim();

    if (!location || !date || !title || !text) {
      alert('Παρακαλώ συμπληρώστε Περιοχή, Ημερομηνία, Τίτλο και Κείμενο.');
      return;
    }

    setIsSaving(true);

    try {
      const missing_dec = {
        location,
        date,
        race,
        characteristic,
        title,
        text,
        state,
        photo: '',
      };

      await addDoc(collection(db, 'missing_dec'), {
        ...missing_dec,
        ownerid: user.id,
        createdAt: serverTimestamp(),
      });

      navigate('/owner/lost-pets-history');
    } catch (e) {
      alert('Αποτυχία αποθήκευσης.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = () => saveMissing('draft');
  const handleSubmit = () => saveMissing('submitted');

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
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label>Πότε χάθηκε το κατοικίδιο σας?</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label>Είδος κατοικιδίου:</label>
              <div className="checkbox-group">
                {['Σκύλος', 'Γάτα', 'Κουνέλι', 'Παπαγάλος', 'Άλλο'].map((species) => (
                  <label key={species} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.species.includes(species)}
                      onChange={() => handleCheckbox('species', species)}
                      disabled={isSaving}
                    />
                    {species}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Ποιά χαρακτηριστικά περιγράφουν καλύτερα το κατοικίδιο σας?</label>
              <div className="checkbox-group">
                {['Εκπαιδευμένο', 'Φιλικό', 'Επιθετικό', 'Φοβιτσιάρικο', 'Εμβολιασμένο', 'Εξωστρεφή'].map((char) => (
                  <label key={char} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.characteristics.includes(char)}
                      onChange={() => handleCheckbox('characteristics', char)}
                      disabled={isSaving}
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
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label>Γράψτε το προσωπικό σας κείμενο:</label>
              <textarea
                placeholder="Περιγράψτε εδώ το αίτημα σας"
                rows="6"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                className="btn-secondary"
                onClick={handleSaveDraft}
                disabled={isSaving}
              >
                Αποθήκευση στο Πρόχειρο
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

export default ReportLostPet;
