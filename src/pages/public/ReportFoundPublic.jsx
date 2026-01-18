import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/public.css';

function ReportFoundPublic() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foundDate: '',
    location: '',
    contactInfo: '',
    comments: '',
    photo: null
  });

  const lostPetInfo = {
    title: 'Χάθηκε ο Μπρούνο',
    species: 'Σκύλος',
    breed: 'Λαμπραντόρ',
    color: 'Μαύρο',
    lostArea: 'Περιστέρι, Άγιος Αντώνιος',
    lostDate: '05/02/2025',
    microchip: '981112223334455',
    ownerContact: '6948 222 899',
    description: 'Φορούσε κόκκινο λουράκι. Είναι φιλικός και πιθανό να πλησιάσει κόσμο. Έχει πρόβλημα στο πίσω πόδι (ελαφρύ κουτσαίνισμα)...'
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({...formData, photo: e.target.files[0]});
    }
  };

  const handleSubmit = () => {
    console.log('Found report submitted:', formData);
    navigate('/public/lost-pets');
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-content public-content">
        <div className="breadcrumbs">
          Αρχική / Για Όλους / Αναφορά Εύρεσης
        </div>

        <div className="report-found-container">
          <h2>Αναφορά Εύρεσης</h2>

          <div className="lost-pet-details">
            <h3>{lostPetInfo.title}</h3>
            <div className="details-grid">
              <p><strong>Είδος:</strong> {lostPetInfo.species}</p>
              <p><strong>Φυλή:</strong> {lostPetInfo.breed}</p>
              <p><strong>Χρώμα:</strong> {lostPetInfo.color}</p>
              <p><strong>Περιοχή απώλειας:</strong> {lostPetInfo.lostArea}</p>
              <p><strong>Ημερομηνία:</strong> {lostPetInfo.lostDate}</p>
              <p><strong>Μικροτσίπ:</strong> {lostPetInfo.microchip}</p>
              <p><strong>Επικοινωνία Ιδιοκτήτη:</strong> {lostPetInfo.ownerContact}</p>
            </div>
            <div className="description-section">
              <strong>Περιγραφή</strong>
              <p>{lostPetInfo.description}</p>
            </div>
          </div>

          <div className="form-container">
            <h3>Στοιχεία Αναφοράς:</h3>

            <div className="form-group">
              <label>Ημερομηνία Εύρεσης:</label>
              <input
                type="date"
                value={formData.foundDate}
                onChange={(e) => setFormData({...formData, foundDate: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Τοποθεσία:</label>
              <input
                type="text"
                placeholder="Εισάγετε την τοποθεσία εύρεσης"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Στοιχεία Επικοινωνίας:</label>
              <input
                type="text"
                placeholder="Τηλέφωνο ή Email"
                value={formData.contactInfo}
                onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Σχόλια / Περιγραφή:</label>
              <textarea
                rows="5"
                placeholder="Περιγράψτε τις συνθήκες εύρεσης"
                value={formData.comments}
                onChange={(e) => setFormData({...formData, comments: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Προσθήκη Φωτογραφίας:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              {formData.photo && (
                <p className="file-name">Επιλέχθηκε: {formData.photo.name}</p>
              )}
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={() => navigate('/public/lost-pets')}>
                Πίσω
              </button>
              <button className="btn-primary" onClick={handleSubmit}>
                Υποβολή Αναφοράς
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReportFoundPublic;