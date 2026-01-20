import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/vet.css';

function VetProfileEdit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    afm: '0238745986',
    fullName: 'Ελένη Παπαδοπούλου',
    gender: 'Γυναίκα',
    birthDate: '',
    phone: '',
    email: '',
    clinicAddress: '',
    clinicPhone: '',
    clinicEmail: '',
    education: '',
    specialty: '',
    experience: 1,
    services: [],
    insurance: 'NAI',
    cardPayment: 'NAI',
    schedule: Array(7).fill(null).map(() => Array(5).fill(false))
  });

  const services = [
    'Αιματολογικές & Βιοχημικές Εξετάσεις',
    'Υπερηχογράφημα Ζώων Συντροφιάς',
    'Ακτινογραφίες',
    'Καθαρισμός Δοντιών / Οδοντιατρικός Έλεγχος',
    'Δερματολογικές Εξετάσεις & Θεραπείες',
    'Διατροφικές Συμβουλές & Καθοδήγηση',
    'Χώρος στάθμευσης',
    'Grooming',
    'Δυνατότητα κατ οίκον επίσκεψης'
  ];

  const days = ['Δευ.', 'Τρι.', 'Τετ.', 'Πεμ.', 'Παρ.', 'Σαβ.', 'Κυρ.'];
  const timeSlots = ['Πρωί', 'Μεσημέρι', 'Απόγευμα', 'Βράδυ', 'Νύχτα'];

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleScheduleToggle = (dayIndex, timeIndex) => {
    const newSchedule = formData.schedule.map((day, dIdx) =>
      dIdx === dayIndex
        ? day.map((slot, tIdx) => (tIdx === timeIndex ? !slot : slot))
        : day
    );
    setFormData({ ...formData, schedule: newSchedule });
  };

  const handleSave = () => {
    console.log('Profile saved:', formData);
    navigate('/vet/dashboard');
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar role="vet" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Κτηνιάτρους / Δημόσιο προφίλ
          </div>

          <div className="form-container">
            <h2>Δημιουργία Δημόσιου Προφίλ</h2>

            <h3>Προσωπικά Στοιχεία (Υποχρεωτικά)</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>ΑΦΜ:</label>
                <input
                  type="text"
                  value={formData.afm}
                  onChange={(e) => setFormData({...formData, afm: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Ονοματεπώνυμο / Επωνυμία Κτηνιάτρου:</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Φύλο:</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="Θηλη">Θήλη</option>
                  <option value="Αρσεν">Άρσεν</option>
                  <option value="Αλλο">Άλλο</option>
                </select>
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

            <div className="form-row">
              <div className="form-group">
                <label>Τηλέφωνο Επικοινωνίας:</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <h3>Στοιχεία Ιατρείου</h3>
            
            <div className="form-group">
              <label>Διεύθυνση Ιατρείου:</label>
              <input
                type="text"
                value={formData.clinicAddress}
                onChange={(e) => setFormData({...formData, clinicAddress: e.target.value})}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Αρ. Σταθερού τηλεφώνου:</label>
                <input
                  type="tel"
                  value={formData.clinicPhone}
                  onChange={(e) => setFormData({...formData, clinicPhone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>E-mail:</label>
                <input
                  type="email"
                  value={formData.clinicEmail}
                  onChange={(e) => setFormData({...formData, clinicEmail: e.target.value})}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Επίπεδο σπουδών:</label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({...formData, education: e.target.value})}
                >
                  <option value="">Επιλέξτε βαθμίδα</option>
                  <option value="Πτυχίο">Πτυχίο</option>
                  <option value="Μεταπτυχιακό">Μεταπτυχιακό</option>
                  <option value="Διδακτορικό">Διδακτορικό</option>
                </select>
              </div>
              <div className="form-group">
                <label>Ειδικότητα:</label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                >
                  <option value="">Επιλέξτε ειδικότητα</option>
                  <option value="Γενική κτηνιατρική">Γενική κτηνιατρική</option>
                  <option value="Χειρουργός">Χειρουργός</option>
                  <option value="Οδοντιατρική">Οδοντιατρική</option>
                  <option value="Οφθαλμολογία">Οφθαλμολογία</option>
                  <option value="Ορθοπεδική">Ορθοπεδική</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Έτη εμπειρίας: {formData.experience}</label>
              <input
                type="range"
                min="1"
                max="30"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: parseInt(e.target.value)})}
              />
            </div>

            <h3>Προσθέστε επιπλέον υπηρεσίες</h3>
            <div className="checkbox-group">
              {services.map(service => (
                <label key={service} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                  />
                  {service}
                </label>
              ))}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Συμβεβλιμένος σε ασφάλεια:</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      checked={formData.insurance === 'NAI'}
                      onChange={() => setFormData({...formData, insurance: 'NAI'})}
                    />
                    ΝΑΙ
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      checked={formData.insurance === 'OXI'}
                      onChange={() => setFormData({...formData, insurance: 'OXI'})}
                    />
                    ΟΧΙ
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Πληρωμή με κάρτα:</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      checked={formData.cardPayment === 'NAI'}
                      onChange={() => setFormData({...formData, cardPayment: 'NAI'})}
                    />
                    ΝΑΙ
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      checked={formData.cardPayment === 'OXI'}
                      onChange={() => setFormData({...formData, cardPayment: 'OXI'})}
                    />
                    ΟΧΙ
                  </label>
                </div>
              </div>
            </div>

            <h3>Διαμορφώστε το πρόγραμμα διαθεσιμότητας σας</h3>
            <table className="schedule-edit-table">
              <thead>
                <tr>
                  <th></th>
                  {days.map(day => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, timeIdx) => (
                  <tr key={slot}>
                    <td>{slot}</td>
                    {days.map((day, dayIdx) => (
                      <td key={dayIdx}>
                        <input
                          type="checkbox"
                          checked={formData.schedule[dayIdx][timeIdx]}
                          onChange={() => handleScheduleToggle(dayIdx, timeIdx)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="form-group">
              <label>Επιλογή εικόνας προφίλ</label>
              <input type="file" accept="image/*" />
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={() => navigate('/vet/dashboard')}>
                Ακύρωση
              </button>
              <button className="btn-primary" onClick={handleSave}>
                Αποθήκευση Αλλαγών
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VetProfileEdit;