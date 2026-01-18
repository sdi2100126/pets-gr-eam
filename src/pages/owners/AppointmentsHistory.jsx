import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/owner.css';

function AppointmentsHistory({ user, onLogout }) {
  const navigate = useNavigate();

  const appointments = [
    {
      id: 1,
      vetName: 'ΜΑΡΙΑ Τ.',
      status: 'pending',
      location: 'Μέρλα 31, Άγιοι Ανάργυροι',
      day: 'Δευτέρα',
      time: '18:30'
    },
    {
      id: 2,
      vetName: 'ΜΑΡΙΑ Τ.',
      status: 'completed',
      location: 'Μέρλα 31, Άγιοι Ανάργυροι',
      day: 'Δευτέρα',
      time: '18:30'
    },
    {
      id: 3,
      vetName: 'ΜΑΡΙΑ Τ.',
      status: 'cancelled',
      location: 'Μέρλα 31, Άγιοι Ανάργυροι',
      day: 'Δευτέρα',
      time: '18:30'
    }
  ];

  const getStatusLabel = (status) => {
    switch(status) {
      case 'pending': return 'Σε Αναμονή';
      case 'completed': return 'Ολοκληρώθηκε';
      case 'cancelled': return 'Ακυρώθηκε';
      default: return status;
    }
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />
      <div className="main-content">
        <Sidebar role="owner" />
        <div className="content-area">
          <div className="breadcrumbs">
            Αρχική / Για Ιδιοκτήτες / Ιστορικό Ραντεβού
          </div>

          <h1>Ραντεβού</h1>

          <div className="appointments-grid">
            {appointments.map(apt => (
              <div key={apt.id} className="appointment-card">
                <div className="card-header">
                  <h3>Συνάντηση με</h3>
                  <p>{apt.vetName}</p>
                </div>
                <div className="card-info">
                  <p><strong>Κατάσταση</strong></p>
                  <span className={`status-badge ${apt.status}`}>
                    {getStatusLabel(apt.status)}
                  </span>
                  <p><strong>Τοποθεσία</strong></p>
                  <p>{apt.location}</p>
                  <p><strong>Μέρα</strong></p>
                  <p>{apt.day}</p>
                  <p><strong>Ώρα</strong></p>
                  <p>{apt.time}</p>
                </div>
                <div className="card-actions">
                  <button className="btn-secondary">Προβολή</button>
                  {apt.status === 'pending' && (
                    <>
                      <button className="btn-secondary">Επεξεργασία</button>
                      <button className="btn-danger">Ακύρωση</button>
                    </>
                  )}
                  {apt.status === 'completed' && (
                    <button
                      className="btn-primary"
                      onClick={() => navigate('/owner/rate-vet')}
                    >
                      Αξιολόγηση
                    </button>
                  )}
                  {apt.status === 'cancelled' && (
                    <button className="btn-danger">Διαγραφή</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppointmentsHistory;