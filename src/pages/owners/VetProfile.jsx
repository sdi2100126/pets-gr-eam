import React from 'react';
import { useNavigate} from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/owner.css';

function VetProfile({ user, onLogout }) {
  const navigate = useNavigate();

  const vet = {
    name: 'Δρ. Ελένη Παπαδοπούλου',
    title: 'Κτηνίατρος – Παθολογία & Προληπτική Ιατρική Ζώων Συντροφιάς',
    experience: 8,
    specialty: 'Παθολογικά περιστατικά μικρών ζώων, εμβολιασμοί, διαχείριση χρόνιων νοσημάτων',
    education: ['Πτυχίο Κτηνιατρικής, ΑΠΘ', 'Μεταπτυχιακό στη Δημόσια Υγεία των Ζώων'],
    phone: '210-555-1234',
    email: 'epapadopoulou@vetclinic.gr',
    services: [
      'Εμβολιασμοί σκύλων & γατών',
      'Στειρώσεις',
      'Καταγραφή αριθμού μικροτσίπ',
      'Εξέταση γενικής υγείας',
      'Μικροεπεμβάσεις',
      'Παρακολούθηση χρόνιων νοσημάτων'
    ],
    schedule: [
      ['Δευτέρα', true, false, true, false, false],
      ['Τρίτη', true, false, true, false, false],
      ['Τετάρτη', true, false, true, false, false],
      ['Πέμπτη', true, false, true, false, false],
      ['Παρασκευή', true, false, true, false, false],
      ['Σάββατο', true, false, false, false, false],
      ['Κυριακή', false, false, false, false, false]
    ],
    reviews: [
      { name: 'Χριστίνα', text: 'Μας βοήθησε άμεσα με επείγον περιστατικό, την προτείνω ανεπιφύλακτα.' },
      { name: 'Μαρία Σ.', text: 'Εξαιρετική επαγγελματίας, φιλική και πολύ υπομονετική με τα ζώα.' },
      { name: 'Χριστίνα', text: 'Μας βοήθησε άμεσα με επείγον περιστατικό, την προτείνω ανεπιφύλακτα.' },
      { name: 'Μαρία Σ.', text: 'Εξαιρετική επαγγελματίας, φιλική και πολύ υπομονετική με τα ζώα.' }
    ]
  };

  const timeSlots = ['Πρωί', 'Μεσημέρι', 'Απόγευμα', 'Βράδυ', 'Νύχτα'];

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="owner" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Ιδιοκτήτες / Αναζήτηση κτηνιάτρου / Προφίλ
          </div>

          <div className="vet-profile-container">
            <h1>{vet.name}</h1>
            <h2>{vet.title}</h2>

            <div className="profile-section">
              <h3>Βασικά Στοιχεία</h3>
              <div className="info-grid">
                <p><strong>Έτη Εμπειρίας:</strong> {vet.experience}</p>
                <p><strong>Ειδικότητα:</strong> {vet.specialty}</p>
                <p><strong>Εκπαίδευση:</strong></p>
                <ul>
                  {vet.education.map((edu, idx) => (
                    <li key={idx}>{edu}</li>
                  ))}
                </ul>
                <p><strong>Στοιχεία Επικοινωνίας:</strong></p>
                <p>Τηλέφωνο: {vet.phone}</p>
                <p>Email: {vet.email}</p>
              </div>
            </div>

            <div className="profile-section">
              <h3>Παρεχόμενες Υπηρεσίες</h3>
              <div className="services-list">
                {vet.services.map((service, idx) => (
                  <label key={idx} className="checkbox-label">
                    <input type="checkbox" checked readOnly />
                    {service}
                  </label>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h3>Πρόγραμμα</h3>
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th></th>
                    {vet.schedule.map(day => (
                      <th key={day[0]}>{day[0]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((slot, idx) => (
                    <tr key={slot}>
                      <td>{slot}</td>
                      {vet.schedule.map((day, dayIdx) => (
                        <td key={dayIdx}>
                          {day[idx + 1] && '✓'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="profile-section">
              <h3>Αξιολογήσεις Χρηστών</h3>
              <div className="reviews-grid">
                {vet.reviews.map((review, idx) => (
                  <div key={idx} className="review-card">
                    <strong>{review.name}</strong>
                    <p>{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="btn-primary btn-large"
              onClick={() => navigate('/owner/book-appointment')}
            >
              Κλείσε ραντεβού
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VetProfile;