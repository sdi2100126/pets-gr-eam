import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/owner.css';

function BookAppointment({ user, onLogout }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState({
    pet: '',
    reason: '',
    date: '',
    time: ''
  });

  const pets = ['Μαξ (Σκύλος)', 'Μίνα (Γάτα)', 'Ρόκυ (Σκύλος)'];
  const reasons = [
    'Εμβολιασμός',
    'Στείρωση',
    'Καταγραφή μικροτσίπ',
    'Γενική εξέταση',
    'Χειρουργείο',
    'Έκτακτο περιστατικό'
  ];

  const times = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleSubmit = () => {
    console.log('Appointment booked:', appointmentData);
    navigate('/owner/appointments-history');
  };

  const stepLabels = [
    'Επιλογή Κατοικιδίου',
    'Λόγος Επίσκεψης',
    'Επιλογή Ημέρας',
    'Επιλογή Ώρας',
    'Προεσκόπιση'
  ];

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="owner" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Ιδιοκτήτες / Αναζήτηση κτηνιάτρου / Δημιουργία Ραντεβού
          </div>

          <div className="appointment-stepper">
            <div className="stepper-progress">
              {[1, 2, 3, 4, 5].map(num => (
                <div key={num} className="step-wrapper">
                  <div className={`step-circle ${step >= num ? 'active' : ''}`}>
                    {step > num ? '✓' : num}
                  </div>
                  {num < 5 && <div className={`step-line ${step > num ? 'active' : ''}`}></div>}
                </div>
              ))}
            </div>
            <div className="stepper-labels">
              {stepLabels.map((label, idx) => (
                <span key={idx} className={step === idx + 1 ? 'active-label' : ''}>{label}</span>
              ))}
            </div>
          </div>

          <div className="step-content">
            {step === 1 && (
              <div className="form-group">
                <h2>Για ποιό ζωάκι συντροφιάς είναι το ραντεβού;</h2>
                <select
                  value={appointmentData.pet}
                  onChange={(e) => setAppointmentData({...appointmentData, pet: e.target.value})}
                >
                  <option value="">Επιλέξτε κατοικίδιο</option>
                  {pets.map(pet => (
                    <option key={pet} value={pet}>{pet}</option>
                  ))}
                </select>
              </div>
            )}

            {step === 2 && (
              <div className="form-group">
                <h2>Ποιός είναι ο λόγος επίσκεψης;</h2>
                <select
                  value={appointmentData.reason}
                  onChange={(e) => setAppointmentData({...appointmentData, reason: e.target.value})}
                >
                  <option value="">Επιλέξτε ιατρική πράξη</option>
                  {reasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>
            )}

            {step === 3 && (
              <div className="form-group">
                <h2>Ποιά ημέρα επιθυμείτε να συναντηθείτε?</h2>
                <input
                  type="date"
                  value={appointmentData.date}
                  onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                />
              </div>
            )}

            {step === 4 && (
              <div className="form-group">
                <h2>Ποιά ώρα επιθυμείτε να συναντηθείτε?</h2>
                <div className="time-selection">
                  {times.map(time => (
                    <button
                      key={time}
                      className={`time-button ${appointmentData.time === time ? 'selected' : ''}`}
                      onClick={() => setAppointmentData({...appointmentData, time})}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="preview-section">
                <h2>Είστε σίγουροι για τα στοιχεία του ραντεβού σας?</h2>
                <div className="preview-details">
                  <p><strong>Συνάντηση με:</strong> ΜΑΡΙΑ Τ.</p>
                  <p><strong>Τοποθεσία:</strong> Μέρλα 31, Άγιοι Ανάργυροι</p>
                  <p><strong>Κατοικίδιο:</strong> {appointmentData.pet}</p>
                  <p><strong>Λόγος:</strong> {appointmentData.reason}</p>
                  <p><strong>Μέρα:</strong> {appointmentData.date}</p>
                  <p><strong>Ώρα:</strong> {appointmentData.time}</p>
                </div>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button className="btn-secondary" onClick={() => navigate('/owner/dashboard')}>
              Ακύρωση
            </button>
            {step < 5 && (
              <button className="btn-primary" onClick={handleNext}>
                Συνέχεια
              </button>
            )}
            {step === 5 && (
              <button className="btn-primary" onClick={handleSubmit}>
                Οριστική υποβολή
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookAppointment;