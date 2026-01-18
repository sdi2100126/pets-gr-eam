import React, { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/vet.css';

function RegisterPet({ user, onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    microchip: '',
    name: '',
    species: '',
    breed: '',
    gender: '',
    color: '',
    birthDate: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    ownerAddress: '',
    comments: ''
  });

  const handleSaveDraft = () => {
    console.log('Saved as draft:', formData);
    alert('Η καταγραφή αποθηκεύτηκε ως πρόχειρο');
  };

  const handleSubmit = () => {
    console.log('Submitted:', formData);
    alert('Η καταγραφή υποβλήθηκε επιτυχώς!');
    setShowForm(false);
    setFormData({
      microchip: '',
      name: '',
      species: '',
      breed: '',
      gender: '',
      color: '',
      birthDate: '',
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      ownerAddress: '',
      comments: ''
    });
  };

  if (!showForm) {
    return (
      <div className="app-container">
        <Header user={user} onLogout={onLogout} />
        <div className="main-content">
          <Sidebar role="vet" />
          <div className="content-area">
            <div className="breadcrumbs">
              Αρχική / Για Κτηνιάτρους / Καταγραφή κατοικιδίου
            </div>

            <div className="register-pet-container">
              <h2>Καταγραφή Κατοικιδίου</h2>
              <p>Πατήστε το κουμπί παρακάτω για να ξεκινήσετε μια νέα καταγραφή κατοικιδίου στο σύστημα.</p>
              
              <button className="btn-primary btn-large" onClick={() => setShowForm(true)}>
                Νέα Καταγραφή
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="vet" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Κτηνιάτρους / Καταγραφή κατοικιδίου
          </div>

          <div className="form-container">
            <h2>Νέα Καταγραφή Κατοικιδίου</h2>

            <h3>Στοιχεία Κατοικιδίου</h3>

            <div className="form-group">
              <label>Αριθμός Μικροτσίπ: *</label>
              <input
                type="text"
                placeholder="π.χ. 123456789012345"
                value={formData.microchip}
                onChange={(e) => setFormData({...formData, microchip: e.target.value})}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Όνομα Κατοικιδίου:</label>
                <input
                  type="text"
                  placeholder="π.χ. Μαξ"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Είδος: *</label>
                <select
                  value={formData.species}
                  onChange={(e) => setFormData({...formData, species: e.target.value})}
                  required
                >
                  <option value="">Επιλέξτε είδος</option>
                  <option value="Σκύλος">Σκύλος</option>
                  <option value="Γάτα">Γάτα</option>
                  <option value="Κουνέλι">Κουνέλι</option>
                  <option value="Παπαγάλος">Παπαγάλος</option>
                  <option value="Άλλο">Άλλο</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Φυλή:</label>
                <input
                  type="text"
                  placeholder="π.χ. Γερμανικό Ποιμενικό"
                  value={formData.breed}
                  onChange={(e) => setFormData({...formData, breed: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Φύλο:</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="">Επιλέξτε φύλο</option>
                  <option value="Αρσενικό">Αρσενικό</option>
                  <option value="Θηλυκό">Θηλυκό</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Χρώμα:</label>
                <input
                  type="text"
                  placeholder="π.χ. Μαύρο"
                  value={formData.color}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Ημερομηνία Γέννησης:</label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                />
              </div>
            </div>

            <h3>Στοιχεία Ιδιοκτήτη</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Ονοματεπώνυμο Ιδιοκτήτη: *</label>
                <input
                  type="text"
                  placeholder="π.χ. Γιάννης Παπαδόπουλος"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Τηλέφωνο Επικοινωνίας: *</label>
                <input
                  type="tel"
                  placeholder="π.χ. 694 1234567"
                  value={formData.ownerPhone}
                  onChange={(e) => setFormData({...formData, ownerPhone: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Ιδιοκτήτη:</label>
              <input
                type="email"
                placeholder="π.χ. owner@example.com"
                value={formData.ownerEmail}
                onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Διεύθυνση Κατοικίας:</label>
              <input
                type="text"
                placeholder="π.χ. Σολωμού 5, Αθήνα"
                value={formData.ownerAddress}
                onChange={(e) => setFormData({...formData, ownerAddress: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Σχόλια / Παρατηρήσεις:</label>
              <textarea
                rows="5"
                placeholder="Προσθέστε τυχόν σχόλια ή παρατηρήσεις"
                value={formData.comments}
                onChange={(e) => setFormData({...formData, comments: e.target.value})}
              />
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={() => setShowForm(false)}>
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

export default RegisterPet;