import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/vet.css';

function ManageAppointments({ user, onLogout }) {

  const appointments = [
    {
      id: 1,
      ownerName: 'ΜΑΡΙΑ Τ.',
      status: 'pending',
      day: 'Δευτέρα',
      time: '18:30'
    },
    {
      id: 2,
      ownerName: 'ΜΑΡΙΑ Τ.',
      status: 'completed',
      day: 'Δευτέρα',
      time: '18:30'
    },
    {
      id: 3,
      ownerName: 'ΜΑΡΙΑ Τ.',
      status: 'cancelled',
      day: 'Δευτέρa ',
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
<Sidebar role="vet" />
<div className="content-area">
<div className="breadcrumbs">
Αρχική / Για κτηνιάτρους / Πρόγραμμα
</div>
      <h1>Πρόγραμμα Ραντεβού</h1>

      <div className="appointments-grid">
        {appointments.map(apt => (
          <div key={apt.id} className="appointment-card">
            <div className="card-header">
              <h3>Συνάντηση με</h3>
              <p>{apt.ownerName}</p>
            </div>
            <div className="card-info">
              <p><strong>Κατάσταση</strong></p>
              <span className={`status-badge ${apt.status}`}>
                {getStatusLabel(apt.status)}
              </span>
              <p><strong>Μέρα</strong></p>
              <p>{apt.day}</p>
              <p><strong>Ώρα</strong></p>
              <p>{apt.time}</p>
            </div>
            <div className="card-actions">
              <button className="btn-secondary">Προβολή</button>
              {apt.status === 'pending' && (
                <>
                  <button className="btn-primary">Επιβεβαίωση</button>
                  <button className="btn-danger">Ακύρωση</button>
                </>
              )}
              {(apt.status === 'completed' || apt.status === 'cancelled') && (
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
export default ManageAppointments;