import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/vet.css';

function MedicalActionsHistory({ user, onLogout }) {

  const actions = [
    {
      id: 1,
      type: 'Στείρωση',
      date: '20/11/2024',
      medication: 'paracetamol',
      comments: 'Η επέμβαση πραγματοποιήθηκε χωρίς επιπλοκές. Δεν παρατηρήθηκε αιμορραγία. Τα εσωτερικά ράμματα είναι απορροφήσιμα, ενώ τα εξωτερικά θα αφαιρεθούν σε 10–14 ημέρες (αν υπάρχουν).',
      chip: 'κωδικος'
    },
    {
      id: 2,
      type: 'Στείρωση',
      date: '20/11/2024',
      medication: 'paracetamol',
      comments: 'Η επέμβαση πραγματοποιήθηκε χωρίς επιπλοκές. Δεν παρατηρήθηκε αιμορραγία. Τα εσωτερικά ράμματα είναι απορροφήσιμα, ενώ τα εξωτερικά θα αφαιρεθούν σε 10–14 ημέρες (αν υπάρχουν).',
      chip: 'κωδικος'
    },
    {
      id: 3,
      type: 'Στείρωση',
      date: '20/11/2024',
      medication: 'paracetamol',
      comments: 'Η επέμβαση πραγματοποιήθηκε χωρίς επιπλοκές. Δεν παρατηρήθηκε αιμορραγία. Τα εσωτερικά ράμματα είναι απορροφήσιμα, ενώ τα εξωτερικά θα αφαιρεθούν σε 10–14 ημέρες (αν υπάρχουν).',
      chip: 'κωδικος'
    }
  ];

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="vet" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για κτηνιάτρους / Ιατρικές πράξεις / Ιστορικό Δηλώσεων
          </div>

          <h2>Ιστορικό Ιατρικών Πράξεων</h2>
          <p className="subtitle">Αριθμός chip: κωδικος</p>

          <div className="medical-actions-grid">
            {actions.map(action => (
              <div key={action.id} className="medical-action-card">
                <h3>{action.type}</h3>
                <div className="card-info">
                  <p><strong>Ημ/νία Ανάρτησης:</strong> {action.date}</p>
                  <p><strong>Αγωγή:</strong> {action.medication}</p>
                </div>
                <div className="card-description">
                  <strong>Σχόλια</strong>
                  <p>{action.comments}</p>
                </div>
                <button className="btn-secondary">
                  Προβολή πλήρους Πράξης
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MedicalActionsHistory;